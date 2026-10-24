import Image from "next/image";
import { Info, Quote, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { T } from "@/components/ui/T";
import { DemoNote, SectionHeader } from "@/components/ui/primitives";
import { Carousel } from "@/components/ui/Carousel";

export function Testimonials() {
  return (
    <section id="results" aria-labelledby="results-title" className="overflow-hidden bg-paper py-24 text-paper-ink sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="results-title"
            tone="light"
            index="05"
            eyebrow="Student journeys"
            title="Real Students. Real Learning Journeys."
            intro="Shared with each student’s written permission. These stories describe what students learned and practised — not trading profits."
          />
        </div>

        <div className="mt-14" data-reveal>
          <Carousel label="Student testimonials">
            {site.testimonials.map((t, i) => (
              <article
                key={i}
                className="flex w-[86%] shrink-0 snap-start flex-col rounded-3xl border border-paper-ink/10 bg-white p-7 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(23,32,51,0.45)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <header className="flex items-center gap-4">
                  {t.photo ? (
                    <Image src={t.photo} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
                  ) : (
                    <span
                      aria-hidden
                      className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-card to-ink font-display text-lg font-bold text-fg"
                    >
                      {t.initials}
                    </span>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-display text-[17px] leading-snug font-bold">
                      <T>{t.name}</T>
                    </h3>
                    <p className="mt-0.5 text-[13px] text-paper-muted">
                      Before joining: <T>{t.before}</T>
                    </p>
                  </div>
                </header>

                <blockquote className="relative mt-6 flex-1 text-[16px] leading-relaxed">
                  <Quote aria-hidden className="mb-3 size-6 text-gold" />
                  <T>{t.quote}</T>
                </blockquote>

                <div className="mt-6">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper-muted">Concepts learned</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {t.learned.map((l, j) => (
                      <li key={j} className="rounded-md bg-paper px-2.5 py-1 text-xs">
                        <T>{l}</T>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-6 flex gap-2.5 rounded-xl bg-mint/10 p-3.5 text-[13px] leading-snug text-paper-ink">
                  <ShieldCheck aria-hidden className="size-4.5 shrink-0 text-mint-deep" />
                  <span>
                    <span className="font-semibold">Verified milestone: </span>
                    <T>{t.milestone}</T>
                  </span>
                </p>
              </article>
            ))}
          </Carousel>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <p className="flex gap-3 rounded-2xl border border-paper-ink/10 bg-white p-5 text-[13px] leading-relaxed text-paper-muted">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-paper-ink" />
            <span>
              Testimonials reflect individual learning experiences and are not necessarily typical. They are not claims
              of trading profit or future performance. Trading involves risk, including the possible loss of capital.
            </span>
          </p>
          <DemoNote tone="light">
            Use only genuine, approved testimonials. Add photos, screenshots or records only with written permission,
            and include the context needed to interpret any result shown.
          </DemoNote>
        </div>
      </div>
    </section>
  );
}
