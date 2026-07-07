import type { MetadataRoute } from "next";
import { site } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description:
      "Výškové čistenie a práca vo výške v Bratislave, teda čistenie fasád, umývanie okien vo výškach a čistenie budov.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f9fc",
    theme_color: "#1f4e8c",
    icons: [{ src: "/icon", sizes: "512x512", type: "image/png" }],
  };
}
