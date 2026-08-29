import type { Metadata } from "next";
import Link from "./_components/SiteLink";
import MobileNav from "./_components/MobileNav";
import SolarIcon from "./_components/SolarIcon";

export const metadata: Metadata = {
  title: "Page not found — Coordiation CSS",
  description: "The requested Coordiation CSS page could not be found.",
  robots: { index: false, follow: false },
};

const destinations = [
  {
    href: "/docs",
    icon: "document-text",
    label: "Documentation",
    description: "Install Coordiation and explore every utility.",
  },
  {
    href: "/components",
    icon: "code-square",
    label: "Components",
    description: "Browse open-code interface components.",
  },
  {
    href: "/icons",
    icon: "ghost-smile",
    label: "Icons",
    description: "Find an icon from the Coordiation registry.",
  },
] as const;

export default function NotFound() {
  return (
    <main className="not-found-page">
      <header className="site-header not-found-header">
        <Link className="brand" href="/" aria-label="Coordiation CSS home">
          <img src="/coordiation-logo.png" alt="" />
          <span>Coordiation</span>
          <span className="brand-product">CSS</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/docs">Documentation</Link>
          <Link href="/components">Components</Link>
          <Link href="/themes">Themes</Link>
          <Link href="/icons">Icons</Link>
        </nav>
        <Link className="header-cta" href="/docs">
          Open docs <SolarIcon name="arrow-right" size={15} />
        </Link>
        <MobileNav />
      </header>

      <section className="not-found-hero">
        <div className="not-found-grid" aria-hidden="true" />
        <img className="not-found-watermark" src="/coordiation-logo.png" alt="" />

        <div className="not-found-copy">
          <p className="not-found-code"><SolarIcon name="magnifier-bug" size={19} /> ERROR · 404</p>
          <h1>Wrong turn.<em>Still in the system.</em></h1>
          <p className="not-found-lead">This route is not registered, may have moved, or never existed. The rest of Coordiation is ready when you are.</p>
          <div className="not-found-actions">
            <Link className="button button-dark" href="/"><SolarIcon name="home-angle" size={18} />Back to home<SolarIcon name="arrow-right" size={17} /></Link>
            <Link className="button button-light" href="/docs"><SolarIcon name="document-text" size={18} />Browse documentation</Link>
          </div>
        </div>

        <aside className="not-found-console" aria-label="Missing route status">
          <div className="not-found-console-bar"><span><i /><i /><i /></span><code>route.coord</code><b>not found</b></div>
          <div className="not-found-console-body">
            <span className="not-found-console-number">404</span>
            <div><code>route.resolve()</code><strong>NO MATCH</strong></div>
            <p>The compiler is healthy.<br />Only this path is missing.</p>
          </div>
        </aside>
      </section>

      <section className="not-found-destinations" aria-labelledby="not-found-destinations-title">
        <div className="not-found-destinations-heading"><p className="kicker">USEFUL DESTINATIONS</p><h2 id="not-found-destinations-title">Find your way back.</h2></div>
        <div className="not-found-destination-grid">
          {destinations.map((destination, index) => (
            <Link href={destination.href} key={destination.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <SolarIcon name={destination.icon} size={27} />
              <h3>{destination.label}</h3>
              <p>{destination.description}</p>
              <b aria-hidden="true"><SolarIcon name="arrow-right" size={18} /></b>
            </Link>
          ))}
        </div>
      </section>

      <footer className="not-found-footer"><Link className="brand" href="/"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span></Link><p>Build useful products for people everywhere.</p><span>© 2026 Coordiation</span></footer>
    </main>
  );
}
