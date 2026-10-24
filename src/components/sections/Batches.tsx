import { ArrowRight, CalendarDays, Clock, MapPin, MessageCircle, MonitorPlay, Users } from "lucide-react";
import { site, type Batch } from "@/content/site";
import { T } from "@/components/ui/T";
import { btn, delay, Nudge, SectionHeader } from "@/components/ui/primitives";
import { WhatsAppCta } from "@/components/ui/Cta";
import { TrackView } from "@/components/ui/Behaviors";

const statusStyle: Record<Batch["status"], { label: string; cls: string }> = {
  enrolling: { label: "Enrolling now", cls: "bg-mint/15 text-mint" },
  upcoming: { label: "Opening soon", cls: "bg-azure/15 text-[#93b8fb]" },
  full: { label: "Batch full", cls: "bg-white/10 text-muted" },
  closed: { label: "Enrolment closed", cls: "bg-white/10 text-muted" },
};

function Detail({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-muted" />
      <div>
        <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">{label}</dt>
        <dd className="mt-0.5 text-[15px] text-fg">
          <T>{value}</T>
        </dd>
      </div>
    </div>
  );
}

function BatchCard({ batch }: { batch: Batch }) {
  const featured = !!batch.featured;
  const st = statusStyle[batch.status];
  const open = batch.status === "enrolling" || batch.status === "upcoming";

  const details = (
    <dl className={`grid gap-5 ${featured ? "sm:grid-cols-2 lg:gap-x-10 lg:gap-y-6" : "mt-7 border-t border-line pt-6"}`}>
      {batch.enrolBy && <Detail icon={CalendarDays} label="Enrol by" value={batch.enrolBy} />}
      <Detail icon={Clock} label={`Schedule (${batch.timezone})`} value={batch.schedule} />
      <Detail icon={Clock} label="Duration" value={batch.duration} />
      <Detail icon={MonitorPlay} label="Format" value={batch.format} />
      {batch.location && <Detail icon={MapPin} label="Location" value={batch.location} />}
      {typeof batch.seatsAvailable === "number" && (
        <Detail icon={Users} label="Seats available" value={String(batch.seatsAvailable)} />
      )}
    </dl>
  );

  return (
    <TrackView
      event="batch_card_view"
      params={{ batch_id: batch.id }}
      className={`relative h-full rounded-3xl border p-6 sm:p-8 ${
        featured
          ? "border-mint/35 bg-[linear-gradient(150deg,rgb(32_201_151/0.10),rgb(23_32_51/0.9)_40%)] shadow-[0_40px_100px_-50px_rgba(32,201,151,0.5)] lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-x-14 lg:p-10"
          : "flex flex-col border-line bg-card/60"
      }`}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          {featured && (
            <span className="rounded-full bg-gold/15 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-gold">
              Next batch
            </span>
          )}
          <span className={`rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] ${st.cls}`}>{st.label}</span>
        </div>
  
        <h3 className={`mt-5 font-display font-bold tracking-tight ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          <T>{batch.name}</T>
        </h3>
        <p className="mt-2 flex items-center gap-2 font-mono text-sm text-mint">
          <CalendarDays aria-hidden className="size-4" />
          Starts <T>{batch.startDate}</T>
        </p>
  
        {featured ? <div className="mt-7 border-t border-line pt-6 lg:hidden">{details}</div> : details}
  
        {batch.fee && (
          <p className="mt-6 flex items-baseline justify-between gap-4 rounded-xl bg-ink/50 px-4 py-3">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">Course fee</span>
            <span className="font-display text-xl font-bold">
              <T>{batch.fee}</T>
            </span>
          </p>
        )}
  
        <div className={`mt-auto flex flex-col gap-3 pt-7 ${featured ? "sm:flex-row" : ""}`}>
          {open ? (
            <WhatsAppCta
              location={featured ? "batch_featured" : "batch_card"}
              batch={batch}
              magnetic={featured}
              className={`${btn.base} ${featured ? btn.primary : `${btn.ghost} hover:border-mint/50`} w-full ${featured ? "sm:w-auto" : ""}`}
            >
              Reserve My Seat on WhatsApp
              <Nudge>
                <ArrowRight className="size-4" />
              </Nudge>
            </WhatsAppCta>
          ) : null}
          <WhatsAppCta
            location={featured ? "batch_featured" : "batch_card"}
            batch={batch}
            intent="ask"
            className={`${btn.base} w-full border border-transparent text-muted hover:text-fg ${featured ? "sm:w-auto" : ""}`}
          >
            <MessageCircle aria-hidden className="size-4" />
            {open ? "Ask About This Batch" : "Join the waitlist"}
          </WhatsAppCta>
        </div>
      </div>
      {featured && (
        <div className="hidden border-l border-line pl-14 lg:flex lg:flex-col lg:justify-center">{details}</div>
      )}
    </TrackView>
  );
}

export function Batches() {
  const featured = site.batches.find((b) => b.featured) ?? site.batches[0];
  const others = site.batches.filter((b) => b !== featured);

  return (
    <section id="batches" aria-labelledby="batches-title" className="relative bg-ink py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          id="batches-title"
          index="06"
          eyebrow="Upcoming batches"
          title="Choose Your Upcoming Batch."
          intro="Compare start dates, schedules and formats. Every detail below is confirmed by the mentorship team."
        />

        <div className="mt-14" data-reveal>
          <BatchCard batch={featured} />
        </div>
        {others.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {others.map((b, i) => (
              <div key={b.id} data-reveal style={delay(i * 100)}>
                <BatchCard batch={b} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-line bg-ink-2 p-6 sm:p-8" data-reveal>
          <h3 className="font-display text-xl font-bold">How seat reservation works</h3>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {site.reservation.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-mint/40 font-mono text-sm text-mint">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">
                    <T>{s.body}</T>
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 border-t border-line pt-5 text-[13px] leading-relaxed text-muted">
            Opening WhatsApp starts a conversation — it does not reserve a seat on its own. <T>{site.reservation.terms}</T>
          </p>
        </div>
      </div>
    </section>
  );
}
