import type { CSSProperties } from "react";

type SolarIconProps = {
  name: string;
  size?: number;
  label?: string;
  className?: string;
};

export default function SolarIcon({ name, size = 18, label, className = "" }: SolarIconProps) {
  const style = {
    "--site-icon-source": `url(/icons/solar-linear/${name}.svg)`,
    "--site-icon-size": `${size}px`,
  } as CSSProperties;
  const classes = `site-icon${className ? ` ${className}` : ""}`;

  if (label) return <span className={classes} data-icon={name} role="img" aria-label={label} style={style} />;
  return <span className={classes} data-icon={name} aria-hidden="true" style={style} />;
}
