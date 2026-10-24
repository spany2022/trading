import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { site } from "@/content/site";
import { T } from "@/components/ui/T";
import { DemoNote, SectionHeader, delay } from "@/components/ui/primitives";

function PortraitPlaceholder() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <svg viewBox="0 0 200 240" className="h-3/4 w-auto text-white/[0.07]" aria-hidden>
        <circle cx="100" cy="80" r="44" fill="currentColor" />
        <path d="M20 240c0-52 36-88 80-88s80 36 80 88z" fill="currentColor" />
      </svg>
      <p className="absolute top-6 left-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <T>[Approved mentor portrait]</T>
      </p>
    </div>
  );
}

export function Mentor() {
  const m = site.mentor;
  return (
    <section id="mentor" aria-labelledby="mentor-title" className="relative bg-ink-2 py-24 sm:py-32">
      <div className="container-x grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="relative lg:sticky lg:top-28">
          <div
            data-reveal="mask"
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-[radial-gradient(120%_80%_at_30%_0%,#22304b,#111827_60%,#0b1020)]"
          >
            {m.portrait ? (
              <>
                <div
                  aria-hidden
                  className="absolute top-[18%] left-1/2 size-[85%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(32_201_151/0.22),transparent_65%)]"
                />
                <Image
                  src={m.portrait}
                  alt={`Portrait of ${m.name}`}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-contain object-bottom"
                />
              </>
            ) : (
              <PortraitPlaceholder />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 pt-24">
              <p className="font-display text-2xl font-bold">
                <T>{m.name}</T>
              </p>
              <p className="mt-1 text-sm text-muted">
                <T>{m.role}</T>
              </p>
            </div>
          </div>
          <div
            data-reveal
            style={delay(300)}
            className="absolute -right-3 top-10 rounded-2xl border border-gold/30 bg-ink/90 px-4 py-3 shadow-xl backdrop-blur sm:-right-6"
          >
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-gold">{m.facts[0].label}</p>
            <p className="mt-1 font-display text-xl font-bold">
              <T>{m.facts[0].value}</T>
            </p>
          </div>
        </div>

        <div>
          <SectionHeader
            id="mentor-title"
            index="02"
            eyebrow="Your mentor"
            title="Learn From a Structured, Experience-Led Approach."
          />

          <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-muted" data-reveal>
            {m.bio.map((p, i) => (
              <p key={i}>
                <T>{p}</T>
              </p>
            ))}
          </div>

          <figure className="mt-10 border-l-2 border-gold/70 pl-6" data-reveal>
            <blockquote className="font-display text-xl leading-snug font-medium text-fg sm:text-2xl">
              “<T>{m.philosophy}</T>”
            </blockquote>
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Teaching philosophy
            </figcaption>
          </figure>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {m.facts.map((f, i) => (
              <div key={f.label} className="bg-ink-2 p-5" data-reveal style={delay(i * 80)}>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">{f.label}</dt>
                <dd className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  <T>{f.value}</T>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div data-reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-mint">Qualifications</h3>
              <ul className="mt-4 space-y-3">
                {m.credentials.map((c) => (
                  <li key={c} className="flex gap-3 text-[15px] text-fg">
                    <BadgeCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-mint" />
                    <span>
                      <T>{c}</T>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal style={delay(120)}>
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-mint">Markets covered</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {m.markets.map((mk) => (
                  <li key={mk} className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-sm text-fg">
                    <T>{mk}</T>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Format: <T>{site.course.format}</T> · Language: <T>{site.course.language}</T>
              </p>
            </div>
          </div>

          <div className="mt-10">
            <DemoNote>
              Every credential, year count and student number here must be verifiable. Leave a field out rather than
              estimate it.
            </DemoNote>
          </div>
        </div>
      </div>
    </section>
  );
}
