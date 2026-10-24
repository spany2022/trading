# Trading Mentorship — Ad Landing Page

A conversion-focused landing page for paid traffic (Meta, Instagram, YouTube, Google). Built with Next.js 15 (static export), TypeScript and Tailwind CSS v4.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # static site in /out — deploy to any static host or CDN
npm run check:content  # lists every placeholder still to be filled in
```

## Where things live

| What | Where |
| --- | --- |
| **All business content** (mentor, syllabus, batches, testimonials, FAQs, fees, contact) | `src/content/site.ts` |
| Syllabus PDF | `public/syllabus/trading-mentorship-syllabus.pdf` |
| WhatsApp number, site URL, analytics IDs | `.env.local` (copy `.env.example`) |
| Sections | `src/components/sections/*` |
| Analytics events | `src/lib/analytics.ts` |

## Review mode

`demoMode` in `src/content/site.ts` highlights every `[placeholder]` in gold and shows "Review note" boxes for the client. Nothing in brackets is real data: no credentials, dates, fees, seat counts or testimonials have been invented.

## Launch checklist

1. Fill in every `[placeholder]` in `src/content/site.ts` with verified, approved information. Delete any field that can't be verified; don't estimate it. (`completedBatches` and `seatsAvailable` can be set to `null` to hide them.)
2. Replace the draft syllabus with the mentor's official modules and set `syllabus.status` to `"approved"`.
3. Replace the placeholder PDF with the official syllabus. Keep the same filename, or update `syllabusPdf.href`.
4. Add an approved mentor portrait (`mentor.portrait`) and student photos only with written permission.
5. Set `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL` and the analytics IDs.
6. Add the business's own legal text to `/privacy`, `/terms`, `/refund-policy` and the regulatory line in `site.risk.regulatory`.
7. Set `demoMode` to `false`, then confirm `npm run check:content` passes.
8. If your audience requires it, add a cookie/consent banner before enabling GA4 or the Meta Pixel.

## Analytics

With `NEXT_PUBLIC_GTM_ID` set, every event goes to the GTM `dataLayer` (set up GA4 and Meta tags inside GTM). Without GTM, events go directly to GA4 (`gtag`) and the Meta Pixel when their IDs are set.

| Event | When | Params |
| --- | --- | --- |
| `landing_page_view` | Page load | `page_path` |
| `whatsapp_click` | Any WhatsApp CTA (Meta: `Contact`) | `cta_location`, `intent` (`seat`/`ask`), `batch_id` |
| `syllabus_download_click` | Any PDF CTA (Meta: `SyllabusDownload`) | `cta_location` |
| `batch_card_view` | A batch card is at least 50% visible | `batch_id` |
| `syllabus_module_open` / `faq_open` | Accordion opened | `module` / `question` |

A completed PDF download can't be measured reliably in the browser, so `syllabus_download_complete` isn't sent. There's no form on the page, so `enrollment_form_submit` and `lead_confirmed` belong in whatever system confirms enrolments.

## Notes on the stack

- **No GSAP, Framer Motion or Lenis.** Reveals, the chart draw-in, accordions and parallax use CSS and IntersectionObserver, which keeps first-load JS around 120 kB for paid mobile traffic. Everything stays visible if JavaScript or animations are disabled, and `prefers-reduced-motion` is respected.
- The hero chart is hand-drawn and labelled "Illustrative teaching example · not live market data". It shows a plan (entry, stop, target), not an outcome.
- WhatsApp CTAs on batch cards pre-fill the batch name and start date. On-page copy says that opening a chat doesn't reserve a seat.
