import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname, Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

const abs = (href: Parameters<typeof getPathname>[0]["href"], locale: Locale) =>
  `${site.url}${getPathname({ href, locale })}`;

const copy = {
  sk: {
    h1: "Cenník výškového čistenia",
    lead: "Výškové práce oceňujeme individuálne. Pevný cenník neexistuje, pretože každá zákazka je iná. Po zaslaní fotiek alebo obhliadke pripravíme nezáväznú cenovú ponuku na mieru, zvyčajne do 24 hodín.",
    factorsTitle: "Čo ovplyvňuje cenu",
    factors: [
      "Výška a rozsah plochy (m²)",
      "Typ povrchu (omietka, sklo, obklad, kov)",
      "Miera a druh znečistenia",
      "Spôsob prístupu (lanový prístup alebo plošina)",
      "Náročnosť a bezpečnostné zabezpečenie pracoviska",
      "Jednorazová vs. pravidelná spolupráca",
    ],
    servicesTitle: "Orientácia podľa služby",
    ctaNote: "Chcete presnú cenu? Pošlite nám fotky objektu a pripravíme ponuku bezplatne a nezáväzne.",
  },
  en: {
    h1: "High-rise cleaning pricing",
    lead: "We price work at height individually. There is no fixed price list, because every job is different. After photos or a site visit we prepare a no-obligation, tailored quote, usually within 24 hours.",
    factorsTitle: "What affects the price",
    factors: [
      "Height and area (m²)",
      "Surface type (plaster, glass, cladding, metal)",
      "Level and type of soiling",
      "Access method (rope access or platform)",
      "Complexity and site safety measures",
      "One-off vs. regular cooperation",
    ],
    servicesTitle: "Guidance by service",
    ctaNote: "Want an exact price? Send us photos of the site and we'll prepare a quote free and with no obligation.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    href: "/cennik",
    title: locale === "sk" ? "Cenník výškového čistenia a práce vo výške" : "Pricing for high-rise cleaning & work at height",
    description:
      locale === "sk"
        ? "Ako sa tvorí cena výškového čistenia, čo ju ovplyvňuje a ako získať nezáväznú cenovú ponuku na mieru do 24 hodín."
        : "How high-rise cleaning is priced, what affects it and how to get a tailored, no-obligation quote within 24 hours.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("Common");
  const nav = await getTranslations("Nav");
  const x = copy[locale];

  const trail = [
    { name: c("home"), url: abs("/", locale) },
    { name: nav("pricing"), url: abs("/cennik", locale) },
  ];

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
      <Breadcrumbs items={[{ label: c("home"), href: "/" }, { label: nav("pricing") }]} />

      <section className="container-page py-10 sm:py-14">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{nav("pricing")}</p>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{x.h1}</h1>
          <p className="prose-lead mt-5">{x.lead}</p>
        </Reveal>
      </section>

      <section className="container-page pb-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full">
              <h2 className="font-display text-lg font-bold text-ink">{x.factorsTitle}</h2>
              <ul className="mt-4 space-y-3">
                {x.factors.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed text-body">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700" aria-hidden>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="card h-full">
              <h2 className="font-display text-lg font-bold text-ink">{x.servicesTitle}</h2>
              <ul className="mt-4 space-y-4">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.slug} className="font-semibold text-brand-700 hover:underline">
                      {s.name[locale]}
                    </Link>
                    <p className="mt-1 text-sm leading-relaxed text-body">{s.priceHint[locale]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-8 rounded-2xl bg-brand-50 p-5 text-sm leading-relaxed text-brand-900 ring-1 ring-brand-100">
            💡 {x.ctaNote}
          </p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
