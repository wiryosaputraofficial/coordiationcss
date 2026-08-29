import { capabilityManifest } from "../../docs/capabilities";

export const dynamic = "force-static";

export function GET() {
  return Response.json(capabilityManifest, {
    headers: { "cache-control": "public, max-age=300" },
  });
}

