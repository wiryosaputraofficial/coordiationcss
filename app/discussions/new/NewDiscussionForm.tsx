"use client";

import { useState, type FormEvent } from "react";
import SolarIcon from "@/app/_components/SolarIcon";
import { authClient } from "@/app/lib/auth-client";
import { discussionCategories } from "../discussion-data";

export default function NewDiscussionForm() {
  const { data: session, isPending } = authClient.useSession();
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/discussions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ title: form.get("title"), body: form.get("body"), category: form.get("category"), tags: String(form.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean) }) });
    if (response.status === 401) return window.location.assign("/login?returnTo=/discussions/new");
    if (!response.ok) return setMessage("The question could not be published. Check the fields and try again.");
    const discussion = await response.json() as { slug: string };
    window.location.assign(`/discussions/${discussion.slug}`);
  }

  if (!isPending && !session) return <section className="discussion-create-form discussion-signin-required"><SolarIcon name="lock-keyhole-minimalistic" size={28} /><h2>Sign in before asking</h2><p>Your account connects questions, replies, votes, and notifications to one trusted identity.</p><a href="/login?returnTo=/discussions/new">Continue to sign in <SolarIcon name="arrow-right" size={15} /></a></section>;

  return <form className="discussion-create-form" onSubmit={submit}><div><label htmlFor="discussion-title">Question title</label><input id="discussion-title" name="title" minLength={15} maxLength={140} placeholder="What is happening, and in which context?" required /><small>15–140 characters</small></div><div><label htmlFor="discussion-category">Category</label><select id="discussion-category" name="category" defaultValue="utilities-css" required>{discussionCategories.slice(1).map(([label,value])=><option value={value} key={value}>{label}</option>)}</select></div><div><label htmlFor="discussion-body">Details</label><textarea id="discussion-body" name="body" minLength={40} maxLength={8000} placeholder="Describe the outcome, current behavior, what you tried, and the result you expected." required /><small>Markdown is supported. Do not include secrets, private keys, or personal data.</small></div><div><label htmlFor="discussion-tags">Tags</label><input id="discussion-tags" name="tags" placeholder="responsive, vite, scanner" /><small>Up to five comma-separated tags</small></div><label className="discussion-guideline-check co-flex co-items-start"><input type="checkbox" required /><span>I have removed sensitive information and agree to keep this discussion respectful and relevant.</span></label><button type="submit" disabled={isPending}>Publish question <SolarIcon name="arrow-right" size={16} /></button><p role="status" aria-live="polite">{message}</p></form>;
}

