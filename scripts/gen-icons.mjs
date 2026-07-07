/**
 * Vygeneruje statické PNG ikony (favicon + PWA manifest) zo SVG cez sharp.
 * Spusti: node scripts/gen-icons.mjs
 * Statické súbory sú spoľahlivé (žiadny dynamický /icon route, ktorý zlyhával na Verceli).
 */
import sharp from "sharp";
import fs from "fs";

const svg = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="104" fill="#1f4e8c"/>
  <text x="256" y="256" font-family="Arial, Helvetica, sans-serif" font-size="330" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="central">B</text>
</svg>`;

async function gen(size, out) {
  await sharp(Buffer.from(svg(size))).resize(size, size).png().toFile(out);
  console.log(`✓ ${out} (${size}px, ${fs.statSync(out).size} B)`);
}

await gen(512, "app/icon.png");        // favicon do <head> (statický, konvencia Next)
await gen(192, "public/icon-192.png"); // PWA manifest
await gen(512, "public/icon-512.png"); // PWA manifest
console.log("Hotovo.");
