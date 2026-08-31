# Coordiation

<p align="center">
  <img src="public/coordiation-logo.png" alt="Coordiation logo" width="88" />
</p>

<p align="center">
  <strong>An AI-readable, utility-first frontend framework for taking products from specification to production.</strong>
</p>

<p align="center">
  <a href="https://coordiation.com/">Website</a> ·
  <a href="https://coordiation.com/docs">Documentation</a> ·
  <a href="https://coordiation.com/cookbook">Cookbook</a> ·
  <a href="https://coordiation.com/components">Components</a> ·
  <a href="https://coordiation.com/themes">Themes</a> ·
  <a href="https://coordiation.com/icons">Icons</a> ·
  <a href="https://coordiation.com/release-check">Release status</a>
</p>

> [!IMPORTANT]
> Coordiation `1.0.0-rc.1` is a release candidate. Install the coordinated release train with the `next` npm tag. The `latest` tag is intentionally not promoted to 1.0 until the stable-release gates pass.

## Why Coordiation exists

Coordiation helps humans and AI agents build useful products without repeatedly reconstructing the same frontend foundations. It combines a zero-runtime CSS compiler, open-code components, installable application themes, two icon collections, machine-readable registries, and lifecycle contracts in one coordinated system.

The intended delivery flow is:

```text
Request → guided questions → Specification → PRD → UX → Prototype
        → Development → QA → Release → Production
```

Each phase produces inspectable artifacts. Requirements become contracts, decisions remain traceable, and named gates require evidence before work advances.

## Current release snapshot

| Surface | Included in `1.0.0-rc.1` |
| --- | ---: |
| Static utilities | 586 |
| Complete utility families | 15 |
| Tracked capabilities | 48 complete |
| Open-code React components | 64 |
| Icons | 2,165 |
| Icon collections | Solar Linear (1,246), Iconsax Line Oval (919) |
| Installable themes | 7 |
| Public npm packages | 12 |
| Browser runtime for CSS engine | 0 |

Registry counts are generated from the versioned manifests in [`public/`](public/).

## Core principles

- **AI-readable by design.** Capabilities, utilities, components, icons, themes, context packs, and delivery gates have machine-readable contracts.
- **Runtime-free CSS.** The compiler scans literal candidates and emits static CSS; it adds no styling runtime to the browser.
- **Open-code UI.** Components and themes are copied into the application, reviewed, and edited as owned source.
- **Literal and deterministic.** The `co-` prefix makes framework utilities explicit and discoverable to scanners, editors, CI, and agents.
- **Framework-friendly.** Official guides cover Vite, React, Next.js, Astro, SvelteKit, Laravel, PHP, WordPress, PostCSS, and plain HTML/CSS.
- **Evidence-driven releases.** Compatibility, tests, registry validation, tarball inspection, accessibility, and production checks define readiness.

## Quick start with Vite

### 1. Install the release candidate

```bash
npm install -D @coordiation/css@next @coordiation/vite@next vite
```

### 2. Register the plugin

```js
// vite.config.js
import { defineConfig } from "vite";
import coordiation from "@coordiation/vite";

export default defineConfig({
  plugins: [
    coordiation({
      content: ["src"],
      cssFile: "src/coordiation.css",
      sourceMap: true,
      toolchain: {
        minify: process.env.NODE_ENV === "production",
      },
    }),
  ],
});
```

### 3. Create the CSS entry

```css
/* src/coordiation.css */
@coordiation;

@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
  --co-color-brand-600: oklch(54.6% 0.245 262.881);
}
```

### 4. Import the generated stylesheet once

```js
// src/main.js
import "virtual:coordiation.css";
```

### 5. Use literal utilities

```html
<main class="co-grid co-min-h-screen co-place-items-center co-bg-white co-p-8">
  <section class="co-max-w-2xl co-text-center">
    <h1 class="co-text-5xl co-font-bold co-tracking-tight">
      Build something useful.
    </h1>
    <p class="co-mt-4 co-text-lg co-text-neutral-600">
      Static CSS, open code, and exact contracts for people and AI agents.
    </p>
  </section>
</main>
```

