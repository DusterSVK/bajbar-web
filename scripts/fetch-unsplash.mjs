/**
 * Stiahne relevantné fotky z Unsplash do /public/img a zapíše kredity do
 * lib/stock-images.json. Spúšťaj: node --env-file=.env.local scripts/fetch-unsplash.mjs
 *
 * Používa UNSPLASH_ACCESS_KEY (rovnaká fotobanka ako projekt optimalizaciapreai.sk).
 * Rešpektuje Unsplash API: Authorization: Client-ID, a spúšťa download_location.
 */
import fs from "fs";
import path from "path";

const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) {
  console.error("UNSPLASH_ACCESS_KEY chýba (spusti s: node --env-file=.env.local ...)");
  process.exit(1);
}

const UTM = "?utm_source=bajbar_services&utm_medium=referral";
const IMG_DIR = path.join(process.cwd(), "public", "img");
const OUT_JSON = path.join(process.cwd(), "lib", "stock-images.json");
fs.mkdirSync(IMG_DIR, { recursive: true });

/** Sloty a ich vyhľadávacie dopyty (skúšajú sa v poradí, kým sa nájde landscape). */
const SLOTS = [
  { key: "hero", queries: ["high rise window cleaning", "skyscraper window cleaner", "facade cleaning building"] },
  { key: "facade", queries: ["apartment building facade", "building facade architecture", "colorful building facade"] },
  { key: "windows", queries: ["window cleaner skyscraper", "cleaning glass windows building", "glass skyscraper reflection"] },
  { key: "heights", queries: ["rope access worker", "industrial climbing building", "climber carabiner rope"] },
  { key: "buildings", queries: ["modern office building exterior", "residential apartment building", "commercial building architecture"] },
  { key: "blog-facade", queries: ["weathered building facade", "building facade texture", "old building facade"] },
  { key: "blog-access", queries: ["aerial work platform building", "cherry picker building work", "scissor lift building"] },
  { key: "references", queries: ["glass skyscraper facade", "modern architecture building blue", "office tower glass"] },
];

const headers = { Authorization: `Client-ID ${KEY}`, "Accept-Version": "v1" };

async function search(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=5&content_filter=high`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error(`  [${query}] HTTP ${res.status}`);
    return [];
  }
  const data = await res.json();
  return data.results || [];
}

async function download(rawUrl, dest) {
  const url = `${rawUrl}&w=1600&q=75&fm=jpg&fit=crop&crop=entropy`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`img HTTP ${res.status}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

const out = {};
const usedIds = new Set(); // dedup naprieč slotmi

for (const slot of SLOTS) {
  let picked = null;
  for (const q of slot.queries) {
    const results = await search(q);
    const cand = results.find((r) => !usedIds.has(r.id));
    if (cand) {
      picked = cand;
      picked._query = q;
      usedIds.add(cand.id);
      break;
    }
  }
  if (!picked) {
    console.error(`✗ ${slot.key}: žiadny výsledok`);
    continue;
  }
  const dest = path.join(IMG_DIR, `${slot.key}.jpg`);
  try {
    await download(picked.urls.raw, dest);
    // Unsplash API compliance: nahlás "download" pri použití fotky.
    if (picked.links?.download_location) {
      await fetch(picked.links.download_location, { headers }).catch(() => {});
    }
    out[slot.key] = {
      src: `/img/${slot.key}.jpg`,
      id: picked.id,
      query: picked._query,
      altEn: picked.description || picked.alt_description || slot.key,
      photographer: picked.user?.name || "Unsplash",
      photographerUrl: (picked.user?.links?.html || "https://unsplash.com") + UTM,
    };
    console.log(`✓ ${slot.key}  [${picked._query}]  by ${out[slot.key].photographer}: ${out[slot.key].altEn.slice(0, 60)}`);
  } catch (e) {
    console.error(`✗ ${slot.key}: ${e.message}`);
  }
}

fs.writeFileSync(OUT_JSON, JSON.stringify(out, null, 2) + "\n");
console.log(`\nHotovo: ${Object.keys(out).length} fotiek → public/img/, kredity → lib/stock-images.json`);
