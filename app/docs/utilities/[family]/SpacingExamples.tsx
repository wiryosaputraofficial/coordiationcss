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
  padding: "16px 18px",
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

export function SpacingMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Padding", "#padding-example"],
    ["Margin", "#margin-example"],
    ["Gap", "#gap-example"],
    ["Sibling spacing", "#sibling-spacing-example"],
    ["Logical spacing", "#logical-spacing-example"],
    ["Core concepts", "#how-it-works"],
    ["Variants", "#variants"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Spacing page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function SpacingExamples() {
  return (
    <>
      <Demo
        id="padding-example"
        label="VISUAL EXAMPLE · PADDING"
        title="Create space inside a surface"
        description="Padding separates content from its own border. Use axis utilities when horizontal and vertical rhythm need different values."
        code={`<article class="co-px-6 co-py-4 co-border">
  <h3>Card title</h3>
  <p>Content stays away from the border.</p>
</article>`}
      >
        <div style={{ padding: 24, border: "1px dashed #999", background: "#e9e9e5" }}>
          <div style={{ ...tile, padding: "28px 36px", textAlign: "left" }}><strong>co-px-6 co-py-4</strong><div style={{ marginTop: 7, color: "#777", fontFamily: "inherit", fontSize: 11 }}>The gray area represents internal padding.</div></div>
        </div>
      </Demo>

      <Demo
        id="margin-example"
        label="VISUAL EXAMPLE · MARGIN"
        title="Separate neighboring components"
        description="Margin creates space outside an element. Keep vertical component rhythm explicit by placing the margin on the element that owns the separation."
        code={`<section>
  <h2>Account</h2>
  <p class="co-mt-2">Manage your profile and preferences.</p>
  <button class="co-mt-6">Save changes</button>
</section>`}
      >
        <div style={{ padding: 22, border: "1px solid #ccc", background: "#fff" }}>
          <strong style={{ display: "block" }}>Account</strong>
          <p style={{ margin: "8px 0 0", color: "#777", fontSize: 11 }}>co-mt-2</p>
          <button type="button" style={{ marginTop: 24, padding: "10px 14px", border: 0, background: "#111", color: "#fff", fontSize: 10 }}>co-mt-6</button>
        </div>
      </Demo>

      <Demo
        id="gap-example"
        label="VISUAL EXAMPLE · GAP"
        title="Space grid and flex children evenly"
        description="Gap belongs to the container and remains predictable when items wrap or the track count changes. Axis-specific gaps let rows and columns use different rhythm."
        code={`<section class="co-grid co-grid-cols-3 co-gap-x-3 co-gap-y-6">
  <article>One</article>
  <article>Two</article>
  <article>Three</article>
  <article>Four</article>
  <article>Five</article>
  <article>Six</article>
</section>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", columnGap: 12, rowGap: 24 }}>
          {[1, 2, 3, 4, 5, 6].map((item) => <div style={tile} key={item}>Item {item}</div>)}
        </div>
      </Demo>

      <Demo
        id="sibling-spacing-example"
        label="VISUAL EXAMPLE · SIBLING SPACING"
        title="Apply rhythm between direct children"
        description="Space utilities insert separation between siblings without adding extra space before the first or after the last item."
        code={`<ul class="co-space-y-3">
  <li>Profile</li>
  <li>Notifications</li>
  <li>Security</li>
</ul>`}
      >
        <div style={{ display: "grid", gap: 12 }}>
          {["Profile", "Notifications", "Security"].map((item) => <div style={{ ...tile, textAlign: "left" }} key={item}>{item}</div>)}
        </div>
      </Demo>

      <Demo
        id="logical-spacing-example"
        label="VISUAL EXAMPLE · LOGICAL SPACING"
        title="Let spacing follow writing direction"
        description="Logical padding and margin use inline start, inline end, block start, and block end instead of hard-coding physical sides."
        code={`<article dir="ltr" class="co-ps-6 co-pe-3 co-border-s-2">English</article>
<article dir="rtl" class="co-ps-6 co-pe-3 co-border-s-2">العربية</article>`}
      >
        <div style={{ display: "grid", gap: 14 }}>
          <article dir="ltr" style={{ paddingInlineStart: 24, paddingInlineEnd: 12, paddingBlock: 16, borderInlineStart: "2px solid #111", background: "#fff" }}><strong>English</strong><span style={{ marginInlineStart: 12, color: "#888", fontSize: 10 }}>co-ps-6</span></article>
          <article dir="rtl" style={{ paddingInlineStart: 24, paddingInlineEnd: 12, paddingBlock: 16, borderInlineStart: "2px solid #111", background: "#fff" }}><strong>العربية</strong><span style={{ marginInlineStart: 12, color: "#888", fontSize: 10 }}>co-ps-6</span></article>
        </div>
      </Demo>
    </>
  );
}
