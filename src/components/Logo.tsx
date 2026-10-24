import { site } from "@/content/site";
import { T } from "@/components/ui/T";

export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#172033" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill="none" stroke="rgb(167 177 194 / .25)" />
      <path d="M9 9v14" stroke="#3a4660" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="7" y="13" width="4" height="7" rx="1" fill="#3a4660" />
      <path d="M16 6v18" stroke="#20C997" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="14" y="10" width="4" height="10" rx="1" fill="#20C997" />
      <path d="M23 7v12" stroke="#D6B36A" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="21" y="9" width="4" height="6" rx="1" fill="#D6B36A" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-[15px] font-bold tracking-[-0.02em] text-fg">
        <T>{site.brand.name}</T>
      </span>
    </span>
  );
}
