"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { MetricCard, ProjectCard, RoundLink, SectionHeading } from "./DashboardComponents";
import ThemeIcon from "./ThemeIcon";

const projects = [
  ["chromatic-ritual", "/themes/spectrum-studio/project-01.jpg", "Chromatic Ritual", "Astra", "2026"],
  ["motion-engineered", "/themes/spectrum-studio/project-02.jpg", "Motion, Engineered", "Vektor", "2026"],
  ["nothing-static", "/themes/spectrum-studio/project-03.jpg", "Nothing Static", "Kinetik", "2025"],
  ["form-after-dark", "/themes/spectrum-studio/project-04.jpg", "Form After Dark", "Noir Lab", "2025"],
  ["human-interface", "/themes/spectrum-studio/project-05.jpg", "Human Interface", "Synapse", "2026"],
  ["secret-language", "/themes/spectrum-studio/project-06.jpg", "Secret Language", "Orphic", "2025"],
] as const;

const services = [
  { title: "Brand Identity", heading: "Recognition before decoration.", copy: "We define the visual logic that makes every touchpoint feel unmistakably yours—from a single mark to an entire living system.", items: ["Positioning", "Visual systems", "Typography", "Guidelines", "Asset libraries"] },
  { title: "Product Design", heading: "Complexity made instinctive.", copy: "We turn product logic into experiences that feel clear on first use and become more valuable with every return.", items: ["Product strategy", "UX architecture", "Interface design", "Prototypes", "Design systems"] },
  { title: "Web Systems", heading: "A digital home with a pulse.", copy: "We design and build expressive websites where story, interaction, and performance move as one system.", items: ["Creative direction", "Web design", "Development", "CMS systems", "Quality assurance"] },
  { title: "Motion & Interaction", heading: "Movement with a reason.", copy: "Motion creates hierarchy, rhythm, and memory. We use it to guide attention without competing for it.", items: ["Motion language", "Micro-interactions", "3D direction", "Campaign films", "Prototyping"] },
] as const;

const process = [
  ["Discovery", "2—3 days", "Understanding the problem comes first.", "Study the context · Clarify constraints · Define the goal"],
  ["Strategy", "3—5 days", "We decide what matters before making anything.", "Map the approach · Align priorities · Set the measure"],
  ["Concept", "4—5 days", "Ideas tested before they become designs.", "Explore directions · Pressure-test · Choose the path"],
  ["Design", "2—3 weeks", "Every part resolved as one coherent system.", "Build the system · Refine hierarchy · Present rationale"],
  ["Build", "4—8 weeks", "What was designed is exactly what ships.", "Develop precisely · Test every edge · Launch with care"],
] as const;

const people = [
  ["arka-wijaya", "/themes/spectrum-studio/person-01.avif", "Arka Wijaya", "Founder / Creative Direction"],
  ["maya-adelia", "/themes/spectrum-studio/person-02.avif", "Maya Adelia", "Strategy / Brand Systems"],
  ["keiko-tan", "/themes/spectrum-studio/person-03.avif", "Keiko Tan", "Design / Motion"],
] as const;

const quotes = [
  ["Spectrum turned a complicated ambition into a system everyone could understand—and a brand nobody could ignore.", "Raina Prasetyo · Founder, Astra"],
  ["Decisions happened early, stayed clear, and carried through every detail. The work feels inevitable.", "Daniel Kessler · Product Lead, Vektor"],
  ["They brought focus to the work and calm to the process. That combination is remarkably rare.", "Clara Hartono · Brand Director, Orphic"],
] as const;

