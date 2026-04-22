import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Most small businesses that fail are profitable on paper — they
      run out of cash. Profit and cash flow are different numbers,
      and the gap between them kills more companies than any other
      single cause. A proper cash flow forecast shows, month by month,
      whether you can pay bills, meet payroll, and fund growth. This
      guide walks through building a 13-week forecast, the categories
      that matter most, and the handful of signals that tell you
      cash is about to be tight.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Cash flow vs profit — why they diverge</h2>
    <p>
      <strong>Profit</strong> is the income statement: revenue minus
      expenses, recognized when earned.
    </p>
    <p>
      <strong>Cash flow</strong> is the bank account: money in, money
      out, on the dates it actually moves.
    </p>
    <p>
      An agency invoices $50k in January (revenue recorded). Client
      pays in March. Rent, payroll, and SaaS still hit in January
      and February. On paper January was profitable; in reality the
      bank account dropped $70k before any cash arrived.
    </p>
    <p>
      The three accounting things that cause the gap:
    </p>
    <p>
      <strong>Accounts receivable (AR).</strong> Revenue billed but
      not yet collected. Money you&rsquo;re owed is not cash.
    </p>
    <p>
      <strong>Inventory.</strong> Stock you paid for but haven&rsquo;t
      sold. Cash out, no revenue yet.
    </p>
    <p>
      <strong>Capital expenditures.</strong> Equipment, leasehold
      improvements — expensed over years on the P&amp;L, but the cash
      went out in month one.
    </p>

    <h2>The 13-week rolling forecast (the standard)</h2>
    <p>
      13 weeks is the CFO-standard horizon: long enough to see the
      next payroll cycle, quarterly tax, and big AR collections;
      short enough that predictions are still realistic.
    </p>
    <p>
      Structure:
    </p>
    <p>
      <strong>Row 1: Opening cash balance.</strong> Closing cash from
      the prior week.
    </p>
    <p>
      <strong>Rows 2-N: Cash inflows.</strong> AR collections from
      specific customers, new sales forecast by week, other income
      (refunds, grants, tax return).
    </p>
    <p>
      <strong>Rows N-M: Cash outflows.</strong> Payroll dates, rent,
      recurring software (by date due), AP payments to vendors,
      quarterly taxes, debt service.
    </p>
    <p>
      <strong>Closing cash balance.</strong> Opening + inflows −
      outflows. This becomes next week&rsquo;s opening cash.
    </p>
    <p>
      Update every Monday. Takes 30 minutes once built. The discipline
      of updating is the value — forces you to notice when forecasts
      drift.
    </p>

    <h2>Categorize cash flows the right way</h2>
    <p>
      Accounting standards split cash flow into three categories —
      helpful for spotting what&rsquo;s really happening:
    </p>
    <p>
      <strong>Operating cash flow.</strong> The day-to-day business:
      customer payments in, operating expenses out. Healthy business
      = positive operating cash flow.
    </p>
    <p>
      <strong>Investing cash flow.</strong> Equipment purchases,
      acquisitions, sales of assets. Usually negative for growing
      companies (spending on future capacity).
    </p>
    <p>
      <strong>Financing cash flow.</strong> Loans in/out, equity
      raised, dividends or distributions paid.
    </p>
    <p>
      A business with positive operating cash flow but collapsing
      total cash is funding growth from the balance sheet. A business
      with negative operating cash flow and positive financing cash
      flow is living on the last round — dangerous.
    </p>

    <h2>Step 1 — forecast AR collections realistically</h2>
    <p>
      The #1 source of cash forecast error is assuming invoices are
      paid on the due date. They&rsquo;re often not.
    </p>
    <p>
      Track your actual <strong>DSO (days sales outstanding)</strong> =
      (AR balance / revenue per day). If DSO is 45 days but you
      invoice on Net-30, your AR forecast should assume payment 15
      days late, not on day 30.
    </p>
    <p>
      Customer-level adjustment: big customers with long AP cycles
      pay in 60–90 days. Assume that. Small customers often pay
      faster. Build an aging profile into the forecast, not an
      average.
    </p>

    <h2>Step 2 — commit to payment timing, don&rsquo;t estimate</h2>
    <p>
      Most outflows are known with certainty once you have the data:
    </p>
    <p>
      <strong>Payroll</strong> — fixed dates and amounts. Include
      employer taxes (add ~8–12% to gross payroll).
    </p>
    <p>
      <strong>Rent</strong> — 1st or last of the month, fixed.
    </p>
    <p>
      <strong>Software subscriptions</strong> — renewal dates are
      knowable; pull them from your credit card statement and list by
      date.
    </p>
    <p>
      <strong>Quarterly estimated taxes</strong> — April 15, June 15,
      September 15, January 15. Easy to forget; massive impact when
      they hit.
    </p>
    <p>
      <strong>Annual costs</strong> — insurance, domain renewals,
      accountant fee for year-end. List them in the month due.
    </p>

    <h2>Step 3 — add a sales forecast with honesty discount</h2>
    <p>
      Revenue forecasts are where optimism creeps in. Discount
      discipline:
    </p>
    <p>
      <strong>Signed contracts with clear delivery date:</strong>{" "}
      100% of expected value in the right week.
    </p>
    <p>
      <strong>Verbal commitment or LOI:</strong> 60% of value,
      pushed a month out from when the customer said.
    </p>
    <p>
      <strong>Strong pipeline opportunity:</strong> 30% of value, 2
      months out.
    </p>
    <p>
      <strong>Top-of-funnel inquiries:</strong> don&rsquo;t include
      in the forecast at all.
    </p>
    <p>
      Every founder overestimates conversion speed. The honest
      discount on sales forecasts is usually 30–50%, not the 10% we
      want to apply.
    </p>

    <h2>Signal #1: The minimum balance watchtower</h2>
    <p>
      What&rsquo;s the minimum cash balance across all 13 weeks? If
      it dips below 30 days of operating expenses, you&rsquo;re
      entering stress.
    </p>
    <p>
      Below 2 weeks of operating expenses: emergency mode. Start
      accelerating collections (call AR aging report customers),
      delay non-critical payments, open the line of credit if you
      have one.
    </p>
    <p>
      Target: maintain a minimum cash buffer of at least 60 days of
      operating expenses. 3–6 months is comfortable. &lt;30 days is
      a warning state.
    </p>

    <h2>Signal #2: Growing AR aging buckets</h2>
    <p>
      Pull the AR aging report monthly. It splits what you&rsquo;re
      owed by how overdue:
    </p>
    <p>
      <strong>Current</strong> — not yet due.
    </p>
    <p>
      <strong>1–30 days late</strong> — usually normal.
    </p>
    <p>
      <strong>31–60 days late</strong> — investigate. Call customer.
    </p>
    <p>
      <strong>61–90 days late</strong> — escalate, consider collection
      calls or holding deliveries.
    </p>
    <p>
      <strong>90+ days late</strong> — unlikely to collect, write
      off or send to collections.
    </p>
    <p>
      If the &gt;60-day bucket is growing as a percentage of total AR,
      your working capital is deteriorating even if top-line revenue
      is fine.
    </p>

    <h2>Signal #3: AP terms being stretched</h2>
    <p>
      The inverse of AR: if you&rsquo;re paying vendors later than
      your terms (stretching Net-30 to Net-45 or 60), you&rsquo;re
      using vendor credit to fund operations — a rough early
      indicator of tight cash. Unsustainable and relationship-damaging.
    </p>
    <p>
      If you find yourself doing this regularly, the cash problem
      is structural and needs a fix (raise, cost reduction, faster
      collections, terms renegotiation) — not just better timing.
    </p>

    <h2>What to cut when cash is tight</h2>
    <p>
      Order of cuts, from easiest to hardest:
    </p>
    <p>
      <strong>(1) Discretionary</strong> — marketing experiments,
      travel, catered lunches, new software, hiring pauses.
    </p>
    <p>
      <strong>(2) Deferrable</strong> — negotiate longer payment
      terms with vendors, delay capital purchases, downgrade software
      tiers.
    </p>
    <p>
      <strong>(3) Headcount reductions</strong> — last resort but
      highest leverage. Better done once decisively than gradually.
    </p>
    <p>
      Don&rsquo;t cut things that drive cash in the door (sales
      people, top performers, existing customer support). Those are
      your revenue. Cut what doesn&rsquo;t drive collections.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Enter monthly inflows and outflows into the{" "}
      <a href="/tools/cash-flow-calculator">cash flow calculator</a>
      {" "}to see your position across months and quarters. Pair with
      the <a href="/tools/startup-runway-calculator">startup runway
      calculator</a> for months-to-zero view, and the{" "}
      <a href="/tools/budget-calculator">budget calculator</a> for the
      same view on personal household cash flow.
    </p>
  </>
);
