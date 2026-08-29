import type { Metadata } from "next";
import Link from "next/link";
import SolarIcon from "../_components/SolarIcon";
import IconBrowser from "./IconBrowser";

export const metadata: Metadata = {
  title: "Solar Linear icon browser — Coordiation CSS",
  description: "Search, preview, and copy literal usage for all 1,246 Solar Linear icons included with Coordiation.",
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
          <Link href="/docs">Docs</Link>
          <Link href="/docs/icons/solar-linear">Icon guide</Link>
          <Link href="/release-check">Release Check</Link>
        </nav>
        <a className="header-cta" href="#icon-catalog">Browse icons <SolarIcon name="arrow-down" size={15} /></a>
      </header>

      <section className="icons-hero">
        <div className="icons-hero-grid" aria-hidden="true" />
        <div>
          <p className="icons-kicker">SOLAR LINEAR · LOCAL ASSETS</p>
          <h1>Every icon.<br /><em>One literal import.</em></h1>
          <p>Search the complete Solar Linear collection, click an icon, and copy a tree-shakeable Coordiation import without guessing its name.</p>
        </div>
        <dl className="icons-hero-stats">
          <div><dt>Icons</dt><dd>1,246</dd></div>
          <div><dt>Style</dt><dd>Linear</dd></div>
          <div><dt>Runtime</dt><dd>Zero</dd></div>
          <div><dt>License</dt><dd>CC BY 4.0</dd></div>
        </dl>
      </section>

      <IconBrowser />
    </main>
  );
}
