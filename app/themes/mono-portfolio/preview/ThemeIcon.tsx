const icons = {
  "arrow-right": "/icons/solar-linear/arrow-right.svg",
  "arrow-to-top-right": "/icons/solar-linear/arrow-to-top-right.svg",
  "hamburger-menu": "/icons/solar-linear/hamburger-menu.svg",
  "map-point": "/icons/solar-linear/map-point.svg",
  "users-group-rounded": "/icons/solar-linear/users-group-rounded.svg",
  heart: "/icons/solar-linear/heart.svg",
  code: "/icons/solar-linear/code.svg",
  palette: "/icons/solar-linear/palette.svg",
  lightbulb: "/icons/solar-linear/lightbulb.svg",
  monitor: "/icons/solar-linear/monitor.svg",
  "pen-new-square": "/icons/solar-linear/pen-new-square.svg",
  "widget-4": "/icons/solar-linear/widget-4.svg",
  star: "/icons/solar-linear/star.svg",
  eye: "/icons/solar-linear/eye.svg",
  "shield-check": "/icons/solar-linear/shield-check.svg",
  crown: "/icons/solar-linear/crown.svg",
  "check-circle": "/icons/solar-linear/check-circle.svg",
  calendar: "/icons/solar-linear/calendar.svg",
  letter: "/icons/solar-linear/letter.svg",
  global: "/icons/solar-linear/global.svg",
} as const;

export type ThemeIconName = keyof typeof icons;

export default function ThemeIcon({ name, size = 18, tone = "dark" }: { name: ThemeIconName; size?: number; tone?: "dark" | "light" | "lime" }) {
  return <img className={`mp-icon mp-icon-${tone}`} src={icons[name]} width={size} height={size} alt="" aria-hidden="true" />;
}
