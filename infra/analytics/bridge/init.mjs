const umamiUrl = process.env.UMAMI_URL || "http://umami:3000";
const username = process.env.UMAMI_USERNAME || "admin";
const password = process.env.UMAMI_ADMIN_PASSWORD;
const websiteId = process.env.UMAMI_WEBSITE_ID;
const websiteName = process.env.UMAMI_WEBSITE_NAME || "Coordiation";
const websiteDomain = process.env.UMAMI_WEBSITE_DOMAIN || "coordiation.com";

if (!password || !websiteId) {
  throw new Error("UMAMI_ADMIN_PASSWORD and UMAMI_WEBSITE_ID are required");
}

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function request(path, options = {}) {
  const response = await fetch(`${umamiUrl}${path}`, options);
  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  return { response, data };
}

async function waitForUmami() {
  for (let attempt = 1; attempt <= 60; attempt += 1) {
    try {
      const { response } = await request("/api/heartbeat");
      if (response.ok) return;
    } catch {
      // Umami is still starting.
    }
    await sleep(2000);
  }

  throw new Error("Umami did not become ready");
}

async function login(candidatePassword) {
  const { response, data } = await request("/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password: candidatePassword }),
  });

  return response.ok && data?.token ? data.token : null;
}

await waitForUmami();

let token = await login(password);

if (!token) {
  const bootstrapToken = await login("umami");
  if (!bootstrapToken) {
    throw new Error("Unable to authenticate the Umami administrator");
  }

  const { response } = await request("/api/me/password", {
    method: "POST",
    headers: {
      authorization: `Bearer ${bootstrapToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ currentPassword: "umami", newPassword: password }),
  });

  if (!response.ok) {
    throw new Error("Unable to replace the default Umami administrator password");
  }

  token = await login(password);
}

if (!token) {
  throw new Error("Unable to authenticate with the configured administrator password");
}

const { response: listResponse, data: listData } = await request("/api/websites?pageSize=100", {
  headers: { authorization: `Bearer ${token}` },
});

if (!listResponse.ok) {
  throw new Error("Unable to list Umami websites");
}

const websites = Array.isArray(listData) ? listData : listData?.data || [];

if (!websites.some((website) => website.id === websiteId)) {
  const { response } = await request("/api/websites", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ id: websiteId, name: websiteName, domain: websiteDomain }),
  });

  if (!response.ok) {
    throw new Error("Unable to create the Coordiation website in Umami");
  }
}

console.log("Umami administrator and Coordiation website are ready");
