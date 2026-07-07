"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Prepínač jazyka. Zachová aktuálnu stránku a prepne len jazyk (vrátane
 * lokalizovaného slugu, napr. /cistenie-fasad ↔ /en/facade-cleaning).
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      // params zabezpečí správne prepnutie aj pri dynamických trasách (/blog/[slug]).
      router.replace(
        // @ts-expect-error -- pathname + params je platná kombinácia pre next-intl
        { pathname, params },
        { locale: next }
      );
    });
  }

  return (
    <div className={`inline-flex items-center rounded-full ring-1 ring-brand-200 bg-surface/70 p-0.5 text-xs font-semibold ${className}`}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          disabled={isPending}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            l === locale ? "bg-brand-600 text-accent-fg" : "text-brand-700 hover:bg-brand-50"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
