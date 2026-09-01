import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/auth";
import { createDiscussion, listDiscussions, validCategory } from "@/app/lib/discussions";

export async function GET() {
  return NextResponse.json(await listDiscussions());
}

export async function POST(request: Request) {
  const session = await getSession(request.headers);
  if (!session) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const input = await request.json().catch(() => null) as { title?: unknown; body?: unknown; category?: unknown; tags?: unknown } | null;
  const title = typeof input?.title === "string" ? input.title.trim() : "";
  const body = typeof input?.body === "string" ? input.body.trim() : "";
  const category = typeof input?.category === "string" ? input.category : "";
  const tags = Array.isArray(input?.tags) ? input.tags.filter((tag): tag is string => typeof tag === "string").map((tag) => tag.trim().toLowerCase()).filter(Boolean).slice(0, 5) : [];
  if (title.length < 15 || title.length > 140 || body.length < 40 || body.length > 8000 || !validCategory(category)) {
    return NextResponse.json({ error: "Invalid discussion" }, { status: 400 });
  }
  const result = await createDiscussion({ title, body, category, tags, userId: session.user.id });
  return NextResponse.json(result, { status: 201 });
}
