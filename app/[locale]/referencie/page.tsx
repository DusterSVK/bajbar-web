import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { StockImage } from "@/components/StockImage";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";
import type { StockKey } from "@/lib/images";
import { pageMeta } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

const abs = (href: Parameters<typeof getPathname>[0]["href"], locale: Locale) =>
  `${site.url}${getPathname({ href, locale })}`;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    href: "/referencie",
    title: locale === "sk" ? "Referencie a realizácie" : "References & projects",
    description:
      locale === "sk"
        ? "Typy realizácií výškového čistenia a práce vo výške, teda čistenie fasád, umývanie okien vo výškach a čistenie budov v Bratislave."
        : "Types of high-rise cleaning and work-at-height projects, such as facade cleaning, window cleaning at height and building cleaning in Bratislava.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("Common");
  const nav = await getTranslations("Nav");

  const trail = [
    { name: c("home"), url: abs("/", locale) },
    { name: nav("references"), url: abs("/referencie", locale) },
  ];

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
      <Breadcrumbs items={[{ label: c("home"), href: "/" }, { label: nav("references") }]} />

      <section className="container-page py-10 sm:py-14">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{nav("references")}</p>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {locale === "sk" ? "Referencie a realizácie" : "References & projects"}
          </h1>
          <p className="prose-lead mt-5">
            {locale === "sk"
              ? "Bajbar Services je mladá firma a svoje portfólio realizácií priebežne budujeme. Nižšie nájdete typy prác, ktoré bežne realizujeme. Fotodokumentáciu konkrétnych zákaziek sem budeme dopĺňať."
              : "Bajbar Services is a young company and we are building our project portfolio as we go. Below are the types of work we regularly carry out. We'll be adding photo documentation of specific jobs here."}
          </p>
        </Reveal>

        {/* Galéria fotiek */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {(["references", "buildings", "windows"] as StockKey[]).map((k) => (
            <Reveal key={k}>
              <StockImage
                imageKey={k}
                locale={locale}
                aspect="aspect-[4/3]"
                rounded="rounded-2xl"
                sizes="(max-width: 640px) 100vw, 360px"
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <Reveal key={s.slug}>
              <div className="card h-full">
                <span className="text-2xl" aria-hidden>{s.icon}</span>
                <h2 className="mt-3 font-display text-lg font-bold text-ink">{s.name[locale]}</h2>
                <p className="mt-2 text-sm leading-relaxed text-body">{s.excerpt[locale]}</p>
                <Link href={s.slug} className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:underline">
                  {c("readMore")} →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
