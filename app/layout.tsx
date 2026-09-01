import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "./seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Coordiation CSS — Build interfaces. Keep the system.",
    template: "%s — Coordiation CSS",
  },
  description:
    "A complete utility-first CSS compiler for Coordiation with CSS-first themes, composable variants, zero browser runtime, and an AI-readable registry.",
  applicationName: "Coordiation CSS",
  generator: "Coordiation CSS",
  referrer: "origin-when-cross-origin",
  keywords: ["Coordiation CSS", "utility-first CSS", "CSS framework", "design system", "open-code components"],
  authors: [{ name: "Wiryo Saputra", url: SITE_URL }],
  creator: "Wiryo Saputra",
  publisher: "Coordiation",
  category: "technology",
  verification: {
    google: "JaE1uWUGQh4A0hyN0jcZ4vzKd18HpEXKE7PzDsM31vM",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/coordiation-logo.png",
  },
  openGraph: {
    title: "Coordiation CSS",
    description: "Utility-first. AI-readable. Framework-native. Zero browser runtime.",
    url: SITE_URL,
    siteName: "Coordiation CSS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Coordiation CSS — Build interfaces. Keep the system.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coordiation CSS",
    description: "Utility-first. AI-readable. Framework-native. Zero browser runtime.",
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Coordiation",
      url: SITE_URL,
      logo: `${SITE_URL}/coordiation-logo.png`,
      email: "wiryosaputra@coordiation.com",
      founder: {
        "@type": "Person",
        name: "Wiryo Saputra",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Coordiation CSS",
      url: SITE_URL,
      description:
        "Utility-first CSS, open-code components, icons, themes, and AI-readable tooling.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      name: "Coordiation CSS",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Cross-platform",
      url: SITE_URL,
      description:
        "A runtime-free utility-first CSS compiler with framework adapters, open-code components, icons, themes, and machine-readable registries.",
      author: { "@id": `${SITE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <script
          defer
          src="https://analytics.coordiation.com/script.js"
          data-website-id="1080725d-caf9-414a-bbd9-6943fedb2eba"
          data-domains="coordiation.com"
          data-do-not-track="true"
          data-exclude-search="true"
          data-performance="true"
        />
        <script
          id="buy-me-a-coffee-widget"
          defer
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="coordiation"
          data-description="Support me on Buy me a coffee!"
          data-message="Your supports is truly matters."
          data-color="#5F7FFF"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        />
      </body>
    </html>
  );
}
