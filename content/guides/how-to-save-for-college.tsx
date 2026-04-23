import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      College costs have risen about 5% per year for two decades &mdash; roughly double the
      inflation rate. A four-year public in-state degree now costs $115,000+ on paper for
      tuition, room and board. Private universities top $350,000. If your child is a
      newborn today and you wait until high school to start, you&rsquo;ll miss most of the
      compounding window and end up funding college from cash flow or loans. This guide
      covers the 529 plan, Coverdell ESA, UTMA/UGMA accounts, age-based allocation strategies,
      projected future costs, and the often-overlooked impact of these accounts on
      financial aid. You&rsquo;ll come out with a number to save per month and a structure
      to save it in.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. Project the future cost</h2>
    <p>
      Start with today&rsquo;s cost (College Board published average), then inflate at
      historical college inflation of ~5% per year:
    </p>
    <pre>{`future cost = today's cost × (1.05)^years to enrollment`}</pre>
    <p>
      Today&rsquo;s public in-state 4-year total: ~$115,000. In 18 years at 5%:
      <code> 115000 × 1.05^18 ≈ $276,000</code>. Private: $700,000+. These are scary numbers,
      but aid, scholarships, and in-state discounts often cut the effective cost in half.
    </p>

    <h2>2. 529 plans are the default account</h2>
    <p>
      A 529 is a state-sponsored education savings plan with:
    </p>
    <ul>
      <li>Tax-free growth</li>
      <li>Tax-free withdrawals for qualified education expenses</li>
      <li>State income tax deduction or credit in 30+ states</li>
      <li>No income limits on contributors</li>
      <li>High contribution ceilings ($235k-$580k depending on state)</li>
    </ul>
    <p>
      You don&rsquo;t have to use your own state&rsquo;s plan, but you may lose the state
      tax deduction if you don&rsquo;t. Shop on fees (Utah and Nevada are consistently low)
      if your home state has no deduction.
    </p>

    <h2>3. What counts as a qualified 529 expense</h2>
    <ul>
      <li>Tuition and required fees</li>
      <li>Room and board (on- or off-campus, up to school allowance)</li>
      <li>Required textbooks, supplies, equipment</li>
      <li>Required computers and software</li>
      <li>K-12 tuition (up to $10k/year per beneficiary)</li>
      <li>Apprenticeships and certain student loan repayment ($10k lifetime per beneficiary)</li>
    </ul>
    <p>
      Not qualified: transportation, health insurance, extracurricular fees. Non-qualified
      withdrawals trigger income tax plus a 10% penalty on the earnings portion.
    </p>

    <h2>4. Coverdell ESAs</h2>
    <p>
      A less-common alternative:
    </p>
    <ul>
      <li>Annual contribution cap: $2,000 per beneficiary (all contributors combined)</li>
      <li>Income phase-out: $95k-$110k single, $190k-$220k married</li>
      <li>Must be used by age 30</li>
      <li>Broader K-12 flexibility than 529s historically, though 529s have caught up</li>
      <li>Broader investment options than most 529s (any brokerage-held asset)</li>
    </ul>
    <p>
      The $2k cap makes ESAs supplemental. Most families use a 529 as the primary vehicle.
    </p>

    <h2>5. UTMA/UGMA accounts</h2>
    <p>
      Custodial accounts in the child&rsquo;s name:
    </p>
    <ul>
      <li>No contribution limit</li>
      <li>No restriction on use (not tied to education)</li>
      <li>Kiddie tax: first ~$1,300 of unearned income tax-free, next ~$1,300 at child rate, above taxed at parents&rsquo; rate</li>
      <li>Becomes child&rsquo;s money at age of majority (18-21 depending on state)</li>
      <li>Much worse for financial aid than a 529 (counted as student asset)</li>
    </ul>
    <p>
      UTMA/UGMA made sense before 529s existed. Today they&rsquo;re usually only preferred
      when you want flexibility on non-education uses.

    </p>

    <h2>6. Age-based 529 portfolios</h2>
    <p>
      Most 529 plans offer an age-based option that auto-rebalances from stock-heavy to
      bond-heavy as the child approaches college:
    </p>
    <ul>
      <li>Ages 0-5: 80-90% stocks</li>
      <li>Ages 6-10: 60-75% stocks</li>
      <li>Ages 11-14: 40-55% stocks</li>
      <li>Ages 15-17: 20-30% stocks</li>
      <li>Age 18+: 0-15% stocks</li>
    </ul>
    <p>
      The goal is to have the money out of the market by the time tuition bills arrive. A
      stock crash in year 17 can shred a portfolio that never had time to recover.
    </p>

    <h2>7. How much to save per month</h2>
    <p>
      Rough calculation to cover a public in-state college for a newborn (18-year horizon,
      7% net return, 5% inflation):
    </p>
    <pre>{`future cost ≈ $276,000
monthly savings needed ≈ $475/month`}</pre>
    <p>
      If you start at age 5, that jumps to ~$750/month. Age 10: ~$1,400/month. Age 15:
      $3,500+/month. <strong>Starting early is the whole ballgame.</strong>
    </p>

    <h2>8. Financial aid impact (FAFSA)</h2>
    <p>
      Under FAFSA rules:
    </p>
    <ul>
      <li>Parent-owned 529 counted at max 5.64% of value against aid</li>
      <li>Student-owned assets (UTMA/UGMA) counted at 20%</li>
      <li>Grandparent-owned 529: no longer counted after the FAFSA Simplification Act (2023+)</li>
    </ul>
    <p>
      Having a 529 doesn&rsquo;t meaningfully hurt aid. In fact, it&rsquo;s one of the most
      aid-friendly ways to save.
    </p>

    <h2>9. Grandparent 529s: now a stealth win</h2>
    <p>
      Post-FAFSA-reform, grandparent-owned 529s:
    </p>
    <ul>
      <li>Don&rsquo;t count as parent or student asset</li>
      <li>Don&rsquo;t count as student income when distributed (previously a problem)</li>
      <li>Grow tax-free just like parent-owned 529s</li>
    </ul>
    <p>
      If grandparents want to help, this is now strictly better than gifting to parents.
    </p>

    <h2>10. The &ldquo;underfund on purpose&rdquo; strategy</h2>
    <p>
      Fully funding a 529 runs two risks: your child doesn&rsquo;t attend college, or they
      attend a cheaper school than expected. Either way, non-qualified withdrawals cost
      you income tax + 10% penalty. A reasonable strategy is to save ~60-70% of projected
      cost in the 529 and the rest in a taxable brokerage. If extra is needed you can tap
      the brokerage; if surplus remains, no penalty applies.
    </p>

    <h2>11. SECURE 2.0: the 529-to-Roth IRA rollover</h2>
    <p>
      Starting in 2024, unused 529 funds can be rolled to the beneficiary&rsquo;s Roth IRA:
    </p>
    <ul>
      <li>529 must have been open 15+ years</li>
      <li>Lifetime cap: $35,000 per beneficiary</li>
      <li>Subject to annual Roth IRA contribution limits</li>
      <li>Contributions made within the last 5 years aren&rsquo;t eligible</li>
    </ul>
    <p>
      This removes much of the &ldquo;what if I overfund&rdquo; risk &mdash; surplus can
      become the child&rsquo;s head start on retirement savings.
    </p>

    <h2>12. Scholarships, grants, and work-study reduce the target</h2>
    <p>
      The average in-state student pays ~65% of published cost after aid. Private colleges
      discount tuition heavily via merit and need-based aid. Don&rsquo;t plan for the
      sticker price — plan for the net price. Use each school&rsquo;s net price calculator
      (required by law on their website) once your child is in high school.
    </p>

    <h2>13. Common mistakes</h2>
    <ul>
      <li>
        <strong>Starting late.</strong> Compounding does most of the work; missing the first
        5-10 years means 3-5x higher monthly contributions.
      </li>
      <li>
        <strong>Picking the wrong state plan.</strong> High-fee plans cost 0.5-1%+/year; over
        18 years that&rsquo;s 10-20% of final balance.
      </li>
      <li>
        <strong>Over-saving in a 529.</strong> Tax penalty on non-qualified withdrawals; mix
        in a taxable brokerage.
      </li>
      <li>
        <strong>Prioritizing college over retirement.</strong> Kids can borrow for college;
        you can&rsquo;t borrow for retirement.
      </li>
      <li>
        <strong>Ignoring fund options.</strong> Age-based portfolios are fine defaults; check
        the underlying fund expense ratios.
      </li>
    </ul>

    <h2>14. Run the numbers</h2>
    <p>
      Use the calculator below to set a monthly savings target based on your child&rsquo;s
      age, expected college type, and assumed return.
    </p>
    <p>
      <a href="/tools/college-savings-calculator">College savings calculator</a>
      <a href="/tools/compound-interest-calculator">Compound interest calculator</a>
      <a href="/tools/savings-goal-calculator">Savings goal calculator</a>
    </p>
  </>
);
