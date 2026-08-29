import Link from "next/link";
import { capabilities, type CapabilityStatus } from "./docs/capabilities";
import registry from "./docs/generated/utility-registry.json";

const utilityCount = registry.staticUtilities.length;
const familyCount = registry.families.length;
const verifiedExampleCount = registry.families.reduce((total, family) => total + family.resolvedExamples.length, 0);
const completeCapabilityCount = capabilities.filter((capability) => capability.status === "complete").length;

function combinedStatus(ids: string[]): CapabilityStatus {
  const statuses = ids.map((id) => capabilities.find((capability) => capability.id === id)?.status ?? "planned");
  if (statuses.includes("planned")) return "planned";
  if (statuses.includes("partial")) return "partial";
  return "complete";
}

const utilities = [
  "co-grid",
  "co-gap-6",
  "co-bg-black",
  "hover:co-bg-white",
  "md:co-grid-cols-3",
  "dark:co-text-white",
];

const features = [
  {
    index: "01",
    title: "Framework-native scanning",
    description:
      "Reads .coord templates alongside HTML, JSX, Vue, Svelte, Astro, and Markdown without asking you to change how you build.",
    visual: "scan",
  },
  {
    index: "02",
    title: "CSS-first theme system",
    description:
      "Turn colors, spacing, typography, shadows, motion, and breakpoints into project-owned utility APIs without a JavaScript config.",
    visual: "tokens",
  },
  {
    index: "03",
    title: "Conditions that compose",
    description:
      "Stack responsive, state, dark mode, group, peer, ARIA, data, supports, media, and container conditions in one literal class.",
    visual: "variants",
  },
  {
    index: "04",
    title: "Machine-readable by design",
    description:
      "Capabilities, utilities, generated declarations, and support status are exposed as JSON so AI agents can verify before generating.",
    visual: "registry",
  },
];

const roadmap = [
  { name: "Foundation", status: combinedStatus(["source-detection", "framework-scanning", "static-output", "theme-variables"]) },
  { name: "Core utilities", status: registry.families.every((family) => family.status === "complete") ? "complete" as const : "partial" as const },
  { name: "Plugin API", status: combinedStatus(["plugin-api", "custom-utility", "custom-variant"]) },
  { name: "Language tools", status: combinedStatus(["language-server", "formatter", "codemods"]) },
];

const statusLabel: Record<CapabilityStatus, string> = { complete: "Complete", partial: "In progress", planned: "Planned" };
const statusClass: Record<CapabilityStatus, string> = { complete: "is-complete", partial: "is-progress", planned: "is-planned" };

