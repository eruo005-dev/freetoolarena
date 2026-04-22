/**
 * Comparison pages at /compare/[slug]. Each entry is a head-to-head "X vs Y"
 * landing page that ranks for the literal comparison query (e.g. "15 year vs
 * 30 year mortgage", "roth ira vs traditional ira"). These pages carry the
 * double SEO value of (a) owning a keyword individual tools can't own, and
 * (b) cross-linking two existing tool pages — which concentrates internal
 * PageRank on the underlying calculators that convert readers into users.
 *
 * Every comparison includes:
 * - unique 400-600 word intro (why this decision matters)
 * - two "side" blocks with pro/con bullets and a typical-user description
 * - a clear "verdict" paragraph with the recommendation
 * - 3-6 FAQ pairs for FAQPage JSON-LD
 * - pointer to 1-2 underlying tools on this site
 *
 * Slugs referenced in `toolSlugs` MUST exist in lib/pages.ts (published: true),
 * since the page links to them and uses them for cross-nav. If a tool is
 * removed, this file won't build — that's intentional.
 */

export interface ComparisonSide {
  /** Short label ("15-year mortgage"). */
  label: string;
  /** One-sentence summary of this side. */
  summary: string;
  /** Plain-language description of the typical user who picks this side. */
  bestFor: string;
  /** 3-5 pro bullets. */
  pros: string[];
  /** 3-5 con bullets. */
  cons: string[];
}

export interface ComparisonFaq {
  q: string;
  a: string;
}

export interface Comparison {
  slug: string;
  /** SEO title — <= 60 chars ideal. */
  title: string;
  /** Visible H1 on the page. */
  h1: string;
  /** Meta description, 140-160 chars. */
  description: string;
  /** Primary keyword we want to rank for. */
  keyword: string;
  /** Small uppercase label shown above H1. */
  eyebrow: string;
  /** 2-3 paragraph intro that sets up the decision. */
  intro: string;
  /** Two sides of the comparison. */
  sides: [ComparisonSide, ComparisonSide];
  /** Verdict / "how to choose" paragraph — the payoff. */
  verdict: string;
  /** Optional deep-dive sections (heading + markdown-style body). */
  sections?: { heading: string; body: string }[];
  /** FAQPage JSON-LD + visible Q&A block. */
  faq: ComparisonFaq[];
  /** Up to 2 tool slugs that readers should open next. Must be live. */
  toolSlugs: string[];
  /** Optional related comparison slugs to cross-link. */
  relatedSlugs?: string[];
}

