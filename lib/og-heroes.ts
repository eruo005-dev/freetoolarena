import type { Category } from "./pages";

/**
 * OG image accent colors per category.
 *
 * The shared /og endpoint reads these to tint the eyebrow, accent bar, and
 * category pill for each page. Picking a distinct hue per category makes a
 * thread-of-links feel visually diverse on social — when someone shares three
 * of our pages in a Discord or Slack thread, the cards don't blur together.
 *
 * `accent` is the main color (pill background, eyebrow text). `accentDark` is
 * used for gradient corners + strong type. `tint` is the soft card background.
 * Every color is chosen to stay AA-readable against white at large text sizes,
 * so OG card titles remain legible when a scraper over-compresses the PNG.
 */
export const CATEGORY_OG_THEME: Record<
  Category,
  { accent: string; accentDark: string; tint: string }
> = {
  money:       { accent: "#0f766e", accentDark: "#115e59", tint: "#ecfdf5" }, // teal → default brand
  productivity:{ accent: "#4338ca", accentDark: "#312e81", tint: "#eef2ff" }, // indigo
  health:      { accent: "#be123c", accentDark: "#881337", tint: "#fff1f2" }, // rose
  text:        { accent: "#1d4ed8", accentDark: "#1e3a8a", tint: "#eff6ff" }, // blue
  dev:         { accent: "#6d28d9", accentDark: "#4c1d95", tint: "#f5f3ff" }, // violet
  units:       { accent: "#0369a1", accentDark: "#0c4a6e", tint: "#f0f9ff" }, // sky
  random:      { accent: "#c2410c", accentDark: "#7c2d12", tint: "#fff7ed" }, // orange
  coding:      { accent: "#0f172a", accentDark: "#020617", tint: "#f1f5f9" }, // slate (code feel)
  writing:     { accent: "#7c2d12", accentDark: "#431407", tint: "#fef3c7" }, // amber-brown
  career:      { accent: "#b45309", accentDark: "#78350f", tint: "#fffbeb" }, // amber
  home:        { accent: "#15803d", accentDark: "#14532d", tint: "#f0fdf4" }, // green
  social:      { accent: "#a21caf", accentDark: "#701a75", tint: "#fdf4ff" }, // fuchsia
  converters:  { accent: "#0e7490", accentDark: "#164e63", tint: "#ecfeff" }, // cyan
  media:       { accent: "#9333ea", accentDark: "#6b21a8", tint: "#faf5ff" }, // purple
  ai:          { accent: "#db2777", accentDark: "#9d174d", tint: "#fdf2f8" }, // pink (AI = generative vibes)
  gaming:      { accent: "#7c3aed", accentDark: "#4c1d95", tint: "#f5f3ff" }, // violet (controller glow)
};

export interface OgHero {
  /**
   * The huge, eye-catching number/text rendered in the result card.
   * Keep to 14 chars max (e.g., "$1,485/mo", "$131,345", "24.2 BMI").
   */
  value: string;
  /** Tiny label shown above the value (e.g., "Monthly payment"). */
  label: string;
  /** Optional one-line input summary shown under the value
   *  (e.g., "$25,000 · 6.5% · 5 years"). */
  inputs?: string;
}

/**
 * Pre-computed "example answer" heroes for the highest-intent calculators.
 *
 * When someone shares /tools/loan-calculator in a group chat, the OG image
 * doesn't just say "Loan Calculator" — it says "$489.25/mo from $25,000 @
 * 6.5% for 5 years." That's a meaningfully better share-CTR hook because it
 * previews the answer the user is about to compute.
 *
 * Values are hand-computed from each calculator's default inputs so we don't
 * need to run arbitrary JS at edge runtime. If a calculator's default inputs
 * change, update the hero here to match.
 *
 * Not every calculator has a hero — if unset, /og falls back to the generic
 * card layout. That's fine: coverage on the top ~30 by expected traffic is
 * enough to move the needle on social share-CTR.
 */
