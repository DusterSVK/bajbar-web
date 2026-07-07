import { NextResponse } from "next/server";
import { contact, site } from "@/lib/config";

/**
 * Príjem dopytu z kontaktného formulára + odoslanie e-mailom cez Resend.
 *
 * ENV (.env.local / hosting):
 *   RESEND_API_KEY  = re_...               (z resend.com)
 *   LEAD_TO_EMAIL   = kam chodia dopyty    (default: contact.email)
 *   LEAD_FROM_EMAIL = overený odosielateľ  (default: web@<doména>)
 * Bez RESEND_API_KEY sa dopyt iba zaloguje (dev režim), formulár aj tak funguje.
 */

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný formát" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const email = String(data.email ?? "").trim();
  const city = String(data.city ?? "").trim();
  const service = String(data.service ?? "").trim();
  const message = String(data.message ?? "").trim();
  const locale = String(data.locale ?? "sk").trim();

  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Chýba meno alebo telefón" }, { status: 422 });
  }
  if (!data.gdpr) {
    return NextResponse.json({ ok: false, error: "Chýba súhlas GDPR" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || contact.email;
  const from = process.env.LEAD_FROM_EMAIL || `Web ${site.name} <web@${site.domain}>`;

  const rows: [string, string][] = [
    ["Meno", name],
    ["Telefón", phone],
    ["E-mail", email || "-"],
    ["Lokalita", city || "-"],
    ["Služba", service || "-"],
    ["Jazyk", locale],
    ["Správa", message || "-"],
  ];
  const html = `
    <h2>Nový dopyt z webu ${escapeHtml(site.domain)}</h2>
    <table style="border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:600">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`).join("")}
    </table>`;

  if (!apiKey) {
    console.log("[lead] (RESEND_API_KEY nenastavený) Nový dopyt:", { name, phone, email, city, service, message });
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email || undefined,
        subject: `Nový dopyt: ${service || "výškové čistenie"} - ${name}`,
        html,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error("[lead] Resend zlyhal:", res.status, detail);
      return NextResponse.json({ ok: false, error: "E-mail sa nepodarilo odoslať" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] Chyba odoslania:", err);
    return NextResponse.json({ ok: false, error: "Chyba servera" }, { status: 500 });
  }
}
