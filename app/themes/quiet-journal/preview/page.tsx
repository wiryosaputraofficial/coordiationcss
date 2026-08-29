import type { Metadata } from "next";
import type { ReactNode } from "react";
import ThemeIcon, { type ThemeIconName } from "./ThemeIcon";
import "./quiet-journal.css";

export const metadata: Metadata = {
  title: "Quiet Journal — Alya Senja",
  description: "An original personal essay and slow-living journal template.",
};

const stories = [
  { image: "/themes/quiet-journal/story-reading.webp", category: "Slow living", date: "August 24, 2026", title: "The room that taught me how to pause", excerpt: "A blue chair, a small stack of books, and the quiet ritual of making space for an unhurried hour." },
  { image: "/themes/quiet-journal/story-plant.webp", category: "Home notes", date: "August 18, 2026", title: "What tending a plant reveals about attention", excerpt: "The smallest routines are often the ones that return us to ourselves." },
  { image: "/themes/quiet-journal/story-travel.webp", category: "Travel", date: "August 09, 2026", title: "A city best understood at walking pace", excerpt: "Notes from bright streets, unfamiliar windows, and choosing the longer way home." },
];

const archives = [
  ...stories,
  { image: "/themes/quiet-journal/story-books-camera.webp", category: "Reading", date: "July 29, 2026", title: "Five books I carried into a quieter season", excerpt: "" },
  { image: "/themes/quiet-journal/hero-desk.webp", category: "Writing", date: "July 17, 2026", title: "A notebook is a place to arrive slowly", excerpt: "" },
  { image: "/themes/quiet-journal/writer-portrait.webp", category: "Personal", date: "July 02, 2026", title: "Learning to make work that sounds like me", excerpt: "" },
];

function JournalLink({ href, children, variant = "light" }: { href: string; children: ReactNode; variant?: "light" | "dark" }) {
  return <a className={`qj-button qj-button-${variant} co-inline-flex co-items-center co-justify-center co-rounded-full`} href={href}>{children}<ThemeIcon name="arrow-right" size={14} tone={variant === "dark" ? "light" : "dark"} /></a>;
}

function StoryMeta({ category, date }: { category: string; date: string }) {
  return <div className="qj-story-meta co-flex co-items-center co-flex-wrap"><span>{category}</span><time><ThemeIcon name="calendar" size={12} />{date}</time><small><ThemeIcon name="clock-circle" size={12} />5 min read</small></div>;
}

function TopicChip({ label, icon = "hashtag" }: { label: string; icon?: ThemeIconName }) {
  return <a className="qj-topic co-inline-flex co-items-center co-rounded-full" href="#stories"><ThemeIcon name={icon} size={14} />{label}</a>;
}

