import Link from "next/link";

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
    title: "Coord-native scanning",
    description:
      "Reads .coord templates alongside HTML, JSX, Vue, Svelte, Astro, and Markdown without asking you to change how you build.",
    visual: "scan",
  },
  {
    index: "02",
    title: "CSS-first tokens",
    description:
      "Define brand colors, spacing, typography, and breakpoints where they belong — directly in CSS variables.",
    visual: "tokens",
  },
  {
    index: "03",
    title: "Variants that compose",
    description:
      "Stack responsive, state, dark mode, group, peer, ARIA, data, media, and container conditions in one readable class.",
    visual: "variants",
  },
  {
    index: "04",
    title: "Zero browser runtime",
    description:
      "Only the CSS your templates actually use is emitted. The browser receives a small, static stylesheet and nothing else.",
    visual: "runtime",
  },
];

const roadmap = [
  ["Foundation", "Complete", "is-complete"],
  ["Core utilities", "In progress", "is-progress"],
  ["Plugin API", "Planned", "is-planned"],
  ["Language tools", "Planned", "is-planned"],
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <span className="announcement-dot" />
        Coordiation CSS v0.1 is now compiling
        <a href="#roadmap">View the roadmap <span aria-hidden="true">→</span></a>
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
          <a href="#roadmap">Roadmap</a>
          <Link href="/docs">Docs</Link>
          <Link href="/release-check">Release Check</Link>
        </nav>
        <a className="header-cta" href="#quick-start">Get started <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <img className="hero-watermark" src="/coordiation-logo.png" alt="" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span>CO</span> Utility-first. Framework-native.</div>
          <h1>A styling engine built for <em>coordination.</em></h1>
          <p>
            Compose production-ready interfaces from small, predictable utilities.
            Designed from scratch for the Coordiation framework.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#quick-start">Start building <span>→</span></a>
            <a className="button button-light" href="#engine">See how it works</a>
          </div>
          <div className="hero-proof">
            <span><b>0</b> browser runtime</span>
            <span><b>31</b> candidates compiled</span>
            <span><b>.coord</b> native</span>
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
            <span className="line line-focus"><span className="ln">04</span>         <span className="string">md:co-grid-cols-2&quot;</span><span className="muted">&gt;</span></span>
            <span className="line"><span className="ln">05</span>  <span className="muted">&lt;</span><span className="tag">h1</span> <span className="attr">class</span><span className="muted">=</span><span className="string">&quot;co-text-6xl</span></span>
            <span className="line"><span className="ln">06</span>      <span className="string">co-font-bold&quot;</span><span className="muted">&gt;</span></span>
            <span className="line"><span className="ln">07</span>    Move at the speed of thought.</span>
            <span className="line"><span className="ln">08</span>  <span className="muted">&lt;/</span><span className="tag">h1</span><span className="muted">&gt;</span></span>
            <span className="line"><span className="ln">09</span><span className="muted">&lt;/</span><span className="tag">section</span><span className="muted">&gt;</span></span>
          </code></pre>
          <div className="compile-line">
            <span className="compile-check">✓</span>
            <span>Generated in <b>12ms</b></span>
            <span className="compile-size">1.8 kB</span>
          </div>
        </div>
      </section>

      <section className="utility-marquee" aria-label="Example utilities">
        <span className="marquee-label">WRITE LESS CSS</span>
        <div className="marquee-track">
          {[...utilities, ...utilities].map((utility, index) => (
            <code key={`${utility}-${index}`}>{utility}</code>
          ))}
        </div>
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
                {feature.visual === "runtime" && <div className="runtime-visual"><strong>0</strong><span>KB JS</span></div>}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
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
            <p><span className="terminal-check">✓</span> 48 files indexed</p>
            <p><span className="terminal-check">✓</span> 214 candidates resolved</p>
            <p><span className="terminal-check">✓</span> 0 unsupported utilities</p>
            <div className="terminal-result">
              <span>dist/app.css</span>
              <strong>8.4 kB</strong>
              <small>2.1 kB gzip</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section quick-start" id="quick-start">
        <div className="section-heading compact">
          <p className="kicker">QUICK START</p>
          <h2>Three lines to begin.</h2>
          <p>The core compiler has no Tailwind dependency and produces no client-side JavaScript.</p>
        </div>
        <div className="install-card">
          <div className="install-tabs"><span className="active">pnpm</span><span>npm</span><span>bun</span><i>CLI</i></div>
          <code><span>$</span> pnpm add -D @coordiation/css</code>
          <div className="install-divider" />
          <pre><span className="muted">{"/* app.css */"}</span>{`\n`}@coordiation;{`\n\n`}@co-theme {`{`}{`\n`}  --co-color-brand-500: #000;{`\n`}{`}`}</pre>
        </div>
      </section>

      <section className="section roadmap-section" id="roadmap">
        <div className="roadmap-copy">
          <p className="kicker">ROAD TO 1.0</p>
          <h2>Built in the open.<br />Measured honestly.</h2>
          <p>Coordiation CSS is an alpha today. Every capability is tracked, tested, and promoted only when it is truly ready.</p>
          <Link href="/release-check">Open release check <span>→</span></Link>
        </div>
        <div className="roadmap-list">
          {roadmap.map(([name, status, className], index) => (
            <div className="roadmap-row" key={name}>
              <span className="roadmap-number">0{index + 1}</span>
              <strong>{name}</strong>
              <span className={`roadmap-status ${className}`}><i />{status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <img src="/coordiation-logo-white.png" alt="" />
        <p className="kicker kicker-light">COORDIATION STARTS HERE</p>
        <h2>Build the interface.<br />Keep the system.</h2>
        <a className="button button-white" href="#quick-start">Get started with v0.1 <span>→</span></a>
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
