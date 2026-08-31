export const installCode = `npm create vite@latest useful-launch -- --template react
cd useful-launch
npm install
npm install -D @coordiation/css@next @coordiation/vite@next
npm install @coordiation/icons@next`;

export const viteCode = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import coordiation from "@coordiation/vite";

export default defineConfig({
  plugins: [
    react(),
    coordiation({
      content: ["src"],
      cssFile: "src/coordiation.css",
      sourceMap: true,
      toolchain: { minify: process.env.NODE_ENV === "production" },
    }),
  ],
});`;

export const themeCode = `@import "@coordiation/icons/style.css";
@coordiation;

@co-theme {
  --co-color-brand-50: #eef7ff;
  --co-color-brand-100: #d9edff;
  --co-color-brand-500: #1677ff;
  --co-color-brand-600: #0f62d8;
  --co-color-brand-700: #0d4fa9;
}

html { scroll-behavior: smooth; }
body { background: #fff; color: #101114; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}`;

export const entryCode = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "virtual:coordiation.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode><App /></StrictMode>
);`;

export const iconCode = `import { renderIcon } from "@coordiation/icons";
import { ArrowRightLinearIcon } from "@coordiation/icons/linear/arrow-right";
import { BoltLinearIcon } from "@coordiation/icons/linear/bolt";
import { CheckCircleLinearIcon } from "@coordiation/icons/linear/check-circle";
import { LetterLinearIcon } from "@coordiation/icons/linear/letter";
import { ShieldCheckLinearIcon } from "@coordiation/icons/linear/shield-check";
import { StarLinearIcon } from "@coordiation/icons/linear/star";

export const icons = {
  arrow: ArrowRightLinearIcon,
  bolt: BoltLinearIcon,
  check: CheckCircleLinearIcon,
  letter: LetterLinearIcon,
  shield: ShieldCheckLinearIcon,
  star: StarLinearIcon,
};

export function Icon({ source, label, size = 20 }) {
  return (
    <span
      className="co-inline-flex co-items-center co-justify-center"
      dangerouslySetInnerHTML={{
        __html: renderIcon(source, { size, label }),
      }}
    />
  );
}`;

export const headerCode = `import { Icon, icons } from "./Icon";

