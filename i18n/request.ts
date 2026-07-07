import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * Načítanie správ (UI reťazcov) pre aktuálny request. Obsah stránok (služby,
 * FAQ, blog) žije v typovaných dátových moduloch v `lib/`; tu sú len UI reťazce
 * z `messages/<locale>.json`.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
