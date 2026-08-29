import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Coordiation CSS — Build interfaces. Keep the system.",
  description:
    "A complete utility-first CSS compiler for Coordiation with CSS-first themes, composable variants, zero browser runtime, and an AI-readable registry.",
  icons: {
    icon: "/coordiation-logo.png",
  },
  openGraph: {
    title: "Coordiation CSS",
    description: "Utility-first. AI-readable. Framework-native. Zero browser runtime.",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
