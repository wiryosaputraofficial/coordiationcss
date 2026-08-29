"use client";

import { useState } from "react";

type ColorToken = {
  name: string;
  value: string;
};

const steps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

const scales: { name: string; colors: ColorToken[] }[] = [
  {
    name: "brand",
    colors: [
      ["brand-50", "oklch(97% 0.014 254.604)"],
      ["brand-100", "oklch(93.2% 0.032 255.585)"],
      ["brand-200", "oklch(88.2% 0.059 254.128)"],
      ["brand-300", "oklch(80.9% 0.105 251.813)"],
      ["brand-400", "oklch(70.7% 0.165 254.624)"],
      ["brand-500", "oklch(62.3% 0.214 259.815)"],
      ["brand-600", "oklch(54.6% 0.245 262.881)"],
      ["brand-700", "oklch(48.8% 0.243 264.376)"],
      ["brand-800", "oklch(42.4% 0.199 265.638)"],
      ["brand-900", "oklch(37.9% 0.146 265.522)"],
      ["brand-950", "oklch(28.2% 0.091 267.935)"],
    ].map(([name, value]) => ({ name, value })),
  },
  {
    name: "neutral",
    colors: [
      ["neutral-50", "#fafafa"],
      ["neutral-100", "#f5f5f5"],
      ["neutral-200", "#e5e5e5"],
      ["neutral-300", "#d4d4d4"],
      ["neutral-400", "#a3a3a3"],
      ["neutral-500", "#737373"],
      ["neutral-600", "#525252"],
      ["neutral-700", "#404040"],
      ["neutral-800", "#262626"],
      ["neutral-900", "#171717"],
      ["neutral-950", "#0a0a0a"],
    ].map(([name, value]) => ({ name, value })),
  },
];

const semanticColors: ColorToken[] = [
  ["red", "#ef4444"],
  ["orange", "#f97316"],
  ["amber", "#f59e0b"],
  ["yellow", "#eab308"],
  ["green", "#22c55e"],
  ["emerald", "#10b981"],
  ["teal", "#14b8a6"],
  ["cyan", "#06b6d4"],
  ["sky", "#0ea5e9"],
  ["blue", "#3b82f6"],
  ["indigo", "#6366f1"],
  ["violet", "#8b5cf6"],
  ["purple", "#a855f7"],
  ["fuchsia", "#d946ef"],
  ["pink", "#ec4899"],
  ["rose", "#f43f5e"],
].map(([name, value]) => ({ name, value }));

const foundationColors: ColorToken[] = [
  { name: "black", value: "#000000" },
  { name: "white", value: "#ffffff" },
  { name: "transparent", value: "transparent" },
  { name: "current", value: "currentColor" },
  { name: "inherit", value: "inherit" },
];

function readableText(background: string) {
  if (background === "transparent" || background === "currentColor" || background === "inherit") return "#111";
  if (background.startsWith("oklch")) {
    const lightness = Number(background.match(/oklch\((\d+(?:\.\d+)?)%/)?.[1] ?? 100);
    return lightness < 58 ? "#fff" : "#111";
  }
  const hex = background.replace("#", "");
  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);
  return red * .299 + green * .587 + blue * .114 < 145 ? "#fff" : "#111";
}

export default function ModernColorPalette() {
  const [copied, setCopied] = useState("");

  async function copyColor(token: ColorToken, raw: boolean) {
    const text = raw ? token.value : `var(--co-color-${token.name})`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setCopied("Clipboard unavailable");
    }
  }

  return (
    <div className="modern-palette">
      <div className="modern-palette-instruction">
        <span>Click to copy CSS variable</span>
        <span>Shift + click to copy raw value</span>
      </div>

      <div className="modern-scale-scroll">
        <div className="modern-scale-table">
          <div className="modern-scale-header"><span>Token</span>{steps.map((step) => <code key={step}>{step}</code>)}</div>
          {scales.map((scale) => (
            <div className="modern-scale-row" key={scale.name}>
              <strong>{scale.name}</strong>
              {scale.colors.map((token) => (
                <button
                  aria-label={`Copy ${token.name}. Shift click copies ${token.value}`}
                  key={token.name}
                  onClick={(event) => copyColor(token, event.shiftKey)}
                  style={{ background: token.value, color: readableText(token.value) }}
                  title={`${token.name}\n${token.value}`}
                  type="button"
                >
                  <span>{token.name.split("-").at(-1)}</span>
                  <small>{token.value.startsWith("#") ? token.value : token.value.match(/\d+(?:\.\d+)?%/)?.[0]}</small>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="modern-palette-group">
        <div><p className="docs-overline">SEMANTIC HUES</p><h3>Single-step colors</h3></div>
        <p>These tokens intentionally provide one default value rather than a 50–950 scale.</p>
      </div>
      <div className="modern-semantic-grid">
        {semanticColors.map((token) => (
          <button aria-label={`Copy ${token.name}. Shift click copies ${token.value}`} key={token.name} onClick={(event) => copyColor(token, event.shiftKey)} type="button">
            <i style={{ background: token.value }} />
            <span><strong>{token.name}</strong><code>{token.value}</code></span>
          </button>
        ))}
      </div>

      <div className="modern-palette-group compact">
        <div><p className="docs-overline">FOUNDATION</p><h3>Context and base colors</h3></div>
      </div>
      <div className="modern-foundation-grid">
        {foundationColors.map((token) => (
          <button aria-label={`Copy ${token.name}. Shift click copies ${token.value}`} key={token.name} onClick={(event) => copyColor(token, event.shiftKey)} type="button">
            <i className={`foundation-${token.name}`} style={{ background: token.name === "current" || token.name === "inherit" ? "currentColor" : token.value }} />
            <span><strong>{token.name}</strong><code>{token.value}</code></span>
          </button>
        ))}
      </div>

      <p aria-live="polite" className={`modern-copy-status ${copied ? "visible" : ""}`}>{copied ? `Copied: ${copied}` : ""}</p>
    </div>
  );
}
