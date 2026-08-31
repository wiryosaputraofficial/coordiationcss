import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import MobileNav from "../../_components/MobileNav";
import SolarIcon from "../../_components/SolarIcon";
import registry from "../../docs/generated/theme-registry.json";
import ThemeCommand from "../ThemeCommand";

export const metadata: Metadata = createSeoMetadata({
  path: "/themes/mono-portfolio",
  title: "Mono Portfolio theme — Coordiation CSS",
  description: "Preview and install the Mono Portfolio open-code creative designer theme.",
  openGraph: { title: "Mono Portfolio — Coordiation Themes", description: "A high-contrast creative portfolio built with Coordiation components and CSS utilities.", images: ["/themes/mono-portfolio/hero.jpg"] },
  twitter: { card: "summary_large_image", title: "Mono Portfolio — Coordiation Themes", description: "An expressive designer portfolio built with Coordiation.", images: ["/themes/mono-portfolio/hero.jpg"] },
});

export default function MonoPortfolioThemePage() {
  const theme = registry.themes.find((item) => item.name === "mono-portfolio")!;
  return <main className="theme-detail-page"><header className="site-header"><Link className="brand" href="/" aria-label="Coordiation CSS home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Themes</span></Link><nav aria-label="Main navigation"><Link href="/themes">All themes</Link><Link href="/blogs">Blogs</Link><Link href="/components">Components</Link><Link href="/icons">Icons</Link><Link href="/docs/themes">Docs</Link></nav><MobileNav /><Link className="header-cta" href={theme.preview}>Full preview <SolarIcon name="arrow-to-top-right" size={15} /></Link></header>
    <section className="theme-detail-hero mono-portfolio-detail"><div><p className="component-overline">THEME 005 · {theme.status.toUpperCase()}</p><h1>{theme.title}</h1><p>{theme.description} It turns high-contrast creative direction into an original, responsive, production-ready Coordiation application.</p><div className="theme-tags">{theme.categories.map((category)=><span key={category}>{category}</span>)}</div></div><div><ThemeCommand command={theme.command} /><small>The CLI installs the complete page, stylesheet, reusable Coordiation components, Solar icon wrapper, and eight self-hosted photographs.</small></div></section>
    <section className="theme-preview-frame"><div className="theme-browser-bar"><span><i/><i/><i/></span><code>/mono-portfolio</code><Link href={theme.preview}>Open full screen <SolarIcon name="arrow-to-top-right" size={14}/></Link></div><iframe src={theme.preview} title="Mono Portfolio live theme preview" loading="eager" /></section>
    <section className="theme-detail-spec"><div><p className="component-overline">STRUCTURE</p><h2>{theme.sections.length} complete sections</h2><p>Every region is declared in the registry, so people and AI agents can inspect, customize, and track the template without guessing.</p></div><ol>{theme.sections.map((section,index)=><li key={section}><span>{String(index+1).padStart(2,"0")}</span><b>{section}</b></li>)}</ol></section>
    <section className="theme-detail-files"><div><p className="component-overline">COORDIATION-NATIVE</p><h2>Creative character.<br />Inspectable source.</h2></div><div><h3>Installed files</h3>{theme.files.map(file=><code key={file.target}>{file.target}</code>)}<h3>Bundled primitives</h3>{theme.components.map(component=><code key={component}>{component}</code>)}</div><aside><SolarIcon name="code" size={26}/><p>The theme uses {theme.coordiationUtilityCount} verified <code>co-*</code> utilities, a bundled <code>ThemeIcon</code>, reusable Coordiation primitives, and the <code>{theme.namespace}</code> namespace.</p><a href={theme.installPath}>Inspect registry item <SolarIcon name="arrow-to-top-right" size={14} /></a></aside></section>
    <section className="theme-detail-cta"><p className="component-overline">READY TO CREATE</p><h2>Make the portfolio unmistakably yours.</h2><p>Replace the identity, projects, services, writing, and imagery while preserving semantic structure, responsive behavior, Coordiation icons, motion safeguards, and Coordiation copyright.</p><ThemeCommand command={theme.command} /></section>
  </main>;
}
