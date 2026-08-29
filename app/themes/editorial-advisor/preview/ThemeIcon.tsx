const icons = {
  "arrow-right": "/icons/solar-linear/arrow-right.svg",
  "arrow-to-top-right": "/icons/solar-linear/arrow-to-top-right.svg",
  "arrow-up": "/icons/solar-linear/arrow-up.svg",
  "global": "/icons/solar-linear/global.svg",
  "letter": "/icons/solar-linear/letter.svg",
  "medal-star": "/icons/solar-linear/medal-star.svg",
  "play-circle": "/icons/solar-linear/play-circle.svg",
  "share-circle": "/icons/solar-linear/share-circle.svg",
} as const;

export type ThemeIconName = keyof typeof icons;

export default function ThemeIcon({ name, size = 18, tone = "dark" }: { name: ThemeIconName; size?: number; tone?: "dark" | "light" }) {
  return <img className={`ea-icon${tone === "light" ? " ea-icon-light" : ""}`} src={icons[name]} width={size} height={size} alt="" aria-hidden="true" />;
}
