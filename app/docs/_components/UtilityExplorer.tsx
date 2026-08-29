"use client";

import { useMemo, useState } from "react";

type UtilityEntry = {
  candidate: string;
  declarations: string[][];
};

export default function UtilityExplorer({ utilities }: { utilities: UtilityEntry[] }) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => utilities.filter((utility) => utility.candidate.toLowerCase().includes(query.toLowerCase())), [query, utilities]);

  return (
    <section className="utility-explorer" id="static-utilities">
      <div className="utility-explorer-head"><div><h2>Static utility index</h2><p>Exact classes and declarations exported by the compiler registry.</p></div><label><span>Filter utilities</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Try co-flex or co-bg…" /></label></div>
      <div className="utility-result-count">Showing <b>{matches.length}</b> of {utilities.length} registered static utilities</div>
      <div className="utility-index" role="table" aria-label="Registered static utilities">
        <div className="utility-index-header" role="row"><span>Candidate</span><span>Generated declaration</span></div>
        {matches.map((utility) => <div className="utility-index-row" role="row" key={utility.candidate}><code>{utility.candidate}</code><code>{utility.declarations.map(([property, value]) => `${property}: ${value}`).join("; ")}</code></div>)}
      </div>
    </section>
  );
}

