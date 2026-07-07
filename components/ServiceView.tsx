import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPathname } from "@/i18n/navigation";
import { Reveal } from "@/components/Motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { StockImage } from "@/components/StockImage";
import { JsonLd } from "@/components/JsonLd";
import type { StockKey } from "@/lib/images";
import { graph, serviceSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { getService, type Service } from "@/lib/services";
import { site, contact, telHref } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

const abs = (href: Parameters<typeof getPathname>[0]["href"], locale: Locale) =>
  `${site.url}${getPathname({ href, locale })}`;

/** Data-driven šablóna service stránky (spoločná pre všetky služby). */
export async function ServiceView({ service, locale }: { service: Service; locale: Locale }) {
  const c = await getTranslations("Common");
  const nav = await getTranslations("Nav");
  const blog = await getTranslations("Blog");

  const faqItems = service.faqs.map((f) => ({ q: f.q[locale], a: f.a[locale] }));
  const related = service.related
    .map((slug) => getService(slug))
    .filter(Boolean) as Service[];

  const trail = [
    { name: c("home"), url: abs("/", locale) },
    { name: service.name[locale], url: abs(service.slug, locale) },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: service.name[locale],
            slug: service.slug,
            description: service.excerpt[locale],
            locale,
          }),
          breadcrumbSchema(trail),
          faqPageSchema(faqItems)
        )}
      />
      <Breadcrumbs
        items={[
          { label: c("home"), href: "/" },
          { label: service.name[locale] },
        ]}
      />

      {/* HERO */}
      <section className="container-page py-10 sm:py-14">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{nav("services")}</p>
          <h1 className="mt-5 text-3xl font-extrabold leading-[1.06] tracking-tight text-ink sm:text-4xl lg:text-[2.9rem]">
            {service.name[locale]}
          </h1>
          <p className="prose-lead mt-5">{service.lead[locale]}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn-primary">{c("getQuote")}</Link>
            <a href={telHref} className="btn-secondary">{c("call")}: {contact.phoneDisplay}</a>
          </div>
        </Reveal>
      </section>

      {/* Banner foto */}
      <section className="container-page">
        <Reveal>
          <StockImage
            imageKey={service.key as StockKey}
            locale={locale}
            priority
            aspect="aspect-[21/9]"
            sizes="(max-width: 768px) 100vw, 1100px"
          />
        </Reveal>
      </section>

      {/* INTRO + BENEFITS */}
      <section className="container-page pb-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-2xl space-y-5">
            {service.intro.map((p, i) => (
              <Reveal key={i}>
                <p className="text-[1.0625rem] leading-[1.75] text-body">{p[locale]}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="card">
              <h2 className="font-display text-lg font-bold text-ink">
                {locale === "sk" ? "Čo je zahrnuté" : "What's included"}
              </h2>
              <ul className="mt-4 space-y-3">
                {service.benefits.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-body">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700" aria-hidden>✓</span>
                    <span>{b[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container-page py-10">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {locale === "sk" ? "Ako to prebieha" : "How it works"}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {service.process.map((step, i) => (
            <Reveal key={i}>
              <div className="card h-full">
                <span className="font-display text-2xl font-black text-brand-200">{i + 1}</span>
                <p className="mt-2 font-display font-bold text-ink">{step.title[locale]}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-body">{step.text[locale]}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 rounded-2xl bg-brand-50 p-5 text-sm leading-relaxed text-brand-900 ring-1 ring-brand-100">
            💡 {service.priceHint[locale]}
          </p>
        </Reveal>
      </section>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="container-page py-10">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              {locale === "sk" ? "Časté otázky" : "Frequently asked questions"}
            </h2>
          </Reveal>
          <div className="mt-6 max-w-3xl">
            <FaqList items={faqItems} />
          </div>
        </section>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <section className="container-page py-10">
          <Reveal>
            <h2 className="text-xl font-bold tracking-tight text-ink">{blog("relatedServices")}</h2>
          </Reveal>
          <div className="mt-5 flex flex-wrap gap-3">
            {related.map((r) => (
              <Link key={r.slug} href={r.slug} className="rounded-full bg-surface px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50">
                {r.name[locale]} →
              </Link>
            ))}
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

/** Metadata helper zdieľaný service stránkami. */
export function serviceMetaInput(service: Service, locale: Locale) {
  return {
    locale,
    href: service.slug,
    title: `${service.name[locale]}${locale === "sk" ? " Bratislava" : " in Bratislava"}`,
    description: service.excerpt[locale],
  } as const;
}
