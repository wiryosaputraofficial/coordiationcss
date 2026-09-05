import type { Metadata } from "next";
import ThemeIcon from "../ThemeIcon";
import ProjectBriefForm from "./ProjectBriefForm";
import "../spectrum-studio.css";

export const metadata: Metadata = { title: "Start a Project — Spectrum Studio", description: "Tell Spectrum what you are building, changing, or launching." };

export default function SpectrumStartProject() {
  return <main className="spectrum-studio sp-inquiry-page" id="top">
    <header className="sp-header co-flex co-items-center co-justify-between"><a className="sp-wordmark" href="/themes/spectrum-studio/preview" aria-label="Spectrum home">SPECTRUM<span>*</span></a><nav className="sp-case-nav co-flex co-items-center" aria-label="Inquiry navigation"><a href="/themes/spectrum-studio/preview#work">Projects</a><a href="/themes/spectrum-studio/preview#studio">Studio</a><a href="mailto:hello@spectrum.studio">Email us</a></nav></header>
    <section className="sp-inquiry-hero co-relative co-overflow-hidden co-flex co-flex-col"><div className="sp-inquiry-top co-flex co-items-center co-justify-between"><p className="sp-kicker">New business / 2026</p><p className="sp-inquiry-availability co-flex co-items-center"><span />Accepting selected projects</p></div><h1><span>START SOMETHING</span><span>THAT <em>MATTERS.</em></span></h1><div className="sp-inquiry-bottom co-flex co-items-end co-justify-between"><p>Tell us what you are building, changing, or launching. A clear starting point helps us make the first conversation useful.</p><a className="co-inline-flex co-items-center" href="#brief">Begin the brief <ThemeIcon name="arrow-right" size={18} /></a></div><div className="sp-inquiry-spectrum co-absolute" aria-hidden="true" /></section>
    <section className="sp-brief sp-paper" id="brief"><div className="sp-brief-heading co-grid"><p className="sp-kicker">01 / Project brief</p><h2>A few useful details.<br /><em>Nothing unnecessary.</em></h2></div><ProjectBriefForm /></section>
    <section className="sp-inquiry-direct"><p className="sp-kicker">Prefer a direct conversation?</p><a className="co-flex co-justify-between" href="mailto:hello@spectrum.studio">hello@spectrum.studio <ThemeIcon name="arrow-up" size={34} tone="ink" /></a><div className="co-flex co-justify-between"><span>Jakarta · Indonesia</span><span>Working worldwide</span></div></section>
    <footer className="sp-case-footer co-grid co-items-center"><a href="/themes/spectrum-studio/preview">Spectrum Studio</a><span>Jakarta · Working worldwide</span><span>© 2026 Coordiation</span><a className="co-inline-flex co-items-center" href="#top">Top <ThemeIcon name="arrow-up" size={14} /></a></footer>
  </main>;
}
