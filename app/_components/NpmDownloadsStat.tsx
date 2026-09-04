"use client";

import { useEffect, useState } from "react";

type NpmDownloadResponse = {
  downloads?: number;
};

export default function NpmDownloadsStat({ initialDownloads }: { initialDownloads: number }) {
  const [downloads, setDownloads] = useState(initialDownloads);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/npm-downloads", { signal: controller.signal })
      .then(async (response): Promise<NpmDownloadResponse | null> =>
        response.ok ? (await response.json()) as NpmDownloadResponse : null,
      )
      .then((data: NpmDownloadResponse | null) => {
        if (typeof data?.downloads === "number") setDownloads(data.downloads);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return (
    <div className="homepage-stat-product">
      <strong aria-live="polite">{downloads.toLocaleString("en-US")}</strong>
      <span>npm package downloads</span>
      <p>Cumulative official npm downloads across every Coordiation package since the first release.</p>
    </div>
  );
}
