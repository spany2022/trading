import { ArrowRight, MessageCircle, Plus } from "lucide-react";
import { faqs, site } from "@/content/site";
import { T } from "@/components/ui/T";
import { btn, Nudge, SectionHeader } from "@/components/ui/primitives";
import { WhatsAppCta } from "@/components/ui/Cta";
import { AccordionGroup, AccordionItem } from "@/components/ui/Accordion";

export function Faq() {
  const ids = faqs.map((_, i) => `faq-${i + 1}`);
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper py-24 text-paper-ink sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id="faq-title"
            tone="light"
            index="08"
            eyebrow="FAQ"
            title="Everything You Need to Know Before Joining."
          />
          <div className="mt-10 rounded-3xl bg-ink p-7 text-fg" data-reveal>
            <MessageCircle aria-hidden className="size-6 text-mint" />
            <p className="mt-4 font-display text-xl font-bold">Still have a question?</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Message the team on WhatsApp — we reply during <T>{site.contact.hours}</T>.
            </p>
            <WhatsAppCta location="faq" className={`${btn.base} ${btn.primary} mt-6 w-full`}>
              Ask on WhatsApp
              <Nudge>
                <ArrowRight className="size-4" />
              </Nudge>
            </WhatsAppCta>
          </div>
        </div>

        <AccordionGroup ids={ids}>
          <div className="divide-y divide-paper-ink/10 border-y border-paper-ink/10" data-reveal>
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                id={ids[i]}
                event="faq_open"
                eventParams={{ question: i + 1 }}
                buttonClassName="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                trigger={
                  <>
                    <span className="font-display text-[17px] leading-snug font-semibold sm:text-lg">{f.q}</span>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-paper-ink/15 transition-[transform,background-color,border-color] duration-300 group-data-[open=true]/acc:rotate-45 group-data-[open=true]/acc:border-mint-deep group-data-[open=true]/acc:bg-mint-deep group-data-[open=true]/acc:text-white">
                      <Plus aria-hidden className="size-4" />
                    </span>
                  </>
                }
              >
                <p className="max-w-2xl pr-12 pb-6 text-[16px] leading-relaxed text-paper-muted">
                  <T>{f.a}</T>
                </p>
              </AccordionItem>
            ))}
          </div>
        </AccordionGroup>
      </div>
    </section>
  );
}
