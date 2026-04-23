// Wire 60 new guides (batches 51-70) into the registry + manifest + reciprocal related[]
import { readFileSync, writeFileSync } from "node:fs";

// [tool, guide-slug, h1 title, description, keyword, category, related-slugs]
const entries = [
  ["image-resizer", "how-to-resize-images-for-web", "How to Resize Images for Web — Dimensions, Quality, Pixel Density", "Picking pixel dimensions, 1x/2x/3x pixel density, downscale vs crop, quality vs size trade-offs, and batch-resize workflows.", "resize images for web", "media", ["image-resizer", "image-compressor", "image-cropper"]],
  ["image-rotate", "how-to-rotate-images", "How to Rotate Images — 90° Turns, EXIF Orientation, Lossless", "Rotating 90/180/270°, EXIF orientation tag pitfalls, lossless vs re-encoded rotation, and batch rotation workflows.", "rotate images", "media", ["image-rotate", "image-flip", "image-cropper"]],
  ["image-flip", "how-to-flip-images", "How to Flip Images — Horizontal, Vertical, Mirror Effects", "Horizontal vs vertical flips, mirror effects, when flipping breaks text or logos, and lossless flip workflows.", "flip images", "media", ["image-flip", "image-rotate", "image-cropper"]],
  ["image-dimensions-checker", "how-to-check-image-dimensions", "How to Check Image Dimensions — Width, Height, Aspect, DPI", "Reading pixel dimensions, deriving aspect ratio, DPI vs pixels, and common screen/print sizes to benchmark against.", "check image dimensions", "media", ["image-dimensions-checker", "image-resizer", "aspect-ratio-calculator"]],
  ["image-round-corners", "how-to-round-image-corners", "How to Round Image Corners — Radius, Transparency, CSS vs Baked", "Radius in pixels vs percent, transparent PNG for corners, circular crops, CSS border-radius vs baked-in corners.", "round image corners", "media", ["image-round-corners", "border-radius-generator", "profile-pic-circle-cropper"]],
  ["photo-collage", "how-to-make-a-photo-collage", "How to Make a Photo Collage — Grid, Spacing, Export", "Grid layouts, aspect-ratio tricks, spacing and padding, backgrounds, and exporting at print-ready size.", "photo collage", "media", ["photo-collage", "image-resizer", "image-border-adder"]],
  ["profile-pic-circle-cropper", "how-to-crop-a-circular-profile-picture", "How to Crop a Circular Profile Picture", "Centering the face, 1:1 square crops, platform avatar sizes, and PNG transparency for clean circle edges.", "circular profile picture", "media", ["profile-pic-circle-cropper", "image-cropper", "passport-photo-maker"]],
  ["exif-remover", "how-to-remove-exif-metadata", "How to Remove EXIF Metadata From Photos", "What EXIF stores (GPS, camera, time), privacy risks, lossless stripping, and when keeping EXIF is useful.", "remove exif", "media", ["exif-remover", "exif-viewer", "image-compressor"]],
  ["exif-viewer", "how-to-view-exif-metadata", "How to View EXIF Metadata in Photos", "Reading EXIF fields, verifying camera settings, catching edited-but-not-stripped photos, and timezone gotchas in capture time.", "view exif", "media", ["exif-viewer", "exif-remover", "image-dimensions-checker"]],
  ["alt-text-helper", "how-to-write-alt-text", "How to Write Alt Text — Accessibility and SEO", "Accessibility purpose, describing vs captioning, decorative images (empty alt), length guidelines, and SEO overlap.", "alt text", "writing", ["alt-text-helper", "meta-description-length-checker", "readability-score-checker"]],
  ["image-blur-censor", "how-to-blur-faces-in-photos", "How to Blur Faces in Photos — Irreversible, Privacy-Safe", "Pixelation vs Gaussian blur, why mild blur can be reversed, license-plate censoring, and batch options for group shots.", "blur faces", "media", ["image-blur-censor", "image-compressor", "exif-remover"]],
  ["heic-to-jpg", "how-to-convert-heic-to-jpg", "How to Convert HEIC to JPG — iPhone Photo Compatibility", "Why iPhone shoots HEIC, compatibility gaps on Windows/older apps, quality loss on conversion, and batch workflows.", "heic to jpg", "converters", ["heic-to-jpg", "image-format-converter", "image-compressor"]],
  ["svg-to-png", "how-to-convert-svg-to-png", "How to Convert SVG to PNG — Resolution, Transparency", "Vector vs raster, picking output resolution, transparency, antialiasing, and when SVG is better left as SVG.", "svg to png", "converters", ["svg-to-png", "image-format-converter", "favicon-generator"]],
  ["border-radius-generator", "how-to-use-border-radius-in-css", "How to Use border-radius in CSS — Shorthand, Corners, Ellipses", "Shorthand vs individual corners, percent vs pixel values, elliptical radii, and common patterns (pill, card, avatar).", "css border radius", "dev", ["border-radius-generator", "box-shadow-generator", "gradient-generator"]],
  ["box-shadow-generator", "how-to-use-box-shadow-in-css", "How to Use box-shadow in CSS — Elevation, Inset, Stacking", "Shadow syntax (x, y, blur, spread, color), inset shadows, stacking multiple shadows, elevation systems, and dark-mode considerations.", "css box shadow", "dev", ["box-shadow-generator", "border-radius-generator", "gradient-generator"]],
  ["flexbox-playground", "how-to-use-flexbox", "How to Use Flexbox — Layouts, Alignment, Ordering", "flex-direction, justify-content, align-items, flex-wrap, flex-grow/shrink/basis, common patterns, and when to pick flex vs grid.", "flexbox", "dev", ["flexbox-playground", "grid-layout-generator", "border-radius-generator"]],
  ["grid-layout-generator", "how-to-use-css-grid", "How to Use CSS Grid — Tracks, Areas, Responsive Layouts", "grid-template-columns/rows, fr units, grid-area, minmax, auto-fill vs auto-fit, responsive grids, and when to grid vs flex.", "css grid", "dev", ["grid-layout-generator", "flexbox-playground", "border-radius-generator"]],
  ["contrast-checker", "how-to-check-color-contrast", "How to Check Color Contrast — WCAG AA and AAA", "WCAG 4.5:1 AA / 7:1 AAA thresholds, large-text leniency, how luminance is calculated, link colors, and dark-mode.", "color contrast", "dev", ["contrast-checker", "color-converter", "color-picker"]],
  ["color-extractor", "how-to-extract-colors-from-images", "How to Extract Colors From Images — Palettes, Dominants, Brands", "Palette algorithms (k-means, median-cut), dominant vs average, extracting brand colors from logos, and use cases.", "extract colors from images", "media", ["color-extractor", "color-picker", "color-converter"]],
  ["color-picker", "how-to-pick-colors-from-images", "How to Pick Colors From Images — Eyedropper Workflows", "Eyedropper tools, hex at cursor, sampling from screenshots, matching brand colors, and accessibility caveats.", "pick colors from images", "media", ["color-picker", "color-extractor", "color-converter"]],
  ["calorie-calculator", "how-to-calculate-daily-calorie-needs", "How to Calculate Daily Calorie Needs — TDEE, BMR, Activity", "TDEE = BMR × activity, Mifflin-St Jeor formula, deficit/surplus for weight goals, and why calorie math is approximate.", "daily calorie needs", "health", ["calorie-calculator", "bmr-calculator", "macro-calculator"]],
  ["bmr-calculator", "how-to-calculate-your-bmr", "How to Calculate Your BMR — Resting Metabolic Rate", "BMR definitions, Mifflin-St Jeor vs Harris-Benedict, factors that shift BMR, metabolic adaptation, and limitations.", "calculate bmr", "health", ["bmr-calculator", "calorie-calculator", "body-fat-calculator"]],
  ["water-intake-calculator", "how-to-calculate-water-intake", "How to Calculate Daily Water Intake", "The 8x8 myth, body-weight formula, climate and activity adjustments, hydration markers, and overhydration warning.", "water intake", "health", ["water-intake-calculator", "caffeine-intake-calculator", "calorie-calculator"]],
  ["sleep-cycle-calculator", "how-to-time-your-sleep-cycles", "How to Time Your Sleep Cycles — Wake Feeling Rested", "90-minute cycles, REM and deep sleep, waking at the end of a cycle, sleep debt, and chronotype variation.", "sleep cycles", "health", ["sleep-cycle-calculator", "pomodoro-timer", "fasting-timer"]],
  ["pomodoro-timer", "how-to-use-the-pomodoro-technique", "How to Use the Pomodoro Technique — Focus Cycles", "25/5 cycles, the four-and-long-break pattern, task batching, context switches, and Pomodoro variants.", "pomodoro technique", "productivity", ["pomodoro-timer", "stopwatch", "countdown-timer"]],
  ["fasting-timer", "how-to-do-intermittent-fasting", "How to Do Intermittent Fasting — 16:8, 18:6, OMAD", "16:8, 18:6, OMAD schedules, what breaks a fast, benefits and risks, beginner ramp-up, and medical cautions.", "intermittent fasting", "health", ["fasting-timer", "calorie-calculator", "water-intake-calculator"]],
  ["heart-rate-zone-calculator", "how-to-find-your-heart-rate-zones", "How to Find Your Heart Rate Zones — 220-Age and Karvonen", "220-age max, Karvonen method, Zones 1-5 physiology, LT1/LT2 references, and training prescriptions by zone.", "heart rate zones", "health", ["heart-rate-zone-calculator", "running-pace-calculator", "calorie-calculator"]],
  ["steps-to-calories-calculator", "how-to-estimate-calories-burned-from-steps", "How to Estimate Calories Burned From Steps", "Steps-to-distance, MET values per pace, body-weight scaling, and accuracy limits of step counters.", "calories from steps", "health", ["steps-to-calories-calculator", "calorie-calculator", "heart-rate-zone-calculator"]],
  ["smoking-cost-calculator", "how-to-calculate-the-cost-of-smoking", "How to Calculate the Cost of Smoking — Lifetime Math", "Pack-a-day math, annual cost, compounded savings if quit, secondary costs (insurance, dental), and motivation framing.", "cost of smoking", "health", ["smoking-cost-calculator", "subscription-cost-calculator", "compound-interest-calculator"]],
  ["caffeine-intake-calculator", "how-to-manage-caffeine-intake", "How to Manage Caffeine Intake — 400mg, Half-Life, Cut-Off", "400mg daily limit, half-life of 5-6 hours, cut-off before bed, tolerance, tapering plans, and sensitive populations.", "caffeine intake", "health", ["caffeine-intake-calculator", "water-intake-calculator", "sleep-cycle-calculator"]],
  ["alcohol-unit-calculator", "how-to-count-alcohol-units", "How to Count Alcohol Units — UK Units, US Standard Drinks", "UK unit formula (ABV × ml / 1000), US standard drink = 14g alcohol, weekly guidelines, and wine/beer/spirits math.", "alcohol units", "health", ["alcohol-unit-calculator", "caffeine-intake-calculator", "calorie-calculator"]],
  ["protein-intake-calculator", "how-to-calculate-protein-intake", "How to Calculate Protein Intake — g/kg Targets", "g/kg targets (0.8 sedentary, 1.6-2.2 strength), per-meal distribution, leucine threshold, and vegan sources.", "protein intake", "health", ["protein-intake-calculator", "macro-calculator", "calorie-calculator"]],
  ["fiber-intake-calculator", "how-to-hit-daily-fiber-targets", "How to Hit Daily Fiber Targets — 25g / 38g", "25g / 38g daily targets, soluble vs insoluble fiber, fiber-rich foods, and how to ramp up to avoid GI issues.", "fiber intake", "health", ["fiber-intake-calculator", "carbohydrate-calculator", "calorie-calculator"]],
  ["carbohydrate-calculator", "how-to-count-carbs", "How to Count Carbs — Total vs Net, GI, Keto", "Total vs net carbs, glycemic index vs load, diabetic carb-counting, keto thresholds, and label-reading.", "count carbs", "health", ["carbohydrate-calculator", "macro-calculator", "calorie-calculator"]],
  ["body-fat-calculator", "how-to-estimate-body-fat-percentage", "How to Estimate Body Fat Percentage — Navy, Calipers, DEXA", "Navy tape method, skinfold calipers, DEXA accuracy, BMI vs body-fat, and healthy ranges by sex and age.", "body fat percentage", "health", ["body-fat-calculator", "bmr-calculator", "bmi-calculator"]],
  ["apartment-affordability-calculator", "how-to-calculate-apartment-affordability", "How to Calculate Apartment Affordability", "30% rent rule, 50/30/20 check, landlord income multipliers (3x rent), and security-deposit math.", "apartment affordability", "money", ["apartment-affordability-calculator", "mortgage-affordability-calculator", "budget-calculator"]],
  ["401k-calculator", "how-to-plan-your-401k-contributions", "How to Plan Your 401(k) Contributions", "2026 contribution limit, employer match, traditional vs Roth 401(k), catch-up contributions at 50+, and vesting schedules.", "401k contributions", "money", ["401k-calculator", "roth-ira-calculator", "retirement-calculator"]],
  ["roth-ira-calculator", "how-to-plan-roth-ira-contributions", "How to Plan Roth IRA Contributions — Limits, Phase-Outs, Rules", "2026 limit, income phase-outs, backdoor Roth, 5-year rule, and withdrawal flexibility.", "roth ira contributions", "money", ["roth-ira-calculator", "401k-calculator", "retirement-calculator"]],
  ["emergency-fund-calculator", "how-to-size-your-emergency-fund", "How to Size Your Emergency Fund", "3-6 months of expenses, what counts as an expense, high-yield savings placement, and ramping up gradually.", "size emergency fund", "money", ["emergency-fund-calculator", "budget-calculator", "savings-goal-calculator"]],
  ["college-savings-calculator", "how-to-save-for-college", "How to Save for College — 529s, Coverdell, Compounding", "529 plans, Coverdell ESAs, projected college cost inflation, age-based allocations, and FAFSA impact.", "save for college", "money", ["college-savings-calculator", "compound-interest-calculator", "savings-goal-calculator"]],
  ["inflation-calculator", "how-to-adjust-for-inflation", "How to Adjust for Inflation — CPI, Real vs Nominal", "CPI index math, nominal vs real returns, historical inflation rates, Fisher equation, and why 3% compounds fast.", "adjust for inflation", "money", ["inflation-calculator", "compound-interest-calculator", "currency-converter"]],
  ["refinance-calculator", "how-to-decide-if-refinancing-makes-sense", "How to Decide If Refinancing Makes Sense", "Break-even point formula, closing costs, rate-delta thresholds, cash-out trade-offs, and ARM-to-fixed reasons.", "refinance decision", "money", ["refinance-calculator", "mortgage-calculator", "loan-calculator"]],
  ["lease-vs-buy-calculator", "how-to-decide-lease-vs-buy", "How to Decide: Lease vs Buy", "Total cost of ownership, mileage caps, residual value, depreciation curve, and when leasing actually makes sense.", "lease vs buy", "money", ["lease-vs-buy-calculator", "auto-loan-calculator", "loan-calculator"]],
  ["moving-cost-calculator", "how-to-estimate-moving-costs", "How to Estimate Moving Costs", "DIY vs full-service vs hybrid, distance and weight factors, packing supplies, insurance, and hidden fees.", "moving costs", "money", ["moving-cost-calculator", "apartment-affordability-calculator", "trip-cost-calculator"]],
  ["fuel-cost-calculator", "how-to-estimate-a-trip-fuel-cost", "How to Estimate a Trip's Fuel Cost", "MPG × price × distance, city vs highway MPG, elevation effects, multi-leg trips, and vehicle comparison.", "trip fuel cost", "money", ["fuel-cost-calculator", "moving-cost-calculator", "trip-cost-calculator"]],
  ["subscription-cost-calculator", "how-to-audit-subscription-spend", "How to Audit Your Subscription Spend", "Quarterly subscription audit, annualization math, forgotten-trial traps, consolidation, and cancellation workflows.", "audit subscriptions", "money", ["subscription-cost-calculator", "budget-calculator", "smoking-cost-calculator"]],
  ["bill-split-calculator", "how-to-split-a-bill", "How to Split a Bill — Even, Itemized, Tax and Tip", "Even split vs itemized, handling shared appetizers, tax and tip inclusion, Venmo/Zelle etiquette, and round-ups.", "split a bill", "money", ["bill-split-calculator", "tip-calculator", "expense-split-calculator"]],
  ["discount-calculator", "how-to-calculate-discounts", "How to Calculate Discounts — Percent Off, Stacked, BOGO", "Percent-off math, stacked discounts, BOGO, sale vs MSRP psychology, and tax on the discounted price.", "calculate discounts", "money", ["discount-calculator", "sales-tax-calculator", "percentage-calculator"]],
  ["sales-tax-calculator", "how-to-calculate-sales-tax", "How to Calculate Sales Tax — State, Local, Services", "State + local rate stacking, tax on services vs goods, tax-free weekends, and inclusive vs exclusive pricing.", "calculate sales tax", "money", ["sales-tax-calculator", "tip-calculator", "discount-calculator"]],
  ["text-reverser", "how-to-reverse-text", "How to Reverse Text — Character, Word, Unicode Edge Cases", "Character-level vs word-level reversal, Unicode complications (combining characters, emoji), RTL scripts, and palindrome checks.", "reverse text", "text", ["text-reverser", "text-repeater", "case-converter"]],
  ["text-sorter", "how-to-sort-lines-of-text", "How to Sort Lines of Text — Alphabetical, Numeric, Natural", "Alphabetical vs numeric, case-sensitive vs insensitive, natural sort, stable sort, reverse sort, and locale considerations.", "sort lines", "text", ["text-sorter", "remove-duplicate-lines", "text-joiner"]],
  ["line-break-remover", "how-to-remove-line-breaks", "How to Remove Line Breaks — LF, CRLF, Paragraph-Safe", "LF vs CRLF vs CR, paragraph preservation, bulk flatten, undo-able strategies, and regex patterns.", "remove line breaks", "text", ["line-break-remover", "whitespace-remover", "remove-duplicate-lines"]],
  ["whitespace-remover", "how-to-remove-extra-whitespace", "How to Remove Extra Whitespace — Trim, Collapse, NBSP", "Trimming, collapsing runs of spaces, non-breaking spaces, tab-to-space, and preserving code indentation.", "remove whitespace", "text", ["whitespace-remover", "line-break-remover", "special-character-remover"]],
  ["special-character-remover", "how-to-strip-special-characters", "How to Strip Special Characters — ASCII-Only, URL-Safe", "Defining 'special' characters, ASCII-only cleanup, preserving spaces and punctuation, regex patterns, and URL-safe output.", "strip special characters", "text", ["special-character-remover", "unicode-text-normalizer", "slug-generator"]],
  ["unicode-text-normalizer", "how-to-normalize-unicode-text", "How to Normalize Unicode Text — NFC, NFD, NFKC, NFKD", "NFC/NFD/NFKC/NFKD forms, composed vs decomposed, homoglyph attacks, search indexing, and database key normalization.", "normalize unicode", "text", ["unicode-text-normalizer", "invisible-character-detector", "special-character-remover"]],
  ["invisible-character-detector", "how-to-detect-invisible-characters", "How to Detect Invisible Characters — ZWJ, BOM, NBSP", "Zero-width joiner/non-joiner, BOM, non-breaking spaces, tag characters, and how they break regex and search after paste.", "detect invisible characters", "text", ["invisible-character-detector", "unicode-text-normalizer", "whitespace-remover"]],
  ["remove-duplicate-lines", "how-to-remove-duplicate-lines", "How to Remove Duplicate Lines — Exact, Trimmed, Case-Insensitive", "Exact vs case-insensitive dedup, preserve-first vs preserve-last, trimmed vs raw comparison, and streaming large files.", "remove duplicate lines", "text", ["remove-duplicate-lines", "text-sorter", "line-counter"]],
  ["word-frequency-counter", "how-to-count-word-frequency", "How to Count Word Frequency — Tokens, Stop-Words, n-Grams", "Tokenization, stop-words, stemming, n-grams, and use cases (SEO, style checks, research corpora).", "word frequency", "text", ["word-frequency-counter", "keyword-density-checker", "word-counter"]],
  ["number-to-words", "how-to-write-numbers-in-words", "How to Write Numbers in Words — Cardinal, Ordinal, Checks", "Cardinal vs ordinal, check-writing rules, short vs long scale (billion/milliard), negatives/decimals, and locales.", "numbers in words", "text", ["number-to-words", "roman-numeral-converter", "number-base-converter"]],
  ["snake-case-converter", "how-to-convert-to-snake-case", "How to Convert to snake_case — Rules, Acronyms, Languages", "snake_case vs SCREAMING_SNAKE, PascalCase-to-snake rules, acronym handling, and language conventions (Python, Ruby, DB columns).", "convert to snake case", "text", ["snake-case-converter", "kebab-case-converter", "case-converter"]],
];

