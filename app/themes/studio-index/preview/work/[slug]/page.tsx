import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ThemeIcon from "../../ThemeIcon";
import { DetailLabel, StudioHeader } from "../../DashboardComponents";
import { getStudioProject, studioProjects } from "../../projects";
import "../../studio-index.css";

export function generateStaticParams() {
  return studioProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getStudioProject(slug);
  if (!project) return { title: "Case study not found" };
  return { title: `${project.title} — Studio Index`, description: project.summary, openGraph: { title: `${project.title} — Studio Index`, description: project.summary, images: [project.hero] }, twitter: { card: "summary_large_image", title: `${project.title} — Studio Index`, description: project.summary, images: [project.hero] } };
}

export default async function StudioProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getStudioProject(slug);
  if (!project) notFound();
  return <main className="studio-index si-detail-page"><StudioHeader /><a className="si-back co-inline-flex co-items-center" href="/themes/studio-index/preview"><ThemeIcon name="arrow-right" size={15} />All work</a><section className="si-detail-hero"><div><p className="si-eyebrow">{project.discipline}</p><h1>{project.title}</h1><p>{project.statement}</p></div><div className="si-detail-labels co-grid"><DetailLabel icon="user" label="Client">{project.client}</DetailLabel><DetailLabel icon="case-minimalistic" label="Role">{project.role}</DetailLabel><DetailLabel icon="global" label="Place">{project.location}</DetailLabel><DetailLabel icon="calendar" label="Year">{project.period}</DetailLabel></div></section><figure className="si-detail-image"><img src={project.hero} alt={`${project.title} feature`} /></figure><section className="si-detail-story co-grid"><div><p className="si-eyebrow">Concept</p><h2>A distinct idea that can grow without losing itself.</h2></div><p>{project.concept}</p></section><section className="si-system co-grid"><div className="si-system-card" style={{ background: project.color }}><span>Primary mark</span><b>{project.title.slice(0, 1)}</b></div><div className="si-system-copy"><p className="si-eyebrow">Visual language</p><h2>Designed to be recognized before it is explained.</h2><p>Every element has a practical role: color holds attention, type sets the pace, and the icon language gives repeated moments a familiar shape.</p><div className="si-swatches co-flex"><i style={{ background: project.color }} /><i /><i /><i /></div></div></section><section className="si-gallery co-grid">{project.gallery.map((image, index) => <figure className={index === 1 ? "is-tall" : ""} key={image}><img src={image} alt={`${project.title} project detail ${index + 1}`} /></figure>)}</section><section className="si-detail-outcome"><p className="si-eyebrow">Outcome</p><h2>{project.outcome}</h2><a className="si-case-link co-inline-flex co-items-center" href="/themes/studio-index/preview">See more work <ThemeIcon name="arrow-right" size={15} /></a></section><footer className="si-footer co-flex co-items-center co-justify-between"><p>© 2026 Coordiation.<br />Built with Coordiation components.</p><a href="mailto:hello@coordiation.com">Start a conversation <ThemeIcon name="arrow-to-top-right" size={15} /></a></footer></main>;
}
