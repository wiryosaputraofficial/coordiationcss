import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/core/preflight", ...{
  title: "Preflight base styles",
  description: "Understand, extend, or disable the normalized base styles included with Coordiation CSS.",
} });

export default function PreflightPage() {
  return (
    <article className="docs-article">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Core concepts</span><b>/</b><span>Preflight</span></div>
      <p className="docs-overline">BASE STYLES · COMPLETE IN 0.2</p>
      <h1>Preflight</h1>
      <p className="docs-lead">A deliberate cross-browser foundation that removes inconsistent browser defaults and makes Coordiation utilities behave predictably.</p>
      <div className="docs-note"><span>✓</span><p>Preflight is emitted automatically inside <code>@layer co-base</code>. Every rule group is exposed through <code>preflightRegistry</code>, covered by tests, and removable through a documented option.</p></div>

      <section className="family-reference" id="coverage">
        <div><p className="docs-overline">COVERAGE</p><h2>What Preflight normalizes</h2><p>The reset targets browser inconsistencies while leaving component appearance to explicit utilities and your design system.</p></div>
        <div className="family-reference-table">
          <div className="family-reference-head"><span>Area</span><span>Behavior</span></div>
          {[
            ["Box model", "border-box, zero margin/padding, solid zero-width borders"],
            ["Typography", "theme fonts, inherited headings and links, consistent line height"],
            ["Lists", "no marker until a list utility is applied"],
            ["Media", "block alignment and responsive intrinsic sizing"],
            ["Forms", "inherited type, transparent controls, normalized buttons and placeholders"],
            ["Browser controls", "search, date/time, number, file, and invalid-state fixes"],
            ["Hidden content", "hidden stays hidden except hidden=until-found"],
          ].map(([area, behavior]) => <div className="family-reference-row" key={area}><code>{area}</code><span>{behavior}</span></div>)}
        </div>
      </section>

      <section className="family-example" id="automatic-layer">
        <p className="docs-overline">AUTOMATIC BASE LAYER</p><h2>Start from explicit design decisions</h2>
        <p>Headings, links, lists, and borders do not inherit opinionated browser presentation. Apply utilities when those semantics need a visual style.</p>
        <CodeBlock title="HTML" code={`<h1 class="co-text-4xl co-font-bold">Account settings</h1>

<ul role="list" class="co-list-inside co-list-disc">
  <li>Profile</li>
  <li>Security</li>
</ul>

<img class="co-max-w-none" src="chart.png" alt="Quarterly revenue" />`} />
        <div className="docs-callout"><strong>Accessibility</strong><p>Some screen readers do not announce an unstyled list. Keep list semantics explicit with <code>role=&quot;list&quot;</code> when markers are intentionally removed.</p></div>
      </section>

      <section className="family-example" id="forms-and-media">
        <p className="docs-overline">FORMS AND MEDIA</p><h2>Consistent controls without a component theme</h2>
        <p>Inputs inherit typography, placeholders receive a predictable color and opacity, textareas resize vertically, and common WebKit and Firefox control differences are normalized. Images and videos are block-level and responsive by default.</p>
        <CodeBlock title="HTML" code={`<label class="co-grid co-gap-2">
  Email
  <input class="co-rounded-md co-border co-p-3" placeholder="you@example.com" />
</label>

<textarea class="co-min-h-[8rem] co-rounded-md co-border co-p-3"></textarea>`} />
      </section>

      <section className="family-example" id="extend-preflight">
        <p className="docs-overline">EXTENDING PREFLIGHT</p><h2>Add project defaults in the same layer</h2>
        <p>Author additional rules after <code>@coordiation</code>. Rules in your later <code>co-base</code> layer extend or override generated defaults without increasing selector specificity.</p>
        <CodeBlock title="input.css" code={`@coordiation;

@layer co-base {
  h1 { font-size: 2rem; }
  a { text-decoration-line: underline; }
  .third-party-map * { border-style: none; }
}`} />
      </section>

      <section className="family-example" id="disable-preflight">
        <p className="docs-overline">DISABLING PREFLIGHT</p><h2>Keep an existing application reset</h2>
        <p>Disable Preflight when integrating Coordiation into an application that already owns its base styles. Theme variables and generated utilities remain available.</p>
        <CodeBlock title="Vite or PostCSS" code={`coordiation({
  content: ["src"],
  preflight: false
})`} />
        <CodeBlock title="CLI" code={`coordiation-css \
  -i src/input.css \
  -o dist/styles.css \
  --content src \
  --no-preflight`} />
      </section>

      <section className="family-caveats">
        <div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Know the baseline before generating</h2><p>Agents can inspect the package exports <code>preflightRegistry</code> and <code>preflightCss</code> to determine the exact browser baseline.</p></div>
        <ul><li>Assume Preflight is enabled unless configuration explicitly disables it.</li><li>Do not recreate margins, heading sizes, list markers, or link colors as implicit browser defaults.</li><li>Prefer utilities for component styling and <code>@layer co-base</code> for project-wide element defaults.</li><li>Preserve <code>hidden=&quot;until-found&quot;</code> behavior.</li><li>When disabling Preflight, state that the host application owns normalization.</li></ul>
      </section>

      <div className="docs-next split"><Link href="/docs"><span>Previous</span><b>Installation</b></Link><Link href="/docs/variants/attribute-selectors"><span>Next</span><b>Attribute selectors →</b></Link></div>
    </article>
  );
}
