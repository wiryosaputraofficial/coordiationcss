import { NextResponse } from "next/server";
import { getSession, isDiscussionAdmin } from "@/app/lib/auth";
import { solveDiscussion } from "@/app/lib/discussions";

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession(request.headers);
  if (!session) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const { slug } = await params;
  const input = await request.json().catch(() => null) as { replyId?: unknown } | null;
  if (typeof input?.replyId !== "string") return NextResponse.json({ error: "Reply required" }, { status: 400 });
  const solved = await solveDiscussion(slug, input.replyId, session.user.id, isDiscussionAdmin(session.user));
  if (!solved) return NextResponse.json({ error: "Not permitted" }, { status: 403 });
  return NextResponse.json({ solved: true });
}
