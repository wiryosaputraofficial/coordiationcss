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
  {
    slug: "questions-that-turn-requests-into-requirements", number: "07", title: "The questions that turn a feature request into a buildable requirement", dek: "Good discovery does not interrogate the user. It explains the decision, recommends a sensible default, and records an answer the whole product team can use.", category: "Product discovery", date: "2026-09-01", displayDate: "September 1, 2026", readingTime: "7 min read", icon: "checklist-minimalistic", tone: "lime", keywords: ["requirements", "product discovery", "guided questions", "AI agents"],
    sections: [
      { heading: "Begin with the outcome, not the screen", paragraphs: ["When someone asks for a dashboard, login page, checkout, or approval flow, the visible interface is only one part of the requirement. First clarify what people must accomplish, who is allowed to do it, and what should be true when the journey succeeds.", "This keeps discovery grounded in the product outcome. It also prevents an agent from treating a familiar screen pattern as permission to invent business rules."], quote: "A useful question reduces uncertainty and teaches the user why the answer matters." },
      { heading: "Make every question answerable", paragraphs: ["Technical questions become easier when they include a plain-language explanation and a concrete example. Instead of asking which authentication protocol to use, ask how people should enter the product and explain the tradeoff between a password, magic link, and an existing identity provider.", "Offer a recommended default based on the stated product. The user can accept it quickly or replace it with something more appropriate."], points: ["Explain the visible consequence.", "Give two or three realistic choices.", "Recommend one default and state why.", "Always allow a short custom answer."] },
      { heading: "Stop when the contract is testable", paragraphs: ["Discovery is complete when the requirement describes actors, states, rules, exceptions, constraints, and acceptance evidence clearly enough that UX and engineering can proceed without silently reopening fundamental decisions.", "Unresolved choices can remain, but they must be visible. A named assumption is safer than a confident implementation built on a guess."] },
    ],
  },
  {
    slug: "accessibility-belongs-in-the-product-contract", number: "08", title: "Accessibility belongs in the product contract, not the final QA pass", dek: "Accessible behavior is easier to design, build, and verify when it is written into the requirement before layouts and component APIs become expensive to change.", category: "Accessibility", date: "2026-08-30", displayDate: "August 30, 2026", readingTime: "7 min read", icon: "accessibility", tone: "blue", keywords: ["accessibility", "WCAG", "product requirements", "inclusive design"],
    sections: [
      { heading: "Accessibility changes product behavior", paragraphs: ["Keyboard order, focus restoration, error announcements, labels, contrast, reduced motion, zoom, and touch targets are not decorative checks. They define how people operate the product.", "If these decisions appear only after development, teams are forced to retrofit interaction models that were never designed to support them."] },
      { heading: "Write acceptance criteria people can observe", paragraphs: ["A useful accessibility requirement describes what a person can do and what evidence proves it. For a dialog, define how focus enters, how it is contained, which keys close it, and where focus returns afterward."], points: ["Every control has an accessible name.", "The complete journey works with a keyboard.", "Errors are associated with their fields and announced.", "Content remains usable at 200% zoom and narrow widths."] },
      { heading: "Automate checks without outsourcing judgment", paragraphs: ["Static analysis and browser automation catch valuable classes of failure, but they cannot decide whether labels are clear, reading order is sensible, or a workflow is understandable.", "The strongest QA combines automated checks with short manual journeys performed against the same product contract."] },
    ],
  },
  {
    slug: "prototype-the-risk-not-every-screen", number: "09", title: "Prototype the risk, not every screen in the product", dek: "A prototype earns its place when it answers a difficult question. Fidelity should follow uncertainty rather than habit or presentation pressure.", category: "UX & prototyping", date: "2026-08-28", displayDate: "August 28, 2026", readingTime: "6 min read", icon: "eye", tone: "orange", keywords: ["prototyping", "UX research", "product risk", "interaction design"],
    sections: [
      { heading: "Name what the prototype must prove", paragraphs: ["A prototype might test whether people understand a new mental model, whether a multi-step task feels manageable, or whether a risky interaction can be operated accessibly. That question determines which states need fidelity and which can remain simple.", "Without a named uncertainty, teams often polish the easiest screens and leave the hardest behavior unexplored."] },
      { heading: "Choose fidelity per decision", paragraphs: ["Paper flows are enough for sequence and information architecture. Clickable wireframes can test navigation and comprehension. Code is justified when timing, responsive behavior, browser semantics, or real data materially affect the answer."], points: ["Use the cheapest artifact that can answer the question.", "Include empty, loading, error, and recovery states.", "Test realistic content rather than perfect placeholders.", "Record the decision produced by the test."] },
      { heading: "A prototype is evidence, not production code", paragraphs: ["Even a coded prototype may contain shortcuts that are unsafe for production. Mark those boundaries explicitly so an agent or developer does not treat exploratory implementation as an approved foundation.", "The durable output is the learning: what was tested, what happened, what changed, and which requirement revision now reflects the result."] },
    ],
  },
  {
    slug: "qa-evidence-should-map-to-product-decisions", number: "10", title: "QA evidence should map back to product decisions", dek: "A green test suite is useful. A test suite that explains which current requirement each result proves is far more valuable to humans and AI agents.", category: "Quality engineering", date: "2026-08-25", displayDate: "August 25, 2026", readingTime: "7 min read", icon: "test-tube", tone: "violet", keywords: ["QA", "acceptance criteria", "test evidence", "traceability"],
    sections: [
      { heading: "Coverage begins with the contract", paragraphs: ["Unit, integration, end-to-end, accessibility, visual, and performance tests answer different questions. The PRD should identify the acceptance criteria, while the QA plan chooses the smallest credible set of evidence for each one.", "This avoids the common situation where many tests pass but the most important user outcome was never exercised."] },
      { heading: "Store evidence with revision context", paragraphs: ["A screenshot, log, trace, or test result should identify the build, environment, requirement revision, and acceptance criterion it supports. When any of those change, the system can explain which evidence is stale."], points: ["Use stable acceptance-criterion IDs.", "Record the tested build and environment.", "Keep failures and waived checks visible.", "Expire evidence when its upstream contract changes."] },
      { heading: "Release decisions become explainable", paragraphs: ["Traceable evidence lets a release approver answer a practical question: what do we currently know about this build? The answer is not a vague confidence score but a set of passed, failed, missing, and consciously accepted checks.", "That makes QA a source of product knowledge instead of a gate that appears only at the end."] },
    ],
  },
  {
    slug: "ai-readable-frontends-use-fewer-guesses", number: "11", title: "AI-readable frontends use fewer guesses, not simply fewer tokens", dek: "Token efficiency comes from stable names, finite choices, examples that compile, and machine-readable boundaries—not from removing the context an agent needs.", category: "AI engineering", date: "2026-08-22", displayDate: "August 22, 2026", readingTime: "6 min read", icon: "cpu-bolt", tone: "sand", keywords: ["AI agents", "token efficiency", "frontend framework", "machine-readable API"],
    sections: [
      { heading: "Ambiguity is expensive", paragraphs: ["When an agent must search source files, infer naming conventions, invent component APIs, and repair unsupported classes, each guess consumes context and creates another opportunity for drift.", "A compact registry with literal import paths, supported variants, examples, status, and constraints gives the agent a bounded decision surface."] },
      { heading: "Compression should preserve decisions", paragraphs: ["The goal is not the shortest possible prompt. The goal is the smallest complete contract. Stable identifiers can replace repeated prose, while examples can demonstrate exact syntax more efficiently than a long explanation."], points: ["Publish exact utility and component names.", "Expose compatibility and stability status.", "Provide one verified example per common task.", "Return actionable diagnostics when a choice is invalid."] },
      { heading: "Measure successful work, not prompt length", paragraphs: ["A shorter prompt that produces three repair cycles is not cheaper. Evaluate total tokens, tool calls, elapsed time, build failures, and human correction needed to reach an accepted result.", "AI-readable infrastructure pays off when the first implementation is closer to the current product contract and easier to verify automatically."] },
    ],
  },
  {
    slug: "design-tokens-are-product-decisions", number: "12", title: "Design tokens are product decisions with reusable names", dek: "A token system becomes valuable when names express durable roles and constraints, allowing themes, components, documentation, and agents to speak the same visual language.", category: "Design systems", date: "2026-08-20", displayDate: "August 20, 2026", readingTime: "6 min read", icon: "palette-round", tone: "mint", keywords: ["design tokens", "CSS variables", "theming", "design systems"],
    sections: [
      { heading: "Name the role before the value", paragraphs: ["A raw color or spacing value describes implementation. A semantic token explains why that value exists: surface, border, primary action, muted text, focus ring, or destructive feedback.", "Role-based names survive a theme change because they preserve intent while the concrete value moves."] },
      { heading: "Keep the system intentionally small", paragraphs: ["A token for every isolated pixel creates a second stylesheet that is harder to understand. Begin with the repeated decisions that shape the product, then add a token only when a stable role emerges."], points: ["Define accessible foreground and background pairs.", "Use a deliberate spacing and type scale.", "Separate semantic roles from brand primitives.", "Document which component contracts consume each role."] },
      { heading: "Make tokens readable by tools", paragraphs: ["Machine-readable token metadata can expose type, allowed values, fallbacks, contrast relationships, and usage examples. An agent can then select a supported role instead of inventing a near-duplicate variable.", "The visual system becomes easier to theme because its decisions are explicit, finite, and testable."] },
    ],
  },
  {
    slug: "what-makes-a-theme-truly-installable", number: "13", title: "What makes a theme truly installable", dek: "A screenshot can inspire a design, but an installable theme must carry source, assets, component contracts, responsive behavior, accessibility, and an honest ownership boundary.", category: "Themes", date: "2026-08-18", displayDate: "August 18, 2026", readingTime: "7 min read", icon: "box-minimalistic", tone: "lime", keywords: ["website themes", "CLI installer", "open code", "responsive design"],
    sections: [
      { heading: "The preview and package must describe the same product", paragraphs: ["A gallery card sets an expectation. The installed files must reproduce the same core sections, design tokens, interactions, assets, and responsive behavior without relying on an undisclosed service or proprietary builder.", "The registry should enumerate every file and dependency so the installer can make the result predictable."] },
      { heading: "Installation must protect the destination", paragraphs: ["A responsible CLI previews the files it will add, validates target paths, refuses silent overwrites, and explains conflicts. It should leave the project with readable source and a clear way to customize content and tokens."], points: ["Use Coordiation classes and official icon components.", "Include local assets with explicit licenses.", "Keep runtime dependencies minimal and declared.", "Provide setup, customization, and removal guidance."] },
      { heading: "Quality lives beyond the hero", paragraphs: ["A useful theme includes complete navigation, forms, long content, empty states, footers, narrow screens, keyboard behavior, and reduced-motion treatment. These are the places where a visual imitation usually breaks.", "Installability is therefore a product contract: what you preview is what you own, and what you own is prepared for real content."] },
    ],
  },
  {
    slug: "versioned-artifacts-prevent-invisible-drift", number: "14", title: "Versioned artifacts prevent invisible product drift", dek: "Requirements, UX, prototypes, code, and test evidence change at different speeds. Revision links make that change visible before outdated proof reaches production.", category: "Product operations", date: "2026-08-17", displayDate: "August 17, 2026", readingTime: "6 min read", icon: "refresh-circle", tone: "blue", keywords: ["versioning", "product artifacts", "change management", "traceability"],
    sections: [
      { heading: "Latest is not always current", paragraphs: ["A recently edited prototype may still be based on an older requirement. A new test run may exercise code that does not include the approved UX change. Timestamps alone cannot describe those relationships.", "Each artifact should identify the upstream revision it implements or verifies."] },
      { heading: "Staleness should be a visible state", paragraphs: ["When a requirement changes, the system can compare links and flag downstream artifacts for review. That does not mean every change invalidates everything. It means the affected owner must confirm what remains valid."], points: ["Keep immutable revision identifiers.", "Record dependency links between artifacts.", "Show stale status in gates and release summaries.", "Require explicit revalidation or a documented no-impact decision."] },
      { heading: "History becomes reusable context", paragraphs: ["Versioned decisions let a new teammate or agent understand why the current product behaves as it does. They can distinguish a deliberate tradeoff from an accidental inconsistency.", "That history reduces rediscovery and gives future changes a trustworthy starting point."] },
    ],
  },
  {
    slug: "a-green-build-is-not-production-readiness", number: "15", title: "A green build is not the same as production readiness", dek: "Compilation proves that source can become an artifact. Production readiness also requires operability, security, rollback, observability, and evidence that real journeys still work.", category: "Production", date: "2026-08-14", displayDate: "August 14, 2026", readingTime: "7 min read", icon: "shield-check", tone: "orange", keywords: ["production readiness", "deployment", "observability", "rollback"],
    sections: [
      { heading: "Define the release boundary", paragraphs: ["Before deployment, identify the exact artifact, configuration, migration set, feature flags, and external services that form the release. A passing build for a different commit is not evidence for the artifact being promoted.", "The release record should connect approved requirements and QA evidence to that immutable build."] },
      { heading: "Prepare for failure before launch", paragraphs: ["A deployment plan needs health checks, logs, metrics, ownership, rollback or roll-forward steps, and thresholds that determine when action is required. These are product safeguards, not infrastructure trivia."], points: ["Verify secrets and configuration without exposing them.", "Exercise migrations and recovery paths.", "Define health and business-success signals.", "Assign an owner for the launch window."] },
      { heading: "Production is another evidence source", paragraphs: ["Synthetic checks can confirm availability, while real telemetry shows whether people complete important journeys. Compare both against expected behavior and privacy constraints.", "A release is complete when the new version is healthy, observable, and understood—not merely when the deployment command exits successfully."] },
    ],
  },
  {
    slug: "native-semantics-make-components-more-durable", number: "16", title: "Native semantics make components more durable", dek: "The browser already provides forms, buttons, dialogs, disclosure, focus, and document structure. Strong components extend those contracts instead of rebuilding them from divs.", category: "Interface engineering", date: "2026-08-12", displayDate: "August 12, 2026", readingTime: "6 min read", icon: "cursor-square", tone: "violet", keywords: ["semantic HTML", "React components", "accessibility", "browser APIs"],
    sections: [
      { heading: "Start from the platform contract", paragraphs: ["A native button participates in forms, keyboard input, focus order, accessibility APIs, and disabled behavior. Recreating that foundation with a generic element introduces a long list of responsibilities that are easy to miss.", "Choose the semantic element that best describes the action before deciding how it should look."] },
      { heading: "Component APIs should preserve meaning", paragraphs: ["Flexible styling is useful, but polymorphism can silently produce invalid or confusing semantics. Keep defaults safe, constrain exceptional rendering, and document what the consumer must preserve."], points: ["Do not use links for actions or buttons for navigation.", "Connect labels, descriptions, and errors programmatically.", "Use progressive enhancement for disclosure and dialogs.", "Test the rendered HTML, not only component props."] },
      { heading: "Native does not mean unstyled or simplistic", paragraphs: ["Coordiation utilities can shape a distinctive visual system while the underlying controls keep their browser contract. Small client components can add behavior only where the platform needs help.", "This produces source that is easier for people and agents to inspect because structure, behavior, and style remain legible."] },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
