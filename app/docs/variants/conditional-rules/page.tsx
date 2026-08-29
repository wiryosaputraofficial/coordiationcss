import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Conditional variants",
  description: "Use media, feature, container, starting-style, and arbitrary conditional variants in Coordiation CSS.",
};

const quickReference = [
  ["motion-safe:co-*", "@media (prefers-reduced-motion: no-preference)"],
  ["pointer-fine:co-*", "@media (pointer: fine)"],
  ["supports-[display:grid]:co-*", "@supports (display:grid)"],
  ["not-supports-[display:grid]:co-*", "@supports not (display:grid)"],
  ["@md:co-*", "@container (width >= 48rem)"],
  ["@md/sidebar:co-*", "@container sidebar (width >= 48rem)"],
  ["starting:co-*", "@starting-style"],
  ["[@media(pointer:fine)]:co-*", "@media (pointer:fine)"],
];

export default function ConditionalRulesPage() {
  return (
    <article className="docs-article">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Core concepts</span><b>/</b><span>Conditional variants</span></div>
      <p className="docs-overline">VARIANTS · COMPLETE IN 0.2</p>
      <h1>Conditional variants</h1>
      <p className="docs-lead">Apply utilities only when a media feature, browser capability, container size, or starting-style condition matches—without adding runtime JavaScript.</p>
      <div className="docs-note"><span>✓</span><p>Every documented condition is registry-backed and tested. Unsafe at-rule fragments are rejected, and named container queries use the same breakpoint tokens as responsive design.</p></div>

      <section className="family-reference" id="quick-reference">
        <div><p className="docs-overline">QUICK REFERENCE</p><h2>Conditional syntax</h2><p>Place a conditional variant before any supported utility. Stack it with state, context, responsive, or selector variants when multiple conditions must hold.</p></div>
        <div className="family-reference-table">
          <div className="family-reference-head"><span>Pattern</span><span>Generated wrapper</span></div>
          {quickReference.map(([variant, atRule]) => <div className="family-reference-row" key={variant}><code>{variant}</code><code>{atRule}</code></div>)}
        </div>
      </section>

      <section className="family-example" id="media-features">
        <p className="docs-overline">MEDIA FEATURES</p><h2>Respect user and device preferences</h2>
        <p>Registered variants cover print, orientation, reduced motion, contrast, forced or inverted colors, primary and any-pointer precision, and environments where scripting is unavailable.</p>
        <CodeBlock title="HTML" code={`<button class="co-transition motion-reduce:co-transition-none pointer-fine:co-cursor-pointer">
  Continue
</button>

<aside class="co-hidden print:co-block noscript:co-block">
  Offline instructions
</aside>`} />
        <p>Available names: <code>print</code>, <code>portrait</code>, <code>landscape</code>, <code>motion-safe</code>, <code>motion-reduce</code>, <code>contrast-more</code>, <code>contrast-less</code>, <code>forced-colors</code>, <code>inverted-colors</code>, <code>pointer-fine</code>, <code>pointer-coarse</code>, <code>pointer-none</code>, <code>any-pointer-fine</code>, <code>any-pointer-coarse</code>, <code>any-pointer-none</code>, and <code>noscript</code>.</p>
      </section>

      <section className="family-example" id="feature-queries">
        <p className="docs-overline">FEATURE QUERIES</p><h2>Branch on CSS support</h2>
        <p>Put a declaration condition in brackets. Prefix with <code>not-supports-</code> for a fallback. A property-only shortcut generates a probe against <code>var(--co-support)</code>.</p>
        <CodeBlock title="HTML" code={`<section class="co-block supports-[display:grid]:co-grid">
  ...
</section>

<section class="not-supports-[display:grid]:co-block">
  Grid fallback
</section>

<div class="supports-backdrop-filter:co-block">...</div>`} />
      </section>

      <section className="family-example" id="container-queries">
        <p className="docs-overline">CONTAINER QUERIES</p><h2>Respond to a component&apos;s available space</h2>
        <p>First establish an inline-size container. Add a name when nested components need to address a specific ancestor, then use the <code>@</code> query prefix.</p>
        <CodeBlock title="HTML" code={`<aside class="co-container-inline-size co-container-name-[sidebar]">
  <div class="co-grid @md/sidebar:co-grid-cols-2 @max-md/sidebar:co-grid-cols-1">
    ...
  </div>
</aside>`} />
        <CodeBlock title="Container query forms" code={`@md:co-grid
@max-lg:co-hidden
@min-[30rem]:co-flex
@max-[60rem]:co-block
@[width>=25rem]:co-grid
@md/sidebar:co-grid-cols-2`} />
        <p><code>co-container-normal</code>, <code>co-container-size</code>, and <code>co-container-inline-size</code> set the query type. Use <code>co-container-name-[name]</code> or <code>co-container-name-none</code> for naming.</p>
      </section>

      <section className="family-example" id="arbitrary-at-rules">
        <p className="docs-overline">ARBITRARY AT-RULES</p><h2>Express an uncommon safe condition</h2>
        <p>Use a bracketed at-rule when no registered variant describes the condition. Coordiation accepts <code>@media</code>, <code>@supports</code>, and <code>@container</code>; declaration blocks and unknown at-rules are rejected.</p>
        <CodeBlock title="HTML" code={`<div class="[@media(pointer:fine)]:co-block">...</div>
<div class="[@supports(display:grid)]:co-grid">...</div>
<div class="[@container(width>30rem)]:co-flex">...</div>`} />
      </section>

      <section className="family-example" id="starting-style">
        <p className="docs-overline">ENTRY TRANSITIONS</p><h2>Define the starting style</h2>
        <p>The <code>starting:</code> variant emits <code>@starting-style</code>, so browsers can animate an element from its initial appearance into its normal style.</p>
        <CodeBlock title="HTML" code={`<dialog class="co-opacity-100 starting:co-opacity-0 co-transition">
  Welcome
</dialog>`} />
      </section>

      <section className="family-caveats">
        <div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Generate verifiable conditions</h2><p>Agents can inspect <code>conditionalVariantRegistry</code>, query <code>/api/capabilities</code>, and validate final classes with <code>compileCandidates()</code>.</p></div>
        <ul><li>Prefer registered media names and named breakpoint tokens.</li><li>Emit the container type and name on an ancestor before emitting a named container variant.</li><li>Keep the entire class literal so the scanner can discover the <code>@</code> variant.</li><li>Use arbitrary at-rules only for conditions not represented by the registry.</li><li>Report every rejected candidate instead of guessing a replacement.</li></ul>
      </section>

      <div className="docs-next split"><Link href="/docs/variants/attribute-selectors"><span>Previous</span><b>Attribute selectors</b></Link><Link href="/release-check"><span>Tracker</span><b>Release Check →</b></Link></div>
    </article>
  );
}
