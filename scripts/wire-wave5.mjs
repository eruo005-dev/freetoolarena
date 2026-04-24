// Wire Wave 5: 10 gardening + 10 pets tools
import { readFileSync, writeFileSync } from "node:fs";

const tools = [
  // Gardening (10) - category home
  ["usda-hardiness-zone-lookup", "UsdaHardinessZoneLookup", "USDA Hardiness Zone Lookup", "Find your USDA plant hardiness zone by ZIP code. Min temperature range and plant recommendations.", "usda hardiness zone", "home", ["frost-date-lookup", "planting-calendar-by-zone", "plant-watering-schedule"], "Your zone decides what grows. Quick ZIP-to-zone lookup with min-temp range and frost-risk months.", ["Enter ZIP code.", "Read zone + temp range.", "See recommended plants."]],
  ["frost-date-lookup", "FrostDateLookup", "Frost Date Lookup", "Last spring frost + first fall frost by USDA zone. Growing season length and safe planting dates.", "frost date lookup", "home", ["usda-hardiness-zone-lookup", "planting-calendar-by-zone", "seed-spacing-calculator"], "Last spring frost decides when you can plant outside. First fall frost decides when you&rsquo;d better harvest. Both by zone.", ["Pick your zone.", "Read frost dates.", "Check growing season length."]],
  ["planting-calendar-by-zone", "PlantingCalendarByZone", "Planting Calendar by USDA Zone", "When to start + direct-sow 20 crops by your zone. Full table with harvest estimates.", "planting calendar by zone", "home", ["frost-date-lookup", "seed-spacing-calculator", "companion-plant-checker"], "Zone-aware planting dates for 20 crops. Start indoors, direct-sow, or transplant &mdash; with expected harvest dates.", ["Pick your zone.", "Scan the crop table.", "Plan your planting weeks."]],
  ["seed-spacing-calculator", "SeedSpacingCalculator", "Seed Spacing Calculator", "How many plants fit a bed, how many seeds to buy. Row and square-foot-garden layouts.", "seed spacing calculator", "home", ["garden-bed-soil-volume", "planting-calendar-by-zone", "raised-bed-cost-calculator"], "Bed dimensions + crop = plants that fit, seeds to buy (2x for thinning), spacing diagram.", ["Enter bed dimensions.", "Pick crop + layout.", "Read plants + seeds."]],
  ["garden-bed-soil-volume", "GardenBedSoilVolume", "Garden Bed Soil Volume Calculator", "Cubic yards / bags of soil for any raised bed. Bulk vs bagged cost comparison with 10% buffer.", "garden bed soil volume", "home", ["mulch-cubic-yards-calculator", "raised-bed-cost-calculator", "seed-spacing-calculator"], "Cu ft, cu yd, bags, cost &mdash; everything to fill a raised bed. With the always-overlooked 10% buffer.", ["Enter bed dimensions.", "Set soil depth.", "Read cu yd + bag count."]],
  ["compost-ratio-calculator", "CompostRatioCalculator", "Compost Ratio Calculator", "Green:brown ratio for a healthy pile. Pile health tier, what to add, do-not-add list.", "compost ratio", "home", ["plant-watering-schedule", "mulch-cubic-yards-calculator", "raised-bed-cost-calculator"], "Pile too wet and smelly? Too dry and inactive? Target 1:3 green:brown. This shows your current balance and what to add.", ["Enter green + brown volumes.", "Read ratio + health tier.", "Adjust to balance."]],
  ["companion-plant-checker", "CompanionPlantChecker", "Companion Plant Checker", "Pair 20 common garden vegetables for good or bad companions. Three Sisters callout included.", "companion plant checker", "home", ["planting-calendar-by-zone", "seed-spacing-calculator", "garden-bed-soil-volume"], "Tomato + basil? Excellent. Tomato + corn? Avoid. 20 common crops paired with reasons and alternatives.", ["Pick two crops.", "Read compatibility tier.", "Swap if bad."]],
  ["mulch-cubic-yards-calculator", "MulchCubicYardsCalculator", "Mulch Cubic Yards Calculator", "Mulch volume for any area. Bulk vs bagged cost, coverage depth guidelines.", "mulch cubic yards", "home", ["garden-bed-soil-volume", "raised-bed-cost-calculator", "plant-watering-schedule"], "3 inches is standard for weed suppression. Area × depth = cu yd. Bulk delivery beats bags above 2 cu yd.", ["Enter area + depth.", "Read cu yd.", "Compare bulk vs bagged."]],
  ["raised-bed-cost-calculator", "RaisedBedCostCalculator", "Raised Bed Cost Calculator", "Lumber + soil + hardware cost for a raised bed. Cedar / pine / composite / metal materials.", "raised bed cost calculator", "home", ["garden-bed-soil-volume", "mulch-cubic-yards-calculator", "seed-spacing-calculator"], "Cedar lasts 10-15 years, pine 5-7. Full cost &mdash; lumber + soil + hardware &mdash; for any bed size and material.", ["Enter bed dimensions.", "Pick material + soil.", "Read total cost."]],
  ["plant-watering-schedule", "PlantWateringSchedule", "Plant Watering Schedule", "Watering schedule by plant type, soil, climate. Minutes per session at 1 gph drip.", "plant watering schedule", "home", ["compost-ratio-calculator", "planting-calendar-by-zone", "mulch-cubic-yards-calculator"], "Sandy soil drains fast. Clay holds. Hot-arid doubles the need. Here&rsquo;s a schedule tuned to all three plus the plant type.", ["Pick plant + soil + climate.", "Pick season.", "Read days/week + minutes."]],

  // Pets (10) - category pets
  ["dog-age-in-human-years", "DogAgeInHumanYears", "Dog Age in Human Years Calculator", "Modern research-based dog-to-human age. Size-adjusted since giants age faster.", "dog age in human years", "pets", ["cat-age-in-human-years", "dog-food-amount-calculator", "pet-weight-tracker"], "The old 'dog years = 7 human' rule is wrong. 2019 UCSD epigenetic research gives a more accurate curve, size-adjusted here.", ["Enter dog age and size.", "Read human equivalent.", "See remaining life expectancy."]],
  ["cat-age-in-human-years", "CatAgeInHumanYears", "Cat Age in Human Years Calculator", "Cat-to-human age with life stage and care guidance. Indoor vs outdoor life expectancy.", "cat age in human years", "pets", ["dog-age-in-human-years", "cat-food-amount-calculator", "pet-weight-tracker"], "Year 1 = 15 human. Year 2 = 24. +4 per year after. Plus life-stage care notes (kitten through super-senior).", ["Enter cat age.", "Indoor or outdoor?", "Read human equivalent + care notes."]],
  ["dog-food-amount-calculator", "DogFoodAmountCalculator", "Dog Food Amount Calculator", "Daily calories and cups by weight, age, activity, body condition. Meal split included.", "dog food amount", "pets", ["cat-food-amount-calculator", "dog-age-in-human-years", "pet-weight-tracker"], "Resting Energy Requirement (RER) × activity multiplier. Cups per day, meals per day &mdash; based on your dog&rsquo;s actual needs.", ["Enter weight + age.", "Pick activity + body condition.", "Read cups/day + meals."]],
  ["cat-food-amount-calculator", "CatFoodAmountCalculator", "Cat Food Amount Calculator", "Daily cat food by weight, age, food type (dry/wet/mixed). Kcal and pouches.", "cat food amount", "pets", ["dog-food-amount-calculator", "cat-age-in-human-years", "pet-weight-tracker"], "10-lb adult cat = ~250 kcal/day. This converts to cups of kibble or pouches of wet, with a hydration note.", ["Enter weight + age.", "Pick food type.", "Read daily amount."]],
  ["pet-travel-cost-estimator", "PetTravelCostEstimator", "Pet Travel Cost Estimator", "Pet travel cost by mode (car / cabin / cargo), hotels, supplies. Boarding comparison.", "pet travel cost", "pets", ["kennel-boarding-cost-calculator", "pet-insurance-cost-estimator", "travel-budget-calculator"], "Bringing the pet vs boarding &mdash; compare total cost. Airline cabin $95-200, cargo $200-400, hotel pet fees $20-50/night.", ["Pick mode + trip length.", "Set hotel nights.", "Read cost vs boarding."]],
  ["pet-insurance-cost-estimator", "PetInsuranceCostEstimator", "Pet Insurance Cost Estimator", "Rough monthly premium by pet type, age, breed risk, coverage level, and deductible.", "pet insurance cost", "pets", ["pet-travel-cost-estimator", "kennel-boarding-cost-calculator", "pet-medication-dosage-lookup"], "Insurance premium range by pet age, breed risk, coverage level, and deductible. Compare at Healthy Paws / Trupanion / Embrace for actual quotes.", ["Pick pet type + age.", "Set coverage + deductible.", "Read monthly premium range."]],
  ["pet-weight-tracker", "PetWeightTracker", "Pet Weight Tracker", "Log weight over time, see trend and rate. 1% per week safe change rate reference.", "pet weight tracker", "pets", ["dog-food-amount-calculator", "cat-food-amount-calculator", "dog-walk-distance-tracker"], "Track pet weight over time, see trend. Healthy change is 1% body weight per week max &mdash; anything faster is a vet check.", ["Enter weight log.", "Read trend.", "Compare to safe rate."]],
  ["kennel-boarding-cost-calculator", "KennelBoardingCostCalculator", "Kennel Boarding Cost Calculator", "Total kennel boarding cost by tier, extras, and length. Daycare alternative noted.", "kennel boarding cost", "pets", ["pet-travel-cost-estimator", "pet-insurance-cost-estimator", "dog-walk-distance-tracker"], "Standard dog boarding $35-55/night. Premium adds 50%. Extras (group play, walks, meds) add up fast &mdash; itemize here.", ["Pick tier + size.", "Select extras.", "Read total."]],
  ["dog-walk-distance-tracker", "DogWalkDistanceTracker", "Dog Walk Distance Tracker", "Log walks, see daily and weekly totals, calories burned, and target attainment by breed energy.", "dog walk tracker", "pets", ["pet-weight-tracker", "dog-food-amount-calculator", "dog-age-in-human-years"], "Log walks in one textarea. Weekly totals, pace, calories burned, attainment against your breed&rsquo;s energy target.", ["Log walks (date, time, distance).", "Pick breed energy.", "Read weekly summary."]],
  ["pet-medication-dosage-lookup", "PetMedicationDosageLookup", "Pet Medication Dosage Lookup", "Reference dosing for 5 common pet meds. Species safety warnings. NOT a substitute for your vet.", "pet medication dosage", "pets", ["pet-insurance-cost-estimator", "pet-weight-tracker", "dog-food-amount-calculator"], "Reference only for 5 meds. Aspirin kills cats. Tylenol kills cats. Chocolate kills dogs. Always call your vet before giving anything.", ["Enter pet weight.", "Pick medication.", "Read dosage + warnings."]],
];

