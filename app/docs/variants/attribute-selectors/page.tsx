import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/variants/attribute-selectors", ...{
  title: "Attribute and selector variants",
  description: "Use ARIA, data, has, not, group, peer, and arbitrary selector variants in Coordiation CSS.",
} });

const ariaStates = ["busy", "checked", "disabled", "expanded", "hidden", "pressed", "readonly", "required", "selected"];

export default function AttributeSelectorsPage() {
  return (
    <article className="docs-article">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Core concepts</span><b>/</b><span>Attribute selectors</span></div>
      <p className="docs-overline">VARIANTS · COMPLETE IN 0.2</p>
      <h1>Attribute and selector variants</h1>
      <p className="docs-lead">Conditionally apply any Coordiation utility using accessible ARIA state, application data, descendant state, negation, or a literal custom selector.</p>
      <div className="docs-note"><span>✓</span><p>This capability is registry-backed and exhaustively tested. Unknown boolean ARIA shortcuts and unsafe selector fragments are rejected instead of generating invalid CSS.</p></div>

      <section className="family-reference" id="quick-reference">
        <div><p className="docs-overline">QUICK REFERENCE</p><h2>Variant syntax</h2><p>Variants are literal prefixes placed before a supported utility. They can be stacked with responsive, dark, group, peer, and state variants.</p></div>
        <div className="family-reference-table">
          <div className="family-reference-head"><span>Pattern</span><span>Selector behavior</span></div>
          {[
            ["aria-expanded:co-*", '&[aria-expanded="true"]'],
            ["aria-[sort=ascending]:co-*", '&[aria-sort="ascending"]'],
            ["data-active:co-*", "&[data-active]"],
            ["data-[state=open]:co-*", '&[data-state="open"]'],
            ["has-checked:co-*", "&:has(:checked)"],
            ["not-focus:co-*", "&:not(:focus)"],
            ["[&.is-ready]:co-*", "&.is-ready"],
          ].map(([variant, selector]) => <div className="family-reference-row" key={variant}><code>{variant}</code><code>{selector}</code></div>)}
        </div>
      </section>

      <section className="family-example" id="aria-states">
        <p className="docs-overline">ARIA STATES</p><h2>Style accessible state directly</h2>
        <p>Boolean ARIA shortcuts target the explicit value <code>true</code>. Supported names are {ariaStates.map((state, index) => <span key={state}><code>{state}</code>{index < ariaStates.length - 1 ? ", " : "."}</span>)}</p>
        <CodeBlock title="HTML" code={`<button
  aria-expanded="true"
  class="co-bg-white aria-expanded:co-bg-black aria-expanded:co-text-white"
>
  Menu
</button>`} />
        <CodeBlock title="Generated CSS" code={`.aria-expanded\\:co-bg-black[aria-expanded="true"] {
  background-color: var(--co-color-black);
}`} />
      </section>

      <section className="family-example" id="attribute-values">
        <p className="docs-overline">ARBITRARY VALUES</p><h2>Match a specific attribute value</h2>
        <p>Use brackets when an ARIA or data attribute is not boolean. Underscores become spaces, and generated attribute values are quoted safely.</p>
        <CodeBlock title="HTML" code={`<th aria-sort="ascending" class="aria-[sort=ascending]:co-bg-black">
  Invoice
</th>

<div data-state="open" class="data-[state=open]:co-block">
  Panel content
</div>`} />
      </section>

      <section className="family-example" id="relationships">
        <p className="docs-overline">GROUP AND PEER</p><h2>Respond to parent or sibling attributes</h2>
        <p>Attribute conditions compose with named markers, keeping nested menus, tables, and form controls unambiguous.</p>
        <CodeBlock title="HTML" code={`<div class="co-group/menu" data-state="open">
  <button>Toggle menu</button>
  <div class="co-hidden group-data-[state=open]/menu:co-block">
    Menu content
  </div>
</div>

<input class="co-peer/email" aria-invalid="true" />
<p class="co-hidden peer-aria-[invalid=true]/email:co-block">
  Enter a valid email address.
</p>`} />
      </section>

      <section className="family-example" id="has-and-not">
        <p className="docs-overline">DESCENDANTS AND NEGATION</p><h2>Use has and not without template logic</h2>
        <p><code>has-*</code> reacts to matching descendants. <code>not-*</code> applies a utility only when its condition does not match.</p>
        <CodeBlock title="HTML" code={`<label class="co-border has-checked:co-ring-2">
  <input type="checkbox" /> Enable notifications
</label>

<button class="not-focus:co-opacity-50">Save</button>
<article class="has-[img]:co-p-0">...</article>`} />
      </section>

      <section className="family-example" id="arbitrary-selectors">
        <p className="docs-overline">ARBITRARY SELECTORS</p><h2>Place the target with an ampersand</h2>
        <p>Wrap a one-off selector in brackets and use <code>&amp;</code> where the generated utility selector belongs. Spaces are written as underscores so source scanning stays deterministic.</p>
        <CodeBlock title="HTML" code={`<li class="[&.is-dragging]:co-cursor-pointer">Draggable item</li>
<div class="[&_p]:co-mt-4">
  <p>Every nested paragraph receives margin.</p>
</div>`} />
      </section>

      <section className="family-caveats">
        <div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Keep selectors discoverable</h2><p>Agents can inspect <code>attributeVariantRegistry</code> and validate concrete classes with <code>compileCandidates()</code>.</p></div>
        <ul><li>Generate complete literal class strings; never concatenate a variant at runtime.</li><li>Prefer named boolean ARIA and data-existence variants over brackets.</li><li>Use brackets only for explicit values or one-off selectors.</li><li>Rejected candidates must be reported instead of silently replaced.</li></ul>
      </section>

      <div className="docs-next split"><Link href="/docs/utilities/arbitrary-properties"><span>Previous</span><b>Arbitrary properties</b></Link><Link href="/release-check"><span>Tracker</span><b>Release Check →</b></Link></div>
    </article>
  );
}
