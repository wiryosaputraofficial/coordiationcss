import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/auth";
import { reportTarget } from "@/app/lib/discussions";

export async function POST(request: Request) {
  const session = await getSession(request.headers);
  if (!session) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const input = await request.json().catch(() => null) as { targetType?: unknown; targetId?: unknown; reason?: unknown } | null;
  const reason = typeof input?.reason === "string" ? input.reason.trim() : "";
  if ((input?.targetType !== "discussion" && input?.targetType !== "reply") || typeof input.targetId !== "string" || reason.length < 10 || reason.length > 500) {
    return NextResponse.json({ error: "Invalid report" }, { status: 400 });
  }
  const reported = await reportTarget(session.user.id, input.targetType, input.targetId, reason);
  if (!reported) return NextResponse.json({ error: "Content not found" }, { status: 404 });
  return NextResponse.json({ reported: true });
}
