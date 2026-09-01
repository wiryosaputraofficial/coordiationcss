import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/auth";
import { toggleVote } from "@/app/lib/discussions";

export async function POST(request: Request) {
  const session = await getSession(request.headers);
  if (!session) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const input = await request.json().catch(() => null) as { targetType?: unknown; targetId?: unknown } | null;
  if ((input?.targetType !== "discussion" && input?.targetType !== "reply") || typeof input.targetId !== "string" || !input.targetId || input.targetId.length > 160) {
    return NextResponse.json({ error: "Invalid vote" }, { status: 400 });
  }
  const votes = await toggleVote(session.user.id, input.targetType, input.targetId);
  if (votes === undefined) return NextResponse.json({ error: "Content not found" }, { status: 404 });
  return NextResponse.json({ votes });
}
