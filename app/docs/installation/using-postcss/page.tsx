import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Using Coordiation CSS with PostCSS",
  description: "Install the Coordiation PostCSS 8 adapter with standard dependencies, warnings, source maps, and multi-entry safety.",
};

export default function UsingPostcssPage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Installation</span><b>/</b><span>Using PostCSS</span></div>
      <p className="docs-overline">INSTALLATION · COMPLETE ADAPTER</p>
      <h1>Using PostCSS</h1>
      <p className="docs-lead">Add Coordiation to an existing PostCSS 8 pipeline with standard dependency messages, warning channels, source-map support, and safe multi-entry processing.</p>
      <div className="docs-note"><span>✓</span><p>Only stylesheets containing a top-level <code>@coordiation</code> marker are transformed. Other CSS inputs pass through untouched, so one plugin configuration can safely serve multiple entry files.</p></div>

      <section className="guide-step" id="install-packages"><div className="step-number">01</div><div><h2>Install the packages</h2><p>Install PostCSS, the compiler, and the official adapter as development dependencies.</p><CodeBlock title="Terminal" code="pnpm add -D postcss @coordiation/css @coordiation/postcss" /></div></section>

      <section className="guide-step" id="configure-postcss"><div className="step-number">02</div><div><h2>Configure the pipeline</h2><p>Place Coordiation before prefixing or minification plugins so downstream tools receive the generated framework CSS.</p><CodeBlock title="postcss.config.mjs" code={`import coordiation from "@coordiation/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    coordiation({
      content: ["src"],
      cwd: process.cwd()
    }),
    autoprefixer()
  ]
};`} /></div></section>

      <section className="guide-step" id="css-input"><div className="step-number">03</div><div><h2>Add the framework marker</h2><p>Use one dedicated CSS entry for Coordiation and keep ordinary authored CSS beside the marker. The compiler preserves that authored CSS after the generated layers.</p><CodeBlock title="src/app.css" code={`@coordiation;

@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
}

body {
  min-height: 100vh;
}`} /></div></section>

      <section className="guide-step" id="source-dependencies"><div className="step-number">04</div><div><h2>Let the runner track sources</h2><p>Every scanned source file emits a PostCSS <code>dependency</code> message. Every source directory emits a recursive <code>dir-dependency</code>, allowing compatible runners to rebuild for edits, additions, and deletions.</p><div className="docs-callout"><strong>No custom watcher protocol</strong><p>Webpack loaders, task runners, and other PostCSS hosts can consume the standard result messages. Coordiation does not require runner-specific callbacks.</p></div></div></section>

      <section className="guide-step" id="warnings"><div className="step-number">05</div><div><h2>Use the standard warning channel</h2><p>Dynamic class construction and unsupported candidates are reported through <code>result.warn()</code>. Your runner decides how warnings are printed, collected, or promoted to errors.</p><CodeBlock title="Terminal output" code={`coordiation-css: [dynamic-candidate] Dynamic co- class construction cannot be scanned.
coordiation-css: Unsupported candidate: co-does-not-exist`} /></div></section>

      <section className="guide-step" id="source-maps"><div className="step-number">06</div><div><h2>Keep source maps in the pipeline</h2><p>The adapter uses the public asynchronous PostCSS API and leaves map generation to the runner. Continue configuring <code>from</code>, <code>to</code>, and <code>map</code> through your existing build integration.</p></div></section>

      <section className="family-concepts" id="configuration">
        <div><p className="docs-overline">CONFIGURATION</p><h2>Share the scanner contract</h2><p>The PostCSS adapter forwards the same compiler and scanner options used by Vite and the CLI.</p></div>
        <ol><li><span>01</span><p><strong>content:</strong> source files or directories; defaults to <code>[&quot;src&quot;]</code>.</p></li><li><span>02</span><p><strong>cwd:</strong> explicit project root for resolving content paths.</p></li><li><span>03</span><p><strong>include / exclude:</strong> source filters applied before extraction.</p></li><li><span>04</span><p><strong>safelist:</strong> literal candidates always included in generated CSS.</p></li><li><span>05</span><p><strong>extractors:</strong> extension-specific or global extraction hooks.</p></li><li><span>06</span><p><strong>preflight:</strong> set to <code>false</code> only when another reset owns base styles.</p></li></ol>
      </section>

      <section className="family-caveats" id="ai-contract"><div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Keep pipeline decisions auditable</h2><p>Agents can query the complete PostCSS capability before generating configuration.</p></div><ul><li>Use an ESM or CJS PostCSS config that matches the host project.</li><li>Place Coordiation before Autoprefixer, preset-env, and minifiers.</li><li>Keep <code>content</code>, filters, and safelist values literal.</li><li>Do not add custom filesystem watchers when the runner consumes standard dependency messages.</li><li>Do not place <code>@coordiation</code> in CSS entries that should remain untouched.</li></ul></section>

      <div className="docs-next split"><Link href="/docs/installation/using-vite"><span>Previous</span><b>← Using Vite</b></Link><Link href="/release-check"><span>Next</span><b>Release Check →</b></Link></div>
    </article>
  );
}
