import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import MobileNav from "@/app/_components/MobileNav";
import SolarIcon from "@/app/_components/SolarIcon";
import DiscussionAccountLink from "../DiscussionAccountLink";
import { createSeoMetadata } from "@/app/seo";
import "../discussions.css";

export const metadata: Metadata = createSeoMetadata({
  path: "/discussions/guidelines",
  title: "Community guidelines — Coordiation Discussions",
  description: "The participation, privacy, reporting, and moderation rules for the Coordiation community forum.",
});

const guidelines = [
  ["Ask with useful context", "Describe the goal, current behavior, what you already tried, and the result you expected. Include the smallest reproducible example when code is relevant."],
  ["Answer the question asked", "Explain the decision and its trade-offs. Link to relevant Coordiation documentation when it helps, and clearly label assumptions or unverified workarounds."],
  ["Protect private information", "Remove passwords, tokens, private keys, personal data, internal URLs, and customer information before publishing. Public discussions may be indexed by search engines."],
  ["Treat people with respect", "Challenge an idea without attacking its author. Harassment, discrimination, spam, impersonation, and deliberately misleading content are not accepted."],
  ["Use reporting responsibly", "Report content only when it needs moderator review. Include a concrete reason so the administrator can understand and resolve the issue efficiently."],
  ["Keep the knowledge accurate", "Update the thread when the issue changes, accept the answer that solved it, and avoid posting generated claims that you have not checked."],
] as const;

export default function DiscussionGuidelinesPage() {
  return <main className="discussion-guidelines-page" id="top">
    <header className="site-header discussions-header">
      <Link className="brand" href="/" aria-label="Coordiation home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Discussions</span></Link>
      <nav aria-label="Discussion navigation"><Link href="/discussions">Discussions</Link><Link href="/blogs">Blogs</Link><Link href="/docs">Docs</Link></nav>
      <MobileNav />
      <DiscussionAccountLink />
    </header>
    <section className="discussion-policy-hero">
      <p className="discussion-overline"><span>CO</span> COMMUNITY STANDARD</p>
      <h1>Useful knowledge<br />needs clear rules.</h1>
      <p>These guidelines apply to every question, answer, vote, follow, and report in Coordiation Discussions.</p>
      <div><Link href="/discussions/new">Ask a question <SolarIcon name="arrow-right" size={15} /></Link><Link href="/discussions">Browse discussions <SolarIcon name="chat-round-line" size={15} /></Link></div>
    </section>
    <section className="discussion-policy-grid">
      {guidelines.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><SolarIcon name={index === 2 ? "lock-keyhole-minimalistic" : index === 3 ? "users-group-rounded" : index === 4 ? "shield-warning" : "check-circle"} size={22} /><h2>{title}</h2><p>{body}</p></article>)}
    </section>
    <section className="discussion-policy-enforcement">
      <div><p className="discussion-overline">MODERATION</p><h2>What happens after a report?</h2></div>
      <ol><li><b>01</b><span>The administrator reviews the exact content and the reporter&apos;s reason.</span></li><li><b>02</b><span>The report is marked reviewed or dismissed, creating a visible moderation state.</span></li><li><b>03</b><span>When needed, a thread can be closed, reopened, or hidden with an audit entry.</span></li></ol>
      <p>Questions about these rules can be sent to <a href="mailto:wiryosaputra@coordiation.com">wiryosaputra@coordiation.com</a>.</p>
    </section>
    <footer className="discussions-footer co-flex co-items-center co-justify-between"><span>© 2026 Coordiation Discussions</span><nav><Link href="/discussions">Discussions</Link><Link href="/docs">Documentation</Link><a href="mailto:wiryosaputra@coordiation.com">Contact</a></nav><a className="co-inline-flex co-items-center" href="#top">Back to top <SolarIcon name="arrow-up" size={14} /></a></footer>
  </main>;
}
