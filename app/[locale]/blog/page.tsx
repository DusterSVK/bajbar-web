import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname, Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { StockImage } from "@/components/StockImage";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { postsByLocale } from "@/lib/blog";
import { site } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

const abs = (href: Parameters<typeof getPathname>[0]["href"], locale: Locale) =>
  `${site.url}${getPathname({ href, locale })}`;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    href: "/blog",
    title: locale === "sk" ? "Blog o výškovom čistení" : "High-rise cleaning blog",
    description:
      locale === "sk"
        ? "Rady, postupy a odpovede o výškovom čistení, čistení fasád, umývaní okien vo výškach a práci vo výške."
        : "Tips, methods and answers on high-rise cleaning, facade cleaning, window cleaning at height and work at height.",
  });
}

function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "sk" ? "sk-SK" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("Common");
  const b = await getTranslations("Blog");
  const posts = postsByLocale(locale);

  const trail = [
    { name: c("home"), url: abs("/", locale) },
    { name: b("title"), url: abs("/blog", locale) },
  ];

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
      <Breadcrumbs items={[{ label: c("home"), href: "/" }, { label: b("title") }]} />

      <section className="container-page py-10 sm:py-14">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{b("title")}</p>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{b("title")}</h1>
          <p className="prose-lead mt-4">{b("subtitle")}</p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-10 text-body">{b("empty")}</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {posts.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  href={{ pathname: "/blog/[slug]", params: { slug: p.slug } }}
                  className="card group flex h-full flex-col transition-all hover:-translate-y-1"
                >
                  {p.cover && (
                    <StockImage
                      imageKey={p.cover}
                      locale={locale}
                      credit={false}
                      aspect="aspect-[16/9]"
                      rounded="rounded-xl"
                      sizes="(max-width: 640px) 100vw, 520px"
                      className="mb-4"
                    />
                  )}
                  <p className="text-xs font-medium text-muted">
                    {formatDate(p.date, locale)} · {p.readingMinutes} {b("readingTime")}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-bold leading-snug text-ink group-hover:text-brand-700">
                    {p.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{p.excerpt}</p>
                  <span className="mt-4 text-sm font-semibold text-brand-700">{c("readMore")} →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <CtaBand />
    </>
  );
}
