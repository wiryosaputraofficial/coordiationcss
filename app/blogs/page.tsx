import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import MobileNav from "@/app/_components/MobileNav";
import SolarIcon from "@/app/_components/SolarIcon";
import { createSeoMetadata } from "@/app/seo";
import { blogPosts, type BlogPost } from "./posts";
import "./blogs.css";

export const metadata: Metadata = createSeoMetadata({
  path: "/blogs",
  title: "Coordiation Journal — Ideas for useful products",
  description: "Field notes about AI-native product delivery, frontend systems, open-code interfaces, accessibility, and the path from specification to production.",
});

function ArticleMeta({ post }: { post: BlogPost }) {
  return <p className="blogs-meta co-flex co-items-center"><SolarIcon name="calendar" size={14} /><time dateTime={post.date}>{post.displayDate}</time><span>{post.category}</span><small>{post.readingTime}</small></p>;
}

function ArticleArt({ post, compact = false }: { post: BlogPost; compact?: boolean }) {
  return <div className={`blogs-card-art blogs-tone-${post.tone}${compact ? " is-compact" : ""} co-relative co-overflow-hidden`} aria-hidden="true"><span>{post.category}</span><SolarIcon name={post.icon} size={compact ? 34 : 46} /><strong>{post.number}</strong><i /><i /></div>;
}

export default function BlogsPage() {
  const featured = blogPosts[0];
  const latest = blogPosts.slice(1, 4);
  const systems = blogPosts.slice(4);
  return (
    <main className="blogs-page" id="top">
      <header className="site-header blogs-header">
        <Link className="brand" href="/" aria-label="Coordiation home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Journal</span></Link>
        <nav aria-label="Journal navigation"><Link href="/blogs">Latest</Link><a href="#latest">AI &amp; product</a><a href="#systems">Engineering</a><Link href="/cookbook">Cookbook</Link><Link href="/docs">Docs</Link></nav>
        <MobileNav />
        <a className="header-cta co-inline-flex co-items-center" href="#featured">Start reading <SolarIcon name="arrow-down" size={15} /></a>
      </header>

      <section className="blogs-hero co-grid co-overflow-hidden">
        <div className="blogs-hero-copy">
          <p className="blogs-kicker"><span>CO</span> FIELD NOTES · ISSUE 001</p>
          <h1>Ideas for building<br /><em>useful products.</em></h1>
          <p>Practical writing about product contracts, interface systems, AI-agent workflows, and the decisions that carry good work from an idea into production.</p>
          <a className="blogs-text-link co-inline-flex co-items-center" href="#featured">Read the latest note <SolarIcon name="arrow-down" size={16} /></a>
        </div>
        <aside className="blogs-manifesto co-relative" aria-label="Coordiation Journal editorial principles">
          <span className="blogs-manifesto-index">01 / JOURNAL</span>
          <SolarIcon name="pen-new-round" size={38} />
          <blockquote>“A useful product begins when an assumption becomes a question people can answer.”</blockquote>
          <div className="co-flex co-items-center co-justify-between"><span>WRITTEN BY COORDIATION</span><span>JAKARTA · 2026</span></div>
        </aside>
      </section>

      <section className="blogs-featured" id="featured" aria-labelledby="featured-title">
        <div className="blogs-section-heading co-flex co-items-end co-justify-between"><div><p className="blogs-kicker">FEATURED FIELD NOTE</p><h2 id="featured-title">Start with the contract.</h2></div><span>{featured.readingTime} · {featured.category}</span></div>
        <article className="blogs-feature-card co-grid">
          <div className="blogs-feature-art co-relative co-overflow-hidden" aria-hidden="true"><span>SPEC</span><span>PRD</span><span>UX</span><span>QA</span><strong>01</strong></div>
          <div className="blogs-feature-copy co-flex"><ArticleMeta post={featured} /><h3>{featured.title}</h3><p>{featured.dek}</p><Link className="blogs-read-link co-inline-flex co-items-center" href={`/blogs/${featured.slug}`}>Read the field note <SolarIcon name="arrow-right" size={16} /></Link></div>
        </article>
      </section>

      <section className="blogs-latest" id="latest" aria-labelledby="latest-title">
        <div className="blogs-section-heading co-flex co-items-end co-justify-between"><div><p className="blogs-kicker">LATEST NOTES</p><h2 id="latest-title">Decisions worth sharing.</h2></div><span>{String(latest.length).padStart(2,"0")} ARTICLES</span></div>
        <div className="blogs-card-grid co-grid">{latest.map((post) => <article className="blogs-card" key={post.slug}><Link href={`/blogs/${post.slug}`} aria-label={`Read ${post.title}`}><ArticleArt post={post} /><div className="blogs-card-copy"><ArticleMeta post={post} /><h3>{post.title}</h3><p>{post.dek}</p><span className="blogs-card-link co-inline-flex co-items-center">Read note <SolarIcon name="arrow-right" size={15} /></span></div></Link></article>)}</div>
      </section>

      <section className="blogs-systems" id="systems" aria-labelledby="systems-title">
        <div className="blogs-systems-heading"><p className="blogs-kicker">SYSTEMS WORTH KEEPING</p><h2 id="systems-title">Build the evidence.<br /><em>Keep the learning.</em></h2><p>Notes about the registries, releases, and operating decisions that make a framework dependable for humans and AI agents.</p></div>
        <div className="blogs-system-list">{systems.map((post) => <article className="co-grid" key={post.slug}><ArticleArt post={post} compact /><div><ArticleMeta post={post} /><h3>{post.title}</h3><p>{post.dek}</p></div><Link className="co-inline-flex co-items-center" href={`/blogs/${post.slug}`} aria-label={`Read ${post.title}`}><SolarIcon name="arrow-right" size={19} /></Link></article>)}</div>
      </section>

      <section className="blogs-letter co-grid" aria-labelledby="journal-letter-title"><div><p className="blogs-kicker">A NOTE FROM THE CREATOR</p><h2 id="journal-letter-title">What should we understand next?</h2></div><div><p>The Journal grows from real questions about building useful products. If there is a decision, workflow, or interface problem you want explored, send it to Wiryo.</p><a className="co-inline-flex co-items-center" href="mailto:wiryosaputra@coordiation.com?subject=Coordiation%20Journal%20topic">Suggest a topic <SolarIcon name="arrow-to-top-right" size={16} /></a></div></section>

      <footer className="blogs-footer co-grid"><div><Link className="brand" href="/"><img src="/coordiation-logo-white.png" alt="" /><span>Coordiation</span><span className="brand-product">Journal</span></Link><p>Ideas, systems, and field notes for building products that matter to people.</p></div><nav aria-label="Journal footer"><Link href="/blogs">Journal</Link><Link href="/cookbook">Cookbook</Link><Link href="/components">Components</Link><Link href="/themes">Themes</Link><Link href="/docs">Documentation</Link></nav><div><a href="mailto:wiryosaputra@coordiation.com">wiryosaputra@coordiation.com</a><span>© 2026 Coordiation</span><a className="co-inline-flex co-items-center" href="#top">Back to top <SolarIcon name="arrow-up" size={14} /></a></div></footer>
    </main>
  );
}

