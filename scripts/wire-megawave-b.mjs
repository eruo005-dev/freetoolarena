// Wire Megawave B: 20 guides across Tech/AI and Finance
import { readFileSync, writeFileSync } from "node:fs";

// [slug, h1-title, description, keyword, category, ctaTargetSlug, ctaLabel]
const guides = [
  ["how-to-use-ai-in-small-business", "How to Use AI in Small Business", "Practical AI adoption for SMBs &mdash; start with one workflow, pick a free tier, keep humans in the loop.", "ai for small business", "ai", "ai-prompt-generator", "Try our free AI prompt generator"],
  ["how-to-write-better-ai-prompts", "How to Write Better AI Prompts", "The 4-part prompt formula, chain-of-thought, temperature, and weak-vs-strong prompt examples.", "write ai prompts", "ai", "prompt-improver", "Try our free prompt improver"],
  ["how-to-repair-or-refurbish-tech", "How to Repair or Refurbish Tech", "Repair-vs-replace framework for phones, laptops, consoles. 50/75% rule, age heuristics, DIY vs pro.", "repair or refurbish tech", "dev", "tech-repair-worth-it-calculator", "Use our Repair Worth It calculator"],
  ["how-to-choose-smart-home-security", "How to Choose a Smart Home Security System", "DIY vs pro-install comparison, essential layers, privacy tradeoffs, and the outage resilience checklist.", "smart home security", "home", "smart-home-cost-estimator", "Estimate smart home install cost"],
  ["how-to-pick-a-wearable-health-tracker", "How to Pick a Wearable Health Tracker", "Apple Watch vs Garmin vs Fitbit vs Whoop. Battery life, subscriptions, accuracy, and data privacy.", "wearable health tracker", "health", "calorie-calculator", "Try our free calorie calculator"],
  ["cybersecurity-guide-for-remote-workers", "Cybersecurity Guide for Remote Workers", "Passwords, MFA, VPN timing, disk encryption, phishing, and what your employer can see.", "cybersecurity remote worker", "dev", "password-strength-checker", "Check password strength instantly"],
  ["how-to-start-with-vr-peripherals", "How to Start with VR Peripherals", "Headset-first picking (Quest 3, Index, PSVR2), accessories that matter, play-area requirements.", "vr peripherals starter", "dev", "ai-prompt-generator", "Try our free AI prompt generator"],
  ["how-to-track-crypto-for-tax-time", "How to Track Crypto for Tax Time", "Koinly / CoinTracker setup, cost basis methods, DeFi and NFT complications, Form 8949.", "crypto tax tracking", "money", "crypto-capital-gains-calculator", "Estimate crypto capital gains"],
  ["how-to-start-drone-photography", "How to Start Drone Photography", "FAA rules (Part 107, TRUST), drone tiers, no-fly zones, ND filters, and flight fundamentals.", "drone photography starter", "media", "aspect-ratio-calculator", "Try our aspect ratio calculator"],
  ["how-to-choose-no-code-tools", "How to Choose No-Code Tools", "Pick by use case: Webflow / Bubble / Softr / Retool / Airtable. Lock-in, pricing traps, when no-code breaks.", "no code tools comparison", "dev", "system-prompt-builder", "Build a system prompt for your no-code agent"],
  ["how-to-plan-crypto-investments", "How to Plan Crypto Investments", "Allocation rules, BTC/ETH vs altcoins, self-custody, tax impact, and rebalancing. Not financial advice.", "plan crypto investments", "money", "crypto-dca-calculator", "Try the crypto DCA calculator"],
  ["how-to-budget-as-gen-z", "How to Budget as Gen Z", "50/30/20 updated for 2026 realities. Emergency fund, Roth IRA early, apps worth using. Not financial advice.", "budget as gen z", "money", "budget-calculator", "Use our free budget calculator"],
  ["how-to-plan-for-fire-retirement", "How to Plan for FIRE Retirement", "FIRE number math, lean vs fat vs coast vs barista, savings rate leverage, healthcare gap. Not financial advice.", "fire retirement planning", "money", "fire-number-calculator", "Calculate your FIRE number"],
  ["how-to-invest-in-real-estate-crowdfunding", "How to Invest in Real Estate Crowdfunding", "Fundrise / RealtyMogul / Arrived evaluation: returns, lockups, fees, tax treatment. Not financial advice.", "real estate crowdfunding", "money", "real-estate-crowdfunding-yield", "Estimate crowdfunding yield"],
  ["how-to-analyze-stocks-for-beginners", "How to Analyze Stocks for Beginners", "Honest advice: most people should index. If you still pick, P/E + growth + margin + moats. Not financial advice.", "analyze stocks beginner", "money", "stock-portfolio-diversification", "Check portfolio diversification"],
  ["how-to-evaluate-nft-investments", "How to Evaluate NFT Investments", "Honest due-diligence guide. Most NFTs are worth zero; here&rsquo;s how to filter the rest. Not financial advice.", "evaluate nft investments", "money", "nft-roi-calculator", "Use the NFT ROI calculator"],
  ["how-to-manage-debt-strategically", "How to Manage Debt Strategically", "Snowball vs avalanche, balance transfer math, negotiation, 401k boundaries. Not financial advice.", "manage debt strategically", "money", "debt-payoff-calculator", "Run the debt payoff calculator"],
  ["how-to-start-esg-investing", "How to Start ESG Investing", "Real ESG ETFs vs greenwashing, impact investing vs engagement, return drag reality. Not financial advice.", "esg investing starter", "money", "stock-portfolio-diversification", "Check portfolio diversification"],
  ["how-to-build-a-fintech-app", "How to Build a Fintech App", "Banking partners, KYC/AML, PCI, money movement, fraud. Regulatory landscape first, product second.", "build fintech app", "career", "system-prompt-builder", "Build a system prompt"],
  ["how-to-optimize-freelancer-taxes", "How to Optimize Freelancer Taxes", "Quarterly payments, home office, SEP IRA, what to deduct, and when a CPA is worth it. Not tax advice.", "freelancer tax optimization", "money", "freelancer-tax-reserve-calculator", "Calculate freelancer tax reserve"],
];

