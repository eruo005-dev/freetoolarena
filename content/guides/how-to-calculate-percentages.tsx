import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Percentages trip people up because there are five different questions
      they can answer, and the formula changes slightly for each one.
      &ldquo;What&rsquo;s 15% of 80?&rdquo; is a different beast from &ldquo;80
      is what percent of 320?&rdquo; or &ldquo;if the sale price is $60 at 25%
      off, what was the original?&rdquo; Here are the five formulas you
      actually need, each with a worked example and a mental-math shortcut.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. X% of Y</h2>
    <p>
      Formula: <code>(X / 100) &times; Y</code>. The most common version.
      Example: 15% of 80 is <code>0.15 &times; 80 = 12</code>.
    </p>
    <p>
      Mental-math shortcut: get 10% by moving the decimal one place left (10%
      of 80 is 8), then scale. 15% is 10% plus half of 10% (8 + 4 = 12). 20%
      is double 10% (16). 5% is half of 10% (4). Almost any round percentage
      collapses to this pattern.
    </p>

    <h2>2. A is what % of B</h2>
    <p>
      Formula: <code>(A / B) &times; 100</code>. Example: 24 is what percent
      of 80? <code>(24 / 80) &times; 100 = 30%</code>.
    </p>
    <p>
      The thing to remember: A goes on top, B on the bottom. &ldquo;A of B&rdquo;
      maps directly to &ldquo;A over B.&rdquo; If you&rsquo;re ever unsure
      which number is the denominator, it&rsquo;s the one after &ldquo;of.&rdquo;
    </p>

    <h2>3. Percent change</h2>
    <p>
      Formula: <code>((new - old) / old) &times; 100</code>. Example: price
      went from $50 to $65. Change:{" "}
      <code>((65 - 50) / 50) &times; 100 = 30% increase</code>. Price went
      from $50 to $40: <code>((40 - 50) / 50) &times; 100 = -20%</code>, a 20%
      decrease.
    </p>
    <p>
      The common mistake: dividing by the <em>new</em> value. Always divide
      by the original. A stock that drops 50% then rises 50% is not back to
      even — it&rsquo;s still down 25%, because the 50% rise is off a smaller
      base.
    </p>

    <h2>4. Reverse percent (finding the original)</h2>
    <p>
      This one catches people. The shirt is $60 after a 25% discount — what
      was the original price? The wrong move: take $60 and add 25%, which
      gives you $75. That&rsquo;s incorrect, because 25% of $80 is $20 (the
      actual discount), not $15. The right formula:{" "}
      <code>original = discounted / (1 - discount %)</code>. So{" "}
      <code>60 / (1 - 0.25) = 60 / 0.75 = $80</code>.
    </p>
    <p>
      Same pattern works for tax. Receipt shows $107 total at 7% tax — the
      pre-tax price is <code>107 / 1.07 = $100</code>.
    </p>

    <h2>5. Tip math shortcut</h2>
    <p>
      Restaurant math is just 10% plus half of 10%. Bill is $42?{" "}
      <strong>10% is $4.20</strong>, half of that is $2.10, so 15% is $6.30,
      20% is $8.40. For 18%, take 20% and trim a touch. No mental long
      division required.
    </p>
    <p>
      For groups, our <a href="/tools/tip-calculator">tip calculator</a> does
      the split-by-person math including tax. For everything else — discounts,
      margins, grade averages — the{" "}
      <a href="/tools/percentage-calculator">percentage calculator</a> handles
      all five formulas above.
    </p>

    <h2>When you can&rsquo;t trust your head</h2>
    <p>
      Three situations where a calculator beats mental math every time:
      anything compounding (interest, investment growth, population), anything
      over long chains (a 10% discount plus a 20% discount is <em>not</em> 30%
      — it&rsquo;s 28%, because the second discount applies to the already-
      reduced price), and anything where the answer ends up on paperwork.
      For a coffee tip, do it in your head. For a mortgage calculation, use
      the tool.
    </p>

    <h2>A sanity check that works every time</h2>
    <p>
      Before committing to any percentage answer, ask: is this roughly in the
      right neighborhood? 15% of 80 should be noticeably less than half (40).
      30% change on 50 should be around 15. If your calculator spits out 150,
      you fat-fingered a decimal. This three-second gut check catches 90% of
      the errors that actually cost money.
    </p>
  </>
);
