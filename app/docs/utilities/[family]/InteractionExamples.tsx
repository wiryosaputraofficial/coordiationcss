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
  minHeight: 106,
  padding: 16,
  display: "grid",
  placeItems: "center",
  border: "1px solid #d9d9d5",
  background: "#fff",
  fontSize: 9,
  fontWeight: 700,
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

export function InteractionMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Appearance", "#appearance-example"],
    ["Cursor", "#cursor-example"],
    ["Pointer events", "#pointer-events-example"],
    ["Text selection", "#selection-example"],
    ["Field sizing", "#field-sizing-example"],
    ["Resize", "#resize-example"],
    ["Scroll snap", "#scroll-snap-example"],
    ["Scrollbars", "#scrollbar-example"],
    ["Touch action", "#touch-example"],
    ["Will change", "#will-change-example"],
    ["Core concepts", "#how-it-works"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Interactivity page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function InteractionExamples() {
  return (
    <>
      <style>{`
        .interaction-field-content { field-sizing:content; min-width:8rem; max-width:100%; }
        .interaction-scrollbar { scrollbar-width:thin; scrollbar-color:#111 #dededa; scrollbar-gutter:stable; }
        .interaction-scrollbar::-webkit-scrollbar { height:10px; width:10px; }
        .interaction-scrollbar::-webkit-scrollbar-track { background:#dededa; }
        .interaction-scrollbar::-webkit-scrollbar-thumb { background:#111; border:2px solid #dededa; }
        .interaction-action-button:focus-visible { outline:3px solid #777; outline-offset:3px; }
      `}</style>

      <Demo
        id="appearance-example"
        label="VISUAL EXAMPLE · APPEARANCE"
        title="Keep native controls or take ownership of styling"
        description="Appearance auto preserves the platform control. Appearance none removes native visual treatment, so you must provide clear states, affordances, and keyboard focus yourself."
        code={`<select class="co-appearance-auto">...</select>

<select class="co-appearance-none co-border co-px-4 co-py-3 co-bg-white">
  ...
</select>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18 }}>
          <label style={tile}>NATIVE APPEARANCE<select defaultValue="native" style={{ width: "100%", marginTop: 12, padding: 10, font: "inherit" }}><option value="native">Browser control</option></select></label>
          <label style={tile}>CUSTOM APPEARANCE<select defaultValue="custom" style={{ width: "100%", marginTop: 12, padding: 11, appearance: "none", border: "1px solid #111", borderRadius: 0, background: "linear-gradient(45deg,transparent 50%,#111 50%) calc(100% - 15px) 50%/5px 5px no-repeat,linear-gradient(135deg,#111 50%,transparent 50%) calc(100% - 10px) 50%/5px 5px no-repeat,#fff", font: "inherit" }}><option value="custom">Authored control</option></select></label>
        </div>
      </Demo>

      <Demo
        id="cursor-example"
        label="INTERACTIVE EXAMPLE · CURSOR"
        title="Match pointer feedback to real behavior"
        description="Move the pointer over each tile. Cursor utilities communicate the interaction users can perform; they should never promise behavior that the component does not provide."
        code={`<button class="co-cursor-pointer">Open</button>
<div class="co-cursor-grab active:co-cursor-grabbing">Drag</div>
<button disabled class="co-cursor-not-allowed">Unavailable</button>
<div class="co-cursor-zoom-in">Zoom image</div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
          {[['pointer', 'POINTER'], ['grab', 'GRAB'], ['not-allowed', 'NOT ALLOWED'], ['zoom-in', 'ZOOM IN']].map(([cursor, label]) => <div key={cursor} style={{ ...tile, cursor }}>{label}<code style={{ color: "#777", fontSize: 8 }}>co-cursor-{cursor}</code></div>)}
        </div>
      </Demo>

      <Demo
        id="pointer-events-example"
        label="INTERACTIVE EXAMPLE · POINTER EVENTS"
        title="Let events pass through decorative layers"
        description="The striped overlay covers the button visually but ignores pointer input. The real button underneath remains clickable and keyboard-focusable."
        code={`<div class="co-relative">
  <button>Interactive target</button>
  <div aria-hidden="true" class="co-pointer-events-none co-absolute co-inset-0">Decoration</div>
</div>`}
      >
        <div style={{ minHeight: 180, display: "grid", placeItems: "center" }}>
          <div style={{ position: "relative", width: 260, height: 92, display: "grid", placeItems: "center" }}>
            <button className="interaction-action-button" type="button" style={{ padding: "14px 22px", border: "1px solid #111", background: "#111", color: "#fff", cursor: "pointer", font: "inherit", fontSize: 10, fontWeight: 700 }}>CLICKABLE TARGET</button>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", border: "1px dashed #777", background: "repeating-linear-gradient(135deg,transparent 0 9px,rgb(0 0 0/.05) 9px 10px)", display: "grid", alignItems: "end", justifyItems: "end", padding: 7, color: "#777", fontSize: 8 }}>POINTER-EVENTS: NONE</div>
          </div>
        </div>
      </Demo>

      <Demo
        id="selection-example"
        label="INTERACTIVE EXAMPLE · USER SELECT"
        title="Control how content participates in selection"
        description="Try selecting each line. Use select-none for disposable decoration, select-text for normal copy, and select-all when selecting one fragment should capture it completely."
        code={`<span class="co-select-none">Decorative label</span>
<p class="co-select-text">Copy this sentence normally.</p>
<code class="co-select-all">npm install @coordiation/css</code>`}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ padding: 15, border: "1px solid #ddd", background: "#fff", userSelect: "none", fontSize: 10 }}><b>SELECT NONE</b> · this decorative line cannot be selected</div>
          <div style={{ padding: 15, border: "1px solid #ddd", background: "#fff", userSelect: "text", fontSize: 10 }}><b>SELECT TEXT</b> · drag to select any part of this sentence</div>
          <code style={{ padding: 15, border: "1px solid #111", background: "#111", color: "#fff", userSelect: "all", fontSize: 10 }}>npm install @coordiation/css</code>
        </div>
      </Demo>

      <Demo
        id="field-sizing-example"
        label="INTERACTIVE EXAMPLE · FIELD SIZING"
        title="Let form fields follow their content"
        description="Type into the content-sized controls. Keep practical minimum and maximum sizes because field-sizing is progressive enhancement and unbounded fields can disrupt layout."
        code={`<input class="co-field-sizing-content co-min-w-32 co-max-w-full" placeholder="Type here" />

<textarea class="co-field-sizing-content co-min-h-20 co-max-h-64">...</textarea>`}
      >
        <div style={{ minHeight: 170, display: "grid", alignContent: "center", justifyItems: "start", gap: 14 }}>
          <input className="interaction-field-content" aria-label="Content-sized input example" placeholder="Type to resize" style={{ padding: "11px 13px", border: "1px solid #111", font: "inherit", fontSize: 10 }} />
          <textarea className="interaction-field-content" aria-label="Content-sized textarea example" defaultValue="This textarea grows with its content." style={{ width: "min(100%, 440px)", minHeight: 72, maxHeight: 180, padding: "11px 13px", border: "1px solid #111", resize: "none", font: "inherit", fontSize: 10, lineHeight: 1.5 }} />
        </div>
      </Demo>

      <Demo
        id="resize-example"
        label="INTERACTIVE EXAMPLE · RESIZE"
        title="Choose which resize handles users receive"
        description="Drag the lower edge or corner of these textareas. Restrict resizing only when the surrounding layout has a genuine directional constraint."
        code={`<textarea class="co-resize">Both axes</textarea>
<textarea class="co-resize-y">Vertical only</textarea>
<textarea class="co-resize-none">Fixed size</textarea>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14, alignItems: "start" }}>
          {([['both', 'BOTH AXES'], ['vertical', 'VERTICAL'], ['none', 'NONE']] as const).map(([resize, label]) => <label key={resize} style={{ display: "grid", gap: 8, fontSize: 9, fontWeight: 700 }}>{label}<textarea aria-label={`${label} resize example`} defaultValue="Try resizing me" style={{ width: "100%", minHeight: 90, maxWidth: "100%", padding: 10, border: "1px solid #111", resize, font: "inherit", fontSize: 9 }} /></label>)}
        </div>
      </Demo>

      <Demo
        id="scroll-snap-example"
        label="INTERACTIVE EXAMPLE · SCROLL SNAP"
        title="Land scrolling at intentional positions"
        description="Scroll horizontally through the cards. The container defines the X-axis and mandatory strictness; every card chooses center alignment and an always snap stop."
        code={`<div class="co-flex co-overflow-x-auto co-snap-x co-snap-mandatory">
  <article class="co-snap-center co-snap-always co-shrink-0">01</article>
  <article class="co-snap-center co-snap-always co-shrink-0">02</article>
</div>`}
      >
        <div className="interaction-scrollbar" style={{ display: "flex", gap: 16, padding: "14px calc(50% - 120px) 22px", overflowX: "auto", scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}>
          {[1, 2, 3, 4].map((item) => <article key={item} style={{ minWidth: 240, height: 145, flex: "0 0 auto", display: "grid", placeItems: "center", scrollSnapAlign: "center", scrollSnapStop: "always", border: "1px solid #111", background: item === 2 ? "#111" : "#fff", color: item === 2 ? "#fff" : "#111", fontSize: 26, fontWeight: 700 }}>{String(item).padStart(2, "0")}</article>)}
        </div>
      </Demo>

      <Demo
        id="scrollbar-example"
        label="VISUAL EXAMPLE · SCROLLBAR"
        title="Style scrollbars while preserving native scrolling"
        description="Thumb and track colors compose independently. Stable gutter reserves scrollbar space so content does not shift when overflow begins. Browser rendering may differ."
        code={`<div class="co-overflow-auto co-scrollbar-thin co-scrollbar-thumb-black co-scrollbar-track-neutral-200 co-scrollbar-gutter-stable">
  Long content...
</div>`}
      >
        <div className="interaction-scrollbar" style={{ height: 154, overflow: "auto", padding: 16, border: "1px solid #111", background: "#fff" }}>
          <div style={{ width: "130%", display: "grid", gap: 9 }}>{Array.from({ length: 7 }, (_, index) => <div key={index} style={{ height: 26, padding: "7px 10px", background: index % 2 ? "#ededE9" : "#111", color: index % 2 ? "#111" : "#fff", fontSize: 8 }}>SCROLLABLE ROW {index + 1}</div>)}</div>
        </div>
      </Demo>

      <Demo
        id="touch-example"
        label="MOBILE EXAMPLE · TOUCH ACTION"
        title="Preserve the gestures your interface does not replace"
        description="Directional pan and pinch utilities compose. A vertical carousel might keep pan-y and pinch-zoom while an application-owned canvas intentionally handles gestures itself."
        code={`<div class="co-touch-pan-y co-touch-pinch-zoom">Vertical feed</div>
<button class="co-touch-manipulation">Fast tap target</button>
<canvas class="co-touch-none">Application-owned gestures</canvas>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          <div style={{ ...tile, touchAction: "pan-y pinch-zoom" }}><span style={{ fontSize: 22 }}>↕</span>PAN Y + PINCH</div>
          <button type="button" style={{ ...tile, width: "100%", touchAction: "manipulation", cursor: "pointer", font: "inherit" }}><span style={{ fontSize: 22 }}>◎</span>MANIPULATION</button>
          <div style={{ ...tile, touchAction: "none", background: "#111", color: "#fff" }}><span style={{ fontSize: 22 }}>✣</span>APP GESTURES</div>
        </div>
      </Demo>

      <Demo
        id="will-change-example"
        label="PERFORMANCE EXAMPLE · WILL CHANGE"
        title="Add rendering hints only when measurement justifies them"
        description="Will-change is a temporary browser hint, not a default optimization. Apply it shortly before a costly interaction and remove it afterward to avoid excess memory use."
        code={`<div class="hover:co-will-change-transform co-transition-transform hover:co-scale-105">
  Measured transform hotspot
</div>

<div class="co-will-change-[contents,transform]">Custom hint list</div>`}
      >
        <div style={{ minHeight: 155, display: "grid", placeItems: "center" }}>
          <div style={{ width: "min(100%, 440px)", padding: 22, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "center", border: "1px solid #111", background: "#fff", willChange: "transform" }}><span style={{ width: 40, height: 40, display: "grid", placeItems: "center", background: "#111", color: "#fff", fontWeight: 700 }}>!</span><div><strong style={{ display: "block", fontSize: 10 }}>TEMPORARY HINT</strong><span style={{ color: "#777", fontSize: 9 }}>Measure → apply → interact → remove</span></div></div>
        </div>
      </Demo>
    </>
  );
}
