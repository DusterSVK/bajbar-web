/**
 * Vloží JSON-LD (@graph) do stránky. Server komponent, schéma sa vygeneruje
 * staticky do HTML, takže ju Google aj AI vyhľadávače prečítajú bez JS.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
