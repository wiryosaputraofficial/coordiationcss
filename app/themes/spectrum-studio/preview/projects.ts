export type SpectrumProject = {
  slug: string;
  title: string;
  client: string;
  year: string;
  number: string;
  scope: string;
  discipline: string;
  image: string;
  alt: string;
  summary: string;
  context: string;
  approach: string;
  system: string;
  results: readonly (readonly [string, string])[];
};

export const spectrumProjects: readonly SpectrumProject[] = [
  {
    slug: "chromatic-ritual", title: "Chromatic Ritual", client: "Astra", year: "2026", number: "01 — 06", scope: "Brand system · Campaign", discipline: "Identity / Art direction", image: "/themes/spectrum-studio/project-01.jpg", alt: "Iridescent glass forms against a teal background",
    summary: "A visual identity designed to move between culture, product, and space without losing its signal.",
    context: "Astra was growing beyond a single product. The brand needed a recognisable language that could connect launches, collaborations, and live experiences.",
    approach: "We built a flexible system around refracted light, lucid surfaces, and controlled repetition—giving every expression a shared rhythm while leaving room for surprise.",
    system: "The identity behaves like light through glass: one source becoming many expressions. Typography stays direct while colour, crop, and motion create a different ritual at every scale.",
    results: [["Recognition", "A distinctive visual signature across every touchpoint."], ["Flexibility", "A modular system that scales without becoming predictable."], ["Momentum", "A launch language designed for continuous evolution."]],
  },
  {
    slug: "motion-engineered", title: "Motion, Engineered", client: "Vektor", year: "2026", number: "02 — 06", scope: "Digital · Motion · Launch", discipline: "Experience / Motion", image: "/themes/spectrum-studio/project-02.jpg", alt: "Colorful neon illustrations covering a city facade at night",
    summary: "A launch experience that turns an engineered product story into an electric public signal.",
    context: "Vektor needed to introduce a new platform without sounding like every other technology launch. The experience had to feel precise and alive at once.",
    approach: "We translated technical performance into a kinetic language of illuminated lines, directional type, and responsive sequences that accelerate with attention.",
    system: "Every touchpoint follows one motion principle: energy travels, gathers, and releases. The result connects campaign film, product UI, web, and city-scale media as one continuous event.",
    results: [["Clarity", "Complex performance translated into a simple visual story."], ["Energy", "A motion language recognisable in less than a second."], ["Launch", "One system connecting screens, spaces, and social media."]],
  },
  {
    slug: "nothing-static", title: "Nothing Static", client: "Kinetik", year: "2025", number: "03 — 06", scope: "Strategy · Identity · Product", discipline: "Brand / Product", image: "/themes/spectrum-studio/project-03.jpg", alt: "Abstract chrome structure with iridescent edges",
    summary: "A product brand shaped around continuous change, without sacrificing precision or trust.",
    context: "Kinetik operates in a category built on speed, but its old identity felt fixed. The challenge was to create movement without relying on familiar performance clichés.",
    approach: "We used tension, reflection, and shifting geometry to make change visible. A restrained base system keeps the brand credible while chromatic edges reveal its energy.",
    system: "The visual language never presents a fully closed form. Frames bend, surfaces respond, and layouts create implied direction—making even still applications feel ready to move.",
    results: [["Precision", "A sharper system for product and commercial teams."], ["Distinction", "A category-defying look built from proprietary behaviours."], ["Scale", "Shared rules across product, brand, and partner channels."]],
  },
  {
    slug: "form-after-dark", title: "Form After Dark", client: "Noir Lab", year: "2025", number: "04 — 06", scope: "Identity · Environment", discipline: "Culture / Spatial", image: "/themes/spectrum-studio/project-04.jpg", alt: "Neon-lit skyscrapers rising into the night fog",
    summary: "An identity for nocturnal culture that uses darkness as material rather than background.",
    context: "Noir Lab needed to connect a programme of music, architecture, and late-night events under one name without flattening their individual character.",
    approach: "We designed for low light first: luminous typography, atmospheric gradients, and structures that emerge gradually instead of demanding attention all at once.",
    system: "Contrast controls the experience. Dense black fields create pause; electric cyan and magenta mark moments of discovery across posters, tickets, screens, and spaces.",
    results: [["Atmosphere", "A brand recognised as much by mood as by its mark."], ["Coherence", "One visual structure for a diverse cultural programme."], ["Presence", "A system engineered to perform in physical space."]],
  },
  {
    slug: "human-interface", title: "Human Interface", client: "Synapse", year: "2026", number: "05 — 06", scope: "Product · Design system", discipline: "UX / Interface", image: "/themes/spectrum-studio/project-05.jpg", alt: "Rainbow skylight casting color across concrete architecture",
    summary: "A digital system that makes advanced technology feel calm, legible, and unmistakably human.",
    context: "Synapse had powerful technology and a fragmented experience. Users needed a clearer sense of place, progress, and control across an expanding platform.",
    approach: "We created an interface architecture based on natural light: information appears in layers, colour signals context, and motion explains what changed and why.",
    system: "A shared component language connects product and brand. Strong structural grids carry complex information, while spectral accents guide the eye without becoming decoration.",
    results: [["Orientation", "Clearer journeys through complex product workflows."], ["Consistency", "A shared component system across every team."], ["Confidence", "A calmer experience for high-stakes decisions."]],
  },
  {
    slug: "secret-language", title: "Secret Language", client: "Orphic", year: "2025", number: "06 — 06", scope: "Brand · Editorial · Digital", discipline: "Editorial / Culture", image: "/themes/spectrum-studio/project-06.jpg", alt: "Iridescent light refracting through textured glass",
    summary: "An editorial identity that rewards curiosity and turns ambiguity into a reason to look closer.",
    context: "Orphic curates emerging ideas across art and technology. It needed a system that could hold strong voices together without explaining away their mystery.",
    approach: "We paired rigorous typography with translucent layers and coded details. The surface stays quiet from a distance and becomes richer as the audience moves closer.",
    system: "Information is organised in visible and hidden layers. Texture distorts the expected reading order, while a disciplined grid ensures the experience never loses clarity.",
    results: [["Curiosity", "A visual language that invites deeper attention."], ["Voice", "Editorial tools that amplify different contributors."], ["Continuity", "A system connecting print, web, and exhibitions."]],
  },
] as const;

export function getSpectrumProject(slug: string) {
  return spectrumProjects.find((project) => project.slug === slug);
}
