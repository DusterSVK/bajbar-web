import { Link } from "@/i18n/navigation";
import type { Locale, AppPathname } from "@/i18n/routing";

/**
 * Plávajúci prepínač DEMO ukážok. Zobrazuje sa len na noindex ukážkových
 * stránkach, aby si klient vedel jedným klikom preklikať jednotlivé dizajnové
 * smery a vrátiť sa na rozcestník. Vlastné (hardcoded) farby, aby bol čitateľný
 * na svetlej aj tmavej palete ktorejkoľvek ukážky. Bez vplyvu na ostrý web.
 */

type VariantKey = "dovera" | "mriezka" | "editorial";

const VARIANTS: { key: VariantKey; href: Exclude<AppPathname, "/blog/[slug]">; label: { sk: string; en: string } }[] = [
  { key: "dovera", href: "/ukazka-dovera", label: { sk: "Veža dôvery", en: "Trust Tower" } },
  { key: "mriezka", href: "/ukazka-mriezka", label: { sk: "Presná mriežka", en: "Swiss Grid" } },
  { key: "editorial", href: "/ukazka", label: { sk: "Editoriál", en: "Editorial" } },
];

export function DemoNav({ current, locale }: { current: VariantKey; locale: Locale }) {
  const allLabel = locale === "sk" ? "Všetky" : "All";
  const tag = locale === "sk" ? "Ukážka dizajnu" : "Design demo";

  return (
    <div
      role="navigation"
      aria-label={tag}
      style={{
        position: "fixed",
        left: "50%",
        bottom: "18px",
        transform: "translateX(-50%)",
        zIndex: 60,
        maxWidth: "calc(100vw - 24px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 8px 6px 14px",
          borderRadius: "999px",
          background: "rgba(12, 18, 28, 0.86)",
          boxShadow: "0 18px 44px -16px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.10)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          flexWrap: "nowrap",
          overflowX: "auto",
        }}
      >
        <span
          style={{
            fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', monospace",
            fontSize: "9.5px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.55)",
            whiteSpace: "nowrap",
            paddingRight: "2px",
          }}
        >
          {tag}
        </span>
        {VARIANTS.map((v) => {
          const active = v.key === current;
          return (
            <Link
              key={v.key}
              href={v.href}
              aria-current={active ? "page" : undefined}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "7px 13px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                textDecoration: "none",
                transition: "background-color .2s ease, color .2s ease",
                background: active ? "#3b8cf0" : "transparent",
                color: active ? "#04101c" : "rgba(255,255,255,.82)",
                boxShadow: active ? "none" : "inset 0 0 0 1px rgba(255,255,255,.14)",
              }}
            >
              {v.label[locale]}
            </Link>
          );
        })}
        <span aria-hidden style={{ width: "1px", height: "22px", background: "rgba(255,255,255,.16)", margin: "0 2px" }} />
        <Link
          href="/ukazky"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "7px 13px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            textDecoration: "none",
            color: "rgba(255,255,255,.82)",
            background: "transparent",
          }}
        >
          <span aria-hidden style={{ fontSize: "14px", lineHeight: 1 }}>⊞</span>
          {allLabel}
        </Link>
      </div>
    </div>
  );
}
