import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { T } from "@/components/ui/T";

export const metadata: Metadata = { title: "Refund & cancellation", alternates: { canonical: "/refund-policy/" } };

export default function Page() {
  return (
    <LegalPage title="Refund & cancellation policy">
      <p>
        <T>[State whether fees are refundable, the deadlines and conditions for a refund, what happens if a batch is rescheduled or cancelled, and how to request a transfer to another batch.]</T>
      </p>
    </LegalPage>
  );
}
