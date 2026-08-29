import { absoluteUrl } from "../seo";

export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    `Host: ${absoluteUrl("/")}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
