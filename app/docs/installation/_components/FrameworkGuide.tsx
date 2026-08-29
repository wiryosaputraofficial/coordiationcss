import type { ReactNode } from "react";
import Link from "@/app/_components/SiteLink";
import CodeBlock from "../../_components/CodeBlock";

type CodeSample = {
  title: string;
  code: string;
};

type GuideStep = {
  title: string;
  body: ReactNode;
  samples?: CodeSample[];
};

type GuideLink = {
  href: string;
  label: string;
};

export default function FrameworkGuide({
  title,
  platform,
  lead,
  note,
  steps,
  checklist,
  official,
  previous,
  next,
}: {
  title: string;
  platform: string;
  lead: ReactNode;
  note: ReactNode;
  steps: GuideStep[];
  checklist: ReactNode[];
  official: GuideLink;
  previous: GuideLink;
  next: GuideLink;
}) {
  return (
    <article className="docs-article framework-guide">
      <div className="docs-breadcrumb"><Link href="/docs">Docs</Link><b>/</b><span>Installation</span><b>/</b><span>{platform}</span></div>
      <p className="docs-overline">INSTALLATION · {platform.toUpperCase()}</p>
      <h1>{title}</h1>
      <p className="docs-lead">{lead}</p>
      <div className="docs-note"><span>✓</span><p>{note}</p></div>

      {steps.map((step, index) => (
        <section className="guide-step" id={`step-${index + 1}`} key={step.title}>
          <div className="step-number">{String(index + 1).padStart(2, "0")}</div>
          <div>
            <h2>{step.title}</h2>
            <div className="framework-step-copy">{step.body}</div>
            {step.samples?.map((sample) => <CodeBlock title={sample.title} code={sample.code} key={`${step.title}-${sample.title}`} />)}
          </div>
        </section>
      ))}

      <section className="family-caveats" id="production-checklist">
        <div><p className="docs-overline">PRODUCTION CHECKLIST</p><h2>Ship predictable CSS</h2><p>Keep the scanner boundary and generated stylesheet explicit so people, CI, and AI agents produce the same result.</p><a className="framework-official-link" href={official.href} target="_blank" rel="noreferrer">Open {official.label} documentation →</a></div>
        <ul>{checklist.map((item, index) => <li key={index}>{item}</li>)}</ul>
      </section>

      <div className="docs-next split">
        <Link href={previous.href}><span>Previous</span><b>← {previous.label}</b></Link>
        <Link href={next.href}><span>Next</span><b>{next.label} →</b></Link>
      </div>
    </article>
  );
}
