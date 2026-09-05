"use client";

import { useRef, type PointerEvent } from "react";

export default function PortraitVisual({ image, name }: { image: string; name: string }) {
  const frameRef = useRef<HTMLDivElement>(null);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    frameRef.current?.style.setProperty("--sp-portrait-x", `${((x + 0.5) * 100).toFixed(1)}%`);
    frameRef.current?.style.setProperty("--sp-portrait-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    frameRef.current?.style.setProperty("--sp-portrait-tx", `${(x * -13).toFixed(1)}px`);
    frameRef.current?.style.setProperty("--sp-portrait-ty", `${(y * -9).toFixed(1)}px`);
  };

  return <div className="sp-profile-portrait co-relative co-overflow-hidden" ref={frameRef} onPointerMove={move} onPointerLeave={() => frameRef.current?.removeAttribute("style")}><img className="co-w-full co-h-full co-object-cover" src={image} alt={`Portrait of ${name}`} /><div className="sp-profile-spectrum co-absolute" aria-hidden="true" /><span>Spectrum Studio / Jakarta</span></div>;
}
