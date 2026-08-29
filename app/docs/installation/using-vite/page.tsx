import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Using Coordiation CSS with Vite",
  description: "Install the Coordiation Vite adapter with root-aware scanning, virtual CSS, and hardened hot updates.",
};

export default function UsingVitePage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Installation</span><b>/</b><span>Using Vite</span></div>
      <p className="docs-overline">INSTALLATION · COMPLETE ADAPTER</p>
      <h1>Using Vite</h1>
      <p className="docs-lead">Install Coordiation CSS as a Vite plugin, import its generated virtual stylesheet, and get dependency-aware updates while you develop.</p>
      <div className="docs-note"><span>✓</span><p>The adapter scans from the resolved Vite root, watches templates, the CSS entry, and every local CSS import, then refreshes the generated stylesheet when files change, appear, or disappear. A process-local incremental cache reuses unchanged work; no Coordiation runtime is added to the browser.</p></div>

      <section className="guide-step" id="install-packages"><div className="step-number">01</div><div><h2>Install the packages</h2><p>Add the compiler, official Vite adapter, and Vite as development dependencies.</p><CodeBlock title="Terminal" code="npm install -D @coordiation/css @coordiation/vite vite" /></div></section>

      <section className="guide-step" id="configure-vite"><div className="step-number">02</div><div><h2>Configure Vite</h2><p>Register the plugin, choose literal source roots, and point it to a watched CSS-first theme file.</p><CodeBlock title="vite.config.js" code={`import { defineConfig } from "vite";
import coordiation from "@coordiation/vite";

export default defineConfig({
  plugins: [
    coordiation({
      content: ["src"],
      cssFile: "src/coordiation.css",
      toolchain: {
        minify: process.env.NODE_ENV === "production"
      },
      sourceMap: true
    })
  ]
});`} /></div></section>

      <section className="guide-step" id="theme-input"><div className="step-number">03</div><div><h2>Create the CSS input</h2><p>Keep the framework marker in a watched entry. Local imports are bundled before compilation and become HMR dependencies automatically.</p><CodeBlock title="src/coordiation.css" code={`@import "./theme.css";
@coordiation;`} /><CodeBlock title="src/theme.css" code={`@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
  --co-color-brand-600: oklch(54.6% 0.245 262.881);
}`} /></div></section>

      <section className="guide-step" id="import-css"><div className="step-number">04</div><div><h2>Import the generated CSS</h2><p>Import the virtual stylesheet exactly once from your application entry point.</p><CodeBlock title="src/main.js" code={`import "virtual:coordiation.css";
import { createApp } from "./app";

createApp().mount("#app");`} /></div></section>

      <section className="guide-step" id="use-utilities"><div className="step-number">05</div><div><h2>Start using utilities</h2><p>Compose literal utility classes directly in your template. The <code>co-</code> prefix keeps framework classes easy to identify and scan.</p><CodeBlock title="src/App.coord" code={`<section class="co-grid co-min-h-screen co-place-items-center co-bg-white co-p-8">
  <div class="co-max-w-xl co-text-center">
    <h1 class="co-text-5xl co-font-bold co-tracking-tight">
      Build with Coordiation.
    </h1>
    <p class="co-mt-4 co-text-lg co-text-neutral-600">
      Utility-first CSS with zero browser runtime.
    </p>
  </div>
</section>`} /></div></section>

      <section className="guide-step" id="hot-updates"><div className="step-number">06</div><div><h2>Develop with reliable hot updates</h2><p>Changing a template or imported CSS file invalidates the virtual CSS module and returns it to Vite as an HMR dependency. Creating or deleting a source file triggers a structural rescan and stylesheet refresh. Changes outside the configured dependency boundary are ignored.</p><div className="docs-callout"><strong>Why cssFile is recommended</strong><p>An inline <code>css</code> option still works for generated configuration, but a <code>cssFile</code> gives imports a stable resolution base and can be watched directly.</p></div></div></section>

      <section className="guide-step" id="ai-integration"><div className="step-number">07</div><div><h2>Give AI the support contract</h2><p>Point coding agents to the concise guide and capability manifest so they only generate utilities that really ship.</p><CodeBlock title="Agent instructions" code={`Read /llms.txt first.
Check /api/capabilities before generating Coordiation classes.
Never treat a planned capability as implemented.`} /><div className="inline-links"><a href="/llms.txt">Open llms.txt ↗</a><a href="/api/capabilities">Open capability JSON ↗</a></div></div></section>

      <section className="family-concepts" id="configuration">
        <div><p className="docs-overline">CONFIGURATION</p><h2>Keep dependencies explicit</h2><p>Every path is resolved from Vite&apos;s final project root unless <code>cwd</code> is supplied deliberately.</p></div>
        <ol><li><span>01</span><p><strong>content:</strong> source files or directories to scan and watch; defaults to <code>[&quot;src&quot;]</code>.</p></li><li><span>02</span><p><strong>cssFile:</strong> recommended watched CSS entry and import-resolution base.</p></li><li><span>03</span><p><strong>css:</strong> inline alternative for generated configurations.</p></li><li><span>04</span><p><strong>cache:</strong> process-local source and compilation reuse; defaults to <code>true</code>.</p></li><li><span>05</span><p><strong>sourceMap:</strong> return a native Vite map; accepts <code>true</code> or an embedded-content policy.</p></li><li><span>06</span><p><strong>toolchain:</strong> controls imports, nesting, prefixing, minification, and browser targets.</p></li><li><span>07</span><p><strong>include / exclude / safelist:</strong> literal scan-boundary controls.</p></li><li><span>08</span><p><strong>extractors:</strong> framework-specific candidate extraction hooks.</p></li></ol>
      </section>

      <section className="family-caveats" id="troubleshooting"><div><p className="docs-overline">TROUBLESHOOTING</p><h2>When a class does not appear</h2><p>The adapter reports scanner diagnostics through Vite and keeps unsupported candidates observable.</p></div><ul><li>Confirm the file lives inside a configured <code>content</code> root and is not excluded.</li><li>Keep complete utility strings in source; dynamic string concatenation cannot be discovered.</li><li>Import <code>virtual:coordiation.css</code> exactly once from the client entry.</li><li>Use <code>cssFile</code> when theme changes should participate in HMR.</li><li>On WSL or mounted filesystems, verify that Vite itself receives filesystem events.</li></ul></section>

      <div className="docs-next split"><Link href="/docs/installation/using-npm"><span>Previous</span><b>← Using npm</b></Link><Link href="/docs/installation/using-postcss"><span>Next</span><b>Using PostCSS →</b></Link></div>
    </article>
  );
}
