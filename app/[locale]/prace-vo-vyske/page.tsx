import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ServiceView, serviceMetaInput } from "@/components/ServiceView";
import { pageMeta } from "@/lib/seo";
import { getService } from "@/lib/services";
import type { Locale } from "@/i18n/routing";

const SLUG = "/prace-vo-vyske";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(serviceMetaInput(getService(SLUG)!, locale));
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServiceView service={getService(SLUG)!} locale={locale} />;
}
