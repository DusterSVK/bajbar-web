import { getPathname } from "@/i18n/navigation";
import { site, contact, districts, towns } from "@/lib/config";
import { services } from "@/lib/services";
import { generalFaqs } from "@/lib/faqs";
import { postsByLocale } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";

type Href = Parameters<typeof getPathname>[0]["href"];
const U = (href: Href, locale: Locale = "sk") => `${site.url}${getPathname({ href, locale })}`;

/**
 * /llms.txt, štandard llmstxt.org: Markdown prehľad webu pre LLM/AI agentov
 * (ChatGPT, Perplexity, Gemini…). Generuje sa z tých istých dát ako web
 * (lib/config, lib/services, lib/faqs, lib/blog), takže ostáva v súlade.
 */
function build(): string {
  const L: string[] = [];

  L.push(`# ${site.name} (${site.legalName})`);
  L.push("");
  L.push(
    `> Výškové čistenie a práca vo výške v Bratislave a okolí, teda čistenie a umývanie fasád, umývanie okien vo výškach, čistenie budov a výškové práce technikou lanového prístupu. Telefón ${contact.phoneDisplay}.`
  );
  L.push("");
  L.push(`Kľúčové fakty:`);
  L.push(`- Sídlo: ${contact.address.street}, ${contact.address.postalCode} ${contact.address.city} (${contact.address.district}). IČO ${contact.ico}. Konateľ: ${contact.owner}.`);
  L.push(`- Oblasť pôsobenia: Bratislava (${districts.join(", ")}) a okolie (${towns.join(", ")}); po dohode celé Slovensko.`);
  L.push(`- Práca vo výške: lanový prístup (industrial rope access) aj vysokozdvižné plošiny, bez potreby lešenia.`);
  L.push(`- Poistenie zodpovednosti za škodu. Cena vždy individuálna, nezáväzná ponuka zvyčajne do 24 hodín.`);
  L.push(`- Kontakt: telefón ${contact.phoneDisplay}, e-mail ${contact.email}.`);
  L.push("");

  L.push(`## Služby`);
  for (const s of services) {
    L.push(`- [${s.name.sk}](${U(s.slug)}): ${s.excerpt.sk}`);
  }
  L.push("");

  L.push(`## Dôležité stránky`);
  L.push(`- [Cenník](${U("/cennik")}): ako sa tvorí cena a čo ju ovplyvňuje.`);
  L.push(`- [Kontakt](${U("/kontakt")}): telefón, e-mail a nezáväzný dopytový formulár.`);
  L.push(`- [Časté otázky](${U("/faq")}): odpovede o cenách, bezpečnosti a postupe.`);
  L.push(`- [O nás](${U("/o-nas")}): o firme a firemné údaje.`);
  L.push(`- [Referencie](${U("/referencie")}): typy realizácií.`);
  L.push("");

  L.push(`## Časté otázky`);
  for (const f of generalFaqs) {
    L.push(`- ${f.q.sk} ${f.a.sk}`);
  }
  L.push("");

  const skPosts = postsByLocale("sk");
  if (skPosts.length) {
    L.push(`## Blog`);
    for (const p of skPosts) {
      L.push(`- [${p.title}](${U({ pathname: "/blog/[slug]", params: { slug: p.slug } })}): ${p.excerpt}`);
    }
    L.push("");
  }

  L.push(`## English`);
  L.push(`> High-rise cleaning and work at height in Bratislava, including facade cleaning, high-rise window cleaning, building cleaning and rope access. English version: ${U("/", "en")}`);
  for (const s of services) {
    L.push(`- [${s.name.en}](${U(s.slug, "en")}): ${s.excerpt.en}`);
  }
  L.push("");

  return L.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
