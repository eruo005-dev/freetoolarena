import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Calculating an age gap looks like subtraction and isn&rsquo;t. If one
      person was born on March 1 and the other on February 28 of the previous
      year, they&rsquo;re not exactly one year apart — they&rsquo;re one year
      and one day, and for sports eligibility, adoption paperwork, or a
      pedantic family argument, that day matters. Here&rsquo;s the correct
      method, the edge cases people miss, and when to just let a calculator do
      it.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The right way: years, then months, then days</h2>
    <p>
      The clean method works top-down. Take the two birth dates. Subtract the
      years first. Then subtract the months. Then subtract the days. If the
      day difference comes out negative, you borrow from the months — just
      like long subtraction in grade school. If the month difference then goes
      negative, you borrow from the years.
    </p>
    <p>
      Example: person A born 2010-05-20, person B born 2007-08-03. Years:
      2010 - 2007 = 3. Months: 5 - 8 = -3. Days: 20 - 3 = 17. The months went
      negative, so borrow one year: 3 - 1 = 2 years, and -3 + 12 = 9 months.
      Final answer: 2 years, 9 months, 17 days.
    </p>

    <h2>Why &ldquo;just subtract the years&rdquo; is wrong</h2>
    <p>
      A common shortcut: birth year minus birth year. This is fine for rough
      conversation and wrong for anything that matters. Two people born in
      2015 and 2017 could be anywhere from just over a year apart (Dec 2015
      and Jan 2017) to almost three years apart (Jan 2015 and Dec 2017). The
      year alone hides up to 23 months of real gap.
    </p>
    <p>
      The Feb 28 / Mar 1 problem is the classic case. Born Feb 28, 2020 vs Mar
      1, 2021 is one year and one day, not one year — and if a rule says
      &ldquo;at least one year,&rdquo; both pass; if a rule says &ldquo;exactly
      one year,&rdquo; only one does.
    </p>

    <h2>Leap-year edge case</h2>
    <p>
      Feb 29 birthdays are a fun puzzle. Someone born Feb 29, 2000 technically
      only has a &ldquo;real&rdquo; birthday every four years. For age
      calculations, the common conventions are: in non-leap years, treat their
      birthday as Feb 28 (legal default in most places) or Mar 1 (some
      jurisdictions, some sports bodies). Pick one convention and be
      consistent. For casual use, Feb 28 is the safer default.
    </p>
    <p>
      Leap years also mean that the exact number of days in a &ldquo;year&rdquo;
      varies. If you need total days between two dates, count them — don&rsquo;t
      multiply years by 365.
    </p>

    <h2>What people actually use age gap for</h2>
    <p>
      Four common contexts. <strong>Couples</strong>: the classic &ldquo;how
      many years apart are we&rdquo; — people almost always want the
      year-and-month format, not raw days. <strong>Siblings</strong>: same
      format, same reason. <strong>Sports eligibility</strong>: youth leagues
      often set cutoffs like &ldquo;must be under 12 on September 1.&rdquo;
      You need the day-precise answer on the cutoff date. <strong>Adoption,
      immigration, family law</strong>: any paperwork that says &ldquo;at
      least X years younger&rdquo; wants a precise calculation.
    </p>

    <h2>When to reach for a calculator</h2>
    <p>
      Doing the borrowing math once is educational. Doing it ten times is a
      recipe for an arithmetic error in exactly the spot that matters. Our{" "}
      <a href="/tools/age-gap-calculator">age gap calculator</a> handles the
      borrowing, leap years, and edge cases — enter two dates and read off the
      result. If you just need one person&rsquo;s current age, the{" "}
      <a href="/tools/age-calculator">age calculator</a> is the simpler
      version.
    </p>

    <h2>A sanity check that usually catches errors</h2>
    <p>
      After you calculate, do a rough cross-check: does the elder&rsquo;s
      birthday this year, plus the gap, land on roughly the younger&rsquo;s
      birthday this year? If the two don&rsquo;t line up to within a day,
      you&rsquo;ve made an arithmetic error. This ten-second check has saved
      more family debates than any formula.
    </p>
  </>
);
