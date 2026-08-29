import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Plugin API — Coordiation CSS",
  description: "Build reusable Coordiation extensions with deterministic utilities, variants, theme values, extractors, safelists, and AI-readable manifests.",
};

export default function PluginApiPage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Core concepts</span><b>/</b><span>Plugin API</span></div>
      <p className="docs-overline">CORE CONCEPT · COMPLETE</p>
      <h1>Plugin API</h1>
      <p className="docs-lead">Package a reusable Coordiation extension once, then use the same validated utility, variant, theme, and source-scanning behavior from the compiler, Vite, or PostCSS.</p>
      <div className="docs-note"><span>✓</span><p>A plugin is code, not configuration data. Load only trusted packages, keep <code>setup()</code> synchronous, and inspect the compile manifest before an agent generates plugin-owned classes.</p></div>

      <section className="guide-step" id="define"><div className="step-number">01</div><div><h2>Define an identifiable plugin</h2><p>Give every plugin a stable lowercase package-style name and version. The factory brands the object so unvalidated lookalikes cannot enter the compiler pipeline.</p><CodeBlock title="interface-kit.js" code={`import { defineCoordiationPlugin } from "@coordiation/css";

export const interfaceKit = defineCoordiationPlugin({
  name: "@acme/coordiation-interface-kit",
  version: "1.0.0",
  setup(api) {
    // Register the extension here.
  },
});`} /></div></section>

      <section className="guide-step" id="utilities"><div className="step-number">02</div><div><h2>Add static or functional utilities</h2><p>Object keys omit the configured utility prefix. Property names may use CSS syntax or camel case, and functional patterns reuse the same <code>co-value()</code> and <code>co-modifier()</code> contract as CSS-first custom utilities.</p><CodeBlock title="Plugin setup" code={`setup({ addUtilities }) {
  addUtilities({
    "content-auto": {
      contentVisibility: "auto",
      containIntrinsicSize: "auto 1000px",
    },
    "editor-tab-*": {
      tabSize: "co-value(--co-tab-size-*, integer, [integer])",
    },
  });
}`} /></div></section>

      <section className="guide-step" id="variants-theme"><div className="step-number">03</div><div><h2>Share variants and theme values</h2><p>A single string creates a selector or conditional wrapper. An ordered array creates a compound variant around the generated rule.</p><CodeBlock title="Plugin setup" code={`setup({ addVariant, extendTheme }) {
  extendTheme({
    colors: { accent: "oklch(62% 0.18 260)" },
    tabSizes: { editor: "8" },
  });

  addVariant("workspace", "&:where([data-workspace] *)");
  addVariant("can-hover", [
    "@media (any-hover: hover)",
    "&:hover",
  ]);
}`} /><CodeBlock title="Template" code={`<main class="workspace:co-bg-accent md:can-hover:!co-underline">
  ...
</main>`} /></div></section>

      <section className="guide-step" id="sources"><div className="step-number">04</div><div><h2>Extend source discovery explicitly</h2><p>Register an extension-specific extractor for a custom template language and safelist only complete literal candidates. Extractors may be asynchronous; plugin setup may not.</p><CodeBlock title="Plugin setup" code={`setup({ addExtractor, addSafelist }) {
  addExtractor(".widget", async (source, context) => {
    return parseWidgetClasses(source, context.file);
  });

  addSafelist([
    "co-bg-accent",
    "workspace:co-content-auto",
  ]);
}`} /></div></section>

      <section className="guide-step" id="configure"><div className="step-number">05</div><div><h2>Use one plugin in every JavaScript integration</h2><p>The same <code>plugins</code> array works in direct compilation, Vite, and PostCSS. Vite also adds plugin-owned source extensions to its watch boundary.</p><CodeBlock title="vite.config.js" code={`import { defineConfig } from "vite";
import coordiation from "@coordiation/vite";
import { interfaceKit } from "./interface-kit.js";

export default defineConfig({
  plugins: [coordiation({
    content: ["src"],
    cssFile: "src/coordiation.css",
    plugins: [interfaceKit],
  })],
});`} /><CodeBlock title="Direct compiler" code={`const result = compile(inputCss, candidates, {
  plugins: [interfaceKit],
});`} /></div></section>

      <section className="family-concepts" id="precedence"><div><p className="docs-overline">DETERMINISTIC PRECEDENCE</p><h2>Project ownership remains final</h2><p>Registrations are merged in one documented order.</p></div><ol><li><span>01</span><p><strong>Plugin array:</strong> plugins run left to right; a later plugin replaces an identical plugin pattern or variant.</p></li><li><span>02</span><p><strong>Application options:</strong> explicitly supplied theme, utility, or variant definitions replace plugin defaults.</p></li><li><span>03</span><p><strong>CSS entry:</strong> <code>@co-theme</code>, <code>@co-utility</code>, and <code>@co-variant</code> remain the final authority.</p></li><li><span>04</span><p><strong>Output:</strong> all successful candidates continue through canonical ordering and static CSS generation.</p></li></ol></section>

      <section className="guide-step" id="manifest"><div className="step-number">06</div><div><h2>Audit the effective plugin surface</h2><p>Compile results expose identity and registered names without leaking or attempting to serialize runtime extractor functions.</p><CodeBlock title="JavaScript" code={`console.log(result.plugins);
// [{
//   name: "@acme/coordiation-interface-kit",
//   version: "1.0.0",
//   utilities: ["content-auto", "editor-tab-*"],
//   variants: ["workspace", "can-hover"],
//   theme: { colors: ["accent"], tabSizes: ["editor"] },
//   extractors: [".widget"],
//   safelist: ["co-bg-accent"]
// }]`} /></div></section>

      <section className="family-caveats" id="ai-contract"><div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Resolve identity before capability</h2><p>Agents should use the effective manifest and compiler result instead of guessing from a package name.</p></div><ul><li>Match the exact plugin name and version before using its registered surface.</li><li>Generate only utility patterns and variant names present in the effective project contract.</li><li>Keep safelist and extractor output as complete literal candidates.</li><li>Respect plugin, application-option, and CSS-first precedence.</li><li>Report rejected candidates and plugin validation errors instead of inventing a fallback.</li></ul></section>

      <div className="docs-next split"><Link href="/docs/core/custom-variants"><span>Previous</span><b>← Custom variants</b></Link><Link href="/release-check"><span>Next</span><b>Release Check →</b></Link></div>
    </article>
  );
}
