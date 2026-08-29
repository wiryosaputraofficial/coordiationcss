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

const stage: CSSProperties = {
  minHeight: 154,
  display: "grid",
  placeItems: "center",
  backgroundImage: "linear-gradient(#e7e7e2 1px, transparent 1px), linear-gradient(90deg, #e7e7e2 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const card: CSSProperties = {
  width: 112,
  height: 78,
  display: "grid",
  placeItems: "center",
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: ".08em",
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

export function TransformsMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Translate", "#translate-example"],
    ["Rotate", "#rotate-example"],
    ["Scale", "#scale-example"],
    ["Skew", "#skew-example"],
    ["Transform origin", "#origin-example"],
    ["Perspective", "#perspective-example"],
    ["3D scene", "#three-d-example"],
    ["Core concepts", "#how-it-works"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Transforms and 3D page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

function Comparison({ before, after }: { before: ReactNode; after: ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 20 }}>
      <div><p style={{ margin: "0 0 10px", fontSize: 9, letterSpacing: ".12em", color: "#777" }}>ORIGINAL</p><div style={stage}>{before}</div></div>
      <div><p style={{ margin: "0 0 10px", fontSize: 9, letterSpacing: ".12em", color: "#777" }}>TRANSFORMED</p><div style={stage}>{after}</div></div>
    </div>
  );
}

export default function TransformsExamples() {
  return (
    <>
      <Demo
        id="translate-example"
        label="VISUAL EXAMPLE · TRANSLATE"
        title="Move an element without changing document flow"
        description="Translation changes the rendered position while the element keeps its original layout space. Axis utilities can be combined and negative values move in the opposite direction."
        code={`<div class="co-translate-x-8 co-translate-y-4">
  Moved
</div>

<div class="-co-translate-x-4">Moved left</div>`}
      >
        <Comparison before={<div style={card}>ORIGINAL</div>} after={<div style={{ ...card, transform: "translate(32px, 16px)" }}>MOVED</div>} />
      </Demo>

      <Demo
        id="rotate-example"
        label="VISUAL EXAMPLE · ROTATE"
        title="Rotate in two or three dimensions"
        description="Use the standard rotate utility for the Z axis. Axis-specific rotation becomes visibly three-dimensional when its parent supplies perspective."
        code={`<div class="co-rotate-6">Tilted card</div>

<div class="co-perspective-normal">
  <div class="co-rotate-y-45">3D card</div>
</div>`}
      >
        <Comparison before={<div style={card}>0°</div>} after={<div style={{ perspective: 500 }}><div style={{ ...card, transform: "rotateY(45deg) rotateZ(4deg)" }}>Y · 45°</div></div>} />
      </Demo>

      <Demo
        id="scale-example"
        label="VISUAL EXAMPLE · SCALE"
        title="Resize visually around an origin"
        description="Scale affects visual size without recalculating surrounding layout. It is useful for hover feedback, selected states, and subtle emphasis."
        code={`<button class="co-scale-95 hover:co-scale-100 co-transition-transform">
  Continue
</button>`}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", minHeight: 154 }}>
          {[75, 95, 110].map((value) => <div key={value} style={{ ...card, transform: `scale(${value / 100})` }}>SCALE {value}</div>)}
        </div>
      </Demo>

      <Demo
        id="skew-example"
        label="VISUAL EXAMPLE · SKEW"
        title="Slant an element along either axis"
        description="Skew creates an angled surface while preserving the element's layout footprint. Keep text readable by skewing a wrapper and counter-skewing its content when needed."
        code={`<div class="co-skew-x-6">
  <span class="-co-skew-x-6">Readable label</span>
</div>`}
      >
        <Comparison before={<div style={card}>STRAIGHT</div>} after={<div style={{ ...card, transform: "skewX(12deg)" }}><span style={{ transform: "skewX(-12deg)" }}>SKEW X</span></div>} />
      </Demo>

      <Demo
        id="origin-example"
        label="VISUAL EXAMPLE · TRANSFORM ORIGIN"
        title="Control where a transform begins"
        description="The origin acts like a hinge. The same rotation produces different motion when anchored to the center, top-left, or bottom-right."
        code={`<div class="co-origin-top-left co-rotate-12">Top-left hinge</div>
<div class="co-origin-center co-rotate-12">Center hinge</div>`}
      >
        <div style={{ display: "flex", justifyContent: "space-around", gap: 28, minHeight: 170, alignItems: "center" }}>
          <div style={{ ...card, transform: "rotate(16deg)", transformOrigin: "top left" }}>TOP LEFT</div>
          <div style={{ ...card, transform: "rotate(16deg)", transformOrigin: "center" }}>CENTER</div>
          <div style={{ ...card, transform: "rotate(16deg)", transformOrigin: "bottom right" }}>BOTTOM RIGHT</div>
        </div>
      </Demo>

      <Demo
        id="perspective-example"
        label="VISUAL EXAMPLE · PERSPECTIVE"
        title="Choose how strongly depth is perceived"
        description="A shorter perspective distance makes depth feel dramatic. A longer distance produces a flatter, more subtle result. Perspective belongs on the scene, not the rotated child."
        code={`<div class="co-perspective-dramatic">
  <article class="co-rotate-y-45">Near camera</article>
</div>

<div class="co-perspective-distant">
  <article class="co-rotate-y-45">Far camera</article>
</div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, textAlign: "center" }}>
          {[[220, "DRAMATIC"], [500, "NORMAL"], [1100, "DISTANT"]].map(([distance, label]) => <div key={label}><div style={{ ...stage, perspective: Number(distance) }}><div style={{ ...card, width: 88, transform: "rotateY(52deg)" }}>{label}</div></div><code style={{ display: "block", marginTop: 10, fontSize: 9 }}>{distance}px</code></div>)}
        </div>
      </Demo>

      <Demo
        id="three-d-example"
        label="VISUAL EXAMPLE · 3D SCENE"
        title="Preserve depth across nested transforms"
        description="Use transform-3d on the parent when children need independent Z positions. Without it, nested elements are flattened onto the parent's plane."
        code={`<div class="co-perspective-normal">
  <div class="co-transform-3d co-rotate-x-12 co-rotate-y-45">
    <div class="co-translate-z-8">Front layer</div>
    <div class="-co-translate-z-8">Back layer</div>
  </div>
</div>`}
      >
        <div style={{ minHeight: 230, display: "grid", placeItems: "center", perspective: 560 }}>
          <div style={{ position: "relative", width: 164, height: 112, transformStyle: "preserve-3d", transform: "rotateX(55deg) rotateZ(-28deg)" }}>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", border: "1px solid #111", background: "rgba(255,255,255,.9)", transform: "translateZ(-34px)", fontSize: 9 }}>BACK · Z −8</div>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", border: "1px solid #111", background: "#111", color: "#fff", transform: "translateZ(34px)", fontSize: 9, fontWeight: 700 }}>FRONT · Z 8</div>
          </div>
        </div>
      </Demo>
    </>
  );
}
