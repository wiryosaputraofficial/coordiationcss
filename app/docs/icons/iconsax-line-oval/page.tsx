import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Iconsax Line Oval icons — Coordiation CSS",
  description: "Use all 919 Iconsax Line Oval icons with literal imports, accessible rendering, local assets, and registry-backed discovery.",
};

const samples = [
  ["airdrop", "Airdrop"], ["home", "Home"], ["message", "Message"], ["notification", "Notification"],
  ["calendar", "Calendar"], ["search-normal", "Search"], ["setting2", "Settings"], ["user", "User"],
  ["code-circle", "Code"], ["document-text", "Document"], ["folder", "Folder"], ["security-safe", "Security"],
] as const;

export default function IconsaxLineOvalPage() {
  return <article className="docs-article vite-guide">
    <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Icons</span><b>/</b><span>Iconsax Line Oval</span></div>
    <p className="docs-overline">ICON SYSTEM · COMPLETE</p><h1>Iconsax Line Oval</h1>
    <p className="docs-lead">Use all 919 Line Oval icons as framework-neutral SVG strings. Every icon has a stable collection ID, local preview asset, literal package subpath, and machine-readable registry record.</p>
    <div className="docs-note"><span>i</span><p>Iconsax remains a separate collection, so a name that also exists in Solar never overwrites the existing Solar import.</p></div>
    <div className="family-support"><span>Need the complete visual catalog?</span><Link prefetch={false} href="/icons">Browse and filter all 2,165 icons →</Link></div>

    <div className="solar-icon-samples" aria-label="Iconsax Line Oval icon examples">
      {samples.map(([name, label]) => <div key={name}><span aria-hidden="true" style={{ "--solar-sample": `url(/icons/iconsax-line-oval/${name}.svg)` } as CSSProperties} /><strong>{label}</strong><code>{name}</code></div>)}
    </div>

    <section className="guide-step" id="install"><div className="step-number">01</div><div><h2>Install one icon package</h2><CodeBlock title="Terminal" code={`npm install @coordiation/icons`} /><p>Solar Linear and Iconsax Line Oval ship through the same package, while their subpaths remain independent and tree-shakeable.</p></div></section>
    <section className="guide-step" id="import"><div className="step-number">02</div><div><h2>Import an exact Iconsax icon</h2><CodeBlock title="connection.js" code={`import { AirdropLinearIcon } from "@coordiation/icons/iconsax-line-oval/airdrop";
import { renderIcon } from "@coordiation/icons";

const decorative = renderIcon(AirdropLinearIcon, { size: 24 });
const meaningful = renderIcon(AirdropLinearIcon, {
  size: "1.5rem",
  label: "Airdrop connection",
});`} /><p>Imports are literal and runtime-free. Decorative output receives <code>aria-hidden=&quot;true&quot;</code>; meaningful icons receive the label you provide.</p></div></section>
    <section className="guide-step" id="style"><div className="step-number">03</div><div><h2>Use the shared icon contract</h2><CodeBlock title="app.css" code={`@import "@coordiation/icons/style.css";

.toolbar {
  --co-icon-size: 1.5rem;
  --co-icon-color: currentColor;
}`} /><p>The same <code>co-icon</code> class, size, color, label, class name, and stroke-width controls work across both collections.</p></div></section>
    <section className="guide-step" id="registry"><div className="step-number">04</div><div><h2>Let AI choose without guessing</h2><CodeBlock title="Registry record" code={`{
  "collectionId": "iconsax-line-oval",
  "name": "airdrop",
  "export": "AirdropLinearIcon",
  "asset": "/icons/iconsax-line-oval/airdrop.svg",
  "import": "@coordiation/icons/iconsax-line-oval/airdrop"
}`} /><p><a href="/icon-registry.json">The combined registry</a> carries collection identity and a literal import for every icon. AI agents should match the requested concept, select one exact record, and emit its <code>import</code> value unchanged.</p></div></section>
    <section className="family-caveats" id="provenance"><div><p className="docs-overline">PINNED PROVENANCE</p><h2>Keep the source auditable</h2><p>The generated collection is reproducible from a fixed source.</p></div><ul><li>Coordiation integrates exactly 919 Linear components from <code>react-iconsax-icons@1.0.1</code>.</li><li>The integrated source package declares the MIT license.</li><li>The generated wrappers contain static SVG strings and add no React runtime dependency.</li><li>Keep <code>LICENSE-THIRD-PARTY</code> when redistributing the package.</li><li>Review current upstream Iconsax terms before redistributing the artwork as a standalone icon pack.</li></ul></section>
    <div className="docs-next split"><Link prefetch={false} href="/docs/icons/solar-linear"><span>Previous collection</span><b>← Solar Linear</b></Link><Link prefetch={false} href="/icons"><span>Interactive catalog</span><b>Browse every icon →</b></Link></div>
  </article>;
}
