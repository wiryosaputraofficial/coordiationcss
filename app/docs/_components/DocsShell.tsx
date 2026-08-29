"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import SolarIcon from "../../_components/SolarIcon";

const navigation = [
  { title: "Getting started", items: [["Installation", "/docs"], ["Using Vite", "/docs/installation/using-vite"], ["Components", "/docs/components"], ["Solar Linear icons", "/docs/icons/solar-linear"], ["Iconsax Line Oval icons", "/docs/icons/iconsax-line-oval"], ["Editor setup", "/docs/tooling/language-server"], ["Compatibility", "/docs/core/compatibility"]] },
  { title: "Core concepts", items: [["Utility classes", "#utility-classes"], ["Custom utilities", "/docs/core/custom-utilities"], ["Custom variants", "/docs/core/custom-variants"], ["Plugin API", "/docs/core/plugin-api"], ["Compatibility", "/docs/core/compatibility"], ["Preflight", "/docs/core/preflight"], ["Logical properties", "/docs/core/logical-properties"], ["Modern color", "/docs/core/modern-color"], ["Responsive design", "/docs/core/responsive-design"], ["Attribute selectors", "/docs/variants/attribute-selectors"], ["Conditional variants", "/docs/variants/conditional-rules"], ["Theme variables", "/docs/core/theme-variables"]] },
  { title: "Core utilities", items: [["Utility registry", "/docs/utilities"], ["Layout", "/docs/utilities/layout"], ["Flexbox & Grid", "/docs/utilities/flex-grid"], ["Spacing", "/docs/utilities/spacing"], ["Sizing", "/docs/utilities/sizing"], ["Typography", "/docs/utilities/typography"], ["Backgrounds", "/docs/utilities/backgrounds"], ["Borders & Rings", "/docs/utilities/borders-rings"], ["Effects", "/docs/utilities/effects"], ["Tables & Columns", "/docs/utilities/tables-columns"], ["Transforms & 3D", "/docs/utilities/transforms"], ["Transitions & Animation", "/docs/utilities/transitions"], ["SVG", "/docs/utilities/svg"], ["Accessibility", "/docs/utilities/accessibility"], ["Interactivity", "/docs/utilities/interaction"], ["Arbitrary properties", "/docs/utilities/arbitrary-properties"]] },
  { title: "Icons", items: [["Browse all icons", "/icons"], ["Solar Linear guide", "/docs/icons/solar-linear"], ["Iconsax Line Oval guide", "/docs/icons/iconsax-line-oval"], ["Icon registry", "/icon-registry.json"]] },
  { title: "Components", items: [["Browse components", "/components"], ["Registry guide", "/docs/components"], ["AI component manifest", "/component-registry.json"], ["Compatible catalog", "/r/registry.json"]] },
  { title: "Tooling", items: [["CSS toolchain", "/docs/tooling/css-toolchain"], ["Incremental cache", "/docs/tooling/incremental-cache"], ["Source maps", "/docs/tooling/source-maps"], ["IntelliSense & LSP", "/docs/tooling/language-server"], ["Class formatter", "/docs/tooling/formatter"], ["Upgrade & codemods", "/docs/tooling/upgrade"], ["Native scanner", "/docs/tooling/native-scanner"], ["Vite", "/docs/installation/using-vite"], ["PostCSS", "/docs/installation/using-postcss"], ["CLI", "/docs/installation/using-cli"], ["AI integration", "#ai-integration"]] },
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
        <Link prefetch={false} className="brand" href="/" aria-label="Coordiation CSS home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">CSS</span></Link>
        <div className="docs-search"><SolarIcon name="magnifier" size={16} /><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search documentation…" aria-label="Search documentation" /><kbd>⌘ K</kbd>{query && <div className="docs-search-results">{results.length ? results.map((item) => <Link prefetch={false} href={item.href} key={`${item.section}-${item.label}`} onClick={() => setQuery("")}><span>{item.label}</span><small>{item.section}</small></Link>) : <p>No matching documentation.</p>}</div>}</div>
        <nav aria-label="Documentation links"><Link prefetch={false} href="/components">Components</Link><Link prefetch={false} href="/icons">Icons</Link><Link prefetch={false} href="/release-check">Release Check</Link><a href="/api/capabilities">API</a><Link prefetch={false} className="docs-home-link" href="/">Home <SolarIcon name="arrow-to-top-right" size={14} /></Link></nav>
      </header>
      <div className="reference-layout">
        <aside className="reference-sidebar" aria-label="Documentation sections">
          <div className="docs-version"><span>Documentation</span><code>feature-complete</code></div>
          {navigation.map((section) => <section key={section.title}><h2>{section.title}</h2><ul>{section.items.map(([label, href]) => <li key={label}><Link prefetch={false} href={href}>{label}</Link></li>)}</ul></section>)}
        </aside>
        <div className="reference-content">{children}</div>
      </div>
    </div>
  );
}
