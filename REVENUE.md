# REVENUE.md — Traffic & AdSense Growth Playbook

Single source of truth for the next 30 days. Supersedes GROWTH.md for the
revenue-first pass. Stack is already performant (90+ Core Web Vitals), so every
hour now goes to RPM × sessions — not micro-tweaks.

---

## 0. Ground truth (state at 2026-04-22)

- 350 tools under `/tools/[slug]`
- 136 guides (including categorized how-to)
- 7 hubs under `/best/[slug]`
- 10 comparisons under `/compare/[slug]`
- 15 glossary entries under `/learn/[slug]`
- 69 tools with seeded FAQ metadata; 36 with `useCases` / `whenToUse`
- Ad placement per tool page: **auto-ads sitewide + 2 manual slots** (after tool,
  before related) — updated in this pass from 1 manual slot.
- Ad placement per guide: **auto-ads + 2 manual slots** (after intro, before CTA).

---

## 1. Top 20 revenue pages

Picked by three signals: (a) high-CPC niche (finance > insurance > legal >
business > SEO > dev), (b) FAQ/metadata already seeded (means Google already
sees the page as substantial), (c) search volume shape (head term + supported
by cluster).

| # | Slug | Niche | Why it earns | CPC tier |
|---|---|---|---|---|
| 1 | `/tools/mortgage-calculator` | Finance | Mortgage CPC is the highest consumer finance CPC. Head term. | $$$$ |
| 2 | `/tools/refinance-calculator` | Finance | Refi keywords convert — rate brokers bid heavily. | $$$$ |
| 3 | `/tools/loan-calculator` | Finance | Broad head term, feeds cluster. | $$$ |
| 4 | `/tools/mortgage-affordability-calculator` | Finance | Pre-purchase intent, brokers bid. | $$$$ |
| 5 | `/tools/car-loan-calculator` | Finance | Auto loan CPC is consistently high. | $$$ |
| 6 | `/tools/student-loan-calculator` | Finance | Refi/consolidation advertisers. | $$$ |
| 7 | `/tools/personal-loan-calculator` | Finance | SoFi / LendingTree-type bidders. | $$$ |
| 8 | `/tools/401k-calculator` | Finance | Retirement planning CPC. | $$$ |
| 9 | `/tools/roth-ira-calculator` | Finance | Brokerage / robo-advisor bidders. | $$$ |
| 10 | `/tools/retirement-calculator` | Finance | Head term for retirement planning. | $$$ |
| 11 | `/tools/compound-interest-calculator` | Finance | High volume, moderate CPC, strong dwell. | $$ |
| 12 | `/tools/paycheck-calculator` | Finance | Payroll / tax software advertisers. | $$$ |
| 13 | `/tools/debt-payoff-calculator` | Finance | Debt consolidation bidders. | $$$ |
| 14 | `/tools/roi-calculator` | Finance/Business | B2B software advertisers. | $$$ |
| 15 | `/tools/budget-calculator` | Finance | Volume + consistent CPC. | $$ |
| 16 | `/tools/fha-loan-calculator` | Finance | FHA broker CPC is in the top-10 of mortgage vertical. | $$$$ |
| 17 | `/tools/va-loan-calculator` | Finance | VA broker CPC similar. | $$$$ |
| 18 | `/tools/invoice-generator` | Business | QuickBooks / FreshBooks / Wave bid. | $$$ |
| 19 | `/tools/hourly-rate-calculator` | Business | Freelance SaaS bidders. | $$ |
| 20 | `/tools/freelance-rate-calculator` | Business | Same cluster as 19. | $$ |

Second-tier (next 10, build in month 2): `savings-goal-calculator`,
`emergency-fund-calculator`, `college-savings-calculator`, `tax-calculator`,
`vat-calculator`, `sales-tax-calculator`, `freelance-rate-calculator`,
`pricing-calculator`, `subscription-cost-calculator`, `bmi-calculator`.

---

## 2. Keyword expansion per page

Format per page: **10 variations · 10 long-tail · 5 use-case**. These become
new H2/H3 sections on the tool page (so the page ranks for the tail) plus
standalone use-case tool pages when the intent diverges.

### 1. Mortgage Calculator

**Variations:** mortgage calculator online · free mortgage calculator ·
mortgage payment calculator · home loan calculator · house payment calculator ·
monthly mortgage calculator · mortgage repayment calculator ·
simple mortgage calculator · mortgage calculator with taxes ·
mortgage calculator with insurance.

