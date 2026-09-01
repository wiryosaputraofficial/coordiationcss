import { randomUUID } from "node:crypto";
import { hasDatabase, query, transaction } from "./database";
import { discussionCategories, type Discussion, type DiscussionReply } from "@/app/discussions/discussion-data";

type DiscussionRow = {
  id: string; slug: string; title: string; body: string; category: string; tags: string[];
  author_user_id: string; author_name: string; author_username: string | null; author_role: string;
  author_reputation: string; created_at: Date; updated_at: Date; status: string;
  accepted_reply_id: string | null; views: number; votes: string; replies: string; followers: string;
};

type ReplyRow = {
  id: string; discussion_slug: string; author_user_id: string; author_name: string;
  author_username: string | null; author_role: string; author_reputation: string;
  body: string; created_at: Date; votes: string; accepted: boolean;
};

export type DiscussionContributor = {
  id: string;
  name: string;
  username: string | null;
  initials: string;
  reputation: number;
  questions: number;
  replies: number;
};

export type DiscussionOverview = {
  totalDiscussions: number;
  totalMembers: number;
  solvedPercentage: number;
  questionsThisWeek: number;
  solvedThisWeek: number;
  activeMembers: number;
  categoryCounts: Record<string, number>;
  contributors: DiscussionContributor[];
};

export type ModerationReport = {
  id: string;
  targetType: "discussion" | "reply";
  targetId: string;
  reason: string;
  status: "open" | "reviewed" | "dismissed";
  createdAt: string;
  reporterName: string;
  discussionSlug: string | null;
  discussionTitle: string | null;
};

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function relativeTime(date: Date) {
  const minutes = Math.max(1, Math.round((Date.now() - date.getTime()) / 60_000));
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function reputationSql(userIdExpression: string) {
  return `(2 * (SELECT COUNT(*) FROM discussions rq WHERE rq.author_user_id=${userIdExpression} AND rq.status <> 'hidden')
    + 5 * (SELECT COUNT(*) FROM discussion_replies rr WHERE rr.author_user_id=${userIdExpression} AND rr.status='visible')
    + 5 * COALESCE((SELECT SUM(rv.value) FROM discussion_votes rv JOIN discussions rvd ON rv.target_type='discussion' AND rv.target_id=rvd.slug WHERE rvd.author_user_id=${userIdExpression} AND rvd.status <> 'hidden'),0)
    + 10 * COALESCE((SELECT SUM(rv.value) FROM discussion_votes rv JOIN discussion_replies rvr ON rv.target_type='reply' AND rv.target_id=rvr.id WHERE rvr.author_user_id=${userIdExpression} AND rvr.status='visible'),0)
    + 25 * (SELECT COUNT(*) FROM discussion_replies ra JOIN discussions rad ON rad.accepted_reply_id=ra.id WHERE ra.author_user_id=${userIdExpression} AND ra.status='visible'))::text`;
}

function discussionFromRow(row: DiscussionRow): Discussion {
  const paragraphs = row.body.split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean);
  const categoryLabel = discussionCategories.find(([, slug]) => slug === row.category)?.[0] || row.category;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: paragraphs[0]?.slice(0, 220) || row.title,
    body: paragraphs,
    category: categoryLabel,
    tags: row.tags,
    author: {
      id: row.author_user_id,
      name: row.author_name,
      initials: initials(row.author_name),
      reputation: Math.max(0, Number(row.author_reputation)),
      username: row.author_username,
      role: row.author_role === "administrator" ? "Administrator" : undefined,
    },
    createdAt: row.created_at.toISOString(),
    updatedLabel: relativeTime(row.updated_at),
    votes: Math.max(0, Number(row.votes)),
    replies: Number(row.replies),
    views: row.views,
    followers: Number(row.followers),
    solved: row.status === "solved",
    status: row.status as Discussion["status"],
  };
}

function replyFromRow(row: ReplyRow): DiscussionReply {
  return {
    id: row.id,
    discussionSlug: row.discussion_slug,
    author: {
      id: row.author_user_id,
      name: row.author_name,
      initials: initials(row.author_name),
      reputation: Math.max(0, Number(row.author_reputation)),
      username: row.author_username,
      role: row.author_role === "administrator" ? "Administrator" : undefined,
    },
    createdAt: relativeTime(row.created_at),
    body: row.body.split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean),
    votes: Math.max(0, Number(row.votes)),
    accepted: row.accepted,
  };
}

