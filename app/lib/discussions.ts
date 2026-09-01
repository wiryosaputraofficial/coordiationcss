import { randomUUID } from "node:crypto";
import { hasDatabase, query, transaction } from "./database";
import { discussionCategories, getSeedDiscussion, seedDiscussions, seedReplies, type Discussion, type DiscussionReply } from "@/app/discussions/discussion-data";

type DiscussionRow = {
  id: string; slug: string; title: string; body: string; category: string; tags: string[];
  author_user_id: string; author_name: string; created_at: Date; updated_at: Date;
  status: string; accepted_reply_id: string | null; views: number; votes: string; replies: string;
};

type ReplyRow = {
  id: string; discussion_slug: string; author_user_id: string; author_name: string;
  body: string; created_at: Date; votes: string; accepted: boolean;
};

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function relativeTime(date: Date) {
  const minutes = Math.max(1, Math.round((Date.now() - date.getTime()) / 60_000));
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.round(hours / 24);
  return `${days} days ago`;
}

function discussionFromRow(row: DiscussionRow): Discussion {
  const paragraphs = row.body.split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean);
  const seed = getSeedDiscussion(row.slug);
  const categoryLabel = discussionCategories.find(([, slug]) => slug === row.category)?.[0] || row.category;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: paragraphs[0]?.slice(0, 220) || row.title,
    body: paragraphs,
    category: categoryLabel,
    tags: row.tags,
    author: { id: row.author_user_id, name: row.author_name, initials: initials(row.author_name), reputation: 0 },
    createdAt: row.created_at.toISOString(),
    updatedLabel: relativeTime(row.updated_at),
    votes: Number(row.votes) + (seed?.votes || 0),
    replies: Number(row.replies) + (seed?.replies || 0),
    views: row.views + (seed?.views || 0),
    solved: row.status === "solved",
    status: row.status as Discussion["status"],
  };
}

function replyFromRow(row: ReplyRow): DiscussionReply {
  return {
    id: row.id,
    discussionSlug: row.discussion_slug,
    author: { id: row.author_user_id, name: row.author_name, initials: initials(row.author_name), reputation: 0 },
    createdAt: relativeTime(row.created_at),
    body: row.body.split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean),
    votes: Number(row.votes),
    accepted: row.accepted,
  };
}

const baseSelect = `SELECT d.*, u.name AS author_name,
  COALESCE((SELECT SUM(value) FROM discussion_votes v WHERE v.target_type = 'discussion' AND v.target_id = d.slug), 0)::text AS votes,
  COALESCE((SELECT COUNT(*) FROM discussion_replies r WHERE r.discussion_id = d.id AND r.status = 'visible'), 0)::text AS replies
  FROM discussions d JOIN "user" u ON u.id = d.author_user_id`;

export async function listDiscussions(): Promise<Discussion[]> {
  if (!hasDatabase()) return seedDiscussions;
  try {
    const result = await query<DiscussionRow>(`${baseSelect} WHERE d.status <> 'hidden' ORDER BY d.updated_at DESC LIMIT 100`);
    const databaseDiscussions = result.rows.map(discussionFromRow);
    const databaseSlugs = new Set(databaseDiscussions.map((discussion) => discussion.slug));
    return [...databaseDiscussions, ...seedDiscussions.filter((discussion) => !databaseSlugs.has(discussion.slug))];
  } catch {
    return seedDiscussions;
  }
}

export async function getDiscussion(slug: string): Promise<Discussion | undefined> {
  if (hasDatabase()) {
    try {
      const result = await query<DiscussionRow>(`${baseSelect} WHERE d.slug = $1 AND d.status <> 'hidden' LIMIT 1`, [slug]);
      if (result.rows[0]) return discussionFromRow(result.rows[0]);
    } catch {
      // The seed registry keeps public reading available during local setup and database maintenance.
    }
  }
  return getSeedDiscussion(slug);
}

export async function getDiscussionReplies(slug: string): Promise<DiscussionReply[]> {
  const seeded = seedReplies.filter((reply) => reply.discussionSlug === slug);
  if (!hasDatabase()) return seeded;
  try {
    const result = await query<ReplyRow>(`SELECT r.id, d.slug AS discussion_slug, r.author_user_id, u.name AS author_name, r.body, r.created_at,
      COALESCE((SELECT SUM(value) FROM discussion_votes v WHERE v.target_type = 'reply' AND v.target_id = r.id), 0)::text AS votes,
      (d.accepted_reply_id = r.id) AS accepted
      FROM discussion_replies r JOIN discussions d ON d.id = r.discussion_id JOIN "user" u ON u.id = r.author_user_id
      WHERE d.slug = $1 AND r.status = 'visible' ORDER BY r.created_at`, [slug]);
    return [...seeded, ...result.rows.map(replyFromRow)];
  } catch {
    return seeded;
  }
}

export function validCategory(value: string) {
  return discussionCategories.slice(1).some(([, slug]) => slug === value);
}

export async function createDiscussion(input: { title: string; body: string; category: string; tags: string[]; userId: string }) {
  const slugBase = input.title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 68) || "question";
  const slug = `${slugBase}-${randomUUID().slice(0, 7)}`;
  const id = randomUUID();
  await query(`INSERT INTO discussions (id, slug, title, body, category, tags, author_user_id) VALUES ($1,$2,$3,$4,$5,$6,$7)`, [id, slug, input.title, input.body, input.category, input.tags, input.userId]);
  return { id, slug };
}

