import type { CSSProperties, ReactNode } from "react";
import CodeBlock from "../../_components/CodeBlock";

const preview: CSSProperties = {
  marginTop: 24,
  padding: 24,
  border: "1px solid #d8d8d4",
  background: "#f7f7f4",
  color: "#111",
};

const tile: CSSProperties = {
  minHeight: 68,
  padding: "16px 18px",
  display: "grid",
  placeItems: "center",
  border: "1px solid #151515",
  background: "#fff",
  fontFamily: "var(--font-geist-mono)",
  fontSize: 10,
  textAlign: "center",
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

export function FlexGridMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Flex alignment", "#flex-alignment-example"],
    ["Flex wrapping", "#flex-wrap-example"],
    ["Grid tracks", "#grid-tracks-example"],
    ["Column spans", "#grid-span-example"],
    ["Core concepts", "#how-it-works"],
    ["Variants", "#variants"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Flexbox and grid page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function FlexGridExamples() {
  return (
    <>
      <Demo
        id="flex-alignment-example"
        label="VISUAL EXAMPLE · FLEX ALIGNMENT"
        title="Distribute actions along one axis"
        description="Use flex when items share one primary direction. Alignment utilities control the cross axis, while justify utilities distribute the available inline space."
        code={`<header class="co-flex co-items-center co-justify-between co-gap-4">
  <strong>Coordiation</strong>
  <nav class="co-flex co-items-center co-gap-3">...</nav>
  <button>Get started</button>
</header>`}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, minHeight: 120 }}>
          <div style={{ ...tile, minHeight: 52, placeItems: "center start" }}>Logo</div>
          <div style={{ display: "flex", gap: 8 }}><span style={{ ...tile, minHeight: 42, padding: "10px 13px" }}>Docs</span><span style={{ ...tile, minHeight: 42, padding: "10px 13px" }}>API</span></div>
          <div style={{ ...tile, minHeight: 52, background: "#111", color: "#fff" }}>Start</div>
        </div>
      </Demo>

      <Demo
        id="flex-wrap-example"
        label="VISUAL EXAMPLE · FLEX WRAP"
        title="Let variable-width items wrap"
        description="Wrapping is useful for tags, filters, and compact controls whose width depends on their label. Gap remains consistent across rows and columns."
        code={`<ul class="co-flex co-flex-wrap co-gap-3">
  <li>Compiler</li>
  <li>Zero runtime</li>
  <li>AI friendly</li>
  <li>Logical CSS</li>
</ul>`}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {["Compiler", "Zero runtime", "AI friendly", "Logical CSS", "Display-P3", "HMR"].map((item) => <span style={{ padding: "10px 13px", border: "1px solid #151515", borderRadius: 999, background: "#fff", fontSize: 11 }} key={item}>{item}</span>)}
        </div>
      </Demo>

      <Demo
        id="grid-tracks-example"
        label="VISUAL EXAMPLE · GRID TRACKS"
        title="Coordinate rows and columns"
        description="Use grid when both axes need to align. Numeric track utilities emit equal minmax columns that can shrink without forcing content overflow."
        code={`<section class="co-grid co-grid-cols-1 md:co-grid-cols-3 co-gap-3">
  <article>Analytics</article>
  <article>Automation</article>
  <article>Security</article>
</section>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          {["Analytics", "Automation", "Security"].map((item, index) => <div style={tile} key={item}><span><small style={{ display: "block", marginBottom: 8, color: "#999" }}>0{index + 1}</small>{item}</span></div>)}
        </div>
      </Demo>

      <Demo
        id="grid-span-example"
        label="VISUAL EXAMPLE · GRID PLACEMENT"
        title="Span important content across tracks"
        description="Column span utilities let one item occupy more tracks while the remaining items continue through normal grid placement."
        code={`<section class="co-grid co-grid-cols-3 co-gap-3">
  <article class="co-col-span-2">Primary report</article>
  <aside>Summary</aside>
  <article class="co-col-span-3">Activity timeline</article>
</section>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          <div style={{ ...tile, gridColumn: "span 2", minHeight: 105, background: "#111", color: "#fff" }}>Primary report · co-col-span-2</div>
          <div style={{ ...tile, minHeight: 105 }}>Summary</div>
          <div style={{ ...tile, gridColumn: "span 3" }}>Activity timeline · co-col-span-3</div>
        </div>
      </Demo>
    </>
  );
}
