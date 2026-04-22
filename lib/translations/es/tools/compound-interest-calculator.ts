import type { ToolTranslation } from "@/lib/i18n";

export const COMPOUND_INTEREST_CALCULATOR_ES: ToolTranslation = {
  slug: "compound-interest-calculator",
  locale: "es",
  title: "Calculadora de interés compuesto — inversión, ahorro y proyección",
  description:
    "Calcula el crecimiento de tu inversión o ahorro con interés compuesto. Proyecta capital final, intereses ganados y aportaciones mensuales. Gratis.",
  h1: "Calculadora de interés compuesto",
  eyebrow: "Herramienta gratuita · Finanzas",
  explainer: [
    "Ingresa el monto inicial, la aportación mensual, la tasa de rendimiento anual y los años que piensas mantener la inversión. La calculadora te muestra el capital final, cuánto aportaste tú en total y cuánto ganaste solo por intereses compuestos.",
    "El interés compuesto es el motor que hace crecer el ahorro a largo plazo: los intereses generados cada periodo empiezan a generar más intereses. Si empiezas joven y dejas correr el tiempo, los números son sorprendentes. Corre en tu navegador, sin cuenta, sin datos enviados.",
  ],
  howToUse: [
    "Escribe el monto inicial que inviertes hoy.",
    "Añade la aportación mensual que planeas seguir haciendo.",
    "Pon la tasa de rendimiento anual esperada (ej. 10 para un índice bursátil de largo plazo, 4 para CETES).",
    "Elige cuántos años dejarás que crezca.",
    "Revisa el capital final, el total aportado y los intereses ganados.",
  ],
  howItWorks: [
    "La fórmula del interés compuesto es A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) − 1) / (r/n)], donde P es el capital inicial, PMT es el aporte periódico, r la tasa anual, n la frecuencia de capitalización y t el tiempo en años.",
    "Cada periodo, los intereses generados se suman al capital y comienzan a generar intereses sobre sí mismos. La clave del interés compuesto no es la tasa, es el tiempo: duplicar el plazo más que cuadruplica el resultado.",
  ],
  whenToUse: [
    "Al planear un fondo de retiro con aportaciones mensuales.",
    "Para proyectar el crecimiento de un ahorro programado (universidad, enganche de casa).",
    "Al comparar fondos de inversión con distintas tasas de rendimiento histórico.",
    "Para visualizar el efecto de empezar a invertir 5 años antes vs 5 años después.",
  ],
  useCases: [
    "Fondo de retiro con aportes a AFORE voluntaria o brokerage.",
    "Ahorro para enganche de casa a 3–5 años.",
    "Fondo universitario para un hijo, a 18 años.",
    "Comparación del efecto del tiempo — mismo monto, distintos años.",
  ],
  faq: [
    {
      q: "¿Qué tasa realista puedo usar para proyectar?",
      a: "Depende del instrumento. Para CETES o ahorro bancario, 4–7% anual en México. Para un índice bursátil global a 20+ años, históricamente 8–10% antes de inflación. No uses rendimientos prometidos de esquemas dudosos como tasa proyectada.",
    },
    {
      q: "¿Incluye inflación el resultado?",
      a: "No. El capital final que ves está en términos nominales. Para saber el poder adquisitivo real, resta la tasa de inflación esperada (aprox. 4% anual en México) de tu tasa de rendimiento para tener un 'rendimiento real'.",
    },
    {
      q: "¿Qué diferencia hay entre interés simple y compuesto?",
      a: "En interés simple, los intereses solo se calculan sobre el capital inicial. En compuesto, también se generan intereses sobre los intereses ya acumulados. A 30 años, la diferencia es enorme: el compuesto puede crecer 3–5× más.",
    },
    {
      q: "¿Vale la pena empezar con poco dinero?",
      a: "Sí. El interés compuesto recompensa el tiempo más que el monto. $500 al mes durante 30 años rinde más que $2000 al mes durante 10 años, aunque aportes lo mismo en total. Empezar pronto es la decisión con mayor impacto.",
    },
    {
      q: "¿Guardan mis datos financieros?",
      a: "No. Toda la calculadora corre en tu navegador. Ningún dato viaja a un servidor, no se pide correo ni cuenta.",
    },
    {
      q: "¿Cómo lo uso para un plan de retiro?",
      a: "Calcula cuánto necesitarás al jubilarte (regla rápida: 25× tu gasto anual). Luego usa la calculadora al revés: define el monto objetivo, los años hasta el retiro y una tasa conservadora, y ajusta la aportación mensual hasta alcanzar el objetivo.",
    },
  ],
};
