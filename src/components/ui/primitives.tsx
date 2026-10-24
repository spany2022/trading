import type { CSSProperties, ReactNode } from "react";
import { Info } from "lucide-react";
import { site } from "@/content/site";

export const btn = {
  base: "group relative inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-6 py-3.5 font-display text-[15px] font-semibold tracking-[-0.01em] transition-[background-color,border-color,box-shadow,transform,translate,color] duration-300 active:scale-[0.98] select-none",
  primary:
    "bg-mint text-on-mint shadow-[0_12px_32px_-12px_rgba(32,201,151,0.65)] hover:bg-mint-bright hover:shadow-[0_16px_40px_-12px_rgba(32,201,151,0.8)]",
  ghost: "border border-white/15 bg-white/[0.04] text-fg hover:border-white/30 hover:bg-white/[0.08]",
  ghostLight: "border border-paper-ink/15 bg-white text-paper-ink hover:border-paper-ink/35 hover:bg-white",
};

/** Arrow that nudges on hover. */
export function Nudge({ children, dir = "x" }: { children: ReactNode; dir?: "x" | "y" }) {
  return (
    <span
      aria-hidden
      className={`inline-flex transition-transform duration-300 ${dir === "x" ? "group-hover:translate-x-1" : "group-hover:translate-y-0.5"}`}
    >
      {children}
    </span>
  );
}

export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  id,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  id?: string;
}) {
  const light = tone === "light";
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`} data-reveal>
      <p
        className={`flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.22em] ${
          align === "center" ? "justify-center" : ""
        } ${light ? "text-mint-deep" : "text-mint"}`}
      >
        <span className={light ? "text-paper-muted" : "text-muted"}>{index}</span>
        <span aria-hidden className={`h-px w-8 ${light ? "bg-paper-ink/20" : "bg-white/20"}`} />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-5 font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.4rem] ${
          light ? "text-paper-ink" : "text-fg"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed text-pretty ${light ? "text-paper-muted" : "text-muted"}`}>{intro}</p>
      )}
    </div>
  );
}

/** Reviewer-only note. Hidden automatically when demoMode is off. */
export function DemoNote({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  if (!site.demoMode) return null;
  return (
    <p
      className={`flex items-start gap-2.5 rounded-xl border border-dashed px-4 py-3 text-[13px] leading-relaxed ${
        tone === "light" ? "border-gold/70 bg-gold/10 text-paper-ink" : "border-gold/40 bg-gold/[0.06] text-gold"
      }`}
    >
      <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>
        <strong className="font-semibold">Review note · </strong>
        {children}
      </span>
    </p>
  );
}
