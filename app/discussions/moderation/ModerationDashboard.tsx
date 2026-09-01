"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "@/app/_components/SiteLink";
import SolarIcon from "@/app/_components/SolarIcon";
import { authClient } from "@/app/lib/auth-client";
import type { ModerationReport } from "@/app/lib/discussions";

export default function ModerationDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const [reports, setReports] = useState<ModerationReport[]>([]);
  const [filter, setFilter] = useState<"open" | "all">("open");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const user = session?.user as ({ role?: string } | undefined);

  useEffect(() => {
    if (!session) return;
    fetch("/api/discussions/moderation")
      .then(async (response) => {
        if (!response.ok) throw new Error(response.status === 403 ? "Administrator access is required." : "Reports could not be loaded.");
        return await response.json() as ModerationReport[];
      })
      .then(setReports)
      .catch((error: Error) => setMessage(error.message))
      .finally(() => setLoading(false));
  }, [session]);

  async function update(id: string, status: "reviewed" | "dismissed") {
    const response = await fetch("/api/discussions/moderation", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, status }) });
    if (!response.ok) return setMessage("The report could not be updated.");
    setReports((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    setMessage(`Report marked ${status}.`);
  }

  const visible = useMemo(() => filter === "open" ? reports.filter((item) => item.status === "open") : reports, [filter, reports]);
  if (isPending) return <div className="discussion-moderation-state">Checking administrator access…</div>;
  if (!session) return <div className="discussion-moderation-state"><SolarIcon name="lock-keyhole-minimalistic" size={28} /><h1>Sign in required</h1><p>Only the Coordiation administrator can review reports.</p><Link href="/login?returnTo=/discussions/moderation">Continue to sign in <SolarIcon name="arrow-right" size={15} /></Link></div>;
  if (user?.role !== "administrator" && message) return <div className="discussion-moderation-state"><SolarIcon name="shield-warning" size={28} /><h1>Administrator access required</h1><p>{message}</p><Link href="/discussions">Back to discussions <SolarIcon name="arrow-right" size={15} /></Link></div>;

  return <section className="discussion-moderation-shell">
    <header><div><p className="discussion-overline">ADMINISTRATION</p><h1>Moderation queue</h1><p>Review reports submitted by real members and close the loop on every item.</p></div><div className="discussion-moderation-tabs"><button className={filter === "open" ? "is-active" : ""} type="button" onClick={() => setFilter("open")}>Open <b>{reports.filter((item) => item.status === "open").length}</b></button><button className={filter === "all" ? "is-active" : ""} type="button" onClick={() => setFilter("all")}>All <b>{reports.length}</b></button></div></header>
    <p className="discussion-moderation-message" role="status" aria-live="polite">{message}</p>
    {loading ? <div className="discussion-moderation-empty">Loading reports…</div> : visible.length ? <div className="discussion-report-list">{visible.map((report) => <article key={report.id}>
      <div className="discussion-report-meta"><b>{report.status}</b><span>{report.targetType}</span><time dateTime={report.createdAt}>{new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(report.createdAt))}</time></div>
      <h2>{report.discussionTitle || "Content no longer available"}</h2><p>{report.reason}</p><small>Reported by {report.reporterName}</small>
      <footer>{report.discussionSlug && <Link href={`/discussions/${report.discussionSlug}${report.targetType === "reply" ? `#${report.targetId}` : ""}`}>Open content <SolarIcon name="arrow-to-top-right" size={14} /></Link>}{report.status === "open" && <><button type="button" onClick={() => update(report.id, "reviewed")}>Mark reviewed <SolarIcon name="check-circle" size={14} /></button><button type="button" onClick={() => update(report.id, "dismissed")}>Dismiss <SolarIcon name="close-circle" size={14} /></button></>}</footer>
    </article>)}</div> : <div className="discussion-moderation-empty"><SolarIcon name="check-circle" size={28} /><h2>No {filter === "open" ? "open " : ""}reports</h2><p>The queue reflects live reports only. Nothing is pre-filled.</p></div>}
  </section>;
}
