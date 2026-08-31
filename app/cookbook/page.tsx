import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import MobileNav from "@/app/_components/MobileNav";
import SolarIcon from "@/app/_components/SolarIcon";
import CodeBlock from "@/app/docs/_components/CodeBlock";
import { createSeoMetadata } from "@/app/seo";
import SectionPreview from "./SectionPreview";
import {
  assemblyCode,
  buildCode,
  ctaCode,
  entryCode,
  faqCode,
  featuresCode,
  footerCode,
  headerCode,
  heroCode,
  iconCode,
  installCode,
  pricingCode,
  proofCode,
  testimonialCode,
  themeCode,
  viteCode,
  workflowCode,
} from "@/app/docs/cookbook/one-page-website/snippets";
import "./cookbook.css";

export const metadata: Metadata = createSeoMetadata({
  path: "/cookbook",
  title: "Coordiation Cookbook — Build a complete one-page website",
  description: "Build a complete responsive product landing page with Coordiation, section by section, including setup, icons, navigation, hero, proof, features, workflow, pricing, FAQ, CTA, footer, accessibility, and production checks.",
});

const architecture = [
  ["01", "Header", "Orientation and navigation"],
  ["02", "Hero", "Promise and primary action"],
  ["03", "Proof", "Credibility through metrics"],
  ["04", "Features", "Three differentiated benefits"],
  ["05", "Workflow", "How the product creates value"],
  ["06", "Testimonial", "Human evidence"],
  ["07", "Pricing", "A clear commitment choice"],
  ["08", "FAQ", "Resolve final objections"],
  ["09", "CTA", "One focused conversion"],
  ["10", "Footer", "Closure and attribution"],
] as const;

const recipes = [
  { id: "header", title: "Header and responsive navigation", role: "Help visitors understand where they are and reach the next important section without searching.", decisions: ["Sticky, semantic header", "Desktop navigation above lg", "Native details menu on compact screens", "One primary action"], file: "src/sections/Header.jsx", code: headerCode },
  { id: "hero", title: "Hero with one useful promise", role: "Explain the outcome, identify the audience, and expose one primary and one secondary path.", decisions: ["Mobile-first one-column base", "Two-column layout at lg", "Outcome-led headline", "Product preview with meaningful status"], file: "src/sections/Hero.jsx", code: heroCode },
  { id: "proof", title: "Proof and measurable outcomes", role: "Replace vague trust language with compact, scannable evidence.", decisions: ["Use a description list for metrics", "Two columns on mobile", "Four columns on wide screens", "Keep labels specific"], file: "src/sections/Proof.jsx", code: proofCode },
  { id: "features", title: "Feature cards that explain value", role: "Connect each capability to a practical reason a customer should care.", decisions: ["Three cards, one job each", "Coordiation icons use literal imports", "Consistent title and copy rhythm", "No decorative feature overload"], file: "src/sections/Features.jsx", code: featuresCode },
  { id: "workflow", title: "A visible four-step workflow", role: "Show what happens after someone starts, reducing uncertainty about the product experience.", decisions: ["Ordered list for sequence", "High-contrast section break", "One sentence per step", "Responsive table-like rows"], file: "src/sections/Workflow.jsx", code: workflowCode },
  { id: "testimonial", title: "Testimonial with accountable attribution", role: "Add human proof after the product model is understood.", decisions: ["One strong quote", "Named role and company", "Accessible star label", "No anonymous praise"], file: "src/sections/Testimonial.jsx", code: testimonialCode },
  { id: "pricing", title: "Pricing with a recommended path", role: "Make the next commitment understandable without hiding important differences.", decisions: ["Three choices maximum", "Team plan visually prioritized", "Benefits use list semantics", "Every card has an action"], file: "src/sections/Pricing.jsx", code: pricingCode },
  { id: "faq", title: "FAQ using native disclosure controls", role: "Answer the final questions without introducing a JavaScript accordion dependency.", decisions: ["Native details and summary", "Keyboard accessible by default", "Questions reflect real objections", "Answers remain concise"], file: "src/sections/Faq.jsx", code: faqCode },
  { id: "cta", title: "Final call to action", role: "Close the page with one clear invitation and no competing navigation.", decisions: ["Contrasting brand surface", "Repeat the primary outcome", "Use a real mail or signup destination", "Icon reinforces the action"], file: "src/sections/FinalCta.jsx", code: ctaCode },
  { id: "footer", title: "Footer, ownership, and icon attribution", role: "End with identity, essential links, contact, copyright, and required Solar icon credit.", decisions: ["Coordiation copyright retained", "Visible Solar attribution", "Small navigation set", "Mobile stack becomes three columns"], file: "src/sections/Footer.jsx", code: footerCode },
] as const;