async function ensureSeedPersisted(slug: string) {
  const seed = getSeedDiscussion(slug);
  if (!seed) return undefined;
  const seedUserId = `seed-user-${slug}`;
  const discussionId = `seed-discussion-${slug}`;
  await transaction(async (client) => {
    await client.query(`INSERT INTO "user" ("id","name","email","emailVerified","createdAt","updatedAt") VALUES ($1,$2,$3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) ON CONFLICT ("id") DO NOTHING`, [seedUserId, seed.author.name, `${seedUserId}@coordiation.invalid`]);
    await client.query(`INSERT INTO discussions (id,slug,title,body,category,tags,author_user_id,status,views,created_at,updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,0,$9,$9) ON CONFLICT (slug) DO NOTHING`, [discussionId, slug, seed.title, seed.body.join("\n\n"), discussionCategories.find(([, value]) => value !== "all" && seed.category.toLowerCase().includes(String(value).split("-")[0]))?.[1] || "getting-started", seed.tags, seedUserId, seed.solved ? "solved" : "open", seed.createdAt]);
  });
  return discussionId;
}

export async function createReply(slug: string, body: string, userId: string) {
  const id = randomUUID();
  let result = await query<{ discussion_id: string }>("SELECT id AS discussion_id FROM discussions WHERE slug = $1 AND status IN ('open','solved')", [slug]);
  if (!result.rows[0] && getSeedDiscussion(slug)) {
    await ensureSeedPersisted(slug);
    result = await query<{ discussion_id: string }>("SELECT id AS discussion_id FROM discussions WHERE slug = $1 AND status IN ('open','solved')", [slug]);
  }
  const discussionId = result.rows[0]?.discussion_id;
  if (!discussionId) return undefined;
  await transaction(async (client) => {
    await client.query("INSERT INTO discussion_replies (id, discussion_id, author_user_id, body) VALUES ($1,$2,$3,$4)", [id, discussionId, userId, body]);
    await client.query("UPDATE discussions SET updated_at = CURRENT_TIMESTAMP WHERE id = $1", [discussionId]);
  });
  const reply = await query<ReplyRow>(`SELECT r.id, d.slug AS discussion_slug, r.author_user_id, u.name AS author_name, r.body, r.created_at, '0' AS votes, false AS accepted FROM discussion_replies r JOIN discussions d ON d.id=r.discussion_id JOIN "user" u ON u.id=r.author_user_id WHERE r.id=$1`, [id]);
  return reply.rows[0] ? replyFromRow(reply.rows[0]) : undefined;
}

export async function toggleVote(userId: string, targetType: "discussion" | "reply", targetId: string) {
  await query(`INSERT INTO discussion_votes (user_id,target_type,target_id,value) VALUES ($1,$2,$3,1)
    ON CONFLICT (user_id,target_type,target_id) DO UPDATE SET value = CASE WHEN discussion_votes.value = 1 THEN -1 ELSE 1 END`, [userId, targetType, targetId]);
  const result = await query<{ total: string }>("SELECT COALESCE(SUM(value),0)::text AS total FROM discussion_votes WHERE target_type=$1 AND target_id=$2", [targetType, targetId]);
  const seedBase = targetType === "discussion" ? (getSeedDiscussion(targetId)?.votes || 0) : (seedReplies.find((reply) => reply.id === targetId)?.votes || 0);
  return seedBase + Number(result.rows[0]?.total || 0);
}

export async function toggleFollow(userId: string, slug: string) {
  const deleted = await query("DELETE FROM discussion_follows WHERE user_id=$1 AND discussion_slug=$2 RETURNING user_id", [userId, slug]);
  if (deleted.rowCount) return false;
  await query("INSERT INTO discussion_follows (user_id,discussion_slug) VALUES ($1,$2)", [userId, slug]);
  return true;
}

export async function reportTarget(userId: string, targetType: "discussion" | "reply", targetId: string, reason: string) {
  await query("INSERT INTO discussion_reports (id,reporter_user_id,target_type,target_id,reason) VALUES ($1,$2,$3,$4,$5)", [randomUUID(), userId, targetType, targetId, reason]);
}

export async function solveDiscussion(slug: string, replyId: string, userId: string, administrator: boolean) {
  if (getSeedDiscussion(slug)) await ensureSeedPersisted(slug);
  const result = await query<{ id: string; author_user_id: string }>("SELECT id,author_user_id FROM discussions WHERE slug=$1", [slug]);
  const discussion = result.rows[0];
  if (!discussion || (!administrator && discussion.author_user_id !== userId)) return false;
  const reply = await query("SELECT id FROM discussion_replies WHERE id=$1 AND discussion_id=$2", [replyId, discussion.id]);
  if (!reply.rowCount && !seedReplies.some((item) => item.id === replyId && item.discussionSlug === slug)) return false;
  await query("UPDATE discussions SET status='solved',accepted_reply_id=$1,updated_at=CURRENT_TIMESTAMP WHERE id=$2", [replyId, discussion.id]);
  return true;
}

export async function moderateDiscussion(slug: string, status: "open" | "closed" | "hidden", moderatorId: string, note: string) {
  await transaction(async (client) => {
    const result = await client.query<{ id: string }>("UPDATE discussions SET status=$1,updated_at=CURRENT_TIMESTAMP WHERE slug=$2 RETURNING id", [status, slug]);
    if (!result.rows[0]) throw new Error("Discussion not found");
    await client.query("INSERT INTO discussion_moderation_log (id,moderator_user_id,discussion_id,action,note) VALUES ($1,$2,$3,$4,$5)", [randomUUID(), moderatorId, result.rows[0].id, status, note]);
  });
}
