"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { services } from "@/lib/services";
import type { Locale } from "@/i18n/routing";

type Status = "idle" | "sending" | "ok" | "error";

export function LeadForm() {
  const t = useTranslations("Form");
  const locale = useLocale() as Locale;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      service: String(fd.get("service") || ""),
      city: String(fd.get("city") || ""),
      message: String(fd.get("message") || ""),
      gdpr: fd.get("gdpr") === "on",
      locale,
    };

    if (!payload.name.trim() || !payload.phone.trim()) {
      setError(t("errorRequired"));
      return;
    }
    if (!payload.gdpr) {
      setError(t("errorGdpr"));
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setError(t("errorGeneric"));
    }
  }

  if (status === "ok") {
    return (
      <div className="card bg-brand-50 ring-brand-100">
        <h3 className="font-display text-lg font-bold text-brand-800">{t("successTitle")}</h3>
        <p className="mt-2 text-sm leading-relaxed text-body">{t("successText")}</p>
      </div>
    );
  }

  const field = "w-full rounded-xl border border-hairline bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

  return (
    <form onSubmit={onSubmit} className="card space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">{t("name")} *</span>
          <input name="name" type="text" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">{t("phone")} *</span>
          <input name="phone" type="tel" required autoComplete="tel" className={field} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">{t("email")}</span>
          <input name="email" type="email" autoComplete="email" className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">{t("city")}</span>
          <input name="city" type="text" className={field} />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">{t("service")}</span>
        <select name="service" defaultValue="" className={field}>
          <option value="" disabled>{t("servicePlaceholder")}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name[locale]}>{s.name[locale]}</option>
          ))}
          <option value={t("serviceOther")}>{t("serviceOther")}</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">{t("message")}</span>
        <textarea name="message" rows={4} className={field} />
      </label>

      <label className="flex items-start gap-3 text-sm text-body">
        <input name="gdpr" type="checkbox" className="mt-1 h-4 w-4 rounded border-hairline text-brand-600 focus:ring-brand-300" />
        <span>{t("gdpr")}</span>
      </label>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
