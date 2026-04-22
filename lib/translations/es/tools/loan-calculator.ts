import type { ToolTranslation } from "@/lib/i18n";

export const LOAN_CALCULATOR_ES: ToolTranslation = {
  slug: "loan-calculator",
  locale: "es",
  title: "Calculadora de préstamos — cuota mensual, intereses y amortización",
  description:
    "Calcula la cuota mensual de cualquier préstamo: personal, auto, negocio o consumo. Incluye tabla de amortización. Gratis, sin registro, en tu navegador.",
  h1: "Calculadora de préstamos",
  eyebrow: "Herramienta gratuita · Finanzas",
  explainer: [
    "Esta calculadora de préstamos te da la cuota mensual exacta de cualquier crédito a tasa fija: personal, automotriz, de negocio o de consumo. Solo necesitas tres datos — monto, tasa anual y plazo — y obtienes el pago mensual, el total de intereses pagados y la tabla completa de amortización.",
    "Diseñada para decisiones rápidas: comparar dos ofertas bancarias, validar que el banco calculó bien, o entender cuánto te ahorras con un plazo más corto. Corre completa en tu navegador — no hay servidor, no pedimos correo, no guardamos nada.",
  ],
  howToUse: [
    "Ingresa el monto total del préstamo.",
    "Escribe la tasa de interés anual ofrecida por el banco (ej. 12.5).",
    "Elige el plazo en meses o años según te convenga.",
    "Revisa la cuota mensual y el total de intereses que pagarás.",
    "Abre la tabla de amortización para ver mes a mes cuánto es capital y cuánto intereses.",
  ],
  howItWorks: [
    "Se usa la fórmula de amortización estándar que combina capital más intereses en una cuota fija durante todo el plazo. Los primeros meses pagas más intereses y menos capital; al final se invierte la proporción.",
    "Hacer pagos extra al capital reduce de forma significativa el total de intereses. Puedes probar escenarios: subir la cuota un 10%, o añadir un abono extraordinario al año, y ver cuántos meses te ahorras.",
  ],
  whenToUse: [
    "Al solicitar un préstamo personal o de auto, para validar la cuota mensual antes de firmar.",
    "Comparando dos ofertas con tasas o plazos distintos.",
    "Evaluando si puedes pagar más y terminar antes sin estirarte.",
    "Planificando el presupuesto mensual con base en la cuota real del crédito.",
  ],
  useCases: [
    "Préstamo personal para consolidar deudas de tarjeta de crédito.",
    "Crédito automotriz nuevo o usado a 36, 48 o 60 meses.",
    "Préstamo de negocio para capital de trabajo o equipo.",
    "Crédito de consumo en línea ofrecido por fintechs mexicanas.",
  ],
  faq: [
    {
      q: "¿Qué diferencia hay entre capital e intereses en la cuota?",
      a: "La cuota mensual se divide en dos partes: capital (reduce el saldo que debes) e intereses (el costo del crédito). Al inicio del plazo, la mayor parte de cada pago es interés; al final, casi todo es capital. La tabla de amortización te muestra esa división mes a mes.",
    },
    {
      q: "¿Puedo simular pagos anticipados a capital?",
      a: "Sí. Aumentar la cuota mensual o hacer un abono extraordinario al capital reduce los intereses totales y el plazo. Cambia los valores en la calculadora y compara los totales para ver el ahorro exacto.",
    },
    {
      q: "¿Incluye comisiones de apertura o seguro?",
      a: "No por defecto. El cálculo es puramente la cuota capital + intereses. Si tu banco cobra comisión de apertura, seguro de vida o seguro de desempleo, súmalos aparte para ver el costo total verdadero.",
    },
    {
      q: "¿Funciona con tasas variables?",
      a: "La calculadora asume tasa fija. Si tu préstamo es a tasa variable (TIIE, UDIS, etc.), úsala como estimación puntual para la tasa actual y recalcula cuando cambie.",
    },
    {
      q: "¿Cómo sé si la tasa que me ofrecen es justa?",
      a: "Compara con la tasa promedio del mercado para ese tipo de préstamo. En México, la CNBV publica promedios. Si tu oferta está muy por encima, negocia o busca otra institución.",
    },
    {
      q: "¿Qué es el CAT y dónde lo veo?",
      a: "El Costo Anual Total (CAT) es la tasa que incluye intereses más todas las comisiones y seguros obligatorios. Es la única forma confiable de comparar ofertas. El banco debe dártelo por ley; pídelo por escrito antes de firmar.",
    },
  ],
};