const baseSelect = `SELECT d.*,u.name AS author_name,u.username AS author_username,u.role AS author_role,
  ${reputationSql("u.id")} AS author_reputation,
  COALESCE((SELECT SUM(value) FROM discussion_votes v WHERE v.target_type='discussion' AND v.target_id=d.slug),0)::text AS votes,
  COALESCE((SELECT COUNT(*) FROM discussion_replies r WHERE r.discussion_id=d.id AND r.status='visible'),0)::text AS replies,
  COALESCE((SELECT COUNT(*) FROM discussion_follows f WHERE f.discussion_slug=d.slug),0)::text AS followers
  FROM discussions d JOIN "user" u ON u.id=d.author_user_id`;

const emptyOverview: DiscussionOverview = {
  totalDiscussions: 0,
  totalMembers: 0,
  solvedPercentage: 0,
  questionsThisWeek: 0,
  solvedThisWeek: 0,
  activeMembers: 0,
  categoryCounts: {},
  contributors: [],
};

export async function listDiscussions(): Promise<Discussion[]> {
  if (!hasDatabase()) return [];
  try {
    const result = await query<DiscussionRow>(`${baseSelect} WHERE d.status <> 'hidden' ORDER BY d.updated_at DESC LIMIT 100`);
    return result.rows.map(discussionFromRow);
  } catch (error) {
    console.error("Unable to list discussions", error);
    return [];
  }
}

export async function getDiscussion(slug: string): Promise<Discussion | undefined> {
  if (!hasDatabase()) return undefined;
  try {
    const result = await query<DiscussionRow>(`${baseSelect} WHERE d.slug=$1 AND d.status <> 'hidden' LIMIT 1`, [slug]);
    return result.rows[0] ? discussionFromRow(result.rows[0]) : undefined;
  } catch (error) {
    console.error("Unable to load discussion", error);
    return undefined;
  }
}

export async function getDiscussionReplies(slug: string): Promise<DiscussionReply[]> {
  if (!hasDatabase()) return [];
  try {
    const result = await query<ReplyRow>(`SELECT r.id,d.slug AS discussion_slug,r.author_user_id,u.name AS author_name,u.username AS author_username,u.role AS author_role,
      ${reputationSql("u.id")} AS author_reputation,r.body,r.created_at,
      COALESCE((SELECT SUM(value) FROM discussion_votes v WHERE v.target_type='reply' AND v.target_id=r.id),0)::text AS votes,
      (d.accepted_reply_id=r.id) AS accepted
      FROM discussion_replies r JOIN discussions d ON d.id=r.discussion_id JOIN "user" u ON u.id=r.author_user_id
      WHERE d.slug=$1 AND r.status='visible' ORDER BY r.created_at`, [slug]);
    return result.rows.map(replyFromRow);
  } catch (error) {
    console.error("Unable to load discussion replies", error);
    return [];
  }
}

export async function getDiscussionOverview(): Promise<DiscussionOverview> {
  if (!hasDatabase()) return emptyOverview;
  try {
    const [summary, categories, contributors] = await Promise.all([
      query<{ total_discussions: string; total_members: string; solved: string; questions_this_week: string; solved_this_week: string; active_members: string }>(`SELECT
        (SELECT COUNT(*) FROM discussions WHERE status <> 'hidden')::text AS total_discussions,
        (SELECT COUNT(*) FROM "user")::text AS total_members,
        (SELECT COUNT(*) FROM discussions WHERE status='solved')::text AS solved,
        (SELECT COUNT(*) FROM discussions WHERE status <> 'hidden' AND created_at >= date_trunc('week',CURRENT_TIMESTAMP))::text AS questions_this_week,
        (SELECT COUNT(*) FROM discussions WHERE status='solved' AND updated_at >= date_trunc('week',CURRENT_TIMESTAMP))::text AS solved_this_week,
        (SELECT COUNT(DISTINCT member_id) FROM (
          SELECT author_user_id AS member_id FROM discussions WHERE created_at >= date_trunc('week',CURRENT_TIMESTAMP)
          UNION SELECT author_user_id FROM discussion_replies WHERE status='visible' AND created_at >= date_trunc('week',CURRENT_TIMESTAMP)
        ) active)::text AS active_members`),
      query<{ category: string; count: string }>("SELECT category,COUNT(*)::text AS count FROM discussions WHERE status <> 'hidden' GROUP BY category"),
      query<{ id: string; name: string; username: string | null; reputation: string; questions: string; replies: string }>(`SELECT * FROM (
        SELECT u.id,u.name,u.username,${reputationSql("u.id")} AS reputation,
          (SELECT COUNT(*) FROM discussions d WHERE d.author_user_id=u.id AND d.status <> 'hidden')::text AS questions,
          (SELECT COUNT(*) FROM discussion_replies r WHERE r.author_user_id=u.id AND r.status='visible')::text AS replies
        FROM "user" u
      ) contributors WHERE questions::integer + replies::integer > 0 ORDER BY reputation::integer DESC,name ASC LIMIT 5`),
    ]);
    const row = summary.rows[0];
    const totalDiscussions = Number(row?.total_discussions || 0);
    const solved = Number(row?.solved || 0);
    return {
      totalDiscussions,
      totalMembers: Number(row?.total_members || 0),
      solvedPercentage: totalDiscussions ? Math.round((solved / totalDiscussions) * 100) : 0,
      questionsThisWeek: Number(row?.questions_this_week || 0),
      solvedThisWeek: Number(row?.solved_this_week || 0),
      activeMembers: Number(row?.active_members || 0),
      categoryCounts: Object.fromEntries(categories.rows.map((item) => [item.category, Number(item.count)])),
      contributors: contributors.rows.map((item) => ({ id: item.id, name: item.name, username: item.username, initials: initials(item.name), reputation: Math.max(0, Number(item.reputation)), questions: Number(item.questions), replies: Number(item.replies) })),
    };
  } catch (error) {
    console.error("Unable to load discussion overview", error);
    return emptyOverview;
  }
}

