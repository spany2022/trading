import { Brain, ChartCandlestick, ClipboardCheck, Layers, MessagesSquare, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { T } from "@/components/ui/T";
import { DemoNote, SectionHeader, delay } from "@/components/ui/primitives";

const icons = {
  layers: Layers,
  chart: ChartCandlestick,
  clipboard: ClipboardCheck,
  shield: ShieldCheck,
  brain: Brain,
  messages: MessagesSquare,
};

const sparks = [
  "M0 30 L14 26 L26 28 L40 18 L54 21 L68 10 L80 12",
  "M0 22 L12 28 L26 16 L40 20 L52 8 L66 14 L80 6",
  "M0 28 L16 20 L30 24 L44 12 L58 16 L80 4",
];

export function Features() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative bg-ink-2 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          id="why-title"
          index="07"
          eyebrow="The difference"
          title="More Than Just Watching Trading Videos."
          intro="A guided learning experience built around practice, feedback and discipline — not shortcuts."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.features.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <li
                key={f.title}
                data-reveal
                style={delay((i % 3) * 90)}
                className="group relative overflow-hidden rounded-3xl border border-line bg-card/50 p-7 transition-[border-color,transform,background-color] duration-500 hover:-translate-y-1 hover:border-mint/40 hover:bg-card"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-[radial-gradient(circle,rgb(32_201_151/0.16),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <svg aria-hidden viewBox="0 0 80 36" className="absolute top-7 right-7 w-20 text-white/10 transition-colors duration-500 group-hover:text-mint/40" fill="none">
                  <path d={sparks[i % 3]} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span className="grid size-12 place-items-center rounded-2xl border border-line bg-ink/70 text-mint transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  <T>{f.body}</T>
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 max-w-2xl">
          <DemoNote>Keep only the features the mentorship actually offers — remove or rename any card that doesn’t apply.</DemoNote>
        </div>
      </div>
    </section>
  );
}
