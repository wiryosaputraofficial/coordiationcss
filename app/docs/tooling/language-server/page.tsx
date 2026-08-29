import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "IntelliSense and language server — Coordiation CSS",
  description: "Connect any LSP-capable editor to registry-backed Coordiation completion, compiled CSS hover previews, and project-aware diagnostics.",
};

export default function LanguageServerPage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Tooling</span><b>/</b><span>IntelliSense &amp; LSP</span></div>
      <p className="docs-overline">TOOLING · COMPLETE</p>
      <h1>IntelliSense and language server</h1>
      <p className="docs-lead">Give any LSP-capable editor the same Coordiation knowledge used by production builds: canonical completions, generated CSS on hover, and diagnostics backed by scanner and compiler behavior.</p>
      <div className="docs-note"><span>✓</span><p>The server implements Language Server Protocol 3.17 over stdio. It is editor-agnostic, uses no Tailwind runtime or extension, and exposes an inspectable machine contract for coding agents.</p></div>

      <section className="family-concepts" id="contract"><div><p className="docs-overline">ONE SUPPORT CONTRACT</p><h2>Editor feedback follows the build</h2><p>Intelligence is derived instead of maintained as a second handwritten class list.</p></div><ol><li><span>01</span><p><strong>Completion:</strong> indexes exact static utilities, documented dynamic examples, variants, and static CSS-first project utilities.</p></li><li><span>02</span><p><strong>Hover:</strong> compiles the selected literal candidate and shows the CSS the project configuration generates.</p></li><li><span>03</span><p><strong>Diagnostics:</strong> reports rejected literal candidates and dynamic string construction the scanner cannot prove.</p></li><li><span>04</span><p><strong>Inspection:</strong> exposes active counts, prefix, capabilities, and concrete candidate support as JSON-safe requests.</p></li></ol></section>

      <section className="guide-step" id="install"><div className="step-number">01</div><div><h2>Install and launch over stdio</h2><CodeBlock title="Terminal" code={`npm install -D @coordiation/language-server

coordiation-language-server --stdio`} /><p>Configure your editor&apos;s LSP client to launch that command for HTML, JSX/TSX, Vue, Svelte, Astro, Markdown/MDX, PHP, and <code>.coord</code> files. The server uses standard <code>Content-Length</code> JSON-RPC framing and writes protocol data only to stdout.</p></div></section>

      <section className="guide-step" id="project-settings"><div className="step-number">02</div><div><h2>Point it at the project CSS source</h2><p>Pass settings through LSP <code>initializationOptions</code>. The CSS file is resolved relative to the workspace root.</p><CodeBlock title="Language client configuration" code={`{
  "initializationOptions": {
    "coordiation": {
      "prefix": "co-",
      "cssFile": "src/coordiation.css"
    }
  }
}`} /><p>The server reads <code>@co-theme</code>, <code>@co-utility</code>, and <code>@co-variant</code> from that entry. Send <code>workspace/didChangeConfiguration</code> after changing settings and <code>workspace/didChangeWatchedFiles</code> when the configured CSS file changes.</p></div></section>

      <section className="guide-step" id="completion"><div className="step-number">03</div><div><h2>Complete literal classes and variants</h2><CodeBlock title="Template" code={`<article class="co-grid md:co-grid-cols-3 co-gap-6">
  <!-- completion triggers after :, -, [, and ( -->
</article>`} /><p>Completion items carry replacement ranges, family details, and registry documentation. Variants can be stacked, important syntax such as <code>!co-hidden</code> is preserved, and a configured custom prefix replaces <code>co-</code>.</p><div className="docs-callout"><strong>Dynamic families stay honest</strong><p>The registry provides representative valid values, not an imaginary finite list for every arbitrary or theme-driven class. Use hover, diagnostics, or candidate inspection to verify a concrete value.</p></div></div></section>

      <section className="guide-step" id="hover"><div className="step-number">04</div><div><h2>Inspect generated CSS on hover</h2><p>Hover calls the real compiler using the active prefix, theme, custom utility, and custom variant definitions.</p><CodeBlock title="Hover result" code={`hover:co-bg-black

.hover\\:co-bg-black:hover {
  background-color: var(--co-color-black);
}`} /><p>Unsupported candidates return no hover result instead of a guessed declaration.</p></div></section>

      <section className="guide-step" id="diagnostics"><div className="step-number">05</div><div><h2>Fix diagnostics at their source</h2><CodeBlock title="Diagnostics" code={`unsupported-candidate
  co-bg-not-a-token

dynamic-candidate
  \`co-bg-\${color}\`

deprecated-candidate
  hover:co--mt-4 → hover:-co-mt-4`} /><p><code>unsupported-candidate</code> means the active compiler rejected a literal class. <code>deprecated-candidate</code> carries the registered replacement. <code>dynamic-candidate</code> means the source scanner cannot see every runtime result. Replace interpolation with a literal lookup table or add deliberate literal entries to the build safelist.</p></div></section>

      <section className="guide-step" id="ai-inspection"><div className="step-number">06</div><div><h2>Inspect the live contract programmatically</h2><CodeBlock title="Custom LSP requests" code={`coordiation/manifest
→ { prefix, candidateCount, variantCount, capabilities }

coordiation/inspectCandidate
← { "candidate": "md:co-grid-cols-3" }
→ { candidate, supported, css }`} /><p>Run <code>coordiation-language-server --capabilities</code> when a client needs the static protocol surface without opening a session. These endpoints are additive Coordiation requests; standard editors can ignore them.</p></div></section>

      <section className="family-caveats" id="boundaries"><div><p className="docs-overline">BOUNDARIES</p><h2>Know what the language server proves</h2><p>Editor assistance complements the build; it does not evaluate application code.</p></div><ul><li>Only literal class attributes are validated; runtime expressions are not executed.</li><li>Full-document synchronization is used for deterministic cross-editor behavior.</li><li>Functional custom utilities are validated when concrete, while only static custom utilities can be enumerated exactly.</li><li>A completion item is discovery; compiler inspection is the final answer for a concrete dynamic value.</li><li>The package provides the LSP server, not a vendor-specific editor extension.</li></ul></section>

      <section className="family-caveats" id="ai-contract"><div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Let the project configuration decide</h2><p>Agents should connect editor suggestions to verifiable compiler behavior.</p></div><ul><li>Configure the same literal CSS entry and prefix used by the build.</li><li>Query <code>coordiation/manifest</code> before describing the active editor surface.</li><li>Use <code>coordiation/inspectCandidate</code> before claiming a project-specific class is supported.</li><li>Keep generated class strings literal so diagnostics and the build scanner agree.</li><li>Never hide a dynamic-candidate warning by inventing a likely runtime value.</li></ul></section>

      <div className="docs-next split"><Link prefetch={false} href="/docs/tooling/source-maps"><span>Previous</span><b>← Source maps</b></Link><Link prefetch={false} href="/docs/tooling/formatter"><span>Next</span><b>Class formatter →</b></Link></div>
    </article>
  );
}
