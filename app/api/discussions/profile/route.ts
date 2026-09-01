import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/auth";
import { query } from "@/app/lib/database";

export async function GET(request: Request) {
  const session = await getSession(request.headers);
  if (!session) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const [questions, replies, accepted, votes, activity] = await Promise.all([
    query<{ count: string }>("SELECT COUNT(*)::text AS count FROM discussions WHERE author_user_id=$1", [session.user.id]),
    query<{ count: string }>("SELECT COUNT(*)::text AS count FROM discussion_replies WHERE author_user_id=$1 AND status='visible'", [session.user.id]),
    query<{ count: string }>("SELECT COUNT(*)::text AS count FROM discussion_replies r JOIN discussions d ON d.accepted_reply_id=r.id WHERE r.author_user_id=$1", [session.user.id]),
    query<{ count: string }>("SELECT COALESCE(SUM(v.value),0)::text AS count FROM discussion_votes v WHERE (v.target_type='discussion' AND v.target_id IN (SELECT slug FROM discussions WHERE author_user_id=$1)) OR (v.target_type='reply' AND v.target_id IN (SELECT id FROM discussion_replies WHERE author_user_id=$1))", [session.user.id]),
    query<{ kind: string; title: string; slug: string; created_at: Date }>(`SELECT 'question' AS kind,title,slug,created_at FROM discussions WHERE author_user_id=$1
      UNION ALL SELECT 'reply' AS kind,d.title,d.slug,r.created_at FROM discussion_replies r JOIN discussions d ON d.id=r.discussion_id WHERE r.author_user_id=$1
      ORDER BY created_at DESC LIMIT 8`, [session.user.id]),
  ]);
  return NextResponse.json({
    questions: Number(questions.rows[0]?.count || 0),
    replies: Number(replies.rows[0]?.count || 0),
    accepted: Number(accepted.rows[0]?.count || 0),
    reputation: Number(votes.rows[0]?.count || 0),
    activity: activity.rows,
  });
}
