"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { services } from "@/lib/services";
import { contact, telHref, site } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

export function Header() {
  const t = useTranslations("Nav");
  const c = useTranslations("Common");
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);

  const mainLinks: { href: Parameters<typeof Link>[0]["href"]; label: string }[] = [
    { href: "/referencie", label: t("references") },
    { href: "/cennik", label: t("pricing") },
    { href: "/blog", label: t("blog") },
    { href: "/o-nas", label: t("about") },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-hairline">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-display" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-sm font-black text-accent-fg">
              BS
            </span>
            <span className="text-lg font-extrabold tracking-tight text-ink">
              {site.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Hlavná navigácia">
            {/* Služby dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-ink/80 hover:text-brand-700">
                {t("services")}
                <svg className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full w-72 translate-y-1 pt-2 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="card p-2">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={s.slug}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-brand-50"
                    >
                      <span className="text-lg" aria-hidden>{s.icon}</span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{s.nav[locale]}</span>
                        <span className="block text-xs text-muted">{s.excerpt[locale].slice(0, 52)}…</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {mainLinks.map((l) => (
              <Link key={l.label} href={l.href} className="rounded-full px-3 py-2 text-sm font-semibold text-ink/80 hover:text-brand-700">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a href={telHref} className="hidden items-center gap-1.5 text-sm font-semibold text-ink sm:flex">
              <svg className="h-4 w-4 text-brand-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h2.1a1.5 1.5 0 0 1 1.45 1.1l.7 2.5a1.5 1.5 0 0 1-.4 1.5l-1 1a11 11 0 0 0 4.05 4.05l1-1a1.5 1.5 0 0 1 1.5-.4l2.5.7A1.5 1.5 0 0 1 18 14.4v2.1a1.5 1.5 0 0 1-1.5 1.5A14.5 14.5 0 0 1 2 3.5Z" />
              </svg>
              {contact.phoneDisplay}
            </a>
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <Link href="/kontakt" className="btn-primary hidden md:inline-flex">
              {c("getQuoteShort")}
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl ring-1 ring-hairline lg:hidden"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="h-5 w-5 text-ink" viewBox="0 0 20 20" fill="none" aria-hidden>
                {open ? (
                  <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="glass border-b border-hairline lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobilná navigácia">
            <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wide text-muted">{t("services")}</p>
            {services.map((s) => (
              <Link key={s.slug} href={s.slug} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-brand-50" onClick={() => setOpen(false)}>
                <span aria-hidden>{s.icon}</span>
                <span className="text-sm font-semibold text-ink">{s.nav[locale]}</span>
              </Link>
            ))}
            <div className="my-2 h-px bg-hairline" />
            {mainLinks.map((l) => (
              <Link key={l.label} href={l.href} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-brand-50" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/kontakt" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-brand-50" onClick={() => setOpen(false)}>
              {t("contact")}
            </Link>
            <div className="mt-3 flex items-center justify-between gap-3 px-3">
              <a href={telHref} className="btn-secondary flex-1">{contact.phoneDisplay}</a>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
