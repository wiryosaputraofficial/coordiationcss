"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ComponentItem = { name: string; title: string; description: string; category: string; status: string; client: boolean; export: string; installPath: string; import: string; usage: string; accessibility: string };
type ComponentRegistry = { componentCount: number; categories: string[]; components: ComponentItem[] };

function Demo({ name, title, category }: { name: string; title: string; category: string }) {
  const [on, setOn] = useState(true);
  const [tab, setTab] = useState("preview");
  const dialogRef = useRef<HTMLDialogElement>(null);
  if (name === "button") return <button className="demo-button">Continue</button>;
  if (name === "badge") return <span className="demo-badge">Stable</span>;
  if (name === "card") return <div className="demo-card"><b>Project Alpha</b><span>12 collaborators</span><i>Active</i></div>;
  if (name === "input") return <input className="demo-input" aria-label="Demo email" placeholder="you@example.com" />;
  if (name === "textarea") return <textarea className="demo-input demo-textarea" aria-label="Demo message" placeholder="Write a message…" />;
  if (name === "label") return <label className="demo-label">Email address<input className="demo-input" placeholder="name@company.com" /></label>;
  if (name === "checkbox") return <label className="demo-check"><input type="checkbox" defaultChecked /><span>Accept terms</span></label>;
  if (name === "switch") return <button type="button" role="switch" aria-checked={on} className={`demo-switch${on ? " is-on" : ""}`} onClick={() => setOn(!on)}><i /><span>{on ? "Enabled" : "Disabled"}</span></button>;
  if (name === "alert") return <div className="demo-alert" role="alert"><b>Changes saved</b><span>Your project is up to date.</span></div>;
  if (name === "separator") return <div className="demo-separator"><span>Account</span><i /><span>Security</span></div>;
  if (name === "skeleton") return <div className="demo-skeleton"><i /><span><b /><b /></span></div>;
  if (name === "spinner") return <div className="demo-spinner-wrap"><i className="demo-spinner" /><span>Loading</span></div>;
  if (name === "avatar") return <div className="demo-avatar"><span>CO</span><div><b>Coordiation</b><small>@coordiation</small></div></div>;
  if (name === "table") return <table className="demo-table"><thead><tr><th>Package</th><th>Status</th></tr></thead><tbody><tr><td>Core</td><td>Ready</td></tr><tr><td>UI</td><td>Ready</td></tr></tbody></table>;
  if (name === "tabs") return <div className="demo-tabs"><div role="tablist"><button className={tab === "preview" ? "active" : ""} onClick={() => setTab("preview")}>Preview</button><button className={tab === "code" ? "active" : ""} onClick={() => setTab("code")}>Code</button></div><p>{tab === "preview" ? "Live component" : "Owned source"}</p></div>;
  if (name === "dialog") return <><button className="demo-button" onClick={() => dialogRef.current?.showModal()}>Open dialog</button><dialog ref={dialogRef} className="demo-dialog" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}><b>Publish changes?</b><p>This will update your project.</p><button onClick={() => dialogRef.current?.close()}>Close</button></dialog></>;
  if (name === "progress") return <div className="demo-progress"><span style={{ width: "68%" }} /></div>;
  if (name === "accordion") return <details className="demo-accordion" open><summary>Is it accessible?</summary><p>Native disclosure semantics.</p></details>;
  if (name === "breadcrumb") return <nav className="demo-breadcrumb" aria-label="Demo breadcrumb"><span>Docs</span><i>/</i><b>Components</b></nav>;
  if (name === "calendar" || name === "date-picker") return <div className="demo-calendar"><b>29</b><span>AUG · 2026</span></div>;
  if (name === "typography") return <div className="demo-type"><b>Aa</b><span>Build with a system.</span></div>;
  if (name === "tooltip" || name === "hover-card" || name === "popover") return <div className="demo-overlay"><button>Focus me</button><span>{title}</span></div>;
  return <div className={`demo-generic demo-generic-${category}`}><span>{title}</span><b>{category.replace("-", " ")}</b><i aria-hidden="true" /></div>;
}

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
      <div className="component-card-grid">{filtered.map((item, index) => <article className={`component-catalog-card${selected?.name === item.name ? " is-selected" : ""}`} key={item.name}><button className="component-preview" type="button" onClick={() => choose(item)} aria-label={`Show installation for ${item.title}`}><span className="component-index">{String(index + 1).padStart(2, "0")}</span><Demo name={item.name} title={item.title} category={item.category} /></button><div className="component-card-meta"><div><h3>{item.title}</h3><p>{item.description}</p></div><span>{item.client ? "CLIENT" : "SERVER"}</span></div></article>)}</div>
      <aside className="component-detail" id="component-detail">{selected ? <><div className="component-detail-preview"><Demo name={selected.name} title={selected.title} category={selected.category} /></div><p className="component-overline">{selected.category} · {selected.status}</p><h2>{selected.title}</h2><p>{selected.description}</p><section><div><h3>Install source</h3><button onClick={() => copy(install, "Install command copied")}>Copy</button></div><pre><code>{install}</code></pre></section><section><div><h3>Import</h3><button onClick={() => copy(importCode, "Import copied")}>Copy</button></div><pre><code>{importCode}</code></pre></section><section><div><h3>Usage</h3><button onClick={() => copy(selected.usage, "Usage copied")}>Copy</button></div><pre><code>{selected.usage}</code></pre></section><div className="component-a11y"><b>Accessibility contract</b><p>{selected.accessibility}</p></div><a className="component-json-link" href={selected.installPath}>Inspect registry JSON ↗</a></> : <div className="component-detail-empty"><span>CO</span><h2>Select a component</h2><p>Click any preview to inspect its literal install URL, import, usage, and accessibility contract.</p></div>}</aside>
    </div>
    <div className="component-registry-footer"><div><p className="component-overline">FOR HUMANS + AGENTS</p><h2>One registry, two readers.</h2><p>Developers browse previews. AI reads exact names, files, stability, client boundaries, usage, and accessibility requirements.</p></div><div><a href="/r/registry.json"><span>Compatible catalog</span><code>/r/registry.json</code></a><a href="/component-registry.json"><span>AI manifest</span><code>/component-registry.json</code></a></div></div>
    <p className={`component-copy-status${copied ? " visible" : ""}`} role="status">{copied || "Copied"}</p>
  </section>;
}
