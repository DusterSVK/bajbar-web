import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Motion";
import { ServiceCard } from "@/components/ServiceCard";
import { StockImage } from "@/components/StockImage";
import { CtaBand } from "@/components/CtaBand";
import { pageMeta } from "@/lib/seo";
import { services } from "@/lib/services";
import { usp, districts, towns, contact, telHref, site } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

const copy = {
  sk: {
    eyebrow: "Výškové čistenie · Bratislava a okolie",
    h1: "Výškové čistenie a práca vo výške v Bratislave",
    lead: "Bajbar Services je firma na výškové čistenie a prácu vo výške v Bratislave a okolí. Umývame fasády a okná vo výškach, čistíme budovy a robíme výškové práce technikou lanového prístupu. Pracujeme bezpečne, poistene a bez potreby lešenia.",
    servicesTitle: "Naše služby",
    servicesSub: "Špecializujeme sa na čistenie a práce tam, kde bežné firmy nedosiahnu.",
    whyTitle: "Prečo Bajbar Services",
    processTitle: "Ako to prebieha",
    process: [
      { t: "1 · Dopyt a obhliadka", d: "Ozvete sa nám telefonicky alebo formulárom. Podľa fotiek alebo obhliadky posúdime rozsah." },
      { t: "2 · Cenová ponuka do 24 h", d: "Pripravíme nezáväznú cenovú ponuku na mieru, zvyčajne do 24 hodín." },
      { t: "3 · Realizácia vo výške", d: "Zabezpečíme pracovisko a odvedieme prácu bezpečne a načas, s minimom obmedzení." },
    ],
    areaTitle: "Kde pôsobíme",
    areaText: "Výškové čistenie a práce realizujeme v celej Bratislave a okolí, po dohode aj inde na Slovensku.",
    faqTeaser: "Máte otázky o cenách, bezpečnosti alebo postupe?",
    faqLink: "Prečítajte si časté otázky",
  },
  en: {
    eyebrow: "High-rise cleaning · Bratislava & region",
    h1: "High-rise cleaning & work at height in Bratislava",
    lead: "Bajbar Services is a high-rise cleaning and work-at-height company in Bratislava and the surrounding region. We wash facades and windows at height, clean buildings and carry out work at height using rope access. We work safely, insured and without the need for scaffolding.",
    servicesTitle: "Our services",
    servicesSub: "We specialise in cleaning and work where ordinary companies can't reach.",
    whyTitle: "Why Bajbar Services",
    processTitle: "How it works",
    process: [
      { t: "1 · Enquiry & survey", d: "Get in touch by phone or form. We assess the scope from photos or a site visit." },
      { t: "2 · Quote within 24 h", d: "We prepare a tailored, no-obligation quote, usually within 24 hours." },
      { t: "3 · Work at height", d: "We secure the site and get the job done safely and on time, with minimal disruption." },
    ],
    areaTitle: "Where we work",
    areaText: "We carry out high-rise cleaning and work throughout Bratislava and the region, and elsewhere in Slovakia by arrangement.",
    faqTeaser: "Questions about pricing, safety or the process?",
    faqLink: "Read the frequently asked questions",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    href: "/",
    absoluteTitle: true,
    title:
      locale === "sk"
        ? "Výškové čistenie a práca vo výške Bratislava | Bajbar Services"
        : "High-rise cleaning & work at height in Bratislava | Bajbar Services",
    description:
      locale === "sk"
        ? "Výškové čistenie a práca vo výške v Bratislave: umývanie fasád a okien vo výškach, čistenie budov, lanový prístup. Poistené, cena na mieru do 24 h."
        : "High-rise cleaning and work at height in Bratislava: facade and window cleaning at height, building cleaning, rope access. Insured, tailored quote within 24 h.",
  });
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("Common");
  const x = copy[locale];

  return (
    <>
      {/* HERO */}
      <section className="container-page pt-14 pb-8 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="eyebrow">{x.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              {x.h1}
            </h1>
            <p className="prose-lead mt-6 max-w-xl">{x.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kontakt" className="btn-primary">{c("getQuote")}</Link>
              <a href={telHref} className="btn-secondary">
                {c("call")}: {contact.phoneDisplay}
              </a>
            </div>
          </Reveal>

          {/* Hero foto */}
          <Reveal className="w-full lg:justify-self-end">
            <StockImage
              imageKey="hero"
              locale={locale}
              priority
              aspect="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 520px"
              className="w-full max-w-lg"
            />
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-page py-14">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{x.servicesTitle}</h2>
          <p className="prose-lead mt-3 max-w-xl">{x.servicesSub}</p>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} locale={locale} />
          ))}
        </div>
      </section>

      {/* WHY / USP */}
      <section className="container-page py-14">
        <div className="rounded-3xl bg-surface/70 p-8 ring-1 ring-hairline sm:p-12">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{x.whyTitle}</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {usp.map((u) => (
              <Reveal key={u.title.sk}>
                <div className="flex gap-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700" aria-hidden>✓</span>
                  <div>
                    <p className="font-display font-bold text-ink">{u.title[locale]}</p>
                    <p className="mt-1 text-sm leading-relaxed text-body">{u.text[locale]}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container-page py-14">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{x.processTitle}</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {x.process.map((p) => (
            <Reveal key={p.t}>
              <div className="card h-full">
                <p className="font-display text-lg font-bold text-brand-700">{p.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-body">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AREA */}
      <section className="container-page py-14">
        <div className="rounded-3xl bg-brand-50 p-8 ring-1 ring-brand-100 sm:p-12">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{x.areaTitle}</h2>
            <p className="prose-lead mt-3 max-w-2xl">{x.areaText}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[...districts, ...towns].map((d) => (
                <span key={d} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-brand-800 ring-1 ring-brand-100">
                  {d}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="container-page py-6">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-hairline bg-surface/60 p-8 sm:flex-row sm:items-center">
            <p className="text-lg font-semibold text-ink">{x.faqTeaser}</p>
            <Link href="/faq" className="btn-secondary shrink-0">{x.faqLink}</Link>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
