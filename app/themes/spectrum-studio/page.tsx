import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import MobileNav from "../../_components/MobileNav";
import SolarIcon from "../../_components/SolarIcon";
import registry from "../../docs/generated/theme-registry.json";
import ThemeCommand from "../ThemeCommand";

export const metadata: Metadata = createSeoMetadata({
  path: "/themes/spectrum-studio",
  title: "Spectrum Studio theme — Coordiation CSS",
  description: "Preview and install the Spectrum Studio open-code creative agency theme.",
  openGraph: {
    title: "Spectrum Studio — Coordiation Themes",
    description: "A high-energy creative studio application built with Coordiation components and CSS utilities.",
    images: ["/themes/spectrum-studio/hero-spectrum.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectrum Studio — Coordiation Themes",
    description: "A chromatic portfolio for independent creative studios.",
    images: ["/themes/spectrum-studio/hero-spectrum.jpg"],
  },
});

export default function SpectrumStudioThemePage() {
  const theme = registry.themes.find((item) => item.name === "spectrum-studio")!;

  return <main className="theme-detail-page">
    <header className="site-header"><Link className="brand" href="/" aria-label="Coordiation CSS home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Themes</span></Link><nav aria-label="Main navigation"><Link href="/themes">All themes</Link><Link href="/blogs">Blogs</Link><Link href="/components">Components</Link><Link href="/icons">Icons</Link><Link href="/docs/themes">Docs</Link></nav><MobileNav /><Link className="header-cta" href={theme.preview}>Full preview <SolarIcon name="arrow-to-top-right" size={15} /></Link></header>
    <section className="theme-detail-hero spectrum-studio-detail"><div><p className="component-overline">THEME 010 · {theme.status.toUpperCase()}</p><h1>{theme.title}</h1><p>{theme.description} The supplied Spectrum source has been adapted into an original, responsive Coordiation application while preserving its chromatic energy and interaction-led rhythm.</p><div className="theme-tags">{theme.categories.map((category)=><span key={category}>{category}</span>)}</div></div><div><ThemeCommand command={theme.command} /><small>The CLI installs the complete studio page, reusable theme components, Solar icon wrapper, responsive styles, and bundled project media.</small></div></section>
    <section className="theme-preview-frame"><div className="theme-browser-bar"><span><i/><i/><i/></span><code>/spectrum-studio</code><Link href={theme.preview}>Open full screen <SolarIcon name="arrow-to-top-right" size={14}/></Link></div><iframe src={theme.preview} title="Spectrum Studio live theme preview" loading="eager" /></section>
    <section className="theme-detail-spec"><div><p className="component-overline">CREATIVE SYSTEM</p><h2>{theme.sections.length} complete sections</h2><p>A complete studio front page spanning positioning, selected work, capabilities, proof, process, people, client perspective, conversion, and a disciplined footer.</p></div><ol>{theme.sections.map((section,index)=><li key={section}><span>{String(index+1).padStart(2,"0")}</span><b>{section}</b></li>)}</ol></section>
    <section className="theme-detail-files"><div><p className="component-overline">COORDIATION-NATIVE</p><h2>Chromatic energy.<br />Inspectable structure.</h2></div><div><h3>Installed files</h3>{theme.files.map(file=><code key={file.target}>{file.target}</code>)}<h3>Bundled primitives</h3>{theme.components.map(component=><code key={component}>{component}</code>)}</div><aside><SolarIcon name="code" size={26}/><p>The theme uses {theme.coordiationUtilityCount} verified <code>co-*</code> utilities, a bundled <code>ThemeIcon</code>, reusable Coordiation primitives, and the <code>{theme.namespace}</code> namespace.</p><a href={theme.installPath}>Inspect registry item <SolarIcon name="arrow-to-top-right" size={14} /></a></aside></section>
    <section className="theme-detail-cta"><p className="component-overline">READY TO PUBLISH</p><h2>Turn the signal into impact.</h2><p>Replace the studio identity, work, team, services, and contact details while keeping the responsive hierarchy, accessible interactions, motion safeguards, Coordiation icons, and Coordiation copyright.</p><ThemeCommand command={theme.command} /></section>
  </main>;
}
