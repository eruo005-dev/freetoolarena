import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Before we do anything else: the overwhelming majority of people should just buy a total-market index fund and go outside.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      Study after study shows that 80&ndash;90% of active managers &mdash; people paid full-time, with Bloomberg terminals and research staffs &mdash; underperform the S&amp;P 500 over 15-year periods. You, sitting in your kitchen with a Robinhood app, are not going to beat them consistently. VTI or VOO will do more for your wealth than any stock-pick you&rsquo;ll ever make. Not financial advice. Consult a licensed advisor for decisions specific to your situation.
    </p>

    <h2>Still want to pick stocks?</h2>
    <p>
      Fine &mdash; it&rsquo;s genuinely educational and can be fun. Do it with 5&ndash;10% of your portfolio, call it your &ldquo;play money,&rdquo; and keep the core in index funds. Start with businesses you understand. Peter Lynch&rsquo;s point holds up: if you can&rsquo;t explain in two sentences how the company makes money and why customers keep coming back, you have no business owning it.
    </p>

    <h2>Three metrics that actually matter</h2>
    <ul>
      <li>P/E ratio (price to earnings): how many years of current earnings are you paying for? Market average is around 20. Sub-15 can signal value or trouble; above 40 is priced for perfection.</li>
      <li>Revenue growth: is the top line growing faster than inflation? Consistent 10%+ is strong; declining revenue is a red flag no matter how cheap the stock looks.</li>
      <li>Operating margin: what&rsquo;s left after running the business? Software companies routinely hit 25&ndash;40%; retailers scrape by at 3&ndash;8%. Compare within an industry, not across.</li>
    </ul>

    <h2>Balance sheet basics</h2>
    <p>
      Debt-to-equity ratio tells you how leveraged the company is &mdash; above 2.0 in a cyclical business is a warning. Current ratio (current assets / current liabilities) above 1.5 means they can pay short-term bills. Cash position matters most in downturns: companies with a year of operating expenses in the bank survive recessions that kill their over-leveraged competitors. If a company&rsquo;s balance sheet scares you, trust that instinct.
    </p>

    <h2>Management and capital allocation</h2>
    <p>
      Read the CEO&rsquo;s shareholder letters for the last 3&ndash;5 years. Do they own the mistakes, or blame macro conditions? Are buybacks happening at reasonable prices or near highs (classic value destruction)? Is insider ownership meaningful? Warren Buffett&rsquo;s insight: a great business run by mediocre managers usually beats a mediocre business run by great managers &mdash; but both together is the goal.
    </p>

    <h2>Look for moats</h2>
    <p>
      A moat is a durable competitive advantage that keeps competitors out. The main types: network effects (Visa, Meta &mdash; the service gets better as more people use it), switching costs (enterprise software, banks &mdash; painful to change), brand (Coca-Cola, Apple), cost advantages (Costco, Amazon logistics), and regulatory moats (utilities, pharma patents). No moat = commoditized margins = slow bleed.
    </p>

    <h2>Read the 10-K</h2>
    <p>
      The annual 10-K filing on SEC.gov is the single most honest document a company produces &mdash; much more so than investor presentations. Start with: the Business section (how they make money), Risk Factors (what could go wrong, in their own lawyers&rsquo; words), and Management&rsquo;s Discussion &amp; Analysis (what actually happened this year and why). Skim the financial statements; read the footnotes that look interesting. It takes an hour and will teach you more than a month of YouTube.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Day-trading based on chart patterns &mdash; the house edge is against you, and taxes on short-term gains eat whatever&rsquo;s left. Chasing hot stocks after they&rsquo;re up 200% because social media is screaming. Using margin or options as a beginner &mdash; leverage magnifies bad decisions. Not diversifying &mdash; one bet going to zero shouldn&rsquo;t ruin you. Checking prices daily and reacting emotionally. Mistaking a falling stock for a bargain (&ldquo;it&rsquo;s cheap now&rdquo; ignores why it fell).
    </p>

    <h2>Bottom line</h2>
    <p>
      The winning formula for 95% of investors is boring: max your retirement accounts, buy a total-market index fund, contribute monthly, ignore the news, repeat for 40 years. If you want to pick stocks anyway, do it with a sleeve of your portfolio, use the metrics above, read the 10-K, and expect to underperform the index &mdash; because the math says you probably will.
    </p>
  </>
);
