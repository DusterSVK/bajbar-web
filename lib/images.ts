import raw from "./stock-images.json";
import type { LocalizedText } from "./config";

/**
 * Obrázky (Unsplash, stiahnuté do /public/img skriptom scripts/fetch-unsplash.mjs).
 * Kredity fotografov sú v stock-images.json; alt texty píšeme ručne dvojjazyčne
 * (lepšie pre SEO než generický anglický popis z Unsplash).
 */

export type StockKey = keyof typeof raw;

export type StockImage = {
  src: string;
  alt: LocalizedText;
  credit: { name: string; url: string };
};

const ALT: Record<StockKey, LocalizedText> = {
  hero: {
    sk: "Pracovníci umývajú okná presklenej výškovej budovy technikou lanového prístupu",
    en: "Workers cleaning the windows of a glass high-rise building using rope access",
  },
  facade: {
    sk: "Fasáda výškovej budovy pri pohľade zdola",
    en: "Facade of a high-rise building seen from below",
  },
  windows: {
    sk: "Presklená fasáda budovy s množstvom okien",
    en: "Glass building facade with rows of windows",
  },
  heights: {
    sk: "Pracovníci vo výške v bezpečnostných postrojoch a ochranných prilbách",
    en: "Workers at height wearing safety harnesses and hard hats",
  },
  buildings: {
    sk: "Moderná administratívna budova s presklenou fasádou",
    en: "Modern office building with a glass facade",
  },
  "blog-facade": {
    sk: "Detail fasády budovy s pravidelným rastrom okien",
    en: "Detail of a building facade with a regular grid of windows",
  },
  "blog-access": {
    sk: "Dvaja pracovníci na vysokozdvižnej pracovnej plošine",
    en: "Two workers on an aerial work platform",
  },
  references: {
    sk: "Presklená fasáda modernej výškovej budovy",
    en: "Glass facade of a modern high-rise building",
  },
};

export function img(key: StockKey): StockImage {
  const r = raw[key];
  return {
    src: r.src,
    alt: ALT[key],
    credit: { name: r.photographer, url: r.photographerUrl },
  };
}

/** Absolútna URL obrázka (pre JSON-LD / OG). */
export const imgAbs = (key: StockKey, origin: string) => `${origin}${raw[key].src}`;
