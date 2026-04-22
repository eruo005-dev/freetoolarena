import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Calculating age between two dates sounds simple — subtract the
      years — but the edge cases matter. Leap years, inclusive versus
      exclusive counts, whether &ldquo;23 years old&rdquo; means
      completed years or the current year of life, legal age
      jurisdictions that differ by purpose, pregnancy counted in
      weeks versus months. This guide walks through the math, the
      conventions you&rsquo;ll run into, and where the gotchas
      actually bite.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The Y/M/D decomposition</h2>
    <p>
      The standard way to express age between two dates: years,
      months, days — the largest unit first, carrying down from each
      level.
    </p>
    <p>
      Algorithm:
    </p>
    <p>
      1. Years = endYear − startYear. If end&rsquo;s (month, day) is
      earlier in the year than start&rsquo;s, subtract 1 (the last
      birthday hasn&rsquo;t happened yet).
    </p>
    <p>
      2. Months = endMonth − startMonth (mod 12 if negative), adjusting
      year if needed.
    </p>
    <p>
      3. Days = endDay − startDay. If negative, borrow from the
      previous month&rsquo;s day count (and decrement months by 1).
    </p>
    <p>
      Example: start 1990-03-15, end 2026-04-23 →
      Years = 36, Months = 1, Days = 8. (March 15 1990 → March 15
      2026 = 36 years; + 1 month + 8 days to reach April 23 2026.)
    </p>

    <h2>Leap years — the February 29 trap</h2>
    <p>
      Leap year: divisible by 4, except century years unless divisible
      by 400. So 2000 was a leap year, 1900 was not, 2100 will not be.
    </p>
    <p>
      Someone born February 29, 2000: when exactly do they turn 25?
      Legally (most jurisdictions) on March 1, 2025 (non-leap
      years). In leap years (2024, 2028), they turn on the 29th.
      Software that doesn&rsquo;t handle this returns
      &ldquo;March 1&rdquo; or crashes on Feb 29 inputs.
    </p>
    <p>
      Day-count math across leap years: if spans include Feb 29,
      that day counts normally — ~365.25 days per year average.
    </p>

    <h2>Inclusive vs exclusive day count</h2>
    <p>
      Asked &ldquo;how many days from March 15 to March 20&rdquo;,
      two valid answers:
    </p>
    <p>
      <strong>Exclusive:</strong> 20 − 15 = 5 days. Used in most date
      math (duration between two timestamps).
    </p>
    <p>
      <strong>Inclusive:</strong> 20 − 15 + 1 = 6 days. Used when
      counting calendar days a person is present or active (hotel
      stays, hospital admissions, &ldquo;trip lasted X days&rdquo;).
    </p>
    <p>
      Ambiguous in conversation; context determines convention. Legal
      and medical often prefer inclusive; financial/duration math
      prefers exclusive.
    </p>

    <h2>Age in years — completed vs current year of life</h2>
    <p>
      In Western countries: &ldquo;23 years old&rdquo; = completed 23
      years since birth. You turn 24 on your 24th birthday.
    </p>
    <p>
      In traditional Korean / East Asian age counting (being phased
      out but historically used): you&rsquo;re 1 at birth and gain a
      year each New Year. A baby born December 31 becomes &ldquo;2
      years old&rdquo; the next day. South Korea officially
      standardized on Western counting in 2023 but cultural usage
      lingers.
    </p>
    <p>
      In Chinese traditional counting (&ldquo;virtual age&rdquo;,
      xūsuì): similar to Korean — 1 at birth, +1 at each lunar new
      year.
    </p>
    <p>
      Computation-wise: always use completed years for software and
      legal contexts unless explicitly told otherwise.
    </p>

    <h2>Pregnancy — weeks and months conventions</h2>
    <p>
      Pregnancy is counted in weeks from the last menstrual period
      (LMP), not conception. A &ldquo;9-month&rdquo; pregnancy is
      actually 40 weeks = ~10 lunar months or ~9 calendar months.
    </p>
    <p>
      Trimesters:
    </p>
    <p>
      <strong>First:</strong> weeks 1–12.
    </p>
    <p>
      <strong>Second:</strong> weeks 13–27.
    </p>
    <p>
      <strong>Third:</strong> weeks 28–40.
    </p>
    <p>
      Due date = LMP + 280 days (40 weeks). Naegele&rsquo;s rule:
      LMP + 1 year − 3 months + 7 days.
    </p>
    <p>
      After birth, baby age is in weeks for the first ~3 months, then
      months until ~2 years, then years. Developmental milestones are
      tied to these conventions.
    </p>

    <h2>Legal age — varies by purpose and jurisdiction</h2>
    <p>
      One person, multiple &ldquo;legal ages&rdquo;:
    </p>
    <p>
      <strong>Drinking (US):</strong> 21 (federal minimum).
    </p>
    <p>
      <strong>Drinking (UK / most of EU):</strong> 18 (some countries
      16 for beer/wine).
    </p>
    <p>
      <strong>Driving (US):</strong> 16 typical (varies by state,
      some 14 or 15 with restrictions).
    </p>
    <p>
      <strong>Driving (EU):</strong> 18 typical, 17 with
      accompaniment in some countries.
    </p>
    <p>
      <strong>Voting:</strong> 18 nearly everywhere; 16 in Austria,
      Scotland (some elections), Brazil (optional).
    </p>
    <p>
      <strong>Contract signing (majority):</strong> 18 in most
      Western jurisdictions, 21 in a few.
    </p>
    <p>
      <strong>Criminal responsibility:</strong> varies widely — 10
      (UK), 12 (many EU), 14 (Germany, Japan, China).
    </p>
    <p>
      <strong>Retirement age:</strong> 65–67 standard in OECD,
      rising; varies by country and birth year.
    </p>

    <h2>Biological vs chronological age</h2>
    <p>
      <strong>Chronological:</strong> time since birth. What a
      birthday measures.
    </p>
    <p>
      <strong>Biological age:</strong> a measure of physiological
      aging, typically derived from biomarkers (DNA methylation
      &ldquo;epigenetic clocks&rdquo; like Horvath, PhenoAge,
      GrimAge). Can differ from chronological by 10+ years.
    </p>
    <p>
      Biological age is the variable research has tied to mortality
      and disease risk. Chronological just correlates with it on
      average. For medical decisions, biological is increasingly
      relevant — for legal ones, chronological is what matters.
    </p>

    <h2>Pet age conversions — beyond &ldquo;dog years&rdquo;</h2>
    <p>
      The old &ldquo;dog years = human years × 7&rdquo; rule is
      wrong. Better approximation (AVMA and research-based):
    </p>
    <p>
      <strong>Dogs:</strong> Year 1 ≈ 15 human years. Year 2 ≈ +9
      (total 24). After that +4–5 per dog year. Large breeds age
      faster than small.
    </p>
    <p>
      Newer epigenetic model: human_age = 16 × ln(dog_age) + 31. A
      10-year-old dog ≈ 68 human years by this model.
    </p>
    <p>
      <strong>Cats:</strong> Year 1 ≈ 15 human years, Year 2 ≈ +9
      (total 24), then +4 per year. A 10-year-old cat ≈ 56 human
      years.
    </p>

    <h2>Business-date arithmetic</h2>
    <p>
      If the question is about working days (not calendar days),
      skip weekends and holidays:
    </p>
    <p>
      <strong>Weekends:</strong> ~5/7 of all days are weekdays. 30
      calendar days ≈ 21–22 working days.
    </p>
    <p>
      <strong>Holidays:</strong> US has ~10 federal; UK has 8 bank
      holidays; each country differs. Annual holidays per country
      vary from ~6 (US) to ~15 (Japan).
    </p>
    <p>
      When giving deadlines in business contexts, be explicit:
      &ldquo;10 business days&rdquo; vs &ldquo;2 weeks&rdquo; can
      differ by 4+ calendar days.
    </p>

    <h2>Time zones — when the dates differ by zone</h2>
    <p>
      &ldquo;Born November 30&rdquo; in Tokyo = &ldquo;November 29&rdquo;
      in New York. When calculating age across time zones, pick a
      convention: birth date in birth locale (most common), or UTC
      (rarely needed outside software). Be consistent to avoid
      off-by-one bugs.
    </p>

    <h2>Common calculation errors</h2>
    <p>
      <strong>Error 1:</strong> Forgetting to subtract a year when
      the end date&rsquo;s birthday hasn&rsquo;t occurred yet.
      Someone born June 15 1990, on April 23 2026, is 35 — not 36,
      because June 15 2026 hasn&rsquo;t happened.
    </p>
    <p>
      <strong>Error 2:</strong> Using 365.25 or 365 days per year
      uniformly. Accurate for rough age estimates, loses precision on
      exact day counts.
    </p>
    <p>
      <strong>Error 3:</strong> Off-by-one in inclusive counts.
      &ldquo;From Monday to Friday&rdquo; — 4 days (exclusive) or 5
      (inclusive)?
    </p>
    <p>
      <strong>Error 4:</strong> Software using 32-bit date types
      silently wraps around 2038 or fails before 1970. Use proper
      date libraries.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Compute age between two dates down to days with the{" "}
      <a href="/tools/age-calculator">age calculator</a>. Pair with
      the <a href="/tools/countdown-timer">countdown timer</a> for
      counting down to a future date, and the{" "}
      <a href="/tools/pregnancy-calculator">pregnancy calculator</a>
      {" "}if you&rsquo;re working with LMP-based pregnancy math.
    </p>
  </>
);
