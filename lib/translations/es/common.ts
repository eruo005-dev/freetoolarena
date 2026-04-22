import type { CommonStrings } from "@/lib/i18n";

// Neutral Latin American Spanish. Verbs use second-person singular
// "tú" for direct friendliness (standard in LA marketing copy); swap
// to "usted" if targeting enterprise or Spain more heavily later.
export const COMMON: CommonStrings = {
  skipToContent: "Saltar al contenido",
  nav: {
    tools: "Herramientas",
    guides: "Guías",
    hubs: "Listas seleccionadas",
    learn: "Glosario",
    compare: "Comparar",
  },
  footer: {
    browse: "Explorar",
    curatedLists: "Listas seleccionadas",
    guideSections: "Secciones de guías",
    trust: "Confianza y seguridad",
    legal: "Legal",
    rights: "Todos los derechos reservados.",
  },
  advertisement: "Publicidad",
  updatedOn: (date) => `Actualizado en ${date}`,
  breadcrumb: {
    home: "Inicio",
    tools: "Herramientas",
    guides: "Guías",
  },
  trust: {
    noDownload: "Sin descargas",
    browserOnly: "Funciona directo en tu navegador",
    noSignup: "Sin registro",
    noDataStored: "No guardamos tus datos en nuestros servidores",
  },
  toolShell: {
    whatItDoes: "Para qué sirve",
    howToUseIt: "Cómo usarla",
    howItWorks: "Cómo funciona",
    whenToUse: "Cuándo usar esta herramienta",
    whenNotToUse: "Cuándo no usarla",
    commonUseCases: "Casos de uso frecuentes",
    faq: "Preguntas frecuentes",
    relatedTools: "Herramientas relacionadas",
    supportingGuides: "Guías complementarias",
    exampleInput: "Entrada",
    exampleOutput: "Resultado",
  },
  languageSwitcher: {
    label: "Idioma",
    currentLanguage: "Idioma actual",
  },
};
