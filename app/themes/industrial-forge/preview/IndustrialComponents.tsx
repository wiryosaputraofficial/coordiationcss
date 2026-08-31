import type { ReactNode } from "react";
import ThemeIcon, { type ThemeIconName } from "./ThemeIcon";

export function ForgeButton({ href, children, inverse = false }: { href: string; children: ReactNode; inverse?: boolean }) {
  return <a className={`if-button co-inline-flex co-items-center co-justify-between co-transition co-duration-300 co-ease-out motion-reduce:co-animate-none${inverse ? " is-inverse" : ""}`} href={href}>{children}<ThemeIcon name="arrow-right" size={17} tone={inverse ? "dark" : "light"} /></a>;
}

export function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`if-label co-flex co-items-center${light ? " is-light" : ""}`}><span className="motion-safe:co-animate-pulse motion-reduce:co-animate-none" />{children}</p>;
}

export function ServiceCard({ index, title, copy, image }: { index: string; title: string; copy: string; image: string }) {
  return <article className="if-service-card co-relative co-overflow-hidden co-transition co-duration-300 co-ease-out"><img className="co-absolute co-w-full co-h-full co-object-cover co-transition co-duration-300 co-ease-out" src={image} alt="" /><div className="co-absolute" /><span>{index}</span><section className="co-absolute"><h3>{title}</h3><p>{copy}</p><a className="co-inline-flex co-items-center co-justify-center co-transition co-duration-300 co-ease-out" href="#contact" aria-label={`Explore ${title}`}><ThemeIcon name="arrow-to-top-right" size={17} tone="light" /></a></section></article>;
}

export function ValueCard({ icon, title, copy }: { icon: ThemeIconName; title: string; copy: string }) {
  return <article className="if-value"><ThemeIcon name={icon} size={24} tone="accent" /><h3>{title}</h3><p>{copy}</p></article>;
}
