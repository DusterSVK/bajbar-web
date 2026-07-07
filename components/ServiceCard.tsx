import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Service } from "@/lib/services";
import type { Locale } from "@/i18n/routing";

export function ServiceCard({ service, locale }: { service: Service; locale: Locale }) {
  const c = useTranslations("Common");
  return (
    <Link
      href={service.slug}
      className="card group flex flex-col transition-all hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(15,27,36,0.05),0_24px_48px_-20px_rgba(15,27,36,0.22)]"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-2xl ring-1 ring-brand-100" aria-hidden>
        {service.icon}
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-ink">{service.name[locale]}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{service.excerpt[locale]}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
        {c("readMore")}
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
