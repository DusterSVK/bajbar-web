@AGENTS.md

# Bajbar Services, web

SEO/AI-optimalizovaný dvojjazyčný (SK/EN) web pre **Bajbar Services s. r. o.**,
výškové čistenie a práca vo výške v Bratislave. Postavené podľa vzoru projektu
tepovanievbratislave.sk (typované dátové moduly, žiadna DB/CMS).

## Stack
- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript** (strict), **npm**.
- **Tailwind CSS v4** (CSS-first config v `app/globals.css`, žiadny tailwind.config).
- **next-intl v4**, i18n (SK default, EN pod `/en`), lokalizované slugy.
- Rendering: **SSG** (statické stránky). Blog aj obsah = súbory v repo, žiadna databáza.
- `output: "standalone"` → beží na Verceli aj na VPS (Docker/Traefik).

## Štruktúra
- `i18n/routing.ts`, JEDEN ZDROJ PRAVDY pre jazyky a **lokalizované slugy** (pathnames).
  Nová stránka = priečinok `app/[locale]/<sk-slug>/page.tsx` + záznam sem.
- `i18n/navigation.ts`, `Link`, `getPathname`, `useRouter`… (VŽDY používaj tieto, nie next/navigation).
- `messages/{sk,en}.json`, UI reťazce (nie obsah stránok).
- `lib/config.ts`, **NAP single source** (názov, IČO, sídlo, telefón, e-mail, oblasť, USP, hodiny).
  ⚠️ Placeholdery označené `TODO` (doména, telefón, e-mail) nahraď reálnymi údajmi.
- `lib/services.ts`, 4 služby s plným dvojjazyčným obsahom (data-driven service stránky cez `components/ServiceView.tsx`).
- `lib/faqs.ts`, všeobecné FAQ. `lib/blog.ts` + `blog-extra.json`, články (pole `locale`, `body` bloky alebo `bodyHtml`).
- `lib/seo.ts`, `pageMeta()` (canonical + hreflang). `lib/schema.ts`, `@graph` JSON-LD builders.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/opengraph-image.tsx`, `app/icon.tsx`, `app/llms.txt/route.ts`.
- `app/api/lead/route.ts`, kontaktný formulár cez Resend (dev fallback bez kľúča).
- `proxy.ts`, next-intl middleware (Next 16 „proxy" konvencia).

## Bežné úpravy
- **Nová služba**: pridaj do `lib/services.ts`, pridaj slug do `i18n/routing.ts` pathnames,
  vytvor `app/[locale]/<slug>/page.tsx` (skopíruj existujúcu, zmeň `SLUG`), doplň do `app/sitemap.ts`.
- **Nový článok**: pridaj objekt do `inlinePosts` v `lib/blog.ts` (pole `locale: "sk" | "en"`).
- **Kontakt/NAP**: uprav `lib/config.ts`, premietne sa do textov, schémy aj llms.txt.
- **Farby/typografia**: `app/globals.css` (`@theme`).
- **Farebné témy (prepínač)**: 3 témy (`steel` svetlá default, `cyan` tmavá, `emerald` tmavá) sú sémantické tokeny v `app/globals.css` pod `:root[data-theme="…"]`. Prepína ich `components/ThemeSwitcher.tsx` (plávajúci, ukladá do localStorage), no-flash rieši `components/ThemeScript.tsx`. Novú tému pridáš ako ďalší `[data-theme]` blok + záznam v `ThemeSwitcher`. Komponenty používajú tokeny (`bg-surface`, `text-ink`, `bg-band`, `text-accent-fg`, `border-hairline`, `brand-*`), nie natvrdo biele/čierne. Pozn.: v CSS komentároch nepoužívaj `*/` (napr. `brand-*/`), predčasne ukončí komentár.
- **Obrázky**: fotky sú v `/public/img` (Unsplash, stiahnuté, rovnaká fotobanka ako optimalizaciapreai.sk). Obnoviť/pridať: uprav sloty v `scripts/fetch-unsplash.mjs` a spusti `node --env-file=.env.local scripts/fetch-unsplash.mjs` (potrebuje `UNSPLASH_ACCESS_KEY` v `.env.local`, len pri build-time, nie za behu). Dvojjazyčné alt texty a mapovanie sú v `lib/images.ts`, kredity fotografov v `lib/stock-images.json`. Vkladajú sa cez `components/StockImage.tsx` (alt + kredit + theme-safe rám).

## Príkazy
- `npm run dev`, vývoj (localhost:3000). `npm run build`, produkčný build (SSG).
- ENV: pozri `.env.example` (`RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`, `NEXT_PUBLIC_GA_ID`).

## Deploy
- **Vercel**: import repo, nastav env premenné. Funguje out-of-the-box (SSG).
- **VPS**: `Dockerfile` + `docker-compose.yml` (Traefik). Pred nasadením uprav doménu v
  compose labels aj v `lib/config.ts`. Runtime auto-publish článkov (webhook z AIO Tracking)
  je zatiaľ neimplementovaný, pridá sa vo VPS fáze.

## Pred spustením do ostrej prevádzky (TODO)
- [ ] Doména (`lib/config.ts` → `site.url`, `site.domain`; compose labels).
- [ ] Telefón a e-mail (`lib/config.ts` → `contact`).
- [ ] Oblasť pôsobenia (`lib/config.ts` → `districts`, `towns`).
- [ ] `RESEND_API_KEY` + overený odosielateľ pre ostrý formulár.
- [ ] Doplniť EN preklady obsahu tam, kde treba doladiť; pridať reálne referencie.
