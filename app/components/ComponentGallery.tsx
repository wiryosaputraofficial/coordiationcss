"use client";

import { useEffect, useMemo, useState } from "react";
import ComponentDemo from "./ComponentDemo";

type ComponentItem = { name: string; title: string; description: string; category: string; status: string; client: boolean; export: string; installPath: string; import: string; usage: string; accessibility: string };
type ComponentRegistry = { componentCount: number; categories: string[]; components: ComponentItem[] };

export default function ComponentGallery({ registry }: { registry: ComponentRegistry }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<ComponentItem | null>(null);
  const [origin, setOrigin] = useState("https://your-domain.com");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setOrigin(window.location.origin);
      const requested = new URL(window.location.href).searchParams.get("component");
      if (requested) setSelected(registry.components.find((item) => item.name === requested) ?? null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [registry.components]);

  const filtered = useMemo(() => registry.components.filter((item) => {
    const needle = query.trim().toLowerCase();
    return (category === "all" || item.category === category) && (!needle || `${item.name} ${item.title} ${item.description} ${item.category}`.toLowerCase().includes(needle));
  }), [category, query, registry.components]);

  function choose(item: ComponentItem) {
    setSelected(item);
    const url = new URL(window.location.href);
    url.searchParams.set("component", item.name);
    window.history.replaceState({}, "", url);
    if (window.matchMedia("(max-width: 760px)").matches) window.requestAnimationFrame(() => document.querySelector("#component-detail")?.scrollIntoView({ behavior: "smooth" }));
  }
  async function copy(value: string, label: string) { await navigator.clipboard.writeText(value); setCopied(label); window.setTimeout(() => setCopied(""), 1500); }
  const install = selected ? `npx shadcn@latest add ${origin}${selected.installPath}` : "";
  const importCode = selected ? `import { ${selected.export} } from "${selected.import}";` : "";

  return <section className="component-gallery" id="component-catalog">
    <div className="component-gallery-heading"><div><p className="component-overline">REGISTRY / 0.1</p><h2>Component catalog</h2><p>Each card is backed by installable source and a machine-readable accessibility contract.</p></div><div className="component-filters"><label><span>Search</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search components…" /></label><label><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{registry.categories.map((item) => <option key={item} value={item}>{item.replace("-", " ")}</option>)}</select></label></div></div>
    <div className="component-results"><span><b>{filtered.length}</b> of {registry.componentCount} components</span>{(query || category !== "all") && <button onClick={() => { setQuery(""); setCategory("all"); }}>Clear filters</button>}</div>
    <div className="component-catalog-layout">
      <div className="component-card-grid">{filtered.map((item, index) => <article className={`component-catalog-card${selected?.name === item.name ? " is-selected" : ""}`} key={item.name}><div className="component-preview"><span className="component-index">{String(index + 1).padStart(2, "0")}</span><button className="component-preview-select" type="button" onClick={() => choose(item)} aria-label={`Show installation for ${item.title}`}>Usage <span aria-hidden="true">↗</span></button><ComponentDemo name={item.name} title={item.title} /></div><div className="component-card-meta"><div><h3>{item.title}</h3><p>{item.description}</p></div><span>{item.client ? "CLIENT" : "SERVER"}</span></div></article>)}</div>
      <aside className="component-detail" id="component-detail">{selected ? <><div className="component-detail-preview"><ComponentDemo name={selected.name} title={selected.title} /></div><p className="component-overline">{selected.category} · {selected.status}</p><h2>{selected.title}</h2><p>{selected.description}</p><section><div><h3>Install source</h3><button onClick={() => copy(install, "Install command copied")}>Copy</button></div><pre><code>{install}</code></pre></section><section><div><h3>Import</h3><button onClick={() => copy(importCode, "Import copied")}>Copy</button></div><pre><code>{importCode}</code></pre></section><section><div><h3>Usage</h3><button onClick={() => copy(selected.usage, "Usage copied")}>Copy</button></div><pre><code>{selected.usage}</code></pre></section><div className="component-a11y"><b>Accessibility contract</b><p>{selected.accessibility}</p></div><a className="component-json-link" href={selected.installPath}>Inspect registry JSON ↗</a></> : <div className="component-detail-empty"><span>CO</span><h2>Select a component</h2><p>Use a card&apos;s Usage control to inspect its install URL, import, usage, and accessibility contract.</p></div>}</aside>
    </div>
    <div className="component-registry-footer"><div><p className="component-overline">FOR HUMANS + AGENTS</p><h2>One registry, two readers.</h2><p>Developers browse previews. AI reads exact names, files, stability, client boundaries, usage, and accessibility requirements.</p></div><div><a href="/r/registry.json"><span>Compatible catalog</span><code>/r/registry.json</code></a><a href="/component-registry.json"><span>AI manifest</span><code>/component-registry.json</code></a></div></div>
    <p className={`component-copy-status${copied ? " visible" : ""}`} role="status">{copied || "Copied"}</p>
  </section>;
}
