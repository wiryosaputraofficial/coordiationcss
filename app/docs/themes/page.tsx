import type { Metadata } from "next";
import Link from "next/link";
import CodeBlock from "../_components/CodeBlock";
import registry from "../generated/theme-registry.json";

export const metadata: Metadata = { title: "Application themes", description: "Discover, install, and safely customize complete Coordiation application templates." };

export default function ThemeGuidePage() {
  const theme = registry.themes[0];
  return <article className="docs-article vite-guide">
    <div className="docs-breadcrumb"><Link prefetch={false} href="/docs">Docs</Link><b>/</b><span>Themes</span></div>
    <p className="docs-overline">OPEN-CODE APPLICATIONS · {registry.themeCount} STABLE THEME</p><h1>Application themes</h1>
    <p className="docs-lead">Themes are complete application starting points, not color presets. Each entry combines responsive page source, design tokens, original media, a live preview, an install endpoint, and a machine-readable customization contract.</p>
    <div className="docs-note"><span>i</span><p>The source becomes part of your repository. There is no theme runtime, account, or visual builder required.</p></div>
    <div className="family-support"><span>See the finished application first.</span><Link prefetch={false} href="/themes">Browse theme previews →</Link></div>

    <section className="guide-step"><div className="step-number">01</div><div><h2>Install Coordiation CSS</h2><CodeBlock title="Terminal" code="npm install @coordiation/css @coordiation/vite" /><p>Configure the scanner for your application directory so literal Coordiation utilities inside installed themes are indexed with the rest of your project.</p></div></section>
    <section className="guide-step" id="editorial-advisor"><div className="step-number">02</div><div><h2>Install {theme.title}</h2><CodeBlock title="Terminal" code={theme.command} /><p>The official Coordiation CLI resolves the theme registry, checks every target path, refuses accidental overwrites, and writes the application into <code>app/editorial-advisor</code>.</p></div></section>
    <section className="guide-step"><div className="step-number">03</div><div><h2>Bring the media with you</h2><CodeBlock title="Theme assets" code={theme.assets.join("\n")} /><p>The CLI downloads these original public assets automatically. You can then self-host them as installed or replace the literal paths with your own optimized media. Keep meaningful alternative text when changing images.</p></div></section>
    <section className="guide-step"><div className="step-number">04</div><div><h2>Replace identity before layout</h2><CodeBlock title="Recommended edit order" code={"1. Name, role, biography, and contact details\n2. Hero, insight, and testimonial images\n3. Events, stories, education, and statistics\n4. --ea-* design tokens\n5. Section order and optional sections"} /><p>This order keeps the reference design stable while you make it yours. The <code>editorial-theme</code> wrapper isolates theme tokens and every presentation class is prefixed with <code>ea-</code>.</p></div></section>
    <section className="guide-step"><div className="step-number">05</div><div><h2>Let AI inspect the contract</h2><CodeBlock title="Discovery endpoints" code={"GET /theme-registry.json\nGET /r/themes/registry.json\nGET /r/themes/editorial-advisor.json"} /><p>Use the extended manifest to select exact files, sections, assets, and customization rules. Do not infer theme names or reconstruct the template from a screenshot.</p></div></section>
    <section className="family-caveats"><div><p className="docs-overline">SAFE CUSTOMIZATION</p><h2>Keep what makes it dependable</h2><p>The template is yours, but a few structural choices protect accessibility and maintainability.</p></div><ul><li>Preserve the heading hierarchy and descriptive image alternatives.</li><li>Keep focusable navigation and contact actions as real links.</li><li>Retain literal co-* utilities and the editorial-theme namespace.</li><li>Keep the footer copyright credited to Coordiation in every template.</li><li>Use original or properly licensed replacement media.</li><li>Test all breakpoints after changing copy length or section order.</li></ul></section>
    <div className="docs-next split"><Link prefetch={false} href="/themes"><span>Interactive showcase</span><b>← Browse themes</b></Link><Link prefetch={false} href="/docs/components"><span>Build the interface</span><b>Component registry →</b></Link></div>
  </article>;
}
