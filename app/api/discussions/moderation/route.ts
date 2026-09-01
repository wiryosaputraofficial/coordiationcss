import { NextResponse } from "next/server";
import { getSession, isDiscussionAdmin } from "@/app/lib/auth";
import { listModerationReports, updateModerationReport } from "@/app/lib/discussions";

async function requireAdministrator(headers: Headers) {
  const session = await getSession(headers);
  return session && isDiscussionAdmin(session.user) ? session : null;
}

export async function GET(request: Request) {
  if (!(await requireAdministrator(request.headers))) return NextResponse.json({ error: "Administrator access required" }, { status: 403 });
  return NextResponse.json(await listModerationReports());
}

export async function PATCH(request: Request) {
  if (!(await requireAdministrator(request.headers))) return NextResponse.json({ error: "Administrator access required" }, { status: 403 });
  const input = await request.json().catch(() => null) as { id?: unknown; status?: unknown } | null;
  if (typeof input?.id !== "string" || (input.status !== "reviewed" && input.status !== "dismissed")) {
    return NextResponse.json({ error: "Invalid moderation update" }, { status: 400 });
  }
  if (!(await updateModerationReport(input.id, input.status))) return NextResponse.json({ error: "Report not found" }, { status: 404 });
  return NextResponse.json({ id: input.id, status: input.status });
}
