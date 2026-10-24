import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { T } from "@/components/ui/T";

export const metadata: Metadata = { title: "Terms & conditions", alternates: { canonical: "/terms/" } };

export default function Page() {
  return (
    <LegalPage title="Terms & conditions">
      <p>
        <T>[Enrolment terms: eligibility, how a seat is confirmed, payment schedule, access to sessions and materials, code of conduct, and intellectual property in course content.]</T>
      </p>
      <h2>Educational purpose</h2>
      <p>
        The mentorship provides education only. Nothing in the course, its materials or its sessions is a recommendation
        to buy or sell any security or financial instrument.
      </p>
    </LegalPage>
  );
}
