import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/tooling/upgrade", ...{ title: "Upgrade and codemods — Coordiation CSS", description: "Plan and apply versioned, auditable Coordiation CSS source migrations." } });

export default function UpgradePage() {
  return <article className="docs-article vite-guide">
    <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Tooling</span><b>/</b><span>Upgrade &amp; codemods</span></div>
    <p className="docs-overline">TOOLING · COMPLETE</p><h1>Upgrade and codemods</h1>
    <p className="docs-lead">Turn compiler deprecations into versioned source changes with exact locations, dry-run plans, safe write mode, and no evaluation of application code.</p>
    <div className="docs-note"><span>✓</span><p>Every migration names the compiler deprecation it resolves. The upgrade registry and compiler guidance therefore share one auditable contract.</p></div>

    <section className="guide-step" id="plan"><div className="step-number">01</div><div><h2>Create a plan before writing</h2><CodeBlock title="Terminal" code={`npm install -D @coordiation/upgrade
coordiation-upgrade src/App.tsx --from 0.1.0 --to 1.0.0 --json`} /><p>The JSON plan lists changed files, edit counts, migration IDs, line/column positions, and exact before/after text.</p></div></section>
    <section className="guide-step" id="migration"><div className="step-number">02</div><div><h2>Migrate legacy negative syntax</h2><CodeBlock title="Safe transform" code={`hover:co--mt-4
→ hover:-co-mt-4

ui--translate-x-2
→ -ui-translate-x-2`} /><p>The migration understands stacked variants, important modifiers, and custom prefixes. Canonical source is idempotent: a second run reports no edits.</p></div></section>
    <section className="guide-step" id="apply"><div className="step-number">03</div><div><h2>Gate or apply the upgrade</h2><CodeBlock title="CI and write modes" code={`coordiation-upgrade src/App.tsx --check
coordiation-upgrade src/App.tsx --write`} /><p>Check mode fails when migration is required without changing source. Write mode applies only registered safe transforms.</p></div></section>
    <section className="guide-step" id="api"><div className="step-number">04</div><div><h2>Integrate the migration engine</h2><CodeBlock title="upgrade.mjs" code={`import { migrateSource, planUpgrade, upgradeManifest } from "@coordiation/upgrade";

const result = migrateSource(source, { prefix: "co-" });
const plan = planUpgrade({ "App.tsx": source });`} /><p><code>upgradeManifest</code> declares the latest target, registered transforms, supported modes, and owned deprecations.</p></div></section>
    <section className="family-caveats" id="boundaries"><div><p className="docs-overline">SAFE BOUNDARIES</p><h2>Mechanical changes only</h2><p>Codemods stop where application intent would be required.</p></div><ul><li>Dynamic templates and concatenated class strings are preserved.</li><li>Class-like prose and unrelated strings are not rewritten.</li><li>Only registered safe transforms run in write mode.</li><li>A migration plan is evidence of edits, not proof that application behavior is correct.</li></ul></section>
    <div className="docs-next split"><Link prefetch={false} href="/docs/tooling/formatter"><span>Previous</span><b>← Class formatter</b></Link><Link prefetch={false} href="/docs/tooling/native-scanner"><span>Next</span><b>Native scanner →</b></Link></div>
  </article>;
}
