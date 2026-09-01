"use client";

import { useState, type FormEvent } from "react";
import Link from "@/app/_components/SiteLink";
import SolarIcon from "@/app/_components/SolarIcon";
import { authClient } from "@/app/lib/auth-client";
import type { Discussion, DiscussionReply } from "../discussion-data";

export default function DiscussionThread({ initialDiscussion, initialReplies }: { initialDiscussion: Discussion; initialReplies: DiscussionReply[] }) {
  const { data: session } = authClient.useSession();
  const [discussionVotes, setDiscussionVotes] = useState(initialDiscussion.votes);
  const [replies, setReplies] = useState(initialReplies);
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [following, setFollowing] = useState(false);
  const [solved, setSolved] = useState(initialDiscussion.solved);
  const isOwner = Boolean(session?.user.id && initialDiscussion.author.id === session.user.id);
  const sessionUser = session?.user as (typeof session.user & { username?: string; role?: string }) | undefined;
  const isModerator = sessionUser?.role === "administrator" || sessionUser?.username?.toLowerCase() === "wiryosaputraofficial" || sessionUser?.email?.toLowerCase() === "wiryosaputra@coordiation.com";

  async function vote(targetType: "discussion" | "reply", targetId: string) {
    if (!session) return window.location.assign(`/login?returnTo=/discussions/${initialDiscussion.slug}`);
    const response = await fetch("/api/discussions/vote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ targetType, targetId }) });
    if (!response.ok) return setMessage("Your vote could not be saved.");
    const { votes } = await response.json() as { votes: number };
    if (targetType === "discussion") setDiscussionVotes(votes);
    else setReplies((items) => items.map((reply) => reply.id === targetId ? { ...reply, votes } : reply));
  }

  async function follow() {
    if (!session) return window.location.assign(`/login?returnTo=/discussions/${initialDiscussion.slug}`);
    const response = await fetch(`/api/discussions/${initialDiscussion.slug}/follow`, { method: "POST" });
    if (response.ok) setFollowing((await response.json() as { following: boolean }).following);
  }

  async function report(targetType: "discussion" | "reply", targetId: string) {
    if (!session) return window.location.assign(`/login?returnTo=/discussions/${initialDiscussion.slug}`);
    const reason = window.prompt("Briefly explain why this content should be reviewed:");
    if (!reason) return;
    const response = await fetch("/api/discussions/report", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ targetType, targetId, reason }) });
    setMessage(response.ok ? "Report sent to the moderation queue." : "The report could not be sent.");
  }

  async function accept(replyId: string) {
    const response = await fetch(`/api/discussions/${initialDiscussion.slug}/solve`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ replyId }) });
    if (!response.ok) return setMessage("This answer could not be accepted.");
    setSolved(true);
    setReplies((items) => items.map((reply) => ({ ...reply, accepted: reply.id === replyId })));
    setMessage("Answer accepted and question marked as solved.");
  }

  async function moderate(status: "open" | "closed" | "hidden") {
    const response = await fetch(`/api/discussions/${initialDiscussion.slug}/moderate`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ status, note: "Updated from the discussion moderation controls." }) });
    if (!response.ok) return setMessage("Moderation action failed.");
    if (status === "hidden") window.location.assign("/discussions");
    else setMessage(`Discussion status changed to ${status}.`);
  }

  async function submitReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return window.location.assign(`/login?returnTo=/discussions/${initialDiscussion.slug}#reply`);
    if (body.trim().length < 20) return setMessage("Please add enough context for a useful reply (at least 20 characters).");
    const response = await fetch(`/api/discussions/${initialDiscussion.slug}/replies`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ body }) });
    if (!response.ok) return setMessage("Your reply could not be published. Please try again.");
    const reply = await response.json() as DiscussionReply;
    setReplies((items) => [...items, reply]);
    setBody("");
    setMessage("Reply published.");
  }

  return <>
    <article className="discussion-question-layout co-grid">
      <aside className="discussion-question-votes"><button type="button" onClick={() => vote("discussion", initialDiscussion.slug)} aria-label="Upvote this question"><SolarIcon name="alt-arrow-up" size={19} /></button><strong>{discussionVotes}</strong><span>VOTES</span><button type="button" onClick={follow} aria-pressed={following} aria-label="Follow this discussion"><SolarIcon name={following ? "bookmark" : "bookmark-square-minimalistic"} size={18} /></button></aside>
      <div className="discussion-question-main">
        <div className="discussion-question-status co-flex co-items-center">{solved ? <span><SolarIcon name="check-circle" size={14} />SOLVED</span> : <span className="is-open">{initialDiscussion.status === "closed" ? "CLOSED" : "OPEN QUESTION"}</span>}<b>{initialDiscussion.category}</b><small>Asked {initialDiscussion.updatedLabel}</small></div>
        <h1>{initialDiscussion.title}</h1>
        <div className="discussion-question-author co-flex co-items-center"><span>{initialDiscussion.author.initials}</span><p><strong>{initialDiscussion.author.name}</strong><small>{initialDiscussion.author.reputation} reputation</small></p></div>
        <div className="discussion-question-body">{initialDiscussion.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className="discussion-question-footer co-flex co-items-center co-justify-between"><div className="discussion-tags">{initialDiscussion.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div><button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)}><SolarIcon name="share" size={14} />Share</button><button type="button" onClick={() => report("discussion", initialDiscussion.slug)}><SolarIcon name="danger-triangle" size={14} />Report</button>{isModerator && <><button type="button" onClick={() => moderate("closed")}>Close</button><button type="button" onClick={() => moderate("hidden")}>Hide</button></>}</div></div>
      </div>
      <aside className="discussion-thread-aside"><div><span>QUESTION ACTIVITY</span><dl><div><dt>Replies</dt><dd>{Math.max(initialDiscussion.replies, replies.length)}</dd></div><div><dt>Views</dt><dd>{initialDiscussion.views}</dd></div><div><dt>Followers</dt><dd>14</dd></div></dl></div><div><span>NEED MORE CONTEXT?</span><p>Read the relevant guide before replying.</p><Link className="co-inline-flex co-items-center" href="/docs">Open documentation <SolarIcon name="arrow-right" size={14} /></Link></div></aside>
    </article>

    <section className="discussion-replies" aria-labelledby="replies-title"><div className="discussion-replies-heading co-flex co-items-end co-justify-between"><div><p className="discussion-overline">COMMUNITY ANSWERS</p><h2 id="replies-title">{Math.max(initialDiscussion.replies, replies.length)} replies</h2></div><span>OLDEST FIRST</span></div>{replies.map((reply) => <article className={`discussion-reply co-grid${reply.accepted ? " is-accepted" : ""}`} key={reply.id}><aside><button type="button" onClick={() => vote("reply", reply.id)} aria-label="Upvote this answer"><SolarIcon name="alt-arrow-up" size={18} /></button><strong>{reply.votes}</strong><span>VOTES</span></aside><div>{reply.accepted && <p className="discussion-accepted-label co-inline-flex co-items-center"><SolarIcon name="check-circle" size={15} />ACCEPTED ANSWER</p>}<div className="discussion-reply-author co-flex co-items-center"><span>{reply.author.initials}</span><p><strong>{reply.author.name}</strong>{reply.author.role && <b>{reply.author.role}</b>}<small>{reply.author.reputation} reputation · {reply.createdAt}</small></p></div><div className="discussion-reply-body">{reply.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><footer><button type="button" onClick={() => navigator.clipboard?.writeText(`${window.location.href}#${reply.id}`)}><SolarIcon name="share" size={13} />Share</button><button type="button" onClick={() => report("reply", reply.id)}><SolarIcon name="danger-triangle" size={13} />Report</button>{(isOwner || isModerator) && !reply.accepted && <button type="button" onClick={() => accept(reply.id)}><SolarIcon name="check-circle" size={13} />Accept answer</button>}</footer></div></article>)}</section>

    <section className="discussion-reply-editor" id="reply"><div><p className="discussion-overline">YOUR ANSWER</p><h2>Add what you know.</h2><p>Explain the decision, include a reproducible example when relevant, and keep the answer focused on the question.</p></div><form onSubmit={submitReply}><label htmlFor="discussion-reply-body">Reply</label><textarea id="discussion-reply-body" value={body} onChange={(event) => setBody(event.target.value)} placeholder={session ? "Write a useful answer…" : "Sign in to add an answer"} disabled={!session} minLength={20} required /><div className="co-flex co-items-center co-justify-between"><span>{body.length} / 8,000</span>{session ? <button type="submit">Publish reply <SolarIcon name="arrow-right" size={15} /></button> : <Link href={`/login?returnTo=/discussions/${initialDiscussion.slug}#reply`}>Sign in to reply <SolarIcon name="arrow-right" size={15} /></Link>}</div><p role="status" aria-live="polite">{message}</p></form></section>
  </>;
}
