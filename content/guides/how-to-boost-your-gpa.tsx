import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Raising a GPA is mostly arithmetic, not effort. The math of how
      cumulative averages work means a 3.2 takes far more A&rsquo;s to
      move up than a 2.5 does, and senior-year coursework has almost no
      leverage left compared to freshman year. This guide explains the
      dilution effect that makes GPA stubborn, which courses actually
      move your number, and the grade-by-semester math to hit a specific
      target.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The dilution problem</h2>
    <p>
      GPA is a weighted average. Every course you&rsquo;ve already taken is
      locked in, and new courses get averaged in proportional to their
      credit hours. The more credits already on your transcript, the less
      any single new class moves your number.
    </p>
    <p>
      Say you&rsquo;re a sophomore with a 3.0 GPA across 60 credit hours.
      You take a 3-credit course and ace it (4.0). New GPA:{" "}
      <code>(3.0 × 60 + 4.0 × 3) / 63 = 3.048</code>. A perfect A moved
      you 0.048 points. To reach 3.5 from 3.0 in the same semester
      (15 credits, all A&rsquo;s): <code>(3.0 × 60 + 4.0 × 15) / 75 = 3.2</code>.
      A perfect 4.0 semester still only takes you to 3.2. GPA is a
      super-tanker. It turns slowly.
    </p>

    <h2>Prioritize high-credit courses</h2>
    <p>
      A 4-credit class affects your GPA 33% more than a 3-credit class,
      and 4× more than a 1-credit class. If you have to pick which two
      subjects to study hardest for, pick the ones with the most credits
      — an A in a 4-credit course is the same effort ceiling and more
      GPA movement than a 1-credit course. PE electives and
      single-credit seminars are rounding error.
    </p>

    <h2>Retake vs. ride</h2>
    <p>
      Most schools have a &ldquo;grade forgiveness&rdquo; or retake policy
      — you retake a class, and either the new grade replaces the old or
      both count. If replace: retaking a D in a 4-credit course to turn
      it into an A swings your GPA dramatically (gains: 3.0 GPA points × 4
      credits = 12 quality points added to your cumulative). Check your
      registrar&rsquo;s policy. It&rsquo;s usually the single most
      effective move available if you have a failed or near-failed class
      on your transcript.
    </p>
    <p>
      If both grades count (the newer policy at many state systems),
      retaking buys you less — effectively averaging the two and
      diluting as before. Run the math before committing a semester to
      it.
    </p>

    <h2>The W (withdraw) trap</h2>
    <p>
      Dropping a class before the W deadline removes it from your GPA.
      Withdrawing after the drop deadline usually leaves a W on your
      transcript that doesn&rsquo;t count in GPA but is visible. A
      strategic W to avoid a C or D can preserve your GPA — but
      graduate and professional school admissions committees count Ws
      qualitatively. One or two is invisible. Five or more on a
      transcript tells a story.
    </p>

    <h2>Pass/fail — double-edged</h2>
    <p>
      A P/F grade option lets you pass a hard class without risking your
      GPA, but you also can&rsquo;t <em>raise</em> it with that class.
      Use P/F for courses outside your major where the risk of a C is
      higher than the reward of an A. Save graded courses for anything
      where you can realistically earn an A-/A.
    </p>

    <h2>Weighted vs unweighted — depends who&rsquo;s looking</h2>
    <p>
      High school students in honors/AP courses have a weighted GPA
      (often on a 5.0 scale) and an unweighted (on 4.0). College
      admissions officers typically recalculate using their own scale,
      so both numbers eventually get reduced to a common denominator.
      Don&rsquo;t stack APs just for weighted-GPA inflation —
      admissions will see through it, and a B in an AP is often
      equivalent to an A in regular for admission scoring.
    </p>

    <h2>The realistic-target math</h2>
    <p>
      Use the{" "}
      <a href="/tools/gpa-calculator">GPA calculator</a> to plot scenarios:
      enter your current cumulative GPA + credits, then enter a
      hypothetical upcoming semester. The calculator reveals whether your
      goal is actually reachable given the credit hours you have left.
    </p>
    <p>
      Example: Junior with 3.0 over 90 credits, wants a 3.5 by graduation
      (30 credits remaining). Required:{" "}
      <code>((3.5 × 120) − (3.0 × 90)) / 30 = 5.0</code>. Unreachable —
      you can&rsquo;t average above 4.0. The realistic ceiling is a 3.25
      (all A&rsquo;s). Students who don&rsquo;t run this math before
      setting a goal often set unreachable ones and give up mid-semester.
    </p>

    <h2>The three-move prioritization</h2>
    <p>
      If you have one semester to raise your GPA: (1) front-load your
      schedule with higher-credit classes you know you can A. (2) drop
      or P/F the classes where a C is realistic. (3) retake one old class
      under grade-replacement if your policy allows.
    </p>
    <p>
      Skip: cramming extra-credit points in 1-credit electives, stacking
      APs you&rsquo;ll hate-B, or switching majors late (senior-year
      major switches often lock in an unfavorable GPA because too few
      new courses can move it).
    </p>
    <p>
      Run the numbers for your exact situation in the{" "}
      <a href="/tools/gpa-calculator">GPA calculator</a>, plan study time
      against <a href="/tools/grade-calculator">grade calculator</a>{" "}
      projections for each course, and check whether a target is
      mathematically reachable before you commit a semester to it.
    </p>
  </>
);
