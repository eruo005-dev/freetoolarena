import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Renting &ldquo;what you can afford&rdquo; depends on whether you&rsquo;re asking your
      landlord, your budget spreadsheet, or your future self. Landlords want to see gross
      income of 3x the monthly rent. Financial planners recommend spending no more than 30%
      of your take-home pay. The 50/30/20 framework bundles rent into the &ldquo;needs&rdquo;
      half of your income. This guide walks through each rule, shows where they disagree,
      and explains why the right number depends on your other fixed costs (student loans,
      car payment, childcare) more than on your salary alone. By the end you&rsquo;ll have
      a rent ceiling that&rsquo;s realistic, not aspirational.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. The 30% rent rule</h2>
    <p>
      The oldest rule of thumb: spend no more than 30% of <strong>gross monthly income</strong>
      on rent. If you earn $72,000/year ($6,000/month gross), the ceiling is $1,800/month.
    </p>
    <pre>{`max rent = gross monthly income × 0.30`}</pre>
    <p>
      This rule was codified in 1969 US housing policy and hasn&rsquo;t been updated. It
      works as a quick sanity check but breaks in high-cost-of-living cities where 40-50%
      is now normal, and in lower-income situations where 30% is crushing.
    </p>

    <h2>2. The net-income version (more realistic)</h2>
    <p>
      A better formulation uses <strong>take-home pay</strong> (after taxes, 401k, health
      insurance):
    </p>
    <pre>{`max rent = net monthly income × 0.30`}</pre>
    <p>
      On that same $72k salary, net pay might be $4,500/month. 30% of net = $1,350/month.
      That&rsquo;s $450/month less than the gross version — and usually closer to what you
      can actually sustain.
    </p>

    <h2>3. The 50/30/20 budget check</h2>
    <p>
      Split your take-home pay:
    </p>
    <ul>
      <li>50% &mdash; needs (rent, utilities, groceries, insurance, minimum debt payments)</li>
      <li>30% &mdash; wants (dining out, entertainment, subscriptions, travel)</li>
      <li>20% &mdash; savings and extra debt payoff</li>
    </ul>
    <p>
      Rent is typically the largest &ldquo;need&rdquo; line. If rent alone eats 35%+ of net
      income, the needs bucket overflows and you&rsquo;ll be stealing from wants or savings
      every month.
    </p>

    <h2>4. The landlord&rsquo;s 3x income requirement</h2>
    <p>
      Most US landlords require gross annual income of at least <strong>40x monthly
      rent</strong>, or monthly gross of <strong>3x rent</strong>. A $2,000/month apartment
      typically requires $6,000/month gross income ($72k/year). Some cities and landlords
      demand 2.5x or even 2x; luxury buildings and NYC often require 40x annual.
    </p>
    <p>
      If you&rsquo;re short, options include a guarantor (someone with 80x income co-signs),
      prepaying several months, or services like Insurent. But if you need these, you
      probably can&rsquo;t truly afford the unit.
    </p>

    <h2>5. Security deposits and move-in costs</h2>
    <p>
      Budget for these as one-time costs at signing:
    </p>
    <ul>
      <li>First month&rsquo;s rent</li>
      <li>Last month&rsquo;s rent (common)</li>
      <li>Security deposit (usually 1 month, sometimes 1.5-2)</li>
      <li>Broker fee (12-15% of annual rent in NYC/Boston)</li>
      <li>Application fee ($30-100)</li>
      <li>Renter&rsquo;s insurance (~$15/month)</li>
    </ul>
    <p>
      Move-in cash for a $2,000 apartment can total $6,000-14,000. Have it saved before you
      start searching.
    </p>

    <h2>6. Include utilities and you&rsquo;ll stop overshooting</h2>
    <p>
      A &ldquo;$1,800 apartment&rdquo; with tenant-paid utilities often runs $2,100-2,300
      all-in. Typical monthly adds:
    </p>
    <ul>
      <li>Electricity: $50-150</li>
      <li>Gas/heat: $30-150 seasonally</li>
      <li>Water/sewer: $30-80</li>
      <li>Internet: $50-80</li>
      <li>Trash: $0-30</li>
      <li>Renters insurance: $15-25</li>
    </ul>
    <p>
      Ask prospective landlords for the prior tenant&rsquo;s average utility bill. Most will
      share it.
    </p>

    <h2>7. High-cost cities break the 30% rule</h2>
    <p>
      In NYC, San Francisco, Boston, Washington DC, and London, median rent-to-income ratios
      are 35-50%. People make it work by: having roommates, forgoing a car, eating in,
      limiting retirement contributions. None of these are free — the &ldquo;savings&rdquo;
      come from somewhere else in the budget. If you&rsquo;re going above 30%, explicitly
      decide which trade-offs you&rsquo;re making.
    </p>

    <h2>8. Fixed-cost adjustments</h2>
    <p>
      The 30% rule assumes typical debt loads. If you have:
    </p>
    <ul>
      <li>Student loans of $500+/month: drop rent target to 25%</li>
      <li>Car payment + insurance $600+: drop to 25%</li>
      <li>Childcare $1,500+: drop to 20-22%</li>
      <li>No debt, no car: can justify 32-35%</li>
    </ul>
    <p>
      Your <strong>debt-to-income ratio</strong> matters as much as your salary. Landlords
      and lenders both look at this.</p>

    <h2>9. Roommates change the math entirely</h2>
    <p>
      Splitting a $2,800 2-bedroom into two $1,400 rooms turns an unaffordable unit into an
      easy one. Do the math on per-person basis, not per-unit. A roommate saves the average
      US renter $500-1,200/month. Over a 2-year lease that&rsquo;s $12,000-29,000.

    </p>

    <h2>10. Rent increases to plan for</h2>
    <p>
      US rents have risen 4-6% annually over the last decade. If you sign at 30% of income
      today, by year 3 you could be at 34%+ if your income is flat. Negotiate a cap in the
      lease (2-3% maximum annual increase) when possible. Or plan to move if the ratio
      blows past your ceiling.
    </p>

    <h2>11. Rent-to-income benchmarks</h2>
    <ul>
      <li>Under 25%: comfortable, leaves room for aggressive savings</li>
      <li>25-30%: healthy, recommended range</li>
      <li>30-35%: tight, requires discipline on other categories</li>
      <li>35-45%: &ldquo;rent-burdened&rdquo; per HUD &mdash; common in HCOL cities</li>
      <li>45%+: severely burdened, one bad month from crisis</li>
    </ul>

    <h2>12. Common mistakes</h2>
    <ul>
      <li>
        <strong>Using gross income when net is what you spend.</strong> Gross overstates
        your rent ceiling by 25-35%.
      </li>
      <li>
        <strong>Forgetting one-time costs.</strong> Brokers fees and deposits can equal 3
        months of rent in cash up front.
      </li>
      <li>
        <strong>Ignoring commute costs.</strong> A cheaper suburb with $300/month in transit
        and parking is sometimes more expensive than a closer-in $200/month upgrade.
      </li>
      <li>
        <strong>Not stress-testing for job loss.</strong> Can you cover rent for 3 months
        from savings? If not, rent less.
      </li>
      <li>
        <strong>Overweighting the unit, underweighting the lease.</strong> Late fees,
        non-refundable deposits, and automatic renewal clauses can cost thousands.
      </li>
    </ul>

    <h2>13. Run the numbers</h2>
    <p>
      Enter your income and debts below to see what you can truly afford — both under the
      30% rule and the stricter needs-based 50/30/20 check.
    </p>
    <p>
      <a href="/tools/apartment-affordability-calculator">Apartment affordability calculator</a>
      <a href="/tools/mortgage-affordability-calculator">Mortgage affordability calculator</a>
      <a href="/tools/budget-calculator">Budget calculator</a>
    </p>
  </>
);
