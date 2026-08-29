import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import MobileNav from "../_components/MobileNav";
import SolarIcon from "../_components/SolarIcon";
import registry from "../docs/generated/component-registry.json";
import ComponentGallery from "./ComponentGallery";

export const metadata: Metadata = {
  title: "Open-code components — Coordiation CSS",
  description: "Browse and install accessible, customizable React components built entirely with Coordiation CSS utilities.",
};

export default function ComponentsPage() {
  return (
    <main className="components-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Coordiation CSS home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">UI</span></Link>
        <nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/themes">Themes</Link><Link href="/icons">Icons</Link><Link href="/docs/components">Component guide</Link><Link href="/release-check">Release Check</Link></nav>
        <MobileNav />
        <a className="header-cta" href="#component-catalog">Browse components <SolarIcon name="arrow-down" size={15} /></a>
      </header>

      <section className="components-hero">
        <div className="components-hero-copy"><p className="component-overline">OPEN CODE · CO-UTILITIES · AI-READABLE</p><h1>Components you<br /><em>actually own.</em></h1><p>Install accessible React source directly into your project. Every component is monochrome by default, composed from Coordiation utilities, and yours to change.</p><div><a href="#component-catalog">Browse {registry.componentCount} components <SolarIcon name="arrow-right" size={15} /></a><Link href="/docs/components">Read the architecture</Link></div></div>
        <div className="components-hero-demo" aria-label="Component installation example"><div className="component-terminal-top"><span>coordiation install</span><i>ready</i></div><pre><code><span>$</span> npx @coordiation/cli@latest add{`\n`}  component button</code></pre><div className="component-terminal-result"><b><SolarIcon name="check-circle" size={17} /></b><span>components/ui/button.tsx</span><em>owned source</em></div></div>
      </section>

      <section className="component-principles" aria-label="Component principles"><div><strong>{registry.componentCount}</strong><span>Stable components</span></div><div><strong>0</strong><span>UI runtime dependencies</span></div><div><strong>100%</strong><span>Coordiation utilities</span></div><div><strong>JSON</strong><span>Registry contract</span></div></section>
      <ComponentGallery registry={registry} />
    </main>
  );
}
