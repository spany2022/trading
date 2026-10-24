import Link from "next/link";
import { AlertTriangle, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";
import { T } from "@/components/ui/T";
import { Logo } from "@/components/Logo";
import { DownloadCta, WhatsAppCta } from "@/components/ui/Cta";

const legal = [
  { href: "/privacy/", label: "Privacy policy" },
  { href: "/terms/", label: "Terms & conditions" },
  { href: "/refund-policy/", label: "Refund & cancellation" },
  { href: "/risk-disclosure/", label: "Risk disclosure" },
];

const link = "text-[14px] text-muted transition-colors hover:text-fg";

export function Footer() {
  const c = site.contact;
  return (
    <footer id="site-footer" className="border-t border-line bg-ink-3 pt-20 pb-28 md:pb-12">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">{site.brand.tagline}</p>
            <WhatsAppCta
              location="footer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-mint/40 px-4 py-2.5 text-sm font-semibold text-mint transition-colors hover:bg-mint/10"
            >
              <MessageCircle aria-hidden className="size-4" /> Chat on WhatsApp
            </WhatsAppCta>
          </div>

          <nav aria-label="Course">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-fg">Course</h2>
            <ul className="mt-4 space-y-3">
              <li><a className={link} href="#syllabus">Syllabus</a></li>
              <li><a className={link} href="#batches">Upcoming batches</a></li>
              <li><a className={link} href="#mentor">Mentor</a></li>
              <li><a className={link} href="#faq">FAQ</a></li>
              <li>
                <DownloadCta location="footer" className={link}>
                  Download syllabus PDF
                </DownloadCta>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-fg">Contact</h2>
            <ul className="mt-4 space-y-3 text-[14px] text-muted">
              <li className="flex gap-2.5"><Mail aria-hidden className="mt-0.5 size-4 shrink-0" /><T>{c.email}</T></li>
              <li className="flex gap-2.5"><Phone aria-hidden className="mt-0.5 size-4 shrink-0" /><T>{c.phone}</T></li>
              <li className="flex gap-2.5"><MapPin aria-hidden className="mt-0.5 size-4 shrink-0" /><T>{c.address}</T></li>
            </ul>
          </div>

          <nav aria-label="Legal">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-fg">Legal</h2>
            <ul className="mt-4 space-y-3">
              {legal.map((l) => (
                <li key={l.href}><Link className={link} href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 rounded-2xl border border-gold/25 bg-gold/[0.04] p-5 sm:p-6">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-gold">
            <AlertTriangle aria-hidden className="size-4" /> Risk disclosure
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">{site.risk.full}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            <T>{site.risk.regulatory}</T>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 text-[13px] text-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} <T>{site.brand.name}</T>. All rights reserved.
          </p>
          <p>Educational content only — not investment advice.</p>
        </div>
      </div>
    </footer>
  );
}
