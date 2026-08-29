import type { CSSProperties, ReactNode } from "react";
import SolarIcon from "../../../_components/SolarIcon";
import CodeBlock from "../../_components/CodeBlock";

const preview: CSSProperties = {
  marginTop: 24,
  padding: 28,
  overflow: "hidden",
  border: "1px solid #d8d8d4",
  background: "#f7f7f4",
  color: "#111",
};

const srOnly: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
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

export function AccessibilityMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Screen-reader labels", "#sr-label-example"],
    ["Skip links", "#skip-link-example"],
    ["Live regions", "#live-region-example"],
    ["Forced colors", "#forced-colors-example"],
    ["Color scheme", "#color-scheme-example"],
    ["Semantic foundation", "#semantic-example"],
    ["Core concepts", "#how-it-works"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Accessibility page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function AccessibilityExamples() {
  return (
    <>
      <style>{`
        .accessibility-skip-link { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border-width:0; }
        .accessibility-skip-link:focus { position:static; width:auto; height:auto; padding:12px 16px; margin:0; overflow:visible; clip:auto; white-space:normal; display:inline-block; background:#111; color:#fff; outline:3px solid #777; outline-offset:3px; }
        .accessibility-focus-demo:focus-visible { outline:3px solid #111; outline-offset:4px; }
        @media (forced-colors: active) { .forced-color-auto { forced-color-adjust:auto; } .forced-color-none { forced-color-adjust:none; } }
      `}</style>

      <Demo
        id="sr-label-example"
        label="ACCESSIBLE EXAMPLE · SCREEN-READER LABEL"
        title="Give icon-only controls an accessible name"
        description="The label is visually hidden but remains in the accessibility tree. Screen readers announce “Notifications” instead of an unlabeled button."
        code={`<button type="button">
  <svg aria-hidden="true">...</svg>
  <span class="co-sr-only">Notifications</span>
</button>`}
      >
        <div style={{ minHeight: 160, display: "grid", placeItems: "center", textAlign: "center" }}>
          <button type="button" style={{ width: 54, height: 54, display: "grid", placeItems: "center", border: "1px solid #111", borderRadius: "50%", background: "#111", color: "#fff", cursor: "pointer" }}><SolarIcon name="bell" size={22} /><span style={srOnly}>Notifications</span></button>
          <p style={{ margin: "14px 0 0", color: "#666", fontSize: 10 }}>VISIBLE ICON · ACCESSIBLE NAME: “NOTIFICATIONS”</p>
        </div>
      </Demo>

      <Demo
        id="skip-link-example"
        label="INTERACTIVE EXAMPLE · SKIP LINK"
        title="Reveal navigation shortcuts on keyboard focus"
        description="Press Tab while the preview is active. The skip link starts screen-reader-only, then becomes visible when a keyboard user focuses it."
        code={`<a href="#main-content" class="co-sr-only focus:co-not-sr-only">
  Skip to main content
</a>`}
      >
        <div style={{ minHeight: 185, padding: 18, border: "1px solid #d7d7d3", background: "#fff" }}>
          <a className="accessibility-skip-link" href="#semantic-example">Skip to main content</a>
          <div aria-hidden="true" style={{ display: "flex", gap: 16, paddingBottom: 14, borderBottom: "1px solid #ddd", color: "#777", fontSize: 9 }}><b style={{ color: "#111" }}>COORDIATION</b><span>Docs</span><span>Components</span></div>
          <div style={{ paddingTop: 24 }}><strong style={{ fontSize: 17 }}>Main content</strong><p style={{ margin: "7px 0 0", color: "#777", fontSize: 10 }}>Keyboard users can bypass repeated navigation.</p></div>
        </div>
      </Demo>

      <Demo
        id="live-region-example"
        label="ACCESSIBLE EXAMPLE · LIVE REGION"
        title="Pair visual status with assistive feedback"
        description="Coordiation handles the visually hidden helper text; semantic ARIA tells assistive technology when the status should be announced."
        code={`<div role="status" aria-live="polite" class="co-flex co-items-center co-gap-2">
  <span aria-hidden="true" class="co-size-2 co-rounded-full co-bg-black"></span>
  Saved
  <span class="co-sr-only">Your changes were saved successfully.</span>
</div>`}
      >
        <div style={{ minHeight: 150, display: "grid", placeItems: "center" }}>
          <div role="status" aria-live="polite" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 17px", border: "1px solid #111", background: "#fff", fontSize: 11, fontWeight: 700 }}><span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: "#111" }} />SAVED<span style={srOnly}>Your changes were saved successfully.</span></div>
        </div>
      </Demo>

      <Demo
        id="forced-colors-example"
        label="SYSTEM PREFERENCE · FORCED COLORS"
        title="Let high-contrast mode override colors by default"
        description="Use auto for ordinary interface elements. Reserve none for a small visual whose authored colors carry essential meaning, and test it in the operating system's forced-colors mode."
        code={`<button class="co-forced-color-adjust-auto">System colors may override this</button>

<div class="co-forced-color-adjust-none" aria-label="Critical two-color status legend">
  Essential authored colors
</div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
          <div className="forced-color-auto" style={{ minHeight: 145, padding: 22, display: "grid", placeItems: "center", border: "1px solid ButtonText", background: "Canvas", color: "CanvasText", forcedColorAdjust: "auto", textAlign: "center" }}><div><strong style={{ fontSize: 11 }}>AUTO</strong><p style={{ margin: "8px 0 0", fontSize: 9 }}>Recommended default</p></div></div>
          <div className="forced-color-none" style={{ minHeight: 145, padding: 22, display: "grid", placeItems: "center", border: "5px solid #111", background: "linear-gradient(135deg,#111 0 50%,#fff 50%)", forcedColorAdjust: "none", textAlign: "center" }}><span style={{ padding: "7px 10px", background: "#fff", color: "#111", fontSize: 9, fontWeight: 700 }}>NONE · ESSENTIAL ONLY</span></div>
        </div>
      </Demo>

      <Demo
        id="color-scheme-example"
        label="SYSTEM PREFERENCE · COLOR SCHEME"
        title="Match native browser controls to the surface"
        description="Color-scheme declares which themes a region supports. Native inputs, scrollbars, and browser-provided UI can then use appropriate light or dark colors."
        code={`<form class="co-scheme-light">...</form>
<form class="co-scheme-dark co-bg-black co-text-white">...</form>
<main class="co-scheme-light-dark">...</main>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
          {[['light', '#fff', '#111', 'LIGHT SCHEME'], ['dark', '#111', '#fff', 'DARK SCHEME']].map(([scheme, background, color, label]) => <form key={scheme} style={{ minHeight: 170, padding: 22, display: "grid", alignContent: "center", gap: 10, border: "1px solid #777", background, color, colorScheme: scheme }}><label style={{ fontSize: 9, fontWeight: 700 }}>{label}</label><input aria-label={`${label} example input`} defaultValue="Native input" style={{ width: "100%", padding: "10px 12px", border: "1px solid", font: "inherit", fontSize: 10 }} /><select aria-label={`${label} example select`} defaultValue="auto" style={{ width: "100%", padding: "10px 12px", font: "inherit", fontSize: 10 }}><option value="auto">Automatic</option></select></form>)}
        </div>
      </Demo>

      <Demo
        id="semantic-example"
        label="FOUNDATION · SEMANTIC HTML"
        title="Use utilities to support semantics, not replace them"
        description="Native elements provide roles, names, states, and keyboard behavior. Add Coordiation utilities for presentation while keeping the semantic element intact."
        code={`<nav aria-label="Documentation">
  <a href="/docs" aria-current="page">Docs</a>
</nav>

<button type="button" aria-expanded="false" aria-controls="menu">
  Open menu
</button>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          <button className="accessibility-focus-demo" type="button" style={{ minHeight: 100, border: "1px solid #111", background: "#111", color: "#fff", cursor: "pointer", font: "inherit", fontSize: 10, fontWeight: 700 }}>NATIVE BUTTON</button>
          <a className="accessibility-focus-demo" href="#overview" style={{ minHeight: 100, display: "grid", placeItems: "center", border: "1px solid #111", background: "#fff", color: "#111", fontSize: 10, fontWeight: 700, textDecoration: "none" }}>REAL LINK</a>
          <label style={{ minHeight: 100, padding: 16, display: "grid", placeItems: "center", alignContent: "center", gap: 9, border: "1px solid #111", background: "#fff", fontSize: 9, fontWeight: 700 }}>LABELED INPUT<input aria-label="Email address example" placeholder="Email address" style={{ width: "100%", padding: 9, border: "1px solid #777", font: "inherit" }} /></label>
        </div>
      </Demo>
    </>
  );
}
