import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "CSS toolchain — Coordiation CSS",
  description: "Bundle imports, lower CSS nesting, apply target-aware vendor prefixes, and minify Coordiation CSS with one inspectable pipeline.",
};

export default function CssToolchainPage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Tooling</span><b>/</b><span>CSS toolchain</span></div>
      <p className="docs-overline">TOOLING · COMPLETE</p>
      <h1>CSS toolchain</h1>
      <p className="docs-lead">Turn one CSS entry into production-ready static output with local import bundling, native nesting transforms, explicit browser-target prefixing, and optional minification.</p>
      <div className="docs-note"><span>✓</span><p>Vite, PostCSS, and the CLI use this pipeline by default. Every result declares its exact stages, targets, imported files, and warnings in a JSON-safe <code>toolchain</code> manifest.</p></div>

      <section className="family-concepts" id="pipeline"><div><p className="docs-overline">PIPELINE ORDER</p><h2>One entry, two controlled transform phases</h2><p>Ordering is fixed so project directives and authored CSS share the same predictable result.</p></div><ol><li><span>01</span><p><strong>Bundle:</strong> resolve local <code>@import</code> paths relative to the entry filename.</p></li><li><span>02</span><p><strong>Compile:</strong> resolve theme, custom utilities, variants, plugins, scanned candidates, and Preflight.</p></li><li><span>03</span><p><strong>Transform:</strong> lower nesting and add only prefixes required by the configured browser targets.</p></li><li><span>04</span><p><strong>Optimize:</strong> minify only when explicitly enabled for production output.</p></li></ol></section>

      <section className="guide-step" id="imports"><div className="step-number">01</div><div><h2>Split CSS without losing framework context</h2><p>Imported theme directives, custom utilities, and authored styles are bundled before candidate compilation. Paths stay literal and relative to the entry file.</p><CodeBlock title="src/coordiation.css" code={`@import "./theme.css";
@import "./components.css";
@coordiation;

.dashboard {
  container-type: inline-size;
}`} /><CodeBlock title="src/theme.css" code={`@co-theme {
  --co-color-surface: oklch(98% 0 0);
  --co-radius-card: 1rem;
}`} /><p>Imported files become first-class dependencies: Vite watches and hot-updates them, PostCSS emits <code>dependency</code> messages, and CLI watch mode fingerprints their contents.</p></div></section>

      <section className="guide-step" id="nesting"><div className="step-number">02</div><div><h2>Author native nested CSS</h2><p>Nesting is lowered after Coordiation has emitted generated and authored CSS. The output remains ordinary browser CSS with no runtime parser.</p><CodeBlock title="Input" code={`.card {
  color: var(--co-color-neutral-900);

  & > .title {
    font-weight: 700;
  }
}`} /><CodeBlock title="Conceptual output" code={`.card {
  color: var(--co-color-neutral-900);
}

.card > .title {
  font-weight: 700;
}`} /></div></section>

      <section className="guide-step" id="targets"><div className="step-number">03</div><div><h2>Make browser support explicit</h2><p>Prefixing is derived from named targets rather than an opaque environment default. The shipped baseline is Chrome 111, Edge 111, Firefox 113, Safari 15.4, and iOS Safari 15.4.</p><CodeBlock title="JavaScript" code={`const result = await compileWithToolchain(inputCss, candidates, {
  filename: "/project/src/coordiation.css",
  toolchain: {
    targets: {
      chrome: "111",
      firefox: "113",
      safari: "15.4",
      ios_saf: "15.4",
    },
  },
});`} /><div className="docs-callout"><strong>Single ownership</strong><p>If another named tool must own nesting or prefixing, disable only that Coordiation stage. Avoid running two prefixers over the same output.</p></div></div></section>

      <section className="guide-step" id="minify"><div className="step-number">04</div><div><h2>Minify production builds deliberately</h2><p>Readable CSS is the default for development and inspection. Enable minification in the production configuration or pass <code>--minify</code> to the CLI.</p><CodeBlock title="vite.config.js" code={`coordiation({
  content: ["src"],
  cssFile: "src/coordiation.css",
  toolchain: {
    minify: process.env.NODE_ENV === "production",
  },
})`} /><CodeBlock title="CLI" code={`coordiation-css \\
  --input src/coordiation.css \\
  --output dist/coordiation.css \\
  --content src \\
  --minify \\
  --target chrome=111 \\
  --target safari=15.4`} /></div></section>

      <section className="guide-step" id="direct-api"><div className="step-number">05</div><div><h2>Use the asynchronous build API</h2><p><code>compileWithToolchain()</code> is the production entry point. Supply a real filename whenever imports are enabled so relative resolution and diagnostics remain deterministic.</p><CodeBlock title="build.mjs" code={`import { readFile } from "node:fs/promises";
import { compileWithToolchain, scanSources } from "@coordiation/css";

const filename = "/project/src/coordiation.css";
const inputCss = await readFile(filename, "utf8");
const scan = await scanSources(["/project/src"]);
const result = await compileWithToolchain(inputCss, scan.candidates, {
  filename,
  toolchain: { minify: true },
});

console.log(result.css);
console.log(result.toolchain);`} /><p>Use synchronous <code>compile()</code> only when the host intentionally owns import resolution and all CSS transformations.</p></div></section>

      <section className="family-concepts" id="options"><div><p className="docs-overline">OPTIONS</p><h2>Disable stages independently</h2><p><code>toolchain: false</code> disables all four stages. An object changes only the named settings.</p></div><ol><li><span>01</span><p><strong>imports:</strong> defaults to <code>true</code>; set <code>false</code> or use <code>--no-imports</code> to preserve imports.</p></li><li><span>02</span><p><strong>nesting:</strong> defaults to <code>true</code>; set <code>false</code> or use <code>--no-nesting</code> to preserve native nesting.</p></li><li><span>03</span><p><strong>prefixing:</strong> defaults to <code>true</code>; set <code>false</code> or use <code>--no-prefixing</code> when another tool owns it.</p></li><li><span>04</span><p><strong>minify:</strong> defaults to <code>false</code>; set <code>true</code> or use <code>--minify</code> for compact output.</p></li><li><span>05</span><p><strong>targets:</strong> a browser-to-version object, or repeatable CLI <code>--target browser=version</code> values.</p></li></ol></section>

      <section className="guide-step" id="manifest"><div className="step-number">06</div><div><h2>Track the effective build contract</h2><p>The manifest is designed for build tools, diagnostics, and coding agents. Runtime functions never appear in it.</p><CodeBlock title="result.toolchain" code={`{
  engine: "lightningcss",
  engineVersion: "1.33.0",
  imports: true,
  nesting: true,
  prefixing: true,
  minify: false,
  targets: { chrome: "111", safari: "15.4" },
  files: ["/project/src/theme.css"],
  warnings: []
}`} /></div></section>

      <section className="family-caveats" id="boundaries"><div><p className="docs-overline">BOUNDARIES</p><h2>Keep ownership and claims precise</h2><p>The toolchain fails the current build when an import or transformation cannot be completed.</p></div><ul><li>Use local resolvable import paths and a real entry filename.</li><li>Do not run a second nesting transform or prefixer unless the matching Coordiation stage is disabled.</li><li>Keep development output readable and enable minification intentionally for production.</li><li>Read <code>toolchain.files</code> instead of constructing a separate import dependency graph.</li><li>Framework-native source maps remain a separate planned capability; PostCSS hosts may still manage their own pipeline maps.</li></ul></section>

      <section className="family-caveats" id="ai-contract"><div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Inspect before generating configuration</h2><p>Agents should make the build stages observable, not infer them from a package name.</p></div><ul><li>Prefer <code>compileWithToolchain()</code> for new build integrations.</li><li>Keep import paths and CLI targets literal and auditable.</li><li>Match the manifest targets before explaining browser compatibility.</li><li>Use imported dependency paths from the manifest for watchers and caches.</li><li>Report toolchain errors or warnings instead of returning partially transformed CSS.</li></ul></section>

      <div className="docs-next split"><Link prefetch={false} href="/docs/core/plugin-api"><span>Previous</span><b>← Plugin API</b></Link><Link prefetch={false} href="/docs/installation/using-vite"><span>Next</span><b>Using Vite →</b></Link></div>
    </article>
  );
}
