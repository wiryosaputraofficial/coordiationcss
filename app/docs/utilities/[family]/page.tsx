import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import { createSeoMetadata } from "@/app/seo";
import { notFound } from "next/navigation";
import CodeBlock from "../../_components/CodeBlock";
import AccessibilityExamples, { AccessibilityMiniNavigation } from "./AccessibilityExamples";
import ArbitraryPropertiesExamples, { ArbitraryPropertiesMiniNavigation } from "./ArbitraryPropertiesExamples";
import BackgroundExamples, { BackgroundMiniNavigation } from "./BackgroundExamples";
import BorderRingExamples, { BorderRingMiniNavigation } from "./BorderRingExamples";
import EffectsExamples, { EffectsMiniNavigation } from "./EffectsExamples";
import FlexGridExamples, { FlexGridMiniNavigation } from "./FlexGridExamples";
import InteractionExamples, { InteractionMiniNavigation } from "./InteractionExamples";
import LayoutExamples, { LayoutMiniNavigation } from "./LayoutExamples";
import SizingExamples, { SizingMiniNavigation } from "./SizingExamples";
import SpacingExamples, { SpacingMiniNavigation } from "./SpacingExamples";
import SvgExamples, { SvgMiniNavigation } from "./SvgExamples";
import TablesColumnsExamples, { TablesColumnsMiniNavigation } from "./TablesColumnsExamples";
import TransformsExamples, { TransformsMiniNavigation } from "./TransformsExamples";
import TransitionsExamples, { TransitionsMiniNavigation } from "./TransitionsExamples";
import TypographyExamples, { TypographyMiniNavigation } from "./TypographyExamples";
import registry from "../../generated/utility-registry.json";

type PageProps = { params: Promise<{ family: string }> };

