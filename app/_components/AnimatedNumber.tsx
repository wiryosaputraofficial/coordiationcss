"use client";

import { useEffect, useRef } from "react";

type AnimatedNumberProps = {
  value: number;
  delay?: number;
};

const formatter = new Intl.NumberFormat("en-US");

export default function AnimatedNumber({ value, delay = 0 }: AnimatedNumberProps) {
  const visualRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);
  const displayedValueRef = useRef(value);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cancelAnimation = () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };

    const renderValue = (nextValue: number) => {
      const roundedValue = Math.round(nextValue);
      displayedValueRef.current = roundedValue;
      visual.textContent = formatter.format(roundedValue);
    };

    const animate = (from: number, to: number, animationDelay = 0) => {
      cancelAnimation();

      if (from === to) {
        renderValue(to);
        return;
      }

      const duration = 1050;
      const startsAt = performance.now() + animationDelay;

      const tick = (now: number) => {
        if (now < startsAt) {
          frameRef.current = requestAnimationFrame(tick);
          return;
        }

        const progress = Math.min((now - startsAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        renderValue(from + (to - from) * easedProgress);

        if (progress < 1) frameRef.current = requestAnimationFrame(tick);
        else frameRef.current = null;
      };

      frameRef.current = requestAnimationFrame(tick);
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      renderValue(value);
      hasAnimatedRef.current = true;
      return cancelAnimation;
    }

    if (hasAnimatedRef.current) {
      animate(displayedValueRef.current, value);
      return cancelAnimation;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        hasAnimatedRef.current = true;
        renderValue(0);
        animate(0, value, delay);
      },
      { threshold: 0.35 },
    );

    observer.observe(visual);

    return () => {
      observer.disconnect();
      cancelAnimation();
    };
  }, [delay, value]);

  const formattedValue = formatter.format(value);

  return (
    <strong className="homepage-stat-number" aria-label={formattedValue}>
      <span ref={visualRef} aria-hidden="true">{formattedValue}</span>
    </strong>
  );
}
