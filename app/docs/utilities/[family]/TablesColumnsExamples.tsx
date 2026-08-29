import type { CSSProperties, ReactNode } from "react";
import CodeBlock from "../../_components/CodeBlock";

const preview: CSSProperties = {
  marginTop: 24,
  padding: 24,
  border: "1px solid #d8d8d4",
  background: "#f7f7f4",
  color: "#111",
};

const cell: CSSProperties = {
  padding: "12px 14px",
  border: "1px solid #d6d6d2",
  background: "#fff",
  fontSize: 11,
  textAlign: "left",
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

export function TablesColumnsMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Table layout", "#table-layout-example"],
    ["Border spacing", "#border-spacing-example"],
    ["Captions", "#caption-example"],
    ["Multi-column", "#columns-example"],
    ["Column rules", "#column-rule-example"],
    ["Break control", "#column-break-example"],
    ["Core concepts", "#how-it-works"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Tables and columns page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function TablesColumnsExamples() {
  return (
    <>
      <Demo
        id="table-layout-example"
        label="VISUAL EXAMPLE · TABLE LAYOUT"
        title="Choose content-driven or predictable columns"
        description="Automatic layout lets cell content influence column width. Fixed layout uses the table width and first row, which is better for stable dashboards and truncation."
        code={`<table class="co-table-auto co-w-full">...</table>

<table class="co-table-fixed co-w-full">
  <thead><tr><th class="co-w-1/2">Project</th><th>Status</th><th>Owner</th></tr></thead>
</table>`}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: 520, tableLayout: "fixed", borderCollapse: "collapse" }}>
            <thead><tr><th style={{ ...cell, width: "50%", background: "#111", color: "#fff" }}>Project · 1/2</th><th style={{ ...cell, background: "#111", color: "#fff" }}>Status</th><th style={{ ...cell, background: "#111", color: "#fff" }}>Owner</th></tr></thead>
            <tbody><tr><td style={cell}>Coordiation CSS</td><td style={cell}>Active</td><td style={cell}>Design team</td></tr><tr><td style={cell}>Documentation</td><td style={cell}>Review</td><td style={cell}>Platform team</td></tr></tbody>
          </table>
        </div>
      </Demo>

      <Demo
        id="border-spacing-example"
        label="VISUAL EXAMPLE · BORDER SPACING"
        title="Create space between separate cells"
        description="Border spacing only applies when borders are separated. Axis utilities allow wider column gaps than row gaps."
        code={`<table class="co-border-separate co-border-spacing-x-3 co-border-spacing-y-2">
  <tbody>
    <tr><td>One</td><td>Two</td></tr>
    <tr><td>Three</td><td>Four</td></tr>
  </tbody>
</table>`}
      >
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "12px 8px", background: "#e1e1dd" }}>
          <tbody><tr><td style={cell}>One</td><td style={cell}>Two</td></tr><tr><td style={cell}>Three</td><td style={cell}>Four</td></tr></tbody>
        </table>
      </Demo>

      <Demo
        id="caption-example"
        label="VISUAL EXAMPLE · CAPTIONS"
        title="Keep the table description semantic"
        description="Use a caption to describe the table for every reader. Caption-side changes visual placement without moving the caption out of the table structure."
        code={`<table class="co-w-full">
  <caption class="co-caption-bottom co-pt-3 co-text-left co-text-sm">
    Deployment status updated 29 August 2026.
  </caption>
  ...
</table>`}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <caption style={{ captionSide: "bottom", paddingTop: 12, color: "#777", fontSize: 10, textAlign: "left" }}>Deployment status updated 29 August 2026.</caption>
          <thead><tr><th style={{ ...cell, background: "#111", color: "#fff" }}>Environment</th><th style={{ ...cell, background: "#111", color: "#fff" }}>Status</th></tr></thead>
          <tbody><tr><td style={cell}>Production</td><td style={cell}>Healthy</td></tr></tbody>
        </table>
      </Demo>

      <Demo
        id="columns-example"
        label="VISUAL EXAMPLE · MULTI-COLUMN"
        title="Flow editorial text across columns"
        description="Multi-column layout is designed for continuous reading flow. Use it for articles and reference material, not for row-aligned application data."
        code={`<article class="co-columns-2 co-gap-8 co-text-sm co-leading-relaxed">
  <p>Coordiation scans source files...</p>
  <p>The compiler resolves utilities...</p>
</article>`}
      >
        <article style={{ columns: 2, columnGap: 32, padding: 22, border: "1px solid #d6d6d2", background: "#fff", color: "#555", fontSize: 11, lineHeight: 1.75 }}>
          Coordiation scans source files as plain text and extracts complete utility candidates. The compiler resolves theme tokens, utility declarations, and variants before generating static CSS. This keeps browser output small and removes framework runtime code. Documentation and machine-readable registries are generated from the same source of truth so agents can verify support before creating an interface.
        </article>
      </Demo>

      <Demo
        id="column-rule-example"
        label="VISUAL EXAMPLE · COLUMN RULES"
        title="Add a separator without changing flow"
        description="A column rule sits inside the gap between text columns. Width, style, and color are composed independently like borders."
        code={`<article class="co-columns-3 co-gap-8 co-column-rule co-column-rule-solid co-column-rule-neutral-300">
  Editorial content...
</article>`}
      >
        <article style={{ columns: 3, columnGap: 32, columnRule: "1px solid #cfcfcb", padding: 22, border: "1px solid #d6d6d2", background: "#fff", color: "#555", fontSize: 10, lineHeight: 1.7 }}>
          Utility-first styling remains explicit. Theme variables keep repeated decisions recognizable. Logical properties follow writing modes. Static output keeps delivery predictable. Generated registries let humans and AI inspect exact support. Tests guard every documented example.
        </article>
      </Demo>

      <Demo
        id="column-break-example"
        label="VISUAL EXAMPLE · BREAK CONTROL"
        title="Keep related content together"
        description="Avoid-column prevents a card, quotation, or heading group from splitting between columns when space permits."
        code={`<article class="co-columns-2 co-gap-6">
  <section class="co-break-inside-avoid-column co-mb-6">Complete feature card</section>
  <section class="co-break-inside-avoid-column co-mb-6">Another card</section>
</article>`}
      >
        <div style={{ columns: 2, columnGap: 20 }}>
          {["Source scanning", "Utility registry", "Static output", "AI contract"].map((item, index) => <section style={{ marginBottom: 16, padding: 18, breakInside: "avoid-column", border: "1px solid #151515", background: index === 0 ? "#111" : "#fff", color: index === 0 ? "#fff" : "#111", fontSize: 11 }} key={item}><strong>{item}</strong><p style={{ margin: "7px 0 0", color: index === 0 ? "#bbb" : "#777", fontSize: 10, lineHeight: 1.55 }}>This card remains together inside one column.</p></section>)}
        </div>
      </Demo>
    </>
  );
}
