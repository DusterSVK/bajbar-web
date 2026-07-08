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
 * UKÁŽKA A-04 — „Presná mriežka" (Swiss Grid).
 * Striktná 12-stĺpcová mriežka, číslované sekcie, monospace štítky a tabuľkové
 * čísla — inžinierska presnosť, ktorá podčiarkuje bezpečnosť lanového prístupu.
 * Svetlá „papierová" paleta + jeden akcent, scoped v `.sw` (bez vplyvu na globál).
 * noindex (demo).
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
    h1b: ".",
    lead:
      "Umývame fasády a okná vo výškach, čistíme budovy a robíme výškové práce technikou lanového prístupu — bezpečne, poistene a bez lešenia.",
    meta: [`EST. ${site.foundingYear}`, "BRATISLAVA, SK", "LANOVÝ PRÍSTUP"],
    ctaPrimary: "Získať cenovú ponuku",
    ctaCall: "Zavolať",
    s1: "Služby",
    s1sub: "Štyri oblasti, v ktorých pracujeme tam, kde bežné firmy nedosiahnu.",
    s2: "Prečo Bajbar",
    s2sub: "Tri veci, na ktorých staviame každú zákazku.",
    s3: "Postup",
    s3sub: "Od prvého telefonátu po hotovú prácu vo výške.",
    process: [
      { t: "Dopyt a obhliadka", d: "Ozvete sa telefonicky alebo formulárom. Podľa fotiek alebo obhliadky posúdime rozsah." },
      { t: "Cenová ponuka do 24 h", d: "Pripravíme nezáväznú cenovú ponuku na mieru, zvyčajne do 24 hodín." },
      { t: "Realizácia vo výške", d: "Zabezpečíme pracovisko a odvedieme prácu bezpečne a načas, s minimom obmedzení." },
    ],
    s4: "Oblasť pôsobenia",
    s4sub: "Bratislava a okolie, po dohode celé Slovensko.",
    s5: "Kontakt",
    ctaTitle: "Povedzte nám, čo treba vyčistiť.",
    ctaText: "Cenovú ponuku pripravíme zvyčajne do 24 hodín.",
    learn: "Detail",
  },
  en: {
    kicker: "High-rise cleaning · Bratislava",
    h1a: "High-rise cleaning and work ",
    h1accent: "at height",
    h1b: ".",
    lead:
      "We wash facades and windows at height, clean buildings and carry out work at height using rope access — safely, insured and without scaffolding.",
    meta: [`EST. ${site.foundingYear}`, "BRATISLAVA, SK", "ROPE ACCESS"],
    ctaPrimary: "Get a quote",
    ctaCall: "Call",
    s1: "Services",
    s1sub: "Four areas where we work where ordinary companies can't reach.",
    s2: "Why Bajbar",
    s2sub: "Three things every job is built on.",
    s3: "Process",
    s3sub: "From the first call to finished work at height.",
    process: [
      { t: "Enquiry & survey", d: "Get in touch by phone or form. We assess the scope from photos or a site visit." },
      { t: "Quote within 24 h", d: "We prepare a tailored, no-obligation quote, usually within 24 hours." },
      { t: "Work at height", d: "We secure the site and get the job done safely and on time, with minimal disruption." },
    ],
    s4: "Service area",
    s4sub: "Bratislava and the region, all of Slovakia by arrangement.",
    s5: "Contact",
    ctaTitle: "Tell us what needs cleaning.",
    ctaText: "We usually prepare a quote within 24 hours.",
    learn: "Detail",
  },
};

