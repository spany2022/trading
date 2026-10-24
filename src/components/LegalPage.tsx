import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/Logo";
import { DemoNote } from "@/components/ui/primitives";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink">
      <header className="border-b border-line">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" aria-label="Back to home">
            <Logo />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft aria-hidden className="size-4" /> Back to course
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <div className="mt-10 space-y-5 text-[16px] leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-fg">
          {children}
        </div>
        {site.demoMode && (
          <div className="mt-12">
            <DemoNote>This page needs the business’s own legal text, reviewed for the jurisdictions it operates in.</DemoNote>
          </div>
        )}
      </main>
    </div>
  );
}
