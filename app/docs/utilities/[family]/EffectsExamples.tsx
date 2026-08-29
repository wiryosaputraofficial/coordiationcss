import type { CSSProperties, ReactNode } from "react";
import CodeBlock from "../../_components/CodeBlock";

const preview: CSSProperties = {
  marginTop: 24,
  padding: 24,
  border: "1px solid #d8d8d4",
  background: "#f7f7f4",
  color: "#111",
};

const card: CSSProperties = {
  minHeight: 110,
  padding: 18,
  display: "grid",
  placeItems: "center",
  border: "1px solid #e0e0dc",
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

export function EffectsMiniNavigation() {
  const items = [
    ["Overview", "#overview"],
    ["Quick reference", "#quick-reference"],
    ["Shadows", "#shadow-example"],
    ["Opacity", "#opacity-example"],
    ["Blend modes", "#blend-example"],
    ["Filters", "#filter-example"],
    ["Backdrop filters", "#backdrop-example"],
    ["Masks", "#mask-example"],
    ["Core concepts", "#how-it-works"],
    ["Limitations", "#limitations"],
  ];

  return (
    <nav className="utility-mini-nav" aria-label="Effects page sections">
      <span>On this page</span>
      <ol>{items.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol>
    </nav>
  );
}

export default function EffectsExamples() {
  return (
    <>
      <Demo
        id="shadow-example"
        label="VISUAL EXAMPLE · SHADOWS"
        title="Create depth and surface hierarchy"
        description="Use box shadows for elevation, inset shadows for pressed surfaces, and text shadows when type needs separation from a complex background."
        code={`<article class="co-shadow-lg">Elevated card</article>
<button class="co-inset-shadow-sm">Pressed control</button>
<h2 class="co-text-shadow-md co-text-white">Text over image</h2>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 22, padding: 10 }}>
          <div style={{ ...card, boxShadow: "0 10px 15px -3px rgb(0 0 0 / .14),0 4px 6px -4px rgb(0 0 0 / .1)" }}>co-shadow-lg</div>
          <div style={{ ...card, boxShadow: "inset 0 2px 4px rgb(0 0 0 / .18)", background: "#eee" }}>co-inset-shadow-sm</div>
          <div style={{ ...card, background: "#333", color: "#fff", fontSize: 18, textShadow: "0 2px 4px rgb(0 0 0 / .7)" }}>Text shadow</div>
        </div>
      </Demo>

      <Demo
        id="opacity-example"
        label="VISUAL EXAMPLE · OPACITY"
        title="Fade a complete element"
        description="Opacity affects the element and every descendant as one composited layer. Use slash color opacity instead when only a background, border, or text color should be translucent."
        code={`<div class="co-opacity-100">100%</div>
<div class="co-opacity-60">60%</div>
<div class="co-opacity-25">25%</div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14, backgroundImage: "linear-gradient(45deg,#ddd 25%,transparent 25%),linear-gradient(-45deg,#ddd 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ddd 75%),linear-gradient(-45deg,transparent 75%,#ddd 75%)", backgroundPosition: "0 0,0 10px,10px -10px,-10px 0", backgroundSize: "20px 20px" }}>
          {[1, .6, .25].map((value) => <div style={{ ...card, border: 0, background: "#111", color: "#fff", opacity: value }} key={value}>co-opacity-{value * 100}</div>)}
        </div>
      </Demo>

      <Demo
        id="blend-example"
        label="VISUAL EXAMPLE · BLEND MODES"
        title="Combine overlapping color layers"
        description="Mix-blend mode controls how an element blends with content behind it. Background-blend mode combines multiple backgrounds inside one element."
        code={`<div class="co-relative">
  <div class="co-bg-blue co-mix-blend-multiply"></div>
  <div class="co-bg-pink co-mix-blend-screen"></div>
</div>`}
      >
        <div style={{ minHeight: 210, display: "grid", placeItems: "center", overflow: "hidden", background: "#ecece8" }}>
          <div style={{ position: "relative", width: 230, height: 150 }}>
            <div style={{ width: 130, height: 130, position: "absolute", left: 20, top: 10, borderRadius: "50%", background: "#3b82f6", mixBlendMode: "multiply" }} />
            <div style={{ width: 130, height: 130, position: "absolute", right: 20, top: 10, borderRadius: "50%", background: "#ec4899", mixBlendMode: "multiply" }} />
          </div>
        </div>
      </Demo>

      <Demo
        id="filter-example"
        label="VISUAL EXAMPLE · FILTERS"
        title="Adjust rendered pixels compositionally"
        description="Filter utilities compose through independent variables, so blur, brightness, contrast, grayscale, hue rotation, and saturation can be combined in any class order."
        code={`<div class="co-grayscale">Grayscale</div>
<div class="co-blur-sm">Blurred</div>
<div class="co-brightness-125 co-saturate-150">Bright and saturated</div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          <div style={{ ...card, background: "linear-gradient(135deg,#3b82f6,#ec4899,#f59e0b)", filter: "grayscale(100%)", color: "#fff" }}>grayscale</div>
          <div style={{ ...card, background: "linear-gradient(135deg,#3b82f6,#ec4899,#f59e0b)", filter: "blur(3px)", color: "#fff" }}>blur-sm</div>
          <div style={{ ...card, background: "linear-gradient(135deg,#3b82f6,#ec4899,#f59e0b)", filter: "brightness(1.25) saturate(1.5)", color: "#fff" }}>brightness + saturate</div>
        </div>
      </Demo>

      <Demo
        id="backdrop-example"
        label="VISUAL EXAMPLE · BACKDROP FILTER"
        title="Filter the content behind a translucent surface"
        description="Backdrop filters affect pixels behind an element. Pair blur with a translucent background so the filtered layer remains visible."
        code={`<section class="co-bg-[image:linear-gradient(135deg,#111,#999)] co-p-8">
  <article class="co-bg-white/55 co-backdrop-blur-md co-border co-border-white/60">
    Glass surface
  </article>
</section>`}
      >
        <div style={{ minHeight: 230, padding: 32, display: "grid", placeItems: "center", background: "radial-gradient(circle at 20% 20%,#fff 0 7%,transparent 8%),linear-gradient(135deg,#111,#888 55%,#ddd)" }}>
          <article style={{ width: "min(100%, 430px)", padding: 26, border: "1px solid rgb(255 255 255 / .65)", borderRadius: 12, background: "rgb(255 255 255 / .48)", backdropFilter: "blur(12px)", color: "#111", boxShadow: "0 12px 30px rgb(0 0 0 / .15)" }}><strong style={{ fontSize: 19 }}>Glass surface</strong><p style={{ margin: "8px 0 0", fontSize: 11 }}>co-bg-white/55 co-backdrop-blur-md</p></article>
        </div>
      </Demo>

      <Demo
        id="mask-example"
        label="VISUAL EXAMPLE · MASKS"
        title="Reveal a surface through an alpha shape"
        description="Masks control visibility using image alpha or luminance. Gradient masks are useful for fades, while URL masks can reuse application-owned artwork."
        code={`<div class="co-mask-linear-to-r co-mask-from-black co-mask-to-transparent co-bg-brand-500"></div>
<div class="co-mask-[url(/logo-mask.svg)] co-mask-center co-mask-no-repeat co-mask-contain"></div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div style={{ minHeight: 180, background: "linear-gradient(135deg,#3b82f6,#ec4899)", maskImage: "linear-gradient(to right,#000,transparent)", WebkitMaskImage: "linear-gradient(to right,#000,transparent)" }} />
          <div style={{ minHeight: 180, background: "repeating-linear-gradient(45deg,#111 0 12px,#777 12px 24px)", maskImage: "radial-gradient(circle,#000 45%,transparent 47%)", WebkitMaskImage: "radial-gradient(circle,#000 45%,transparent 47%)" }} />
        </div>
      </Demo>
    </>
  );
}