const SCOPED_CSS = `
.sw{
  --paper:#f4f5f2; --card:#ffffff; --ink:#111417; --body:#4a4f55; --muted:#8b9099;
  --line:rgba(17,20,23,.14); --line-soft:rgba(17,20,23,.08);
  --accent:#1554e6; --accent-strong:#0f3fb4;
  --mono: ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, Consolas, monospace;
  background:
    linear-gradient(var(--line-soft) 1px, transparent 1px) 0 0 / 100% 38px,
    var(--paper);
  color:var(--body);
  font-family:var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
.sw h1,.sw h2,.sw h3{
  color:var(--ink);
  font-family:var(--font-schibsted), var(--font-inter), sans-serif;
  letter-spacing:-.035em; line-height:1.0; font-weight:800; text-wrap:balance;
}
.sw p{ text-wrap:pretty; }
.sw ::selection{ background:var(--accent); color:#fff; }
.sw .lbl{ font-family:var(--mono); font-size:.68rem; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); }
.sw .lbl-ac{ color:var(--accent); }
.sw .num{ font-family:var(--mono); font-variant-numeric:tabular-nums; color:var(--accent); font-weight:700; letter-spacing:.02em; }
.sw .rule{ height:1px; width:100%; background:var(--line); }
.sw .btn-ink{ background:var(--ink); color:#fff; border-radius:2px; transition:transform .25s ease, background-color .25s ease; }
.sw .btn-ink:hover{ background:#000; transform:translateY(-2px); }
.sw .btn-line{ background:transparent; color:var(--ink); border-radius:2px; box-shadow:inset 0 0 0 1px var(--line); transition:transform .25s ease, background-color .25s ease; }
.sw .btn-line:hover{ background:#fff; transform:translateY(-2px); }
.sw .srow{ transition:background-color .25s ease; }
.sw .srow:hover{ background:var(--card); }
.sw .srow:hover .srow-name{ color:var(--accent-strong); }
.sw .srow:hover .srow-img{ transform:scale(1.06); }
.sw .srow:hover .srow-arrow{ transform:translateX(4px); }
.sw .cell{ background:var(--card); }
`;

function SectionHead({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <Reveal>
      <div className="mb-8 grid items-end gap-3 border-b pb-4 sm:grid-cols-12 sm:gap-6" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-baseline gap-3 sm:col-span-7">
          <span className="num text-sm">{n}</span>
          <span className="lbl lbl-ac">—</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl">{title}</h2>
        </div>
        <p className="text-sm leading-relaxed sm:col-span-5 sm:text-right" style={{ color: "var(--body)" }}>
          {sub}
        </p>
      </div>
    </Reveal>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "sk" ? "Ukážka A-04 · Presná mriežka" : "Showcase A-04 · Swiss Grid",
    robots: { index: false, follow: false },
  };
}

