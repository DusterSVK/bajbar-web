import type { Metadata } from "next";
import { Inter, Schibsted_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { routing, type Locale } from "@/i18n/routing";
import { Aurora } from "@/components/Aurora";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";
import { ThemeScript } from "@/components/ThemeScript";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { JsonLd } from "@/components/JsonLd";
import { graph, localBusinessSchema, websiteSchema } from "@/lib/schema";
import { site, tagline } from "@/lib/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "sk"
      ? {
          default: "Výškové čistenie a práca vo výške Bratislava | Bajbar Services",
          template: "%s | Bajbar Services",
        }
      : {
          default: "High-rise cleaning & work at height in Bratislava | Bajbar Services",
          template: "%s | Bajbar Services",
        };

  return {
    metadataBase: new URL(site.url),
    title,
    description: tagline[locale],
    applicationName: site.name,
    alternates: { canonical: "/", languages: { sk: "/", en: "/en", "x-default": "/" } },
    robots: { index: true, follow: true },
    formatDetection: { telephone: true },
    openGraph: {
      type: "website",
      siteName: site.name,
      url: site.url,
      locale: locale === "sk" ? "sk_SK" : "en_GB",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${schibsted.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ThemeScript />
        <Aurora />
        <JsonLd data={graph(localBusinessSchema(l), websiteSchema(l))} />
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
          <ThemeSwitcher />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
