import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { Reveal } from "@/components/Motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { graph, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { generalFaqs } from "@/lib/faqs";
import { services } from "@/lib/services";
import { site } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

const abs = (href: Parameters<typeof getPathname>[0]["href"], locale: Locale) =>
  `${site.url}${getPathname({ href, locale })}`;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    href: "/faq",
    title: locale === "sk" ? "Časté otázky o výškovom čistení" : "FAQ about high-rise cleaning",
    description:
      locale === "sk"
        ? "Odpovede na časté otázky: ceny, bezpečnosť, lešenie, poistenie a oblasť pôsobenia výškového čistenia."
        : "Answers to common questions: pricing, safety, scaffolding, insurance and the service area for high-rise cleaning.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("Common");
  const nav = await getTranslations("Nav");

  // Zbierka: všeobecné + FAQ jednotlivých služieb (jeden FAQPage graf).
  const serviceFaqs = services.flatMap((s) => s.faqs);
  const all = [...generalFaqs, ...serviceFaqs].map((f) => ({ q: f.q[locale], a: f.a[locale] }));

  const trail = [
    { name: c("home"), url: abs("/", locale) },
    { name: nav("faq"), url: abs("/faq", locale) },
  ];

  return (
    <>
      <JsonLd data={graph(faqPageSchema(all), breadcrumbSchema(trail))} />
      <Breadcrumbs items={[{ label: c("home"), href: "/" }, { label: nav("faq") }]} />

      <section className="container-page py-10 sm:py-14">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{nav("faq")}</p>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {locale === "sk" ? "Časté otázky" : "Frequently asked questions"}
          </h1>
          <p className="prose-lead mt-4">
            {locale === "sk"
              ? "Najčastejšie otázky o cenách, bezpečnosti a postupe pri výškovom čistení a práci vo výške."
              : "The most common questions about pricing, safety and the process of high-rise cleaning and work at height."}
          </p>
        </Reveal>
        <div className="mt-8 max-w-3xl">
          <FaqList items={all} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
