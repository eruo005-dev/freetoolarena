import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Writing numbers as words looks like a schoolroom exercise until you
      hit check-writing, legal contracts, or locale-specific formatting.
      &ldquo;1,234.56&rdquo; becomes &ldquo;one thousand two hundred
      thirty-four and 56/100 dollars&rdquo; on a check &mdash; and every
      bank has subtle rules about where to hyphenate, how to handle the
      decimal, and what to put in the unused space. Ordinals add another
      layer (first, second, third), and the billion/milliard split
      between American and British English causes six-figure
      misunderstandings in international documents. This guide covers
      cardinal and ordinal conversion, the check-writing conventions,
      short vs long scale, and how negative and decimal values are
      handled.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Cardinal numbers</h2>
    <p>
      Standard counting words. One, two, three&hellip; ten, eleven&hellip;
      twenty, twenty-one. The rules:
    </p>
    <ul>
      <li>Numbers 21&ndash;99 (non-multiples-of-ten) are hyphenated: twenty-one, sixty-seven</li>
      <li>Hundreds, thousands, millions use &ldquo;and&rdquo; optionally (American usage drops it; British keeps it)</li>
      <li>No commas in the word form</li>
    </ul>
    <pre>{`1234 -&gt; "one thousand two hundred thirty-four"
     -&gt; "one thousand two hundred and thirty-four" (UK)`}</pre>

    <h2>Ordinal numbers</h2>
    <p>
      Position words. First, second, third, fourth&hellip; Most are formed
      by adding -th to the cardinal, with a few irregulars:
    </p>
    <ul>
      <li>1st = first, 2nd = second, 3rd = third (irregular)</li>
      <li>5th = fifth (&ldquo;v&rdquo; change)</li>
      <li>8th = eighth (one &ldquo;h&rdquo;)</li>
      <li>9th = ninth (no &ldquo;e&rdquo;)</li>
      <li>12th = twelfth (one &ldquo;l&rdquo;)</li>
      <li>20th = twentieth (&ldquo;y&rdquo; &rarr; &ldquo;ieth&rdquo;)</li>
    </ul>
    <p>
      Compound ordinals only put the ordinal suffix on the last part:
      twenty-first, one hundred twenty-third.
    </p>

    <h2>Check-writing format</h2>
    <p>
      The legal amount on a check is the word form. Banks use it to
      resolve discrepancies with the numeric amount. Rules:
    </p>
    <ul>
      <li>Dollars in words, cents as a fraction over 100</li>
      <li>Hyphenate compound numbers (twenty-one, etc.)</li>
      <li>Fill remaining line with a long dash or wavy line to prevent alteration</li>
      <li>Zero cents: write &ldquo;and 00/100&rdquo; or &ldquo;and no/100&rdquo;</li>
    </ul>
    <pre>{`$1,234.56
-&gt; "One thousand two hundred thirty-four and 56/100 dollars"

$50.00
-&gt; "Fifty and 00/100 dollars"`}</pre>
    <p>
      &ldquo;And&rdquo; appears only between the dollars and the cents
      fraction &mdash; not inside the dollars portion, despite common
      school teaching otherwise.
    </p>

    <h2>Short vs long scale</h2>
    <p>
      The most common source of international confusion:
    </p>
    <ul>
      <li>
        <strong>Short scale</strong> (US, modern UK, most English): each
        new word is 1000&times; the previous. Million (10&#8310;),
        billion (10&#8313;), trillion (10&#185;&#178;).
      </li>
      <li>
        <strong>Long scale</strong> (Continental Europe, Latin America,
        historic UK): each word is 1,000,000&times; the previous.
        Million (10&#8310;), milliard (10&#8313;), billion (10&#185;&#178;).
      </li>
    </ul>
    <pre>{`10^9 (one followed by 9 zeros):
  US/UK modern: one billion
  French:       un milliard
  German:       eine Milliarde
  Spanish:      mil millones / un millardo

10^12:
  US/UK modern: one trillion
  French:       un billion
  German:       eine Billion`}</pre>
    <p>
      If you&rsquo;re writing international contracts, spell out the
      digit count in parentheses: &ldquo;one billion (10&#8313;).&rdquo;
    </p>

    <h2>Negative numbers</h2>
    <p>
      Three conventions depending on context:
    </p>
    <ul>
      <li>Prefix &ldquo;negative&rdquo; &mdash; &ldquo;negative fifty&rdquo;</li>
      <li>Prefix &ldquo;minus&rdquo; &mdash; common in British/math usage</li>
      <li>Parentheses &mdash; &ldquo;(fifty)&rdquo; in accounting</li>
    </ul>
    <p>
      For checks, negatives don&rsquo;t occur &mdash; you can&rsquo;t
      write a check for a negative amount.
    </p>

    <h2>Decimal numbers</h2>
    <p>
      Several approaches:
    </p>
    <ul>
      <li>&ldquo;Three point one four&rdquo; &mdash; digit by digit after the point</li>
      <li>&ldquo;Three and fourteen hundredths&rdquo; &mdash; as a mixed number</li>
      <li>&ldquo;Three point fourteen&rdquo; &mdash; informal, less precise</li>
    </ul>
    <pre>{`3.14
  "three point one four"
  "three and fourteen hundredths"

0.5
  "zero point five"
  "one half"
  "five tenths"`}</pre>

    <h2>Fractions</h2>
    <ul>
      <li>1/2 &rarr; one half</li>
      <li>1/3 &rarr; one third</li>
      <li>1/4 &rarr; one quarter (or one fourth)</li>
      <li>2/3 &rarr; two thirds</li>
      <li>5/8 &rarr; five eighths</li>
    </ul>
    <p>
      Mixed numbers: &ldquo;three and one half.&rdquo;
    </p>

    <h2>Locale rules</h2>
    <p>
      Different languages have different place-value groupings and
      names. French counts by twenties past 60 (&ldquo;quatre-vingt&rdquo;
      = 80, &ldquo;quatre-vingt-dix&rdquo; = 90). German compounds: 21 is
      &ldquo;einundzwanzig&rdquo; (one-and-twenty). Spanish, Italian,
      Portuguese are more regular but have gender agreement
      (&ldquo;doscientos&rdquo; vs &ldquo;doscientas&rdquo;). A locale
      library handles this; hand-rolled converters almost always break
      on non-English input.
    </p>

    <h2>Percent and currency formatting</h2>
    <p>
      When numbers are part of formatted output:
    </p>
    <ul>
      <li>&ldquo;25%&rdquo; &rarr; &ldquo;twenty-five percent&rdquo;</li>
      <li>&ldquo;$100&rdquo; &rarr; &ldquo;one hundred dollars&rdquo;</li>
      <li>&ldquo;&euro;50,00&rdquo; &rarr; &ldquo;fifty euros&rdquo; (and notice the comma decimal)</li>
    </ul>

    <h2>Year pronunciation</h2>
    <p>
      Years have their own conventions:
    </p>
    <ul>
      <li>1999 &rarr; &ldquo;nineteen ninety-nine&rdquo;</li>
      <li>2000 &rarr; &ldquo;two thousand&rdquo;</li>
      <li>2005 &rarr; &ldquo;two thousand (and) five&rdquo;</li>
      <li>2010 &rarr; &ldquo;twenty ten&rdquo; or &ldquo;two thousand ten&rdquo;</li>
      <li>2024 &rarr; &ldquo;twenty twenty-four&rdquo; (standard now)</li>
    </ul>

    <h2>Phone numbers and digit strings</h2>
    <p>
      Phone numbers, PINs, and identifiers are read digit-by-digit, not
      as full numbers. &ldquo;555-1234&rdquo; is &ldquo;five five five,
      one two three four,&rdquo; not &ldquo;five hundred fifty-five,
      one thousand two hundred thirty-four.&rdquo;
    </p>

    <h2>Common mistakes</h2>
    <p>
      Writing &ldquo;one thousand <em>and</em> two hundred&rdquo; in
      American English (the &ldquo;and&rdquo; goes before the cents in
      checks, not inside the dollars). Hyphenating across place values
      (&ldquo;two-hundred&rdquo; &mdash; wrong, it&rsquo;s &ldquo;two
      hundred&rdquo;). Calling 10&#8313; a &ldquo;billion&rdquo; in a
      contract with a French counterparty. Forgetting to fill the
      remaining space on a check, leaving room for alteration. And
      using commas anywhere in the word form &mdash; there are no
      commas in &ldquo;one thousand two hundred thirty-four.&rdquo;
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/number-to-words">Number to words</a>
      <a href="/tools/roman-numeral-converter">Roman numeral converter</a>
      <a href="/tools/number-base-converter">Number base converter</a>
    </p>
  </>
);
