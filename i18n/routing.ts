import { defineRouting } from "next-intl/routing";

/**
 * JEDEN ZDROJ PRAVDY pre i18n routovanie a lokalizované slugy.
 *
 * - `localePrefix: "as-needed"` → slovenčina (default) beží na roote (`/cistenie-fasad`),
 *   angličtina pod `/en` (`/en/facade-cleaning`).
 * - Kľúče v `pathnames` sú INTERNÉ (kanonické, = názvy priečinkov v `app/[locale]/...`),
 *   hodnoty sú EXTERNÉ lokalizované URL, ktoré middleware prepisuje. Vďaka tomu má
 *   každý jazyk vlastný, pre SEO čistý slug.
 *
 * Pri pridaní stránky: pridaj priečinok `app/[locale]/<sk-slug>/page.tsx` a záznam sem.
 * Sitemap, navigácia aj hreflang čerpajú z tohto zoznamu → nikdy sa nerozídu.
 */
export const routing = defineRouting({
  locales: ["sk", "en"],
  defaultLocale: "sk",
  localePrefix: "as-needed",
  // Vypnutá automatická detekcia jazyka podľa Accept-Language/cookie:
  // `/` vždy zobrazí SK (default), `/en` angličtinu, žiadne prekvapivé
  // presmerovania, stabilné URL pre SEO. Používateľ prepína cez switcher.
  localeDetection: false,
  pathnames: {
    "/": "/",
    // Dočasná ukážka nového high-end dizajnu (noindex). Bez vplyvu na ostatné stránky.
    "/ukazka": { sk: "/ukazka", en: "/showcase" },
    "/prace-vo-vyske": { sk: "/prace-vo-vyske", en: "/work-at-heights" },
    "/cistenie-fasad": { sk: "/cistenie-fasad", en: "/facade-cleaning" },
    "/umyvanie-okien-vo-vyskach": {
      sk: "/umyvanie-okien-vo-vyskach",
      en: "/high-rise-window-cleaning",
    },
    "/cistenie-budov": { sk: "/cistenie-budov", en: "/building-cleaning" },
    "/o-nas": { sk: "/o-nas", en: "/about" },
    "/referencie": { sk: "/referencie", en: "/references" },
    "/cennik": { sk: "/cennik", en: "/pricing" },
    "/faq": { sk: "/faq", en: "/faq" },
    "/kontakt": { sk: "/kontakt", en: "/contact" },
    "/blog": { sk: "/blog", en: "/blog" },
    "/blog/[slug]": { sk: "/blog/[slug]", en: "/blog/[slug]" },
    "/ochrana-osobnych-udajov": {
      sk: "/ochrana-osobnych-udajov",
      en: "/privacy-policy",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