**Long-tail:** how much house can i afford on 80k salary · mortgage payment on
300k house · mortgage calculator with pmi and taxes · mortgage calculator
biweekly payments · mortgage calculator with extra principal payments ·
mortgage calculator with down payment and closing costs · mortgage calculator
with hoa · mortgage calculator 30 year fixed · mortgage calculator for second
home · jumbo mortgage calculator.

**Use-case:** first-time home buyer · self-employed buyer · investment
property · rental property · condo with HOA.

### 2. Refinance Calculator

**Variations:** refinance calculator mortgage · home refinance calculator ·
mortgage refinance calculator · refi calculator · cash out refinance
calculator · rate and term refinance calculator · refinance calculator
breakeven · refinance savings calculator · refinance calculator with closing
costs · should i refinance calculator.

**Long-tail:** is it worth refinancing from 7% to 6% · refinance calculator
break even point · cash out refinance vs heloc calculator · refinance 15 year
vs keep 30 year · how much can i save refinancing 300k at 5.5% · refinance
calculator with new loan term · refinance closing costs roll in vs pay ·
refinance to remove pmi calculator · refinance after 5 years calculator ·
refinance calculator for rental property.

**Use-case:** rate-drop refi · cash-out refi for renovations · removing PMI ·
shortening term · consolidating a second mortgage.

### 3. Loan Calculator

**Variations:** free loan calculator · simple loan calculator · online loan
calculator · monthly loan payment calculator · loan repayment calculator ·
loan amortization calculator · loan interest calculator · loan calculator with
amortization schedule · bank loan calculator · loan calculator with extra
payments.

**Long-tail:** loan calculator monthly payment 10000 · loan payment on 25000
at 6% · loan calculator with balloon payment · loan calculator with variable
interest · loan calculator for 5 years · biweekly loan payment calculator ·
loan calculator extra principal saves · loan calculator interest only ·
amortization loan calculator free · loan calculator total interest paid.

**Use-case:** business working-capital loan · equipment financing · HELOC ·
home-improvement loan · small-business SBA.

### 4. Mortgage Affordability Calculator

**Variations:** home affordability calculator · how much house can i afford ·
affordability calculator mortgage · house affordability calculator ·
home buying affordability calculator · mortgage affordability by income ·
affordability calculator with debt to income · mortgage qualification
calculator · home i can afford calculator · home price affordability
calculator.

**Long-tail:** how much house can i afford on 100k salary · how much home can
i afford with 50k income · affordability calculator with student loans ·
affordability on 60k with 10% down · affordability with $1500 car payment ·
how much house can i afford self employed · affordability calculator fha
vs conventional · affordability with hoa fees · first time buyer
affordability calculator · affordability with bonus income.

**Use-case:** dual-income household · one earner · transitioning from
renting · moving to a higher-cost metro · retired buyer.

### 5. Car Loan Calculator

**Variations:** auto loan calculator · car finance calculator · car payment
calculator · vehicle loan calculator · auto payment calculator · used car
loan calculator · new car loan calculator · car loan payment calculator ·
car amortization calculator · monthly car payment calculator.

**Long-tail:** car loan calculator 60 months 5% · auto loan with trade in
calculator · car loan with down payment calculator · car loan calculator
extra payments · used car loan calculator 72 month · car loan calculator
with sales tax · car loan calculator 0 down · car loan calculator with
doc fees · car loan calculator weekly payments · auto loan payoff calculator.

**Use-case:** buying used · buying new · lease buyout · paying off early ·
refinancing an auto loan.

### 6. Student Loan Calculator

**Variations:** student loan repayment calculator · student loan payoff
calculator · student loan interest calculator · federal student loan
calculator · student loan amortization calculator · student loan refinance
calculator · private student loan calculator · student loan consolidation
calculator · student loan payment calculator after graduation ·
student loan payoff early calculator.

**Long-tail:** how long to pay off 50k in student loans · student loan
calculator income-based repayment · student loan calculator with extra
payments · student loan payoff calculator biweekly · how much to save each
month for student loans · pay off student loan vs invest calculator · student
loan calculator with forbearance · student loan payoff in 5 years calculator ·
student loan payoff calculator pslf · student loan calculator variable rate.

**Use-case:** PSLF forgiveness path · IDR / SAVE plan · aggressive payoff ·
refi with private lender · parent PLUS loans.

### 7. Personal Loan Calculator

**Variations:** personal loan payment calculator · unsecured loan calculator ·
personal loan interest calculator · personal loan amortization calculator ·
personal loan payoff calculator · bank personal loan calculator · online
personal loan calculator · simple personal loan calculator · personal loan
calculator early payoff · personal loan rate calculator.

