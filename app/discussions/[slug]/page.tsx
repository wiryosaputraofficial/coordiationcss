import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/_components/SiteLink";
import MobileNav from "@/app/_components/MobileNav";
import SolarIcon from "@/app/_components/SolarIcon";
import { SITE_NAME, SITE_URL } from "@/app/seo";
import { seedDiscussions } from "../discussion-data";
import { getDiscussion, getDiscussionReplies } from "@/app/lib/discussions";
import DiscussionThread from "./DiscussionThread";
import "../discussions.css";

export function generateStaticParams() {
  return seedDiscussions.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const discussion = await getDiscussion(slug);
  if (!discussion) return { title: "Discussion not found", robots: { index: false, follow: false } };
  const title = `${discussion.title} — Coordiation Discussions`;
  const url = `${SITE_URL}/discussions/${discussion.slug}`;
  return { title: { absolute: title }, description: discussion.excerpt, alternates: { canonical: url }, openGraph: { title, description: discussion.excerpt, url, siteName: SITE_NAME, type: "article", images: [] }, twitter: { card: "summary", title, description: discussion.excerpt, images: [] } };
}

export default async function DiscussionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const discussion = await getDiscussion(slug);
  if (!discussion) notFound();
  const replies = await getDiscussionReplies(slug);
  const jsonLd = { "@context": "https://schema.org", "@type": "QAPage", mainEntity: { "@type": "Question", name: discussion.title, text: discussion.body.join("\n\n"), answerCount: discussion.replies, upvoteCount: discussion.votes, dateCreated: discussion.createdAt, author: { "@type": "Person", name: discussion.author.name }, acceptedAnswer: replies.find((reply) => reply.accepted) ? { "@type": "Answer", text: replies.find((reply) => reply.accepted)!.body.join("\n\n"), upvoteCount: replies.find((reply) => reply.accepted)!.votes, author: { "@type": "Person", name: replies.find((reply) => reply.accepted)!.author.name } } : undefined } };

  return <main className="discussion-detail-page" id="top">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <header className="site-header discussions-header"><Link className="brand" href="/" aria-label="Coordiation home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Discussions</span></Link><nav aria-label="Discussion navigation"><Link href="/discussions">All discussions</Link><Link href="/blogs">Blogs</Link><Link href="/docs">Docs</Link><Link href="/profile">Profile</Link></nav><MobileNav /><Link className="header-cta co-inline-flex co-items-center" href="/discussions/new">Ask a question <SolarIcon name="pen-new-round" size={15} /></Link></header>
    <div className="discussion-detail-breadcrumb co-flex co-items-center"><Link href="/discussions">Discussions</Link><SolarIcon name="alt-arrow-right" size={13} /><span>{discussion.category}</span><SolarIcon name="alt-arrow-right" size={13} /><b>Question {discussion.slug.slice(0, 8).toUpperCase()}</b></div>
    <DiscussionThread initialDiscussion={discussion} initialReplies={replies} />
  </main>;
}
