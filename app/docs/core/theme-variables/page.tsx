import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/core/theme-variables", ...{
  title: "Theme variables",
  description: "Define project-owned design tokens and generate consistent Coordiation CSS utilities with the @co-theme directive.",
} });

const namespaces = [
  ["--co-color-*", "Colors", "co-bg-product · co-text-product · co-border-product"],
  ["--co-background-image-*", "Named images and gradients", "co-bg-hero"],
  ["--co-breakpoint-*", "Responsive viewport thresholds", "tablet:co-grid"],
  ["--co-aspect-*", "Aspect ratios", "co-aspect-poster"],
  ["--co-container-*", "Container max-width values", "co-container-content"],
  ["--co-perspective-*", "3D perspective distances", "co-perspective-product"],
  ["--co-ease-*", "Transition timing functions", "co-ease-spring"],
  ["--co-animate-*", "Animation shorthands", "co-animate-wiggle"],
  ["--co-font-*", "Font families", "co-font-display"],
  ["--co-font-weight-*", "Font weights", "co-font-book"],
  ["--co-text-*", "Font sizes with optional metadata", "co-text-display"],
  ["--co-tracking-*", "Letter spacing", "co-tracking-display"],
  ["--co-leading-*", "Line height", "co-leading-copy"],
  ["--co-tab-size-*", "Tab width", "co-tab-size-code"],
  ["--co-radius-*", "Border radius", "co-rounded-panel"],
  ["--co-shadow-*", "Box shadow", "co-shadow-panel"],
  ["--co-inset-shadow-*", "Inset shadow", "co-inset-shadow-control"],
  ["--co-text-shadow-*", "Text shadow", "co-text-shadow-hero"],
  ["--co-blur-*", "Blur filters", "co-blur-glass"],
  ["--co-drop-shadow-*", "Drop-shadow filters", "co-drop-shadow-logo"],
];

const navigation = [
  ["Overview", "#overview"],
  ["How it works", "#how-it-works"],
  ["Complete example", "#complete-example"],
  ["Namespaces", "#namespaces"],
  ["Add and override", "#add-override"],
  ["Spacing and defaults", "#global-defaults"],
  ["Typography metadata", "#typography-metadata"],
  ["Animation tokens", "#animation-tokens"],
  ["Wide-gamut colors", "#wide-gamut"],
  ["Using tokens in CSS", "#authored-css"],
  ["Naming guidance", "#naming-guidance"],
  ["AI contract", "#ai-contract"],
];

