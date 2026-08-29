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
  minHeight: 116,
  display: "grid",
  placeItems: "center",
  border: "1px solid #d8d8d4",
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

export function TransitionsMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Transition property", "#transition-property-example"],
    ["Duration & delay", "#duration-delay-example"],
    ["Easing", "#easing-example"],
    ["Starting style", "#starting-style-example"],
    ["Animations", "#animation-example"],
    ["Reduced motion", "#reduced-motion-example"],
    ["Core concepts", "#how-it-works"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Transitions and animations page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function TransitionsExamples() {
  return (
    <>
      <style>{`
        .transition-demo-button { background:#111; color:#fff; transform:translateY(0) scale(1); box-shadow:0 0 0 transparent; transition-property:color,background-color,transform,box-shadow; transition-duration:300ms; transition-timing-function:cubic-bezier(0,0,.2,1); }
        .transition-demo-button:hover { background:#fff; color:#111; transform:translateY(-6px) scale(1.04); box-shadow:0 14px 28px rgb(0 0 0/.18); }
        .duration-demo:hover .duration-demo-dot { transform:translateX(calc(100% - 36px)); }
        .easing-demo:hover .easing-demo-dot { transform:translateX(calc(100% - 30px)); }
        .entry-demo[open] .entry-demo-panel { opacity:1; transform:translateY(0); }
        .entry-demo-panel { opacity:0; transform:translateY(-8px); transition:opacity 300ms ease-out,transform 300ms ease-out,display 300ms allow-discrete; }
        @starting-style { .entry-demo[open] .entry-demo-panel { opacity:0; transform:translateY(-8px); } }
        @keyframes docs-spin { to { transform:rotate(360deg); } }
        @keyframes docs-ping { 75%,100% { transform:scale(1.75); opacity:0; } }
        @keyframes docs-pulse { 50% { opacity:.28; } }
        @keyframes docs-bounce { 0%,100% { transform:translateY(-22%); animation-timing-function:cubic-bezier(.8,0,1,1); } 50% { transform:none; animation-timing-function:cubic-bezier(0,0,.2,1); } }
        .docs-animate-spin { animation:docs-spin 1s linear infinite; }
        .docs-animate-ping { animation:docs-ping 1s cubic-bezier(0,0,.2,1) infinite; }
        .docs-animate-pulse { animation:docs-pulse 2s cubic-bezier(.4,0,.6,1) infinite; }
        .docs-animate-bounce { animation:docs-bounce 1s infinite; }
        @media (prefers-reduced-motion: reduce) { .transition-demo-button,.duration-demo-dot,.easing-demo-dot,.entry-demo-panel { transition:none !important; } .docs-motion-demo { animation:none !important; } }
      `}</style>

      <Demo
        id="transition-property-example"
        label="INTERACTIVE EXAMPLE · TRANSITION PROPERTY"
        title="Animate only the properties that change"
        description="Hover the control to preview a composed transition. Prefer a focused property group such as colors, opacity, shadow, or transform instead of transitioning everything."
        code={`<button class="co-transition co-duration-300 co-ease-out hover:-co-translate-y-1 hover:co-shadow-lg">
  Hover me
</button>

<div class="co-transition-[width,opacity]">Custom property list</div>`}
      >
        <div style={{ minHeight: 170, display: "grid", placeItems: "center" }}>
          <button className="transition-demo-button" style={{ padding: "16px 28px", border: "1px solid #111", borderRadius: 999, cursor: "pointer", font: "inherit", fontSize: 11, fontWeight: 700 }}>HOVER TO PREVIEW ↗</button>
        </div>
      </Demo>

      <Demo
        id="duration-delay-example"
        label="INTERACTIVE EXAMPLE · DURATION & DELAY"
        title="Coordinate timing deliberately"
        description="Hover the preview to compare durations. Delay postpones the start, while duration controls how long the property takes to reach its destination."
        code={`<div class="co-transition-transform co-duration-150">Fast</div>
<div class="co-transition-transform co-duration-300 co-delay-75">Standard</div>
<div class="co-transition-transform co-duration-700">Slow</div>`}
      >
        <div className="duration-demo" style={{ display: "grid", gap: 16, cursor: "ew-resize" }}>
          {[[150, 0, "150 MS"], [300, 75, "300 MS · 75 MS DELAY"], [700, 0, "700 MS"]].map(([duration, delay, label]) => <div key={label} style={{ display: "grid", gridTemplateColumns: "128px 1fr", alignItems: "center", gap: 14 }}><code style={{ fontSize: 9 }}>{label}</code><div style={{ height: 36, padding: 4, border: "1px solid #d8d8d4", background: "#fff" }}><span className="duration-demo-dot" style={{ width: 26, height: 26, display: "block", background: "#111", transitionProperty: "transform", transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms`, transitionTimingFunction: "cubic-bezier(0,0,.2,1)" }} /></div></div>)}
          <p style={{ margin: "2px 0 0 142px", color: "#777", fontSize: 9 }}>HOVER ANYWHERE IN THIS PREVIEW</p>
        </div>
      </Demo>

      <Demo
        id="easing-example"
        label="INTERACTIVE EXAMPLE · EASING"
        title="Shape acceleration and deceleration"
        description="Hover the tracks to compare identical durations with different timing curves. Ease-out feels responsive for elements entering or reacting to input."
        code={`<div class="co-transition-transform co-duration-700 co-ease-linear">Linear</div>
<div class="co-transition-transform co-duration-700 co-ease-in">Ease in</div>
<div class="co-transition-transform co-duration-700 co-ease-out">Ease out</div>
<div class="co-transition-transform co-duration-700 co-ease-in-out">Ease in out</div>`}
      >
        <div className="easing-demo" style={{ display: "grid", gap: 13, cursor: "ew-resize" }}>
          {[['linear', "LINEAR"], ['cubic-bezier(.4,0,1,1)', "EASE IN"], ['cubic-bezier(0,0,.2,1)', "EASE OUT"], ['cubic-bezier(.4,0,.2,1)', "EASE IN OUT"]].map(([timing, label]) => <div key={label} style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 12, alignItems: "center" }}><code style={{ fontSize: 9 }}>{label}</code><div style={{ height: 30, padding: 4, borderBottom: "1px solid #ccc" }}><span className="easing-demo-dot" style={{ display: "block", width: 20, height: 20, borderRadius: "50%", background: "#111", transition: `transform 700ms ${timing}` }} /></div></div>)}
        </div>
      </Demo>

      <Demo
        id="starting-style-example"
        label="INTERACTIVE EXAMPLE · STARTING STYLE"
        title="Transition an element when it first appears"
        description="Open the disclosure to replay its entry. The starting variant emits @starting-style, while transition-discrete allows properties such as display to participate."
        code={`<div class="co-transition co-transition-discrete co-duration-300 starting:co-opacity-0 starting:-co-translate-y-2">
  Newly mounted content
</div>`}
      >
        <details className="entry-demo" style={{ maxWidth: 520, margin: "0 auto", border: "1px solid #111", background: "#fff" }}>
          <summary style={{ padding: "15px 18px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>TOGGLE ENTRY PREVIEW</summary>
          <div className="entry-demo-panel" style={{ margin: "0 12px 12px", padding: 20, background: "#111", color: "#fff", fontSize: 11 }}>Content enters from its declared starting style.</div>
        </details>
      </Demo>

      <Demo
        id="animation-example"
        label="VISUAL EXAMPLE · ANIMATION PRESETS"
        title="Use namespaced keyframes for common feedback"
        description="Spin, ping, pulse, and bounce ship as configurable presets. The compiler emits each required keyframe once, even when the utility appears many times."
        code={`<span class="co-animate-spin">Loading</span>
<span class="co-animate-ping">Live</span>
<span class="co-animate-pulse">Syncing</span>
<span class="co-animate-bounce">Scroll</span>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14 }}>
          <div style={tile}><div className="docs-animate-spin docs-motion-demo" style={{ width: 38, height: 38, border: "4px solid #ddd", borderTopColor: "#111", borderRadius: "50%" }} /><code style={{ fontSize: 9 }}>spin</code></div>
          <div style={tile}><div style={{ position: "relative", width: 40, height: 40, display: "grid", placeItems: "center" }}><span className="docs-animate-ping docs-motion-demo" style={{ position: "absolute", width: 30, height: 30, borderRadius: "50%", background: "#111" }} /><span style={{ position: "relative", width: 14, height: 14, borderRadius: "50%", background: "#111" }} /></div><code style={{ fontSize: 9 }}>ping</code></div>
          <div style={tile}><div className="docs-animate-pulse docs-motion-demo" style={{ width: 54, height: 38, background: "#111" }} /><code style={{ fontSize: 9 }}>pulse</code></div>
          <div style={tile}><div className="docs-animate-bounce docs-motion-demo" style={{ width: 28, height: 28, background: "#111", transform: "rotate(45deg)" }} /><code style={{ fontSize: 9 }}>bounce</code></div>
        </div>
      </Demo>

      <Demo
        id="reduced-motion-example"
        label="ACCESSIBILITY EXAMPLE · REDUCED MOTION"
        title="Respect the user's motion preference"
        description="Use motion-safe for decorative movement and motion-reduce to remove or simplify animation. The previews on this page also stop automatically when reduced motion is enabled at operating-system level."
        code={`<div class="motion-safe:co-animate-spin motion-reduce:co-animate-none">
  Accessible loader
</div>

<button class="motion-safe:co-transition-transform motion-safe:hover:co-scale-105">
  Continue
</button>`}
      >
        <div style={{ minHeight: 150, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, textAlign: "left" }}>
          <span className="docs-animate-spin docs-motion-demo" style={{ width: 34, height: 34, flex: "0 0 auto", border: "3px solid #d3d3cf", borderTopColor: "#111", borderRadius: "50%" }} />
          <div><strong style={{ display: "block", fontSize: 11 }}>MOTION-AWARE LOADER</strong><span style={{ color: "#777", fontSize: 10 }}>Animated normally · static under prefers-reduced-motion</span></div>
        </div>
      </Demo>
    </>
  );
}
