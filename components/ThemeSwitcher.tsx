"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type ThemeId = "steel" | "cyan" | "emerald";

const THEMES: { id: ThemeId; bg: string; dot: string }[] = [
  { id: "steel", bg: "#f4f6f9", dot: "#475569" },
  { id: "cyan", bg: "#06080d", dot: "#4bbcff" },
  { id: "emerald", bg: "#05100b", dot: "#35e6a2" },
];

const KEY = "bajbar-theme";

/**
 * Plávajúci prepínač farebnej témy, klient si preklikne web v 3 farbách naživo.
 * Ukladá voľbu do localStorage; no-flash pri načítaní rieši ThemeScript.
 */
export function ThemeSwitcher() {
  const t = useTranslations("Theme");
  const [theme, setTheme] = useState<ThemeId>("steel");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const cur = (document.documentElement.dataset.theme as ThemeId) || "steel";
    setTheme(cur);
  }, []);

  function pick(id: ThemeId) {
    document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem(KEY, id);
    } catch {}
    setTheme(id);
  }

  const active = THEMES.find((x) => x.id === theme) ?? THEMES[0];

  return (
    <div className="fixed bottom-3 right-3 z-[55] flex items-center gap-2">
      {open && (
        <div className="flex items-center gap-2 rounded-full border border-hairline bg-surface/90 px-3 py-2 shadow-lg backdrop-blur">
          <span className="pl-1 pr-1 text-xs font-semibold text-muted">{t("label")}</span>
          {THEMES.map((th) => (
            <button
              key={th.id}
              type="button"
              onClick={() => pick(th.id)}
              title={t(th.id)}
              aria-label={t(th.id)}
              aria-pressed={th.id === theme}
              className={`grid h-7 w-7 place-items-center rounded-full transition-transform hover:scale-110 ${
                th.id === theme ? "ring-2 ring-offset-1 ring-brand-600 ring-offset-surface" : ""
              }`}
              style={{ background: th.bg, boxShadow: "inset 0 0 0 1px rgba(128,128,128,.25)" }}
            >
              <span className="h-3 w-3 rounded-full" style={{ background: th.dot }} />
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t("pick")}
        title={t("pick")}
        className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-surface/90 shadow-lg backdrop-blur transition-transform hover:scale-105"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full" style={{ background: active.bg, boxShadow: "inset 0 0 0 1px rgba(128,128,128,.25)" }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: active.dot }} />
        </span>
      </button>
    </div>
  );
}
