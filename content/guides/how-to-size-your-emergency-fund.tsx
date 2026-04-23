import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      An emergency fund is the lowest-tech, highest-value piece of personal finance. The
      classic rule is <strong>3-6 months of essential expenses</strong> in a liquid, low-risk
      account, ready to absorb a job loss, medical bill, or major repair without forcing
      you into credit card debt or selling investments at the wrong time. Most people either
      skip this step entirely (relying on credit) or overcorrect and park 2 years of
      spending in savings earning nothing. This guide walks through how much you actually
      need, what counts as an &ldquo;expense,&rdquo; where to keep the money, and how to
      build it up without freezing your other goals.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. Why an emergency fund comes before almost everything else</h2>
    <p>
      A Federal Reserve survey found that <strong>~35% of US adults</strong> can&rsquo;t
      cover an unexpected $400 expense without borrowing. When the car breaks down,
      that&rsquo;s a 20%+ credit card at minimum, or a payday loan at 400%+ APR. Those
      interest rates eclipse any investment return you&rsquo;d have earned by skipping the
      fund. Emergency savings is defensive capital: its job isn&rsquo;t to grow, it&rsquo;s
      to keep the rest of your finances from collapsing when life happens.
    </p>

    <h2>2. The 3-6 month rule</h2>
    <p>
      Aim for 3-6 months of <strong>essential</strong> monthly expenses:
    </p>
    <ul>
      <li>Single-income household, stable W-2: 3 months</li>
      <li>Dual-income, both stable: 3 months</li>
      <li>Single parent, one income, young kids: 6 months</li>
      <li>Self-employed, freelance, commission: 6-9 months</li>
      <li>Near retirement, approaching fixed income: 6-12 months</li>
      <li>High-income but volatile (tech, sales, startup): 6 months</li>
    </ul>

    <h2>3. What counts as an &ldquo;essential expense&rdquo;</h2>
    <p>
      Only the expenses you&rsquo;d still need to pay if you lost your job tomorrow:
    </p>
    <ul>
      <li>Rent or mortgage (not extra principal)</li>
      <li>Utilities, internet (basic tier)</li>
      <li>Groceries (normal, not pared down)</li>
      <li>Insurance: health, auto, home/renters</li>
      <li>Transportation: fuel, transit, car insurance</li>
      <li>Minimum debt payments (not extra payoff)</li>
      <li>Childcare (if required for job search)</li>
      <li>Phone</li>
    </ul>
    <p>
      Exclude: dining out, subscriptions you&rsquo;d cancel, travel, gym memberships,
      discretionary shopping, retirement contributions.
    </p>

    <h2>4. A worked example</h2>
    <pre>{`Rent:            $1,800
Utilities/phone:   $250
Groceries:         $600
Insurance:         $350
Transport:         $200
Min debt pmts:     $300
Subtotal:        $3,500

3-month fund:  $10,500
6-month fund:  $21,000`}</pre>
    <p>
      The essential number is almost always lower than your actual current spend. Many
      people confuse &ldquo;months of lifestyle&rdquo; with &ldquo;months of survival.&rdquo;
    </p>

    <h2>5. Where to keep it</h2>
    <p>
      Emergency savings should be <strong>liquid</strong> (accessible within 1-2 business
      days), <strong>safe</strong> (no principal risk), and <strong>earning something</strong>.
      Best options in 2026:
    </p>
    <ul>
      <li>High-yield savings account (HYSA): 4-5% APY, FDIC insured</li>
      <li>Money market fund: similar yield, brokerage-held</li>
      <li>Short-term Treasury bills (4-26 weeks): state-tax-exempt</li>
      <li>I-bonds for a portion (after 12-month lockup)</li>
    </ul>
    <p>
      Avoid: CDs longer than 3 months, bond funds with duration risk, stocks, crypto. The
      goal is stability, not yield optimization.
    </p>

    <h2>6. Where <em>not</em> to keep it</h2>
    <ul>
      <li>Checking account: no interest, too tempting to tap</li>
      <li>Regular brokerage in stocks: could drop 40% right when you need it</li>
      <li>Physical cash: no interest, fire/theft risk, hard to deploy</li>
      <li>Crypto: volatile and poorly insured</li>
      <li>401(k) or IRA: penalties and delays when accessing early</li>
    </ul>

    <h2>7. Build it in stages</h2>
    <p>
      Don&rsquo;t try to front-load 6 months before doing anything else. Sensible progression:
    </p>
    <ol>
      <li>$1,000 starter fund (covers most small emergencies)</li>
      <li>Pay off any credit card debt &gt; 10% APR</li>
      <li>1-month fund</li>
      <li>Full employer 401(k) match</li>
      <li>3-month fund</li>
      <li>Max Roth IRA, build to 6-month fund</li>
    </ol>
    <p>
      The starter $1k stops most emergencies from becoming debt while you&rsquo;re still
      paying off existing high-interest debt.
    </p>

    <h2>8. The &ldquo;HELOC as emergency fund&rdquo; shortcut</h2>
    <p>
      Homeowners sometimes argue: &ldquo;I don&rsquo;t need a cash fund, I have a $100k home
      equity line.&rdquo; This fails in the exact scenarios an emergency fund is built for
      — banks tend to freeze or reduce HELOC availability during recessions, right when
      jobs are being cut. <strong>Don&rsquo;t rely on credit for emergencies</strong>.
      A line of credit can be a supplement, not a substitute.
    </p>

    <h2>9. When to use the fund (and when not to)</h2>
    <p>
      Legitimate uses: unexpected medical bill, job loss, major car or home repair that
      can&rsquo;t wait, travel for a family emergency.
    </p>
    <p>
      Not legitimate: vacation, new TV, annual insurance premium (that&rsquo;s a sinking
      fund, separate), &ldquo;it&rsquo;s on sale.&rdquo; If you use it, rebuild immediately.
    </p>

    <h2>10. Separate sinking funds for known expenses</h2>
    <p>
      Annual insurance, car maintenance, holiday gifts, and home repairs are foreseeable.
      Don&rsquo;t drain the emergency fund for them &mdash; build sinking funds (separate
      savings buckets for each category, funded monthly). This keeps the emergency fund
      reserved for real emergencies and prevents &ldquo;it always happens&rdquo; expenses
      from feeling like shocks.
    </p>

    <h2>11. Recalibrating annually</h2>
    <p>
      Your essential monthly expenses change: new apartment, new baby, paid-off car.
      Re-run the math once a year. If rent went up $200/month, your 6-month target went up
      $1,200. Conversely, a major debt payoff can reduce your monthly need.
    </p>

    <h2>12. Common mistakes</h2>
    <ul>
      <li>
        <strong>Calculating on full spending, not essentials.</strong> You can cut dining
        out during a job loss. 6 months of lifestyle is usually overkill.
      </li>
      <li>
        <strong>Keeping it in checking.</strong> 0% yield costs you $500-1,000/year on a
        healthy fund, and spending leaks are more likely.
      </li>
      <li>
        <strong>Investing it in stocks.</strong> Sequence-of-returns risk is maximal when
        the money is small and you need it most.
      </li>
      <li>
        <strong>Never rebuilding.</strong> After an emergency, the priority shifts back to
        replenishing before resuming other goals.
      </li>
      <li>
        <strong>Calling credit an emergency fund.</strong> Credit evaporates when the
        economy sours.
      </li>
    </ul>

    <h2>13. Run the numbers</h2>
    <p>
      Plug in your essential monthly expenses and target months to get a precise savings
      goal, then model how long it&rsquo;ll take to build at your current savings rate.
    </p>
    <p>
      <a href="/tools/emergency-fund-calculator">Emergency fund calculator</a>
      <a href="/tools/budget-calculator">Budget calculator</a>
      <a href="/tools/savings-goal-calculator">Savings goal calculator</a>
    </p>
  </>
);
