import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      The question &ldquo;how much will I have at retirement?&rdquo; has one
      formula behind it and three variables that matter: how much you start
      with, how much you add each month, and how long the money compounds.
      This guide walks through the projection math, the realistic return
      assumptions to use (and which inflate the number unfairly), and how
      to translate the scary-big future number into a realistic monthly
      income.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The future-value formula</h2>
    <p>
      <code>FV = P × (1 + r)<sup>n</sup> + PMT × [((1 + r)<sup>n</sup> − 1) / r]</code>
    </p>
    <p>
      Where <strong>P</strong> = starting balance, <strong>PMT</strong> =
      per-period contribution, <strong>r</strong> = per-period return,{" "}
      <strong>n</strong> = number of periods. For monthly compounding with
      an annual return rate, use <code>r = annual / 12</code> and{" "}
      <code>n = years × 12</code>.
    </p>

    <h2>A realistic scenario</h2>
    <p>
      Age 30, $20,000 already saved in a 401(k). Contributing $800/month
      (employee + match). Target retirement at 65. Assumed 7% real
      (inflation-adjusted) return.
    </p>
    <p>
      <code>FV = $20,000 × 1.07<sup>35</sup> + $800 × [(1.07<sup>35</sup> − 1) / 0.07]</code>
    </p>
    <p>
      = $213,000 + $1,326,000 = <strong>$1.54 million in today&rsquo;s
      dollars</strong> at age 65. Not bad on a $20k start and $800/month.
    </p>

    <h2>What return assumption should you use?</h2>
    <p>
      <strong>10% nominal</strong> — the raw long-term US stock market
      average since 1926, not adjusted for inflation. Using this makes
      your projection look great but the dollars are future dollars that
      buy less than today&rsquo;s dollars.
    </p>
    <p>
      <strong>7% real</strong> — the same return net of ~3% historical
      inflation. The output is in today&rsquo;s purchasing power. Use this
      for any projection you&rsquo;ll use to plan your actual life.
    </p>
    <p>
      <strong>5–6% real</strong> — a conservative assumption for portfolios
      with meaningful bond allocation. Useful as a stress test.
    </p>
    <p>
      <strong>4%</strong> — what some strategists call the new-normal
      expected real return after 2020s-era high valuations. Ultra-conservative
      floor.
    </p>
    <p>
      Never compare calculators that use nominal returns to ones that use
      real — the difference over 35 years is roughly 2–3× the ending
      balance.
    </p>

    <h2>The 4% rule — from nest egg to monthly income</h2>
    <p>
      The Trinity study suggests you can withdraw{" "}
      <strong>4% of your retirement nest egg</strong> in year one, adjust
      for inflation each subsequent year, and have a 95% chance of
      your portfolio lasting 30 years. $1.54M × 4% = $61,600/year =
      $5,133/month pre-tax.
    </p>
    <p>
      For a more conservative target (longer retirement, lower-return
      environment), some advisors now recommend 3.5% or even 3%. $1.54M ×
      3.5% = $53,900/year.
    </p>

    <h2>The &ldquo;25× rule&rdquo; for FI target</h2>
    <p>
      The inverse of 4%: multiply your target annual spending by 25 to get
      the nest egg you need. Want $60k/year in retirement? Target $1.5M.
      Want $100k/year? Target $2.5M.
    </p>

    <h2>The starting-early superpower</h2>
    <p>
      Two investors, same $400/month contribution, 7% return. Anna invests
      ages 25–35 (10 years, $48k contributed), stops, lets it ride to 65.
      Ends with ~$470k. Ben starts at 35, invests $400/mo for 30 years
      ($144k contributed), ends with ~$484k. Ben contributed 3× what Anna
      did and barely beat her. Time dominates amount; front-loading
      contributions early is worth disproportionately more than catch-up
      later.
    </p>

    <h2>Stress-test the assumptions</h2>
    <p>
      Before anchoring on a projection, run it at 3 return rates (5%, 7%,
      9%) and 2 contribution rates (current, current + 20%). Your real
      outcome will land somewhere in the range. The honest way to present a
      projection to yourself is a range, not a single point.
    </p>
    <p>
      One example to be humble about: a 30-year horizon with a bad
      sequence-of-returns (2000–2010 type decade at the start) produces
      materially lower ending balances than a smooth 7% assumption, even
      if the <em>average</em> return ends up the same. Real-world paths
      are bumpy.
    </p>

    <h2>Taxes and account types</h2>
    <p>
      401(k) and traditional IRA contributions are pre-tax — you&rsquo;ll
      owe ordinary income tax on withdrawals. A $1.54M traditional 401(k)
      becomes ~$1.15M net after a 25% effective rate at retirement.
    </p>
    <p>
      Roth 401(k)/IRA contributions are post-tax — withdrawals are
      tax-free. $1.54M stays $1.54M.
    </p>
    <p>
      Most calculators (including ours) ignore this — the number
      projected is pre-tax for traditional accounts, tax-free for Roth.
      Adjust mentally when comparing to your desired spending.
    </p>

    <h2>Employer match — the biggest return-on-contribution available</h2>
    <p>
      If your employer offers 50% match on the first 6% of salary, that
      6% contribution becomes 9% against your balance — a 50% instant
      return, which compounds on top of market returns. Always contribute
      at least enough to get the full match; anything less is leaving
      pure cash on the table.
    </p>

    <h2>Project yours</h2>
    <p>
      Enter your starting balance, monthly contribution, expected return
      (use 7% real for base case), and years-to-retirement into the{" "}
      <a href="/tools/compound-interest-calculator">compound interest
      calculator</a>. Run it at 5%, 7%, and 9% to see a realistic range.
      Cross-check the target against the{" "}
      <a href="/tools/savings-goal-calculator">savings goal calculator</a>{" "}
      to back-solve the monthly contribution needed to hit a specific
      number, and pair with the{" "}
      <a href="/tools/net-worth-calculator">net worth calculator</a> to
      track actual progress each year.
    </p>
  </>
);
