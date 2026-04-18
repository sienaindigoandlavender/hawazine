"use client";

import { useState } from "react";

interface ContactFormProps {
  propertySlug?: string;
  source?: string;
  defaultMessage?: string;
}

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ propertySlug, source = "contact_page", defaultMessage }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
      propertySlug,
      source,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(body.error ?? "Something went wrong");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "sent") {
    return (
      <div className="font-serif text-body text-ink">
        Thank you. We will read this carefully and reply from Marrakech within two business days.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="font-ui space-y-6">
      <Field label="Name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone (optional)" name="phone" />
      <Field
        label="Message"
        name="message"
        required
        multiline
        defaultValue={defaultMessage}
      />

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="border border-ink px-6 py-3 text-meta uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && errorMessage && (
          <p className="text-meta text-accent">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  multiline,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  defaultValue?: string;
}) {
  const baseClass =
    "w-full border-0 border-b border-ink/30 bg-transparent px-0 py-2 font-serif text-body text-ink placeholder:text-quiet focus:border-accent focus:outline-none";

  return (
    <label className="block">
      <span className="font-ui text-meta uppercase tracking-[0.14em] text-quiet">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          defaultValue={defaultValue}
          className={`${baseClass} mt-2 resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          className={`${baseClass} mt-2`}
        />
      )}
    </label>
  );
}