export const COMPARISONS: Comparison[] = [
  // ---------------------------------------------------------------------------
  {
    slug: "15-year-vs-30-year-mortgage",
    title: "15-Year vs 30-Year Mortgage: Which Term Actually Saves Money?",
    h1: "15-year vs 30-year mortgage",
    description:
      "15-year vs 30-year mortgage compared: monthly payment, total interest, flexibility, and who each term is actually best for. Use our free calculator to run the numbers on your own loan.",
    keyword: "15 year vs 30 year mortgage",
    eyebrow: "Head-to-head · Mortgages",
    intro:
      "The 15-year versus 30-year mortgage decision is the single biggest lever in most American home-buying budgets. On a $400,000 loan at realistic 2026 rates, the gap between the two choices is often more than $150,000 of lifetime interest — enough to fund a child's college education, a retirement head start, or an entirely second property. But the 15-year term isn't a universal winner: it comes with a payment that's typically 40 to 60 percent higher, and that higher payment has crushed more households than high rates ever did. This page lays out exactly how the math works, who should pick which, and where the decision gets genuinely hard.",
    sides: [
      {
        label: "15-year mortgage",
        summary: "Shorter term, higher payment, much less interest over the life of the loan.",
        bestFor: "Buyers with stable dual incomes, a healthy emergency fund (6+ months), and enough room in their budget that the higher payment won't crowd out retirement contributions or force a home-rich / cash-poor lifestyle.",
        pros: [
          "Interest rate is typically 0.5–0.75 points lower than the 30-year.",
          "Total interest paid is roughly 55–65 percent lower over the life of the loan.",
          "Builds equity dramatically faster — you're mostly paying principal by year 5.",
          "Forces disciplined repayment; fewer people 'borrow against the house' to renovate.",
          "Done in 15 years — gives you a fully paid-off home well before most people's retirement window.",
        ],
        cons: [
          "Monthly payment is 40–60 percent higher than the 30-year at the same loan size.",
          "Less room for emergencies — a job loss on a tight 15-year payment is far scarier.",
          "Can crowd out retirement contributions; missing the 401(k) match to make the payment is usually a bad trade.",
          "Less flexibility: you can't 'recast' a 30-year payment down in a bad year.",
          "Pushes some buyers into a smaller house than they could otherwise comfortably afford.",
        ],
      },
      {
        label: "30-year mortgage",
        summary: "Longer term, lower monthly payment, substantially more interest paid over time.",
        bestFor: "First-time buyers, single-income households, anyone with variable income (freelancers, commission-based sales), and anyone who intends to aggressively fund retirement accounts before accelerating house payments.",
        pros: [
          "Lowest possible monthly payment for a given loan size.",
          "Keeps your cash-flow flexible for emergencies, investments, and retirement contributions.",
          "You can make extra payments any month you want — a 30-year with $500 extra monthly pays off in ~20 years.",
          "Historically, long-term investments have returned more than the spread between mortgage rates and market returns — so carrying low-rate debt can be mathematically optimal.",
          "If you refinance or move within 7 years (the median homeowner does), most of the '30-year interest' never actually happens.",
        ],
        cons: [
          "Total interest is dramatically higher if you run the term out — often 2× the original loan balance.",
          "You build equity slowly; the first 5 years are almost all interest.",
          "Easier to feel 'house-rich' and over-borrow into a larger home than is prudent.",
          "Some buyers never actually make the extra payments they planned to.",
          "At retirement, still making mortgage payments is a stressor many underestimate.",
        ],
      },
    ],
    verdict:
      "If your monthly budget clears the 15-year payment with at least 20 percent headroom, you have a fully funded emergency fund, and you are already capturing your full 401(k) match, the 15-year is almost always the better deal. For everyone else — which is most first-time buyers — take the 30-year and pay it down like a 20-year by adding one extra principal payment every quarter. You get 80 percent of the interest savings with 100 percent of the flexibility. The worst outcome is signing up for the 15-year, then defaulting or scaling back retirement savings to make the payment work.",
    sections: [
      {
        heading: "A concrete example: $400,000 loan, 2026 rates",
        body: "At a 6.25% rate on a 30-year and a 5.5% rate on a 15-year, a $400,000 loan costs roughly $2,463/mo on the 30-year and $3,267/mo on the 15-year. Over the life of the loan, the 30-year version pays about $486,000 in interest; the 15-year pays about $188,000. That's $298,000 of interest avoided — but at a cost of $804/mo extra in payments for 15 years (roughly $145,000 of extra cash). The math says the 15-year 'wins' — provided you would have saved the difference anyway. If the 'savings' would have gone to lifestyle inflation, the 30-year plus aggressive 401(k) contributions is often the better real-world outcome.",
      },
      {
        heading: "The hidden third option: 30-year with extra principal payments",
        body: "Most people never compare this, but it's often the best choice. Take the 30-year mortgage, commit to making 13 payments per year (the 'biweekly' trick), and the loan pays off in about 22–24 years with interest savings of 30–40 percent. You keep the low required payment for months when cash is tight, and accelerate in months when it isn't. Almost all lenders accept extra principal payments with no penalty.",
      },
    ],
    faq: [
      {
        q: "Is a 15-year mortgage always better if you can afford it?",
        a: "Not always. The 15-year has a guaranteed interest rate return; aggressive retirement investing historically has a higher (but not guaranteed) return. If taking the 15-year means contributing less to a 401(k) match, the 30-year plus full match is almost always the better lifetime outcome.",
      },
      {
        q: "How much higher is the 15-year monthly payment?",
        a: "Roughly 40 to 60 percent higher than the 30-year at the same loan size. For a $400,000 loan at recent rates, that's about $800 more per month.",
      },
      {
        q: "Should I refinance a 30-year into a 15-year?",
        a: "Only if the new 15-year payment is comfortable at current rates, closing costs pay back within 3 years, and you have no higher-return uses for the cash (paying off 8%+ APR debt, maxing retirement accounts, etc.).",
      },
      {
        q: "Do lenders charge prepayment penalties?",
        a: "Most US conventional mortgages issued in the last decade do not. Always check the note — a few non-QM loans still have them in the first 2-3 years.",
      },
      {
        q: "What's a 20-year mortgage and how does it fit?",
        a: "A middle ground, available from many lenders. Payment is only 15–20 percent higher than a 30-year, and you're done in 20 years with interest savings close to the 15-year. Worth pricing.",
      },
    ],
    toolSlugs: ["15-year-mortgage-calculator", "30-year-mortgage-calculator"],
    relatedSlugs: ["fha-vs-conventional-loan", "401k-vs-roth-ira"],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "roth-ira-vs-traditional-ira",
    title: "Roth IRA vs Traditional IRA: Which Retirement Account Wins?",
    h1: "Roth IRA vs Traditional IRA",
    description:
      "Roth IRA vs Traditional IRA: how each is taxed, who each is for, and which gives you more retirement spending power. Free compound interest calculator included.",
    keyword: "roth ira vs traditional ira",
    eyebrow: "Head-to-head · Retirement",
    intro:
      "The Roth IRA and Traditional IRA are twins that diverge on one crucial question: when do you pay income tax on the money — now, or at retirement? Every other difference (contribution limits, withdrawal rules, required minimum distributions) flows from that one choice. And because compound growth multiplies small tax differences into huge lifetime amounts, getting this right in your twenties or thirties can mean tens of thousands of extra dollars in retirement. The hard part is that the 'right' answer depends on where you think your tax rate will be in 30 years — and on the fact that both accounts have corner-case rules most articles skip.",
    sides: [
      {
        label: "Roth IRA",
        summary: "Pay tax now, grow tax-free, withdraw tax-free in retirement.",
        bestFor: "Younger workers in the 12–22% federal bracket who expect to be in a higher bracket at retirement, anyone who wants maximum flexibility on withdrawals, and anyone worried that future tax rates will be higher than today's.",
        pros: [
          "Every dollar you withdraw in retirement is 100% tax-free, including decades of compound growth.",
          "You can withdraw your contributions (not earnings) at any time, tax- and penalty-free — making it a soft emergency fund.",
          "No required minimum distributions at age 73 — you can leave it growing indefinitely.",
          "Heirs inherit it tax-free (subject to the 10-year rule for non-spouses).",
          "If you expect your tax bracket to rise, you're locking in today's lower rate.",
        ],
        cons: [
          "You pay tax now, which reduces current take-home pay.",
          "Income phase-outs mean high earners can't contribute directly (though a 'backdoor Roth' workaround exists).",
          "Contribution limit is the same as Traditional ($7,000 in 2026, $8,000 if 50+) — you can't contribute to both above that combined limit.",
          "If you end up in a lower tax bracket at retirement than expected, you paid more tax than necessary.",
        ],
      },
      {
        label: "Traditional IRA",
        summary: "Deduct contribution now, grow tax-deferred, pay tax on withdrawals in retirement.",
        bestFor: "Peak-earning-years workers in the 24–35% bracket expecting a lower bracket in retirement, anyone who needs the immediate tax deduction, and anyone who's already maxed out a Roth or has income above Roth limits.",
        pros: [
          "Immediate tax deduction lowers this year's taxable income (if you qualify for full deduction).",
          "No income limit for contributions (though deduction phase-outs apply if you have a workplace plan).",
          "Simpler if you're rolling over a 401(k) from a previous job — Traditional IRA is the default destination.",
          "You get to invest the amount you would have paid in tax — more initial capital compounding.",
          "If retirement tax rate is genuinely lower than your current bracket, the math favors Traditional.",
        ],
        cons: [
          "Every dollar withdrawn in retirement is taxed as ordinary income.",
          "Required minimum distributions start at age 73 — the government forces you to take money out.",
          "Heirs pay ordinary income tax on inherited balances.",
          "Less flexible: withdrawing contributions before 59½ triggers both tax and a 10% penalty.",
        ],
      },
    ],
    verdict:
      "For most people under 40 in the 12–22% tax bracket, the Roth wins. The tax-free compounding over 30+ years dominates the 'save on current taxes' argument, and the flexibility on contribution withdrawals is quietly huge. For high earners in their peak years (24%+ bracket, maxing other accounts), the Traditional's immediate deduction plus tax-deferred growth is usually mathematically better. If you genuinely can't predict — which is most people — split the difference: some to Roth, some to Traditional or pre-tax 401(k). Tax diversification at retirement gives you withdrawal flexibility no single account can match.",
    sections: [
      {
        heading: "The backdoor Roth, briefly",
        body: "If your income is above the Roth contribution limits ($165,000 single, $246,000 married in 2026), you can still get money into a Roth via a 'backdoor': contribute to a non-deductible Traditional IRA, then immediately convert it to Roth. This is legal and common, but the 'pro-rata rule' means existing Traditional IRA balances can generate tax on the conversion. Consult a CPA before doing this if you have significant Traditional balances.",
      },
      {
        heading: "What about the Roth 401(k)?",
        body: "A Roth 401(k) combines Roth tax treatment with the much higher 401(k) contribution limit ($23,500 in 2026). If your employer offers one, it's usually a strictly better vehicle than the Roth IRA for dollars above the IRA limit. The only thing the IRA does better is investment choice — a 401(k) is restricted to the plan's menu.",
      },
    ],
    faq: [
      {
        q: "Can I contribute to both a Roth and a Traditional IRA?",
        a: "Yes, but the combined contribution across both can't exceed the annual limit ($7,000 under 50, $8,000 at 50+ for 2026). Many people split contributions to hedge against uncertainty about future tax rates.",
      },
      {
        q: "What's the income limit for a Roth IRA?",
        a: "For 2026, direct Roth contributions phase out between $150,000 and $165,000 for single filers, and $236,000 to $246,000 for married filing jointly. Above these, consider the backdoor Roth.",
      },
      {
        q: "Is a Roth IRA ever worse than a Traditional?",
        a: "Yes — if your tax rate is genuinely higher now than it will be in retirement, and you invest the entire contribution (not the after-tax equivalent), Traditional wins mathematically. This is usually true for peak-earning-years professionals in the 32%+ bracket.",
      },
      {
        q: "Can I roll an old 401(k) into a Roth IRA?",
        a: "Yes, but it's a 'Roth conversion' — you'll owe ordinary income tax on the entire rolled amount in the year of the conversion. Many people do this in low-income years (early retirement, sabbatical, career transition).",
      },
      {
        q: "What's the 5-year rule?",
        a: "For Roth earnings (not contributions) to be withdrawn tax-free, the Roth IRA must have been open for at least 5 years AND you must be 59½. This doesn't apply to contributions, which can always be withdrawn tax-free.",
      },
    ],
    toolSlugs: ["roth-ira-calculator", "compound-interest-calculator"],
    relatedSlugs: ["401k-vs-roth-ira", "15-year-vs-30-year-mortgage"],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "401k-vs-roth-ira",
    title: "401(k) vs Roth IRA: Which to Max Out First?",
    h1: "401(k) vs Roth IRA",
    description:
      "401(k) vs Roth IRA head-to-head: employer match, contribution limits, tax treatment, and the exact order to fund them. Free projection tools included.",
    keyword: "401k vs roth ira",
    eyebrow: "Head-to-head · Retirement",
    intro:
      "'Should I contribute to my 401(k) or my Roth IRA?' is the most common retirement question online, and the honest answer is 'usually both, in a specific order.' These aren't really competitors — they're complementary accounts with different strengths. The 401(k) wins on contribution limits and employer match; the Roth IRA wins on investment choice, flexibility, and tax-free withdrawals. Knowing which one to fund first is the highest-leverage financial decision most workers make in their career.",
    sides: [
      {
        label: "401(k)",
        summary: "Employer-sponsored, high contribution limit, often includes a match. Usually pre-tax.",
        bestFor: "Anyone whose employer offers a match, anyone who wants to shelter large amounts of income from current-year tax, and high earners who are above Roth IRA limits.",
        pros: [
          "High contribution limit: $23,500/year in 2026, plus $7,500 catch-up if 50+.",
          "Employer match is free money — typically 3–6% of salary, sometimes more.",
          "Contributions come out of pre-tax paycheck — you don't miss what you never see.",
          "Loan option: most plans let you borrow up to $50,000 from your own balance in emergencies.",
          "No income limit to contribute (though highly compensated employees can face 'HCE' rules).",
        ],
        cons: [
          "Investment choices are limited to the plan's menu — often with high fees.",
          "Taxed as ordinary income on withdrawal.",
          "Required minimum distributions start at age 73.",
          "Early withdrawals before 59½ trigger a 10% penalty + income tax (loan is the exception).",
          "You're tied to your employer's plan and administrator — some are great, some are awful.",
        ],
      },
      {
        label: "Roth IRA",
        summary: "Individual account, lower limit, any brokerage you like, tax-free withdrawals in retirement.",
        bestFor: "Younger workers in lower tax brackets, anyone who wants control over investment choices, and anyone who wants a backup emergency fund via contribution withdrawals.",
        pros: [
          "Any investment you want — individual stocks, ETFs, index funds, bonds, even crypto via some custodians.",
          "Withdraw contributions anytime, tax- and penalty-free.",
          "No required minimum distributions — grow tax-free forever.",
          "Withdrawals in retirement are 100% tax-free.",
          "You pick the brokerage (Vanguard, Fidelity, Schwab) — typically far lower fees than a 401(k) plan.",
        ],
        cons: [
          "Low contribution limit: $7,000/year in 2026 ($8,000 at 50+).",
          "Income phase-out means high earners can't contribute directly.",
          "No tax deduction today.",
          "No employer match — you're on your own.",
        ],
      },
    ],
    verdict:
      "The canonical funding order for most US workers: (1) 401(k) up to the full employer match — never leave the match on the table, it's usually a 50–100% instant return; (2) Max a Roth IRA to the annual limit for investment flexibility and tax diversification; (3) Back to the 401(k) to hit the annual max; (4) Taxable brokerage beyond that. This order captures free money first, then optimizes for tax treatment, then scales up contribution room.",
    sections: [
      {
        heading: "When to break the canonical order",
        body: "Skip steps 2-3 if your 401(k) plan has a fantastic fund lineup (low-fee index funds) AND you're in a peak-earning tax bracket — the Traditional 401(k)'s immediate deduction can outweigh the Roth IRA's flexibility. Conversely, skip straight from step 1 to step 4 (taxable) if your 401(k) plan has truly awful funds (ER > 0.75%) and your employer won't let you self-direct — a taxable account with low-cost index funds can beat a high-fee 401(k) over 30 years.",
      },
      {
        heading: "The mega backdoor Roth trick",
        body: "If your 401(k) plan allows after-tax contributions (distinct from pre-tax or Roth) AND in-service distributions or Roth conversions, you can contribute up to $70,000 total in 2026 and roll the after-tax portion into a Roth IRA. This is the 'mega backdoor Roth' — check with your plan administrator. Few plans allow it, but if yours does, it's one of the most powerful retirement moves available.",
      },
    ],
    faq: [
      {
        q: "If my employer doesn't match, should I still fund the 401(k) first?",
        a: "Usually no — start with the Roth IRA for flexibility and investment choice. Move to the 401(k) only after maxing the Roth, or earlier if the 401(k) has unusually low-fee funds.",
      },
      {
        q: "Can I contribute to both in the same year?",
        a: "Yes. The contribution limits are separate. You can contribute up to $23,500 to a 401(k) AND up to $7,000 to a Roth IRA in 2026, provided you're under the Roth income phase-out.",
      },
      {
        q: "Traditional 401(k) vs Roth 401(k)?",
        a: "Same rule of thumb as Traditional vs Roth IRA — Roth if you're in a lower tax bracket now than you expect in retirement, Traditional if higher now. Many workers do 50/50 for tax diversification.",
      },
      {
        q: "What happens to my 401(k) when I leave the job?",
        a: "You can (1) leave it with the old employer, (2) roll into the new employer's plan, (3) roll into a Traditional IRA, or (4) convert to a Roth IRA (taxable event). Rolling to an IRA usually gives you better investment choices and lower fees.",
      },
    ],
    toolSlugs: ["401k-calculator", "roth-ira-calculator"],
    relatedSlugs: ["roth-ira-vs-traditional-ira", "avalanche-vs-snowball-debt-payoff"],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "avalanche-vs-snowball-debt-payoff",
    title: "Debt Avalanche vs Snowball: Which Pays Off Faster?",
    h1: "Debt avalanche vs snowball",
    description:
      "Debt avalanche vs snowball method: which pays off credit cards faster, and which one most people actually stick with. Run your real balances in our free calculator.",
    keyword: "debt avalanche vs snowball",
    eyebrow: "Head-to-head · Debt payoff",
    intro:
      "The avalanche and snowball methods are the two dominant strategies for paying off multiple debts. They disagree on one question: which debt do you attack first? Avalanche says highest interest rate. Snowball says smallest balance. The avalanche is mathematically optimal — it always pays off the debt pile in less time and with less total interest. The snowball is psychologically optimal — it gives you early wins that build momentum. Academic studies (notably one from Kellogg School of Management) have found snowball users are more likely to actually finish the plan. The right answer depends on whether you trust yourself to stay motivated by math alone.",
    sides: [
      {
        label: "Avalanche",
        summary: "Pay minimums on everything, put every extra dollar toward the highest-APR debt first.",
        bestFor: "People who are motivated by numbers on a spreadsheet, who have a clear sense of discipline, and whose highest-APR debt is meaningfully larger than their smallest balance (so the first win would be far away in the snowball method).",
        pros: [
          "Always wins on total interest paid — often by $500–$3,000 on a typical debt load.",
          "Always wins on months to debt-free — usually 1–6 months faster than snowball.",
          "Objectively optimal — you can prove it on a spreadsheet.",
          "Trains you to think about interest rate, which is the key mental model in personal finance.",
        ],
        cons: [
          "The first win can be far away, especially if your highest-APR debt is also your largest balance.",
          "Harder to stay motivated — you don't get the dopamine hit of closing an account.",
          "Easier to fall off the wagon when progress feels slow.",
          "A $50 interest savings doesn't feel like much when you're 18 months from zero credit-card balances.",
        ],
      },
      {
        label: "Snowball",
        summary: "Pay minimums on everything, put every extra dollar toward the smallest balance first.",
        bestFor: "People who have been stuck in debt for years, who need the emotional momentum of a completed account to believe the plan will work, and who trust behavioral economics more than spreadsheets.",
        pros: [
          "First debt closes in weeks to a few months — immediate momentum.",
          "Every paid-off account frees up that minimum payment for the next debt ('snowball' rolls forward).",
          "Academically validated: higher completion rate than avalanche in real-world studies.",
          "Simpler to explain — 'pay off the smallest one, repeat' is easier than discussing APRs.",
          "The emotional boost is real — most people quit debt payoff because of despair, not bad math.",
        ],
        cons: [
          "Mathematically suboptimal — you'll pay more in total interest.",
          "Can leave a big, high-APR debt growing while you tackle small 8% APR balances.",
          "Some critics argue it trains bad financial intuition (ignoring interest rates).",
        ],
      },
    ],
    verdict:
      "If your debt pile is mostly credit cards at similar interest rates (say, 22–29% APR), the avalanche's edge is small and the snowball's motivation is worth it. If one debt has a dramatically higher rate than the others (29% APR card alongside 6% APR auto loan), avalanche is clearly better — don't leave a fire burning to chase a smaller balance. For most households, the best choice is the one you'll actually finish. A 'hybrid' approach works well: attack your highest-APR debt first if it's also among your smallest balances, otherwise start with the smallest balance for momentum and switch to avalanche once you're rolling.",
    sections: [
      {
        heading: "Which one saves more? A typical example",
        body: "On a common US debt load of $2,400 credit card @ 28% APR, $7,800 credit card @ 22% APR, $12,000 auto loan @ 7%, and $18,000 student loan @ 5.5%, with $500/mo extra payment capacity: the avalanche pays off all four in about 61 months with roughly $11,400 of interest. The snowball pays off in 62-63 months with roughly $12,100 of interest. The avalanche wins by about $700 and one month. For most households, that's a fair price to pay for the psychological benefits of the snowball — but it's real money, so weigh it.",
      },
      {
        heading: "The real killer: not having a plan at all",
        body: "Both methods crush the 'make random extra payments when you feel like it' approach. The worst debt-payoff strategy is the most common one: paying a little extra on whichever card you were looking at last. Either algorithm — avalanche or snowball — beats that by years. Pick one, commit, and ignore debates about which is 2 percent better.",
      },
    ],
    faq: [
      {
        q: "What about the 'debt consolidation loan' option?",
        a: "If you qualify for a personal loan at a meaningfully lower rate than your cards (say, 9% vs 24%), a consolidation loan plus the avalanche method on the new balance is usually the best total move. Just don't then run up the cards again — this is the failure mode most consolidation advice warns about.",
      },
      {
        q: "Should I pay off debt or invest first?",
        a: "General rule: pay off anything above 8% APR before investing beyond your 401(k) match. Below 8%, the math often favors investing — but the behavioral benefits of debt-free living are hard to price.",
      },
      {
        q: "What counts as a 'minimum payment'?",
        a: "Whatever the lender requires. For credit cards, this is typically 1–3% of the balance or $25, whichever is larger. Missing even $1 of a minimum triggers late fees and rate hikes — always pay at least the minimum on every account.",
      },
      {
        q: "Does balance transfer count as debt payoff?",
        a: "No — you still owe the money. But a 0% APR transfer for 18 months followed by avalanche on that balance is one of the single most powerful debt-reduction moves available, assuming good credit and discipline to pay it off before the promo ends.",
      },
    ],
    toolSlugs: ["debt-payoff-calculator", "budget-calculator"],
    relatedSlugs: ["401k-vs-roth-ira", "15-year-vs-30-year-mortgage"],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "fha-vs-conventional-loan",
    title: "FHA vs Conventional Loan: Which Mortgage Should You Pick?",
    h1: "FHA vs conventional loan",
    description:
      "FHA vs conventional mortgage: down payment, credit score, PMI rules, and total cost. Use our free FHA and mortgage calculators to model your own numbers.",
    keyword: "fha vs conventional loan",
    eyebrow: "Head-to-head · Mortgages",
    intro:
      "FHA and conventional are the two dominant US mortgage categories for first-time buyers, and they attract fundamentally different profiles. FHA loans are government-backed, meant to help lower-credit and lower-down-payment buyers into homeownership. Conventional loans are privately issued, usually require stronger credit and larger down payments, and reward that stronger profile with lower long-term costs. The choice often isn't really a choice — it's determined by your credit score, cash on hand, and debt-to-income ratio — but when you do have both options, the tradeoffs are subtle enough that people genuinely get it wrong.",
    sides: [
      {
        label: "FHA loan",
        summary: "FHA-insured, lower credit/down-payment bar, but you pay mortgage insurance for the life of the loan in most cases.",
        bestFor: "First-time buyers with credit scores between 580–680, limited down payment (3.5–10 percent), and debt-to-income ratios at or slightly above conventional limits.",
        pros: [
          "Minimum credit score of 580 (vs 620–640 for conventional at most lenders).",
          "Down payment as low as 3.5% of purchase price.",
          "More lenient debt-to-income limits (up to 57% with compensating factors).",
          "Assumable — a future buyer can take over your loan at its original rate, which is a big bonus if rates rise.",
          "Great for buyers with recent credit recovery (post-bankruptcy/short-sale).",
        ],
        cons: [
          "Mortgage Insurance Premium (MIP) is usually required for the life of the loan — adds 0.55% annually to your payment, forever.",
          "Plus an upfront MIP of 1.75% financed into the loan.",
          "Loan limits are lower than conventional in many counties.",
          "Sellers sometimes prefer conventional offers (perception of fewer contingencies).",
          "Stricter property condition requirements — the home must pass an FHA appraisal.",
        ],
      },
      {
        label: "Conventional loan",
        summary: "Private loan backed by Fannie Mae or Freddie Mac, better long-term cost for qualified borrowers.",
        bestFor: "Buyers with 680+ credit, 5–20% down payment ready, debt-to-income under 43–45%, and a plan to build equity (so PMI drops off).",
        pros: [
          "Private Mortgage Insurance (PMI) drops off automatically at 78% loan-to-value — unlike FHA's lifetime MIP.",
          "Better interest rates for good-credit borrowers.",
          "No upfront insurance premium.",
          "Higher loan limits — useful in expensive markets.",
          "More flexible on property condition.",
        ],
        cons: [
          "Minimum 620+ credit (most lenders), 680+ for best rates.",
          "Minimum 5% down for primary residence (3% via specific programs).",
          "Stricter debt-to-income requirements.",
          "PMI rates are often higher than FHA's MIP for borrowers with sub-700 credit — partially offsetting the 'drops off' advantage.",
        ],
      },
    ],
    verdict:
      "The simplest rule: if you have a credit score of 700+ and at least 5% down, conventional almost always wins long-term because of the dropping-off PMI. Below 680 credit, FHA is usually cheaper in the short term and more likely to get you approved. Between 680 and 700 with 5-10% down, run both scenarios in a calculator — the break-even depends heavily on how long you plan to keep the loan. If you plan to refinance within 5 years anyway (which is common), the FHA's lifetime-MIP disadvantage matters less.",
    sections: [
      {
        heading: "The refinance escape hatch",
        body: "A common strategy: take out an FHA loan to get into the house, then refinance into a conventional once you have 20% equity — either through appreciation or principal payments. This gets you into homeownership with a low down payment, then removes the lifetime MIP. Downside: two sets of closing costs, and refinances depend on rates being favorable when you want to move.",
      },
      {
        heading: "What about VA and USDA loans?",
        body: "If you're eligible for a VA loan (military service/spouse) or USDA loan (rural property), those typically beat both FHA and conventional — VA has no down payment and no PMI, USDA has no down payment and lower PMI-equivalent costs. Check eligibility before defaulting to FHA or conventional.",
      },
    ],
    faq: [
      {
        q: "Can I remove MIP on an FHA loan later?",
        a: "Only if you took out the loan with 10%+ down (in which case MIP drops off after 11 years) or you refinance into a conventional loan. The default lifetime MIP is why many FHA borrowers eventually refinance.",
      },
      {
        q: "Is PMI or MIP tax deductible?",
        a: "As of 2026, the mortgage insurance deduction has expired at the federal level and is not guaranteed to return. State rules vary.",
      },
      {
        q: "What credit score do I need for each?",
        a: "FHA: 580 minimum for 3.5% down, 500–579 for 10% down. Conventional: 620 minimum, 660–680 for decent rates, 740+ for best rates.",
      },
      {
        q: "Do sellers actually discriminate against FHA offers?",
        a: "In competitive markets, yes — appraisal standards are stricter. In normal markets, the loan type rarely matters if your offer is otherwise strong.",
      },
    ],
    toolSlugs: ["fha-loan-calculator", "mortgage-calculator"],
    relatedSlugs: ["15-year-vs-30-year-mortgage", "401k-vs-roth-ira"],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "svg-vs-png",
    title: "SVG vs PNG: Which Image Format Should You Use?",
    h1: "SVG vs PNG",
    description:
      "SVG vs PNG compared: quality, file size, scaling, browser support, and when to use each. Includes a free SVG-to-PNG converter for when you need both.",
    keyword: "svg vs png",
    eyebrow: "Head-to-head · Image formats",
    intro:
      "SVG and PNG are the two dominant web image formats for anything that isn't a photograph. They're built on completely different principles — SVG is a vector format (math that describes shapes), PNG is a raster format (a grid of pixels). That difference means they excel at totally different jobs. Picking the wrong one gives you either a massive file that should have been 4KB, or a blurry mess when someone zooms in. For most modern web projects, you want both available — SVG for UI and icons, PNG for screenshots and anything with photographic complexity.",
    sides: [
      {
        label: "SVG",
        summary: "Vector format — scales infinitely, stays crisp at any size, often smaller file than PNG.",
        bestFor: "Logos, icons, illustrations, UI elements, charts, and anything that needs to scale from 16px to 500px without losing sharpness.",
        pros: [
          "Infinitely scalable — same file looks perfect on a 5K monitor and a 1x phone.",
          "Typically 2–10× smaller than an equivalent PNG for simple illustrations.",
          "Editable with any text editor — it's just XML.",
          "Styleable with CSS and animatable with CSS/JS — you can change colors without exporting.",
          "Searchable and indexable by Google (unlike raster images).",
          "Future-proof — resolution-independent so a 4K display in 2030 is a non-issue.",
        ],
        cons: [
          "Poor fit for photographs — SVG describes shapes, not pixel data.",
          "Complex illustrations with gradients and filters can balloon to larger-than-PNG file sizes.",
          "Browser rendering inconsistencies for edge-case SVGs (filters, masks, some text features).",
          "Potential XSS vector if serving user-uploaded SVGs — needs sanitization.",
          "Harder to export from traditional design tools without cleanup.",
        ],
      },
      {
        label: "PNG",
        summary: "Lossless raster format — exact pixel data, supports transparency, best for screenshots and detail-heavy images.",
        bestFor: "Screenshots, photos that need transparency, icons with complex detail, pixel art, and anywhere you need exact reproduction of a bitmap.",
        pros: [
          "Lossless compression — no JPEG-style artifacts.",
          "Full alpha transparency support.",
          "Universal browser/app/OS support — no edge cases.",
          "Simple to generate, crop, resize in any tool.",
          "Ideal for screenshots and app UI captures.",
        ],
        cons: [
          "Blurry when scaled above its native size (look at any PNG logo on a high-DPI monitor).",
          "Large file sizes for flat-color graphics — a 500KB PNG logo is common; an equivalent SVG is often 8KB.",
          "Not editable in a text editor — binary format.",
          "Not indexable as graphical content in most cases.",
        ],
      },
    ],
    verdict:
      "For modern web work, the rule is simple: if it started in a vector editor (Figma, Illustrator), export it as SVG. If it's a screenshot, photo, or texture, use PNG (or WebP, which is often better). For logos, always ship SVG as the primary format with a PNG fallback for email and legacy environments. For icons, use SVG — there's no situation where a PNG icon is better in 2026 than a well-made SVG icon.",
    sections: [
      {
        heading: "Modern alternatives: WebP and AVIF",
        body: "For photographic content, PNG is often the wrong modern choice — WebP compresses 25–35% smaller than PNG at equivalent quality, and AVIF is another 30% smaller than WebP. The tradeoff is browser support (now universal for WebP, mostly universal for AVIF). For raster content on the web in 2026, WebP is usually the default, with PNG as a fallback for IE11 and older Android browsers.",
      },
      {
        heading: "SVG file size traps",
        body: "An SVG exported from Figma or Illustrator often contains editor metadata, unused defs, and verbose path commands that bloat the file. Running it through an optimizer (SVGO, or any 'optimize SVG' online tool) can cut 50–80% off the file size without any visible change. For production use, always optimize — an un-optimized SVG can actually be larger than a PNG.",
      },
    ],
    faq: [
      {
        q: "Can I convert a PNG to SVG?",
        a: "Technically yes, but the result is a raster-traced approximation, not a true vector. Tools like Autotrace can do it but the SVG will be huge and imprecise. Better to re-create the graphic from scratch in a vector tool if you need SVG quality.",
      },
      {
        q: "Which is better for SEO — SVG or PNG?",
        a: "Both work with proper alt text. SVG has a slight edge for logos because its text content (when rendered as actual SVG text, not paths) is readable by search engines. For image search, PNG is more common.",
      },
      {
        q: "Can SVG have transparency?",
        a: "Yes — SVG is transparent by default, and you can set any shape's opacity precisely. This is actually cleaner than PNG's alpha channel for simple graphics.",
      },
      {
        q: "What's the max safe SVG file size?",
        a: "Browsers handle SVGs up to several hundred KB without issue. Beyond 500KB, rendering becomes noticeably slower, and you probably want a PNG or WebP instead.",
      },
    ],
    toolSlugs: ["svg-to-png"],
    relatedSlugs: ["jpg-vs-png", "json-vs-yaml"],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "jpg-vs-png",
    title: "JPG vs PNG: Which Format for Photos, Screenshots & Logos?",
    h1: "JPG vs PNG",
    description:
      "JPG vs PNG compared: compression, quality, transparency, and the right format for photos, screenshots, and logos. Free converters included.",
    keyword: "jpg vs png",
    eyebrow: "Head-to-head · Image formats",
    intro:
      "JPG (technically JPEG) and PNG have been the two dominant web raster formats for 25 years, and most people pick the wrong one for at least one use case. JPG is built for photographs — it uses 'lossy' compression that throws away information the eye won't notice, trading tiny visual quality loss for massive file size reduction. PNG is built for anything with sharp edges — it preserves every pixel exactly. Use JPG for what PNG is built for, and you get a blurry, artifact-ridden image. Use PNG for a photo, and you get a 3MB file where 300KB would have looked identical.",
    sides: [
      {
        label: "JPG (JPEG)",
        summary: "Lossy raster format — smaller files by discarding imperceptible detail, ideal for photographs.",
        bestFor: "Photographs, continuous-tone images, anywhere file size matters more than pixel-perfect accuracy.",
        pros: [
          "Dramatically smaller files than PNG for photographs — often 70–90% smaller.",
          "Adjustable quality slider lets you dial the size/quality tradeoff.",
          "Universal support in every browser, app, OS, and camera.",
          "Progressive JPEGs load in passes — low-res first, then refined.",
          "Ideal for hero images and photo galleries.",
        ],
        cons: [
          "Lossy — each save loses more detail; editing a JPG repeatedly is destructive.",
          "No transparency support.",
          "Visible artifacts around sharp edges (text, logos, UI).",
          "Poor for screenshots with text — JPG compression smears text edges.",
          "Can't losslessly crop without re-encoding (except in specialized tools).",
        ],
      },
      {
        label: "PNG",
        summary: "Lossless raster format — preserves exact pixel data, supports transparency.",
        bestFor: "Screenshots, logos, icons, UI assets, and anywhere you need transparency or sharp edges.",
        pros: [
          "Lossless — no quality loss on save, including re-saves.",
          "Full alpha-channel transparency.",
          "Sharp, crisp edges — perfect for text and UI.",
          "Great for screenshots — preserves pixel detail.",
          "Wide color palette support (PNG-24 is 16M+ colors).",
        ],
        cons: [
          "Much larger files than JPG for photos — often 5–10× larger at the same visual quality.",
          "Overkill for most photographic content.",
          "PNG-8 (256-color palette) is smaller but can band gradients.",
          "Not ideal for very large hero images — PNGs can be multi-megabyte.",
        ],
      },
    ],
    verdict:
      "Photographs: JPG, every time. Screenshots, logos, icons, UI screenshots, anything with text: PNG. In 2026 both formats have a better modern replacement — WebP — but universal support and the fact that every CMS and image host understands JPG/PNG means they're still the safest choice for most workflows. Use quality 80–85 for JPG unless you have a specific reason to go higher, and use PNG-24 (not PNG-8) unless file size is critical.",
    sections: [
      {
        heading: "When quality matters, when size matters",
        body: "Save a photograph as PNG and it's typically 5–10× larger than the JPG version with zero visible difference on screen. Save a screenshot as JPG and you'll see fuzzy halos around every text edge, and the file might not even be smaller. The rule: anything that started in a camera → JPG. Anything that started in a computer → PNG. Photos of whiteboards? JPG, but run them through a contrast filter first so the JPG compression doesn't smear the writing.",
      },
      {
        heading: "The 2026 alternative: WebP",
        body: "WebP is 25–35% smaller than JPG at equivalent quality, and also smaller than PNG for transparent images. Browser support is now universal. The only reasons not to use WebP are: email clients (many still don't support it) and legacy CMSes that silently strip unknown formats. For web-native content (blog posts, product photos, UI screenshots), WebP should be the default; JPG/PNG are fallbacks.",
      },
    ],
    faq: [
      {
        q: "Can I convert between JPG and PNG without quality loss?",
        a: "JPG → PNG preserves whatever quality the JPG already has; PNG → JPG loses data (lossy compression). Never convert a JPG to PNG 'for quality' — the original lossy compression can't be undone.",
      },
      {
        q: "What's the best JPG quality setting?",
        a: "80–85 is the 2026 consensus sweet spot — nearly indistinguishable from 100 for most images, with 50–70% smaller files. Below 75 you start to see artifacts in detailed areas.",
      },
      {
        q: "Should I use progressive JPG?",
        a: "For web use, yes — it loads in passes, showing a low-res version almost immediately, which feels faster. The file is roughly the same size as baseline.",
      },
      {
        q: "When is PNG-8 acceptable?",
        a: "For images with 256 or fewer distinct colors (icons, simple UI elements) where file size matters more than color fidelity. Never for photographs or anything with smooth gradients.",
      },
    ],
    toolSlugs: ["webp-to-jpg", "jpg-to-pdf"],
    relatedSlugs: ["svg-vs-png", "base64-vs-hex-encoding"],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "json-vs-yaml",
    title: "JSON vs YAML: Which Config Format Should You Use?",
    h1: "JSON vs YAML",
    description:
      "JSON vs YAML head-to-head: readability, comments, whitespace rules, parser ecosystem, and when to use each. Free JSON formatter and YAML formatter included.",
    keyword: "json vs yaml",
    eyebrow: "Head-to-head · Data formats",
    intro:
      "JSON and YAML are two of the most common configuration and data-interchange formats in modern software. They represent the same basic data types — strings, numbers, arrays, objects — but optimize for different priorities. JSON is a strict, machine-friendly format designed for APIs and data transfer. YAML is a human-friendly format designed for configuration files where humans edit by hand. The choice matters more than it looks: whitespace-sensitive YAML has caused more accidental production outages than almost any other format, while JSON's lack of comments and trailing-comma rules have driven config authors to distraction.",
    sides: [
      {
        label: "JSON",
        summary: "Strict, unambiguous, braces-and-commas syntax — the web's default data format.",
        bestFor: "API responses, data interchange between services, configuration that's generated programmatically, anything where machine parsing speed and correctness matter more than human-editability.",
        pros: [
          "Unambiguous — the grammar is tiny, parsers are fast, no whitespace traps.",
          "Universal library support in every language in existence.",
          "Native to JavaScript — no parsing needed for web payloads.",
          "Strict type rules — 'true' vs 'True' vs 'yes' won't silently parse as different things.",
          "Excellent tooling — schema validation (JSON Schema), formatters, linters, TypeScript generation.",
        ],
        cons: [
          "No comments — your config can't self-document.",
          "Trailing commas are a syntax error — annoying when hand-editing.",
          "Verbose for hand-written config — lots of braces and quotes.",
          "Hard to diff meaningfully when the same data is re-ordered.",
          "No date/time type — dates are just strings by convention.",
        ],
      },
      {
        label: "YAML",
        summary: "Whitespace-sensitive, human-friendly, supports comments — the default config format for infra tools.",
        bestFor: "Configuration files that humans write and review (CI pipelines, Kubernetes manifests, Ansible playbooks, Docker Compose), anywhere comments matter, and anywhere config is frequently diffed in PRs.",
        pros: [
          "Comments! You can explain what a setting does right next to the setting.",
          "Cleaner for nested structures — indentation replaces braces.",
          "Much friendlier for hand-editing.",
          "Supports anchors and references — reuse a block across the document.",
          "Native date type, scientific notation, multi-line strings.",
        ],
        cons: [
          "Whitespace-sensitive — a stray tab can break the whole file.",
          "Infamous 'Norway problem': no becomes false because YAML auto-parses it as a boolean.",
          "Larger spec than JSON — parsers can differ in subtle ways (major headache for portable config).",
          "Slower to parse than JSON.",
          "Harder to generate programmatically — indent logic adds complexity.",
        ],
      },
    ],
    verdict:
      "Use JSON for anything a machine writes or reads primarily — APIs, data exports, generated config, messages between services. Use YAML for config files that humans primarily edit and review, especially when comments matter (CI pipelines, Kubernetes, Docker Compose). Never hand-edit JSON if you can avoid it; never let YAML cross a service boundary if you can avoid it. Most modern stacks now support both and can translate between them — Kubernetes accepts JSON input even though YAML is canonical, and most API frameworks have YAML pretty-printers for humans.",
    sections: [
      {
        heading: "The whitespace trap",
        body: "YAML's indentation rules cause more production incidents than almost any other syntax. A file that looks fine can fail parsing because a line uses tabs instead of spaces, or because two indent levels are 3 and 4 spaces instead of 2 and 4. Use an editor that shows whitespace characters, lint every YAML file in CI, and prefer tools (yq, yamllint) over visual inspection. When in doubt, run the file through a formatter before committing.",
      },
      {
        heading: "A modern hybrid: TOML and JSON5",
        body: "Several formats try to split the difference. TOML (used by Rust's Cargo, Python's pyproject.toml) is human-friendly like YAML but without whitespace sensitivity — nice for flat config. JSON5 extends JSON to allow comments and trailing commas — the format JSON should have been. For internal config, either is often better than YAML or vanilla JSON; for interchange, stick with vanilla JSON for compatibility.",
      },
    ],
    faq: [
      {
        q: "Can I convert between JSON and YAML automatically?",
        a: "Yes — yq, js-yaml, and most language runtimes have built-in converters. Round-tripping mostly works, but YAML's richer types (dates, anchors) degrade to strings in JSON.",
      },
      {
        q: "Which is faster to parse?",
        a: "JSON — by a lot, often 5–10× faster in benchmarks because the grammar is much smaller. For performance-critical paths (serializing thousands of records per second), JSON wins.",
      },
      {
        q: "Does YAML have a formal schema system like JSON Schema?",
        a: "Yes — YAML can be validated with JSON Schema (since YAML is a superset of JSON) or with its own schema library. Schema validation is widely supported.",
      },
      {
        q: "Why does Kubernetes use YAML?",
        a: "Because humans hand-write a lot of Kubernetes config, and comments + cleaner indentation make it manageable. Kubernetes accepts JSON input too, so you can always convert for machine use.",
      },
    ],
    toolSlugs: ["json-formatter", "yaml-formatter"],
    relatedSlugs: ["svg-vs-png", "base64-vs-hex-encoding"],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "pomodoro-vs-flowtime",
    title: "Pomodoro vs Flowtime: Which Focus Method Fits You?",
    h1: "Pomodoro vs Flowtime",
    description:
      "Pomodoro vs Flowtime method: fixed timer boxes vs flexible flow tracking, and which one actually gets more deep work done. Free browser-based Pomodoro timer included.",
    keyword: "pomodoro vs flowtime",
    eyebrow: "Head-to-head · Focus methods",
    intro:
      "Pomodoro and Flowtime are the two most-discussed focus techniques online, and they represent a philosophical split in productivity circles. Pomodoro is structured: 25 minutes of work, 5 minutes of break, repeat. Flowtime is emergent: you start working on one task, keep going as long as flow holds, and take a break scaled to how long you worked. Neither is objectively better — Pomodoro excels at starting difficult work and escaping attention-fragmentation; Flowtime excels at deep technical or creative work that genuinely takes 60–90 minutes to get into. Most people don't need to pick one forever; they need to know which to use for which kind of task.",
    sides: [
      {
        label: "Pomodoro",
        summary: "25-minute fixed focus blocks separated by 5-minute breaks. After 4 blocks, take a 15-30 minute break.",
        bestFor: "Getting started on work you're dreading, tasks you can't estimate, shallow work (admin, email, small edits), and anyone who struggles with unstructured time.",
        pros: [
          "Lowers activation energy — 'just do 25 minutes' is far easier than 'start working'.",
          "Forces breaks that most people skip, reducing afternoon burnout.",
          "Natural fit for tasks with clear start/end.",
          "Built-in time accounting — you can estimate tasks in 'pomodoros' over time.",
          "Helps detect true focus destroyers — if you can't complete one pomodoro without interruption, that's a signal to change environment.",
        ],
        cons: [
          "25 minutes is often too short for deep coding or writing — right as you hit flow, the timer ends.",
          "Breaking every 25 minutes can fragment complex thinking.",
          "Hard to use in meetings-heavy or collaborative work.",
          "The rigid structure can feel prescriptive — some people rebel and abandon it.",
          "Counting pomodoros can become its own anxiety source.",
        ],
      },
      {
        label: "Flowtime",
        summary: "Start a task, work until flow breaks naturally, take a break scaled to work duration (typically 10–20% of work time).",
        bestFor: "Deep work sessions — programming, writing, analysis, design — where context-switching cost is high and 25 minutes isn't enough runway.",
        pros: [
          "Honors actual flow state — no timer pulling you out at the worst moment.",
          "Better fit for senior-level deep work.",
          "Scaled breaks give real recovery after long sessions.",
          "More psychologically sustainable for people who find Pomodoro restrictive.",
          "Produces more 'in the zone' outcomes for complex work.",
        ],
        cons: [
          "Requires you to actually notice when flow breaks — harder than it sounds.",
          "Easier to skip breaks entirely and burn out by 3pm.",
          "Harder to start — no 'just do 25 minutes' guardrail for resistance.",
          "Less structured — doesn't help people who struggle with time blindness.",
          "Hard to use for task estimation.",
        ],
      },
    ],
    verdict:
      "Use Pomodoro when starting is the problem and the work doesn't need deep focus (email, admin, code review, grading). Use Flowtime when you're already in deep work and 25 minutes feels artificially short (writing, coding a new feature, analysis). Most expert knowledge workers end up using a hybrid: Pomodoro in the morning to overcome activation energy, switching to Flowtime once they're warmed up into their most difficult task. The worst case is evangelizing one approach universally — both tools solve real problems, and fighting over 'which is better' misses the point.",
    sections: [
      {
        heading: "Hybrid patterns that actually work",
        body: "One common pattern: Pomodoro to start the day (to overcome inertia), Flowtime blocks for your two hardest tasks (late morning and late afternoon), and back to Pomodoro for admin and email. Another: Pomodoro for weeks when you're struggling with focus, Flowtime for weeks when you're clearly in the zone. The point of any focus method is to produce work, not to adhere to a protocol — switch whenever switching helps.",
      },
      {
        heading: "What about '90-minute blocks'?",
        body: "Some productivity literature favors 90-minute blocks based on ultradian rhythm research — humans naturally cycle through alertness at roughly 90-minute intervals. This is effectively a fixed-block Flowtime: you commit to 90 minutes of focus, then a full 20-minute break. For many knowledge workers this is the best compromise — long enough for deep work, short enough to be sustainable.",
      },
    ],
    faq: [
      {
        q: "Does Pomodoro work if I can't avoid interruptions?",
        a: "Not well — the core premise is an uninterrupted 25 minutes. If your job makes that impossible, try Flowtime with a shorter minimum (10–15 minutes), or time-block your calendar to reserve uninterrupted slots.",
      },
      {
        q: "How do I track Flowtime sessions?",
        a: "Just a stopwatch and a notebook works. Record start time, task, end time, break length. Over a month, you'll see your natural deep-work durations and get much better at estimating.",
      },
      {
        q: "Can I use Pomodoro for creative writing?",
        a: "It can work for drafting but often breaks editing flow. Many writers Pomodoro their way into the draft, then switch to Flowtime once momentum is real.",
      },
      {
        q: "What's the ideal break activity?",
        a: "Anything that isn't a screen: walk, stretch, stare out a window, drink water, talk to someone. Scrolling your phone during breaks defeats the purpose — it reloads the exact attention fatigue the break was meant to clear.",
      },
    ],
    toolSlugs: ["pomodoro-timer", "countdown-timer"],
    relatedSlugs: ["avalanche-vs-snowball-debt-payoff", "json-vs-yaml"],
  },
  // ---------------------------------------------------------------------------
  {
    slug: "base64-vs-hex-encoding",
    title: "Base64 vs Hex Encoding: Which Should You Use When?",
    h1: "Base64 vs Hex encoding",
    description:
      "Base64 vs Hex encoding compared: size overhead, readability, URL safety, and typical use cases. Free Base64 encoder/decoder included.",
    keyword: "base64 vs hex encoding",
    eyebrow: "Head-to-head · Encoding",
    intro:
      "Base64 and hexadecimal (hex) are the two most common ways to represent binary data as plain text. They exist because a lot of systems — email headers, URLs, JSON strings, HTML attributes — can only carry ASCII characters safely, so binary data needs to be encoded before it rides along. The difference is what they trade off: Base64 packs more bits per character (smaller output) at the cost of a more complex alphabet; hex uses only 16 simple characters (easier to read and debug) but output is twice as long. Picking the wrong one wastes bandwidth or makes data harder to diagnose.",
    sides: [
      {
        label: "Base64",
        summary: "Encodes 3 bytes of binary into 4 ASCII characters — roughly 33% size overhead.",
        bestFor: "Embedding binary in text contexts — email attachments, data URLs, JSON payloads, HTTP headers, anywhere you want to minimize size overhead.",
        pros: [
          "Compact: only ~33% size overhead vs ~100% for hex.",
          "Standard alphabet (A–Z, a–z, 0–9, +, /) is universally supported.",
          "URL-safe variant swaps '+' and '/' for '-' and '_' — ideal for URLs and filenames.",
          "Built into every language and most protocols.",
          "Ideal for data URLs, OAuth tokens, JWTs, image embedding.",
        ],
        cons: [
          "Hard to read — a Base64 string looks like gibberish to humans.",
          "Easy to introduce parsing errors (trailing '=' padding, URL-safe vs standard alphabet confusion).",
          "Poor for debugging — you can't eyeball what the bytes are.",
          "Case-sensitive — a copy-paste that loses case breaks the decoding.",
          "Output length isn't always easy to predict from input size.",
        ],
      },
      {
        label: "Hex",
        summary: "Encodes 1 byte as 2 hex characters (0–9, A–F) — exactly 100% size overhead.",
        bestFor: "Debug output, hashes (MD5/SHA), color codes (#RRGGBB), MAC addresses, memory dumps, any context where humans will read the values.",
        pros: [
          "Trivially human-readable once you learn the alphabet.",
          "Case-insensitive (most parsers accept uppercase and lowercase).",
          "Predictable output length: exactly 2× input bytes.",
          "Easy to diff visually — you can see which bytes changed.",
          "Standard for hashes, checksums, color codes, UUID printing.",
        ],
        cons: [
          "Double the size vs raw binary — much larger than Base64.",
          "Not URL-friendly for short tokens (though it works, it's wasteful).",
          "Large hex blobs are unwieldy — a 10KB binary becomes a 20KB hex string.",
          "No size advantage over Base64 in any use case.",
        ],
      },
    ],
    verdict:
      "If the bytes will be read by humans or compared visually — hashes, color codes, debug dumps, memory addresses — use hex. If the bytes are machine payload that needs to ride through a text channel — email attachment, JWT, data URL, JSON-embedded image — use Base64. Don't use Base64 for hashes (MD5, SHA) even though it would save space; convention is hex, and breaking convention will confuse every tool in the pipeline.",
    sections: [
      {
        heading: "When neither is ideal: Base32 and Base58",
        body: "Two niche alternatives exist. Base32 uses only case-insensitive alphanumerics (A-Z plus 2-7), making it great for voice-dictated codes and case-insensitive filesystems — but has 60% size overhead. Base58 (used by Bitcoin addresses) strips confusing characters like 0/O and I/l for human readability, with overhead similar to Base64. For 99% of developers, hex or Base64 is the right choice; the others are specialized tools.",
      },
      {
        heading: "Common gotchas",
        body: "Base64 padding ('=' characters at the end) is required by some parsers and rejected by others — if you're seeing intermittent decode failures, check padding rules. URL-safe Base64 uses '-' and '_' instead of '+' and '/'; mix those up and decoding fails. Hex has fewer gotchas but beware of the '0x' prefix — it's only valid in some parsing contexts, stripped in others.",
      },
    ],
    faq: [
      {
        q: "Why is Base64 smaller than hex if both encode the same data?",
        a: "Each Base64 character represents 6 bits of binary; each hex character represents 4 bits. So Base64 packs 50% more information per character, resulting in ~33% overhead vs hex's ~100% overhead.",
      },
      {
        q: "Is Base64 encryption?",
        a: "No — Base64 is encoding, not encryption. It's trivially reversible with no key. Anyone can decode a Base64 string with any browser's dev tools. Never assume Base64 keeps data 'safe' from reading.",
      },
      {
        q: "What about Base64url?",
        a: "Same as standard Base64 but with '+' → '-', '/' → '_', and padding usually omitted. This is the variant used in JWTs and URL-safe tokens. The underlying data is identical — only the character mapping differs.",
      },
      {
        q: "Can I Base64-encode inside a URL without URL-encoding it?",
        a: "Only with Base64url (the URL-safe variant). Standard Base64 contains '+' and '/' which must be URL-encoded or they'll break URL parsing.",
      },
    ],
    toolSlugs: ["base64-encoder-decoder", "hash-generator"],
    relatedSlugs: ["json-vs-yaml", "svg-vs-png"],
  },
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function comparisonHref(comparison: Comparison): string {
  return `/compare/${comparison.slug}`;
}
