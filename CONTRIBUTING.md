# Contributing to Coordiation

Thank you for helping make Coordiation clearer, safer, and more useful for both people and AI agents.

## Before you begin

- Search existing issues and pull requests before opening a new one.
- Use the bug report template for reproducible defects.
- Use the feature request template for a bounded proposal with a concrete user outcome.
- Do not disclose security vulnerabilities in a public issue; follow [SECURITY.md](SECURITY.md).
- Keep release-candidate behavior behind the `next` channel until it is explicitly promoted.

## Local setup

Requirements:

- Node.js `>=22.13.0`
- pnpm 10

```bash
git clone https://github.com/wiryosaputraofficial/coordiationcss.git
cd coordiationcss
pnpm install --frozen-lockfile
pnpm dev
```

Before submitting:

```bash
pnpm lint
pnpm build
```

## Contribution boundaries

### Utilities and examples

- Use the `co-` prefix and canonical negative syntax such as `-co-mt-4`.
- Keep utility candidates literal so the scanner and AI tooling can discover them.
- Do not generate support claims from a visual example; update the capability and utility registries first.
- Prefer theme variables to repeated arbitrary values.
- Include responsive and reduced-motion behavior when the feature needs it.

### Components

- Preserve semantic HTML and keyboard behavior.
- Keep client boundaries explicit.
- Use Coordiation utilities and official icons.
- Update preview, installation example, accessibility contract, and registry record together.
- Test labels, descriptions, validation states, focus visibility, and disabled states.

### Themes

- Use the theme's declared namespace and literal `co-*` utilities.
- Use Coordiation components and icon records rather than adding parallel UI systems.
- Preserve heading hierarchy, descriptive image alternatives, focusable controls, and reduced-motion behavior.
- Keep Coordiation copyright in the footer.
- Declare every source file, component, section, media asset, and customization rule in the registry.
- Use only original or correctly licensed replacement media.

### Documentation

- Write for a user who has not read the source code.
- Put the outcome before implementation detail.
- Keep commands copyable and pin `@next` when documenting the release candidate.
- Link to the canonical machine-readable endpoint when describing registries or capabilities.
- Avoid claims such as “stable,” “complete,” “faster,” or “cheaper” without current evidence.
- Ensure long commands and code blocks remain usable at a 320px viewport.

### AI-agent contracts

- Every question in a guided interview must include context, an example, and a recommended default.
- Accepted answers must become versioned Specification/PRD contracts.
- Never hide unresolved warnings or failed gates.
- Require current-revision evidence before a lifecycle gate passes.
- Keep machine-readable schemas backward compatible or document an explicit migration.

## Pull request checklist

- [ ] The change has one clear user outcome.
- [ ] Existing unrelated behavior was preserved.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] Responsive behavior was checked at narrow and wide viewports when UI changed.
- [ ] Keyboard, focus, contrast, semantics, and reduced motion were checked when interaction changed.
- [ ] Registry, API, documentation, and examples agree.
- [ ] New `co-*` candidates are literal and supported.
- [ ] Licenses and attributions are preserved.
- [ ] No secrets, tokens, personal data, or generated credentials are committed.

## Commit and pull request style

Use a concise imperative subject. Conventional prefixes are welcome:

```text
feat: add questionnaire evidence gate
fix: preserve dropdown arrow state
docs: document Astro installation
chore: refresh generated registries
```

In the pull request body, describe:

1. the problem;
2. the chosen solution;
3. the evidence used to validate it;
4. any compatibility or migration impact.

## Generated and deployment output

Do not commit local build output, caches, credentials, or environment files. The repository ignores `.next`, `.vinext`, `dist`, `.wrangler`, and `.env*`.

Production deployment and npm publication are maintainer operations. A merged source change does not by itself authorize a deployment, npm tag change, or stable release.

