import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { Reveal } from "@/components/Motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { graph, ownerSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site, contact } from "@/lib/config";
import { services } from "@/lib/services";
import type { Locale } from "@/i18n/routing";

const abs = (href: Parameters<typeof getPathname>[0]["href"], locale: Locale) =>
  `${site.url}${getPathname({ href, locale })}`;

const copy = {
  sk: {
    h1: "O firme Bajbar Services",
    lead: `Bajbar Services s. r. o. je slovenská firma so sídlom v Bratislave, ktorá sa špecializuje na výškové čistenie a prácu vo výške. Vedie ju konateľ ${contact.owner}.`,
    p: [
      "Zameriavame sa na čistenie a práce tam, kde bežné firmy nedosiahnu, teda na fasády, presklené plochy, okná vo výškach a ťažko dostupné časti budov. Kombinujeme techniku lanového prístupu s dôkladnou prácou a dôrazom na bezpečnosť.",
      "Pracujeme pre majiteľov nehnuteľností, správcov budov, spoločenstvá vlastníkov bytov (SVB) aj firmy. Popri výškovom čistení zabezpečujeme aj prípravné a dokončovacie stavebné práce a upratovacie služby.",
    ],
    valuesTitle: "Na čom nám záleží",
    values: [
      { t: "Bezpečnosť", d: "Dodržiavame bezpečnostné predpisy a používame certifikované istiace systémy." },
      { t: "Dôvera", d: "Máme poistenie zodpovednosti a jasne komunikujeme rozsah aj cenu." },
      { t: "Kvalita", d: "Odvádzame prácu poriadne a výsledok kontrolujeme do detailu." },
    ],
    detailsTitle: "Firemné údaje",
  },
  en: {
    h1: "About Bajbar Services",
    lead: `Bajbar Services s. r. o. is a Slovak company based in Bratislava specialising in high-rise cleaning and work at height. It is led by managing director ${contact.owner}.`,
    p: [
      "We focus on cleaning and work where ordinary companies can't reach, such as facades, glazed surfaces, windows at height and hard-to-access parts of buildings. We combine rope access with thorough work and a strong emphasis on safety.",
      "We work for property owners, building managers, homeowners' associations and companies. Alongside high-rise cleaning we also provide preparatory and finishing construction work and cleaning services.",
    ],
    valuesTitle: "What we care about",
    values: [
      { t: "Safety", d: "We follow safety regulations and use certified fall-protection systems." },
      { t: "Trust", d: "We carry liability insurance and communicate scope and price clearly." },
      { t: "Quality", d: "We do the job properly and we check the result down to the detail." },
    ],
    detailsTitle: "Company details",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    href: "/o-nas",
    title: locale === "sk" ? "O nás" : "About us",
    description:
      locale === "sk"
        ? "Bajbar Services s. r. o., výškové čistenie a práca vo výške v Bratislave. Kto sme, čo robíme a firemné údaje."
        : "Bajbar Services s. r. o. provides high-rise cleaning and work at height in Bratislava. Who we are, what we do and company details.",
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
    { name: nav("about"), url: abs("/o-nas", locale) },
  ];

  return (
    <>
      <JsonLd data={graph(ownerSchema(locale), breadcrumbSchema(trail))} />
      <Breadcrumbs items={[{ label: c("home"), href: "/" }, { label: nav("about") }]} />

      <section className="container-page py-10 sm:py-14">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{nav("about")}</p>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{x.h1}</h1>
          <p className="prose-lead mt-5">{x.lead}</p>
          <div className="mt-5 max-w-2xl space-y-4">
            {x.p.map((p, i) => (
              <p key={i} className="text-[1.0625rem] leading-[1.75] text-body">{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-page py-8">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{x.valuesTitle}</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {x.values.map((v) => (
            <Reveal key={v.t}>
              <div className="card h-full">
                <p className="font-display text-lg font-bold text-brand-700">{v.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-body">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page py-8">
        <Reveal>
          <div className="card max-w-xl">
            <h2 className="font-display text-lg font-bold text-ink">{x.detailsTitle}</h2>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              <dt className="text-muted">{locale === "sk" ? "Názov" : "Name"}</dt>
              <dd className="font-medium text-ink">{site.legalName}</dd>
              <dt className="text-muted">{c("address")}</dt>
              <dd className="font-medium text-ink">{contact.address.street}, {contact.address.postalCode} {contact.address.city}</dd>
              <dt className="text-muted">IČO</dt>
              <dd className="font-medium text-ink">{contact.ico}</dd>
              <dt className="text-muted">{locale === "sk" ? "Konateľ" : "Director"}</dt>
              <dd className="font-medium text-ink">{contact.owner}</dd>
            </dl>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
