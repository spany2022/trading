import { ArrowDown, ArrowRight, CalendarDays, Check, Circle } from "lucide-react";
import { nextBatch, site } from "@/content/site";
import { T } from "@/components/ui/T";
import { btn, delay, Nudge } from "@/components/ui/primitives";
import { DownloadCta, WhatsAppCta } from "@/components/ui/Cta";
import { Parallax } from "@/components/ui/Behaviors";
import { HeroChart } from "./HeroChart";

const checklist = [
  { label: "Trend & structure identified", done: true },
  { label: "Key level marked", done: true },
  { label: "Risk defined before entry", done: true },
  { label: "Entry trigger confirmed", done: false },
];

export function Hero() {
  const batch = nextBatch();
  const trust = [
    { label: "Next batch", value: batch.startDate },
    { label: "Format", value: site.course.format },
    { label: "Duration", value: site.course.duration },
    ...(site.course.completedBatches ? [{ label: "Completed", value: site.course.completedBatches }] : []),
  ];

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink pt-24 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Parallax speed={0.12} className="absolute inset-0">
          <div className="bg-grid absolute inset-0" />
        </Parallax>
        <div className="absolute -top-48 right-[-15%] size-[720px] rounded-full bg-[radial-gradient(circle,rgb(32_201_151/0.18),transparent_62%)]" />
        <div className="absolute top-1/3 -left-60 size-[620px] rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.14),transparent_62%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <p
            className="hero-in inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pr-3.5 pl-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:text-xs"
            style={delay(0)}
          >
            <span className="relative grid size-5 place-items-center rounded-full bg-mint/15">
              <span className="size-1.5 rounded-full bg-mint" />
            </span>
            <span className="whitespace-nowrap">Next batch · <T>{batch.startDate}</T></span>
          </p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.6rem] leading-[1.02] font-bold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[3.6rem] xl:text-[4.35rem]"
          >
            <span className="hero-in block" style={delay(80)}>
              Stop Guessing the Markets.
            </span>
            <span className="hero-in block" style={delay(180)}>
              Start Learning a <span className="text-gradient">Trading Process.</span>
            </span>
          </h1>

          <p className="hero-in mt-6 max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg" style={delay(280)}>
            Join a structured trading mentorship designed to help you understand market structure, technical analysis,
            risk management, and disciplined trade execution through guided learning and practical exercises.
          </p>

          <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={delay(380)}>
            <WhatsAppCta location="hero" magnetic className={`${btn.base} ${btn.primary} w-full sm:w-auto`}>
              Book Your Seat on WhatsApp
              <Nudge>
                <ArrowRight className="size-4" />
              </Nudge>
            </WhatsAppCta>
            <DownloadCta location="hero" className={`${btn.base} ${btn.ghost} w-full sm:w-auto`}>
              Download Free Syllabus PDF
              <Nudge dir="y">
                <ArrowDown className="size-4" />
              </Nudge>
            </DownloadCta>
          </div>
          <p className="hero-in mt-3 text-[13px] text-muted/80" style={delay(420)}>
            Free PDF, no sign-up. Messaging us on WhatsApp doesn’t commit you to anything.
          </p>

          <dl
            className={`hero-in mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line ${
              trust.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"
            }`}
            style={delay(500)}
          >
            {trust.map((t) => (
              <div key={t.label} className="bg-ink-2 px-4 py-3.5">
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">{t.label}</dt>
                <dd className="mt-1 font-display text-[15px] font-semibold text-fg">
                  <T>{t.value}</T>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Dashboard composition */}
        <Parallax speed={-0.04} className="relative lg:pl-4">
          <div className="hero-in" style={delay(260)}>
            <div className="relative rounded-[1.6rem] border border-line bg-gradient-to-b from-card to-ink-2 p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between gap-3 px-3 pt-2 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-mint" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg">Setup review</span>
                </div>
                <div className="hidden items-center gap-1 rounded-lg bg-ink/60 p-1 font-mono text-[10.5px] text-muted sm:flex" aria-hidden>
                  <span className="rounded-md px-2 py-1">Structure</span>
                  <span className="rounded-md px-2 py-1">Levels</span>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-fg">Plan</span>
                </div>
              </div>
              <div className="overflow-hidden rounded-[1.15rem] border border-line bg-ink/80">
                <HeroChart />
              </div>
              <div className="px-2 pt-3">
                <p className="px-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">Pre-trade checklist</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {checklist.map((c, i) => (
                    <li
                      key={c.label}
                      className={`fade-late flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] ${
                        c.done ? "border-mint/25 bg-mint/[0.07] text-fg" : "border-line text-muted"
                      }`}
                      style={delay(2600 + i * 120)}
                    >
                      {c.done ? (
                        <Check aria-hidden className="size-3.5 text-mint" strokeWidth={3} />
                      ) : (
                        <Circle aria-hidden className="size-3.5 text-muted/60" />
                      )}
                      {c.label}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="px-3 pt-3 pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/80">
                Illustrative teaching example · not live market data
              </p>
              <a
                href="#batches"
                className="fade-late group mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[1.15rem] border border-gold/30 bg-gold/[0.06] px-4 py-3.5 transition-colors hover:border-gold/60"
                style={delay(1500)}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
                  <CalendarDays aria-hidden className="size-4.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-gold">Next batch</span>
                  <span className="mt-0.5 block font-display text-[15px] font-bold">
                    <T>{batch.startDate}</T>
                    <span className="font-sans text-[13px] font-normal text-muted">
                      {" "}
                      · <T>{`${batch.format} · ${batch.duration}`}</T>
                    </span>
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mint">
                  View batch <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
