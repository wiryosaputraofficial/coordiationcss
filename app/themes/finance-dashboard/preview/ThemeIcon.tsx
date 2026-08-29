const iconPaths = {
  "alt-arrow-down": "/icons/solar-linear/alt-arrow-down.svg",
  "arrow-right": "/icons/solar-linear/arrow-right.svg",
  bell: "/icons/solar-linear/bell.svg",
  "bill-list": "/icons/solar-linear/bill-list.svg",
  calendar: "/icons/solar-linear/calendar.svg",
  card: "/icons/solar-linear/card.svg",
  "cart-large-2": "/icons/solar-linear/cart-large-2.svg",
  "chart-2": "/icons/solar-linear/chart-2.svg",
  "chat-round": "/icons/solar-linear/chat-round.svg",
  "check-circle": "/icons/solar-linear/check-circle.svg",
  "clock-circle": "/icons/solar-linear/clock-circle.svg",
  "close-circle": "/icons/solar-linear/close-circle.svg",
  dollar: "/icons/solar-linear/dollar.svg",
  "document-text": "/icons/solar-linear/document-text.svg",
  global: "/icons/solar-linear/global.svg",
  "graph-new-up": "/icons/solar-linear/graph-new-up.svg",
  "hamburger-menu": "/icons/solar-linear/hamburger-menu.svg",
  "home-2": "/icons/solar-linear/home-2.svg",
  letter: "/icons/solar-linear/letter.svg",
  magnifier: "/icons/solar-linear/magnifier.svg",
  "menu-dots": "/icons/solar-linear/menu-dots.svg",
  "pie-chart-2": "/icons/solar-linear/pie-chart-2.svg",
  printer: "/icons/solar-linear/printer.svg",
  refresh: "/icons/solar-linear/refresh.svg",
  settings: "/icons/solar-linear/settings.svg",
  sun: "/icons/solar-linear/sun.svg",
  "transfer-horizontal": "/icons/solar-linear/transfer-horizontal.svg",
  "trash-bin-2": "/icons/solar-linear/trash-bin-2.svg",
  "user-plus": "/icons/solar-linear/user-plus.svg",
  "user-rounded": "/icons/solar-linear/user-rounded.svg",
  "users-group-rounded": "/icons/solar-linear/users-group-rounded.svg",
  wallet: "/icons/solar-linear/wallet.svg",
  "wallet-money": "/icons/solar-linear/wallet-money.svg",
  "widget-4": "/icons/solar-linear/widget-4.svg",
} as const;

export type ThemeIconName = keyof typeof iconPaths;

export default function ThemeIcon({ name, size = 18, tone = "default", className = "" }: { name: ThemeIconName; size?: number; tone?: "default" | "light" | "brand" | "muted" | "success" | "danger"; className?: string }) {
  return <img className={`fd-icon fd-icon-${tone} ${className}`.trim()} src={iconPaths[name]} width={size} height={size} alt="" aria-hidden="true" />;
}
