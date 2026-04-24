// Seed FAQ JSON-LD data on the 15 highest-intent money tools that don't
// already have one. Each entry gets 4-5 high-quality Q&As written for SEO
// rich-result eligibility and genuine user value.
//
// Inserts `faq: [...]` immediately before the closing `}` of the tool's
// TOOL_REGISTRY entry. Idempotent: skips entries that already have faq.

import { readFileSync, writeFileSync } from "node:fs";

const FAQS = {
  "loan-calculator": [
    { q: "How is a loan payment calculated?", a: "Standard amortization: each payment covers accrued interest first, then pays down principal. Formula: P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal, r is the monthly interest rate, and n is the number of payments. Our calculator uses this exact formula." },
    { q: "What's the difference between APR and interest rate?", a: "The interest rate is the cost of borrowing the principal. The APR also includes fees and points, expressed as an annualized rate — it reflects the true cost. A 6.5% rate can have a 6.9% APR once closing costs are baked in." },
    { q: "Does paying extra principal save interest?", a: "Yes — substantially. On a 30-year $300,000 loan at 7%, an extra $200/month pays the loan off 6 years early and saves roughly $100,000 in interest. Every dollar of extra principal is a dollar of future interest you no longer owe." },
    { q: "Should I pick a 15-year or 30-year mortgage?", a: "15-year loans carry lower rates and build equity faster, but the monthly payment is 40-50% higher. 30-year loans offer flexibility — you can pay like a 15-year by making extra principal payments, with the option to fall back to the lower payment if income dips." },
  ],
  "mortgage-calculator": [
    { q: "What does PITI stand for?", a: "Principal, Interest, Taxes, Insurance. These four line items make up your total monthly mortgage obligation — not just the principal and interest the mortgage calculator spits out. PMI and HOA dues pile on if they apply to your situation." },
    { q: "How much house can I afford?", a: "A common rule is 28% of gross income on housing (PITI) and 36% total debt. A stricter rule — especially in high-cost metros — is 20% of take-home pay. Our calculator shows the PITI; check our car-affordability-calculator or fire-number-calculator for income-based guardrails." },
    { q: "Should I buy points to lower my rate?", a: "Each point typically costs 1% of the loan and cuts the rate by about 0.25%. Break-even is usually 4-6 years. If you'll move or refinance before then, points don't pay off. Run the months-to-break-even math before committing." },
    { q: "What is PMI and when does it drop off?", a: "Private Mortgage Insurance is required when your down payment is under 20%. It auto-cancels at 78% loan-to-value by law; you can also request removal at 80% LTV. Our pmi-calculator shows your drop-off month based on amortization." },
  ],
  "compound-interest-calculator": [
    { q: "Why does compound interest beat simple interest?", a: "Simple interest pays only on the original principal. Compound interest pays on the growing balance — interest on interest. Over 30 years at 8%, $10,000 becomes $14,400 with simple interest, but $100,600 with compounding. Time is the multiplier." },
    { q: "Does the compounding frequency matter?", a: "Yes, but less than people think. Daily compounding vs annual at 8% over 30 years is only a 12% difference in final value. What matters far more is the contribution amount and time horizon. Don't chase daily-compound promotions." },
    { q: "How much should I invest monthly?", a: "A common benchmark: invest 15% of pre-tax income for retirement. At 8% annual return over 40 years, that ~$750/month on a $60k salary becomes about $2.3 million. Our calculator shows what your specific contribution grows to." },
    { q: "What rate should I use for projections?", a: "The S&P 500 has returned about 10% nominal / 7% real (inflation-adjusted) over 100+ years. For conservative planning, use 6-7%. For index-fund portfolios, 7-8% is reasonable. Crypto or individual stocks have no reliable average — don't plan on it." },
  ],
  "home-equity-loan-calculator": [
    { q: "How much can I borrow against my home?", a: "Most lenders cap combined loan-to-value (CLTV) at 80-85%. If your home is worth $400,000 and you owe $200,000 on your mortgage, at 85% CLTV you can borrow up to $140,000 ($340,000 total minus $200,000 existing)." },
    { q: "HELOC vs home equity loan — what's the difference?", a: "A home equity loan is a lump sum at a fixed rate. A HELOC (Home Equity Line of Credit) is a revolving credit line with a variable rate, similar to a credit card backed by your house. HELOCs are more flexible; equity loans are more predictable." },
    { q: "Is home equity loan interest tax deductible?", a: "Only if the loan is used to 'buy, build, or substantially improve' the home, per the 2017 Tax Cuts and Jobs Act. Using equity for a car or vacation means no deduction. Combined with your primary mortgage, the total must stay under $750,000 to deduct." },
    { q: "What happens if I can't make payments?", a: "Home equity loans are secured by your home — default risks foreclosure. This is why tapping home equity for non-essentials is risky. Only borrow what you can service comfortably even in a bad month." },
  ],
  "fire-number-calculator": [
    { q: "What's the 4% rule?", a: "The Trinity Study's finding that a retiree can safely withdraw 4% of their starting portfolio each year (adjusted for inflation) and have it last 30+ years with high probability. Your FIRE number is annual expenses × 25 — the inverse of 4%." },
    { q: "Is 4% still safe in 2026?", a: "Debated. Some researchers argue 3-3.5% is safer given lower projected bond yields and higher equity valuations. Others note the original study was conservative. Most FIRE planners target 3.25-3.75% for long retirements (50+ years) and 4% for traditional retirement ages." },
    { q: "What's the difference between lean-FIRE and fat-FIRE?", a: "Lean-FIRE: $30-50k annual spend, typically requires $750k-1.25M invested. Fat-FIRE: $150k+ annual spend, typically $3.75M+. Coast-FIRE: already have enough that compound growth alone will hit your number by retirement age, so you can stop saving." },
    { q: "How do I account for healthcare before Medicare?", a: "The big unknown in US FIRE. ACA marketplace premiums depend on taxable income, not wealth — so keep realized income low in retirement years to qualify for subsidies. Budget $10-25k/year for pre-Medicare healthcare as a planning assumption." },
  ],
  "closing-cost-estimator": [
    { q: "How much are closing costs typically?", a: "2-5% of the loan amount, depending on state and loan type. A $400,000 loan usually runs $8,000-20,000 in closing costs. FHA and VA loans have different fee structures; cash purchases are cheaper." },
    { q: "Can I roll closing costs into the loan?", a: "For mortgages: yes, via a no-closing-cost loan, but you pay slightly more over time via a higher interest rate. Refinances commonly roll costs in. For purchases, closing costs paid upfront are usually the better long-run math." },
    { q: "Who pays what — buyer vs seller?", a: "Traditionally buyers pay origination, appraisal, title insurance, and prepaids. Sellers pay the real estate commissions (typically 5-6%) plus transfer taxes and their own title costs. State and contract terms can shift specific line items." },
    { q: "What costs can I negotiate?", a: "Origination fees, application fees, title insurance (you can shop providers), and junk fees. What you can't negotiate: appraisal, recording, transfer taxes, and prepaid escrow. Getting 3 Loan Estimates lets you benchmark and negotiate." },
  ],
  "pmi-calculator": [
    { q: "When is PMI required?", a: "On conventional loans when the down payment is less than 20%. FHA loans have their own mortgage insurance (MIP) that behaves differently. VA loans and USDA loans don't require PMI but may have funding fees." },
    { q: "How much does PMI cost?", a: "0.3% to 1.5% of the loan amount per year, depending on credit score and down payment size. A 680-credit-score borrower with 10% down on a $300,000 loan pays about $1,500-2,400 annually, or $125-200/month." },
    { q: "How do I remove PMI?", a: "Three paths: (1) wait for automatic cancellation at 78% LTV based on original amortization, (2) request removal at 80% LTV after providing an appraisal showing current value, (3) refinance once you reach 20% equity." },
    { q: "Is PMI tax deductible?", a: "It was deductible for tax years 2018-2021 under the Tax Cuts and Jobs Act, then extended through 2021. As of 2026, the deduction has expired and is not in effect unless Congress reinstates it. Don't plan on it." },
  ],
  "property-tax-calculator": [
    { q: "How is property tax calculated?", a: "Assessed value × local tax rate (mill rate). Assessed value is often lower than market value — many states assess at 80-90% of market, and some use more complex formulas. The tax rate combines county, city, school district, and special assessments." },
    { q: "Why do property taxes vary so much by state?", a: "States fund schools and local services differently. New Jersey (2.21% effective rate) relies heavily on property tax. Hawaii (0.28%) funds schools more through state income tax. Texas has no income tax but higher property taxes to compensate." },
    { q: "Can I challenge my property tax assessment?", a: "Yes. Most counties have an annual appeal window. Gather comparable properties with lower assessments, document condition issues, and file within the deadline. About 40% of appeals result in some reduction. Worth trying if you think your assessment is 5%+ too high." },
    { q: "Do property taxes increase every year?", a: "Usually yes. Most states allow 2-5% annual increases; California caps them at 2% via Prop 13 until the home sells. Tax rates can also rise if your locality passes new levies. Budget for 3% annual growth as a planning default." },
  ],
  "mortgage-payoff-accelerator": [
    { q: "How much can an extra payment actually save?", a: "On a 30-year $300,000 loan at 7%, an extra $200/month pays off 6 years early and saves roughly $100,000 in interest. The later in the loan you are, the less each extra dollar saves — early payments matter most because interest front-loads." },
    { q: "Is it better to invest extra money or pay down the mortgage?", a: "Rough math: if your mortgage rate is 7% and you expect 8-10% on stock investments, investing wins long-term. But paying down mortgage is a guaranteed 7% return — no market risk. Many people do both: max retirement accounts first, then split." },
    { q: "What is a biweekly payment schedule?", a: "Pay half the monthly payment every two weeks. Because there are 26 biweekly periods in a year, you make 13 full monthly payments instead of 12 — one extra payment annually. This alone cuts a 30-year loan to about 26 years." },
    { q: "Will my lender let me make extra principal payments?", a: "Yes, in nearly all cases. Check your loan terms for 'prepayment penalties' — uncommon since 2010 but they exist. Send extra payments with a note specifying 'apply to principal' so they don't get credited against your next regular payment." },
  ],
  "rental-yield-calculator": [
    { q: "What's a good rental yield?", a: "Gross yield under 5% is weak. 5-8% is average. 8-12% is strong. Above 12% often signals distressed property, bad neighborhoods, or short-term-rental markets. Yields vary by city — San Francisco runs 3-4%, Cleveland runs 10-15%." },
    { q: "Does rental yield include the mortgage?", a: "No. Gross and net yield are both property-only metrics — they measure return on purchase price, not on cash invested. For returns net of financing, look at cash-on-cash return — use our cash-on-cash-return-calculator." },
    { q: "What expenses should I include in net yield?", a: "Annual property tax, insurance, maintenance (budget 1% of property value), HOA, vacancy allowance (5-10% of rent), and property management (8-12% if you hire it). Repairs and capital expenses average 10-15% of rent long-term." },
    { q: "How does rental yield compare to stock market returns?", a: "The S&P 500 has returned about 10% nominal over the long run. Real estate yields typically look lower but add appreciation (3-5% annually) and leverage (a 20% down payment triples equity returns). Run the 10-year IRR, not just yield." },
  ],
  "cap-rate-calculator": [
    { q: "What is a good cap rate?", a: "2-4% suggests a pricey market (coastal cities). 4-7% is typical in healthy markets. 7-10% signals strong cash flow or secondary markets. Above 10% often indicates distressed property or market risk. Cap rates are inversely correlated with property appreciation expectations." },
    { q: "How is cap rate different from ROI?", a: "Cap rate is NOI / property price — property-only, unleveraged. ROI can include financing (cash-on-cash), appreciation, tax benefits, and principal paydown. Cap rate is the cleanest apples-to-apples comparison across properties; ROI tells you the whole story for a specific investor." },
    { q: "Does cap rate include my mortgage payment?", a: "No. Cap rate measures the property's ability to produce income regardless of how it's financed. Two investors buying the same property with different loans have the same cap rate but different cash-on-cash returns." },
    { q: "Why do cap rates compress in hot markets?", a: "When more investors chase the same assets, prices rise faster than rents, pushing cap rates down. 2021-2022 saw 3-4% cap rates in cities that historically ran 6-7%. In a rising-rate environment, expect cap rate expansion as prices adjust." },
  ],
  "cash-on-cash-return-calculator": [
    { q: "What's a good cash-on-cash return?", a: "8%+ is the common 'good deal' threshold. 10-12% is strong. 15%+ usually means high leverage or risky markets. Factor in whether your target includes appreciation — most investors target 8-10% cash-on-cash plus expected 3-5% appreciation." },
    { q: "How is cash-on-cash different from cap rate?", a: "Cap rate measures the property-only return. Cash-on-cash factors in your mortgage and measures return on the actual cash you invested (down payment + closing + rehab). The leverage of a mortgage typically doubles or triples cash-on-cash versus cap rate." },
    { q: "Should I include appreciation in this?", a: "No — cash-on-cash is just annual cash flow / cash invested. Appreciation is a separate (and speculative) return. Your total return is cash-on-cash + appreciation + principal paydown + tax benefits. Each is a distinct component worth tracking separately." },
    { q: "How do I improve cash-on-cash return?", a: "Three levers: (1) lower purchase price (negotiate or buy in down markets), (2) raise rents (improvements, better management), (3) reduce expenses (insurance shopping, protest property tax, DIY maintenance). Refinancing at a lower rate also helps, but cash-out reduces equity." },
  ],
  "house-flip-roi-calculator": [
    { q: "What is the 70% rule in flipping?", a: "The maximum offer equals 70% of ARV (After-Repair Value) minus rehab cost. On a $300,000 ARV with $40,000 rehab: max offer = $300k × 0.70 - $40k = $170k. The 30% buffer covers holding, financing, selling costs, and profit target." },
    { q: "What are typical holding costs?", a: "$500-$2,500/month depending on property. Includes mortgage/hard-money interest, property tax, insurance, utilities, HOA. Hard money loans run 10-15% annually plus 2-4 points — they're expensive if the flip drags on past 4 months." },
    { q: "What's the biggest risk in flipping?", a: "Overshooting the rehab budget. Rookie flippers routinely come in 30-50% over budget — plumbing, electrical, foundation issues uncovered mid-rehab. Always keep a 20% contingency reserve. Second biggest risk: market timing during a correction." },
    { q: "How long should a typical flip take?", a: "Light cosmetic flips: 6-12 weeks. Moderate rehabs: 3-5 months. Full gut renovations: 6-9 months. Each extra month of holding costs typically eats $2-3k in net profit. Moving fast matters more than maxing rehab scope." },
  ],
  "airbnb-revenue-estimator": [
    { q: "What's a realistic occupancy rate for a new listing?", a: "30-45% year one as you build reviews. Established listings average 55-70% occupancy in good markets. Seasonal markets (beach, ski) can hit 85% peak season, 20% off season. Use conservative 55% for first-year underwriting." },
    { q: "How do I estimate my nightly rate?", a: "Check AirDNA (paid) or MashVisor for your specific zip code and bedroom count. Free alternative: search Airbnb for your area, filter your dates, view 5-10 comparable listings, use the median. Price 10-20% below the median to start and raise as reviews build." },
    { q: "What are typical Airbnb costs?", a: "Airbnb fees: ~14% host + guest total. Cleaning: $75-200 per turnover. Supplies + utilities: $200-500/month. Maintenance: 10% of gross revenue. Property management: 20-25% of gross if hands-off. Total operating expenses usually eat 30-40% of gross revenue." },
    { q: "How does Airbnb compare to long-term rental income?", a: "Short-term rental grosses 2-3x long-term rental revenue in good markets but cost ratios are higher. Net, STR typically yields 40-60% more than LTR — if you can maintain occupancy and regulations allow. Many cities are banning short-term rentals; check local law before buying." },
  ],
  "car-payment-calculator": [
    { q: "How much car can I afford?", a: "Common rule: car payment + insurance + fuel + maintenance ≤ 10-15% of take-home pay. A tighter rule: price ≤ 35% of gross income. For a $60,000 earner, that's a $21,000 car max. Use our car-affordability-calculator for your specific numbers." },
    { q: "What's a good interest rate on a car loan?", a: "As of 2026: new car loans run 5.5-7% for excellent credit, 9-13% for fair credit, 15%+ for subprime. Used car rates are typically 1-2% higher. Dealer financing is often higher than credit union financing — shop both." },
    { q: "Should I choose a 60-month or 84-month loan?", a: "60 months max, ideally less. 84-month loans keep payments low but extend you underwater (owing more than the car is worth) for 4+ years. If you can't afford the 60-month payment, you can't afford the car." },
    { q: "Is a car payment a bad financial move?", a: "Not necessarily — but most Americans finance too much car. A $500 monthly car payment over 20 working years, invested at 8%, would be $275,000+ in retirement. The financial cost of car payments is massive. Buying used and financing shorter helps." },
  ],
};

