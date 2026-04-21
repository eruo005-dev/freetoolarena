import type { ReactElement } from "react";
import dynamic from "next/dynamic";

/**
 * Every tool ships as its own JS chunk. Importing a single tool pulls in
 * only that tool's component — not all 50. The `ssr: true` default keeps
 * initial HTML pre-rendered so pages stay SEO-friendly and there's no
 * hydration flash. The skeleton renders during chunk fetch on client nav.
 */
const Skeleton = () => (
  <div
    aria-hidden
    className="h-64 w-full animate-pulse rounded-xl bg-slate-100"
  />
);

const TipCalculator = dynamic(() => import("./TipCalculator").then(m => ({ default: m.TipCalculator })), { loading: Skeleton });
const PomodoroTimer = dynamic(() => import("./PomodoroTimer").then(m => ({ default: m.PomodoroTimer })), { loading: Skeleton });
const BudgetCalculator = dynamic(() => import("./BudgetCalculator").then(m => ({ default: m.BudgetCalculator })), { loading: Skeleton });
const WordCounter = dynamic(() => import("./WordCounter").then(m => ({ default: m.WordCounter })), { loading: Skeleton });
const JsonFormatter = dynamic(() => import("./JsonFormatter").then(m => ({ default: m.JsonFormatter })), { loading: Skeleton });
const CharacterCounter = dynamic(() => import("./CharacterCounter").then(m => ({ default: m.CharacterCounter })), { loading: Skeleton });
const CountdownTimer = dynamic(() => import("./CountdownTimer").then(m => ({ default: m.CountdownTimer })), { loading: Skeleton });
const PasswordGenerator = dynamic(() => import("./PasswordGenerator").then(m => ({ default: m.PasswordGenerator })), { loading: Skeleton });
const Stopwatch = dynamic(() => import("./Stopwatch").then(m => ({ default: m.Stopwatch })), { loading: Skeleton });
const CaseConverter = dynamic(() => import("./CaseConverter").then(m => ({ default: m.CaseConverter })), { loading: Skeleton });
const SlugGenerator = dynamic(() => import("./SlugGenerator").then(m => ({ default: m.SlugGenerator })), { loading: Skeleton });
const LoremIpsumGenerator = dynamic(() => import("./LoremIpsumGenerator").then(m => ({ default: m.LoremIpsumGenerator })), { loading: Skeleton });
const UnitConverter = dynamic(() => import("./UnitConverter").then(m => ({ default: m.UnitConverter })), { loading: Skeleton });
const TemperatureConverter = dynamic(() => import("./TemperatureConverter").then(m => ({ default: m.TemperatureConverter })), { loading: Skeleton });
const BmiCalculator = dynamic(() => import("./BmiCalculator").then(m => ({ default: m.BmiCalculator })), { loading: Skeleton });
const CalorieCalculator = dynamic(() => import("./CalorieCalculator").then(m => ({ default: m.CalorieCalculator })), { loading: Skeleton });
const WaterIntakeCalculator = dynamic(() => import("./WaterIntakeCalculator").then(m => ({ default: m.WaterIntakeCalculator })), { loading: Skeleton });
const CoinFlip = dynamic(() => import("./CoinFlip").then(m => ({ default: m.CoinFlip })), { loading: Skeleton });
const DiceRoller = dynamic(() => import("./DiceRoller").then(m => ({ default: m.DiceRoller })), { loading: Skeleton });
const AgeCalculator = dynamic(() => import("./AgeCalculator").then(m => ({ default: m.AgeCalculator })), { loading: Skeleton });
const LoanCalculator = dynamic(() => import("./LoanCalculator").then(m => ({ default: m.LoanCalculator })), { loading: Skeleton });
const MortgageCalculator = dynamic(() => import("./MortgageCalculator").then(m => ({ default: m.MortgageCalculator })), { loading: Skeleton });
const CompoundInterestCalculator = dynamic(() => import("./CompoundInterestCalculator").then(m => ({ default: m.CompoundInterestCalculator })), { loading: Skeleton });
const SavingsGoalCalculator = dynamic(() => import("./SavingsGoalCalculator").then(m => ({ default: m.SavingsGoalCalculator })), { loading: Skeleton });
const DebtPayoffCalculator = dynamic(() => import("./DebtPayoffCalculator").then(m => ({ default: m.DebtPayoffCalculator })), { loading: Skeleton });
const ToDoList = dynamic(() => import("./ToDoList").then(m => ({ default: m.ToDoList })), { loading: Skeleton });
const TextReverser = dynamic(() => import("./TextReverser").then(m => ({ default: m.TextReverser })), { loading: Skeleton });
const Base64EncoderDecoder = dynamic(() => import("./Base64EncoderDecoder").then(m => ({ default: m.Base64EncoderDecoder })), { loading: Skeleton });
const UrlEncoderDecoder = dynamic(() => import("./UrlEncoderDecoder").then(m => ({ default: m.UrlEncoderDecoder })), { loading: Skeleton });
const UuidGenerator = dynamic(() => import("./UuidGenerator").then(m => ({ default: m.UuidGenerator })), { loading: Skeleton });
const RandomNumberGenerator = dynamic(() => import("./RandomNumberGenerator").then(m => ({ default: m.RandomNumberGenerator })), { loading: Skeleton });
const RandomNameGenerator = dynamic(() => import("./RandomNameGenerator").then(m => ({ default: m.RandomNameGenerator })), { loading: Skeleton });
const DecisionMaker = dynamic(() => import("./DecisionMaker").then(m => ({ default: m.DecisionMaker })), { loading: Skeleton });
const LengthConverter = dynamic(() => import("./LengthConverter").then(m => ({ default: m.LengthConverter })), { loading: Skeleton });
const SpeedConverter = dynamic(() => import("./SpeedConverter").then(m => ({ default: m.SpeedConverter })), { loading: Skeleton });
const ReadabilityScoreChecker = dynamic(() => import("./ReadabilityScoreChecker").then(m => ({ default: m.ReadabilityScoreChecker })), { loading: Skeleton });
const TypingSpeedTest = dynamic(() => import("./TypingSpeedTest").then(m => ({ default: m.TypingSpeedTest })), { loading: Skeleton });
const JsonToCsv = dynamic(() => import("./JsonToCsv").then(m => ({ default: m.JsonToCsv })), { loading: Skeleton });
const MarkdownToHtml = dynamic(() => import("./MarkdownToHtml").then(m => ({ default: m.MarkdownToHtml })), { loading: Skeleton });
const RegexTester = dynamic(() => import("./RegexTester").then(m => ({ default: m.RegexTester })), { loading: Skeleton });
const PaycheckCalculator = dynamic(() => import("./PaycheckCalculator").then(m => ({ default: m.PaycheckCalculator })), { loading: Skeleton });
const RoiCalculator = dynamic(() => import("./RoiCalculator").then(m => ({ default: m.RoiCalculator })), { loading: Skeleton });
const CurrencyConverter = dynamic(() => import("./CurrencyConverter").then(m => ({ default: m.CurrencyConverter })), { loading: Skeleton });
const HabitTracker = dynamic(() => import("./HabitTracker").then(m => ({ default: m.HabitTracker })), { loading: Skeleton });
const ReadingTimeEstimator = dynamic(() => import("./ReadingTimeEstimator").then(m => ({ default: m.ReadingTimeEstimator })), { loading: Skeleton });
const MeetingCostCalculator = dynamic(() => import("./MeetingCostCalculator").then(m => ({ default: m.MeetingCostCalculator })), { loading: Skeleton });
const TimeZoneConverter = dynamic(() => import("./TimeZoneConverter").then(m => ({ default: m.TimeZoneConverter })), { loading: Skeleton });
const IdealWeightCalculator = dynamic(() => import("./IdealWeightCalculator").then(m => ({ default: m.IdealWeightCalculator })), { loading: Skeleton });
const RunningPaceCalculator = dynamic(() => import("./RunningPaceCalculator").then(m => ({ default: m.RunningPaceCalculator })), { loading: Skeleton });
const MacroCalculator = dynamic(() => import("./MacroCalculator").then(m => ({ default: m.MacroCalculator })), { loading: Skeleton });
// Wave 1 — converters (pure JS, no external deps)
const ColorConverter = dynamic(() => import("./ColorConverter").then(m => ({ default: m.ColorConverter })), { loading: Skeleton });
const UnixTimestampConverter = dynamic(() => import("./UnixTimestampConverter").then(m => ({ default: m.UnixTimestampConverter })), { loading: Skeleton });
const NumberBaseConverter = dynamic(() => import("./NumberBaseConverter").then(m => ({ default: m.NumberBaseConverter })), { loading: Skeleton });
const CsvToJson = dynamic(() => import("./CsvToJson").then(m => ({ default: m.CsvToJson })), { loading: Skeleton });
const YamlJsonConverter = dynamic(() => import("./YamlJsonConverter").then(m => ({ default: m.YamlJsonConverter })), { loading: Skeleton });
// Wave 2 — converters (browser-native: DOMParser, Canvas)
const HtmlToMarkdown = dynamic(() => import("./HtmlToMarkdown").then(m => ({ default: m.HtmlToMarkdown })), { loading: Skeleton });
const ImageFormatConverter = dynamic(() => import("./ImageFormatConverter").then(m => ({ default: m.ImageFormatConverter })), { loading: Skeleton });
const ImageResizer = dynamic(() => import("./ImageResizer").then(m => ({ default: m.ImageResizer })), { loading: Skeleton });
const ImageCompressor = dynamic(() => import("./ImageCompressor").then(m => ({ default: m.ImageCompressor })), { loading: Skeleton });
const SvgToPng = dynamic(() => import("./SvgToPng").then(m => ({ default: m.SvgToPng })), { loading: Skeleton });
// Wave 3 — converters (heavy libs: pdfjs-dist, pdf-lib, heic2any)
const PdfToText = dynamic(() => import("./PdfToText").then(m => ({ default: m.PdfToText })), { loading: Skeleton });
const PdfToJpg = dynamic(() => import("./PdfToJpg").then(m => ({ default: m.PdfToJpg })), { loading: Skeleton });
const JpgToPdf = dynamic(() => import("./JpgToPdf").then(m => ({ default: m.JpgToPdf })), { loading: Skeleton });
const MergePdf = dynamic(() => import("./MergePdf").then(m => ({ default: m.MergePdf })), { loading: Skeleton });
const HeicToJpg = dynamic(() => import("./HeicToJpg").then(m => ({ default: m.HeicToJpg })), { loading: Skeleton });
// Wave 4 — free-API tools (ipify, ipapi, Nager.Date, HIBP)
const IpLookup = dynamic(() => import("./IpLookup").then(m => ({ default: m.IpLookup })), { loading: Skeleton });
const PublicHolidays = dynamic(() => import("./PublicHolidays").then(m => ({ default: m.PublicHolidays })), { loading: Skeleton });
const PasswordBreachChecker = dynamic(() => import("./PasswordBreachChecker").then(m => ({ default: m.PasswordBreachChecker })), { loading: Skeleton });

