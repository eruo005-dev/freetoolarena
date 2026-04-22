import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      How much house you can afford isn&rsquo;t the number a lender will
      approve you for — it&rsquo;s the number that leaves your budget alive
      after closing. Lenders approve you based on gross income and debt
      ratios; they don&rsquo;t see childcare, 401k contributions, or the
      fact that you&rsquo;d like to eat out occasionally. This guide walks
      through the 28/36 rule, why maxing your approval is usually a
      mistake, and how to pressure-test a specific listing against a real
      take-home budget.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The 28/36 rule</h2>
    <p>
      The lending industry&rsquo;s rule of thumb: housing costs (full PITI
      — principal, interest, taxes, insurance) should be ≤{" "}
      <strong>28% of gross monthly income</strong>, and total debt
      (housing + car + student loans + minimums on credit cards) should be
      ≤ <strong>36% of gross monthly income</strong>.
    </p>
    <p>
      Example: $120,000/year gross = $10,000/month. 28% → $2,800 max PITI.
      36% → $3,600 total debt. If you already pay $500 on a car loan and
      $200 on student loans, your real housing ceiling is $3,600 − $700 =
      $2,900. Housing ceiling wins over 28% when the back-end ratio is
      tighter.
    </p>

    <h2>Gross vs net — the FIRE-community correction</h2>
    <p>
      28% of gross ignores that taxes, insurance premiums, and retirement
      contributions don&rsquo;t show up in your checking account. A more
      conservative version: <strong>housing ≤ 25% of net take-home pay.</strong>{" "}
      That&rsquo;s the rule personal-finance writers default to, and it
      corresponds roughly to 20–22% of gross depending on your tax
      bracket. Use net if you value cash flow stability over leverage.
    </p>

    <h2>From monthly payment to purchase price</h2>
    <p>
      Given a target PITI, work backwards. At 6.5% for 30 years, a $2,800
      PITI target breaks down like this: back out taxes ($400/mo at 1.2%
      effective rate on a $400k home = $400) and insurance ($125/mo).
      Remaining P&amp;I budget: $2,800 − $400 − $125 = $2,275.
    </p>
    <p>
      $2,275/mo of principal+interest at 6.5% × 30 years supports about{" "}
      <strong>$360,000 in mortgage.</strong> Add your down payment (say 20%
      = $90,000) to get a purchase price of <strong>$450,000.</strong> That&rsquo;s
      the house you can afford at a $2,800 PITI target on $120k/year gross.
    </p>

    <h2>Why lender pre-approval is higher than this</h2>
    <p>
      Lenders often approve at 43% DTI (&ldquo;qualified mortgage&rdquo;
      limit) or higher. On $120k gross, that&rsquo;s $4,300/mo of total
      debt — a PITI approaching $3,800 after existing debts. Taking that
      approval buys you a bigger house and a life with zero financial
      margin. You&rsquo;ll be house-rich, cash-poor, and one layoff from
      panic. The rule of thumb exists because the regression of foreclosure
      rates against DTI gets ugly past 28/36.
    </p>

    <h2>The stress tests to actually run</h2>
    <p>
      Before falling in love with a listing, stress-test against three
      scenarios:
    </p>
    <p>
      <strong>(1) Single-income scenario.</strong> If this is a
      dual-income household, can one income cover PITI for 3 months
      without draining savings? If no, you&rsquo;re over-extended.
    </p>
    <p>
      <strong>(2) Rate-reset scenario.</strong> If the rate were 1% higher
      than today&rsquo;s offer, does the payment still fit? (Relevant for
      ARMs, less for fixed.)
    </p>
    <p>
      <strong>(3) Maintenance year.</strong> Add 1% of home value per year
      as expected maintenance. On a $450k home, that&rsquo;s $4,500 ≈
      $375/mo you should be saving into a house-repair fund. PITI + $375
      should still fit.
    </p>

    <h2>The 28% trap in high-cost markets</h2>
    <p>
      In San Francisco, Manhattan, Boston, or Seattle, strict 28% is often
      impossible for first-time buyers — median house price / median income
      ratios exceed 10 in some markets. If you have to break 28%, at least:
      (a) have 6+ months of emergency fund liquid, (b) carry no other
      consumer debt, and (c) plan to stay 5+ years so you don&rsquo;t eat
      transaction costs on forced sale.
    </p>

    <h2>Down payment, PMI, and the 20% shortcut</h2>
    <p>
      20% down avoids PMI (private mortgage insurance, 0.3–1.5% of loan per
      year). On a $360k mortgage at 0.8% PMI, that&rsquo;s $2,880/year or
      $240/mo — dropped entirely at 20% down. Many buyers skip the 20%
      target to get into a house sooner; that&rsquo;s fine, but understand
      PMI adds to your real PITI. Remove it at 20% LTV by refinancing or
      requesting removal (by law, it auto-drops at 22% LTV).
    </p>

    <h2>Closing costs — the budget hit most first-timers miss</h2>
    <p>
      Closing costs run <strong>2–5% of purchase price</strong>: lender
      fees, title insurance, escrow setup, attorney (in some states),
      prepaid interest and taxes. On a $450k house, budget $9k–$22k cash
      above your down payment. First-time buyer programs sometimes cover
      some of this; ask your agent.
    </p>

    <h2>Run the full affordability pass</h2>
    <p>
      Start with the{" "}
      <a href="/tools/mortgage-affordability-calculator">mortgage
      affordability calculator</a> to get your 28/36 ceiling, then plug the
      specific listing into the{" "}
      <a href="/tools/mortgage-calculator">mortgage calculator</a> to see
      real PITI. Cross-check against your actual spending in the{" "}
      <a href="/tools/budget-calculator">budget calculator</a> — the goal
      is a PITI that fits inside the life you already have, not one that
      forces the life you already have to shrink to fit.
    </p>
  </>
);