// Map category → valid tools-category enum. Valid guide category: ai, how-to, tools, business, technical, productivity, design-media.
const toGuideCat = (cat) => {
  if (cat === "writing" || cat === "text") return "writing-guide"; // placeholder — use how-to
  return "how-to";
};

// Map first-char uppercase PascalCase identifier from slug
const toIdent = (slug) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

const categoryMap = {
  media: "media",
  writing: "writing",
  text: "text",
  converters: "converters",
  dev: "dev",
  health: "health",
  productivity: "productivity",
  money: "money",
};

// 1. Generate registry imports + map entries
const imports = entries
  .map(([tool, guide]) => `import * as ${toIdent(guide)} from "./${guide}";`)
  .join("\n");

const mapEntries = entries
  .map(([tool, guide]) => {
    const ident = toIdent(guide);
    const toolName = tool.replace(/-/g, " ");
    return `  "${guide}": {
    intro: ${ident}.intro,
    body: ${ident}.body,
    cta: {
      label: "Try the ${toolName} — free and private.",
      targetSlug: "${tool}",
    },
  },`;
  })
  .join("\n");

// 2. Generate manifest entries
const manifestEntries = entries
  .map(([tool, guide, title, description, keyword, category, related]) => {
    const cat = categoryMap[category] ?? "productivity";
    const relatedArr = related.map((s) => `"${s}"`).join(", ");
    return `  { slug: "${guide}", type: "article", category: "${cat}",
    title: "${title}",
    h1: "${title.split(" — ")[0]}",
    description: "${description}",
    keyword: "${keyword}",
    related: [${relatedArr}],
    guideCategory: "how-to",
    published: true },`;
  })
  .join("\n");