// ---- Patch content/guides/registry.tsx ----
const toIdent = (slug) => slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");

let reg = readFileSync("content/guides/registry.tsx", "utf8");

// Find the last registered guide import as an anchor.
// We use the last import * line in the file.
const importLines = reg.match(/^import \* as \w+ from "\.\/[^"]+";$/gm) ?? [];
const lastImport = importLines[importLines.length - 1];
if (!lastImport) throw new Error("Could not find guide imports");

const guideImports = guides.map(([slug]) => `import * as ${toIdent(slug)} from "./${slug}";`).join("\n");
reg = reg.replace(lastImport, `${lastImport}\n${guideImports}`);

// Find the registry closing `};` (last occurrence).
const lastRegEnd = reg.lastIndexOf("};");
const guideMap = guides.map(([slug, , , , , ctaTarget, ctaLabel]) => {
  const ident = toIdent(slug);
  return `  "${slug}": {
    intro: ${ident}.intro,
    body: ${ident}.body,
    cta: {
      label: "${ctaLabel.replace(/"/g, '\\"')}",
      targetSlug: "${ctaTarget}",
    },
  },`;
}).join("\n");
reg = reg.slice(0, lastRegEnd) + guideMap + "\n" + reg.slice(lastRegEnd);

writeFileSync("content/guides/registry.tsx", reg);
console.log("guides registry patched:", guides.length);

// ---- Patch lib/pages.ts ----
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

const manifestEntries = guides.map(([slug, title, description, keyword, category, ctaTarget]) => {
  const related = [ctaTarget, "ai-prompt-generator", "budget-calculator"].filter((s, i, a) => a.indexOf(s) === i).slice(0, 3);
  const relatedArr = related.map((s) => `"${s}"`).join(", ");
  // Map to valid GuideCategory: ai, how-to, tools, business, technical, productivity, design-media
  const guideCat = category === "ai" ? "ai" : category === "money" ? "business" : "how-to";
  return `  { slug: "${slug}", type: "article", category: "${category}",
    title: "${esc2(title)}",
    h1: "${esc2(title)}",
    description: "${esc2(description)}",
    keyword: "${keyword}",
    related: [${relatedArr}],
    guideCategory: "${guideCat}",
    published: true },`;
}).join("\n");

pages = pages.slice(0, closeBracket) + "\n" + manifestEntries + "\n" + pages.slice(closeBracket);
writeFileSync("lib/pages.ts", pages);
console.log("pages.ts patched:", guides.length);
