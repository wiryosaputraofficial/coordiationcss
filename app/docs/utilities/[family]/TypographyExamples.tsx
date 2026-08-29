import type { CSSProperties, ReactNode } from "react";
import CodeBlock from "../../_components/CodeBlock";

const preview: CSSProperties = {
  marginTop: 24,
  padding: 24,
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

export function TypographyMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Type scale", "#type-scale-example"],
    ["Weight & tracking", "#weight-tracking-example"],
    ["Line height", "#line-height-example"],
    ["Wrapping & clamp", "#wrapping-example"],
    ["Decoration", "#decoration-example"],
    ["Core concepts", "#how-it-works"],
    ["Variants", "#variants"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Typography page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function TypographyExamples() {
  return (
    <>
      <Demo
        id="type-scale-example"
        label="VISUAL EXAMPLE · TYPE SCALE"
        title="Build a clear content hierarchy"
        description="Use the type scale to communicate importance. Keep large display text focused and pair it with a quieter supporting size."
        code={`<article>
  <p class="co-text-xs co-uppercase co-tracking-widest">Release 0.3</p>
  <h1 class="co-text-5xl co-font-bold co-tracking-tight">Build faster.</h1>
  <p class="co-text-lg co-text-neutral-600">A utility-first framework for Coordiation.</p>
</article>`}
      >
        <article style={{ padding: 24, border: "1px solid #151515", background: "#fff" }}>
          <p style={{ margin: 0, color: "#888", fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase" }}>Release 0.3</p>
          <h3 style={{ margin: "16px 0 12px", fontSize: 46, lineHeight: .95, letterSpacing: "-.055em" }}>Build faster.</h3>
          <p style={{ margin: 0, color: "#666", fontSize: 17, lineHeight: 1.6 }}>A utility-first framework for Coordiation.</p>
        </article>
      </Demo>

      <Demo
        id="weight-tracking-example"
        label="VISUAL EXAMPLE · WEIGHT AND TRACKING"
        title="Adjust density without changing size"
        description="Font weight changes emphasis, while letter spacing controls the visual density of a line. Tracking is especially useful for compact labels and large headlines."
        code={`<p class="co-font-normal co-tracking-normal">Regular interface copy</p>
<p class="co-font-semibold co-tracking-tight">Semibold compact heading</p>
<p class="co-font-bold co-uppercase co-tracking-widest">System label</p>`}
      >
        <div style={{ display: "grid", gap: 18, padding: 22, border: "1px solid #d3d3cf", background: "#fff" }}>
          <div style={{ fontSize: 18, fontWeight: 400 }}>Regular interface copy</div>
          <div style={{ fontSize: 18, fontWeight: 650, letterSpacing: "-.025em" }}>Semibold compact heading</div>
          <div style={{ fontSize: 11, fontWeight: 750, letterSpacing: ".18em", textTransform: "uppercase" }}>System label</div>
        </div>
      </Demo>

      <Demo
        id="line-height-example"
        label="VISUAL EXAMPLE · LINE HEIGHT"
        title="Match leading to the reading task"
        description="Tighter leading keeps headings cohesive. Relaxed leading improves scanning for longer paragraphs and documentation content."
        code={`<h2 class="co-text-3xl co-leading-tight">A compact two-line heading for a focused message.</h2>
<p class="co-text-base co-leading-relaxed">
  Longer documentation text benefits from more room between baselines.
</p>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 22 }}>
          <div style={{ padding: 20, border: "1px solid #151515", background: "#fff" }}><strong style={{ display: "block", fontSize: 27, lineHeight: 1.15, letterSpacing: "-.035em" }}>A compact two-line heading for a focused message.</strong><small style={{ display: "block", marginTop: 16, color: "#888" }}>co-leading-tight</small></div>
          <div style={{ padding: 20, border: "1px solid #151515", background: "#fff" }}><p style={{ margin: 0, color: "#555", fontSize: 14, lineHeight: 1.75 }}>Longer documentation text benefits from more room between baselines, making each line easier to follow across the content column.</p><small style={{ display: "block", marginTop: 16, color: "#888" }}>co-leading-relaxed</small></div>
        </div>
      </Demo>

      <Demo
        id="wrapping-example"
        label="VISUAL EXAMPLE · WRAPPING AND CLAMP"
        title="Control overflow without losing hierarchy"
        description="Use balanced wrapping for headings, anywhere wrapping for unbroken content, and line clamp when a preview must keep a fixed height."
        code={`<h2 class="co-text-3xl co-wrap-balance">A balanced title across multiple lines</h2>
<p class="co-wrap-anywhere">averylongunbrokenidentifierthatmustshrink</p>
<p class="co-line-clamp-2">Long preview copy...</p>`}
      >
        <div style={{ display: "grid", gap: 18 }}>
          <h3 style={{ maxWidth: 430, margin: 0, fontSize: 29, lineHeight: 1.1, textWrap: "balance" }}>A balanced title across multiple lines</h3>
          <code style={{ maxWidth: 300, padding: 14, overflowWrap: "anywhere", border: "1px solid #ccc", background: "#fff", fontSize: 10 }}>averylongunbrokenidentifierthatmustshrink</code>
          <p style={{ maxWidth: 500, margin: 0, display: "-webkit-box", overflow: "hidden", color: "#666", fontSize: 12, lineHeight: 1.65, WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>Coordiation scans literal utility classes and generates static CSS without adding runtime JavaScript. This longer paragraph is intentionally limited to two visible lines inside a compact preview card.</p>
        </div>
      </Demo>

      <Demo
        id="decoration-example"
        label="VISUAL EXAMPLE · DECORATION"
        title="Make interactive text recognizable"
        description="Decoration utilities control line type, color, thickness, and offset. Pair them with focus-visible variants for keyboard-accessible links."
        code={`<a class="co-underline co-decoration-2 co-underline-offset-4 hover:co-decoration-brand-500">
  Read the documentation
</a>

<del class="co-line-through co-decoration-neutral-400">Deprecated option</del>`}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "22px 36px", padding: 24, border: "1px solid #d3d3cf", background: "#fff" }}>
          <a href="#decoration-example" style={{ color: "#111", fontSize: 17, textDecorationLine: "underline", textDecorationThickness: 2, textUnderlineOffset: 5 }}>Read the documentation</a>
          <span style={{ color: "#777", fontSize: 14, textDecorationLine: "line-through", textDecorationColor: "#999" }}>Deprecated option</span>
        </div>
      </Demo>
    </>
  );
}
