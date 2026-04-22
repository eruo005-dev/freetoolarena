import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Counting days between two dates is the kind of problem that feels
      trivial until the edge cases hit — leap years, inclusive vs exclusive
      endpoints, business days vs calendar days, time zones, and the 30/360
      convention banks still use for interest accruals. A date-difference
      calculator handles the common cases, but understanding what it&rsquo;s
      doing behind the number is what lets you choose the right flavor for
      contracts, payroll, project planning, or travel.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The three types of day counts</h2>
    <p>
      <strong>(1) Calendar days.</strong> Every day counted, including
      weekends and holidays. &ldquo;30 days to return a purchase&rdquo; is
      calendar days. Simple subtraction of Julian day numbers.
    </p>
    <p>
      <strong>(2) Business days.</strong> Weekends and regional holidays
      excluded. &ldquo;Funds clear in 3 business days&rdquo; means banking
      business days — Mon–Fri, minus federal holidays.
    </p>
    <p>
      <strong>(3) Trading days.</strong> Stock market specifically: ~252
      days/year (weekends + market holidays excluded). Used in quant
      finance for return calculations.
    </p>

    <h2>Inclusive vs exclusive endpoints</h2>
    <p>
      The trickiest edge case in date math. Is the day between Jan 1 and
      Jan 2:
    </p>
    <p>
      <strong>Exclusive end (difference):</strong> 1 day. This is what
      subtraction gives you. Jan 2 − Jan 1 = 1.
    </p>
    <p>
      <strong>Inclusive both ends (span):</strong> 2 days. Useful when
      counting &ldquo;days of vacation&rdquo; — if you&rsquo;re off Jan 1
      and Jan 2, that&rsquo;s 2 days of vacation taken.
    </p>
    <p>
      Most contracts say &ldquo;within 30 days&rdquo; and mean calendar
      days, exclusive of the start date. Always clarify in writing if a
      deadline is ambiguous.
    </p>

    <h2>Leap years — built-in to any good calculator</h2>
    <p>
      Leap year rule: divisible by 4, except centuries not divisible by
      400. 2000 was a leap year; 1900 was not; 2100 won&rsquo;t be. 2024
      is, 2028 is, etc. A good date calculator handles this automatically
      — your mental math probably doesn&rsquo;t.
    </p>
    <p>
      From Feb 1, 2024 to Feb 1, 2025 = 366 days (includes Feb 29, 2024).
      From Feb 1, 2025 to Feb 1, 2026 = 365 days. People setting annual
      subscription renewals via manual date math sometimes lose a day in
      leap years.
    </p>

    <h2>Time zones — same-moment can be different days</h2>
    <p>
      A timestamp of 2024-12-31 11:00 PM ET is 2025-01-01 04:00 UTC. If
      you&rsquo;re computing &ldquo;days since last login&rdquo; across
      time zones and someone logs in at midnight, the answer depends on
      which zone you&rsquo;re anchoring to.
    </p>
    <p>
      Best practice: store all dates in UTC internally, display in the
      user&rsquo;s local zone. Our date calculator treats inputs as
      civil dates (ignoring time zone) unless you explicitly enter a
      timestamp.
    </p>

    <h2>Business day math — the hidden holiday problem</h2>
    <p>
      A &ldquo;5 business day&rdquo; calculation requires a holiday calendar.
      US federal: 11 holidays per year. UK: 8 bank holidays. Japan: 16.
      India: dozens, with regional variations. &ldquo;Business days&rdquo;
      in one country is different from another, and even between lender
      and borrower in the same country (mortgage industry counts business
      days differently from courts).
    </p>
    <p>
      For precision, name the specific holiday calendar: &ldquo;5 US
      federal business days&rdquo; is unambiguous; &ldquo;5 business
      days&rdquo; alone is not.
    </p>

    <h2>30/360 day-count convention (finance)</h2>
    <p>
      Used in bond interest calculations: assumes every month has 30
      days and every year has 360. A 91-day calendar period might be 90
      days under 30/360, affecting accrued interest by 1/365th. Not
      relevant for personal finance math, everywhere in professional
      finance.
    </p>
    <p>
      ACT/365 and ACT/360 variants exist as well. If you&rsquo;re
      computing accrued interest on a bond and the number doesn&rsquo;t
      match the counterparty&rsquo;s, day-count convention is the first
      thing to check.
    </p>

    <h2>Common use cases</h2>
    <p>
      <strong>Project deadlines.</strong> &ldquo;Ship by Q2&rdquo; — how
      many working days between today and the last Friday of June? Use
      business day math.
    </p>
    <p>
      <strong>Age calculations.</strong> Years/months/days from DOB to
      target date. Handle the February 29 corner case — a Feb-29-born
      person in a non-leap year has their birthday on Feb 28 or Mar 1
      depending on jurisdiction.
    </p>
    <p>
      <strong>Vesting cliffs.</strong> Startup equity commonly vests at 1
      year (the &ldquo;cliff&rdquo;). Hired Mar 15, 2024 → cliff on Mar
      15, 2025. Note: some cliffs round to the start of the next
      quarter/month.
    </p>
    <p>
      <strong>Travel and visa planning.</strong> Schengen Area rule: max
      90 days in any 180-day rolling window. Needs careful date-range
      subtraction; spreadsheets beat mental math here.
    </p>
    <p>
      <strong>Payroll periods.</strong> Biweekly pay periods drift
      relative to calendar months. Some years have 27 biweekly paychecks
      instead of 26; employers handle this differently.
    </p>
    <p>
      <strong>Loan maturity.</strong> &ldquo;5 years from origination&rdquo;
      — add 5 × 365 days? Or 5 calendar years (handle leap years)?
      Contracts usually specify the latter.
    </p>

    <h2>One more gotcha — the date string format</h2>
    <p>
      <strong>&ldquo;3/4/2025&rdquo;</strong> is March 4 in US and April
      3 in UK, Europe, and most of the rest of the world. ISO format
      (YYYY-MM-DD) is the only truly unambiguous representation and is
      what any database should store. When sending dates in emails or
      contracts to an international audience, spell out the month
      (&ldquo;4 March 2025&rdquo; or &ldquo;March 4, 2025&rdquo;).
    </p>

    <h2>Run yours</h2>
    <p>
      For calendar-day math, use the{" "}
      <a href="/tools/date-difference-calculator">date difference
      calculator</a> — enter two dates, get the count in days, weeks,
      months, years. Pair with the{" "}
      <a href="/tools/age-calculator">age calculator</a> for DOB-based
      calculations and the{" "}
      <a href="/tools/countdown-timer">countdown timer</a> when the
      second date is &ldquo;now&rdquo; and you want live days-remaining.
    </p>
  </>
);
