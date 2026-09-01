import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import SolarIcon from "@/app/_components/SolarIcon";
import NewDiscussionForm from "./NewDiscussionForm";
import "../discussions.css";

export const metadata: Metadata = { title: { absolute: "Ask a question — Coordiation Discussions" }, description: "Ask the Coordiation community a clear, reproducible question.", robots: { index: false, follow: false } };

export default function NewDiscussionPage() {
  return <main className="discussion-create-page"><header className="discussion-auth-header co-flex co-items-center co-justify-between"><Link className="brand" href="/discussions"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Discussions</span></Link><Link className="discussion-back co-inline-flex co-items-center" href="/discussions"><SolarIcon name="close-circle" size={15} />Cancel</Link></header><section className="discussion-create-shell co-grid"><div className="discussion-create-intro"><p className="discussion-overline">NEW DISCUSSION</p><h1>Ask a question<br />people can answer.</h1><p>Clear context produces better answers. Describe the outcome, show what you tried, and include only the details needed to reproduce the problem.</p><ol><li><span>01</span><div><strong>Write a specific title</strong><p>Name the behavior and the context where it happens.</p></div></li><li><span>02</span><div><strong>Show what you tried</strong><p>Include the smallest useful example and current result.</p></div></li><li><span>03</span><div><strong>State the expected result</strong><p>Explain what a successful answer should help you achieve.</p></div></li></ol></div><NewDiscussionForm /></section></main>;
}

