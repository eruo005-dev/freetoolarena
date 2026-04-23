import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Roman numerals still show up in surprising places&mdash;movie copyright dates, Super Bowl
      logos, clock faces, papal names, book chapters, and the outline you wrote in ninth grade.
      The system looks alien because it&rsquo;s additive and positional at the same time, with a
      subtractive trick that changes the meaning of two letters standing next to each other.
      Once you internalize the seven core symbols and the four subtractive pairs, reading any
      numeral under 3,999 takes about two seconds of mental arithmetic. Beyond that, the notation
      breaks down&mdash;there&rsquo;s no clean way to write a million without resorting to overlines
      or modern extensions that almost nobody recognizes. This guide covers the seven letters,
      the subtractive principle, why IIII sometimes replaces IV on clocks, how to convert in
      both directions, and the modern contexts where the system still earns its keep.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The seven symbols</h2>
    <p>
      Everything in Roman numerals is built from seven letters with fixed values. I is 1, V is 5,
      X is 10, L is 50, C is 100, D is 500, and M is 1,000. That&rsquo;s the entire alphabet of the
      system. There&rsquo;s no zero, no negative, and no fractional notation in standard use&mdash;the
      Romans handled fractions with a separate duodecimal system based on the <em>uncia</em>.
    </p>
    <pre>{`I = 1      C = 100
V = 5      D = 500
X = 10     M = 1000
L = 50`}</pre>
    <p>
      Notice the pattern: the letters alternate between &ldquo;one&rdquo; units (I, X, C, M) and
      &ldquo;five&rdquo; units (V, L, D). Each level is ten times the one-unit below it, which
      makes the system decimal in disguise even though it doesn&rsquo;t use place value.
    </p>

    <h2>Addition is the default</h2>
    <p>
      When symbols appear in descending order, you add them. VIII is 5 + 1 + 1 + 1 = 8. LXXVII
      is 50 + 10 + 10 + 5 + 1 + 1 = 77. MMXXVI is 1000 + 1000 + 10 + 10 + 5 + 1 = 2026. The
      &ldquo;descending order&rdquo; rule is what makes the notation unambiguous&mdash;you walk
      left to right and accumulate.
    </p>

    <h2>The subtractive principle</h2>
    <p>
      When a smaller symbol appears <strong>before</strong> a larger one, subtract the smaller
      from the larger. IV is 5 &minus; 1 = 4. IX is 10 &minus; 1 = 9. XL is 50 &minus; 10 = 40.
      XC is 100 &minus; 10 = 90. CD is 500 &minus; 100 = 400. CM is 1,000 &minus; 100 = 900. There
      are exactly six legal subtractive pairs; everything else is invalid.
    </p>
    <pre>{`Allowed subtractive pairs:
IV = 4    XL = 40    CD = 400
IX = 9    XC = 90    CM = 900

Illegal:
IC (for 99) — must be XCIX
IM (for 999) — must be CMXCIX`}</pre>
    <p>
      The subtractive rule is: you can only subtract a power of ten (I, X, C) from the next two
      higher symbols. You can subtract I from V or X, X from L or C, and C from D or M. You
      cannot subtract V, L, or D from anything, and you cannot subtract across more than one
      level.
    </p>

    <h2>Converting a decimal number to Roman</h2>
    <p>
      The cleanest algorithm is greedy substitution. Walk through the values in order from
      largest to smallest&mdash;M, CM, D, CD, C, XC, L, XL, X, IX, V, IV, I&mdash;and at each
      step, emit as many copies of the current token as fit into the remaining number, then
      subtract. For 1994: M (994 left), CM (94 left), XC (4 left), IV (0 left), giving MCMXCIV.
    </p>
    <pre>{`1994 → M CM XC IV → MCMXCIV
2026 → MM XX VI → MMXXVI
3888 → MMM DCCC LXXX VIII → MMMDCCCLXXXVIII (longest numeral under 4000)
49  → XL IX → XLIX`}</pre>

    <h2>Converting Roman to decimal</h2>
    <p>
      Read left to right. If the current letter&rsquo;s value is greater than or equal to the
      next letter&rsquo;s value, add it. Otherwise subtract it. MCMXCIV walks as:
      M (+1000), C (&minus;100 because M &gt; C... wait, C &lt; M, so subtract), M (+1000),
      X (&minus;10), C (+100), I (&minus;1), V (+5), totaling 1994. The algorithm is easy to
      implement and only takes a single pass.
    </p>

    <h2>The 3,999 ceiling</h2>
    <p>
      Standard Roman numerals max out at MMMCMXCIX = 3,999. To write 4,000 you&rsquo;d need four
      Ms in a row, which violates the &ldquo;no more than three of the same letter&rdquo;
      convention. Historical workarounds include a bar over a letter (vinculum) meaning
      &ldquo;multiply by 1,000,&rdquo; so V&#772; means 5,000. In practice, when a number exceeds
      3,999, people switch to Arabic digits. Movie copyrights almost never hit this wall, and
      when they do, the studios just write the year normally.
    </p>

    <h2>Where you still see Roman numerals</h2>
    <p>
      Film and TV copyright dates use them, partly for tradition and partly because Roman
      numerals are harder to read at a glance&mdash;which, cynically, helps hide how old a
      rerun is. The Super Bowl uses them (except Super Bowl 50, which was stylized as
      &ldquo;50&rdquo; because &ldquo;L&rdquo; looked weak on merchandise). Popes, monarchs, and
      ships take Roman numerals as ordinals&mdash;Elizabeth II, Henry VIII, Apollo 11 is an
      exception because NASA preferred Arabic. Book prefaces use them for front matter page
      numbers. Clock faces use them, often with IIII instead of IV for visual symmetry opposite
      VIII.
    </p>

    <h2>Why IIII instead of IV on clocks</h2>
    <p>
      Walk around a watch display and you&rsquo;ll notice most analog clocks with Roman numerals
      show IIII at the 4 o&rsquo;clock position, not IV. The conventional explanations: visual
      symmetry with VIII on the opposite side (both are four characters wide), a reluctance to
      use IV because it&rsquo;s the first two letters of IVPITER (Jupiter) in Latin, and the
      casting convenience of making the same mold four times for I-I-I-I dials. Big Ben famously
      uses IV. It&rsquo;s a style choice, not a correctness issue.
    </p>

    <h2>Arithmetic in Roman numerals</h2>
    <p>
      The Romans did not do arithmetic with the written form&mdash;they used a counting board
      called an <em>abacus</em> and wrote results in numerals afterward. Trying to add MCMXCIV
      and CCXXXIII by manipulating letters is a nightmare. This is one reason Arabic numerals
      with positional notation and zero eventually won: addition, multiplication, and especially
      division are dramatically easier when digits carry place value.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using illegal subtractive pairs.</strong> IC for 99 is wrong; it must be XCIX.
      IIII is informally accepted on clocks but formally the correct form of 4 is IV. The
      subtractive rule only works one level down, and only with I, X, or C as the subtracted
      symbol.
    </p>
    <p>
      <strong>Stacking four identical letters.</strong> Standard Roman numerals never show
      IIII, XXXX, CCCC, or MMMM (the clock exception aside). If your conversion produces four of
      anything, you&rsquo;ve missed a subtractive step&mdash;re-check the number.
    </p>
    <p>
      <strong>Reading a year as a word.</strong> MCM at the start of a film credit is 1900, not
      &ldquo;mick-em.&rdquo; Break the numeral into additive chunks and sum them; never try to
      pronounce it.
    </p>
    <p>
      <strong>Confusing L and I.</strong> In ornamental typefaces L and I can look similar.
      Context saves you&mdash;LI is 51, not II. When in doubt, count strokes and remember that
      L has a horizontal foot.
    </p>
    <p>
      <strong>Assuming zero exists.</strong> There is no Roman zero. The concept entered Europe
      through Arabic mathematics centuries later. If a puzzle asks you for the Roman numeral
      representing zero, the answer is &ldquo;N&rdquo; (for <em>nulla</em>) used by medieval
      monks, but it&rsquo;s not part of standard notation.
    </p>
    <p>
      <strong>Forgetting the 3,999 ceiling.</strong> When you need to represent a year like
      4,000 or a large count, Roman numerals break down. Don&rsquo;t invent new notation; switch
      to Arabic digits.
    </p>
    <p>
      <strong>Reading digits left-to-right without looking ahead.</strong> You must compare each
      letter to the next one to decide whether to add or subtract. Reading in isolation makes
      IV look like 6 (5 + 1) instead of 4. Always peek at the next letter.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Don&rsquo;t translate Roman numerals by hand when you&rsquo;re checking a copyright date
      or a Super Bowl logo; paste the numeral into our{" "}
      <a href="/tools/roman-numeral-converter">Roman numeral converter</a>. Pair it with the{" "}
      <a href="/tools/base64-encoder-decoder">Base64 encoder</a> when you&rsquo;re decoding
      opaque identifiers from old file headers, and the{" "}
      <a href="/tools/unit-converter">unit converter</a> for the adjacent problem of translating
      between old and modern measurement systems.
    </p>
  </>
);
