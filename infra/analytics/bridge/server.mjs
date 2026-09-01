import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import http from "node:http";

const port = Number(process.env.PORT || 3000);
const upstream = new URL(process.env.UMAMI_URL || "http://umami:3000");
const username = process.env.UMAMI_USERNAME || "admin";
const password = process.env.UMAMI_ADMIN_PASSWORD;
const allowedGithubUser = (process.env.ALLOWED_GITHUB_USER || "").toLowerCase();
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const sessionSecret = process.env.AUTH_SESSION_SECRET;
const publicOrigin = "https://analytics.coordiation.com";
const sessionCookieName = "coordiation_analytics_session";
const stateCookieName = "coordiation_analytics_oauth_state";
const sessionLifetimeSeconds = 12 * 60 * 60;

if (!password || !allowedGithubUser || !githubClientId || !githubClientSecret || !sessionSecret) {
  throw new Error("Analytics credentials and ALLOWED_GITHUB_USER are required");
}

function respond(response, status, body, headers = {}) {
  response.writeHead(status, {
    "cache-control": "no-store",
    "content-type": "text/plain; charset=utf-8",
    ...headers,
  });
  response.end(body);
}

function cookieHeader(name, value, maxAge) {
  return `${name}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

function parseCookies(request) {
  return Object.fromEntries(
    String(request.headers.cookie || "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf("=");
        return separator === -1
          ? [part, ""]
          : [part.slice(0, separator), part.slice(separator + 1)];
      }),
  );
}

function signature(value) {
  return createHmac("sha256", sessionSecret).update(value).digest("base64url");
}

function sign(value) {
  return `${value}.${signature(value)}`;
}

function verify(signedValue) {
  const separator = signedValue.lastIndexOf(".");
  if (separator === -1) return null;

  const value = signedValue.slice(0, separator);
  const supplied = Buffer.from(signedValue.slice(separator + 1));
  const expected = Buffer.from(signature(value));
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;
  return value;
}

function hasValidSession(request) {
  const signedSession = parseCookies(request)[sessionCookieName];
  const session = signedSession ? verify(signedSession) : null;
  if (!session) return false;

  const [githubUser, issuedAt] = session.split(":");
  const ageSeconds = Math.floor(Date.now() / 1000) - Number(issuedAt);
  return githubUser === allowedGithubUser && ageSeconds >= 0 && ageSeconds <= sessionLifetimeSeconds;
}

function startGithubLogin(response) {
  const state = `${Math.floor(Date.now() / 1000)}:${randomBytes(24).toString("base64url")}`;
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", githubClientId);
  authorizeUrl.searchParams.set("redirect_uri", `${publicOrigin}/oauth2/callback`);
  authorizeUrl.searchParams.set("state", state);

  respond(response, 302, "Redirecting to GitHub.", {
    location: authorizeUrl.toString(),
    "set-cookie": cookieHeader(stateCookieName, sign(state), 600),
  });
}

async function finishGithubLogin(request, response, url) {
  const state = url.searchParams.get("state") || "";
  const code = url.searchParams.get("code") || "";
  const signedState = parseCookies(request)[stateCookieName] || "";
  const storedState = verify(signedState);
  const issuedAt = Number((storedState || "").split(":")[0]);

  if (!code || !storedState || storedState !== state || Date.now() / 1000 - issuedAt > 600) {
    respond(response, 400, "The GitHub sign-in request is invalid or expired.");
    return;
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "user-agent": "Coordiation-Analytics",
    },
    body: JSON.stringify({
      client_id: githubClientId,
      client_secret: githubClientSecret,
      code,
      redirect_uri: `${publicOrigin}/oauth2/callback`,
    }),
  });
  const tokenData = await tokenResponse.json().catch(() => null);
  if (!tokenResponse.ok || !tokenData?.access_token) {
    respond(response, 502, "GitHub sign-in could not be completed.");
    return;
  }

  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${tokenData.access_token}`,
      "user-agent": "Coordiation-Analytics",
      "x-github-api-version": "2022-11-28",
    },
  });
  const githubUser = await userResponse.json().catch(() => null);
  const login = String(githubUser?.login || "").toLowerCase();
  if (!userResponse.ok || login !== allowedGithubUser) {
    respond(response, 403, "This GitHub account is not allowed to access Coordiation Analytics.");
    return;
  }

  const session = sign(`${login}:${Math.floor(Date.now() / 1000)}:${randomBytes(16).toString("base64url")}`);
  respond(response, 302, "GitHub sign-in complete.", {
    location: "/login",
    "set-cookie": [
      cookieHeader(sessionCookieName, session, sessionLifetimeSeconds),
      cookieHeader(stateCookieName, "", 0),
    ],
  });
}

async function bootstrapLogin(response) {
  const loginResponse = await fetch(new URL("/api/auth/login", upstream), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await loginResponse.json().catch(() => null);

  if (!loginResponse.ok || !data?.token) {
    respond(response, 502, "Coordiation Analytics could not start an Umami session.");
    return;
  }

  const location = `/sso?token=${encodeURIComponent(data.token)}&url=%2F`;
  respond(response, 302, "Redirecting to Coordiation Analytics.", { location });
}

function proxyRequest(request, response) {
  const headers = { ...request.headers, host: upstream.host };
  delete headers.connection;
  delete headers.cookie;

  const proxy = http.request(
    {
      protocol: upstream.protocol,
      hostname: upstream.hostname,
      port: upstream.port,
      path: request.url,
      method: request.method,
      headers,
    },
    (upstreamResponse) => {
      const responseHeaders = { ...upstreamResponse.headers };
      delete responseHeaders.connection;
      response.writeHead(upstreamResponse.statusCode || 502, responseHeaders);
      upstreamResponse.pipe(response);
    },
  );

  proxy.on("error", () => respond(response, 502, "Coordiation Analytics is temporarily unavailable."));
  request.pipe(proxy);
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", "http://bridge.local");

  if (url.pathname === "/healthz") {
    respond(response, 200, "ok");
    return;
  }

  if (url.pathname === "/oauth/start") {
    startGithubLogin(response);
    return;
  }

  if (url.pathname === "/oauth2/callback") {
    try {
      await finishGithubLogin(request, response, url);
    } catch {
      respond(response, 502, "GitHub sign-in could not be completed.");
    }
    return;
  }

  if (url.pathname === "/logout") {
    respond(response, 302, "Signed out.", {
      location: "https://coordiation.com/",
      "set-cookie": cookieHeader(sessionCookieName, "", 0),
    });
    return;
  }

  if (!hasValidSession(request)) {
    respond(response, 302, "GitHub sign-in required.", { location: "/oauth/start" });
    return;
  }

  if (url.pathname === "/login") {
    try {
      await bootstrapLogin(response);
    } catch {
      respond(response, 502, "Coordiation Analytics could not start an Umami session.");
    }
    return;
  }

  proxyRequest(request, response);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Coordiation Analytics login bridge listening on ${port}`);
});
