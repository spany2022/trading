"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { site, type Batch } from "@/content/site";
import { track } from "@/lib/analytics";
import { whatsappMessage, whatsappUrl, type WhatsAppIntent } from "@/lib/whatsapp";

/** Subtle pointer-follow on desktop pointers; inert on touch and reduced motion. */
function useMagnetic<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    let raf = 0;
    const clamp = (v: number) => Math.max(-6, Math.min(6, v));
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = clamp((e.clientX - (r.left + r.width / 2)) * 0.18);
      const y = clamp((e.clientY - (r.top + r.height / 2)) * 0.3);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => (el.style.translate = `${x}px ${y}px`));
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.translate = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);
  return ref;
}

type CtaProps = {
  /** Where on the page the CTA sits — sent with analytics events. */
  location: string;
  className?: string;
  children: ReactNode;
  magnetic?: boolean;
};

export function WhatsAppCta({
  location,
  batch,
  intent = "seat",
  className,
  children,
  magnetic,
  label,
}: CtaProps & { batch?: Pick<Batch, "id" | "name" | "startDate">; intent?: WhatsAppIntent; label?: string }) {
  const ref = useMagnetic<HTMLAnchorElement>(!!magnetic);
  return (
    <a
      ref={ref}
      href={whatsappUrl(whatsappMessage(intent, batch))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
      onClick={() => track("whatsapp_click", { cta_location: location, intent, batch_id: batch?.id })}
    >
      {children}
    </a>
  );
}

export function DownloadCta({ location, className, children, magnetic }: CtaProps) {
  const ref = useMagnetic<HTMLAnchorElement>(!!magnetic);
  return (
    <a
      ref={ref}
      href={site.syllabusPdf.href}
      download={site.syllabusPdf.fileName}
      type="application/pdf"
      className={className}
      onClick={() => track("syllabus_download_click", { cta_location: location })}
    >
      {children}
    </a>
  );
}
