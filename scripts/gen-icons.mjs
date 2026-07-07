/**
 * Vygeneruje statické PNG ikony (favicon + PWA manifest) z emblému loga
 * (public/brand/mark.png) cez sharp. Spusti: node scripts/gen-icons.mjs
 * Statické súbory sú spoľahlivé (žiadny dynamický /icon route, ktorý zlyhával na Verceli).
 */
import sharp from "sharp";
import fs from "fs";

const MARK = "public/brand/mark.png";

async function gen(size, out) {
  const pad = Math.round(size * 0.1);
  const inner = size - pad * 2;
  const emblem = await sharp(MARK)
    .resize(inner, inner, { fit: "contain", background: "#ffffff" })
    .toBuffer();
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(size * 0.2)}" fill="#ffffff"/></svg>`
  );
  await sharp(bg).composite([{ input: emblem, top: pad, left: pad }]).png().toFile(out);
  console.log(`✓ ${out} (${size}px, ${fs.statSync(out).size} B)`);
}

await gen(512, "app/icon.png");        // favicon do <head> (statický, konvencia Next)
await gen(192, "public/icon-192.png"); // PWA manifest
await gen(512, "public/icon-512.png"); // PWA manifest
console.log("Hotovo.");