See the [complete Vite guide](https://coordiation.com/docs/installation/using-vite) for scanning, theme files, HMR, source maps, and troubleshooting.

## Install components, themes, and icons

### Open-code component

```bash
npx @coordiation/cli@next add component button
```

```tsx
import { Button } from "@/components/ui/button";

export function SaveAction() {
  return <Button variant="outline">Save changes</Button>;
}
```

Browse all [64 components](https://coordiation.com/components) or inspect [`component-registry.json`](https://coordiation.com/component-registry.json).

### Complete application theme

```bash
npx @coordiation/cli@next add theme editorial-advisor
```

Available themes:

- `editorial-advisor`
- `quiet-journal`
- `finance-dashboard`
- `industrial-forge`
- `mono-portfolio`
- `noir-habitat`
- `studio-index`

Every theme includes installable source, a live application preview, declared assets, section contracts, a namespace, and customization guidance. Browse the [theme showcase](https://coordiation.com/themes) or inspect [`theme-registry.json`](https://coordiation.com/theme-registry.json).

### Tree-shakeable icon

```bash
npm install @coordiation/icons@next
```

```js
import { HomeLinearIcon } from "@coordiation/icons/linear/home";
import { renderIcon } from "@coordiation/icons";

const icon = renderIcon(HomeLinearIcon, {
  size: 24,
  label: "Home",
});
```

Do not guess icon imports. Select the exact `collectionId`, name, export, and literal import path from the [icon registry](https://coordiation.com/icon-registry.json) or use the [visual icon browser](https://coordiation.com/icons).

## Public packages

| Package | Purpose |
| --- | --- |
| `@coordiation/css` | Compiler, scanner, utility registry, compatibility policy, preflight, and standalone binary |
| `@coordiation/vite` | Vite integration with virtual CSS, scanning, caching, and hot updates |
| `@coordiation/postcss` | PostCSS 8 adapter for established CSS pipelines |
| `@coordiation/cli` | Component/theme installer and Specification-to-Production command surface |
| `@coordiation/agent` | Lifecycle schemas, project manifests, context packs, gates, and evidence contracts |
| `@coordiation/ui` | Versioned snapshots of the official open-code component registry |
| `@coordiation/icons` | Solar Linear and Iconsax Line Oval icons with accessible rendering |
| `@coordiation/themes` | Versioned theme registry and complete installable template payloads |
| `@coordiation/language-server` | Completion, hover, diagnostics, and project-aware candidate inspection |
| `@coordiation/formatter` | Canonical ordering for literal Coordiation utility classes |
| `@coordiation/upgrade` | Versioned compatibility plans and safe source codemods |
| `@coordiation/oxide` | Optional native candidate scanner with a portable JavaScript fallback |

Keep packages in one project on the same release channel:

```bash
npm install @coordiation/css@next @coordiation/icons@next
npm install -D @coordiation/cli@next @coordiation/vite@next @coordiation/agent@next
```

## Framework installation guides

| Environment | Guide |
| --- | --- |
| npm package selection | [Using npm](https://coordiation.com/docs/installation/using-npm) |
| Vite | [Using Vite](https://coordiation.com/docs/installation/using-vite) |
| React | [Using React](https://coordiation.com/docs/installation/using-react) |
| Next.js | [Using Next.js](https://coordiation.com/docs/installation/using-nextjs) |
| Astro | [Using Astro](https://coordiation.com/docs/installation/using-astro) |
| SvelteKit | [Using SvelteKit](https://coordiation.com/docs/installation/using-svelte) |
| Laravel | [Using Laravel](https://coordiation.com/docs/installation/using-laravel) |
| PHP | [Using PHP](https://coordiation.com/docs/installation/using-php) |
| WordPress | [Using WordPress](https://coordiation.com/docs/installation/using-wordpress) |
| HTML + CSS | [Using HTML and CSS](https://coordiation.com/docs/installation/using-html-css) |
| PostCSS | [Using PostCSS](https://coordiation.com/docs/installation/using-postcss) |
| Standalone compiler | [Using the CLI](https://coordiation.com/docs/installation/using-cli) |

## AI-agent workflow

Install the agent contract and CLI:

```bash
npm install -D @coordiation/agent@next @coordiation/cli@next
```

Create a compact, commit-friendly project manifest:

```bash
npx @coordiation/cli@next inspect
npx @coordiation/cli@next inspect --write
```

Request only the context needed for the current task:

```bash
npx @coordiation/cli@next context pricing --json
```

Available context packs are `page`, `navigation`, `form`, `dashboard`, `pricing`, `component`, and `theme`.

For lifecycle-driven work:

```bash
npx @coordiation/cli@next init --name "Customer portal"
npx @coordiation/cli@next templates
npx @coordiation/cli@next interview login
npx @coordiation/cli@next status
```

The guided interview must make questions answerable: each question should explain why it matters, provide a concrete example, offer a recommended default, and allow the user to confirm or change it. The accepted answers become contracts for the Specification and PRD rather than disposable chat context.

Read the full [AI-agent guide](docs/AI_AGENT_GUIDE.md) and the [online agent-context documentation](https://coordiation.com/docs/tooling/agent-context).

## Machine-readable interfaces

Agents and tools should inspect exact data instead of inferring support from examples.

| Interface | URL |
| --- | --- |
| Concise agent instructions | [`/llms.txt`](https://coordiation.com/llms.txt) |
| Capability manifest | [`/api/capabilities`](https://coordiation.com/api/capabilities) |
| Utility registry | [`/utility-registry.json`](https://coordiation.com/utility-registry.json) |
| Component registry | [`/component-registry.json`](https://coordiation.com/component-registry.json) |
| Component API | [`/api/components`](https://coordiation.com/api/components) |
| Icon registry | [`/icon-registry.json`](https://coordiation.com/icon-registry.json) |
| Theme registry | [`/theme-registry.json`](https://coordiation.com/theme-registry.json) |
| Theme API | [`/api/themes`](https://coordiation.com/api/themes) |

Reliability rules for agents:

1. Read `llms.txt` and the compact project manifest first.
2. Check capability status before emitting framework-specific code.
3. Use only complete capabilities unless a partial capability explicitly covers the requested case.
4. Keep complete `co-*` candidates literal; never assemble them dynamically.
5. Prefer theme tokens over one-off arbitrary values.
6. Select components, themes, and icons by exact registry records.
7. Preserve accessibility, responsive, reduced-motion, attribution, and copyright contracts.
8. Run the application's real production build and report failed checks.

## Utility syntax at a glance

```text
co-flex                         base utility
md:co-grid-cols-3               responsive variant
hover:co-bg-black               state variant
dark:md:hover:co-text-white     stacked variants
!co-hidden                      important utility
-co-mt-4                       negative utility
co-w-[42rem]                    arbitrary value
co-[mask-type:luminance]        arbitrary property
aria-expanded:co-block          ARIA variant
data-[state=open]:co-block      data variant
motion-reduce:co-animate-none   media preference
@md/sidebar:co-grid-cols-2      named container query
```

The canonical negative syntax places `-` before the prefix: `-co-mt-4`.

## Cookbook

The [one-page website cookbook](https://coordiation.com/cookbook) builds a complete page section by section. Header, Hero, Proof, Features, Workflow, Testimonial, Pricing, FAQ, CTA, and Footer each include:

- a live responsive preview;
- the section's design and content contract;
- accessible semantic markup;
- literal Coordiation utilities;
- reusable icons and controls;
- a copyable implementation;
- responsive and QA guidance.

## Repository map

This repository hosts the public Coordiation website, documentation, catalogs, live previews, and machine-readable registries.

```text
app/
├── api/                  registry and capability endpoints
├── components/           interactive component catalog
├── cookbook/             section-by-section implementation cookbook
├── docs/                 installation, utilities, tooling, release guides
├── icons/                visual icon browser
├── themes/               theme catalog and live application previews
└── release-check/        human-readable release evidence
public/
├── icons/                versioned public SVG assets
├── *-registry.json       machine-readable framework registries
└── llms.txt              compact AI-agent guidance
```

For implementation boundaries and data flow, see [Architecture](docs/ARCHITECTURE.md).

## Develop this documentation site

Requirements:

- Node.js `>=22.13.0` (the production image uses Node 24)
- pnpm `10.14.0` or a compatible pnpm 10 release

```bash
git clone https://github.com/wiryosaputraofficial/coordiationcss.git
cd coordiationcss
pnpm install --frozen-lockfile
pnpm dev
```

Quality checks:

```bash
pnpm lint
pnpm build
```

Local production server:

```bash
pnpm build
pnpm start
```

Container deployment is defined by [`Dockerfile`](Dockerfile) and [`compose.production.yaml`](compose.production.yaml). Do not publish a release or deploy production from an unreviewed branch.

## Release policy

`1.0.0-rc.1` has passed the coordinated RC test, registry, tarball, installation, and package-publication checks described in the [release notes](https://coordiation.com/docs/releases/1.0.0-rc.1). Stable 1.0 additionally requires:

- supported Linux, macOS, and Windows workflows passing on declared Node versions;
- signed and verified native artifacts;
- no open release-blocking feedback;
- accessibility, responsive, package, and documentation evidence remaining current;
- explicit approval before moving npm from `next` to `latest`.

See [Release process](docs/RELEASE_PROCESS.md) and the live [release check](https://coordiation.com/release-check).

## Contributing and security

- Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.
- Use the issue templates for reproducible bugs and bounded feature proposals.
- Report vulnerabilities privately using [SECURITY.md](SECURITY.md).
- Keep changes compatible with the [AI-agent contract](docs/AI_AGENT_GUIDE.md).

## Licensing and attribution

Package code and icon artwork may have different licenses. Consult the license files shipped by each npm package before redistribution.

- Coordiation icon wrapper code is documented as MIT licensed.
- Solar icon artwork is by 480 Design and uses CC BY 4.0; attribution is required.
- Keep third-party license and attribution files when redistributing icon assets.
- Use only original or properly licensed media in themes.

This repository does not use the presence of a screenshot or registry record as permission to redistribute third-party artwork.

## Creator

Coordiation is created by **Wiryo Saputra** to help people and AI agents spend less time rebuilding foundations and more time creating products that are useful to many people.

Contact: [wiryosaputra@coordiation.com](mailto:wiryosaputra@coordiation.com)

