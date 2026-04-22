import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Loan offers come with a dozen numbers on the paperwork and only one of
      them is the one you should actually compare. Principal, rate, APR,
      origination fee, points, term, monthly payment, total interest,
      prepayment penalty — shopping by the monthly payment alone is how
      people end up paying $5,000 more for the same loan. This guide walks
      through what to compare, what to ignore, and the one calculation that
      tells you which offer is really cheaper.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>APR, not interest rate</h2>
    <p>
      The <strong>interest rate</strong> is what the lender charges on the
      balance. The <strong>APR</strong> bakes in most fees — origination,
      processing, discount points — and expresses the true annual cost as a
      single percentage. Two lenders can quote the same 7.0% rate, but if
      Lender A charges $2,000 in fees and Lender B charges zero, their APRs
      might be 7.4% vs 7.0%. <strong>Compare APR between offers, not rate.</strong>
    </p>
    <p>
      One caveat: APR assumes you hold the loan to term. If you&rsquo;ll
      likely refinance or pay off early, fee-heavy offers with a slightly
      lower rate look worse than APR implies. For short holding periods,
      compare total-dollars-paid instead of APR.
    </p>

    <h2>The total-cost calculation — what actually matters</h2>
    <p>
      For every offer, compute:{" "}
      <code>Total cost = (Monthly payment × Number of months) + Up-front fees</code>.
      Then subtract principal. That&rsquo;s the true dollar cost of the
      money.
    </p>
    <p>
      Example: $20,000 loan, 5 years.
    </p>
    <p>
      <strong>Offer A:</strong> 6.5% rate, $0 fees. Monthly = $391.32. Total
      paid = $23,479. <strong>Interest cost: $3,479.</strong>
    </p>
    <p>
      <strong>Offer B:</strong> 5.9% rate, $800 origination. Monthly =
      $385.64. Total paid = $23,138 + $800 fee = $23,938.{" "}
      <strong>Interest + fees: $3,938.</strong>
    </p>
    <p>
      The &ldquo;lower rate&rdquo; offer B is actually{" "}
      <strong>$459 more expensive</strong>. The monthly is $5.68 cheaper but
      the fee eats it up. This is exactly why APR exists, and why lenders
      advertising &ldquo;lowest rate&rdquo; love to hide the origination
      line.
    </p>

    <h2>Term — the biggest hidden variable</h2>
    <p>
      A longer term always means lower monthly payments <em>and</em> more
      total interest. Lenders quote terms that make payments attractive.
      Don&rsquo;t anchor to the monthly — always compare same-term vs
      same-term, or use total-dollars.
    </p>
    <p>
      Same $20k at 6.5%: 3-year term = $613/mo, $2,063 interest. 5-year =
      $391/mo, $3,479 interest. 7-year = $294/mo, $4,727 interest. Picking
      7-year over 3-year costs you an extra $2,664 — a 129% increase in
      interest — for the same loan.
    </p>

    <h2>Prepayment penalties — always check</h2>
    <p>
      Some loans (rare in mortgages, common in subprime auto and some
      personal loans) charge a penalty if you pay early. A 2% prepayment
      penalty on $20k is $400 out of your pocket for paying ahead. Read the
      disclosure — if you see &ldquo;prepayment penalty,&rdquo; factor it in
      or reject the offer.
    </p>

    <h2>Origination vs discount points</h2>
    <p>
      <strong>Origination fee</strong> is what the lender charges to write
      the loan. Usually 0.5–2% of principal. Unavoidable but negotiable.
    </p>
    <p>
      <strong>Discount points</strong> are optional — you pay 1% of
      principal to buy down the rate, typically by 0.25%. Break-even math:
      divide point cost by monthly savings. If break-even is under half
      your holding period, points are worth it. Otherwise skip.
    </p>

    <h2>The 4-column comparison table</h2>
    <p>
      Make a simple comparison across all offers with four columns only:
      (1) APR, (2) monthly payment, (3) total cost (payment × months + fees),
      (4) prepayment penalty yes/no. Everything else is noise. The offer
      with lowest total cost and no prepayment penalty wins, full stop.
    </p>

    <h2>Soft-pull pre-qualification first</h2>
    <p>
      Pre-qualification is a soft credit inquiry — doesn&rsquo;t ding your
      score, lets you see rates from multiple lenders before you formally
      apply. Most online lenders (SoFi, LightStream, Upstart, Marcus) offer
      it. Get 3–5 soft-pull quotes, then do the hard-pull application only
      on your top choice.
    </p>
    <p>
      If you hard-pull multiple lenders, do it within a 14-day window —
      credit bureaus treat same-category rate-shopping hard pulls as one
      inquiry for scoring purposes. Spread them over a month and you&rsquo;ll
      drop your score 10–20 points for nothing.
    </p>

    <h2>Red flags that eliminate an offer immediately</h2>
    <p>
      <strong>Mandatory insurance add-ons</strong> (credit life, disability)
      bundled into the payment — almost always overpriced. Decline or walk
      away.
    </p>
    <p>
      <strong>Precomputed interest</strong> (you see it in subprime auto) —
      you pay the full interest up front regardless of when you pay off.
      Makes early payoff pointless. Find another lender.
    </p>
    <p>
      <strong>Variable rate with no cap</strong> disclosed. Rate can move
      against you with no ceiling. Fine for HELOCs with caps, dangerous
      anywhere else.
    </p>

    <h2>Run the numbers before you sign</h2>
    <p>
      Plug each offer into the{" "}
      <a href="/tools/loan-calculator">loan calculator</a>, compute total
      cost, compare in your 4-column table. Pair with the{" "}
      <a href="/tools/debt-payoff-calculator">debt payoff calculator</a> if
      you&rsquo;re consolidating multiple debts, and the{" "}
      <a href="/tools/mortgage-calculator">mortgage calculator</a> if the
      loan is for a home — mortgage math includes PITI and escrow that pure
      loan math misses.
    </p>
  </>
);
