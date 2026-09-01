import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/auth";
import { createReply } from "@/app/lib/discussions";

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession(request.headers);
  if (!session) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const { slug } = await params;
  const input = await request.json().catch(() => null) as { body?: unknown } | null;
  const body = typeof input?.body === "string" ? input.body.trim() : "";
  if (body.length < 20 || body.length > 8000) return NextResponse.json({ error: "Invalid reply" }, { status: 400 });
  const reply = await createReply(slug, body, session.user.id);
  if (!reply) return NextResponse.json({ error: "Discussion is not open" }, { status: 404 });
  return NextResponse.json(reply, { status: 201 });
}
