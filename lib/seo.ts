import type { Metadata } from "next";
import { site } from "./config";
import { routing, type Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

type Href = Parameters<typeof getPathname>[0]["href"];

/**
 * Jednotný builder metadát so správnym `canonical` a `hreflang` (alternates.languages).
 * `href` je INTERNÝ pathname (napr. "/cistenie-fasad" alebo {pathname:"/blog/[slug]",
 * params:{slug}}); lokalizované URL dopočíta next-intl `getPathname`. Cesty sú
 * relatívne, Next ich absolutizuje cez `metadataBase` z layoutu.
 */
export function pageMeta(opts: {
  locale: Locale;
  href: Href;
  title: string;
  description: string;
  /** Absolútny title bez šablóny (domovská stránka). */
  absoluteTitle?: boolean;
}): Metadata {
  const { locale, href, title, description } = opts;

  const canonicalPath = getPathname({ href, locale });
  const url = `${site.url}${canonicalPath}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = getPathname({ href, locale: l });
  }
  languages["x-default"] = getPathname({ href, locale: routing.defaultLocale });

  return {
    title: opts.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: canonicalPath, languages },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: locale === "sk" ? "sk_SK" : "en_GB",
      alternateLocale: locale === "sk" ? "en_GB" : "sk_SK",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
