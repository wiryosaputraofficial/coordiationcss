import type { ReactNode } from "react";
import ThemeIcon from "./ThemeIcon";
import type { StudioProject } from "./projects";

export function StudioHeader() {
  return <header className="si-header co-flex co-items-start co-justify-between"><a className="si-identity co-flex co-flex-col" href="/themes/studio-index/preview"><strong>Ayla Vermeer</strong><span>Brand &amp; Product Design</span><span>©2026 Coordiation</span></a><nav className="co-flex co-items-center" aria-label="Social links"><a href="#contact" aria-label="Email"><ThemeIcon name="letter" /></a><a href="#work" aria-label="Portfolio"><ThemeIcon name="gallery-minimalistic" /></a><a href="#contact" aria-label="LinkedIn"><ThemeIcon name="link" /></a></nav></header>;
}

export function ProjectCard({ project }: { project: StudioProject }) {
  return <article className="si-project"><a className="si-project-cover co-relative co-overflow-hidden" href={`/themes/studio-index/preview/work/${project.slug}`} style={{ background: project.color }}><img className="co-w-full co-h-full co-object-cover co-transition co-duration-500 co-ease-out" src={project.cover} alt={`${project.title} project cover`} /></a><div className="si-project-meta co-flex co-items-center"><strong>{project.title}</strong><span>{project.period}</span><span>{project.discipline}</span></div><p>{project.summary}</p><a className="si-case-link co-inline-flex co-items-center" href={`/themes/studio-index/preview/work/${project.slug}`}>View case study <ThemeIcon name="arrow-right" size={14} /></a></article>;
}

export function DetailLabel({ icon, label, children }: { icon: "user" | "global" | "case-minimalistic" | "calendar"; label: string; children: ReactNode }) {
  return <div className="si-detail-label"><span className="co-inline-flex co-items-center"><ThemeIcon name={icon} size={14} />{label}</span><strong>{children}</strong></div>;
}
