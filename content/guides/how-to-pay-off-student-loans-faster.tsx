import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Student loans aren&rsquo;t a single problem with a single solution — they&rsquo;re
      a mix of loan types, interest rates, forgiveness programs, and your
      own cash flow. The optimal payoff plan for a borrower with $30k of
      federal subsidized loans and public-service employment is very
      different from one with $80k of private loans at 8%. This guide
      walks through how to triage your balance, which strategies actually
      move the needle (refinancing, avalanche, income-driven plans,
      forgiveness), and the traps that lose people years of payments.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Step 1: know what you owe — exactly</h2>
    <p>
      Most borrowers underestimate total balance because loans sit across
      multiple servicers. Pull the full picture before deciding anything.
    </p>
    <p>
      <strong>Federal loans:</strong> log in to studentaid.gov (US). You
      see every federal loan, servicer, rate, balance, status.
    </p>
    <p>
      <strong>Private loans:</strong> pull a free credit report
      (annualcreditreport.com). Private loans appear there even when
      you&rsquo;ve lost the original paperwork.
    </p>
    <p>
      For each loan, record: balance, rate, type (subsidized /
      unsubsidized / grad PLUS / parent PLUS / private), servicer, and
      monthly minimum. This list is the foundation for every decision
      below.
    </p>

    <h2>Step 2: know what federal vs private really means</h2>
    <p>
      <strong>Federal loans</strong> have access to income-driven
      repayment (SAVE, IBR, PAYE), Public Service Loan Forgiveness
      (PSLF), deferment, forbearance, and a discharge on death or total
      disability. Rates are fixed.
    </p>
    <p>
      <strong>Private loans</strong> generally have none of those
      protections. Rates can be variable. Cosigners are often liable.
      Discharge on death varies by lender.
    </p>
    <p>
      Critical rule: <strong>never refinance federal loans into private
      ones without understanding what you&rsquo;re losing.</strong> You
      give up IDR plans, forgiveness eligibility, and hardship
      protections — permanently.
    </p>

    <h2>Step 3: pick the payoff strategy for your situation</h2>
    <p>
      <strong>Option A — Avalanche (mathematically optimal).</strong> Pay
      minimums on everything; throw every extra dollar at the highest-
      rate loan first. Roll that payment into the next one when the
      first is gone. Saves the most interest. Works when you have the
      discipline to stay with it.
    </p>
    <p>
      <strong>Option B — Snowball (psychologically optimal).</strong>
      Pay minimums on everything; attack the smallest balance first,
      regardless of rate. Early wins build momentum. Costs a bit more
      interest but has higher completion rates in studies.
    </p>
    <p>
      <strong>Option C — Refinance private loans (cash-flow or
      rate-reduction play).</strong> If you have good credit (700+) and
      stable income, refinancing private loans at a lower rate can save
      thousands. Competitive lenders: SoFi, Earnest, Laurel Road,
      Splash. Compare after-tax effective rate.
    </p>
    <p>
      <strong>Option D — PSLF (public-sector employment path).</strong>
      If you work full-time for a government or 501(c)(3) nonprofit,
      120 qualifying monthly payments (10 years) on an income-driven
      plan → tax-free forgiveness. Strategy shifts: minimize payments
      on IDR, don&rsquo;t pay extra, cross the 120-payment finish line.
    </p>
    <p>
      <strong>Option E — IDR + forgiveness (non-PSLF).</strong> Income-
      driven repayment plans forgive remaining balance after 20-25
      years. The forgiven amount is generally taxable as income in the
      year forgiven (federal — varies by plan). Rarely the best choice
      for high earners.
    </p>

    <h2>Strategy by situation — quick matcher</h2>
    <p>
      <strong>High-earner, no public service, stable job:</strong>
      avalanche on federal (no refinance — keep safety net) + refinance
      private if rates are high. Pay aggressively. Done in 3-7 years.
    </p>
    <p>
      <strong>Public-sector employee (teacher, government, nonprofit):</strong>
      enroll in SAVE or equivalent IDR, pursue PSLF. Never pay extra
      above the IDR minimum — you&rsquo;re throwing money away if
      forgiveness is the destination.
    </p>
    <p>
      <strong>Variable income or freelance:</strong> stay on a
      federal IDR plan for flexibility. Pay down principal during
      high-income months; keep minimums during lean ones.
    </p>
    <p>
      <strong>Very high balance relative to income (e.g., $180k debt
      on $55k income):</strong> IDR + eventual forgiveness path. Plan
      for the tax bomb (savings account for forgiven-amount tax).
    </p>
    <p>
      <strong>Small balance, above-market rate:</strong> aggressive
      avalanche. Small wins compound.
    </p>

    <h2>Extra payments — the mechanics that matter</h2>
    <p>
      When you make an extra payment, <strong>specify in writing that
      it applies to principal on the highest-rate loan</strong>.
      Otherwise, servicers routinely apply extras to future payments
      (which does nothing), or spread across all loans proportionally
      (which doesn&rsquo;t target the expensive one).
    </p>
    <p>
      Weekly or bi-weekly payments instead of monthly reduce interest
      accrual modestly (you pay down principal faster within the
      month). Some servicers support this; others require monthly
      minimums + extras.
    </p>
    <p>
      <strong>Round up.</strong> Payment of $247 → pay $300. Small
      round-up, meaningful impact over years.
    </p>

    <h2>Refinancing — the calculations</h2>
    <p>
      Refinancing replaces existing loans with a new (usually private)
      loan at a different rate. Private-to-private refinancing is
      almost always safe to consider. Federal-to-private is a one-way
      door.
    </p>
    <p>
      Break-even math: new rate × new balance vs. old rate × old
      balance, over the term you&rsquo;ll actually keep the loans.
      A 2-point rate drop on $60k over 8 years = ~$7-9k saved.
    </p>
    <p>
      <strong>Fixed vs variable:</strong> variable rates are lower at
      origination but can climb. Take variable only if you&rsquo;re
      going to pay off aggressively within 2-3 years.
    </p>
    <p>
      <strong>Shorter term = higher payment, much less interest.</strong>
      5-year term vs 10-year term typically cuts total interest by
      40-50%.
    </p>

    <h2>The forbearance and deferment trap</h2>
    <p>
      Pausing payments sounds like relief but interest usually keeps
      accruing (especially on unsubsidized and private loans). At the
      end of a 12-month forbearance, your balance has grown — and the
      capitalized interest becomes principal you now owe interest on.
    </p>
    <p>
      Use forbearance/deferment only for genuine hardship (job loss,
      medical). For affordability issues, switch to an IDR plan instead
      — payments can be as low as $0/month while keeping you in good
      standing.
    </p>

    <h2>Employer and state benefits</h2>
    <p>
      <strong>Employer student loan assistance</strong> is increasingly
      common. Ask HR — some employers pay $100-500/month toward
      employees&rsquo; loans, often as a tax-free benefit (up to $5,250
      per year in the US under Section 127 rules, subject to
      legislative updates).
    </p>
    <p>
      <strong>State loan forgiveness programs</strong> exist for
      specific professions (teachers in low-income districts, rural
      physicians, nurses, public defenders). Worth researching for your
      state and field.
    </p>
    <p>
      <strong>Teacher Loan Forgiveness:</strong> up to $17,500 for
      teachers in low-income schools after 5 years.
    </p>
    <p>
      <strong>Military:</strong> various branches offer loan repayment
      as enlistment or retention bonuses.
    </p>

    <h2>Common mistakes that add years</h2>
    <p>
      <strong>1. Paying minimums forever without a plan.</strong> The
      default 10-year repayment schedule assumes you do nothing extra.
      Passive borrowers pay for the full term plus interest.
    </p>
    <p>
      <strong>2. Refinancing federal loans impulsively.</strong>
      Private refinance looks great on paper, but losing IDR and PSLF
      options is often worth more than the rate savings.
    </p>
    <p>
      <strong>3. Paying down loans instead of employer 401(k) match.</strong>
      If your employer matches 401(k) contributions, that&rsquo;s a
      100% return. Get the match first, then throw extras at loans.
    </p>
    <p>
      <strong>4. Not recertifying IDR on time.</strong> Income-driven
      plans require annual income recertification. Miss the deadline
      and your payment may snap to the 10-year standard plan,
      sometimes unaffordable.
    </p>
    <p>
      <strong>5. Ignoring interest capitalization events.</strong> When
      you graduate, leave school, exit deferment, or switch IDR plans,
      accrued interest may capitalize (get added to principal).
      Paying off accrued interest before these events saves money.
    </p>

    <h2>Order of operations — the financial priority stack</h2>
    <p>
      1. Minimum student loan payments (never miss — credit damage is
      costly).
    </p>
    <p>
      2. Employer 401(k) match (free money).
    </p>
    <p>
      3. 1-month emergency fund.
    </p>
    <p>
      4. High-interest debt (credit cards, private loans above 8%).
    </p>
    <p>
      5. 3-6 month emergency fund.
    </p>
    <p>
      6. Tax-advantaged retirement beyond the match (Roth IRA, HSA).
    </p>
    <p>
      7. Aggressive student loan payoff or investing, based on rate
      comparison.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Model payoff scenarios with the{" "}
      <a href="/tools/student-loan-calculator">student loan calculator</a>.
      Pair with the{" "}
      <a href="/tools/debt-payoff-calculator">debt payoff calculator</a>
      {" "}for the avalanche-vs-snowball comparison, and the{" "}
      <a href="/tools/budget-calculator">budget calculator</a> to find
      the extra monthly payment that fits your actual cash flow.
    </p>
  </>
);
