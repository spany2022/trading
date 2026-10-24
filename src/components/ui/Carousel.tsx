"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel({ label, children }: { label: string; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const control =
    "grid size-12 place-items-center rounded-full border border-paper-ink/15 bg-white text-paper-ink transition hover:border-paper-ink/40 disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={track}
        tabIndex={0}
        aria-label={`${label} — scroll horizontally`}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:px-0 lg:scroll-px-0"
      >
        {children}
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button type="button" className={control} onClick={() => go(-1)} disabled={edges.start} aria-label="Previous testimonial">
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <button type="button" className={control} onClick={() => go(1)} disabled={edges.end} aria-label="Next testimonial">
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>
    </div>
  );
}
