// Wire Megawave A: 15 tools across crypto, sustainability, health, tech
import { readFileSync, writeFileSync } from "node:fs";

const tools = [
  ["crypto-dca-calculator", "CryptoDcaCalculator", "Crypto DCA Calculator", "Dollar-cost-average crypto projection with lump-sum comparison. Shows total contributed, ending value, gain %.", "crypto dca calculator", "money", ["crypto-capital-gains-calculator", "nft-roi-calculator", "compound-interest-calculator"], "DCA vs lump sum on crypto. Past performance warning built in. Shows cost basis, ending value, and the lump-sum comparison.", ["Enter amount per buy + frequency.", "Set years and growth assumption.", "Read DCA vs lump-sum."]],
  ["crypto-capital-gains-calculator", "CryptoCapitalGainsCalculator", "Crypto Capital Gains Calculator", "Short vs long-term tax on a crypto sale. Federal rates by bracket. Not tax advice.", "crypto capital gains", "money", ["crypto-dca-calculator", "freelancer-tax-reserve-calculator", "tax-bracket-visualizer"], "Sold crypto? This shows short-term (365 days) capital gain tax estimate. Always verify with a CPA.", ["Enter buy + sell prices.", "Enter holding period.", "Read after-tax net."]],
  ["nft-roi-calculator", "NftRoiCalculator", "NFT ROI Calculator", "NFT buy-sell ROI accounting for gas fees, platform cuts, and creator royalties.", "nft roi calculator", "money", ["crypto-capital-gains-calculator", "crypto-dca-calculator", "real-estate-crowdfunding-yield"], "Most NFTs sell for zero. For the ones that don&rsquo;t, this shows real ROI after gas, platform (2.5%), and royalty fees.", ["Enter buy + sell prices.", "Enter gas fees + fees %.", "Read profit in ETH and USD."]],
  ["real-estate-crowdfunding-yield", "RealEstateCrowdfundingYield", "Real Estate Crowdfunding Yield Calculator", "Projected returns from Fundrise-style REITs. Compared to S&P 500 and low-cost index funds.", "real estate crowdfunding yield", "money", ["rental-yield-calculator", "cap-rate-calculator", "cash-on-cash-return-calculator"], "Fundrise markets 5-9% returns. This projects compound growth with quarterly contributions and shows the comparison to S&P 500 index funds.", ["Enter initial investment + contribution.", "Set return rate and years.", "Read ending value + comparison."]],
  ["stock-portfolio-diversification", "StockPortfolioDiversification", "Stock Portfolio Diversification Checker", "Concentration risk analyzer. Flags >10% positions, >50% individual stocks, and >5% crypto.", "portfolio diversification", "money", ["real-estate-crowdfunding-yield", "cac-ltv-calculator", "fire-number-calculator"], "Paste your holdings, see concentration risk. Any single position above 10% of portfolio is a yellow flag. Target: 80% index funds.", ["Paste TICKER + amount lines.", "Read allocation %.", "Check concentration warnings."]],
  ["solar-panel-payback-calculator", "SolarPanelPaybackCalculator", "Solar Panel Payback Calculator", "Solar ROI and payback period including 30% federal tax credit, state rebates, and 25-year savings.", "solar panel payback", "home", ["ev-range-estimator", "smart-home-cost-estimator", "home-equity-loan-calculator"], "Solar panels: when do they pay back, what do they save over 25 years? Includes tax credit, rebates, electricity inflation.", ["Enter system size + cost.", "Set rebate + electricity rate.", "Read years to payback."]],
  ["ev-range-estimator", "EvRangeEstimator", "EV Range Estimator", "Real-world EV range vs rated range. Accounts for cold weather, highway speeds, HVAC use.", "ev range estimator", "automotive", ["ev-charging-cost-calculator", "fuel-economy-converter", "road-trip-fuel-stops"], "Rated 300 miles doesn&rsquo;t mean you get 300. Cold weather cuts range 30%. Highway speed cuts 15%. This shows what you&rsquo;ll actually get.", ["Enter rated range + battery.", "Pick conditions + HVAC.", "Read real-world range."]],
  ["smart-home-cost-estimator", "SmartHomeCostEstimator", "Smart Home Cost Estimator", "Full smart home install cost: cameras, locks, thermostats, lighting, hub, install labor. DIY vs pro.", "smart home cost estimator", "home", ["solar-panel-payback-calculator", "insulation-r-value-calculator", "paint-gallons-calculator"], "Pick the devices you want. This totals equipment cost plus realistic install labor and the monthly cloud subscription sprawl.", ["Select devices and quantities.", "Add install hours.", "Read total + monthly services."]],
  ["vegan-protein-calculator", "VeganProteinCalculator", "Vegan Protein Calculator", "Daily plant-based protein target with meal plans from tofu, tempeh, lentils, seitan, quinoa.", "vegan protein calculator", "health", ["protein-intake-calculator", "macro-calculator", "calorie-calculator"], "Hit your protein target with real plant foods. Tofu 20g per 100g, tempeh 19g, seitan 25g, lentils 18g per cup. 3 sample meal plans included.", ["Enter weight + activity.", "Pick goal.", "Read daily target + meal plan."]],
  ["corporate-wellness-roi", "CorporateWellnessRoi", "Corporate Wellness ROI Calculator", "Annual ROI of employee wellness programs using RAND/HBR baseline reductions on sick days + claims + turnover.", "corporate wellness roi", "career", ["creator-tax-reserve", "meeting-cost-calculator", "cac-ltv-calculator"], "Wellness ROI math: reduce sick days 15%, claims 7%, turnover 12% for 40% participation. Net ROI per employee and payback months.", ["Enter employees + cost.", "Set participation.", "Read ROI + payback."]],
  ["resistance-band-workout-planner", "ResistanceBandWorkoutPlanner", "Resistance Band Workout Planner", "Weekly split + exercise list by goal, days/week, and fitness level. Beginner to advanced.", "resistance band workout planner", "health", ["one-rep-max-calculator", "heart-rate-zone-calculator", "running-pace-calculator"], "Pick your goal, days, and level &mdash; get a weekly split with exercise lists, sets/reps, and bands needed. From beginner to advanced.", ["Pick goal + days + time.", "Set fitness level.", "Read weekly workout."]],
  ["biohacking-supplement-tracker", "BiohackingSupplementTracker", "Biohacking Supplement Tracker", "Supplement stack cost tracker. Monthly + yearly total, with interaction cautions and staple callouts.", "biohacking supplement tracker", "health", ["vegan-protein-calculator", "creator-tax-reserve", "calorie-calculator"], "List your stack, see monthly and yearly cost, flag controversial picks. Popular staples (creatine, omega-3, D3, magnesium) highlighted.", ["Paste supplement list.", "Read monthly + yearly.", "Check for red flags."]],
  ["reusable-vs-disposable-savings", "ReusableVsDisposableSavings", "Reusable vs Disposable Savings Calculator", "Lifetime savings from reusable products (water bottle, coffee cup, razor, etc.) vs disposable.", "reusable vs disposable savings", "home", ["compost-bin-size-calculator", "solar-panel-payback-calculator", "smart-home-cost-estimator"], "Reusable water bottle pays for itself in 30 days. Reusable razor pays back in 3 months. Lifetime savings + plastic avoided for 8 product types.", ["Pick product.", "Adjust usage.", "Read lifetime savings."]],
  ["compost-bin-size-calculator", "CompostBinSizeCalculator", "Compost Bin Size Calculator", "Right bin size for your household waste. Weekly volume, tumbler vs pile recommendation.", "compost bin size", "home", ["compost-ratio-calculator", "reusable-vs-disposable-savings", "garden-bed-soil-volume"], "Household size + cooking + yard size determines weekly waste volume. This sizes the bin and picks tumbler vs pile.", ["Enter household + cooking.", "Set yard size.", "Read bin size."]],
  ["tech-repair-worth-it-calculator", "TechRepairWorthItCalculator", "Tech Repair Worth It Calculator", "Repair vs replace decision for phones, laptops, TVs, consoles. 50%/75% value rule applied.", "tech repair worth it", "dev", ["repair-or-replace-calculator", "total-cost-of-ownership-calculator", "smart-home-cost-estimator"], "Phone screen repair $300 vs new iPhone $1000? This runs the 50%/75% rule plus device-age heuristics to recommend repair, marginal, or replace.", ["Pick device type.", "Enter repair + replace cost.", "Read recommendation."]],
];

let toolSrc = readFileSync("components/tools/registry.tsx", "utf8");
const toolImports = tools.map(([, cls]) => `const ${cls} = dynamic(() => import("./${cls}").then(m => ({ default: m.${cls} })), { loading: Skeleton });`).join("\n");
const registryAnchor = `export const TOOL_REGISTRY: Record<string, ToolEntry> = {`;
toolSrc = toolSrc.replace(registryAnchor, `// Megawave A crypto/sustainability/health/tech (15 new)\n${toolImports}\n\n${registryAnchor}`);
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
