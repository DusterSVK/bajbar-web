import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { site } from "@/lib/config";
import { posts } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";

type Href = Parameters<typeof getPathname>[0]["href"];

const url = (href: Href, locale: Locale) => `${site.url}${getPathname({ href, locale })}`;

/** Statické trasy s prioritou a frekvenciou zmien. */
const staticRoutes: { href: Href; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { href: "/", priority: 1.0, freq: "weekly" },
  { href: "/prace-vo-vyske", priority: 0.9, freq: "monthly" },
  { href: "/cistenie-fasad", priority: 0.9, freq: "monthly" },
  { href: "/umyvanie-okien-vo-vyskach", priority: 0.9, freq: "monthly" },
  { href: "/cistenie-budov", priority: 0.9, freq: "monthly" },
  { href: "/cennik", priority: 0.8, freq: "monthly" },
  { href: "/referencie", priority: 0.6, freq: "monthly" },
  { href: "/faq", priority: 0.7, freq: "monthly" },
  { href: "/o-nas", priority: 0.5, freq: "yearly" },
  { href: "/kontakt", priority: 0.8, freq: "yearly" },
  { href: "/blog", priority: 0.6, freq: "weekly" },
  { href: "/ochrana-osobnych-udajov", priority: 0.2, freq: "yearly" },
];

/** Alternates.languages pre danú trasu (hreflang pre všetky jazyky). */
function languagesFor(href: Href): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of routing.locales) langs[l] = url(href, l);
  return langs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.flatMap((r) =>
    routing.locales.map((locale) => ({
      url: url(r.href, locale),
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
      alternates: { languages: languagesFor(r.href) },
    }))
  );

  // Blog články sú jednojazyčné, každý pod svojím jazykom, bez cross-locale alternatívy.
  const blog: MetadataRoute.Sitemap = posts.map((p) => {
    const href: Href = { pathname: "/blog/[slug]", params: { slug: p.slug } };
    return {
      url: url(href, p.locale),
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "yearly",
      priority: 0.5,
    };
  });

  return [...pages, ...blog];
}
