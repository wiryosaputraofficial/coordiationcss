import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/_components/SiteLink";
import MobileNav from "@/app/_components/MobileNav";
import SolarIcon from "@/app/_components/SolarIcon";
import { SITE_NAME, SITE_URL } from "@/app/seo";
import { blogPosts, getBlogPost } from "../posts";
import "../blogs.css";

export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false, follow: false } };
  const title = `${post.title} — Coordiation Journal`;
  const url = `${SITE_URL}/blogs/${post.slug}`;
  return { title: { absolute: title }, description: post.dek, keywords: post.keywords, alternates: { canonical: url }, openGraph: { title, description: post.dek, url, siteName: SITE_NAME, locale: "en_US", type: "article", publishedTime: post.date, authors: ["Wiryo Saputra"], images: [] }, twitter: { card: "summary", title, description: post.dek, images: [] } };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const articleJsonLd = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.dek, datePublished: post.date, dateModified: post.date, mainEntityOfPage: `${SITE_URL}/blogs/${post.slug}`, author: { "@type": "Person", name: "Wiryo Saputra", url: SITE_URL }, publisher: { "@type": "Organization", name: "Coordiation", url: SITE_URL }, keywords: post.keywords.join(", ") };
  return <main className="blog-article-page" id="top">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
    <header className="site-header blogs-header"><Link className="brand" href="/" aria-label="Coordiation home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Journal</span></Link><nav aria-label="Article navigation"><Link href="/blogs">All notes</Link><Link href="/cookbook">Cookbook</Link><Link href="/components">Components</Link><Link href="/themes">Themes</Link><Link href="/docs">Docs</Link></nav><MobileNav /><Link className="header-cta co-inline-flex co-items-center" href="/blogs">Journal index <SolarIcon name="arrow-right" size={15} /></Link></header>
    <article>
      <header className={`blog-article-hero blogs-tone-${post.tone} co-grid co-overflow-hidden`}><div className="blog-article-heading"><Link className="blog-back co-inline-flex co-items-center" href="/blogs"><SolarIcon name="arrow-left" size={15} />All field notes</Link><p className="blogs-meta co-flex co-items-center"><SolarIcon name="calendar" size={14} /><time dateTime={post.date}>{post.displayDate}</time><span>{post.category}</span><small>{post.readingTime}</small></p><h1>{post.title}</h1><p>{post.dek}</p></div><div className="blog-article-mark co-relative" aria-hidden="true"><span>{post.category}</span><SolarIcon name={post.icon} size={58} /><strong>{post.number}</strong><i /><i /></div></header>
      <div className="blog-article-shell co-grid"><aside className="blog-article-aside"><span>FIELD NOTE {post.number}</span><dl><div><dt>Written by</dt><dd>Wiryo Saputra</dd></div><div><dt>Published</dt><dd>{post.displayDate}</dd></div><div><dt>Reading time</dt><dd>{post.readingTime}</dd></div><div><dt>Topic</dt><dd>{post.category}</dd></div></dl><div className="blog-article-tags">{post.keywords.map((keyword)=><span key={keyword}>{keyword}</span>)}</div></aside>
        <div className="blog-article-body">{post.sections.map((section,index)=><section key={section.heading}><span>{String(index+1).padStart(2,"0")}</span><h2>{section.heading}</h2>{section.paragraphs.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}{section.quote&&<blockquote>{section.quote}</blockquote>}{section.points&&<ul>{section.points.map((point)=><li key={point}><SolarIcon name="check-circle" size={18} />{point}</li>)}</ul>}</section>)}<div className="blog-article-author co-grid"><div className="co-flex co-items-center co-justify-between"><span>WS</span><SolarIcon name="pen-new-round" size={22} /></div><div><p>Written by</p><h2>Wiryo Saputra</h2><p>Creator of Coordiation. Building a framework that helps people and AI agents turn clear product intent into useful, dependable software.</p><a className="co-inline-flex co-items-center" href="mailto:wiryosaputra@coordiation.com">Start a conversation <SolarIcon name="arrow-to-top-right" size={15} /></a></div></div></div>
      </div>
    </article>
    <section className="blog-related" aria-labelledby="related-title"><div className="blogs-section-heading co-flex co-items-end co-justify-between"><div><p className="blogs-kicker">CONTINUE READING</p><h2 id="related-title">Related field notes.</h2></div><Link className="co-inline-flex co-items-center" href="/blogs">View all <SolarIcon name="arrow-right" size={15} /></Link></div><div className="blog-related-grid co-grid">{related.map((item)=><article key={item.slug}><span>{item.number}</span><p>{item.category} · {item.readingTime}</p><h3>{item.title}</h3><Link className="co-inline-flex co-items-center" href={`/blogs/${item.slug}`}>Read note <SolarIcon name="arrow-right" size={15} /></Link></article>)}</div></section>
    <footer className="blogs-footer co-grid"><div><Link className="brand" href="/"><img src="/coordiation-logo-white.png" alt="" /><span>Coordiation</span><span className="brand-product">Journal</span></Link><p>Ideas, systems, and field notes for building products that matter to people.</p></div><nav aria-label="Journal footer"><Link href="/blogs">Journal</Link><Link href="/cookbook">Cookbook</Link><Link href="/components">Components</Link><Link href="/themes">Themes</Link><Link href="/docs">Documentation</Link></nav><div><a href="mailto:wiryosaputra@coordiation.com">wiryosaputra@coordiation.com</a><span>© 2026 Coordiation</span><a className="co-inline-flex co-items-center" href="#top">Back to top <SolarIcon name="arrow-up" size={14} /></a></div></footer>
  </main>;
}

