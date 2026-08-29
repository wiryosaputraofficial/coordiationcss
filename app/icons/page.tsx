import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import MobileNav from "../_components/MobileNav";
import SolarIcon from "../_components/SolarIcon";
import IconBrowser from "./IconBrowser";

export const metadata: Metadata = {
  title: "Icon browser — Coordiation CSS",
  description: "Search, preview, and copy literal usage for all 2,165 Solar Linear and Iconsax Line Oval icons included with Coordiation.",
};

export default function IconsPage() {
  return (
    <main className="icons-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Coordiation CSS home">
          <img src="/coordiation-logo.png" alt="" />
          <span>Coordiation</span>
          <span className="brand-product">CSS</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/themes">Themes</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/docs/icons/iconsax-line-oval">Icon guide</Link>
          <Link href="/release-check">Release Check</Link>
        </nav>
        <MobileNav />
        <a className="header-cta" href="#icon-catalog">Browse icons <SolarIcon name="arrow-down" size={15} /></a>
      </header>

      <section className="icons-hero">
        <div className="icons-hero-grid" aria-hidden="true" />
        <div>
          <p className="icons-kicker">TWO COLLECTIONS · LOCAL ASSETS</p>
          <h1>Every icon.<br /><em>One literal import.</em></h1>
          <p>Search every Solar Linear and Iconsax Line Oval icon, click one, and copy a tree-shakeable Coordiation import without guessing its name.</p>
        </div>
        <dl className="icons-hero-stats">
          <div><dt>Icons</dt><dd>2,165</dd></div>
          <div><dt>Collections</dt><dd>2</dd></div>
          <div><dt>Runtime</dt><dd>Zero</dd></div>
          <div><dt>License</dt><dd>CC BY 4.0</dd></div>
        </dl>
      </section>

      <IconBrowser />
    </main>
  );
}
