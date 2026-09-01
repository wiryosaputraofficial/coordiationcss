import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import MobileNav from "@/app/_components/MobileNav";
import SolarIcon from "@/app/_components/SolarIcon";
import { createSeoMetadata } from "@/app/seo";
import DiscussionBrowser from "./DiscussionBrowser";
import DiscussionAccountLink from "./DiscussionAccountLink";
import { discussionCategories } from "./discussion-data";
import { getDiscussionOverview, listDiscussions } from "@/app/lib/discussions";
import "./discussions.css";

export const metadata: Metadata = createSeoMetadata({
  path: "/discussions",
  title: "Coordiation Discussions — Ask, answer, and build together",
  description: "Public community discussions about Coordiation utilities, components, themes, tooling, integrations, and AI-assisted product workflows.",
});

export default async function DiscussionsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [discussions, overview] = await Promise.all([listDiscussions(), getDiscussionOverview()]);
  const requestedCategory = (await searchParams).category;
  const initialCategory = discussionCategories.some(([, value]) => value === requestedCategory) ? requestedCategory : "all";
  return <main className="discussions-page" id="top">
    <header className="site-header discussions-header">
      <Link className="brand" href="/" aria-label="Coordiation home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Discussions</span></Link>
      <nav aria-label="Discussion navigation"><Link href="/discussions">Latest</Link><a href="#categories">Categories</a><Link href="/blogs">Blogs</Link><Link href="/docs">Docs</Link></nav>
      <MobileNav />
      <DiscussionAccountLink />
    </header>

    <section className="discussions-hero co-grid co-overflow-hidden">
      <div><p className="discussion-overline"><span>CO</span> COMMUNITY KNOWLEDGE</p><h1>Questions become<br /><em>shared answers.</em></h1><p>A public place to ask about Coordiation, learn from real implementation decisions, and help the next person build with more confidence.</p></div>
      <div className="discussions-hero-actions"><Link className="discussion-primary-action co-inline-flex co-items-center co-justify-between" href="/discussions/new"><span>Ask a question</span><SolarIcon name="pen-new-round" size={17} /></Link><p><SolarIcon name="eye" size={16} />Public to read. Contributions stay linked to your profile.</p></div>
    </section>

    <section className="discussions-shell co-grid">
      <aside className="discussion-categories" id="categories">
        <div className="discussion-aside-title co-flex co-items-center co-justify-between"><span>CATEGORIES</span><b>{discussionCategories.length - 1}</b></div>
        <nav aria-label="Discussion categories">{discussionCategories.map(([label, value, icon], index) => { const count = value === "all" ? overview.totalDiscussions : (overview.categoryCounts[value] || 0); return <a className={`co-flex co-items-center${value === initialCategory ? " is-active" : ""}`} href={index === 0 ? "/discussions#latest" : `/discussions?category=${value}#latest`} key={value}><SolarIcon name={icon} size={16} /><span>{label}</span><b>{count}</b></a>; })}</nav>
        <div className="discussion-guidelines"><SolarIcon name="shield-check" size={20} /><h2>Keep it useful.</h2><p>Share context, show what you tried, and treat every contributor with respect.</p><Link className="co-inline-flex co-items-center" href="/discussions/guidelines">Community guidelines <SolarIcon name="arrow-right" size={14} /></Link></div>
      </aside>

      <div className="discussion-feed" id="latest">
        <div className="discussion-feed-heading co-flex co-items-end co-justify-between"><div><p className="discussion-overline">LATEST ACTIVITY</p><h2>Community discussions</h2></div><span>{discussions.length} ACTIVE</span></div>
        <DiscussionBrowser discussions={discussions} initialCategory={initialCategory} />
      </div>

      <aside className="discussion-community-panel">
        <section><p className="discussion-overline">COMMUNITY PULSE</p><dl><div><dt>Questions this week</dt><dd>{overview.questionsThisWeek}</dd></div><div><dt>Solved this week</dt><dd>{overview.solvedThisWeek}</dd></div><div><dt>Active members</dt><dd>{overview.activeMembers}</dd></div></dl></section>
        <section><div className="co-flex co-items-center co-justify-between"><p className="discussion-overline">TOP CONTRIBUTORS</p><span>ALL TIME</span></div>{overview.contributors.map((contributor)=><div className="discussion-contributor co-flex co-items-center" key={contributor.id}><b>{contributor.initials}</b><span><strong>{contributor.name}</strong><small>{contributor.reputation} reputation · {contributor.questions + contributor.replies} posts</small></span><SolarIcon name="medal-star" size={16} /></div>)}{!overview.contributors.length && <div className="discussion-community-empty"><SolarIcon name="users-group-rounded" size={20} /><p>No contributors yet. The first real contribution will appear here.</p></div>}</section>
        <section className="discussion-release-card"><span>CO / 1.0 RC</span><h2>Release readiness is a community effort.</h2><p>Report problems with enough detail to reproduce, verify, and fix them.</p><Link className="co-inline-flex co-items-center" href="/release-check">Open Release Check <SolarIcon name="arrow-right" size={14} /></Link></section>
      </aside>
    </section>

    <footer className="discussions-footer co-flex co-items-center co-justify-between"><span>© 2026 Coordiation Discussions</span><nav><Link href="/discussions/guidelines">Guidelines</Link><Link href="/docs">Documentation</Link><Link href="/blogs">Blogs</Link><a href="mailto:wiryosaputra@coordiation.com">Contact</a></nav><a className="co-inline-flex co-items-center" href="#top">Back to top <SolarIcon name="arrow-up" size={14} /></a></footer>
  </main>;
}