**Long-tail:** personal loan 15000 5 years calculator · how much personal
loan can i afford · personal loan to consolidate credit card calculator ·
personal loan payoff early calculator · personal loan calculator with
origination fee · personal loan for debt consolidation calculator · personal
loan vs credit card calculator · personal loan with cosigner calculator ·
personal loan 3 year vs 5 year calculator · low-credit personal loan
calculator.

**Use-case:** debt consolidation · medical expense · wedding · home project ·
emergency bridge.

### 8. 401k Calculator

**Variations:** 401k retirement calculator · 401k growth calculator ·
401k contribution calculator · 401k match calculator · 401k future value
calculator · 401k savings calculator · 401k withdrawal calculator · 401k
investment calculator · early retirement 401k calculator · max 401k
contribution calculator.

**Long-tail:** 401k calculator with employer match · 401k calculator with
inflation · 401k calculator by age · 401k at 65 calculator · how much will
my 401k be at 60 · 401k calculator roth contributions · 401k calculator with
vesting · 401k calculator mid career · 401k calculator self directed ·
max 401k at 50 catch up calculator.

**Use-case:** just started contributing · maxing contributions · considering
Roth vs Traditional · near retirement · job-hop rollover.

### 9. Roth IRA Calculator

**Variations:** roth ira contribution calculator · roth ira growth calculator ·
roth ira conversion calculator · roth ira retirement calculator · backdoor
roth ira calculator · roth ira future value calculator · roth ira withdrawal
calculator · roth ira vs traditional calculator · roth ira match calculator ·
roth ira investment calculator.

**Long-tail:** roth ira calculator starting at 25 · roth ira 10 year
calculator · roth ira max contribution 2026 calculator · roth ira conversion
tax calculator · roth ira calculator with inflation · roth ira calculator
early withdrawal penalty · roth ira annual 7000 calculator · roth ira
calculator by income · roth ira mega backdoor calculator · roth ira first
home calculator.

**Use-case:** starting in 20s · high income (backdoor) · conversion from
traditional · catch-up in 50s · first-home purchase exception.

### 10. Retirement Calculator

**Variations:** retirement savings calculator · retirement planner
calculator · how much to retire calculator · retirement income calculator ·
retirement age calculator · retirement nest egg calculator · retirement
withdrawal calculator · retire at 60 calculator · retire at 55 calculator ·
retire early calculator.

**Long-tail:** how much do i need to retire at 65 · can i retire at 55 with
1 million · retirement calculator with social security · retirement
calculator inflation adjusted · retirement calculator with pension ·
4% rule retirement calculator · retirement calculator fire movement ·
retirement calculator married couple · retirement calculator no debt ·
retirement calculator with rental income.

**Use-case:** FIRE movement · traditional 65 retirement · early retiree
(50s) · post-divorce replan · couples dual-income plan.

### 11. Compound Interest Calculator

**Variations:** compound interest formula calculator · compound growth
calculator · compound interest monthly calculator · compound interest daily
calculator · compound savings calculator · compound interest with
contributions calculator · compound interest chart calculator · annual
compound interest calculator · compound vs simple interest calculator ·
compound interest calculator with years.

**Long-tail:** compound interest calculator 10 years monthly · compound
interest on 10000 calculator · compound interest calculator $100 per month ·
compound interest calculator 7% return · compound interest calculator with
variable contributions · compound interest calculator reinvesting dividends ·
compound interest calculator excel formula · compound interest calculator
biweekly contribution · compound interest on savings calculator · compound
interest for high yield savings account calculator.

**Use-case:** teaching kids about investing · projecting college fund ·
index-fund forecasting · CD ladder · high-yield savings account planning.

### 12. Paycheck Calculator

**Variations:** take home pay calculator · net pay calculator · paycheck tax
calculator · salary paycheck calculator · hourly paycheck calculator ·
biweekly paycheck calculator · paycheck after taxes calculator · paycheck
withholding calculator · post tax salary calculator · weekly paycheck
calculator.

**Long-tail:** paycheck calculator 50k salary · paycheck calculator by state ·
paycheck calculator 401k deduction · paycheck calculator with bonus ·
paycheck calculator married filing jointly · paycheck calculator for
freelancer · paycheck calculator dual income · paycheck calculator with
hsa · paycheck calculator self employed · paycheck calculator hourly 30
hours per week.

**Use-case:** new-job offer comparison · tax-bracket planning · salary
negotiation · hourly worker · commission / bonus side income.

### 13. Debt Payoff Calculator

**Variations:** debt snowball calculator · debt avalanche calculator ·
debt elimination calculator · credit card payoff calculator · debt
consolidation calculator · debt free date calculator · multiple debt
calculator · debt repayment calculator · credit card debt calculator ·
debt reduction calculator.

