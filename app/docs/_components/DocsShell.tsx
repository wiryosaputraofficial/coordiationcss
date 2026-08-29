"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

const navigation = [
  { title: "Getting started", items: [["Installation", "/docs"], ["Using Vite", "/docs/installation/using-vite"], ["Editor setup", "#editor-setup"], ["Compatibility", "/release-check"]] },
  { title: "Core concepts", items: [["Utility classes", "#utility-classes"], ["Responsive design", "#responsive-design"], ["States and variants", "#states-and-variants"], ["Theme variables", "#theme-variables"]] },
  { title: "Core utilities", items: [["Utility registry", "/docs/utilities"], ["Layout", "/docs/utilities/layout"], ["Flexbox & Grid", "/docs/utilities/flex-grid"], ["Spacing", "/docs/utilities/spacing"], ["Sizing", "/docs/utilities/sizing"], ["Typography", "/docs/utilities/typography"], ["Backgrounds", "/docs/utilities/backgrounds"], ["Borders & Rings", "/docs/utilities/borders-rings"], ["Effects", "/docs/utilities/effects"], ["Tables & Columns", "/docs/utilities/tables-columns"], ["Transforms", "/docs/utilities/transforms"], ["Transitions", "/docs/utilities/transitions"], ["SVG", "/docs/utilities/svg"], ["Accessibility", "/docs/utilities/accessibility"], ["Interactivity", "/docs/utilities/interaction"], ["Arbitrary properties", "/docs/utilities/arbitrary-properties"]] },
  { title: "Tooling", items: [["Vite", "/docs/installation/using-vite"], ["PostCSS", "#postcss"], ["CLI", "#cli"], ["AI integration", "#ai-integration"]] },
] as const;

export default function DocsShell({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => navigation.flatMap((section) => section.items.map(([label, href]) => ({ label, href, section: section.title }))).filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 6), [query]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="reference-page">
      <header className="reference-header">
        <Link className="brand" href="/" aria-label="Coordiation CSS home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">CSS</span></Link>
        <div className="docs-search"><span aria-hidden="true">⌕</span><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search documentation…" aria-label="Search documentation" /><kbd>⌘ K</kbd>{query && <div className="docs-search-results">{results.length ? results.map((item) => <Link href={item.href} key={`${item.section}-${item.label}`} onClick={() => setQuery("")}><span>{item.label}</span><small>{item.section}</small></Link>) : <p>No matching documentation.</p>}</div>}</div>
        <nav aria-label="Documentation links"><Link href="/release-check">Release Check</Link><a href="/api/capabilities">API</a><Link className="docs-home-link" href="/">Home ↗</Link></nav>
      </header>
      <div className="reference-layout">
        <aside className="reference-sidebar" aria-label="Documentation sections">
          <div className="docs-version"><span>Documentation</span><code>v0.2-dev</code></div>
          {navigation.map((section) => <section key={section.title}><h2>{section.title}</h2><ul>{section.items.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul></section>)}
        </aside>
        <div className="reference-content">{children}</div>
      </div>
    </div>
  );
}
