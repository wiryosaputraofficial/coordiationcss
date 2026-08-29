import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import ThemeIcon from "./ThemeIcon";

function classes(base: string, className = "") { return `${base} ${className}`.trim(); }

export function Card({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={classes("fd-card co-rounded-xl co-border co-bg-white co-shadow-sm", className)} {...props} />;
}

export function CardHeader({ title, action, eyebrow }: { title: string; action?: ReactNode; eyebrow?: string }) {
  return <header className="fd-card-header co-flex co-items-center co-justify-between"><div>{eyebrow && <small className="co-block co-uppercase">{eyebrow}</small>}<h2>{title}</h2></div>{action}</header>;
}

export function Button({ className = "", variant = "primary", type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "soft" | "outline" | "ghost" }) {
  return <button className={classes(`fd-button fd-button-${variant} co-inline-flex co-items-center co-justify-center co-rounded-lg co-font-medium co-transition`, className)} type={type} {...props} />;
}

export function Badge({ children, tone = "neutral", className = "" }: { children: ReactNode; tone?: "neutral" | "success" | "warning" | "danger" | "brand"; className?: string }) {
  return <span className={classes(`fd-badge fd-badge-${tone} co-inline-flex co-items-center co-rounded-full co-font-medium`, className)}>{children}</span>;
}

export function Avatar({ initials, tone = 0, size = "md" }: { initials: string; tone?: number; size?: "sm" | "md" | "lg" }) {
  return <span className={`fd-avatar fd-avatar-${size} fd-avatar-tone-${tone % 6} co-inline-flex co-items-center co-justify-center co-rounded-full co-font-semibold`} aria-hidden="true">{initials}</span>;
}

export function IconButton({ label, children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return <button className={classes("fd-icon-button co-inline-flex co-items-center co-justify-center co-rounded-full co-transition", className)} type="button" aria-label={label} {...props}>{children}</button>;
}

export function SearchField(props: InputHTMLAttributes<HTMLInputElement>) {
  return <label className="fd-search co-flex co-items-center co-rounded-full"><ThemeIcon name="magnifier" size={18} tone="muted" /><span className="co-sr-only">Search dashboard</span><input type="search" placeholder="Search reports, people, or payments" {...props} /></label>;
}

export function SelectControl({ children }: { children: ReactNode }) {
  return <button className="fd-select co-inline-flex co-items-center co-justify-between co-rounded-lg" type="button">{children}<ThemeIcon name="alt-arrow-down" size={14} tone="muted" /></button>;
}

export function Progress({ value, tone = "brand", label }: { value: number; tone?: "brand" | "success" | "warning"; label: string }) {
  return <div className="fd-progress" aria-label={`${label}: ${value}%`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}><span className={`fd-progress-${tone}`} style={{ width: `${value}%` }} /></div>;
}
