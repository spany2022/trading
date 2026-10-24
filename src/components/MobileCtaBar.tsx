"use client";

import { useEffect, useState } from "react";
import { FileDown, MessageCircle } from "lucide-react";
import { DownloadCta, WhatsAppCta } from "@/components/ui/Cta";

/** Persistent booking bar on small screens, hidden over the hero and the final CTA / footer. */
export function MobileCtaBar() {
  const [pastHero, setPastHero] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = ["enrol", "site-footer"].map((id) => document.getElementById(id)).filter(Boolean) as Element[];
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setNearEnd(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !nearEnd;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="flex gap-3">
        <DownloadCta
          location="mobile_bar"
          className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5 text-fg"
        >
          <FileDown aria-hidden className="size-5" />
          <span className="sr-only">Download syllabus PDF</span>
        </DownloadCta>
        <WhatsAppCta
          location="mobile_bar"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-mint font-display text-[15px] font-semibold text-on-mint"
        >
          <MessageCircle aria-hidden className="size-5" /> Book Your Seat on WhatsApp
        </WhatsAppCta>
      </div>
    </div>
  );
}
