import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Lokalizačne uvedomelé navigačné API. VŽDY používaj tieto `Link`/`redirect`/…
 * namiesto tých z `next/navigation`, aby sa generovali správne lokalizované URL
 * (napr. `/en/facade-cleaning` namiesto `/en/cistenie-fasad`).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