// Read registry
let src = readFileSync("components/tools/registry.tsx", "utf8");
let patched = 0;
let skipped = 0;

for (const [slug, faqList] of Object.entries(FAQS)) {
  // Find the entry by slug key
  const marker = `  "${slug}": {`;
  const idx = src.indexOf(marker);
  if (idx < 0) {
    console.log("MISSING:", slug);
    continue;
  }

  // Walk forward to find the closing `},` of this entry by bracket counting
  let depth = 0;
  let end = idx;
  let inStr = false, q = "", esc = false;
  for (let i = idx; i < src.length; i++) {
    const c = src[i];
    if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === q) inStr = false; continue; }
    if (c === '"' || c === "'" || c === "`") { inStr = true; q = c; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { end = i; break; } }
  }

  const entryText = src.slice(idx, end + 1);
  if (/\bfaq:\s*\[/.test(entryText)) {
    skipped++;
    continue;
  }

  // Build the FAQ block.
  const faqBlock = faqList.map((f) => `      {
        q: ${JSON.stringify(f.q)},
        a: ${JSON.stringify(f.a)},
      },`).join("\n");

  // Insert before the closing `}` of the entry.
  const indent = "    ";
  const newEntryText = entryText.slice(0, -1).replace(/,?\s*$/, "") +
    ",\n" +
    indent + "faq: [\n" +
    faqBlock + "\n" +
    indent + "],\n  }";

  src = src.slice(0, idx) + newEntryText + src.slice(end + 1);
  patched++;
}

writeFileSync("components/tools/registry.tsx", src);
console.log(`patched: ${patched}, already had FAQ: ${skipped}`);
