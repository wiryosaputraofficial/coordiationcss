const icons = {
  "arrow-right": "/icons/solar-linear/arrow-right.svg",
  "arrow-to-top-right": "/icons/solar-linear/arrow-to-top-right.svg",
  "hamburger-menu": "/icons/solar-linear/hamburger-menu.svg",
  calendar: "/icons/solar-linear/calendar.svg",
  clock: "/icons/solar-linear/clock-circle.svg",
  bookmark: "/icons/solar-linear/bookmark.svg",
  search: "/icons/solar-linear/magnifier.svg",
  letter: "/icons/solar-linear/letter.svg",
  star: "/icons/solar-linear/star.svg",
  global: "/icons/solar-linear/global.svg",
} as const;

export type ThemeIconName = keyof typeof icons;

export default function ThemeIcon({ name, size = 18, tone = "ink" }: { name: ThemeIconName; size?: number; tone?: "ink" | "paper" | "gold" }) {
  return <img className={`sj-icon sj-icon-${tone}`} src={icons[name]} width={size} height={size} alt="" aria-hidden="true" />;
}