let toolSrc = readFileSync("components/tools/registry.tsx", "utf8");
const toolImports = tools.map(([, cls]) => `const ${cls} = dynamic(() => import("./${cls}").then(m => ({ default: m.${cls} })), { loading: Skeleton });`).join("\n");
const registryAnchor = `export const TOOL_REGISTRY: Record<string, ToolEntry> = {`;
toolSrc = toolSrc.replace(registryAnchor, `// Wave 5 gardening + pets (20 new)\n${toolImports}\n\n${registryAnchor}`);
const lastRegEnd = toolSrc.lastIndexOf("};");
const toolEntries = tools.map(([slug, cls, , , , , , explainer, howToUse]) => {
  const howToStr = howToUse.map((s) => `      "${s.replace(/"/g, '\\"')}",`).join("\n");
  return `  "${slug}": {\n    render: () => <${cls} />,\n    explainer: (\n      <>\n        <p>${explainer}</p>\n        <p>\n          Runs entirely in your browser — no upload, no account, no watermark.\n          For more tools in this category see the{" "}\n          <a href="/tools">full tools index</a>.\n        </p>\n      </>\n    ),\n    howToUse: [\n${howToStr}\n    ],\n  },`;
}).join("\n");
toolSrc = toolSrc.slice(0, lastRegEnd) + toolEntries + "\n" + toolSrc.slice(lastRegEnd);
writeFileSync("components/tools/registry.tsx", toolSrc);
console.log("registry patched:", tools.length);

