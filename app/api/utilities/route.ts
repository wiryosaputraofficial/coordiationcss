import registry from "../../docs/generated/utility-registry.json";

export const dynamic = "force-static";

export function GET() {
  return Response.json(registry, {
    headers: { "cache-control": "public, max-age=300" },
  });
}

