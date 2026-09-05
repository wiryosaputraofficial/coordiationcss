"use client";

import { useState, type FormEvent } from "react";
import ThemeIcon from "../ThemeIcon";

const services = ["Brand strategy", "Visual identity", "Product design", "Website", "Motion system", "Not sure yet"];
const budgets = ["$10k–25k", "$25k–50k", "$50k–100k", "$100k+", "Let’s discuss"];

export default function ProjectBriefForm() {
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState<{ name: string; mailto: string } | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const selectedServices = data.getAll("service");
    const body = ["Hello Spectrum,", "", `My name is ${name}. I would like to discuss a new project.`, "", `Company: ${data.get("company") || "—"}`, `Website: ${data.get("website") || "—"}`, `Email: ${data.get("email") || "—"}`, `Services: ${selectedServices.length ? selectedServices.join(", ") : "Open to discussion"}`, `Budget: ${data.get("budget") || "—"}`, `Ideal start: ${data.get("timeline") || "—"}`, `How I found Spectrum: ${data.get("source") || "—"}`, "", "Project context:", String(data.get("details") || "")].join("\n");
    setSuccess({ name, mailto: `mailto:hello@spectrum.studio?subject=${encodeURIComponent(`New project enquiry — ${data.get("company") || name}`)}&body=${encodeURIComponent(body)}` });
    requestAnimationFrame(() => document.querySelector<HTMLElement>(".sp-form-success")?.focus({ preventScroll: false }));
  };

  if (success) return <section className="sp-form-success" tabIndex={-1} aria-live="polite"><p className="sp-kicker">Brief prepared</p><h2>THANK YOU,<br /><span>{success.name.toUpperCase()}, WE&apos;RE READY.</span></h2><p>Your project brief is ready to send. Continue by email so it reaches the Spectrum team directly.</p><a className="co-inline-flex co-items-center" href={success.mailto}>Continue by email <ThemeIcon name="arrow-right" size={18} /></a><button type="button" onClick={() => setSuccess(null)}>Edit your brief</button></section>;

  return <form className="sp-project-form" onSubmit={submit}>
    <fieldset className="sp-form-step"><legend><span>01</span><strong>About you</strong></legend><div className="sp-form-grid is-two co-grid"><label className="sp-field"><span>Your name *</span><input type="text" name="name" autoComplete="name" placeholder="How should we address you?" required /></label><label className="sp-field"><span>Work email *</span><input type="email" name="email" autoComplete="email" placeholder="you@company.com" required /></label><label className="sp-field"><span>Company / organisation</span><input type="text" name="company" autoComplete="organization" placeholder="Where do you work?" /></label><label className="sp-field"><span>Website</span><input type="url" name="website" inputMode="url" placeholder="https://" /></label></div></fieldset>
    <fieldset className="sp-form-step"><legend><span>02</span><strong>What do you need?</strong></legend><div className="sp-choice-grid is-services co-grid">{services.map((service)=><label className="sp-choice" key={service}><input type="checkbox" name="service" value={service} /><span>{service}</span></label>)}</div></fieldset>
    <fieldset className="sp-form-step"><legend><span>03</span><strong>Shape of the project</strong></legend><div className="sp-form-block"><p className="sp-form-label">Indicative budget *</p><div className="sp-choice-grid is-budget co-grid">{budgets.map((budget,index)=><label className="sp-choice" key={budget}><input type="radio" name="budget" value={budget} required={index === 0} /><span>{budget}</span></label>)}</div></div><div className="sp-form-grid is-two is-spaced co-grid"><label className="sp-field"><span>Ideal start *</span><select name="timeline" defaultValue="" required><option value="" disabled>Choose a timeframe</option><option>As soon as possible</option><option>Within 1–2 months</option><option>Within 3–6 months</option><option>Later this year</option><option>Still exploring</option></select></label><label className="sp-field"><span>How did you hear about us?</span><input type="text" name="source" placeholder="Referral, search, social…" /></label></div></fieldset>
    <fieldset className="sp-form-step"><legend><span>04</span><strong>The useful context</strong></legend><label className="sp-field is-textarea"><span>What should we know? *</span><textarea name="details" rows={7} maxLength={1200} placeholder="What is changing, why now, and what would a successful outcome look like?" onChange={(event)=>setCount(event.target.value.length)} required /><small>{count} / 1200</small></label></fieldset>
    <div className="sp-form-submit co-flex co-items-center co-justify-between"><p>We usually reply within 2–3 working days. Your details are only used to respond to this enquiry.</p><button className="co-inline-flex co-items-center co-justify-center" type="submit">Send project brief <ThemeIcon name="arrow-right" size={19} /></button></div>
  </form>;
}
