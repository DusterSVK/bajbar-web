import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Motion";
import { StockImage } from "@/components/StockImage";
import { img, type StockKey } from "@/lib/images";
import { services } from "@/lib/services";
import { usp, districts, towns, contact, telHref } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

/**
 * UKÁŽKA — nový high-end, svetlý dizajn (editorial / architektúra) postavený
 * na reálnych fotkách (/public/img) a reálnych dátach (services, config).
 * Lokálne pretémovaná (porcelán + grafit + safety-orange) cez scoped CSS
 * premenné v `.bx`, takže NEZASAHUJE do globálnych tokenov ani ostatných stránok.
 * noindex — je to demo, nie ostrá stránka.
 */

const SERVICE_IMG: Record<string, StockKey> = {
  "/prace-vo-vyske": "heights",
  "/cistenie-fasad": "facade",
  "/umyvanie-okien-vo-vyskach": "windows",
  "/cistenie-budov": "buildings",
};

const copy = {
  sk: {
    kicker: "Výškové čistenie · Bratislava",
    h1a: "Výškové čistenie a práca ",
    h1accent: "vo výške",
    h1b: " v Bratislave",
    lead:
      "Umývame fasády a okná vo výškach, čistíme budovy a robíme práce vo výške technikou lanového prístupu — bezpečne, poistene a bez lešenia.",
    ctaPrimary: "Získať cenovú ponuku",
    ctaCall: "Zavolať",
    quoteCard: "Nezáväzná cenová ponuka",
    trust: ["Certifikovaný lanový prístup", "Poistená zodpovednosť", "Bez lešenia", "Cena do 24 h"],
    creds: [
      { k: "Technika", v: "Lanový prístup + plošiny" },
      { k: "Poistenie", v: "Zodpovednosť za škodu" },
      { k: "Pôsobnosť", v: "Bratislava a okolie" },
      { k: "Cenová ponuka", v: "do 24 hodín" },
    ],
    svcKicker: "Služby",
    svcTitle: "Čo pre vás spravíme",
    svcSub: "Špecializujeme sa na čistenie a práce tam, kde bežné firmy nedosiahnu.",
    whyKicker: "Prečo Bajbar",
    whyTitle: "Bezpečnosť, ktorú vidno na každom metri lana.",
    whyLead:
      "Pracujeme podľa bezpečnostných predpisov, s certifikovaným vybavením a poistením — aby bola vaša budova aj náš tím v bezpečí.",
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
    kicker: "High-rise cleaning · Bratislava",
    h1a: "High-rise cleaning and work ",
    h1accent: "at height",
    h1b: " in Bratislava",
    lead:
      "We wash facades and windows at height, clean buildings and carry out work at height using rope access — safely, insured and without scaffolding.",
    ctaPrimary: "Get a quote",
    ctaCall: "Call",
    quoteCard: "No-obligation quote",
    trust: ["Certified rope access", "Insured liability", "No scaffolding", "Quote within 24 h"],
    creds: [
      { k: "Method", v: "Rope access + platforms" },
      { k: "Insurance", v: "Liability cover" },
      { k: "Coverage", v: "Bratislava & region" },
      { k: "Quote", v: "within 24 hours" },
    ],
    svcKicker: "Services",
    svcTitle: "What we do",
    svcSub: "We specialise in cleaning and work where ordinary companies can't reach.",
    whyKicker: "Why Bajbar",
    whyTitle: "Safety you can see on every metre of rope.",
    whyLead:
      "We work to safety regulations, with certified equipment and insurance — so your building and our team stay safe.",
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
.bx{
  --bg:#f5f4f1; --ink:#17191c; --body:#4c525a; --muted:#8b9098;
  --surface:#ffffff; --surface-2:#eeebe5; --hairline:rgba(23,25,28,.10);
  --cream:#f5f4f1;
  --accent:#ea580c; --accent-strong:#c2410c;
  --band:#16181c; --band-fg:#f3f2ef; --band-sub:#a6acb4;
  background:var(--bg); color:var(--body);
  font-family:var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
.bx h1,.bx h2,.bx h3{
  color:var(--ink);
  font-family:var(--font-schibsted), var(--font-inter), sans-serif;
  letter-spacing:-.03em; line-height:1.03; font-weight:800; text-wrap:balance;
}
.bx p{ text-wrap:pretty; }
.bx ::selection{ background:var(--accent); color:#fff; }
.bx .kicker{
  font-family:var(--font-inter); font-weight:600; font-size:.72rem;
  letter-spacing:.18em; text-transform:uppercase; color:var(--accent-strong);
}
.bx .rule{ display:block; height:2px; width:42px; background:var(--accent); border-radius:2px; }
.bx .num{ font-family:var(--font-schibsted); font-variant-numeric:tabular-nums; color:var(--accent); font-weight:800; letter-spacing:-.02em; }
.bx .svc{ transition:background-color .3s var(--ease-out,ease); }
.bx .svc:hover{ background:rgba(23,25,28,.02); }
.bx .svc:hover .svc-name{ color:var(--accent-strong); }
.bx .svc:hover .svc-img{ transform:scale(1.05); }
.bx .svc:hover .svc-arrow{ transform:translateX(4px); }
.bx .btn-ink{ background:var(--ink); color:#fff; transition:transform .3s var(--ease-out,ease), background-color .3s ease; }
.bx .btn-ink:hover{ background:#000; transform:translateY(-2px); }
.bx .btn-ghost{ background:transparent; color:var(--ink); box-shadow:inset 0 0 0 1px var(--hairline); transition:transform .3s var(--ease-out,ease), background-color .3s ease; }
.bx .btn-ghost:hover{ background:#fff; transform:translateY(-2px); }
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "sk" ? "Ukážka · high-end dizajn" : "Showcase · high-end design",
    robots: { index: false, follow: false },
  };
}

export default async function Ukazka({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const x = copy[l];

  return (
    <div className="bx">
      <style dangerouslySetInnerHTML={{ __html: SCOPED_CSS }} />

      {/* ============================ HERO ============================ */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-10 pb-14 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="rule" />
              <span className="kicker">{x.kicker}</span>
            </div>
            <h1 className="mt-6 text-[2.6rem] sm:text-6xl lg:text-[4.1rem]">
              {x.h1a}
              <span style={{ color: "var(--accent)" }}>{x.h1accent}</span>
              {x.h1b}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "var(--body)" }}>
              {x.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/kontakt"
                className="btn-ink inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
              >
                {x.ctaPrimary} <span style={{ color: "var(--accent)" }} aria-hidden>→</span>
              </Link>
              <a
                href={telHref}
                className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                {x.ctaCall}: {contact.phoneDisplay}
              </a>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5">
              {x.trust.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--ink)" }}>
                  <span aria-hidden style={{ color: "var(--accent)" }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="w-full lg:justify-self-end">
            <div className="relative">
              <StockImage
                imageKey="hero"
                locale={l}
                priority
                aspect="aspect-[4/5]"
                rounded="rounded-[1.6rem]"
                sizes="(max-width: 1024px) 100vw, 520px"
                className="w-full"
              />
              <div className="absolute -left-4 bottom-14 hidden sm:block">
                <div className="rounded-2xl bg-white/90 px-5 py-4 shadow-[0_20px_50px_-22px_rgba(0,0,0,.45)] ring-1 ring-black/5 backdrop-blur">
                  <p className="num text-3xl leading-none">24 h</p>
                  <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>{x.quoteCard}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* credentials strip */}
        <Reveal>
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4" style={{ background: "var(--hairline)" }}>
            {x.creds.map((c) => (
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

      {/* ========================== SERVICES ========================= */}
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

        <div>
          {services.map((s, i) => {
            const key = SERVICE_IMG[s.slug] ?? "buildings";
            return (
              <Reveal key={s.slug} as="article">
                <Link
                  href={s.slug}
                  className="svc grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b px-3 py-6 sm:grid-cols-[auto_1fr_auto_auto] sm:gap-8 sm:py-7"
                  style={{ borderColor: "var(--hairline)" }}
                >
                  <span className="num text-xl sm:text-2xl">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="svc-name text-xl font-bold transition-colors sm:text-[1.7rem]" style={{ color: "var(--ink)" }}>
                      {s.name[l]}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: "var(--body)" }}>
                      {s.excerpt[l]}
                    </p>
                  </div>
                  <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-black/5 sm:block">
                    <Image
                      src={img(key).src}
                      alt=""
                      fill
                      sizes="96px"
                      className="svc-img object-cover transition-transform duration-500"
                    />
                  </div>
                  <span className="svc-arrow justify-self-end text-2xl transition-transform" aria-hidden style={{ color: "var(--accent)" }}>
                    →
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ======================= WHY (dark band) ===================== */}
      <section style={{ background: "var(--band)" }}>
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <Reveal>
              <span className="kicker">{x.whyKicker}</span>
              <h2 className="mt-4 max-w-lg text-3xl sm:text-4xl lg:text-[2.9rem]" style={{ color: "var(--band-fg)" }}>
                {x.whyTitle}
              </h2>
              <p className="mt-5 max-w-md leading-relaxed" style={{ color: "var(--band-sub)" }}>
                {x.whyLead}
              </p>
              <div className="mt-9 space-y-6">
                {usp.map((u, i) => (
                  <div key={i} className="flex gap-4 border-t pt-5" style={{ borderColor: "rgba(255,255,255,.10)" }}>
                    <span className="num text-lg">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-bold" style={{ color: "var(--band-fg)", fontFamily: "var(--font-schibsted)" }}>
                        {u.title[l]}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--band-sub)" }}>
                        {u.text[l]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="w-full">
              <StockImage
                imageKey="references"
                locale={l}
                aspect="aspect-[4/5]"
                rounded="rounded-[1.6rem]"
                sizes="(max-width: 1024px) 100vw, 460px"
                className="w-full"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================== PROCESS ========================== */}
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

      {/* =========================== AREA ============================ */}
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

      {/* ======================== CTA (closing) ====================== */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.8rem] px-8 py-12 lg:px-14 lg:py-16" style={{ background: "var(--band)" }}>
            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <span className="rule" />
                <h2 className="mt-5 max-w-lg text-3xl sm:text-4xl lg:text-[2.7rem]" style={{ color: "var(--band-fg)" }}>
                  {x.ctaTitle}
                </h2>
                <p className="mt-4 max-w-md" style={{ color: "var(--band-sub)" }}>{x.ctaText}</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  {x.ctaPrimary} <span aria-hidden>→</span>
                </Link>
                <a
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
                  style={{ color: "var(--band-fg)", background: "rgba(255,255,255,.08)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.18)" }}
                >
                  {contact.phoneDisplay}
                </a>
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(234,88,12,.38), transparent 70%)" }}
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