// 3. Apply edits to registry.tsx
let reg = readFileSync("content/guides/registry.tsx", "utf8");

// Add imports after ConvertTextToSpeech import
const importAnchor = `import * as ConvertTextToSpeech from "./how-to-convert-text-to-speech";`;
if (!reg.includes(importAnchor)) {
  console.error("Missing import anchor ConvertTextToSpeech");
  process.exit(1);
}
reg = reg.replace(importAnchor, `${importAnchor}\n${imports}`);

// Add map entries after the how-to-convert-text-to-speech map block
const mapAnchor = `  "how-to-convert-text-to-speech": {
    intro: ConvertTextToSpeech.intro,
    body: ConvertTextToSpeech.body,
    cta: {
      label: "Convert text to spoken audio — free text-to-speech tool.",
      targetSlug: "text-to-speech",
    },
  },`;
if (!reg.includes(mapAnchor)) {
  console.error("Missing map anchor how-to-convert-text-to-speech");
  process.exit(1);
}
reg = reg.replace(mapAnchor, `${mapAnchor}\n${mapEntries}`);

writeFileSync("content/guides/registry.tsx", reg);
console.log("registry.tsx patched");

// 4. Apply manifest entries to pages.ts — after the last batch-31-50 entry (how-to-convert-text-to-speech)
let pages = readFileSync("lib/pages.ts", "utf8");

