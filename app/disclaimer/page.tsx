import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Disclaimer",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <StaticPage title="Disclaimer" kicker="Legal">
      <p>The information published on this site is for general informational purposes only. It does not constitute legal, financial, or notarial advice.</p>
      <p>Property descriptions, prices, and availability are provided in good faith but may change without notice. Buyers are responsible for conducting their own due diligence and consulting a qualified Moroccan notaire before entering any transaction.</p>
      <p>Hawazine acts as intermediary only. We hold no client funds and are not a party to any sale agreement.</p>
    </StaticPage>
  );
}
