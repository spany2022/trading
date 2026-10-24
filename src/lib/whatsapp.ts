import { site, type Batch } from "@/content/site";

export type WhatsAppIntent = "seat" | "ask";

export function whatsappUrl(message: string) {
  const number = site.whatsapp.number.replace(/[\s+\-()]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function whatsappMessage(intent: WhatsAppIntent = "seat", batch?: Pick<Batch, "name" | "startDate">) {
  if (!batch) return site.whatsapp.defaultMessage;
  if (intent === "ask") {
    return `Hello, I have a question about the ${batch.name} of your trading mentorship (starting ${batch.startDate}): `;
  }
  return `Hello, I'm interested in joining the ${batch.name} of your trading mentorship (starting ${batch.startDate}). Please share the course fee and seat reservation process.`;
}
