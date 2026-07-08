import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Motion";
import { img, type StockKey } from "@/lib/images";
import { services } from "@/lib/services";
import { usp, districts, towns, contact, site, telHref } from "@/lib/config";
import { DemoNav } from "@/components/DemoNav";
import type { Locale } from "@/i18n/routing";

/**
 * UKÁŽKA A-01 — „Veža dôvery" (Trust Tower).
 * Authority-first layout: celoplošný tmavý hero na reálnej fotke, pás dôvery,
 * služby a silná E-E-A-T sekcia (overiteľné firemné údaje). Lokálne pretémované
 * (studená oceľová + trust-blue) cez scoped premenné v `.tt` — NEZASAHUJE do
 * globálnych tokenov ani iných stránok. noindex (demo).
 */

const SERVICE_IMG: Record<string, StockKey> = {
  "/prace-vo-vyske": "heights",
  "/cistenie-fasad": "facade",
  "/umyvanie-okien-vo-vyskach": "windows",
  "/cistenie-budov": "buildings",
};

const copy = {
  sk: {
    kicker: "Výškové čistenie · Bratislava a okolie",
    h1a: "Výškové čistenie a práca ",
    h1accent: "vo výške",
    h1b: " v Bratislave",
    lead:
      "Umývame fasády a okná vo výškach, čistíme budovy a robíme výškové práce technikou lanového prístupu — bezpečne, poistene a bez lešenia.",
    ctaPrimary: "Získať cenovú ponuku",
    ctaCall: "Zavolať",
    trustChips: ["Poistená zodpovednosť", "Certifikovaný lanový prístup", "Bez lešenia", "Cena do 24 h"],
    barTitle: "Na čo sa môžete spoľahnúť",
    bar: [
      { k: "Technika", v: "Lanový prístup + plošiny" },
      { k: "Poistenie", v: "Zodpovednosť za škodu" },
      { k: "Pôsobnosť", v: "Bratislava a okolie" },
      { k: "Cenová ponuka", v: "do 24 hodín" },
    ],
    svcKicker: "Služby",
    svcTitle: "Naše služby",
    svcSub: "Špecializujeme sa na čistenie a práce tam, kde bežné firmy nedosiahnu.",
    trustKicker: "Prečo nám dôverovať",
    trustTitle: "Firma, ktorú si viete overiť.",
    trustLead:
      "Nie sme anonymná inzercia. Za prácou vo výške stojí reálna firma so sídlom v Bratislave, poistením a konateľom, ktorého meno poznáte.",
    creds: [
      { k: "Prevádzkovateľ", v: site.legalName },
      { k: "Konateľ", v: contact.owner },
      { k: "IČO", v: contact.ico },
      { k: "Sídlo", v: `${contact.address.street}, ${contact.address.postalCode} ${contact.address.city}` },
      { k: "Poistenie", v: "Zodpovednosť za spôsobenú škodu" },
      { k: "Pôsobíme od", v: String(site.foundingYear) },
    ],
    procKicker: "Postup",
    procTitle: "Ako to prebieha",
    process: [
      { t: "Dopyt a obhliadka", d: "Ozvete sa telefonicky alebo formulárom. Podľa fotiek alebo obhliadky posúdime rozsah." },
      { t: "Cenová ponuka do 24 h", d: "Pripravíme nezáväznú cenovú ponuku na mieru, zvyčajne do 24 hodín." },
      { t: "Realizácia vo výške", d: "Zabezpečíme pracovisko a odvedieme prácu bezpečne a načas, s minimom obmedzení." },
    ],
    areaKicker: "Kde pôsobíme",
    areaTitle: "Bratislava a okolie",
    areaText:
      "Výškové čistenie a práce realizujeme v celej Bratislave a okolí, po dohode aj inde na Slovensku.",
    ctaTitle: "Povedzte nám, čo treba vyčistiť.",
    ctaText: "Ozvite sa telefonicky alebo cez formulár. Cenovú ponuku pripravíme zvyčajne do 24 hodín.",
  },
  en: {
    kicker: "High-rise cleaning · Bratislava & region",
    h1a: "High-rise cleaning and work ",
    h1accent: "at height",
    h1b: " in Bratislava",
    lead:
      "We wash facades and windows at height, clean buildings and carry out work at height using rope access — safely, insured and without scaffolding.",
    ctaPrimary: "Get a quote",
    ctaCall: "Call",
    trustChips: ["Insured liability", "Certified rope access", "No scaffolding", "Quote within 24 h"],
    barTitle: "What you can rely on",
    bar: [
      { k: "Method", v: "Rope access + platforms" },
      { k: "Insurance", v: "Liability cover" },
      { k: "Coverage", v: "Bratislava & region" },
      { k: "Quote", v: "within 24 hours" },
    ],
    svcKicker: "Services",
    svcTitle: "Our services",
    svcSub: "We specialise in cleaning and work where ordinary companies can't reach.",
    trustKicker: "Why trust us",
    trustTitle: "A company you can verify.",
    trustLead:
      "We're not an anonymous ad. Behind the work at height is a real company registered in Bratislava, with insurance and a named owner.",
    creds: [
      { k: "Operator", v: site.legalName },
      { k: "Owner", v: contact.owner },
      { k: "Company ID", v: contact.ico },
      { k: "Registered office", v: `${contact.address.street}, ${contact.address.postalCode} ${contact.address.city}` },
      { k: "Insurance", v: "Liability for damage caused" },
      { k: "Operating since", v: String(site.foundingYear) },
    ],
    procKicker: "Process",
    procTitle: "How it works",
    process: [
      { t: "Enquiry & survey", d: "Get in touch by phone or form. We assess the scope from photos or a site visit." },
      { t: "Quote within 24 h", d: "We prepare a tailored, no-obligation quote, usually within 24 hours." },
      { t: "Work at height", d: "We secure the site and get the job done safely and on time, with minimal disruption." },
    ],
    areaKicker: "Where we work",
    areaTitle: "Bratislava & the region",
    areaText:
      "We carry out high-rise cleaning and work throughout Bratislava and the region, and elsewhere in Slovakia by arrangement.",
    ctaTitle: "Tell us what needs cleaning.",
    ctaText: "Call us or use the form. We usually prepare a quote within 24 hours.",
  },
};