**Long-tail:** debt payoff calculator multiple cards · debt snowball
vs avalanche calculator · debt payoff calculator with extra payment ·
debt payoff by a certain date calculator · credit card payoff in 2 years
calculator · debt payoff calculator 0% balance transfer · debt payoff while
investing calculator · debt payoff calculator student loan + credit card ·
debt payoff calculator after raise · debt payoff planner calculator.

**Use-case:** single credit card · multiple cards · card + student loans ·
balance-transfer strategy · post-raise new plan.

### 14. ROI Calculator

**Variations:** return on investment calculator · roi formula calculator ·
investment roi calculator · annualized roi calculator · project roi
calculator · marketing roi calculator · business roi calculator · simple
roi calculator · roi percentage calculator · roi over time calculator.

**Long-tail:** roi calculator real estate flip · roi calculator for rental
property · roi calculator ad campaign · roi calculator saas ·
roi calculator with inflation · roi calculator irr equivalent · roi
calculator multi year · roi calculator dollar weighted · roi calculator
net of fees · roi calculator with compounding.

**Use-case:** real-estate flip · rental cash-flow · marketing campaign ·
SaaS MRR growth · stock/ETF performance vs S&P.

### 15. Budget Calculator

**Variations:** monthly budget calculator · household budget calculator ·
50/30/20 budget calculator · zero-based budget calculator · budget planner
calculator · paycheck to paycheck budget calculator · biweekly budget
calculator · family budget calculator · budget breakdown calculator ·
personal budget calculator.

**Long-tail:** budget calculator 50k salary · budget calculator couple one
income · budget calculator by zip code · budget calculator with 401k ·
budget calculator rent percentage · budget calculator for college student ·
budget calculator self employed · budget calculator with childcare ·
budget calculator for retirement savings · budget calculator debt-focused.

**Use-case:** paying off debt · saving for house · single-parent household ·
college student · retiree fixed income.

### 16. FHA Loan Calculator

**Variations:** fha mortgage calculator · fha loan payment calculator ·
fha calculator with mip · fha affordability calculator · fha vs conventional
calculator · fha loan qualification calculator · fha refinance calculator ·
fha loan limit calculator · fha with 3.5% down calculator · fha streamline
calculator.

**Long-tail:** fha calculator 5% down · fha calculator 300k home · fha
calculator with pmi and taxes · fha calculator low credit score ·
fha calculator closing costs · fha calculator florida · fha calculator
texas · fha calculator with seller concessions · fha calculator monthly
payment breakdown · fha calculator mortgage insurance removal.

**Use-case:** first-time buyer · low-down-payment buyer · credit-rebuilding
buyer · relocating veteran · using gift funds.

### 17. VA Loan Calculator

**Variations:** va mortgage calculator · va home loan calculator · va loan
payment calculator · va loan funding fee calculator · va loan affordability
calculator · va irrrl calculator · va refinance calculator · va loan
eligibility calculator · va jumbo calculator · disabled veteran va loan
calculator.

**Long-tail:** va loan calculator zero down · va loan with disability
calculator · va loan with co-borrower calculator · va irrrl vs refinance
calculator · va loan calculator florida · va loan calculator funding fee
first use · va loan payment 400k calculator · va loan monthly payment
calculator · va loan calculator 0 down 30 year · va loan calculator with
taxes and insurance.

**Use-case:** active-duty buyer · retired military · surviving spouse ·
disabled veteran (no funding fee) · refinance existing VA.

### 18. Invoice Generator

**Variations:** free invoice generator · online invoice generator · simple
invoice generator · invoice creator · invoice maker · pdf invoice generator ·
invoice template generator · professional invoice generator · blank invoice
generator · printable invoice generator.

**Long-tail:** invoice generator for freelancers · invoice generator with
vat · invoice generator for small business · invoice generator with logo ·
invoice generator no signup · invoice generator google docs ·
invoice generator recurring · invoice generator hourly rate · invoice
generator for graphic designer · invoice generator with paypal link.

**Use-case:** freelance designer · consultant · small business · contractor ·
international client with VAT.

### 19. Hourly Rate Calculator

**Variations:** hourly to salary calculator · salary to hourly calculator ·
hourly wage calculator · hourly pay calculator · hourly rate converter ·
annual to hourly calculator · hourly rate to annual calculator · hourly pay
to salary calculator · hourly wage to monthly calculator · hourly to yearly
calculator.

**Long-tail:** hourly to salary 50k calculator · salary to hourly 35 hours ·
hourly wage to biweekly calculator · hourly to salary after taxes · hourly
to monthly 40 hour calculator · hourly rate calculator part time · hourly
to yearly freelance · hourly to annual self employed · hourly salary
calculator with pto · hourly rate equivalent salary calculator.

