/**
 * JEDEN ZDROJ PRAVDY o firme: NAP (názov, adresa, telefón), oblasť pôsobenia,
 * USP a recenzie. Tieto dáta sa premietajú do textov stránok, do JSON-LD schémy
 * aj do llms.txt, takže sa nikdy nerozídu (NAP konzistencia pre SEO aj AI).
 *
 * ⚠️  PRED SPUSTENÍM nahraď hodnoty označené `TODO` reálnymi údajmi od klienta
 *     (doména, telefón, e-mail). Reálne firemné údaje (názov, IČO, sídlo, konateľ)
 *     sú už podľa výpisu z ORSR.
 */

import type { Locale } from "@/i18n/routing";

/** Dvojjazyčný text. Preferuj plnenie oboch jazykov; EN sa dopĺňa priebežne. */
export type LocalizedText = { sk: string; en: string };

/** Vyber jazykovú mutáciu textu. */
export const t = (v: LocalizedText, locale: Locale): string => v[locale];

export const site = {
  /** Značka do hlavičky a názvov. */
  name: "Bajbar Services",
  shortName: "Bajbar",
  /** Právny názov (Organization / legalName v schéme). */
  legalName: "Bajbar Services s. r. o.",
  /** TODO: potvrdiť doménu. Používa sa pre canonical, hreflang, schému, OG. */
  url: "https://bajbarservices.sk",
  domain: "bajbarservices.sk",
  defaultLocale: "sk" as Locale,
  /** Rok vzniku firmy (zápis do ORSR 03.06.2026), používa sa pre foundingDate a E-E-A-T. */
  foundingYear: 2026,
} as const;

/** Krátky claim (hero podnadpis / OG) per jazyk. */
export const tagline: LocalizedText = {
  sk: "Profesionálne výškové čistenie a práca vo výške, teda čistenie fasád, umývanie okien vo výškach a čistenie budov v Bratislave a okolí.",
  en: "Professional high-rise cleaning and work at height, including facade cleaning, high-rise window cleaning and building cleaning in Bratislava and the surrounding region.",
};

export const contact = {
  /** TODO: doplniť reálne číslo. Medzinárodný formát pre tel: odkaz. */
  phoneE164: "+421900000000",
  phoneDisplay: "0900 000 000",
  /** TODO: WhatsApp číslo bez medzier a + (nechaj prázdne ak firma WhatsApp nemá). */
  whatsapp: "",
  /** TODO: zriadiť/potvrdiť e-mailovú schránku. */
  email: "info@bajbarservices.sk",
  /** Sídlo podľa ORSR (fakturačné údaje + PostalAddress v schéme). */
  address: {
    street: "Romanova 1655/5",
    city: "Bratislava",
    district: "Petržalka",
    postalCode: "851 02",
  },
  /** Firemné identifikátory z ORSR (posilňujú rozlíšiteľnosť firmy pre AI). */
  ico: "57 656 665",
  /** Konateľ / majiteľ (E-E-A-T). */
  owner: "Marek Bajbár",
  isVatPayer: false,
} as const;

/** Geolokácia (Bratislava) pre schému. */
export const geo = { lat: 48.1486, lng: 17.1077 } as const;

/** Otváracie / prevádzkové hodiny (formát pre OpeningHoursSpecification). */
export const openingHours = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
  { days: ["Saturday"], opens: "08:00", closes: "14:00" },
];

/** Ľudský zápis hodín do pätičky / kontaktu (per jazyk). */
export const hoursText: { label: LocalizedText; value: LocalizedText }[] = [
  {
    label: { sk: "Pondelok – Piatok", en: "Monday – Friday" },
    value: { sk: "7:00 – 18:00", en: "7:00 – 18:00" },
  },
  {
    label: { sk: "Sobota", en: "Saturday" },
    value: { sk: "8:00 – 14:00", en: "8:00 – 14:00" },
  },
  {
    label: { sk: "Nedeľa", en: "Sunday" },
    value: { sk: "Po dohode", en: "By appointment" },
  },
];

/**
 * OBLASŤ PÔSOBENIA: JEDEN ZDROJ PRAVDY.
 * Zobrazuje sa v texte a zároveň ide do `areaServed` schémy, a preto sa nesmie rozísť.
 * Výškové práce vykonávame primárne v Bratislave a okolí, po dohode celé Slovensko.
 */
export const districts = [
  "Petržalka",
  "Ružinov",
  "Nové Mesto",
  "Staré Mesto",
  "Karlova Ves",
  "Dúbravka",
  "Rača",
  "Vrakuňa",
  "Podunajské Biskupice",
];

export const towns = ["Senec", "Pezinok", "Malacky", "Stupava"];

/** Hlavné USP, konzistentne naprieč webom (per jazyk). */
export const usp: { title: LocalizedText; text: LocalizedText }[] = [
  {
    title: { sk: "Certifikovaný lanový prístup", en: "Certified rope access" },
    text: {
      sk: "Práce vo výške vykonávame technikou lanového prístupu aj plošinami, podľa bezpečnostných predpisov.",
      en: "We carry out work at height using rope access and platforms, in line with safety regulations.",
    },
  },
  {
    title: { sk: "Poistená zodpovednosť", en: "Insured liability" },
    text: {
      sk: "Máme poistenie zodpovednosti za škodu, takže je o vašu nehnuteľnosť postarané.",
      en: "We carry liability insurance, so your property is covered.",
    },
  },
  {
    title: { sk: "Cena na mieru do 24 h", en: "Tailored quote within 24 h" },
    text: {
      sk: "Po obhliadke alebo fotkách pripravíme nezáväznú cenovú ponuku zvyčajne do 24 hodín.",
      en: "After a site visit or photos we prepare a no-obligation quote, usually within 24 hours.",
    },
  },
];

/** Sociálne profily a Google profil (sameAs + recenzie). */
export const social = {
  google: "", // TODO
  facebook: "", // TODO
  instagram: "", // TODO
};

/**
 * RECENZIE. ⚠️ AggregateRating sa vloží do schémy IBA ak `count > 0` (reálne,
 * viditeľné recenzie). Kým je 0, žiadne hodnotenie sa negeneruje (anti-fake).
 */
export const reviews = {
  rating: 5.0,
  count: 0,
  items: [] as { author: string; rating: number; date: string; text: string }[],
};

export const telHref = `tel:${contact.phoneE164}`;
export const mailHref = `mailto:${contact.email}`;
export const whatsappHref = (text = "Dobrý deň, mám záujem o výškové čistenie.") =>
  contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}` : "";
