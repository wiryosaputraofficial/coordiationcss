import type { ReactNode } from "react";
import ThemeIcon from "./ThemeIcon";

export function SectionHeading({ index, eyebrow, children, light = false }: { index: string; eyebrow: string; children: ReactNode; light?: boolean }) {
  return <div className={`sp-section-heading sp-reveal co-flex co-items-start co-justify-between${light ? " is-light" : ""}`}><p className="sp-kicker">{index} / {eyebrow}</p><h2>{children}</h2></div>;
}

export function ProjectCard({ image, title, client, year }: { image: string; title: string; client: string; year: string }) {
  return <a className="sp-project-card sp-reveal co-block co-min-w-0" href="#contact"><div className="sp-project-media co-relative co-overflow-hidden"><img className="co-w-full co-h-full co-object-cover" src={image} alt={`${title} project for ${client}`} /><span className="co-inline-flex co-items-center">View project <ThemeIcon name="arrow-right" size={14} tone="ink" /></span></div><div className="sp-project-meta co-flex co-justify-between"><strong>{title}</strong><span>{client} · {year}</span></div></a>;
}

export function MetricCard({ value, suffix, label, copy }: { value: number; suffix?: string; label: string; copy: string }) {
  return <article className="sp-metric sp-reveal co-flex co-flex-col"><strong data-sp-count={value} data-sp-suffix={suffix ?? ""} aria-label={`${value}${suffix ?? ""}`}>0</strong><span>{label}</span><p>{copy}</p></article>;
}

export function RoundLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="sp-round-link co-inline-flex co-items-center co-justify-center" href={href}><span>{children}</span><ThemeIcon name="arrow-right" size={18} /></a>;
}