**Use-case:** comparing job offer · negotiating raise · transitioning to
freelance · part-time planning · travel-nurse contract compare.

### 20. Freelance Rate Calculator

**Variations:** freelancer rate calculator · freelance hourly rate
calculator · freelance pricing calculator · freelance income calculator ·
freelance target rate calculator · freelance day rate calculator ·
freelance rate by niche calculator · freelance project rate calculator ·
freelance rate comparison · freelance rate formula calculator.

**Long-tail:** freelance rate calculator with taxes and benefits · freelance
rate calculator graphic designer · freelance rate calculator web developer ·
freelance rate calculator marketing · freelance rate calculator ui ux ·
freelance rate calculator writer · freelance rate calculator photographer ·
freelance rate calculator video editor · freelance rate calculator by
years of experience · freelance rate to income calculator.

**Use-case:** quitting day job to freelance · side-hustle rate · raising
rates · niche specialist (e.g., SaaS copywriter) · agency-of-one billing.

---

## 3. New pages to build (50 slugs, 30 days)

All three types mapped to intent. Build 10–20 per week, stop if any lose the
"low competition / high intent" screen.

### 3A. Use-case tool variants (18)

Each is a `/tools/[slug]` variant that pre-fills or specializes the base
tool. Heavy lift is copy (title + H1 + 600 words); UI can pre-fill from
existing component with `searchParams` deep-link.

| Slug | Target base | H1 | Primary keyword |
|---|---|---|---|
| `mortgage-calculator-with-pmi-and-taxes` | mortgage | Mortgage Calculator with PMI, Taxes & Insurance | mortgage calculator with pmi and taxes |
| `biweekly-mortgage-calculator` | mortgage | Biweekly Mortgage Payment Calculator | biweekly mortgage calculator |
| `mortgage-payoff-calculator` | mortgage | Mortgage Payoff Calculator (Extra Payments) | mortgage payoff calculator |
| `jumbo-mortgage-calculator` | mortgage | Jumbo Mortgage Calculator | jumbo mortgage calculator |
| `heloc-calculator` | loan | HELOC Payment Calculator | heloc calculator |
| `cash-out-refinance-calculator` | refinance | Cash-Out Refinance Calculator | cash out refinance calculator |
| `business-loan-calculator` | loan | Business Loan Calculator | business loan calculator |
| `sba-loan-calculator` | loan | SBA Loan Calculator | sba loan calculator |
| `credit-card-payoff-calculator` | debt-payoff | Credit Card Payoff Calculator | credit card payoff calculator |
| `minimum-payment-calculator` | debt-payoff | Credit Card Minimum Payment Calculator | credit card minimum payment calculator |
| `apr-calculator` | loan | APR Calculator (True Cost of Borrowing) | apr calculator |
| `apy-calculator` | compound-interest | APY Calculator | apy calculator |
| `simple-interest-calculator` | compound-interest | Simple Interest Calculator | simple interest calculator |
| `amortization-schedule-calculator` | mortgage | Amortization Schedule Calculator | amortization schedule calculator |
| `self-employed-tax-calculator` | tax | Self-Employed Tax Calculator | self employed tax calculator |
| `quarterly-tax-calculator` | tax | Quarterly Estimated Tax Calculator | quarterly tax calculator |
| `take-home-pay-calculator` | paycheck | Take-Home Pay Calculator | take home pay calculator |
| `overtime-pay-calculator` | paycheck | Overtime Pay Calculator | overtime pay calculator |

### 3B. Best-of hubs (7 new, one per persona)

Tuck under `/best/[slug]`. Each lists 10–15 existing tools with a pitch, plus
2–3 prose sections.

| Slug | Title | Why it ranks |
|---|---|---|
| `best-free-mortgage-calculators` | Best Free Mortgage Calculators | "best mortgage calculator" is searched ~60k/mo, Bankrate owns it today. |
| `best-free-retirement-calculators` | Best Free Retirement Calculators | SmartAsset dominates but not all queries are navigational. |
| `best-free-debt-calculators` | Best Free Debt Payoff Calculators | Ramsey's free tools are clunky; we win on UX. |
| `best-free-seo-tools-for-bloggers` | Best Free SEO Tools for Bloggers | Long-tail around Ahrefs-replacements. |
| `best-free-pdf-tools` | Best Free PDF Tools (No Signup) | Smallpdf-replacements, huge volume. |
| `best-free-image-tools-for-ecommerce` | Best Free Image Tools for Ecommerce Sellers | Etsy/Shopify niche. |
| `best-free-tax-calculators-for-self-employed` | Best Free Tax Calculators for Freelancers | High-CPC vertical, Shopify freelance niche. |

