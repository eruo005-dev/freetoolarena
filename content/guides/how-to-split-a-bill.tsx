import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Splitting a restaurant bill looks simple until the check arrives and
      somebody ordered the $48 steak while you had a side salad. &ldquo;Even
      split&rdquo; feels friendly but can silently shift $15&ndash;25 per
      person in one meal, which adds up fast across a friend group that eats
      out weekly. This guide covers the actual math &mdash; even split,
      itemized, shared-appetizer allocation, tax and tip handling &mdash; plus
      the social playbook for Venmo requests and awkward round-ups. The goal
      isn&rsquo;t to nickel-and-dime anyone. It&rsquo;s to make the method
      transparent so nobody leaves resenting dinner.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Even split vs itemized: pick a rule before you order</h2>
    <p>
      The most important moment in bill-splitting is the one before the menus
      arrive. Decide the method in advance and everyone orders accordingly. If
      it&rsquo;s even-split, nobody should feel weird about the $40 entree;
      if it&rsquo;s itemized, nobody should silently subsidize someone
      else&rsquo;s appetizer round.
    </p>
    <ul>
      <li><strong>Even split</strong> &mdash; works when orders are roughly similar</li>
      <li><strong>Itemized</strong> &mdash; works when orders vary widely or someone isn&rsquo;t drinking</li>
      <li><strong>Hybrid</strong> &mdash; itemize entrees, split shared plates + tax + tip evenly</li>
    </ul>

    <h2>The even-split formula</h2>
    <p>
      Total bill (including tax) multiplied by tip percentage, then divided by
      number of people. Most people forget to include tax in the tip base in
      some regions, or include it in others. For a $120 subtotal, 8.875% tax,
      20% tip on pre-tax:
    </p>
    <pre>{`subtotal      = 120.00
tax           = 120.00 * 0.08875 = 10.65
tip (pre-tax) = 120.00 * 0.20    = 24.00
total         = 120.00 + 10.65 + 24.00 = 154.65
per person (4 people) = 154.65 / 4 = 38.66`}</pre>

    <h2>The itemized formula</h2>
    <p>
      Each person pays their own items plus their <em>share</em> of tax and
      tip. The cleanest method is proportional: everyone&rsquo;s share of
      tax and tip equals their share of the subtotal.
    </p>
    <pre>{`person_share = person_items * (1 + tax_rate + tip_rate)

Alice ordered $28:
  28 * (1 + 0.08875 + 0.20) = 28 * 1.28875 = 36.08

Bob ordered $42:
  42 * 1.28875 = 54.13`}</pre>

    <h2>Handling shared appetizers and desserts</h2>
    <p>
      Shared plates are where itemization breaks down. Two reasonable rules:
    </p>
    <ul>
      <li><strong>Equal split of shared items</strong> &mdash; the calamari is $18 across 4 people = $4.50 each added to their itemized total</li>
      <li><strong>Skip-if-abstained</strong> &mdash; person who didn&rsquo;t eat any pays nothing for that item</li>
    </ul>
    <p>
      Don&rsquo;t try to count bites. It&rsquo;s the fastest way to ruin
      dinner.
    </p>

    <h2>Drinks &mdash; the biggest source of resentment</h2>
    <p>
      Alcohol is usually the single largest swing factor. A table with two
      cocktail drinkers and two non-drinkers can have a $40+ asymmetry. If
      drinking is lopsided, itemize drinks specifically even when splitting
      everything else evenly. Announce the convention before ordering: &ldquo;We&rsquo;re
      splitting food even, drinks separately.&rdquo;
    </p>

    <h2>Tax on the tip, tip on the tax</h2>
    <p>
      Technically you tip on pre-tax subtotal. In practice many calculators
      and people tip on the post-tax total, which adds a small amount. On
      a $120 bill with 8.875% tax, 20% tip:
    </p>
    <pre>{`tip on pre-tax  = 120 * 0.20 = 24.00
tip on post-tax = 130.65 * 0.20 = 26.13
difference per 4 people = 0.53 each`}</pre>
    <p>
      The difference is tiny. Pick one method, stay consistent.
    </p>

    <h2>Venmo / Zelle / cash etiquette</h2>
    <p>
      The person who puts down the card gets the points and the float. In
      exchange they do the math and send requests. Best practices:
    </p>
    <ul>
      <li>Send requests within <strong>24 hours</strong> &mdash; memory fades fast</li>
      <li>Round <em>down</em> if rounding &mdash; asking for $38.66 feels petty, $38 reads generous</li>
      <li>Attach a clear memo: &ldquo;Dinner at Luigi&rsquo;s 4/22&rdquo;</li>
      <li>Use the friends-and-family option to avoid transaction fees</li>
      <li>Never chase more than twice &mdash; mark them as a one-time person if they ghost</li>
    </ul>

    <h2>The awkward round-up strategy</h2>
    <p>
      Quoting $38.66 per person forces someone to Venmo you $38.66 and feels
      clinical. Better: announce &ldquo;$40 each covers it&rdquo; and let the
      extra $5.36 absorb into rounding error. It reads generous, simplifies
      math, and covers variance in tax calculations. If the round-up would
      exceed ~5%, itemize instead.
    </p>

    <h2>Group size effects</h2>
    <p>
      Large groups (8+) are the hardest to split. Many restaurants
      auto-apply 18&ndash;20% gratuity on parties of 6 or 8 &mdash; check the
      bill before tipping again. Large groups also hit a tragedy-of-the-commons
      pattern: if an even split is announced, a few people will order
      expensively knowing the cost is externalized. Pre-commit to itemized
      for any group over 6.
    </p>

    <h2>When someone refuses to pay their share</h2>
    <p>
      It happens. Two options: absorb it and never split a bill with them
      again, or send one polite follow-up: &ldquo;Hey, Venmo request for
      $38 from dinner is still outstanding &mdash; can you send when you get
      a chance?&rdquo; If they still don&rsquo;t pay, note it and adjust
      future behavior. Don&rsquo;t escalate &mdash; $38 isn&rsquo;t worth a
      friendship.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Splitting evenly without announcing the rule up front; forgetting the
      auto-gratuity on large parties and double-tipping; tipping on a
      discounted total when the discount was a coupon (industry convention:
      tip on pre-discount subtotal); and sending Venmo requests three weeks
      later when nobody remembers the dinner. Set the rule, do the math at
      the table, send requests before you fall asleep.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/bill-split-calculator">Bill split calculator</a>
      <a href="/tools/tip-calculator">Tip calculator</a>
      <a href="/tools/expense-split-calculator">Expense split calculator</a>
    </p>
  </>
);
