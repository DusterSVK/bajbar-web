import { Link } from "@/i18n/navigation";

export type Crumb = { label: string; href?: Parameters<typeof Link>[0]["href"] };

/** Vizuálna drobčeková navigácia. JSON-LD BreadcrumbList sa pridáva na stránke. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Drobčeková navigácia" className="container-page pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <Link href={c.href} className="hover:text-brand-700">{c.label}</Link>
              ) : (
                <span className={last ? "text-body" : ""} aria-current={last ? "page" : undefined}>{c.label}</span>
              )}
              {!last && <span aria-hidden className="text-muted/50">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
