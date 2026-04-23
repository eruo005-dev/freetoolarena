import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A Roth IRA is arguably the best tax-advantaged account the US tax code offers to
      middle-income savers. You contribute after-tax dollars; from that point forward, every
      dollar of growth and every qualified withdrawal is tax-free for life. The 2026
      contribution limit is <strong>$7,500</strong> (or $8,500 if 50+). The catch: income
      phase-outs cap who can contribute directly, contributions must come from earned income,
      and a 5-year rule affects when earnings become penalty-free. This guide covers direct
      contributions, the backdoor Roth strategy, the 5-year rules, withdrawal flexibility,
      and how to slot a Roth IRA into the rest of your retirement stack.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. The 2026 contribution limit</h2>
    <ul>
      <li>Under 50: <strong>$7,500</strong></li>
      <li>50+: <strong>$8,500</strong> (includes $1,000 catch-up)</li>
      <li>Spousal: non-working spouse can contribute using working spouse&rsquo;s income</li>
    </ul>
    <p>
      You have until April 15 of the following year to contribute for the prior tax year.
      Contribute early in the year if you can — more time in the market.
    </p>

    <h2>2. Income phase-outs for 2026</h2>
    <p>
      Roth IRA eligibility phases out at higher incomes, based on Modified Adjusted Gross
      Income (MAGI):
    </p>
    <ul>
      <li><strong>Single:</strong> full contribution up to $150k, phased out by $165k</li>
      <li><strong>Married filing jointly:</strong> full up to $236k, phased out by $246k</li>
      <li><strong>Married filing separately:</strong> phases out from $0-10k (effectively ineligible)</li>
    </ul>
    <p>
      Above these thresholds, direct contributions aren&rsquo;t allowed. That&rsquo;s where
      the backdoor Roth comes in.
    </p>

    <h2>3. The backdoor Roth for high earners</h2>
    <p>
      A legal workaround for taxpayers above the phase-out:
    </p>
    <ol>
      <li>Contribute $7,500 (non-deductible) to a traditional IRA</li>
      <li>Convert the traditional IRA to a Roth IRA</li>
      <li>File Form 8606 reporting the non-deductible basis</li>
    </ol>
    <p>
      <strong>Pro-rata rule warning:</strong> if you have any pre-tax money in traditional,
      SEP, or SIMPLE IRAs, the conversion is taxed proportionally. Before executing, roll
      pre-tax IRA balances into your current 401(k) so the conversion is clean.
    </p>

    <h2>4. The mega backdoor Roth</h2>
    <p>
      If your 401(k) allows after-tax contributions and in-service distributions, you can
      contribute up to the combined $70k limit, then convert the after-tax portion to a
      Roth IRA. Potentially $30k-$40k/year of extra Roth space. Check your plan document
      for &ldquo;after-tax&rdquo; contributions (not to be confused with Roth 401(k)) and
      in-plan conversions.
    </p>

    <h2>5. The 5-year rules (there are two)</h2>
    <p>
      <strong>Rule 1: Earnings</strong>. To withdraw earnings tax-free and penalty-free, the
      Roth IRA must have been open for 5 years AND you must be 59&frac12;+.
    </p>
    <p>
      <strong>Rule 2: Conversions</strong>. Each Roth conversion has its own 5-year clock.
      Withdrawing converted amounts within 5 years triggers a 10% penalty (under 59&frac12;).
    </p>
    <p>
      Contributions themselves can always be withdrawn tax-free and penalty-free at any age,
      any time.
    </p>

    <h2>6. Withdrawal flexibility</h2>
    <p>
      Because you&rsquo;ve already paid tax on contributions, the IRS lets you pull them out
      with no tax or penalty, anytime, for any reason. This makes the Roth IRA a de facto
      backup emergency fund for many savers. <em>Don&rsquo;t</em> use it casually &mdash;
      you can&rsquo;t put that space back &mdash; but knowing the optionality is there makes
      it easier to contribute aggressively.
    </p>

    <h2>7. Roth IRA vs Roth 401(k)</h2>
    <ul>
      <li>IRA has much broader investment options (any ETF, stock, mutual fund)</li>
      <li>IRA has no RMDs; Roth 401(k) RMDs were eliminated in 2024 too</li>
      <li>401(k) has higher contribution limits ($24k vs $7.5k)</li>
      <li>401(k) gets employer match; IRA doesn&rsquo;t</li>
      <li>IRA has income phase-out; 401(k) doesn&rsquo;t</li>
    </ul>
    <p>
      Use both. 401(k) Roth for higher limits and match; IRA Roth for investment flexibility.
    </p>

    <h2>8. Who wins most from a Roth</h2>
    <ul>
      <li>Young earners with decades of tax-free compounding ahead</li>
      <li>Workers early in career whose income will rise</li>
      <li>Retirees wanting tax diversification against future rate increases</li>
      <li>Those who want to pass tax-free assets to heirs</li>
      <li>Anyone expecting Social Security income to push them into higher brackets</li>
    </ul>

    <h2>9. Tax diversification in retirement</h2>
    <p>
      An all-traditional retirement portfolio leaves you exposed to future tax rate
      increases. An all-Roth portfolio wasted deductions during peak earning years. The
      ideal ratio is <strong>roughly 60-70% traditional, 30-40% Roth</strong> for most
      mid-career workers — gives flexibility to manage taxable income in retirement by
      choosing which account to draw from each year.
    </p>

    <h2>10. Contribution timing and dollar-cost averaging</h2>
    <p>
      You can contribute any time from January 1 to April 15 of the following year. Options:
    </p>
    <ul>
      <li>Lump sum on January 1: most time in market, historically wins ~65% of the time</li>
      <li>Monthly ($625/month in 2026): smoother emotionally, slightly lower expected return</li>
      <li>Windfall: lump sum when you have it</li>
    </ul>
    <p>
      All three beat the default of &ldquo;I&rsquo;ll get to it later.&rdquo;
    </p>

    <h2>11. First-time homebuyer exception</h2>
    <p>
      Up to $10,000 of Roth IRA earnings can be withdrawn penalty-free (and tax-free if 5+
      years in) for a first-time home purchase. Combined with the always-available return
      of contributions, a long-held Roth IRA can fund a significant portion of a down
      payment without penalties.
    </p>

    <h2>12. Common mistakes</h2>
    <ul>
      <li>
        <strong>Missing the contribution deadline.</strong> April 15 is a hard cutoff for the
        prior tax year.
      </li>
      <li>
        <strong>Contributing without earned income.</strong> Roth requires W-2 or 1099
        compensation. A retired spouse can only use the working spouse&rsquo;s income.
      </li>
      <li>
        <strong>Triggering the pro-rata rule accidentally.</strong> Attempting a backdoor Roth
        with existing pre-tax IRA balances.
      </li>
      <li>
        <strong>Leaving the cash uninvested.</strong> Brokerages don&rsquo;t auto-invest
        contributions. Buy ETFs or target-date funds after each deposit.
      </li>
      <li>
        <strong>Raiding contributions casually.</strong> The tax-free space you lose
        can&rsquo;t be replaced, even if you pay back the dollars.
      </li>
    </ul>

    <h2>13. Run the numbers</h2>
    <p>
      Enter your age, contribution rate, and expected return to see the Roth&rsquo;s growth
      under compound tax-free growth, and compare against a taxable account.
    </p>
    <p>
      <a href="/tools/roth-ira-calculator">Roth IRA calculator</a>
      <a href="/tools/401k-calculator">401k calculator</a>
      <a href="/tools/retirement-calculator">Retirement calculator</a>
    </p>
  </>
);
