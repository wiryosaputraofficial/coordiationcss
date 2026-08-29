"use client";

import { useEffect, useMemo, useState } from "react";
import SolarIcon from "../_components/SolarIcon";

type IconEntry = {
  name: string;
  export: string;
  style: "linear";
  collectionId: string;
  collection: string;
  categories: string[];
  import: string;
  asset: string;
};

type IconCollection = {
  id: string;
  name: string;
  iconCount: number;
  source: { creator: string; license: string; attributionRequired: boolean };
};

type IconRegistry = {
  iconCount: number;
  collection: string;
  collections: IconCollection[];
  icons: IconEntry[];
};

function readable(value: string) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export default function IconBrowser() {
  const [registry, setRegistry] = useState<IconRegistry | null>(null);
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("all");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<IconEntry | null>(null);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/icon-registry.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Icon registry could not be loaded.");
        return response.json() as Promise<IconRegistry>;
      })
      .then(setRegistry)
      .catch((reason: Error) => {
        if (reason.name !== "AbortError") setError(reason.message);
      });
    return () => controller.abort();
  }, []);

  const categories = useMemo(() => {
    if (!registry) return [];
    return [...new Set(registry.icons.filter((icon) => collection === "all" || icon.collectionId === collection).flatMap((icon) => icon.categories))].sort();
  }, [collection, registry]);

  const filtered = useMemo(() => {
    if (!registry) return [];
    const needle = query.trim().toLowerCase();
    return registry.icons.filter((icon) => {
      const matchesCollection = collection === "all" || icon.collectionId === collection;
      const matchesCategory = category === "all" || icon.categories.includes(category);
      const searchable = `${icon.name} ${icon.export} ${icon.collection} ${icon.categories.join(" ")}`.toLowerCase();
      return matchesCollection && matchesCategory && (!needle || searchable.includes(needle));
    });
  }, [category, collection, query, registry]);

  const importCode = selected
    ? `import { ${selected.export} } from "${selected.import}";\nimport { renderIcon } from "@coordiation/icons";`
    : "";
  const renderCode = selected
    ? `const icon = renderIcon(${selected.export}, {\n  size: 24,\n  label: "${readable(selected.name)}",\n});\n\ndocument.querySelector("#icon").innerHTML = icon;`
    : "";
  const cssCode = `@import "@coordiation/icons/style.css";\n\n.icon-button {\n  --co-icon-size: 1.5rem;\n  --co-icon-color: currentColor;\n}`;

  async function copy(value: string, label: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1600);
  }

  function selectIcon(icon: IconEntry) {
    setSelected(icon);
    if (window.matchMedia("(max-width: 680px)").matches) {
      window.requestAnimationFrame(() => document.querySelector("#icon-usage")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }

  return (
    <section className="icon-browser" id="icon-catalog">
      <div className="icon-browser-heading">
        <div>
          <p className="icons-kicker">COMPLETE CATALOG</p>
          <h2>Find your icon</h2>
          <p>Both complete collections are served locally. Filter by collection, then copy an exact literal import.</p>
        </div>
        <div className="icon-browser-controls">
          <label><span>Search icons</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try home, arrow, user…" /></label>
          <label><span>Collection</span><select value={collection} onChange={(event) => { setCollection(event.target.value); setCategory("all"); }}><option value="all">All collections</option>{registry?.collections.map((item) => <option value={item.id} key={item.id}>{item.name} ({item.iconCount.toLocaleString("en-US")})</option>)}</select></label>
          <label><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((item) => <option value={item} key={item}>{readable(item)}</option>)}</select></label>
        </div>
      </div>

      <div className="icon-browser-summary" aria-live="polite">
        <span><b>{filtered.length.toLocaleString("en-US")}</b> of {registry?.iconCount.toLocaleString("en-US") ?? "2,165"} icons</span>
        {(query || collection !== "all" || category !== "all") && <button type="button" onClick={() => { setQuery(""); setCollection("all"); setCategory("all"); }}>Clear filters</button>}
      </div>

      {error ? <p className="icon-browser-error">{error}</p> : !registry ? <p className="icon-browser-loading">Loading all icon names…</p> : (
        <div className="icon-browser-layout">
          <div className="icon-grid" aria-label="Coordiation icon collections">
            {filtered.map((icon) => (
              <button className={`icon-card${selected?.name === icon.name && selected.collectionId === icon.collectionId ? " is-selected" : ""}`} type="button" key={`${icon.collectionId}:${icon.name}`} onClick={() => selectIcon(icon)} aria-label={`Show usage for ${readable(icon.name)} from ${icon.collection}`} aria-pressed={selected?.name === icon.name && selected.collectionId === icon.collectionId}>
                <img loading="lazy" decoding="async" src={icon.asset} alt="" />
                <span>{icon.name}</span>
              </button>
            ))}
            {!filtered.length && <div className="icon-empty"><strong>No icon found.</strong><p>Try a broader name or clear the category filter.</p></div>}
          </div>

          <aside className={`icon-usage${selected ? " has-selection" : ""}`} id="icon-usage" aria-live="polite">
            {selected ? <>
              <div className="icon-usage-preview"><img src={selected.asset} alt="" /><span>{selected.collection}</span></div>
              <p className="icons-kicker">SELECTED ICON</p>
              <h2>{readable(selected.name)}</h2>
              <code className="icon-export-name">{selected.export}</code>
              <div className="icon-category-list">{selected.categories.length ? selected.categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)}>{readable(item)}</button>) : <span>Uncategorized</span>}</div>

              <section className="icon-code-section"><div><h3>1. Import</h3><button type="button" onClick={() => copy(importCode, "Import copied")}>Copy</button></div><pre><code>{importCode}</code></pre></section>
              <section className="icon-code-section"><div><h3>2. Render</h3><button type="button" onClick={() => copy(renderCode, "Render code copied")}>Copy</button></div><pre><code>{renderCode}</code></pre></section>
              <section className="icon-code-section"><div><h3>3. Style</h3><button type="button" onClick={() => copy(cssCode, "CSS copied")}>Copy</button></div><pre><code>{cssCode}</code></pre></section>
              <p className="icon-usage-note">Use <code>label</code> only when nearby text does not explain the icon. Omit it for decorative icons.</p>
            </> : <div className="icon-usage-empty"><span><SolarIcon name="arrow-left-up" size={23} /></span><h2>Click an icon</h2><p>Its exact import path, rendering example, CSS, categories, and copy actions will appear here.</p></div>}
          </aside>
        </div>
      )}

      <footer className="icon-browser-footer">
        <p>Includes Solar Linear by <a href="https://www.figma.com/community/file/1166831539721848736">480 Design</a> (CC BY 4.0, attribution required) and Iconsax Line Oval from the pinned MIT source package.</p>
        <a href="/icon-registry.json">Open machine-readable registry <SolarIcon name="arrow-to-top-right" size={14} /></a>
      </footer>
      <p className={`icon-copy-status${copied ? " visible" : ""}`} role="status">{copied || "Copied"}</p>
    </section>
  );
}
