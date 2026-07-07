/** Orez horného loga zo zdrojového sheetu (public/brand/logo-source.png). */
import sharp from "sharp";

const SRC = "public/brand/logo-source.png";
const trim = { background: "#ffffff", threshold: 20 };

async function crop(box, out) {
  const buf = await sharp(SRC).extract(box).png().toBuffer();
  await sharp(buf).trim(trim).png().toFile(out);
  const m = await sharp(out).metadata();
  console.log(`✓ ${out} → ${m.width}x${m.height}`);
}

// Emblém (kruhový znak budovy s pracovníkom) — nad wordmarkom
await crop({ left: 320, top: 45, width: 620, height: 565 }, "public/brand/mark.png");
// Horný lockup: emblém + "BAJBAR SERVICES" (bez malého taglinu dole)
await crop({ left: 150, top: 45, width: 960, height: 800 }, "public/brand/logo.png");
// Kompletné horné logo aj s taglinom (pre veľké použitie / OG)
await crop({ left: 120, top: 45, width: 1020, height: 850 }, "public/brand/logo-full.png");
console.log("Hotovo.");