export const OG_HEROES: Record<string, OgHero> = {
  // ── Flagship money calculators ──
  "loan-calculator": {
    label: "Monthly payment",
    value: "$489.25/mo",
    inputs: "$25,000 · 6.5% · 5 years",
  },
  "mortgage-calculator": {
    label: "Monthly payment",
    value: "$2,129/mo",
    inputs: "$400k home · 20% down · 7% · 30 yrs",
  },
  "15-year-mortgage-calculator": {
    label: "Monthly payment",
    value: "$2,874/mo",
    inputs: "$400k home · 20% down · 6.5% · 15 yrs",
  },
  "30-year-mortgage-calculator": {
    label: "Monthly payment",
    value: "$2,129/mo",
    inputs: "$400k home · 20% down · 7% · 30 yrs",
  },
  "fha-loan-calculator": {
    label: "Monthly payment",
    value: "$2,573/mo",
    inputs: "$350k · 3.5% down · 6.75% · 30 yrs",
  },
  "car-loan-calculator": {
    label: "Monthly payment",
    value: "$534/mo",
    inputs: "$28,000 · 7.5% · 60 months",
  },
  "auto-loan-calculator": {
    label: "Monthly payment",
    value: "$534/mo",
    inputs: "$28,000 · 7.5% · 60 months",
  },
  "compound-interest-calculator": {
    label: "Final balance",
    value: "$131,345",
    inputs: "$1,000 + $250/mo · 7% · 20 yrs",
  },
  "401k-calculator": {
    label: "At retirement",
    value: "$847,000",
    inputs: "$60k salary · 10% · 7% · 30 yrs",
  },
  "debt-payoff-calculator": {
    label: "Payoff time",
    value: "3 yrs 2 mo",
    inputs: "$10,000 · 18% APR · $300/mo",
  },
  "inflation-calculator": {
    label: "Future value",
    value: "$1,629",
    inputs: "$1,000 today · 5% · 10 yrs",
  },
  "tip-calculator": {
    label: "Tip + total",
    value: "$9 + $59",
    inputs: "$50 bill · 18% tip",
  },
  "bill-split-calculator": {
    label: "Per person",
    value: "$19.50",
    inputs: "$78 bill · 4 people · 18% tip",
  },
  "discount-calculator": {
    label: "You pay",
    value: "$70",
    inputs: "$100 · 30% off",
  },
  "hourly-rate-calculator": {
    label: "True hourly rate",
    value: "$20.53/hr",
    inputs: "$50k/yr · 2 wks PTO · 10 holidays",
  },
  "paycheck-calculator": {
    label: "Take-home / mo",
    value: "$3,120",
    inputs: "$50k/yr · US federal + state",
  },
  "overtime-calculator": {
    label: "Extra weekly pay",
    value: "$270",
    inputs: "$18/hr · 10 OT hrs · 1.5x",
  },

  // ── Health calculators ──
  "bmi-calculator": {
    label: "Your BMI",
    value: "24.2 — healthy",
    inputs: "5'10\" · 170 lbs",
  },
  "bmr-calculator": {
    label: "Daily calories (BMR)",
    value: "1,680 kcal",
    inputs: "Adult · 170 lbs · sedentary",
  },
  "calorie-calculator": {
    label: "Daily target",
    value: "2,180 kcal",
    inputs: "Maintenance · 170 lbs · active",
  },
  "body-fat-calculator": {
    label: "Body fat %",
    value: "18.4%",
    inputs: "US Navy method · male · 170 lbs",
  },
  "ideal-weight-calculator": {
    label: "Ideal weight",
    value: "154 lbs",
    inputs: "5'10\" · male · Devine formula",
  },
  "ovulation-calculator": {
    label: "Next ovulation",
    value: "Day 14",
    inputs: "28-day cycle",
  },
  "pregnancy-calculator": {
    label: "Due date",
    value: "+40 weeks",
    inputs: "Naegele's rule · last period",
  },
  "water-intake-calculator": {
    label: "Daily water",
    value: "88 oz",
    inputs: "170 lbs · moderate activity",
  },

  // ── Productivity / time ──
  "age-calculator": {
    label: "You are",
    value: "35 yrs · 4 mo",
    inputs: "Between birth date and today",
  },
  "date-difference-calculator": {
    label: "Time between",
    value: "1,234 days",
    inputs: "Any two dates",
  },

  // ── Random/fun with a sharp teaser ──
  "percentage-calculator": {
    label: "Answer",
    value: "45",
    inputs: "15% of 300",
  },
};

/**
 * Non-calculator hero data for a handful of flagship tools. These tend to be
 * the most-shared utilities and benefit from a punchier OG card.
 */
export const OG_HEROES_EXTRA: Record<string, OgHero> = {
  "qr-code-generator": {
    label: "Make QR codes",
    value: "PNG · SVG",
    inputs: "Instant. No sign-up.",
  },
  "password-generator": {
    label: "Strong passwords",
    value: "16-char · mixed",
    inputs: "Generated in your browser",
  },
  "json-formatter": {
    label: "Format + validate",
    value: "JSON in · clean out",
    inputs: "In-browser. Nothing uploaded.",
  },
  "pomodoro-timer": {
    label: "Focus timer",
    value: "25 : 00",
    inputs: "Classic pomodoro technique",
  },
  "word-counter": {
    label: "Word · char · read time",
    value: "Live counts",
    inputs: "As you type. No lag.",
  },
  "lorem-ipsum-generator": {
    label: "Filler text",
    value: "Words · sentences · paragraphs",
    inputs: "Copy-paste ready",
  },
};

/** Resolve the hero for a slug, checking both tables. Returns null if none. */
export function getOgHero(slug: string): OgHero | null {
  return OG_HEROES[slug] ?? OG_HEROES_EXTRA[slug] ?? null;
}