export default function SpectrumExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const processRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const activeService = services[serviceIndex];

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll<HTMLElement>(".spectrum-studio .sp-reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      document.querySelectorAll<HTMLElement>(".spectrum-studio [data-sp-count]").forEach((element) => { element.textContent = `${element.dataset.spCount}${element.dataset.spSuffix ?? ""}`; });
      return;
    }
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); } }), { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach((element) => revealObserver.observe(element));
    const countObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target as HTMLElement;
      const end = Number(element.dataset.spCount ?? 0);
      const suffix = element.dataset.spSuffix ?? "";
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - started) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        element.textContent = `${Math.round(end * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(element);
    }), { threshold: 0.65 });
    document.querySelectorAll<HTMLElement>(".spectrum-studio [data-sp-count]").forEach((element) => countObserver.observe(element));
    return () => { revealObserver.disconnect(); countObserver.disconnect(); };
  }, []);

  const moveProcess = (direction: number) => processRef.current?.scrollBy({ left: processRef.current.clientWidth * 0.72 * direction, behavior: "smooth" });
  const moveQuote = (direction: number) => setQuoteIndex((current) => (current + direction + quotes.length) % quotes.length);
  const moveHero = (event: ReactPointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroRef.current?.style.setProperty("--sp-x", `${(x * 22).toFixed(1)}px`);
    heroRef.current?.style.setProperty("--sp-y", `${(y * 14).toFixed(1)}px`);
    heroRef.current?.style.setProperty("--sp-field-x", `${((x + 0.5) * 100).toFixed(1)}%`);
    heroRef.current?.style.setProperty("--sp-field-y", `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  return <main className="spectrum-studio co-overflow-hidden" id="top">
    <div className="sp-loader" aria-hidden="true"><strong>SPECTRUM<span>*</span></strong><i /><i /><i /></div>
    <header className="sp-header co-flex co-items-center co-justify-between"><a className="sp-wordmark" href="#top" aria-label="Spectrum home">SPECTRUM<span>*</span></a><button className="sp-menu-toggle co-inline-flex co-items-center" type="button" aria-expanded={menuOpen} aria-controls="sp-nav" onClick={() => setMenuOpen((open) => !open)}><ThemeIcon name="hamburger-menu" size={20} /> Menu</button><nav className={`sp-nav co-flex co-items-center${menuOpen ? " is-open" : ""}`} id="sp-nav" aria-label="Primary navigation">{[["Projects","#work"],["Studio","#studio"],["Services","#services"],["Contact","#contact"]].map(([label,href])=><a className="sp-flip-link" href={href} onClick={()=>setMenuOpen(false)} key={label}><span>{label}</span><span aria-hidden="true">{label}</span></a>)}</nav></header>

    <section className="sp-hero co-relative co-overflow-hidden co-min-h-screen" ref={heroRef} onPointerMove={moveHero} onPointerLeave={() => { heroRef.current?.style.removeProperty("--sp-x"); heroRef.current?.style.removeProperty("--sp-y"); }} aria-labelledby="sp-hero-title"><div className="sp-hero-media co-absolute"><img className="sp-hero-base co-w-full co-h-full co-object-cover" src="/themes/spectrum-studio/hero-spectrum.jpg" alt="" /><img className="sp-hero-channel is-cyan co-w-full co-h-full co-object-cover" src="/themes/spectrum-studio/hero-spectrum.jpg" alt="" /><img className="sp-hero-channel is-magenta co-w-full co-h-full co-object-cover" src="/themes/spectrum-studio/hero-spectrum.jpg" alt="" /></div><div className="sp-spectrum-field co-absolute" aria-hidden="true" /><div className="sp-tech-grid co-absolute" aria-hidden="true" /><div className="sp-hero-shade co-absolute" aria-hidden="true" /><div className="sp-hero-intro"><p className="sp-eyebrow co-flex co-items-center"><i />独立系デザインスタジオ</p><h2>Independent<br />Creative Studio</h2><p>Jakarta · Indonesia<br />Working worldwide</p></div><div className="sp-hero-services"><span>EST. 2026</span><p>Brand<br />Product<br />Web<br />Motion</p></div><h1 className="sp-hero-title" id="sp-hero-title"><span>WE DON&apos;T MAKE NOISE<b>✣</b></span><span>WE MAKE IMPACT</span></h1><div className="sp-hero-rail">Spectrum Design / Always in motion<i /></div><a className="sp-scroll-cue co-inline-flex co-items-center" href="#work">Scroll to explore <ThemeIcon name="arrow-right" size={17} /></a></section>

    <section className="sp-work sp-paper" id="work"><SectionHeading index="01" eyebrow="Selected projects">A curated selection of work<br /><em>built to refuse the ordinary.</em></SectionHeading><div className="sp-project-grid co-grid">{projects.map(([slug,image,title,client,year])=><ProjectCard slug={slug} image={image} title={title} client={client} year={year} key={title} />)}</div><a className="sp-text-link co-inline-flex co-items-center" href="#services">Explore our approach <ThemeIcon name="arrow-right" size={17} tone="ink" /></a></section>

    <section className="sp-client-strip" aria-label="Selected clients"><div className="sp-marquee co-flex co-items-center">{["ASTRA","VEKTOR","MONOLITH","ORPHIC","KINETIK","NOIR LAB","ASTRA","VEKTOR","MONOLITH","ORPHIC","KINETIK","NOIR LAB"].map((client,index)=><span className="co-inline-flex co-items-center" key={`${client}-${index}`}>{client}<i>✣</i></span>)}</div></section>

    <section className="sp-statement co-relative co-overflow-hidden" id="studio"><div className="sp-orbit co-absolute" aria-hidden="true"><i /><i /><i /></div><p className="sp-kicker sp-reveal">02 / Studio</p><h2 className="sp-statement-title sp-reveal"><span>WE BUILD BRANDS.</span><span>THEN WE GIVE THEM</span><span>SOMEWHERE TO LIVE.</span></h2><div className="sp-statement-copy sp-reveal co-grid"><p>形に意味を与える</p><p>Strategy, identity, digital, and motion—kept in one room so the idea never gets lost in translation.</p></div></section>

    <section className="sp-services sp-paper" id="services"><SectionHeading index="03" eyebrow="Capabilities">Design systems for brands<br /><em>that intend to move.</em></SectionHeading><div className="sp-services-layout co-grid"><div className="sp-services-list" role="tablist" aria-label="Services">{services.map((service,index)=><button className={`sp-service-row co-grid co-items-center${serviceIndex===index?" is-active":""}`} type="button" role="tab" aria-selected={serviceIndex===index} onClick={()=>setServiceIndex(index)} key={service.title}><span>{String(index+1).padStart(2,"0")}</span><strong>{service.title}</strong><ThemeIcon name="arrow-right" size={20} tone="ink" /></button>)}</div><article className="sp-service-panel sp-reveal" aria-live="polite" key={serviceIndex}><strong>.{String(serviceIndex+1).padStart(2,"0")}</strong><h3>{activeService.heading}</h3><p>{activeService.copy}</p><ul>{activeService.items.map(item=><li key={item}>{item}</li>)}</ul></article></div></section>

    <section className="sp-metrics co-grid"><div className="sp-metrics-intro sp-reveal co-relative co-overflow-hidden"><p className="sp-kicker">04 / Proof</p><h2>THE WORK<br />EARNS<br /><span>ATTENTION.</span></h2><p>We take on fewer projects. Each one gets the full weight of the studio.</p></div><div className="sp-metrics-grid co-grid"><MetricCard value={45} suffix="+" label="Brands partnered" copy="From first systems to global launches." /><MetricCard value={94} suffix="%" label="Retention rate" copy="The clearest signal that the process works." /><MetricCard value={24} label="Sectors served" copy="Context changes. Standards do not." /><MetricCard value={78} suffix="%" label="Long-term work" copy="Built beyond the first engagement." /></div></section>

    <section className="sp-process sp-paper"><SectionHeading index="05" eyebrow="Process">We don&apos;t start with answers.<br /><em>We start with the right questions.</em></SectionHeading><div className="sp-process-stage"><div className="sp-process-track co-grid" ref={processRef} tabIndex={0} aria-label="Our five stage process">{process.map(([title,time,copy,steps],index)=><article className="sp-process-card co-flex co-flex-col" key={title}><div className="co-flex co-justify-between"><span>{String(index+1).padStart(2,"0")}</span><span>{time}</span></div><h3>{title}</h3><p>{copy}</p><small>{steps}</small></article>)}</div><div className="sp-controls co-flex co-justify-end"><button type="button" onClick={()=>moveProcess(-1)} aria-label="Previous process stage"><ThemeIcon name="arrow-right" size={19} tone="ink" /></button><button type="button" onClick={()=>moveProcess(1)} aria-label="Next process stage"><ThemeIcon name="arrow-right" size={19} tone="ink" /></button></div></div></section>

    <section className="sp-team" id="team"><SectionHeading index="06" eyebrow="The studio">The people you meet<br /><em>are the people doing the work.</em></SectionHeading><div className="sp-team-grid co-grid">{people.map(([slug,image,name,role])=><a className="sp-person sp-reveal co-block" href={`/themes/spectrum-studio/preview/studio/${slug}`} key={name}><div className="sp-person-image co-relative co-overflow-hidden"><img className="co-w-full co-h-full co-object-cover" src={image} alt={`Portrait of ${name}`} /><span className="co-inline-flex co-items-center">Studio profile <ThemeIcon name="arrow-right" size={14} tone="ink" /></span></div><div className="co-flex co-justify-between"><h3>{name}</h3><p>{role}</p></div></a>)}</div></section>

    <section className="sp-testimonials co-grid"><p className="sp-kicker">07 / What clients say</p><div className="sp-quote-slider"><article className="sp-quote" key={quoteIndex}><blockquote>“{quotes[quoteIndex][0]}”</blockquote><p>{quotes[quoteIndex][1]}</p></article><div className="sp-quote-controls co-flex co-items-center co-justify-between"><button type="button" onClick={()=>moveQuote(-1)} aria-label="Previous testimonial"><ThemeIcon name="arrow-right" size={20} tone="ink" /></button><span>{String(quoteIndex+1).padStart(2,"0")} / {String(quotes.length).padStart(2,"0")}</span><button type="button" onClick={()=>moveQuote(1)} aria-label="Next testimonial"><ThemeIcon name="arrow-right" size={20} tone="ink" /></button></div></div></section>

    <section className="sp-contact sp-paper co-relative co-overflow-hidden" id="contact"><div className="sp-contact-copy sp-reveal"><p>Have a project in mind?</p><h2>LET&apos;S MAKE<br />IT <span>MATTER.</span></h2></div><RoundLink href="/themes/spectrum-studio/preview/start-project">Start a project</RoundLink></section>

    <footer className="sp-footer"><div className="sp-footer-statement"><span>WE LEAVE</span><span>THE WORK</span><span>BETTER THAN</span><span>THE BRIEF.</span></div><div className="sp-footer-links co-grid"><div className="co-flex co-flex-col"><strong>Navigation</strong><a href="#top">Home</a><a href="#work">Projects</a><a href="#studio">Studio</a><a href="#services">Services</a></div><div className="co-flex co-flex-col"><strong>Contact</strong><a className="co-inline-flex co-items-center" href="mailto:hello@spectrum.studio"><ThemeIcon name="letter" size={15} />hello@spectrum.studio</a><span className="co-inline-flex co-items-center"><ThemeIcon name="global" size={15} />Jakarta · Worldwide</span></div></div><div className="sp-footer-bottom co-grid co-items-center"><span>© 2026 Coordiation. All rights reserved.</span><span>Spectrum Studio</span><a className="co-inline-flex co-items-center" href="#top">Back to top <ThemeIcon name="arrow-up" size={15} /></a></div></footer>
  </main>;
}
