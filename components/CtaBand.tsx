import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { contact, telHref } from "@/lib/config";

/** Opakovaný konverzný pás na konci stránok. */
export function CtaBand() {
  const t = useTranslations("Cta");
  const c = useTranslations("Common");

  return (
    <section className="container-page py-14 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-band px-6 py-12 text-center sm:px-12 sm:py-16">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-600/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-brand-800/40 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-band-fg sm:text-3xl">{t("heading")}</h2>
          <p className="mt-3 text-band-sub">{t("subheading")}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/kontakt" className="btn bg-brand-600 text-accent-fg hover:opacity-90">
              {t("button")}
            </Link>
            <a href={telHref} className="btn text-band-fg ring-1 ring-white/25 hover:bg-white/10">
              {c("call")}: {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
