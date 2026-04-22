import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_URL } from "@/lib/pages";
import { getCommon, translatedSlugs, getToolTranslation } from "@/lib/translations";
import { LOCALE_META } from "@/lib/i18n";

const LOCALE = "es" as const;

export const metadata: Metadata = {
  title: "Herramientas gratuitas en español — Free Tool Arena",
  description:
    "Calculadoras de hipoteca, préstamos e interés compuesto en español. Gratis, sin registro, funcionan directo en tu navegador.",
  alternates: {
    canonical: `${SITE_URL}/es/tools`,
    languages: {
      en: `${SITE_URL}/tools`,
      es: `${SITE_URL}/es/tools`,
      "x-default": `${SITE_URL}/tools`,
    },
  },
  openGraph: {
    title: "Herramientas gratuitas en español",
    description: "Calculadoras y utilidades en español, sin registro.",
    url: `${SITE_URL}/es/tools`,
    locale: "es",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function EsToolsIndex() {
  const common = getCommon(LOCALE);
  const slugs = translatedSlugs(LOCALE, "tool");
  const prefix = LOCALE_META[LOCALE].urlPrefix;

  return (
    <Container className="py-10">
      <LanguageSwitcher
        available={["en", "es"]}
        currentLocale={LOCALE}
        basePath="/tools"
        label={common.languageSwitcher.label}
      />

      <Breadcrumbs
        trail={[
          { label: common.breadcrumb.home, href: `${prefix}/` },
          { label: common.breadcrumb.tools, href: `${prefix}/tools` },
        ]}
      />

      <PageHeader
        eyebrow="Herramientas"
        title="Herramientas gratuitas"
        lede="Todas las herramientas disponibles en español. Sin registro, sin descargas, gratis."
      />

      {slugs.length === 0 ? (
        <p className="text-slate-600">
          Próximamente. Mientras tanto, usa{" "}
          <Link href="/tools" className="text-brand underline-offset-2 hover:underline">
            la versión en inglés
          </Link>
          .
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {slugs.map((slug) => {
            const tr = getToolTranslation(LOCALE, slug);
            if (!tr) return null;
            return (
              <li key={slug}>
                <Card href={`${prefix}/tools/${slug}`} className="p-5">
                  <CardEyebrow>Herramienta gratuita</CardEyebrow>
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
