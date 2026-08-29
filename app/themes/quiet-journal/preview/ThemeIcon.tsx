const icons = {
  "arrow-down": "/icons/solar-linear/arrow-down.svg",
  "arrow-right": "/icons/solar-linear/arrow-right.svg",
  "arrow-to-top-right": "/icons/solar-linear/arrow-to-top-right.svg",
  "book": "/icons/solar-linear/book.svg",
  "calendar": "/icons/solar-linear/calendar.svg",
  "camera": "/icons/solar-linear/camera.svg",
  "clock-circle": "/icons/solar-linear/clock-circle.svg",
  "hashtag": "/icons/solar-linear/hashtag.svg",
  "heart": "/icons/solar-linear/heart.svg",
  "letter": "/icons/solar-linear/letter.svg",
  "map-point": "/icons/solar-linear/map-point.svg",
  "user": "/icons/solar-linear/user.svg",
} as const;

export type ThemeIconName = keyof typeof icons;

export default function ThemeIcon({ name, size = 18, tone = "dark" }: { name: ThemeIconName; size?: number; tone?: "dark" | "light" | "accent" }) {
  return <img className={`qj-icon qj-icon-${tone}`} src={icons[name]} width={size} height={size} alt="" aria-hidden="true" />;
}
