import type { Metadata } from "next";

export const SITE_URL = "https://coordiation.com";
export const SITE_NAME = "Coordiation CSS";
export const DEFAULT_DESCRIPTION =
  "A complete utility-first CSS compiler with CSS-first themes, composable variants, zero browser runtime, and AI-readable tooling.";
export const DEFAULT_SOCIAL_IMAGE = "/og.png";

type SeoMetadataInput = Omit<Metadata, "alternates" | "openGraph" | "twitter"> & {
  path: string;
  alternates?: Metadata["alternates"];
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
};

function textTitle(title: Metadata["title"]): string {
  if (typeof title === "string") return title;
  if (title && typeof title === "object" && "absolute" in title && title.absolute) return title.absolute;
  return SITE_NAME;
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function createSeoMetadata({ path, ...metadata }: SeoMetadataInput): Metadata {
  const title = textTitle(metadata.title);
  const description = metadata.description ?? DEFAULT_DESCRIPTION;
  const canonical = absoluteUrl(path);
  const openGraph = metadata.openGraph ?? {};
  const twitter = metadata.twitter ?? {};
  const requestedOpenGraphImages = "images" in openGraph ? openGraph.images : undefined;
  const requestedTwitterImages = "images" in twitter ? twitter.images : undefined;
  const openGraphImages = Array.isArray(requestedOpenGraphImages)
    ? requestedOpenGraphImages.length > 0
      ? requestedOpenGraphImages
      : [DEFAULT_SOCIAL_IMAGE]
    : requestedOpenGraphImages ?? [DEFAULT_SOCIAL_IMAGE];
  const twitterImages = Array.isArray(requestedTwitterImages)
    ? requestedTwitterImages.length > 0
      ? requestedTwitterImages
      : [DEFAULT_SOCIAL_IMAGE]
    : requestedTwitterImages ?? [DEFAULT_SOCIAL_IMAGE];

  return {
    ...metadata,
    title: { absolute: title },
    description,
    alternates: {
      ...metadata.alternates,
      canonical,
    },
    robots: metadata.robots ?? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      ...openGraph,
      images: openGraphImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...twitter,
      images: twitterImages,
    },
  };
}

export const STATIC_INDEXABLE_ROUTES = [
  "/",
  "/components",
  "/docs",
  "/docs/components",
  "/docs/core/compatibility",
  "/docs/core/custom-utilities",
  "/docs/core/custom-variants",
  "/docs/core/logical-properties",
  "/docs/core/modern-color",
  "/docs/core/plugin-api",
  "/docs/core/preflight",
  "/docs/core/responsive-design",
  "/docs/core/theme-variables",
  "/docs/icons/iconsax-line-oval",
  "/docs/icons/solar-linear",
  "/docs/installation/using-astro",
  "/docs/installation/using-cli",
  "/docs/installation/using-html-css",
  "/docs/installation/using-laravel",
  "/docs/installation/using-nextjs",
  "/docs/installation/using-npm",
  "/docs/installation/using-php",
  "/docs/installation/using-postcss",
  "/docs/installation/using-react",
  "/docs/installation/using-svelte",
  "/docs/installation/using-vite",
  "/docs/installation/using-wordpress",
  "/docs/themes",
  "/docs/tooling/agent-context",
  "/docs/tooling/css-toolchain",
  "/docs/tooling/formatter",
  "/docs/tooling/incremental-cache",
  "/docs/tooling/language-server",
  "/docs/tooling/native-scanner",
  "/docs/tooling/source-maps",
  "/docs/tooling/upgrade",
  "/docs/utilities",
  "/docs/variants/attribute-selectors",
  "/docs/variants/conditional-rules",
  "/icons",
  "/release-check",
  "/themes",
  "/themes/editorial-advisor",
  "/themes/editorial-advisor/preview",
  "/themes/finance-dashboard",
  "/themes/finance-dashboard/preview",
  "/themes/industrial-forge",
  "/themes/industrial-forge/preview",
  "/themes/mono-portfolio",
  "/themes/mono-portfolio/preview",
  "/themes/noir-habitat",
  "/themes/noir-habitat/preview",
  "/themes/quiet-journal",
  "/themes/quiet-journal/preview",
] as const;
