import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Motion";
import { img, type StockKey } from "@/lib/images";
import type { Locale, AppPathname } from "@/i18n/routing";

/**
 * ROZCESTNÍK UKÁŽOK — jeden odkaz pre klienta, kde si sám preklikáva dizajnové
 * smery a vyberie, ktorý sa mu páči. Používa globálne tokeny (rešpektuje prepínač
 * 3 farieb). noindex — nie je to ostrá stránka.
 */

type Variant = {
  href: Exclude<AppPathname, "/blog/[slug]">;
  img: StockKey;
  tint: string;
  accent: string;
  badge: string;
  name: { sk: string; en: string };
  en: string;
  desc: { sk: string; en: string };
  best: { sk: string; en: string };
};

const VARIANTS: Variant[] = [
  {
    href: "/ukazka-dovera",
    img: "hero",
    tint: "linear-gradient(180deg, rgba(8,18,32,.30), rgba(8,18,32,.86))",
    accent: "#0e63c4",
    badge: "A-01",
    name: { sk: "Veža dôvery", en: "Trust Tower" },
    en: "Trust Tower",
    desc: {
      sk: "Autoritatívny dizajn — veľký tmavý hero na fotke a sekcia s overiteľnými firemnými údajmi (IČO, konateľ, poistenie). Buduje dôveru na prvý pohľad.",
      en: "Authority-first — a big dark photo hero and a section with verifiable company details. Builds trust at first glance.",
    },
    best: { sk: "Dôveryhodnosť + dopyt", en: "Trust + enquiries" },
  },
  {
    href: "/ukazka-mriezka",
    img: "buildings",
    tint: "linear-gradient(180deg, rgba(17,20,23,.16), rgba(17,20,23,.62))",
    accent: "#1554e6",
    badge: "A-04",
    name: { sk: "Presná mriežka", en: "Swiss Grid" },
    en: "Swiss Grid",
    desc: {
      sk: "Presná švajčiarska mriežka, číslované sekcie a technické popisky. Pôsobí precízne a inžiniersky — ako bezpečnosť lanového prístupu.",
      en: "A precise Swiss grid, numbered sections and technical labels. Reads as engineering precision — like rope-access safety.",
    },
    best: { sk: "Precíznosť + prehľad", en: "Precision + clarity" },
  },
  {
    href: "/ukazka",
    img: "references",
    tint: "linear-gradient(180deg, rgba(23,25,28,.20), rgba(23,25,28,.80))",
    accent: "#ea580c",
    badge: "A-03",
    name: { sk: "Editoriál", en: "Editorial" },
    en: "Editorial",
    desc: {
      sk: "Odvážna veľká typografia a veľa vzduchu, s teplým oranžovým akcentom. Prémiový, magazínový vzhľad, ktorý sa odlišuje.",
      en: "Bold oversized typography and generous whitespace with a warm orange accent. A premium, editorial look that stands out.",
    },
    best: { sk: "Prémiové odlíšenie", en: "Premium differentiation" },
  },
];

const copy = {
  sk: {
    kicker: "Ukážky dizajnu · Bajbar Services",
    h1: "Vyberte si dizajn webu",
    lead: "Pripravili sme niekoľko rôznych smerov, ako môže web vyzerať. Kliknite na ktorýkoľvek, preklikajte si ho a vyberte, ktorý sa vám najviac páči — nič nie je zafixované.",
    themeNote: "Tip: v každej ukážke aj na hotovom webe si viete pravým dolným prepínačom vyskúšať 3 farebné témy.",
    view: "Pozrieť ukážku",
    bestLabel: "Vhodné na",
    footer: "Toto sú nezáväzné ukážky, nie ostrá stránka. Keď si vyberiete, dotiahneme zvolený smer do finálnej podoby.",
  },
  en: {
    kicker: "Design demos · Bajbar Services",
    h1: "Choose your website design",
    lead: "We've prepared a few different directions for how the site could look. Open any of them, click through, and pick the one you like best — nothing is locked in.",
    themeNote: "Tip: in every demo and on the final site you can try 3 colour themes via the switcher at the bottom-right.",
    view: "View demo",
    bestLabel: "Best for",
    footer: "These are non-binding demos, not the live site. Once you choose, we'll take the selected direction to its final form.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "sk" ? "Ukážky dizajnu · vyberte si" : "Design demos · choose one",
    robots: { index: false, follow: false },
  };
}

export default async function Ukazky({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const x = copy[l];

  return (
    <div className="container-page py-14 sm:py-20">
      {/* HEADER */}
      <Reveal>
        <p className="eyebrow">{x.kicker}</p>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
          {x.h1}
        </h1>
        <p className="prose-lead mt-6 max-w-2xl">{x.lead}</p>
        <p className="mt-4 max-w-2xl rounded-2xl border border-hairline bg-surface/60 px-5 py-3 text-sm text-body">
          {x.themeNote}
        </p>
      </Reveal>

      {/* CARDS */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {VARIANTS.map((v) => (
          <Reveal key={v.href} as="article">
            <Link
              href={v.href}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-surface shadow-[0_1px_2px_rgba(0,0,0,.04),0_18px_40px_-26px_rgba(0,0,0,.28)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              {/* preview banner */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={img(v.img).src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0" style={{ background: v.tint }} />
                <span
                  className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide text-white"
                  style={{ background: v.accent, fontFamily: "ui-monospace, monospace" }}
                >
                  {v.badge}
                </span>
                <div className="absolute inset-x-4 bottom-4">
                  <h2 className="text-2xl font-extrabold tracking-tight text-white" style={{ textShadow: "0 2px 12px rgba(0,0,0,.4)" }}>
                    {v.name[l]}
                  </h2>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,.75)", fontFamily: "ui-monospace, monospace" }}>
                    {v.en}
                  </p>
                </div>
              </div>

              {/* body */}
              <div className="flex flex-1 flex-col p-6">
                <p className="flex-1 text-sm leading-relaxed text-body">{v.desc[l]}</p>
                <div className="mt-5 flex items-center gap-2">
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: v.accent }} />
                  <span className="text-xs font-medium text-muted">
                    {x.bestLabel}: <span className="text-ink">{v.best[l]}</span>
                  </span>
                </div>
                <span
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform group-hover:gap-3"
                  style={{ background: v.accent }}
                >
                  {x.view} <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* FOOTER NOTE */}
      <Reveal>
        <p className="mt-12 max-w-2xl text-sm text-muted">{x.footer}</p>
      </Reveal>
    </div>
  );
}
