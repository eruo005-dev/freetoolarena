// Wire Megawave C: 18 guides across Health/Wellness and Sustainability
import { readFileSync, writeFileSync } from "node:fs";

const guides = [
  ["how-to-optimize-sleep-with-gear", "How to Optimize Sleep with Gear", "Sleep gear that actually works: mattress, blackout, cool room, white noise, weighted blanket. Not medical advice.", "optimize sleep gear", "health", "sleep-cycle-calculator", "Calculate your sleep cycles"],
  ["how-to-pick-mental-health-apps", "How to Pick Mental Health Apps", "Evidence-based mental health apps: BetterHelp, Talkspace, Moodfit, Calm, Headspace. Privacy and crisis alternatives.", "pick mental health apps", "health", "pomodoro-timer", "Try our free pomodoro timer"],
  ["how-to-start-plant-based-nutrition", "How to Start Plant-Based Nutrition", "Plant-based starter: 80/20 rule, protein sources, key supplements (B12), and common pitfalls.", "start plant-based nutrition", "health", "vegan-protein-calculator", "Calculate vegan protein needs"],
  ["home-workout-resistance-band-routine", "Home Workout Resistance Band Routine", "Full-body 30-minute resistance band routine with progression, anchoring safety, and common mistakes.", "resistance band routine", "health", "resistance-band-workout-planner", "Plan a band workout"],
  ["how-to-pick-natural-skincare", "How to Pick Natural Skincare", "Evidence-based skincare: retinol, niacinamide, vitamin C. Clean-beauty marketing vs real formulations.", "natural skincare", "health", "calorie-calculator", "Use the calorie calculator"],
  ["functional-mushroom-supplement-guide", "Functional Mushroom Supplement Guide", "Lion&rsquo;s mane, reishi, cordyceps, chaga. Extract quality, dosing, and honest evidence base.", "functional mushroom supplements", "health", "biohacking-supplement-tracker", "Track your supplement stack"],
  ["how-to-design-corporate-wellness-program", "How to Design a Corporate Wellness Program", "Corporate wellness tiers, inclusion, incentives, and common design mistakes for HR leaders.", "design corporate wellness program", "career", "corporate-wellness-roi", "Calculate wellness program ROI"],
  ["how-to-start-biohacking-safely", "How to Start Biohacking Safely", "Free basics first, supplement stack, tracking tools, and red flags in the biohacking scene.", "start biohacking safely", "health", "biohacking-supplement-tracker", "Track your biohacking stack"],
  ["how-to-pick-yoga-mindfulness-apps", "How to Pick Yoga and Mindfulness Apps", "Yoga and meditation app comparison: Calm, Headspace, Down Dog, Insight Timer, Waking Up.", "yoga mindfulness apps", "health", "pomodoro-timer", "Try our free pomodoro timer"],
  ["addiction-recovery-support-tools-guide", "Addiction Recovery Support Tools Guide", "Peer support (12-step, SMART, Refuge), apps, medication-assisted treatment, and crisis resources.", "addiction recovery support", "health", "smoking-cost-calculator", "Calculate your quit savings"],
  ["how-to-switch-to-reusable-household-products", "How to Switch to Reusable Household Products", "Highest-impact swaps first, cost math, and avoiding common pitfalls in the reusables transition.", "switch to reusable household", "home", "reusable-vs-disposable-savings", "Calculate reusable savings"],
  ["how-to-pick-eco-friendly-packaging", "How to Pick Eco-Friendly Packaging", "Packaging certifications (TUV, FSC, PCR), mushroom packaging, molded pulp, and greenwashing red flags.", "eco-friendly packaging", "career", "packing-slip-generator", "Generate a packing slip"],
  ["how-to-build-sustainable-wardrobe", "How to Build a Sustainable Wardrobe", "Buy-less first, quality basics, secondhand, certifications (GOTS, OEKO-TEX), mending, and greenwashing.", "sustainable wardrobe", "home", "clothing-size-converter", "Use the clothing size converter"],
  ["how-to-pick-ev-accessories", "How to Pick EV Accessories", "Home chargers, portable kits, winter essentials, and accessories that void warranty vs add real value.", "ev accessories", "automotive", "ev-range-estimator", "Estimate EV range"],
  ["how-to-build-a-diy-solar-power-kit", "How to Build a DIY Solar Power Kit", "Solar kit sizing by use case (100W-5000W), MPPT vs PWM, LiFePO4 batteries, permits, and common mistakes.", "diy solar power kit", "home", "solar-panel-payback-calculator", "Calculate solar payback"],
  ["how-to-pick-zero-waste-beauty", "How to Pick Zero-Waste Beauty", "Shampoo bars, refillable containers, safety razors, and which zero-waste swaps actually hold up.", "zero waste beauty", "home", "reusable-vs-disposable-savings", "Calculate reusable savings"],
  ["how-to-start-urban-farming", "How to Start Urban Farming", "Small-space food growing: container picks, vertical gardening, 4x4 raised bed yield, indoor hydroponics.", "start urban farming", "home", "planting-calendar-by-zone", "Check your planting calendar"],
  ["how-to-set-up-composting-at-home", "How to Set Up Composting at Home", "Apartment vs suburban setups, green:brown ratio, active vs cold timeline, troubleshooting smelly piles.", "set up composting home", "home", "compost-ratio-calculator", "Check your compost ratio"],
];

const toIdent = (slug) => slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");

let reg = readFileSync("content/guides/registry.tsx", "utf8");
const importLines = reg.match(/^import \* as \w+ from "\.\/[^"]+";$/gm) ?? [];
const lastImport = importLines[importLines.length - 1];
if (!lastImport) throw new Error("Could not find guide imports");

const guideImports = guides.map(([slug]) => `import * as ${toIdent(slug)} from "./${slug}";`).join("\n");
reg = reg.replace(lastImport, `${lastImport}\n${guideImports}`);

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
  const related = [ctaTarget, "budget-calculator", "ai-prompt-generator"].filter((s, i, a) => a.indexOf(s) === i).slice(0, 3);
  const relatedArr = related.map((s) => `"${s}"`).join(", ");
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
