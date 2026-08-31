const icons = {
  "arrow-right": "/icons/solar-linear/arrow-right.svg",
  "arrow-to-top-right": "/icons/solar-linear/arrow-to-top-right.svg",
  "hamburger-menu": "/icons/solar-linear/hamburger-menu.svg",
  "buildings-2": "/icons/solar-linear/buildings-2.svg",
  "home-2": "/icons/solar-linear/home-2.svg",
  "ruler-pen": "/icons/solar-linear/ruler-pen.svg",
  "sofa-2": "/icons/solar-linear/sofa-2.svg",
  palette: "/icons/solar-linear/palette.svg",
  camera: "/icons/solar-linear/camera.svg",
  calendar: "/icons/solar-linear/calendar.svg",
  "clock-circle": "/icons/solar-linear/clock-circle.svg",
  letter: "/icons/solar-linear/letter.svg",
  leaf: "/icons/solar-linear/leaf.svg",
  "shield-check": "/icons/solar-linear/shield-check.svg",
  eye: "/icons/solar-linear/eye.svg",
  stars: "/icons/solar-linear/stars.svg",
  "gallery-minimalistic": "/icons/solar-linear/gallery-minimalistic.svg",
  "layers-minimalistic": "/icons/solar-linear/layers-minimalistic.svg",
} as const;

export type ThemeIconName = keyof typeof icons;

export default function ThemeIcon({ name, size = 18, tone = "light" }: { name: ThemeIconName; size?: number; tone?: "light" | "dark" | "sand" }) {
  return <img className={`nh-icon nh-icon-${tone}`} src={icons[name]} width={size} height={size} alt="" aria-hidden="true" />;
}
