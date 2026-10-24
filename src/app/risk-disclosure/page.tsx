import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/LegalPage";
import { T } from "@/components/ui/T";

export const metadata: Metadata = { title: "Risk disclosure", alternates: { canonical: "/risk-disclosure/" } };

export default function Page() {
  return (
    <LegalPage title="Risk disclosure">
      <p>{site.risk.full}</p>
      <p>
        Leveraged products such as futures and options can lead to losses larger than the amount initially invested.
        Past performance — including any example shown in course material — does not indicate future results.
      </p>
      <p>
        The mentorship teaches concepts, analysis methods and risk management. It does not provide personalised
        investment advice, and you remain responsible for your own trading decisions.
      </p>
      <p>
        <T>{site.risk.regulatory}</T>
      </p>
    </LegalPage>
  );
}
