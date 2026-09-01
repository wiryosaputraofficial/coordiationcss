import http from "node:http";

const port = Number(process.env.PORT || 3000);
const upstream = new URL(process.env.UMAMI_URL || "http://umami:3000");
const username = process.env.UMAMI_USERNAME || "admin";
const password = process.env.UMAMI_ADMIN_PASSWORD;
const allowedGithubUser = (process.env.ALLOWED_GITHUB_USER || "").toLowerCase();

if (!password || !allowedGithubUser) {
  throw new Error("UMAMI_ADMIN_PASSWORD and ALLOWED_GITHUB_USER are required");
}

function respond(response, status, body, headers = {}) {
  response.writeHead(status, {
    "cache-control": "no-store",
    "content-type": "text/plain; charset=utf-8",
    ...headers,
  });
  response.end(body);
}

async function bootstrapLogin(request, response) {
  const githubUser = String(request.headers["x-forwarded-user"] || "").toLowerCase();

  if (githubUser !== allowedGithubUser) {
    respond(response, 403, "This GitHub account is not allowed to access Coordiation Analytics.");
    return;
  }

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

  if (url.pathname === "/logout") {
    const returnUrl = encodeURIComponent("https://analytics.coordiation.com/");
    respond(response, 302, "Signing out.", { location: `/oauth2/sign_out?rd=${returnUrl}` });
    return;
  }

  if (url.pathname === "/login") {
    try {
      await bootstrapLogin(request, response);
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
