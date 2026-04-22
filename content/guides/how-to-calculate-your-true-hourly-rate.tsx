import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      When a job offer says &ldquo;$50,000 a year,&rdquo; most people
      divide by 2,080 — the annualized hours in a 40-hour week — and get
      $24.04. That&rsquo;s the accounting hourly rate. It&rsquo;s not
      the rate you actually earn. This guide walks through the three
      adjustments that turn headline salary into your real per-hour
      number, and why a job that pays $65k can earn less per hour than
      one that pays $55k.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Start with the naïve number</h2>
    <p>
      Divide the salary by 2,080. A $50,000/yr salary ÷ 2,080 = $24.04/hr.
      This is the number that appears on offer comparison tools and
      LinkedIn. It&rsquo;s also almost always wrong.
    </p>

    <h2>Adjustment 1: Paid time off and holidays</h2>
    <p>
      If you get 2 weeks of PTO plus 10 federal holidays, that&rsquo;s
      20 days you&rsquo;re paid but not working — 160 hours. The real
      hours-worked divisor drops from 2,080 to 1,920.
    </p>
    <p>
      $50,000 ÷ 1,920 = $26.04/hr. The same job where you already took
      every day of PTO earns $2/hr more per hour-worked than the naïve
      calc suggested. A job with 4 weeks of PTO earns still more per
      hour, which is why unlimited-PTO-that-nobody-uses is a bad deal
      even at the same headline salary.
    </p>

    <h2>Adjustment 2: Benefits and employer-paid costs</h2>
    <p>
      Employer-paid benefits should be counted as compensation because
      they&rsquo;d otherwise come out of your pocket. Typical additions:
    </p>
    <p>
      <strong>Health insurance premium</strong> — $6,000–12,000/yr
      depending on coverage tier and family size. <strong>401(k) match</strong>{" "}
      — 3–6% of salary is common, so $1,500–3,000 on a $50k income.{" "}
      <strong>Employer payroll taxes</strong> (7.65% FICA) aren&rsquo;t
      compensation to you but are real hiring cost; ignore them in your
      own rate math. <strong>HSA contributions, life insurance, short-term
      disability</strong> — $500–2,000/yr combined.
    </p>
    <p>
      Add these and a $50k salary becomes a $58–65k total comp package.
      Redo the divisor: $60,000 ÷ 1,920 = $31.25/hr. Now we&rsquo;re at
      $7/hr above the naïve number.
    </p>

    <h2>Adjustment 3: Unpaid overtime and commute</h2>
    <p>
      Salaried workers routinely work 45–50 hours despite being paid for
      40, and commute 30–90 minutes round-trip. Both are hours unavailable
      for other use.
    </p>
    <p>
      Treat them honestly. If you average 45 hours at work plus 1 hour of
      daily commute, that&rsquo;s 50 committed hours per week × 48
      worked weeks = 2,400 committed hours per year.
    </p>
    <p>
      The same $60k total comp ÷ 2,400 committed hours = $25/hr — now{" "}
      <em>below</em> the naïve baseline. This is the arithmetic that
      makes remote jobs at lower headline salaries sometimes come out
      ahead per-committed-hour.
    </p>

    <h2>Side-by-side example</h2>
    <p>
      <strong>Offer A:</strong> $65,000 salary, 2 weeks PTO, health
      insurance, 3% 401(k) match, 1-hour daily commute, 45-hour
      workweeks. Total comp ≈ $73,000; committed hours 2,400 → $30.42/hr.
    </p>
    <p>
      <strong>Offer B:</strong> $55,000 salary, 4 weeks PTO, same health
      insurance, 5% 401(k) match, fully remote, 40-hour workweeks. Total
      comp ≈ $65,000; committed hours 1,920 → $33.85/hr.
    </p>
    <p>
      Offer B is $10,000/year less on paper and $3.43/hour more on true
      rate. The <a href="/tools/hourly-rate-calculator">hourly rate
      calculator</a> does this math automatically when you enter salary,
      PTO, holidays, and benefit value.
    </p>

    <h2>What this is useful for</h2>
    <p>
      <strong>Negotiation:</strong> walking in knowing your current true
      rate lets you justify a target number instead of guessing. If your
      current rate is $31/hr and the market for your role is $42/hr, you
      have a specific ask.
    </p>
    <p>
      <strong>Freelance pricing:</strong> if you&rsquo;re quitting a
      $60k/yr job to freelance, your replacement hourly needs to beat
      $31/hr <em>after</em> you cover benefits yourself plus the 30–40%
      of billable-to-total-hours ratio that solo contractors actually
      hit. That usually means $80–120/hr to maintain, not break even.
    </p>
    <p>
      <strong>Side-gig evaluation:</strong> A side project paying $20/hr
      isn&rsquo;t &ldquo;below your day job&rdquo; — you have to compare
      it to your true day-job rate including commute and benefits. Often
      the side gig pays more per hour than the day job on an
      apples-to-apples basis.
    </p>

    <h2>A two-minute sanity check</h2>
    <p>
      Take your annual salary. Add $8,000 for rough benefits value. Divide
      by 1,800 (a realistic hours-worked divisor including PTO and a few
      sick days). The result is your floor-estimate true hourly rate.
      It&rsquo;ll be within a few dollars of the precise answer.
    </p>
    <p>
      For the full breakdown including employer match, health premiums,
      billable-vs-committed hours, and a target-rate comparison, use the{" "}
      <a href="/tools/hourly-rate-calculator">hourly rate calculator</a>.
      Pair with the <a href="/tools/paycheck-calculator">paycheck
      calculator</a> for take-home math and the{" "}
      <a href="/guides/how-to-negotiate-salary">how to negotiate salary</a>{" "}
      guide for what to do with the number.
    </p>
  </>
);
