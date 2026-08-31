import SolarIcon from "@/app/_components/SolarIcon";

const previewFeatures = [
  ["bolt", "Move with context", "Decisions stay attached to the work they change."],
  ["shield-check", "Release confidently", "Evidence is visible before production."],
  ["check-circle", "Keep contracts clear", "Requirements remain testable through QA."],
] as const;

export default function SectionPreview({ section }: { section: string }) {
  if (section === "header") return <div className="cb-live cb-live-header"><strong>Relay<span>.</span></strong><nav aria-label="Header example"><a href="#features">Features</a><a href="#workflow">Workflow</a><a href="#pricing">Pricing</a></nav><a className="cb-live-button" href="#start">Start a project <SolarIcon name="arrow-right" size={14} /></a><details><summary>Menu</summary><div><a href="#features">Features</a><a href="#workflow">Workflow</a><a href="#pricing">Pricing</a></div></details></div>;

  if (section === "hero") return <div className="cb-live cb-live-hero"><div><small><SolarIcon name="bolt" size={15} /> PRODUCT DELIVERY, MADE CLEAR</small><h3>Turn a useful idea into a product people trust.</h3><p>Connect requirements, design, development, and release in one visible workflow.</p><div><a href="#start">Build your project <SolarIcon name="arrow-right" size={14} /></a><a href="#workflow">See how it works</a></div></div><aside><header><span>CURRENT PROJECT</span><b>On track</b></header><strong>Customer workspace</strong>{["Requirements approved", "Prototype verified", "Development in progress"].map((item, index) => <p key={item}><i>{index + 1}</i>{item}</p>)}</aside></div>;

  if (section === "proof") return <dl className="cb-live cb-live-proof">{[["12k+", "projects shipped"], ["38%", "less rework"], ["2.4×", "faster handoff"], ["99.9%", "traceable decisions"]].map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;

  if (section === "features") return <div className="cb-live cb-live-features">{previewFeatures.map(([icon, title, copy], index) => <article key={title}><span><SolarIcon name={icon} size={21} /></span><small>0{index + 1}</small><h3>{title}</h3><p>{copy}</p></article>)}</div>;

  if (section === "workflow") return <div className="cb-live cb-live-workflow"><header><small>ONE CONNECTED WORKFLOW</small><h3>From idea to production, without guessing.</h3></header><ol>{[["01", "Describe", "Clarify the outcome."], ["02", "Shape", "Design every state."], ["03", "Build", "Link work to evidence."], ["04", "Release", "Ship and learn safely."]].map(([number, title, copy]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{copy}</p></li>)}</ol></div>;

  if (section === "testimonial") return <figure className="cb-live cb-live-testimonial"><div aria-label="Five out of five stars">{Array.from({ length: 5 }).map((_, index) => <SolarIcon name="star" size={18} key={index} />)}</div><blockquote>“Our teams agreed on what done means before the work became expensive.”</blockquote><figcaption><b>Alya Pradana</b> · VP Product, Nusa Health</figcaption></figure>;

  if (section === "pricing") return <div className="cb-live cb-live-pricing">{[["Starter", "$0", "One useful experiment"], ["Team", "$29", "Ship together every week"], ["Scale", "Custom", "Govern a product portfolio"]].map(([name, price, copy], index) => <article className={index === 1 ? "featured" : ""} key={name}><small>{name}</small><strong>{price}</strong><p>{copy}</p><ul><li><SolarIcon name="check-circle" size={15} /> Clear workflow</li><li><SolarIcon name="check-circle" size={15} /> Traceable evidence</li></ul><a href="#start">Choose {name}</a></article>)}</div>;

  if (section === "faq") return <div className="cb-live cb-live-faq">{[["Can we start with one feature?", "Yes. Begin with one measurable capability and expand after its contract is clear."], ["Does it replace our tools?", "No. Coordiation connects decisions and evidence while your current tools remain in place."], ["What if requirements change?", "Affected work becomes visible and stale evidence cannot approve the new revision."]].map(([question, answer], index) => <details open={index === 0} key={question}><summary>{question}<SolarIcon name="alt-arrow-down" size={16} /></summary><p>{answer}</p></details>)}</div>;

  if (section === "cta") return <div className="cb-live cb-live-cta"><span><SolarIcon name="letter" size={24} /></span><h3>Build something useful together.</h3><p>Tell us the outcome. We will turn it into a clear first project.</p><a href="mailto:hello@example.com">Start the conversation <SolarIcon name="arrow-right" size={15} /></a></div>;

  return <footer className="cb-live cb-live-footer"><div><strong>Relay.</strong><p>A clearer path from product idea to production evidence.</p></div><nav aria-label="Footer example"><a href="#features">Features</a><a href="#workflow">Workflow</a><a href="#pricing">Pricing</a></nav><div><a href="mailto:hello@example.com">hello@example.com</a><p>© 2026 Coordiation.</p><small>Solar Icons by 480 Design, CC BY 4.0.</small></div></footer>;
}
