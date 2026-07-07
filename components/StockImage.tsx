import Image from "next/image";
import { img, type StockKey } from "@/lib/images";
import type { Locale } from "@/i18n/routing";

/**
 * Fotka z /public/img s alt textom a kreditom fotografa (Unsplash).
 * Používa next/image (optimalizácia). Rám a kredit sú theme-safe (tokeny).
 */
export function StockImage({
  imageKey,
  locale,
  className = "",
  aspect = "aspect-[16/9]",
  rounded = "rounded-3xl",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 1100px",
  credit = true,
}: {
  imageKey: StockKey;
  locale: Locale;
  className?: string;
  aspect?: string;
  rounded?: string;
  priority?: boolean;
  sizes?: string;
  credit?: boolean;
}) {
  const it = img(imageKey);
  return (
    <figure className={className}>
      <div className={`relative ${aspect} overflow-hidden ${rounded} bg-surface-2 ring-1 ring-hairline`}>
        <Image
          src={it.src}
          alt={it.alt[locale]}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
      {credit && (
        <figcaption className="mt-1.5 text-right text-[11px] text-muted">
          Foto:{" "}
          <a href={it.credit.url} target="_blank" rel="noopener nofollow" className="hover:underline">
            {it.credit.name}
          </a>{" "}
          / Unsplash
        </figcaption>
      )}
    </figure>
  );
}