export default async function UkazkaMriezka({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const x = copy[l];

  return (
    <div className="sw">
      <style dangerouslySetInnerHTML={{ __html: SCOPED_CSS }} />

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

        {/* ===================== TITLE BLOCK ===================== */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b py-3" style={{ borderColor: "var(--line)" }}>
            <span className="lbl">Bajbar Services — {site.domain}</span>
            <span className="lbl">{x.meta.join("  ·  ")}</span>
          </div>
        </Reveal>

        {/* ===================== HERO (12-col) ===================== */}
        <section className="grid gap-8 py-14 sm:grid-cols-12 sm:gap-6 lg:py-20">
          <Reveal className="sm:col-span-8">
            <span className="lbl lbl-ac">{x.kicker}</span>
            <h1 className="mt-5 text-[2.7rem] sm:text-6xl lg:text-[4.6rem]">
              {x.h1a}
              <span style={{ color: "var(--accent)" }}>{x.h1accent}</span>
              {x.h1b}
            </h1>
          </Reveal>
          <Reveal className="flex flex-col justify-end sm:col-span-4">
            <p className="max-w-sm text-base leading-relaxed" style={{ color: "var(--body)" }}>
              {x.lead}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/kontakt" className="btn-ink inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold">
                {x.ctaPrimary} <span aria-hidden style={{ color: "var(--accent)" }}>→</span>
              </Link>
              <a href={telHref} className="btn-line inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold">
                {x.ctaCall}
              </a>
            </div>
          </Reveal>
        </section>

        {/* wide image band, grid-aligned */}
        <Reveal>
          <div className="relative mb-16 aspect-[16/7] w-full overflow-hidden" style={{ background: "var(--card)", boxShadow: "inset 0 0 0 1px var(--line)" }}>
            <Image
              src={img("hero").src}
              alt={img("hero").alt[l]}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* ===================== 01 SERVICES ===================== */}
        <section className="pb-16 lg:pb-24">
          <SectionHead n="01" title={x.s1} sub={x.s1sub} />
          <div className="border-t" style={{ borderColor: "var(--line)" }}>
            {services.map((s, i) => {
              const key = SERVICE_IMG[s.slug] ?? "buildings";
              return (
                <Reveal key={s.slug} as="article">
                  <Link
                    href={s.slug}
                    className="srow grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b px-2 py-6 sm:grid-cols-12 sm:gap-6 sm:px-3 sm:py-7"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span className="num text-base sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                    <div className="sm:col-span-6">
                      <h3 className="srow-name text-xl font-bold transition-colors sm:text-2xl" style={{ color: "var(--ink)" }}>
                        {s.name[l]}
                      </h3>
                      <p className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: "var(--body)" }}>
                        {s.excerpt[l]}
                      </p>
                    </div>
                    <div className="relative hidden h-14 overflow-hidden sm:col-span-4 sm:block" style={{ boxShadow: "inset 0 0 0 1px var(--line)" }}>
                      <Image src={img(key).src} alt="" fill sizes="220px" className="srow-img object-cover transition-transform duration-500" />
                    </div>
                    <span className="srow-arrow justify-self-end text-xl transition-transform sm:col-span-1" aria-hidden style={{ color: "var(--accent)" }}>
                      →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===================== 02 WHY ===================== */}
        <section className="pb-16 lg:pb-24">
          <SectionHead n="02" title={x.s2} sub={x.s2sub} />
          <div className="grid gap-px overflow-hidden sm:grid-cols-3" style={{ background: "var(--line)", boxShadow: "0 0 0 1px var(--line)" }}>
            {usp.map((u, i) => (
              <Reveal key={i}>
                <div className="cell h-full p-7 lg:p-8">
                  <span className="num text-2xl">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-lg font-bold" style={{ color: "var(--ink)" }}>{u.title[l]}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--body)" }}>{u.text[l]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===================== 03 PROCESS ===================== */}
        <section className="pb-16 lg:pb-24">
          <SectionHead n="03" title={x.s3} sub={x.s3sub} />
          <div className="grid gap-px overflow-hidden sm:grid-cols-3" style={{ background: "var(--line)", boxShadow: "0 0 0 1px var(--line)" }}>
            {x.process.map((p, i) => (
              <Reveal key={p.t}>
                <div className="cell h-full p-7 lg:p-8">
                  <span className="num text-2xl">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-lg font-bold" style={{ color: "var(--ink)" }}>{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--body)" }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===================== 04 AREA ===================== */}
        <section className="pb-16 lg:pb-24">
          <SectionHead n="04" title={x.s4} sub={x.s4sub} />
          <div className="grid grid-cols-2 gap-px overflow-hidden sm:grid-cols-4 lg:grid-cols-6" style={{ background: "var(--line)", boxShadow: "0 0 0 1px var(--line)" }}>
            {[...districts, ...towns].map((d, i) => (
              <Reveal key={d}>
                <div className="cell flex h-full items-center gap-2 px-4 py-3.5">
                  <span className="num text-xs">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>{d}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===================== 05 CONTACT / CTA ===================== */}
        <section className="pb-20">
          <SectionHead n="05" title={x.s5} sub="" />
          <Reveal>
            <div className="grid items-center gap-8 border p-8 sm:grid-cols-12 lg:p-12" style={{ borderColor: "var(--line)", background: "var(--ink)" }}>
              <div className="sm:col-span-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl" style={{ color: "#fff" }}>{x.ctaTitle}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.72)" }}>{x.ctaText}</p>
              </div>
              <div className="flex flex-col gap-3 sm:col-span-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
                  style={{ background: "var(--accent)", color: "#fff", borderRadius: "2px" }}
                >
                  {x.ctaPrimary} <span aria-hidden>→</span>
                </Link>
                <a
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
                  style={{ color: "#fff", borderRadius: "2px", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.24)" }}
                >
                  {contact.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>
        </section>

      </div>

      <DemoNav current="mriezka" locale={l} />
    </div>
  );
}
