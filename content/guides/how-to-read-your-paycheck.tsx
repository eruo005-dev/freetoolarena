import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A paycheck has about a dozen line items on it and most people only
      look at the bottom number. That&rsquo;s how you end up surprised at
      tax time, or missing that HR is deducting too much for your health
      plan, or under-contributing to your 401(k) without knowing. This
      guide walks through every line on a typical US pay stub, what&rsquo;s
      fixed vs adjustable, and how to spot the three most common errors.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Gross vs net — the basic structure</h2>
    <p>
      <strong>Gross pay</strong> is what you earn before any deductions.
      Salary ÷ pay periods, or hourly rate × hours worked. This is what
      your offer letter advertised.
    </p>
    <p>
      <strong>Net pay</strong> is what lands in your bank account.
      Gross pay minus taxes minus pre-tax benefits minus post-tax
      deductions. Almost everyone nets 60–75% of gross depending on state
      and benefit load.
    </p>

    <h2>Pre-tax deductions (reduce your taxable income)</h2>
    <p>
      These come out <em>before</em> federal income tax is calculated, so
      they also reduce your tax bill:
    </p>
    <p>
      <strong>401(k) / 403(b) contributions.</strong> Up to $23,000/year
      (2024–25, more if 50+). Every $1,000 you contribute saves about
      $220–$350 in federal tax at typical middle-class rates.
    </p>
    <p>
      <strong>Traditional IRA</strong> contributions (if deducted via
      payroll) — same mechanic. Roth IRAs are post-tax.
    </p>
    <p>
      <strong>Health insurance premium.</strong> Most employer health
      plans are pre-tax. Typical family premium: $150–$400/paycheck.
    </p>
    <p>
      <strong>HSA / FSA</strong> contributions if you have a HDHP. HSAs
      are triple-tax-advantaged — best deal in the US tax code, fund it
      fully if eligible.
    </p>
    <p>
      <strong>Commuter benefits, dependent care FSA, etc.</strong> Less
      common but pre-tax.
    </p>

    <h2>Tax line items</h2>
    <p>
      <strong>Federal income tax withholding.</strong> Based on what you
      put on your W-4. The form looks confusing but the basic version is:
      married-filing-jointly with no other income? Fill out just
      name/SSN/signature. Anything more complex needs the worksheet or
      IRS withholding estimator.
    </p>
    <p>
      <strong>Social Security (FICA): 6.2%</strong> up to the annual cap
      ($168,600 in 2024). Non-negotiable, everyone pays the same rate.
    </p>
    <p>
      <strong>Medicare: 1.45%</strong> with no cap. An additional 0.9%
      kicks in above $200k single / $250k joint.
    </p>
    <p>
      <strong>State income tax withholding.</strong> Varies wildly — 0%
      in TX/FL/WA/NV/SD/WY/AK/TN/NH, up to ~13% top marginal in CA.
    </p>
    <p>
      <strong>Local / city tax.</strong> NYC, Philadelphia, San Francisco,
      and many Ohio/Pennsylvania cities have their own income tax on top.
    </p>
    <p>
      <strong>State disability insurance (SDI)</strong> in CA/NY/NJ/RI/HI
      only. Usually 0.5–1% of gross.
    </p>

    <h2>Post-tax deductions (after federal tax is calculated)</h2>
    <p>
      <strong>Roth 401(k) / Roth IRA</strong> contributions — taxes paid
      now, withdrawals tax-free later.
    </p>
    <p>
      <strong>Supplemental life insurance, critical illness, pet
      insurance.</strong> Usually small.
    </p>
    <p>
      <strong>Garnishments</strong> — child support, student loan default,
      IRS collection — legally required, take precedence over anything
      voluntary.
    </p>
    <p>
      <strong>ESPP</strong> (employee stock purchase plan). Up to 15% of
      gross, bought at a discount, a good deal at most companies. Post-tax.
    </p>

    <h2>The three most common pay-stub errors</h2>
    <p>
      <strong>(1) Wrong state withholding.</strong> If you moved mid-year
      or work remote in a different state than you live, HR sometimes
      withholds in the wrong state. You&rsquo;ll see it on line 17 of
      your W-2 next January. Catch it early by verifying the state code
      on each paystub.
    </p>
    <p>
      <strong>(2) Missing 401(k) match.</strong> Check the employer match
      line. If your company matches 3–6% and it&rsquo;s not appearing,
      HR configured something wrong. Match is free money — worth a
      5-minute email.
    </p>
    <p>
      <strong>(3) Incorrect withholding from W-4.</strong> The new W-4
      form (2020+) is confusing. A common error: not accounting for a
      working spouse, causing massive under-withholding. Run the IRS
      withholding estimator once a year.
    </p>

    <h2>The year-to-date (YTD) columns</h2>
    <p>
      Every paystub shows year-to-date totals alongside this-period.
      These help you answer:
    </p>
    <p>
      <strong>Am I on track to hit the 401(k) limit?</strong> YTD
      contributions × (52 / pay periods elapsed) = projected annual.
      Compare to the $23,000 limit.
    </p>
    <p>
      <strong>Have I hit the Social Security cap?</strong> Once YTD
      gross crosses $168,600, SS withholding drops to zero for the rest
      of the year — your net pay goes up by 6.2%. Nice surprise in
      November/December for high earners.
    </p>
    <p>
      <strong>Is my federal withholding on pace?</strong> YTD federal ÷
      YTD gross should roughly match your effective tax rate. If it&rsquo;s
      way under, you&rsquo;ll owe at tax time. Way over = big refund,
      which means you loaned the government money interest-free.
    </p>

    <h2>The net-check math for a real paycheck</h2>
    <p>
      Single, $80,000 salary, biweekly (26 checks), contributing 10% to
      401(k), $150 health premium, California.
    </p>
    <p>
      Gross/check: $3,077. 401(k): −$308. Health: −$150. Taxable:
      $2,619. Federal withholding: ~$290. FICA: $191 + $45 = $236.
      CA income tax: ~$105. SDI: $15. Net: <strong>$1,973/check</strong>{" "}
      (~64% of gross).
    </p>

    <h2>Run yours</h2>
    <p>
      Plug your salary + state + 401(k) percent into the{" "}
      <a href="/tools/paycheck-calculator">paycheck calculator</a> to
      estimate net pay per check. Cross-check with the{" "}
      <a href="/tools/hourly-rate-calculator">hourly rate calculator</a>{" "}
      if you want to sanity-check what an hourly job pays in annual
      take-home terms, and pair with the{" "}
      <a href="/tools/budget-calculator">budget calculator</a> once you
      know your real net — budgeting against gross is the most common way
      to feel mysteriously broke every month.
    </p>
  </>
);
