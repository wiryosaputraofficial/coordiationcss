import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseVisual from "../../CaseVisual";
import ThemeIcon from "../../ThemeIcon";
import { getSpectrumProject, spectrumProjects } from "../../projects";
import "../../spectrum-studio.css";

export function generateStaticParams() {
  return spectrumProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getSpectrumProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: `${project.title} — Spectrum Studio`, description: project.summary, openGraph: { title: `${project.title} — Spectrum Studio`, description: project.summary, images: [project.image] }, twitter: { card: "summary_large_image", title: `${project.title} — Spectrum Studio`, description: project.summary, images: [project.image] } };
}

export default async function SpectrumProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getSpectrumProject(slug);
  if (!project) notFound();
  const index = spectrumProjects.findIndex((item) => item.slug === project.slug);
  const next = spectrumProjects[(index + 1) % spectrumProjects.length];

  return <main className="spectrum-studio sp-case-page" id="top">
    <header className="sp-header co-flex co-items-center co-justify-between"><a className="sp-wordmark" href="/themes/spectrum-studio/preview" aria-label="Spectrum home">SPECTRUM<span>*</span></a><nav className="sp-case-nav co-flex co-items-center" aria-label="Project navigation"><a href="/themes/spectrum-studio/preview#work">All projects</a><a href="/themes/spectrum-studio/preview#studio">Studio</a><a href="mailto:hello@spectrum.studio">Start a project</a></nav></header>
    <section className="sp-case-hero"><div className="sp-case-top co-flex co-items-center co-justify-between"><p className="sp-kicker">01 / Selected project</p><p>{project.number}</p></div><h1>{project.title}</h1><div className="sp-case-meta co-grid"><div><span>Client</span><strong>{project.client}</strong></div><div><span>Year</span><strong>{project.year}</strong></div><div><span>Scope</span><strong>{project.scope}</strong></div></div><CaseVisual image={project.image} alt={project.alt} /></section>
    <section className="sp-case-intro sp-paper co-grid"><div className="sp-case-label co-flex co-flex-col co-justify-between"><p className="sp-kicker">02 / The assignment</p><span>{project.discipline}</span></div><div><h2>{project.summary}</h2><div className="sp-case-body co-grid"><p>{project.context}</p><p>{project.approach}</p></div></div></section>
    <section className="sp-case-system"><div className="sp-case-section-head co-grid"><p className="sp-kicker">03 / The system</p><h2>ONE SIGNAL.<br /><span>ENDLESS RANGE.</span></h2></div><figure className="sp-case-prism co-relative co-overflow-hidden"><img className="co-w-full co-h-full co-object-cover" src={project.image} alt="" /><div aria-hidden="true" /><figcaption>MOVE YOUR POINT OF VIEW</figcaption></figure><div className="sp-case-system-copy co-grid"><p>形に意味を与える</p><p>{project.system}</p></div></section>
    <section className="sp-case-results sp-paper"><div className="sp-case-section-head co-grid"><p className="sp-kicker">04 / The outcome</p><h2>Built to stay clear<br /><em>while everything moves.</em></h2></div><div className="sp-case-results-grid co-grid">{project.results.map(([title,copy],resultIndex)=><article className="co-flex co-flex-col" key={title}><span>{String(resultIndex+1).padStart(2,"0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="sp-case-gallery sp-paper co-grid" aria-label="Project imagery"><figure><img className="co-w-full co-h-full co-object-cover" src={project.image} alt={`${project.title} full project view`} /></figure><figure><img className="co-w-full co-h-full co-object-cover" src={project.image} alt={`${project.title} detail view`} /></figure></section>
    <section className="sp-case-next"><p className="sp-kicker">05 / Continue exploring</p><a className="co-grid co-items-end" href={`/themes/spectrum-studio/preview/work/${next.slug}`}><span>Next project</span><strong>{next.title}</strong><ThemeIcon name="arrow-up" size={32} tone="ink" /></a></section>
    <footer className="sp-case-footer co-grid co-items-center"><a href="mailto:hello@spectrum.studio">hello@spectrum.studio</a><span>Jakarta · Working worldwide</span><span>© 2026 Coordiation</span><a className="co-inline-flex co-items-center" href="#top">Top <ThemeIcon name="arrow-up" size={14} /></a></footer>
  </main>;
}
