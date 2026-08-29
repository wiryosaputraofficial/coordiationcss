import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import ConditionalExamples, { ConditionalMiniNavigation } from "./ConditionalExamples";

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
    <div className="family-page-frame mini-nav-page-frame">
    <article className="docs-article">
      <div className="docs-breadcrumb" id="overview"><Link href="/docs">Docs</Link><b>/</b><span>Core concepts</span><b>/</b><span>Conditional variants</span></div>
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

      <ConditionalExamples />

      <section className="family-caveats" id="ai-contract">
        <div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Generate verifiable conditions</h2><p>Agents can inspect <code>conditionalVariantRegistry</code>, query <code>/api/capabilities</code>, and validate final classes with <code>compileCandidates()</code>.</p></div>
        <ul><li>Prefer registered media names and named breakpoint tokens.</li><li>Emit the container type and name on an ancestor before emitting a named container variant.</li><li>Keep the entire class literal so the scanner can discover the <code>@</code> variant.</li><li>Use arbitrary at-rules only for conditions not represented by the registry.</li><li>Report every rejected candidate instead of guessing a replacement.</li></ul>
      </section>

      <div className="docs-next split"><Link href="/docs/variants/attribute-selectors"><span>Previous</span><b>Attribute selectors</b></Link><Link href="/release-check"><span>Tracker</span><b>Release Check →</b></Link></div>
    </article>
    <ConditionalMiniNavigation />
    </div>
  );
}