const toc = [
  ["Outcome", "#outcome"], ["Architecture", "#architecture"], ["Project setup", "#setup"], ["Theme", "#theme"], ["Icon helper", "#icons"],
  ...recipes.map(({ title, id }) => [title.split(" ").slice(0, 3).join(" "), `#${id}`]),
  ["Assemble", "#assemble"], ["Quality checks", "#quality"], ["AI contract", "#ai-contract"],
] as const;

function CookbookPreview() {
  return (
    <div className="cookbook-preview" aria-label="Preview of the completed Relay landing page">
      <header><strong>Relay<span>.</span></strong><nav><span>Features</span><span>Workflow</span><span>Pricing</span></nav><b>Start a project <SolarIcon name="arrow-right" size={14} /></b></header>
      <section className="cookbook-preview-hero">
        <div><small><SolarIcon name="bolt" size={15} /> PRODUCT DELIVERY, MADE CLEAR</small><h2>Turn a useful idea into a product people trust.</h2><p>One connected workflow for requirements, design, development, and release.</p><span>Build your first project <SolarIcon name="arrow-right" size={14} /></span></div>
        <aside><div><small>CURRENT PROJECT</small><strong>Customer workspace</strong></div>{["Requirements approved", "Prototype verified", "Development in progress"].map((item, index) => <p key={item}><b>{index + 1}</b>{item}</p>)}</aside>
      </section>
      <section className="cookbook-preview-stats">{[["12k+", "projects shipped"], ["38%", "less rework"], ["2.4×", "faster handoff"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>
    </div>
  );
}

export default function CookbookPage() {
  return (
    <main className="cookbook-page" id="top">
      <header className="site-header cookbook-header">
        <Link className="brand" href="/" aria-label="Coordiation CSS home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">CSS</span></Link>
        <nav aria-label="Cookbook navigation"><a href="#architecture">Architecture</a><a href="#setup">Setup</a><a href="#assemble">Final assembly</a><Link href="/blogs">Blogs</Link><Link href="/docs">Docs</Link></nav>
        <MobileNav />
        <a className="header-cta" href="#setup">Start recipe <SolarIcon name="arrow-down" size={15} /></a>
      </header>

      <section className="cookbook-hero" id="outcome">
        <div className="cookbook-hero-copy"><p className="kicker">COORDIATION COOKBOOK · COMPLETE RECIPE 001</p><h1>Build one page.<br /><em>Understand every section.</em></h1><p>This cookbook builds a complete React product website with Coordiation from an empty Vite project. Every section has a job, an implementation, responsive decisions, accessibility notes, and copy-ready source.</p><div><a href="#setup">Begin the recipe <SolarIcon name="arrow-down" size={16} /></a><a href="#final-result">Preview the outcome</a></div></div>
        <div className="cookbook-hero-index"><span>Recipe</span><strong>01</strong><dl><div><dt>Sections</dt><dd>10</dd></div><div><dt>Stack</dt><dd>React + Vite</dd></div><div><dt>Runtime</dt><dd>0 CSS runtime</dd></div><div><dt>Level</dt><dd>Foundation → production</dd></div></dl></div>
      </section>

      <div className="cookbook-shell">
        <article className="cookbook-content">
          <section className="cookbook-intro" id="final-result"><p className="docs-overline">FINAL RESULT</p><h2>A complete product landing page</h2><p>The example uses an original product called Relay. Replace its content and tokens with your own identity while preserving the section responsibilities, semantic structure, and responsive contract.</p><CookbookPreview /></section>

          <section className="cookbook-architecture" id="architecture"><p className="docs-overline">PAGE ARCHITECTURE</p><h2>Ten sections, one intentional journey</h2><p>A landing page should answer questions in the order a visitor experiences them: what is this, why trust it, how does it work, what does it cost, and what should I do next?</p><div>{architecture.map(([number, title, purpose]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{purpose}</p></article>)}</div></section>

          <section className="cookbook-step" id="setup"><div className="cookbook-step-heading"><span>00</span><div><p className="docs-overline">PROJECT FOUNDATION</p><h2>Create and connect the project</h2><p>Start with React + Vite, then add the Coordiation compiler, Vite adapter, and icon registry from the current release-candidate channel.</p></div></div><CodeBlock title="Terminal" code={installCode} /><CodeBlock title="vite.config.js" code={viteCode} /><CodeBlock title="src/main.jsx" code={entryCode} /><div className="cookbook-note"><SolarIcon name="info-circle" size={19} /><p>Keep every directory containing JSX inside <code>content</code>. The scanner can only generate utilities it can see as complete literal class names.</p></div></section>

          <section className="cookbook-step" id="theme"><div className="cookbook-step-heading"><span>01</span><div><p className="docs-overline">DESIGN TOKENS</p><h2>Define the theme before composing sections</h2><p>The theme establishes a small brand scale while preflight and all used utilities remain generated by Coordiation.</p></div></div><CodeBlock title="src/coordiation.css" code={themeCode} /><ul className="cookbook-checks"><li>Use semantic brand steps instead of repeating arbitrary colors.</li><li>Keep authored global CSS limited to project-wide behavior.</li><li>Respect reduced-motion preferences from the first commit.</li></ul></section>

          <section className="cookbook-step" id="icons"><div className="cookbook-step-heading"><span>02</span><div><p className="docs-overline">TREE-SHAKEABLE ICONS</p><h2>Create one safe icon boundary</h2><p>Every icon is imported from an exact Coordiation path. The helper renders trusted package-owned SVG strings and gives meaningful icons an accessible label.</p></div></div><CodeBlock title="src/Icon.jsx" code={iconCode} /><div className="cookbook-note"><SolarIcon name="shield-check" size={19} /><p>Never construct an icon import dynamically. Literal paths keep bundles tree-shakeable and let AI agents verify names against the registry.</p></div></section>

          {recipes.map((recipe, index) => <section className="cookbook-step cookbook-recipe" id={recipe.id} key={recipe.id}><div className="cookbook-step-heading"><span>{String(index + 3).padStart(2, "0")}</span><div><p className="docs-overline">SECTION RECIPE</p><h2>{recipe.title}</h2><p>{recipe.role}</p></div></div><div className="cookbook-live-panel"><div><span>Live preview</span><code>{recipe.id}.section</code></div><SectionPreview section={recipe.id} /></div><div className="cookbook-decisions"><strong>Design contract</strong><ul>{recipe.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul></div><CodeBlock title={recipe.file} code={recipe.code} /></section>)}

          <section className="cookbook-step" id="assemble"><div className="cookbook-step-heading"><span>13</span><div><p className="docs-overline">FINAL ASSEMBLY</p><h2>Compose the page without hiding its structure</h2><p>The final file reads like the page outline. Each section remains independently editable, testable, and understandable to a human or AI agent.</p></div></div><CodeBlock title="src/App.jsx" code={assemblyCode} /><div className="cookbook-note"><SolarIcon name="accessibility" size={19} /><p>The skip link is visually hidden until keyboard focus reaches it. Keep <code>main</code>, section IDs, headings, navigation labels, lists, and disclosure elements semantic.</p></div></section>

          <section className="cookbook-quality" id="quality"><p className="docs-overline">PRODUCTION CHECK</p><h2>Verify behavior, not only appearance</h2><div className="cookbook-quality-grid"><article><strong>320px</strong><p>No horizontal page overflow, reachable mobile navigation, full-width actions, and readable code/content.</p></article><article><strong>768px</strong><p>Grid enhancements must preserve reading order and touch targets.</p></article><article><strong>1280px</strong><p>Content remains constrained; lines do not stretch across the entire viewport.</p></article><article><strong>Keyboard</strong><p>Skip link, navigation, pricing links, FAQ disclosures, CTA, and footer links are reachable.</p></article><article><strong>Motion</strong><p>All nonessential transitions stop when reduced motion is requested.</p></article><article><strong>Content</strong><p>Every headline states an outcome and every action names what happens next.</p></article></div><CodeBlock title="Terminal" code={buildCode} /></section>

          <section className="family-caveats cookbook-ai-contract" id="ai-contract"><div><p className="docs-overline">AI GENERATION CONTRACT</p><h2>Keep generated pages predictable</h2><p>Give an agent these constraints before asking it to change or extend the recipe.</p></div><ul><li>Use only complete literal <code>co-*</code> candidates.</li><li>Use Coordiation icons from exact registry imports.</li><li>Preserve section responsibility and semantic reading order.</li><li>Start mobile-first, then enhance at named breakpoints.</li><li>Never hide an essential action behind hover alone.</li><li>Keep Coordiation copyright and required icon attribution.</li><li>Run the production build after any content or class change.</li></ul></section>

          <div className="cookbook-finish"><span>Recipe complete</span><h2>You now have a production-shaped page, not a disconnected collection of sections.</h2><div><Link href="/docs/core/responsive-design">Deepen responsive design</Link><Link href="/components">Browse Coordiation components</Link><a href="#top">Back to top</a></div></div>
        </article>

        <aside className="cookbook-toc" aria-label="Cookbook sections"><span>On this recipe</span><ol>{toc.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol></aside>
      </div>

      <footer className="docs-footer cookbook-footer"><Link className="brand footer-brand" href="/"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">CSS</span></Link><p>Cookbooks turn framework capabilities into complete, explainable outcomes.</p><span>© 2026 Coordiation</span></footer>
    </main>
  );
}
