"use client";

import { useState } from "react";

export default function CodeBlock({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return <div className="reference-code"><div><span>{title}</span><button type="button" onClick={copyCode} aria-label={`Copy ${title}`}>{copied ? "Copied" : "Copy"}</button></div><pre><code>{code}</code></pre></div>;
}

