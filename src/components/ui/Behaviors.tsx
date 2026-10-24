"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { track } from "@/lib/analytics";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/** Adds `.is-in` to [data-reveal] elements as they enter the viewport. */
export function RevealObserver() {
  useEffect(() => {
    window.__revealReady = true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

/** Fires `landing_page_view` once per page load. */
export function PageViewEvent() {
  useEffect(() => {
    track("landing_page_view", { page_path: window.location.pathname });
  }, []);
  return null;
}

/** Gentle vertical drift tied to scroll position, limited to the first screens. */
export function Parallax({ speed, className, children }: { speed: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const y = Math.min(window.scrollY, 1400);
      el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [speed]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Fires an analytics event the first time at least half of the element is visible. */
export function TrackView({
  event,
  params,
  className,
  children,
}: {
  event: string;
  params?: Record<string, string>;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const key = JSON.stringify(params ?? {});
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        track(event, JSON.parse(key));
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [event, key]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
