// Wire 15 travel tools into components/tools/registry.tsx + lib/pages.ts
import { readFileSync, writeFileSync } from "node:fs";

const tools = [
  ["flight-time-calculator", "FlightTimeCalculator", "Flight Time Calculator", "Great-circle flight time between 50+ major airports. Distance in km and miles, with taxi/takeoff buffer.", "flight time calculator", "home", ["jet-lag-recovery-calculator", "layover-risk-checker", "flight-carbon-footprint-calculator"], "Estimate flight time between any two major airports using great-circle distance and typical cruise speed. Works offline once loaded.", ["Pick origin airport.", "Pick destination airport.", "Read distance and flight time."]],
  ["jet-lag-recovery-calculator", "JetLagRecoveryCalculator", "Jet Lag Recovery Calculator", "Days to recover from jet lag based on timezones crossed and travel direction. Eastward travel is harder.", "jet lag recovery", "health", ["flight-time-calculator", "daylight-savings-lookup", "sleep-cycle-calculator"], "How many days to fully adjust after a long flight? Formula accounts for direction (eastward is slower) and timezone shift.", ["Pick origin and destination timezones.", "Pick direction.", "Read recovery days + adjustment tips."]],
  ["layover-risk-checker", "LayoverRiskChecker", "Layover Risk Checker", "Is your connection too tight? Tier-based check by airport size, international flag, and customs requirement.", "layover risk checker", "home", ["flight-time-calculator", "passport-expiry-checker", "travel-budget-calculator"], "Safe or tight? Layover analyzer tuned for airport size, domestic vs international, and customs/terminal-change reality.", ["Enter layover duration.", "Pick airport type + flags.", "Read tier and risk %."]],
  ["passport-expiry-checker", "PassportExpiryChecker", "Passport Expiry Checker", "Is your passport valid enough for your trip? Handles the 6-month rule for most countries.", "passport expiry checker", "home", ["layover-risk-checker", "travel-insurance-cost-estimator", "schengen-90-180-tracker"], "Most countries enforce a 6-month validity rule &mdash; travelers get turned away at boarding. Check before booking.", ["Enter passport expiry.", "Enter travel dates.", "Pick destination, read pass/fail."]],
  ["tip-by-country-lookup", "TipByCountryLookup", "Tip by Country Lookup", "Tipping norms for 40+ countries. Restaurants, taxis, hotels, bars &mdash; with bill-amount tip calculator.", "tip by country", "home", ["travel-budget-calculator", "flight-time-calculator", "layover-risk-checker"], "Tipping culture varies wildly &mdash; 20% in the US, zero in Japan, service-included in France. This covers 40 countries across 4 contexts.", ["Pick destination country.", "Read tipping norms.", "Enter bill, read tip amount."]],
  ["international-data-cost-estimator", "InternationalDataCostEstimator", "International Data Cost Estimator", "Carrier roaming vs eSIM vs local SIM cost comparison for any destination and trip length.", "international data roaming cost", "home", ["travel-budget-calculator", "flight-time-calculator", "passport-expiry-checker"], "Should you pay $10/day roaming, grab an Airalo eSIM, or buy a local SIM on arrival? Quick comparison by region and usage.", ["Pick destination region + days.", "Enter daily data estimate.", "Read cost for each option."]],
  ["flight-carbon-footprint-calculator", "FlightCarbonFootprintCalculator", "Flight Carbon Footprint Calculator", "Kg CO2 per passenger by flight distance and cabin class. Shows real-world equivalents and trees-to-offset.", "flight carbon footprint", "home", ["flight-time-calculator", "jet-lag-recovery-calculator", "travel-budget-calculator"], "Your flight emissions, in kg CO2. Business class = 2.9x economy per seat. Multi-leg adds 15%. Reducing flights beats offsetting.", ["Enter distance and cabin class.", "Read kg CO2 per passenger.", "See equivalent in gasoline and trees."]],
  ["road-trip-planner", "RoadTripPlanner", "Road Trip Planner", "Fuel + hotels + food + attractions cost for any US road trip. Days on road + per-person split.", "road trip planner", "money", ["travel-budget-calculator", "flight-carbon-footprint-calculator", "tip-by-country-lookup"], "From fuel cost to hotel nights to daily food &mdash; the full road-trip budget in one page. Adjust days/MPG/gas price for your reality.", ["Enter distance and MPG.", "Set daily hours + per-day costs.", "Read itemized + per-person totals."]],
  ["travel-budget-calculator", "TravelBudgetCalculator", "Travel Budget Calculator", "Full trip budget: flights + hotel + daily food/transport/activities + one-time costs. Per-person breakdown.", "travel budget calculator", "money", ["road-trip-planner", "international-data-cost-estimator", "travel-insurance-cost-estimator"], "Plan a trip budget that doesn&rsquo;t blow up. All four cost categories, 10% buffer, per-person + per-day split.", ["Enter flight and hotel costs.", "Set daily budgets.", "Add one-time costs, read total."]],
  ["vacation-day-optimizer", "VacationDayOptimizer", "Vacation Day Optimizer", "Max PTO leverage: which days to request around public holidays to get the longest time off.", "vacation day optimizer", "career", ["schengen-90-180-tracker", "best-time-to-book-calculator", "travel-budget-calculator"], "3 PTO days around Thanksgiving = 9 days off. Pick your country, set your PTO bank, and this ranks the best holiday clusters by efficiency.", ["Pick country + PTO days.", "Read ranked holiday clusters.", "Book the highest-efficiency breaks."]],
  ["schengen-90-180-tracker", "Schengen90180Tracker", "Schengen 90/180 Tracker", "Track days in the Schengen area under the rolling-180-day rule. Pass/fail for any planned entry.", "schengen 90 180 tracker", "home", ["passport-expiry-checker", "vacation-day-optimizer", "travel-budget-calculator"], "Max 90 days in Schengen within any 180-day rolling window. This tracks your history and tests any planned entry.", ["Paste prior Schengen stays.", "Enter planned entry.", "Read pass/fail + remaining days."]],
  ["airbnb-cleaning-fee-fairness", "AirbnbCleaningFeeFairness", "Airbnb Cleaning Fee Fairness Checker", "Is that $200 cleaning fee reasonable? Tier verdict + effective per-night rate + amortization over stay.", "airbnb cleaning fee fairness", "home", ["airbnb-revenue-estimator", "travel-budget-calculator", "road-trip-planner"], "Cleaning fees punish short stays. See the real per-night cost after the fee amortizes &mdash; and whether this listing is fair, steep, or gouging.", ["Enter cleaning fee + nightly rate.", "Enter nights.", "Read tier verdict."]],
  ["daylight-savings-lookup", "DaylightSavingsLookup", "Daylight Savings Lookup", "Is DST active at a city on a specific date? Covers US, EU, southern-hemisphere rules, and no-DST locations.", "daylight savings lookup", "home", ["jet-lag-recovery-calculator", "flight-time-calculator", "best-time-to-book-calculator"], "DST dates vary by country. This checks 30+ cities so you know the correct UTC offset on the date of your meeting or flight.", ["Pick a city.", "Pick a date.", "Read DST status + offset."]],
  ["best-time-to-book-calculator", "BestTimeToBookCalculator", "Best Time to Book Flights Calculator", "When to book for the lowest fare &mdash; domestic vs international vs peak-season sweet spots.", "best time to book flights", "home", ["travel-budget-calculator", "flight-time-calculator", "travel-insurance-cost-estimator"], "The sweet spot depends on trip type: domestic 1-3 months out, international long-haul 3-8. Find your booking window for any trip.", ["Pick trip type.", "Pick departure date.", "Read tier + days until sweet spot."]],
  ["travel-insurance-cost-estimator", "TravelInsuranceCostEstimator", "Travel Insurance Cost Estimator", "Rough quote by trip cost, traveler age, and coverage type. CFAR vs comprehensive vs basic.", "travel insurance cost", "money", ["travel-budget-calculator", "passport-expiry-checker", "best-time-to-book-calculator"], "Is travel insurance worth it? Insurance typically runs 4-12% of trip cost depending on age and coverage. Compare CFAR, comprehensive, and basic.", ["Enter trip cost and length.", "Pick age and coverage type.", "Read estimated cost."]],
];

