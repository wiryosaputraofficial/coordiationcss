import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Solar Linear icons — Coordiation CSS",
  description: "Use 1,246 tree-shakeable Solar Linear icons with accessible rendering, CSS variables, registry-backed discovery, and correct attribution.",
};

const samples = [
  ["home", "Home"], ["heart", "Heart"], ["bell", "Bell"], ["calendar", "Calendar"],
  ["camera", "Camera"], ["chat-round", "Chat"], ["code", "Code"], ["document", "Document"],
  ["folder", "Folder"], ["magnifier", "Search"], ["settings", "Settings"], ["user", "User"],
] as const;

export default function SolarLinearIconsPage() {
  return <article className="docs-article vite-guide">
    <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Icons</span><b>/</b><span>Solar Linear</span></div>
    <p className="docs-overline">ICON SYSTEM · COMPLETE</p><h1>Solar Linear icons</h1>
    <p className="docs-lead">Use all 1,246 Solar Linear icons through literal, tree-shakeable imports that work in Coordiation templates, server rendering, static sites, and any JavaScript framework.</p>
    <div className="docs-note"><span>i</span><p>Solar icon artwork is created by 480 Design and licensed under CC BY 4.0. Commercial use is allowed, but attribution is required.</p></div>
    <div className="family-support"><span>Need the complete visual catalog?</span><Link prefetch={false} href="/icons">Browse all 1,246 icons →</Link></div>

    <div className="solar-icon-samples" aria-label="Solar Linear icon examples">
      {samples.map(([name, label]) => <div key={name}><span aria-hidden="true" style={{ "--solar-sample": `url(/icons/solar-linear/${name}.svg)` } as CSSProperties} /><strong>{label}</strong><code>{name}</code></div>)}
    </div>

    <section className="guide-step" id="install"><div className="step-number">01</div><div><h2>Install the icon package</h2><CodeBlock title="Terminal" code={`npm install @coordiation/icons`} /><p>The package pins its upstream Solar asset source, exposes only the Linear style, and keeps each icon behind an independent import path.</p></div></section>
    <section className="guide-step" id="import"><div className="step-number">02</div><div><h2>Import one literal icon</h2><CodeBlock title="navigation.js" code={`import { HomeLinearIcon } from "@coordiation/icons/linear/home";
import { renderIcon } from "@coordiation/icons";

const decorative = renderIcon(HomeLinearIcon, { size: 24 });
const meaningful = renderIcon(HomeLinearIcon, {
  size: "1.5rem",
  label: "Home",
});`} /><p>Decorative output receives <code>aria-hidden=&quot;true&quot;</code>. Pass a label only when nearby text does not already communicate the icon&apos;s meaning.</p></div></section>
    <section className="guide-step" id="style"><div className="step-number">03</div><div><h2>Control icons with CSS</h2><CodeBlock title="app.css" code={`@import "@coordiation/icons/style.css";

.navigation {
  --co-icon-size: 1.25rem;
  --co-icon-color: currentColor;
}`} /><p>Every rendered icon receives <code>co-icon</code>, uses <code>currentColor</code>, and can still override size, class, or stroke width per instance.</p></div></section>
    <section className="guide-step" id="registry"><div className="step-number">04</div><div><h2>Discover names without guessing</h2><CodeBlock title="Registry record" code={`{
  "name": "home",
  "export": "HomeLinearIcon",
  "style": "linear",
  "categories": ["home-furniture"],
  "import": "@coordiation/icons/linear/home"
}`} /><p><a href="/icon-registry.json">The icon registry</a> is the exact source for search interfaces and AI generation. Emit its literal import path so Node and bundlers load only the selected icon.</p></div></section>
    <section className="family-caveats" id="license"><div><p className="docs-overline">ATTRIBUTION REQUIRED</p><h2>Keep the credit with the product</h2><p>The wrapper and the artwork use different licenses.</p></div><ul><li>Coordiation wrapper code is MIT licensed.</li><li>Solar icon artwork remains CC BY 4.0.</li><li>Credit Solar Icons by 480 Design in a visible credits, about, legal, or documentation surface.</li><li>Keep LICENSE-THIRD-PARTY when redistributing the package.</li><li>Indicate material modifications to the artwork.</li></ul></section>
    <p className="icon-attribution">Icons shown on this page: Solar Icons by <a href="https://www.figma.com/community/file/1166831539721848736">480 Design</a>, licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</p>
    <div className="docs-next split"><Link prefetch={false} href="/icons"><span>Interactive catalog</span><b>← Browse all icons</b></Link><Link prefetch={false} href="/docs/tooling/language-server"><span>Next</span><b>IntelliSense &amp; LSP →</b></Link></div>
  </article>;
}
