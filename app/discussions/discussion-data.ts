export type Discussion = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  tags: string[];
  author: { id?: string; name: string; initials: string; reputation: number };
  createdAt: string;
  updatedLabel: string;
  votes: number;
  replies: number;
  views: number;
  solved: boolean;
  status?: "open" | "solved" | "closed" | "hidden";
  pinned?: boolean;
};

export type DiscussionReply = {
  id: string;
  discussionSlug: string;
  author: { id?: string; name: string; initials: string; reputation: number; role?: string };
  createdAt: string;
  body: string[];
  votes: number;
  accepted?: boolean;
};

export const discussionCategories = [
  ["All discussions", "all", "chat-round-line", 128],
  ["Getting started", "getting-started", "compass", 24],
  ["Utilities & CSS", "utilities-css", "code-square", 31],
  ["Components", "components", "widget", 22],
  ["Themes", "themes", "palette-round", 17],
  ["Tooling & integrations", "tooling", "settings-minimalistic", 14],
  ["AI workflows", "ai-workflows", "cpu-bolt", 11],
  ["Show and tell", "show-and-tell", "gallery-wide", 6],
  ["Bug reports", "bug-reports", "bug-minimalistic", 3],
] as const;

export const seedDiscussions: Discussion[] = [
  {
    slug: "responsive-variants-from-component-props",
    title: "What is the cleanest way to map component props to responsive variants?",
    excerpt: "I want a CardGrid API that remains scanner-friendly without constructing utility names dynamically.",
    body: [
      "I am building a reusable CardGrid component with two, three, or four columns. The number can change at desktop breakpoints, but I want every Coordiation class to remain discoverable by the compiler.",
      "Would you recommend a lookup map of complete strings, a finite safelist, or exposing the class name directly to the consumer? I would also like this API to stay easy for an AI agent to understand.",
    ],
    category: "Utilities & CSS",
    tags: ["responsive", "scanner", "react"],
    author: { name: "Nadia Anwar", initials: "NA", reputation: 842 },
    createdAt: "2026-09-01T04:20:00.000Z",
    updatedLabel: "18 minutes ago",
    votes: 18,
    replies: 5,
    views: 126,
    solved: true,
    pinned: true,
  },
  {
    slug: "dialog-focus-restoration-inside-sheet",
    title: "Dialog focus is not restored when it opens from inside a Sheet",
    excerpt: "The nested overlay closes correctly, but keyboard focus returns to the document body instead of the trigger.",
    body: ["I am composing the open-code Sheet and Dialog components. Mouse behavior works, but after closing the nested Dialog with Escape, focus is lost.", "Is there an established composition pattern for preserving the original trigger across nested overlays?"],
    category: "Components",
    tags: ["dialog", "accessibility", "focus"],
    author: { name: "Raka Putra", initials: "RP", reputation: 391 },
    createdAt: "2026-09-01T02:40:00.000Z",
    updatedLabel: "2 hours ago",
    votes: 12,
    replies: 3,
    views: 88,
    solved: false,
  },
  {
    slug: "share-your-first-coordination-theme",
    title: "Show and tell: our first documentation theme built entirely with Coordiation",
    excerpt: "A compact documentation site with zero styling runtime, two official icon collections, and an installable theme contract.",
    body: ["We migrated a small internal documentation portal to Coordiation and packaged the final visual system as an installable theme.", "The most useful constraint was keeping every class literal. It made the generated registry and AI-assisted maintenance much easier to audit."],
    category: "Show and tell",
    tags: ["theme", "documentation", "showcase"],
    author: { name: "Mira Studio", initials: "MS", reputation: 1270 },
    createdAt: "2026-08-31T08:15:00.000Z",
    updatedLabel: "Yesterday",
    votes: 34,
    replies: 8,
    views: 412,
    solved: false,
  },
  {
    slug: "vite-monorepo-content-roots",
    title: "Recommended content roots for a Vite monorepo with shared UI packages",
    excerpt: "The app compiles correctly, but classes from the workspace package are missing from the generated stylesheet.",
    body: ["Our monorepo has apps/web and packages/ui. Coordiation currently scans the application source, but shared components live outside that root.", "What content configuration keeps scanning explicit without including build output or every package in the workspace?"],
    category: "Tooling & integrations",
    tags: ["vite", "monorepo", "configuration"],
    author: { name: "Dimas Yoga", initials: "DY", reputation: 624 },
    createdAt: "2026-08-30T13:00:00.000Z",
    updatedLabel: "2 days ago",
    votes: 9,
    replies: 4,
    views: 173,
    solved: true,
  },
  {
    slug: "agent-context-for-existing-product",
    title: "How much agent context should an existing product expose?",
    excerpt: "I want our coding agent to use the design system correctly without placing the entire repository into every prompt.",
    body: ["We have product requirements, tokens, components, and compatibility notes distributed across several packages.", "Which artifacts should become the smallest reliable agent context, and how do you keep that context synchronized with releases?"],
    category: "AI workflows",
    tags: ["agents", "context", "registry"],
    author: { name: "Farah Karim", initials: "FK", reputation: 518 },
    createdAt: "2026-08-29T10:30:00.000Z",
    updatedLabel: "3 days ago",
    votes: 21,
    replies: 7,
    views: 267,
    solved: true,
  },
  {
    slug: "theme-installer-preserve-existing-files",
    title: "Can the theme installer preview conflicts before writing files?",
    excerpt: "We need to install a theme into an established application without overwriting customized components.",
    body: ["The target project already has a header and token file. I would like the installer to show an exact plan, allow selected files, and stop on conflicts by default.", "Is this behavior available today, or should our integration wrap the registry installer?"],
    category: "Themes",
    tags: ["cli", "themes", "installer"],
    author: { name: "Bima Santoso", initials: "BS", reputation: 207 },
    createdAt: "2026-08-28T07:10:00.000Z",
    updatedLabel: "4 days ago",
    votes: 7,
    replies: 2,
    views: 95,
    solved: false,
  },
];

export const seedReplies: DiscussionReply[] = [
  {
    id: "reply-01",
    discussionSlug: "responsive-variants-from-component-props",
    author: { name: "Wiryo Saputra", initials: "WS", reputation: 2460, role: "Maintainer" },
    createdAt: "12 minutes ago",
    body: ["Use a lookup whose values are complete literal class strings. That gives the compiler a finite source surface and keeps the component API small.", "For example, map each supported column count to the complete base and responsive classes. Avoid interpolating only the numeric fragment. A safelist is better reserved for values coming from an external finite contract rather than ordinary component props."],
    votes: 23,
    accepted: true,
  },
  {
    id: "reply-02",
    discussionSlug: "responsive-variants-from-component-props",
    author: { name: "Nadia Anwar", initials: "NA", reputation: 842 },
    createdAt: "8 minutes ago",
    body: ["That makes sense. I moved the complete strings into a typed map and the generated registry now exposes every supported value. It is also much clearer in the component documentation."],
    votes: 6,
  },
];

export function getSeedDiscussion(slug: string) {
  return seedDiscussions.find((discussion) => discussion.slug === slug);
}
