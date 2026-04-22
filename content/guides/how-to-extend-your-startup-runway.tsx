import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Runway — the number of months before you run out of cash — is
      the single most important number at an early-stage startup.
      Everything else (hiring, marketing, product scope, fundraising
      timing) is downstream of it. This guide walks through the
      correct way to calculate runway, the levers that actually
      extend it, and the &ldquo;18-month rule&rdquo; that separates
      startups that survive from ones that fold during a fundraise.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The formula — but with the right burn</h2>
    <p>
      <strong>Runway (months) = Cash on hand / Net monthly burn</strong>
    </p>
    <p>
      Where <strong>net monthly burn</strong> = (Monthly cash out −
      Monthly cash in). Cash-in is revenue collected, not revenue
      booked. An enterprise deal signed in March that bills in June
      doesn&rsquo;t help April&rsquo;s runway.
    </p>
    <p>
      Example: $2.0M in the bank, $250k/month expenses, $50k/month
      collected revenue. Net burn = $200k. Runway = 2,000 / 200 =
      <strong> 10 months</strong>.
    </p>
    <p>
      Critical: use the <strong>trailing 3-month average burn</strong>,
      not last month&rsquo;s number. Single months are too noisy —
      one-time AWS spikes, delayed invoices, or timing of payroll can
      distort a single month by 30%.
    </p>

    <h2>Gross burn vs net burn</h2>
    <p>
      <strong>Gross burn</strong> = monthly cash out (all expenses
      regardless of revenue).
    </p>
    <p>
      <strong>Net burn</strong> = gross burn − revenue.
    </p>
    <p>
      Net burn is the right number for runway. But track both,
      because revenue can evaporate (customer churns, enterprise
      deal delays, seasonality). Knowing gross burn tells you
      worst-case runway if revenue goes to zero — a scenario you
      should always plan for.
    </p>

    <h2>The 18-month rule</h2>
    <p>
      Common VC guidance: after closing a round, you should have
      <strong> 18–24 months</strong> of runway. Why?
    </p>
    <p>
      Fundraising takes 3–6 months (from starting to close). Good
      milestones take 6–9 months to hit. Investors want to see 6+
      months of execution data before writing a check. Total:
      minimum 15–18 months from one round to the next.
    </p>
    <p>
      At 12 months of runway, you&rsquo;re already starting to raise.
      At 9 months, you&rsquo;re in &ldquo;raising now&rdquo; mode and
      any delay compounds risk. At 6 months, you&rsquo;re in distress
      — your leverage with investors has collapsed, and you&rsquo;ll
      take worse terms.
    </p>
    <p>
      <strong>Rule of thumb:</strong> start the next fundraise when
      runway hits 9 months. Close the round before it hits 6.
    </p>

    <h2>The 4 levers to extend runway</h2>
    <p>
      <strong>(1) Cut expenses.</strong> Immediate, controllable.
      Non-essential software, travel, marketing experiments,
      contractors. A 20% expense cut on $250k burn = $50k/month saved
      = 2.5 additional months of runway per $500k in the bank.
    </p>
    <p>
      <strong>(2) Grow revenue.</strong> Higher leverage than cuts but
      slower to move. Revenue directly subtracts from net burn.
      Caveat: if growing revenue requires hiring or ad spend, net
      impact may be negative for 3–6 months.
    </p>
    <p>
      <strong>(3) Raise more capital.</strong> Equity, debt, venture
      debt, revenue-based financing, convertible note extensions.
      Each has different cost and dilution profiles. Venture debt
      typically adds 6–12 months of runway for 2–4% interest +
      warrants.
    </p>
    <p>
      <strong>(4) Slow cash outflows (not the same as expense cuts).</strong>
      Negotiate payment terms (Net-60 instead of Net-30), delay
      non-critical payments, move annual subscriptions to monthly,
      defer bonus or founder comp. Doesn&rsquo;t reduce total spend,
      just shifts timing. Useful for bridging 60–90 days.
    </p>

    <h2>Headcount: the #1 lever</h2>
    <p>
      People are usually 60–80% of a startup&rsquo;s burn. A 10%
      payroll reduction moves runway more than cutting every
      software subscription you have. The math most founders
      resist:
    </p>
    <p>
      Average loaded cost per engineer at a seed-stage startup:
      $180–220k (salary + benefits + equipment + overhead). Removing
      one engineer = ~$18k/month = 3 months of runway on a $500k cash
      base.
    </p>
    <p>
      <strong>Painful but often correct:</strong> one round of cuts
      early, done with candor and fair severance, beats a slow
      starvation where the best people leave voluntarily and you end
      up with a weaker team and the same cash problem.
    </p>

    <h2>The hidden runway killers</h2>
    <p>
      <strong>Committed but unpaid expenses.</strong> Annual contracts
      billed quarterly, pending invoices, accrued vacation payouts.
      These don&rsquo;t show in &ldquo;cash on hand&rdquo; but will
      hit it. Subtract known committed outflows from cash when
      calculating real runway.
    </p>
    <p>
      <strong>Payment terms from customers slipping.</strong> If Net-30
      invoices start getting paid at 60 days, your AR grows and your
      cash-in drops. Track DSO (days sales outstanding) monthly.
    </p>
    <p>
      <strong>One-time costs you forgot.</strong> Legal for fundraise,
      tax bill, office move, severance for a cut, accrued bonuses.
      Build a 12-month projection with these line items, not an
      &ldquo;average month × 12&rdquo; calculation.
    </p>

    <h2>Scenario-plan 3 versions of runway</h2>
    <p>
      Don&rsquo;t calculate one runway number. Calculate three:
    </p>
    <p>
      <strong>Base case</strong> — current burn, current revenue
      trajectory.
    </p>
    <p>
      <strong>Downside</strong> — if revenue dropped 30%, biggest
      customer churned, or a pilot failed.
    </p>
    <p>
      <strong>Upside</strong> — if pipeline converts as expected,
      marketing channel scales.
    </p>
    <p>
      Make decisions against the downside case. Plan spending against
      the base case. Celebrate the upside if it happens.
    </p>

    <h2>The cash-conversion trap</h2>
    <p>
      Startups that hit hockey-stick growth sometimes run out of cash
      anyway — because growth requires working capital (inventory,
      ad spend upfront, new hires ramping before closing deals).
    </p>
    <p>
      Rough rule: if your sales cycle is longer than 30 days or you
      carry inventory, growing 50% YoY can require 20–40% of that
      growth in incremental working capital. Plan cash for <em>the
      growth you forecast</em>, not the revenue the growth produces.
    </p>

    <h2>When the runway is too short: honest options</h2>
    <p>
      If runway is &lt; 6 months and you can&rsquo;t raise:
    </p>
    <p>
      <strong>Bridge round</strong> from existing investors — a SAFE
      or convertible at the previous round&rsquo;s terms. Less painful
      than a down round.
    </p>
    <p>
      <strong>Revenue-focused pivot</strong> — drop the long-term
      vision work and focus on services or paid pilots that close
      cash this quarter.
    </p>
    <p>
      <strong>Acqui-hire discussions</strong> early, before you
      desperately need the exit. An acqui-hire negotiated from 6
      months out is a different conversation than one from 2 months
      out.
    </p>
    <p>
      <strong>Voluntary wind-down</strong> while you can still pay
      severance and final taxes. Honest to employees, protects your
      reputation for next time. Better than a messy collapse.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Enter cash, monthly burn, and monthly revenue into the{" "}
      <a href="/tools/startup-runway-calculator">startup runway
      calculator</a> for months of runway and projected zero-date.
      Pair with the <a href="/tools/break-even-calculator">break-even
      calculator</a> to see whether you&rsquo;ll reach profitability
      before running out, and the{" "}
      <a href="/tools/cash-flow-calculator">cash flow calculator</a>
      {" "}for the month-by-month view including one-time items.
    </p>
  </>
);
