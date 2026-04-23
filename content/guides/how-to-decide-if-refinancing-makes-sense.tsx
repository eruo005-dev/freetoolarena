import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Refinancing a mortgage means replacing your existing loan with a new one &mdash;
      usually to get a lower rate, change the term, switch from an ARM to a fixed, or pull
      cash out of home equity. The pitch is simple: &ldquo;Lower your rate, lower your
      payment.&rdquo; The reality is more complicated because closing costs, remaining term,
      tax implications, and your plans for the home all move the math. A refinance that
      saves $300/month can still be a loss if you sell in 18 months or extend your term by
      a decade. This guide walks through the break-even formula, rate deltas that actually
      matter, cash-out tradeoffs, and the handful of situations where refinancing is
      obviously right or obviously wrong.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. The break-even formula</h2>
    <p>
      The core calculation:
    </p>
    <pre>{`break-even months = total closing costs / monthly savings`}</pre>
    <p>
      If closing costs are $6,000 and you save $250/month, break-even is
      <code> 6000 / 250 = 24 months</code>. If you plan to stay in the home longer than 24
      months, refinancing is net positive. If you&rsquo;ll move in 18 months, it&rsquo;s a
      loss. <strong>The question isn&rsquo;t &ldquo;is the rate lower?&rdquo; &mdash;
      it&rsquo;s &ldquo;will you stay past break-even?&rdquo;</strong>
    </p>

    <h2>2. What goes into closing costs</h2>
    <ul>
      <li>Application fee: $75-500</li>
      <li>Origination fee: 0.5-1% of loan amount</li>
      <li>Appraisal: $400-700</li>
      <li>Title search and insurance: $400-900</li>
      <li>Recording fees: $50-250</li>
      <li>Credit report: $25-75</li>
      <li>Discount points (optional): 1% of loan per point of rate reduction</li>
      <li>Escrow funding: several months of taxes and insurance</li>
    </ul>
    <p>
      Typical all-in: <strong>2-5% of loan amount</strong>. On a $400k mortgage, that&rsquo;s
      $8k-20k. Some costs are rolled into the new loan, but rolled costs still affect
      break-even.
    </p>

    <h2>3. The rate delta rule of thumb</h2>
    <p>
      Historical guidance was &ldquo;refinance if rates are 2% lower.&rdquo; With today&rsquo;s
      lower closing costs and online lenders, a <strong>0.75-1% rate drop</strong> is often
      enough if you&rsquo;ll stay 5+ years. Quick reference for a $400k 30-year loan:
    </p>
    <ul>
      <li>0.25% lower: ~$60/month saved (rarely worth it)</li>
      <li>0.50% lower: ~$120/month saved (marginal, depends on costs)</li>
      <li>1.00% lower: ~$250/month saved (usually worth it)</li>
      <li>1.50% lower: ~$380/month saved (very likely worth it)</li>
    </ul>

    <h2>4. Watch the reset trap</h2>
    <p>
      If you&rsquo;re 7 years into a 30-year mortgage and refinance back into a new 30-year,
      you just added 7 years of interest payments. The monthly payment drops, but the
      lifetime interest cost can go up. Two ways to avoid this:
    </p>
    <ul>
      <li>Refinance into a shorter term (15 or 20 years)</li>
      <li>Keep the new 30-year payment at your old payment amount &mdash; prepayment closes the gap</li>
    </ul>

    <h2>5. Should you go from 30-year to 15-year?</h2>
    <p>
      15-year loans typically price ~0.5-0.75% below 30-year rates. You save enormously on
      lifetime interest, but payments are ~50% higher. Go for it if:
    </p>
    <ul>
      <li>You can handle the higher monthly payment without cutting retirement savings</li>
      <li>You&rsquo;re within 15 years of planned retirement and want the house paid off</li>
      <li>Your emergency fund is fully funded and debt is under control</li>
    </ul>
    <p>
      Don&rsquo;t do it if it means cutting 401(k) contributions or skipping the emergency
      fund. Paying off a 6% mortgage slower while investing in index funds earning 7%+ still
      comes out ahead.
    </p>

    <h2>6. Cash-out refinance tradeoffs</h2>
    <p>
      A cash-out refi increases your principal and hands you the difference. Reasonable
      uses:
    </p>
    <ul>
      <li>Paying off high-interest debt (&gt;10% APR)</li>
      <li>Major home improvements that increase property value</li>
      <li>Starting or recapitalizing a business at lower cost than commercial credit</li>
    </ul>
    <p>
      Unreasonable uses:
    </p>
    <ul>
      <li>Vacations, cars, lifestyle spending</li>
      <li>Investments that aren&rsquo;t expected to return above the new mortgage rate</li>
      <li>Debt consolidation without behavior change</li>
    </ul>

    <h2>7. ARM to fixed rate conversions</h2>
    <p>
      Adjustable-rate mortgages (ARMs) typically start below fixed rates for the first 5-10
      years, then reset based on a benchmark. When the fixed period is ending and rates have
      risen, refinancing to a fixed locks in predictability. When fixed rates have dropped
      below your ARM&rsquo;s fixed period, refinancing locks in permanent savings. In a
      rising-rate environment, being early on this decision is worth a lot.
    </p>

    <h2>8. FHA to conventional once you have equity</h2>
    <p>
      FHA loans carry mortgage insurance premium (MIP) for the life of the loan if you put
      less than 10% down. Once you&rsquo;ve built 20% equity, refinancing to a conventional
      loan drops the MIP &mdash; often saving $150-300/month regardless of the rate change.
      Run this check whenever your home has appreciated meaningfully.
    </p>

    <h2>9. Your credit and DTI matter</h2>
    <p>
      Lenders qualify refinances roughly the same way they qualify new mortgages. Minimum
      thresholds:
    </p>
    <ul>
      <li>FICO 620+ for conventional (740+ gets the best rates)</li>
      <li>DTI &lt; 43% (under 36% is ideal)</li>
      <li>20% equity for no PMI (less for FHA/VA)</li>
      <li>2+ years of stable income documentation</li>
    </ul>
    <p>
      If your finances have deteriorated since the original loan, you may not qualify for a
      better rate than you already have.
    </p>

    <h2>10. The &ldquo;no-closing-cost&rdquo; option</h2>
    <p>
      Lenders will sometimes absorb closing costs in exchange for a slightly higher rate
      (typically 0.25-0.5% higher) or by rolling costs into the loan balance. Makes sense
      when:
    </p>
    <ul>
      <li>You don&rsquo;t plan to stay long enough to earn back upfront costs</li>
      <li>You don&rsquo;t have cash on hand for closing</li>
      <li>You expect rates to drop again and may refi again soon</li>
    </ul>
    <p>
      Do the comparison both ways — with costs paid upfront and bundled — and check the
      all-in 5-year total.
    </p>

    <h2>11. Timing and rate locks</h2>
    <p>
      Mortgage rates can move 0.125-0.25% in a day. When you apply, lock your rate for 30-60
      days. Longer locks cost fractionally more. Don&rsquo;t try to time the bottom; if the
      math works at today&rsquo;s rate, close. If rates drop another 0.5% later, you can
      refi again.
    </p>

    <h2>12. Common mistakes</h2>
    <ul>
      <li>
        <strong>Ignoring closing costs.</strong> A &ldquo;lower rate&rdquo; with $15k in
        costs isn&rsquo;t free.
      </li>
      <li>
        <strong>Extending the term without thinking.</strong> 7 years of progress erased to
        save $200/month.
      </li>
      <li>
        <strong>Cashing out for lifestyle.</strong> Turning unsecured lifestyle spending
        into secured mortgage debt.
      </li>
      <li>
        <strong>Refinancing close to a move.</strong> Not hitting break-even means lighting
        the closing costs on fire.
      </li>
      <li>
        <strong>Not shopping lenders.</strong> Rate and cost quotes can vary by 0.5%+ for
        the same borrower. Get 3-5 loan estimates.
      </li>
    </ul>

    <h2>13. Run the numbers</h2>
    <p>
      Enter your current balance, rate, and remaining term, plus the offered new rate and
      closing costs, to see your exact break-even month and lifetime savings.
    </p>
    <p>
      <a href="/tools/refinance-calculator">Refinance calculator</a>
      <a href="/tools/mortgage-calculator">Mortgage calculator</a>
      <a href="/tools/loan-calculator">Loan calculator</a>
    </p>
  </>
);
