const coordiationPackages = [
  "@coordiation/agent",
  "@coordiation/cli",
  "@coordiation/css",
  "@coordiation/formatter",
  "@coordiation/icons",
  "@coordiation/language-server",
  "@coordiation/oxide",
  "@coordiation/postcss",
  "@coordiation/themes",
  "@coordiation/ui",
  "@coordiation/upgrade",
  "@coordiation/vite",
] as const;

type NpmDownloadPoint = {
  downloads?: number;
};

async function getPackageDownloads(packageName: string) {
  const endpoint = `https://api.npmjs.org/downloads/point/last-year/${encodeURIComponent(packageName)}`;
  const response = await fetch(endpoint, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(4_000),
  });

  if (response.status === 404) return 0;
  if (!response.ok) throw new Error(`npm downloads request failed with ${response.status}`);

  const data = (await response.json()) as NpmDownloadPoint;
  return typeof data.downloads === "number" ? data.downloads : 0;
}

export async function GET() {
  try {
    const packageDownloads = await Promise.all(coordiationPackages.map(getPackageDownloads));
    const downloads = packageDownloads.reduce((total, count) => total + count, 0);

    return Response.json(
      {
        downloads,
        period: "last-year",
        packageCount: packageDownloads.filter((count) => count > 0).length,
        source: "https://api.npmjs.org/downloads/",
      },
      {
        headers: {
          "cache-control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return Response.json(
      { error: "npm download statistics are temporarily unavailable" },
      {
        status: 503,
        headers: { "cache-control": "public, max-age=60" },
      },
    );
  }
}
