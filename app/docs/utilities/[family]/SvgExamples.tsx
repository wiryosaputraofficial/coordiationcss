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
  minHeight: 132,
  padding: 18,
  display: "grid",
  placeItems: "center",
  alignContent: "center",
  gap: 14,
  border: "1px solid #dededa",
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

export function SvgMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Current color", "#current-color-example"],
    ["Fill", "#fill-example"],
    ["Stroke", "#stroke-example"],
    ["Stroke width", "#stroke-width-example"],
    ["Dash, cap & join", "#stroke-detail-example"],
    ["State variants", "#svg-state-example"],
    ["Core concepts", "#how-it-works"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="SVG page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

function Heart({ size = 48, fill = "currentColor", stroke = "none", strokeWidth = 0 }: { size?: number; fill?: string; stroke?: string; strokeWidth?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth}><path d="M12 21s-7.2-4.35-9.5-8.7C.35 8.25 2.55 4 7 4c2.25 0 4 1.25 5 2.8C13 5.25 14.75 4 17 4c4.45 0 6.65 4.25 4.5 8.3C19.2 16.65 12 21 12 21Z" /></svg>;
}

function RouteIcon({ stroke = "currentColor", strokeWidth = 2 }: { stroke?: string; strokeWidth?: number }) {
  return <svg aria-hidden="true" width="62" height="62" viewBox="0 0 48 48" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="36" r="4" /><circle cx="38" cy="10" r="4" /><path d="M13 36h9c8 0 8-12 0-12h-2c-8 0-8-10 0-10h14" /><path d="m32 33 5 5 8-9" /></svg>;
}

export default function SvgExamples() {
  return (
    <>
      <style>{`
        .svg-state-button { color:#111; background:#fff; transition:color 180ms ease-out,background-color 180ms ease-out,transform 180ms ease-out; }
        .svg-state-button:hover,.svg-state-button:focus-visible { color:#fff; background:#111; transform:translateY(-3px); }
      `}</style>

      <Demo
        id="current-color-example"
        label="VISUAL EXAMPLE · CURRENT COLOR"
        title="Let icons inherit surrounding text color"
        description="CurrentColor keeps an icon synchronized with its parent. Change the text color once and both SVG fill and label update together."
        code={`<button class="co-text-black">
  <svg class="co-fill-current" viewBox="0 0 24 24">...</svg>
  Favorite
</button>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          {[['#111', '#fff', 'PRIMARY'], ['#666', '#fff', 'MUTED'], ['#fff', '#111', 'INVERSE']].map(([color, background, label]) => <div key={label} style={{ ...tile, color, background }}><Heart /><code style={{ color: "inherit", fontSize: 9 }}>{label}</code></div>)}
        </div>
      </Demo>

      <Demo
        id="fill-example"
        label="VISUAL EXAMPLE · FILL"
        title="Color closed SVG shapes"
        description="Fill paints the interior of paths and shapes. Use a theme color for a semantic role or an arbitrary color for a deliberate one-off value."
        code={`<svg class="co-fill-black">...</svg>
<svg class="co-fill-neutral-500">...</svg>
<svg class="co-fill-[#d4d4d4]">...</svg>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          {[['#111', 'black'], ['#777', 'neutral-500'], ['#d4d4d4', '[#d4d4d4]']].map(([fill, label]) => <div style={tile} key={label}><Heart fill={fill} /><code style={{ fontSize: 9 }}>co-fill-{label}</code></div>)}
        </div>
      </Demo>

      <Demo
        id="stroke-example"
        label="VISUAL EXAMPLE · STROKE COLOR"
        title="Color open paths and icon outlines"
        description="Stroke controls the outline independently from fill. Outline icons usually use fill=none in markup and a Coordiation utility for their stroke color."
        code={`<svg fill="none" class="co-stroke-black">...</svg>
<svg fill="none" class="co-stroke-current co-text-neutral-500">...</svg>
<svg fill="none" class="co-stroke-[#999]">...</svg>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          {[['#111', 'black'], ['#666', 'current'], ['#aaa', '[#aaa]']].map(([stroke, label]) => <div style={tile} key={label}><RouteIcon stroke={stroke} /><code style={{ fontSize: 9 }}>co-stroke-{label}</code></div>)}
        </div>
      </Demo>

      <Demo
        id="stroke-width-example"
        label="VISUAL EXAMPLE · STROKE WIDTH"
        title="Tune visual weight without editing the SVG"
        description="Named widths cover common icon weights. Arbitrary numeric values give precise control while preserving the same path data."
        code={`<svg class="co-stroke-black co-stroke-1">...</svg>
<svg class="co-stroke-black co-stroke-2">...</svg>
<svg class="co-stroke-black co-stroke-[1.5]">...</svg>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          {[[1, 'co-stroke-1'], [1.5, 'co-stroke-[1.5]'], [2, 'co-stroke-2']].map(([width, label]) => <div style={tile} key={label}><RouteIcon strokeWidth={Number(width)} /><code style={{ fontSize: 9 }}>{label}</code></div>)}
        </div>
      </Demo>

      <Demo
        id="stroke-detail-example"
        label="VISUAL EXAMPLE · ARBITRARY SVG PROPERTIES"
        title="Control dash patterns, line caps, and joins"
        description="These presentation attributes sit outside the dedicated SVG family. Use arbitrary property utilities when they need to participate in variants or remain visible to the scanner."
        code={`<svg class="co-stroke-black co-stroke-2 co-[stroke-dasharray:5_4]">...</svg>
<svg class="co-stroke-black co-stroke-2 co-[stroke-linecap:round]">...</svg>
<svg class="co-stroke-black co-stroke-2 co-[stroke-linejoin:bevel]">...</svg>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          <div style={tile}><svg aria-hidden="true" width="92" height="54" viewBox="0 0 92 54" fill="none" stroke="#111" strokeWidth="2"><path d="M5 40C25 5 63 5 87 40" strokeDasharray="5 4" /></svg><code style={{ fontSize: 9 }}>dasharray:5 4</code></div>
          <div style={tile}><svg aria-hidden="true" width="92" height="54" viewBox="0 0 92 54" fill="none" stroke="#111" strokeWidth="8" strokeLinecap="round"><path d="M10 27h72" /></svg><code style={{ fontSize: 9 }}>linecap:round</code></div>
          <div style={tile}><svg aria-hidden="true" width="92" height="54" viewBox="0 0 92 54" fill="none" stroke="#111" strokeWidth="6" strokeLinejoin="bevel"><path d="m10 44 36-34 36 34" /></svg><code style={{ fontSize: 9 }}>linejoin:bevel</code></div>
        </div>
      </Demo>

      <Demo
        id="svg-state-example"
        label="INTERACTIVE EXAMPLE · STATE VARIANTS"
        title="Change SVG color with its component state"
        description="Hover or focus the button. Because the icon uses currentColor, the parent state controls the entire component without repeating separate icon colors."
        code={`<button class="co-text-black hover:co-bg-black hover:co-text-white co-transition-colors">
  <svg class="co-fill-current">...</svg>
  Save item
</button>`}
      >
        <div style={{ minHeight: 160, display: "grid", placeItems: "center" }}>
          <button className="svg-state-button" style={{ padding: "14px 22px", display: "inline-flex", alignItems: "center", gap: 11, border: "1px solid #111", borderRadius: 999, cursor: "pointer", font: "inherit", fontSize: 11, fontWeight: 700 }}><Heart size={20} /> SAVE ITEM</button>
        </div>
      </Demo>
    </>
  );
}
