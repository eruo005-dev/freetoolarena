import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Fractions feel harder than they are because the rules change depending on whether
      you&rsquo;re adding, multiplying, or converting to a decimal. Adding 1/3 and 1/4 requires
      a common denominator; multiplying them doesn&rsquo;t. Simplifying 24/36 requires finding
      a GCD; converting 1/7 to a decimal gives you an infinitely repeating pattern that
      confuses people into thinking they made an arithmetic error. Mixed numbers like 2 3/4 hide
      an extra step where you either convert to an improper fraction or keep them separate.
      This guide covers the vocabulary (proper, improper, mixed), the four operations with
      worked examples, simplification using the greatest common divisor, decimal conversion
      including repeating decimals, and the tricks that make fraction arithmetic feel
      mechanical instead of mysterious.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Vocabulary</h2>
    <p>
      A fraction has a <strong>numerator</strong> on top and a <strong>denominator</strong> on
      bottom. <strong>Proper fractions</strong> have a numerator smaller than the denominator
      (3/4, 2/7). <strong>Improper fractions</strong> have numerator larger or equal (7/4, 5/5).
      <strong>Mixed numbers</strong> combine a whole number and a proper fraction (1 3/4). Every
      improper fraction can be rewritten as a mixed number and vice versa.
    </p>
    <pre>{`7/4 = 1 3/4         (improper → mixed: divide 7÷4 = 1 remainder 3)
2 1/3 = 7/3         (mixed → improper: 2×3 + 1 = 7)
5/5 = 1             (improper that equals a whole number)`}</pre>

    <h2>Simplifying with GCD</h2>
    <p>
      Divide numerator and denominator by their <strong>greatest common divisor</strong>. For
      24/36, GCD = 12, so 24/36 = 2/3. For 15/25, GCD = 5, so 15/25 = 3/5. The Euclidean
      algorithm finds GCD quickly: repeatedly replace the larger number with the remainder of
      the division. Always simplify at the end unless the problem asks for a specific form.
    </p>
    <pre>{`24/36  → gcd 12 → 2/3
15/25  → gcd 5  → 3/5
100/75 → gcd 25 → 4/3 → 1 1/3
42/56  → gcd 14 → 3/4`}</pre>

    <h2>Adding and subtracting: you need a common denominator</h2>
    <p>
      You can&rsquo;t add 1/3 and 1/4 directly. Find the <strong>least common
      denominator</strong> (LCD), rewrite both fractions over that denominator, then add
      numerators. For 1/3 and 1/4, LCD = 12, so 1/3 = 4/12 and 1/4 = 3/12, giving 7/12.
    </p>
    <pre>{`1/3 + 1/4
  LCD = 12
  = 4/12 + 3/12
  = 7/12

5/6 − 1/4
  LCD = 12
  = 10/12 − 3/12
  = 7/12`}</pre>
    <p>
      When the denominators share no common factors, the LCD is their product. When they share
      factors, find the LCD by multiplying each denominator&rsquo;s unique prime factors at
      their highest power.
    </p>

    <h2>Multiplying: just multiply across</h2>
    <p>
      Multiply numerators together and denominators together, then simplify:{" "}
      <code>a/b &times; c/d = (ac)/(bd)</code>. No common denominator needed. For mixed
      numbers, convert to improper first.
    </p>
    <pre>{`2/3 × 4/5 = 8/15
1/2 × 3/4 = 3/8
1 1/2 × 2/3 = 3/2 × 2/3 = 6/6 = 1

Shortcut: cancel before multiplying
  4/9 × 3/8 = (4/8) × (3/9) = 1/2 × 1/3 = 1/6`}</pre>

    <h2>Dividing: multiply by the reciprocal</h2>
    <p>
      Flip the second fraction and multiply: <code>a/b &divide; c/d = a/b &times; d/c = ad/bc</code>.
      This is the rule that feels arbitrary but falls out of the definition of division as
      multiplying by the inverse.
    </p>
    <pre>{`2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6
1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2
3/4 ÷ 6    = 3/4 × 1/6 = 3/24 = 1/8`}</pre>

    <h2>Converting to decimals</h2>
    <p>
      Divide numerator by denominator. Some fractions terminate (3/4 = 0.75); others repeat
      (1/3 = 0.3333..., 1/7 = 0.142857142857...). A fraction terminates if and only if its
      simplified denominator&rsquo;s prime factors are only 2 and 5. Everything else repeats.
    </p>
    <pre>{`1/2  = 0.5          (terminates; denom = 2)
3/8  = 0.375        (terminates; denom = 8 = 2³)
1/3  = 0.333...     (repeats; denom = 3)
1/7  = 0.142857...  (6-digit repeat block)
1/11 = 0.090909...
1/6  = 0.1666...`}</pre>

    <h2>Converting a repeating decimal back to a fraction</h2>
    <p>
      Let <code>x = 0.3333...</code>. Then <code>10x = 3.3333...</code>, and subtracting gives{" "}
      <code>9x = 3</code>, so <code>x = 3/9 = 1/3</code>. For a longer repeat block, multiply
      by <code>10^n</code> where <em>n</em> is the repeat length: for <code>0.142857142857...</code>,{" "}
      multiply by <code>10^6</code> and subtract.
    </p>

    <h2>Comparing fractions</h2>
    <p>
      Three techniques. First, convert to a common denominator and compare numerators. Second,
      cross-multiply: <code>a/b</code> versus <code>c/d</code>&mdash;whichever of <code>ad</code>
      and <code>bc</code> is larger tells you the answer. Third, convert to decimals (fastest
      for a pile of fractions, slower for exact comparison).
    </p>
    <pre>{`Is 5/8 > 3/5?
  Cross-multiply: 5×5 = 25 vs 3×8 = 24
  25 > 24, so 5/8 > 3/5  ✓`}</pre>

    <h2>Mixed numbers: two approaches</h2>
    <p>
      For addition, you can keep the whole parts separate: <code>2 1/3 + 1 1/4 = 3 + (1/3 +
      1/4) = 3 + 7/12 = 3 7/12</code>. For multiplication and division, always convert to
      improper first&mdash;the &ldquo;FOIL&rdquo; approach (multiplying mixed numbers directly)
      is a classic trap.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Adding numerators and denominators directly.</strong> 1/3 + 1/4 is NOT 2/7. You
      must find a common denominator first. This is the single most common error.
    </p>
    <p>
      <strong>Forgetting to flip when dividing.</strong> <code>2/3 &divide; 4/5</code> is NOT{" "}
      <code>8/15</code>; that&rsquo;s the product. Division requires you to flip the second
      fraction, then multiply.
    </p>
    <p>
      <strong>Multiplying mixed numbers without converting.</strong> <code>2 1/2 &times; 3
      1/3</code> is NOT <code>6 1/6</code>. Convert each to an improper fraction first:{" "}
      <code>5/2 &times; 10/3 = 50/6 = 25/3 = 8 1/3</code>.
    </p>
    <p>
      <strong>Over-simplifying before multiplying.</strong> You can cancel a factor from any
      numerator against any denominator across a multiplication, but not across addition or
      subtraction. Don&rsquo;t cancel diagonally in <code>2/3 + 3/4</code>.
    </p>
    <p>
      <strong>Confusing a repeating decimal with a rounding error.</strong> 1/3 really is
      0.3333... with 3s forever, not 0.3333333 as a finite digit string. When a calculator
      shows 0.33333333, it&rsquo;s truncating.
    </p>
    <p>
      <strong>Writing 0 as a denominator.</strong> Division by zero is undefined. <code>3/0</code>
      is not a number; any chain of operations that leads to <code>/0</code> means you took a
      wrong turn.
    </p>
    <p>
      <strong>Leaving answers unsimplified.</strong> Most teachers and most real-world contexts
      expect simplified form. 6/8 should be 3/4; 10/4 should be 5/2 or 2 1/2.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Skip the common-denominator arithmetic and let our{" "}
      <a href="/tools/fraction-calculator">fraction calculator</a> handle the steps with
      show-your-work output. Pair it with the{" "}
      <a href="/tools/ratio-calculator">ratio calculator</a> when the problem is really a
      proportion in disguise, and the{" "}
      <a href="/tools/percentage-calculator">percentage calculator</a> for the common case of
      converting a fraction into a percent.
    </p>
  </>
);
