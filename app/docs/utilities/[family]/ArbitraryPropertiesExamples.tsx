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

const tile: CSSProperties = {
  minHeight: 128,
  padding: 18,
  display: "grid",
  placeItems: "center",
  alignContent: "center",
  gap: 12,
  border: "1px solid #d9d9d5",
  background: "#fff",
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

export function ArbitraryPropertiesMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["One-off properties", "#property-example"],
    ["Typed values", "#typed-value-example"],
    ["Spaces & underscores", "#underscore-example"],
    ["Custom properties", "#custom-property-example"],
    ["Variants", "#arbitrary-variant-example"],
    ["Static scanning", "#static-scanning-example"],
    ["Validation", "#validation-example"],
    ["Promote to tokens", "#promotion-example"],
    ["Core concepts", "#how-it-works"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Arbitrary properties page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function ArbitraryPropertiesExamples() {
  return (
    <>
      <style>{`
        .arbitrary-hover-card { transform:translateY(0); letter-spacing:0; transition:transform 180ms ease-out,letter-spacing 180ms ease-out,background-color 180ms ease-out,color 180ms ease-out; }
        .arbitrary-hover-card:hover { transform:translateY(-7px); letter-spacing:.08em; background:#111; color:#fff; }
      `}</style>

      <Demo
        id="property-example"
        label="VISUAL EXAMPLE · ONE-OFF PROPERTY"
        title="Use a CSS property that has no dedicated utility"
        description="Write the property and value directly inside brackets. This is useful for isolated browser features while keeping the declaration colocated with the component."
        code={`<p class="co-[writing-mode:vertical-rl]">
  Vertical label
</p>

<svg class="co-[mask-type:luminance]">...</svg>`}
      >
        <div style={{ minHeight: 190, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
          <div style={{ height: 138, padding: 14, border: "1px solid #111", background: "#fff", writingMode: "vertical-rl", fontSize: 10, fontWeight: 700, letterSpacing: ".12em" }}>VERTICAL LABEL</div>
          <div style={{ width: 180, height: 138, display: "grid", placeItems: "center", background: "#111", color: "#fff", fontSize: 10 }}>co-[writing-mode:vertical-rl]</div>
        </div>
      </Demo>

      <Demo
        id="typed-value-example"
        label="VISUAL EXAMPLE · TYPE HINTS"
        title="Disambiguate values with an explicit type"
        description="Type hints tell the resolver whether an ambiguous value represents a length, color, image, position, font family, or font weight."
        code={`<h2 class="co-text-[length:2rem]">Large heading</h2>
<p class="co-text-[color:oklch(60%_0.2_250)]">Typed color</p>
<div class="co-bg-[image:linear-gradient(to_right,#000,#fff)]"></div>
<div class="co-grid co-grid-cols-[200px_minmax(0,1fr)]"></div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
          <div style={tile}><span style={{ fontSize: "2rem", fontWeight: 700 }}>Aa</span><code style={{ fontSize: 8 }}>text-[length:2rem]</code></div>
          <div style={tile}><span style={{ fontSize: 24, color: "oklch(60% .2 250)", fontWeight: 700 }}>COLOR</span><code style={{ fontSize: 8 }}>text-[color:oklch(...)]</code></div>
          <div style={{ ...tile, background: "linear-gradient(to right,#000,#fff)", color: "#fff" }}><code style={{ padding: 6, background: "#111", color: "#fff", fontSize: 8 }}>bg-[image:linear-gradient(...)]</code></div>
          <div style={{ ...tile, gridTemplateColumns: "90px minmax(0,1fr)", alignContent: "stretch", alignItems: "stretch" }}><span style={{ display: "grid", placeItems: "center", background: "#111", color: "#fff", fontSize: 9 }}>200px</span><span style={{ display: "grid", placeItems: "center", background: "#ddd", fontSize: 9 }}>minmax(0,1fr)</span></div>
        </div>
      </Demo>

      <Demo
        id="underscore-example"
        label="SYNTAX EXAMPLE · SPACES & UNDERSCORES"
        title="Encode spaces without breaking the class name"
        description="An unescaped underscore becomes a space. Escape it when the resulting CSS value must contain a literal underscore."
        code={`<!-- underscores become spaces -->
<div class="co-grid-cols-[200px_minmax(0,1fr)]"></div>
<p class="co-font-[family:Inter,_sans-serif]">...</p>

<!-- escaped underscore stays an underscore -->
<div class="co-[--label:hello\\_world]"></div>`}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ padding: 16, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 14, alignItems: "center", border: "1px solid #ddd", background: "#fff", fontSize: 10 }}><code>to_right</code><b>→</b><code>to right</code></div>
          <div style={{ padding: 16, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 14, alignItems: "center", border: "1px solid #ddd", background: "#fff", fontSize: 10 }}><code>hello\_world</code><b>→</b><code>hello_world</code></div>
        </div>
      </Demo>

      <Demo
        id="custom-property-example"
        label="VISUAL EXAMPLE · CUSTOM PROPERTIES"
        title="Define and consume a local CSS variable"
        description="Custom property names beginning with -- are valid arbitrary properties. This keeps a one-off relationship explicit without adding a global token."
        code={`<article class="co-[--card-angle:4deg] co-[transform:rotate(var(--card-angle))]">
  Rotated by a local variable
</article>`}
      >
        <div style={{ minHeight: 190, display: "grid", placeItems: "center" }}>
          <article style={{ width: 230, padding: 28, border: "1px solid #111", background: "#111", color: "#fff", transform: "rotate(4deg)", textAlign: "center" }}><strong style={{ fontSize: 11 }}>--card-angle: 4deg</strong><p style={{ margin: "7px 0 0", color: "#bbb", fontSize: 9 }}>transform: rotate(var(--card-angle))</p></article>
        </div>
      </Demo>

      <Demo
        id="arbitrary-variant-example"
        label="INTERACTIVE EXAMPLE · VARIANT COMPOSITION"
        title="Combine arbitrary declarations with normal variants"
        description="Hover the card. State and responsive prefixes wrap arbitrary properties using the same variant pipeline as first-class utilities."
        code={`<article class="co-[transform:translateY(0)] hover:co-[transform:translateY(-7px)] hover:co-[letter-spacing:.08em] md:co-[padding:2rem]">
  Hover me
</article>`}
      >
        <div style={{ minHeight: 190, display: "grid", placeItems: "center" }}>
          <article className="arbitrary-hover-card" style={{ width: "min(100%, 360px)", padding: 26, border: "1px solid #111", background: "#fff", textAlign: "center", cursor: "pointer", fontSize: 10, fontWeight: 700 }}>HOVER VARIANT PREVIEW</article>
        </div>
      </Demo>

      <Demo
        id="static-scanning-example"
        label="AI-FRIENDLY EXAMPLE · STATIC SCANNING"
        title="Keep the complete candidate literal in source"
        description="The scanner reads source as text and does not execute template interpolation. Choose from complete class strings so humans and AI agents can verify the exact generated candidate."
        code={`// Good: every complete candidate exists in source
const widths = {
  compact: "co-[width:18rem]",
  wide: "co-[width:32rem]",
};
<aside class={widths[mode]} />

// Avoid: the scanner cannot reconstruct this candidate
<aside class={\`co-[width:\${size}rem]\`} />`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
          <div style={{ ...tile, borderColor: "#111" }}><b style={{ fontSize: 18 }}>✓</b><code style={{ fontSize: 8 }}>{'"co-[width:18rem]"'}</code><span style={{ color: "#666", fontSize: 8 }}>DISCOVERABLE</span></div>
          <div style={{ ...tile, borderStyle: "dashed", color: "#777" }}><b style={{ fontSize: 18 }}>×</b><code style={{ fontSize: 8 }}>{'`co-[width:${size}rem]`'}</code><span style={{ fontSize: 8 }}>NOT DISCOVERABLE</span></div>
        </div>
      </Demo>

      <Demo
        id="validation-example"
        label="SECURITY EXAMPLE · VALIDATION"
        title="Reject declarations that escape their boundary"
        description="The compiler validates property names and values before emitting CSS. Arbitrary values must still come from trusted source code and never directly from runtime user input."
        code={`<!-- accepted -->
<div class="co-[mask-type:luminance]"></div>

<!-- rejected: attempts to inject a second declaration -->
<div class="co-[color:red;background:blue]"></div>`}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ padding: 16, display: "grid", gridTemplateColumns: "32px 1fr auto", gap: 12, alignItems: "center", border: "1px solid #111", background: "#fff" }}><b style={{ fontSize: 17 }}>✓</b><code style={{ fontSize: 9 }}>co-[mask-type:luminance]</code><span style={{ fontSize: 8, fontWeight: 700 }}>ACCEPTED</span></div>
          <div style={{ padding: 16, display: "grid", gridTemplateColumns: "32px 1fr auto", gap: 12, alignItems: "center", border: "1px dashed #999", background: "#eee", color: "#666" }}><b style={{ fontSize: 17 }}>×</b><code style={{ fontSize: 9 }}>co-[color:red;background:blue]</code><span style={{ fontSize: 8, fontWeight: 700 }}>REJECTED</span></div>
        </div>
      </Demo>

      <Demo
        id="promotion-example"
        label="DESIGN SYSTEM · PROMOTION PATH"
        title="Promote repeated values into a token"
        description="An arbitrary value is appropriate for a genuine exception. When the same decision appears repeatedly, give it a semantic theme name so usage becomes consistent and easier for AI to track."
        code={`<!-- Fine for a one-off prototype -->
<div class="co-rounded-[18px]"></div>

<!-- Repeated decision: promote it -->
@co-theme { --co-radius-panel: 18px; }
<div class="co-rounded-panel"></div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 18, alignItems: "center" }}>
          <div style={{ ...tile, borderRadius: 18 }}><code style={{ fontSize: 9 }}>co-rounded-[18px]</code><span style={{ color: "#777", fontSize: 8 }}>ONE-OFF</span></div>
          <span aria-hidden="true" style={{ fontSize: 24 }}>→</span>
          <div style={{ ...tile, borderRadius: 18, background: "#111", color: "#fff" }}><code style={{ color: "#fff", fontSize: 9 }}>co-rounded-panel</code><span style={{ color: "#bbb", fontSize: 8 }}>SHARED TOKEN</span></div>
        </div>
      </Demo>
    </>
  );
}
