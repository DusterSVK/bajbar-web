import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site, contact } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

const abs = (href: Parameters<typeof getPathname>[0]["href"], locale: Locale) =>
  `${site.url}${getPathname({ href, locale })}`;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    href: "/ochrana-osobnych-udajov",
    title: locale === "sk" ? "Ochrana osobných údajov" : "Privacy policy",
    description:
      locale === "sk"
        ? "Ako Bajbar Services s. r. o. spracúva osobné údaje z kontaktného formulára v súlade s GDPR."
        : "How Bajbar Services s. r. o. processes personal data from the contact form in line with GDPR.",
  });
}

const sk = {
  h1: "Ochrana osobných údajov",
  sections: [
    {
      h: "Prevádzkovateľ",
      p: [
        `Prevádzkovateľom je ${site.legalName}, ${contact.address.street}, ${contact.address.postalCode} ${contact.address.city}, IČO ${contact.ico}. Kontakt: ${contact.email}, ${contact.phoneDisplay}.`,
      ],
    },
    {
      h: "Aké údaje spracúvame",
      p: [
        "Prostredníctvom kontaktného formulára spracúvame údaje, ktoré nám dobrovoľne poskytnete: meno, telefónne číslo, prípadne e-mail, mesto/lokalitu a text správy.",
      ],
    },
    {
      h: "Účel a právny základ",
      p: [
        "Údaje spracúvame výhradne za účelom vybavenia vášho dopytu a prípravy cenovej ponuky. Právnym základom je vykonanie opatrení pred uzatvorením zmluvy na vašu žiadosť (čl. 6 ods. 1 písm. b GDPR) a náš oprávnený záujem odpovedať na dopyt.",
      ],
    },
    {
      h: "Príjemcovia a sprostredkovatelia",
      p: [
        "Na doručovanie e-mailových notifikácií z formulára využívame službu Resend (Resend, Inc.). Údaje neposkytujeme tretím stranám na marketingové účely.",
      ],
    },
    {
      h: "Doba uchovávania",
      p: [
        "Údaje uchovávame len po dobu nevyhnutnú na vybavenie dopytu a následne po dobu vyžadovanú právnymi predpismi. Ak nedôjde k spolupráci, údaje bez zbytočného odkladu vymažeme.",
      ],
    },
    {
      h: "Vaše práva",
      p: [
        "Máte právo na prístup k údajom, ich opravu, vymazanie, obmedzenie spracúvania, namietanie a prenosnosť, ako aj právo podať sťažnosť na Úrad na ochranu osobných údajov SR.",
      ],
    },
    {
      h: "Cookies",
      p: [
        "Analytické cookies (Google Analytics) používame len s vaším súhlasom udeleným cez cookie lištu. Súhlas môžete kedykoľvek odvolať vymazaním cookies v prehliadači.",
      ],
    },
  ],
};

const en = {
  h1: "Privacy policy",
  sections: [
    {
      h: "Controller",
      p: [
        `The controller is ${site.legalName}, ${contact.address.street}, ${contact.address.postalCode} ${contact.address.city}, Company ID ${contact.ico}. Contact: ${contact.email}, ${contact.phoneDisplay}.`,
      ],
    },
    {
      h: "What data we process",
      p: [
        "Through the contact form we process the data you provide voluntarily: name, phone number, optionally email, city/location and message text.",
      ],
    },
    {
      h: "Purpose and legal basis",
      p: [
        "We process the data solely to handle your enquiry and prepare a quote. The legal basis is taking steps prior to entering into a contract at your request (Art. 6(1)(b) GDPR) and our legitimate interest in responding to the enquiry.",
      ],
    },
    {
      h: "Recipients and processors",
      p: [
        "To deliver email notifications from the form we use the Resend service (Resend, Inc.). We do not share data with third parties for marketing purposes.",
      ],
    },
    {
      h: "Retention period",
      p: [
        "We keep the data only for as long as necessary to handle the enquiry and thereafter for the period required by law. If no cooperation follows, we delete the data without undue delay.",
      ],
    },
    {
      h: "Your rights",
      p: [
        "You have the right to access, rectify, erase, restrict processing, object and data portability, as well as the right to lodge a complaint with the Slovak Data Protection Authority.",
      ],
    },
    {
      h: "Cookies",
      p: [
        "We use analytics cookies (Google Analytics) only with your consent given via the cookie bar. You can withdraw consent at any time by clearing cookies in your browser.",
      ],
    },
  ],
};

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTranslations("Common");
  const f = await getTranslations("Footer");
  const x = locale === "sk" ? sk : en;

  const trail = [
    { name: c("home"), url: abs("/", locale) },
    { name: f("privacy"), url: abs("/ochrana-osobnych-udajov", locale) },
  ];

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail))} />
      <Breadcrumbs items={[{ label: c("home"), href: "/" }, { label: f("privacy") }]} />

      <section className="container-page py-10 sm:py-14">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{x.h1}</h1>
        <div className="mt-8 max-w-3xl space-y-8">
          {x.sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-lg font-bold text-ink">{s.h}</h2>
              {s.p.map((p, i) => (
                <p key={i} className="mt-2 text-[1.0625rem] leading-[1.75] text-body">{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
