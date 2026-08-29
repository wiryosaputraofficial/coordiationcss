import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import { createSeoMetadata } from "@/app/seo";
import { capabilities } from "./capabilities";

export const metadata: Metadata = createSeoMetadata({
  path: "/docs",
  title: "Coordiation CSS documentation",
  description:
    "Install Coordiation CSS and learn its utilities, variants, components, icons, themes, build adapters, and framework integrations.",
});

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
        <Link href="/docs/installation/using-npm"><span>Published packages</span><strong>Using npm</strong><p>Install the compiler, adapters, icons, themes, components, and tooling from the public npm registry.</p><code>@coordiation/*</code><b>→</b></Link>
        <Link href="/docs/installation/using-vite"><span>Recommended</span><strong>Using Vite</strong><p>Fast development, automatic template scanning, and stylesheet updates through the official Vite adapter.</p><code>@coordiation/vite</code><b>→</b></Link>
        <Link href="/docs/installation/using-postcss"><span>Flexible</span><strong>Using PostCSS</strong><p>Add Coordiation CSS to an existing PostCSS pipeline.</p><code>@coordiation/postcss</code><b>→</b></Link>
        <Link href="/docs/installation/using-cli"><span>Framework agnostic</span><strong>Using the CLI</strong><p>Compile once or run a durable cross-platform watch process without a bundler plugin.</p><code>coordiation-css</code><b>→</b></Link>
      </div>
      <h2 id="framework-guides">Framework guides</h2>
      <div className="integration-grid framework-integration-grid">
        <Link href="/docs/installation/using-nextjs"><span>PostCSS</span><strong>Next.js</strong><p>App Router and Pages Router setup through the official PostCSS adapter.</p><code>postcss.config.mjs</code><b>→</b></Link>
        <Link href="/docs/installation/using-astro"><span>Vite</span><strong>Astro</strong><p>Scan Astro components and import the generated virtual stylesheet.</p><code>astro.config.mjs</code><b>→</b></Link>
        <Link href="/docs/installation/using-laravel"><span>Blade + Vite</span><strong>Laravel</strong><p>Compile utilities found in Blade templates and frontend components.</p><code>resources/**</code><b>→</b></Link>
        <Link href="/docs/installation/using-svelte"><span>Vite</span><strong>SvelteKit</strong><p>Register Coordiation beside SvelteKit and load it from the root layout.</p><code>+layout.svelte</code><b>→</b></Link>
        <Link href="/docs/installation/using-html-css"><span>CLI</span><strong>HTML + CSS</strong><p>Generate a static, runtime-free stylesheet without a framework.</p><code>coordiation-css</code><b>→</b></Link>
        <Link href="/docs/installation/using-php"><span>CLI</span><strong>PHP</strong><p>Scan PHP templates and deploy ordinary compiled CSS.</p><code>*.php</code><b>→</b></Link>
        <Link href="/docs/installation/using-wordpress"><span>Theme workflow</span><strong>WordPress</strong><p>Compile inside a custom or child theme and enqueue the generated asset.</p><code>functions.php</code><b>→</b></Link>
      </div>
      <h2 id="requirements">Requirements</h2>
      <ul className="docs-list"><li>Node.js 20 or newer</li><li>Static, complete class names in source files</li><li>Vite 5 or newer when using the Vite adapter</li></ul>
      <div className="docs-next"><span>Next</span><Link href="/docs/installation/using-npm"><b>Install from npm</b><i>→</i></Link></div>
    </article>
  );
}
