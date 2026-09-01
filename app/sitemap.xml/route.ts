import utilityRegistry from "../docs/generated/utility-registry.json";
import { absoluteUrl, STATIC_INDEXABLE_ROUTES } from "../seo";
import { listDiscussions } from "../lib/discussions";

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export async function GET() {
  const updatedAt = "2026-08-31T00:00:00.000Z";
  const utilityRoutes = utilityRegistry.families.map((family) => `/docs/utilities/${family.id}`);
  const discussionRoutes = (await listDiscussions()).map((discussion) => `/discussions/${discussion.slug}`);
  const entries = [...STATIC_INDEXABLE_ROUTES, ...utilityRoutes, ...discussionRoutes]
    .map((route) => {
      const priority = route === "/" ? "1.0" : route === "/docs" ? "0.9" : "0.7";
      const changeFrequency = route === "/" ? "weekly" : "monthly";
      return `<url><loc>${escapeXml(absoluteUrl(route))}</loc><lastmod>${updatedAt}</lastmod><changefreq>${changeFrequency}</changefreq><priority>${priority}</priority></url>`;
    })
    .join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