### 3C. How-to guides (25, each linked to a money tool)

Each is `/guides/[slug]`, 1200–1800 words, with `cta.targetSlug` pointing at
the related tool. Cross-link from the tool's `Supporting guides` slot.

1. `how-to-calculate-mortgage-payment`
2. `how-to-refinance-a-mortgage-worth-it`
3. `how-to-pay-off-a-mortgage-early`
4. `how-to-afford-a-house-on-one-income`
5. `how-to-calculate-apr-vs-apy`
6. `how-to-pay-off-credit-card-debt-fast`
7. `how-to-use-avalanche-vs-snowball`
8. `how-to-choose-15-vs-30-year-mortgage`
9. `how-to-decide-fha-vs-conventional`
10. `how-to-qualify-for-va-loan`
11. `how-to-calculate-take-home-pay`
12. `how-to-max-out-401k-by-end-of-year`
13. `how-to-do-a-roth-ira-conversion`
14. `how-to-retire-at-55`
15. `how-to-calculate-compound-interest-by-hand`
16. `how-to-budget-on-an-irregular-income`
17. `how-to-build-an-emergency-fund`
18. `how-to-calculate-roi-on-rental-property`
19. `how-to-price-freelance-work-in-2026`
20. `how-to-raise-your-freelance-rates`
21. `how-to-estimate-quarterly-taxes`
22. `how-to-write-a-professional-invoice`
23. `how-to-calculate-break-even-point`
24. `how-to-calculate-cost-of-living-move`
25. `how-to-track-monthly-cash-flow`

---

## 4. Pages needing optimization (top 20 punchlist)

For each top-20 tool, do this pass on the page in order:

1. **Seed FAQ if missing** — target 6 Q&As from the "long-tail" list above.
   Emits FAQPage JSON-LD automatically via ToolShell.
2. **Seed `useCases` + `whenToUse`** — converts the page from "calculator with
   body text" to "calculator with reasons to use it" (helps dwell time).
3. **Add `howItWorks` prose** — 1–2 short paragraphs explaining the math. This
   is the single best RPM move; Google rewards it heavily in finance YMYL.
4. **Add 2 inline internal links** in the explainer — link to a related tool
   and a supporting guide. Internal anchor equity compounds.
5. **Canonical check** — confirm no duplicate variant is canonicalizing
   wrong (the finance variant cluster is a risk here).
6. **Adjacent `compare` page** — if the tool has a natural A-vs-B (15yr vs
   30yr, Roth vs Trad, FHA vs Conventional), ensure the `/compare/` page
   links back to the calculator with a CTA.

Status snapshot per top-20 tool (all already have FAQ):

| Tool | FAQ | useCases | howItWorks | Inline links | Priority |
|---|---|---|---|---|---|
| mortgage-calculator | ✅ | ✅ | ✅ | ⚠️ | verify canonical + link spend |
| refinance-calculator | ✅ | ❌ | ❌ | ❌ | seed useCases + howItWorks |
| loan-calculator | ✅ | ✅ | ✅ | ⚠️ | add 2 inline links |
| mortgage-affordability-calculator | ✅ | ❌ | ❌ | ❌ | seed useCases + howItWorks |
| car-loan-calculator | ✅ | ❌ | ❌ | ❌ | seed useCases + howItWorks |
| student-loan-calculator | ✅ | ❌ | ❌ | ❌ | seed useCases + howItWorks |
| personal-loan-calculator | ✅ | ❌ | ❌ | ❌ | seed useCases + howItWorks |
| 401k-calculator | ✅ | ❌ | ❌ | ❌ | seed useCases + howItWorks |
| roth-ira-calculator | ✅ | ❌ | ❌ | ❌ | seed useCases + howItWorks |
| retirement-calculator | ✅ | ❌ | ❌ | ❌ | seed useCases + howItWorks |
| compound-interest-calculator | ✅ | ✅ | ✅ | ✅ | done — ship variants instead |
| paycheck-calculator | ✅ | ❌ | ❌ | ❌ | seed full package |
| debt-payoff-calculator | ✅ | ✅ | ✅ | ⚠️ | add 2 inline links |
| roi-calculator | ✅ | ❌ | ❌ | ❌ | seed useCases + howItWorks |
| budget-calculator | ✅ | ✅ | ✅ | ⚠️ | add 2 inline links |
| fha-loan-calculator | ✅ | ❌ | ❌ | ❌ | seed full package |
| va-loan-calculator | ✅ | ❌ | ❌ | ❌ | seed full package |
| invoice-generator | ❌ | ❌ | ❌ | ❌ | seed all four — biggest lift |
| hourly-rate-calculator | ❌ | ❌ | ❌ | ❌ | seed all four |
| freelance-rate-calculator | ❌ | ❌ | ❌ | ❌ | seed all four |

