// Wire 15 automotive tools
import { readFileSync, writeFileSync } from "node:fs";

const tools = [
  ["car-affordability-calculator", "CarAffordabilityCalculator", "Car Affordability Calculator", "Max car price you can afford based on your income. Four rules: 20%, 15%, 10%, and DTI-based.", "car affordability calculator", "automotive", ["car-payment-calculator", "total-cost-of-ownership-calculator", "car-depreciation-calculator"], "Figure out the most car you should buy on your income. Pick your rule of thumb (20% / 15% / 10% / DTI) and get max price, payment, and loan.", ["Enter income and debts.", "Pick an affordability rule.", "Read max car price."]],
  ["car-payment-calculator", "CarPaymentCalculator", "Car Payment Calculator", "Monthly loan payment with sales tax, trade-in, and down payment. Includes total interest + amortization.", "car payment calculator", "automotive", ["car-affordability-calculator", "total-cost-of-ownership-calculator", "car-depreciation-calculator"], "Before signing at the dealer: see monthly payment, total interest, and how payments shift from interest to principal over time.", ["Enter price and down payment.", "Enter rate and term.", "Read monthly + total interest."]],
  ["gas-mileage-calculator", "GasMileageCalculator", "Gas Mileage Calculator", "MPG from miles + gallons, plus cost per mile and monthly fuel cost. Comparison table across 7 MPG tiers.", "gas mileage calculator", "automotive", ["fuel-economy-converter", "road-trip-fuel-stops", "ev-charging-cost-calculator"], "Real MPG from your last tank, translated into cost per mile and annual fuel spend. See how much better (or worse) MPG changes the yearly bill.", ["Enter miles driven and gallons used.", "Enter gas price.", "Read MPG and annual cost."]],
  ["car-depreciation-calculator", "CarDepreciationCalculator", "Car Depreciation Calculator", "Estimated car value after N years using industry-standard depreciation curves. Higher miles accelerate.", "car depreciation calculator", "automotive", ["car-affordability-calculator", "total-cost-of-ownership-calculator", "repair-or-replace-calculator"], "Cars lose 20% in year one, ~15%/year for years 2-5, then slower. Punch in your purchase and see what it&rsquo;s worth now &mdash; with a 10-year schedule.", ["Enter purchase price + year.", "Pick annual miles band.", "Read current value + schedule."]],
  ["total-cost-of-ownership-calculator", "TotalCostOfOwnershipCalculator", "Total Cost of Ownership Calculator", "5-year total car cost: loan + fuel + insurance + registration + maintenance + depreciation. Per-mile breakdown.", "total cost of ownership", "automotive", ["car-affordability-calculator", "car-depreciation-calculator", "car-payment-calculator"], "Sticker price lies. This shows the real 5-year cost including fuel, insurance, maintenance, and depreciation &mdash; and breaks it down per mile.", ["Enter all ownership inputs.", "Set years to own.", "Read grand total + per-mile."]],
  ["fuel-economy-converter", "FuelEconomyConverter", "Fuel Economy Converter", "MPG (US) ↔ MPG (UK) ↔ L/100km ↔ km/L. All four values side by side with efficiency tier labels.", "fuel economy converter", "automotive", ["gas-mileage-calculator", "ev-charging-cost-calculator", "road-trip-fuel-stops"], "Converting fuel economy between regions is weirdly mathy. All four values at once, with a tier label so you know &ldquo;35 MPG&rdquo; is respectable.", ["Enter value + from-unit.", "Pick target unit.", "Read the full 4-way table."]],
  ["car-insurance-quote-estimator", "CarInsuranceQuoteEstimator", "Car Insurance Quote Estimator", "Rough annual and monthly premium by state, age, coverage, credit, record, and vehicle class.", "car insurance quote estimator", "automotive", ["total-cost-of-ownership-calculator", "car-payment-calculator", "repair-or-replace-calculator"], "Before you call around: get a rough premium range for your state, age, and coverage. Estimates based on industry averages &mdash; actual quotes vary.", ["Pick state + age band.", "Pick coverage + credit + record.", "Read annual + monthly estimate."]],
  ["tire-size-converter", "TireSizeConverter", "Tire Size Converter", "Parse metric tire size (225/65R17) into overall diameter, width, circumference, and imperial equivalent.", "tire size converter", "automotive", ["tire-pressure-lookup", "oil-change-interval-calculator", "fuel-economy-converter"], "Decode metric tire notation: width, aspect ratio, rim size &mdash; output overall diameter, section width, revs per mile, and imperial equivalent.", ["Enter tire size (e.g. 225/65R17).", "Read overall diameter + circumference.", "See imperial equivalent."]],
  ["tire-pressure-lookup", "TirePressureLookup", "Tire Pressure Lookup", "Typical cold PSI by vehicle type. Door-jamb rule, altitude/temp notes, and check cadence.", "tire pressure lookup", "automotive", ["tire-size-converter", "oil-change-interval-calculator", "fuel-economy-converter"], "Rule one: check the door jamb sticker. Rule two: use these averages as a sanity check. With altitude and temperature adjustments.", ["Pick vehicle type.", "Read front + rear PSI.", "Check door-jamb for truth."]],
  ["vin-decoder", "VinDecoder", "VIN Decoder", "Decode a 17-character VIN. Country of manufacture, likely brand, model year, plant code, serial.", "vin decoder", "automotive", ["license-plate-format-lookup", "car-depreciation-calculator", "car-payment-calculator"], "Paste a VIN, get the country, brand, year, plant. Full details require NHTSA&rsquo;s decoder &mdash; this is the offline quick-check.", ["Paste 17-char VIN.", "Read country + brand + year.", "Cross-check with NHTSA for full details."]],
  ["license-plate-format-lookup", "LicensePlateFormatLookup", "License Plate Format Lookup", "US state license plate format reference. Standard pattern, max length, personalized and commercial rules.", "license plate format", "automotive", ["vin-decoder", "car-insurance-quote-estimator", "tire-size-converter"], "Buying a specialty plate? Custom vanity idea? This covers every US state&rsquo;s plate format, max length, and plate-type rules.", ["Pick a state.", "Read format + regex.", "See example plates."]],
  ["oil-change-interval-calculator", "OilChangeIntervalCalculator", "Oil Change Interval Calculator", "Recommended oil change interval by oil type, driving conditions, and engine age. Next change date.", "oil change interval", "automotive", ["tire-pressure-lookup", "gas-mileage-calculator", "repair-or-replace-calculator"], "3,000 mile intervals are a myth for modern synthetic. Here&rsquo;s the right cadence for your oil type, driving conditions, and engine mileage.", ["Pick oil type + driving conditions.", "Enter annual miles + engine age.", "Read interval + next date."]],
  ["repair-or-replace-calculator", "RepairOrReplaceCalculator", "Repair or Replace Calculator", "Should you fix the car or buy new? 50%/75% value rules plus 2-year projected cost comparison.", "repair or replace calculator", "automotive", ["car-depreciation-calculator", "total-cost-of-ownership-calculator", "car-affordability-calculator"], "Ask &ldquo;is this repair worth it&rdquo; once: this tool answers with a recommendation based on car value, repair cost, and how often it&rsquo;s been in the shop.", ["Enter repair cost + car value.", "Pick recent repair frequency.", "Read recommendation."]],
  ["ev-charging-cost-calculator", "EvChargingCostCalculator", "EV Charging Cost Calculator", "Home charging vs DC fast charging cost and time. Comparison to 30 MPG gas car at $3.50/gal.", "ev charging cost", "automotive", ["gas-mileage-calculator", "fuel-economy-converter", "road-trip-fuel-stops"], "Home level 2 vs Tesla Supercharger: which costs more per mile, and how long does each take to hit 80%? With a comparison to a 30 MPG gas car.", ["Enter battery size + target %.", "Enter home and fast rates.", "Read cost + time for each."]],
  ["road-trip-fuel-stops", "RoadTripFuelStops", "Road Trip Fuel Stops Calculator", "How many fuel stops on a long drive, at which mile markers, total gallons, and total cost.", "road trip fuel stops", "automotive", ["road-trip-planner", "gas-mileage-calculator", "fuel-economy-converter"], "Plan your fuel stops for a long drive &mdash; number of stops, mile markers, total gallons, total cost. Tunable for buffer and starting tank level.", ["Enter trip miles and tank.", "Enter MPG and buffer %.", "Read stop count + markers."]],
];

let toolSrc = readFileSync("components/tools/registry.tsx", "utf8");
const toolImports = tools.map(([, cls]) => `const ${cls} = dynamic(() => import("./${cls}").then(m => ({ default: m.${cls} })), { loading: Skeleton });`).join("\n");
const registryAnchor = `export const TOOL_REGISTRY: Record<string, ToolEntry> = {`;
if (!toolSrc.includes(registryAnchor)) throw new Error("Missing anchor");
toolSrc = toolSrc.replace(registryAnchor, `// Automotive wave (15 new)\n${toolImports}\n\n${registryAnchor}`);
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
