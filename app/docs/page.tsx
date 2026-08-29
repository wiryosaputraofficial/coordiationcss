import Link from "next/link";
import { capabilities } from "./capabilities";

export default function DocsOverview() {
  return (
    <article className="docs-article">
      <div className="docs-breadcrumb"><span>Docs</span><b>/</b><span>Getting started</span></div>
      <p className="docs-overline">GETTING STARTED</p>
      <h1>Installation</h1>
      <p className="docs-lead">Get Coordiation CSS running in your project. Choose the integration that matches your build tool.</p>
      <div className="docs-callout"><strong>Feature implementation complete</strong><p>All {capabilities.length} tracked capability areas are implemented and documented. The project remains prerelease until the stable release process, signed native artifacts, and supported-platform checks pass.</p><Link href="/release-check">Open Release Check →</Link></div>
      <h2 id="choose-integration">Choose your integration</h2>
      <div className="integration-grid">
        <Link href="/docs/installation/using-vite"><span>Recommended</span><strong>Using Vite</strong><p>Fast development, automatic template scanning, and stylesheet updates through the official Vite adapter.</p><code>@coordiation/vite</code><b>→</b></Link>
        <Link href="/docs/installation/using-postcss"><span>Flexible</span><strong>Using PostCSS</strong><p>Add Coordiation CSS to an existing PostCSS pipeline.</p><code>@coordiation/postcss</code><b>→</b></Link>
        <Link href="/docs/installation/using-cli"><span>Framework agnostic</span><strong>Using the CLI</strong><p>Compile once or run a durable cross-platform watch process without a bundler plugin.</p><code>coordiation-css</code><b>→</b></Link>
        <Link href="/docs/components"><span>Open code</span><strong>Component registry</strong><p>Install accessible React source that is built entirely with Coordiation utilities.</p><code>/r/registry.json</code><b>→</b></Link>
      </div>
      <h2 id="requirements">Requirements</h2>
      <ul className="docs-list"><li>Node.js 20 or newer</li><li>Static, complete class names in source files</li><li>Vite 5 or newer when using the Vite adapter</li></ul>
      <div className="docs-next"><span>Next</span><Link href="/docs/installation/using-vite"><b>Install with Vite</b><i>→</i></Link></div>
    </article>
  );
}
