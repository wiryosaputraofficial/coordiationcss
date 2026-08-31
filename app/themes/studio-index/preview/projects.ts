export type StudioProject = {
  slug: string;
  title: string;
  period: string;
  discipline: string;
  summary: string;
  color: string;
  cover: string;
  hero: string;
  client: string;
  role: string;
  location: string;
  statement: string;
  concept: string;
  outcome: string;
  gallery: string[];
};

export const studioProjects: StudioProject[] = [
  {
    slug: "root-table",
    title: "Root Table",
    period: "2025–2026",
    discipline: "Brand & Strategy",
    summary: "A warm identity and digital home for a vegetable-led neighborhood restaurant.",
    color: "#258a54",
    cover: "/themes/studio-index/root-table.jpg",
    hero: "/themes/studio-index/detail-food.jpg",
    client: "Root Table",
    role: "Strategy, identity and digital direction",
    location: "Jakarta, Indonesia",
    statement: "A neighborhood restaurant built around growers, honest ingredients, and the pleasure of sharing a table.",
    concept: "The identity begins with a simple seed and unfolds into an open flower. A compact mark, generous typography, and earthy colors make the restaurant feel both contemporary and familiar.",
    outcome: "Root Table launched with one coherent system across signage, menus, social storytelling, staff materials, and a responsive reservation website.",
    gallery: ["/themes/studio-index/detail-chef.jpg", "/themes/studio-index/detail-material.jpg", "/themes/studio-index/detail-mobile.jpg"],
  },
  {
    slug: "playroom",
    title: "Playroom",
    period: "2024–2025",
    discipline: "Product Design",
    summary: "A flexible creative workspace that helps distributed teams turn rough ideas into shared decisions.",
    color: "#e9b633",
    cover: "/themes/studio-index/playroom.jpg",
    hero: "/themes/studio-index/detail-team.jpg",
    client: "Playroom Labs",
    role: "Product strategy and interaction design",
    location: "Remote",
    statement: "A collaborative product for the messy, energetic stage before an idea becomes a roadmap.",
    concept: "We designed an intentionally light interface where notes, images, sketches, and decisions could coexist without forcing teams into a rigid workflow.",
    outcome: "The first release helped product teams shorten review cycles and gave every contributor a clearer view of what had changed and why.",
    gallery: ["/themes/studio-index/detail-work.jpg", "/themes/studio-index/detail-mobile.jpg", "/themes/studio-index/aperture.jpg"],
  },
  {
    slug: "aperture",
    title: "Aperture",
    period: "2024",
    discipline: "Identity & Editorial",
    summary: "A colorful visual system for an ideas festival where every session should feel like an invitation.",
    color: "#e86b47",
    cover: "/themes/studio-index/aperture.jpg",
    hero: "/themes/studio-index/detail-work.jpg",
    client: "Aperture Festival",
    role: "Naming, identity and event experience",
    location: "Yogyakarta, Indonesia",
    statement: "An annual gathering where artists, makers, and curious organizations meet around better questions.",
    concept: "Aperture uses a modular window as its core device. It crops, frames, and changes color across posters, social assets, wayfinding, and the event platform.",
    outcome: "The new identity gave a young festival a flexible public voice that could be built by a small internal team without losing its character.",
    gallery: ["/themes/studio-index/detail-material.jpg", "/themes/studio-index/detail-team.jpg", "/themes/studio-index/detail-mobile.jpg"],
  },
  {
    slug: "homebase",
    title: "Homebase",
    period: "2023–2024",
    discipline: "Digital Product",
    summary: "A calmer way to find, compare, and organize the essentials of moving into a new home.",
    color: "#88b7eb",
    cover: "/themes/studio-index/homebase.jpg",
    hero: "/themes/studio-index/detail-mobile.jpg",
    client: "Homebase",
    role: "Product vision, UX and design system",
    location: "Southeast Asia",
    statement: "A home setup assistant for people navigating decisions that are expensive, emotional, and rarely made twice.",
    concept: "The product puts context before comparison. We paired simple checklists with flexible collections, clear explanations, and a friendly visual language that lowers the pressure of making choices.",
    outcome: "A single responsive system brought the web app, mobile flows, and lifecycle emails into one recognisable experience.",
    gallery: ["/themes/studio-index/detail-work.jpg", "/themes/studio-index/playroom.jpg", "/themes/studio-index/detail-team.jpg"],
  },
  {
    slug: "signal",
    title: "Signal",
    period: "2023",
    discipline: "Service Design",
    summary: "A new ticketing experience built around transparency, timing, and a much more human queue.",
    color: "#32b4e4",
    cover: "/themes/studio-index/signal.jpg",
    hero: "/themes/studio-index/detail-mobile.jpg",
    client: "Signal Events",
    role: "Service design and interface direction",
    location: "Indonesia",
    statement: "A ticketing service that treats anticipation as part of the experience, rather than a problem to be managed.",
    concept: "We simplified the purchase journey into a few deliberate moments: discover, decide, pay, and prepare. A clear status system keeps people informed when demand is high.",
    outcome: "The launch delivered a clearer checkout, fewer support requests, and a pattern library teams could reuse across every event season.",
    gallery: ["/themes/studio-index/detail-team.jpg", "/themes/studio-index/detail-work.jpg", "/themes/studio-index/aperture.jpg"],
  },
  {
    slug: "sidecar",
    title: "Sidecar",
    period: "2022–2023",
    discipline: "Brand & Product",
    summary: "A mobile companion that helps small teams turn informal knowledge into reusable field notes.",
    color: "#9478ef",
    cover: "/themes/studio-index/sidecar.jpg",
    hero: "/themes/studio-index/detail-team.jpg",
    client: "Sidecar Collective",
    role: "Identity, product design and launch direction",
    location: "Remote",
    statement: "A portable working memory for people who learn by doing and need their best discoveries close at hand.",
    concept: "The visual system combines utilitarian labels with generous space. Notes can be captured quickly in the field, then returned to as polished references when the team is back at a desk.",
    outcome: "Sidecar shipped a clear, approachable product language from its first invitation through to the daily workspace.",
    gallery: ["/themes/studio-index/detail-work.jpg", "/themes/studio-index/detail-material.jpg", "/themes/studio-index/detail-mobile.jpg"],
  },
];

export function getStudioProject(slug: string) {
  return studioProjects.find((project) => project.slug === slug);
}
