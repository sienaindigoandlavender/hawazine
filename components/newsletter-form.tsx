"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");
    if (!email) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter signup",
          email,
          message: `New newsletter signup: ${email}`,
          source: "newsletter",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="font-ui text-meta text-paper/70">
        Thank you. We will write occasionally.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="font-ui">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-center border-b border-paper/30">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          placeholder="Newsletter"
          className="flex-1 bg-transparent py-2 font-serif text-meta text-paper placeholder:text-paper/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="ml-2 text-meta uppercase tracking-[0.14em] text-paper/80 transition-colors hover:text-paper disabled:opacity-50"
        >
          {status === "sending" ? "…" : "Join"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-meta text-paper/70">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
