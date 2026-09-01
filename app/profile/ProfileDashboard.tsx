"use client";

import { useEffect, useState } from "react";
import Link from "@/app/_components/SiteLink";
import SolarIcon from "@/app/_components/SolarIcon";
import { authClient } from "@/app/lib/auth-client";

type ReputationItem = {
  key: string;
  label: string;
  count: number;
  pointsEach: number;
  points: number;
};

type ProfileActivity = {
  kind: "question" | "reply";
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  createdAt: string;
};

type ProfileStats = {
  questions: number;
  replies: number;
  accepted: number;
  reputation: number;
  reputationBreakdown: ReputationItem[];
  activity: ProfileActivity[];
  username: string | null;
  role: "administrator" | "member";
  joinedAt: string | null;
};

function formatDate(value: string | null) {
  if (!value) return "New member";
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

export default function ProfileDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [profilePending, setProfilePending] = useState(true);

  useEffect(() => {
    if (!session) return;
    fetch("/api/discussions/profile")
      .then((response) => response.ok ? response.json() : null)
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setProfilePending(false));
  }, [session]);

  if (isPending) return <div className="discussion-profile-loading">Loading your profile…</div>;
  if (!session) return <section className="discussion-profile-empty"><SolarIcon name="user-circle" size={34} /><h1>Your community profile</h1><p>Sign in to see your questions, replies, followed discussions, and reputation.</p><Link href="/login?returnTo=/profile">Sign in to continue <SolarIcon name="arrow-right" size={15} /></Link></section>;

  const initials = session.user.name?.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "CO";
  const user = session.user as typeof session.user & { username?: string; role?: string };
  const username = stats?.username || user.username;
  const role = stats?.role || (user.role === "administrator" ? "administrator" : "member");

  return <section className="discussion-profile-shell co-grid">
    <aside className="discussion-profile-identity">
      {session.user.image ? <img className="discussion-profile-avatar" src={session.user.image} alt="" /> : <span className="discussion-profile-avatar">{initials}</span>}
      <h1>{session.user.name || "Coordiation member"}</h1>
      {username && <p className="discussion-profile-username">@{username}</p>}
      <p>{session.user.email}</p>
      <b className={role === "administrator" ? "is-administrator" : ""}>{role === "administrator" ? "Administrator" : "Member"}</b>
      <dl className="discussion-profile-membership"><div><dt>Joined</dt><dd>{formatDate(stats?.joinedAt || null)}</dd></div><div><dt>Account</dt><dd>GitHub connected</dd></div></dl>
      <button type="button" onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => window.location.assign("/discussions") } })}>Sign out</button>
    </aside>

    <div className="discussion-profile-content">
      <p className="discussion-overline">YOUR COMMUNITY PROFILE</p>
      <div className="discussion-profile-heading"><h2>Keep useful knowledge moving.</h2><Link href="/discussions/new">Ask a question <SolarIcon name="arrow-right" size={15} /></Link></div>

      <div className="discussion-profile-stats co-grid" aria-busy={profilePending}>
        <article><strong>{stats?.questions ?? "—"}</strong><span>Questions</span></article>
        <article><strong>{stats?.replies ?? "—"}</strong><span>Answers</span></article>
        <article><strong>{stats?.accepted ?? "—"}</strong><span>Accepted answers</span></article>
        <article className="is-reputation"><strong>{stats?.reputation ?? "—"}</strong><span>Reputation</span></article>
      </div>

      <section className="discussion-reputation-panel" aria-labelledby="reputation-title">
        <header><div><p className="discussion-overline">REPUTATION EXPLAINED</p><h3 id="reputation-title">Points come from useful participation.</h3></div><div><strong>{stats?.reputation ?? "—"}</strong><span>TOTAL POINTS</span></div></header>
        <p>Reputation is calculated from public contributions and the community response to them. It is not purchased and administrator status does not add points.</p>
        <div className="discussion-reputation-grid">
          {(stats?.reputationBreakdown || []).map((item) => <article key={item.key}><div><span>{item.label}</span><small>{item.count} × {item.pointsEach} points</small></div><strong>+{item.points}</strong></article>)}
          {!stats && <p className="discussion-profile-loading-copy">Calculating your reputation…</p>}
        </div>
      </section>

      <section className="discussion-profile-posts" aria-labelledby="activity-title">
        <header><div><p className="discussion-overline">POSTING HISTORY</p><h3 id="activity-title">Where you have contributed</h3></div><span>{stats?.activity.length ?? 0} recent posts</span></header>
        {stats?.activity.length ? <ul className="discussion-profile-activity">{stats.activity.map((item, index) => <li key={`${item.kind}-${item.slug}-${index}`}>
          <span className="discussion-profile-activity-icon"><SolarIcon name={item.kind === "question" ? "question-circle" : "chat-round-line"} size={18} /></span>
          <div><div className="discussion-profile-activity-meta"><b>{item.kind === "question" ? "Question" : "Answer"}</b><span>{item.category.replaceAll("-", " ")}</span><time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time></div><Link href={`/discussions/${item.slug}`}>{item.title}</Link><p>{item.excerpt}</p></div>
          <SolarIcon name="arrow-right" size={16} />
        </li>)}</ul> : <div className="discussion-profile-no-posts"><SolarIcon name="chat-round-line" size={24} /><h4>No posts yet</h4><p>Your questions and answers will appear here after you join a discussion.</p><Link href="/discussions">Browse discussions <SolarIcon name="arrow-right" size={14} /></Link></div>}
      </section>
    </div>
  </section>;
}
