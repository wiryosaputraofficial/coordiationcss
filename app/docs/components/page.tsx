import type { Metadata } from "next";
import Link from "next/link";
import registry from "../generated/component-registry.json";
import CodeBlock from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Component registry — Coordiation CSS",
  description: "Install and customize open-code React components powered by Coordiation CSS.",
};

export default function ComponentGuidePage() {
  return <article className="docs-article vite-guide">
    <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Components</span></div>
    <p className="docs-overline">OPEN-CODE UI · {registry.componentCount} STABLE COMPONENTS</p><h1>Component registry</h1>
    <p className="docs-lead">Add accessible React component source directly to your project. The installer is only a delivery mechanism: the resulting files use Coordiation classes, live in your repository, and remain fully editable.</p>
    <div className="docs-note"><span>i</span><p>This is an independent Coordiation registry and installer. It does not install Tailwind CSS or a third-party UI runtime.</p></div>
    <div className="family-support"><span>Want to compare every preview?</span><Link prefetch={false} href="/components">Browse the component catalog →</Link></div>

    <section className="guide-step" id="prerequisite"><div className="step-number">01</div><div><h2>Install Coordiation CSS first</h2><CodeBlock title="Terminal" code={`npm install @coordiation/css @coordiation/vite`} /><p>Components contain literal <code>co-*</code> classes. Your existing scanner detects them after the source file is added.</p></div></section>
    <section className="guide-step" id="install"><div className="step-number">02</div><div><h2>Add a component with Coordiation CLI</h2><CodeBlock title="Terminal" code="npx @coordiation/cli@latest add component button" /><p>The official installer resolves the Coordiation registry, verifies safe target paths, refuses accidental overwrites, and writes the full source into <code>components/ui</code>.</p></div></section>
    <section className="guide-step" id="use"><div className="step-number">03</div><div><h2>Import the owned source</h2><CodeBlock title="app.tsx" code={`import { Button } from "@/components/ui/button";

export function SaveAction() {
  return <Button variant="outline">Save changes</Button>;
}`} /><p>Review and edit the installed file like application code. There is no Coordiation UI runtime to initialize in the browser.</p></div></section>
    <section className="guide-step" id="registry"><div className="step-number">04</div><div><h2>Automate with exact registry data</h2><CodeBlock title="Discovery endpoints" code={`GET /r/registry.json
GET /r/button.json
GET /component-registry.json
GET /api/components`} /><p>The compatible catalog and individual item endpoints drive installation. The extended manifest adds stability, client boundaries, usage examples, and accessibility requirements for AI agents.</p></div></section>
    <section className="family-caveats" id="ownership"><div><p className="docs-overline">SOURCE OWNERSHIP</p><h2>Copy, inspect, customize</h2><p>The registry gives you code rather than a sealed component dependency.</p></div><ul><li>Keep literal co-* classes discoverable by the compiler.</li><li>Preserve native semantics and the documented accessibility contract.</li><li>Review registry source before installing updates.</li><li>Client components declare their boundary explicitly.</li><li>Use the component registry instead of guessing component names.</li></ul></section>
    <div className="docs-next split"><Link prefetch={false} href="/components"><span>Interactive catalog</span><b>← Browse components</b></Link><Link prefetch={false} href="/docs/icons/solar-linear"><span>Related</span><b>Icon library →</b></Link></div>
  </article>;
}
