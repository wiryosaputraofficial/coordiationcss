export type Discussion = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  tags: string[];
  author: { id?: string; name: string; initials: string; reputation: number; username?: string | null; role?: string };
  createdAt: string;
  updatedLabel: string;
  votes: number;
  replies: number;
  views: number;
  followers: number;
  solved: boolean;
  status?: "open" | "solved" | "closed" | "hidden";
  pinned?: boolean;
};

export type DiscussionReply = {
  id: string;
  discussionSlug: string;
  author: { id?: string; name: string; initials: string; reputation: number; username?: string | null; role?: string };
  createdAt: string;
  body: string[];
  votes: number;
  accepted?: boolean;
};

export const discussionCategories = [
  ["All discussions", "all", "chat-round-line"],
  ["Getting started", "getting-started", "compass"],
  ["Utilities & CSS", "utilities-css", "code-square"],
  ["Components", "components", "widget"],
  ["Themes", "themes", "palette-round"],
  ["Tooling & integrations", "tooling", "settings-minimalistic"],
  ["AI workflows", "ai-workflows", "cpu-bolt"],
  ["Show and tell", "show-and-tell", "gallery-wide"],
  ["Bug reports", "bug-reports", "bug-minimalistic"],
] as const;
