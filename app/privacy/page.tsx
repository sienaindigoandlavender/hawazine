import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy policy" kicker="Legal">
      <p>Hawazine takes your privacy seriously. This page explains what data we collect, why, and how it is handled.</p>
      <h2>What we collect</h2>
      <p>When you submit the contact or newsletter form, we collect your name, email address, and any message you provide. This data is used solely to respond to your enquiry or send you occasional updates if you subscribed.</p>
      <h2>Analytics</h2>
      <p>This site uses Google Analytics to understand how visitors use it. Google Analytics collects anonymised data including pages visited, time on site, and approximate location. No personally identifiable information is shared with Google. You may opt out via your browser settings or a GA opt-out extension.</p>
      <h2>Cookies</h2>
      <p>Google Analytics sets cookies in your browser. No other cookies are set by this site. You may disable cookies in your browser at any time.</p>
      <h2>Data retention</h2>
      <p>Contact form submissions are retained for as long as necessary to handle your enquiry and no longer. We do not sell or share your data with third parties.</p>
      <h2>Your rights</h2>
      <p>If you are based in the EU or UK, you have the right to access, correct, or delete your personal data. Write to us at morocco@hawazine.com and we will respond within 30 days.</p>
      <h2>Contact</h2>
      <p>Questions about this policy: morocco@hawazine.com</p>
    </StaticPage>
  );
}