export default function QuietJournalPreview() {
  return <main className="quiet-journal co-overflow-hidden" id="top">
    <header className="qj-header co-flex co-items-center co-justify-between">
      <a className="qj-brand co-inline-flex co-items-center" href="#top" aria-label="Quiet Journal home"><span className="co-inline-flex co-items-center co-justify-center co-rounded-full"><ThemeIcon name="book" size={17} tone="light" /></span><b>Quiet Journal</b></a>
      <nav className="co-flex co-items-center" aria-label="Journal navigation"><a href="#about">About</a><a href="#stories">Stories</a><a href="#archive">Archive</a><a href="#topics">Topics</a></nav>
      <a className="qj-contact co-inline-flex co-items-center co-rounded-full" href="#newsletter">Write to me <ThemeIcon name="letter" size={14} tone="light" /></a>
    </header>

    <section className="qj-hero co-grid co-items-center">
      <div className="qj-hero-copy co-relative">
        <p className="qj-eyebrow co-uppercase"><ThemeIcon name="heart" size={14} tone="accent" /> A place for useful wonder</p>
        <h1>Notes that <em>stay</em><br />after the noise<br />fades.</h1>
        <p>Essays about thoughtful work, slow mornings, unfamiliar places, and the small choices that make a life feel more like your own.</p>
        <div className="qj-hero-actions co-flex co-items-center co-flex-wrap"><JournalLink href="#stories" variant="dark">Read the journal</JournalLink><JournalLink href="#about">About Alya</JournalLink></div>
        <a className="qj-scroll co-inline-flex co-items-center" href="#about">Scroll to explore <ThemeIcon name="arrow-down" size={14} /></a>
      </div>
      <div className="qj-hero-art co-relative co-self-center">
        <img className="co-block co-h-full co-w-full co-object-cover" src="/themes/quiet-journal/hero-desk.webp" alt="An illustrated writing desk with an open notebook, coffee, and a plant" />
        <aside className="qj-note qj-note-top co-absolute"><ThemeIcon name="user" size={16} tone="accent" /><small>Readers</small><strong>18.7k</strong><span>each month</span></aside>
        <aside className="qj-note qj-note-bottom co-absolute"><ThemeIcon name="clock-circle" size={16} tone="accent" /><small>Latest note</small><strong>On making room</strong><span>4 min read</span></aside>
      </div>
    </section>

    <section className="qj-about co-grid co-items-center" id="about">
      <figure className="qj-about-art co-relative co-overflow-hidden"><img className="co-block co-h-full co-w-full co-object-cover" src="/themes/quiet-journal/writer-portrait.webp" alt="Illustrated portrait of Alya Senja holding a notebook" /><figcaption className="co-absolute co-rounded-full"><ThemeIcon name="book" size={14} tone="light" /> 7 years of field notes</figcaption></figure>
      <div className="qj-about-copy"><p className="qj-eyebrow co-uppercase">A note about me</p><h2>Hi, I&apos;m Alya.<br />I write things that<br /><em>matter slowly.</em></h2><p>I&apos;m a writer, researcher, and attentive observer based between Jakarta and wherever the next train stops. I believe useful stories are the ones that make you notice your own life again.</p><p>Here I write about creative work, design, place, memory, and the gentle discipline of paying attention.</p><div className="qj-topics co-flex co-flex-wrap"><TopicChip label="Writing" /><TopicChip label="Design" /><TopicChip label="Slow living" /><TopicChip label="Travel" icon="map-point" /></div></div>
    </section>

    <section className="qj-section qj-featured" id="stories">
      <div className="qj-section-head co-flex co-items-end co-justify-between"><div><p className="qj-eyebrow co-uppercase">Latest writing</p><h2>Featured <em>stories.</em></h2></div><JournalLink href="#archive">View all stories</JournalLink></div>
      <div className="qj-feature-grid co-grid">
        <article className="qj-story qj-story-large co-flex co-overflow-hidden"><img className="co-block co-w-full co-object-cover" src={stories[0].image} alt="Illustrated reading nook with an armchair and plants" /><div><StoryMeta category={stories[0].category} date={stories[0].date} /><h3>{stories[0].title}</h3><p>{stories[0].excerpt}</p><a className="qj-read co-inline-flex co-items-center" href="#newsletter">Read story <ThemeIcon name="arrow-right" size={14} tone="accent" /></a></div></article>
        <div className="qj-story-stack co-grid">{stories.slice(1).map((story) => <article className="qj-story co-overflow-hidden" key={story.title}><img className="co-block co-w-full co-object-cover" src={story.image} alt="Original editorial story illustration" /><div><StoryMeta category={story.category} date={story.date} /><h3>{story.title}</h3><p>{story.excerpt}</p><a className="qj-read co-inline-flex co-items-center" href="#newsletter">Read story <ThemeIcon name="arrow-right" size={14} tone="accent" /></a></div></article>)}</div>
      </div>
    </section>

    <section className="qj-section qj-archive" id="archive">
      <div className="qj-section-head"><p className="qj-eyebrow co-uppercase">All notes</p><h2>From the <em>archive.</em></h2></div>
      <div className="qj-archive-grid co-grid">{archives.map((story) => <article className="qj-archive-card co-overflow-hidden" key={`${story.date}-${story.title}`}><img className="co-block co-w-full co-object-cover" src={story.image} alt="Original editorial story illustration" /><div><StoryMeta category={story.category} date={story.date} /><h3>{story.title}</h3><small className="qj-card-read co-inline-flex co-items-center"><ThemeIcon name="clock-circle" size={12} />5 min read</small></div></article>)}</div>
    </section>

    <section className="qj-section qj-browse" id="topics"><p className="qj-eyebrow co-uppercase">Browse by topic</p><h2>What are you <em>curious about?</em></h2><div className="qj-topics co-flex co-flex-wrap"><TopicChip label="Writing" /><TopicChip label="Travel" icon="map-point" /><TopicChip label="Slow living" /><TopicChip label="Reading" icon="book" /><TopicChip label="Photography" icon="camera" /><TopicChip label="Mindfulness" icon="heart" /></div></section>

    <section className="qj-newsletter co-text-center" id="newsletter"><p className="qj-eyebrow co-uppercase">Stay connected</p><h2>One thoughtful note,<br /><em>every other Sunday.</em></h2><p>No noise and no hurry. Just one useful letter for your morning coffee.</p><form className="co-flex co-items-center" action="#newsletter"><label className="co-sr-only" htmlFor="qj-email">Email address</label><ThemeIcon name="letter" size={17} tone="light" /><input id="qj-email" type="email" placeholder="you@example.com" required /><button className="co-inline-flex co-items-center co-justify-center co-rounded-full" type="submit">Subscribe <ThemeIcon name="arrow-right" size={14} tone="light" /></button></form><small>Unsubscribe anytime. Your inbox is yours.</small></section>

    <footer className="qj-footer"><div className="qj-footer-main co-grid"><div><a className="qj-brand co-inline-flex co-items-center" href="#top"><span className="co-inline-flex co-items-center co-justify-center co-rounded-full"><ThemeIcon name="book" size={17} tone="light" /></span><b>Quiet Journal</b></a><p>A personal journal about noticing more, moving gently, and making useful things.</p></div><div><b>Journal</b><a href="#stories">Stories</a><a href="#archive">Archive</a><a href="#topics">Topics</a></div><div><b>About</b><a href="#about">My story</a><a href="#newsletter">Newsletter</a><a href="#newsletter">Now</a></div><div><b>Connect</b><a href="mailto:hello@quietjournal.example">Email</a><a href="#newsletter">Instagram</a><a href="#newsletter">LinkedIn</a></div></div><div className="qj-footer-bottom co-flex co-items-center co-justify-between"><span>© 2026 Coordiation</span><a className="co-inline-flex co-items-center" href="#top">Back to top <ThemeIcon name="arrow-to-top-right" size={14} tone="light" /></a></div></footer>
  </main>;
}