export function generateStaticParams() {
  return registry.families.map((family) => ({ family: family.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { family: familyId } = await params;
  const family = registry.families.find((item) => item.id === familyId);
  if (!family) return {};
  return createSeoMetadata({
    path: `/docs/utilities/${family.id}`,
    title: `${family.label} utilities — Coordiation CSS`,
    description: family.documentation.summary,
  });
}

export default async function UtilityFamilyPage({ params }: PageProps) {
  const { family: familyId } = await params;
  const index = registry.families.findIndex((item) => item.id === familyId);
  if (index === -1) notFound();
  const family = registry.families[index];
  const previous = registry.families[index - 1];
  const next = registry.families[index + 1];

  return (
    <div className={["layout", "flex-grid", "spacing", "sizing", "typography", "backgrounds", "borders-rings", "effects", "tables-columns", "transforms", "transitions", "svg", "accessibility", "interaction", "arbitrary-properties"].includes(family.id) ? "family-page-frame mini-nav-page-frame" : "family-page-frame"}>
    <article className="docs-article family-guide">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><Link href="/docs/utilities">Utilities</Link><b>/</b><span>{family.label}</span></div>
      <p className="docs-overline">CORE UTILITY FAMILY</p>
      <h1>{family.label}</h1>
      <p className="docs-lead">{family.documentation.summary}</p>
      <div className="family-support"><span className={`docs-status ${family.status}`}><i />{family.status}</span><span>Target v{family.target}</span><span>{family.resolvedExamples.length} verified examples</span><a href={`/api/utilities`}>Registry JSON ↗</a></div>

      <section className="family-intro" id="overview"><p className="docs-overline">WHEN TO USE IT</p><h2>Choose the right tool for the layout.</h2><p>{family.documentation.guidance}</p></section>

      <section className="family-reference" id="quick-reference"><div><p className="docs-overline">QUICK REFERENCE</p><h2>Classes and generated CSS</h2><p>These examples are resolved by the compiler when the registry manifest is generated. A broken example fails the test suite.</p></div><div className="family-reference-table" role="table"><div className="family-reference-head" role="row"><span>Class</span><span>Generated declarations and keyframes</span></div>{family.resolvedExamples.map((example) => <div className="family-reference-row" role="row" key={example.candidate}><code>{example.candidate}</code><code>{example.declarations.map(([property, value]) => `${property}: ${value};`).join(" ")}{example.globalCss ? ` ${example.globalCss}` : ""}</code></div>)}</div></section>

      {family.id === "layout" && <LayoutExamples />}
      {family.id === "flex-grid" && <FlexGridExamples />}
      {family.id === "spacing" && <SpacingExamples />}
      {family.id === "sizing" && <SizingExamples />}
      {family.id === "typography" && <TypographyExamples />}
      {family.id === "backgrounds" && <BackgroundExamples />}
      {family.id === "borders-rings" && <BorderRingExamples />}
      {family.id === "effects" && <EffectsExamples />}
      {family.id === "tables-columns" && <TablesColumnsExamples />}
      {family.id === "transforms" && <TransformsExamples />}
      {family.id === "transitions" && <TransitionsExamples />}
      {family.id === "svg" && <SvgExamples />}
      {family.id === "accessibility" && <AccessibilityExamples />}
      {family.id === "interaction" && <InteractionExamples />}
      {family.id === "arbitrary-properties" && <ArbitraryPropertiesExamples />}

      <section className="family-example" id="basic-usage"><p className="docs-overline">BASIC USAGE</p><h2>Apply a utility directly.</h2><p>Keep the complete class string in your template so the plain-text scanner can discover it without evaluating application code.</p><CodeBlock title="component.coord" code={`<div class="${family.examples.join(" ")}">\n  Your content\n</div>`} /></section>

      <section className="family-concepts" id="how-it-works"><div><p className="docs-overline">HOW IT WORKS</p><h2>Core concepts</h2></div><ol>{family.documentation.concepts.map((concept, conceptIndex) => <li key={concept}><span>{String(conceptIndex + 1).padStart(2, "0")}</span><p>{concept}</p></li>)}</ol></section>

      <section className="family-properties" id="css-properties"><p className="docs-overline">CSS PROPERTIES</p><h2>What this family controls</h2><div>{family.documentation.properties.map((property) => <code key={property}>{property}</code>)}</div></section>

      <section className="family-composition" id="variants"><p className="docs-overline">VARIANTS</p><h2>Responsive and state conditions</h2><p>Prefix any supported utility with responsive or state variants. Variants compose from left to right and the compiler emits the required selector or at-rule.</p><CodeBlock title="component.coord" code={`<div class="${family.examples[0]} md:${family.examples[1] ?? family.examples[0]} hover:${family.examples[0]}">\n  Responsive and state-aware content\n</div>`} /></section>

      {family.supportsArbitrary && <section className="family-composition" id="arbitrary-values"><p className="docs-overline">ARBITRARY VALUES</p><h2>Escape the scale when necessary</h2><p>Use square brackets for a one-off CSS value. Prefer theme tokens for values repeated across components so an AI agent and human reviewer can recognize design intent.</p><CodeBlock title="Arbitrary syntax" code={`${family.patterns[0]}\nco-[content-visibility:auto]`} /></section>}

      {family.supportsNegative && <section className="family-composition" id="negative-values"><p className="docs-overline">NEGATIVE VALUES</p><h2>Reverse supported values</h2><p>Place the minus sign before the framework prefix. Only properties where negative CSS values are meaningful accept this modifier.</p><CodeBlock title="Canonical negative syntax" code={`-co-{utility}\n${family.examples.find((example) => example.startsWith("-")) ?? "-co-mt-4"}`} /></section>}

      <section className="family-caveats" id="limitations"><div><p className="docs-overline">{family.status === "complete" ? "SCOPE BOUNDARIES" : "CURRENT LIMITS"}</p><h2>{family.status === "complete" ? "Intentional boundaries" : "What is not complete yet"}</h2><p>{family.status === "complete" ? "This family is implemented, documented, and tested. These notes define where a neighboring family or browser behavior takes over." : "This family remains marked partial until these limitations are implemented and tested."}</p></div><ul>{family.documentation.caveats.map((caveat) => <li key={caveat}>{caveat}</li>)}</ul></section>

      <div className="docs-next split">{previous ? <Link href={`/docs/utilities/${previous.id}`}><span>Previous</span><b>← {previous.label}</b></Link> : <Link href="/docs/utilities"><span>Previous</span><b>← Utility registry</b></Link>}{next ? <Link href={`/docs/utilities/${next.id}`}><span>Next</span><b>{next.label} →</b></Link> : <Link href="/release-check"><span>Next</span><b>Release Check →</b></Link>}</div>
    </article>
    {family.id === "layout" && <LayoutMiniNavigation />}
    {family.id === "flex-grid" && <FlexGridMiniNavigation />}
    {family.id === "spacing" && <SpacingMiniNavigation />}
    {family.id === "sizing" && <SizingMiniNavigation />}
    {family.id === "typography" && <TypographyMiniNavigation />}
    {family.id === "backgrounds" && <BackgroundMiniNavigation />}
    {family.id === "borders-rings" && <BorderRingMiniNavigation />}
    {family.id === "effects" && <EffectsMiniNavigation />}
    {family.id === "tables-columns" && <TablesColumnsMiniNavigation />}
    {family.id === "transforms" && <TransformsMiniNavigation />}
    {family.id === "transitions" && <TransitionsMiniNavigation />}
    {family.id === "svg" && <SvgMiniNavigation />}
    {family.id === "accessibility" && <AccessibilityMiniNavigation />}
    {family.id === "interaction" && <InteractionMiniNavigation />}
    {family.id === "arbitrary-properties" && <ArbitraryPropertiesMiniNavigation />}
    </div>
  );
}
