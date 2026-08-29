import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Source maps — Coordiation CSS",
  description: "Trace generated Coordiation CSS through imports, framework layers, nesting, prefixing, and minification with Source Map v3.",
};

export default function SourceMapsPage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Tooling</span><b>/</b><span>Source maps</span></div>
      <p className="docs-overline">TOOLING · COMPLETE</p>
      <h1>Source maps</h1>
      <p className="docs-lead">Trace production CSS back to the entry and every local CSS import, even after Coordiation generates layers, lowers nesting, adds prefixes, and minifies the result.</p>
      <div className="docs-note"><span>✓</span><p>Coordiation emits standard Source Map v3 JSON. Authored rules retain CSS origins; generated framework layers map to the entry marker and recognizable theme or custom-definition segments retain their defining CSS source.</p></div>

      <section className="family-concepts" id="pipeline"><div><p className="docs-overline">COMPOSED PIPELINE</p><h2>One map follows every stage</h2><p>The final consumer receives a single composed map instead of disconnected stage-specific files.</p></div><ol><li><span>01</span><p><strong>Imports:</strong> associate bundled rules and definitions with the entry or resolved local CSS file.</p></li><li><span>02</span><p><strong>Framework:</strong> map authored CSS directly and generated layers to the closest framework definition or <code>@coordiation</code> marker.</p></li><li><span>03</span><p><strong>Transforms:</strong> extend mappings while nesting is lowered and target-specific prefixes are emitted.</p></li><li><span>04</span><p><strong>Optimization:</strong> preserve source identities and mappings in minified production output.</p></li></ol></section>

      <section className="guide-step" id="api"><div className="step-number">01</div><div><h2>Enable maps in the production API</h2><p>Supply a real entry filename. <code>outputFilename</code> controls the map&apos;s generated-file identity.</p><CodeBlock title="build.mjs" code={`const result = await compileWithToolchain(inputCss, candidates, {
  filename: "/project/src/coordiation.css",
  outputFilename: "/project/dist/coordiation.css",
  sourceMap: true,
  toolchain: { minify: true },
});

await writeFile("dist/coordiation.css", result.css);
await writeFile("dist/coordiation.css.map", result.map);`} /><p><code>result.map</code> is a JSON string. <code>result.toolchain.sourceMap</code> is a compact machine-readable manifest of enabled state, source identities, and embedded-content policy.</p></div></section>

      <section className="guide-step" id="sources-content"><div className="step-number">02</div><div><h2>Control embedded source text</h2><p>Original CSS is embedded by default so DevTools can display sources without separately fetching project files.</p><CodeBlock title="Configuration" code={`sourceMap: {
  sourcesContent: false,
}`} /><p>Disable <code>sourcesContent</code> when source identities and line mappings are useful but original CSS must not be embedded in the artifact.</p></div></section>

      <section className="guide-step" id="cli"><div className="step-number">03</div><div><h2>Choose external or inline CLI output</h2><p>External maps are suitable for deployed debugging. Inline maps keep local or portable output self-contained.</p><CodeBlock title="External map" code={`coordiation-css \\
  -i src/coordiation.css \\
  -o dist/coordiation.css \\
  -c src \\
  --sourcemap`} /><CodeBlock title="Inline without source text" code={`coordiation-css \\
  -i src/coordiation.css \\
  -o dist/coordiation.css \\
  -c src \\
  --sourcemap-inline \\
  --no-sources-content`} /><p>External mode writes <code>coordiation.css.map</code> and adds a relative annotation to the CSS. Watch mode refreshes the map before replacing the CSS output.</p></div></section>

      <section className="guide-step" id="vite"><div className="step-number">04</div><div><h2>Return native Vite module maps</h2><p>Enable <code>sourceMap</code> on the official adapter. The virtual CSS loader returns Vite&apos;s conventional <code>{`{ code, map }`}</code> result.</p><CodeBlock title="vite.config.js" code={`coordiation({
  content: ["src"],
  cssFile: "src/coordiation.css",
  sourceMap: true,
})`} /></div></section>

      <section className="guide-step" id="postcss"><div className="step-number">05</div><div><h2>Compose with a PostCSS runner</h2><p>When the runner requests a map, the adapter enables Coordiation mapping automatically and attaches it as the previous map for generated nodes.</p><CodeBlock title="postcss.process" code={`const result = await postcss([coordiation({ content: ["src"] })]).process(css, {
  from: "src/app.css",
  to: "dist/app.css",
  map: { inline: false },
});`} /><p>The adapter also publishes a <code>coordiation-source-map</code> result message for build diagnostics and agent inspection.</p></div></section>

      <section className="guide-step" id="manifest"><div className="step-number">06</div><div><h2>Inspect before describing coverage</h2><CodeBlock title="result.toolchain.sourceMap" code={`{
  enabled: true,
  sourcesContent: true,
  sources: [
    "project/src/coordiation.css",
    "project/src/theme.css",
    "project/src/components.css"
  ]
}`} /><p>The source list describes CSS origins. Scanned HTML, JSX, Vue, or <code>.coord</code> templates are candidate-discovery inputs and are not presented as CSS source locations.</p></div></section>

      <section className="family-caveats" id="boundaries"><div><p className="docs-overline">BOUNDARIES</p><h2>Keep mappings useful and honest</h2><p>Source maps explain generated CSS, not runtime DOM behavior.</p></div><ul><li>Use literal local imports and a real filename so every source identity is stable.</li><li>Generated utilities without a CSS-first definition map to the <code>@coordiation</code> marker.</li><li>Template files are scanner dependencies, not CSS sources.</li><li>Do not expose embedded source text in public artifacts when project policy forbids it.</li><li>Read the actual manifest before claiming which imported files are mapped.</li></ul></section>

      <section className="family-caveats" id="ai-contract"><div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Generate the right delivery mode</h2><p>Agents should match map output to the consumer rather than enabling an unused artifact.</p></div><ul><li>Prefer Vite&apos;s returned map and PostCSS runner maps over writing duplicate files.</li><li>Use external CLI maps for deployed debugging and inline maps for self-contained local output.</li><li>Set <code>sourcesContent: false</code> when source text must not be embedded.</li><li>Preserve <code>filename</code>, <code>outputFilename</code>, and literal imports.</li><li>Never infer template-to-CSS mappings; only CSS origins are represented.</li></ul></section>

      <div className="docs-next split"><Link prefetch={false} href="/docs/tooling/incremental-cache"><span>Previous</span><b>← Incremental cache</b></Link><Link prefetch={false} href="/docs/installation/using-vite"><span>Next</span><b>Using Vite →</b></Link></div>
    </article>
  );
}