const SCOPED_CSS = `
.tt{
  --bg:#eef2f7; --ink:#131b26; --body:#47566a; --muted:#7a8798;
  --surface:#ffffff; --surface-2:#e2e9f1; --hairline:rgba(19,27,38,.11);
  --accent:#0e63c4; --accent-strong:#0a4e9e;
  --navy:#0c1826; --navy-fg:#eaf1fb; --navy-sub:#9fb3cc; --navy-line:rgba(255,255,255,.12);
  background:var(--bg); color:var(--body);
  font-family:var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
.tt h1,.tt h2,.tt h3{
  color:var(--ink);
  font-family:var(--font-schibsted), var(--font-inter), sans-serif;
  letter-spacing:-.03em; line-height:1.04; font-weight:800; text-wrap:balance;
}
.tt p{ text-wrap:pretty; }
.tt ::selection{ background:var(--accent); color:#fff; }
.tt .kicker{
  font-family:var(--font-inter); font-weight:600; font-size:.72rem;
  letter-spacing:.18em; text-transform:uppercase; color:var(--accent);
}
.tt .num{ font-family:var(--font-schibsted); font-variant-numeric:tabular-nums; color:var(--accent); font-weight:800; letter-spacing:-.02em; }
.tt .btn-accent{ background:var(--accent); color:#fff; transition:transform .3s var(--ease-out,ease), background-color .3s ease; box-shadow:0 16px 34px -14px rgba(14,99,196,.6); }
.tt .btn-accent:hover{ background:var(--accent-strong); transform:translateY(-2px); }
.tt .btn-glass{ background:rgba(255,255,255,.10); color:var(--navy-fg); box-shadow:inset 0 0 0 1px rgba(255,255,255,.22); transition:transform .3s var(--ease-out,ease), background-color .3s ease; }
.tt .btn-glass:hover{ background:rgba(255,255,255,.18); transform:translateY(-2px); }
.tt .svc{ transition:background-color .3s ease, transform .3s var(--ease-out,ease); }
.tt .svc:hover{ transform:translateY(-3px); }
.tt .svc:hover .svc-name{ color:var(--accent-strong); }
.tt .svc:hover .svc-img{ transform:scale(1.06); }
.tt .svc:hover .svc-arrow{ transform:translateX(4px); }
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "sk" ? "Ukážka A-01 · Veža dôvery" : "Showcase A-01 · Trust Tower",
    robots: { index: false, follow: false },
  };
}

export default async function UkazkaDovera({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const x = copy[l];

  return (
    <div className="tt">
      <style dangerouslySetInnerHTML={{ __html: SCOPED_CSS }} />

      {/* ===================== HERO (full-bleed, dark) ===================== */}
      <section className="relative overflow-hidden" style={{ background: "var(--navy)" }}>
        <Image
          src={img("hero").src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.42 }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,18,32,.78) 0%, rgba(8,18,32,.62) 42%, rgba(8,18,32,.90) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <Reveal className="max-w-3xl">
            <span className="kicker" style={{ color: "#8fc0ff" }}>{x.kicker}</span>
            <h1 className="mt-5 text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4.2rem]" style={{ color: "var(--navy-fg)" }}>
              {x.h1a}
              <span style={{ color: "#4ea1ff" }}>{x.h1accent}</span>
              {x.h1b}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "var(--navy-sub)" }}>
              {x.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/kontakt"
                className="btn-accent inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
              >
                {x.ctaPrimary} <span aria-hidden>→</span>
              </Link>
              <a
                href={telHref}
                className="btn-glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                {x.ctaCall}: {contact.phoneDisplay}
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5">
              {x.trustChips.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--navy-fg)" }}>
                  <span aria-hidden style={{ color: "#4ea1ff" }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===================== TRUST BAR ===================== */}
      <section className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <dl className="-mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl shadow-[0_24px_60px_-30px_rgba(12,24,38,.5)] sm:grid-cols-4" style={{ background: "var(--hairline)" }}>
            {x.bar.map((c) => (
              <div key={c.k} className="px-5 py-5" style={{ background: "var(--surface)" }}>
                <dt className="kicker" style={{ color: "var(--muted)" }}>{c.k}</dt>
                <dd className="mt-2 text-base font-semibold" style={{ color: "var(--ink)", fontFamily: "var(--font-schibsted)" }}>
                  {c.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b pb-6" style={{ borderColor: "var(--hairline)" }}>
            <div>
              <span className="kicker">{x.svcKicker}</span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">{x.svcTitle}</h2>
            </div>
            <p className="hidden max-w-xs text-sm leading-relaxed sm:block" style={{ color: "var(--body)" }}>
              {x.svcSub}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {services.map((s) => {
            const key = SERVICE_IMG[s.slug] ?? "buildings";
            return (
              <Reveal key={s.slug} as="article">
                <Link
                  href={s.slug}
                  className="svc group flex h-full flex-col overflow-hidden rounded-2xl"
                  style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--hairline), 0 1px 2px rgba(12,24,38,.05), 0 18px 40px -26px rgba(12,24,38,.35)" }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={img(key).src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 520px"
                      className="svc-img object-cover transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="svc-name text-xl font-bold transition-colors" style={{ color: "var(--ink)" }}>
                      {s.name[l]}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: "var(--body)" }}>
                      {s.excerpt[l]}
                    </p>
                    <span className="svc-arrow mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-transform" style={{ color: "var(--accent)" }}>
                      {l === "sk" ? "Zistiť viac" : "Learn more"} <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===================== TRUST / E-E-A-T (dark band) ===================== */}
      <section style={{ background: "var(--navy)" }}>
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <span className="kicker" style={{ color: "#8fc0ff" }}>{x.trustKicker}</span>
              <h2 className="mt-4 max-w-md text-3xl sm:text-4xl lg:text-[2.9rem]" style={{ color: "var(--navy-fg)" }}>
                {x.trustTitle}
              </h2>
              <p className="mt-5 max-w-md leading-relaxed" style={{ color: "var(--navy-sub)" }}>
                {x.trustLead}
              </p>
              <div className="mt-9 space-y-6">
                {usp.map((u, i) => (
                  <div key={i} className="flex gap-4 border-t pt-5" style={{ borderColor: "var(--navy-line)" }}>
                    <span className="num text-lg" style={{ color: "#4ea1ff" }}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-bold" style={{ color: "var(--navy-fg)", fontFamily: "var(--font-schibsted)" }}>
                        {u.title[l]}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--navy-sub)" }}>
                        {u.text[l]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl sm:grid-cols-2" style={{ background: "var(--navy-line)" }}>
                {x.creds.map((c) => (
                  <div key={c.k} className="px-6 py-6" style={{ background: "rgba(255,255,255,.03)" }}>
                    <dt className="kicker" style={{ color: "#8fc0ff" }}>{c.k}</dt>
                    <dd className="mt-2 text-lg font-semibold" style={{ color: "var(--navy-fg)", fontFamily: "var(--font-schibsted)" }}>
                      {c.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <span className="kicker">{x.procKicker}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">{x.procTitle}</h2>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-3" style={{ background: "var(--hairline)" }}>
          {x.process.map((p, i) => (
            <Reveal key={p.t}>
              <div className="h-full p-7 lg:p-9" style={{ background: "var(--surface)" }}>
                <span className="num text-3xl">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl font-bold" style={{ color: "var(--ink)" }}>{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--body)" }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== AREA ===================== */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <Reveal>
          <div className="overflow-hidden rounded-[1.8rem] ring-1 ring-black/5" style={{ background: "var(--surface)" }}>
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <span className="kicker">{x.areaKicker}</span>
                <h2 className="mt-3 text-3xl sm:text-4xl">{x.areaTitle}</h2>
                <p className="mt-4 max-w-md leading-relaxed" style={{ color: "var(--body)" }}>{x.areaText}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[...districts, ...towns].map((d) => (
                    <span
                      key={d}
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{ color: "var(--ink)", boxShadow: "inset 0 0 0 1px var(--hairline)" }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[280px] lg:min-h-0">
                <Image
                  src={img("buildings").src}
                  alt={img("buildings").alt[l]}
                  fill
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.8rem] px-8 py-12 lg:px-14 lg:py-16" style={{ background: "var(--navy)" }}>
            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="max-w-lg text-3xl sm:text-4xl lg:text-[2.7rem]" style={{ color: "var(--navy-fg)" }}>
                  {x.ctaTitle}
                </h2>
                <p className="mt-4 max-w-md" style={{ color: "var(--navy-sub)" }}>{x.ctaText}</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
                <Link
                  href="/kontakt"
                  className="btn-accent inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
                >
                  {x.ctaPrimary} <span aria-hidden>→</span>
                </Link>
                <a
                  href={telHref}
                  className="btn-glass inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
                >
                  {contact.phoneDisplay}
                </a>
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(14,99,196,.45), transparent 70%)" }}
            />
          </div>
        </Reveal>
      </section>

      <DemoNav current="dovera" locale={l} />
    </div>
  );
}
