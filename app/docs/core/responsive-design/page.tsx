import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/core/responsive-design", ...{
  title: "Responsive design",
  description: "Build mobile-first interfaces with named, ranged, arbitrary, and project-owned responsive breakpoints in Coordiation CSS.",
} });

const breakpoints = [
  ["sm", "40rem", "640px", "Small landscape phones and compact panels"],
  ["md", "48rem", "768px", "Tablets and split layouts"],
  ["lg", "64rem", "1024px", "Laptops and navigation-heavy layouts"],
  ["xl", "80rem", "1280px", "Wide application shells"],
  ["2xl", "96rem", "1536px", "Large desktop canvases"],
];

const navigation = [
  ["Overview", "#overview"],
  ["Breakpoints", "#breakpoints"],
  ["Mobile first", "#mobile-first"],
  ["Live viewport", "#live-viewport"],
  ["Responsive component", "#responsive-component"],
  ["Breakpoint ranges", "#breakpoint-ranges"],
  ["Arbitrary values", "#arbitrary-breakpoints"],
  ["Custom breakpoints", "#custom-breakpoints"],
  ["Variant composition", "#variant-composition"],
  ["Container queries", "#viewport-vs-container"],
  ["AI contract", "#ai-contract"],
];

function ResponsiveMiniNavigation() {
  return (
    <nav className="utility-mini-nav" aria-label="Responsive design page sections">
      <span>On this page</span>
      <ol>{navigation.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function ResponsiveDesignPage() {
  return (
    <div className="family-page-frame mini-nav-page-frame">
      <article className="docs-article">
        <style>{`
          .responsive-band { min-height:92px; padding:12px; display:grid; place-items:center; align-content:center; gap:6px; border:1px solid #d6d6d2; background:#fff; color:#888; text-align:center; }
          .responsive-band strong { color:inherit; font-size:10px; }
          .responsive-band small { font-size:8px; }
          .responsive-band-base { background:#111; color:#fff; }
          @media (width >= 40rem) { .responsive-band-base { background:#fff; color:#888; } .responsive-band-sm { background:#111; color:#fff; } }
          @media (width >= 48rem) { .responsive-band-sm { background:#fff; color:#888; } .responsive-band-md { background:#111; color:#fff; } }
          @media (width >= 64rem) { .responsive-band-md { background:#fff; color:#888; } .responsive-band-lg { background:#111; color:#fff; } }
          @media (width >= 80rem) { .responsive-band-lg { background:#fff; color:#888; } .responsive-band-xl { background:#111; color:#fff; } }
          @media (width >= 96rem) { .responsive-band-xl { background:#fff; color:#888; } .responsive-band-2xl { background:#111; color:#fff; } }
          .responsive-component-demo { display:grid; grid-template-columns:1fr; border:1px solid #111; background:#fff; }
          .responsive-component-demo aside { padding:18px; border-bottom:1px solid #111; background:#111; color:#fff; }
          .responsive-component-demo main { padding:18px; display:grid; grid-template-columns:1fr; gap:12px; }
          .responsive-component-demo article { min-height:95px; padding:15px; display:grid; align-content:space-between; background:#ecece8; font-size:9px; }
          @media (width >= 48rem) { .responsive-component-demo { grid-template-columns:150px 1fr; } .responsive-component-demo aside { border-right:1px solid #111; border-bottom:0; } .responsive-component-demo main { grid-template-columns:repeat(2,1fr); } }
          @media (width >= 64rem) { .responsive-component-demo { grid-template-columns:190px 1fr; } .responsive-component-demo main { grid-template-columns:repeat(3,1fr); padding:24px; } }
          .responsive-range-track { position:relative; height:64px; border:1px solid #111; background:linear-gradient(90deg,#f1f1ee 0 25%,#111 25% 66.66%,#f1f1ee 66.66%); }
          .responsive-range-track span { position:absolute; top:100%; padding-top:8px; color:#777; font-family:var(--font-geist-mono); font-size:8px; transform:translateX(-50%); }
          .responsive-range-track span:first-child { left:25%; }
          .responsive-range-track span:last-child { left:66.66%; }
          .responsive-hover-card { transition:transform 180ms ease-out,background-color 180ms,color 180ms; }
          @media (width >= 48rem) and (hover:hover) { .responsive-hover-card:hover { transform:translateY(-6px); background:#111 !important; color:#fff; } }
        `}</style>

        <div className="docs-breadcrumb" id="overview"><Link href="/docs">Docs</Link><b>/</b><span>Core concepts</span><b>/</b><span>Responsive design</span></div>
        <p className="docs-overline">CORE CONCEPT · COMPLETE IN 0.1</p>
        <h1>Responsive design</h1>
        <p className="docs-lead">Build adaptive interfaces by applying utilities at named viewport thresholds. Coordiation uses a mobile-first model, emits static media queries, and supports exact ranges, arbitrary values, and project-owned breakpoint tokens.</p>
        <div className="docs-note"><span>✓</span><p>Responsive variants work with every supported utility and compose with state, context, attribute, conditional, important, and custom variants. No browser runtime or resize listener is generated.</p></div>

        <section className="family-reference" id="breakpoints">
          <div><p className="docs-overline">DEFAULT BREAKPOINTS</p><h2>Five named viewport thresholds</h2><p>Each prefix applies from its minimum width upward. Pixel equivalents assume the browser default of 16px per rem and are shown only as a familiar reference.</p></div>
          <div className="family-reference-table">
            <div className="family-reference-head"><span>Prefix and query</span><span>Typical role</span></div>
            {breakpoints.map(([name, rem, pixels, purpose]) => <div className="family-reference-row" key={name}><code>{name}: · width ≥ {rem} ({pixels})</code><span>{purpose}</span></div>)}
          </div>
          <div className="docs-callout"><strong>Breakpoints describe available space, not device brands.</strong><p>Choose where the content needs to change. A tablet name or hardware model becomes stale; a layout constraint remains meaningful.</p></div>
        </section>

        <section className="family-example" id="mobile-first">
          <p className="docs-overline">MOBILE-FIRST CASCADE</p><h2>Start with the smallest useful layout</h2>
          <p>Unprefixed utilities apply at every width. Add prefixed utilities only when more space allows a meaningful enhancement.</p>
          <div style={{ marginTop: 24, padding: 26, border: "1px solid #d8d8d4", background: "#f7f7f4" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 0, border: "1px solid #111" }}>
              {[['BASE', '1 column'], ['sm:', '2 columns'], ['lg:', '3 columns'], ['2xl:', '4 columns']].map(([prefix, result], index) => <div key={prefix} style={{ minHeight: 122, padding: 15, display: "grid", alignContent: "space-between", borderRight: index < 3 ? "1px solid #111" : 0, background: index === 0 ? "#111" : "#fff", color: index === 0 ? "#fff" : "#111" }}><code style={{ color: "inherit", fontSize: 9 }}>{prefix}</code><span style={{ fontSize: 10, fontWeight: 700 }}>{result}</span></div>)}
            </div>
          </div>
          <CodeBlock title="component.coord" code={`<section class="co-grid co-grid-cols-1 sm:co-grid-cols-2 lg:co-grid-cols-3 2xl:co-grid-cols-4">
  ...
</section>`} />
          <div className="docs-callout"><strong>Do not use <code>sm:</code> to mean “mobile.”</strong><p>Use the unprefixed class for mobile. The <code>sm:</code> prefix begins at 40rem and overrides the base from that point upward.</p></div>
        </section>

        <section className="family-example" id="live-viewport">
          <p className="docs-overline">LIVE VIEWPORT EXAMPLE</p><h2>Identify the active breakpoint band</h2>
          <p>The dark tile reflects the current browser width. Resize the window to watch media queries move through the default scale.</p>
          <div style={{ marginTop: 24, padding: 24, border: "1px solid #d8d8d4", background: "#f7f7f4", display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 8 }}>
            <div className="responsive-band responsive-band-base"><strong>BASE</strong><small>&lt; 40rem</small></div>
            <div className="responsive-band responsive-band-sm"><strong>SM</strong><small>40–48rem</small></div>
            <div className="responsive-band responsive-band-md"><strong>MD</strong><small>48–64rem</small></div>
            <div className="responsive-band responsive-band-lg"><strong>LG</strong><small>64–80rem</small></div>
            <div className="responsive-band responsive-band-xl"><strong>XL</strong><small>80–96rem</small></div>
            <div className="responsive-band responsive-band-2xl"><strong>2XL</strong><small>≥ 96rem</small></div>
          </div>
        </section>

        <section className="family-example" id="responsive-component">
          <p className="docs-overline">VISUAL EXAMPLE · APPLICATION SHELL</p><h2>Adapt structure, density, and columns together</h2>
          <p>This preview starts stacked, gains a sidebar and two columns at <code>md</code>, then widens its navigation and content density at <code>lg</code>.</p>
          <div style={{ marginTop: 24, padding: 16, border: "1px solid #d8d8d4", background: "#f7f7f4" }}>
            <div className="responsive-component-demo"><aside><strong style={{ fontSize: 10 }}>NAVIGATION</strong><p style={{ margin: "10px 0 0", color: "#aaa", fontSize: 8 }}>Stacked → sidebar</p></aside><main>{[1, 2, 3].map((item) => <article key={item}><b>{String(item).padStart(2, "0")}</b><span>Responsive panel</span></article>)}</main></div>
          </div>
          <CodeBlock title="component.coord" code={`<div class="co-grid co-grid-cols-1 md:co-grid-cols-[10rem_1fr] lg:co-grid-cols-[14rem_1fr]">
  <aside>Navigation</aside>
  <main class="co-grid co-grid-cols-1 md:co-grid-cols-2 lg:co-grid-cols-3 co-gap-4 lg:co-gap-6">
    ...
  </main>
</div>`} />
        </section>

        <section className="family-example" id="breakpoint-ranges">
          <p className="docs-overline">TARGETED RANGES</p><h2>Limit a utility to one breakpoint interval</h2>
          <p>Stack a minimum prefix with <code>max-*</code>. The upper bound is exclusive, so <code>md:max-xl:</code> applies from 48rem until just before 80rem.</p>
          <div style={{ marginTop: 24, padding: "30px 26px 45px", border: "1px solid #d8d8d4", background: "#f7f7f4" }}><div className="responsive-range-track"><span>md · 48rem</span><span>xl · 80rem</span></div><p style={{ margin: "30px 0 0", textAlign: "center", fontSize: 9, fontWeight: 700 }}>ACTIVE RANGE · md:max-xl</p></div>
          <CodeBlock title="component.coord" code={`<div class="md:max-xl:co-grid md:max-xl:co-grid-cols-2">
  Active only from md up to xl
</div>

<aside class="co-block lg:co-hidden">
  Visible below lg
</aside>`} />
        </section>

        <section className="family-example" id="arbitrary-breakpoints">
          <p className="docs-overline">ONE-OFF THRESHOLDS</p><h2>Use arbitrary minimum and maximum widths sparingly</h2>
          <p>Bracket syntax handles a genuine one-off constraint. Keep units consistent so media queries remain ordered and understandable.</p>
          <CodeBlock title="component.coord" code={`<section class="min-[42rem]:co-grid min-[42rem]:co-grid-cols-2">
  Starts at 42rem
</section>

<nav class="max-[68rem]:co-hidden">
  Hidden below 68rem
</nav>`} />
          <div className="docs-callout"><strong>Promotion rule</strong><p>If <code>42rem</code> appears in multiple components, promote it to a named <code>--co-breakpoint-*</code> token instead of repeating arbitrary values.</p></div>
        </section>

        <section className="family-example" id="custom-breakpoints">
          <p className="docs-overline">PROJECT-OWNED SCALE</p><h2>Add a semantic breakpoint through the theme</h2>
          <p>Breakpoint variables automatically become responsive prefixes. Names should describe stable layout roles rather than a temporary page or device.</p>
          <CodeBlock title="app.css" code={`@co-theme {
  --co-breakpoint-tablet: 52rem;
  --co-breakpoint-workspace: 72rem;
}

@coordiation;`} />
          <CodeBlock title="component.coord" code={`<main class="co-block tablet:co-grid workspace:co-grid-cols-[18rem_1fr]">
  ...
</main>`} />
        </section>

        <section className="family-example" id="variant-composition">
          <p className="docs-overline">INTERACTIVE EXAMPLE · COMPOSITION</p><h2>Combine breakpoints with state and context</h2>
          <p>On a hover-capable viewport at least 48rem wide, hover this card. Prefixes compose from left to right and all conditions must match.</p>
          <div style={{ marginTop: 24, minHeight: 190, padding: 28, display: "grid", placeItems: "center", border: "1px solid #d8d8d4", background: "#f7f7f4" }}><article className="responsive-hover-card" style={{ width: "min(100%, 420px)", padding: 28, border: "1px solid #111", background: "#fff", cursor: "pointer", textAlign: "center" }}><strong style={{ fontSize: 10 }}>md:hover: enhancement</strong><p style={{ margin: "7px 0 0", color: "inherit", opacity: .65, fontSize: 9 }}>Resize below md to disable the effect</p></article></div>
          <CodeBlock title="component.coord" code={`<article class="co-bg-white md:hover:co-bg-black md:hover:co-text-white dark:md:co-border-neutral-700 motion-reduce:co-transition-none">
  ...
</article>`} />
        </section>

        <section className="family-reference" id="viewport-vs-container">
          <div><p className="docs-overline">CHOOSE THE RIGHT CONDITION</p><h2>Viewport breakpoint or container query?</h2><p>Both use the same breakpoint tokens, but they answer different layout questions.</p></div>
          <div className="family-reference-table">
            <div className="family-reference-head"><span>Use</span><span>When the design depends on</span></div>
            <div className="family-reference-row"><code>md:co-*</code><span>The browser viewport or overall application shell.</span></div>
            <div className="family-reference-row"><code>@md/sidebar:co-*</code><span>The space allocated to a reusable component inside a named ancestor.</span></div>
          </div>
          <p style={{ marginTop: 18, fontSize: 11 }}><Link href="/docs/variants/conditional-rules">Learn container query syntax in Conditional Variants →</Link></p>
        </section>

        <section className="family-caveats" id="ai-contract">
          <div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Generate responsive code that remains traceable</h2><p>An agent should choose breakpoints from content constraints and emit complete literal candidates that the scanner can verify.</p></div>
          <ul>
            <li>Start with an unprefixed usable layout; treat named breakpoints as progressive enhancements.</li>
            <li>Use the smallest named breakpoint that solves the observed content constraint.</li>
            <li>Keep full class names literal—never construct prefixes through runtime interpolation.</li>
            <li>Prefer theme breakpoint tokens over repeated arbitrary widths.</li>
            <li>Use container queries when a component depends on local space rather than viewport size.</li>
            <li>Verify range ordering and report rejected candidates instead of guessing replacements.</li>
          </ul>
        </section>

        <div className="docs-next split"><Link href="/docs/core/modern-color"><span>Previous</span><b>← Modern color</b></Link><Link href="/docs/variants/attribute-selectors"><span>Next</span><b>Attribute selectors →</b></Link></div>
      </article>
      <ResponsiveMiniNavigation />
    </div>
  );
}