/** Next passes `searchParams` as `string | string[] | undefined`. */
export type RenderParams = Record<string, string | string[] | undefined>;

export interface ToolEntry {
  /**
   * The interactive UI. Must already include `'use client'` if interactive.
   * Optional `params` object comes from the page's `searchParams` — tools
   * that support deep links (e.g. ?amount=25000) read their defaults here.
   */
  render: (params?: RenderParams) => ReactElement;
  /** 150-300 word explainer shown under the tool. */
  explainer: ReactElement;
  /** Numbered "how to use" steps. */
  howToUse: string[];
}

/** Parse a searchParam as a finite number, falling back to undefined. */
function num(params: RenderParams | undefined, key: string): number | undefined {
  const raw = params?.[key];
  if (typeof raw !== "string") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export const TOOL_REGISTRY: Record<string, ToolEntry> = {
  "tip-calculator": {
    render: (params) => (
      <TipCalculator
        initialBill={num(params, "bill")}
        initialTip={num(params, "tip")}
        initialPeople={num(params, "people")}
      />
    ),
    explainer: (
      <>
        <p>
          Our tip calculator does one job well: turn a bill, a tip percent, and a party size into
          a clean per-person total in under a second. Type the bill amount, pick a tip (or tap one of
          the presets), and split across any number of people. Everything runs in your browser —
          nothing is sent anywhere, there are no ads, and it works offline once the page loads.
        </p>
        <p>
          Tipping norms vary by country and service type. In the US, 18–20% is standard for table
          service; 10–15% is typical for takeout and delivery; cafes and bars often see $1 per drink
          or 10–15% of the tab. Many European countries add service automatically; a few dollars on
          top is enough. The presets reflect US norms — override them whenever it makes sense.
        </p>
      </>
    ),
    howToUse: [
      "Enter the bill amount (pre-tip).",
      "Pick a tip percentage — tap a preset or type a custom value.",
      "Set the number of people splitting the bill.",
      "Read the per-person total in the highlighted box.",
    ],
  },
  "pomodoro-timer": {
    render: () => <PomodoroTimer />,
    explainer: (
      <>
        <p>
          This is a free online pomodoro timer that follows the classic rhythm: 25 minutes of focus,
          5 minutes of break, and a longer 15-minute break every four focus rounds. Tap Start,
          silence your notifications, and go. It runs entirely in your browser, so your streak is
          private and there's nothing to install.
        </p>
        <p>
          The pomodoro technique works because it splits vague "work on it" into clear sprints with a
          deadline. You only have to decide the next 25 minutes — the break is guaranteed. Try
          pairing each focus round with one specific task, not a to-do list. If 25 minutes feels
          short or long, swap to your own rhythm by starting and pausing whenever you like.
        </p>
      </>
    ),
    howToUse: [
      "Close distracting tabs and silence your phone.",
      "Tap Start — the focus session runs for 25 minutes.",
      "When the timer ends, take the 5-minute break (or 15-minute after every 4th round).",
      "Repeat. Aim for 4 focus rounds in a sitting before a longer stop.",
    ],
  },
  "budget-calculator": {
    render: () => <BudgetCalculator />,
    explainer: (
      <>
        <p>
          A monthly budget calculator that shows, at a glance, whether you&rsquo;re actually saving
          money. Enter your take-home pay, fill in your real expense categories, and see income,
          expenses, leftover, and savings rate — plus a color-coded bar so you know where you stand
          without reading a spreadsheet.
        </p>
        <p>
          A healthy starting target is 20% of income into savings. 10–20% is reasonable; under 10%
          means one surprise expense knocks you over; negative means spending is outrunning income
          and needs urgent attention. The defaults are realistic US numbers — override every field
          with your own to get a picture that reflects your real life.
        </p>
      </>
    ),
    howToUse: [
      "Enter your monthly take-home pay (after tax).",
      "Fill in each expense row with a typical month's figure.",
      "Read the leftover amount and savings rate.",
      "Adjust until you're saving at least 10–20%.",
    ],
  },
  "word-counter": {
    render: () => <WordCounter />,
    explainer: (
      <>
        <p>
          A fast, free word counter with the stats that matter for writing online: words, characters
          (with and without spaces), sentences, paragraphs, plus reading and speaking time estimates
          based on average adult speeds. Paste any text — nothing is sent to a server.
        </p>
        <p>
          Character counts are useful for meta descriptions (~160), tweets (280), and SMS (160).
          Word counts matter for blog posts (800–1500 usually performs best), essays, and scripts.
          Reading time is calculated at 230 words per minute (the adult average); speaking time at
          130 wpm, which matches relaxed presentation pace.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type text into the box.",
      "Stats update live — no button to press.",
      "Use Reading and Speaking time to plan posts, presentations, or scripts.",
      "Clear or copy the text with the buttons below the stat grid.",
    ],
  },
  "json-formatter": {
    render: () => <JsonFormatter />,
    explainer: (
      <>
        <p>
          A no-fuss JSON formatter: paste any JSON, get it pretty-printed, minified, or validated
          with a clear error message. It runs entirely in your browser — your data never leaves the
          tab, which matters when you&rsquo;re pasting real API responses or internal payloads.
        </p>
        <p>
          Use <strong>Format</strong> when reading responses from an API, <strong>Minify</strong>{" "}
          when embedding JSON in a config file or URL, and <strong>Validate</strong> when
          you&rsquo;re sanity-checking a payload before sending it. Error messages show the first
          thing JavaScript&rsquo;s built-in parser complains about — usually a missing comma, an
          unquoted key, or a trailing comma.
        </p>
      </>
    ),
    howToUse: [
      "Paste JSON (valid or not) into the input box.",
      "Click Format for pretty-printed output with 2 or 4-space indent.",
      "Click Minify to strip whitespace for config files or URLs.",
      "Click Validate just to confirm structure without changing output.",
    ],
  },
  "character-counter": {
    render: () => <CharacterCounter />,
    explainer: (
      <>
        <p>
          A free character counter that tracks what actually matters: total characters (with and
          without spaces), word count, and live progress bars against real platform limits — tweets
          (280), SMS (160), meta titles (60), meta descriptions (160), LinkedIn posts (3,000), and
          Instagram captions (2,200). Paste any text and the numbers update instantly. Everything
          runs in your browser, so your draft never leaves the page.
        </p>
        <p>
          Character limits are a surprisingly large part of the job for anyone writing for the
          web. Meta descriptions that run long get truncated in search results; tweets that sneak
          past 280 quietly lose the last word; SMS messages over 160 get split into two billable
          segments. The bars go amber at 90% and red when you cross — a visual cue that&rsquo;s
          faster than counting.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type your text into the box.",
      "Read the headline counts: characters, no spaces, words, lines.",
      "Scan the platform limit bars to see where you stand for your target platform.",
      "Trim the text if any bar turns amber or red, or use Copy when it's ready.",
    ],
  },
  "countdown-timer": {
    render: () => <CountdownTimer />,
    explainer: (
      <>
        <p>
          A free online countdown timer that works for any duration from seconds to hours. Type
          minutes and seconds, tap a preset, or both — then Start. Pause and resume mid-round,
          reset any time, and hear a short beep when the timer hits zero. It runs entirely in
          your browser and keeps going even if the tab is in the background.
        </p>
        <p>
          Countdown timers are an underrated productivity tool. A visible deadline changes
          behavior — &ldquo;I&rsquo;ll draft this until the timer hits zero&rdquo; beats a
          to-do list for getting unstuck. Use it for focused work sprints, cooking, speeches,
          workouts, or any moment when you want a hard stop instead of letting a task expand to
          fill all available time.
        </p>
      </>
    ),
    howToUse: [
      "Enter minutes and seconds, or tap a preset (5m, 10m, 25m…).",
      "Click Start. The timer counts down in large digits.",
      "Use Pause/Resume if interrupted, or Reset to start over.",
      "A beep plays at zero — the tab can be backgrounded while it runs.",
    ],
  },
  "password-generator": {
    render: () => <PasswordGenerator />,
    explainer: (
      <>
        <p>
          A free password generator that runs entirely in your browser — the password never
          leaves your device. Choose length (8–64), toggle character classes (lowercase,
          uppercase, digits, symbols), optionally exclude look-alike characters (I, l, 1, O, 0,
          o), and get a fresh strong password. A built-in strength meter estimates entropy based
          on the character pool and length.
        </p>
        <p>
          Longer is better: a 20-character password with mixed classes has more entropy than a
          complicated 10-character one. For anything you actually care about — email, banking,
          password manager master password — aim for 16+ characters with all classes enabled.
          Paired with a password manager, you only need to remember one strong password ever.
        </p>
      </>
    ),
    howToUse: [
      "Slide Length to your target (20 is a solid default).",
      "Toggle character classes — keep all four on unless a site blocks symbols.",
      "Click Regenerate until you get one you like.",
      "Click Copy and paste into your password manager or the signup form.",
    ],
  },
  "stopwatch": {
    render: () => <Stopwatch />,
    explainer: (
      <>
        <p>
          A free online stopwatch with millisecond precision, lap splits, and start/pause/reset
          controls. Everything runs in your browser — no sign-up, no ads, no syncing. The tab can
          sit in the background and the count keeps going accurately.
        </p>
        <p>
          Stopwatches are useful for workouts, interval training, cooking, speeches, and any
          &ldquo;I want to know how long this took&rdquo; situation. The lap button captures a
          split without stopping the clock — great for tracking each set in a workout or each
          segment of a multi-stage task.
        </p>
      </>
    ),
    howToUse: [
      "Click Start to begin timing.",
      "Tap Lap to capture a split without stopping the overall timer.",
      "Pause to hold, Resume to continue from the same point.",
      "Reset clears the clock and all laps when you&rsquo;re done.",
    ],
  },
  "case-converter": {
    render: () => <CaseConverter />,
    explainer: (
      <>
        <p>
          A fast free case converter for any text — paste your input and get instant UPPERCASE,
          lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case,
          CONSTANT_CASE, and iNVERTED output. Everything transforms in your browser, so your text
          never leaves the tab.
        </p>
        <p>
          Case conversion is one of those micro-tasks that eats real time when done manually.
          Variable names, headline formatting, CSV headers, URL slugs, SQL column names — each has
          its own convention. Paste once, click the case you need, copy, done.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type text into the input box.",
      "Click any case button — output updates live.",
      "Copy the result with the Copy button next to each output.",
      "Clear the input when you're ready for the next text.",
    ],
  },
  "slug-generator": {
    render: () => <SlugGenerator />,
    explainer: (
      <>
        <p>
          A free URL slug generator that turns any title into a clean, SEO-friendly slug. Removes
          accents and diacritics, strips common stop words if you want, and joins the rest with
          dashes or underscores. Runs entirely in the browser.
        </p>
        <p>
          Good slugs are short, keyword-focused, and readable. &ldquo;best-productivity-apps&rdquo;
          beats &ldquo;post-4217&rdquo; for both users and search engines. Pair with our{" "}
          <a href="/guides/seo-basics-for-beginners">SEO basics guide</a> to use slugs that
          actually help rankings.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type your title into the input box.",
      "Toggle stop-word removal if you want a shorter slug.",
      "Choose a dash or underscore separator.",
      "Copy the generated slug with one click.",
    ],
  },
  "lorem-ipsum-generator": {
    render: () => <LoremIpsumGenerator />,
    explainer: (
      <>
        <p>
          A clean lorem ipsum generator for designers, developers, and writers who need filler
          copy. Pick paragraphs, sentences, or words; optionally start with the classic
          &ldquo;Lorem ipsum dolor sit amet&rdquo; lead. Everything renders instantly in your
          browser.
        </p>
        <p>
          Lorem ipsum has been used since the 1500s as placeholder text because it looks like
          normal prose without being readable enough to distract. Use it in mockups, templates,
          and content prototypes — just remember to replace it before shipping.
        </p>
      </>
    ),
    howToUse: [
      "Pick paragraphs, sentences, or words as the unit.",
      "Set the count you need.",
      "Toggle the classic lorem ipsum lead on or off.",
      "Click Copy to grab the generated filler text.",
    ],
  },
  "unit-converter": {
    render: () => <UnitConverter />,
    explainer: (
      <>
        <p>
          A free unit converter for length, weight, volume, and area — the everyday conversions
          that come up constantly. Meters to feet, pounds to kilograms, gallons to liters, acres
          to hectares. Runs in your browser with live updates as you type.
        </p>
        <p>
          Conversions are a staple of cross-country recipes, travel planning, international
          shipping, and DIY projects. This tool covers the main categories you&rsquo;ll hit
          99% of the time; specialized conversions (cooking temperatures, fuel economy) are
          handled by our{" "}
          <a href="/tools/temperature-converter">temperature converter</a> and category-specific
          tools.
        </p>
      </>
    ),
    howToUse: [
      "Pick a category: length, weight, volume, or area.",
      "Enter a value in the From field.",
      "Pick the From and To units.",
      "Read the converted value — updates live as you type.",
    ],
  },
  "temperature-converter": {
    render: () => <TemperatureConverter />,
    explainer: (
      <>
        <p>
          A simple Celsius, Fahrenheit, and Kelvin converter for cooking, science, and travel.
          Type in any field and the other two update live. Formulas are shown below so you know
          exactly how the conversion is happening.
        </p>
        <p>
          Temperature conversion catches most people at the wrong moment — in the kitchen with a
          recipe in the &ldquo;wrong&rdquo; units, or checking foreign weather before a trip. 0°C
          = 32°F (freezing), 100°C = 212°F (boiling), 20°C = 68°F (comfortable room temperature).
        </p>
      </>
    ),
    howToUse: [
      "Type a value in any of the three boxes — Celsius, Fahrenheit, or Kelvin.",
      "The other two update live.",
      "Scan the formula below if you want to do the math by hand.",
      "Clear the field when you're ready for a new value.",
    ],
  },
  "bmi-calculator": {
    render: (params) => (
      <BmiCalculator
        initialWeight={num(params, "weight")}
        initialHeight={num(params, "height")}
      />
    ),
    explainer: (
      <>
        <p>
          A free BMI (body mass index) calculator that takes metric or imperial inputs and returns
          your BMI plus the WHO classification: underweight, normal, overweight, or obese. Runs
          in your browser with no tracking.
        </p>
        <p>
          BMI is a rough screening tool, not a diagnosis. It doesn&rsquo;t account for muscle
          mass, frame size, or body composition — a lean athlete can register as
          &ldquo;overweight&rdquo; on BMI while being in peak health. Use it as one data point
          among several, not as the defining measure of fitness.
        </p>
      </>
    ),
    howToUse: [
      "Pick metric (cm / kg) or imperial (ft, in / lb).",
      "Enter your height and weight.",
      "Read your BMI and the WHO category it falls in.",
      "Treat it as a screening number, not a verdict.",
    ],
  },
  "calorie-calculator": {
    render: () => <CalorieCalculator />,
    explainer: (
      <>
        <p>
          A free daily calorie calculator using the Mifflin-St Jeor equation, the most accurate
          BMR formula for the general population. Enter age, sex, height, weight, and activity
          level; get an estimated maintenance calorie number. Runs entirely in your browser.
        </p>
        <p>
          The number it returns is an estimate — individual metabolism varies by 10–15%. Use it
          as a starting point: track actual intake for two weeks, adjust up or down based on how
          your weight responds. Pair with our{" "}
          <a href="/guides/how-to-meal-prep">meal prep guide</a> to actually hit the target
          without thinking about it every meal.
        </p>
      </>
    ),
    howToUse: [
      "Enter age, sex, height, and weight.",
      "Pick an activity level honestly — most people overestimate.",
      "Read your estimated maintenance calories.",
      "Treat it as a starting point; refine it with 2 weeks of real-world tracking.",
    ],
  },
  "water-intake-calculator": {
    render: () => <WaterIntakeCalculator />,
    explainer: (
      <>
        <p>
          A free daily water intake calculator that sizes your target based on weight and
          exercise — roughly 35ml per kg of body weight plus 355ml per 30 minutes of activity.
          Runs in your browser, no sign-up.
        </p>
        <p>
          The &ldquo;8 cups&rdquo; rule is a starting guideline, not a prescription. Your real
          target depends on body mass, climate, activity level, and diet (water-rich foods
          reduce the plain-water requirement). Pair with our{" "}
          <a href="/guides/how-to-drink-more-water">hydration guide</a> for practical tactics to
          actually hit your number.
        </p>
      </>
    ),
    howToUse: [
      "Enter your weight (metric or imperial).",
      "Add minutes of daily exercise.",
      "Read your daily water target in liters and ounces.",
      "Pair with a marked water bottle or bottle count to hit it.",
    ],
  },
  "coin-flip": {
    render: () => <CoinFlip />,
    explainer: (
      <>
        <p>
          A free virtual coin flip with an animated toss, heads/tails tally, and percentage bar.
          Useful when you need a fair binary decision and don&rsquo;t have a physical coin handy —
          or when you want to track outcomes over multiple flips.
        </p>
        <p>
          Coin flips are surprisingly useful beyond games. When two options feel equal, flipping
          a coin and noticing your reaction to the result often reveals which one you actually
          wanted. If you&rsquo;re disappointed by the flip, go with the other option.
        </p>
      </>
    ),
    howToUse: [
      "Tap Flip to toss the coin.",
      "Watch the animated result — heads or tails.",
      "See the running tally and percentage below.",
      "Reset any time to start a new series.",
    ],
  },
  "dice-roller": {
    render: () => <DiceRoller />,
    explainer: (
      <>
        <p>
          A free online dice roller supporting d4, d6, d8, d10, d12, d20, and d100. Uses
          cryptographically-secure randomness (window.crypto), which matters for tabletop games
          where fairness is the point. Runs in your browser.
        </p>
        <p>
          Dice rollers are essential for tabletop RPGs (D&amp;D, Pathfinder), board games with
          lost dice, remote gaming, and quick random decisions. The crypto-backed randomness
          makes this closer to a &ldquo;real&rdquo; roll than most JavaScript random-number
          generators.
        </p>
      </>
    ),
    howToUse: [
      "Pick a die type (d4, d6, d20, etc).",
      "Set how many dice to roll at once.",
      "Click Roll — see the individual results and total.",
      "Keep rolling; each roll uses fresh cryptographic randomness.",
    ],
  },
  "age-calculator": {
    render: (params) => {
      const dob = typeof params?.dob === "string" ? params.dob : undefined;
      return <AgeCalculator initialDob={dob} />;
    },
    explainer: (
      <>
        <p>
          A free age calculator that returns your exact age in years, months, and days — plus
          total months, weeks, days, and hours lived, and days until your next birthday. Enter
          your birthdate and a target date; everything computes live in the browser.
        </p>
        <p>
          Age calculators are useful for forms that need exact age-at-date, planning milestones
          (retirement, eligibility), or just curiosity. The total-days-lived number is a
          surprisingly motivating number to know — it&rsquo;s finite, it&rsquo;s counting, and
          it puts daily habits in perspective.
        </p>
      </>
    ),
    howToUse: [
      "Enter your birthdate.",
      "Optionally set a target date (defaults to today).",
      "Read your age in years/months/days, plus total units lived.",
      "Check the countdown to your next birthday.",
    ],
  },
  "loan-calculator": {
    render: (params) => (
      <LoanCalculator
        initialAmount={num(params, "amount")}
        initialRate={num(params, "rate")}
        initialYears={num(params, "years")}
      />
    ),
    explainer: (
      <>
        <p>
          A free loan calculator that computes your monthly payment, total paid over the life of
          the loan, and total interest cost. Enter principal, APR, and term (years); everything
          updates live. Uses the standard amortization formula — same as any bank calculator.
        </p>
        <p>
          Before signing any loan agreement, know the full cost. A $20,000 loan at 7% for 5 years
          costs $3,761 in interest; the same loan stretched to 7 years costs $5,371. Longer terms
          = lower monthly payment and more total interest. Our{" "}
          <a href="/guides/how-to-pay-off-debt-fast">debt payoff guide</a> explains strategies to
          minimize this.
        </p>
      </>
    ),
    howToUse: [
      "Enter the loan principal (amount borrowed).",
      "Enter the annual interest rate (APR).",
      "Enter the loan term in years.",
      "Read your monthly payment, total cost, and total interest.",
    ],
  },
  "mortgage-calculator": {
    render: (params) => (
      <MortgageCalculator
        initialPrice={num(params, "price")}
        initialDown={num(params, "down")}
        initialRate={num(params, "rate")}
        initialYears={num(params, "years")}
      />
    ),
    explainer: (
      <>
        <p>
          A free mortgage calculator with PITI: Principal, Interest, Taxes, and Insurance — the
          four components of an actual monthly mortgage payment. Most calculators only show
          principal+interest and leave you surprised at closing. This one includes the rest.
        </p>
        <p>
          Your real monthly mortgage bill is 25-40% higher than the P&amp;I number. Property taxes
          vary by locality (1-2.5% of home value per year). Homeowners insurance is another $1,200-
          $2,500 per year. Always budget against PITI, not advertised principal+interest.
        </p>
      </>
    ),
    howToUse: [
      "Enter home price and down payment percent.",
      "Enter mortgage rate and term (usually 30 years).",
      "Estimate property tax rate and annual insurance.",
      "Read your full PITI monthly payment.",
    ],
  },
  "compound-interest-calculator": {
    render: (params) => (
      <CompoundInterestCalculator
        initialPrincipal={num(params, "principal")}
        initialContribution={num(params, "monthly")}
        initialRate={num(params, "rate")}
        initialYears={num(params, "years")}
      />
    ),
    explainer: (
      <>
        <p>
          A compound interest calculator that shows what a starting balance plus regular monthly
          contributions becomes over time at a given return rate. The number at 30 years is often
          shocking — this is the magic of compounding.
        </p>
        <p>
          $200/month at 7% for 30 years = $245,000. At 40 years = $525,000. Time is the dominant
          variable, not amount. Starting early beats contributing more. Pair with our{" "}
          <a href="/guides/how-to-start-investing-with-100-dollars">investing guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter starting balance and monthly contribution.",
      "Set expected annual return (7% is a common long-term stock market assumption).",
      "Set number of years to invest.",
      "See the ending balance and total contributed vs. interest earned.",
    ],
  },
  "savings-goal-calculator": {
    render: () => <SavingsGoalCalculator />,
    explainer: (
      <>
        <p>
          A free savings goal calculator that works the other direction: tell it what you want and
          when, and it tells you what monthly deposit gets you there. Accounts for your starting
          balance and your high-yield savings APY.
        </p>
        <p>
          Useful for short-term goals: a down payment, a wedding, an emergency fund, a trip. For
          money you&rsquo;ll need in under 5 years, a high-yield savings account beats investing —
          you want low volatility, not maximum return. See our{" "}
          <a href="/guides/how-to-build-an-emergency-fund">emergency fund guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter your goal amount and timeline in months.",
      "Enter your starting balance (can be 0).",
      "Enter your HYSA APY (4% is typical in 2026).",
      "Read the required monthly deposit to reach the goal.",
    ],
  },
  "debt-payoff-calculator": {
    render: () => <DebtPayoffCalculator />,
    explainer: (
      <>
        <p>
          A free debt payoff calculator. Enter your balance, APR, and monthly payment — it
          returns how long until the debt is gone and how much you&rsquo;ll pay in total
          interest. Warns you if your monthly payment is too low to cover the interest (the trap
          that keeps people in debt forever).
        </p>
        <p>
          Credit card debt at 22% APR is financial bleeding. A $5,000 balance at $100/month takes
          forever and costs thousands. Increase the monthly payment and watch both time and
          interest drop fast. Pair with our{" "}
          <a href="/guides/how-to-pay-off-debt-fast">debt payoff guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter the current debt balance.",
      "Enter the APR (check your statement — often 18-25% on cards).",
      "Enter the monthly payment you can commit to.",
      "Read months to payoff, total paid, and total interest.",
    ],
  },
  "to-do-list": {
    render: () => <ToDoList />,
    explainer: (
      <>
        <p>
          A free simple to-do list that runs in your browser. Add tasks, check them off, remove
          them, or clear all completed at once. No account, no app to install, no sync. The list
          lives in your tab for the session.
        </p>
        <p>
          A good to-do list is simple. Complicated task managers often become the task. Write it
          down, do it, check it off. Our <a href="/guides/how-to-prioritize-tasks">task
          prioritization guide</a> covers the habit side.
        </p>
      </>
    ),
    howToUse: [
      "Type a task and press Enter, or click Add.",
      "Check the box to mark a task done.",
      "Click remove to delete a task entirely.",
      "Clear completed to tidy the list when you're done.",
    ],
  },
  "paycheck-calculator": {
    render: (params) => (
      <PaycheckCalculator
        initialGross={num(params, "gross")}
        initialRate={num(params, "rate")}
      />
    ),
    explainer: (
      <>
        <p>
          A free paycheck calculator that estimates your take-home pay after federal tax, state
          tax, Social Security, and Medicare. Enter gross salary and pay frequency; get the
          breakdown in seconds. All math runs in your browser.
        </p>
        <p>
          The numbers are estimates — actual paychecks depend on local tax, pre-tax deductions
          (401k, health insurance), and state-specific rules. Use this as a starting point, then
          compare against your real pay stub. Pair with our{" "}
          <a href="/guides/how-to-make-a-monthly-budget">budgeting guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter your gross salary.",
      "Pick your pay frequency (weekly, biweekly, monthly).",
      "Set an approximate state tax rate (varies by state).",
      "Read your estimated net pay per paycheck and per year.",
    ],
  },
  "roi-calculator": {
    render: () => <RoiCalculator />,
    explainer: (
      <>
        <p>
          A free ROI (return on investment) calculator. Enter what you put in and what you got
          back — see your percentage return plus annualized rate over the holding period.
        </p>
        <p>
          ROI is useful for comparing investments, marketing campaigns, and business decisions on
          the same scale. Annualized ROI matters more than absolute: a 50% return in 5 years is
          8.4% annualized — less exciting than it sounds. Pair with our{" "}
          <a href="/guides/how-to-start-investing-with-100-dollars">investing guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter the cost (amount invested).",
      "Enter the return (final value).",
      "Enter the time period in years.",
      "Read simple ROI and annualized ROI.",
    ],
  },
  "currency-converter": {
    render: () => <CurrencyConverter />,
    explainer: (
      <>
        <p>
          A free currency converter covering 15 major currencies. Rates are pulled live from the
          European Central Bank via the Frankfurter API and refresh each business day. If the
          service is ever unreachable, the tool falls back to stored reference rates so you still
          get an answer.
        </p>
        <p>
          Mid-market rates are what you&rsquo;ll see on Google or a financial ticker — the
          reference number between buyers and sellers. The rate you actually pay at a bank, card,
          or remittance service is usually 1–3% worse. For travel or a rough estimate, mid-market
          is fine. For larger transactions, compare against the quote your provider gives you.
        </p>
      </>
    ),
    howToUse: [
      "Enter the amount in the From currency.",
      "Pick From and To currencies — or press ⇄ to swap them.",
      "Override the rate if your provider quoted a different number.",
      "Read the converted amount and the rate used.",
    ],
  },
  "habit-tracker": {
    render: () => <HabitTracker />,
    explainer: (
      <>
        <p>
          A simple free habit tracker for one habit over 14 days. Check each day off as you do
          it; your current streak appears instantly. Runs in your browser, no sign-up, no sync.
        </p>
        <p>
          The point is visible progress. Seeing 9 checkmarks in a row is the strongest
          motivation most people need to make it 10. For deeper habit theory, see our{" "}
          <a href="/guides/how-to-build-good-habits">habits guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Name your habit (something specific and daily).",
      "Check the box for each day you do it.",
      "Watch your streak grow — aim to not break the chain.",
      "Come back daily; the grid is your contract with yourself.",
    ],
  },
  "reading-time-estimator": {
    render: () => <ReadingTimeEstimator />,
    explainer: (
      <>
        <p>
          A free reading time estimator. Paste any text; get an estimated reading time based on
          average adult reading speed (230 words per minute by default). Adjust the WPM for
          slow, average, or fast readers.
        </p>
        <p>
          Useful for blog post previews, course content, or planning how long a chapter will
          take. Remember: comprehension drops if you speed past 300-400 WPM, so faster
          isn&rsquo;t always better.
        </p>
      </>
    ),
    howToUse: [
      "Paste text into the box.",
      "Adjust WPM if needed (230 is the adult average).",
      "Read the estimated time in minutes:seconds.",
      "Use for post previews, course planning, or script timing.",
    ],
  },
  "meeting-cost-calculator": {
    render: () => <MeetingCostCalculator />,
    explainer: (
      <>
        <p>
          A free meeting cost calculator. Enter average salary, number of attendees, and duration;
          see exactly what the meeting costs the company. The number is usually sobering.
        </p>
        <p>
          Use it to justify shorter meetings, smaller attendee lists, or async alternatives. A
          10-person hour-long meeting with $120k average salaries costs $600. Worth it for
          important decisions; wasted for a status update that could be a Slack message.
        </p>
      </>
    ),
    howToUse: [
      "Enter average annual salary of attendees.",
      "Enter number of attendees.",
      "Enter meeting duration in minutes.",
      "Read the dollar cost of the meeting.",
    ],
  },
  "time-zone-converter": {
    render: () => <TimeZoneConverter />,
    explainer: (
      <>
        <p>
          A free time zone converter covering 17 major zones. Pick a time in one zone; see the
          equivalent across all the others instantly. Uses your browser&rsquo;s native Intl API
          for accuracy, including DST.
        </p>
        <p>
          For scheduling meetings, travel, or remote work across time zones, a quick visual
          conversion saves headaches. See our <a href="/guides/how-to-work-remotely">remote work
          guide</a> for more.
        </p>
      </>
    ),
    howToUse: [
      "Pick your reference time zone.",
      "Set the reference date and time.",
      "Toggle which zones to display.",
      "Read the converted times side-by-side.",
    ],
  },
  "ideal-weight-calculator": {
    render: () => <IdealWeightCalculator />,
    explainer: (
      <>
        <p>
          A free ideal weight calculator using the four standard formulas — Devine, Robinson,
          Miller, and Hamwi — so you can compare across them. Enter sex and height; get
          estimates in kg and lb.
        </p>
        <p>
          Ideal weight formulas are rough guidelines. They don&rsquo;t account for frame size,
          muscle mass, or body composition, so athletes often fall outside the range despite
          being in excellent health. Treat these as one reference point among several.
        </p>
      </>
    ),
    howToUse: [
      "Pick your sex.",
      "Enter your height in cm.",
      "Compare results across the four formulas.",
      "Use as rough reference, not as a strict target.",
    ],
  },
  "running-pace-calculator": {
    render: () => <RunningPaceCalculator />,
    explainer: (
      <>
        <p>
          A free running pace calculator. Enter distance and finish time; get pace per kilometer,
          pace per mile, and speed in both km/h and mph. Works for training runs and race
          planning.
        </p>
        <p>
          Knowing your pace is essential for structured training and pacing strategy on race
          day. Pair with our <a href="/guides/how-to-start-running">running guide</a> for
          beginner programs that use pace targets.
        </p>
      </>
    ),
    howToUse: [
      "Enter your distance (km or miles).",
      "Enter your finish time (hours, minutes, seconds).",
      "Read pace per km and per mile.",
      "Check speed in km/h and mph for context.",
    ],
  },
  "macro-calculator": {
    render: () => <MacroCalculator />,
    explainer: (
      <>
        <p>
          A free macro calculator. Enter daily calories, weight, and goal; get protein, fat, and
          carb targets. Protein is set at 1g per pound of bodyweight (a solid general rule), fat
          at 28% of calories, carbs fill the rest.
        </p>
        <p>
          These are starting targets, not prescriptions. Adjust over 2-3 weeks based on how your
          body responds. Pair with our <a href="/guides/how-to-eat-healthy-on-a-budget">healthy
          eating guide</a> and the <a href="/tools/calorie-calculator">calorie calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter your daily calorie target.",
      "Enter your weight in pounds.",
      "Pick your goal (cut, maintain, bulk).",
      "Read your protein, fat, and carb targets in grams.",
    ],
  },
  "text-reverser": {
    render: () => <TextReverser />,
    explainer: (
      <>
        <p>
          A free text reverser. Reverse by characters, words, or lines. Useful for puzzles,
          creative writing experiments, or quickly flipping a CSV or list. Everything runs in
          your browser.
        </p>
        <p>
          A niche tool, but when you need it, you really need it. Pair with the{" "}
          <a href="/tools/case-converter">case converter</a> for more text manipulation.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type text into the box.",
      "Pick reverse mode: characters, words, or lines.",
      "Read the reversed output instantly.",
      "Copy the result with one click.",
    ],
  },
  "readability-score-checker": {
    render: () => <ReadabilityScoreChecker />,
    explainer: (
      <>
        <p>
          A free readability score checker using the Flesch Reading Ease formula. Paste text;
          get a score plus plain-English interpretation (roughly: 60-70 is web-friendly, below
          30 is academic).
        </p>
        <p>
          Lower-grade writing often ranks better on Google and sees more engagement. For blog
          posts, target 60+. For marketing copy, 70+. See our{" "}
          <a href="/guides/how-to-write-better">writing guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type text into the box.",
      "Read the Flesch score and interpretation.",
      "Check syllable, word, and sentence counts.",
      "Shorten sentences or simpler words to boost the score.",
    ],
  },
  "typing-speed-test": {
    render: () => <TypingSpeedTest />,
    explainer: (
      <>
        <p>
          A free 60-second typing speed test. Type the passage as accurately as possible; get
          your WPM (words per minute) and accuracy. Runs entirely in your browser.
        </p>
        <p>
          Average typing speed is 40 WPM; professional typists often exceed 75 WPM. Speed
          matters less than accuracy — a 50 WPM typist with 98% accuracy outperforms a 70 WPM
          typist with 85% accuracy in real work.
        </p>
      </>
    ),
    howToUse: [
      "Click Start and begin typing the passage.",
      "Type exactly — errors count against accuracy.",
      "Stop at 60 seconds.",
      "Read your WPM and accuracy percentages.",
    ],
  },
  "json-to-csv": {
    render: () => <JsonToCsv />,
    explainer: (
      <>
        <p>
          A free JSON to CSV converter. Paste an array of JSON objects; get a downloadable CSV
          with all keys as headers. Handles nested strings, commas, and quotes correctly.
        </p>
        <p>
          Useful for migrating data between APIs, importing into spreadsheets, or handing data
          to non-technical colleagues who live in Excel.
        </p>
      </>
    ),
    howToUse: [
      "Paste a JSON array of objects into the input.",
      "Click Convert.",
      "Copy the CSV output or download as a file.",
      "Use the output in Excel, Google Sheets, or your database.",
    ],
  },
  "base64-encoder-decoder": {
    render: () => <Base64EncoderDecoder />,
    explainer: (
      <>
        <p>
          A free base64 encoder and decoder. Works in both directions, handles UTF-8 correctly
          (emojis, accented characters). Everything runs locally in your browser.
        </p>
        <p>
          Base64 is used in APIs, data URIs, email attachments, and JWT tokens. If you work with
          APIs or web development, you&rsquo;ll hit it weekly. See our{" "}
          <a href="/guides/what-is-an-api">API guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste text in the input.",
      "Click Encode to convert to base64.",
      "Click Decode to convert back to plain text.",
      "Copy the result with one click.",
    ],
  },
  "url-encoder-decoder": {
    render: () => <UrlEncoderDecoder />,
    explainer: (
      <>
        <p>
          A free URL encoder and decoder. Handles query strings, special characters, and Unicode
          safely. Everything happens in your browser.
        </p>
        <p>
          URL encoding is required whenever you put special characters in a URL — query
          parameters, redirect paths, API endpoints. Errors here cause cryptic bugs; this tool
          saves the debugging time.
        </p>
      </>
    ),
    howToUse: [
      "Paste a URL or text in the input.",
      "Click Encode to escape special characters.",
      "Click Decode to un-escape percent-encoded text.",
      "Copy the result with one click.",
    ],
  },
  "regex-tester": {
    render: () => <RegexTester />,
    explainer: (
      <>
        <p>
          A free regex tester. Enter a pattern and flags; test against any string and see all
          matches highlighted. Useful for building and debugging regular expressions before
          using them in code.
        </p>
        <p>
          Regex is both powerful and unforgiving. Test patterns here until they behave correctly,
          then paste into your codebase. See our{" "}
          <a href="/guides/how-to-debug-code-effectively">debugging guide</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter your regex pattern.",
      "Set flags (g, i, m, s) as needed.",
      "Paste test text into the input.",
      "Review matches highlighted live.",
    ],
  },
  "uuid-generator": {
    render: () => <UuidGenerator />,
    explainer: (
      <>
        <p>
          A free UUID (v4) generator. Generates cryptographically random UUIDs in your browser.
          Batch generation up to 50 at a time.
        </p>
        <p>
          UUIDs are essential for database primary keys, session IDs, and anywhere you need a
          globally unique identifier that can&rsquo;t be guessed. Uses{" "}
          <code>crypto.randomUUID()</code> when available, cryptographic fallback otherwise.
        </p>
      </>
    ),
    howToUse: [
      "Set how many UUIDs to generate.",
      "Click Generate.",
      "Copy individual UUIDs or the whole batch.",
      "Regenerate any time for a fresh batch.",
    ],
  },
  "markdown-to-html": {
    render: () => <MarkdownToHtml />,
    explainer: (
      <>
        <p>
          A free markdown to HTML converter. Paste markdown; get clean HTML output. Supports
          headings, bold, italic, links, lists, code blocks, and inline code.
        </p>
        <p>
          Useful for quickly converting README content, blog drafts, or chat messages to HTML.
          For complex documents, use a dedicated markdown processor in your build pipeline.
        </p>
      </>
    ),
    howToUse: [
      "Paste markdown into the input.",
      "Read the HTML output instantly.",
      "Copy the HTML with one click.",
      "Paste into a CMS, email, or site editor.",
    ],
  },
  "length-converter": {
    render: () => <LengthConverter />,
    explainer: (
      <>
        <p>
          A free length converter supporting mm, cm, m, km, inches, feet, yards, and miles.
          Precise conversions using the international standard metric-to-imperial ratios.
        </p>
        <p>
          Handy for DIY projects, travel, international shopping, and homework. See our general{" "}
          <a href="/tools/unit-converter">unit converter</a> for more categories.
        </p>
      </>
    ),
    howToUse: [
      "Enter a value in the From field.",
      "Pick From and To units.",
      "Read the converted value instantly.",
      "Swap units for the reverse conversion.",
    ],
  },
  "speed-converter": {
    render: () => <SpeedConverter />,
    explainer: (
      <>
        <p>
          A free speed converter covering m/s, km/h, mph, knots, and ft/s. Uses exact conversion
          factors. Runs entirely in the browser.
        </p>
        <p>
          Useful for physics homework, pilot/sailing navigation, running pace analysis, and
          converting car speedometers when traveling. Pair with our{" "}
          <a href="/tools/running-pace-calculator">running pace calculator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Enter a speed value.",
      "Pick From and To units.",
      "Read the converted value.",
      "Switch units any time.",
    ],
  },
  "random-name-generator": {
    render: () => <RandomNameGenerator />,
    explainer: (
      <>
        <p>
          A free random name generator. Pick gender (male, female, any) and count. Uses common
          English first and last names.
        </p>
        <p>
          Useful for fiction writing, mock data for apps, testing forms, or when you need a
          placeholder that isn&rsquo;t &ldquo;John Doe.&rdquo;
        </p>
      </>
    ),
    howToUse: [
      "Pick gender (male, female, or any).",
      "Set how many names to generate.",
      "Click Generate.",
      "Copy individual names or the list.",
    ],
  },
  "random-number-generator": {
    render: () => <RandomNumberGenerator />,
    explainer: (
      <>
        <p>
          A free random number generator. Set min, max, count, and whether results must be
          unique. Uses standard JavaScript randomness — fine for most casual uses.
        </p>
        <p>
          Useful for raffles, lotteries, game randomness, or anywhere you need a random pick
          from a range. For cryptographic randomness, use our{" "}
          <a href="/tools/uuid-generator">UUID generator</a> instead.
        </p>
      </>
    ),
    howToUse: [
      "Set min and max values.",
      "Set how many numbers to generate.",
      "Toggle unique-only if needed.",
      "Click Generate — copy or regenerate.",
    ],
  },
  "decision-maker": {
    render: () => <DecisionMaker />,
    explainer: (
      <>
        <p>
          A free decision maker. Type options one per line; click Decide to pick one at random.
          Useful when you&rsquo;re genuinely stuck between options.
        </p>
        <p>
          When two choices feel equal, a coin flip can reveal your preference (your reaction to
          the result tells you what you actually wanted). For binary choices, use the{" "}
          <a href="/tools/coin-flip">coin flip</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type one option per line.",
      "Click Decide.",
      "Accept the result, or notice your reaction — that tells you what you wanted.",
      "Reset and try again with different options.",
    ],
  },
  "color-converter": {
    render: () => <ColorConverter />,
    explainer: (
      <>
        <p>
          A free color converter that shows HEX, RGB, and HSL at once. Paste a
          hex code, tweak any channel, or use the native color picker — every
          other format updates instantly. Everything runs in your browser, so
          there&rsquo;s no lag and nothing to install.
        </p>
        <p>
          HEX is the design-handoff default (<code>#0f766e</code>), RGB is
          what browsers and CSS think in, HSL is the one that actually maps to
          how humans perceive color (hue, saturation, lightness). Swapping
          between them is one of the most common tasks in web design, brand
          tooling, and data-viz work — this tool makes it a one-click move.
        </p>
      </>
    ),
    howToUse: [
      "Paste a hex code or click the color picker swatch.",
      "Edit any R, G, B, H, S, or L value — the rest follow.",
      "Use the Copy button next to any format to copy it to your clipboard.",
      "Supports 3-digit and 6-digit hex; 8-digit hex is truncated to RGB.",
    ],
  },
  "unix-timestamp-converter": {
    render: () => <UnixTimestampConverter />,
    explainer: (
      <>
        <p>
          A free Unix timestamp converter. The current epoch ticks live at the
          top so you can grab &ldquo;right now&rdquo; in one click. Paste any
          timestamp to see it rendered as ISO 8601, local time, UTC, and how
          long ago (or from now) the moment falls. Go the other direction too:
          pick a date and read back Unix seconds and milliseconds.
        </p>
        <p>
          Unix timestamps are the internet&rsquo;s favorite date format:
          timezone-agnostic, fixed-width, easy to sort. They crop up in API
          payloads, database columns, JWT tokens, and log lines. This tool
          handles both second and millisecond precision, which matters because
          half the world&rsquo;s APIs use one and half use the other.
        </p>
      </>
    ),
    howToUse: [
      "To read a timestamp: paste it and pick seconds or milliseconds.",
      "To get the current epoch: click Use now.",
      "To encode a date: enter it in the date/time field at the bottom.",
      "Copy any output with the per-field Copy button.",
    ],
  },
  "number-base-converter": {
    render: () => <NumberBaseConverter />,
    explainer: (
      <>
        <p>
          A free number base converter with binary, octal, decimal, and
          hexadecimal on screen at the same time. Type in any one field — the
          others update instantly. Uses <code>BigInt</code>, so arbitrarily
          large numbers work without precision loss.
        </p>
        <p>
          Useful for low-level debugging (memory addresses in hex, bitmasks in
          binary), CSS color math (hex ↔ decimal channels), permissions
          (octal file modes like 755), and CTF/puzzle work. Prefixes like{" "}
          <code>0x</code>, <code>0b</code>, and <code>0o</code> are accepted in
          the matching field.
        </p>
      </>
    ),
    howToUse: [
      "Type a number in any field — binary, octal, decimal, or hex.",
      "Watch the other three update live.",
      "Tap Copy next to any field to grab that representation.",
      "Negative numbers and BigInt-sized values are supported.",
    ],
  },
  "csv-to-json": {
    render: () => <CsvToJson />,
    explainer: (
      <>
        <p>
          A free CSV to JSON converter that runs entirely in your browser.
          Paste CSV, pick the delimiter (comma, semicolon, tab, or pipe), and
          get a JSON array of objects — with the first row as keys by default.
          Handles quoted fields with embedded commas, escaped quotes, and both
          Unix and Windows line endings.
        </p>
        <p>
          CSV is the universal data language everyone exports but no one enjoys
          parsing. JSON is what every API speaks. Going between them is a
          constant chore — this tool makes it a paste-and-copy in three
          seconds. For the opposite direction, see our{" "}
          <a href="/tools/json-to-csv">JSON to CSV converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste your CSV into the input box.",
      "Pick the delimiter if it's not a comma.",
      "Toggle 'First row is header' if your CSV doesn't have one.",
      "Copy the JSON output or paste it straight into your code.",
    ],
  },
  "yaml-json-converter": {
    render: () => <YamlJsonConverter />,
    explainer: (
      <>
        <p>
          A free two-way YAML ↔ JSON converter. Paste YAML to get JSON, or
          paste JSON to get clean YAML — then hit Swap to bounce in the other
          direction with the output promoted to the new input. Supports nested
          mappings, block and flow sequences, strings, numbers, booleans, and
          null.
        </p>
        <p>
          YAML is the config-file default for Kubernetes, GitHub Actions,
          Docker Compose, Ansible, and most dev tooling. JSON is the default
          for APIs and JavaScript. Translating between them is an everyday
          task. Tip: YAML disallows tab characters in indentation — if a paste
          errors, check for mixed tabs and spaces.
        </p>
      </>
    ),
    howToUse: [
      "Pick the direction you want: YAML → JSON or JSON → YAML.",
      "Paste or type in the top box.",
      "Read the output instantly in the bottom box — errors show inline.",
      "Hit Swap to flip direction and continue iterating.",
    ],
  },
  "html-to-markdown": {
    render: () => <HtmlToMarkdown />,
    explainer: (
      <>
        <p>
          A free HTML to Markdown converter. Paste any HTML — a blog export, a
          rich-text editor dump, an AI-generated page — and get clean Markdown
          out. Handles headings, inline formatting, links, images, lists,
          blockquotes, code blocks, and horizontal rules. Script, style, and
          tracking tags are stripped automatically.
        </p>
        <p>
          Useful for migrating a WordPress blog to a static site, dropping
          rich content into a Markdown-first CMS, cleaning up Notion or Google
          Docs exports, or converting AI-generated HTML back into something
          Git-friendly. The counterpart tool is our{" "}
          <a href="/tools/markdown-to-html">Markdown to HTML converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Paste or type HTML into the input box.",
      "Read the Markdown output instantly in the second box.",
      "Copy the result with one click.",
      "Tables and heavily nested HTML may need a small manual cleanup.",
    ],
  },
  "image-format-converter": {
    render: () => <ImageFormatConverter />,
    explainer: (
      <>
        <p>
          A free image format converter for JPG, PNG, and WebP. Drop a file,
          pick the output format, tweak the quality slider if needed, and
          download. Everything runs on your device — the image is never
          uploaded anywhere, which matters for screenshots, private photos, or
          sensitive work.
        </p>
        <p>
          Quick guidance: WebP is smaller than JPG at the same quality and now
          works everywhere except very old browsers. PNG is the right choice
          when you need lossless output or transparency. JPG is a safe fallback
          — if in doubt and the image isn&rsquo;t a logo or screenshot, JPG at
          85% quality is hard to beat.
        </p>
      </>
    ),
    howToUse: [
      "Drop or select your source image.",
      "Pick the target format: WebP, JPG, or PNG.",
      "For lossy formats, adjust the quality slider (85–90% is a sweet spot).",
      "Click Convert, then Download.",
    ],
  },
  "image-resizer": {
    render: () => <ImageResizer />,
    explainer: (
      <>
        <p>
          A free image resizer that runs entirely in your browser. Resize by
          exact pixels or by percentage, with aspect ratio locked by default.
          Pick your output format (PNG for lossless, JPG or WebP for smaller
          files) and download. No upload, no watermark, no queue.
        </p>
        <p>
          Common targets: 1200×630 for Open Graph social previews, 1080×1080
          for Instagram, 1920×1080 for desktop wallpapers, 2000px on the long
          edge for high-quality blog hero images. When in doubt, match what the
          platform suggests — you&rsquo;ll avoid their server-side recompression
          artefacts.
        </p>
      </>
    ),
    howToUse: [
      "Drop your image into the upload box.",
      "Set a target width and height, or use the Percent slider.",
      "Keep 'Lock aspect' on unless you mean to stretch the image.",
      "Pick an output format and click Resize.",
    ],
  },
  "image-compressor": {
    render: () => <ImageCompressor />,
    explainer: (
      <>
        <p>
          A free image compressor for JPG and WebP. Drop a photo, pick a
          quality level, optionally cap the longest side, and get a much
          smaller file — everything processed in your browser with no upload.
          Typical 10–20 MB phone photos shrink to 300–800 KB with no visible
          loss.
        </p>
        <p>
          Why bother? Slow pages lose search rank and readers. Email clients
          refuse large attachments. Upload forms reject files over a few MB.
          Re-saving at 75–85% JPG quality is the single highest-leverage image
          fix there is. For transparency, use our{" "}
          <a href="/tools/image-format-converter">image format converter</a>{" "}
          instead and save as PNG or WebP.
        </p>
      </>
    ),
    howToUse: [
      "Drop a JPG or PNG into the upload box.",
      "Leave Quality at 75% and Max dim at 2400px — that's the sweet spot.",
      "Click Compress and read the size-saved percentage.",
      "Drop the quality slider if the file still feels big.",
    ],
  },
  "svg-to-png": {
    render: () => <SvgToPng />,
    explainer: (
      <>
        <p>
          A free SVG to PNG rasterizer. Paste SVG source or load a .svg file,
          pick your output resolution, keep transparent background on or off,
          and download a crisp PNG at any size. Perfect for generating favicons,
          app icons, social previews, or print-ready raster versions of logos.
        </p>
        <p>
          SVGs are resolution-independent, but most other tools want pixels.
          This rasterizer lets you export at exactly the size you need — 256×256
          for app icons, 512×512 or 1024×1024 for larger branding, 2048+ for
          print. Uses the browser&rsquo;s built-in SVG renderer so the output
          matches what your SVG actually looks like in Chrome, Safari, and
          Firefox.
        </p>
      </>
    ),
    howToUse: [
      "Paste SVG source or click 'Load file' to drop a .svg.",
      "Set the output width and height, or tap a preset size.",
      "Toggle transparent background depending on where the PNG will land.",
      "Click Convert to PNG, then Download.",
    ],
  },
  "pdf-to-text": {
    render: () => <PdfToText />,
    explainer: (
      <>
        <p>
          A free PDF to text extractor. Drop a PDF and get the plain text out in
          seconds — with optional page markers so you can jump around in the
          output. Runs entirely in your browser using Mozilla&rsquo;s battle-tested
          PDF.js engine, so your document never leaves your device.
        </p>
        <p>
          Useful for pulling quotes out of a report, indexing research papers,
          feeding content into another tool, or just checking what&rsquo;s really
          inside a PDF without opening a heavyweight app. Note: scanned PDFs are
          images of text — you&rsquo;ll need an OCR tool first before this can
          read them.
        </p>
      </>
    ),
    howToUse: [
      "Drop your PDF into the upload box.",
      "Wait a few seconds while the pages stream in.",
      "Toggle Page markers off for continuous text, on to jump by page.",
      "Copy the output or download as a .txt file.",
    ],
  },
  "pdf-to-jpg": {
    render: () => <PdfToJpg />,
    explainer: (
      <>
        <p>
          A free PDF to JPG converter. Every page of your PDF becomes a
          downloadable JPG image, rendered at the resolution you choose. Useful
          for sharing a preview of a document on social media, embedding PDF
          pages in a blog, or digitising a printed report for a gallery-style
          view.
        </p>
        <p>
          All rendering happens locally in your browser — nothing is uploaded.
          The scale slider controls output DPI: 1×≈72 DPI is web-quality,
          2× is crisp for retina displays, 3× is print-ready. Higher scales
          mean bigger files and slower rendering.
        </p>
      </>
    ),
    howToUse: [
      "Drop your PDF.",
      "Pick a scale: 1× for small previews, 2× for screens, 3× for print.",
      "Adjust JPG quality if needed (85–95% is a good range).",
      "Download pages individually — thumbnails render inline.",
    ],
  },
  "jpg-to-pdf": {
    render: () => <JpgToPdf />,
    explainer: (
      <>
        <p>
          A free JPG to PDF builder. Drop multiple JPG, PNG, or WebP images,
          reorder them, pick a paper size, and download one clean PDF. Great
          for turning phone photos of receipts, contracts, or whiteboards into a
          single document you can email or archive.
        </p>
        <p>
          Pick &ldquo;Fit to image&rdquo; when you want each page sized exactly
          to its image (no letterboxing). Pick A4 or Letter when you need a
          standard document to print or email into a pipeline that expects it.
          Everything runs locally — your images never leave the browser.
        </p>
      </>
    ),
    howToUse: [
      "Drop your images into the upload box.",
      "Reorder with the up/down arrows, remove what you don't want.",
      "Pick a paper size and margin.",
      "Click Build PDF, then Download.",
    ],
  },
  "merge-pdf": {
    render: () => <MergePdf />,
    explainer: (
      <>
        <p>
          A free PDF merger that runs entirely in your browser. Drop multiple
          PDFs, reorder them, and download a single combined file. No upload
          limit beyond what your device can hold in memory; no watermarks, no
          account, no wait.
        </p>
        <p>
          Most online PDF mergers upload your files to a server. That&rsquo;s
          fine for a public doc, but risky for bank statements, contracts, or
          medical records. This tool uses the browser-native{" "}
          <a href="https://github.com/Hopding/pdf-lib">pdf-lib</a> library — the
          merge happens entirely on your machine.
        </p>
      </>
    ),
    howToUse: [
      "Drop two or more PDFs.",
      "Use ↑ ↓ to put them in the right order.",
      "Click Merge.",
      "Download the combined PDF with one click.",
    ],
  },
  "heic-to-jpg": {
    render: () => <HeicToJpg />,
    explainer: (
      <>
        <p>
          A free HEIC to JPG converter. Drop one or many HEIC or HEIF files —
          the format iPhones use by default — and get standard JPGs (or PNGs)
          out. Runs offline in your browser; your photos are never uploaded.
          Supports batch conversion so you can clear a whole iCloud export in
          one go.
        </p>
        <p>
          HEIC is smaller and higher-quality than JPG, but many web forms,
          CMSes, and older software refuse it. This tool gets you a compatible
          file without touching iCloud, the Photos app, or a third-party
          uploader. For a single image and more format options, see the{" "}
          <a href="/tools/image-format-converter">image format converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Drop one or more .heic or .heif files.",
      "Pick JPG (smaller) or PNG (lossless).",
      "Adjust JPG quality if you want to squeeze size.",
      "Click Convert, then download each file.",
    ],
  },
  "ip-lookup": {
    render: () => <IpLookup />,
    explainer: (
      <>
        <p>
          A free, no-sign-up lookup for your public IP address plus the
          approximate location every site you visit can already see. The IP
          comes from{" "}
          <a href="https://www.ipify.org/" target="_blank" rel="noreferrer noopener">
            ipify
          </a>
          ; the city, ISP, and time zone come from{" "}
          <a href="https://ipapi.co/" target="_blank" rel="noreferrer noopener">
            ipapi.co
          </a>
          . Both calls go straight from your browser — nothing is ever
          proxied through us, and no account or API key is required.
        </p>
        <p>
          A few things worth knowing. <strong>Your IP is not your address.</strong>{" "}
          It&rsquo;s assigned by your ISP to a region, and the location you
          see here is usually the nearest major exchange, not your home. If
          you&rsquo;re on a VPN, mobile hotspot, or office network, the
          results reflect <em>that</em> network, not your device. If the geo
          section says unavailable, the free tier&rsquo;s rate limit is the
          usual cause — your IP will still show.
        </p>
      </>
    ),
    howToUse: [
      "Open the page — your IP and approximate location load automatically.",
      "Click Copy to put your IP on the clipboard.",
      "Click Refresh after connecting to a VPN or different network to see the new result.",
      "Compare IPv4 vs IPv6 — if you see IPv6, your ISP has given you a modern address.",
    ],
  },
  "public-holidays": {
    render: () => <PublicHolidays />,
    explainer: (
      <>
        <p>
          A free lookup for public holidays by country and year, powered by{" "}
          <a href="https://date.nager.at/" target="_blank" rel="noreferrer noopener">
            Nager.Date
          </a>
          . Pick a country and year from the dropdowns; you&rsquo;ll see every
          national holiday grouped by month, with the weekday each one falls
          on. Regional observances (U.S. state holidays, German{" "}
          <em>Länder</em>, etc.) are labelled when the source data includes
          them.
        </p>
        <p>
          Useful for a few things: planning PTO around a long weekend, timing
          a product launch so it doesn&rsquo;t land on a closed market,
          scheduling international meetings that actually have both sides
          available, or just checking if next Monday is a bank holiday before
          you call the plumber. For time-zone math the opposite direction,
          see the{" "}
          <a href="/tools/time-zone-converter">time zone converter</a>.
        </p>
      </>
    ),
    howToUse: [
      "Pick a country (your region is a good place to start).",
      "Pick the year — past, current, or up to a few years ahead.",
      "Scan the list: dates grouped by month, with the weekday shown.",
      "Today is highlighted if it&rsquo;s a public holiday for that country.",
    ],
  },
  "password-breach-checker": {
    render: () => <PasswordBreachChecker />,
    explainer: (
      <>
        <p>
          A free checker that tells you whether a password has shown up in any
          of the hundreds of credential breaches tracked by{" "}
          <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noreferrer noopener">
            Have I Been Pwned
          </a>
          . If it has, attackers have it — and automated bots will be trying
          it on email, banking, and cloud accounts right now. Change it
          everywhere you&rsquo;ve used it, and make the new one unique per
          site.
        </p>
        <p>
          <strong>You never send the password itself.</strong> The tool hashes
          your password locally with SHA-1, sends only the first 5 hex
          characters to HIBP, and compares the reply against the rest of the
          hash in your browser. This is called{" "}
          <a href="https://en.wikipedia.org/wiki/K-anonymity" target="_blank" rel="noreferrer noopener">
            k-anonymity
          </a>
          . It&rsquo;s the same mechanism 1Password and Chrome&rsquo;s
          password-leak warning rely on. For generating a new password once
          you need to rotate, use the{" "}
          <a href="/tools/password-generator">password generator</a>.
        </p>
      </>
    ),
    howToUse: [
      "Type or paste a password into the box.",
      "Click Check — it hashes locally and sends only 5 characters of the hash.",
      "A green box means it&rsquo;s not in HIBP&rsquo;s breach corpus; red means rotate it now.",
      "Click Clear when done so the field resets.",
    ],
  },
};
