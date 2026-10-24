import { ArrowDown, ArrowRight, ChevronDown, Clock, FlaskConical, Target } from "lucide-react";
import { site } from "@/content/site";
import { T } from "@/components/ui/T";
import { btn, Nudge, SectionHeader } from "@/components/ui/primitives";
import { DownloadCta, WhatsAppCta } from "@/components/ui/Cta";
import { AccordionGroup, AccordionItem, AccordionProgress, AccordionToggleAll } from "@/components/ui/Accordion";

const pad = (n: number) => String(n).padStart(2, "0");

export function Syllabus() {
  const { modules, status, totalHours } = site.syllabus;
  const ids = modules.map((_, i) => `module-${i + 1}`);

  return (
    <section id="syllabus" aria-labelledby="syllabus-title" className="bg-paper py-24 text-paper-ink sm:py-32">
      <div className="container-x">
        <SectionHeader
          id="syllabus-title"
          tone="light"
          index="03"
          eyebrow="The syllabus"
          title="Everything You’ll Learn, Module by Module."
          intro="A step-by-step path from how markets work to a complete, written trading plan. Open any module to see its topics, exercises and objectives."
        />

        <AccordionGroup ids={ids} defaultOpen={[ids[0]]}>
          <div className="mt-14 grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-14">
            <aside className="lg:sticky lg:top-28 lg:self-start" data-reveal>
              <div className="rounded-2xl border border-paper-ink/10 bg-white p-6 shadow-[0_1px_0_rgba(23,32,51,0.04)]">
                <dl className="grid grid-cols-2 gap-5 lg:grid-cols-1">
                  {[
                    { k: "Modules", v: String(modules.length) },
                    { k: "Total learning time", v: totalHours },
                    { k: "Format", v: site.course.format },
                    { k: "Level", v: site.course.level },
                  ].map((d) => (
                    <div key={d.k}>
                      <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper-muted">{d.k}</dt>
                      <dd className="mt-1 font-display text-lg font-bold">
                        <T>{d.v}</T>
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 border-t border-paper-ink/10 pt-5">
                  <AccordionProgress noun="Modules" />
                  <AccordionToggleAll className="mt-4 text-sm font-semibold text-mint-deep underline-offset-4 hover:underline" />
                </div>
              </div>
              <DownloadCta location="syllabus_sidebar" className={`${btn.base} ${btn.primary} mt-4 hidden w-full lg:flex`}>
                Get the Complete Syllabus PDF
                <Nudge dir="y">
                  <ArrowDown className="size-4" />
                </Nudge>
              </DownloadCta>
            </aside>

            <div>
              {status === "draft" && (
                <p className="mb-5 rounded-xl border border-dashed border-gold/70 bg-gold/10 px-4 py-3 text-[13px] leading-relaxed">
                  <strong className="font-semibold">Draft outline.</strong> These modules are a proposed structure for
                  review. The final page will show the mentor’s official syllabus.
                </p>
              )}
              <ol className="space-y-3">
                {modules.map((m, i) => (
                  <li key={m.title} data-reveal>
                    <AccordionItem
                      id={ids[i]}
                      event="syllabus_module_open"
                      eventParams={{ module: i + 1 }}
                      className="rounded-2xl border border-paper-ink/10 bg-white transition-[border-color,box-shadow] duration-300 data-[open=true]:border-mint-deep/30 data-[open=true]:shadow-[0_20px_50px_-30px_rgba(11,122,90,0.45)]"
                      buttonClassName="flex w-full items-center gap-4 rounded-2xl p-4 text-left sm:gap-5 sm:p-5"
                      trigger={
                        <>
                          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-paper font-mono text-sm font-medium text-paper-muted transition-colors group-data-[open=true]/acc:bg-mint group-data-[open=true]/acc:text-on-mint">
                            {pad(i + 1)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper-muted">
                              Module {pad(i + 1)}
                            </span>
                            <span className="mt-0.5 block font-display text-lg leading-snug font-bold sm:text-xl">
                              {m.title}
                            </span>
                          </span>
                          <span className="hidden items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 font-mono text-[11px] text-paper-muted sm:inline-flex">
                            <Clock aria-hidden className="size-3" />
                            <T>{m.duration}</T>
                          </span>
                          <ChevronDown
                            aria-hidden
                            className="size-5 shrink-0 text-paper-muted transition-transform duration-300 group-data-[open=true]/acc:rotate-180"
                          />
                        </>
                      }
                    >
                      <div className="grid gap-8 border-t border-paper-ink/10 px-4 pt-6 pb-6 sm:px-5 md:grid-cols-2 md:pl-[5.25rem]">
                        <div>
                          <p className="text-[15px] leading-relaxed text-paper-muted">{m.summary}</p>
                          <h4 className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.16em] text-mint-deep">
                            Topics covered
                          </h4>
                          <ul className="mt-3 space-y-2">
                            {m.topics.map((t) => (
                              <li key={t} className="flex gap-3 text-[15px]">
                                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-mint" />
                                {t}
                              </li>
                            ))}
                          </ul>
                          <h4 className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.16em] text-mint-deep">
                            Key concepts
                          </h4>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {m.concepts.map((c) => (
                              <li key={c} className="rounded-md bg-paper px-2.5 py-1 font-mono text-xs text-paper-ink">
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-mint-deep">
                            You’ll be able to
                          </h4>
                          <ul className="mt-3 space-y-3">
                            {m.objectives.map((o) => (
                              <li key={o} className="flex gap-3 text-[15px]">
                                <Target aria-hidden className="mt-0.5 size-4 shrink-0 text-azure" />
                                {o}
                              </li>
                            ))}
                          </ul>
                          {m.exercise && (
                            <div className="mt-6 rounded-xl border border-azure/20 bg-azure/[0.06] p-4">
                              <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#1d4ed8]">
                                <FlaskConical aria-hidden className="size-3.5" /> Practical exercise
                              </p>
                              <p className="mt-2 text-[15px] leading-relaxed">{m.exercise}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionItem>
                  </li>
                ))}
              </ol>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" data-reveal>
                <DownloadCta location="syllabus_end" className={`${btn.base} ${btn.primary} w-full sm:w-auto`}>
                  Get the Complete Syllabus PDF
                  <Nudge dir="y">
                    <ArrowDown className="size-4" />
                  </Nudge>
                </DownloadCta>
                <WhatsAppCta location="syllabus_end" className={`${btn.base} ${btn.ghostLight} w-full sm:w-auto`}>
                  Questions? Ask on WhatsApp
                  <Nudge>
                    <ArrowRight className="size-4" />
                  </Nudge>
                </WhatsAppCta>
              </div>
            </div>
          </div>
        </AccordionGroup>
      </div>
    </section>
  );
}
