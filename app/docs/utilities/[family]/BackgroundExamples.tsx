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

export function BackgroundMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Colors & opacity", "#background-color-example"],
    ["Image positioning", "#background-image-example"],
    ["Linear gradients", "#linear-gradient-example"],
    ["Radial & conic", "#radial-conic-example"],
    ["Repeat & size", "#background-repeat-example"],
    ["Core concepts", "#how-it-works"],
    ["Variants", "#variants"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Background page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function BackgroundExamples() {
  return (
    <>
      <Demo
        id="background-color-example"
        label="VISUAL EXAMPLE · COLOR AND OPACITY"
        title="Apply theme colors with optional opacity"
        description="Named colors reference CSS-first theme tokens. Add slash opacity when the same semantic color needs a translucent treatment."
        code={`<div class="co-grid co-grid-cols-3 co-gap-3">
  <div class="co-bg-brand-500 co-text-white">brand-500</div>
  <div class="co-bg-black/70 co-text-white">black/70</div>
  <div class="co-bg-transparent co-border">transparent</div>
</div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          <div style={{ minHeight: 105, padding: 16, display: "grid", placeItems: "center", background: "oklch(62.3% 0.214 259.815)", color: "#fff", fontSize: 11 }}>co-bg-brand-500</div>
          <div style={{ minHeight: 105, padding: 16, display: "grid", placeItems: "center", background: "rgb(0 0 0 / .7)", color: "#fff", fontSize: 11 }}>co-bg-black/70</div>
          <div style={{ minHeight: 105, padding: 16, display: "grid", placeItems: "center", border: "1px dashed #777", background: "transparent", fontSize: 11 }}>co-bg-transparent</div>
        </div>
      </Demo>

      <Demo
        id="background-image-example"
        label="VISUAL EXAMPLE · IMAGE POSITIONING"
        title="Control how an image fills its surface"
        description="Combine an image source with position, size, and repeat utilities. Cover is useful for hero surfaces, while explicit positioning protects the visual focal point."
        code={`<section class="co-bg-[url(/hero.jpg)] co-bg-cover co-bg-position-[70%_center] co-bg-no-repeat">
  <div class="co-bg-black/45 co-p-8 co-text-white">Hero content</div>
</section>`}
      >
        <div style={{ minHeight: 210, display: "grid", alignItems: "end", overflow: "hidden", backgroundImage: "radial-gradient(circle at 72% 32%,#fff 0 8%,transparent 9%),linear-gradient(135deg,#111 0 42%,#555 42% 68%,#ddd 68%)", backgroundPosition: "70% center", backgroundSize: "cover" }}>
          <div style={{ padding: 24, background: "rgb(0 0 0 / .55)", color: "#fff" }}><strong style={{ display: "block", fontSize: 22 }}>Focused hero</strong><span style={{ display: "block", marginTop: 7, fontSize: 11, color: "#ddd" }}>cover · 70% center · no-repeat</span></div>
        </div>
      </Demo>

      <Demo
        id="linear-gradient-example"
        label="VISUAL EXAMPLE · LINEAR GRADIENT"
        title="Compose gradient stops and interpolation"
        description="Choose a direction, then define from, via, and to colors separately. An interpolation modifier controls how colors travel between stops."
        code={`<div class="co-bg-linear-to-r/oklch co-from-brand-500 co-via-pink co-to-black">
  OKLCH gradient
</div>

<div class="co-bg-linear-45/display-p3 co-from-red co-to-blue">
  Display-P3 interpolation
</div>`}
      >
        <div style={{ display: "grid", gap: 14 }}>
          <div style={{ minHeight: 100, padding: 20, display: "grid", placeItems: "center", background: "linear-gradient(to right in oklch,oklch(62.3% .214 259.815),#ec4899,#000)", color: "#fff", fontSize: 12 }}>to-r / oklch</div>
          <div style={{ minHeight: 100, padding: 20, display: "grid", placeItems: "center", background: "linear-gradient(45deg in display-p3,color(display-p3 1 .1 .1),color(display-p3 .1 .25 1))", color: "#fff", fontSize: 12 }}>45deg / display-p3</div>
        </div>
      </Demo>

      <Demo
        id="radial-conic-example"
        label="VISUAL EXAMPLE · RADIAL AND CONIC"
        title="Choose a gradient shape for the composition"
        description="Radial gradients emphasize a focal point. Conic gradients rotate colors around a center and work well for progress, charts, and decorative color wheels."
        code={`<div class="co-bg-radial-[at_35%_30%] co-from-white co-via-brand-300 co-to-brand-800"></div>
<div class="co-bg-conic/decreasing co-from-brand-500 co-via-pink co-to-brand-500"></div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ minHeight: 180, border: "1px solid #ccc", background: "radial-gradient(circle at 35% 30%,#fff,oklch(80.9% .105 251.813),oklch(42.4% .199 265.638))" }} />
          <div style={{ minHeight: 180, border: "1px solid #ccc", background: "conic-gradient(from 0deg in oklch decreasing hue,oklch(62.3% .214 259.815),#ec4899,oklch(62.3% .214 259.815))" }} />
        </div>
      </Demo>

      <Demo
        id="background-repeat-example"
        label="VISUAL EXAMPLE · REPEAT AND SIZE"
        title="Build controlled repeating patterns"
        description="Background size controls the pattern tile. Repeat utilities choose whether that tile repeats on both axes, one axis, or not at all."
        code={`<div class="co-bg-[image:linear-gradient(90deg,#111_1px,transparent_1px)] co-bg-size-[24px_24px] co-bg-repeat"></div>
<div class="co-bg-[url(/stripe.svg)] co-bg-repeat-x co-bg-size-auto"></div>`}
      >
        <div style={{ minHeight: 190, border: "1px solid #bbb", backgroundColor: "#fff", backgroundImage: "linear-gradient(#ddd 1px,transparent 1px),linear-gradient(90deg,#ddd 1px,transparent 1px)", backgroundSize: "24px 24px", backgroundRepeat: "repeat" }}>
          <span style={{ margin: 18, padding: "8px 10px", display: "inline-block", background: "#111", color: "#fff", fontSize: 10 }}>24px repeat grid</span>
        </div>
      </Demo>
    </>
  );
}
