"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, CONSENT_KEY } from "./cookie-consent-shared";

/**
 * GA4 sa načíta AŽ po udelení súhlasu (cookie banner). Bez NEXT_PUBLIC_GA_ID
 * sa nič nenačíta (napr. na dev/preview).
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const read = () => setGranted(localStorage.getItem(CONSENT_KEY) === "granted");
    read();
    window.addEventListener(CONSENT_EVENT, read);
    return () => window.removeEventListener(CONSENT_EVENT, read);
  }, []);

  if (!gaId || !granted) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
