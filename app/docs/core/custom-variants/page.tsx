import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Custom variants — Coordiation CSS",
  description: "Register project selector, conditional, and compound variants with validation and an AI-readable manifest.",
};

export default function CustomVariantsPage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Core concepts</span><b>/</b><span>Custom variants</span></div>
      <p className="docs-overline">CORE CONCEPT · COMPLETE</p>
      <h1>Custom variants</h1>
      <p className="docs-lead">Teach the compiler a project-owned context once, then compose it with every utility, breakpoint, state, relationship, and important modifier already supported by Coordiation.</p>
      <div className="docs-note"><span>✓</span><p>Variant names do not inherit the utility prefix. A definition named <code>theme-midnight</code> is always used as <code>theme-midnight:co-…</code>, even when the project changes <code>co-</code> to another prefix.</p></div>

      <section className="guide-step" id="selector"><div className="step-number">01</div><div><h2>Register a selector context</h2><p>Put the generated class at the explicit <code>&amp;</code> position. This keeps ownership and selector behavior visible in the CSS entry.</p><CodeBlock title="src/coordiation.css" code={`@coordiation;

@co-variant theme-midnight (
  &:where([data-theme="midnight"] *)
);

@co-variant data-active (&[data-active]);`} /><CodeBlock title="Template" code={`<section class="theme-midnight:co-bg-black data-active:co-ring-2">
  ...
</section>`} /></div></section>

      <section className="guide-step" id="conditional"><div className="step-number">02</div><div><h2>Register a conditional at-rule</h2><p>Conditional shorthand accepts only media, feature-support, and container queries. A selector placeholder is unnecessary because the at-rule wraps the generated rule.</p><CodeBlock title="src/coordiation.css" code={`@co-variant pointer-accurate (@media (pointer: fine));
@co-variant grid-ready (@supports (display: grid));
@co-variant card-wide (@container (width >= 32rem));`} /><CodeBlock title="Template" code={`<div class="grid-ready:co-grid card-wide:co-grid-cols-2"></div>`} /></div></section>

      <section className="guide-step" id="compound"><div className="step-number">03</div><div><h2>Compose wrappers around one slot</h2><p>Use block form when one variant needs both a condition and selector. The wrapper chain must contain exactly one namespaced <code>@co-slot;</code>.</p><CodeBlock title="src/coordiation.css" code={`@co-variant any-hover {
  @media (any-hover: hover) {
    &:hover {
      @co-slot;
    }
  }
}`} /><CodeBlock title="Template" code={`<a class="md:any-hover:!co-underline">Documentation</a>`} /></div></section>

      <section className="family-concepts" id="composition"><div><p className="docs-overline">COMPOSITION CONTRACT</p><h2>One variant, the whole compiler</h2><p>Custom definitions use the same candidate pipeline as built-ins.</p></div><ol><li><span>01</span><p><strong>Stacking:</strong> combine custom variants with responsive, state, attribute, group, peer, and conditional variants.</p></li><li><span>02</span><p><strong>Important:</strong> leading or trailing important syntax still applies to every declaration.</p></li><li><span>03</span><p><strong>Override:</strong> an exact project variant name deliberately takes priority over the built-in registry.</p></li><li><span>04</span><p><strong>Static output:</strong> directives disappear after compilation; no browser runtime is added.</p></li></ol></section>

      <section className="guide-step" id="validation"><div className="step-number">04</div><div><h2>Reject ambiguous definitions early</h2><p>The compiler fails on malformed or duplicate names, nested top-level directives, unsafe conditions, unsupported at-rules, selector formats without <code>&amp;</code>, unclosed wrappers, missing slots, and sibling wrapper chains.</p><div className="docs-callout"><strong>Allowed conditional wrappers</strong><p>Use <code>@media</code>, <code>@supports</code>, or <code>@container</code>. Other at-rules remain authored CSS until they have an explicit compiler contract.</p></div></div></section>

      <section className="guide-step" id="manifest"><div className="step-number">05</div><div><h2>Track project variants programmatically</h2><p>Every compile reports custom variants separately from the global built-in registries, preserving wrapper order for deterministic tools and agents.</p><CodeBlock title="JavaScript" code={`const result = compile(inputCss, candidates);

console.log(result.customVariants);
// [{
//   name: "any-hover",
//   kind: "compound",
//   wrappers: [
//     { type: "at-rule", value: "@media (any-hover: hover)" },
//     { type: "selector", value: "&:hover" }
//   ]
// }]`} /></div></section>

      <section className="family-caveats" id="ai-contract"><div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Discover names before composing</h2><p>Agents should treat the authored directives and compile manifest as the exact project-local variant API.</p></div><ul><li>Never infer a custom variant from its visual intent or another framework&apos;s name.</li><li>Keep the full stacked candidate literal so the scanner can discover it.</li><li>Preserve selector and conditional wrapper order from the manifest.</li><li>Use <code>@co-slot;</code> once in compound definitions and never invent unsupported at-rules.</li><li>Report a rejected candidate instead of silently falling back to a built-in variant.</li></ul></section>

      <div className="docs-next split"><Link href="/docs/core/custom-utilities"><span>Previous</span><b>← Custom utilities</b></Link><Link href="/docs/core/plugin-api"><span>Next</span><b>Plugin API →</b></Link></div>
    </article>
  );
}
