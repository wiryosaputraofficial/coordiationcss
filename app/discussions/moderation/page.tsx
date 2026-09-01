import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import SolarIcon from "@/app/_components/SolarIcon";
import ModerationDashboard from "./ModerationDashboard";
import "../discussions.css";

export const metadata: Metadata = { title: { absolute: "Moderation queue — Coordiation Discussions" }, robots: { index: false, follow: false } };

export default function ModerationPage() {
  return <main className="discussion-moderation-page"><header className="discussion-auth-header co-flex co-items-center co-justify-between"><Link className="brand" href="/discussions"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Discussions</span></Link><Link className="discussion-back co-inline-flex co-items-center" href="/profile"><SolarIcon name="arrow-left" size={15} />Back to profile</Link></header><ModerationDashboard /></main>;
}
