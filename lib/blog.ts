import blogExtra from "./blog-extra.json";
import type { Locale } from "@/i18n/routing";
import type { StockKey } from "./images";

/**
 * Blog: štíhly pillar. Každý článok patrí jednému jazyku (`locale`) a vlastní
 * samostatný informačný dopyt (žiadny content farm). Obsah je štruktúrovaný do
 * blokov (`body`) alebo ako HTML (`bodyHtml`, napr. auto-publish z AIO Tracking).
 */

export type Block = { h?: string; p?: string[]; ul?: string[] };

export type BlogPost = {
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  updated?: string; // ISO
  readingMinutes: number;
  /** Interné službové stránky, na ktoré článok odkazuje. */
  relatedServices: string[];
  body: Block[];
  /** HTML telo (auto-publish); ak je vyplnené, renderuje sa namiesto `body`. */
  bodyHtml?: string;
  seoTitle?: string;
  metaDesc?: string;
  author?: string;
  /** Titulná fotka (kľúč zo stock-images / lib/images.ts). */
  cover?: StockKey;
  sources?: { label: string; href: string }[];
};

const DEFAULT_AUTHOR = "Bajbar Services";

const inlinePosts: BlogPost[] = [
  {
    locale: "sk",
    slug: "ako-casto-cistit-fasadu-bytoveho-domu",
    title: "Ako často treba čistiť fasádu bytového domu?",
    excerpt:
      "Fasádu bytového domu je vhodné čistiť približne raz za 2 až 5 rokov. Ako často presne, závisí od orientácie, okolia a materiálu. Vysvetľujeme prečo.",
    date: "2026-06-20",
    readingMinutes: 4,
    relatedServices: ["/cistenie-fasad", "/prace-vo-vyske"],
    cover: "blog-facade",
    body: [
      {
        p: [
          "Fasádu bytového domu je vo väčšine prípadov vhodné vyčistiť raz za 2 až 5 rokov. Presný interval závisí od toho, ako rýchlo sa na nej usádzajú riasy, mach a nečistoty, a to sa dom od domu líši.",
        ],
      },
      {
        h: "Čo ovplyvňuje, ako rýchlo fasáda zarastá",
        ul: [
          "Orientácia: severné a tienené strany zostávajú dlhšie vlhké a riasy na nich rastú rýchlejšie.",
          "Okolie: blízkosť stromov, trávnatých plôch a rušných ciest znamená viac spór, peľu a prachu.",
          "Materiál a povrch: hrubšie a poréznejšie omietky zachytávajú nečistotu viac než hladké.",
          "Zateplenie: kontaktné zatepľovacie systémy (ETICS) bývajú náchylnejšie na rast rias.",
        ],
      },
      {
        h: "Prečo nečakať, kým je fasáda zjavne špinavá",
        p: [
          "Riasy a mach nie sú len estetický problém. Zadržiavajú vlhkosť, ktorá postupne narúša omietku aj zatepľovací systém. Pravidelné čistenie preto nie je kozmetika, ale údržba, ktorá predlžuje životnosť fasády a chráni hodnotu nehnuteľnosti.",
        ],
      },
      {
        h: "Ako čistenie prebieha",
        p: [
          "Fasádu umývame regulovaným tlakom vody, pri odolnom znečistení doplneným vhodným prípravkom. Na výškové a ťažko dostupné časti používame lanový prístup alebo plošinu, takže nie je potrebné stavať lešenie. Na požiadanie aplikujeme ochranu, ktorá spomalí opätovný rast rias.",
        ],
      },
    ],
    author: DEFAULT_AUTHOR,
    sources: [],
  },
  {
    locale: "sk",
    slug: "lanovy-pristup-alebo-plosina",
    title: "Lanový prístup alebo plošina? Kedy sa čo oplatí",
    excerpt:
      "Pri prácach vo výške sa rozhodujeme medzi lanovým prístupom a plošinou. Ako sa líšia a kedy je ktorá voľba vhodnejšia. Prinášame stručný prehľad.",
    date: "2026-06-28",
    readingMinutes: 4,
    relatedServices: ["/prace-vo-vyske", "/umyvanie-okien-vo-vyskach"],
    cover: "blog-access",
    body: [
      {
        p: [
          "Výškové práce sa dajú robiť viacerými spôsobmi. Najčastejšie volíme medzi lanovým prístupom (industrial rope access) a vysokozdvižnou plošinou. Každá technika má svoje silné stránky a správna voľba závisí od konkrétneho objektu.",
        ],
      },
      {
        h: "Lanový prístup",
        p: [
          "Pracovník je istený lanami z kotviacich bodov na streche alebo konštrukcii. Výhodou je rýchle nasadenie, prístup k úzkym a členitým miestam a minimálny zásah do prevádzky budovy.",
        ],
        ul: [
          "Ideálny pre bytové a administratívne budovy s dostupnými kotviacimi bodmi.",
          "Rýchly presun po fasáde bez záberu priestoru na zemi.",
          "Vhodný tam, kde by plošina neprešla alebo nedosiahla.",
        ],
      },
      {
        h: "Vysokozdvižná plošina",
        p: [
          "Plošina umožňuje stabilnú prácu vo výške s väčším množstvom náradia. Hodí sa tam, kde je dostatok priestoru na jej postavenie a kde treba pracovať dlhšie na jednom mieste.",
        ],
        ul: [
          "Vhodná pre otvorené plochy s dobrým prístupom pre techniku.",
          "Stabilná základňa pre náročnejšie úkony.",
          "Vyžaduje priestor a spevnený podklad.",
        ],
      },
      {
        h: "Ako sa rozhodnúť",
        p: [
          "Nemusíte sa rozhodovať sami. Pri obhliadke alebo z fotiek posúdime prístup, kotviace body a rozsah prác a navrhneme najbezpečnejšie a najefektívnejšie riešenie, pričom často je to kombinácia oboch.",
        ],
      },
    ],
    author: DEFAULT_AUTHOR,
    sources: [],
  },
  {
    locale: "en",
    slug: "how-often-clean-building-facade",
    title: "How often should you clean a building facade?",
    excerpt:
      "A building facade is usually best cleaned every 2 to 5 years. How often exactly depends on orientation, surroundings and material. Here's why.",
    date: "2026-06-20",
    readingMinutes: 4,
    relatedServices: ["/cistenie-fasad", "/prace-vo-vyske"],
    cover: "blog-facade",
    body: [
      {
        p: [
          "In most cases a building facade is best cleaned every 2 to 5 years. The exact interval depends on how quickly algae, moss and grime build up, and that varies from building to building.",
        ],
      },
      {
        h: "What affects how fast a facade gets dirty",
        ul: [
          "Orientation: north-facing and shaded sides stay damp longer, so algae grows faster.",
          "Surroundings: nearby trees, grass and busy roads mean more spores, pollen and dust.",
          "Material and surface: rougher, more porous renders trap dirt more than smooth ones.",
          "Insulation: external insulation systems (ETICS) tend to be more prone to algae growth.",
        ],
      },
      {
        h: "Why not wait until it looks obviously dirty",
        p: [
          "Algae and moss aren't just an aesthetic issue. They retain moisture that gradually damages the render and the insulation system. Regular cleaning is maintenance that extends the facade's life and protects the property's value.",
        ],
      },
    ],
    author: DEFAULT_AUTHOR,
    sources: [],
  },
];

/** Zlúči repo články s (voliteľnými) generovanými z blog-extra.json. */
export const posts: BlogPost[] = [...inlinePosts, ...(blogExtra as BlogPost[])].map((p) => ({
  author: DEFAULT_AUTHOR,
  ...p,
}));

export const postsByLocale = (locale: Locale): BlogPost[] =>
  posts
    .filter((p) => p.locale === locale)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug: string): BlogPost | undefined =>
  posts.find((p) => p.slug === slug);
