import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SITE_NAME, SITE_URL } from "@/lib/pages";
import { getCommon, translatedSlugs, getToolTranslation, getGuideTranslation } from "@/lib/translations";
import { LOCALE_META } from "@/lib/i18n";

const LOCALE = "es" as const;

export const metadata: Metadata = {
  title: "Free Tool Arena — Herramientas gratuitas y guías en español",
  description:
    "Calculadoras financieras, convertidores y guías prácticas, gratis y sin registro. Funcionan directo en tu navegador. Versión en español.",
  alternates: {
    canonical: `${SITE_URL}/es`,
    languages: {
      en: `${SITE_URL}/`,
      es: `${SITE_URL}/es`,
      "x-default": `${SITE_URL}/`,
    },
  },
  openGraph: {
    title: `${SITE_NAME} — Herramientas gratuitas en español`,
    description:
      "Calculadoras financieras, convertidores y guías prácticas, gratis y sin registro.",
    url: `${SITE_URL}/es`,
    siteName: SITE_NAME,
    locale: "es",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function EsHomePage() {
  const common = getCommon(LOCALE);
  const toolSlugs = translatedSlugs(LOCALE, "tool");
  const guideSlugs = translatedSlugs(LOCALE, "guide");
  const prefix = LOCALE_META[LOCALE].urlPrefix;

  return (
    <Container className="py-10">
      <LanguageSwitcher
        available={["en", "es"]}
        currentLocale={LOCALE}
        basePath="/"
        label={common.languageSwitcher.label}
      />

      <PageHeader
        eyebrow="Free Tool Arena · Español"
        title="Herramientas gratuitas y guías prácticas"
        lede="Calculadoras financieras, convertidores y guías que resuelven problemas reales. Sin registros, sin descargas, directo en tu navegador."
      />

      <section className="mb-14">
        <h2 className="mb-5 text-xl font-bold text-slate-900">Herramientas</h2>
        {toolSlugs.length === 0 ? (
          <p className="text-slate-600">
            Próximamente. Mientras tanto, usa{" "}
            <Link href="/" className="text-brand underline-offset-2 hover:underline">
              la versión en inglés
            </Link>
            .
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {toolSlugs.map((slug) => {
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
      </section>

      <section className="mb-14">
        <h2 className="mb-5 text-xl font-bold text-slate-900">Guías</h2>
        {guideSlugs.length === 0 ? (
          <p className="text-slate-600">Próximamente.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {guideSlugs.map((slug) => {
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
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
        <p>
          Estamos ampliando la biblioteca en español de forma progresiva. Las herramientas y guías que aún no están traducidas siguen disponibles en{" "}
          <Link href="/" className="font-semibold text-brand hover:underline">
            la versión en inglés
          </Link>
          .
        </p>
      </section>
    </Container>
  );
}
