import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import MobileNav from "../../_components/MobileNav";
import SolarIcon from "../../_components/SolarIcon";
import registry from "../../docs/generated/theme-registry.json";
import ThemeCommand from "../ThemeCommand";

export const metadata: Metadata = createSeoMetadata({ path: "/themes/finance-dashboard", ...{
  title: "Finance Dashboard theme — Coordiation CSS",
  description: "Preview and install the Finance Dashboard open-code application theme.",
  openGraph: { title: "Finance Dashboard — Coordiation Themes", description: "A finance operations workspace built entirely with Coordiation components and CSS utilities.", images: [] },
  twitter: { card: "summary", title: "Finance Dashboard — Coordiation Themes", description: "A finance operations workspace built entirely with Coordiation components and CSS utilities.", images: [] },
} });

export default function FinanceDashboardThemePage() {
  const theme = registry.themes.find((item) => item.name === "finance-dashboard")!;
  return <main className="theme-detail-page"><header className="site-header"><Link className="brand" href="/" aria-label="Coordiation CSS home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Themes</span></Link><nav aria-label="Main navigation"><Link href="/themes">All themes</Link><Link href="/components">Components</Link><Link href="/icons">Icons</Link><Link href="/docs/themes">Docs</Link></nav><MobileNav /><Link className="header-cta" href={theme.preview}>Full preview <SolarIcon name="arrow-to-top-right" size={15} /></Link></header>
    <section className="theme-detail-hero finance-dashboard-detail"><div><p className="component-overline">THEME 003 · {theme.status.toUpperCase()}</p><h1>{theme.title}</h1><p>{theme.description} The complete interface is composed from bundled Coordiation primitives, literal utility classes, registry icons, and CSS-native charts.</p><div className="theme-tags">{theme.categories.map((category)=><span key={category}>{category}</span>)}</div></div><div><ThemeCommand command={theme.command} /><small>The Coordiation CLI installs the page, stylesheet, ten dashboard primitives, icon component, and every required Solar SVG. No external media is required.</small></div></section>
    <section className="theme-preview-frame"><div className="theme-browser-bar"><span><i/><i/><i/></span><code>/finance-dashboard</code><Link href={theme.preview}>Open full screen <SolarIcon name="arrow-to-top-right" size={14}/></Link></div><iframe src={theme.preview} title="Finance Dashboard live theme preview" loading="eager" /></section>
    <section className="theme-detail-spec"><div><p className="component-overline">STRUCTURE</p><h2>{theme.sections.length} operational sections</h2><p>Every region is named in the registry so teams and AI agents can change metrics, tables, navigation, and controls without reverse-engineering the screen.</p></div><ol>{theme.sections.map((section,index)=><li key={section}><span>{String(index+1).padStart(2,"0")}</span><b>{section}</b></li>)}</ol></section>
    <section className="theme-detail-files"><div><p className="component-overline">COORDIATION-NATIVE</p><h2>Components first.<br />CSS all the way.</h2></div><div><h3>Installed files</h3>{theme.files.map(file=><code key={file.target}>{file.target}</code>)}<h3>Bundled primitives</h3>{theme.components.map(component=><code key={component}>{component}</code>)}</div><aside><SolarIcon name="code" size={26}/><p>The dashboard uses {theme.coordiationUtilityCount} verified <code>co-*</code> utilities, a bundled <code>ThemeIcon</code>, ten Coordiation UI primitives, CSS-only charts, and the <code>{theme.namespace}</code> namespace.</p><a href={theme.installPath}>Inspect registry item <SolarIcon name="arrow-to-top-right" size={14} /></a></aside></section>
    <section className="theme-detail-cta"><p className="component-overline">READY FOR OPERATIONS</p><h2>Make the numbers useful.</h2><p>Connect your own data, rename the workspace, and adjust the dashboard tokens while preserving semantic controls, accessible tables, Coordiation icons, and Coordiation copyright.</p><ThemeCommand command={theme.command} /></section>
  </main>;
}
