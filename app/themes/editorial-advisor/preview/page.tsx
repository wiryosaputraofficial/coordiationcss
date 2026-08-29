import type { Metadata } from "next";
import ThemeIcon from "./ThemeIcon";
import "./editorial-advisor.css";

export const metadata: Metadata = {
  title: "Maya Aruna — Editorial Advisor",
  description: "An original editorial portfolio template for independent advisors and consultants.",
};

const events = [
  { date: "18 SEP 2026", title: "Building Trust in Public Systems", place: "Nusantara Forum · Jakarta", type: "KEYNOTE" },
  { date: "07 OCT 2026", title: "Designing Decisions That Last", place: "Strategy Week · Singapore", type: "PANEL" },
  { date: "22 NOV 2026", title: "Human Scale, Global Impact", place: "Impact Assembly · Bandung", type: "WORKSHOP" },
];

const education = [
  { years: "2016–2018", degree: "MSc, Strategic Management", school: "Rotterdam School of Management", number: "01" },
  { years: "2010–2014", degree: "BSc, Industrial Engineering", school: "Institut Teknologi Bandung", number: "02" },
  { years: "2024", degree: "Systems Leadership Fellow", school: "The Aspen Institute", number: "03" },
];

export default function EditorialAdvisorPreview() {
  return (
    <main className="editorial-theme co-overflow-hidden">
      <section className="ea-hero co-relative co-overflow-hidden" id="home">
        <header className="ea-nav co-relative co-flex co-items-center co-justify-between">
          <a className="ea-mark co-inline-flex co-items-center co-justify-center co-rounded-full" href="#home" aria-label="Maya Aruna home">MA</a>
          <nav className="co-flex co-items-center" aria-label="Portfolio navigation">
            <a href="#about">About</a><a href="#work">Work</a><a href="#notes">Notes</a><a href="#contact">Contact</a>
          </nav>
          <a className="ea-menu co-inline-flex co-items-center" href="#contact">Let&apos;s talk <ThemeIcon name="arrow-to-top-right" size={15} /></a>
        </header>

        <div className="ea-hero-grid co-relative co-grid">
          <div className="ea-hero-copy co-relative co-self-center">
            <p className="ea-kicker co-uppercase">Independent strategy advisor</p>
            <h1>Maya<br /><em>Aruna</em></h1>
            <p className="ea-intro">I help ambitious teams turn complex public challenges into clear, useful products and enduring systems.</p>
          </div>
          <div className="ea-portrait-wrap co-relative co-self-end">
            <span className="ea-portrait-ring co-absolute co-rounded-full" aria-hidden="true" />
            <img className="co-absolute co-block co-h-full co-w-full co-object-cover" src="/themes/editorial-advisor/hero-advisor.png" alt="Maya Aruna, independent strategy advisor" />
          </div>
          <aside className="ea-experience co-relative co-self-center">
            <strong>12<sup>+</sup></strong><span>years shaping<br />useful change</span>
            <ul><li>Product strategy</li><li>Public innovation</li><li>Organizational design</li><li>Leadership advisory</li></ul>
          </aside>
        </div>
      </section>

      <section className="ea-quote-band co-grid co-items-center" aria-label="Guiding principle">
        <div className="ea-play co-flex co-items-center"><span className="co-flex co-items-center co-justify-center co-rounded-full"><ThemeIcon name="play-circle" size={24} /></span><small>How the<br />work begins</small></div>
        <blockquote>“Progress becomes possible when clarity is shared.”</blockquote>
        <div className="ea-laurel co-flex co-items-center co-justify-end co-text-center"><ThemeIcon name="medal-star" size={28} /><small>Independent<br />Advisor of 2026</small><ThemeIcon name="medal-star" size={28} /></div>
      </section>

      <section className="ea-section ea-events" id="work">
        <div className="ea-section-heading co-grid co-items-end">
          <p>Upcoming conversations</p>
          <h2>Ideas are better<br />when they <em>travel.</em></h2>
        </div>
        <div className="ea-event-list">
          {events.map((event) => (
            <article className="ea-event co-grid co-items-center" key={event.title}>
              <time>{event.date}</time><div><h3>{event.title}</h3><p>{event.place}</p></div><span>{event.type}</span><a href="#contact" aria-label={`Ask about ${event.title}`}>Details <ThemeIcon name="arrow-to-top-right" size={13} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="ea-section ea-insights" id="notes">
        <div className="ea-section-heading ea-insights-heading co-grid co-items-end">
          <h2>Field notes<br />and <em>insights.</em></h2>
          <p>Short observations on leadership, systems, and building things people can actually use.</p>
        </div>
        <div className="ea-insight-grid co-grid">
          <a className="ea-featured-story co-relative co-block" href="#contact">
            <img className="co-block co-w-full co-object-cover" src="/themes/editorial-advisor/insight-tower.png" alt="A modern tower seen from below" />
            <span>FIELD NOTE · 08</span><h3>Useful systems make the right action feel natural.</h3>
          </a>
          <div className="ea-story-list">
            <a href="#contact"><span>LEADERSHIP</span><h3>What teams need before they need another roadmap</h3><small>6 min read <ThemeIcon name="arrow-to-top-right" size={12} /></small></a>
            <a href="#contact"><span>PUBLIC VALUE</span><h3>Design for the person at the edge of the system</h3><small>8 min read <ThemeIcon name="arrow-to-top-right" size={12} /></small></a>
            <a className="ea-all-notes co-flex co-items-center co-justify-between" href="#contact">Explore all notes <ThemeIcon name="arrow-right" size={16} /></a>
          </div>
        </div>
      </section>

      <section className="ea-testimonial co-relative co-overflow-hidden" aria-label="Client testimonial">
        <img className="co-h-full co-w-full co-object-cover" src="/themes/editorial-advisor/testimonial-meeting.png" alt="Two professionals in a thoughtful conversation" />
        <blockquote><span>Client story · 04</span><p>“Maya helped us see the real decision hiding beneath months of noise.”</p><cite>Rafi Noor · Civic product director</cite></blockquote>
      </section>

      <section className="ea-section ea-about" id="about">
        <p className="ea-kicker">A practice built on usefulness</p>
        <h2>I&apos;m Maya Aruna, a strategy advisor helping teams build products and institutions that remain <em>useful to people.</em></h2>
        <div className="ea-about-meta co-flex co-items-center co-justify-between">
          <div className="co-flex co-items-center"><span className="ea-signature">Maya Aruna</span><p>Independent advisor<br />Jakarta · working globally</p></div>
          <div className="ea-socials co-flex"><a className="co-flex co-items-center co-justify-center co-rounded-full" href="#contact" aria-label="Email Maya"><ThemeIcon name="letter" size={17} /></a><a className="co-flex co-items-center co-justify-center co-rounded-full" href="#contact" aria-label="Visit Maya's website"><ThemeIcon name="global" size={17} /></a><a className="co-flex co-items-center co-justify-center co-rounded-full" href="#contact" aria-label="Share Maya's profile"><ThemeIcon name="share-circle" size={17} /></a></div>
        </div>
      </section>

      <section className="ea-trust" aria-label="Selected collaborators">
        <span className="co-block co-uppercase">Selected collaborators</span><div className="co-flex co-flex-wrap co-justify-around"><b>Common Ground</b><b>Northstar</b><b>Public Lab</b><b>Goodworks</b><b>Atlas</b></div>
      </section>

      <section className="ea-section ea-background">
        <div className="ea-section-heading co-grid co-items-end">
          <p>Practice and perspective</p><h2>Background<br />and <em>abilities.</em></h2>
        </div>
        <div className="ea-background-grid co-grid">
          <div className="ea-education">
            <h3>Learning</h3>
            {education.map((item) => <article className="co-grid co-items-center" key={item.number}><time>{item.years}</time><div><h4>{item.degree}</h4><p>{item.school}</p></div><span>{item.number}</span></article>)}
          </div>
          <div className="ea-skills">
            <h3>Core capabilities</h3>
            <article className="co-grid co-items-center"><strong>92%</strong><span>Product strategy</span><small>Systems + delivery</small></article>
            <article className="co-grid co-items-center"><strong>88%</strong><span>Executive facilitation</span><small>Alignment + decisions</small></article>
            <article className="co-grid co-items-center"><strong>84%</strong><span>Public innovation</span><small>Research + service design</small></article>
          </div>
        </div>
        <div className="ea-stats co-grid co-text-center"><div><strong className="co-block">28</strong><span className="co-uppercase">Organizations advised</span></div><div><strong className="co-block">17</strong><span className="co-uppercase">Countries reached</span></div><div><strong className="co-block">63k</strong><span className="co-uppercase">People served</span></div></div>
      </section>

      <footer className="ea-footer co-grid" id="contact">
        <div><span className="ea-mark ea-mark-light co-inline-flex co-items-center co-justify-center co-rounded-full">MA</span><p>Have a hard problem worth solving?</p><h2>Let&apos;s build something<br /><em>useful together.</em></h2></div>
        <div className="ea-contact"><span>Start a conversation</span><a href="mailto:hello@mayaaruna.studio">hello@mayaaruna.studio <ThemeIcon name="arrow-to-top-right" size={17} tone="light" /></a><p>Jakarta, Indonesia<br />Available worldwide</p></div>
        <div className="ea-footer-bottom co-flex co-items-center co-justify-between"><span>© 2026 Coordiation</span><a className="co-inline-flex co-items-center" href="#home">Back to top <ThemeIcon name="arrow-up" size={14} tone="light" /></a></div>
      </footer>
    </main>
  );
}