const manifestAnchor = `  { slug: "how-to-convert-text-to-speech", type: "article", category: "media",
    title: "How to Convert Text to Speech — Browser Voices vs Neural TTS",
    h1: "How to convert text to speech",
    description: "Web Speech API vs neural/commercial TTS, picking voices, SSML for pauses and emphasis, rate and pitch control, and when to export vs play inline.",
    keyword: "text to speech",
    related: ["text-to-speech", "speech-to-text", "voice-note-transcriber"],
    guideCategory: "how-to",
    published: true },`;
if (!pages.includes(manifestAnchor)) {
  console.error("Missing manifest anchor how-to-convert-text-to-speech");
  process.exit(1);
}
pages = pages.replace(manifestAnchor, `${manifestAnchor}\n${manifestEntries}`);

// 5. Append guide slug to each target tool's related[]
let patched = 0;
let skipped = 0;
let missing = [];
for (const [tool, guide] of entries) {
  const slugRe = new RegExp(`(\\{\\s*slug:\\s*"${tool}"[^}]*?related:\\s*\\[)([^\\]]*)(\\])`, "s");
  const m = pages.match(slugRe);
  if (!m) {
    missing.push(tool);
    continue;
  }
  if (m[2].includes(`"${guide}"`)) {
    skipped++;
    continue;
  }
  const items = m[2].trimEnd();
  const sep = items.length && !items.endsWith(",") ? ", " : items.endsWith(",") ? " " : "";
  pages = pages.replace(m[0], `${m[1]}${items}${sep}"${guide}"${m[3]}`);
  patched++;
}

writeFileSync("lib/pages.ts", pages);
console.log(`pages.ts patched: ${patched} reciprocal, ${skipped} skipped, ${missing.length} missing`);
if (missing.length) console.log("missing:", missing.join(", "));

// Write a list of non-how-to categories we used so I can map them.
const catsUsed = [...new Set(entries.map((e) => e[5]))];
console.log("categories used:", catsUsed.join(", "));
