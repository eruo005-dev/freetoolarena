import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A dollar in a checking account isn&rsquo;t a stable dollar. Inflation
      quietly reprices it downward every year — at 3% annual inflation,
      $100 today buys what $74 bought ten years from now. This guide
      explains how inflation math actually works, why a high-yield savings
      account isn&rsquo;t always &ldquo;making money&rdquo;, and how to
      run the numbers on your own cash before deciding where to park it.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>How inflation is measured</h2>
    <p>
      The number you see in the news is almost always the{" "}
      <strong>Consumer Price Index (CPI-U)</strong>, published monthly by
      the US Bureau of Labor Statistics. It tracks the price of a fixed
      basket of ~80,000 goods and services consumed by urban households
      — rent, gas, groceries, medical, apparel. When CPI-U rises 3% year
      over year, the cost of that basket rose 3%.
    </p>
    <p>
      The long-run US average since 1913 is about 3.1% per year. The
      Federal Reserve targets 2% inflation, considers anything under 2%
      worryingly low (deflation risk), and anything over 4% worryingly
      high.
    </p>

    <h2>The purchasing-power formula</h2>
    <p>
      Future dollars are worth less. To compute purchasing power after{" "}
      <code>n</code> years at inflation rate <code>r</code>:{" "}
      <code>Future purchasing power = Present $ ÷ (1 + r)^n</code>.
    </p>
    <p>
      $10,000 today at 3% annual inflation has a purchasing power of{" "}
      <code>10,000 ÷ 1.03^10 = $7,441</code> in 10 years. Not 3% × 10 =
      70% of value — that&rsquo;s the linear approximation. Compounding
      makes the real loss slightly less, because each year&rsquo;s
      inflation applies to the already-devalued base.
    </p>
    <p>
      To go the other direction — how much future money do I need to
      match $10k of today&rsquo;s purchasing power:{" "}
      <code>Future $ = Present $ × (1 + r)^n</code>. $10,000 × 1.03^10 =
      $13,439. That&rsquo;s what you&rsquo;d need in 10 years to feel
      equally rich. The <a href="/tools/inflation-calculator">inflation
      calculator</a> does both directions instantly.
    </p>

    <h2>Real return vs nominal return</h2>
    <p>
      The difference between &ldquo;inflation is 3%&rdquo; and &ldquo;my
      savings earn 4%&rdquo; isn&rsquo;t a 7% gain — it&rsquo;s barely a
      gain at all. Real return (what you keep in purchasing power terms)
      is approximately: <code>nominal rate − inflation rate</code>. More
      precisely: <code>(1 + nominal) / (1 + inflation) − 1</code>.
    </p>
    <p>
      A high-yield savings account paying 4.5% with 3% inflation produces
      a real return of (1.045 / 1.03) − 1 = 1.46%. Real. That&rsquo;s
      what&rsquo;s actually compounding. Any time you see a
      &ldquo;savings rate,&rdquo; do this subtraction before getting
      excited.
    </p>
    <p>
      A checking account paying 0.01% during a 3% inflation year has a
      real return of roughly <em>−3%</em>. That cash is actively losing
      purchasing power. It hasn&rsquo;t gotten smaller in dollar terms,
      which is why this is easy to miss, but it buys less every month.
    </p>

    <h2>What this means for emergency funds</h2>
    <p>
      Emergency funds should stay liquid — HYSA, money market, T-bills —
      even though real return on liquid cash is often 0–1% or negative.
      The whole point is immediate availability. Losing 2% of purchasing
      power on 3–6 months of expenses is the price of insurance against
      having to sell investments at a loss during a crisis.
    </p>
    <p>
      Liquid cash above 6 months of expenses is where inflation damage
      gets expensive. $50,000 parked in a checking account at 0.01% vs a
      HYSA at 4.5% is a $2,250/year opportunity cost — $22,500 over ten
      years of pure friction. Move it.
    </p>

    <h2>Inflation and long-term goals</h2>
    <p>
      Retirement planning has to be inflation-adjusted or the numbers lie
      to you. $1 million in 30 years isn&rsquo;t $1 million of today&rsquo;s
      money — at 3% inflation, it&rsquo;s $412,000 in today&rsquo;s terms.
      A retirement target of &ldquo;$1M nominal&rdquo; in 2055 is
      actually a modest goal, not the mountain it sounds like.
    </p>
    <p>
      The fix: target real (inflation-adjusted) numbers. Use a 7% real
      return assumption for stocks (10% nominal minus 3% inflation — the
      long-run historical real return of the S&amp;P 500), and think in
      today&rsquo;s dollars. Our{" "}
      <a href="/tools/401k-calculator">401(k) calculator</a> and{" "}
      <a href="/tools/compound-interest-calculator">compound interest
      calculator</a> let you toggle real vs nominal assumptions.
    </p>

    <h2>When inflation is actively helping you</h2>
    <p>
      Fixed-rate debt. Your 3.5% mortgage from 2021, in a 4% inflation
      world, has a real interest rate of negative-0.5%. The bank is
      paying you (in purchasing power terms) to hold their money. This
      is why people with low-rate mortgages shouldn&rsquo;t rush to pay
      them off during inflation spikes — the arithmetic favors holding.
    </p>
    <p>
      The opposite applies to floating-rate debt and credit cards, which
      reprice upward with inflation and do active damage every month.
      The <a href="/tools/debt-payoff-calculator">debt payoff
      calculator</a> handles that side of the math.
    </p>

    <h2>A two-minute inflation audit</h2>
    <p>
      Open your accounts. For each balance over $1,000, note the APY.
      Subtract 3% (a reasonable long-run inflation assumption). Anything
      with a real return below zero is actively losing ground —
      prioritize moving those balances into HYSA, T-bills, or investments
      matched to the time horizon you need them for.
    </p>
    <p>
      For the math on any specific amount over any timeframe, use the{" "}
      <a href="/tools/inflation-calculator">inflation calculator</a>. For
      the full picture of what your savings turn into over time, the{" "}
      <a href="/tools/compound-interest-calculator">compound interest
      calculator</a> lets you model returns against an inflation
      assumption.
    </p>
  </>
);
