"use client";

import { useMemo, useState } from "react";
import Link from "@/app/_components/SiteLink";
import SolarIcon from "@/app/_components/SolarIcon";
import { discussionCategories, type Discussion } from "./discussion-data";

export default function DiscussionBrowser({ discussions, initialCategory = "all" }: { discussions: Discussion[]; initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest");
  const visible = useMemo(() => {
    const categoryLabel = discussionCategories.find(([, value]) => value === initialCategory)?.[0];
    const filtered = discussions.filter((discussion) => (initialCategory === "all" || discussion.category === categoryLabel) && `${discussion.title} ${discussion.excerpt} ${discussion.category} ${discussion.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
    return [...filtered].sort((a, b) => sort === "votes" ? b.votes - a.votes : sort === "unanswered" ? a.replies - b.replies : b.createdAt.localeCompare(a.createdAt));
  }, [discussions, initialCategory, query, sort]);

  return <>
    <div className="discussion-toolbar co-grid">
      <label className="discussion-search co-flex co-items-center"><SolarIcon name="magnifier" size={17} /><span className="sr-only">Search discussions</span><input type="search" placeholder="Search questions, tags, or categories" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <label className="discussion-sort"><span className="sr-only">Sort discussions</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="latest">Latest activity</option><option value="votes">Most voted</option><option value="unanswered">Needs an answer</option></select><SolarIcon name="alt-arrow-down" size={14} /></label>
    </div>
    <div className="discussion-list" aria-live="polite">{visible.map((discussion) => <article className="discussion-row co-grid" key={discussion.slug}>
      <div className="discussion-vote-block"><strong>{discussion.votes}</strong><span>votes</span>{discussion.solved ? <b><SolarIcon name="check-circle" size={14} />Solved</b> : <small>{discussion.replies} replies</small>}</div>
      <div className="discussion-row-copy">{discussion.pinned && <span className="discussion-pinned co-inline-flex co-items-center"><SolarIcon name="pin" size={12} />PINNED</span>}<Link href={`/discussions/${discussion.slug}`}><h3>{discussion.title}</h3></Link><p>{discussion.excerpt}</p><div className="discussion-tags">{discussion.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      <div className="discussion-row-meta"><span className="discussion-avatar">{discussion.author.initials}</span><p><strong>{discussion.author.name}</strong><small>{discussion.updatedLabel}</small></p><dl><div><dt><SolarIcon name="chat-round-line" size={14} /></dt><dd>{discussion.replies}</dd></div><div><dt><SolarIcon name="eye" size={14} /></dt><dd>{discussion.views}</dd></div></dl></div>
    </article>)}</div>
    {!visible.length && <div className="discussion-empty"><SolarIcon name="magnifier" size={24} /><h3>No matching discussions</h3><p>Try a broader search or ask the first question about this topic.</p></div>}
  </>;
}
