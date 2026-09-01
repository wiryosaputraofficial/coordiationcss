import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import SolarIcon from "@/app/_components/SolarIcon";
import ProfileDashboard from "./ProfileDashboard";
import "../discussions/discussions.css";
import "./profile.css";

export const metadata: Metadata = { title: { absolute: "Your discussion profile — Coordiation" }, robots: { index: false, follow: false } };

export default function ProfilePage() {
  return <main className="discussion-profile-page"><header className="discussion-auth-header co-flex co-items-center co-justify-between"><Link className="brand" href="/discussions"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Discussions</span></Link><Link className="discussion-back co-inline-flex co-items-center" href="/discussions"><SolarIcon name="arrow-left" size={15} />Back to discussions</Link></header><ProfileDashboard /></main>;
}
