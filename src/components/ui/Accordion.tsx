"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";

type Ctx = {
  open: Set<string>;
  seen: Set<string>;
  ids: string[];
  toggle: (id: string) => void;
  setAll: (open: boolean) => void;
};

const AccordionCtx = createContext<Ctx | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionCtx);
  if (!ctx) throw new Error("Accordion components must be inside <AccordionGroup>");
  return ctx;
}

export function AccordionGroup({
  ids,
  defaultOpen = [],
  children,
}: {
  ids: string[];
  defaultOpen?: string[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const [seen, setSeen] = useState(() => new Set(defaultOpen));

  const toggle = useCallback((id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setSeen((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const setAll = useCallback(
    (value: boolean) => {
      setOpen(value ? new Set(ids) : new Set());
      if (value) setSeen(new Set(ids));
    },
    [ids],
  );

  const value = useMemo(() => ({ open, seen, ids, toggle, setAll }), [open, seen, ids, toggle, setAll]);
  return <AccordionCtx.Provider value={value}>{children}</AccordionCtx.Provider>;
}

export function AccordionItem({
  id,
  trigger,
  children,
  className,
  buttonClassName,
  event,
  eventParams,
}: {
  id: string;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  buttonClassName?: string;
  event?: string;
  eventParams?: Record<string, string | number>;
}) {
  const { open, toggle } = useAccordion();
  const isOpen = open.has(id);
  return (
    <div data-open={isOpen} className={`group/acc ${className ?? ""}`}>
      <h3>
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          className={buttonClassName}
          onClick={() => {
            if (!isOpen && event) track(event, eventParams);
            toggle(id);
          }}
        >
          {trigger}
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className="acc-panel"
        data-open={isOpen}
        inert={!isOpen}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}

export function AccordionProgress({ noun, tone = "light" }: { noun: string; tone?: "light" | "dark" }) {
  const { seen, ids } = useAccordion();
  const pct = Math.round((seen.size / ids.length) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-xs">
        <span className={tone === "light" ? "text-paper-muted" : "text-muted"}>{noun} explored</span>
        <span className={tone === "light" ? "text-paper-ink" : "text-fg"} aria-live="polite">
          {seen.size} / {ids.length}
        </span>
      </div>
      <div
        className={`mt-2 h-1.5 overflow-hidden rounded-full ${tone === "light" ? "bg-paper-ink/10" : "bg-white/10"}`}
        role="progressbar"
        aria-label={`${noun} explored`}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-mint to-azure transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function AccordionToggleAll({ className }: { className?: string }) {
  const { open, ids, setAll } = useAccordion();
  const allOpen = open.size === ids.length;
  return (
    <button type="button" className={className} onClick={() => setAll(!allOpen)}>
      {allOpen ? "Collapse all" : "Expand all"}
    </button>
  );
}
