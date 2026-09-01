import type { ReactNode } from "react";
import ThemeIcon, { type ThemeIconName } from "./ThemeIcon";

export function AgencyButton({ href, children, outline = false }: { href: string; children: ReactNode; outline?: boolean }) {
  return <a className={`sa-button co-inline-flex co-items-center co-justify-between co-transition co-duration-300 co-ease-out${outline ? " is-outline" : ""}`} href={href}>{children}<span className="co-inline-flex co-items-center co-justify-center"><ThemeIcon name="arrow-right" size={15} tone={outline ? "dark" : "accent"} /></span></a>;
}

export function SectionHeading({ eyebrow, title, copy, action }: { eyebrow: string; title: ReactNode; copy?: string; action?: ReactNode }) {
  return <div className="sa-section-heading co-grid co-items-end"><div><p className="sa-kicker co-flex co-items-center"><i className="motion-safe:co-animate-pulse motion-reduce:co-animate-none" />{eyebrow}</p><h2>{title}</h2></div>{copy ? <p>{copy}</p> : <span />}{action}</div>;
}

export function ServiceCard({ index, icon, title, copy, image }: { index: string; icon: ThemeIconName; title: string; copy: string; image: string }) {
  return <article className="sa-service co-flex co-flex-col co-transition co-duration-300 co-ease-out"><div className="co-flex co-items-center co-justify-between"><span>{index}</span><ThemeIcon name={icon} size={24} tone="accent" /></div><h3>{title}</h3><p>{copy}</p><figure className="co-relative co-overflow-hidden"><img className="co-w-full co-h-full co-object-cover co-transition co-duration-500 co-ease-out" src={image} alt="" /><a className="co-absolute co-inline-flex co-items-center co-justify-center" href="#contact" aria-label={`Discuss ${title}`}><ThemeIcon name="arrow-to-top-right" size={16} tone="dark" /></a></figure></article>;
}

export function ProjectCard({ category, title, image, wide = false }: { category: string; title: string; image: string; wide?: boolean }) {
  return <article className={`sa-project co-relative co-overflow-hidden${wide ? " is-wide" : ""}`}><img className="co-absolute co-w-full co-h-full co-object-cover co-transition co-duration-500 co-ease-out" src={image} alt="" /><div className="co-absolute" /><div className="co-absolute co-flex co-items-end co-justify-between"><span><small>{category}</small><h3>{title}</h3></span><a className="co-inline-flex co-items-center co-justify-center" href="#contact" aria-label={`View ${title}`}><ThemeIcon name="arrow-to-top-right" size={16} tone="dark" /></a></div></article>;
}

export function PlanCard({ name, price, featured = false }: { name: string; price: string; featured?: boolean }) {
  return <article className={`sa-plan co-flex co-flex-col${featured ? " is-featured" : ""}`}><div className="co-flex co-items-center co-justify-between"><h3>{name}</h3>{featured && <span>Most popular</span>}</div><p>For teams ready to turn a clear opportunity into a durable digital experience.</p><strong><sup>$</sup>{price}<small>/ project</small></strong><ul>{["Brand direction", "UX and interface system", "Responsive development", "Launch support"].map((item)=><li className="co-flex co-items-center" key={item}><ThemeIcon name="check-circle" size={15} tone="accent" />{item}</li>)}</ul><AgencyButton href="#contact" outline={!featured}>Get started</AgencyButton></article>;
}

export function TeamCard({ name, role, image }: { name: string; role: string; image: string }) {
  return <article className="sa-team-card co-relative co-overflow-hidden"><img className="co-w-full co-h-full co-object-cover co-transition co-duration-500 co-ease-out" src={image} alt={`${name}, ${role}`} /><div className="co-absolute co-flex co-items-end co-justify-between"><span><strong>{name}</strong><small>{role}</small></span><ThemeIcon name="arrow-to-top-right" size={16} tone="dark" /></div></article>;
}

export function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return <blockquote className="sa-quote co-flex co-flex-col"><div className="co-flex co-items-center co-justify-between"><span>CLIENT NOTE</span><ThemeIcon name="star" size={20} tone="accent" /></div><p>“{quote}”</p><footer><strong>{name}</strong><small>{role}</small></footer></blockquote>;
}

export function BlogCard({ category, title, image, date }: { category: string; title: string; image: string; date: string }) {
  return <article className="sa-blog-card co-grid"><img className="co-w-full co-h-full co-object-cover" src={image} alt="" /><div><span className="co-inline-flex co-items-center"><ThemeIcon name="calendar" size={14} tone="accent" />{date}</span><small>{category}</small><h3>{title}</h3><a className="co-inline-flex co-items-center" href="#contact">Read insight <ThemeIcon name="arrow-right" size={14} tone="accent" /></a></div></article>;
}