export function validCategory(value: string) {
  return discussionCategories.slice(1).some(([, slug]) => slug === value);
}

export async function createDiscussion(input: { title: string; body: string; category: string; tags: string[]; userId: string }) {
  const slugBase = input.title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 68) || "question";
  const slug = `${slugBase}-${randomUUID().slice(0, 7)}`;
  const id = randomUUID();
  await query("INSERT INTO discussions (id,slug,title,body,category,tags,author_user_id) VALUES ($1,$2,$3,$4,$5,$6,$7)", [id, slug, input.title, input.body, input.category, input.tags, input.userId]);
  return { id, slug };
}

export async function createReply(slug: string, body: string, userId: string) {
  const id = randomUUID();
  const result = await query<{ discussion_id: string }>("SELECT id AS discussion_id FROM discussions WHERE slug=$1 AND status IN ('open','solved')", [slug]);
  const discussionId = result.rows[0]?.discussion_id;
  if (!discussionId) return undefined;
  await transaction(async (client) => {
    await client.query("INSERT INTO discussion_replies (id,discussion_id,author_user_id,body) VALUES ($1,$2,$3,$4)", [id, discussionId, userId, body]);
    await client.query("UPDATE discussions SET updated_at=CURRENT_TIMESTAMP WHERE id=$1", [discussionId]);
  });
  const reply = await query<ReplyRow>(`SELECT r.id,d.slug AS discussion_slug,r.author_user_id,u.name AS author_name,u.username AS author_username,u.role AS author_role,
    ${reputationSql("u.id")} AS author_reputation,r.body,r.created_at,'0' AS votes,false AS accepted
    FROM discussion_replies r JOIN discussions d ON d.id=r.discussion_id JOIN "user" u ON u.id=r.author_user_id WHERE r.id=$1`, [id]);
  return reply.rows[0] ? replyFromRow(reply.rows[0]) : undefined;
}

async function targetExists(targetType: "discussion" | "reply", targetId: string) {
  const result = targetType === "discussion"
    ? await query("SELECT 1 FROM discussions WHERE slug=$1 AND status <> 'hidden'", [targetId])
    : await query("SELECT 1 FROM discussion_replies WHERE id=$1 AND status='visible'", [targetId]);
  return Boolean(result.rowCount);
}

async function voteTotal(targetType: "discussion" | "reply", targetId: string) {
  const result = await query<{ total: string }>("SELECT COALESCE(SUM(value),0)::text AS total FROM discussion_votes WHERE target_type=$1 AND target_id=$2", [targetType, targetId]);
  return Math.max(0, Number(result.rows[0]?.total || 0));
}

export async function toggleVote(userId: string, targetType: "discussion" | "reply", targetId: string) {
  if (!(await targetExists(targetType, targetId))) return undefined;
  const deleted = await query("DELETE FROM discussion_votes WHERE user_id=$1 AND target_type=$2 AND target_id=$3 RETURNING user_id", [userId, targetType, targetId]);
  if (!deleted.rowCount) await query("INSERT INTO discussion_votes (user_id,target_type,target_id,value) VALUES ($1,$2,$3,1)", [userId, targetType, targetId]);
  return voteTotal(targetType, targetId);
}

