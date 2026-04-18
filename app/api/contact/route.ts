import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  propertySlug?: string;
  source?: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 200);
  const phone = (body.phone ?? "").trim().slice(0, 80);
  const message = (body.message ?? "").trim().slice(0, 5000);
  const propertySlug = (body.propertySlug ?? "").trim().slice(0, 200);
  const source = (body.source ?? "contact_page").trim().slice(0, 80);

  if (!email || !message) {
    return NextResponse.json(
      { error: "Email and message are required." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;
  const cc = process.env.CONTACT_EMAIL_CC;

  if (!apiKey || !to || !from) {
    // Fail loud in dev, fail safely in prod.
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[contact] Missing env: RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM must be set.",
      );
    }
    return NextResponse.json(
      { error: "Contact form is not yet configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const subject = propertySlug
    ? `Enquiry — ${propertySlug} — ${name || email}`
    : source === "newsletter"
      ? `Newsletter signup — ${email}`
      : `Hawazine enquiry — ${name || email}`;

  const html = `
    <div style="font-family: Georgia, serif; font-size: 16px; color: #111;">
      <h2 style="margin: 0 0 16px;">New enquiry</h2>
      <p style="margin: 0 0 6px;"><strong>Source:</strong> ${escapeHtml(source)}</p>
      ${propertySlug ? `<p style="margin: 0 0 6px;"><strong>Property:</strong> ${escapeHtml(propertySlug)}</p>` : ""}
      <p style="margin: 0 0 6px;"><strong>Name:</strong> ${escapeHtml(name || "(not provided)")}</p>
      <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p style="margin: 0 0 6px;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;" />
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      cc: cc ? [cc] : undefined,
      replyTo: email,
      subject,
      html,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send. Please try again or email us directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected error. Please try again." },
      { status: 500 },
    );
  }
}
