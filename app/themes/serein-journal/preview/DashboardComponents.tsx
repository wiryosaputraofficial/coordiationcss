import type { ReactNode } from "react";
import ThemeIcon from "./ThemeIcon";

export function JournalButton({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <a className={`sj-button co-inline-flex co-items-center co-justify-between co-transition co-duration-300 co-ease-out${light ? " is-light" : ""}`} href={href}>{children}<ThemeIcon name="arrow-right" size={15} tone={light ? "ink" : "paper"} /></a>;
}

export function SectionTitle({ index, children, centered = false }: { index: string; children: ReactNode; centered?: boolean }) {
  return <div className={`sj-section-title${centered ? " co-text-center" : ""}`}><span className="co-inline-flex co-items-center"><i className="motion-safe:co-animate-pulse motion-reduce:co-animate-none" />Edition {index}</span><h2>{children}</h2></div>;
}

export function StoryCard({ image, category, title, excerpt, large = false }: { image: string; category: string; title: string; excerpt?: string; large?: boolean }) {
  return <article className={`sj-story-card${large ? " is-large" : ""}`}><a className="sj-story-image co-relative co-overflow-hidden" href="#newsletter"><img className="co-w-full co-h-full co-object-cover co-transition co-duration-500 co-ease-out" src={image} alt="" /><span className="co-absolute co-inline-flex co-items-center co-justify-center"><ThemeIcon name="arrow-to-top-right" size={16} tone="paper" /></span></a><div><p className="sj-category">{category}</p><h3>{title}</h3>{excerpt && <p>{excerpt}</p>}<a className="sj-read co-inline-flex co-items-center" href="#newsletter">Read story <ThemeIcon name="arrow-right" size={14} tone="gold" /></a></div></article>;
}

export function CompactStory({ image, category, title }: { image: string; category: string; title: string }) {
  return <article className="sj-compact co-grid co-items-center"><img className="co-w-full co-h-full co-object-cover" src={image} alt="" /><div><p className="sj-category">{category}</p><h3>{title}</h3><span className="co-inline-flex co-items-center"><ThemeIcon name="clock" size={12} tone="gold" />6 min read</span></div></article>;
}
