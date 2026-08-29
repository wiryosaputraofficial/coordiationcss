import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Modern color and Display-P3",
  description: "Author perceptual colors, wide-gamut fallbacks, color mixing, and modern gradient interpolation with Coordiation CSS.",
};

const interpolationSpaces = [
  ["/srgb", "in srgb", "Compatibility-oriented RGB interpolation"],
  ["/srgb-linear", "in srgb-linear", "Linear-light RGB interpolation"],
  ["/hsl", "in hsl", "Cylindrical legacy color interpolation"],
  ["/lab", "in lab", "Perceptual CIE Lab interpolation"],
  ["/lch", "in lch", "Cylindrical CIE LCH interpolation"],
  ["/oklab", "in oklab", "Default perceptual interpolation"],
  ["/oklch", "in oklch", "Perceptual cylindrical interpolation"],
  ["/display-p3", "in display-p3", "Wide-gamut RGB interpolation"],
];

export default function ModernColorPage() {
  return (
    <article className="docs-article">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Core concepts</span><b>/</b><span>Modern color</span></div>
      <p className="docs-overline">COLOR LEVEL 4 · COMPLETE IN 0.3</p>
      <h1>Modern color and Display-P3</h1>
      <p className="docs-lead">Use perceptual color spaces, wide-gamut theme tokens, explicit fallbacks, opacity mixing, and predictable gradient interpolation without adding browser runtime code.</p>
      <div className="docs-note"><span>✓</span><p>The release gate covers OKLab and OKLCH palettes, Lab, LCH, Display-P3, CSS <code>color-mix()</code>, eight gradient interpolation spaces, hue-path controls, slash opacity, and progressive wide-gamut fallback behavior.</p></div>

      <section className="family-example" id="p3-theme-tokens">
        <p className="docs-overline">CSS-FIRST PALETTE</p><h2>Pair every P3 color with a fallback</h2>
        <p>Declare the ordinary token first, then add a <code>--p3</code> companion. Coordiation emits the fallback at the root and promotes the P3 value only when the browser understands Display-P3 and the output device reports a P3 gamut.</p>
        <CodeBlock title="app.css" code={`@co-theme {
  --co-color-signal: oklch(64% 0.22 29);
  --co-color-signal--p3: color(display-p3 1 0.16 0.08);
}

@coordiation;`} />
        <CodeBlock title="component.coord" code={`<button class="co-bg-signal co-text-white hover:co-bg-signal/80">
  Publish
</button>`} />
        <div className="docs-callout"><strong>Fallback contract</strong><p>The <code>--p3</code> token is compiler metadata, not a second public utility name. Continue using <code>co-bg-signal</code>, <code>co-text-signal</code>, and other ordinary color utilities.</p></div>
      </section>

      <section className="family-reference" id="gradient-interpolation">
        <div><p className="docs-overline">INTERPOLATION</p><h2>Choose how gradient colors travel</h2><p>Add one modifier to a linear, radial, or conic gradient. Without a modifier, Coordiation uses OKLab.</p></div>
        <div className="family-reference-table" role="table">
          <div className="family-reference-head" role="row"><span>Modifier</span><span>Generated method and purpose</span></div>
          {interpolationSpaces.map(([modifier, css, purpose]) => <div className="family-reference-row" role="row" key={modifier}><code>{modifier}</code><span><code>{css}</code> — {purpose}</span></div>)}
        </div>
        <CodeBlock title="component.coord" code={`<div class="co-bg-linear-to-r/display-p3 co-from-signal co-to-brand-500"></div>
<div class="co-bg-radial/oklch co-from-white co-to-brand-900"></div>
<div class="co-bg-conic/decreasing co-from-brand-400 co-via-pink co-to-brand-400"></div>`} />
      </section>

      <section className="family-example" id="arbitrary-colors">
        <p className="docs-overline">DIRECT AUTHORING</p><h2>Use typed arbitrary colors for one-off values</h2>
        <p>All color-consuming utilities accept safe Color Level 4 syntax. Keep the <code>color:</code> hint when a value could be interpreted as another utility type.</p>
        <CodeBlock title="component.coord" code={`<aside class="co-bg-[color:color(display-p3_0.1_0.7_1)] co-text-[color:lab(96%_-4_-8)]">
  Wide-gamut panel
</aside>

<svg class="co-fill-[color:color-mix(in_oklch,red_35%,blue)]">
  <!-- paths -->
</svg>`} />
      </section>

      <section className="family-concepts" id="how-it-works">
        <div><p className="docs-overline">PROGRESSIVE ENHANCEMENT</p><h2>One class, two gamut levels</h2></div>
        <ol>
          <li><span>01</span><p><strong>Fallback first:</strong> the normal <code>--co-color-*</code> token works on ordinary displays.</p></li>
          <li><span>02</span><p><strong>Syntax check:</strong> <code>@supports</code> prevents browsers without Display-P3 parsing from using the enhancement.</p></li>
          <li><span>03</span><p><strong>Device check:</strong> <code>@media (color-gamut: p3)</code> limits the override to capable output devices.</p></li>
          <li><span>04</span><p><strong>Stable utility:</strong> generated classes always reference the same public token variable.</p></li>
          <li><span>05</span><p><strong>Static output:</strong> no JavaScript or client-side gamut detection is emitted.</p></li>
        </ol>
      </section>

      <section className="family-caveats" id="ai-contract">
        <div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Make gamut decisions inspectable</h2><p>Agents can query the complete Modern color capability before producing palette or gradient code.</p></div>
        <ul><li>Prefer named theme colors over repeated arbitrary values.</li><li>Never emit a <code>--p3</code> token without a same-name fallback.</li><li>Use OKLCH or OKLab for perceptual palette work; use Display-P3 only when wider gamut is intentional.</li><li>Keep gradient interpolation modifiers literal and choose them for a documented visual reason.</li><li>Use typed arbitrary color syntax only for source-controlled one-off values.</li></ul>
      </section>

      <div className="docs-next split"><Link href="/docs/core/logical-properties"><span>Previous</span><b>← Logical properties</b></Link><Link href="/docs/utilities/backgrounds"><span>Next</span><b>Backgrounds →</b></Link></div>
    </article>
  );
}
