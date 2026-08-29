import UtilityExplorer from "../_components/UtilityExplorer";
import registry from "../generated/utility-registry.json";

export default function UtilitiesPage() {
  return (
    <article className="docs-article registry-page">
      <div className="docs-breadcrumb"><span>Docs</span><b>/</b><span>Core utilities</span><b>/</b><span>Registry</span></div>
      <p className="docs-overline">GENERATED REFERENCE</p>
      <h1>Utility registry</h1>
      <p className="docs-lead">The human- and machine-readable source of truth for utility support in Coordiation CSS. This page is regenerated from the same module used by the compiler.</p>
      <div className="registry-stats"><div><strong>{registry.stats.staticUtilityCount}</strong><span>static utilities</span></div><div><strong>{registry.stats.familyCount}</strong><span>dynamic families</span></div><div><strong>{registry.schemaVersion}</strong><span>schema version</span></div></div>

      <h2>Dynamic utility families</h2>
      <div className="registry-family-grid">
        {registry.families.map((family) => <section key={family.id} id={family.id}><div><code>{family.id}</code><span className={`docs-status ${family.status}`}><i />{family.status}</span></div><h3>{family.label}</h3><div className="registry-patterns">{family.patterns.map((pattern) => <code key={pattern}>{pattern}</code>)}</div><p>Target v{family.target} · Arbitrary values {family.supportsArbitrary ? "supported" : "not supported"} · Negative values {family.supportsNegative ? "supported" : "not supported"}</p></section>)}
      </div>

      <UtilityExplorer utilities={registry.staticUtilities} />
      <div className="registry-machine-link"><div><p className="docs-overline">FOR TOOLS AND AI</p><h2>Consume the registry as JSON.</h2><p>The endpoint includes schema metadata, family patterns, exact candidates, and their generated declarations.</p></div><a href="/api/utilities"><code>GET /api/utilities</code><span>Open JSON ↗</span></a></div>
    </article>
  );
}

