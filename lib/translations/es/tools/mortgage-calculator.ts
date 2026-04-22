import type { ToolTranslation } from "@/lib/i18n";

// Native LA Spanish — NOT literal translation of the English copy. Key
// native terms used: "hipoteca" (mortgage), "cuota mensual" (monthly
// payment), "plazo" (term), "enganche" / "inicial" (down payment).
// Currency defaults to MXN via locale config; the math is unitless.
export const MORTGAGE_CALCULATOR_ES: ToolTranslation = {
  slug: "mortgage-calculator",
  locale: "es",
  title: "Calculadora de hipoteca — pago mensual, intereses y amortización",
  description:
    "Calcula la cuota mensual de tu hipoteca con intereses, plazo y enganche. Incluye tabla de amortización mes a mes. Gratis, sin registro y corre en tu navegador.",
  h1: "Calculadora de hipoteca",
  eyebrow: "Herramienta gratuita · Finanzas",
  explainer: [
    "Ingresa el monto del préstamo, la tasa de interés anual y el plazo en años para ver la cuota mensual, el total de intereses pagados y la tabla completa de amortización. La fórmula es la misma que usan los bancos: no calculamos comisiones ocultas, seguros ni impuestos a menos que tú los añadas explícitamente.",
    "Úsala para comparar ofertas de distintos bancos, ver cuánto ahorras si bajas el plazo de 30 a 15 años, o para saber si conviene pagar más cada mes y terminar antes. Todo pasa en tu navegador: no enviamos nada a un servidor, y nunca te pedimos registro ni correo.",
  ],
  howToUse: [
    "Escribe el monto total que pedirás prestado (sin contar el enganche).",
    "Pon la tasa de interés anual que te ofrecen, como 7.5 o 8.9.",
    "Elige el plazo del crédito en años. Los más comunes son 15, 20 y 30.",
    "Revisa la cuota mensual y el total de intereses. Baja el plazo o sube el enganche para ver cómo cambia el costo total.",
    "Abre la tabla de amortización para ver, mes a mes, cuánto se va a capital y cuánto a intereses.",
  ],
  howItWorks: [
    "La fórmula de amortización estándar calcula una cuota fija mensual que cubre capital más intereses durante todo el plazo. Al inicio, la mayor parte del pago va a intereses; con el tiempo, cada mes se destina más al capital.",
    "Si subes el enganche o haces pagos anticipados a capital, los intereses totales bajan de forma significativa — a veces decenas de miles. Esta calculadora refleja ese efecto en tiempo real.",
  ],
  whenToUse: [
    "Antes de firmar una hipoteca, para validar que el banco esté calculando bien la cuota.",
    "Cuando comparas dos ofertas con tasas o plazos distintos.",
    "Para decidir si conviene pagar más cada mes o invertir esa diferencia.",
    "Al evaluar una casa: saber cuánto sería la cuota ayuda a descartar opciones rápido.",
  ],
  useCases: [
    "Primera compra de vivienda en México, con enganche del 10–20%.",
    "Refinanciamiento de una hipoteca existente a una tasa más baja.",
    "Cálculo de cuánto casa puedes pagar con un ingreso mensual dado.",
    "Simulación del efecto de pagos extra al capital (abono a capital).",
  ],
  faq: [
    {
      q: "¿La calculadora incluye impuesto predial y seguro?",
      a: "No por defecto. La cuota que ves es solo capital más intereses. Si quieres la cuota PITI completa (principal, intereses, impuestos, seguro), suma el predial anual y el seguro de vivienda divididos entre 12 y agrégalos al resultado.",
    },
    {
      q: "¿Funciona con tasas variables o solo fijas?",
      a: "El cálculo asume tasa fija durante todo el plazo. Si tienes una hipoteca con tasa variable, úsala como estimación del tramo fijo inicial y vuelve a calcular cuando la tasa se ajuste.",
    },
    {
      q: "¿Qué tan preciso es el resultado?",
      a: "Usa la misma fórmula de amortización que los bancos. La diferencia de centavos frente al estado de cuenta real suele venir de cómo el banco redondea o cobra comisiones no incluidas aquí.",
    },
    {
      q: "¿Guardan mis datos?",
      a: "No. Todo el cálculo se hace en tu navegador. No enviamos montos, tasas ni nada a ningún servidor. No se necesita correo ni cuenta.",
    },
    {
      q: "¿Puedo ver la tabla de amortización mes por mes?",
      a: "Sí. Al calcular, se muestra la tabla con el capital pagado, los intereses y el saldo restante cada mes. Puedes copiarla o descargarla para llevar registro.",
    },
    {
      q: "¿Funciona para créditos INFONAVIT o FOVISSSTE?",
      a: "Sirve como estimación general, pero estos créditos en México usan Veces Salario Mínimo (VSM) y ajustes anuales que no aparecen aquí. Para créditos sociales, úsala como punto de partida y verifica con el simulador oficial.",
    },
  ],
};
