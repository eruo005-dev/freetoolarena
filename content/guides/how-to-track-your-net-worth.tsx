import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Net worth is the single clearest snapshot of your financial
      progress: total assets minus total liabilities. Tracking it
      quarterly for 5 years will tell you more about whether your
      financial decisions are working than any budgeting app. This
      guide covers what to include (and what to leave out), how to
      value tricky assets, how often to update, and the handful of
      numbers that tell you if you&rsquo;re on pace for major life
      milestones.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The formula — and what it really measures</h2>
    <p>
      <strong>Net worth = Assets − Liabilities.</strong>
    </p>
    <p>
      Assets are things you own that have resale value. Liabilities
      are things you owe. The number itself is less important than
      its <strong>direction over time</strong> — a single snapshot
      can mislead, but a 5-year trendline cannot.
    </p>
    <p>
      A 32-year-old with $8,000 net worth but +$20,000 YoY growth is
      doing better than a 55-year-old at $400,000 with flat or
      declining change, because trajectory matters more than
      altitude.
    </p>

    <h2>What counts as an asset — and at what price</h2>
    <p>
      <strong>Cash and near-cash.</strong> Checking, savings, money
      market, CDs. Value = balance. Easy.
    </p>
    <p>
      <strong>Investment accounts.</strong> 401(k), IRA, brokerage,
      HSA, 529. Value = current market value of holdings, pre-tax for
      traditional accounts. Some methodologies adjust 401(k) down by
      expected tax (e.g., count $100k traditional 401(k) as $75k
      post-tax). Either approach works as long as you&rsquo;re
      consistent.
    </p>
    <p>
      <strong>Real estate.</strong> Home, rental properties, land.
      Value = current market value (Zillow/Redfin estimate minus ~3%
      for selling costs, or a recent appraisal). Subtract the
      mortgage as a liability.
    </p>
    <p>
      <strong>Vehicles.</strong> Use Kelley Blue Book private-party
      value, not what you paid. A car bought for $40k 3 years ago
      might be worth $22k today; don&rsquo;t count the $40k.
    </p>
    <p>
      <strong>Business ownership.</strong> Tricky. If you have a
      salable business, use a conservative 1–2× annual SDE
      (seller&rsquo;s discretionary earnings) or a recent valuation.
      Don&rsquo;t count unrealizable hypotheticals.
    </p>
    <p>
      <strong>Crypto.</strong> Current market value. Volatile; update
      at each snapshot.
    </p>

    <h2>What NOT to count (or count carefully)</h2>
    <p>
      <strong>Furniture, clothes, books.</strong> These have near-zero
      resale value. Don&rsquo;t inflate your net worth with
      them.
    </p>
    <p>
      <strong>Jewelry, art, collectibles.</strong> Only if appraised
      recently and genuinely salable at that price — &ldquo;worth
      $10k&rdquo; that can&rsquo;t actually sell isn&rsquo;t worth
      $10k.
    </p>
    <p>
      <strong>Unvested stock options / RSUs.</strong> Not yours yet.
      Some methodologies include vested-but-unexercised at strike-to-
      market difference; that&rsquo;s acceptable if conservative.
    </p>
    <p>
      <strong>Pension (defined benefit).</strong> Can be the largest
      asset for some people. Value it at the NPV of expected
      payments, or at minimum flag its existence.
    </p>
    <p>
      <strong>Social Security expected benefits.</strong> Usually
      excluded from personal net worth — no market value before
      eligibility.
    </p>

    <h2>The liabilities list</h2>
    <p>
      <strong>Mortgage.</strong> Remaining principal balance (not
      original loan amount).
    </p>
    <p>
      <strong>Auto loans.</strong> Remaining balance.
    </p>
    <p>
      <strong>Student loans.</strong> Remaining balance. Include both
      federal and private.
    </p>
    <p>
      <strong>Credit card balances.</strong> Only the amount not paid
      off at the next statement cycle. If you pay in full monthly,
      balance is effectively zero for this purpose.
    </p>
    <p>
      <strong>Personal loans, medical debt, tax owed, IOUs.</strong>
      Add them all. Liabilities aren&rsquo;t embarrassing — they&rsquo;re
      data.
    </p>

    <h2>How often to track</h2>
    <p>
      <strong>Quarterly is the sweet spot.</strong> Monthly creates
      noise from market volatility; annual misses course-correction
      windows. Quarterly gives you 4 data points a year, enough to
      see a trend within 12 months.
    </p>
    <p>
      Set a recurring calendar event on the 1st of each quarter,
      take 30 minutes, update one spreadsheet or calculator. Done.
    </p>

    <h2>Benchmarks that are actually useful</h2>
    <p>
      <strong>Fidelity&rsquo;s milestones</strong> (imperfect but
      directionally useful):
    </p>
    <p>
      <strong>Age 30:</strong> 1× annual salary in retirement accounts.
    </p>
    <p>
      <strong>Age 40:</strong> 3× annual salary.
    </p>
    <p>
      <strong>Age 50:</strong> 6× annual salary.
    </p>
    <p>
      <strong>Age 60:</strong> 8× annual salary.
    </p>
    <p>
      <strong>Age 67:</strong> 10× annual salary.
    </p>
    <p>
      These are rules of thumb for W-2 earners with Social Security
      supplement. If you&rsquo;re self-employed, want early retirement,
      or want higher lifestyle in retirement, you need more.
    </p>
    <p>
      <strong>The simpler Stanley/Danko formula</strong> (from{" "}
      <em>The Millionaire Next Door</em>): expected net worth = age ×
      pre-tax income ÷ 10. A 40-year-old earning $80k should have
      $320k net worth to be &ldquo;on track.&rdquo; Above 2× that =
      &ldquo;prodigious accumulator.&rdquo; Below 0.5× = &ldquo;under
      accumulator.&rdquo;
    </p>

    <h2>What the direction tells you</h2>
    <p>
      <strong>Growing every quarter, even a little:</strong>{" "}
      you&rsquo;re saving and investing. System is working. Stay the
      course.
    </p>
    <p>
      <strong>Flat or declining in a flat market:</strong> spending is
      eating income, or lifestyle inflation after raises. Review
      budget and savings rate.
    </p>
    <p>
      <strong>Dropped 20%+ in a market crash:</strong> normal.
      Don&rsquo;t change strategy; don&rsquo;t sell. 30–40% drawdowns
      happen roughly once a decade and recover within 1–3 years.
    </p>
    <p>
      <strong>Up substantially in a bull market:</strong> don&rsquo;t
      confuse luck with skill. Bull markets make everyone look smart.
      Rebalance; don&rsquo;t increase risk.
    </p>

    <h2>The two ratios worth watching</h2>
    <p>
      <strong>Debt-to-assets ratio</strong> = Total liabilities /
      Total assets. Below 0.30 is healthy; above 0.50 is stretched.
    </p>
    <p>
      <strong>Liquid net worth</strong> = Cash + investments − all
      debt. Excludes home equity (not liquid). This is the &ldquo;if
      I lost my job tomorrow, what would I actually have&rdquo; number.
      Healthy: at least 6 months of essential expenses.
    </p>

    <h2>Run the numbers</h2>
    <p>
      List your assets and liabilities in the{" "}
      <a href="/tools/net-worth-calculator">net worth calculator</a>
      {" "}to get your snapshot. Pair with the{" "}
      <a href="/tools/savings-goal-calculator">savings goal
      calculator</a> for the &ldquo;how do I get there&rdquo; side,
      and the{" "}
      <a href="/tools/compound-interest-calculator">compound interest
      calculator</a> to project where disciplined saving gets you over
      10, 20, 30 years.
    </p>
  </>
);
