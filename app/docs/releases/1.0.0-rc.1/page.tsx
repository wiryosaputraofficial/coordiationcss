import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({
  path: "/docs/releases/1.0.0-rc.1",
  title: "Coordiation 1.0.0-rc.1 release notes",
  description: "Release notes, package catalog, validation results, and installation instructions for Coordiation 1.0.0-rc.1.",
});

const packages = [
  ["@coordiation/agent", "Lifecycle contracts, schemas, context packs, gates, evidence, and adapters."],
  ["@coordiation/cli", "Registry installation and the complete Specification-to-Production command surface."],
  ["@coordiation/css", "Runtime-free utility compiler, scanner, registry, compatibility policy, and preflight."],
  ["@coordiation/icons", "2,165 tree-shakeable Solar Linear and Iconsax Line Oval icons."],
  ["@coordiation/ui", "Open-code component registry with accessible, editable React source."],
  ["@coordiation/themes", "Seven complete open-code application themes and their machine-readable contracts."],
  ["@coordiation/vite", "Vite integration with virtual CSS, scanning, and hot updates."],
  ["@coordiation/postcss", "PostCSS 8 integration for established CSS pipelines."],
  ["@coordiation/language-server", "Completion, hover, diagnostics, and AI-readable editor inspection."],
  ["@coordiation/formatter", "Canonical ordering for literal Coordiation utility classes."],
  ["@coordiation/upgrade", "Versioned compatibility plans and safe source codemods."],
  ["@coordiation/oxide", "Optional native candidate scanning with a portable JavaScript fallback."],
] as const;

export default function ReleaseCandidatePage() {
  return <article className="docs-article vite-guide">
    <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Releases</span><b>/</b><span>1.0.0-rc.1</span></div>
    <p className="docs-overline">RELEASE CANDIDATE · PUBLISHED</p>
    <h1>Coordiation 1.0.0-rc.1</h1>
    <p className="docs-lead">The first coordinated release candidate brings the compiler, design assets, open-code registries, editor tooling, and AI-native product lifecycle into one exact twelve-package release train.</p>
    <div className="docs-note"><span>✓</span><p>All packages are public on npm with the <code>next</code> tag. The <code>latest</code> tag remains unchanged until the stable release is explicitly approved.</p></div>

    <section className="guide-step" id="install"><div className="step-number">01</div><div><h2>Install the candidate</h2><CodeBlock title="Terminal" code={`npm install @coordiation/css@next
npm install -D @coordiation/cli@next @coordiation/vite@next`} /><p>Use <code>@next</code> for every Coordiation package in the same project. Exact internal versions keep the compiler, integrations, schemas, and registries deterministic.</p></div></section>

    <section className="guide-step" id="lifecycle"><div className="step-number">02</div><div><h2>Deliver from specification to production</h2><p>The agent package and CLI now connect guided interviews, Specification, PRD, UX, prototype, development, QA, release, and production through versioned artifacts. Named gates require current-revision evidence and human approval before work advances.</p><CodeBlock title="Terminal" code={`npx @coordiation/cli@next init --name "Customer portal"
npx @coordiation/cli@next templates
npx @coordiation/cli@next interview login
npx @coordiation/cli@next status`} /><div className="inline-links"><Link href="/docs/tooling/agent-context">Open the AI agent guide →</Link></div></div></section>

    <section className="guide-step" id="packages"><div className="step-number">03</div><div><h2>Twelve public packages</h2><p>Every entry point has a focused role while sharing the same release version.</p><div className="npm-package-grid">{packages.map(([name, description]) => <article key={name}><code>{name}</code><p>{description}</p></article>)}</div></div></section>

    <section className="guide-step" id="validation"><div className="step-number">04</div><div><h2>Validated before publication</h2><p>The candidate passed the complete 261-test suite, package syntax and generated-registry checks, all twelve tarball audits, and a clean installation that imported every runtime entry point. npm was then checked package by package to confirm <code>next</code> and preserve <code>latest</code>.</p></div></section>

    <section className="family-caveats" id="stable-boundary"><div><p className="docs-overline">STABLE BOUNDARY</p><h2>RC is not stable 1.0 yet</h2><p>Promotion stays evidence-driven instead of being inferred from feature count.</p></div><ul><li>The supported Linux, macOS, and Windows workflow must pass on declared Node versions.</li><li>Native artifacts must be signed and verified.</li><li>Release-candidate feedback must have no open blocker.</li><li>Promotion to the npm <code>latest</code> tag requires explicit approval.</li></ul></section>

    <div className="docs-next split"><Link href="/release-check"><span>Evidence</span><b>← Release Check</b></Link><Link href="/docs/migration/1.0-rc"><span>Next</span><b>Migration guide →</b></Link></div>
  </article>;
}
