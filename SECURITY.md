# Security policy

## Reporting a vulnerability

Do not open a public GitHub issue for a suspected vulnerability.

Email [wiryosaputra@coordiation.com](mailto:wiryosaputra@coordiation.com) with:

- the affected package, route, component, or registry;
- the installed version and release channel;
- a minimal reproduction or proof of concept;
- the security impact;
- any known workaround;
- whether public disclosure has already occurred.

Please avoid accessing data that does not belong to you, disrupting production, or publishing exploit details before a fix is available.

## Supported versions

Coordiation is currently in a release-candidate phase. Security fixes target the current public release line and may require upgrading to the newest prerelease.

| Version | Security fixes |
| --- | --- |
| `1.0.0-rc.x` via npm `next` | Supported |
| Older prereleases | Upgrade required |
| Unreleased development branches | Not supported for production use |

The npm `latest` channel remains separate until stable 1.0 is approved. Always confirm the installed version rather than assuming a dist-tag points to the release candidate.

## Scope

Reports may cover:

- compiler parsing, source scanning, arbitrary-value validation, and generated CSS;
- CLI path handling, overwrite protection, registry resolution, and codemods;
- package supply chain, tarball contents, native artifacts, and installation scripts;
- website routes, registry APIs, live previews, and deployment configuration;
- open-code component accessibility or unsafe DOM behavior;
- AI lifecycle contracts where a bypass can incorrectly advance a protected gate.

Theme content mistakes, visual differences, or documentation typos are normally regular bugs unless they create a concrete security impact.

## Secrets and sensitive data

- Never commit npm tokens, SSH keys, cookies, `.env` files, deployment credentials, or private user data.
- Machine-readable agent manifests must not include secrets or full environment values.
- Security evidence should use redacted logs and minimal reproductions.
- Rotate any credential immediately if it is exposed, then report the incident privately.

## Disclosure process

The maintainer will confirm receipt, reproduce and assess the issue, prepare a fix and advisory when applicable, and coordinate disclosure. Timing depends on severity and the affected release surface.