async function followerCount(slug: string) {
  const result = await query<{ count: string }>("SELECT COUNT(*)::text AS count FROM discussion_follows WHERE discussion_slug=$1", [slug]);
  return Number(result.rows[0]?.count || 0);
}

export async function getFollowState(userId: string | undefined, slug: string) {
  const discussion = await query("SELECT 1 FROM discussions WHERE slug=$1 AND status <> 'hidden'", [slug]);
  if (!discussion.rowCount) return undefined;
  const followed = userId ? await query("SELECT 1 FROM discussion_follows WHERE user_id=$1 AND discussion_slug=$2", [userId, slug]) : undefined;
  return { following: Boolean(followed?.rowCount), followers: await followerCount(slug) };
}

export async function toggleFollow(userId: string, slug: string) {
  if (!(await targetExists("discussion", slug))) return undefined;
  const deleted = await query("DELETE FROM discussion_follows WHERE user_id=$1 AND discussion_slug=$2 RETURNING user_id", [userId, slug]);
  const following = !deleted.rowCount;
  if (following) await query("INSERT INTO discussion_follows (user_id,discussion_slug) VALUES ($1,$2)", [userId, slug]);
  return { following, followers: await followerCount(slug) };
}

export async function recordDiscussionView(slug: string) {
  const result = await query<{ views: number }>("UPDATE discussions SET views=views+1 WHERE slug=$1 AND status <> 'hidden' RETURNING views", [slug]);
  return result.rows[0]?.views;
}

export async function reportTarget(userId: string, targetType: "discussion" | "reply", targetId: string, reason: string) {
  if (!(await targetExists(targetType, targetId))) return false;
  const existing = await query("SELECT 1 FROM discussion_reports WHERE reporter_user_id=$1 AND target_type=$2 AND target_id=$3 AND status='open'", [userId, targetType, targetId]);
  if (!existing.rowCount) await query("INSERT INTO discussion_reports (id,reporter_user_id,target_type,target_id,reason) VALUES ($1,$2,$3,$4,$5)", [randomUUID(), userId, targetType, targetId, reason]);
  return true;
}

export async function solveDiscussion(slug: string, replyId: string, userId: string, administrator: boolean) {
  const result = await query<{ id: string; author_user_id: string }>("SELECT id,author_user_id FROM discussions WHERE slug=$1 AND status <> 'hidden'", [slug]);
  const discussion = result.rows[0];
  if (!discussion || (!administrator && discussion.author_user_id !== userId)) return false;
  const reply = await query("SELECT id FROM discussion_replies WHERE id=$1 AND discussion_id=$2 AND status='visible'", [replyId, discussion.id]);
  if (!reply.rowCount) return false;
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

export async function listModerationReports(): Promise<ModerationReport[]> {
  const result = await query<{ id: string; target_type: "discussion" | "reply"; target_id: string; reason: string; status: "open" | "reviewed" | "dismissed"; created_at: Date; reporter_name: string; discussion_slug: string | null; discussion_title: string | null }>(`SELECT report.id,report.target_type,report.target_id,report.reason,report.status,report.created_at,u.name AS reporter_name,
    COALESCE(d.slug,rd.slug) AS discussion_slug,COALESCE(d.title,rd.title) AS discussion_title
    FROM discussion_reports report JOIN "user" u ON u.id=report.reporter_user_id
    LEFT JOIN discussions d ON report.target_type='discussion' AND report.target_id=d.slug
    LEFT JOIN discussion_replies reply ON report.target_type='reply' AND report.target_id=reply.id
    LEFT JOIN discussions rd ON rd.id=reply.discussion_id
    ORDER BY CASE WHEN report.status='open' THEN 0 ELSE 1 END,report.created_at DESC LIMIT 200`);
  return result.rows.map((item) => ({ id: item.id, targetType: item.target_type, targetId: item.target_id, reason: item.reason, status: item.status, createdAt: item.created_at.toISOString(), reporterName: item.reporter_name, discussionSlug: item.discussion_slug, discussionTitle: item.discussion_title }));
}

export async function updateModerationReport(id: string, status: "reviewed" | "dismissed") {
  const result = await query("UPDATE discussion_reports SET status=$1 WHERE id=$2 RETURNING id", [status, id]);
  return Boolean(result.rowCount);
}
