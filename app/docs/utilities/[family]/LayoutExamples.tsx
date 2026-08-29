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
  padding: "18px 20px",
  border: "1px solid #151515",
  background: "#fff",
  fontFamily: "var(--font-geist-mono)",
  fontSize: 11,
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

export function LayoutMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Display", "#display-example"],
    ["Position", "#position-example"],
    ["Overflow", "#overflow-example"],
    ["Logical edges", "#logical-example"],
    ["Core concepts", "#how-it-works"],
    ["Variants", "#variants"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Layout page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function LayoutExamples() {
  return (
    <>
      <Demo
        id="display-example"
        label="VISUAL EXAMPLE · DISPLAY"
        title="Choose the formatting context"
        description="Block elements fill the available inline space, while inline-block elements stay sized to their content. Hide an element responsively by combining display utilities with variants."
        code={`<div class="co-block">Block</div>
<div class="co-inline-block">Inline block</div>
<div class="co-hidden md:co-block">Visible from md</div>`}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ ...tile, width: "100%" }}>co-block</div>
          <div style={{ ...tile, justifySelf: "start" }}>co-inline-block</div>
          <div style={{ ...tile, borderStyle: "dashed", color: "#777" }}>co-hidden → md:co-block</div>
        </div>
      </Demo>

      <Demo
        id="position-example"
        label="VISUAL EXAMPLE · POSITION"
        title="Anchor an element to its container"
        description="Make the parent relative, then place the child with logical end positioning. The badge follows the reading direction when the component switches to RTL."
        code={`<article class="co-relative co-min-h-40 co-border">
  <span class="co-absolute co-top-4 co-end-4 co-rounded-full">
    New
  </span>
  Card content
</article>`}
      >
        <div style={{ position: "relative", minHeight: 150, padding: 24, border: "1px solid #151515", background: "#fff" }}>
          <strong style={{ display: "block", marginBottom: 8 }}>Product update</strong>
          <span style={{ color: "#666", fontSize: 12 }}>The parent establishes the positioning context.</span>
          <span style={{ position: "absolute", insetBlockStart: 16, insetInlineEnd: 16, padding: "7px 11px", borderRadius: 999, background: "#111", color: "#fff", fontSize: 10 }}>New</span>
        </div>
      </Demo>

      <Demo
        id="overflow-example"
        label="VISUAL EXAMPLE · OVERFLOW"
        title="Keep wide content inside a narrow surface"
        description="Use horizontal overflow on a bounded wrapper when the content must preserve its minimum width, such as a comparison table or timeline."
        code={`<div class="co-max-w-full co-overflow-x-auto">
  <div class="co-grid co-min-w-2xl co-grid-cols-4 co-gap-3">
    <!-- wide content -->
  </div>
</div>`}
      >
        <div style={{ maxWidth: "100%", overflowX: "auto", paddingBottom: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 150px)", gap: 10, minWidth: 630 }}>
            {["Planning", "Design", "Build", "Release"].map((item, index) => <div style={tile} key={item}><small style={{ display: "block", marginBottom: 7, color: "#999" }}>0{index + 1}</small>{item}</div>)}
          </div>
        </div>
      </Demo>

      <Demo
        id="logical-example"
        label="VISUAL EXAMPLE · LOGICAL EDGES"
        title="Let start and end follow direction"
        description="The same logical border and padding utilities move automatically between the left and right sides, so one component works in both LTR and RTL documents."
        code={`<article dir="ltr" class="co-border-s-4 co-ps-5">English</article>
<article dir="rtl" class="co-border-s-4 co-ps-5">العربية</article>`}
      >
        <div style={{ display: "grid", gap: 14 }}>
          <article dir="ltr" style={{ padding: "18px 20px", borderInlineStart: "4px solid #111", background: "#fff" }}><strong>English</strong><div style={{ marginTop: 5, color: "#777", fontSize: 11 }}>Inline start is on the left.</div></article>
          <article dir="rtl" style={{ padding: "18px 20px", borderInlineStart: "4px solid #111", background: "#fff" }}><strong>العربية</strong><div style={{ marginTop: 5, color: "#777", fontSize: 11 }}>تتبع الحافة اتجاه القراءة.</div></article>
        </div>
      </Demo>
    </>
  );
}
