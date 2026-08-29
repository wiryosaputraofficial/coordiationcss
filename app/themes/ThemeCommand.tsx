"use client";

import { useState } from "react";
import SolarIcon from "../_components/SolarIcon";

export default function ThemeCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  return <button className="theme-command" type="button" onClick={copy} aria-label="Copy theme installation command"><code>{command}</code><span><SolarIcon name={copied ? "check-circle" : "copy"} size={18} />{copied ? "Copied" : "Copy"}</span></button>;
}
