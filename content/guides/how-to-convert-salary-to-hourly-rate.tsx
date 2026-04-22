import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Converting an annual salary to an hourly rate sounds like a basic
      division problem. The trick is that the answer depends on what
      you&rsquo;re trying to compare — a recruiter&rsquo;s advertised
      salary, a contract hourly rate, your own freelance billing rate, or
      your take-home pay per working hour. Each uses a different divisor.
      This guide walks through all four, and gives you the back-of-envelope
      rule that usually works in 10 seconds.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The 10-second rule (rough)</h2>
    <p>
      <strong>Divide annual salary by 2,000</strong> to get a rough
      hourly equivalent. $100,000/year ≈ $50/hour. $60,000/year ≈
      $30/hour. Works because a typical full-time year is ~52 weeks ×
      40 hours = 2,080 hours; 2,000 is a cleaner number that also
      approximately nets out 2 weeks of unpaid vacation.
    </p>
    <p>
      Use this for mental math: &ldquo;Is $72k too low for my market?&rdquo;
      → $72k / 2,000 = $36/hour — compare to what you know your hourly
      rate should be.
    </p>

    <h2>Four different hourly equivalents</h2>
    <p>
      <strong>(1) Nominal hourly</strong> = Salary / 2,080. This is what
      HR uses on pay calcs. $75,000 / 2,080 = $36.06/hour.
    </p>
    <p>
      <strong>(2) Working hourly (vacation-adjusted)</strong> = Salary /
      2,000 (or 1,960 if you take a 3-week vacation). Better for
      comparing to contract rates where you don&rsquo;t get paid for
      your vacation weeks. $75,000 / 2,000 = $37.50/hour.
    </p>
    <p>
      <strong>(3) Fully-loaded employer hourly</strong> = Salary + benefits
      (health insurance, 401k match, payroll taxes, PTO) / 2,080. For
      most W-2 jobs, benefits add 25–40% — fully-loaded hourly is typically
      $75,000 × 1.35 / 2,080 = $48.68/hour. This is the number freelancers
      should quote against when replacing W-2 work.
    </p>
    <p>
      <strong>(4) Net take-home hourly</strong> = (Salary − taxes − benefits
      you pay for) / actual hours worked. This is what you actually
      clear per hour spent. For a $75k job in California with 401(k) and
      health premium: about $55,000 net / 2,080 = $26.44/hour of lived
      time, or even less if you count unpaid overtime.
    </p>

    <h2>The freelance / contract math — very different</h2>
    <p>
      If you&rsquo;re going from W-2 employment to freelancing, the
      hourly rate you need to charge is <strong>much higher</strong> than
      the nominal hourly of your old salary. You now cover:
    </p>
    <p>
      <strong>Self-employment tax (15.3%)</strong> where the employer
      used to cover half.
    </p>
    <p>
      <strong>Your own health insurance</strong>, often $8–20k/year for a
      family plan.
    </p>
    <p>
      <strong>Your own retirement contributions</strong> (no match from
      employer).
    </p>
    <p>
      <strong>Vacation, sick time, and holidays</strong> are all unpaid.
    </p>
    <p>
      <strong>Unbillable time</strong> — admin, sales, invoicing,
      follow-up, proposals. 15–40% of a freelancer&rsquo;s working hours
      are non-billable.
    </p>
    <p>
      The rule of thumb: <strong>freelance hourly = W-2 hourly × 1.5 to
      2.0x</strong> to net the same annual take-home with equivalent
      benefits. If you were earning $50/hour on W-2, charge $75–100/hour
      as a contractor.
    </p>

    <h2>The 50-week / 2,000-hour convention — why it&rsquo;s used</h2>
    <p>
      The US salary-to-hourly convention uses 2,080 hours (52 × 40). The
      2,000-hour convention (50 weeks × 40 hours) accounts for 2 weeks
      of vacation and produces cleaner hourly numbers. Europe usually
      uses 1,920 hours (48 × 40) or less, reflecting more vacation.
      Australia uses 1,976 (52 × 38). Check which standard your
      counterparty uses before quoting.
    </p>

    <h2>Going the other direction — hourly to salary</h2>
    <p>
      <code>Annual salary = Hourly × 2,080</code> (full-time) or{" "}
      <code>× (hours/week × 52)</code> for anything less.
    </p>
    <p>
      $40/hour × 2,080 = $83,200/year nominal. Part-time at 25 hours/week:
      $40 × 25 × 52 = $52,000/year.
    </p>

    <h2>The &ldquo;is this offer fair?&rdquo; sanity check</h2>
    <p>
      When evaluating an offer or a freelance project, convert to hourly
      and ask &ldquo;would I accept this as an hourly rate?&rdquo; A
      $60,000/year salary offer for a job with regular 55-hour weeks
      works out to $20.98/hour — possibly below your local market rate
      for the same skill set. The salary number can disguise
      below-market compensation; the hourly rate reveals it.
    </p>

    <h2>Overtime and exempt status complications</h2>
    <p>
      Under US law (FLSA), hourly workers earn time-and-a-half above 40
      hours/week; salaried-exempt workers don&rsquo;t. If you&rsquo;re
      salaried at $75k and working 55-hour weeks, your effective hourly
      is 75,000 / (55 × 52) = $26.22/hour — versus $36/hour on 40-hour
      weeks. The overtime ceiling threshold was $35,568/year federal as
      of 2019, proposed to rise; state rules vary (California:
      ~$66,000/year for most exempt roles).
    </p>

    <h2>Break-even math for taking a contract</h2>
    <p>
      If you&rsquo;re leaving a $100k W-2 job to contract, your contract
      rate needs to cover: (1) the salary, (2) ~35% in benefits you&rsquo;ll
      replace, (3) 10–20% unbillable time, (4) self-employment tax half.
      Rough break-even: $100k × 1.5 / (2,000 × 0.80 billable) = ~$94/hour
      to net out equivalent. If the contract is $75/hour, you&rsquo;re
      taking a pay cut.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Use the <a href="/tools/hourly-rate-calculator">hourly rate
      calculator</a> for the four conversions described above. Pair with
      the <a href="/tools/paycheck-calculator">paycheck calculator</a> if
      you want the net take-home at a specific salary, and the{" "}
      <a href="/tools/freelance-rate-calculator">freelance rate
      calculator</a> for the &ldquo;what should I charge?&rdquo; side of
      contract work — including benefits, unbillable time, and tax
      overhead.
    </p>
  </>
);
