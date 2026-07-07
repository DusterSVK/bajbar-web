"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONSENT_EVENT, CONSENT_KEY } from "./cookie-consent-shared";

/** Cookie lišta. Analytické cookies sa spustia iba po „Súhlasím". */
export function CookieConsent() {
  const t = useTranslations("Cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  function decide(value: "granted" | "denied") {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl">
      <div className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-body">
          {t("text")}{" "}
          <Link href="/ochrana-osobnych-udajov" className="font-medium text-brand-700 hover:underline">
            {t("moreInfo")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => decide("denied")} className="btn-secondary text-xs">
            {t("reject")}
          </button>
          <button type="button" onClick={() => decide("granted")} className="btn-primary text-xs">
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
