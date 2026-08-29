export type CapabilityStatus = "complete" | "partial" | "planned";

export type Capability = {
  id: string;
  area: string;
  status: CapabilityStatus;
  target: string;
  examples: string[];
  note: string;
};

export const capabilities: Capability[] = [
  { id: "source-detection", area: "Plain-text source detection", status: "complete", target: "0.1", examples: ["class=\"co-flex\""], note: "Static candidates are extracted without evaluating templates." },
  { id: "framework-scanning", area: "Framework source scanning", status: "complete", target: "0.1", examples: [".coord", ".tsx", ".vue", ".svelte"], note: "Coord, HTML, JSX/TSX, Vue, Svelte, Astro, and Markdown are covered." },
  { id: "static-output", area: "Static CSS / zero runtime", status: "complete", target: "0.1", examples: ["@coordiation;"], note: "Compilation emits layered CSS and no browser JavaScript." },
  { id: "theme-variables", area: "CSS-first theme variables", status: "complete", target: "0.1", examples: ["--co-color-brand-500"], note: "Colors, spacing, fonts, radii, shadows, and breakpoints are tokenized." },
  { id: "custom-prefix", area: "Custom utility prefix", status: "complete", target: "0.1", examples: ["co-flex"], note: "The compiler prefix is configurable." },
  { id: "important", area: "Important utilities", status: "complete", target: "0.1", examples: ["!co-hidden"], note: "Leading and trailing important modifiers are supported." },
  { id: "arbitrary", area: "Arbitrary properties and values", status: "complete", target: "0.2", examples: ["co-text-[length:2rem]", "co-bg-[image:linear-gradient(to_right,#000,#fff)]", "co-[mask-type:luminance]"], note: "Typed ambiguity resolution, escaped underscores, declaration validation, and contextual value inference are implemented and tested." },
  { id: "responsive", area: "Responsive breakpoints", status: "complete", target: "0.1", examples: ["md:co-grid-cols-3"], note: "Named min/max and arbitrary breakpoints compile." },
  { id: "state-variants", area: "State and structural variants", status: "complete", target: "0.2", examples: ["hover:co-bg-black", "nth-[2n+1_of_li]:co-block", "user-invalid:co-border-black", "before:co-block"], note: "Interactive, form, structural, nth, child, open/inert, and pseudo-element variants are registry-backed and exhaustively tested." },
  { id: "context-variants", area: "Dark, RTL, group, and peer", status: "complete", target: "0.2", examples: ["dark:co-text-white", "group-hover/card:co-block", "peer-invalid:co-visible", "in-focus:co-opacity-100"], note: "Dark and bidirectional contexts plus every-state, named, arbitrary, has, nested, and implicit group/peer relationships are registry-backed and tested." },
  { id: "attribute-variants", area: "ARIA, data, has, and not", status: "complete", target: "0.2", examples: ["aria-expanded:co-block", "data-[state=open]:co-block", "has-checked:co-ring-2", "not-focus:co-opacity-50"], note: "Boolean and arbitrary attributes, group/peer composition, has/not conditions, and arbitrary selectors are registry-backed, documented, validated, and tested." },
  { id: "conditional-variants", area: "Media, supports, and container variants", status: "complete", target: "0.2", examples: ["motion-safe:co-transition", "not-supports-[display:grid]:co-block", "@md/sidebar:co-grid-cols-2", "[@media(pointer:fine)]:co-block"], note: "Registered media conditions, feature queries, starting styles, named and arbitrary container queries, and safe arbitrary conditional at-rules are documented and tested." },
  { id: "preflight", area: "Preflight / normalized base", status: "partial", target: "0.2", examples: ["@layer co-base"], note: "A small reset ships and can be disabled." },
  { id: "layout", area: "Layout and positioning", status: "partial", target: "0.2", examples: ["co-flow-root", "co-sticky", "co-overflow-x-auto"], note: "Display, position, inset, float, clear, overflow, object, and visibility utilities ship." },
  { id: "flex-grid", area: "Flexbox and grid", status: "partial", target: "0.2", examples: ["co-flex", "co-grid-cols-12", "co-place-content-between"], note: "Core flex, grid, alignment, span, flow, and auto-track families ship." },
  { id: "spacing-sizing", area: "Spacing and sizing", status: "partial", target: "0.2", examples: ["co-p-4", "-co-mt-2", "co-space-x-6"], note: "Physical/logical spacing, fractions, viewport units, gaps, and sibling space ship." },
  { id: "typography", area: "Typography", status: "partial", target: "0.2", examples: ["co-text-2xl", "co-line-clamp-3", "co-text-balance"], note: "Font, type scale, leading, tracking, decoration, wrapping, and clamp ship." },
  { id: "backgrounds", area: "Backgrounds, gradients, and colors", status: "partial", target: "0.3", examples: ["co-bg-black", "co-bg-cover"], note: "Color, clip, origin, position, size, and repeat ship; gradient composition remains." },
  { id: "borders", area: "Border, outline, ring, and divide", status: "partial", target: "0.3", examples: ["co-border-x-2", "co-ring-2", "co-rounded-t-lg"], note: "Core widths, colors, radii, outline, ring, and divide ship." },
  { id: "effects", area: "Shadow, opacity, blend, and filter", status: "partial", target: "0.3", examples: ["co-shadow-lg", "co-opacity-50"], note: "Shadow and opacity ship; complete filters and blending remain." },
  { id: "tables-columns", area: "Tables and multi-column", status: "partial", target: "0.3", examples: ["co-table-fixed", "co-columns-3"], note: "Table layout, border collapse, caption, display, and columns ship." },
  { id: "transforms", area: "Transforms and perspective", status: "partial", target: "0.3", examples: ["-co-translate-x-4", "co-rotate-45"], note: "2D translate, rotate, scale, skew, and origin ship; 3D composition remains." },
  { id: "transitions", area: "Transitions and animations", status: "partial", target: "0.3", examples: ["co-transition", "co-duration-300"], note: "Transition properties, timing, duration, and delay ship; keyframe presets remain." },
  { id: "svg", area: "SVG fill and stroke", status: "complete", target: "0.2", examples: ["co-fill-current", "co-stroke-black", "co-stroke-2"], note: "Theme/arbitrary fill and stroke colors plus token and arbitrary stroke widths are implemented and tested." },
  { id: "accessibility", area: "Accessibility and forced colors", status: "complete", target: "0.2", examples: ["co-sr-only", "co-forced-color-adjust-none", "co-scheme-light-dark"], note: "Screen-reader visibility, forced-color adjustment, color schemes, and forced-color variants are implemented and tested." },
  { id: "logical", area: "Logical properties and writing modes", status: "partial", target: "0.3", examples: ["co-ms-4", "co-border-s-2"], note: "Logical spacing, inset, and borders ship; writing-mode utilities remain." },
  { id: "modern-color", area: "Modern color and color mixing", status: "partial", target: "0.3", examples: ["co-bg-black/50"], note: "OKLab color-mix opacity ships; full P3 authoring remains." },
  { id: "custom-utility", area: "Custom utility registration", status: "planned", target: "0.4", examples: ["@co-utility"], note: "Registry API is designed but not public yet." },
  { id: "custom-variant", area: "Custom variant registration", status: "planned", target: "0.4", examples: ["@co-variant"], note: "User-defined selector and at-rule variants are planned." },
  { id: "plugin-api", area: "Plugin API", status: "planned", target: "0.4", examples: ["defineCoordiationPlugin()"], note: "Stable hooks will follow the utility registry." },
  { id: "sources", area: "Source include, exclude, and safelist", status: "complete", target: "0.2", examples: ["include: []", "exclude: []", "safelist: []"], note: "Glob filters, explicit candidates, CLI flags, validation, and dynamic-class diagnostics are implemented and tested." },
  { id: "extraction-hooks", area: "Framework extraction hooks", status: "complete", target: "0.2", examples: ["extractors: { '.coord': extract }"], note: "Extension and global extraction hooks supplement plain-text scanning and validate every returned candidate." },
  { id: "vite", area: "Vite adapter", status: "partial", target: "0.2", examples: ["coordiationCSS()"], note: "An initial adapter ships; HMR and invalidation hardening remain." },
  { id: "postcss", area: "PostCSS adapter", status: "partial", target: "0.2", examples: ["coordiationPostCSS()"], note: "An initial adapter ships; ecosystem compatibility remains." },
  { id: "cli", area: "CLI and watch mode", status: "partial", target: "0.2", examples: ["coordiation-css --content src"], note: "Build mode ships; durable watch mode remains." },
  { id: "css-toolchain", area: "Bundling, nesting, prefixing, minification", status: "planned", target: "0.5", examples: ["@import"], note: "Post-processing pipeline is planned." },
  { id: "cache", area: "Incremental build cache", status: "planned", target: "0.5", examples: [".coordiation-cache"], note: "Candidate and stylesheet cache is planned." },
  { id: "source-maps", area: "Source maps", status: "planned", target: "0.5", examples: ["app.css.map"], note: "Source-to-generated mapping is planned." },
  { id: "language-server", area: "IntelliSense / language server", status: "planned", target: "0.6", examples: ["co-…"], note: "Completions, hover docs, and diagnostics are planned." },
  { id: "formatter", area: "Class sorting formatter", status: "planned", target: "0.6", examples: ["coordiation format"], note: "Sorting will reuse the compiler's canonical order." },
  { id: "codemods", area: "Upgrade and codemod tools", status: "planned", target: "0.9", examples: ["coordiation migrate"], note: "Automated breaking-change migrations are planned." },
  { id: "native-scanner", area: "Cross-platform native scanner", status: "planned", target: "1.0", examples: ["native scan"], note: "A native performance path is reserved for 1.0." },
  { id: "compatibility", area: "Compatibility and deprecation policy", status: "planned", target: "1.0", examples: ["semver"], note: "The policy becomes binding at stable release." },
];

export const capabilityManifest = {
  schemaVersion: "1.0",
  framework: "Coordiation CSS",
  version: "0.2-dev",
  generatedAt: "2026-08-29",
  prefix: "co-",
  negativeSyntax: "-co-{utility}",
  statuses: {
    complete: "Documented, tested, and available",
    partial: "Usable subset available; see note for remaining work",
    planned: "Not shipped yet",
  },
  capabilities,
};