(Marked ⚠️ when some inline links exist but fewer than 2.)

---

## 5. Ad placement improvements

Current state after this pass (shipped in the same commit as this doc):

**Tool pages (`components/ToolShell.tsx`):**
- Auto-ads: sitewide
- Slot 1: after interactive tool UI, before explainer (existing)
- Slot 2: after FAQ, before `RelatedLinks` (new in this pass)

**Guide pages (`components/ArticleShell.tsx`):**
- Auto-ads: sitewide
- Slot 1: after intro, before TOC (existing, `in-article` layout)
- Slot 2: after body, before CTA (new in this pass, `in-article` layout)

**Why no "below title" slot:** a manual ad between the H1 and the tool
pushes the interactive surface below the mobile fold and tanks dwell time
(which tanks RPM). Auto-ads can still place a banner there if AdSense
decides the slot is viable. We intentionally restrict manual slots to
"after-value-delivered" positions.

**Next experiments (two weeks out, once we have baseline RPM by page):**

1. Per-top-20-tool configured slot IDs. Right now we render bare `<AdSlot>`
   components — AdSense fills them via auto-ads. Configuring named slots in
   the AdSense UI and passing `slot="1234567890"` unlocks ad-unit-level
   reporting so we can see RPM per position and cut losers.
2. Sticky-bottom mobile anchor ad — toggle in AdSense console. Typically +15%
   RPM on mobile with negligible UX hit.
3. "Multiplex" ad at the bottom of the article (native feed of 3–6 units) —
   good for long-form guides. A/B vs the current single display slot.
4. Experiment with removing the auto-ads on short tool pages that fit on one
   screen. Sometimes two manual ads outperform auto+manual mixed.

**Ad clutter guardrails:**
- Never more than 2 manual slots per page.
- Never place a manual ad between interactive form fields.
- Reserved `min-height: 90px` on unconfigured slots so CLS stays ~0.
- Keep "Advertisement" label so readers never feel tricked.

---

## 6. Traffic growth roadmap (30 days)

### Week 1 (Apr 22 → Apr 28) — optimization before expansion

- Day 1 (done): ship second manual ad slot in ToolShell + ArticleShell.
- Day 2: seed `useCases` + `whenToUse` + `howItWorks` on the 12 top-20 tools
  that currently lack them (refinance, affordability, car loan, student loan,
  personal loan, 401k, Roth IRA, retirement, paycheck, ROI, FHA, VA).
- Day 3: seed full package on invoice-generator, hourly-rate, freelance-rate.
- Day 4–5: pass 2 inline links through each top-20 tool's explainer (one to
  a related tool, one to a supporting guide).
- Day 6: build `best-free-mortgage-calculators` hub. 15 picks, 2 prose
  sections, cross-link from 5 top-20 pages.
- Day 7: submit updated sitemap to GSC + Bing; ping IndexNow for the 20
  updated pages.

### Week 2 (Apr 29 → May 5) — use-case variants

- Day 8–10: build 9 use-case mortgage/loan variants (PMI, biweekly, payoff,
  jumbo, HELOC, cash-out-refi, business, SBA, APR).
- Day 11–12: build 9 use-case debt/payroll/tax variants (credit-card payoff,
  min payment, APY, simple interest, amortization, self-employed tax,
  quarterly tax, take-home pay, overtime).
- Day 13: wire manifest + registry + push; submit sitemap.
- Day 14: build `best-free-retirement-calculators` and
  `best-free-debt-calculators` hubs.

### Week 3 (May 6 → May 12) — how-to guides that feed the tools

- Day 15–17: ship 10 how-to guides from 3C (mortgage, refi, payoff, affordable,
  APR-vs-APY, credit-card-debt, snowball-vs-avalanche, 15-vs-30, FHA-vs-conv,
  VA-qualification).
- Day 18–19: ship 8 finance how-tos (take-home, 401k-max, Roth-conversion,
  retire-at-55, compound-interest-by-hand, irregular-income-budget,
  emergency-fund, rental-ROI).
- Day 20: ship 3 freelance how-tos (price-freelance-2026, raise-rates,
  quarterly-taxes).
- Day 21: submit sitemap; add inline CTAs from each new guide to matching
  tool.

### Week 4 (May 13 → May 19) — best-of hubs + measurement

