import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Overtime pay sounds simple — time-and-a-half after 40 hours — and it
      almost always turns out to be more complicated than that. Federal rules
      are one layer. State rules can stack on top. Shift differentials,
      double-time thresholds, salaried non-exempt classifications, and paid
      leave all introduce edge cases that can swing a paycheck by hundreds of
      dollars. This guide walks through the math that actually governs your
      OT check and how to verify it.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The federal baseline: the FLSA 40-hour rule</h2>
    <p>
      The Fair Labor Standards Act (FLSA) — the federal wage-and-hour law —
      requires employers to pay non-exempt workers at least 1.5 × their
      regular rate for every hour over 40 in a workweek. That&rsquo;s the
      floor. Your state may require more; it can&rsquo;t require less.
    </p>
    <p>
      A workweek is any fixed, recurring 168-hour period — doesn&rsquo;t have
      to be Monday–Sunday. Your employer picks it and has to keep it
      consistent. Days off don&rsquo;t count against the 40 threshold, and
      federal law does <em>not</em> require daily overtime or double-time.
    </p>

    <h2>State rules that stack on top</h2>
    <p>
      <strong>California</strong> is the strictest: time-and-a-half after 8
      hours in a day <em>and</em> after 40 in a week (whichever hits first),
      double-time after 12 hours in a day, and double-time for hours 9+ on a
      seventh consecutive workday. A 14-hour shift in California generates 8
      hours regular, 4 hours at 1.5×, and 2 hours at 2×.
    </p>
    <p>
      <strong>Colorado</strong> has daily OT after 12 hours (not 8). Alaska
      has daily OT after 8 hours. Nevada has daily OT after 8 hours only for
      workers making less than 1.5× the state minimum wage. Every other state
      defaults to the federal 40-hour rule unless a union contract says
      otherwise.
    </p>

    <h2>Time-and-a-half vs double-time — the math</h2>
    <p>
      <strong>Time-and-a-half</strong> = 1.5 × base rate. On $22/hour, that&rsquo;s
      $33/hour. A 45-hour week at $22 pays 40 × $22 + 5 × $33 = $880 + $165 =
      $1,045 gross — not 45 × $22 = $990.
    </p>
    <p>
      <strong>Double-time</strong> = 2 × base rate. $22/hour becomes $44/hour.
      Only triggered by state rules (California 12+/day, 7th-day 9+ hours) or
      union contracts. Federal law alone never mandates double-time.
    </p>
    <p>
      The <a href="/tools/overtime-calculator">overtime calculator</a> handles
      federal, California, and custom rule sets including the daily-plus-weekly
      stacking that trips most payroll software up.
    </p>

    <h2>Paid leave doesn&rsquo;t count</h2>
    <p>
      Federal law counts only <em>hours worked</em> toward the 40-hour OT
      threshold. If you work 32 hours and take 16 hours of PTO, your check
      shows 48 hours but you&rsquo;re owed zero overtime. Some states and
      union contracts override this — read the fine print.
    </p>
    <p>
      Same story with holidays. Working on a company holiday doesn&rsquo;t
      automatically trigger overtime or holiday pay premiums under federal
      law. Any holiday 1.5× or 2× premium is contractual, not statutory.
    </p>

    <h2>The salaried non-exempt trap</h2>
    <p>
      If you&rsquo;re salaried but non-exempt (paid a fixed weekly amount,
      but classified hourly for OT purposes), you&rsquo;re still owed
      overtime. The math: weekly salary ÷ 40 = implied regular rate. Hours
      over 40 get 1.5× that implied rate.
    </p>
    <p>
      On a $1,000/week salary: $1,000 ÷ 40 = $25/hour regular. A 50-hour week
      pays $1,000 + 10 × $37.50 = $1,375. Some employers use the
      &ldquo;fluctuating workweek&rdquo; method (FLSA § 778.114) which lowers
      the OT premium to 0.5× (since the salary already covers straight-time
      for all hours) — that&rsquo;s legal but has to meet specific conditions
      including a written agreement.
    </p>

    <h2>How to verify your paycheck</h2>
    <p>
      Pull your last pay stub. Find: hours worked that week, regular rate,
      overtime hours, overtime rate, and gross pay. Plug the first four into
      the <a href="/tools/overtime-calculator">overtime calculator</a> with
      your state&rsquo;s rule set. If the gross matches within a dollar,
      you&rsquo;re fine. If it doesn&rsquo;t, print the calculator&rsquo;s
      breakdown and show it to HR — payroll software gets this wrong often
      enough that checking is worthwhile.
    </p>
    <p>
      Common error patterns: OT calculated on base rate when a shift
      differential should have been included (differentials count toward
      &ldquo;regular rate&rdquo; under FLSA), daily-plus-weekly double-counting
      in California, and salaried non-exempt workers getting zero OT because
      someone in payroll treated them as exempt. All three are worth
      catching.
    </p>

    <h2>If you suspect wage theft</h2>
    <p>
      Document everything — shift logs, pay stubs, schedule emails, Slack
      messages. Start with HR or payroll politely; most cases are honest
      errors. If that doesn&rsquo;t resolve it, the{" "}
      <a href="https://www.dol.gov/agencies/whd" rel="nofollow">US Department
      of Labor Wage and Hour Division</a> accepts confidential complaints and
      investigates without cost to you. State labor boards often recover
      wages faster than federal.
    </p>
    <p>
      Pair the overtime calculator with our{" "}
      <a href="/tools/paycheck-calculator">paycheck calculator</a> to model
      take-home after taxes, or the{" "}
      <a href="/tools/hourly-rate-calculator">hourly rate calculator</a> to
      figure out what your real per-hour number looks like factoring in
      benefits and PTO.
    </p>
  </>
);
