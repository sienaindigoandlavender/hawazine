import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Terms of use",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <StaticPage title="Terms of use" kicker="Legal">
      <p>By using this site you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Content</h2>
      <p>All text, images, and data on this site are the property of Hawazine unless otherwise stated. You may not reproduce or republish content without written permission.</p>
      <h2>Listings</h2>
      <p>Property listings are published as a service to buyers and sellers. Hawazine does not guarantee accuracy, completeness, or current availability of any listing.</p>
      <h2>Links</h2>
      <p>This site may link to third-party sites. We are not responsible for their content or practices.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by Moroccan law. Any disputes fall under the jurisdiction of the courts of Marrakech.</p>
    </StaticPage>
  );
}
