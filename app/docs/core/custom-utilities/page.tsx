import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Custom utilities — Coordiation CSS",
  description: "Register static and functional Coordiation utilities with CSS-first values, modifiers, validation, and AI-readable manifests.",
};

export default function CustomUtilitiesPage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Core concepts</span><b>/</b><span>Custom utilities</span></div>
      <p className="docs-overline">CORE CONCEPT · COMPLETE</p>
      <h1>Custom utilities</h1>
      <p className="docs-lead">Extend the compiler from your CSS entry with project-owned utility names that use the same scanner, variants, prefix, important syntax, and rejection contract as built-in Coordiation classes.</p>
      <div className="docs-note"><span>✓</span><p>Definitions omit the configured class prefix. <code>@co-utility content-auto</code> produces <code>co-content-auto</code> with the default prefix, while a project using <code>x-</code> receives <code>x-content-auto</code>.</p></div>

      <section className="guide-step" id="static-utilities"><div className="step-number">01</div><div><h2>Register a static utility</h2><p>Use a lowercase hyphenated name and ordinary CSS declarations. A project definition takes priority when it resolves the same body as a built-in utility.</p><CodeBlock title="src/coordiation.css" code={`@coordiation;

@co-utility content-auto {
  content-visibility: auto;
  contain-intrinsic-size: auto 1000px;
}`} /><CodeBlock title="Template" code={`<section class="co-content-auto md:co-content-auto hover:!co-content-auto">
  ...
</section>`} /></div></section>

      <section className="guide-step" id="functional-utilities"><div className="step-number">02</div><div><h2>Add a functional wildcard</h2><p>End a pattern with one <code>-*</code> wildcard. Resolve the captured part through <code>co-value()</code>; the first matching resolver wins.</p><CodeBlock title="src/coordiation.css" code={`@co-theme {
  --co-tab-size-github: 8;
}

@co-utility tab-* {
  tab-size: co-value(
    --co-tab-size-*,
    integer,
    [integer],
    co-default(4)
  );
}`} /><p>This definition accepts <code>co-tab</code>, <code>co-tab-github</code>, <code>co-tab-7</code>, and <code>co-tab-[13]</code>.</p></div></section>

      <section className="family-concepts" id="value-resolvers">
        <div><p className="docs-overline">VALUE CONTRACT</p><h2>Resolve only declared value shapes</h2><p>Every functional candidate must satisfy at least one resolver in a declaration.</p></div>
        <ol><li><span>01</span><p><strong>Theme:</strong> <code>--co-color-*</code> resolves a matching emitted theme variable.</p></li><li><span>02</span><p><strong>Bare:</strong> <code>integer</code>, <code>number</code>, <code>percentage</code>, and <code>ratio</code> validate unbracketed values.</p></li><li><span>03</span><p><strong>Arbitrary:</strong> <code>[integer]</code>, <code>[number]</code>, <code>[percentage]</code>, <code>[ratio]</code>, <code>[length]</code>, <code>[color]</code>, and <code>[*]</code> validate bracket syntax.</p></li><li><span>04</span><p><strong>CSS variable:</strong> parenthesized custom properties such as <code>(--card-size)</code> resolve through arbitrary descriptors.</p></li><li><span>05</span><p><strong>Default:</strong> <code>co-default(4)</code> enables the wildcard root without a captured value.</p></li></ol>
      </section>

      <section className="guide-step" id="modifiers"><div className="step-number">03</div><div><h2>Resolve slash modifiers separately</h2><p>Use <code>co-modifier()</code> for the portion after an unbracketed slash. A declaration with no matching modifier is omitted while other valid declarations remain.</p><CodeBlock title="src/coordiation.css" code={`@co-utility type-* {
  font-size: co-value(--co-text-*, [length]);
  line-height: co-modifier(
    --co-leading-*,
    [length],
    co-default(1.2)
  );
}`} /><CodeBlock title="Template" code={`<h2 class="co-type-[2rem]/tight">Readable heading</h2>`} /></div></section>

      <section className="guide-step" id="ratios"><div className="step-number">04</div><div><h2>Keep fractions as one value</h2><p>The <code>ratio</code> resolver treats an unbracketed slash as part of the value before trying modifier resolution.</p><CodeBlock title="src/coordiation.css" code={`@co-utility frame-* {
  aspect-ratio: co-value(ratio, [ratio]);
}`} /><p>Both <code>co-frame-3/4</code> and <code>co-frame-[7/9]</code> compile to validated ratios. A zero denominator is rejected.</p></div></section>

      <section className="guide-step" id="negative-values"><div className="step-number">05</div><div><h2>Declare negative behavior explicitly</h2><p>Negative values are never inferred. Register a second pattern so reviewers and agents can see exactly which family permits negation.</p><CodeBlock title="src/coordiation.css" code={`@co-utility offset-* {
  inset: calc(co-value(integer) * var(--co-space-unit));
  inset: co-value([length], [percentage]);
}

@co-utility -offset-* {
  inset: calc(co-value(integer) * var(--co-space-unit) * -1);
  inset: calc(co-value([length], [percentage]) * -1);
}`} /><CodeBlock title="Template" code={`<div class="co-offset-4 -co-offset-[2rem]"></div>`} /></div></section>

      <section className="guide-step" id="validation"><div className="step-number">06</div><div><h2>Fail before invalid CSS ships</h2><p>The compiler rejects malformed names, duplicate patterns, empty or malformed declarations, unsafe candidate values, nested rules, and authored <code>!important</code>. Use the class important modifier so variants and output remain canonical.</p><div className="docs-callout"><strong>Declarations only</strong><p>Nested selector and at-rule contexts belong in <Link href="/docs/core/custom-variants">custom variants</Link>. An <code>@co-utility</code> block is intentionally a flat declaration contract.</p></div></div></section>

      <section className="guide-step" id="manifest"><div className="step-number">07</div><div><h2>Inspect the project manifest</h2><p>Each compile result reports project-local patterns without mixing them into the framework&apos;s global registry.</p><CodeBlock title="JavaScript" code={`const result = compile(inputCss, candidates);

console.log(result.customUtilities);
// [{
//   pattern: "tab-*",
//   functional: true,
//   properties: ["tab-size"]
// }]`} /></div></section>

      <section className="family-caveats" id="ai-contract"><div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Discover before generating</h2><p>Agents should treat the compile manifest and authored directives as the exact project-local API.</p></div><ul><li>Never infer a custom utility from visual intent or a similarly named framework class.</li><li>Keep the full custom candidate literal so the scanner can discover it.</li><li>Match theme, bare, arbitrary, modifier, and default values only when their resolver declares support.</li><li>Generate a negative candidate only when a separate negative pattern exists.</li><li>Report rejected custom candidates instead of silently substituting another value.</li></ul></section>

      <div className="docs-next split"><Link href="/docs/core/modern-color"><span>Previous</span><b>← Modern color</b></Link><Link href="/release-check"><span>Next</span><b>Release Check →</b></Link></div>
    </article>
  );
}
