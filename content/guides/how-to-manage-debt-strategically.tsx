import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Paying off debt is half math, half psychology. The math says attack the highest interest rate first. The
    psychology says you need small wins to stay motivated for three years. The right strategy is whichever
    one you&rsquo;ll actually stick with &mdash; but that choice gets easier once you understand the tradeoffs,
    the tools, and the traps that quietly extend debt by years.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      Not financial advice. Consult a licensed advisor. Debt decisions interact with credit, taxes, and
      retirement accounts in ways that are highly personal &mdash; a CPA or certified credit counselor can
      save you more than this article ever will.
    </p>

    <h2>Snowball vs avalanche</h2>
    <p>
      The two dominant philosophies: snowball pays off the smallest balance first for motivation, regardless
      of interest rate. Avalanche pays off the highest-interest debt first for pure mathematical efficiency.
      Avalanche wins the spreadsheet by a few hundred to a few thousand dollars on a typical payoff. Snowball
      wins the behavioral game for people who&rsquo;ve tried and failed before. If your debts are roughly
      similar in interest rate, snowball is basically free. If you&rsquo;re carrying a 24% credit card next
      to a 4% student loan, avalanche is worth the discipline.
    </p>

    <h2>Attack high-interest debt first</h2>
    <p>
      Credit cards at 18&ndash;24% APR and payday loans at 300%+ are financial emergencies. Every month they
      sit, they compound against you faster than almost any asset can appreciate. Before you invest beyond a
      401(k) match, before you save aggressively for a house down payment, kill anything above 10% APR. A
      guaranteed 24% return by paying off a credit card is better than any stock pick.
    </p>

    <h2>Balance transfers and consolidation</h2>
    <ul>
      <li>0% balance transfer offers sound free but charge a 3&ndash;5% transfer fee up front.</li>
      <li>The 0% window ends &mdash; typically at 15, 18, or 21 months &mdash; and the rate jumps to 20%+.</li>
      <li>Debt consolidation loans can lower your blended rate, but watch for origination fees of 1&ndash;8%.</li>
      <li>Consolidation only works if you stop adding new debt to the freshly cleared cards.</li>
      <li>A home equity loan is cheaper but turns unsecured debt into debt secured by your house.</li>
    </ul>

    <h2>Negotiating and settlement</h2>
    <p>
      If you&rsquo;re already behind 3+ months, creditors will often settle for 30&ndash;50 cents on the
      dollar because they&rsquo;d rather collect something than charge off the whole balance. Call the
      creditor directly before engaging a debt-settlement company &mdash; most of those charge 20&ndash;25%
      of the savings and tank your credit for years. Settled debt is taxable as forgiven income unless you
      qualify for insolvency.
    </p>

    <h2>Bankruptcy as last resort</h2>
    <p>
      Chapter 7 liquidates dischargeable debts in about four months but stays on your credit report for ten
      years. Chapter 13 restructures debt into a 3&ndash;5 year payment plan and is used when you have
      assets to protect or income too high for Chapter 7. Student loans are rarely discharged. Bankruptcy is
      a legitimate tool, not a moral failure &mdash; but see a bankruptcy attorney, not a TV ad.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Paying only the minimum forever &mdash; a $5,000 credit card balance at 22% and 2% minimums takes
      about 30 years to pay off. Closing paid-off cards &mdash; you just killed your credit utilization
      ratio and potentially 30&ndash;80 points of your score. Missing a single payment by 30 days can drop
      your score 80&ndash;110 points and stay on file for seven years. Raiding a 401(k) to pay debt triggers
      income tax plus a 10% early-withdrawal penalty and permanently shrinks retirement compounding &mdash;
      almost always a bad trade.
    </p>

    <h2>Bottom line</h2>
    <p>
      Pick snowball or avalanche, automate every payment, and kill high-interest balances before anything
      else. Use the free <a href="/tools/debt-payoff-calculator">debt-payoff-calculator</a> to see the exact
      month you&rsquo;ll be free and how much interest you save by adding $100 extra. Debt is a math problem
      with an emotional component &mdash; solve both, and you&rsquo;ll be out faster than you think.
    </p>
  </>
);
