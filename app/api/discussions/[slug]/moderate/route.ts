import { NextResponse } from "next/server";
import { getSession, isDiscussionAdmin } from "@/app/lib/auth";
import { moderateDiscussion } from "@/app/lib/discussions";

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession(request.headers);
  if (!session || !isDiscussionAdmin(session.user)) return NextResponse.json({ error: "Moderator access required" }, { status: 403 });
  const { slug } = await params;
  const input = await request.json().catch(() => null) as { status?: unknown; note?: unknown } | null;
  if (input?.status !== "open" && input?.status !== "closed" && input?.status !== "hidden") return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  const note = typeof input.note === "string" ? input.note.trim().slice(0, 500) : "";
  await moderateDiscussion(slug, input.status, session.user.id, note);
  return NextResponse.json({ status: input.status });
}
