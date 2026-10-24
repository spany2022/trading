"use client";

import { useEffect, useState } from "react";
import { FileDown, Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { DownloadCta, WhatsAppCta } from "@/components/ui/Cta";

const links = [
  { href: "#mentor", label: "Mentor" },
  { href: "#syllabus", label: "Syllabus" },
  { href: "#results", label: "Students" },
  { href: "#batches", label: "Batches" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? "border-b border-line bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-mint focus:px-4 focus:py-2 focus:text-on-mint"
      >
        Skip to content
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <a href="#top" aria-label="Back to top" className="min-w-0">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <DownloadCta
            location="header"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-fg md:inline-flex"
          >
            <FileDown aria-hidden className="size-4" /> Syllabus PDF
          </DownloadCta>
          <WhatsAppCta
            location="header"
            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg bg-mint px-3.5 font-display text-sm font-semibold text-on-mint transition-colors hover:bg-mint-bright sm:px-4"
          >
            <MessageCircle aria-hidden className="size-4" />
            <span>Book seat</span>
          </WhatsAppCta>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-line text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-line lg:hidden">
        <ul className="container-x grid gap-1 py-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-display text-lg font-semibold text-fg hover:bg-white/5"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <DownloadCta
              location="mobile_menu"
              className="flex items-center gap-2 rounded-lg border border-line px-3 py-3 font-medium text-fg"
            >
              <FileDown aria-hidden className="size-4 text-mint" /> Download syllabus PDF
            </DownloadCta>
          </li>
        </ul>
      </nav>
    </header>
  );
}