// ---- Patch components/tools/registry.tsx ----
let toolSrc = readFileSync("components/tools/registry.tsx", "utf8");

const toolImports = tools
  .map(([, cls]) => `const ${cls} = dynamic(() => import("./${cls}").then(m => ({ default: m.${cls} })), { loading: Skeleton });`)
  .join("\n");

const registryAnchor = `export const TOOL_REGISTRY: Record<string, ToolEntry> = {`;
if (!toolSrc.includes(registryAnchor)) throw new Error("Missing TOOL_REGISTRY anchor");
toolSrc = toolSrc.replace(registryAnchor, `// Travel wave (15 new tools)\n${toolImports}\n\n${registryAnchor}`);

const lastRegEnd = toolSrc.lastIndexOf("};");
if (lastRegEnd === -1) throw new Error("Missing registry close");

const toolEntries = tools
  .map(([slug, cls, , , , , , explainer, howToUse]) => {
    const howToStr = howToUse.map((s) => `      "${s.replace(/"/g, '\\"')}",`).join("\n");
    return `  "${slug}": {
    render: () => <${cls} />,
    explainer: (
      <>
        <p>${explainer}</p>
        <p>
          Runs entirely in your browser — no upload, no account, no watermark.
          For more tools in this category see the{" "}
          <a href="/tools">full tools index</a>.
        </p>
      </>
    ),
    howToUse: [
${howToStr}
    ],
  },`;
  })
  .join("\n");

toolSrc = toolSrc.slice(0, lastRegEnd) + toolEntries + "\n" + toolSrc.slice(lastRegEnd);
writeFileSync("components/tools/registry.tsx", toolSrc);
console.log("tools registry patched:", tools.length);

// ---- Patch lib/pages.ts manifest ----
let pages = readFileSync("lib/pages.ts", "utf8");

const marker = "export const PAGES: Page[] = [";
const markerStart = pages.indexOf(marker);
if (markerStart === -1) throw new Error("PAGES start missing");
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
if (depth !== 0) throw new Error("Unbalanced PAGES brackets");
const closeBracket = i - 1;

const esc2 = (s) => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const manifestEntries = tools
  .map(([slug, , title, description, keyword, category, related]) => {
    const relatedArr = related.map((s) => `"${s}"`).join(", ");
    return `  { slug: "${slug}", type: "tool", category: "${category}",
    title: "${esc2(title)}",
    h1: "${esc2(title)}",
    description: "${esc2(description)}",
    keyword: "${keyword}",
    related: [${relatedArr}],
    published: true },`;
  })
  .join("\n");

pages = pages.slice(0, closeBracket) + "\n" + manifestEntries + "\n" + pages.slice(closeBracket);
writeFileSync("lib/pages.ts", pages);
console.log("pages.ts patched:", tools.length, "entries");
