import { faqs, site } from "@/content/site";
import { Header } from "@/components/Header";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { PageViewEvent, RevealObserver } from "@/components/ui/Behaviors";
import { Hero } from "@/components/sections/Hero";
import { Mentor } from "@/components/sections/Mentor";
import { Syllabus } from "@/components/sections/Syllabus";
import { SyllabusPdf } from "@/components/sections/SyllabusPdf";
import { Testimonials } from "@/components/sections/Testimonials";
import { Batches } from "@/components/sections/Batches";
import { Features } from "@/components/sections/Features";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      name: site.brand.program,
      description:
        "Structured trading education covering market structure, technical analysis, risk management and trading psychology.",
      provider: { "@type": "Organization", name: site.brand.name, url: site.url },
      syllabusSections: site.syllabus.modules.map((m) => ({ "@type": "Syllabus", name: m.title, description: m.summary })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <noscript>
        <style>{`.acc-panel{grid-template-rows:1fr!important}`}</style>
      </noscript>
      <Header />
      <main id="main">
        <Hero />
        <Mentor />
        <Syllabus />
        <SyllabusPdf />
        <Testimonials />
        <Batches />
        <Features />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
      <RevealObserver />
      <PageViewEvent />
    </>
  );
}