function ThemeMiniNavigation() {
  return (
    <nav className="utility-mini-nav" aria-label="Theme variables page sections">
      <span>On this page</span>
      <ol>{navigation.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

const previewCard: CSSProperties = {
  minHeight: 130,
  padding: 20,
  display: "grid",
  alignContent: "space-between",
  border: "1px solid #111",
};

export default function ThemeVariablesPage() {
  return (
    <div className="family-page-frame mini-nav-page-frame">
      <article className="docs-article">
        <style>{`
          @keyframes theme-docs-wiggle { 0%,100% { transform:rotate(-3deg); } 50% { transform:rotate(3deg); } }
          .theme-token-wiggle:hover { animation:theme-docs-wiggle .55s ease-in-out infinite; }
          .theme-flow { display:grid; grid-template-columns:1fr 42px 1fr 42px 1fr; align-items:stretch; }
          .theme-flow > div { min-height:142px; padding:18px; display:grid; align-content:space-between; border:1px solid #111; background:#fff; }
          .theme-flow > div:first-child { background:#111; color:#fff; }
          .theme-flow > span { display:grid; place-items:center; font-size:18px; }
          .theme-flow strong { font-size:10px; }
          .theme-flow code { color:inherit; font-size:8px; overflow-wrap:anywhere; }
          .theme-token-stack { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; }
          @media (max-width:680px) { .theme-flow { grid-template-columns:1fr; gap:8px; } .theme-flow > span { transform:rotate(90deg); } .theme-token-stack { grid-template-columns:1fr; } }
        `}</style>

        <div className="docs-breadcrumb" id="overview"><Link href="/docs">Docs</Link><b>/</b><span>Core concepts</span><b>/</b><span>Theme variables</span></div>
        <p className="docs-overline">CSS-FIRST DESIGN TOKENS · COMPLETE IN 0.1</p>
        <h1>Theme variables</h1>
        <p className="docs-lead">Define your project&apos;s colors, typography, spacing rhythm, breakpoints, shadows, animations, and other design decisions using CSS variables. Coordiation turns recognized namespaces into utility APIs without a JavaScript configuration file.</p>
        <div className="docs-note"><span>✓</span><p>Theme blocks are consumed at compile time, merged with the built-in theme, emitted as CSS variables, and exposed to utility resolution. No theme parser or configuration runtime is shipped to the browser.</p></div>

        <section className="family-example" id="how-it-works">
          <p className="docs-overline">MENTAL MODEL</p><h2>One token powers variables and utilities</h2>
          <p>Declare a recognized variable inside <code>@co-theme</code>. The compiler registers its name, emits the CSS custom property, and makes matching utility candidates available.</p>
          <div style={{ marginTop: 24, padding: 24, border: "1px solid #d8d8d4", background: "#f7f7f4" }}>
            <div className="theme-flow">
              <div><strong>01 · DECLARE</strong><code>--co-color-product:<br />oklch(62% .2 260)</code></div><span>→</span>
              <div><strong>02 · EMIT</strong><code>:root &#123;<br />--co-color-product: …<br />&#125;</code></div><span>→</span>
              <div><strong>03 · USE</strong><code>co-bg-product<br />co-text-product<br />co-border-product</code></div>
            </div>
          </div>
          <CodeBlock title="app.css" code={`@co-theme {
  --co-color-product: oklch(62% 0.2 260);
}

@coordiation;`} />
          <CodeBlock title="component.coord" code={`<button class="co-bg-product co-text-white hover:co-bg-product/80">
  Continue
</button>`} />
        </section>

        <section className="family-example" id="complete-example">
          <p className="docs-overline">COMPLETE EXAMPLE</p><h2>Define a small product theme</h2>
          <p>Theme variables can live beside the Coordiation directive in your main stylesheet. Keep values source-controlled and group related namespaces for review.</p>
          <CodeBlock title="app.css" code={`@co-theme {
  --co-color-product: oklch(62% 0.2 260);
  --co-color-canvas: #f7f7f4;
  --co-font-display: "Inter", ui-sans-serif, system-ui;
  --co-font-weight-book: 450;
  --co-text-display: 3.5rem;
  --co-text-display--line-height: 0.95;
  --co-text-display--letter-spacing: -0.045em;
  --co-radius-panel: 1.125rem;
  --co-shadow-panel: 0 24px 60px rgb(0 0 0 / 0.14);
  --co-breakpoint-workspace: 72rem;
  --co-ease-product: cubic-bezier(0.16, 1, 0.3, 1);
  --co-animate-wiggle: wiggle 650ms ease-in-out infinite;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

@coordiation;`} />
          <CodeBlock title="component.coord" code={`<article class="co-bg-canvas co-rounded-panel co-shadow-panel workspace:co-grid">
  <h1 class="co-font-display co-font-book co-text-display">Coordiation</h1>
  <span class="hover:co-animate-wiggle">New</span>
</article>`} />
        </section>

        <section className="family-reference" id="namespaces">
          <div><p className="docs-overline">NAMESPACE REFERENCE</p><h2>Recognized theme variable families</h2><p>The token name after each prefix becomes the value used by the matching utility. Use lowercase kebab-case names that remain readable in class strings.</p></div>
          <div className="family-reference-table">
            <div className="family-reference-head"><span>Namespace</span><span>Purpose and generated example</span></div>
            {namespaces.map(([namespace, purpose, example]) => <div className="family-reference-row" key={namespace}><code>{namespace}</code><span><strong>{purpose}</strong><br /><code>{example}</code></span></div>)}
          </div>
        </section>

        <section className="family-example" id="add-override">
          <p className="docs-overline">EXTENSION AND OVERRIDES</p><h2>Add a new token or replace a built-in value</h2>
          <p>A new name extends the theme. Reusing an existing name replaces that token while preserving the public utility class, which lets a product change its visual system without rewriting templates.</p>
          <div style={{ marginTop: 24, padding: 24, border: "1px solid #d8d8d4", background: "#f7f7f4" }}>
            <div className="theme-token-stack">
              <div style={{ ...previewCard, background: "#000", color: "#fff" }}><code style={{ color: "inherit", fontSize: 8 }}>ADD</code><div><strong style={{ fontSize: 11 }}>product</strong><p style={{ margin: "6px 0 0", color: "#aaa", fontSize: 8 }}>New utility name</p></div></div>
              <div style={{ ...previewCard, background: "oklch(62% .2 260)", color: "#fff" }}><code style={{ color: "inherit", fontSize: 8 }}>OVERRIDE</code><div><strong style={{ fontSize: 11 }}>brand-500</strong><p style={{ margin: "6px 0 0", color: "inherit", opacity: .75, fontSize: 8 }}>Same utility, new value</p></div></div>
              <div style={{ ...previewCard, background: "#f7f7f4" }}><code style={{ fontSize: 8 }}>CONSUME</code><div><strong style={{ fontSize: 11 }}>var(--co-color-product)</strong><p style={{ margin: "6px 0 0", color: "#777", fontSize: 8 }}>Available in authored CSS</p></div></div>
            </div>
          </div>
          <CodeBlock title="app.css" code={`@co-theme {
  /* add */
  --co-color-product: oklch(62% 0.2 260);

  /* override */
  --co-color-brand-500: #111111;
}`} />
        </section>

        <section className="family-reference" id="global-defaults">
          <div><p className="docs-overline">GLOBAL CONTROLS</p><h2>Spacing rhythm and transition defaults</h2><p>Three special variables influence many utilities or the default transition contract instead of creating a named suffix.</p></div>
          <div className="family-reference-table">
            <div className="family-reference-head"><span>Variable</span><span>Effect</span></div>
            <div className="family-reference-row"><code>--co-space-unit</code><span>Base multiplier used by numeric spacing and sizing utilities. Default: <code>0.25rem</code>.</span></div>
            <div className="family-reference-row"><code>--co-default-transition-duration</code><span>Duration emitted by <code>co-transition</code> when no duration utility overrides it.</span></div>
            <div className="family-reference-row"><code>--co-default-transition-timing-function</code><span>Easing emitted by the default transition utility.</span></div>
          </div>
          <CodeBlock title="app.css" code={`@co-theme {
  --co-space-unit: 0.25rem;
  --co-default-transition-duration: 180ms;
  --co-default-transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}`} />
          <div className="docs-callout"><strong>Changing the spacing unit is a system-wide decision.</strong><p><code>co-p-4</code>, <code>co-gap-6</code>, <code>co-size-10</code>, and other numeric utilities derive from the same unit. Review the complete interface before changing it.</p></div>
        </section>

        <section className="family-example" id="typography-metadata">
          <p className="docs-overline">COMPOSITE TYPOGRAPHY</p><h2>Attach metadata to fonts and text sizes</h2>
          <p>Double-hyphen metadata lets one semantic text token carry its line height, tracking, and weight. Font-family tokens can also provide OpenType feature and variable-font settings.</p>
          <CodeBlock title="app.css" code={`@co-theme {
  --co-font-editorial: "Editorial Variable", Georgia, serif;
  --co-font-editorial--font-feature-settings: "liga" 1, "kern" 1;
  --co-font-editorial--font-variation-settings: "opsz" 72, "wdth" 96;

  --co-text-display: 4.5rem;
  --co-text-display--line-height: 0.92;
  --co-text-display--letter-spacing: -0.055em;
  --co-text-display--font-weight: 680;
}`} />
          <CodeBlock title="component.coord" code={`<h1 class="co-font-editorial co-text-display">
  Designed for clarity.
</h1>`} />
          <div className="docs-callout"><strong>Metadata follows the selected token.</strong><p><code>co-text-display</code> emits the attached typography metadata together, while an explicit <code>co-leading-*</code>, <code>co-tracking-*</code>, or <code>co-font-*</code> utility can override individual decisions.</p></div>
        </section>

        <section className="family-example" id="animation-tokens">
          <p className="docs-overline">MOTION TOKENS</p><h2>Pair animation shorthand with authored keyframes</h2>
          <p>The theme stores the animation shorthand; your stylesheet owns custom keyframes. Hover the preview to see the same relationship.</p>
          <div style={{ marginTop: 24, minHeight: 180, padding: 28, display: "grid", placeItems: "center", border: "1px solid #d8d8d4", background: "#f7f7f4" }}><div className="theme-token-wiggle" style={{ width: 110, height: 76, display: "grid", placeItems: "center", background: "#111", color: "#fff", cursor: "pointer", fontSize: 9, fontWeight: 700 }}>HOVER · WIGGLE</div></div>
          <CodeBlock title="app.css" code={`@co-theme {
  --co-animate-wiggle: wiggle 650ms ease-in-out infinite;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}`} />
          <CodeBlock title="component.coord" code={`<span class="motion-safe:hover:co-animate-wiggle motion-reduce:co-animate-none">
  New
</span>`} />
        </section>

        <section className="family-example" id="wide-gamut">
          <p className="docs-overline">COLOR METADATA</p><h2>Pair Display-P3 with a same-name fallback</h2>
          <p>The <code>--p3</code> companion is compiler metadata, not a second public utility. Coordiation promotes it only when the browser understands Display-P3 and the output device reports a P3 gamut.</p>
          <CodeBlock title="app.css" code={`@co-theme {
  --co-color-signal: oklch(64% 0.22 29);
  --co-color-signal--p3: color(display-p3 1 0.16 0.08);
}`} />
          <CodeBlock title="component.coord" code={`<button class="co-bg-signal co-text-white hover:co-bg-signal/80">
  Publish
</button>`} />
          <p style={{ marginTop: 18, fontSize: 11 }}><Link href="/docs/core/modern-color">Learn about OKLCH, opacity mixing, and progressive wide gamut →</Link></p>
        </section>

        <section className="family-example" id="authored-css">
          <p className="docs-overline">DIRECT CSS ACCESS</p><h2>Reference emitted variables in authored styles</h2>
          <p>Theme tokens remain ordinary CSS custom properties, so component layers and third-party integrations can consume the same source of truth as utility classes.</p>
          <CodeBlock title="app.css" code={`@layer components {
  .product-card {
    color: var(--co-color-neutral-950);
    background: var(--co-color-canvas);
    border-radius: var(--co-radius-panel);
    box-shadow: var(--co-shadow-panel);
  }

  .product-card a:hover {
    color: var(--co-color-product);
  }
}`} />
        </section>

        <section className="family-concepts" id="naming-guidance">
          <div><p className="docs-overline">NAMING GUIDANCE</p><h2>Prefer intent over accidental values</h2></div>
          <ol>
            <li><span>01</span><p><strong>Scales:</strong> use predictable numeric levels for graduated systems such as <code>brand-50</code> through <code>brand-950</code>.</p></li>
            <li><span>02</span><p><strong>Semantic roles:</strong> use names like <code>canvas</code>, <code>surface</code>, <code>danger</code>, or <code>panel</code> when the role should remain stable as values change.</p></li>
            <li><span>03</span><p><strong>Lowercase kebab-case:</strong> token names should remain readable inside utility candidates and registry output.</p></li>
            <li><span>04</span><p><strong>Promote repetition:</strong> turn a repeated arbitrary value into a named theme token once it becomes a design decision.</p></li>
            <li><span>05</span><p><strong>Avoid component coordinates:</strong> prefer <code>surface-raised</code> to <code>dashboard-card-top-right</code>.</p></li>
          </ol>
        </section>

        <section className="family-caveats" id="ai-contract">
          <div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Keep theme decisions inspectable</h2><p>Agents should inspect existing variables before introducing new names and keep design decisions traceable across generated markup.</p></div>
          <ul>
            <li>Reuse an existing semantic token when its intent matches; do not create synonyms for the same decision.</li>
            <li>Verify the namespace is recognized before expecting a utility class to be generated.</li>
            <li>Pair every <code>--co-color-…--p3</code> token with a safe same-name fallback.</li>
            <li>Define application-owned keyframes whenever a custom animation token references them.</li>
            <li>Keep <code>@co-theme</code> values source-controlled; never interpolate untrusted runtime input.</li>
            <li>Promote repeated arbitrary values and document the reason for any global default change.</li>
          </ul>
        </section>

        <div className="docs-next split"><Link href="/docs/variants/conditional-rules"><span>Previous</span><b>← Conditional variants</b></Link><Link href="/docs/core/custom-utilities"><span>Next</span><b>Custom utilities →</b></Link></div>
      </article>
      <ThemeMiniNavigation />
    </div>
  );
}
