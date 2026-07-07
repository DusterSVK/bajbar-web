import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname, Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { StockImage } from "@/components/StockImage";
import { JsonLd } from "@/components/JsonLd";
import { graph, blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { posts, getPost } from "@/lib/blog";
import { getService } from "@/lib/services";
import { imgAbs } from "@/lib/images";
import { site } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

export const dynamicParams = false;

const abs = (href: Parameters<typeof getPathname>[0]["href"], locale: Locale) =>
  `${site.url}${getPathname({ href, locale })}`;

export function generateStaticParams() {
  return posts.map((p) => ({ locale: p.locale, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({
    locale,
    href: { pathname: "/blog/[slug]", params: { slug } },
    title: post.seoTitle ?? post.title,
    description: post.metaDesc ?? post.excerpt,
  });
}

function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "sk" ? "sk-SK" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const c = await getTranslations("Common");
  const b = await getTranslations("Blog");

  const url = abs({ pathname: "/blog/[slug]", params: { slug } }, locale);
  const related = post.relatedServices
    .map((s) => getService(s))
    .filter(Boolean) as { slug: string; name: Record<Locale, string> }[];

  const trail = [
    { name: c("home"), url: abs("/", locale) },
    { name: b("title"), url: abs("/blog", locale) },
    { name: post.title, url },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          blogPostingSchema({
            title: post.title,
            url,
            excerpt: post.excerpt,
            date: post.date,
            updated: post.updated,
            image: post.cover ? imgAbs(post.cover, site.url) : undefined,
            locale,
          }),
          breadcrumbSchema(trail)
        )}
      />
      <Breadcrumbs
        items={[
          { label: c("home"), href: "/" },
          { label: b("title"), href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="py-10 sm:py-14">
        <div className="container-page">
          <Reveal className="mx-auto max-w-[72ch]">
            <p className="text-xs font-medium text-muted">
              {formatDate(post.date, locale)}
              {post.updated && ` · ${b("updated")} ${formatDate(post.updated, locale)}`} · {post.readingMinutes} {b("readingTime")}
            </p>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-4xl">
              {post.title}
            </h1>
            <p className="prose-lead mt-5">{post.excerpt}</p>
            {post.author && (
              <p className="mt-4 text-sm text-body">
                {locale === "sk" ? "Autor" : "Author"}: <span className="font-medium text-ink">{post.author}</span>
              </p>
            )}
          </Reveal>

          {post.cover && (
            <Reveal className="mx-auto mt-8 max-w-[72ch]">
              <StockImage
                imageKey={post.cover}
                locale={locale}
                priority
                aspect="aspect-[16/9]"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </Reveal>
          )}

          {post.bodyHtml ? (
            <div
              className="mx-auto mt-10 max-w-[68ch] text-[1.0625rem] leading-[1.75] text-body
                [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-ink
                [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink
                [&_p]:mt-4 [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline
                [&_strong]:font-semibold [&_strong]:text-ink
                [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />
          ) : (
            <div className="mx-auto mt-10 max-w-[68ch] space-y-8">
              {post.body.map((blk, i) => (
                <Reveal key={i}>
                  {blk.h && (
                    <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">{blk.h}</h2>
                  )}
                  {blk.p?.map((p, j) => (
                    <p key={j} className={`text-[1.0625rem] leading-[1.75] text-body ${blk.h ? "mt-4" : ""}`}>
                      {p}
                    </p>
                  ))}
                  {blk.ul && (
                    <ul className="mt-4 space-y-2.5">
                      {blk.ul.map((li, j) => (
                        <li key={j} className="flex gap-3 leading-relaxed text-body">
                          <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">✓</span>
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              ))}
            </div>
          )}

          {/* Súvisiace služby + zdroje */}
          <div className="mx-auto mt-12 max-w-[68ch] space-y-6">
            {related.length > 0 && (
              <div className="card bg-brand-50 ring-brand-100">
                <h2 className="font-display text-base font-bold text-ink">{b("relatedServices")}</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={r.slug as Parameters<typeof Link>[0]["href"]} className="font-medium text-brand-700 hover:underline">
                        {r.name[locale]} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {post.sources && post.sources.length > 0 && (
              <div className="border-t border-hairline pt-6">
                <h2 className="font-display text-base font-bold text-ink">{b("sources")}</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {post.sources.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener nofollow" className="text-brand-700 hover:underline">
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href="/blog" className="inline-flex text-sm font-semibold text-brand-700 hover:underline">
              ← {b("backToBlog")}
            </Link>
          </div>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
