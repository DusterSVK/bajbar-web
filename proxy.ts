import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Spracuj všetky cesty okrem API, interných Next assetov a súborov s príponou
  // (sitemap.xml, robots.txt, llms.txt, opengraph-image, favicon...).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
