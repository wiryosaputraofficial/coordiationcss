import type { Metadata } from "next";
import ThemeIcon from "./ThemeIcon";
import { CompactStory, JournalButton, SectionTitle, StoryCard } from "./DashboardComponents";
import "./serein-journal.css";

export const metadata: Metadata = { title: "Serein Journal — Stories for a considered life", description: "A refined editorial magazine theme built with Coordiation components, icons, and CSS utilities." };

const featureStories = [
  ["/themes/studio-index/detail-food.jpg", "TABLE", "The quiet ritual of a meal made slowly"],
  ["/themes/noir-habitat/news-light.jpg", "SPACE", "Rooms that let the morning arrive gently"],
  ["/themes/mono-portfolio/blog-design.jpg", "CRAFT", "Why the objects we keep deserve more attention"],
] as const;

const latestStories = [
  ["/themes/signal-agency/blog-meeting.jpg", "PEOPLE", "A generous meeting can change the work"],
  ["/themes/studio-index/root-table.jpg", "WORK", "Making room for one clear idea"],
  ["/themes/noir-habitat/project-house.jpg", "PLACE", "A house that listens to the landscape"],
  ["/themes/studio-index/detail-chef.jpg", "CRAFT", "The confidence of practiced hands"],
] as const;

export default function SereinJournalPreview() {
  return <main className="serein-journal co-overflow-hidden" id="top">
    <header className="sj-header co-flex co-items-center co-justify-between"><a className="sj-logo" href="#top" aria-label="Serein Journal home">SEREIN<span>.</span></a><nav className="co-flex co-items-center" aria-label="Serein Journal navigation"><a href="#stories">Stories</a><a href="#edit">The edit</a><a href="#latest">Latest</a><a href="#newsletter">Newsletter</a></nav><a className="sj-search co-inline-flex co-items-center co-justify-center" href="#latest" aria-label="Search stories"><ThemeIcon name="search" size={19} tone="ink" /></a><details className="sj-mobile-menu"><summary aria-label="Open navigation"><ThemeIcon name="hamburger-menu" size={22} tone="ink" /></summary><div className="co-flex co-flex-col"><a href="#stories">Stories</a><a href="#edit">The edit</a><a href="#latest">Latest</a><a href="#newsletter">Newsletter</a></div></details></header>

    <section className="sj-hero co-grid" id="stories"><div className="sj-hero-copy co-flex co-flex-col co-justify-center"><p className="sj-category">THE WEEKEND EDITION</p><h1>Notice what<br />the day is<br /><em>trying to tell you.</em></h1><p>Independent stories about design, people, food, and the small decisions that shape a considered life.</p><JournalButton href="#edit">Read the cover story</JournalButton></div><figure className="sj-hero-image co-relative co-overflow-hidden"><img className="co-w-full co-h-full co-object-cover" src="/themes/noir-habitat/project-interior.jpg" alt="Sunlit modern interior with warm wood details" /><figcaption className="co-absolute co-flex co-items-center co-justify-between"><span>Volume 09 · September 2026</span><ThemeIcon name="bookmark" size={18} tone="paper" /></figcaption></figure></section>

    <section className="sj-news-strip co-grid">{featureStories.map(([image,category,title])=><CompactStory image={image} category={category} title={title} key={title} />)}</section>

    <section className="sj-featured" id="edit"><SectionTitle index="01" centered>Featured</SectionTitle><div className="sj-feature-layout co-grid co-items-center"><div className="sj-feature-visual co-relative"><i className="co-absolute" /><img className="co-relative co-w-full co-h-full co-object-cover" src="/themes/studio-index/playroom.jpg" alt="Creative portrait in a warm editorial composition" /></div><article><p className="sj-category">CREATIVE LIFE</p><h3>Keep only what brings the work into focus</h3><p>A conversation about useful restraint, creative courage, and learning to leave enough room for an idea to breathe.</p><div className="co-flex co-items-center"><span>By Mira Santoso</span><span>8 min read</span></div><a className="sj-read co-inline-flex co-items-center" href="#latest">Read the feature <ThemeIcon name="arrow-right" size={15} tone="gold" /></a></article></div></section>

    <section className="sj-essay co-grid co-items-center"><article><p className="sj-category">DESIGN &amp; PLACE</p><h2>Good spaces do not ask for attention.</h2><p>They hold it quietly—in the angle of a chair, the texture of a wall, and the way afternoon light lands on the floor.</p><JournalButton href="#latest" light>Explore the essay</JournalButton></article><img className="co-w-full co-h-full co-object-cover" src="/themes/noir-habitat/service-interior.jpg" alt="A warm, restrained residential interior" /></section>

    <section className="sj-must-read"><SectionTitle index="02">Must read</SectionTitle><div className="sj-three-up co-grid">{featureStories.map(([image,category,title])=><StoryCard image={image} category={category} title={title} key={title} />)}</div></section>

    <section className="sj-essential"><div className="sj-essential-title co-relative co-text-center"><i className="co-absolute" /><SectionTitle index="03" centered>Essential</SectionTitle></div><StoryCard large image="/themes/industrial-forge/cta.jpg" category="TRAVEL" title="Take the long way when the view asks you to stay" excerpt="An unhurried route through open land, changing weather, and the value of arriving with a story." /></section>

    <section className="sj-latest" id="latest"><div className="sj-latest-head co-flex co-items-end co-justify-between"><SectionTitle index="04">Latest stories</SectionTitle><a className="sj-read co-inline-flex co-items-center" href="#newsletter">View the archive <ThemeIcon name="arrow-right" size={14} tone="gold" /></a></div><div className="sj-latest-layout co-grid"><div className="sj-latest-grid co-grid">{latestStories.map(([image,category,title])=><StoryCard image={image} category={category} title={title} excerpt="A practical note for people who believe better attention creates better work." key={title} />)}</div><aside><h3>Trending now</h3>{latestStories.slice(0,3).map(([image,category,title],index)=><article className="co-grid co-items-center" key={title}><span>0{index+1}</span><img className="co-w-full co-h-full co-object-cover" src={image} alt="" /><div><p className="sj-category">{category}</p><h4>{title}</h4></div></article>)}<div className="sj-side-note"><ThemeIcon name="star" size={22} tone="gold" /><p>One carefully selected story, every Sunday morning.</p><a href="#newsletter">Join 18,400 readers</a></div></aside></div></section>

    <section className="sj-newsletter co-grid co-items-center" id="newsletter"><div><p className="sj-category">A LETTER FROM SEREIN</p><h2>Good stories,<br /><em>delivered slowly.</em></h2><p>No noise. Just one considered note for your Sunday morning.</p></div><form className="co-flex co-items-center"><ThemeIcon name="letter" size={19} tone="paper" /><label className="co-sr-only" htmlFor="sj-email">Email address</label><input id="sj-email" type="email" placeholder="you@example.com" /><button className="co-inline-flex co-items-center co-justify-center" type="submit">Subscribe <ThemeIcon name="arrow-right" size={14} tone="ink" /></button></form></section>

    <footer className="sj-footer"><div className="sj-footer-main co-grid"><div><a className="sj-logo" href="#top">SEREIN<span>.</span></a><p>Independent stories for a more attentive life.</p></div><div><strong>Explore</strong><a href="#stories">Stories</a><a href="#edit">The edit</a><a href="#latest">Archive</a></div><div><strong>Topics</strong><a href="#latest">Design</a><a href="#latest">People</a><a href="#latest">Food</a><a href="#latest">Place</a></div><div><strong>Contact</strong><a className="co-inline-flex co-items-center" href="mailto:hello@serein.example"><ThemeIcon name="letter" size={14} tone="paper" />hello@serein.example</a><a className="co-inline-flex co-items-center" href="#top"><ThemeIcon name="global" size={14} tone="paper" />Jakarta · Worldwide</a></div></div><div className="sj-footer-bottom co-flex co-items-center co-justify-between"><span>© 2026 Coordiation. All rights reserved.</span><a className="co-inline-flex co-items-center" href="#top">Back to top <ThemeIcon name="arrow-to-top-right" size={14} tone="gold" /></a></div></footer>
  </main>;
}
