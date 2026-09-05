import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortraitVisual from "../../PortraitVisual";
import ThemeIcon from "../../ThemeIcon";
import { getSpectrumPerson, spectrumPeople } from "../../people";
import "../../spectrum-studio.css";

export function generateStaticParams() {
  return spectrumPeople.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const person = getSpectrumPerson(slug);
  if (!person) return { title: "Profile not found" };
  const name = `${person.first} ${person.last}`;
  return { title: `${name} — Spectrum Studio`, description: person.intro, openGraph: { title: `${name} — Spectrum Studio`, description: person.intro, images: [person.image] }, twitter: { card: "summary_large_image", title: `${name} — Spectrum Studio`, description: person.intro, images: [person.image] } };
}

export default async function SpectrumProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = getSpectrumPerson(slug);
  if (!person) notFound();
  const index = spectrumPeople.findIndex((item) => item.slug === person.slug);
  const next = spectrumPeople[(index + 1) % spectrumPeople.length];
  const name = `${person.first} ${person.last}`;

  return <main className="spectrum-studio sp-profile-page" id="top">
    <header className="sp-header co-flex co-items-center co-justify-between"><a className="sp-wordmark" href="/themes/spectrum-studio/preview" aria-label="Spectrum home">SPECTRUM<span>*</span></a><nav className="sp-case-nav co-flex co-items-center" aria-label="Profile navigation"><a href="/themes/spectrum-studio/preview#team">The studio</a><a href="/themes/spectrum-studio/preview#work">Projects</a><a href="/themes/spectrum-studio/preview/start-project">Start a project</a></nav></header>
    <section className="sp-profile-hero"><div className="sp-profile-top co-flex co-items-center co-justify-between"><p className="sp-kicker">01 / The studio</p><p>{person.number}</p></div><div className="sp-profile-hero-grid co-grid co-items-end"><div className="sp-profile-hero-copy co-flex co-flex-col"><h1><span>{person.first}</span><span>{person.last}</span></h1><div className="sp-profile-role co-grid"><span>Role</span><strong>{person.role}</strong></div><p>{person.intro}</p></div><PortraitVisual image={person.image} name={name} /></div></section>
    <section className="sp-profile-bio sp-paper co-grid"><div className="sp-profile-label co-flex co-flex-col co-justify-between"><p className="sp-kicker">02 / Perspective</p><span>形に意味を与える</span></div><div><h2>{person.statement}</h2><div className="sp-profile-bio-body co-grid"><p>{person.bio[0]}</p><p>{person.bio[1]}</p></div></div></section>
    <section className="sp-profile-quote co-relative co-overflow-hidden"><p className="sp-kicker">03 / Point of view</p><blockquote>“{person.quote}”</blockquote><p className="sp-profile-credit">— {name}, Spectrum Studio</p><div className="sp-profile-orbit co-absolute" aria-hidden="true"><i/><i/><i/></div></section>
    <section className="sp-profile-focus sp-paper"><div className="sp-profile-section-head co-grid"><p className="sp-kicker">04 / Areas of focus</p><h2>Where perspective<br /><em>becomes practice.</em></h2></div><div className="sp-profile-focus-grid co-grid">{person.focus.map((focus,focusIndex)=><article className="co-flex co-flex-col" key={focus}><span>{String(focusIndex+1).padStart(2,"0")}</span><h3>{focus}</h3></article>)}</div></section>
    <section className="sp-profile-work"><div className="sp-profile-section-head co-grid"><p className="sp-kicker">05 / Selected work</p><h2>Work shaped<br />with <span>{person.first}</span>.</h2></div><div className="sp-profile-work-grid co-grid">{person.work.map((project)=><a href={`/themes/spectrum-studio/preview/work/${project.slug}`} key={project.slug}><div className="co-overflow-hidden"><img className="co-w-full co-h-full co-object-cover" src={project.image} alt={project.alt} /></div><p className="co-flex co-justify-between"><strong>{project.title}</strong><span>{project.client}</span></p></a>)}</div></section>
    <section className="sp-profile-next"><p className="sp-kicker">06 / Meet the studio</p><a className="co-grid co-items-end" href={`/themes/spectrum-studio/preview/studio/${next.slug}`}><span>Next person</span><strong>{next.first} {next.last}</strong><ThemeIcon name="arrow-up" size={32} tone="ink" /></a></section>
    <footer className="sp-case-footer co-grid co-items-center"><a href="mailto:hello@spectrum.studio">hello@spectrum.studio</a><span>Jakarta · Working worldwide</span><span>© 2026 Coordiation</span><a className="co-inline-flex co-items-center" href="#top">Top <ThemeIcon name="arrow-up" size={14} /></a></footer>
  </main>;
}
