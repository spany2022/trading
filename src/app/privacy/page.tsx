import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { T } from "@/components/ui/T";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy/" } };

export default function Page() {
  return (
    <LegalPage title="Privacy policy">
      <p>
        <T>[Describe what personal data is collected (for example, WhatsApp enquiries and analytics data), why it is collected, how long it is kept, who it is shared with, and how visitors can request access or deletion.]</T>
      </p>
      <h2>Analytics and advertising</h2>
      <p>
        <T>[List the analytics and advertising tools in use, such as Google Analytics and the Meta Pixel, and explain how visitors can opt out.]</T>
      </p>
      <h2>Contact</h2>
      <p>
        <T>[Data protection contact details.]</T>
      </p>
    </LegalPage>
  );
}
