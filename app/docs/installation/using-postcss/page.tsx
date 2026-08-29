import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
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
      <p className="docs-lead">Add Coordiation to an existing PostCSS 8 pipeline with built-in import, nesting, prefixing, and minification controls plus standard dependency messages, warning channels, source-map support, and safe multi-entry processing.</p>
      <div className="docs-note"><span>✓</span><p>Only stylesheets containing a top-level <code>@coordiation</code> marker are transformed. Local CSS imports become standard PostCSS dependencies, and a process-local cache reuses unchanged source extraction and compilation.</p></div>

      <section className="guide-step" id="install-packages"><div className="step-number">01</div><div><h2>Install the packages</h2><p>Install PostCSS, the compiler, and the official adapter as development dependencies.</p><CodeBlock title="Terminal" code="pnpm add -D postcss @coordiation/css @coordiation/postcss" /></div></section>

      <section className="guide-step" id="configure-postcss"><div className="step-number">02</div><div><h2>Configure the pipeline</h2><p>Coordiation owns import bundling, nesting, and target-aware prefixing by default. Enable minification for production without adding a second transformer.</p><CodeBlock title="postcss.config.mjs" code={`import coordiation from "@coordiation/postcss";

export default {
  plugins: [
    coordiation({
      content: ["src"],
      cwd: process.cwd(),
      toolchain: {
        minify: process.env.NODE_ENV === "production"
      }
    })
  ]
};`} /></div></section>

      <section className="guide-step" id="css-input"><div className="step-number">03</div><div><h2>Add the framework marker</h2><p>Use one dedicated CSS entry and import project-owned CSS before the marker. Imported directives and authored rules enter the same compilation.</p><CodeBlock title="src/app.css" code={`@import "./theme.css";
@import "./base.css";
@coordiation;`} /><CodeBlock title="src/theme.css" code={`@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
}`} /></div></section>

      <section className="guide-step" id="source-dependencies"><div className="step-number">04</div><div><h2>Let the runner track every dependency</h2><p>Every imported CSS file and scanned source file emits a PostCSS <code>dependency</code> message. Every source directory emits a recursive <code>dir-dependency</code>, allowing compatible runners to rebuild for edits, additions, and deletions.</p><div className="docs-callout"><strong>No custom watcher protocol</strong><p>Webpack loaders, task runners, and other PostCSS hosts can consume the standard result messages. Coordiation does not require runner-specific callbacks.</p></div></div></section>

      <section className="guide-step" id="warnings"><div className="step-number">05</div><div><h2>Use the standard warning channel</h2><p>Dynamic class construction and unsupported candidates are reported through <code>result.warn()</code>. Your runner decides how warnings are printed, collected, or promoted to errors.</p><CodeBlock title="Terminal output" code={`coordiation-css: [dynamic-candidate] Dynamic co- class construction cannot be scanned.
coordiation-css: Unsupported candidate: co-does-not-exist`} /></div></section>

      <section className="guide-step" id="source-maps"><div className="step-number">06</div><div><h2>Keep source maps in the pipeline</h2><p>When the PostCSS runner requests a map, the adapter automatically generates and composes Coordiation&apos;s Source Map v3 data across imports, framework generation, transforms, and minification. Continue configuring <code>from</code>, <code>to</code>, and <code>map</code> through the runner.</p><div className="docs-callout"><strong>Inspectable result</strong><p>The composed map remains available through the normal PostCSS result, and a <code>coordiation-source-map</code> message exposes the framework-stage map for diagnostics.</p></div></div></section>

      <section className="family-concepts" id="configuration">
        <div><p className="docs-overline">CONFIGURATION</p><h2>Share the scanner contract</h2><p>The PostCSS adapter forwards the same compiler and scanner options used by Vite and the CLI.</p></div>
        <ol><li><span>01</span><p><strong>content:</strong> source files or directories; defaults to <code>[&quot;src&quot;]</code>.</p></li><li><span>02</span><p><strong>cwd:</strong> explicit project root for resolving content paths.</p></li><li><span>03</span><p><strong>cache:</strong> process-local source and compilation reuse; defaults to <code>true</code>.</p></li><li><span>04</span><p><strong>sourceMap:</strong> follows the runner&apos;s map request by default; set an explicit embedded-content policy when needed.</p></li><li><span>05</span><p><strong>toolchain:</strong> controls imports, nesting, prefixing, minification, and browser targets.</p></li><li><span>06</span><p><strong>include / exclude / safelist:</strong> literal scan-boundary controls.</p></li><li><span>07</span><p><strong>extractors:</strong> extension-specific or global extraction hooks.</p></li><li><span>08</span><p><strong>preflight:</strong> set to <code>false</code> only when another reset owns base styles.</p></li></ol>
      </section>

      <section className="family-caveats" id="ai-contract"><div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Keep pipeline decisions auditable</h2><p>Agents can query the complete PostCSS and toolchain capabilities before generating configuration.</p></div><ul><li>Use an ESM or CJS PostCSS config that matches the host project.</li><li>Do not add a second nesting transform, prefixer, or minifier unless the matching Coordiation stage is explicitly disabled.</li><li>Keep <code>content</code>, filters, safelist, imports, and targets literal.</li><li>Do not add custom filesystem watchers when the runner consumes standard dependency messages.</li><li>Do not place <code>@coordiation</code> in CSS entries that should remain untouched.</li></ul></section>

      <div className="docs-next split"><Link href="/docs/installation/using-vite"><span>Previous</span><b>← Using Vite</b></Link><Link href="/docs/installation/using-cli"><span>Next</span><b>Using the CLI →</b></Link></div>
    </article>
  );
}
