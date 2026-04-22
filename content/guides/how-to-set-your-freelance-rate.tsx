import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Setting a freelance rate by looking at what competitors charge and
      shaving 20% is how most freelancers end up underpaid and
      overbooked. A proper rate is <strong>back-solved from the income
      you need</strong>, adjusted for the taxes, benefits, overhead, and
      non-billable time that freelancing adds. This guide walks through
      the five inputs, the formula, sanity checks against market, and
      when (and how) to raise your rate.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The 5-input formula</h2>
    <p>
      <strong>Freelance rate = (Target take-home + taxes + benefits +
      overhead) / billable hours per year</strong>
    </p>
    <p>
      <strong>(1) Target take-home</strong> — what you want to keep
      after taxes. &ldquo;I want to net $80,000/year&rdquo; is a
      concrete starting point.
    </p>
    <p>
      <strong>(2) Taxes</strong> — in the US, self-employment tax is
      15.3% plus federal + state income tax. Expect 25–35% total for
      most earners, higher in high-tax states. Multiply target net by
      ~1.4 for gross.
    </p>
    <p>
      <strong>(3) Benefits</strong> — what a W-2 employer would have
      paid for you. Health insurance ($6–20k/year family), retirement
      match ($3–10k), PTO + sick + holidays (3–5 weeks&rsquo; worth).
      Total: typically $15–25k/year for a solo freelancer.
    </p>
    <p>
      <strong>(4) Overhead</strong> — software, subscriptions,
      equipment, office, accountant, LLC fees, marketing. Usually
      $3–15k/year.
    </p>
    <p>
      <strong>(5) Billable hours per year</strong> — this is the one
      most people get wrong. 40 hours/week × 50 weeks = 2,000 sounds
      right, but <strong>only 50–70% of your working hours are
      billable</strong>. Admin, sales, proposals, invoicing,
      follow-up, prospecting, skill-building, and downtime between
      clients eat the rest. A realistic billable target is{" "}
      <strong>1,000–1,400 hours/year</strong>.
    </p>

    <h2>A worked example</h2>
    <p>
      Target: $80k net take-home. Health insurance + retirement +
      PTO-equivalent: $20k. Overhead: $5k. Taxes: 30% total.
    </p>
    <p>
      Gross needed = ($80,000 + $20,000 + $5,000) / (1 − 0.30) =
      $150,000/year.
    </p>
    <p>
      Billable hours at 65% of a 2,000-hour year = 1,300 hours.
    </p>
    <p>
      Rate = $150,000 / 1,300 = <strong>$115/hour</strong>.
    </p>
    <p>
      That&rsquo;s what you&rsquo;d need to charge to match a W-2 job
      at $80k net — not &ldquo;equivalent&rdquo; to the old salary, but
      producing the same lived income after all the freelance
      overhead.
    </p>

    <h2>Why you&rsquo;re probably charging too little</h2>
    <p>
      Three traps common in first-time freelancers:
    </p>
    <p>
      <strong>Trap 1: Quoting your old W-2 hourly.</strong> $40/hour as
      a salaried employee ≈ $83k gross salary. Quoting $40/hour as a
      freelancer means net take-home of maybe $25–35k — a 50–70% cut,
      because benefits and overhead come out of the same pool now.
    </p>
    <p>
      <strong>Trap 2: Ignoring non-billable time.</strong> You don&rsquo;t
      get paid to send an invoice, do your books, or pitch a prospect.
      But you spend hours on all three.
    </p>
    <p>
      <strong>Trap 3: Racing to the bottom on Upwork/Fiverr.</strong>
      You compete with global labor and clients who select on price,
      not quality. A $20/hour job costs you the same hours as a
      $150/hour job but pays 7.5× less.
    </p>

    <h2>Value-based vs hourly pricing</h2>
    <p>
      Hourly rates cap your earnings at hours in the day. Value-based
      (project or retainer) pricing lets you charge based on impact to
      the client, decoupled from hours.
    </p>
    <p>
      A SaaS client paying you $10k for a week&rsquo;s work that lands
      a $100k enterprise deal is getting a 10× return. That&rsquo;s
      often more palatable to them than $150/hour for 40 hours
      ($6k) — same work, higher price, because the frame is
      outcome-for-money instead of time-for-money.
    </p>
    <p>
      Start hourly to calibrate what your time is worth, then shift to
      project pricing as your work gets predictable enough to estimate
      accurately. &ldquo;Estimate project hours, multiply by 1.3 for
      buffer, quote at your hourly rate, present as flat price&rdquo;
      is a common starter approach.
    </p>

    <h2>Market sanity checks</h2>
    <p>
      Useful reference points to triangulate:
    </p>
    <p>
      <strong>Salary conversion:</strong> Freelance hourly ≈ W-2 salary ÷
      1,000. So $80k W-2 target implies ~$80/hour freelance baseline, and
      something closer to $110–130/hour to match after-benefits. (The
      back-solved formula above is more precise.)
    </p>
    <p>
      <strong>Platforms:</strong> Toptal, Gun.io, A.Team rates give
      upper bounds for vetted remote technical work. For 2024–25:
      senior software engineer $100–200/hour, designer $80–150/hour,
      copywriter $75–200/hour.
    </p>
    <p>
      <strong>Consulting-firm rack rates:</strong> Agencies and firms
      bill 2–4× what they pay staff. If an agency charges $300/hour
      for someone with your skills, charging $150 as an independent
      isn&rsquo;t aggressive — it&rsquo;s still 50% below market
      while paying you more than the agency employee.
    </p>

    <h2>When and how to raise your rate</h2>
    <p>
      Rule of thumb: raise 10–20% when any of these hit —
    </p>
    <p>
      <strong>Your pipeline is overfull.</strong> If you&rsquo;re
      booking 3 months out, price is too low.
    </p>
    <p>
      <strong>You&rsquo;ve leveled up.</strong> New certification,
      bigger case study, published work, obvious skill improvement.
    </p>
    <p>
      <strong>At least annually.</strong> Inflation alone is 3–5%/year.
      Not raising is a pay cut.
    </p>
    <p>
      The cleanest mechanism: <strong>new rate on new clients
      immediately</strong>, existing clients on contract renewal with
      30 days&rsquo; notice. Most good clients will say yes. A few will
      leave — and that&rsquo;s almost always the price-sensitive
      bottom of your book that should go anyway.
    </p>

    <h2>Deposit and scope-creep protection</h2>
    <p>
      Pricing alone isn&rsquo;t enough — the payment structure matters:
    </p>
    <p>
      <strong>Require 30–50% deposit</strong> before starting any
      project. Non-payers self-select out.
    </p>
    <p>
      <strong>Scope any revisions explicitly.</strong> &ldquo;Two
      rounds of revisions included; additional rounds at $X/hour.&rdquo;
      Without this you get endless ask-for-one-more-thing and your
      effective hourly rate sinks toward zero.
    </p>
    <p>
      <strong>Milestone billing on longer projects</strong> to avoid
      racking up months of receivables with a slow payer.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Plug your target income, tax rate, benefit replacement, and
      billable % into the{" "}
      <a href="/tools/freelance-rate-calculator">freelance rate
      calculator</a> for a precise rate. Pair with the{" "}
      <a href="/tools/hourly-rate-calculator">hourly rate calculator</a>
      {" "}to convert your old W-2 salary to equivalent freelance
      hourly, and the <a href="/tools/invoice-generator">invoice
      generator</a> once you&rsquo;re ready to bill your first
      client.
    </p>
  </>
);
