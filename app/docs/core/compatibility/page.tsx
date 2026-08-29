import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = { title: "Compatibility and deprecations — Coordiation CSS", description: "Understand Coordiation semantic versioning, deprecation windows, compiler diagnostics, and migration ownership." };

export default function CompatibilityPage() {
  return <article className="docs-article vite-guide">
    <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Core concepts</span><b>/</b><span>Compatibility</span></div>
    <p className="docs-overline">RELEASE POLICY · COMPLETE</p><h1>Compatibility and deprecations</h1>
    <p className="docs-lead">Know which public surfaces are stable, how long deprecated behavior remains available, which replacement is canonical, and which upgrade transform owns the change.</p>
    <div className="docs-note"><span>✓</span><p>The policy is implemented as data. Compiler results, upgrade tooling, documentation, and AI agents read the same stable deprecation IDs.</p></div>

    <section className="family-concepts" id="versions"><div><p className="docs-overline">SEMANTIC VERSIONS</p><h2>Promises grow with stability</h2><p>The feature milestone and the stable release label remain separate decisions.</p></div><ol><li><span>0.x</span><p><strong>Prerelease:</strong> incompatible changes still require documented deprecation when a compatibility path exists.</p></li><li><span>1.x</span><p><strong>Stable:</strong> documented APIs, class syntax, directives, CLI flags, schemas, and official adapter configuration remain compatible within the major.</p></li><li><span>+</span><p><strong>Additive:</strong> utilities, variants, optional tools, and manifest fields may ship in minor releases.</p></li><li><span>!</span><p><strong>Removal:</strong> deprecated stable behavior is removed only in an eligible major after its promised window.</p></li></ol></section>
    <section className="guide-step" id="manifest"><div className="step-number">01</div><div><h2>Read the machine contract</h2><CodeBlock title="compatibility.mjs" code={`import {
  createCompatibilityManifest,
  deprecationRegistry,
} from "@coordiation/css";

console.log(createCompatibilityManifest({ prefix: "co-" }));`} /><p>The manifest includes framework version, stable-policy start, runtime support, guarantees, prefix-aware replacement syntax, and every registered deprecation.</p></div></section>
    <section className="guide-step" id="compiler"><div className="step-number">02</div><div><h2>Inspect compiler diagnostics</h2><CodeBlock title="Compile result" code={`const result = compileCandidates(["co-flex", "hover:co--mt-4"]);

result.deprecations
// [{
//   code: "deprecated-candidate",
//   replacement: "hover:-co-mt-4"
// }]`} /><p>Deprecated syntax remains accepted during its declared window. Diagnostics are returned as data and never written unexpectedly to application stdout.</p></div></section>
    <section className="guide-step" id="lifecycle"><div className="step-number">03</div><div><h2>Follow the full lifecycle</h2><ol className="docs-list"><li>Register a stable deprecation ID, introduction, earliest removal, replacement, and migration owner.</li><li>Keep old behavior working and return a machine-readable warning.</li><li>Ship a safe codemod when migration is mechanical.</li><li>Document the release and migration guidance.</li><li>Remove only in an eligible major release.</li></ol></div></section>
    <section className="family-caveats" id="release-gate"><div><p className="docs-overline">RELEASE GATE</p><h2>44/44 is necessary, not sufficient</h2><p>Feature implementation is complete, while the stable release still has operational gates.</p></div><ul><li>Every public API, test, integration fixture, manifest, and guide must agree.</li><li>Supported-platform native builds and performance checks must pass for the release commit.</li><li>Native artifacts must be signed and attached through the release process.</li><li>Every breaking change needs migration guidance.</li><li>No prerelease version may be described as stable solely because the checklist reached 100%.</li></ul></section>
    <div className="docs-next split"><Link prefetch={false} href="/docs/core/plugin-api"><span>Previous</span><b>← Plugin API</b></Link><Link prefetch={false} href="/release-check"><span>Next</span><b>Release Check →</b></Link></div>
  </article>;
}
