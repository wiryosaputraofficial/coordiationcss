import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/auth";
import { getFollowState, toggleFollow } from "@/app/lib/discussions";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession(request.headers);
  const { slug } = await params;
  const state = await getFollowState(session?.user.id, slug);
  if (!state) return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  return NextResponse.json(state);
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession(request.headers);
  if (!session) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const { slug } = await params;
  const state = await toggleFollow(session.user.id, slug);
  if (!state) return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  return NextResponse.json(state);
}
