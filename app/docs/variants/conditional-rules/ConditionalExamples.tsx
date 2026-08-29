import type { CSSProperties, ReactNode } from "react";
import CodeBlock from "../../_components/CodeBlock";

const preview: CSSProperties = {
  marginTop: 24,
  padding: 28,
  overflow: "hidden",
  border: "1px solid #d8d8d4",
  background: "#f7f7f4",
  color: "#111",
};

function Demo({ id, label, title, description, code, children }: {
  id: string;
  label: string;
  title: string;
  description: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <section className="family-example" id={id}>
      <p className="docs-overline">{label}</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <div style={preview}>{children}</div>
      <CodeBlock title="component.coord" code={code} />
    </section>
  );
}

export function ConditionalMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Media features", "#media-features"],
    ["Feature queries", "#feature-queries"],
    ["Container queries", "#container-queries"],
    ["Starting style", "#starting-style"],
    ["Arbitrary at-rules", "#arbitrary-at-rules"],
    ["Stacked conditions", "#stacked-conditions"],
    ["AI contract", "#ai-contract"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Conditional variants page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function ConditionalExamples() {
  return (
    <>
      <style>{`
        .conditional-state { min-height:102px; padding:14px; display:grid; place-items:center; align-content:center; gap:8px; border:1px solid #d7d7d3; background:#fff; color:#777; text-align:center; }
        .conditional-state strong { color:#111; font-size:9px; }
        .conditional-state span { font-size:8px; }
        @media (prefers-reduced-motion: reduce) { .state-motion-reduce { background:#111; color:#fff; } .state-motion-reduce strong { color:#fff; } }
        @media (prefers-reduced-motion: no-preference) { .state-motion-safe { background:#111; color:#fff; } .state-motion-safe strong { color:#fff; } }
        @media (pointer: fine) { .state-pointer-fine { background:#111; color:#fff; } .state-pointer-fine strong { color:#fff; } }
        @media (pointer: coarse) { .state-pointer-coarse { background:#111; color:#fff; } .state-pointer-coarse strong { color:#fff; } }
        @media (orientation: portrait) { .state-portrait { background:#111; color:#fff; } .state-portrait strong { color:#fff; } }
        @media (orientation: landscape) { .state-landscape { background:#111; color:#fff; } .state-landscape strong { color:#fff; } }
        @media (prefers-contrast: more) { .state-contrast { background:#111; color:#fff; outline:3px solid #111; } .state-contrast strong { color:#fff; } }
        .supports-layout { display:flex; gap:10px; }
        .supports-layout > div { min-height:110px; flex:1; display:grid; place-items:center; border:1px solid #111; background:#fff; font-size:10px; }
        @supports (display:grid) { .supports-layout { display:grid; grid-template-columns:1.4fr .8fr .8fr; } .supports-status::after { content:'GRID SUPPORTED'; } }
        @supports not (display:grid) { .supports-status::after { content:'FLEX FALLBACK'; } }
        .conditional-container-demo { width:72%; min-width:260px; max-width:100%; padding:12px; resize:horizontal; overflow:auto; container-type:inline-size; border:2px solid #111; background:#fff; }
        .conditional-container-grid { display:grid; grid-template-columns:1fr; gap:10px; }
        .conditional-container-grid > div { min-height:82px; padding:14px; display:grid; align-content:space-between; background:#ecece8; font-size:9px; }
        .conditional-container-grid > div:first-child { background:#111; color:#fff; }
        .conditional-container-label::after { content:'NARROW · 1 COLUMN'; }
        @container (width >= 30rem) { .conditional-container-grid { grid-template-columns:repeat(2,1fr); } .conditional-container-label::after { content:'WIDE · 2 COLUMNS'; } }
        .conditional-entry[open] .conditional-entry-panel { display:block; opacity:1; transform:translateY(0); }
        .conditional-entry-panel { display:none; opacity:0; transform:translateY(-10px); transition:opacity 300ms ease-out,transform 300ms ease-out,display 300ms allow-discrete; }
        @starting-style { .conditional-entry[open] .conditional-entry-panel { opacity:0; transform:translateY(-10px); } }
        .arbitrary-rule-grid { display:grid; grid-template-columns:1fr; gap:10px; }
        @media (width >= 40rem) { .arbitrary-rule-grid { grid-template-columns:repeat(3,1fr); } }
        .stacked-condition-card { background:#fff; color:#111; transition:transform 180ms ease-out,background-color 180ms,color 180ms; }
        @supports (display:grid) { @media (hover:hover) { .stacked-condition-card:hover { transform:translateY(-6px); background:#111; color:#fff; } } }
        @media (prefers-reduced-motion: reduce) { .stacked-condition-card { transition:none; } }
      `}</style>

      <Demo
        id="media-features"
        label="LIVE EXAMPLE · MEDIA FEATURES"
        title="See which environment conditions currently match"
        description="Dark tiles are active in your current browser environment. Change the operating-system motion preference, rotate the device, or switch pointer type to see the generated conditions react without JavaScript."
        code={`<div class="motion-safe:co-bg-black motion-safe:co-text-white">Motion safe</div>
<div class="motion-reduce:co-bg-black motion-reduce:co-text-white">Reduced motion</div>
<div class="pointer-fine:co-bg-black">Fine pointer</div>
<div class="pointer-coarse:co-bg-black">Coarse pointer</div>
<div class="portrait:co-block landscape:co-hidden">Portrait</div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
          <div className="conditional-state state-motion-safe"><strong>MOTION SAFE</strong><span>no-preference</span></div>
          <div className="conditional-state state-motion-reduce"><strong>MOTION REDUCE</strong><span>reduce</span></div>
          <div className="conditional-state state-pointer-fine"><strong>POINTER FINE</strong><span>mouse / trackpad</span></div>
          <div className="conditional-state state-pointer-coarse"><strong>POINTER COARSE</strong><span>touch</span></div>
          <div className="conditional-state state-portrait"><strong>PORTRAIT</strong><span>vertical viewport</span></div>
          <div className="conditional-state state-landscape"><strong>LANDSCAPE</strong><span>horizontal viewport</span></div>
        </div>
      </Demo>

      <Demo
        id="feature-queries"
        label="LIVE EXAMPLE · FEATURE QUERIES"
        title="Enhance when a CSS capability exists"
        description="This preview uses Grid when supported and retains a Flexbox fallback. The supports and not-supports variants let one template express both paths."
        code={`<section class="co-flex supports-[display:grid]:co-grid supports-[display:grid]:co-grid-cols-[1.4fr_.8fr_.8fr]">
  ...
</section>

<p class="not-supports-[display:grid]:co-block supports-[display:grid]:co-hidden">
  Flex fallback active
</p>`}
      >
        <div className="supports-layout"><div style={{ background: "#111", color: "#fff" }}>PRIMARY</div><div>SECONDARY</div><div>TERTIARY</div></div>
        <p className="supports-status" style={{ margin: "13px 0 0", color: "#777", fontSize: 9 }} />
      </Demo>

      <Demo
        id="container-queries"
        label="INTERACTIVE EXAMPLE · CONTAINER QUERIES"
        title="Resize the component, not the browser"
        description="Drag the lower-right edge of the outlined container. At 30rem the cards change from one column to two based on local available space."
        code={`<aside class="co-container-inline-size">
  <div class="co-grid co-grid-cols-1 @min-[30rem]:co-grid-cols-2">
    <article>Primary</article>
    <article>Secondary</article>
  </div>
</aside>

<!-- named ancestor -->
<aside class="co-container-inline-size co-container-name-[sidebar]">
  <div class="@md/sidebar:co-grid-cols-2">...</div>
</aside>`}
      >
        <div className="conditional-container-demo">
          <p className="conditional-container-label" style={{ margin: "0 0 10px", color: "#777", fontSize: 8, fontWeight: 700 }} />
          <div className="conditional-container-grid"><div><b>01</b><span>Primary card</span></div><div><b>02</b><span>Secondary card</span></div></div>
        </div>
        <p style={{ margin: "10px 0 0", color: "#888", fontSize: 8 }}>↘ DRAG THE CONTAINER HANDLE</p>
      </Demo>

      <Demo
        id="starting-style"
        label="INTERACTIVE EXAMPLE · STARTING STYLE"
        title="Animate content from its first rendered state"
        description="Open and close the disclosure to replay the entry. The starting variant emits @starting-style, while transition-discrete allows display to join the transition."
        code={`<div class="co-opacity-100 co-transition co-transition-discrete starting:co-opacity-0 starting:-co-translate-y-2">
  Newly mounted content
</div>`}
      >
        <details className="conditional-entry" style={{ maxWidth: 500, margin: "0 auto", border: "1px solid #111", background: "#fff" }}>
          <summary style={{ padding: "15px 18px", cursor: "pointer", fontSize: 10, fontWeight: 700 }}>TOGGLE ENTRY CONDITION</summary>
          <div className="conditional-entry-panel" style={{ margin: "0 12px 12px", padding: 22, background: "#111", color: "#fff", fontSize: 10 }}>This panel entered from <code style={{ color: "#bbb" }}>starting:co-opacity-0</code>.</div>
        </details>
      </Demo>

      <Demo
        id="arbitrary-at-rules"
        label="RESPONSIVE EXAMPLE · ARBITRARY AT-RULE"
        title="Express a safe condition outside the registry"
        description="This card group changes at a literal 40rem media condition. Coordiation accepts bracketed @media, @supports, and @container rules while rejecting declaration blocks and unknown at-rules."
        code={`<div class="co-grid [@media(width>=40rem)]:co-grid-cols-3">
  ...
</div>

<div class="[@supports(display:grid)]:co-grid">...</div>
<div class="[@container(width>30rem)]:co-flex">...</div>`}
      >
        <div className="arbitrary-rule-grid">{["@media", "@supports", "@container"].map((rule, index) => <div key={rule} style={{ minHeight: 112, padding: 16, display: "grid", placeItems: "center", border: "1px solid #111", background: index === 0 ? "#111" : "#fff", color: index === 0 ? "#fff" : "#111", fontSize: 10, fontWeight: 700 }}>{rule}</div>)}</div>
      </Demo>

      <Demo
        id="stacked-conditions"
        label="COMPOSITION EXAMPLE · STACKED CONDITIONS"
        title="Require multiple conditions in a predictable order"
        description="Hover this card on a hover-capable browser. The enhancement requires Grid support and hover capability, while reduced-motion removes its transition."
        code={`<article class="supports-[display:grid]:pointer-fine:hover:co-bg-black supports-[display:grid]:pointer-fine:hover:co-text-white motion-reduce:co-transition-none">
  Conditionally enhanced
</article>`}
      >
        <div style={{ minHeight: 175, display: "grid", placeItems: "center" }}>
          <article className="stacked-condition-card" style={{ width: "min(100%, 420px)", padding: 28, border: "1px solid #111", cursor: "pointer", textAlign: "center" }}><strong style={{ fontSize: 11 }}>HOVER WHEN CONDITIONS MATCH</strong><p style={{ margin: "8px 0 0", color: "inherit", opacity: .65, fontSize: 9 }}>@supports → @media → :hover</p></article>
        </div>
      </Demo>
    </>
  );
}
