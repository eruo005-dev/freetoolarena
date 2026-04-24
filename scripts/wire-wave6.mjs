// Wire Wave 6: 10 DIY + 10 marketing/SaaS tools
import { readFileSync, writeFileSync } from "node:fs";

const tools = [
  // DIY (10) - home
  ["concrete-cubic-yards-calculator", "ConcreteCubicYardsCalculator", "Concrete Cubic Yards Calculator", "Cubic yards of concrete for slab, footing, column, or stairs. Bag vs bulk cost comparison.", "concrete cubic yards", "home", ["deck-board-count-calculator", "rebar-spacing-calculator", "stair-calculator"], "Slabs, footings, columns, stairs. Cubic feet, cubic yards, bags needed, and whether bulk-delivered or bagged is cheaper for your job.", ["Pick shape + dimensions.", "Read cu yd + bag count.", "Compare bulk vs bagged cost."]],
  ["deck-board-count-calculator", "DeckBoardCountCalculator", "Deck Board Count Calculator", "Boards, linear feet, and joists for a deck. Minimal-waste length suggestions.", "deck board calculator", "home", ["concrete-cubic-yards-calculator", "stair-calculator", "screw-size-converter"], "Boards needed, linear feet of lumber, joist count. Pick board length that wastes least.", ["Enter deck dimensions.", "Set board width + spacing.", "Read board + joist count."]],
  ["stair-calculator", "StairCalculator", "Stair Calculator (Rise, Run, Stringer)", "Step count, riser height, total run, and stringer length from total rise. IRC code warnings included.", "stair calculator", "home", ["deck-board-count-calculator", "concrete-cubic-yards-calculator", "roof-pitch-calculator"], "Total rise plus preferred riser = step count, actual riser, total run, stringer length via Pythagorean. IRC code warnings if you exceed limits.", ["Enter total rise.", "Set preferred riser + run.", "Read full stair spec."]],
  ["drill-bit-size-lookup", "DrillBitSizeLookup", "Drill Bit Size Lookup", "Pilot hole and anchor hole bit sizes for wood screws, machine screws, and wall anchors.", "drill bit size lookup", "home", ["screw-size-converter", "saw-blade-tooth-guide", "rebar-spacing-calculator"], "#8 wood screw in softwood = 3/32&quot; pilot. In hardwood = 7/64&quot;. Plus anchor and tap-hole sizes, in fractional, decimal, and mm.", ["Pick application + size.", "Read bit size.", "Softwood vs hardwood notes."]],
  ["screw-size-converter", "ScrewSizeConverter", "Screw Size Converter (Gauge to Metric)", "Convert screw sizes between gauge (#6-#14), metric (M3-M8), and imperial diameter.", "screw size converter", "home", ["drill-bit-size-lookup", "saw-blade-tooth-guide", "deck-board-count-calculator"], "#8 = M4 = .164&quot;. Gauge, metric, imperial, plus thread pitches and common lengths and head types.", ["Enter gauge, metric, or diameter.", "Read all three.", "Check thread + head types."]],
  ["saw-blade-tooth-guide", "SawBladeToothGuide", "Saw Blade Tooth Count Guide", "Recommended tooth count and blade type by material and cut (ripping / crosscut / combo).", "saw blade tooth count", "home", ["drill-bit-size-lookup", "screw-size-converter", "stair-calculator"], "Hardwood crosscut = 80T. Plywood = 80T high-ATB. Aluminum = non-ferrous blade. This matches blade to material and cut.", ["Pick material + cut.", "Read tooth count + blade type.", "Check RPM + safety."]],
  ["rebar-spacing-calculator", "RebarSpacingCalculator", "Rebar Spacing Calculator", "Linear feet, pieces, tie wire, and cost of rebar for a slab. 40x bar diameter lap splice reminder.", "rebar spacing calculator", "home", ["concrete-cubic-yards-calculator", "fence-post-calculator", "stair-calculator"], "Slab dimensions + rebar size + 16&quot; OC = linear feet, pieces to buy (20 ft stock), tie wire, cost. Plus 40x lap splice reminder.", ["Enter slab dimensions.", "Pick rebar size + spacing.", "Read pieces + tie wire."]],
  ["fence-post-calculator", "FencePostCalculator", "Fence Post Calculator", "Posts, panels, concrete bags, and material cost for any fence run. Gate posts accounted for.", "fence post calculator", "home", ["concrete-cubic-yards-calculator", "rebar-spacing-calculator", "deck-board-count-calculator"], "Post count (plus gate doubles), panels, concrete bags at 1.5 per post, material cost totals. Pick panel type for realistic pricing.", ["Enter fence length + spacing.", "Pick panel type + gate count.", "Read posts + materials."]],
  ["insulation-r-value-calculator", "InsulationRValueCalculator", "Insulation R-Value Calculator", "Target R-value by IECC climate zone and thickness needed across 5 insulation materials.", "insulation r value calculator", "home", ["roof-pitch-calculator", "concrete-cubic-yards-calculator", "plant-watering-schedule"], "IECC-recommended R-values by zone (hot south vs very cold north) plus the thickness for fiberglass, cellulose, spray foam, rigid foam.", ["Pick climate zone + area.", "Enter current R-value.", "Read thickness by material."]],
  ["roof-pitch-calculator", "RoofPitchCalculator", "Roof Pitch Calculator", "Roof pitch in X/12 format, angle in degrees, percent grade. Shingle suitability included.", "roof pitch calculator", "home", ["stair-calculator", "deck-board-count-calculator", "insulation-r-value-calculator"], "Enter rise and run (or angle) &mdash; get X/12 notation, degrees, percent grade, and whether architectural shingles work on that pitch.", ["Enter rise and run.", "Or enter angle.", "Read pitch + shingle fit."]],

  // Marketing/SaaS (10) - career for business-focused tools
  ["cac-ltv-calculator", "CacLtvCalculator", "CAC / LTV Calculator", "Customer acquisition cost to lifetime value ratio. 3-5x ratio is healthy for SaaS.", "cac ltv calculator", "career", ["saas-churn-rate-calculator", "rule-of-40-calculator", "cac-payback-period"], "LTV/CAC is the single SaaS sanity check. 3-5x is healthy, <1x is losing money, >5x might mean under-investing in growth.", ["Enter CAC + monthly revenue.", "Set margin + lifetime.", "Read LTV/CAC ratio."]],
  ["saas-churn-rate-calculator", "SaasChurnRateCalculator", "SaaS Churn Rate Calculator", "Customer churn + gross MRR churn + net MRR churn. Net negative churn means you grow without new sales.", "saas churn rate", "career", ["net-revenue-retention-calculator", "cac-ltv-calculator", "rule-of-40-calculator"], "Customer churn vs MRR churn vs net MRR churn &mdash; all three tell different stories. Net negative churn is the SaaS goal.", ["Enter customer + MRR deltas.", "Factor in expansion.", "Read 3 churn rates."]],
  ["net-revenue-retention-calculator", "NetRevenueRetentionCalculator", "Net Revenue Retention (NRR) Calculator", "NRR from expansion + contraction + churn in a cohort. >120% is elite SaaS territory.", "net revenue retention", "career", ["saas-churn-rate-calculator", "cac-ltv-calculator", "rule-of-40-calculator"], "NRR above 100% means you grow without new customers. Top public SaaS hits 115-130%. This shows yours and the tier.", ["Enter starting cohort MRR.", "Enter expansion + churn.", "Read NRR %."]],
  ["rule-of-40-calculator", "RuleOf40Calculator", "Rule of 40 Calculator", "Growth rate + profit margin = Rule of 40. 40+ passes, 60+ is elite SaaS.", "rule of 40", "career", ["cac-ltv-calculator", "saas-churn-rate-calculator", "saas-magic-number-calculator"], "Growth % + margin % &mdash; does it clear 40? The single VC sanity check for SaaS health. 4-quadrant chart shows where you land.", ["Enter growth rate.", "Enter margin %.", "Read Rule 40 score."]],
  ["cpm-cpc-cpa-converter", "CpmCpcCpaConverter", "CPM CPC CPA Converter", "Convert between ad metrics: CPM, CTR, CPC, CVR, CPA. Funnel visualization + platform benchmarks.", "cpm cpc cpa converter", "career", ["roas-calculator", "gross-margin-calculator", "mrr-to-arr-converter"], "Drop in spend + impressions + clicks + conversions &mdash; get every ad metric. Plus funnel visual and platform benchmarks.", ["Enter any two metrics.", "Read all 5.", "Compare to benchmarks."]],
  ["roas-calculator", "RoasCalculator", "ROAS (Return on Ad Spend) Calculator", "ROAS ratio, break-even ROAS based on margin, and actual profit after spend.", "roas calculator", "career", ["cpm-cpc-cpa-converter", "cac-ltv-calculator", "gross-margin-calculator"], "ROAS only pays if it clears break-even. 50% margin = you need 2x ROAS just to break even. Here&rsquo;s the real profit picture.", ["Enter spend + revenue + margin.", "Read ROAS + break-even.", "See actual profit."]],
  ["saas-magic-number-calculator", "SaasMagicNumberCalculator", "SaaS Magic Number Calculator", "S&M efficiency: (net new ARR × 4) / S&M spend. >1.0 means push more spend; <0.5 means slow down.", "saas magic number", "career", ["rule-of-40-calculator", "cac-ltv-calculator", "cac-payback-period"], "The VC-favorite S&M efficiency metric. Above 1.0 you&rsquo;re under-investing; below 0.5 you&rsquo;re wasting. This gives you the number.", ["Enter new ARR this quarter.", "Enter S&M spend.", "Read Magic Number."]],
  ["cac-payback-period", "CacPaybackPeriod", "CAC Payback Period Calculator", "Months until CAC is recovered from margin-adjusted revenue. <12 months is great for SMB SaaS.", "cac payback period", "career", ["cac-ltv-calculator", "saas-magic-number-calculator", "rule-of-40-calculator"], "Short payback = faster capital recycling. SMB SaaS target <12 months; enterprise can support 24+. Here&rsquo;s yours.", ["Enter CAC + monthly revenue.", "Enter margin %.", "Read payback months."]],
  ["gross-margin-calculator", "GrossMarginCalculator", "Gross Margin Calculator", "Gross margin % from revenue + COGS. Industry benchmark comparison (SaaS 75-85%, marketplace 15-25%).", "gross margin calculator", "career", ["roas-calculator", "net-revenue-retention-calculator", "cac-ltv-calculator"], "Gross margin benchmarks vary wildly by business model. SaaS 75-85%, hardware 20-40%, marketplace 15-25%. Here&rsquo;s yours in context.", ["Enter revenue + COGS.", "Read margin %.", "Compare to industry."]],
  ["mrr-to-arr-converter", "MrrToArrConverter", "MRR to ARR Converter", "Convert between MRR, ARR, quarterly revenue, and customer × plan price. Multiple input modes.", "mrr to arr converter", "career", ["saas-churn-rate-calculator", "net-revenue-retention-calculator", "cac-ltv-calculator"], "Boards think ARR. Operators think MRR. This converts fluidly: any of MRR, ARR, quarterly, or customer×plan.", ["Pick input mode.", "Enter a value.", "Read all forms."]],
];

let toolSrc = readFileSync("components/tools/registry.tsx", "utf8");
const toolImports = tools.map(([, cls]) => `const ${cls} = dynamic(() => import("./${cls}").then(m => ({ default: m.${cls} })), { loading: Skeleton });`).join("\n");
const registryAnchor = `export const TOOL_REGISTRY: Record<string, ToolEntry> = {`;
toolSrc = toolSrc.replace(registryAnchor, `// Wave 6 DIY + marketing/SaaS (20 new)\n${toolImports}\n\n${registryAnchor}`);
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
