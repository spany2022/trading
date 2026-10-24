import { CheckCircle2, FileDown } from "lucide-react";
import { site } from "@/content/site";
import { T } from "@/components/ui/T";
import { LogoMark } from "@/components/Logo";
import { btn, DemoNote, SectionHeader, delay } from "@/components/ui/primitives";
import { DownloadCta } from "@/components/ui/Cta";

function PdfMockup() {
  const total = site.syllabus.modules.length;
  const modules = site.syllabus.modules.slice(0, 4);
  return (
    <div className="group relative mx-auto w-full max-w-[400px] [perspective:1400px]" aria-hidden>
      <div className="absolute inset-0 translate-x-6 translate-y-5 rotate-6 rounded-2xl border border-line bg-card/70" />
      <div className="absolute inset-0 translate-x-3 translate-y-2.5 rotate-3 rounded-2xl border border-line bg-card" />
      <div className="relative flex aspect-[1/1.414] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#16203a,#0b1020_65%)] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] transition-transform duration-700 [transform:rotateY(-8deg)_rotateX(4deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)]">
        <div className="flex items-center justify-between">
          <LogoMark className="size-7" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Syllabus</span>
        </div>
        <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-mint">Course guide</p>
        <p className="mt-2 font-display text-[26px] leading-[1.05] font-bold tracking-tight">
          Trading
          <br />
          Mentorship
          <br />
          <span className="text-gradient">Program</span>
        </p>
        <svg viewBox="0 0 200 40" className="mt-5 w-full" fill="none">
          <path d="M0 32 L20 28 L36 30 L54 22 L72 25 L92 16 L110 19 L130 10 L150 14 L172 6 L200 8" stroke="#3B82F6" strokeWidth="1.5" />
        </svg>
        <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
          {modules.map((m, i) => (
            <li key={m.title} className="flex min-w-0 items-baseline gap-3 text-[11px]">
              <span className="shrink-0 font-mono text-mint">{String(i + 1).padStart(2, "0")}</span>
              <span className="truncate text-fg/85">{m.title}</span>
            </li>
          ))}
          {total > modules.length && (
            <li className="pl-[1.6rem] font-mono text-[10px] text-muted">+ {total - modules.length} more modules</li>
          )}
        </ul>
        <p className="mt-auto flex justify-between border-t border-white/10 pt-3 font-mono text-[8.5px] uppercase tracking-[0.18em] text-muted">
          <span>{total} modules</span>
          <span>PDF</span>
        </p>
      </div>
    </div>
  );
}

export function SyllabusPdf() {
  const pdf = site.syllabusPdf;
  return (
    <section id="syllabus-pdf" aria-labelledby="pdf-title" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-0 size-[700px] -translate-x-1/3 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.14),transparent_60%)]"
      />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
        <div data-reveal className="order-2 lg:order-1">
          <PdfMockup />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeader
            id="pdf-title"
            index="04"
            eyebrow="Free syllabus PDF"
            title="Explore the Complete Course Before You Enroll."
            intro="Review the modules, topics, learning format, and upcoming batch information before deciding whether the mentorship is right for you."
          />
          <ul className="mt-8 space-y-4">
            {pdf.highlights.map((h, i) => (
              <li key={h} className="flex gap-3 text-[16px] text-fg" data-reveal style={delay(i * 90)}>
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-mint" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" data-reveal>
            <DownloadCta location="pdf_section" magnetic className={`${btn.base} ${btn.primary} w-full sm:w-auto`}>
              <FileDown aria-hidden className="size-5" />
              Download Complete Syllabus PDF
            </DownloadCta>
            <p className="font-mono text-xs text-muted">
              PDF · <T>{pdf.pages}</T> · <T>{pdf.size}</T>
              <br />
              No email or sign-up required
            </p>
          </div>
          <div className="mt-8">
            <DemoNote>
              The current file is a placeholder so the button can be tested. Replace{" "}
              <code className="font-mono">public{pdf.href}</code> with the mentor’s official syllabus before launch.
            </DemoNote>
          </div>
        </div>
      </div>
    </section>
  );
}
