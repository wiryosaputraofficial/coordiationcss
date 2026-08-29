import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/installation/using-cli", ...{
  title: "Using the Coordiation CSS CLI",
  description: "Compile Coordiation CSS with persistent incremental caching or run durable portable watch mode with atomic output and graceful shutdown.",
} });

export default function UsingCliPage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Installation</span><b>/</b><span>Using the CLI</span></div>
      <p className="docs-overline">INSTALLATION · COMPLETE CLI</p>
      <h1>Using the CLI</h1>
      <p className="docs-lead">Generate static Coordiation CSS without a bundler plugin, then use the same command as a durable development watcher across local filesystems and container mounts.</p>
      <div className="docs-note"><span>✓</span><p>Watch mode performs an initial build, detects the CSS entry, imported CSS, and source edits, additions, and deletions, and keeps running after temporary filesystem errors. A persistent incremental cache reuses unchanged extraction and compilation work by default.</p></div>

      <section className="guide-step" id="install-package"><div className="step-number">01</div><div><h2>Install the compiler</h2><p>Install the core package as a development dependency. Its binary is exposed as <code>coordiation-css</code>.</p><CodeBlock title="Terminal" code="npm install -D @coordiation/css" /></div></section>

      <section className="guide-step" id="css-input"><div className="step-number">02</div><div><h2>Create the CSS input</h2><p>Add the framework marker and split repeatable design decisions into local imports when useful.</p><CodeBlock title="src/coordiation.css" code={`@import "./theme.css";
@coordiation;`} /><CodeBlock title="src/theme.css" code={`@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
  --co-radius-card: 1rem;
}`} /></div></section>

      <section className="guide-step" id="build-once"><div className="step-number">03</div><div><h2>Build once</h2><p>Use one-shot mode in production builds and CI. Add <code>--minify</code> and explicit targets when the distributed CSS should be compact and its browser contract pinned.</p><CodeBlock title="Terminal" code={`coordiation-css \\
  --input src/coordiation.css \\
  --output dist/coordiation.css \\
  --content src \\
  --minify \\
  --target chrome=111 \\
  --target safari=15.4`} /><p>Import or link the generated <code>dist/coordiation.css</code> from your application. The result contains static CSS only.</p></div></section>

      <section className="guide-step" id="watch-mode"><div className="step-number">04</div><div><h2>Watch during development</h2><p>Add <code>--watch</code> to build immediately and then rescan after content changes. Portable content polling avoids relying on filesystem-specific recursive watch behavior.</p><CodeBlock title="Terminal" code={`coordiation-css \\
  --input src/coordiation.css \\
  --output dist/coordiation.css \\
  --content src \\
  --watch`} /><div className="docs-callout"><strong>Safe output lifecycle</strong><p>Rebuilds never overlap. Each completed stylesheet is written to a sibling temporary file and renamed into place, so downstream servers do not read a partially written result.</p></div></div></section>

      <section className="guide-step" id="polling"><div className="step-number">05</div><div><h2>Tune polling only when needed</h2><p>The default interval is 250ms. Slower intervals reduce metadata checks in very large projects or on network and container-mounted filesystems.</p><CodeBlock title="Terminal" code={`coordiation-css -i src/coordiation.css -o dist/coordiation.css -c src --watch --poll 500`} /><p>The minimum is 25ms. Unchanged files become scanner hits, unchanged compilation becomes a compiler hit, and no output write occurs when the final fingerprint is unchanged.</p></div></section>

      <section className="guide-step" id="errors-shutdown"><div className="step-number">06</div><div><h2>Recover and stop cleanly</h2><p>A missing input or temporarily unavailable source root is reported once while the watcher remains active. Restore the file and the next successful poll rebuilds automatically. Press <code>Ctrl+C</code>, or send <code>SIGTERM</code>, to finish the active build and stop with a successful exit.</p><CodeBlock title="Watch output" code={`Coordiation CSS: watching 1 source root every 250ms.
Coordiation CSS: build 1 complete — 14 files, 82 candidates, 0 rejected, 0 scan hits, 14 misses, compile miss in 18ms.
Coordiation CSS: build failed — ENOENT: no such file or directory, open 'src/coordiation.css'
Coordiation CSS: build 2 complete — 14 files, 82 candidates, 0 rejected, 14 scan hits, 0 misses, compile hit in 4ms.
Coordiation CSS: watch stopped.`} /></div></section>

      <section className="family-concepts" id="configuration">
        <div><p className="docs-overline">OPTIONS</p><h2>Use one scanner contract</h2><p>Build and watch mode share the same source-selection and compiler controls.</p></div>
        <ol><li><span>01</span><p><strong>-i / --input:</strong> CSS entry containing <code>@coordiation</code>.</p></li><li><span>02</span><p><strong>-o / --output:</strong> generated static stylesheet path.</p></li><li><span>03</span><p><strong>-c / --content:</strong> repeatable or comma-separated files and directories.</p></li><li><span>04</span><p><strong>--include / --exclude / --safelist:</strong> literal scanner controls.</p></li><li><span>05</span><p><strong>--cache-dir / --no-cache:</strong> relocate persistent state or run deliberately cold.</p></li><li><span>06</span><p><strong>--sourcemap / --sourcemap-inline / --no-sources-content:</strong> choose map delivery and source-text policy.</p></li><li><span>07</span><p><strong>--no-imports / --no-nesting / --no-prefixing:</strong> preserve a stage for another build tool.</p></li><li><span>08</span><p><strong>--minify / --target:</strong> optimize output and declare repeatable browser targets.</p></li><li><span>09</span><p><strong>--prefix / --no-diagnostics / --no-preflight:</strong> compiler syntax and diagnostics controls.</p></li><li><span>10</span><p><strong>-w / --watch and --poll:</strong> enable durable watching and optionally tune its interval.</p></li></ol>
      </section>

      <section className="family-caveats" id="ai-contract"><div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Keep commands inspectable</h2><p>Agents can query the complete CLI capability and generate deterministic commands without guessing at project boundaries.</p></div><ul><li>Use literal input, output, content, import, filter, safelist, and target values.</li><li>Use one-shot plus <code>--minify</code> for production and <code>--watch</code> only for an active development process.</li><li>Do not wrap CLI watch mode in a second filesystem watcher.</li><li>Keep complete class strings in scanned sources and report dynamic-class or toolchain diagnostics.</li><li>Treat a recoverable watch error as a source-state problem, not as a reason to start duplicate watchers.</li></ul></section>

      <div className="docs-next split"><Link href="/docs/installation/using-postcss"><span>Previous</span><b>← Using PostCSS</b></Link><Link href="/docs/tooling/incremental-cache"><span>Next</span><b>Incremental cache →</b></Link></div>
    </article>
  );
}
