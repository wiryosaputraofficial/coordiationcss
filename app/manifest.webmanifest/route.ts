export async function GET() {
  return Response.json(
    {
      name: "Coordiation CSS",
      short_name: "Coordiation",
      description: "Utility-first CSS, open-code components, icons, and application themes.",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [
        {
          src: "/coordiation-logo.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/manifest+json; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}
