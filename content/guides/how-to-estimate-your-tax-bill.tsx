import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Estimating your federal tax bill before April is the difference
      between a pleasant refund and a surprise five-figure payment. The
      math sounds intimidating but breaks down into six steps that a
      calculator can run in seconds — the hard part is knowing which
      inputs to gather. This guide walks through gross-to-taxable math,
      the marginal-vs-effective-rate confusion that causes bad decisions,
      withholding checks, and when quarterly estimated payments become
      mandatory.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The 6-step calculation</h2>
    <p>
      <strong>(1) Gross income.</strong> Total salary + bonus + freelance +
      interest + dividends + capital gains + side hustle. Everything.
    </p>
    <p>
      <strong>(2) Adjustments (above-the-line deductions).</strong> 401(k),
      traditional IRA, HSA, student loan interest, self-employment tax
      half. Result: <strong>Adjusted Gross Income (AGI).</strong>
    </p>
    <p>
      <strong>(3) Standard or itemized deduction.</strong> 2024–25
      standard: $14,600 single / $29,200 married filing jointly / $21,900
      head of household. Itemize only if your mortgage interest + SALT
      (capped at $10k) + charitable giving exceeds the standard.
    </p>
    <p>
      <strong>(4) Taxable income = AGI − deduction.</strong> This is the
      number brackets are applied to.
    </p>
    <p>
      <strong>(5) Apply brackets</strong> progressively (not all at one
      rate — see below). This is your <strong>tax before credits.</strong>
    </p>
    <p>
      <strong>(6) Subtract credits.</strong> Child Tax Credit, Saver&rsquo;s
      Credit, education credits, EITC. Unlike deductions (which reduce
      taxable income), credits reduce tax directly dollar-for-dollar.
    </p>

    <h2>Marginal vs effective rate — the confusion that kills good decisions</h2>
    <p>
      The US uses <strong>progressive brackets</strong>. Your marginal rate
      is the bracket your last dollar falls into; your effective rate is
      average across all income. Single filer, $120k taxable income (2024):
    </p>
    <p>
      First $11,600 @ 10% = $1,160. Next $35,550 (to $47,150) @ 12% = $4,266.
      Next $53,375 (to $100,525) @ 22% = $11,743. Last $19,475 (to $120,000)
      @ 24% = $4,674. Total: <strong>$21,843.</strong>
    </p>
    <p>
      <strong>Marginal rate: 24%</strong> (bracket of last dollar).{" "}
      <strong>Effective rate: 18.2%</strong> ($21,843 / $120,000). A $1,000
      raise is taxed at 24% (marginal), not 18% (effective). A $1,000
      401(k) contribution saves $240 in tax (marginal), not $182.
    </p>
    <p>
      People who confuse these sometimes refuse raises &ldquo;to avoid the
      next bracket&rdquo; — which is never the right move. A raise always
      leaves you with more take-home, just not by the full amount.
    </p>

    <h2>State tax — the wildly variable add-on</h2>
    <p>
      0% in TX, FL, WA, NV, SD, WY, AK, TN, NH. Flat 4.40% in CO. Tiered
      up to 9.3% in CA (top bracket above $375k kicks 13.3%). New York
      tops out at 10.9% above $25M. Always model state tax separately —
      it can add 0 to 13% on top of federal.
    </p>

    <h2>FICA on top (for employees)</h2>
    <p>
      <strong>Social Security: 6.2%</strong> on wages up to $168,600
      (2024). <strong>Medicare: 1.45%</strong> with no cap. Additional
      0.9% Medicare above $200k single / $250k joint. Employer pays the
      same amount on your behalf. FICA applies to wages only, not
      investment income.
    </p>
    <p>
      <strong>Self-employed: 15.3%</strong> (both halves), deductible as
      half above-the-line. Adds meaningfully to the tax bill for freelance
      and gig workers.
    </p>

    <h2>Common deductions people miss</h2>
    <p>
      <strong>HSA contributions</strong> if you have an HDHP — $4,150
      single / $8,300 family (2024). Triple-tax-advantaged and many
      under-fund it.
    </p>
    <p>
      <strong>Backdoor Roth</strong> for high earners — legitimate when
      done correctly, not a deduction but allows Roth access past the
      income limit.
    </p>
    <p>
      <strong>Home office deduction</strong> for self-employed — either
      simplified ($5/sq ft × up to 300 sq ft) or actual-expense method.
    </p>
    <p>
      <strong>SEP-IRA or Solo 401(k)</strong> for self-employed — much
      higher contribution limits than regular 401(k).
    </p>
    <p>
      <strong>Charitable giving via appreciated securities</strong> —
      deduct FMV without realizing capital gains.
    </p>

    <h2>Withholding — keep refunds small, avoid penalties</h2>
    <p>
      W-2 employees have tax withheld each pay period. Target: withholding
      ≈ total tax owed, leaving you either a small refund (ideal: under
      $1,000) or a small balance due.
    </p>
    <p>
      A $5,000 refund means you loaned the government $5k interest-free.
      That&rsquo;s not a windfall, it&rsquo;s a bad spread.
    </p>
    <p>
      A $5,000 balance due might trigger an <strong>underpayment
      penalty</strong> (currently ~8% annualized). Safe harbor: withhold at
      least 100% of last year&rsquo;s total tax (110% if AGI &gt; $150k), or
      90% of current year&rsquo;s projected tax.
    </p>

    <h2>Quarterly estimated payments — when required</h2>
    <p>
      If you&rsquo;re a 1099 contractor, freelancer, or have significant
      investment income, you need to send quarterly estimated payments
      (Apr 15, Jun 15, Sep 15, Jan 15). Ignore this and you&rsquo;ll owe
      underpayment penalty on top of the tax. Pay using IRS Direct Pay
      (free) or EFTPS.
    </p>

    <h2>The &ldquo;marginal rate decides X&rdquo; rule</h2>
    <p>
      All deduction math (401(k), HSA, charitable) is at marginal rate.
      Roth vs traditional is usually a marginal-rate comparison: traditional
      if current marginal &gt; expected retirement marginal; Roth if the
      reverse.
    </p>

    <h2>Run the numbers before December 31</h2>
    <p>
      Most tax moves (401(k), HSA, charitable, deferred comp, harvesting
      losses) have to be done before year-end. Run the{" "}
      <a href="/tools/tax-calculator">tax calculator</a> in November —
      plug in YTD gross, withholding, and projected full-year gross from
      your pay stub&rsquo;s YTD columns. Cross-check with the{" "}
      <a href="/tools/paycheck-calculator">paycheck calculator</a> to
      verify withholding is on pace, and see our{" "}
      <a href="/guides/how-to-read-your-paycheck">paycheck guide</a> for
      what every line means.
    </p>
  </>
);
