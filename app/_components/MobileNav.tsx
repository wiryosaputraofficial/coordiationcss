import Link from "@/app/_components/SiteLink";
import SolarIcon from "./SolarIcon";

const links = [
  ["Home", "/"],
  ["Docs", "/docs"],
  ["Cookbook", "/cookbook"],
  ["Journal", "/blogs"],
  ["Components", "/components"],
  ["Themes", "/themes"],
  ["Icons", "/icons"],
  ["Release Check", "/release-check"],
  ["1.0 RC notes", "/docs/releases/1.0.0-rc.1"],
  ["Migration guide", "/docs/migration/1.0-rc"],
  ["Get started", "/docs/installation/using-vite"],
] as const;

export default function MobileNav() {
  return (
    <details className="mobile-nav">
      <summary aria-label="Open main navigation">
        <SolarIcon name="hamburger-menu" size={19} />
        <span>Menu</span>
      </summary>
      <nav aria-label="Mobile navigation">
        {links.map(([label, href]) => (
          <Link className={label === "Get started" ? "mobile-nav-cta" : undefined} href={href} prefetch={false} key={href}>
            <span>{label}</span>
            <SolarIcon name="arrow-right" size={14} />
          </Link>
        ))}
      </nav>
    </details>
  );
}
