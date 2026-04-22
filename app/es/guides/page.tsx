import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_URL } from "@/lib/pages";
import { getCommon, translatedSlugs, getGuideTranslation } from "@/lib/translations";
import { LOCALE_META } from "@/lib/i18n";

const LOCALE = "es" as const;

export const metadata: Metadata = {
  title: "Guías prácticas en español — Free Tool Arena",
  description:
    "Guías claras en español: dinero, productividad, tecnología. Escritas con ejemplos concretos.",
  alternates: {
    canonical: `${SITE_URL}/es/guides`,
    languages: {
      en: `${SITE_URL}/guides`,
      es: `${SITE_URL}/es/guides`,
      "x-default": `${SITE_URL}/guides`,
    },
  },
  openGraph: {
    title: "Guías prácticas en español",
    description: "Guías claras escritas con ejemplos concretos.",
    url: `${SITE_URL}/es/guides`,
    locale: "es",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function EsGuidesIndex() {
  const common = getCommon(LOCALE);
  const slugs = translatedSlugs(LOCALE, "guide");
  const prefix = LOCALE_META[LOCALE].urlPrefix;

  return (
    <Container className="py-10">
      <LanguageSwitcher
        available={["en", "es"]}
        currentLocale={LOCALE}
        basePath="/guides"
        label={common.languageSwitcher.label}
      />

      <Breadcrumbs
        trail={[
          { label: common.breadcrumb.home, href: `${prefix}/` },
          { label: common.breadcrumb.guides, href: `${prefix}/guides` },
        ]}
      />

      <PageHeader
        eyebrow="Guías"
        title="Guías prácticas"
        lede="Escritas con ejemplos concretos, sin relleno."
      />

      {slugs.length === 0 ? (
        <p className="text-slate-600">
          Próximamente. Mientras tanto, usa{" "}
          <Link href="/guides" className="text-brand underline-offset-2 hover:underline">
            la versión en inglés
          </Link>
          .
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {slugs.map((slug) => {
            const tr = getGuideTranslation(LOCALE, slug);
            if (!tr) return null;
            return (
              <li key={slug}>
                <Card href={`${prefix}/guides/${slug}`} className="p-5">
                  <CardEyebrow>Guía</CardEyebrow>
                  <CardTitle>{tr.h1}</CardTitle>
                  <CardBody>{tr.description}</CardBody>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
