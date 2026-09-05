type SpectrumIconName = "arrow-right" | "arrow-up" | "hamburger-menu" | "letter" | "global" | "stars";

const iconFiles: Record<SpectrumIconName, string> = {
  "arrow-right": "arrow-right",
  "arrow-up": "arrow-up",
  "hamburger-menu": "hamburger-menu",
  letter: "letter",
  global: "global",
  stars: "stars",
};

export default function ThemeIcon({ name, size = 18, tone = "paper" }: { name: SpectrumIconName; size?: number; tone?: "paper" | "ink" | "accent" }) {
  return <img className={`sp-icon sp-icon-${tone}`} src={`/icons/solar-linear/${iconFiles[name]}.svg`} width={size} height={size} alt="" aria-hidden="true" />;
}
