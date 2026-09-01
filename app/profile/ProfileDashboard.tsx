"use client";

import { useEffect, useState } from "react";
import Link from "@/app/_components/SiteLink";
import SolarIcon from "@/app/_components/SolarIcon";
import { authClient } from "@/app/lib/auth-client";

export default function ProfileDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const [stats, setStats] = useState<{ questions: number; replies: number; accepted: number; reputation: number; activity: { kind: string; title: string; slug: string }[] } | null>(null);
  useEffect(() => {
    if (!session) return;
    fetch("/api/discussions/profile").then((response) => response.ok ? response.json() : null).then(setStats).catch(() => setStats(null));
  }, [session]);
  if (isPending) return <div className="discussion-profile-loading">Loading your profile…</div>;
  if (!session) return <section className="discussion-profile-empty"><SolarIcon name="user-circle" size={34} /><h1>Your community profile</h1><p>Sign in to see your questions, replies, followed discussions, and reputation.</p><Link href="/login?returnTo=/profile">Sign in to continue <SolarIcon name="arrow-right" size={15} /></Link></section>;
  const initials = session.user.name?.split(/\s+/).map((part) => part[0]).join("").slice(0,2).toUpperCase() || "CO";
  return <section className="discussion-profile-shell co-grid"><aside><span>{initials}</span><h1>{session.user.name || "Coordiation member"}</h1><p>{session.user.email}</p><b>Member</b><button type="button" onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => window.location.assign("/discussions") } })}>Sign out</button></aside><div><p className="discussion-overline">YOUR ACTIVITY</p><h2>Keep useful knowledge moving.</h2><div className="discussion-profile-stats co-grid"><article><strong>{stats?.questions ?? "—"}</strong><span>Questions</span></article><article><strong>{stats?.replies ?? "—"}</strong><span>Replies</span></article><article><strong>{stats?.accepted ?? "—"}</strong><span>Accepted answers</span></article><article><strong>{stats?.reputation ?? "—"}</strong><span>Reputation</span></article></div><section><div className="co-flex co-items-center co-justify-between"><h3>Recent activity</h3><Link href="/discussions/new">Ask a question <SolarIcon name="arrow-right" size={14} /></Link></div>{stats?.activity.length ? <ul className="discussion-profile-activity">{stats.activity.map((item, index) => <li key={`${item.kind}-${item.slug}-${index}`}><span>{item.kind}</span><Link href={`/discussions/${item.slug}`}>{item.title}</Link></li>)}</ul> : <p>Your questions and replies will appear here after you join a discussion.</p>}</section></div></section>;
}
