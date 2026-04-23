import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Inflation is the quiet tax on every dollar sitting still. $100 in 2000 has the
      purchasing power of about $180 in 2026 &mdash; a 44% real loss for anyone who held
      cash. Salaries, investments, rents, and prices all move in nominal terms; what matters
      is the real terms after inflation is stripped out. This guide walks through the CPI
      index math, how to convert nominal returns to real returns, the Fisher equation, the
      historical US inflation record, and why a seemingly modest 3% inflation rate
      compounds into something dramatic over a career or a retirement. Accurate inflation
      thinking is the difference between feeling rich and being rich.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. The CPI index</h2>
    <p>
      The Consumer Price Index (CPI-U in the US) tracks the price of a basket of consumer
      goods over time. It&rsquo;s set to 100 in a base period (1982-1984 average = 100).
      The CPI in January 2026 is roughly 315, meaning the same basket costs ~3.15x what it
      did in the early 1980s. Year-over-year inflation is:
    </p>
    <pre>{`inflation % = (CPI_now - CPI_prev) / CPI_prev × 100`}</pre>

    <h2>2. Converting between years</h2>
    <p>
      To convert $X from year A to year B&rsquo;s purchasing power:
    </p>
    <pre>{`value_B = value_A × (CPI_B / CPI_A)`}</pre>
    <p>
      Example: a $50,000 salary in 1990 (CPI 130) is equivalent to
      <code> 50000 × (315 / 130) = $121,000</code> in 2026 dollars. Your grandfather&rsquo;s
      &ldquo;I bought my house for $30,000&rdquo; in 1975 (CPI 54) is
      <code> 30000 × (315 / 54) = $175,000</code> today.
    </p>

    <h2>3. Nominal vs real returns</h2>
    <p>
      <strong>Nominal</strong> = what the account statement says.<br />
      <strong>Real</strong> = nominal minus inflation = what you can actually buy more of.
    </p>
    <p>
      A bank account earning 4% when inflation is 3% gives you 1% real return. A 4%
      savings account during 8% inflation gives you <em>negative 4%</em> real return —
      you&rsquo;re losing purchasing power even though the balance grows.
    </p>

    <h2>4. The Fisher equation</h2>
    <p>
      A precise formula for relating nominal, real, and inflation rates:
    </p>
    <pre>{`(1 + nominal) = (1 + real) × (1 + inflation)`}</pre>
    <p>
      Rearranged:
    </p>
    <pre>{`real = (1 + nominal) / (1 + inflation) - 1`}</pre>
    <p>
      At low rates, the approximation <code>real ≈ nominal - inflation</code> works. At
      higher rates, use the full formula. Nominal 10%, inflation 7%: shortcut says 3%,
      Fisher says <code>1.10/1.07 - 1 = 2.80%</code>. Small difference, but it compounds.
    </p>

    <h2>5. Historical US inflation</h2>
    <ul>
      <li>1910-2020 average: ~3.1% per year</li>
      <li>1970s peak: 13.5% (1980)</li>
      <li>1990-2020: 2.3% average (&ldquo;Great Moderation&rdquo;)</li>
      <li>2021-2023: 6-9% surge</li>
      <li>2024-2026: normalized back to ~3%</li>
    </ul>
    <p>
      Long-run, 3% is the realistic planning number. Lower is a bonus, higher is a hazard.
    </p>

    <h2>6. Why 3% compounds faster than it feels</h2>
    <p>
      At 3% annual inflation:
    </p>
    <ul>
      <li>10 years: prices 34% higher</li>
      <li>20 years: 81% higher</li>
      <li>30 years: 143% higher</li>
      <li>40 years: 226% higher</li>
    </ul>
    <p>
      A 30-year retirement starting at $60k/year of spending will require $145k+/year by
      year 30 just to maintain the same lifestyle. That&rsquo;s why fixed pensions erode and
      why bond-heavy retirement portfolios can fail.
    </p>

    <h2>7. Investment returns in real terms</h2>
    <p>
      Long-run historical real returns (after inflation):
    </p>
    <ul>
      <li>US stocks: ~6.5-7%</li>
      <li>US bonds: ~1-2%</li>
      <li>Cash / T-bills: ~0-0.5%</li>
      <li>Gold: ~0-1%</li>
      <li>Real estate: ~3-4%</li>
    </ul>
    <p>
      The &ldquo;7% stock return&rdquo; you see quoted is usually the <em>real</em> figure.
      Stocks have historically been the most reliable inflation beater over 20+ year horizons.
    </p>

    <h2>8. Salary and inflation</h2>
    <p>
      A 3% raise during 4% inflation is a pay cut. US wage growth tends to track inflation
      over decades but can lag by 1-3 years during inflation spikes. Always evaluate raises
      in real terms:
    </p>
    <pre>{`real raise = (1 + nominal raise) / (1 + inflation) - 1`}</pre>
    <p>
      Switching jobs tends to produce bigger real raises than staying put — job-changers
      averaged 7-10% nominal bumps vs 4-5% for stayers in 2023-2024.
    </p>

    <h2>9. Inflation-protected instruments</h2>
    <ul>
      <li><strong>TIPS</strong> (Treasury Inflation-Protected Securities): principal adjusts with CPI; pays a real yield above inflation</li>
      <li><strong>I-bonds</strong>: US savings bond with inflation-linked rate, $10k/year limit</li>
      <li><strong>Stocks</strong>: imperfect inflation hedge, better over 20+ year horizons</li>
      <li><strong>Real estate</strong>: rents rise with inflation, as does property value</li>
      <li><strong>Commodities</strong>: volatile but positively correlated with inflation</li>
    </ul>

    <h2>10. CPI vs your personal inflation</h2>
    <p>
      CPI is a basket average. Your personal inflation rate depends on what you buy. If
      healthcare and college dominate your spending, you&rsquo;re facing 5-6% per year even
      when headline CPI is 2%. If you drive a lot, gasoline volatility hits harder. Chained
      CPI (C-CPI-U) and the Fed&rsquo;s preferred PCE index often run 0.3-0.5% lower than
      headline CPI for technical reasons. Don&rsquo;t assume the news number applies to you.
    </p>

    <h2>11. Retirement planning uses real numbers</h2>
    <p>
      When you see &ldquo;the 4% safe withdrawal rate,&rdquo; that&rsquo;s inflation-adjusted
      — you withdraw 4% of initial portfolio in year 1, then that dollar amount plus CPI
      each year after. Running retirement projections in nominal dollars will give
      misleadingly large end balances. Always model in real terms.
    </p>

    <h2>12. Present value and discount rates</h2>
    <p>
      To compare money across time (pensions, settlements, annuities), you discount future
      cash flows:
    </p>
    <pre>{`present value = future value / (1 + r)^years`}</pre>
    <p>
      The discount rate <em>r</em> should reflect both inflation expectations and a risk
      premium. A guaranteed $10,000 in 20 years discounted at 3% is worth
      <code> 10000 / 1.03^20 = $5,537</code> today.
    </p>

    <h2>13. Common mistakes</h2>
    <ul>
      <li>
        <strong>Ignoring inflation on cash savings.</strong> A $50k emergency fund earning
        0.5% during 3% inflation loses $1,250 of real value per year.
      </li>
      <li>
        <strong>Celebrating nominal gains.</strong> A stock that went from $100 to $150
        over 15 years barely kept up with inflation.
      </li>
      <li>
        <strong>Anchoring on old prices.</strong> &ldquo;Gas used to be $2&rdquo; — yes, and
        a coffee used to be $0.25. Inflate everything.
      </li>
      <li>
        <strong>Confusing CPI and CPI-U.</strong> Different indexes for different populations;
        don&rsquo;t mix series.
      </li>
      <li>
        <strong>Assuming 2% forever.</strong> The 1970s happened, and could happen again.
        Plan with 3-4% to stay safe.
      </li>
    </ul>

    <h2>14. Run the numbers</h2>
    <p>
      Convert any historical dollar amount to today&rsquo;s purchasing power, or project
      future costs at a given inflation rate, with the calculator below.
    </p>
    <p>
      <a href="/tools/inflation-calculator">Inflation calculator</a>
      <a href="/tools/compound-interest-calculator">Compound interest calculator</a>
      <a href="/tools/currency-converter">Currency converter</a>
    </p>
  </>
);
