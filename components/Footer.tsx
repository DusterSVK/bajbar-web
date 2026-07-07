import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { services } from "@/lib/services";
import { site, contact, hoursText, telHref, mailHref } from "@/lib/config";
import { t as tx, type LocalizedText } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

export function Footer() {
  const f = useTranslations("Footer");
  const c = useTranslations("Common");
  const nav = useTranslations("Nav");
  const locale = useLocale() as Locale;

  const year = 2026; // Date.now() sa v build-time SSG nepoužíva; drž fixný alebo aktualizuj ročne.

  return (
    <footer className="mt-20 border-t border-hairline bg-surface/60">
      <div className="container-page py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-sm font-black text-accent-fg">BS</span>
              <span className="font-display text-lg font-extrabold tracking-tight text-ink">{site.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-body">{f("tagline")}</p>
          </div>

          {/* Služby */}
          <nav aria-label={f("servicesHeading")}>
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink">{f("servicesHeading")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.slug} className="text-body hover:text-brand-700">
                    {tx(s.nav as LocalizedText, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Spoločnosť */}
          <nav aria-label={f("companyHeading")}>
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink">{f("companyHeading")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/o-nas" className="text-body hover:text-brand-700">{nav("about")}</Link></li>
              <li><Link href="/referencie" className="text-body hover:text-brand-700">{nav("references")}</Link></li>
              <li><Link href="/faq" className="text-body hover:text-brand-700">{nav("faq")}</Link></li>
              <li><Link href="/blog" className="text-body hover:text-brand-700">{nav("blog")}</Link></li>
              <li><Link href="/ochrana-osobnych-udajov" className="text-body hover:text-brand-700">{f("privacy")}</Link></li>
            </ul>
          </nav>

          {/* Kontakt */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink">{f("contactHeading")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-body">
              <li><a href={telHref} className="hover:text-brand-700">{contact.phoneDisplay}</a></li>
              <li><a href={mailHref} className="hover:text-brand-700">{contact.email}</a></li>
              <li>{contact.address.street}, {contact.address.postalCode} {contact.address.city}</li>
              <li className="pt-2">
                <span className="block font-semibold text-ink">{c("hours")}</span>
                {hoursText.map((h) => (
                  <span key={h.label.sk} className="mt-1 flex justify-between gap-3">
                    <span>{h.label[locale]}</span>
                    <span>{h.value[locale]}</span>
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {site.legalName} · {f("ico")} {contact.ico}
          </p>
          <p>{f("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
