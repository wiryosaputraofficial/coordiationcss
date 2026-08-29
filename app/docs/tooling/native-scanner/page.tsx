import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/tooling/native-scanner", ...{ title: "Native scanner — Coordiation CSS", description: "Use optional cross-platform C11 candidate extraction with explicit JavaScript fallback." } });

export default function NativeScannerPage() {
  return <article className="docs-article vite-guide">
    <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Tooling</span><b>/</b><span>Native scanner</span></div>
    <p className="docs-overline">TOOLING · COMPLETE</p><h1>Cross-platform native scanner</h1>
    <p className="docs-lead">Batch literal candidate extraction through a dependency-free C11 engine while keeping source discovery, filters, safelists, diagnostics, and fallback behavior visible to the caller.</p>
    <div className="docs-note"><span>✓</span><p>The same source contract targets Linux, macOS, and Windows on x64 and arm64. The result always reports which engine actually ran.</p></div>

    <section className="guide-step" id="use"><div className="step-number">01</div><div><h2>Request native scanning</h2><CodeBlock title="scan.mjs" code={`import { scanSourcesNative } from "@coordiation/oxide";

const result = await scanSourcesNative(["src"], {
  include: ["src/**"],
  exclude: ["**/*.test.*"],
  safelist: ["co-grid"],
});

console.log(result.engine, result.native);`} /><p>The candidate and diagnostic shape matches <code>scanSources()</code>. A single native process receives all discovered source text instead of starting once per file.</p></div></section>
    <section className="guide-step" id="require"><div className="step-number">02</div><div><h2>Require native execution when measuring</h2><CodeBlock title="No fallback" code={`const result = await scanSourcesNative(["src"], {
  fallback: false,
});`} /><p>Missing binaries throw when <code>fallback: false</code>. In normal builds, the JavaScript scanner remains a compatible fallback and reports <code>binary-unavailable</code>.</p></div></section>
    <section className="guide-step" id="build"><div className="step-number">03</div><div><h2>Build or select a verified binary</h2><CodeBlock title="Native build" code={`npm run --workspace @coordiation/oxide build
coordiation-oxide --manifest

# Optional verified release artifact
COORDIATION_OXIDE_BINARY=/opt/coordiation/coordiation-oxide`} /><p>Installation attempts an optional local build when a C compiler exists. Release packages can provide platform/architecture artifacts under the documented prebuilt directory.</p></div></section>
    <section className="guide-step" id="observability"><div className="step-number">04</div><div><h2>Inspect instead of assuming</h2><CodeBlock title="Engine manifest" code={`{
  "engine": "native",
  "native": {
    "engine": "native-c11",
    "platform": "linux",
    "architecture": "x64",
    "available": true
  }
}`} /><p>The repository includes equivalence tests, a 200-file performance fixture, and a supported-platform build matrix.</p></div></section>
    <section className="family-caveats" id="boundaries"><div><p className="docs-overline">FALLBACK CONTRACT</p><h2>Native code stays optional</h2><p>Optimization must not hide a behavioral change.</p></div><ul><li>JavaScript extractor hooks select the JavaScript engine and report custom-extractors.</li><li>Dynamic-construction diagnostics remain in the wrapper so native and JavaScript results agree.</li><li>Safelist entries are validated with the configured prefix.</li><li>An installed package is not proof that a native binary ran.</li><li>Release artifacts still require platform signing and release-matrix verification.</li></ul></section>
    <div className="docs-next split"><Link prefetch={false} href="/docs/tooling/upgrade"><span>Previous</span><b>← Upgrade &amp; codemods</b></Link><Link prefetch={false} href="/docs/installation/using-vite"><span>Next</span><b>Using Vite →</b></Link></div>
  </article>;
}