let pages = readFileSync("lib/pages.ts", "utf8");
const marker = "export const PAGES: Page[] = [";
const markerStart = pages.indexOf(marker);
const openBracket = markerStart + marker.length - 1;
let depth = 1, i = openBracket + 1, inStr = false, q = "", esc = false;
while (i < pages.length && depth > 0) {
  const c = pages[i];
  if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === q) inStr = false; }
  else if (c === '"' || c === "'" || c === "`") { inStr = true; q = c; }
  else if (c === "[") depth++;
  else if (c === "]") depth--;
  i++;
}
const closeBracket = i - 1;
const esc2 = (s) => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
const manifestEntries = tools.map(([slug, , title, description, keyword, category, related]) => {
  const relatedArr = related.map((s) => `"${s}"`).join(", ");
  return `  { slug: "${slug}", type: "tool", category: "${category}",\n    title: "${esc2(title)}",\n    h1: "${esc2(title)}",\n    description: "${esc2(description)}",\n    keyword: "${keyword}",\n    related: [${relatedArr}],\n    published: true },`;
}).join("\n");
pages = pages.slice(0, closeBracket) + "\n" + manifestEntries + "\n" + pages.slice(closeBracket);
writeFileSync("lib/pages.ts", pages);
console.log("manifest patched:", tools.length);
