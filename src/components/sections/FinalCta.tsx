import { ArrowRight, FileDown, MessageCircle } from "lucide-react";
import { btn, delay, Nudge } from "@/components/ui/primitives";
import { DownloadCta, WhatsAppCta } from "@/components/ui/Cta";

export function FinalCta() {
  return (
    <section id="enrol" aria-labelledby="enrol-title" className="relative isolate overflow-hidden bg-ink py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div className="absolute top-0 left-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(32_201_151/0.22),transparent_60%)]" />
      </div>
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-mint">
            <span className="text-muted">09</span> · Your next step
          </p>
          <h2 id="enrol-title" className="mt-5 font-display text-[2.2rem] leading-[1.04] font-bold tracking-[-0.035em] text-balance sm:text-6xl">
            Your Trading Education Starts With the Right First Step.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Review the syllabus, understand the learning structure, and speak with the mentorship team before choosing
            your batch.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          <div className="flex flex-col rounded-3xl border border-mint/40 bg-card/80 p-8 backdrop-blur" data-reveal>
            <span className="grid size-12 place-items-center rounded-2xl bg-mint text-on-mint">
              <MessageCircle aria-hidden className="size-5" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold">Ready to enquire?</h3>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
              Get the fee, schedule and reservation process for the next batch, straight from the team.
            </p>
            <WhatsAppCta location="final" magnetic className={`${btn.base} ${btn.primary} mt-8 w-full`}>
              Book Your Seat on WhatsApp
              <Nudge>
                <ArrowRight className="size-4" />
              </Nudge>
            </WhatsAppCta>
          </div>
          <div className="flex flex-col rounded-3xl border border-line bg-card/50 p-8 backdrop-blur" data-reveal style={delay(100)}>
            <span className="grid size-12 place-items-center rounded-2xl border border-line bg-ink text-azure">
              <FileDown aria-hidden className="size-5" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold">Want to review the course first?</h3>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
              Download the complete syllabus and go through every module at your own pace.
            </p>
            <DownloadCta location="final" className={`${btn.base} ${btn.ghost} mt-8 w-full`}>
              Download Syllabus PDF
            </DownloadCta>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-[13px] leading-relaxed text-muted">
          Before enrolling, make sure you understand the course fee, reservation terms, and the financial risks involved
          in trading. This mentorship is educational and does not guarantee profits.
        </p>
      </div>
    </section>
  );
}
