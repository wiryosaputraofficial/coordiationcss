const icons = {
  "arrow-right": "/icons/solar-linear/arrow-right.svg",
  "arrow-to-top-right": "/icons/solar-linear/arrow-to-top-right.svg",
  "hamburger-menu": "/icons/solar-linear/hamburger-menu.svg",
  letter: "/icons/solar-linear/letter.svg",
  global: "/icons/solar-linear/global.svg",
  palette: "/icons/solar-linear/palette.svg",
  code: "/icons/solar-linear/code.svg",
  user: "/icons/solar-linear/user.svg",
  calendar: "/icons/solar-linear/calendar.svg",
  "gallery-minimalistic": "/icons/solar-linear/gallery-minimalistic.svg",
  "layers-minimalistic": "/icons/solar-linear/layers-minimalistic.svg",
  "case-minimalistic": "/icons/solar-linear/case-minimalistic.svg",
  link: "/icons/solar-linear/link.svg",
} as const;

export type ThemeIconName = keyof typeof icons;

export default function ThemeIcon({ name, size = 16, tone = "dark" }: { name: ThemeIconName; size?: number; tone?: "dark" | "light" }) {
  return <img className={`si-icon si-icon-${tone}`} src={icons[name]} width={size} height={size} alt="" aria-hidden="true" />;
}
