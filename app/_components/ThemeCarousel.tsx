"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import SolarIcon from "./SolarIcon";

export type ThemeCarouselSlide = {
  name: string;
  title: string;
  description: string;
  cover: string | null;
  preview: string;
  detail: string;
  command: string;
  sections: number;
  accent: string;
  contrast: "dark" | "light";
};

export default function ThemeCarousel({ slides }: { slides: ThemeCarouselSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = slides[active];

  const move = useCallback((step: number) => {
    setActive((value) => (value + step + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => move(1), 7000);
    return () => window.clearInterval(timer);
  }, [move, paused]);

  if (!current) return null;

  return <section className="home-theme-carousel" id="theme-previews" aria-roledescription="carousel" aria-label="Coordiation theme previews" tabIndex={0} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }}>
    <div className="home-theme-carousel-heading"><div><p className="kicker">THEME PREVIEWS</p><h2>Pick a complete story.<br />Shape it into yours.</h2></div><p>Seven complete applications are ready to explore. Each one includes owned source, Coordiation components, Solar icons, responsive styling, and an installable registry entry.</p></div>
    <div className="home-theme-viewport"><div className="home-theme-track" style={{ transform: `translateX(-${active * 100}%)` }}>{slides.map((slide, index) => <article className="home-theme-slide" key={slide.name} aria-hidden={index !== active} style={{ "--theme-accent": slide.accent } as CSSProperties}><div className={`home-theme-preview is-${slide.contrast}`}><div className="home-theme-browser"><span><i /><i /><i /></span><code>theme.{slide.name}</code><b>{String(index + 1).padStart(2, "0")}</b></div><div className="home-theme-art">{slide.cover ? <img src={slide.cover} alt="" loading={index === 0 ? "eager" : "lazy"} /> : <div className="home-theme-dashboard" aria-hidden="true"><aside><i /><i /><i /><i /><i /></aside><main><span /><div><b>Financial overview</b><i /><i /><i /></div></main></div>}<div className="home-theme-art-label"><span>{slide.sections} sections</span><strong>{slide.title}</strong></div></div></div><div className="home-theme-copy"><p className="home-theme-index">THEME {String(index + 1).padStart(3, "0")} · READY TO INSTALL</p><h3>{slide.title}</h3><p>{slide.description}</p><code>{slide.command}</code><div className="home-theme-actions"><a href={slide.detail} tabIndex={index === active ? 0 : -1}>View details <SolarIcon name="arrow-right" size={16} /></a><a href={slide.preview} tabIndex={index === active ? 0 : -1}>Open preview <SolarIcon name="arrow-to-top-right" size={16} /></a></div></div></article>)}</div></div>
    <div className="home-theme-controls"><div className="home-theme-pagination" aria-live="polite"><b>{String(active + 1).padStart(2, "0")}</b><span>/</span><span>{String(slides.length).padStart(2, "0")}</span><em>{current.title}</em></div><div className="home-theme-dots" role="tablist" aria-label="Choose a theme">{slides.map((slide, index) => <button aria-label={`Show ${slide.title}`} aria-selected={index === active} className={index === active ? "is-active" : ""} key={slide.name} onClick={() => setActive(index)} role="tab"><span /></button>)}</div><div className="home-theme-arrows"><button aria-label="Previous theme" onClick={() => move(-1)}><SolarIcon name="arrow-right" size={17} /></button><button aria-label="Next theme" onClick={() => move(1)}><SolarIcon name="arrow-right" size={17} /></button></div></div>
  </section>;
}
