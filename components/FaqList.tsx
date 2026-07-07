/** Natívny prístupný FAQ zoznam (details/summary). FAQPage JSON-LD sa pridáva na stránke. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-hairline overflow-hidden rounded-2xl bg-surface ring-1 ring-hairline">
      {items.map((it, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {it.q}
            <svg className="h-4 w-4 shrink-0 text-brand-600 transition-transform group-open:rotate-45" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-body">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
