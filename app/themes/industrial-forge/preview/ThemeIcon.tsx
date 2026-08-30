const icons = {
  "arrow-right": "/icons/solar-linear/arrow-right.svg",
  "arrow-to-top-right": "/icons/solar-linear/arrow-to-top-right.svg",
  "hamburger-menu": "/icons/solar-linear/hamburger-menu.svg",
  bolt: "/icons/solar-linear/bolt.svg",
  "shield-check": "/icons/solar-linear/shield-check.svg",
  "graph-new-up": "/icons/solar-linear/graph-new-up.svg",
  "map-point": "/icons/solar-linear/map-point.svg",
  "settings-minimalistic": "/icons/solar-linear/settings-minimalistic.svg",
  "buildings-2": "/icons/solar-linear/buildings-2.svg",
  target: "/icons/solar-linear/target.svg",
  "clock-circle": "/icons/solar-linear/clock-circle.svg",
  "users-group-rounded": "/icons/solar-linear/users-group-rounded.svg",
  letter: "/icons/solar-linear/letter.svg",
} as const;

export type ThemeIconName = keyof typeof icons;

export default function ThemeIcon({ name, size = 18, tone = "dark" }: { name: ThemeIconName; size?: number; tone?: "dark" | "light" | "accent" }) {
  return <img className={`if-icon if-icon-${tone}`} src={icons[name]} width={size} height={size} alt="" aria-hidden="true" />;
}
