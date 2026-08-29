import type { Metadata } from "next";
import Link from "next/link";
import { capabilities, type CapabilityStatus } from "../docs/capabilities";

export const metadata: Metadata = {
  title: "Release Check — Coordiation CSS",
  description: "A human- and AI-readable checklist of every Coordiation CSS capability.",
};

const statusLabel: Record<CapabilityStatus, string> = {
  complete: "Complete",
  partial: "In progress",
  planned: "Planned",
};

export default function ReleaseCheckPage() {
  const totals = capabilities.reduce(
    (result, item) => ({ ...result, [item.status]: result[item.status] + 1 }),
    { complete: 0, partial: 0, planned: 0 } as Record<CapabilityStatus, number>,
  );
  const ready = Math.round(((totals.complete + totals.partial * 0.5) / capabilities.length) * 100);

  return (
    <main className="docs-page">
      <header className="site-header docs-header">
        <Link className="brand" href="/" aria-label="Coordiation CSS home">
          <img src="/coordiation-logo.png" alt="" />
          <span>Coordiation</span><span className="brand-product">CSS</span>
        </Link>
        <nav aria-label="Documentation navigation">
          <a href="#overview">Overview</a><a href="#capabilities">Capabilities</a><a href="#ai-access">AI access</a>
        </nav>
        <Link className="header-cta" href="/">Back home <span aria-hidden="true">↗</span></Link>
      </header>

      <section className="docs-hero" id="overview">
        <div>
          <p className="kicker">RELEASE CHECK / LIVE CAPABILITY TRACKER</p>
          <h1>Know exactly<br />what ships.</h1>
          <p>One honest checklist for humans and AI agents. Every capability has a stable ID, release target, examples, and a clearly defined status.</p>
        </div>
        <div className="readiness-card" aria-label={`${ready}% readiness score`}>
          <span>0.2 development readiness</span>
          <strong>{ready}<sup>%</sup></strong>
          <div className="readiness-meter"><i style={{ width: `${ready}%` }} /></div>
          <dl>
            <div><dt>Complete</dt><dd>{totals.complete}</dd></div>
            <div><dt>In progress</dt><dd>{totals.partial}</dd></div>
            <div><dt>Planned</dt><dd>{totals.planned}</dd></div>
          </dl>
        </div>
      </section>

      <section className="status-legend" aria-label="Status definitions">
        <span><i className="complete" />Complete means documented and tested</span>
        <span><i className="partial" />In progress means a useful subset ships</span>
        <span><i className="planned" />Planned means do not depend on it yet</span>
      </section>

      <section className="capability-section" id="capabilities">
        <div className="capability-heading">
          <div><p className="kicker">ALL CAPABILITIES</p><h2>Release checklist</h2></div>
          <p>{capabilities.length} tracked areas. Status changes only after implementation, documentation, and tests agree.</p>
        </div>
        <div className="capability-table" role="table" aria-label="Coordiation CSS capability status">
          <div className="capability-table-head" role="row">
            <span>Capability</span><span>Status</span><span>Target</span><span>Examples and scope</span>
          </div>
          {capabilities.map((item, index) => (
            <article className="capability-row" role="row" id={item.id} key={item.id}>
              <div className="capability-name"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.area}</strong><code>{item.id}</code></div>
              <div><span className={`docs-status ${item.status}`}><i />{statusLabel[item.status]}</span></div>
              <div><code>v{item.target}</code></div>
              <div className="capability-scope"><p>{item.note}</p><div>{item.examples.map((example) => <code key={example}>{example}</code>)}</div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-section" id="ai-access">
        <div>
          <p className="kicker kicker-light">AI-FIRST DOCUMENTATION</p>
          <h2>Readable without guessing.</h2>
          <p>Agents can query the same structured source used by this page, then generate only supported Coordiation classes.</p>
        </div>
        <div className="ai-links">
          <a href="/api/capabilities"><span>JSON capability manifest</span><code>GET /api/capabilities</code><b>→</b></a>
          <a href="/llms.txt"><span>Concise AI usage guide</span><code>GET /llms.txt</code><b>→</b></a>
        </div>
      </section>

      <footer className="docs-footer"><Link className="brand footer-brand" href="/"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">CSS</span></Link><p>Capability data is versioned with the framework.</p><span>Updated 29 Aug 2026</span></footer>
    </main>
  );
}
