import type { Metadata } from "next";
import Link from "next/link";
import SolarIcon from "../_components/SolarIcon";
import registry from "../docs/generated/theme-registry.json";
import ThemeCommand from "./ThemeCommand";

export const metadata: Metadata = {
  title: "Application themes — Coordiation CSS",
  description: "Preview and install complete open-code application templates built for Coordiation CSS.",
};

export default function ThemesPage() {
  const theme = registry.themes[0];
  return <main className="themes-page">
    <header className="site-header"><Link className="brand" href="/" aria-label="Coordiation CSS home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Themes</span></Link><nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/components">Components</Link><Link href="/icons">Icons</Link><Link href="/docs/themes">Theme guide</Link><Link href="/release-check">Release Check</Link></nav><a className="header-cta" href="#theme-catalog">Browse themes <SolarIcon name="arrow-down" size={15} /></a></header>
    <section className="themes-hero"><div><p className="component-overline">FULL APPLICATIONS · OPEN CODE · AI-READABLE</p><h1>Start with a<br /><em>complete story.</em></h1><p>Install complete, responsive application templates—not opaque presets. Each theme includes editable source, documented sections, original media, design tokens, and a machine-readable contract.</p><div className="themes-hero-actions"><a href="#theme-catalog">Explore the first theme <SolarIcon name="arrow-right" size={16} /></a><Link href="/docs/themes">How installation works</Link></div></div><div className="themes-hero-index"><span>CURATED LIBRARY</span><strong>{String(registry.themeCount).padStart(2,"0")}</strong><p>Original application template ready to preview and install.</p><div><b>Next.js</b><b>Responsive</b><b>Owned source</b></div></div></section>
    <section className="theme-catalog" id="theme-catalog"><div className="theme-catalog-heading"><div><p className="component-overline">THEME 001</p><h2>{theme.title}</h2></div><p>{theme.description}</p></div><article className="theme-showcase-card"><Link className="theme-cover" href={`/themes/${theme.name}`}><img src={theme.cover} alt="Editorial Advisor template portrait preview" /><span>{theme.palette}</span><strong>MA</strong></Link><div className="theme-showcase-copy"><div className="theme-meta"><span>{theme.framework}</span><span>{theme.sections.length} sections</span><span>{theme.status}</span></div><h3>Editorial confidence.<br />Human warmth.</h3><p>A complete consultant portfolio with an editorial hero, events, insights, client story, biography, capabilities, statistics, and a focused contact close.</p><div className="theme-tags">{theme.categories.map((category)=><span key={category}>{category}</span>)}</div><ThemeCommand command={theme.command} /><div className="theme-card-actions"><Link href={`/themes/${theme.name}`}>View details <SolarIcon name="arrow-right" size={15} /></Link><Link href={theme.preview}>Open live preview <SolarIcon name="arrow-to-top-right" size={15} /></Link></div></div></article></section>
    <section className="theme-ai-strip"><div><p className="component-overline">FOR PEOPLE + AGENTS</p><h2>Every choice stays inspectable.</h2></div><p>Query <code>/theme-registry.json</code> to discover exact theme names, files, sections, assets, installation endpoints, and customization rules without guessing.</p><a href="/theme-registry.json">Open JSON registry <SolarIcon name="arrow-to-top-right" size={16} /></a></section>
  </main>;
}
