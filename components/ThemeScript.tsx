/**
 * No-flash skript: nastaví data-theme na <html> ešte pred vykreslením, aby pri
 * tmavej téme neblikla svetlá. Vkladá sa ako prvý prvok v <body>.
 */
export function ThemeScript() {
  const js = `(function(){try{var k="bajbar-theme";var t=localStorage.getItem(k);var v=["steel","cyan","emerald"];if(!t||v.indexOf(t)<0)t="steel";document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="steel";}})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