- Day 22–23: ship 4 more best-of hubs (SEO for bloggers, PDF, image for
  ecommerce, tax for freelancers).
- Day 24–25: ship 4 how-to guides on freelance/invoicing
  (write-professional-invoice, break-even-point, cost-of-living-move,
  monthly-cash-flow).
- Day 26–27: pull 30-day GSC data — impressions, CTR, position — on the
  top-20 tools + all new pages. Identify pages in positions 11–20 and write
  a 300-word "H2 section" to push them to page 1.
- Day 28: configure per-top-20 AdSense slot IDs; enable sticky-bottom mobile
  anchor ad; enable multiplex on long-form guides. Commit to 2-week A/B.
- Day 29: pull page-RPM report (now that slots are named) and cut any slots
  averaging < $1 RPM.
- Day 30: write REVENUE-MONTH-2.md with next 30 days based on data.

### Cadence going forward (Phase 5)

- **Daily:** optimize 3 pages (add FAQ / inline links / H2 section for a
  long-tail term).
- **Weekly:** ship 10–20 new pages (use-case variants, how-tos, hubs).
- **Monthly:** cut underperforming pages (impressions < 50 / month after 90
  days live), refresh stale data (rates, limits, deadlines), re-seed CTAs
  on pages whose target tool got renamed.

---

## 7. Testing loop (Phase 7)

**What to track (per-page):**
- Sessions (GA4 or Vercel Analytics)
- Bounce / dwell (Vercel Analytics visit duration)
- Impressions + CTR + position (GSC)
- Ad RPM + CTR (AdSense → Reports → Ad unit)

**What to test (one change per cycle, two-week cycles):**

| Test | Hypothesis | Metric |
|---|---|---|
| Add 2nd manual ad slot at bottom | RPM +10–15%, no dwell hit | page RPM, avg session duration |
| Swap H1 on 5 tools to include "calculator" suffix (e.g., "mortgage calculator with PMI") | Better CTR on SERP (exact-match in title) | GSC CTR for that page |
| Configure named AdSense slots (vs bare) | Unlock per-slot reporting | ad-unit RPM |
| Sticky mobile anchor on/off | +RPM with minimal dwell loss | mobile RPM, mobile bounce |
| Long-form guide multiplex vs single display | Higher engagement = higher multi-unit CPM | ad revenue per visit |
| Move #1 manual slot above vs below tool | Above-fold = higher viewability but may hurt dwell | RPM and session duration |
| Add use-case H2 for a long-tail keyword | Page ranks for 3–5 new queries | GSC impressions |

**Ship rule:** change one thing, wait 14 days, keep or revert based on RPM ×
sessions (not either alone). RPM can go up because dwell dropped, which is
bad for the next session — so watch both.

---

## 8. RPM vs CTR diagnosis crib

When pages show up in GSC/AdSense reports, use this triage:

- **High impressions, low CTR** → title or meta description is weak. Rewrite
  title to lead with the primary keyword, meta to promise a specific outcome.
- **High traffic, low RPM** → ad placement is wrong for this content shape.
  Either the page is too short for 2 manual slots (merge into one multiplex),
  or the niche has thin advertiser coverage (accept as a traffic pump, harvest
  with internal links to a higher-RPM page).
- **High CTR, low RPM** → ad positions are not viewable. Enable "lazy ad
  loading" (AdSense setting) and confirm no CSS hides ads below viewport.
- **High engagement, low RPM** → advertisers aren't bidding on this audience.
  Reshape the content to attract finance/insurance/legal advertisers (mention
  money numbers, add calculator CTAs, link to finance tools).
- **High RPM, low engagement** → ads are cannibalizing content. Remove the
  slot closest to the primary interactive element or CTA.

---

## 9. Final goal checklist

After 30 days, this doc is successful if:

- [ ] Top 20 tools each have FAQ + useCases + howItWorks + ≥2 inline links.
- [ ] 18 use-case variants live under `/tools/` (with their own manifest
      entries and registry entries).
- [ ] 25 new how-to guides live under `/guides/` (linked to money tools).
- [ ] 7 new `/best/` hubs live.
- [ ] Total pages: ~600 (up from ~550 today).
- [ ] AdSense slot IDs configured on every top-20 page, with per-slot RPM
      reporting active for 14+ days.
- [ ] GSC shows a ≥30% lift in impressions on top-20 pages vs pre-pass.
- [ ] REVENUE-MONTH-2.md drafted with data-informed next steps.

---

_Last updated: 2026-04-22. Owner: Jay. See also: `SEO.md`, `GROWTH.md`,
`DOMINATION.md`._
