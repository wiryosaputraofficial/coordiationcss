import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({
  path: "/docs/migration/1.0-rc",
  title: "Migrate to Coordiation 1.0 RC",
  description: "Upgrade Coordiation 0.1 packages and CLI 0.2 projects to the coordinated 1.0.0-rc.1 release train.",
});

export default function MigrationPage() {
  return <article className="docs-article vite-guide">
    <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Migration</span><b>/</b><span>1.0 RC</span></div>
    <p className="docs-overline">MIGRATION · 0.1 AND CLI 0.2</p>
    <h1>Migrate to 1.0 RC</h1>
    <p className="docs-lead">Move the packages your project already uses onto one coordinated version, apply the safe syntax migration, then refresh lifecycle evidence when a source contract changes.</p>
    <div className="docs-note"><span>!</span><p>This is a prerelease. Use the npm <code>next</code> tag and commit your lockfile so humans and AI agents resolve the same package train.</p></div>

    <section className="guide-step" id="packages"><div className="step-number">01</div><div><h2>Upgrade packages together</h2><CodeBlock title="Compiler and design assets" code={`npm install @coordiation/css@next @coordiation/icons@next
npm install -D @coordiation/cli@next @coordiation/vite@next`} /><p>Replace the example list with the Coordiation packages your project actually uses. Do not mix 0.x and RC packages because internal contracts use exact release-train versions.</p></div></section>

    <section className="guide-step" id="negative-syntax"><div className="step-number">02</div><div><h2>Migrate negative utilities</h2><CodeBlock title="Canonical syntax" code={`<!-- Before -->
<div class="co--mt-4"></div>

<!-- After -->
<div class="-co-mt-4"></div>`} /><CodeBlock title="Preview and apply" code={`npx @coordiation/upgrade@next src/App.tsx --json
npx @coordiation/upgrade@next src/App.tsx --write`} /><p>The codemod changes registered literal syntax only. Dynamic class construction is preserved because rewriting it would require application intent.</p></div></section>

    <section className="guide-step" id="lifecycle"><div className="step-number">03</div><div><h2>Initialize the lifecycle contract</h2><CodeBlock title="Terminal" code={`npx @coordiation/cli@next init \
  --name "Customer portal" \
  --owner-name "Product owner" \
  --owner-email "owner@example.com"

npx @coordiation/cli@next compatibility
npx @coordiation/cli@next status`} /><p>Commit the generated <code>.coordiation</code> directory. It is the versioned contract shared by product contributors and AI agents, not a disposable cache.</p></div></section>

    <section className="guide-step" id="revision"><div className="step-number">04</div><div><h2>Revise instead of silently editing</h2><CodeBlock title="Terminal" code={`npx @coordiation/cli@next revise SPEC-001 \
  --reason "Authentication policy changed" \
  --patch spec-update.json`} /><p>A revision archives the prior contract, clears approvals and evidence, and supersedes dependent artifacts. Re-derive the affected stages and record new development or QA evidence for the current revision.</p></div></section>

    <section className="guide-step" id="verify"><div className="step-number">05</div><div><h2>Verify before deployment</h2><CodeBlock title="Terminal" code={`npx @coordiation/cli@next compatibility
npx @coordiation/cli@next trace
npx @coordiation/cli@next gate check GATE-QA --artifact QA-001`} /><p>Run the application build, automated tests, accessibility checks, and relevant lifecycle gates. A successful migration plan proves that edits were applied; it does not replace product QA.</p></div></section>

    <section className="family-caveats" id="rollback"><div><p className="docs-overline">ROLLBACK</p><h2>Pin the previous exact versions</h2><p>If the candidate blocks a project, restore the versions recorded in its last known-good lockfile.</p></div><ul><li>Compiler baseline: <code>@coordiation/css@0.1.0</code>.</li><li>CLI baseline: <code>@coordiation/cli@0.2.0</code>.</li><li>Do not change public npm dist-tags as a project-level rollback.</li><li>Report the package, Node version, reproduction, and active schema version.</li></ul></section>

    <div className="docs-next split"><Link href="/docs/releases/1.0.0-rc.1"><span>Previous</span><b>← 1.0.0-rc.1 notes</b></Link><Link href="/docs/tooling/upgrade"><span>Next</span><b>Upgrade codemods →</b></Link></div>
  </article>;
}
