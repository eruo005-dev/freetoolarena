import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A 401(k) is the single most powerful wealth-building tool available to most US
      workers. Tax-deferred (or tax-free with Roth) growth, employer match, high contribution
      limits, and automatic payroll deduction do more for long-term outcomes than any
      investment selection. The 2026 contribution limit is <strong>$24,000</strong> for
      under-50s and <strong>$31,500</strong> with the 50+ catch-up. Most people leave free
      money on the table by missing the employer match or choosing between traditional and
      Roth without understanding the tradeoff. This guide covers contribution limits, the
      match math, Traditional vs Roth, catch-ups, vesting, and a decision tree for how much
      to put in.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. The 2026 contribution limits</h2>
    <ul>
      <li>Employee elective deferral: <strong>$24,000</strong> (up from $23,500 in 2025)</li>
      <li>50+ catch-up: additional <strong>$7,500</strong> (total $31,500)</li>
      <li>60-63 super catch-up (SECURE 2.0): additional <strong>$11,250</strong></li>
      <li>Combined employee + employer limit: <strong>$70,000</strong> (or $77,500 / $81,250 with catch-ups)</li>
    </ul>
    <p>
      Most employees never hit the combined limit because they don&rsquo;t have 25%+ employer
      matches. But if you do — some tech and finance employers go that high — you can shelter
      up to $70k/year.
    </p>

    <h2>2. The employer match: free money</h2>
    <p>
      The typical match is &ldquo;100% of the first 3%, 50% of the next 2%&rdquo; — a
      4% effective match on a 5% contribution. On a $80,000 salary, that&rsquo;s $3,200/year
      you get for showing up. <strong>Always contribute at least enough to max the match</strong>.
      Not doing so is the equivalent of refusing a 4% raise.
    </p>

    <h2>3. Priority order for retirement contributions</h2>
    <ol>
      <li>401(k) up to the full employer match</li>
      <li>Pay off high-interest debt (credit cards at 20%+)</li>
      <li>Roth IRA up to the annual limit ($7,500 in 2026, $8,500 if 50+)</li>
      <li>HSA to limit if eligible (triple tax advantage)</li>
      <li>401(k) up to the annual elective limit</li>
      <li>Taxable brokerage with index funds</li>
    </ol>
    <p>
      Roth IRA goes before the rest of your 401(k) because it gives you more flexibility:
      broader investment choices and tax-free withdrawal of contributions anytime.
    </p>

    <h2>4. Traditional vs Roth 401(k)</h2>
    <p>
      <strong>Traditional</strong>: contributions are pre-tax, investments grow tax-deferred,
      withdrawals taxed as ordinary income in retirement.
    </p>
    <p>
      <strong>Roth</strong>: contributions are after-tax, growth and qualified withdrawals
      are tax-free.
    </p>
    <p>
      Simple rule: if you expect your tax rate in retirement to be <strong>higher</strong>
      than today, go Roth. If <strong>lower</strong>, go traditional. Young earners early in
      their careers usually win with Roth. Peak-earning mid-career workers usually win with
      traditional. Splitting contributions 50/50 is a reasonable hedge.
    </p>

    <h2>5. The math of pre-tax vs post-tax</h2>
    <pre>{`Traditional: $1,000 pre-tax grows to $10,000 → withdraw at 22% → $7,800 net
Roth:        $780 after-tax grows to $7,800 → withdraw tax-free → $7,800 net`}</pre>
    <p>
      If your marginal rate is the same in both periods, the math is identical. The
      difference comes from <strong>rate differences</strong> between now and retirement.
      Roth also hedges against future tax rate increases — a non-trivial risk given US
      fiscal trajectory.
    </p>

    <h2>6. Vesting schedules</h2>
    <p>
      Your contributions are always 100% yours. Employer matches may be subject to a vesting
      schedule:
    </p>
    <ul>
      <li><strong>Immediate</strong>: yours day one (best)</li>
      <li><strong>Cliff (3 years)</strong>: 0% vested until year 3, then 100%</li>
      <li><strong>Graded (2-6 years)</strong>: 20% per year starting in year 2</li>
    </ul>
    <p>
      Leaving before fully vested forfeits unvested employer money. If you&rsquo;re thinking
      about switching jobs, check your vesting schedule — delaying a jump by 6 months could
      be worth $10k+.
    </p>

    <h2>7. 401(k) loans: usually a bad idea</h2>
    <p>
      Most plans allow loans up to 50% of your balance or $50k (whichever is less). No
      credit check, interest paid back to yourself. But:
    </p>
    <ul>
      <li>Money out of the market misses compound growth</li>
      <li>Must repay within 5 years (or immediately if you leave the job)</li>
      <li>If you default, the outstanding balance is treated as a withdrawal — taxed plus 10% penalty under 59&frac12;</li>
    </ul>
    <p>
      Use only for genuine emergencies with no alternative.
    </p>

    <h2>8. Early withdrawal penalty and exceptions</h2>
    <p>
      Withdrawing before age 59&frac12; triggers a 10% penalty plus ordinary income tax on
      the amount. Exceptions include: SEPP 72(t) substantially equal periodic payments,
      hardship (very narrow definition), first-time home purchase ($10k lifetime), disability,
      and the Rule of 55 (separated from employer in the year you turn 55).
    </p>

    <h2>9. Required minimum distributions (RMDs)</h2>
    <p>
      Traditional 401(k) RMDs start at age 73 (rising to 75 by 2033 under SECURE 2.0). Roth
      401(k) RMDs were eliminated starting in 2024, matching Roth IRA rules. If you have a
      sizable traditional balance, RMDs can push you into higher tax brackets — consider
      Roth conversions in low-income years between retirement and 73.
    </p>

    <h2>10. Investment selection inside the 401(k)</h2>
    <p>
      Most plans offer 15-30 funds. For nearly everyone, the right choice is:
    </p>
    <ul>
      <li>A low-cost <strong>target date fund</strong> matching your expected retirement year, OR</li>
      <li>A 3-fund lazy portfolio: US total market + international + bonds</li>
    </ul>
    <p>
      Check expense ratios. A 1% fee difference compounded over 30 years costs roughly 25%
      of your final balance. Anything over 0.5% deserves scrutiny.
    </p>

    <h2>11. When maxing out is premature</h2>
    <p>
      Don&rsquo;t max the 401(k) if you:
    </p>
    <ul>
      <li>Have credit card debt &gt; 10% APR</li>
      <li>Lack a 3-month emergency fund</li>
      <li>Would be forced to take early withdrawals (10% penalty)</li>
      <li>Have a better match at a job change within 12 months</li>
    </ul>
    <p>
      Match-first is non-negotiable. Beyond the match, other financial priorities often win.
    </p>

    <h2>12. Common mistakes</h2>
    <ul>
      <li>
        <strong>Missing the match.</strong> An estimated 20% of US workers contribute less
        than their employer match.
      </li>
      <li>
        <strong>Leaving money in old 401(k)s at bad plans.</strong> Roll into an IRA or your
        current employer&rsquo;s plan to get better fund options.
      </li>
      <li>
        <strong>Picking target-date fund by current age, not retirement year.</strong>
        Target 2055, not &ldquo;the one with young-sounding date.&rdquo;
      </li>
      <li>
        <strong>Taking a loan for lifestyle spending.</strong> Worst form of liquidating
        retirement savings.
      </li>
      <li>
        <strong>Cashing out when changing jobs.</strong> Small balances get swept out and
        taxed + penalized. Always roll over.
      </li>
    </ul>

    <h2>13. Run the numbers</h2>
    <p>
      Enter your salary, contribution rate, employer match, and years to retirement to see
      what your 401(k) could be worth at 65.
    </p>
    <p>
      <a href="/tools/401k-calculator">401k calculator</a>
      <a href="/tools/roth-ira-calculator">Roth IRA calculator</a>
      <a href="/tools/retirement-calculator">Retirement calculator</a>
    </p>
  </>
);
