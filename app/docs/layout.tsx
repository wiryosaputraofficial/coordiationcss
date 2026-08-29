import type { Metadata } from "next";
import DocsShell from "./_components/DocsShell";

export const metadata: Metadata = {
  title: { default: "Documentation — Coordiation CSS", template: "%s — Coordiation CSS" },
  description: "Install, configure, and use Coordiation CSS in your project.",
};

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DocsShell>{children}</DocsShell>;
}

