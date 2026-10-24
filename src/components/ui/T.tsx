import { site } from "@/content/site";

/** Renders content text, highlighting [placeholders] while demoMode is on. */
export function T({ children }: { children: string }) {
  if (!site.demoMode) return <>{children}</>;
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span key={i} className="ph">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
