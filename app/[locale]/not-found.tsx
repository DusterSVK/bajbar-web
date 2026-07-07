import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <section className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">{t("title")}</h1>
      <p className="prose-lead mt-3 max-w-md">{t("text")}</p>
      <Link href="/" className="btn-primary mt-8">{t("back")}</Link>
    </section>
  );
}
