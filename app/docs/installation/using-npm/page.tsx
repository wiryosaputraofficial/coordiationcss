import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/installation/using-npm", ...{
  title: "Install Coordiation from npm",
  description: "Install every public Coordiation package from npm and choose the packages required by your project.",
} });

const packages = [
  ["@coordiation/css", "Compiler, scanner, utility registry, preflight, and the coordiation-css binary."],
  ["@coordiation/vite", "Recommended Vite integration with virtual CSS and hot updates."],
  ["@coordiation/postcss", "PostCSS 8 adapter for existing CSS pipelines."],
  ["@coordiation/cli", "Open-code installer for Coordiation components and themes."],
  ["@coordiation/agent", "Compact project manifests and task-specific context packs for AI agents."],
  ["@coordiation/ui", "Versioned snapshots of the official component registry."],
  ["@coordiation/icons", "Solar Linear and Iconsax Line Oval icon components."],
  ["@coordiation/themes", "Versioned application-theme registry and complete template payloads."],
  ["@coordiation/formatter", "Canonical class sorting for source files and automation."],
  ["@coordiation/language-server", "Completion, hover, diagnostics, and editor inspection."],
  ["@coordiation/upgrade", "Safe migration plans and source codemods."],
  ["@coordiation/oxide", "Optional native scanner with a portable JavaScript fallback."],
] as const;

export default function UsingNpmPage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Installation</span><b>/</b><span>Using npm</span></div>
      <p className="docs-overline">INSTALLATION · PUBLIC NPM PACKAGES</p>
      <h1>Install from npm</h1>
      <p className="docs-lead">Every released Coordiation package is public under the <code>@coordiation</code> scope. Install only the compiler and integrations your project needs.</p>
      <div className="docs-note"><span>✓</span><p>Release candidate <code>1.0.0-rc.1</code> is available through the <code>next</code> tag. The <code>latest</code> tag remains on 0.1.0, or 0.2.0 for the CLI, until stable promotion is approved.</p></div>

      <section className="guide-step" id="vite-quick-start"><div className="step-number">01</div><div><h2>Start with the release candidate</h2><p>For a Vite project, install the compiler and adapter from the coordinated <code>next</code> release train.</p><CodeBlock title="Terminal" code="npm install -D @coordiation/css@next @coordiation/vite@next vite" /><p>Continue with the complete configuration, CSS entry, scanning, and hot-update guide.</p><div className="inline-links"><Link href="/docs/releases/1.0.0-rc.1">Read the RC notes →</Link><Link href="/docs/installation/using-vite">Open the Vite guide →</Link></div></div></section>

      <section className="guide-step" id="package-catalog"><div className="step-number">02</div><div><h2>Choose additional packages</h2><p>Packages are independently versioned so applications and AI agents can declare an exact, auditable toolchain.</p><div className="npm-package-grid">{packages.map(([name, description]) => <article key={name}><code>{name}</code><p>{description}</p></article>)}</div></div></section>

      <section className="guide-step" id="design-assets"><div className="step-number">03</div><div><h2>Add icons, themes, or registry source</h2><p>Install the matching RC registry snapshots when your build or AI workflow needs the source locally.</p><CodeBlock title="Terminal" code={`npm install @coordiation/icons@next @coordiation/themes@next @coordiation/ui@next`} /><p>The recommended open-code workflow uses the CLI to copy a selected component or theme into your repository.</p><CodeBlock title="Terminal" code={`npx @coordiation/cli@next add component button
npx @coordiation/cli@next add theme editorial-advisor`} /></div></section>

      <section className="guide-step" id="standalone-build"><div className="step-number">04</div><div><h2>Build without Vite</h2><p>The compiler package includes a standalone binary. Use the PostCSS adapter when an existing pipeline already owns CSS processing.</p><CodeBlock title="Terminal" code={`npx coordiation-css \\
  --input src/coordiation.css \\
  --output dist/coordiation.css \\
  --content src`} /><div className="inline-links"><Link href="/docs/installation/using-cli">Open the CLI guide →</Link><Link href="/docs/installation/using-postcss">Open the PostCSS guide →</Link></div></div></section>

      <section className="guide-step" id="agent-context"><div className="step-number">05</div><div><h2>Prepare compact context for AI agents</h2><p>Install the public agent package and CLI to create a small, deterministic manifest instead of sending the entire repository to an agent.</p><CodeBlock title="Terminal" code={`npm install -D @coordiation/agent@next @coordiation/cli@next

npx @coordiation/cli@next inspect --write
npx @coordiation/cli@next context pricing`} /><div className="inline-links"><Link href="/docs/tooling/agent-context">Open the AI agent context guide →</Link></div></div></section>

      <section className="family-caveats" id="ai-contract"><div><p className="docs-overline">AI INSTALLATION CONTRACT</p><h2>Keep dependencies traceable</h2><p>Agents should select packages from the published catalog instead of inventing package names or copying registry payloads manually.</p></div><ul><li>Use the exact <code>@coordiation/*</code> package names listed above.</li><li>Read <code>/llms.txt</code> and <code>/api/capabilities</code> before generating framework code.</li><li>Use literal <code>co-*</code> classes so scanning and diagnostics remain reliable.</li><li>Prefer the CLI for open-code components and themes.</li><li>Pin versions in CI and automated agent environments.</li></ul></section>

      <div className="docs-next split"><Link href="/docs"><span>Previous</span><b>← Installation</b></Link><Link href="/docs/installation/using-vite"><span>Next</span><b>Using Vite →</b></Link></div>
    </article>
  );
}
