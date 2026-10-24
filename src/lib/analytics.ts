type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const analyticsIds = {
  gtm: process.env.NEXT_PUBLIC_GTM_ID,
  ga4: process.env.NEXT_PUBLIC_GA4_ID,
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID,
};

// Meta standard / custom events mirrored from our own event names.
const metaEvents: Record<string, [method: "track" | "trackCustom", name: string]> = {
  whatsapp_click: ["track", "Contact"],
  syllabus_download_click: ["trackCustom", "SyllabusDownload"],
};

/**
 * Sends a conversion event. With GTM configured, events only go to the
 * dataLayer (wire GA4 / Meta tags inside GTM). Without GTM, events go
 * straight to gtag and the Meta Pixel when those are configured.
 * Never pass personal information in params.
 */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  if (analyticsIds.gtm) return;

  window.gtag?.("event", event, params);
  const meta = metaEvents[event];
  if (meta) window.fbq?.(meta[0], meta[1], params);
}
