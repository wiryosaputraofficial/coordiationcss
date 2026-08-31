import type { ReactNode } from "react";
import ThemeIcon, { type ThemeIconName } from "./ThemeIcon";

export function StudioButton({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <a className={`nh-button co-inline-flex co-items-center co-justify-between co-transition co-duration-300 co-ease-out${light ? " is-light" : ""}`} href={href}>{children}<ThemeIcon name="arrow-to-top-right" size={15} tone={light ? "dark" : "light"} /></a>;
}

export function SectionTitle({ overline, children, centered = false }: { overline: string; children: ReactNode; centered?: boolean }) {
  return <div className={`nh-section-title${centered ? " is-centered co-text-center" : ""}`}><p className="co-inline-flex co-items-center"><span className="motion-safe:co-animate-pulse motion-reduce:co-animate-none" />{overline}</p><h2>{children}</h2></div>;
}

export function ProjectCard({ image, title, category, wide = false }: { image: string; title: string; category: string; wide?: boolean }) {
  return <article className={`nh-project co-relative co-overflow-hidden${wide ? " is-wide" : ""}`}><img className="co-w-full co-h-full co-object-cover co-transition co-duration-500 co-ease-out" src={image} alt={`${title} architecture project`} /><div className="co-absolute"><small>{category}</small><h3>{title}</h3><a className="co-inline-flex co-items-center co-justify-center" href="#contact" aria-label={`View ${title}`}><ThemeIcon name="arrow-to-top-right" size={16} /></a></div></article>;
}

export function ProcessStep({ number, title, copy, icon }: { number: string; title: string; copy: string; icon: ThemeIconName }) {
  return <article className="nh-process-step co-grid co-items-start"><span>{number}</span><ThemeIcon name={icon} size={25} tone="sand" /><div><h3>{title}</h3><p>{copy}</p></div></article>;
}

export function ArticleCard({ image, date, title }: { image: string; date: string; title: string }) {
  return <article className="nh-article co-flex co-flex-col"><img className="co-w-full co-object-cover" src={image} alt="" /><small className="co-inline-flex co-items-center"><ThemeIcon name="calendar" size={13} tone="dark" />{date}</small><h3>{title}</h3><a className="co-inline-flex co-items-center" href="#contact">Read insight <ThemeIcon name="arrow-right" size={14} tone="dark" /></a></article>;
}
