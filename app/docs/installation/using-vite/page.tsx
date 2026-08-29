import Link from "next/link";
import CodeBlock from "../../_components/CodeBlock";

export default function UsingVitePage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Installation</span><b>/</b><span>Using Vite</span></div>
      <p className="docs-overline">INSTALLATION</p>
      <h1>Using Vite</h1>
      <p className="docs-lead">Install Coordiation CSS as a Vite plugin and import its generated virtual stylesheet.</p>
      <div className="docs-note"><span>i</span><p>The adapter scans your source files and generates static CSS. No Coordiation runtime is added to the browser.</p></div>

      <section className="guide-step" id="install-packages"><div className="step-number">01</div><div><h2>Install the packages</h2><p>Add the compiler and official Vite adapter as development dependencies.</p><CodeBlock title="Terminal" code="pnpm add -D @coordiation/css @coordiation/vite" /></div></section>

      <section className="guide-step" id="configure-vite"><div className="step-number">02</div><div><h2>Configure the Vite plugin</h2><p>Add the plugin and tell it where your templates live. Coordiation scans <code>.coord</code>, HTML, JSX/TSX, Vue, Svelte, Astro, and Markdown files.</p><CodeBlock title="vite.config.js" code={`import { defineConfig } from "vite";
import coordiation from "@coordiation/vite";

export default defineConfig({
  plugins: [
    coordiation({ content: ["src"] })
  ]
});`} /></div></section>

      <section className="guide-step" id="import-css"><div className="step-number">03</div><div><h2>Import the generated CSS</h2><p>Import the virtual stylesheet once from your application entry point.</p><CodeBlock title="src/main.js" code={`import "virtual:coordiation.css";
import { createApp } from "./app";

createApp().mount("#app");`} /></div></section>

      <section className="guide-step" id="use-utilities"><div className="step-number">04</div><div><h2>Start using utilities</h2><p>Compose literal utility classes directly in your template. The <code>co-</code> prefix keeps framework classes easy to identify and scan.</p><CodeBlock title="src/App.coord" code={`<section class="co-grid co-min-h-screen co-place-items-center co-bg-white co-p-8">
  <div class="co-max-w-xl co-text-center">
    <h1 class="co-text-5xl co-font-bold co-tracking-tight">
      Build with Coordiation.
    </h1>
    <p class="co-mt-4 co-text-lg co-text-neutral-600">
      Utility-first CSS with zero browser runtime.
    </p>
  </div>
</section>`} /></div></section>

      <section className="guide-step" id="theme-variables"><div className="step-number">05</div><div><h2>Add project tokens</h2><p>Pass CSS-first theme declarations through the plugin when your design system needs custom values.</p><CodeBlock title="vite.config.js" code={`coordiation({
  content: ["src"],
  css: \`@coordiation;

@co-theme {
  --co-color-brand-500: #000000;
  --co-color-brand-600: #222222;
}\u0060
})`} /></div></section>

      <section className="guide-step" id="ai-integration"><div className="step-number">06</div><div><h2>Give AI the support contract</h2><p>Point coding agents to the concise guide and capability manifest so they only generate utilities that really ship.</p><CodeBlock title="Agent instructions" code={`Read /llms.txt first.
Check /api/capabilities before generating Coordiation classes.
Never treat a planned capability as implemented.`} /><div className="inline-links"><a href="/llms.txt">Open llms.txt ↗</a><a href="/api/capabilities">Open capability JSON ↗</a></div></div></section>

      <div className="docs-next split"><Link href="/docs"><span>Previous</span><b>Installation</b></Link><Link href="/release-check"><span>Next</span><b>Release Check →</b></Link></div>
    </article>
  );
}
