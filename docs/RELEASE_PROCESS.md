# Release process

Coordiation uses a coordinated release train for packages, registries, documentation, and production evidence.

## Release channels

- `next`: active release candidates such as `1.0.0-rc.1`.
- `latest`: the approved stable line. It must not be moved to an RC implicitly.

All `@coordiation/*` packages in a project should use the same release channel unless a documented compatibility matrix explicitly allows otherwise.

## Release artifacts

A release is not only an npm version. It includes:

- compiler and integration packages;
- agent and CLI contracts;
- component, icon, theme, utility, and capability registries;
- install endpoints and open-code payloads;
- framework installation guides;
- migration and compatibility documentation;
- release notes and release-check evidence;
- production website and machine-readable endpoints.

## Candidate checklist

### Source and behavior

- [ ] Unit, integration, and end-to-end suites pass.
- [ ] Compiler diagnostics reject unsupported or unsafe candidates.
- [ ] Formatting and upgrade plans are deterministic and idempotent.
- [ ] Native scanner reports the actual engine and fallback reason.
- [ ] Components preserve documented accessibility behavior.
- [ ] Themes pass responsive, keyboard, contrast, and reduced-motion checks.

### Registries

- [ ] Utility counts and family statuses match compiler behavior.
- [ ] Component source, usage, boundary, dependencies, and accessibility data are current.
- [ ] Icon names, exports, literal imports, provenance, and licenses are current.
- [ ] Theme files, assets, components, sections, namespaces, and commands are current.
- [ ] Public registry copies and API responses agree.

### Packages

- [ ] All package versions are coordinated.
- [ ] Every tarball contains only intended files.
- [ ] A clean project can install and import every public entry point.
- [ ] Package metadata, exports, binaries, engines, and licenses are correct.
- [ ] Native artifacts are signed and verified when required.
- [ ] Publication uses the intended npm dist-tag.

### Documentation

- [ ] Quick starts use the correct release tag.
- [ ] Framework guides build from a clean installation.
- [ ] `llms.txt` and AI-agent contracts match the registries.
- [ ] Migration and compatibility guidance names breaking changes.
- [ ] Code blocks do not overflow at 320px.
- [ ] Release notes state whether the version is stable or prerelease.

### Production

- [ ] The production build succeeds from a clean checkout.
- [ ] The deployed revision equals the approved commit.
- [ ] Container/application health is healthy.
- [ ] Primary pages, docs, registries, robots, sitemap, and 404 respond correctly.
- [ ] SEO metadata and search verification remain intact.
- [ ] No unrelated hosting target is updated.

## Stable 1.0 promotion

The release candidate may move to stable only when:

1. declared Linux, macOS, and Windows workflows pass on supported Node versions;
2. native artifacts are signed and verified;
3. no release-blocking feedback remains open;
4. compatibility and migration evidence is current;
5. the maintainer explicitly approves promotion;
6. npm `latest`, release notes, registries, documentation, and production are updated as one coordinated release.

Feature count alone is not stable-release evidence.

## Rollback principles

- Preserve the last known-good package version and production image.
- Do not delete audit evidence during rollback.
- Revert the smallest affected surface.
- Restore registry/package agreement before republishing.
- Publish a corrective version rather than mutating an existing npm tarball.
- Document user impact, workaround, and migration path.

