# Coordiation Analytics

Self-hosted Umami for `coordiation.com`, published at `https://analytics.coordiation.com`.

- Public collection is limited to `/script.js`, `/api/send`, and `/api/heartbeat`.
- The dashboard is protected by GitHub OAuth.
- OAuth access is restricted to the configured GitHub username.
- OAuth requests no additional scopes and reads only the authenticated account's
  public profile to verify its username.
- A small login bridge exchanges the approved GitHub session for an Umami session, so there is no second password screen.
- Umami's own telemetry is disabled.

## GitHub OAuth application

Create an OAuth application with these values:

- Homepage URL: `https://analytics.coordiation.com`
- Authorization callback URL: `https://analytics.coordiation.com/oauth2/callback`

Copy `.env.example` to `.env`, replace every secret, then deploy with Docker Compose. Keep `.env` readable only by the server administrator.

The initializer replaces Umami's default administrator password and creates the Coordiation website using the fixed public website ID. It is safe to run again during upgrades.
