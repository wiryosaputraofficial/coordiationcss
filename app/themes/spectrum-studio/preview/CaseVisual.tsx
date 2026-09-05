"use client";

import { useRef, type PointerEvent } from "react";

export default function CaseVisual({ image, alt }: { image: string; alt: string }) {
  const visualRef = useRef<HTMLDivElement>(null);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visualRef.current?.style.setProperty("--sp-case-x", `${((x + 0.5) * 100).toFixed(1)}%`);
    visualRef.current?.style.setProperty("--sp-case-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    visualRef.current?.style.setProperty("--sp-case-tx", `${(x * -8).toFixed(1)}px`);
    visualRef.current?.style.setProperty("--sp-case-ty", `${(y * -5).toFixed(1)}px`);
  };

  return <div className="sp-case-visual co-relative co-overflow-hidden" ref={visualRef} onPointerMove={move} onPointerLeave={() => visualRef.current?.removeAttribute("style")}>
    <img className="sp-case-visual-base co-w-full co-h-full co-object-cover" src={image} alt={alt} />
    <img className="sp-case-visual-channel is-cyan co-w-full co-h-full co-object-cover" src={image} alt="" aria-hidden="true" />
    <img className="sp-case-visual-channel is-magenta co-w-full co-h-full co-object-cover" src={image} alt="" aria-hidden="true" />
    <div className="sp-case-spectrum co-absolute" aria-hidden="true" />
    <span>Spectrum Studio / Case Study</span>
  </div>;
}
