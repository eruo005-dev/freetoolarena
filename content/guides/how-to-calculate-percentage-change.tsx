import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      &ldquo;Revenue went from $80k to $100k&rdquo; — what&rsquo;s the
      growth rate? It&rsquo;s not 20% (that&rsquo;s the absolute amount
      divided by the new value by mistake), and it&rsquo;s not 25% if you
      run the formula backward. The answer is 25%, but only if you pick
      the right denominator. This guide covers the percentage-change
      formula, why &ldquo;percent&rdquo; and &ldquo;percentage points&rdquo;
      are not the same thing, and the math behind year-over-year and
      compound growth.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The one formula you need</h2>
    <p>
      Percentage change from an old value to a new value:{" "}
      <code>((new − old) / old) × 100%</code>. The old value always goes
      in the denominator. That&rsquo;s the whole thing.
    </p>
    <p>
      $80k → $100k: <code>(100 − 80) / 80 = 0.25 = 25%</code>. Revenue
      grew 25%. If you&rsquo;d divided by 100 instead, you&rsquo;d get
      20%, which answers a different question (&ldquo;the increase is
      what fraction of the new total?&rdquo;) and is not growth rate.
    </p>

    <h2>Increases vs decreases — same formula, watch the sign</h2>
    <p>
      $100k → $80k: <code>(80 − 100) / 100 = −0.20 = −20%</code>. A 20%
      decrease. Note: a 25% increase followed by a 20% decrease lands
      you back at the starting value — that&rsquo;s not symmetry, it&rsquo;s
      multiplicative math. To undo a percent change, you need a larger
      percent change in the opposite direction.
    </p>
    <p>
      Specifically: a 50% drop needs a 100% rise to recover ($100 → $50 →
      $100). A 90% drop needs a 900% rise. This is why portfolio crashes
      are so brutal and why the &ldquo;average&rdquo; return of a volatile
      investment isn&rsquo;t what you actually earned.
    </p>

    <h2>Percent vs percentage points</h2>
    <p>
      These get used interchangeably in news coverage, and it changes the
      meaning. If an interest rate goes from 4% to 5%:
    </p>
    <p>
      It rose by <strong>1 percentage point</strong> (absolute difference).
      It also rose by <strong>25 percent</strong> (relative change, using
      the formula above). Both are correct; they describe different
      things. &ldquo;Mortgage rates rose 25%&rdquo; and &ldquo;mortgage
      rates rose 1 point&rdquo; are the same event described two ways.
      When precision matters, use &ldquo;points.&rdquo;
    </p>

    <h2>Year-over-year (YoY) growth</h2>
    <p>
      Same formula, applied across calendar years. April 2025 revenue
      vs April 2024 revenue:{" "}
      <code>(2025_april − 2024_april) / 2024_april</code>. YoY naturally
      controls for seasonality, which is why retail reports Q4 against
      Q4 instead of Q4 against Q3.
    </p>

    <h2>Compound growth (CAGR)</h2>
    <p>
      For multi-period growth where you want a single &ldquo;average&rdquo;
      rate:{" "}
      <code>CAGR = (ending / starting)^(1/years) − 1</code>. A portfolio
      that grew from $10k to $20k over 5 years has a CAGR of{" "}
      <code>(20000/10000)^(1/5) − 1 = 1.1487 − 1 = 14.87%</code> per
      year. Not 100%/5 = 20%. That linear math ignores compounding.
    </p>
    <p>
      The <a href="/tools/compound-interest-calculator">compound interest
      calculator</a> solves this in both directions — give it a start,
      end, and timeframe and it returns the implied rate.
    </p>

    <h2>A worked table</h2>
    <p>
      Some intuitions to pin down before reaching for a calculator:
    </p>
    <p>
      10 → 11 is <strong>+10%</strong>. 11 → 10 is <strong>−9.09%</strong>,
      not −10%. 100 → 150 is <strong>+50%</strong>. 150 → 100 is{" "}
      <strong>−33.3%</strong>. 50 → 200 is <strong>+300%</strong>, not
      &ldquo;4× growth means 400%.&rdquo; The word &ldquo;4×&rdquo; means
      multiply by 4, which is a 300% increase, because the starting value
      is already counted once.
    </p>

    <h2>When &ldquo;X% more&rdquo; gets misquoted</h2>
    <p>
      &ldquo;200% more&rdquo; means triple — the original plus two more of
      the same. Headlines routinely use &ldquo;200% more&rdquo; when they
      mean &ldquo;doubled&rdquo; (which is +100%). When you see the
      phrase, substitute the absolute numbers before accepting the claim.
    </p>
    <p>
      &ldquo;3× faster&rdquo; means finishing in one-third the time, or
      equivalently a 200% speedup. &ldquo;3× more,&rdquo; read literally,
      means the gain is 3× the original (so the new value is 4× the
      original). Most writers mean &ldquo;3× as much&rdquo; but write the
      less-precise version.
    </p>

    <h2>Quick-check the calculator</h2>
    <p>
      Before trusting any percent-change output, sanity-check with one
      line: is the answer bigger or smaller than the starting value?
      Then: roughly what fraction of the starting value? If the tool says
      &ldquo;$80k → $100k is a 20% change,&rdquo; you know immediately
      something&rsquo;s wrong — $20k is a quarter of $80k, so the change
      is ~25%. Rough mental math catches sign errors and
      denominator-swap bugs before they propagate.
    </p>
    <p>
      Use the <a href="/tools/percentage-calculator">percentage
      calculator</a> for the five standard percentage questions, and the{" "}
      <a href="/tools/compound-interest-calculator">compound interest
      calculator</a> when you need CAGR or multi-period growth.
    </p>
  </>
);
