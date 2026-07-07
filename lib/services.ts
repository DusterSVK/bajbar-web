/**
 * Kanonický register služieb: navigácia, karty na domovskej, hasOfferCatalog v
 * schéme, sitemap aj plný obsah service stránok (data-driven, dvojjazyčne).
 *
 * `slug` = interný kľúč zhodný s `i18n/routing` pathnames (názov priečinka).
 * Obsah je answer-first (priama odpoveď hneď v leade) pre AI citovateľnosť.
 */

import type { LocalizedText } from "./config";
import type { AppPathname } from "@/i18n/routing";

export type ServiceStep = { title: LocalizedText; text: LocalizedText };
export type ServiceFaq = { q: LocalizedText; a: LocalizedText };

export type Service = {
  /** Interný slug (zhodný s routing pathnames). */
  slug: Extract<
    AppPathname,
    "/prace-vo-vyske" | "/cistenie-fasad" | "/umyvanie-okien-vo-vyskach" | "/cistenie-budov"
  >;
  key: string;
  icon: string;
  /** Krátky názov do navigácie a kariet. */
  nav: LocalizedText;
  /** Plný názov služby (H1, serviceType v schéme). */
  name: LocalizedText;
  /** Jednovetný popis pre kartu, OG a meta description. */
  excerpt: LocalizedText;
  /** Answer-first lead: priama odpoveď „čo to je / pre koho" v 1–2 vetách. */
  lead: LocalizedText;
  /** Úvodné odseky (rozvinutie). */
  intro: LocalizedText[];
  /** Výhody / čo je zahrnuté. */
  benefits: LocalizedText[];
  /** Postup (ako to prebieha). */
  process: ServiceStep[];
  /** Časté otázky špecifické pre službu. */
  faqs: ServiceFaq[];
  /** Orientačná cena / poznámka k cene. */
  priceHint: LocalizedText;
  /** Súvisiace služby (interné prelinky). */
  related: Service["slug"][];
  /** Topické entity pre schému (SK). */
  knowsAbout: string[];
};

