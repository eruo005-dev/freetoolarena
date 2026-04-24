import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Freelancers pay more tax than W-2 employees on the same gross income &mdash; unless they actively plan.
    Between self-employment tax, quarterly estimated payments, and deductions the IRS practically hands you,
    the difference between an informed freelancer and an unprepared one is routinely $5,000&ndash;$15,000
    per year. Here&rsquo;s how to keep more of what you earn without stepping into audit territory.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      Not financial advice. Consult a licensed advisor. Tax law changes yearly and varies by state &mdash; a
      CPA who specializes in self-employment will pay for themselves many times over.
    </p>

    <h2>Quarterly estimated payments</h2>
    <p>
      If you expect to owe more than $1,000, the IRS wants you to pay quarterly via Form 1040-ES. Due dates
      are roughly April 15, June 15, September 15, and January 15. Skip them and you&rsquo;ll owe an
      underpayment penalty &mdash; currently 8% annualized, calculated per quarter. Safe harbor: pay 100% of
      last year&rsquo;s total tax (110% if your AGI was over $150k) and you avoid penalties regardless of
      what you owe in April.
    </p>

    <h2>Self-employment tax is the big one</h2>
    <p>
      Self-employment tax is 15.3% on your net earnings (12.4% Social Security up to the wage base, plus
      2.9% Medicare uncapped, with an extra 0.9% over $200k). You get to deduct half of it on your 1040,
      but it still stings. This is why an S-corp election can make sense past ~$60k in net profit &mdash;
      you pay yourself a reasonable salary, take the rest as distributions, and save self-employment tax
      on the distribution portion. Run the numbers before electing.
    </p>

    <h2>Deductions the IRS expects you to take</h2>
    <ul>
      <li>Home office: simplified method is $5/sqft up to 300 sqft ($1,500 max); actual method uses the business percentage of rent, utilities, and insurance.</li>
      <li>Equipment and software &mdash; Section 179 lets you expense up to $1.16M of qualifying equipment in year one instead of depreciating.</li>
      <li>Health insurance premiums &mdash; deductible above the line if you&rsquo;re not eligible for a spouse&rsquo;s employer plan.</li>
      <li>SEP IRA (up to 25% of net earnings) or Solo 401(k) (up to $69,000 in 2024) &mdash; massive tax-deferred space.</li>
      <li>Mileage at the IRS standard rate for business travel, tracked contemporaneously.</li>
      <li>Professional development, subscriptions, and industry memberships.</li>
    </ul>

    <h2>Bookkeeping discipline</h2>
    <p>
      You don&rsquo;t need enterprise accounting &mdash; you do need clean records. QuickBooks
      Self-Employed, Wave, or Xero sync to your business checking and categorize transactions automatically.
      The rule: a dedicated business checking account, every expense flowing through it, receipts
      photographed or saved to cloud storage. At tax time, your CPA gets a clean profit-and-loss statement
      in 10 minutes instead of a shoebox in 10 hours.
    </p>

    <h2>What NOT to deduct</h2>
    <p>
      Meals eaten alone are not deductible. Client meals are 50% deductible with documentation. Commuting
      to your regular office or client site is not deductible &mdash; only travel between job sites or to
      temporary work locations. Clothing you could wear outside work (even if you only wear it for work) is
      not deductible. Personal phone use mixed with business requires a reasonable percentage split, not
      100%. The rule of thumb: if the IRS audits you, can you defend it with documentation?
    </p>

    <h2>Retirement and the CPA conversation</h2>
    <p>
      A Solo 401(k) or SEP IRA is the single biggest tax lever freelancers ignore. At a $100k net profit,
      maxing a Solo 401(k) can shelter $30k+ of taxable income and save you $9,000&ndash;$12,000 in combined
      federal and state tax. A one-hour CPA strategy session costs $300&ndash;$500 and typically identifies
      several thousand dollars in savings the first year &mdash; entity structure, retirement account
      choice, and quarterly payment timing are where the real money is.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Skipping quarterly payments and getting hit with penalties plus a five-figure April bill. Mixing
      personal and business in the same account &mdash; audit red flag and a bookkeeping nightmare. Taking
      an aggressive home-office deduction without the documentation to back it. Forgetting state estimated
      taxes (most states want quarterlies too). Not setting aside 25&ndash;30% of every invoice into a
      separate tax-reserve account from day one.
    </p>

    <h2>Bottom line</h2>
    <p>
      Freelancer tax optimization is 80% routine discipline and 20% smart structure. Pay quarterly, keep
      clean books, max a Solo 401(k), and hire a CPA for one strategy session per year. Use the free
      <a href="/tools/freelancer-tax-reserve-calculator"> freelancer-tax-reserve-calculator</a> to figure
      out exactly how much to set aside from each invoice. Audit risk for freelancers is low, but only if
      your documentation is solid &mdash; and it&rsquo;s the solid documentation that also lets you take
      every deduction you&rsquo;re actually entitled to.
    </p>
  </>
);
