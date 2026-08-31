# Coordiation architecture

## System overview

Coordiation separates product contracts, build-time CSS, owned UI source, machine-readable catalogs, and documentation so each surface can evolve without adding a frontend runtime dependency.

```text
User intent
   │
   ▼
Guided interview ──► Specification ──► PRD ──► UX ──► Prototype
                                                   │
                                                   ▼
Machine-readable contract ──► Development ──► QA ──► Release ──► Production
          │                         │          │
          ├── context packs         ├── static CSS
          ├── component registry    ├── owned component/theme source
          ├── icon registry         └── build evidence
          └── capability registry
```

## Package layers

### Compiler layer

`@coordiation/css` owns source detection, candidate parsing, utility/variant resolution, diagnostics, CSS-first theme variables, preflight, compatibility metadata, and static CSS emission.

Properties:

- no browser runtime for the CSS engine;
- literal `co-*` candidate detection;
- deterministic ordering and diagnostics;
- CSS-first theme, utility, and variant extension points;
- Source Map v3, incremental cache, and target-aware toolchain metadata.

### Integration layer

- `@coordiation/vite` provides virtual CSS, root-aware scanning, dependency watching, HMR, cache reuse, and source maps.
- `@coordiation/postcss` integrates the compiler with PostCSS 8 pipelines.
- the `coordiation-css` binary provides standalone build and watch workflows.
- `@coordiation/oxide` optionally accelerates scanning while exposing the actual engine and fallback reason.

### Authoring and migration layer

- `@coordiation/language-server` exposes completion, hover, diagnostics, and candidate inspection.
- `@coordiation/formatter` applies canonical ordering while preserving unknown application classes and dynamic expressions.
- `@coordiation/upgrade` creates reviewable, versioned, idempotent migration plans and codemods.

### Open-code design layer

- `@coordiation/ui` versions the official component catalog.
- `@coordiation/themes` versions complete application templates and section contracts.
- `@coordiation/icons` exposes literal per-icon imports and accessible rendering.
- `@coordiation/cli` resolves registry records, validates target paths, prevents accidental overwrites, and writes source into the application.

Installed components and themes become application-owned source. There is no required Coordiation UI runtime in the browser.

### Agent and lifecycle layer

`@coordiation/agent` and `@coordiation/cli` provide:

- compact project manifests;
- task-specific context packs;
- guided interview templates;
- Specification and PRD schemas;
- UX, prototype, development, QA, release, and production artifacts;
- named gates, evidence references, revisions, and approval state.

## Website surfaces

The public website is a Vinext application using React and Next-compatible routing.

| Directory | Responsibility |
| --- | --- |
| `app/docs` | Installation, utility, core, tooling, migration, and release documentation |
| `app/cookbook` | Complete section-by-section page recipe with live previews |
| `app/components` | Interactive component catalog |
| `app/icons` | Searchable visual icon browser |
| `app/themes` | Theme showcase and live application previews |
| `app/api` | Machine-readable capability, utility, component, and theme interfaces |
| `app/release-check` | Human-readable release evidence |
| `public` | Registries, SVG assets, social assets, and `llms.txt` |

## Source-to-CSS flow

```text
Configured source roots
        │
        ▼
Plain-text/framework scanner
        │ literal candidates + diagnostics
        ▼
Candidate parser
        │ utility + variant AST
        ▼
Registry/theme/plugin resolution
        │ ordered declarations
        ▼
Toolchain transforms
        │ imports + nesting + prefixing + optional minification
        ▼
Static layered CSS + source map + JSON-safe build manifest
```

Dynamic string construction is intentionally not guessed. A source expression such as `` `co-bg-${color}` `` must be replaced with complete mapped strings or a finite safelist.

## Registry contracts

Registries are versioned API surfaces, not merely data used by the website.

### Capability registry

Answers whether behavior is `complete`, `partial`, or `planned`. Agents must not present a planned capability as working code.

### Utility registry

Defines families, static utilities, canonical negative syntax, animations, status, documentation, and compiler version.

### Component registry

Defines exact names, categories, source files, dependencies, install endpoints, usage, client/server boundaries, stability, and accessibility requirements.

### Icon registry

Defines collection identity, icon name, export, literal import path, categories, provenance, and license requirements. Names are not assumed to be unique across collections.

### Theme registry

Defines theme names, source files, assets, components, sections, namespace, utilities, accessibility contract, and recommended customization order.

## Invariants

Changes should preserve these properties:

1. CSS generation remains build-time and runtime-free.
2. Utility candidates are literal and use the configured prefix.
3. Capability claims are registry-backed.
4. Components and themes remain inspectable, editable source.
5. Icon imports remain literal and tree-shakeable.
6. Accessibility and responsive requirements are explicit contracts.
7. Lifecycle gates reference current-revision evidence.
8. Release promotion remains an explicit human decision.

## Deployment model

The repository builds with `pnpm build` and runs the Vinext server from `dist`. The production container uses Node 24, exposes port 3000 internally, and includes an HTTP health check. The Compose configuration joins the external `proxy_public` network and is routed by Traefik for `coordiation.com`.

Deployment configuration is source-controlled, but production execution requires maintainer authorization and infrastructure access.

