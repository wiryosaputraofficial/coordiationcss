import type { ReactNode } from "react";
import ThemeIcon, { type ThemeIconName } from "./ThemeIcon";

export function PortfolioButton({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <a className={`mp-button co-inline-flex co-items-center co-justify-between co-transition co-duration-300 co-ease-out motion-reduce:co-animate-none${light ? " is-light" : ""}`} href={href}>{children}<ThemeIcon name="arrow-right" size={15} tone={light ? "dark" : "light"} /></a>;
}

export function SectionTag({ children, centered = false }: { children: ReactNode; centered?: boolean }) {
  return <p className={`mp-tag co-inline-flex co-items-center${centered ? " is-centered" : ""}`}><span className="motion-safe:co-animate-pulse motion-reduce:co-animate-none" />{children}</p>;
}

export function ServiceCell({ number, icon, title, copy }: { number: string; icon: ThemeIconName; title: string; copy: string }) {
  return <article className="mp-service co-relative co-transition co-duration-300 co-ease-out"><span>{number}</span><ThemeIcon name={icon} size={42} /><h3>{title}</h3><p>{copy}</p><a className="co-inline-flex co-items-center co-justify-center" href="#contact" aria-label={`Explore ${title}`}><ThemeIcon name="arrow-to-top-right" size={15} /></a></article>;
}

export function PlanCard({ name, price, featured = false }: { name: string; price: string; featured?: boolean }) {
  return <article className={`mp-plan co-flex co-flex-col${featured ? " is-featured" : ""}`}>{featured && <small>Most selected</small>}<h3>{name}</h3><p>For focused teams ready to turn positioning into a clear, useful digital product.</p><strong>{price}<span>/project</span></strong><ul>{["Strategy workshop", "Responsive interface", "Design system", "Handover support"].map(item=><li className="co-flex co-items-center" key={item}><ThemeIcon name="check-circle" size={14} />{item}</li>)}</ul><PortfolioButton href="#contact" light={featured}>Choose plan</PortfolioButton></article>;
}
