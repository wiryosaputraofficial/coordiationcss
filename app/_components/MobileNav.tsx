import Link from "@/app/_components/SiteLink";
import SolarIcon from "./SolarIcon";

const links = [
  ["Home", "/"],
  ["Docs", "/docs"],
  ["Components", "/components"],
  ["Themes", "/themes"],
  ["Icons", "/icons"],
  ["Release Check", "/release-check"],
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
