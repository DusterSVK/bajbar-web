import type { LocalizedText } from "./config";

export type Faq = { q: LocalizedText; a: LocalizedText };

/** Všeobecné časté otázky (answer-first, vhodné na citovanie AI aj do FAQPage schémy). */
export const generalFaqs: Faq[] = [
  {
    q: { sk: "Koľko stojí výškové čistenie?", en: "How much does high-rise cleaning cost?" },
    a: {
      sk: "Cena je vždy individuálna a závisí od výšky, plochy, typu povrchu, miery znečistenia a spôsobu prístupu (lano alebo plošina). Po zaslaní fotiek alebo obhliadke pripravíme nezáväznú cenovú ponuku, zvyčajne do 24 hodín.",
      en: "The price is always individual and depends on height, area, surface type, level of soiling and the access method (rope or platform). After photos or a site visit we prepare a no-obligation quote, usually within 24 hours.",
    },
  },
  {
    q: { sk: "Potrebujem lešenie?", en: "Do I need scaffolding?" },
    a: {
      sk: "Vo väčšine prípadov nie. Pracujeme technikou lanového prístupu alebo z pojazdných plošín, čo býva rýchlejšie a lacnejšie ako stavba lešenia, najmä pri kratších zákazkách.",
      en: "In most cases no. We work using rope access or mobile platforms, which is usually faster and cheaper than erecting scaffolding, especially for shorter jobs.",
    },
  },
  {
    q: { sk: "Sú práce poistené?", en: "Is the work insured?" },
    a: {
      sk: "Áno. Máme poistenie zodpovednosti za škodu spôsobenú pri výkone činnosti, takže je o vašu nehnuteľnosť postarané.",
      en: "Yes. We carry liability insurance for damage caused during the work, so your property is covered.",
    },
  },
  {
    q: { sk: "Kde pôsobíte?", en: "Where do you operate?" },
    a: {
      sk: "Pôsobíme v celej Bratislave a okolí (Senec, Pezinok, Malacky, Stupava a ďalšie), po dohode aj inde na Slovensku.",
      en: "We operate throughout Bratislava and the surrounding area (Senec, Pezinok, Malacky, Stupava and others), and elsewhere in Slovakia by arrangement.",
    },
  },
  {
    q: { sk: "V akom ročnom období sa dá čistiť fasáda a okná?", en: "In which season can facades and windows be cleaned?" },
    a: {
      sk: "Umývanie fasád a okien realizujeme počas celého roka, keď teploty neklesajú pod bod mrazu. Najvhodnejšie obdobie je jar až jeseň.",
      en: "We clean facades and windows year-round, as long as temperatures stay above freezing. The best period is spring to autumn.",
    },
  },
  {
    q: { sk: "Pracujete aj pre správcov budov a SVB?", en: "Do you also work for building managers and owners' associations?" },
    a: {
      sk: "Áno. Pre správcov, spoločenstvá vlastníkov bytov (SVB) aj firmy zabezpečujeme jednorazové aj pravidelné čistenie fasád, okien a spoločných priestorov.",
      en: "Yes. For managers, homeowners' associations and companies we provide one-off and regular cleaning of facades, windows and common areas.",
    },
  },
];
