import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/core/logical-properties", ...{
  title: "Logical properties and writing modes",
  description: "Build direction-aware horizontal, vertical, and bidirectional layouts with Coordiation CSS.",
} });

const writingModes = [
  ["co-writing-horizontal-tb", "writing-mode: horizontal-tb", "Horizontal lines; blocks flow top to bottom"],
  ["co-writing-vertical-rl", "writing-mode: vertical-rl", "Vertical lines; blocks flow right to left"],
  ["co-writing-vertical-lr", "writing-mode: vertical-lr", "Vertical lines; blocks flow left to right"],
  ["co-writing-sideways-rl", "writing-mode: sideways-rl", "Sideways text; blocks flow right to left"],
  ["co-writing-sideways-lr", "writing-mode: sideways-lr", "Sideways text; blocks flow left to right"],
];

const bidiUtilities = [
  ["co-direction-ltr / co-direction-rtl", "Set the inline base direction"],
  ["co-unicode-bidi-normal", "Use ordinary bidirectional reordering"],
  ["co-unicode-bidi-embed", "Create a directional embedding"],
  ["co-unicode-bidi-isolate", "Isolate the fragment from surrounding directionality"],
  ["co-unicode-bidi-override", "Override character direction using the chosen base direction"],
  ["co-unicode-bidi-isolate-override", "Combine isolation and directional override"],
  ["co-unicode-bidi-plaintext", "Infer each paragraph direction from its content"],
];

