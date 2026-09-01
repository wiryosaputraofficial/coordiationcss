import { NextResponse } from "next/server";
import { recordDiscussionView } from "@/app/lib/discussions";

export async function POST(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const views = await recordDiscussionView(slug);
  if (views === undefined) return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  return NextResponse.json({ views });
}