export function Header() {
  return (
    <header className="co-sticky co-top-0 co-z-50 co-border-b co-border-neutral-200 co-bg-white">
      <div className="co-mx-auto co-flex co-max-w-7xl co-items-center co-justify-between co-px-5 co-py-4 lg:co-px-8">
        <a className="co-text-xl co-font-bold co-tracking-tight" href="#top">
          Relay<span className="co-text-brand-600">.</span>
        </a>

        <nav className="co-hidden co-items-center co-gap-8 lg:co-flex" aria-label="Primary navigation">
          <a className="co-text-sm co-text-neutral-600 hover:co-text-black" href="#features">Features</a>
          <a className="co-text-sm co-text-neutral-600 hover:co-text-black" href="#workflow">Workflow</a>
          <a className="co-text-sm co-text-neutral-600 hover:co-text-black" href="#pricing">Pricing</a>
          <a className="co-text-sm co-text-neutral-600 hover:co-text-black" href="#faq">FAQ</a>
        </nav>

        <a className="co-hidden co-items-center co-gap-2 co-rounded-full co-bg-black co-px-5 co-py-3 co-text-sm co-font-semibold co-text-white lg:co-inline-flex" href="#start">
          Start a project <Icon source={icons.arrow} size={17} />
        </a>

        <details className="co-relative lg:co-hidden">
          <summary className="co-cursor-pointer co-list-none co-rounded-full co-border co-border-neutral-300 co-px-4 co-py-2 co-text-sm co-font-semibold">Menu</summary>
          <nav className="co-absolute co-right-0 co-top-12 co-grid co-min-w-56 co-gap-1 co-rounded-2xl co-border co-border-neutral-200 co-bg-white co-p-3 co-shadow-xl" aria-label="Mobile navigation">
            {[["Features", "#features"], ["Workflow", "#workflow"], ["Pricing", "#pricing"], ["FAQ", "#faq"], ["Start a project", "#start"]].map(([label, href]) => (
              <a className="co-rounded-xl co-px-4 co-py-3 co-text-sm hover:co-bg-neutral-100" href={href} key={href}>{label}</a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}`;

export const heroCode = `import { Icon, icons } from "./Icon";

export function Hero() {
  return (
    <section className="co-overflow-hidden co-border-b co-border-neutral-200" id="top">
      <div className="co-mx-auto co-grid co-max-w-7xl co-items-center co-gap-14 co-px-5 co-py-20 md:co-py-28 lg:co-grid-cols-2 lg:co-px-8 lg:co-py-32">
        <div>
          <p className="co-inline-flex co-items-center co-gap-2 co-rounded-full co-bg-brand-50 co-px-4 co-py-2 co-text-sm co-font-semibold co-text-brand-700">
            <Icon source={icons.bolt} size={17} /> Product delivery, made clear
          </p>
          <h1 className="co-mt-7 co-max-w-3xl co-text-5xl co-font-bold co-leading-none co-tracking-tight md:co-text-7xl">
            Turn a useful idea into a product people trust.
          </h1>
          <p className="co-mt-7 co-max-w-2xl co-text-lg co-leading-8 co-text-neutral-600">
            Relay connects requirements, design, development, and release in one visible workflow—so teams move faster without losing the decisions that matter.
          </p>
          <div className="co-mt-9 co-flex co-flex-col co-gap-3 sm:co-flex-row">
            <a className="co-inline-flex co-items-center co-justify-center co-gap-2 co-rounded-full co-bg-black co-px-6 co-py-4 co-font-semibold co-text-white" href="#start">
              Build your first project <Icon source={icons.arrow} size={18} />
            </a>
            <a className="co-inline-flex co-items-center co-justify-center co-rounded-full co-border co-border-neutral-300 co-px-6 co-py-4 co-font-semibold" href="#workflow">
              See how it works
            </a>
          </div>
          <p className="co-mt-5 co-text-sm co-text-neutral-500">No credit card · Setup in under five minutes</p>
        </div>

        <div className="co-relative co-rounded-3xl co-bg-neutral-950 co-p-4 co-shadow-2xl md:co-p-7" aria-label="Relay project dashboard preview">
          <div className="co-rounded-2xl co-bg-white co-p-5 md:co-p-7">
            <div className="co-flex co-items-center co-justify-between co-border-b co-border-neutral-200 co-pb-5">
              <div><p className="co-text-xs co-uppercase co-tracking-widest co-text-neutral-500">Current project</p><h2 className="co-mt-2 co-text-xl co-font-bold">Customer workspace</h2></div>
              <span className="co-rounded-full co-bg-brand-100 co-px-3 co-py-1 co-text-xs co-font-semibold co-text-brand-700">On track</span>
            </div>
            <ol className="co-mt-6 co-grid co-gap-3">
              {["Requirements approved", "Prototype verified", "Development in progress", "QA ready next"].map((item, index) => (
                <li className="co-flex co-items-center co-gap-3 co-rounded-xl co-bg-neutral-100 co-p-4" key={item}>
                  <span className="co-grid co-size-8 co-place-items-center co-rounded-full co-bg-black co-text-xs co-font-bold co-text-white">{index + 1}</span>
                  <span className="co-text-sm co-font-semibold">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}`;

export const proofCode = `export function Proof() {
  const metrics = [["12k+", "projects shipped"], ["38%", "less rework"], ["2.4×", "faster handoff"], ["99.9%", "traceable decisions"]];
  return (
    <section className="co-border-b co-border-neutral-200" aria-labelledby="proof-title">
      <div className="co-mx-auto co-max-w-7xl co-px-5 co-py-16 lg:co-px-8">
        <p className="co-text-center co-text-sm co-font-semibold co-uppercase co-tracking-widest co-text-neutral-500" id="proof-title">Useful work, measured</p>
        <dl className="co-mt-9 co-grid co-grid-cols-2 co-border co-border-neutral-200 lg:co-grid-cols-4">
          {metrics.map(([value, label]) => <div className="co-border-b co-border-neutral-200 co-p-6 even:co-border-l lg:co-border-b-0 lg:co-border-l" key={label}><dt className="co-text-sm co-text-neutral-500">{label}</dt><dd className="co-mt-3 co-text-4xl co-font-bold co-tracking-tight">{value}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}`;

export const featuresCode = `import { Icon, icons } from "./Icon";

const features = [
  [icons.bolt, "Move with context", "Every decision stays attached to the work it changes."],
  [icons.shield, "Release with confidence", "Evidence and approvals are visible before production."],
  [icons.check, "Keep the contract clear", "Requirements remain testable from discovery through QA."],
];

export function Features() {
  return (
    <section className="co-bg-neutral-50" id="features">
      <div className="co-mx-auto co-max-w-7xl co-px-5 co-py-20 md:co-py-28 lg:co-px-8">
        <p className="co-text-sm co-font-semibold co-uppercase co-tracking-widest co-text-brand-700">Why Relay</p>
        <h2 className="co-mt-5 co-max-w-3xl co-text-4xl co-font-bold co-tracking-tight md:co-text-6xl">Clarity at every handoff.</h2>
        <div className="co-mt-12 co-grid co-gap-5 md:co-grid-cols-3">
          {features.map(([icon, title, copy], index) => (
            <article className="co-rounded-3xl co-border co-border-neutral-200 co-bg-white co-p-7" key={title}>
              <span className="co-grid co-size-12 co-place-items-center co-rounded-2xl co-bg-black co-text-white"><Icon source={icon} size={23} /></span>
              <p className="co-mt-9 co-text-xs co-font-bold co-text-neutral-400">0{index + 1}</p>
              <h3 className="co-mt-3 co-text-2xl co-font-bold">{title}</h3>
              <p className="co-mt-4 co-leading-7 co-text-neutral-600">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}`;

export const workflowCode = `export function Workflow() {
  const steps = [
    ["01", "Describe the outcome", "Turn the initial idea into answerable requirements."],
    ["02", "Shape the experience", "Connect flows, states, content, and accessible behavior."],
    ["03", "Build from evidence", "Keep implementation linked to approved acceptance criteria."],
    ["04", "Release and learn", "Ship with health checks, rollback readiness, and feedback."],
  ];
  return (
    <section className="co-bg-black co-text-white" id="workflow">
      <div className="co-mx-auto co-max-w-7xl co-px-5 co-py-20 md:co-py-28 lg:co-px-8">
        <div className="co-grid co-gap-8 lg:co-grid-cols-2">
          <div><p className="co-text-sm co-font-semibold co-uppercase co-tracking-widest co-text-brand-100">One connected workflow</p><h2 className="co-mt-5 co-text-4xl co-font-bold co-tracking-tight md:co-text-6xl">From idea to production, without the guessing.</h2></div>
          <p className="co-max-w-xl co-self-end co-text-lg co-leading-8 co-text-neutral-400">Each stage inherits the decisions before it. When a requirement changes, the affected work becomes visible instead of silently drifting.</p>
        </div>
        <ol className="co-mt-14 co-grid co-border-t co-border-neutral-700">
          {steps.map(([number, title, copy]) => <li className="co-grid co-gap-4 co-border-b co-border-neutral-700 co-py-7 md:co-grid-cols-[5rem_1fr_1fr] md:co-items-center" key={number}><span className="co-text-sm co-text-brand-100">{number}</span><h3 className="co-text-2xl co-font-bold">{title}</h3><p className="co-leading-7 co-text-neutral-400">{copy}</p></li>)}
        </ol>
      </div>
    </section>
  );
}`;

export const testimonialCode = `import { Icon, icons } from "./Icon";

export function Testimonial() {
  return (
    <section className="co-bg-brand-50">
      <div className="co-mx-auto co-grid co-max-w-7xl co-gap-12 co-px-5 co-py-20 md:co-py-28 lg:co-grid-cols-[.7fr_1.3fr] lg:co-px-8">
        <div><p className="co-text-sm co-font-semibold co-uppercase co-tracking-widest co-text-brand-700">Customer story</p><p className="co-mt-5 co-text-neutral-600">Nusa Health · Product operations</p></div>
        <figure>
          <div className="co-flex co-gap-1 co-text-brand-600" aria-label="Five out of five stars">{Array.from({ length: 5 }).map((_, index) => <Icon source={icons.star} size={19} key={index} />)}</div>
          <blockquote className="co-mt-7 co-text-3xl co-font-semibold co-leading-tight co-tracking-tight md:co-text-5xl">“Relay helped our product and engineering teams agree on what done means before the work became expensive.”</blockquote>
          <figcaption className="co-mt-8 co-text-sm co-text-neutral-600"><strong className="co-text-black">Alya Pradana</strong> · VP Product</figcaption>
        </figure>
      </div>
    </section>
  );
}`;

export const pricingCode = `import { Icon, icons } from "./Icon";

const plans = [
  { name: "Starter", price: "$0", copy: "For one useful experiment.", items: ["1 active project", "Core lifecycle", "Community support"] },
  { name: "Team", price: "$29", copy: "For teams shipping every week.", items: ["Unlimited projects", "Approvals and evidence", "Priority support"], featured: true },
  { name: "Scale", price: "Custom", copy: "For governed product portfolios.", items: ["Organization controls", "Custom adapters", "Release support"] },
];

export function Pricing() {
  return (
    <section id="pricing">
      <div className="co-mx-auto co-max-w-7xl co-px-5 co-py-20 md:co-py-28 lg:co-px-8">
        <div className="co-text-center"><p className="co-text-sm co-font-semibold co-uppercase co-tracking-widest co-text-brand-700">Simple pricing</p><h2 className="co-mt-5 co-text-4xl co-font-bold co-tracking-tight md:co-text-6xl">Start useful. Scale when ready.</h2></div>
        <div className="co-mt-12 co-grid co-gap-5 lg:co-grid-cols-3">
          {plans.map((plan) => <article className={plan.featured ? "co-rounded-3xl co-bg-black co-p-8 co-text-white" : "co-rounded-3xl co-border co-border-neutral-200 co-p-8"} key={plan.name}><p className="co-text-sm co-font-semibold">{plan.name}</p><p className="co-mt-6 co-text-5xl co-font-bold co-tracking-tight">{plan.price}</p><p className={plan.featured ? "co-mt-4 co-text-neutral-400" : "co-mt-4 co-text-neutral-600"}>{plan.copy}</p><ul className="co-mt-8 co-grid co-gap-4">{plan.items.map(item => <li className="co-flex co-items-center co-gap-3 co-text-sm" key={item}><Icon source={icons.check} size={18} />{item}</li>)}</ul><a className={plan.featured ? "co-mt-9 co-block co-rounded-full co-bg-white co-px-5 co-py-3 co-text-center co-font-semibold co-text-black" : "co-mt-9 co-block co-rounded-full co-bg-black co-px-5 co-py-3 co-text-center co-font-semibold co-text-white"} href="#start">Choose {plan.name}</a></article>)}
        </div>
      </div>
    </section>
  );
}`;

export const faqCode = `export function Faq() {
  const questions = [
    ["Can we start with one feature?", "Yes. Start with one measurable capability, then expand only after its contract and evidence are clear."],
    ["Does Relay replace our existing tools?", "No. It connects decisions and evidence while adapters keep your project, design, QA, and deployment tools in place."],
    ["What happens when requirements change?", "The affected artifacts are revised, old evidence becomes stale, and downstream work is made visible for review."],
  ];
  return (
    <section className="co-bg-neutral-50" id="faq">
      <div className="co-mx-auto co-grid co-max-w-7xl co-gap-12 co-px-5 co-py-20 md:co-py-28 lg:co-grid-cols-[.75fr_1.25fr] lg:co-px-8">
        <div><p className="co-text-sm co-font-semibold co-uppercase co-tracking-widest co-text-brand-700">FAQ</p><h2 className="co-mt-5 co-text-4xl co-font-bold co-tracking-tight md:co-text-6xl">Questions before you begin.</h2></div>
        <div className="co-border-t co-border-neutral-300">{questions.map(([question, answer]) => <details className="co-border-b co-border-neutral-300 co-py-6" key={question}><summary className="co-cursor-pointer co-text-lg co-font-semibold">{question}</summary><p className="co-mt-4 co-max-w-2xl co-leading-7 co-text-neutral-600">{answer}</p></details>)}</div>
      </div>
    </section>
  );
}`;

export const ctaCode = `import { Icon, icons } from "./Icon";

export function FinalCta() {
  return (
    <section className="co-bg-brand-600 co-text-white" id="start">
      <div className="co-mx-auto co-max-w-5xl co-px-5 co-py-20 co-text-center md:co-py-28">
        <span className="co-mx-auto co-grid co-size-14 co-place-items-center co-rounded-2xl co-bg-white co-text-brand-700"><Icon source={icons.letter} size={26} /></span>
        <h2 className="co-mt-7 co-text-4xl co-font-bold co-tracking-tight md:co-text-6xl">Build something useful together.</h2>
        <p className="co-mx-auto co-mt-6 co-max-w-2xl co-text-lg co-leading-8 co-text-brand-100">Tell us the outcome you need. We will turn it into a clear first project and show you the next best step.</p>
        <a className="co-mt-9 co-inline-flex co-items-center co-gap-2 co-rounded-full co-bg-white co-px-7 co-py-4 co-font-semibold co-text-brand-700" href="mailto:hello@example.com">Start the conversation <Icon source={icons.arrow} size={18} /></a>
      </div>
    </section>
  );
}`;

export const footerCode = `export function Footer() {
  return (
    <footer className="co-bg-black co-text-white">
      <div className="co-mx-auto co-grid co-max-w-7xl co-gap-10 co-px-5 co-py-14 md:co-grid-cols-3 lg:co-px-8">
        <div><a className="co-text-xl co-font-bold" href="#top">Relay.</a><p className="co-mt-4 co-max-w-xs co-text-sm co-leading-6 co-text-neutral-400">A clearer path from product idea to production evidence.</p></div>
        <nav className="co-grid co-gap-3 co-text-sm" aria-label="Footer navigation"><a href="#features">Features</a><a href="#workflow">Workflow</a><a href="#pricing">Pricing</a></nav>
        <div className="md:co-text-right"><a className="co-text-sm" href="mailto:hello@example.com">hello@example.com</a><p className="co-mt-5 co-text-xs co-text-neutral-500">© 2026 Coordiation. All rights reserved.</p><p className="co-mt-2 co-text-xs co-text-neutral-500">Icons: Solar Icons by 480 Design, CC BY 4.0.</p></div>
      </div>
    </footer>
  );
}`;

export const assemblyCode = `import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Proof } from "./sections/Proof";
import { Features } from "./sections/Features";
import { Workflow } from "./sections/Workflow";
import { Testimonial } from "./sections/Testimonial";
import { Pricing } from "./sections/Pricing";
import { Faq } from "./sections/Faq";
import { FinalCta } from "./sections/FinalCta";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    <>
      <a className="co-sr-only focus:co-not-sr-only focus:co-fixed focus:co-left-4 focus:co-top-4 focus:co-z-50 focus:co-bg-white focus:co-p-3" href="#content">Skip to content</a>
      <Header />
      <main id="content">
        <Hero />
        <Proof />
        <Features />
        <Workflow />
        <Testimonial />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}`;

export const buildCode = `npm run dev

# Verify the production output before deployment
npm run build

# Optional: inspect what the installed compiler supports
npx @coordiation/cli@next compatibility`;
