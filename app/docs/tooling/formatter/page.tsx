import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/tooling/formatter", ...{ title: "Class formatter — Coordiation CSS", description: "Sort literal Coordiation class lists with the compiler's canonical order." } });

export default function FormatterPage() {
  return <article className="docs-article vite-guide">
    <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Tooling</span><b>/</b><span>Class formatter</span></div>
    <p className="docs-overline">TOOLING · COMPLETE</p><h1>Class formatter</h1>
    <p className="docs-lead">Keep class lists deterministic with the exact comparator used by the compiler. Application classes stay stable, Coordiation utilities follow canonical CSS order, and runtime expressions remain untouched.</p>
    <div className="docs-note"><span>✓</span><p><code>@coordiation/formatter</code> does not maintain a second ordering table. Every framework comparison delegates to <code>compareCandidates()</code> from <code>@coordiation/css</code>.</p></div>

    <section className="guide-step" id="check"><div className="step-number">01</div><div><h2>Check formatting in automation</h2><CodeBlock title="Terminal" code={`npm install -D @coordiation/formatter
coordiation-format src/App.tsx --check`} /><p>Check mode exits with code 1 when a literal class list needs changes. It never rewrites a file.</p></div></section>
    <section className="guide-step" id="write"><div className="step-number">02</div><div><h2>Apply canonical order</h2><CodeBlock title="Before" code={`<article class="co-p-4 card hover:co-bg-black co-flex co-m-2">`} /><CodeBlock title="After" code={`<article class="card co-flex co-m-2 co-p-4 hover:co-bg-black">`} /><p>Use <code>--write</code> to replace files, stdin/stdout for editor pipelines, or <code>--json</code> for a machine-readable changed-file report.</p></div></section>
    <section className="guide-step" id="api"><div className="step-number">03</div><div><h2>Use exact edit data programmatically</h2><CodeBlock title="format.mjs" code={`import { formatSourceDetailed } from "@coordiation/formatter";

const result = formatSourceDetailed(source, { prefix: "co-" });
console.log(result.changed, result.edits, result.code);`} /><p>The package also exports <code>sortClassList()</code>, <code>formatSource()</code>, <code>checkSource()</code>, and <code>formatterManifest</code>.</p></div></section>
    <section className="family-caveats" id="boundaries"><div><p className="docs-overline">SAFE BOUNDARIES</p><h2>Literal classes only</h2><p>The formatter changes source only where ordering is provably safe.</p></div><ul><li>Supports class, className, class:list, :class, and v-bind:class literal values.</li><li>Preserves unknown application classes in their original relative order.</li><li>Preserves template interpolation and string concatenation.</li><li>Uses the configured prefix for recognition.</li><li>Does not deduplicate or invent candidates.</li></ul></section>
    <section className="family-caveats" id="ai-contract"><div><p className="docs-overline">AI CONTRACT</p><h2>Never recreate the order</h2><p>Agents should call the formatter instead of sorting from memory.</p></div><ul><li>Use check mode before proposing a formatting-only change.</li><li>Read exact edits when explaining what changed.</li><li>Leave dynamic expressions unchanged.</li><li>Do not treat an unknown application class as unsupported Coordiation syntax.</li></ul></section>
    <div className="docs-next split"><Link prefetch={false} href="/docs/tooling/language-server"><span>Previous</span><b>← IntelliSense &amp; LSP</b></Link><Link prefetch={false} href="/docs/tooling/upgrade"><span>Next</span><b>Upgrade &amp; codemods →</b></Link></div>
  </article>;
}
