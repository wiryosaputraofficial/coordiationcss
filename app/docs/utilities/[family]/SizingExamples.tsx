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

export function SizingMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Width and height", "#fixed-sizing-example"],
    ["Fractions", "#fraction-sizing-example"],
    ["Min and max", "#constraint-sizing-example"],
    ["Viewport sizing", "#viewport-sizing-example"],
    ["Logical sizing", "#logical-sizing-example"],
    ["Core concepts", "#how-it-works"],
    ["Variants", "#variants"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Sizing page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function SizingExamples() {
  return (
    <>
      <Demo
        id="fixed-sizing-example"
        label="VISUAL EXAMPLE · WIDTH AND HEIGHT"
        title="Set explicit dimensions"
        description="Width and height utilities use the shared spacing scale. Use size when both dimensions should receive the same value."
        code={`<div class="co-flex co-items-end co-gap-4">
  <div class="co-w-16 co-h-10">w-16 h-10</div>
  <div class="co-w-24 co-h-16">w-24 h-16</div>
  <div class="co-size-20">size-20</div>
</div>`}
      >
        <div style={{ display: "flex", alignItems: "end", gap: 16, minHeight: 120 }}>
          <div style={{ ...tile, width: 64, height: 40 }}>16 × 10</div>
          <div style={{ ...tile, width: 96, height: 64 }}>24 × 16</div>
          <div style={{ ...tile, width: 80, height: 80 }}>size-20</div>
        </div>
      </Demo>

      <Demo
        id="fraction-sizing-example"
        label="VISUAL EXAMPLE · FRACTIONS"
        title="Divide available width proportionally"
        description="Fractional widths are useful when children should occupy a known portion of the parent. Full width fills the complete available inline space."
        code={`<div class="co-flex co-gap-3">
  <aside class="co-w-1/3">Sidebar</aside>
  <main class="co-w-2/3">Content</main>
</div>

<button class="co-w-full">Continue</button>`}
      >
        <div style={{ display: "grid", gap: 14 }}>
          <div style={{ display: "flex", gap: 12 }}><div style={{ ...tile, width: "33.333%", minHeight: 76 }}>co-w-1/3</div><div style={{ ...tile, width: "66.667%", minHeight: 76, background: "#111", color: "#fff" }}>co-w-2/3</div></div>
          <div style={{ ...tile, width: "100%", minHeight: 46 }}>co-w-full</div>
        </div>
      </Demo>

      <Demo
        id="constraint-sizing-example"
        label="VISUAL EXAMPLE · MIN AND MAX"
        title="Keep content readable as space changes"
        description="Combine full width with a maximum constraint for responsive content. Minimum sizes protect controls or panels from becoming unusably small."
        code={`<article class="co-w-full co-max-w-lg co-mx-auto">
  Readable content column
</article>

<button class="co-min-w-32">Save changes</button>`}
      >
        <div style={{ display: "grid", gap: 18 }}>
          <article style={{ ...tile, width: "100%", maxWidth: 430, minHeight: 90, marginInline: "auto", padding: 20 }}>co-w-full co-max-w-lg</article>
          <button type="button" style={{ minWidth: 128, justifySelf: "center", padding: "11px 16px", border: 0, background: "#111", color: "#fff", fontSize: 10 }}>co-min-w-32</button>
        </div>
      </Demo>

      <Demo
        id="viewport-sizing-example"
        label="VISUAL EXAMPLE · VIEWPORT"
        title="Size a section against the visible screen"
        description="Dynamic viewport units follow the currently visible browser area, which is useful for mobile interfaces where browser controls expand and collapse."
        code={`<main class="co-min-h-dvh co-grid co-place-items-center">
  <section class="co-w-full co-max-w-xl">Centered screen</section>
</main>`}
      >
        <div style={{ minHeight: 220, display: "grid", placeItems: "center", border: "1px solid #151515", background: "linear-gradient(#fff,#ecece8)" }}>
          <div style={{ ...tile, width: "min(82%, 420px)", minHeight: 82 }}>co-min-h-dvh<br />co-place-items-center</div>
        </div>
      </Demo>

      <Demo
        id="logical-sizing-example"
        label="VISUAL EXAMPLE · LOGICAL SIZE"
        title="Follow the active writing mode"
        description="Inline and block size map to the text flow instead of physical width and height, so the same component can adapt to horizontal and vertical writing systems."
        code={`<article class="co-inline-64 co-block-32">Horizontal flow</article>
<article class="co-writing-vertical-rl co-inline-64 co-block-32">
  Vertical flow
</article>`}
      >
        <div style={{ display: "flex", alignItems: "start", gap: 22, minHeight: 210 }}>
          <article style={{ ...tile, inlineSize: 256, blockSize: 128 }}>inline-64<br />block-32</article>
          <article style={{ ...tile, writingMode: "vertical-rl", inlineSize: 176, blockSize: 96 }}>縦書き · inline / block</article>
        </div>
      </Demo>
    </>
  );
}
