import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Incremental build cache — Coordiation CSS",
  description: "Reuse unchanged source extraction and stylesheet compilation safely across Coordiation CSS builds.",
};

export default function IncrementalCachePage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Tooling</span><b>/</b><span>Incremental cache</span></div>
      <p className="docs-overline">TOOLING · COMPLETE</p>
      <h1>Incremental build cache</h1>
      <p className="docs-lead">Skip source extraction and CSS compilation that have already produced a valid result, without weakening candidate validation or dependency tracking.</p>
      <div className="docs-note"><span>✓</span><p>The CLI persists a project-local cache by default. Vite and PostCSS keep a cache for the lifetime of each plugin instance. Every build remains deterministic when the cache is empty or disabled.</p></div>

      <section className="family-concepts" id="layers"><div><p className="docs-overline">TWO LAYERS</p><h2>Invalidate only the work that changed</h2><p>Source extraction and stylesheet compilation have separate keys and validation rules.</p></div><ol><li><span>01</span><p><strong>Scanner cache:</strong> reuses candidates and diagnostics per file when the scanner contract and file metadata match.</p></li><li><span>02</span><p><strong>Compiler cache:</strong> reuses generated CSS when the input, sorted candidates, options, and imported CSS dependencies still match.</p></li><li><span>03</span><p><strong>Scope cleanup:</strong> detects added and deleted files and removes stale entries from that source scan.</p></li><li><span>04</span><p><strong>Cold equivalence:</strong> disabling or deleting the cache changes performance only, never the generated stylesheet contract.</p></li></ol></section>

      <section className="guide-step" id="direct-api"><div className="step-number">01</div><div><h2>Reuse one cache instance</h2><p>Keep one instance alive for a watch loop, build server, or repeated programmatic compilation. A new in-memory instance starts cold.</p><CodeBlock title="build.mjs" code={`import { readFile } from "node:fs/promises";
import { createIncrementalBuildCache } from "@coordiation/css";

const filename = "/project/src/coordiation.css";
const cache = createIncrementalBuildCache();
const scan = await cache.scanSources(["/project/src"]);
const inputCss = await readFile(filename, "utf8");
const result = await cache.compileWithToolchain(inputCss, scan.candidates, {
  filename,
});

console.log(scan.cache);
console.log(result.cache);`} /></div></section>

      <section className="guide-step" id="cli"><div className="step-number">02</div><div><h2>Use persistent CLI caching</h2><p>One-shot and watch builds use <code>.coordiation-cache/coordiation-css-v1.json</code> by default. The directory is excluded from source discovery.</p><CodeBlock title="Terminal" code={`coordiation-css \\
  --input src/coordiation.css \\
  --output dist/coordiation.css \\
  --content src \\
  --cache-dir .coordiation-cache`} /><p>Use <code>--no-cache</code> for a deliberate cold-build comparison or a read-only environment. Cache writes use a temporary sibling file and atomic rename.</p></div></section>

      <section className="guide-step" id="adapters"><div className="step-number">03</div><div><h2>Let adapters own their process cache</h2><p>The official Vite and PostCSS adapters create one in-memory cache per plugin instance. Their existing watcher and dependency messages remain the invalidation boundary.</p><CodeBlock title="vite.config.js" code={`coordiation({
  content: ["src"],
  cssFile: "src/coordiation.css",
  cache: true,
})`} /><p>Set <code>cache: false</code> only when profiling cold behavior or when a host intentionally owns caching.</p></div></section>

      <section className="guide-step" id="manifest"><div className="step-number">04</div><div><h2>Inspect every cache decision</h2><p>Scanner and compiler results expose compact JSON-safe manifests for logs, tests, and AI tooling.</p><CodeBlock title="Cache manifests" code={`scan.cache = {
  enabled: true,
  persistent: true,
  hits: 14,
  misses: 1,
  removed: 0,
  fingerprint: "…"
}

result.cache = {
  enabled: true,
  persistent: true,
  hit: false,
  key: "…"
}`} /><p>A scan hit means extraction was reused. A compiler hit means the final compiled result was reused. Neither status changes whether a candidate is supported.</p></div></section>

      <section className="family-caveats" id="invalidation"><div><p className="docs-overline">INVALIDATION</p><h2>Know what makes a cache miss</h2><p>Keys include the observable build contract; imported files are validated separately.</p></div><ul><li>Changing prefix, extensions, include/exclude filters, safelist, diagnostics, extractors, or plugins invalidates source entries.</li><li>Editing, adding, or deleting a source file updates the scan result and fingerprint.</li><li>Changing CSS input, candidates, compiler options, or a local CSS import invalidates compilation.</li><li>Runtime extractor and plugin functions are cacheable in the current process, but never trusted across processes.</li><li>A malformed or schema-incompatible persistent cache is ignored; it cannot become generated CSS input.</li></ul></section>

      <section className="family-caveats" id="ai-contract"><div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Use cache data as observability</h2><p>Agents may explain why a rebuild ran, but support discovery remains separate.</p></div><ul><li>Read <code>scan.cache</code> and <code>result.cache</code> before claiming a cache hit or miss.</li><li>Use <code>rejected</code>, <code>/api/utilities</code>, and <code>/api/capabilities</code> to determine class support.</li><li>Keep cache directories project-local and literal in generated commands.</li><li>Prefer one cache instance per build context; do not share one mutable instance across unrelated projects.</li><li>Include <code>sourceMap</code> in the build contract when cached results must retain mappings.</li></ul></section>

      <div className="docs-next split"><Link prefetch={false} href="/docs/tooling/css-toolchain"><span>Previous</span><b>← CSS toolchain</b></Link><Link prefetch={false} href="/docs/tooling/source-maps"><span>Next</span><b>Source maps →</b></Link></div>
    </article>
  );
}
