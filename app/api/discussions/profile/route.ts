import { NextResponse } from "next/server";
import { getSession, isDiscussionAdmin } from "@/app/lib/auth";
import { query } from "@/app/lib/database";

export async function GET(request: Request) {
  const session = await getSession(request.headers);
  if (!session) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const [questions, replies, accepted, questionVotes, replyVotes, activity, followed, member] = await Promise.all([
    query<{ count: string }>("SELECT COUNT(*)::text AS count FROM discussions WHERE author_user_id=$1", [session.user.id]),
    query<{ count: string }>("SELECT COUNT(*)::text AS count FROM discussion_replies WHERE author_user_id=$1 AND status='visible'", [session.user.id]),
    query<{ count: string }>("SELECT COUNT(*)::text AS count FROM discussion_replies r JOIN discussions d ON d.accepted_reply_id=r.id WHERE r.author_user_id=$1", [session.user.id]),
    query<{ count: string }>("SELECT COALESCE(SUM(v.value),0)::text AS count FROM discussion_votes v JOIN discussions d ON v.target_type='discussion' AND v.target_id=d.slug WHERE d.author_user_id=$1", [session.user.id]),
    query<{ count: string }>("SELECT COALESCE(SUM(v.value),0)::text AS count FROM discussion_votes v JOIN discussion_replies r ON v.target_type='reply' AND v.target_id=r.id WHERE r.author_user_id=$1", [session.user.id]),
    query<{ kind: string; title: string; slug: string; category: string; excerpt: string; created_at: Date }>(`SELECT 'question' AS kind,d.title,d.slug,d.category,LEFT(d.body,180) AS excerpt,d.created_at FROM discussions d WHERE d.author_user_id=$1
      UNION ALL SELECT 'reply' AS kind,d.title,d.slug,d.category,LEFT(r.body,180) AS excerpt,r.created_at FROM discussion_replies r JOIN discussions d ON d.id=r.discussion_id WHERE r.author_user_id=$1 AND r.status='visible'
      ORDER BY created_at DESC LIMIT 20`, [session.user.id]),
    query<{ title: string; slug: string; category: string; updated_at: Date }>(`SELECT d.title,d.slug,d.category,d.updated_at FROM discussion_follows f JOIN discussions d ON d.slug=f.discussion_slug WHERE f.user_id=$1 AND d.status <> 'hidden' ORDER BY d.updated_at DESC LIMIT 20`, [session.user.id]),
    query<{ username: string | null; role: string; created_at: Date }>("SELECT username,role,\"createdAt\" AS created_at FROM \"user\" WHERE id=$1", [session.user.id]),
  ]);
  const questionCount = Number(questions.rows[0]?.count || 0);
  const replyCount = Number(replies.rows[0]?.count || 0);
  const acceptedCount = Number(accepted.rows[0]?.count || 0);
  const questionVoteCount = Math.max(0, Number(questionVotes.rows[0]?.count || 0));
  const replyVoteCount = Math.max(0, Number(replyVotes.rows[0]?.count || 0));
  const reputationBreakdown = [
    { key: "questions", label: "Questions published", count: questionCount, pointsEach: 2, points: questionCount * 2 },
    { key: "replies", label: "Answers published", count: replyCount, pointsEach: 5, points: replyCount * 5 },
    { key: "question-upvotes", label: "Question upvotes received", count: questionVoteCount, pointsEach: 5, points: questionVoteCount * 5 },
    { key: "answer-upvotes", label: "Answer upvotes received", count: replyVoteCount, pointsEach: 10, points: replyVoteCount * 10 },
    { key: "accepted", label: "Accepted answers", count: acceptedCount, pointsEach: 25, points: acceptedCount * 25 },
  ];
  const memberRow = member.rows[0];
  return NextResponse.json({
    questions: questionCount,
    replies: replyCount,
    accepted: acceptedCount,
    reputation: reputationBreakdown.reduce((total, item) => total + item.points, 0),
    reputationBreakdown,
    activity: activity.rows.map((item) => ({ ...item, createdAt: item.created_at })),
    followed: followed.rows.map((item) => ({ ...item, updatedAt: item.updated_at })),
    username: memberRow?.username || null,
    role: isDiscussionAdmin({ ...session.user, username: memberRow?.username, role: memberRow?.role }) ? "administrator" : "member",
    joinedAt: memberRow?.created_at || null,
  });
}
