import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/tooling/agent-context", ...{
  title: "AI agent manifests and context packs — Coordiation CSS",
  description: "Give coding agents compact, deterministic Coordiation project context with inspectable manifests, task packs, rules, and release-trackable warnings.",
} });

export default function AgentContextPage() {
  return (
    <article className="docs-article vite-guide">
      <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Tooling</span><b>/</b><span>AI agent context</span></div>
      <p className="docs-overline">TOOLING · RELEASE CANDIDATE</p>
      <h1>Give agents less context and better constraints</h1>
      <p className="docs-lead">Coordiation turns project structure, literal utilities, component choices, and delivery rules into a compact machine-readable contract. An agent can start with the exact task context instead of repeatedly reading the complete repository and documentation.</p>
      <div className="docs-note"><span>i</span><p>The compact manifest for the Coordiation workspace is currently about 631 estimated tokens. This is a context-size estimate, not a guaranteed monetary saving; cost improvements must be measured with repeatable agent evaluations.</p></div>

      <section className="family-concepts" id="flow"><div><p className="docs-overline">ONE DETERMINISTIC FLOW</p><h2>Inspect, narrow, build, verify</h2><p>Every phase produces data that another tool or agent can inspect.</p></div><ol><li><span>01</span><p><strong>Inspect:</strong> identify the framework, package manager, installed Coordiation packages, literal candidates, and actionable warnings.</p></li><li><span>02</span><p><strong>Narrow:</strong> select a task pack such as <code>pricing</code>, <code>form</code>, or <code>dashboard</code>.</p></li><li><span>03</span><p><strong>Build:</strong> reuse registered components and emit literal <code>co-*</code> classes under explicit contracts.</p></li><li><span>04</span><p><strong>Verify:</strong> run the pack&apos;s accessibility, responsive, content, and build checks.</p></li></ol></section>

      <section className="guide-step" id="inspect"><div className="step-number">01</div><div><h2>Inspect the current project</h2><CodeBlock title="Terminal" code={`npx @coordiation/cli inspect
npx @coordiation/cli inspect --write`} /><p>The first command prints a short human summary. The second writes <code>.coordiation/agent-manifest.json</code>, which can be committed so humans, CI, and agents can track changes to the project contract.</p></div></section>

      <section className="guide-step" id="manifest"><div className="step-number">02</div><div><h2>Read the compact manifest first</h2><CodeBlock title=".coordiation/agent-manifest.json" code={`{
  "schemaVersion": "1.0",
  "kind": "coordiation-agent-manifest",
  "project": {
    "framework": "nextjs",
    "packageManager": "pnpm"
  },
  "coordiation": {
    "prefix": "co-",
    "browserRuntime": 0,
    "utilityCount": 147
  },
  "warnings": [],
  "contextBudget": {
    "mode": "compact",
    "estimatedTokens": 631
  }
}`} /><p>Compact mode excludes file-by-file detail. Use <code>inspect --full</code> only for a task that genuinely needs the source file list and complete utility inventory.</p></div></section>

      <section className="guide-step" id="context-pack"><div className="step-number">03</div><div><h2>Request only the task context</h2><CodeBlock title="Terminal" code="npx @coordiation/cli context pricing --json" /><CodeBlock title="Context pack" code={`{
  "topic": "pricing",
  "components": ["badge", "button", "card", "separator"],
  "utilityHints": [
    "co-grid",
    "md:co-grid-cols-3",
    "co-gap-5",
    "co-border",
    "co-ring-2"
  ],
  "checks": [
    "comparable features",
    "recommended label",
    "CTA contrast",
    "maximum three-line titles"
  ]
}`} /><p>Available packs are <code>page</code>, <code>navigation</code>, <code>form</code>, <code>dashboard</code>, <code>pricing</code>, <code>component</code>, and <code>theme</code>. Each pack inherits the project&apos;s active contracts and known literal utilities.</p></div></section>

      <section className="guide-step" id="agent-prompt"><div className="step-number">04</div><div><h2>Give the agent an executable brief</h2><CodeBlock title="Agent instruction" code={`1. Read .coordiation/agent-manifest.json.
2. Request the context pack for this task.
3. Reuse the listed Coordiation components.
4. Keep every co-* candidate literal.
5. Respect responsive, accessibility, icon, motion, and copyright rules.
6. Run the project build and report failed checks.`} /><p>The manifest does not replace source inspection. It decides where inspection is necessary and prevents broad, repetitive context loading before the agent understands the task.</p></div></section>

      <section className="family-caveats" id="contracts"><div><p className="docs-overline">AGENT CONTRACTS</p><h2>Make generated work easy to audit</h2><p>These constraints stay stable across frameworks and task packs.</p></div><ul><li>Use literal static class candidates; report dynamic interpolation instead of guessing its runtime values.</li><li>Prefer Coordiation components and icon packages before adding another UI dependency.</li><li>Preserve zero browser runtime for the CSS utility engine.</li><li>Respect responsive layouts, keyboard access, contrast, and reduced-motion preferences.</li><li>Use Coordiation copyright in every installable application theme.</li><li>Keep warnings visible in the manifest until their cause is resolved.</li></ul></section>

      <section className="family-caveats" id="release-status"><div><p className="docs-overline">RELEASE STATUS</p><h2>MVP implemented; public package release pending</h2><p>The source and automated tests are complete for the first usable slice.</p></div><ul><li><code>@coordiation/agent</code> contains the schema, project inspector, and task context packs.</li><li><code>@coordiation/cli</code> exposes <code>inspect</code> and <code>context</code>.</li><li>The next gate is a coordinated public npm release of both packages.</li><li>After publication, framework-by-framework evaluations will measure context size, task success, latency, and actual token usage.</li></ul></section>

      <div className="docs-next split"><Link prefetch={false} href="/docs/tooling/language-server"><span>Previous</span><b>← IntelliSense &amp; LSP</b></Link><Link prefetch={false} href="/release-check"><span>Track release</span><b>Release Check →</b></Link></div>
    </article>
  );
}
