# AI-agent guide

This guide defines the minimum reliable workflow for an AI agent building with Coordiation.

## Goal

An agent should use compact, exact contracts before broad repository inspection. This reduces repeated context loading, prevents invented APIs, and makes the result auditable. It does not eliminate the need to inspect the files directly involved in a change.

## 1. Start from user intent

When a user asks for something broad such as “create a login page,” do not jump directly to code. Run a guided interview that turns ambiguity into answerable decisions.

Every question must include:

- **why the answer matters;**
- **a concrete example;**
- **a recommended default;**
- **a way to confirm or change the recommendation.**

Example:

> How should users sign in? This determines the fields, validation, recovery flow, and security requirements. For example, email/password needs password reset, while a magic link needs email-delivery states. Recommended for a new B2B portal: email/password plus optional Google sign-in. You can accept that recommendation or choose another method.

Do not ask questions the user cannot reasonably answer. When implementation detail is unnecessary, recommend a safe default and explain its visible impact.

## 2. Create the Specification contract

Accepted answers become a versioned Specification rather than remaining only in conversation.

A useful Specification records:

- objective and user outcome;
- actors and permissions;
- in-scope and out-of-scope behavior;
- content and data requirements;
- success, empty, loading, error, disabled, and offline states;
- responsive and accessibility requirements;
- security and privacy constraints;
- analytics or observability expectations;
- assumptions, unresolved questions, and chosen defaults;
- acceptance criteria.

## 3. Derive the PRD

The PRD must reference the Specification revision and turn it into deliverable behavior:

- user stories and jobs to be done;
- functional and non-functional requirements;
- user flows;
- state and error model;
- acceptance criteria mapped to evidence;
- release scope and excluded work;
- dependencies and risks.

When a requirement changes, update the contract revision and mark downstream evidence stale until it is revalidated.

## 4. Inspect the project

```bash
npm install -D @coordiation/agent@next @coordiation/cli@next
npx @coordiation/cli@next inspect
npx @coordiation/cli@next inspect --write
```

Read `.coordiation/agent-manifest.json` before scanning unrelated files. Use full inspection only when file-level data is necessary.

The manifest should expose framework, package manager, installed Coordiation packages, prefix, utility count, warnings, and estimated context size without copying secrets.

## 5. Request one task context pack

```bash
npx @coordiation/cli@next context form --json
```

Choose exactly one initial pack:

| Pack | Use it for |
| --- | --- |
| `page` | General page composition and section hierarchy |
| `navigation` | Headers, sidebars, breadcrumbs, menus, and responsive navigation |
| `form` | Inputs, validation, errors, descriptions, submission, and recovery |
| `dashboard` | Dense data, navigation, charts, tables, filters, and summaries |
| `pricing` | Comparable plans, feature matrices, recommended states, and CTAs |
| `component` | A bounded reusable UI primitive |
| `theme` | A complete installable application theme |

Request another pack only when the scope genuinely expands.

## 6. Design UX before implementation

Produce an inspectable UX artifact that covers:

- information hierarchy;
- primary and secondary actions;
- keyboard order and focus movement;
- responsive layout changes;
- all user-visible states;
- content length boundaries;
- accessibility names and descriptions;
- motion purpose and reduced-motion fallback.

Use a prototype to validate structure and behavior, not to bypass unresolved requirements.

## 7. Select exact Coordiation assets

### Components

Inspect `https://coordiation.com/component-registry.json` or `/api/components`. Install an exact stable record:

```bash
npx @coordiation/cli@next add component button
```

Never invent a component name or import it from a nonexistent runtime UI package.

### Themes

Inspect `https://coordiation.com/theme-registry.json` or `/api/themes`:

```bash
npx @coordiation/cli@next add theme mono-portfolio
```

Never reconstruct a theme from a screenshot. Preserve declared assets, namespace, section semantics, heading hierarchy, and accessibility contract.

### Icons

Inspect `https://coordiation.com/icon-registry.json`. Select by `collectionId` and `name`, then emit the recorded import literally.

Do not concatenate icon import paths, guess names, or remove required attribution.

## 8. Generate safe source

Rules:

1. Keep every `co-*` candidate literal.
2. Map conditional styles to complete strings.
3. Prefer theme variables over repeated arbitrary values.
4. Preserve native semantics before adding ARIA.
5. Reuse Coordiation components and icons before introducing another design system.
6. Maintain keyboard access, visible focus, contrast, touch targets, and reduced motion.
7. Keep code blocks and UI usable at a 320px viewport.
8. Do not suppress a warning by guessing the intended runtime class.

Unsafe:

```tsx
<div className={`co-bg-${tone}`} />
```

Safe:

```tsx
const tones = {
  success: "co-bg-green-600 co-text-white",
  warning: "co-bg-amber-400 co-text-black",
};

<div className={tones[tone]} />
```

## 9. Verify with evidence

Evidence should be tied to the current contract revision.

At minimum:

- production build output;
- lint/type/test results available in the project;
- responsive checks at narrow and wide viewports;
- keyboard and focus behavior;
- accessible names, descriptions, errors, and status messages;
- reduced-motion behavior where animation exists;
- registry validation when manifests changed;
- package/tarball inspection when publication changed;
- deployment health and exact active revision when production changed.

Do not mark a gate passed because an agent says the work “looks correct.” Reference the evidence.

## 10. Advance lifecycle gates

```text
Specification approved
  → PRD approved
  → UX approved
  → Prototype accepted
  → Development complete
  → QA passed
  → Release approved
  → Production healthy
```

Human approval is required where the contract declares it. A terminal instruction such as “finish” does not broaden authority to publish packages, change DNS, or deploy a different system.

## Compact instruction block

Use this in an agent brief:

```text
1. Read .coordiation/agent-manifest.json.
2. Request one relevant context pack.
3. Confirm the current Specification and PRD revision.
4. Select exact Coordiation registry records.
5. Keep all co-* candidates literal.
6. Preserve accessibility, responsive, motion, icon, and licensing contracts.
7. Run the real project checks.
8. Attach current-revision evidence to each gate.
9. Report unresolved warnings; never guess them away.
10. Do not publish or deploy without explicit authority.
```