const integrations = [
  { name: "Vite", label: "Recommended", description: "Virtual CSS, root-aware scanning, watched theme files, and dependency-aware hot updates.", href: "/docs/installation/using-vite", code: "@coordiation/vite" },
  { name: "PostCSS", label: "Pipeline", description: "A standard PostCSS 8 adapter with dependency messages, warnings, and multi-entry safety.", href: "/docs/installation/using-postcss", code: "@coordiation/postcss" },
  { name: "CLI", label: "Standalone", description: "One-shot builds and durable watch mode with atomic output and no bundler requirement.", href: "/docs/installation/using-cli", code: "coordiation-css" },
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <span className="announcement-dot" />
        All 44 tracked capabilities are complete
        <Link href="/release-check">View release readiness <span aria-hidden="true">→</span></Link>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Coordiation CSS home">
          <img src="/coordiation-logo.png" alt="" />
          <span>Coordiation</span>
          <span className="brand-product">CSS</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#engine">Engine</a>
          <a href="#integrations">Integrations</a>
          <Link href="/docs">Docs</Link>
          <Link href="/release-check">Release Check</Link>
        </nav>
        <Link className="header-cta" href="/docs/installation/using-vite">Get started <span aria-hidden="true">↗</span></Link>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <img className="hero-watermark" src="/coordiation-logo.png" alt="" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span>CO</span> Utility-first · AI-readable · Runtime-free</div>
          <h1>Build interfaces.<br /><em>Keep the system.</em></h1>
          <p>
            A complete utility-first CSS compiler for Coordiation. Compose responsive,
            accessible interfaces from predictable classes, CSS-first tokens, and a machine-readable registry.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/docs/installation/using-vite">Start building <span>→</span></Link>
            <a className="button button-light" href="#engine">See how it works</a>
          </div>
          <div className="hero-proof">
            <span><b>0</b> browser runtime</span>
            <span><b>{utilityCount}</b> static utilities</span>
            <span><b>{familyCount}</b> complete families</span>
            <span><b>JSON</b> AI-readable</span>
          </div>
        </div>

        <div className="hero-demo" aria-label="Coordiation CSS code example">
          <div className="window-bar">
            <div className="window-dots"><i /><i /><i /></div>
            <span>hero.coord</span>
            <span className="window-status">compiled</span>
          </div>
          <pre className="code-block"><code>
            <span className="line"><span className="ln">01</span><span className="muted">&lt;</span><span className="tag">section</span></span>
            <span className="line"><span className="ln">02</span>  <span className="attr">class</span><span className="muted">=</span><span className="string">&quot;co-grid co-gap-8</span></span>
            <span className="line"><span className="ln">03</span>         <span className="string">co-bg-white co-p-8</span></span>
            <span className="line line-focus"><span className="ln">04</span>         <span className="string">md:co-grid-cols-2</span></span>
            <span className="line"><span className="ln">05</span>         <span className="string">dark:co-bg-black&quot;</span><span className="muted">&gt;</span></span>
            <span className="line"><span className="ln">06</span>  <span className="muted">&lt;</span><span className="tag">h1</span> <span className="attr">class</span><span className="muted">=</span><span className="string">&quot;co-text-6xl</span></span>
            <span className="line"><span className="ln">07</span>      <span className="string">co-font-bold&quot;</span><span className="muted">&gt;</span></span>
            <span className="line"><span className="ln">08</span>    Move at the speed of thought.</span>
            <span className="line"><span className="ln">09</span>  <span className="muted">&lt;/</span><span className="tag">h1</span><span className="muted">&gt;</span></span>
            <span className="line"><span className="ln">10</span><span className="muted">&lt;/</span><span className="tag">section</span><span className="muted">&gt;</span></span>
          </code></pre>
          <div className="compile-line">
            <span className="compile-check">✓</span>
            <span><b>{familyCount}</b> families verified</span>
            <span className="compile-size">{utilityCount} utilities indexed</span>
          </div>
        </div>
      </section>

      <section className="utility-marquee" aria-label="Example utilities">
        <span className="marquee-label">LITERAL · TRACEABLE</span>
        <div className="marquee-track">
          {[...utilities, ...utilities].map((utility, index) => (
            <code key={`${utility}-${index}`}>{utility}</code>
          ))}
        </div>
      </section>

      <section className="homepage-stats" aria-label="Framework statistics">
        <div><strong>{utilityCount}</strong><span>Static utilities</span><p>Generated from the canonical compiler registry.</p></div>
        <div><strong>{familyCount}</strong><span>Complete families</span><p>Every family is documented and registry-backed.</p></div>
        <div><strong>{verifiedExampleCount}</strong><span>Verified examples</span><p>Broken examples fail registry generation.</p></div>
        <div><strong>{completeCapabilityCount}</strong><span>Complete capabilities</span><p>Published through the machine-readable API.</p></div>
      </section>

      <section className="section features-section" id="features">
        <div className="section-heading">
          <p className="kicker">THE SYSTEM</p>
          <h2>Small utilities.<br />Serious capability.</h2>
          <p>Every class does one job. Together, they form a design system that stays understandable as your product grows.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className={`feature-card feature-${feature.visual}`} key={feature.index}>
              <div className="feature-topline"><span>{feature.index}</span><span>↗</span></div>
              <div className="feature-visual" aria-hidden="true">
                {feature.visual === "scan" && <div className="scan-visual"><i /><i /><i /><span /></div>}
                {feature.visual === "tokens" && <div className="token-visual"><code>--co-space</code><b>04</b><span /></div>}
                {feature.visual === "variants" && <div className="variant-visual"><code>md:</code><code>hover:</code><code>co-bg-black</code></div>}
                {feature.visual === "registry" && <div className="registry-visual"><strong>{utilityCount}</strong><span>JSON ENTRIES</span><code>/api/utilities</code></div>}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section system-showcase" id="system">
        <div className="section-heading">
          <p className="kicker">ONE SYSTEM</p>
          <h2>Human-readable.<br />Agent-verifiable.</h2>
          <p>The same CSS-first decisions power authored components, generated utilities, documentation, and machine-readable manifests.</p>
        </div>
        <div className="showcase-grid">
          <article className="showcase-card showcase-theme">
            <div className="showcase-meta"><span>01 · THEME</span><Link href="/docs/core/theme-variables">Explore tokens ↗</Link></div>
            <h3>Own the design system in CSS.</h3>
            <p>Extend or override colors, type, radii, shadows, breakpoints, perspective, and motion through recognized variables.</p>
            <div className="showcase-palette" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <code>--co-color-product: oklch(62% .2 260);</code>
          </article>
          <article className="showcase-card showcase-responsive">
            <div className="showcase-meta"><span>02 · RESPONSIVE</span><Link href="/docs/core/responsive-design">Explore breakpoints ↗</Link></div>
            <h3>Adapt by viewport or local space.</h3>
            <p>Compose mobile-first breakpoints, exact ranges, media features, and named container queries without runtime listeners.</p>
            <div className="showcase-layout" aria-hidden="true"><aside /><div><i /><i /><i /></div></div>
            <code>md:co-grid-cols-2 @lg/card:co-grid-cols-3</code>
          </article>
          <article className="showcase-card showcase-ai">
            <div className="showcase-meta"><span>03 · AI CONTRACT</span><a href="/api/capabilities">Open API ↗</a></div>
            <h3>Generate only what really ships.</h3>
            <p>Agents can inspect capability status, class patterns, resolved declarations, variants, and limitations before writing code.</p>
            <pre><code>{`{
  "framework": "Coordiation CSS",
  "status": "complete",
  "candidate": "md:co-grid-cols-3"
}`}</code></pre>
          </article>
        </div>
      </section>

      <section className="engine-section" id="engine">
        <div className="engine-copy">
          <p className="kicker kicker-light">THE ENGINE</p>
          <h2>From template<br />to tiny CSS.</h2>
          <p>Coordiation reads your source as text, resolves every candidate against your tokens, composes its variants, and emits deterministic CSS.</p>
          <ol className="engine-steps">
            <li><span>01</span><div><b>Scan</b><small>Find complete utility candidates</small></div></li>
            <li><span>02</span><div><b>Resolve</b><small>Connect utilities to design tokens</small></div></li>
            <li><span>03</span><div><b>Compose</b><small>Apply variants and conditions</small></div></li>
            <li><span>04</span><div><b>Emit</b><small>Write static, layered CSS</small></div></li>
          </ol>
        </div>
        <div className="engine-terminal">
          <div className="terminal-title"><span>coordiation-css</span><span>● LIVE</span></div>
          <div className="terminal-body">
            <p><span className="prompt">$</span> coordiation-css --content src</p>
            <p className="terminal-muted">Scanning <b>src/**/*.{`{coord,tsx,html}`}</b></p>
            <div className="terminal-meter"><span /></div>
            <p><span className="terminal-check">✓</span> {familyCount} utility families loaded</p>
            <p><span className="terminal-check">✓</span> {utilityCount} static utilities indexed</p>
            <p><span className="terminal-check">✓</span> 0 unsupported utilities</p>
            <div className="terminal-result">
              <span>utility-registry.json</span>
              <strong>{verifiedExampleCount} verified</strong>
              <small>AI-readable manifest</small>
            </div>
          </div>
        </div>
      </section>

      <section className="ai-native-section">
        <div>
          <p className="kicker kicker-light">BUILT FOR HUMAN + AI TEAMS</p>
          <h2>A support contract,<br />not a guessing game.</h2>
          <p>Coordiation publishes the exact capabilities and utilities an agent may use. Every generated class can be traced back to a tested declaration.</p>
          <div className="ai-native-actions"><a href="/llms.txt">Read llms.txt →</a><a href="/api/capabilities">Capability API →</a></div>
        </div>
        <div className="ai-contract-card">
          <div><span>AGENT CHECKLIST</span><span>LIVE</span></div>
          <ol><li><b>01</b><span>Read framework instructions</span><code>/llms.txt</code></li><li><b>02</b><span>Inspect support status</span><code>/api/capabilities</code></li><li><b>03</b><span>Resolve exact utilities</span><code>/api/utilities</code></li><li><b>04</b><span>Emit literal candidates</span><code>co-*</code></li></ol>
        </div>
      </section>

      <section className="section quick-start" id="quick-start">
        <div className="section-heading compact">
          <p className="kicker">QUICK START</p>
          <h2>Start with Vite.</h2>
          <p>Install the independent compiler and official adapter, then import one generated virtual stylesheet.</p>
        </div>
        <div className="install-card">
          <div className="install-tabs"><span className="active">Vite</span><span>PostCSS</span><span>CLI</span><i>RECOMMENDED</i></div>
          <code><span>$</span> pnpm add -D @coordiation/css @coordiation/vite</code>
          <div className="install-divider" />
          <pre><span className="muted">{"/* src/coordiation.css */"}</span>{`\n`}@coordiation;{`\n\n`}@co-theme {`{`}{`\n`}  --co-color-product: oklch(62% 0.2 260);{`\n`}{`}`}</pre>
          <div className="install-next"><Link href="/docs/installation/using-vite">Continue with the Vite guide <span>→</span></Link></div>
        </div>
      </section>

      <section className="section integrations-section" id="integrations">
        <div className="section-heading">
          <p className="kicker">OFFICIAL ADAPTERS</p>
          <h2>Use the pipeline<br />you already have.</h2>
          <p>Every adapter shares one scanner, compiler, theme model, diagnostics contract, and static output.</p>
        </div>
        <div className="homepage-integration-grid">
          {integrations.map((integration, index) => <Link href={integration.href} key={integration.name}>
            <div><span>0{index + 1}</span><span>{integration.label}</span></div>
            <h3>{integration.name}</h3>
            <p>{integration.description}</p>
            <code>{integration.code}</code><b>→</b>
          </Link>)}
        </div>
      </section>

      <section className="section roadmap-section" id="roadmap">
        <div className="roadmap-copy">
          <p className="kicker">ROAD TO 1.0</p>
          <h2>Built in the open.<br />Measured honestly.</h2>
          <p>Every capability is tracked, tested, and promoted only when it is truly ready. Planned developer tooling stays visibly separate from shipped framework behavior.</p>
          <Link href="/release-check">Open release check <span>→</span></Link>
        </div>
        <div className="roadmap-list">
          {roadmap.map(({ name, status }, index) => (
            <div className="roadmap-row" key={name}>
              <span className="roadmap-number">0{index + 1}</span>
              <strong>{name}</strong>
              <span className={`roadmap-status ${statusClass[status]}`}><i />{statusLabel[status]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <img src="/coordiation-logo-white.png" alt="" />
        <p className="kicker kicker-light">COORDIATION STARTS HERE</p>
        <h2>Build the interface.<br />Keep the system.</h2>
        <Link className="button button-white" href="/docs/installation/using-vite">Read the installation guide <span>→</span></Link>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <img src="/coordiation-logo.png" alt="" />
          <span>Coordiation</span><span className="brand-product">CSS</span>
        </a>
        <p>Independent utility-first CSS for the Coordiation framework.</p>
        <span>© 2026 Coordiation</span>
      </footer>
    </main>
  );
}
