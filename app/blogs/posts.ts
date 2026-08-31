export type BlogSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
  quote?: string;
};

export type BlogPost = {
  slug: string;
  number: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  displayDate: string;
  readingTime: string;
  icon: string;
  tone: "lime" | "blue" | "orange" | "violet" | "sand" | "mint";
  keywords: string[];
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-ai-agents-need-product-contracts",
    number: "01",
    title: "Why AI agents need product contracts, not larger prompts",
    dek: "A bigger prompt does not fix an unclear decision. Guided questions can turn a request into a specification that people, designers, developers, and agents can all verify.",
    category: "AI & product",
    date: "2026-08-31",
    displayDate: "August 31, 2026",
    readingTime: "8 min read",
    icon: "document-text",
    tone: "lime",
    keywords: ["AI agents", "product contracts", "specification", "PRD"],
    sections: [
      { heading: "The prompt is not the product contract", paragraphs: ["A user request is often intentionally short: create a login page, add billing, make a dashboard, or launch a marketing site. That sentence is valuable because it names the desired direction, but it does not yet define behavior, boundaries, or proof of completion.", "Adding more instructions to the same prompt can create the appearance of detail without resolving the decisions that matter. An agent may produce a polished screen while silently choosing authentication methods, validation rules, recovery states, permissions, analytics, or responsive behavior on the user's behalf."], quote: "Clarity does not come from a longer prompt. It comes from decisions that somebody can inspect and approve." },
      { heading: "Ask questions people can actually answer", paragraphs: ["A useful interview explains why a decision matters, gives a concrete example, recommends a safe default, and lets the user accept or change it. The user should never be left facing a technical question with no frame of reference.", "For a login experience, ask whether people sign in with email and password, a magic link, or a provider. Explain how that choice changes fields, recovery, security, and delivery states. Recommend a default appropriate to the product, then record the answer."], points: ["State the visible impact of the decision.", "Use a realistic example rather than implementation jargon.", "Offer one recommended default with a reason.", "Record assumptions and unresolved choices instead of hiding them."] },
      { heading: "Turn accepted answers into versioned evidence", paragraphs: ["The accepted interview becomes a Specification. The PRD then derives user stories, state models, functional requirements, non-functional requirements, risks, and acceptance criteria from that exact revision.", "When a requirement changes, downstream UX, prototype, development, and QA evidence can be marked stale. This is the practical advantage of a contract: every participant knows what changed, what remains valid, and what must be verified again."], points: ["Reference the Specification revision from the PRD.", "Map acceptance criteria to current-revision evidence.", "Require named approvals at lifecycle gates.", "Keep unresolved warnings visible until their cause is addressed."] },
    ],
  },
  {
    slug: "from-specification-to-production", number: "02", title: "From specification to production: one connected product loop", dek: "The handoff is where product intent usually disappears. A connected lifecycle keeps decisions, artifacts, and evidence attached from discovery through production.", category: "Product operations", date: "2026-08-29", displayDate: "August 29, 2026", readingTime: "7 min read", icon: "layers-minimalistic", tone: "blue", keywords: ["product lifecycle", "PRD", "UX", "QA", "production"],
    sections: [
      { heading: "A handoff should transfer intent, not just files", paragraphs: ["Specifications, wireframes, source code, test results, and deployment logs often live in separate tools. Each artifact may be correct on its own while the product drifts between them.", "A connected product loop gives every artifact an upstream contract and a current revision. UX can show which requirement a flow satisfies. QA can show which acceptance criterion a test proves. Production can show which approved revision is running."] },
      { heading: "Gates make progress honest", paragraphs: ["A gate is not bureaucracy. It is a named decision about whether the current evidence is sufficient to advance. The important word is current: an approval for an older requirement should not pass a newer revision."], points: ["Specification approved", "PRD approved", "UX reviewed", "Prototype accepted", "Development complete", "QA passed", "Release approved", "Production healthy"] },
      { heading: "Let change travel forward visibly", paragraphs: ["Change is normal. Hidden change is expensive. When a requirement moves, identify the affected artifacts and checks rather than restarting the entire project or pretending the previous evidence still applies.", "This produces a product history that both humans and agents can follow: not a pile of documents, but a chain of decisions and proof."] },
    ],
  },
  {
    slug: "zero-browser-runtime-design-constraint", number: "03", title: "Zero browser runtime is a design constraint, not a slogan", dek: "Static CSS changes the architecture of a framework. It also changes what tooling must make visible before code reaches the browser.", category: "Engineering", date: "2026-08-26", displayDate: "August 26, 2026", readingTime: "6 min read", icon: "code-square", tone: "orange", keywords: ["CSS compiler", "zero runtime", "frontend performance", "static CSS"],
    sections: [
      { heading: "Move uncertainty into the build", paragraphs: ["A runtime-free CSS engine does not inspect component state in the browser. It discovers literal candidates in source, resolves them through registries and theme contracts, and emits static CSS before deployment.", "That boundary removes styling work from the client, but it also demands better build diagnostics. Unsupported candidates, dynamic construction, missing source roots, and ambiguous values must be observable while the developer can still fix them."] },
      { heading: "Literal classes are an interface", paragraphs: ["A complete class such as md:co-grid-cols-3 is readable by a person, a scanner, an editor, CI, and an AI agent. A dynamically concatenated class hides the finite values that the compiler needs to see."], points: ["Map conditions to complete class strings.", "Safelist only a known finite set.", "Keep the configured prefix explicit.", "Use compiler diagnostics as support evidence."] },
      { heading: "Performance remains a product decision", paragraphs: ["Zero runtime does not automatically make an application fast. Images, fonts, data loading, hydration, third-party scripts, and component architecture still matter.", "The useful claim is narrower and testable: the CSS engine adds no styling runtime to the browser. That leaves teams with one less client-side system to initialize, debug, and pay for on every visit."] },
    ],
  },
  {
    slug: "open-code-components-are-easier-to-audit", number: "04", title: "Open-code components are easier to audit and easier to own", dek: "A component registry can deliver accessible source without turning the application into a dependency graph that nobody understands.", category: "Interface systems", date: "2026-08-23", displayDate: "August 23, 2026", readingTime: "6 min read", icon: "widget", tone: "violet", keywords: ["open-code components", "accessibility", "design systems", "React"],
    sections: [
      { heading: "Installation should end in readable source", paragraphs: ["An open-code installer is a delivery mechanism. It resolves a known registry record, checks safe target paths, prevents accidental overwrites, and writes the component into the application.", "After that, the file belongs to the product. Teams can inspect semantics, remove unused variants, adapt the API, and keep behavior aligned with their own requirements."] },
      { heading: "Ownership includes the accessibility contract", paragraphs: ["Owning source does not mean discarding the behavior that made it dependable. Labels, descriptions, focus movement, keyboard input, error announcements, disabled states, and client boundaries are part of the component contract."], points: ["Prefer native semantics before adding ARIA.", "Keep focus visible and reading order predictable.", "Test content at realistic lengths.", "Document client/server boundaries explicitly."] },
      { heading: "Registries keep customization traceable", paragraphs: ["A registry lets tools and agents select an exact stable component rather than inventing names or copying an unrelated implementation. It can declare source files, dependencies, usage, stability, and accessibility requirements alongside the visual preview.", "The result combines freedom with a reference point: customize what the product needs, and preserve the contract deliberately."] },
    ],
  },
  {
    slug: "a-registry-is-a-promise-not-a-catalog", number: "05", title: "A registry is a promise, not merely a catalog", dek: "Machine-readable framework data is useful only when it accurately describes what the compiler, installer, and documentation really support.", category: "Tooling", date: "2026-08-19", displayDate: "August 19, 2026", readingTime: "5 min read", icon: "database", tone: "sand", keywords: ["machine-readable registry", "AI tooling", "capabilities", "framework API"],
    sections: [
      { heading: "Discovery needs an exact source", paragraphs: ["People can browse cards and examples. Automated tools need stable names, versions, statuses, import paths, dependencies, and constraints. A registry is the bridge between those two forms of discovery.", "If the registry says a capability is complete, the implementation and tests must agree. If an icon record declares an import, that literal path must resolve. If a theme lists an asset, the installer must bring it with the source."] },
      { heading: "Status is part of the API", paragraphs: ["Complete, partial, and planned are operational states. An agent should use a complete capability freely, use partial only for an explicitly covered case, and never emit planned behavior as working code."], quote: "A truthful limitation is more useful than a confident example that cannot compile." },
      { heading: "Generate counts, verify contracts", paragraphs: ["Homepage counts and release claims should come from versioned manifests, not from manually maintained marketing copy. Registry generation should fail when required records are missing or examples no longer compile.", "That makes the catalog a promise: a small, testable interface between the framework, its documentation, and every agent that depends on it."] },
    ],
  },
  {
    slug: "what-coordination-stable-one-needs", number: "06", title: "What Coordiation 1.0 stable still needs from us", dek: "A release candidate can be feature-complete without being ready for the stable channel. Promotion should follow evidence, not momentum.", category: "Release", date: "2026-08-15", displayDate: "August 15, 2026", readingTime: "5 min read", icon: "rocket-2", tone: "mint", keywords: ["Coordiation 1.0", "release candidate", "stable release", "QA"],
    sections: [
      { heading: "Release candidates are for proving the boundary", paragraphs: ["The first coordinated release candidate brings the compiler, integrations, registries, editor tooling, design assets, and AI lifecycle into one versioned train. That proves the intended shape, not every production environment.", "The next channel lets real projects test the boundary while the latest channel remains stable and unsurprising."] },
      { heading: "Stable means repeatable across environments", paragraphs: ["Before promotion, declared Linux, macOS, and Windows workflows must pass on supported Node versions. Native artifacts must be signed and verified. Clean installs must import every public entry point. Registries, tarballs, documentation, and production endpoints must agree."], points: ["No open release-blocking feedback.", "Current migration and compatibility evidence.", "Accessible and responsive component/theme checks.", "Explicit maintainer approval for the npm latest tag."] },
      { heading: "Feature count is not release evidence", paragraphs: ["A framework can contain hundreds of utilities and still fail a clean install. A theme can look complete and still trap keyboard users. A package can pass local tests and still ship the wrong files.", "Stable is the moment the declared contract has been demonstrated repeatedly enough to become the default. Until then, the honest label is release candidate."] },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

