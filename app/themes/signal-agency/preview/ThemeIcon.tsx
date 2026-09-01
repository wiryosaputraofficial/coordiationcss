const icons = {
  "arrow-right": "/icons/solar-linear/arrow-right.svg",
  "arrow-to-top-right": "/icons/solar-linear/arrow-to-top-right.svg",
  "hamburger-menu": "/icons/solar-linear/hamburger-menu.svg",
  target: "/icons/solar-linear/target.svg",
  "graph-new-up": "/icons/solar-linear/graph-new-up.svg",
  monitor: "/icons/solar-linear/monitor.svg",
  palette: "/icons/solar-linear/palette.svg",
  code: "/icons/solar-linear/code.svg",
  "users-group-rounded": "/icons/solar-linear/users-group-rounded.svg",
  "shield-check": "/icons/solar-linear/shield-check.svg",
  "check-circle": "/icons/solar-linear/check-circle.svg",
  "play-circle": "/icons/solar-linear/play-circle.svg",
  letter: "/icons/solar-linear/letter.svg",
  phone: "/icons/solar-linear/phone-calling-rounded.svg",
  calendar: "/icons/solar-linear/calendar.svg",
  star: "/icons/solar-linear/star.svg",
  global: "/icons/solar-linear/global.svg",
} as const;

export type ThemeIconName = keyof typeof icons;

export default function ThemeIcon({ name, size = 18, tone = "light" }: { name: ThemeIconName; size?: number; tone?: "light" | "dark" | "accent" }) {
  return <img className={`sa-icon sa-icon-${tone}`} src={icons[name]} width={size} height={size} alt="" aria-hidden="true" />;
}
