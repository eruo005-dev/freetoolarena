import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Retirement planning is a series of numbers working against
      compound interest and against your own inertia. Start at 25 and
      a 10% savings rate gets you there; start at 45 and you need 25%
      plus optimism. This guide walks through the target numbers (the
      25x rule, the 4% rule), account priority order (401k match →
      Roth IRA → 401k → taxable), the contribution limits, and the
      common mistakes that cost real money over decades.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The target number — 25x annual spending</h2>
    <p>
      Rule of thumb: you need 25 times your expected annual retirement
      spending to retire. Spend $60k/year in retirement → need
      $1.5M. Spend $100k → $2.5M.
    </p>
    <p>
      The 25x factor comes from the 4% rule: a diversified portfolio
      (60/40 stocks/bonds) can safely sustain ~4% annual withdrawals
      across a 30-year retirement without running out, assuming
      historical returns. 25 × 4% = 100% of annual spend.
    </p>
    <p>
      Caveats: 4% is derived from US market history; low-yield
      environments and 40+ year retirements argue for 3.3-3.5% as
      safer. Early retirees often plan around 3.5% to buy insurance
      against sequence-of-returns risk.
    </p>

    <h2>The starting-age math</h2>
    <p>
      What percentage of income do you need to save? Varies by start
      age (assumes 7% real return, aims for 25x annual spend at 65):
    </p>
    <p>
      <strong>Start at 25:</strong> ~10-12% of gross income.
    </p>
    <p>
      <strong>Start at 30:</strong> ~15%.
    </p>
    <p>
      <strong>Start at 35:</strong> ~20%.
    </p>
    <p>
      <strong>Start at 40:</strong> ~25%.
    </p>
    <p>
      <strong>Start at 45:</strong> ~35%.
    </p>
    <p>
      <strong>Start at 50:</strong> ~45% — and you&rsquo;ll likely
      retire later than 65, or accept a lower target.
    </p>
    <p>
      The cost of starting 10 years later is roughly doubling the
      required savings rate. Compound growth is unforgiving.
    </p>

    <h2>Account priority order (US)</h2>
    <p>
      Most efficient order to allocate savings, for most people:
    </p>
    <p>
      <strong>1. 401(k) up to employer match.</strong> Instant 50-100%
      return on the match portion. Never skip this unless your
      employer doesn&rsquo;t match.
    </p>
    <p>
      <strong>2. HSA (if on a high-deductible plan).</strong> Triple
      tax advantage: deductible contribution, tax-free growth, tax-free
      withdrawal for medical. If you can pay medical out of pocket
      and leave HSA to grow, it becomes the best retirement account
      you have access to.
    </p>
    <p>
      <strong>3. Roth IRA (if eligible).</strong> $7,000 limit in
      2026 ($8,000 if 50+). Tax-free growth and withdrawal. Income
      limits apply; backdoor Roth works if you exceed them.
    </p>
    <p>
      <strong>4. 401(k) beyond the match.</strong> $23,500 limit in
      2026 ($31,000 if 50+). Pre-tax reduces current tax bill.
    </p>
    <p>
      <strong>5. Taxable brokerage.</strong> After maxing
      tax-advantaged space. Tax-efficient index funds, long-term
      capital gains rates.
    </p>

    <h2>Traditional vs Roth — which to use when</h2>
    <p>
      <strong>Traditional (pre-tax):</strong> you deduct now, pay
      income tax on withdrawals later. Better if your current tax
      bracket is higher than your expected retirement bracket.
    </p>
    <p>
      <strong>Roth (after-tax):</strong> no deduction now, but
      withdrawals are tax-free. Better if your current bracket is
      lower than your expected retirement bracket, and for younger
      workers with decades of growth ahead.
    </p>
    <p>
      General guidance: Roth in your 20s-30s and in early-career
      lower-income years; traditional in peak-earning years when
      deductions matter most; mix of both for tax-bracket flexibility
      in retirement.
    </p>

    <h2>Asset allocation — the glide path</h2>
    <p>
      Common rule: percentage in stocks = 110 − your age. At 30:
      80% stocks / 20% bonds. At 60: 50% / 50%.
    </p>
    <p>
      A target-date fund (e.g., Vanguard Target Retirement 2055)
      handles this automatically — it glides from aggressive to
      conservative as the year approaches. Fine choice for hands-off
      investors.
    </p>
    <p>
      For self-managed: a 3-fund portfolio (US total market,
      international total market, US bonds) covers 99% of what you
      need. Expense ratios &lt; 0.10% (Vanguard, Fidelity, Schwab
      index funds).
    </p>
    <p>
      Avoid: individual stocks as core retirement savings, high-fee
      actively managed funds (1%+ expense ratio compounds to
      hundreds of thousands in lost wealth), target-date funds with
      fees above 0.20%.
    </p>

    <h2>Social Security — when to claim</h2>
    <p>
      US: you can claim as early as 62, at full retirement age (66-67
      depending on birth year), or delay until 70.
    </p>
    <p>
      <strong>Claiming at 62:</strong> ~30% reduction in monthly
      benefit vs FRA. Permanent.
    </p>
    <p>
      <strong>Claiming at FRA:</strong> 100% of your calculated
      benefit.
    </p>
    <p>
      <strong>Delaying to 70:</strong> ~32% higher monthly benefit
      than FRA (8% per year of delay).
    </p>
    <p>
      Breakeven math favors delaying if you expect to live past the
      early-to-mid 80s. Delaying is insurance against longevity; taking
      early is better if you have health concerns or immediate need.
    </p>

    <h2>Healthcare before 65</h2>
    <p>
      Medicare starts at 65. Retire before that and you need a
      bridge: COBRA (expensive, 18 months max), ACA marketplace plans
      (subsidized based on income — retirees managing taxable income
      can qualify for substantial subsidies), or spouse&rsquo;s plan.
    </p>
    <p>
      Budget $10-20k/year per person for ACA premiums + out-of-pocket
      in early retirement if you&rsquo;re not subsidy-eligible.
    </p>

    <h2>5 common retirement mistakes</h2>
    <p>
      <strong>1. Waiting to start.</strong> Starting at 35 instead of
      25 roughly halves your final nest egg at the same savings rate.
    </p>
    <p>
      <strong>2. Cashing out 401(k) when changing jobs.</strong>
      You pay income tax + 10% penalty, and lose decades of growth.
      Always roll into an IRA or the new employer&rsquo;s 401(k).
    </p>
    <p>
      <strong>3. Too-conservative allocation in 30s/40s.</strong>
      Being 60% bonds at 35 leaves enormous growth on the table.
      Young investors should be 80-100% stocks.
    </p>
    <p>
      <strong>4. Ignoring fees.</strong> 1% annual fees cost ~28% of
      your wealth over 40 years. The difference between 0.04% (index
      fund) and 1% (actively managed) on $500k over 30 years is over
      $300k.
    </p>
    <p>
      <strong>5. Not updating beneficiaries.</strong> Retirement
      accounts pass by beneficiary designation, not your will. A
      surprising number of accounts end up going to ex-spouses
      because the designation was never updated.
    </p>

    <h2>How to check if you&rsquo;re on track</h2>
    <p>
      Fidelity benchmarks (as a multiple of current annual salary):
    </p>
    <p>
      <strong>By 30:</strong> 1x salary saved.
    </p>
    <p>
      <strong>By 40:</strong> 3x.
    </p>
    <p>
      <strong>By 50:</strong> 6x.
    </p>
    <p>
      <strong>By 60:</strong> 8x.
    </p>
    <p>
      <strong>By 67:</strong> 10x.
    </p>
    <p>
      Behind these numbers = increase savings rate, extend working
      years, or lower retirement spending target. Ahead = you have
      room to reduce saving rate, retire earlier, or upgrade
      lifestyle.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Project your retirement savings trajectory with the{" "}
      <a href="/tools/retirement-calculator">retirement calculator</a>
      . Pair with the{" "}
      <a href="/tools/compound-interest-calculator">compound interest
      calculator</a> to see how starting 5 years earlier changes the
      outcome, and the{" "}
      <a href="/tools/net-worth-calculator">net worth calculator</a>
      {" "}for an all-accounts snapshot.
    </p>
  </>
);
