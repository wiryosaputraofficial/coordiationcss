import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/auth";
import { toggleFollow } from "@/app/lib/discussions";

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession(request.headers);
  if (!session) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const { slug } = await params;
  const following = await toggleFollow(session.user.id, slug);
  return NextResponse.json({ following });
}
