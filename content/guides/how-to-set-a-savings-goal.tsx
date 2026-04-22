import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A vague savings goal (&ldquo;I want to save more&rdquo;) is
      something most people abandon within 3 months; a specific one
      (&ldquo;$7,200 by December 31 for a Japan trip, $600/month from
      each paycheck&rdquo;) has a completion rate 5–10× higher. The
      difference isn&rsquo;t willpower — it&rsquo;s math, target, and
      automation. This guide walks through how to set a savings target
      that you&rsquo;ll actually hit, how to back-solve monthly contribution
      from target + date, and the account structure that makes
      adherence easy.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Step 1 — name the goal, put a number and date on it</h2>
    <p>
      &ldquo;Save more&rdquo; has no finish line. &ldquo;Build a $15,000
      down payment by May 2027&rdquo; does. Specificity creates
      accountability.
    </p>
    <p>
      Common target examples with ballpark numbers:
    </p>
    <p>
      <strong>Emergency fund:</strong> 3–6 months of essential expenses.
      Most households: $10k–$25k.
    </p>
    <p>
      <strong>House down payment (20%):</strong> 20% × home price. $80k
      for a $400k home.
    </p>
    <p>
      <strong>Wedding:</strong> US median is ~$30k. Yours may differ.
    </p>
    <p>
      <strong>Car replacement:</strong> $15k for used reliable, $25–35k
      new.
    </p>
    <p>
      <strong>Vacation:</strong> $2–10k depending on destination and
      length.
    </p>
    <p>
      <strong>Starter investment pot:</strong> $10k to start a taxable
      brokerage with sensible diversification.
    </p>

    <h2>Step 2 — back-solve monthly contribution</h2>
    <p>
      The formula:{" "}
      <code>Monthly = (Target − Current) / Months remaining</code>.
      Ignore interest for short horizons (&lt; 2 years); factor it in
      for long ones.
    </p>
    <p>
      Example: $15,000 down payment by May 2027 (24 months out),
      $2,000 already saved. <code>($15,000 − $2,000) / 24 = $542/month</code>.
      That&rsquo;s your savings target — it needs to come out of net pay,
      automatically, before you see it in checking.
    </p>
    <p>
      For 5+ year horizons in a high-yield savings account (4–5% in
      2024–25), factor in interest: Future-value formula or our savings
      goal calculator will adjust. For 5% yield, a $15,000 target at 24
      months drops to about $513/month of deposits needed.
    </p>

    <h2>Step 3 — pick the right account</h2>
    <p>
      <strong>High-yield savings (HYSA).</strong> 4–5% APY in 2024–25
      (Ally, Marcus, Wealthfront Cash, SoFi). Liquid, FDIC-insured. Best
      for anything you might need in 1–3 years.
    </p>
    <p>
      <strong>CDs or Treasuries.</strong> Slightly higher rates, but
      locked in for 3–12 months. Use for money you&rsquo;re certain
      you won&rsquo;t need before maturity.
    </p>
    <p>
      <strong>Brokerage (for long-horizon goals).</strong> 5+ years out,
      invest in a broad index fund (VTI/VOO/SWTSX) for better expected
      return. Not for anything closer because market can drop 30–40%
      any given year.
    </p>
    <p>
      <strong>Checking account.</strong> Never park savings here — low
      yield and high mental availability to spend.
    </p>

    <h2>Step 4 — automate the transfer</h2>
    <p>
      Set an automatic transfer the day after payday that moves your
      target amount from checking to the savings account for this
      goal. If you use multiple goals, create separate savings
      sub-accounts or &ldquo;buckets&rdquo; (Ally, Capital One 360, and
      most neobanks support them) so you can see progress on each.
    </p>
    <p>
      Automation beats discipline at 50:1. The single highest-leverage
      action in personal finance is making savings a default that
      happens without you deciding each month.
    </p>

    <h2>The named-goal trick</h2>
    <p>
      Behavioral research (Hershfield 2011, Soman &amp; Zhao 2011) shows
      that labeling a savings account (&ldquo;Japan 2027&rdquo; or &ldquo;House
      Fund&rdquo; rather than &ldquo;Savings 2&rdquo;) dramatically
      increases the probability that people keep their hands off it.
      Same account, same interest, better adherence because the future
      self becomes more concrete.
    </p>

    <h2>Step 5 — build in checkpoints</h2>
    <p>
      Quarterly reviews: Are you on pace? If the target was $15k by May
      2027 and you&rsquo;ve got $6,000 by May 2026, you&rsquo;re slightly
      ahead (should be ~$6,500 at pace). If you&rsquo;re $3,000, adjust:
      raise contribution, extend date, or lower target.
    </p>
    <p>
      Don&rsquo;t white-knuckle. The right thing when life changes is to
      adjust the plan, not to quit it entirely.
    </p>

    <h2>Priority stacking — when you have multiple goals</h2>
    <p>
      Most finance advice orders them this way:
    </p>
    <p>
      <strong>(1) Get your employer 401(k) match</strong> — pure free
      money, beats everything else.
    </p>
    <p>
      <strong>(2) $1,000 starter emergency fund</strong> — survival
      buffer before doing anything fancy.
    </p>
    <p>
      <strong>(3) Pay off any debt above ~8% interest</strong> — credit
      cards, payday loans, some personal loans. Debt at 22% is a 22%
      guaranteed return to pay down; no investment beats that.
    </p>
    <p>
      <strong>(4) Full 3–6 month emergency fund</strong> before any other
      savings goal.
    </p>
    <p>
      <strong>(5) Max tax-advantaged retirement accounts</strong> (HSA,
      401(k) up to limit, IRA up to limit).
    </p>
    <p>
      <strong>(6) Specific goals</strong> (house, car, travel) in taxable
      savings or brokerage.
    </p>
    <p>
      Short-term debt and inadequate emergency fund should eat most of
      your savings capacity before you start saving for vacation.
      That&rsquo;s not deprivation — it&rsquo;s math.
    </p>

    <h2>Lifestyle inflation — the quiet goal-killer</h2>
    <p>
      The most common reason savings goals stall isn&rsquo;t that people
      can&rsquo;t save — it&rsquo;s that every raise goes to lifestyle
      before it goes to savings. When you get a raise, automate a percent
      of the new amount to savings before it hits checking. 50% of every
      raise to savings for 5 years builds meaningful wealth; 0% of it
      builds a nicer apartment.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Plug your target amount, start date, and current savings into the{" "}
      <a href="/tools/savings-goal-calculator">savings goal calculator</a>{" "}
      to get the monthly contribution needed. Use the{" "}
      <a href="/tools/compound-interest-calculator">compound interest
      calculator</a> if the goal is 5+ years out and you&rsquo;ll be
      investing the money, and the{" "}
      <a href="/tools/emergency-fund-calculator">emergency fund
      calculator</a> if this is about building your buffer — a goal every
      household should hit before any other.
    </p>
  </>
);
