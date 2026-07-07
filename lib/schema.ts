import {
  site,
  contact,
  geo,
  openingHours,
  districts,
  towns,
  reviews,
  social,
  tagline,
} from "./config";
import { services } from "./services";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/** Stabilné @id uzly, na ktoré sa ostatné schémy odkazujú (locale-agnostické). */
export const ids = {
  business: `${site.url}/#business`,
  website: `${site.url}/#website`,
  owner: `${site.url}/#owner`,
};

type Href = Parameters<typeof getPathname>[0]["href"];
const urlFor = (href: Href, locale: Locale) => `${site.url}${getPathname({ href, locale })}`;
const langTag = (locale: Locale) => (locale === "sk" ? "sk-SK" : "en-GB");

function sameAs(): string[] {
  return [social.google, social.facebook, social.instagram].filter(Boolean) as string[];
}

/** areaServed = ten istý zoznam ako text (NAP/areaServed konzistencia). */
function areaServed() {
  const bratislava = { "@type": "City", name: "Bratislava" };
  const districtPlaces = districts.map((d) => ({ "@type": "Place", name: `Bratislava – ${d}` }));
  const townCities = towns.map((t) => ({ "@type": "City", name: t }));
  const country = { "@type": "Country", name: "Slovensko" };
  return [bratislava, ...districtPlaces, ...townCities, country];
}

function uniqueKnowsAbout(): string[] {
  return Array.from(new Set(services.flatMap((s) => s.knowsAbout)));
}

/** Hlavný LocalBusiness uzol: jediný zdroj pravdy o firme. */
export function localBusinessSchema(locale: Locale) {
  const node: Record<string, unknown> = {
    "@type": "HomeAndConstructionBusiness",
    "@id": ids.business,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    telephone: contact.phoneE164,
    email: contact.email,
    // Jednoznačný štátny identifikátor (IČO): pomáha AI odlíšiť firmu od
    // podobne pomenovaných subjektov.
    identifier: [
      { "@type": "PropertyValue", propertyName: "IČO", value: contact.ico.replace(/\s/g, "") },
    ],
    knowsAbout: uniqueKnowsAbout(),
    priceRange: "€€",
    foundingDate: String(site.foundingYear),
    description: tagline[locale],
    inLanguage: langTag(locale),
    areaServed: areaServed(),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
      geoRadius: 40000,
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      postalCode: contact.address.postalCode,
      addressCountry: "SK",
    },
    openingHoursSpecification: openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    founder: { "@id": ids.owner },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "sk" ? "Služby výškového čistenia" : "High-rise cleaning services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name[locale], url: urlFor(s.slug, locale) },
      })),
    },
  };

  const sa = sameAs();
  if (sa.length) node.sameAs = sa;

  // AggregateRating IBA s reálnymi recenziami (anti-fake).
  if (reviews.count > 0) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviews.rating,
      reviewCount: reviews.count,
      bestRating: 5,
    };
  }

  return node;
}

export function websiteSchema(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: site.name,
    inLanguage: langTag(locale),
    publisher: { "@id": ids.business },
  };
}

/** Person uzol pre /o-nas: „kto" za firmou (E-E-A-T). */
export function ownerSchema(locale: Locale) {
  return {
    "@type": "Person",
    "@id": ids.owner,
    name: contact.owner,
    jobTitle: locale === "sk" ? "Konateľ a majiteľ" : "Managing director & owner",
    worksFor: { "@id": ids.business },
    description:
      locale === "sk"
        ? `${contact.owner} vedie ${site.legalName} a zabezpečuje výškové čistenie a prácu vo výške v Bratislave a okolí.`
        : `${contact.owner} leads ${site.legalName} and provides high-rise cleaning and work at height in Bratislava and the region.`,
  };
}

/** Service uzol pre konkrétnu službovú stránku. */
export function serviceSchema(opts: {
  name: string;
  slug: Href;
  description: string;
  locale: Locale;
}) {
  return {
    "@type": "Service",
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: urlFor(opts.slug, opts.locale),
    provider: { "@id": ids.business },
    areaServed: areaServed(),
    inLanguage: langTag(opts.locale),
  };
}

export type FaqItem = { q: string; a: string };

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** Breadcrumb: caller dodá absolútne URL (napr. cez urlFor). */
export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.url,
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  url: string;
  excerpt: string;
  date: string;
  updated?: string;
  image?: string;
  locale: Locale;
}) {
  const node: Record<string, unknown> = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: post.url,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: langTag(post.locale),
    author: { "@id": ids.owner },
    publisher: { "@id": ids.business },
    mainEntityOfPage: post.url,
  };
  if (post.image) node.image = post.image;
  return node;
}

/** Zabalí uzly do jedného @graph dokumentu. */
export function graph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
