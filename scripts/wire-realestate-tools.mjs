// Wire 10 real-estate tools into components/tools/registry.tsx + lib/pages.ts
import { readFileSync, writeFileSync } from "node:fs";

const tools = [
  ["closing-cost-estimator", "ClosingCostEstimator", "Closing Cost Estimator", "Itemized home-purchase closing costs: origination, title, appraisal, escrow, transfer tax, prepaids. Shows total as % of loan.", "closing cost estimator", "money", ["pmi-calculator", "property-tax-calculator", "mortgage-calculator"], "Estimate every line item on your Loan Estimate before you see one. Origination, title, appraisal, transfer tax, prepaids &mdash; tuned per state.", ["Enter home price and down payment.", "Pick your state.", "Read itemized closing costs + total."]],
  ["pmi-calculator", "PmiCalculator", "PMI Calculator", "Private mortgage insurance on a conventional loan. Monthly PMI, total paid, months until 78% LTV auto-cancels it.", "pmi calculator", "money", ["closing-cost-estimator", "mortgage-calculator", "property-tax-calculator"], "How much is PMI costing you and when does it go away? Credit score + LTV matrix shows monthly cost and auto-cancel date.", ["Enter price and down payment.", "Pick credit band.", "Read monthly PMI + drop-off month."]],
  ["property-tax-calculator", "PropertyTaxCalculator", "Property Tax Calculator", "Annual and monthly property tax by state effective rate. Ranks against US average and 20+ state benchmarks.", "property tax calculator", "money", ["closing-cost-estimator", "pmi-calculator", "mortgage-calculator"], "What will property tax actually cost? Effective rates for 20+ states plus a custom option. Compared against the US average.", ["Enter home value.", "Pick state (or enter custom rate).", "Read annual + monthly tax."]],
  ["mortgage-payoff-accelerator", "MortgagePayoffAccelerator", "Mortgage Payoff Accelerator", "See how extra monthly payments shrink payoff time and interest paid. Scenario table for $100 / $250 / $500 / $1000 extra.", "mortgage payoff accelerator", "money", ["mortgage-calculator", "refinance-calculator", "compound-interest-calculator"], "Pay an extra $250 a month &mdash; lose 6 years off the loan and save tens of thousands in interest. See exact numbers for your loan.", ["Enter balance, rate, term.", "Enter extra payment.", "Read months saved + interest saved."]],
  ["hoa-fee-impact-calculator", "HoaFeeImpactCalculator", "HOA Fee Impact Calculator", "How much buying power does your HOA eat? Converts monthly HOA to loan-amount equivalent at today&rsquo;s rates.", "hoa fee impact", "home", ["closing-cost-estimator", "property-tax-calculator", "mortgage-calculator"], "A $300/month HOA is the same as about $45k less house you can afford. This tool makes the tradeoff explicit.", ["Enter monthly HOA.", "Enter mortgage rate and term.", "Read equivalent loan reduction."]],
  ["rental-yield-calculator", "RentalYieldCalculator", "Rental Yield Calculator", "Gross + net rental yield on an investment property. Factors vacancy, expenses, PM fees. Tier-labeled.", "rental yield calculator", "money", ["cap-rate-calculator", "cash-on-cash-return-calculator", "house-flip-roi-calculator"], "Run the 5-minute deal screen on any rental &mdash; gross yield, net yield, monthly cash flow, and a tier label (weak to excellent).", ["Enter price and rent.", "Enter vacancy and expenses.", "Read gross + net yield."]],
  ["cap-rate-calculator", "CapRateCalculator", "Cap Rate Calculator", "Commercial-style capitalization rate &mdash; NOI / price. Tier labels + property-only return (mortgage excluded).", "cap rate calculator", "money", ["rental-yield-calculator", "cash-on-cash-return-calculator", "house-flip-roi-calculator"], "Cap rate is how investors compare properties apples-to-apples &mdash; property-only return before financing. Enter price, rent, expenses; get NOI and the rate.", ["Enter price and rent.", "Enter operating expenses and vacancy.", "Read NOI + cap rate."]],
  ["cash-on-cash-return-calculator", "CashOnCashReturnCalculator", "Cash-on-Cash Return Calculator", "Annual cash flow / total cash invested. Factors down payment, closing, rehab, mortgage payment. Break-even month included.", "cash on cash return", "money", ["rental-yield-calculator", "cap-rate-calculator", "house-flip-roi-calculator"], "The investor metric that matters most when financing: annual cash flow as a % of cash you actually put in. Break-even month included.", ["Enter cash invested + loan terms.", "Enter rent and expenses.", "Read cash-on-cash %."]],
  ["house-flip-roi-calculator", "HouseFlipRoiCalculator", "House Flip ROI Calculator", "Fix-and-flip profit, ROI, annualized ROI, and the 70% rule pass/fail check. Holding + selling costs factored.", "house flip roi", "money", ["rental-yield-calculator", "cap-rate-calculator", "cash-on-cash-return-calculator"], "Before you buy the flip, run the numbers. ROI, annualized ROI, 70% rule pass/fail, holding costs &mdash; the full investor screen in one page.", ["Enter purchase, rehab, ARV.", "Set holding period + selling costs.", "Read profit + annualized ROI."]],
  ["airbnb-revenue-estimator", "AirbnbRevenueEstimator", "Airbnb Revenue Estimator", "Short-term-rental revenue from nightly rate, occupancy, cleaning fees. Platform and PM fees factored. Net annual income.", "airbnb revenue estimator", "money", ["rental-yield-calculator", "cash-on-cash-return-calculator", "house-flip-roi-calculator"], "Short-term rental math &mdash; nightly rate, occupancy, cleaning fees, Airbnb take, property management &mdash; net annual income after everything.", ["Enter rate and occupancy.", "Set cleaning and platform fees.", "Read net annual income."]],
];

// ---- Patch components/tools/registry.tsx ----
let toolSrc = readFileSync("components/tools/registry.tsx", "utf8");

const toolImports = tools
  .map(([, cls]) => `const ${cls} = dynamic(() => import("./${cls}").then(m => ({ default: m.${cls} })), { loading: Skeleton });`)
  .join("\n");

const registryAnchor = `export const TOOL_REGISTRY: Record<string, ToolEntry> = {`;
if (!toolSrc.includes(registryAnchor)) throw new Error("Missing TOOL_REGISTRY anchor");
toolSrc = toolSrc.replace(registryAnchor, `// Real estate wave (10 new tools)\n${toolImports}\n\n${registryAnchor}`);

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
