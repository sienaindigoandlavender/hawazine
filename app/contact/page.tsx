import type { Metadata } from "next";
import Link from "next/link";
import { EditorialHero } from "@/components/editorial-hero";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to Hawazine about buying a riad, dar, or land in the Marrakech medina.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <EditorialHero
        kicker="Contact"
        title="Write to us"
        subtitle="A short, honest message about what you are looking for is better than a long one. We read every note and reply from Marrakech within two business days."
      />

      <section className="mx-auto max-w-page px-6 py-8 md:py-12">
        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-3">
            <ContactForm source="contact_page" />
          </div>
          <aside className="md:col-span-2">
            <div className="font-ui text-meta uppercase tracking-[0.14em] text-quiet">
              Before you write
            </div>
            <div className="mt-4 space-y-5 font-serif text-body text-ink/90">
              <p>
                A first read of{" "}
                <Link
                  href="/how-we-work"
                  className="underline decoration-quiet underline-offset-4 hover:decoration-accent hover:text-accent"
                >
                  how we work
                </Link>{" "}
                will save you and us time. The page covers fees, mandates, and what a first visit actually looks like.
              </p>
              <p>
                If you are new to the medina as a place to buy in, the{" "}
                <Link
                  href="/buying"
                  className="underline decoration-quiet underline-offset-4 hover:decoration-accent hover:text-accent"
                >
                  Buying
                </Link>{" "}
                section is the right starting point.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
