import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      It&rsquo;s 10 PM the night before the final and you need to know
      exactly what score will save your grade. The panic math
      (&ldquo;I need a 95? Or a 75?&rdquo;) matters because the answer
      tells you whether to pull an all-nighter or close the laptop and
      sleep. This guide walks through the formula, three worked
      examples, and the edge cases that trip students up — including
      the one where the required score is above 100%.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The one formula you need</h2>
    <p>
      To compute the grade needed on a final exam:
    </p>
    <p>
      <code>Needed % = (Target − Current earned) / Final weight</code>
    </p>
    <p>
      Where: <strong>Current earned</strong> = the sum of (category
      percent score × category weight) for every category already graded.
      <strong>Final weight</strong> = the weight of the final exam as a
      decimal. <strong>Target</strong> = your goal grade.
    </p>

    <h2>Worked example 1 — straightforward</h2>
    <p>
      Syllabus: Homework 20% (you averaged 85%), Midterm 30% (you got
      72%), Final 50%. Target: B (80%).
    </p>
    <p>
      Current earned = (0.85 × 20) + (0.72 × 30) = 17 + 21.6 = 38.6.
      Needed on final = (80 − 38.6) / 0.5 = 41.4 / 0.5 = <strong>82.8%</strong>.
      You need an 82.8 on the final to end with exactly an 80. Doable —
      go to bed.
    </p>

    <h2>Worked example 2 — the &ldquo;it&rsquo;s over&rdquo; scenario</h2>
    <p>
      Homework 20% @ 65%. Quizzes 10% @ 50%. Midterm 30% @ 60%. Final 40%.
      Target: B (80%).
    </p>
    <p>
      Current earned = (0.65 × 20) + (0.50 × 10) + (0.60 × 30) = 13 + 5 +
      18 = 36. Needed on final = (80 − 36) / 0.4 = 110%. You need a 110%
      on the final. <strong>Mathematically impossible without extra
      credit.</strong> Reset the target to a C (70%): (70 − 36) / 0.4 =
      85%. That&rsquo;s achievable. Match effort to what&rsquo;s actually
      available to you.
    </p>

    <h2>Worked example 3 — the gift</h2>
    <p>
      Homework 15% @ 95%. Labs 20% @ 92%. Midterm 1 20% @ 90%. Midterm 2
      20% @ 88%. Final 25%. Target: A (90%).
    </p>
    <p>
      Current earned = (0.95 × 15) + (0.92 × 20) + (0.90 × 20) + (0.88 ×
      20) = 14.25 + 18.4 + 18 + 17.6 = 68.25. Needed = (90 − 68.25) /
      0.25 = <strong>87%</strong>. An 87 on the final gives you an
      exactly-90 A. You have room. Stop spiraling, review your weak
      topic for 90 minutes, go to bed.
    </p>

    <h2>Weight sanity check</h2>
    <p>
      Add all your category weights. They should sum to 100%. If they
      don&rsquo;t, your syllabus has a hidden category — usually
      participation, attendance, or instructor discretion — and the
      calculator can&rsquo;t project accurately without it. Email your
      professor.
    </p>

    <h2>Letter-grade cutoffs</h2>
    <p>
      Standard US cutoffs: A 90+, B 80+, C 70+, D 60+. Most schools
      round 89.5 to A. Some syllabi use 93/83/73/63 (stricter) or
      88/78/68/58 (looser) — check yours before setting a target.
    </p>
    <p>
      &ldquo;A-&rdquo; and &ldquo;B+&rdquo; split points (87, 89, 92) vary
      by institution. If your syllabus has plus/minus cutoffs, use them
      directly as your target instead of assuming 90.
    </p>

    <h2>When the needed score is above 100%</h2>
    <p>
      This means you&rsquo;ve already given up the points needed to reach
      your target. Three options:
    </p>
    <p>
      (1) <strong>Lower the target.</strong> A B is still a good outcome;
      a B- is acceptable in most cases. Figure out the target you can
      realistically hit.
    </p>
    <p>
      (2) <strong>Check for extra credit.</strong> Many courses have
      optional extra-credit worth 1–3% of the grade. 3% of extra credit
      swings your current-earned by the same 3%, which is sometimes the
      difference between &ldquo;impossible&rdquo; and &ldquo;needs a
      95.&rdquo; Always worth asking the professor.
    </p>
    <p>
      (3) <strong>Consider a withdrawal</strong> if your school allows it
      past the drop deadline. A W doesn&rsquo;t affect GPA (it does
      affect financial aid and academic progress — check both). Better
      a W than a D in most cases, as long as you&rsquo;re not at a W cap.
    </p>

    <h2>Curve effects</h2>
    <p>
      If your course is curved, the calculator&rsquo;s answer is a{" "}
      <em>worst case</em>. A 78% raw score might become an 85% after
      the curve, but you can&rsquo;t know the curve until finals are
      graded. Plan for the raw score, treat the curve as a bonus.
    </p>

    <h2>The 30-second approach on exam night</h2>
    <p>
      Open the <a href="/tools/grade-calculator">grade calculator</a>,
      enter each category name/weight/score from your syllabus + gradebook,
      add your target grade. The tool returns the score you need on the
      final immediately, plus a flag if the target is unreachable. Pair
      with the <a href="/tools/gpa-calculator">GPA calculator</a> if
      you&rsquo;re tracking the course&rsquo;s impact on cumulative GPA
      for scholarship or admission thresholds.
    </p>
  </>
);
