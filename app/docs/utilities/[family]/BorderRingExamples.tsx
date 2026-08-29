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
  minHeight: 92,
  padding: 18,
  display: "grid",
  placeItems: "center",
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

export function BorderRingMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Border width & color", "#border-example"],
    ["Logical borders", "#logical-border-example"],
    ["Border radius", "#radius-example"],
    ["Focus outlines", "#outline-example"],
    ["Rings", "#ring-example"],
    ["Dividers", "#divide-example"],
    ["Core concepts", "#how-it-works"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Borders and rings page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function BorderRingExamples() {
  return (
    <>
      <Demo
        id="border-example"
        label="VISUAL EXAMPLE · WIDTH AND COLOR"
        title="Define the edge of a surface"
        description="Compose border width, style, and color independently. Axis and side utilities let one edge carry more emphasis than the others."
        code={`<div class="co-border co-border-neutral-300">Default border</div>
<div class="co-border-2 co-border-brand-500">Brand border</div>
<div class="co-border-b-4 co-border-black">Strong bottom edge</div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          <div style={{ ...tile, border: "1px solid #d4d4d4" }}>co-border</div>
          <div style={{ ...tile, border: "2px solid oklch(62.3% .214 259.815)" }}>co-border-2</div>
          <div style={{ ...tile, border: "1px solid #ddd", borderBottom: "4px solid #111" }}>co-border-b-4</div>
        </div>
      </Demo>

      <Demo
        id="logical-border-example"
        label="VISUAL EXAMPLE · LOGICAL EDGES"
        title="Move emphasis with reading direction"
        description="Logical start and end borders automatically map to the correct physical side in LTR, RTL, and vertical writing modes."
        code={`<aside dir="ltr" class="co-border-s-4 co-border-s-brand-500 co-ps-5">English notice</aside>
<aside dir="rtl" class="co-border-s-4 co-border-s-brand-500 co-ps-5">تنبيه عربي</aside>`}
      >
        <div style={{ display: "grid", gap: 14 }}>
          <aside dir="ltr" style={{ padding: 20, borderInlineStart: "4px solid #111", background: "#fff" }}><strong>English notice</strong><span style={{ display: "block", marginTop: 6, color: "#777", fontSize: 11 }}>Border follows inline start.</span></aside>
          <aside dir="rtl" style={{ padding: 20, borderInlineStart: "4px solid #111", background: "#fff" }}><strong>تنبيه عربي</strong><span style={{ display: "block", marginTop: 6, color: "#777", fontSize: 11 }}>تتبع الحافة بداية السطر.</span></aside>
        </div>
      </Demo>

      <Demo
        id="radius-example"
        label="VISUAL EXAMPLE · BORDER RADIUS"
        title="Shape complete surfaces or selected corners"
        description="Use named radius tokens for consistent geometry. Logical corner utilities remain correct when document direction changes."
        code={`<div class="co-rounded-md">Medium</div>
<div class="co-rounded-2xl">Large card</div>
<span class="co-rounded-full">Pill</span>
<div class="co-rounded-se-3xl">Logical end corner</div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
          <div style={{ ...tile, border: "1px solid #111", borderRadius: 6 }}>md</div>
          <div style={{ ...tile, border: "1px solid #111", borderRadius: 16 }}>2xl</div>
          <div style={{ ...tile, minHeight: 54, alignSelf: "center", border: "1px solid #111", borderRadius: 999 }}>full</div>
          <div style={{ ...tile, border: "1px solid #111", borderStartEndRadius: 28 }}>rounded-se</div>
        </div>
      </Demo>

      <Demo
        id="outline-example"
        label="VISUAL EXAMPLE · FOCUS OUTLINE"
        title="Show keyboard focus without moving layout"
        description="Outlines sit outside the border and do not affect element dimensions. Prefer focus-visible so keyboard users receive a strong indicator without adding noise to pointer interaction."
        code={`<button class="co-rounded-md co-border co-px-4 co-py-2 focus-visible:co-outline-2 focus-visible:co-outline-offset-2 focus-visible:co-outline-brand-500">
  Focus me
</button>`}
      >
        <div style={{ minHeight: 150, display: "grid", placeItems: "center" }}>
          <button type="button" style={{ padding: "12px 18px", border: "1px solid #111", borderRadius: 6, outline: "2px solid oklch(62.3% .214 259.815)", outlineOffset: 4, background: "#fff", color: "#111" }}>focus-visible outline</button>
        </div>
      </Demo>

      <Demo
        id="ring-example"
        label="VISUAL EXAMPLE · RINGS"
        title="Compose outward and inset emphasis"
        description="Rings use shadow layers, so they can sit outside or inside a component without changing its measured size. Combine both only when each layer has a clear purpose."
        code={`<div class="co-rounded-lg co-ring-2 co-ring-brand-500">Outward ring</div>
<div class="co-rounded-lg co-inset-ring-2 co-inset-ring-black">Inset ring</div>
<div class="co-rounded-lg co-ring-2 co-ring-black co-inset-ring-2 co-inset-ring-white">Combined</div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 22, padding: 8 }}>
          <div style={{ ...tile, borderRadius: 8, boxShadow: "0 0 0 2px oklch(62.3% .214 259.815)" }}>ring-2</div>
          <div style={{ ...tile, borderRadius: 8, boxShadow: "inset 0 0 0 2px #111" }}>inset-ring-2</div>
          <div style={{ ...tile, borderRadius: 8, background: "#111", color: "#fff", boxShadow: "0 0 0 2px #111,inset 0 0 0 2px #fff" }}>combined</div>
        </div>
      </Demo>

      <Demo
        id="divide-example"
        label="VISUAL EXAMPLE · DIVIDERS"
        title="Separate siblings from their parent"
        description="Divide utilities apply borders between direct children, keeping the first and last outer edges untouched."
        code={`<ul class="co-divide-y co-divide-neutral-300">
  <li class="co-py-4">Profile</li>
  <li class="co-py-4">Notifications</li>
  <li class="co-py-4">Security</li>
</ul>`}
      >
        <ul style={{ margin: 0, padding: "0 20px", listStyle: "none", border: "1px solid #d4d4d4", background: "#fff" }}>
          {["Profile", "Notifications", "Security"].map((item, index) => <li style={{ padding: "17px 0", borderBottom: index < 2 ? "1px solid #d4d4d4" : 0, fontSize: 12 }} key={item}>{item}</li>)}
        </ul>
      </Demo>
    </>
  );
}
