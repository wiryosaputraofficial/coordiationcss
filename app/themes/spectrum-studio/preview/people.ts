export type SpectrumPerson = {
  slug: string;
  first: string;
  last: string;
  number: string;
  role: string;
  image: string;
  intro: string;
  statement: string;
  bio: readonly [string, string];
  quote: string;
  focus: readonly string[];
  work: readonly { slug: string; title: string; client: string; image: string; alt: string }[];
};

export const spectrumPeople: readonly SpectrumPerson[] = [
  {
    slug: "arka-wijaya", first: "Arka", last: "Wijaya", number: "01 — 03", role: "Founder / Creative Direction", image: "/themes/spectrum-studio/person-01.avif",
    intro: "Building identities that stay clear as brands, products, and culture move around them.",
    statement: "Clarity is not the absence of character. It is what allows character to travel.",
    bio: ["Arka founded Spectrum to keep strategy, design, and making in the same room. He believes the best creative direction begins by identifying the one idea a team can return to when everything else changes.", "His practice connects identity and experience, helping organisations turn complex ambitions into systems people can actually use—from a first positioning decision to the final detail in motion."],
    quote: "The strongest work does not ask for attention. It gives attention somewhere useful to go.",
    focus: ["Creative Direction", "Brand Architecture", "Editorial Design", "Studio Leadership"],
    work: [{ slug: "chromatic-ritual", title: "Chromatic Ritual", client: "Astra — 2026", image: "/themes/spectrum-studio/project-01.jpg", alt: "Iridescent glass forms against a teal background" }, { slug: "form-after-dark", title: "Form After Dark", client: "Noir Lab — 2025", image: "/themes/spectrum-studio/project-04.jpg", alt: "Neon-lit skyscrapers rising into the night fog" }],
  },
  {
    slug: "maya-adelia", first: "Maya", last: "Adelia", number: "02 — 03", role: "Strategy / Brand Systems", image: "/themes/spectrum-studio/person-02.avif",
    intro: "Finding the simple decision that helps ambitious organisations move with confidence.",
    statement: "Strategy matters when it changes what a team can see, choose, and make together.",
    bio: ["Maya leads strategy and brand systems at Spectrum. Her work begins inside the organisation—listening for the tension between what a business says, what it makes, and what people actually experience.", "She turns research into practical direction, shaping positioning, architecture, and decision tools that keep creative work coherent long after the first launch."],
    quote: "A useful strategy should reduce noise without reducing possibility.",
    focus: ["Brand Strategy", "Positioning", "Portfolio Systems", "Research & Insight"],
    work: [{ slug: "human-interface", title: "Human Interface", client: "Synapse — 2026", image: "/themes/spectrum-studio/project-05.jpg", alt: "Rainbow skylight casting color across concrete architecture" }, { slug: "secret-language", title: "Secret Language", client: "Orphic — 2025", image: "/themes/spectrum-studio/project-06.jpg", alt: "Iridescent light refracting through textured glass" }],
  },
  {
    slug: "keiko-tan", first: "Keiko", last: "Tan", number: "03 — 03", role: "Design / Motion", image: "/themes/spectrum-studio/person-03.avif",
    intro: "Designing movement that reveals meaning, rhythm, and personality instead of adding noise.",
    statement: "Motion is not what happens after design. It is how a system explains itself over time.",
    bio: ["Keiko leads design and motion across Spectrum’s identity and digital work. She moves fluently between typography, interface, and animation, treating each as part of the same behaviour.", "Her process combines precise systems with expressive prototyping, allowing teams to understand not only how a design looks, but how it responds and feels in use."],
    quote: "When movement has a reason, people understand the system before they notice the animation.",
    focus: ["Design Systems", "Motion Language", "Interaction Design", "Creative Prototyping"],
    work: [{ slug: "motion-engineered", title: "Motion, Engineered", client: "Vektor — 2026", image: "/themes/spectrum-studio/project-02.jpg", alt: "Colorful neon illustrations covering a city facade at night" }, { slug: "nothing-static", title: "Nothing Static", client: "Kinetik — 2025", image: "/themes/spectrum-studio/project-03.jpg", alt: "Abstract chrome structure with iridescent edges" }],
  },
] as const;

export function getSpectrumPerson(slug: string) {
  return spectrumPeople.find((person) => person.slug === slug);
}
