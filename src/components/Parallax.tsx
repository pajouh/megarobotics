"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll parallax for one layer.
 *
 * The outer box keeps its place in the layout and is what gets measured; the
 * inner layer shifts by up to `range` (px, or % of the inner layer) as the box
 * travels through the viewport: +range when it enters at the bottom, 0 at the
 * centre, -range when it leaves at the top. A negative range reverses the drift.
 *
 * With `fill`, the inner layer is absolutely positioned and overscanned by
 * `overscan` (% of the box height) above and below, so a shifted background
 * image never shows an edge. Keep `range` below that overscan.
 *
 * Only runs while the box is on screen, and stays still for visitors who ask
 * for reduced motion.
 */
interface Props {
  children: ReactNode;
  range?: number;
  unit?: "px" | "%";
  /** Gentle zoom-out from `scale` to 1 across the same travel, e.g. 1.08. */
  scale?: number;
  fill?: boolean;
  overscan?: number;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
}

export default function Parallax({
  children,
  range = 40,
  unit = "px",
  scale,
  fill = false,
  overscan = 15,
  className = "",
  innerClassName = "",
  style,
}: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = outer.current;
    const layer = inner.current;
    if (!box || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 when the box's centre sits a half-travel below the viewport centre, +1 above
      const p = Math.max(
        -1,
        Math.min(1, (vh / 2 - (r.top + r.height / 2)) / ((vh + r.height) / 2)),
      );
      // zoom settles from `scale` on entry to 1 by the time the box is centred
      const z = scale ? 1 + (scale - 1) * Math.max(0, -p) : 1;
      layer.style.transform = `translate3d(0, ${(-p * range).toFixed(2)}${unit}, 0)${scale ? ` scale(${z.toFixed(4)})` : ""}`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          update();
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
        } else {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(box);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [range, unit, scale]);

  return (
    // With `fill`, the caller positions the box (e.g. "absolute inset-0").
    <div
      ref={outer}
      className={`${fill ? "overflow-hidden" : ""} ${className}`}
      style={style}
    >
      <div
        ref={inner}
        className={innerClassName}
        style={{
          willChange: "transform",
          ...(fill
            ? {
                position: "absolute",
                left: 0,
                right: 0,
                top: `-${overscan}%`,
                bottom: `-${overscan}%`,
              }
            : {}),
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Hero parallax: as the page scrolls away from the top, the hero's content
 * sinks at `speed` × the scroll distance and fades a little, so the next
 * section slides up over it. The box clips its content, so nothing spills
 * into the section below. Still for visitors who ask for reduced motion.
 */
export function HeroParallax({
  children,
  speed = 0.4,
  fade = 0.5,
}: {
  children: ReactNode;
  speed?: number;
  fade?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = outer.current;
    const layer = inner.current;
    if (!box || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const h = box.offsetHeight || 1;
      const y = Math.min(Math.max(window.scrollY, 0), h);
      layer.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
      layer.style.opacity = (1 - (y / h) * fade).toFixed(3);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, fade]);

  return (
    <div ref={outer} className="relative overflow-hidden">
      <div ref={inner} style={{ willChange: "transform, opacity" }}>
        {children}
      </div>
    </div>
  );
}