export const services: Service[] = [
  {
    slug: "/prace-vo-vyske",
    key: "heights",
    icon: "🧗",
    nav: { sk: "Práca vo výške", en: "Work at height" },
    name: { sk: "Výškové práce a práca vo výške", en: "Work at height & rope access" },
    excerpt: {
      sk: "Výškové práce technikou lanového prístupu aj z plošín, a to bezpečne, poistene a bez lešenia.",
      en: "Work at height via rope access and platforms, and always safe, insured and without scaffolding.",
    },
    lead: {
      sk: "Výškové práce sú činnosti vykonávané nad úrovňou terénu, kde hrozí pád. My ich robíme technikou lanového prístupu (industrial rope access) alebo z pojazdných plošín, takže nepotrebujete drahé lešenie a práca je rýchlejšia.",
      en: "Work at height means tasks carried out above ground level where there is a risk of falling. We perform them using industrial rope access or mobile platforms, so you avoid costly scaffolding and the job is faster.",
    },
    intro: [
      {
        sk: "Špecializujeme sa na práce vo výške na bytových domoch, administratívnych budovách, priemyselných halách aj rodinných domoch. Pracovníci sú vyškolení a vybavení certifikovanými istiacimi systémami podľa platných bezpečnostných predpisov.",
        en: "We specialise in work at height on apartment blocks, office buildings, industrial halls and family houses. Our workers are trained and equipped with certified fall-protection systems in line with applicable safety regulations.",
      },
      {
        sk: "Lanový prístup je ideálny tam, kde je stavba lešenia nákladná, pomalá alebo nemožná. Umožňuje prístup k ťažko dostupným miestam s minimálnym zásahom do prevádzky budovy.",
        en: "Rope access is ideal where scaffolding is expensive, slow or impossible. It reaches hard-to-access spots with minimal disruption to the building's operation.",
      },
    ],
    benefits: [
      { sk: "Lanový prístup aj vysokozdvižné plošiny podľa objektu", en: "Rope access and aerial platforms depending on the site" },
      { sk: "Bez nákladov a času na stavbu lešenia", en: "No cost or time spent building scaffolding" },
      { sk: "Poistenie zodpovednosti za škodu", en: "Liability insurance for damages" },
      { sk: "Vyškolení a certifikovaní pracovníci", en: "Trained and certified operatives" },
      { sk: "Dodržiavanie BOZP a zabezpečenie pracoviska", en: "Compliance with health & safety, secured work area" },
    ],
    process: [
      {
        title: { sk: "Obhliadka a posúdenie rizík", en: "Survey and risk assessment" },
        text: { sk: "Zhodnotíme objekt, kotviace body a prístup, navrhneme najbezpečnejší postup.", en: "We assess the site, anchor points and access, and design the safest method." },
      },
      {
        title: { sk: "Cenová ponuka na mieru", en: "Tailored quote" },
        text: { sk: "Pripravíme nezáväznú ponuku zvyčajne do 24 hodín.", en: "We prepare a no-obligation quote, usually within 24 hours." },
      },
      {
        title: { sk: "Realizácia vo výške", en: "Execution at height" },
        text: { sk: "Zabezpečíme pracovisko a odvedieme prácu bez zbytočného obmedzenia prevádzky.", en: "We secure the work area and carry out the job with minimal disruption." },
      },
    ],
    faqs: [
      {
        q: { sk: "Potrebujem na výškové práce lešenie?", en: "Do I need scaffolding for work at height?" },
        a: { sk: "Vo väčšine prípadov nie. Lanový prístup alebo plošina sú rýchlejšie a lacnejšie ako lešenie, najmä pri kratších zákazkách.", en: "In most cases no. Rope access or a platform is faster and cheaper than scaffolding, especially for shorter jobs." },
      },
      {
        q: { sk: "Sú práce poistené?", en: "Is the work insured?" },
        a: { sk: "Áno, máme poistenie zodpovednosti za škodu spôsobenú pri výkone činnosti.", en: "Yes, we carry liability insurance covering damage caused during the work." },
      },
    ],
    priceHint: {
      sk: "Cena je vždy na mieru podľa výšky, rozsahu a prístupu, preto nám pošlite fotky alebo si dohodnite obhliadku.",
      en: "Pricing is always tailored to height, scope and access, so send photos or arrange a site visit.",
    },
    related: ["/cistenie-fasad", "/umyvanie-okien-vo-vyskach", "/cistenie-budov"],
    knowsAbout: ["Práca vo výške", "Lanový prístup", "Výškové práce", "Industrial rope access", "Práce bez lešenia"],
  },
  {
    slug: "/cistenie-fasad",
    key: "facade",
    icon: "🏢",
    nav: { sk: "Čistenie fasád", en: "Facade cleaning" },
    name: { sk: "Čistenie a umývanie fasád", en: "Facade cleaning & washing" },
    excerpt: {
      sk: "Umývanie a čistenie fasád budov od nečistôt, rias a machu, pričom obnovíme vzhľad bez poškodenia povrchu.",
      en: "Washing and cleaning of building facades, thus removing dirt, algae and moss and restoring the look without damaging the surface.",
    },
    lead: {
      sk: "Čistenie fasády je odstránenie prachu, výfukových usadenín, rias, machu a znečistenia z vonkajšieho plášťa budovy. Robíme ho šetrnou technológiou (tlaková voda s regulovaným tlakom, prípadne vhodná chémia), aby sa obnovil pôvodný vzhľad bez poškodenia omietky či obkladu.",
      en: "Facade cleaning is the removal of dust, exhaust deposits, algae, moss and grime from a building's exterior. We use a gentle method (pressure water with controlled pressure and, where needed, suitable chemistry) to restore the original look without damaging plaster or cladding.",
    },
    intro: [
      {
        sk: "Znečistená fasáda nie je len estetický problém. Riasy a mach zadržiavajú vlhkosť a časom poškodzujú omietku a zatepľovací systém. Pravidelné čistenie predlžuje životnosť fasády a udržiava hodnotu nehnuteľnosti.",
        en: "A dirty facade is not only an aesthetic issue. Algae and moss retain moisture and over time damage the plaster and insulation system. Regular cleaning extends the facade's lifespan and preserves the property's value.",
      },
      {
        sk: "Čistíme fasády bytových domov, administratívnych budov, prevádzok aj rodinných domov. Technológiu a tlak volíme podľa typu povrchu, či je to omietka, obklad, sklo, kov alebo kompozit.",
        en: "We clean facades of apartment blocks, office buildings, commercial premises and family houses. We choose the method and pressure to match the surface, whether plaster, cladding, glass, metal or composite.",
      },
    ],
    benefits: [
      { sk: "Odstránenie rias, machu, prachu a výfukových usadenín", en: "Removal of algae, moss, dust and exhaust deposits" },
      { sk: "Šetrný, regulovaný tlak podľa typu povrchu", en: "Gentle, controlled pressure matched to the surface type" },
      { sk: "Prípadné ošetrenie proti opätovnému rastu rias", en: "Optional treatment against regrowth of algae" },
      { sk: "Prístup lanovou technikou aj z plošiny", en: "Access via rope technique or platform" },
      { sk: "Predĺženie životnosti fasády a zateplenia", en: "Extended lifespan of the facade and insulation" },
    ],
    process: [
      {
        title: { sk: "Posúdenie povrchu", en: "Surface assessment" },
        text: { sk: "Určíme typ znečistenia a materiál fasády, zvolíme šetrnú technológiu.", en: "We identify the type of soiling and facade material and select a gentle method." },
      },
      {
        title: { sk: "Umytie a čistenie", en: "Washing and cleaning" },
        text: { sk: "Fasádu umyjeme regulovaným tlakom, odolné znečistenie ošetríme vhodným prípravkom.", en: "We wash the facade with controlled pressure and treat stubborn soiling with a suitable product." },
      },
      {
        title: { sk: "Kontrola a doošetrenie", en: "Check and finishing" },
        text: { sk: "Skontrolujeme výsledok a v prípade potreby aplikujeme ochranu proti riasam.", en: "We check the result and, if needed, apply protection against algae." },
      },
    ],
    faqs: [
      {
        q: { sk: "Poškodí tlaková voda omietku?", en: "Will pressure water damage the plaster?" },
        a: { sk: "Nie, ak sa tlak správne reguluje. Pri citlivých povrchoch volíme nižší tlak a vhodnú chémiu namiesto sily.", en: "No, if the pressure is properly controlled. On sensitive surfaces we use lower pressure and suitable chemistry instead of force." },
      },
      {
        q: { sk: "Ako často treba fasádu čistiť?", en: "How often should a facade be cleaned?" },
        a: { sk: "Zvyčajne raz za 2–5 rokov podľa polohy, orientácie a okolia (tienené a vlhké strany zarastajú riasami rýchlejšie).", en: "Usually every 2–5 years depending on location, orientation and surroundings (shaded, damp sides grow algae faster)." },
      },
    ],
    priceHint: {
      sk: "Cenu určuje plocha, výška, typ povrchu a miera znečistenia, preto nám pošlite fotky a pripravíme ponuku.",
      en: "Price depends on area, height, surface type and level of soiling, so send photos and we'll prepare a quote.",
    },
    related: ["/prace-vo-vyske", "/umyvanie-okien-vo-vyskach", "/cistenie-budov"],
    knowsAbout: ["Čistenie fasád", "Umývanie fasád", "Odstraňovanie rias z fasády", "Tlakové čistenie fasády"],
  },
  {
    slug: "/umyvanie-okien-vo-vyskach",
    key: "windows",
    icon: "🪟",
    nav: { sk: "Okná vo výškach", en: "Windows at height" },
    name: { sk: "Umývanie okien a presklení vo výškach", en: "High-rise window & glass cleaning" },
    excerpt: {
      sk: "Umývanie okien, presklených fasád a svetlíkov vo výškach, a to bez šmúh a aj na ťažko dostupných miestach.",
      en: "Cleaning of windows, glass facades and skylights at height, and always streak-free, even in hard-to-reach places.",
    },
    lead: {
      sk: "Umývanie okien vo výškach je čistenie presklených plôch na poschodiach a výškových budovách, kam sa nedá dostať z rebríka. Realizujeme ho lanovým prístupom alebo plošinou, s čistou (deionizovanou) vodou a stierkami, takže sklo zostane bez šmúh.",
      en: "High-rise window cleaning is the cleaning of glazed surfaces on upper floors and tall buildings that a ladder can't reach. We do it via rope access or platform, with pure (deionised) water and squeegees, so the glass stays streak-free.",
    },
    intro: [
      {
        sk: "Čisté okná a presklené fasády zásadne ovplyvňujú dojem z budovy aj množstvo denného svetla vnútri. Na výškových objektoch je pravidelné umývanie okien prácou vo výške, ktorá si vyžaduje istenie a skúsenosť.",
        en: "Clean windows and glass facades strongly influence the impression a building makes and the amount of daylight inside. On tall buildings, regular window cleaning is work at height that requires fall protection and experience.",
      },
      {
        sk: "Umývame okná bytových a administratívnych budov, presklené vstupy, výklady, zimné záhrady aj svetlíky. Pri veľkých plochách používame systém s čistou vodou, ktorý nezanecháva usadeniny.",
        en: "We clean windows of residential and office buildings, glazed entrances, shopfronts, winter gardens and skylights. For large surfaces we use a pure-water system that leaves no deposits.",
      },
    ],
    benefits: [
      { sk: "Umývanie bez šmúh čistou deionizovanou vodou", en: "Streak-free cleaning with pure deionised water" },
      { sk: "Prístup k ťažko dostupným presklením vo výške", en: "Access to hard-to-reach glazing at height" },
      { sk: "Vhodné pre bytové domy, kancelárie aj výklady", en: "Suitable for apartment blocks, offices and shopfronts" },
      { sk: "Umytie rámov a parapetov na požiadanie", en: "Frame and sill cleaning on request" },
      { sk: "Pravidelný servis podľa dohody", en: "Regular scheduled service by agreement" },
    ],
    process: [
      {
        title: { sk: "Zhodnotenie prístupu", en: "Access assessment" },
        text: { sk: "Určíme spôsob prístupu k presklením (lano/plošina) a rozsah plôch.", en: "We determine the access method (rope/platform) and the extent of the glazing." },
      },
      {
        title: { sk: "Umytie skla", en: "Glass cleaning" },
        text: { sk: "Sklo umyjeme a zotrieme do sucha bez šmúh, pri veľkých plochách čistou vodou.", en: "We wash and squeegee the glass streak-free, using pure water on large surfaces." },
      },
      {
        title: { sk: "Kontrola detailov", en: "Detail check" },
        text: { sk: "Skontrolujeme rohy, rámy a prípadné zvyšky, aby bol výsledok dokonalý.", en: "We check corners, frames and any residue for a flawless result." },
      },
    ],
    faqs: [
      {
        q: { sk: "Umývate aj okná na bytových domoch pre správcov?", en: "Do you clean apartment-block windows for property managers?" },
        a: { sk: "Áno, pre správcov a SVB zabezpečujeme pravidelné umývanie okien a presklených plôch spoločných priestorov.", en: "Yes, for property managers and owners' associations we provide regular cleaning of windows and shared glazed areas." },
      },
      {
        q: { sk: "Prečo sklo po umytí niekedy zasychá do šmúh?", en: "Why does glass sometimes dry into streaks after washing?" },
        a: { sk: "Za šmuhy môže tvrdá voda a zvyšky saponátu. Preto pri výškach používame deionizovanú vodu, ktorá zaschne bez usadenín.", en: "Streaks come from hard water and detergent residue. That's why at height we use deionised water, which dries without deposits." },
      },
    ],
    priceHint: {
      sk: "Cena závisí od plochy skla, výšky a spôsobu prístupu. Radi pripravíme ponuku aj na pravidelný servis.",
      en: "Price depends on glass area, height and access method. We're happy to quote for a regular service too.",
    },
    related: ["/cistenie-fasad", "/prace-vo-vyske", "/cistenie-budov"],
    knowsAbout: ["Umývanie okien vo výškach", "Čistenie presklených fasád", "Umývanie výkladov", "Čistenie svetlíkov"],
  },
  {
    slug: "/cistenie-budov",
    key: "buildings",
    icon: "🏬",
    nav: { sk: "Čistenie budov", en: "Building cleaning" },
    name: { sk: "Čistenie budov a objektov", en: "Building & premises cleaning" },
    excerpt: {
      sk: "Komplexné čistenie budov, a to vonkajšie plochy, spoločné priestory, po výstavbe aj pravidelná údržba.",
      en: "Comprehensive building cleaning, including exterior surfaces, common areas, post-construction and regular upkeep.",
    },
    lead: {
      sk: "Čistenie budov je komplexná starostlivosť o exteriér aj spoločné priestory objektu, a to od vonkajších plôch, prístreškov a balkónov cez vstupy a schodiská až po upratovanie po stavebných prácach.",
      en: "Building cleaning is comprehensive care for both the exterior and the common areas of a property, spanning from outdoor surfaces, canopies and balconies through entrances and staircases to post-construction cleaning.",
    },
    intro: [
      {
        sk: "Pre správcov, SVB, firmy aj majiteľov objektov zabezpečujeme čistenie ťažko dostupných a výškových častí budov, ktoré bežná upratovacia služba nepokryje. Spájame výškovú techniku s dôkladným čistením.",
        en: "For property managers, owners' associations, companies and building owners we clean the hard-to-reach and high-level parts of buildings that a standard cleaning service doesn't cover. We combine height techniques with thorough cleaning.",
      },
      {
        sk: "Zabezpečíme jednorazové aj pravidelné čistenie podľa potreby objektu, vrátane čistenia po rekonštrukcii a údržby spoločných priestorov.",
        en: "We provide one-off and regular cleaning as the building needs, including post-renovation cleaning and upkeep of common areas.",
      },
    ],
    benefits: [
      { sk: "Vonkajšie plochy, prístrešky, balkóny a loggie", en: "Exterior surfaces, canopies, balconies and loggias" },
      { sk: "Spoločné priestory, vstupy a schodiská", en: "Common areas, entrances and staircases" },
      { sk: "Upratovanie po stavebných a rekonštrukčných prácach", en: "Cleaning after construction and renovation work" },
      { sk: "Jednorazovo aj pravidelne podľa dohody", en: "One-off or on a regular schedule by agreement" },
      { sk: "Prístup k výškovým a ťažko dostupným častiam", en: "Access to high-level and hard-to-reach parts" },
    ],
    process: [
      {
        title: { sk: "Prehliadka objektu", en: "Building walkthrough" },
        text: { sk: "Prejdeme objekt a dohodneme rozsah a frekvenciu čistenia.", en: "We walk the building and agree the scope and frequency of cleaning." },
      },
      {
        title: { sk: "Čistenie", en: "Cleaning" },
        text: { sk: "Vyčistíme dohodnuté plochy vhodnou technikou vrátane výškových častí.", en: "We clean the agreed areas with the right technique, including high-level parts." },
      },
      {
        title: { sk: "Odovzdanie a plán údržby", en: "Handover and upkeep plan" },
        text: { sk: "Odovzdáme objekt a v prípade záujmu navrhneme plán pravidelnej údržby.", en: "We hand over the building and, if wanted, propose a regular upkeep plan." },
      },
    ],
    faqs: [
      {
        q: { sk: "Robíte aj upratovanie po rekonštrukcii?", en: "Do you also do post-renovation cleaning?" },
        a: { sk: "Áno, čistenie po stavebných a rekonštrukčných prácach je jednou z našich činností vrátane ťažko dostupných a výškových častí.", en: "Yes, cleaning after construction and renovation is one of our services, including hard-to-reach and high-level parts." },
      },
      {
        q: { sk: "Zabezpečíte pravidelné čistenie pre správcu budovy?", en: "Can you provide regular cleaning for a building manager?" },
        a: { sk: "Áno, pre správcov a SVB nastavíme pravidelný harmonogram čistenia spoločných a vonkajších priestorov.", en: "Yes, for managers and owners' associations we set up a regular schedule for common and exterior areas." },
      },
    ],
    priceHint: {
      sk: "Cenu určíme podľa rozsahu a frekvencie a pripravíme ponuku na jednorazové aj pravidelné čistenie.",
      en: "We set the price by scope and frequency, and we'll quote for both one-off and regular cleaning.",
    },
    related: ["/prace-vo-vyske", "/cistenie-fasad", "/umyvanie-okien-vo-vyskach"],
    knowsAbout: ["Čistenie budov", "Upratovanie po rekonštrukcii", "Čistenie spoločných priestorov", "Údržba budov"],
  },
];

/** Pillar služba (rozcestník témy), používa sa napr. v navigácii ako prvá. */
export const pillarSlug = "/prace-vo-vyske" as const;

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
