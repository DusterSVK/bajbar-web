import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { Reveal } from "@/components/Motion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site, contact, hoursText, telHref, mailHref } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

const abs = (href: Parameters<typeof getPathname>[0]["href"], locale: Locale) =>
  `${site.url}${getPathname({ href, locale })}`;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    href: "/kontakt",
    title: locale === "sk" ? "Kontakt a nezáväzná cenová ponuka" : "Contact and a free quote",
    description:
      locale === "sk"
        ? "Ozvite sa nám na výškové čistenie a prácu vo výške v Bratislave. Telefón, e-mail a nezáväzný dopytový formulár."
        : "Get in touch about high-rise cleaning and work at height in Bratislava. Phone, email and a no-obligation enquiry form.",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("Common");
  const nav = await getTranslations("Nav");

  const trail = [
    { name: c("home"), url: abs("/", locale) },
    { name: nav("contact"), url: abs("/kontakt", locale) },
  ];

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
      <Breadcrumbs items={[{ label: c("home"), href: "/" }, { label: nav("contact") }]} />

      <section className="container-page py-10 sm:py-14">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{nav("contact")}</p>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {locale === "sk" ? "Nezáväzná cenová ponuka" : "Get a free quote"}
          </h1>
          <p className="prose-lead mt-5">
            {locale === "sk"
              ? "Napíšte nám alebo zavolajte. Priložte fotky objektu (výška, rozsah, typ povrchu) a pripravíme cenovú ponuku na mieru, zvyčajne do 24 hodín."
              : "Write or call us. Attach photos of the site (height, scope, surface type) and we'll prepare a tailored quote, usually within 24 hours."}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Kontaktné údaje */}
          <Reveal>
            <div className="space-y-5">
              <div className="card">
                <h2 className="font-display text-lg font-bold text-ink">{nav("contact")}</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">{c("phone")}</dt>
                    <dd><a href={telHref} className="font-semibold text-brand-700 hover:underline">{contact.phoneDisplay}</a></dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">{c("email")}</dt>
                    <dd><a href={mailHref} className="font-semibold text-brand-700 hover:underline">{contact.email}</a></dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">{c("address")}</dt>
                    <dd className="text-right font-medium text-ink">{contact.address.street}<br />{contact.address.postalCode} {contact.address.city}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">IČO</dt>
                    <dd className="font-medium text-ink">{contact.ico}</dd>
                  </div>
                </dl>
              </div>

              <div className="card">
                <h2 className="font-display text-lg font-bold text-ink">{c("hours")}</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  {hoursText.map((h) => (
                    <div key={h.label.sk} className="flex justify-between gap-4">
                      <dt className="text-muted">{h.label[locale]}</dt>
                      <dd className="font-medium text-ink">{h.value[locale]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>

          {/* Formulár */}
          <Reveal>
            <LeadForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