export default function LogicalPropertiesPage() {
  return (
    <article className="docs-article">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Core concepts</span><b>/</b><span>Logical properties</span></div>
      <p className="docs-overline">INTERNATIONAL LAYOUT · COMPLETE IN 0.3</p>
      <h1>Logical properties and writing modes</h1>
      <p className="docs-lead">Build one component that follows left-to-right, right-to-left, horizontal, vertical, and sideways writing systems without rewriting its physical edges.</p>
      <div className="docs-note"><span>✓</span><p>The release gate now covers direction, all five standard writing modes, glyph orientation, Unicode bidi controls, upright text composition, and the logical spacing, inset, sizing, border, radius, float, clear, and scroll utilities that respond to them.</p></div>

      <section className="family-example" id="semantic-direction">
        <p className="docs-overline">DIRECTION FIRST</p><h2>Keep document meaning in markup</h2>
        <p>For HTML content, prefer the semantic <code>dir</code> attribute and use <code>bdi</code> or <code>bdo</code> for isolated text fragments. Use direction utilities when styling generated structures, non-HTML documents, or tightly controlled components.</p>
        <CodeBlock title="component.coord" code={`<article dir="rtl" class="co-ps-6 co-border-s-2">
  <h2>واجهة متعددة اللغات</h2>
  <p>Logical start follows the document direction.</p>
</article>

<span>Order ID: <bdi>INV-2048</bdi></span>`} />
        <div className="docs-callout"><strong>AI rule</strong><p>Do not add <code>co-direction-rtl</code> merely to mirror a visual layout. Direction describes reading order; use the <code>rtl:</code> variant only for conditional styling inside an established RTL context.</p></div>
      </section>

      <section className="family-reference" id="writing-modes">
        <div><p className="docs-overline">WRITING MODE</p><h2>Choose block flow explicitly</h2><p>Writing mode changes which physical dimension represents inline size and block size. Logical utilities follow that mapping automatically.</p></div>
        <div className="family-reference-table" role="table">
          <div className="family-reference-head" role="row"><span>Class</span><span>Generated CSS and purpose</span></div>
          {writingModes.map(([candidate, css, purpose]) => <div className="family-reference-row" role="row" key={candidate}><code>{candidate}</code><span><code>{css};</code> {purpose}</span></div>)}
        </div>
      </section>

      <section className="family-example" id="vertical-layout">
        <p className="docs-overline">VERTICAL COMPONENT</p><h2>Compose with logical dimensions and edges</h2>
        <p>The same inline, block, padding, inset, border, and logical-radius classes remain meaningful when the block axis rotates.</p>
        <CodeBlock title="component.coord" code={`<section class="co-writing-vertical-rl co-inline-48 co-block-64 co-pbs-4 co-pbe-8 co-border-s-2 co-rounded-se-lg">
  <h2 class="co-text-orientation-upright">縦書き</h2>
  <p>Logical layout follows the active writing mode.</p>
</section>`} />
      </section>

      <section className="family-reference" id="bidi-controls">
        <div><p className="docs-overline">BIDIRECTIONAL TEXT</p><h2>Isolate before overriding</h2><p>Mixed scripts usually need isolation, not a forced override. Overrides deliberately ignore inherent character direction and should be rare.</p></div>
        <div className="family-reference-table" role="table">
          <div className="family-reference-head" role="row"><span>Class</span><span>Behavior</span></div>
          {bidiUtilities.map(([candidate, behavior]) => <div className="family-reference-row" role="row" key={candidate}><code>{candidate}</code><span>{behavior}</span></div>)}
        </div>
      </section>

      <section className="family-example" id="glyph-orientation">
        <p className="docs-overline">GLYPH ORIENTATION</p><h2>Control text inside vertical lines</h2>
        <p>Use <code>co-text-orientation-mixed</code>, <code>co-text-orientation-upright</code>, or <code>co-text-orientation-sideways</code>. Short horizontal runs can be combined into one upright glyph cell.</p>
        <CodeBlock title="component.coord" code={`<p class="co-writing-vertical-rl co-text-orientation-mixed">
  平成<span class="co-text-combine-digits-2">20</span>年
</p>

<!-- Available composition values -->
<span class="co-text-combine-none">12</span>
<span class="co-text-combine-all">AB</span>
<span class="co-text-combine-digits-2">12</span>
<span class="co-text-combine-digits-3">123</span>
<span class="co-text-combine-digits-4">2026</span>`} />
      </section>

      <section className="family-concepts" id="logical-map">
        <div><p className="docs-overline">FLOW-RELATIVE MAP</p><h2>Utilities that follow the writing system</h2></div>
        <ol>
          <li><span>01</span><p><strong>Spacing:</strong> <code>ps/pe/pbs/pbe</code> and <code>ms/me/mbs/mbe</code>.</p></li>
          <li><span>02</span><p><strong>Positioning:</strong> <code>inset-s/e/bs/be</code> and compatibility <code>start/end</code>.</p></li>
          <li><span>03</span><p><strong>Sizing:</strong> <code>inline</code>, <code>block</code>, and their <code>min/max</code> forms.</p></li>
          <li><span>04</span><p><strong>Borders:</strong> <code>border-s/e/bs/be</code> plus logical <code>rounded-s/e/ss/se/es/ee</code>.</p></li>
          <li><span>05</span><p><strong>Scrolling:</strong> logical scroll margin and padding use the same edge suffixes.</p></li>
        </ol>
      </section>

      <section className="family-caveats" id="ai-contract">
        <div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Track semantics and browser boundaries</h2><p>Agents can query the complete Layout family and the Logical properties capability before generating internationalized components.</p></div>
        <ul><li>Prefer semantic direction markup for HTML text.</li><li>Prefer logical edges and dimensions once direction or writing mode can vary.</li><li>Use bidi isolation for untrusted or unknown-direction fragments; do not infer an override.</li><li>Treat sideways writing and digit composition as progressive enhancement.</li><li>Keep every utility literal so the scanner and reviewers can track the writing-system decision.</li></ul>
      </section>

      <div className="docs-next split"><Link href="/docs/core/preflight"><span>Previous</span><b>← Preflight</b></Link><Link href="/docs/utilities/layout"><span>Next</span><b>Layout →</b></Link></div>
    </article>
  );
}
