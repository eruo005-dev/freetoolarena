import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Ratios quietly run a huge fraction of practical math&mdash;recipes, aspect ratios, paint
      mixes, fuel blends, map scales, financial leverage, screen resolutions, even betting odds.
      A ratio expresses a relationship between two quantities that stays constant as you scale
      them, which makes it the right tool whenever &ldquo;how much of one per unit of the
      other&rdquo; matters more than absolute amounts. Yet ratios confuse people because they
      can be written three different ways (<code>3:2</code>, <code>3/2</code>,{" "}
      <code>3 to 2</code>), they can describe part-to-part or part-to-whole relationships, and
      finding an unknown in a proportion requires cross-multiplying in a direction
      that&rsquo;s easy to reverse. This guide covers the notation, simplification, solving
      for unknowns with cross-multiplication, scaling problems, part-to-part versus part-to-whole,
      and real-world ratio problems you&rsquo;ll see in the wild.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What a ratio actually means</h2>
    <p>
      A ratio compares two quantities of the same kind. <code>3:2</code> means &ldquo;for every
      3 of one, there are 2 of the other.&rdquo; The absolute amounts can be 3 and 2, or 30 and
      20, or 300 and 200&mdash;the relationship is the same. A ratio with three terms like{" "}
      <code>2:3:5</code> works the same way, describing three quantities whose proportions stay
      fixed.
    </p>
    <pre>{`Paint mix 2:3 (blue:yellow)
  → 2 parts blue, 3 parts yellow
  → scales to 4:6, 20:30, 200:300`}</pre>

    <h2>Part-to-part versus part-to-whole</h2>
    <p>
      &ldquo;Three boys to two girls&rdquo; is part-to-part&mdash;the ratio 3:2 ignores the
      total. &ldquo;Three boys out of five students&rdquo; is part-to-whole&mdash;the ratio 3:5
      includes the total on the right. This matters because you can convert a part-to-part
      ratio into a part-to-whole one by summing: 3:2 means 3 out of 5 and 2 out of 5. Confusing
      the two directions is the single most common ratio mistake on word problems.
    </p>

    <h2>Simplifying ratios</h2>
    <p>
      Divide both sides by their greatest common divisor. <code>12:18</code> divides by 6 to
      give <code>2:3</code>. <code>24:36:60</code> divides by 12 to give <code>2:3:5</code>. If
      the terms aren&rsquo;t whole numbers, multiply to clear decimals first: <code>0.5:1.25</code>
      becomes <code>2:5</code> after multiplying both by 4 and dividing by the GCD.
    </p>
    <pre>{`12:18  → gcd = 6  → 2:3
45:30  → gcd = 15 → 3:2
1.5:2  → ×2 → 3:4
2/3 : 1/2 → ×6 → 4:3`}</pre>

    <h2>Finding an unknown with cross-multiplication</h2>
    <p>
      Given a proportion <code>a:b = c:x</code>, solve by cross-multiplying: <code>a&middot;x =
      b&middot;c</code>, so <code>x = b&middot;c / a</code>. This is the workhorse of scaling
      problems.
    </p>
    <pre>{`Recipe calls for 2 cups flour per 3 cookies.
How much flour for 18 cookies?

  2 : 3 = x : 18
  cross: 2 × 18 = 3 × x
         36 = 3x
         x = 12 cups`}</pre>

    <h2>Scaling recipes</h2>
    <p>
      A cookie recipe says 2 cups flour, 1 cup sugar, 1/2 cup butter, makes 24 cookies. For 36
      cookies, multiply every ingredient by 36/24 = 1.5: 3 cups flour, 1.5 cups sugar, 3/4 cup
      butter. The scaling factor is the ratio of desired output to original output. Ratios
      preserve correctness because every ingredient scales by the same amount.
    </p>

    <h2>Aspect ratios</h2>
    <p>
      A screen&rsquo;s aspect ratio is width:height. 16:9 is the modern TV standard; 4:3 was
      the old broadcast standard; 21:9 is ultrawide. If you have a 16:9 video and a canvas of
      1,920 pixels wide, the height is 1,920 &times; 9 / 16 = 1,080 pixels. Aspect ratios also
      tell you whether an image will have letterboxing (bars) when displayed on a differently
      proportioned screen.
    </p>
    <pre>{`16:9 at 1920 wide   → 1080 tall
16:9 at 1280 wide   → 720 tall
4:3 at 1024 wide    → 768 tall
21:9 at 3440 wide   → 1440 tall`}</pre>

    <h2>Map scales</h2>
    <p>
      A map scale of 1:24,000 means one unit on the map equals 24,000 units in the real world.
      One inch on the map is 24,000 inches (2,000 feet) on the ground. Cartographers sometimes
      write &ldquo;1 inch = 2,000 feet&rdquo; instead of the raw ratio, but the math is
      identical. Topographic maps frequently use 1:24,000 or 1:50,000; city street maps often
      1:10,000 or finer.
    </p>

    <h2>Fuel and chemical mixes</h2>
    <p>
      Two-stroke engines run on a gas:oil mix, commonly 50:1. For 2 gallons of gas, oil =
      2 &times; 128 fl oz / 50 = 5.12 fl oz. Getting the ratio wrong seizes the engine (too
      little oil) or fouls the plug (too much). Concrete mix, resin kits, and darkroom
      chemistry all work the same way&mdash;the ratio is sacred, the volumes are flexible.
    </p>

    <h2>Odds versus probability</h2>
    <p>
      Betting odds of 3:1 (against) mean 1 win for every 3 losses, i.e. probability 1/4 = 25%.
      Odds of 3:1 (in favor) mean 3 wins for every 1 loss, probability 3/4 = 75%. Convert
      between the two with <code>p = favorable / (favorable + unfavorable)</code>. American
      sports books write this differently (+300 or &minus;150) but the underlying idea is still
      a ratio.
    </p>

    <h2>Three-term ratios</h2>
    <p>
      A concrete mix might be 1:2:4 cement:sand:gravel. If you need 14 cubic feet total,
      divide by the sum 1+2+4 = 7 to find the unit: 2 cubic feet per part. So 2 cement, 4 sand,
      8 gravel. The &ldquo;parts total&rdquo; trick works for any multi-term ratio.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Flipping the ratio mid-problem.</strong> If the question says 3 boys to 2 girls,
      the ratio is 3:2, not 2:3. Write the quantities in the stated order and stick with it.
    </p>
    <p>
      <strong>Using part-to-part when the problem wants part-to-whole.</strong> &ldquo;3:2 boys
      to girls&rdquo; does NOT mean &ldquo;3/2 of the class is boys.&rdquo; It means 3 boys
      out of every 5 students. Add the terms to get the whole.
    </p>
    <p>
      <strong>Forgetting to simplify.</strong> 12:18 and 2:3 are the same ratio, but simplified
      form is almost always what the problem expects. Always reduce to lowest terms unless
      the context demands the raw numbers.
    </p>
    <p>
      <strong>Mixing units.</strong> Comparing feet to inches or minutes to seconds without
      converting gives meaningless ratios. 3 feet : 2 inches is actually 18:1 once you
      normalize to inches. Check units before setting up the ratio.
    </p>
    <p>
      <strong>Cross-multiplying the wrong pair.</strong> In <code>a/b = c/d</code>, the cross
      products are <code>a&middot;d</code> and <code>b&middot;c</code>. It&rsquo;s easy to
      accidentally multiply <code>a&middot;c</code>. Draw the X physically if you need to.
    </p>
    <p>
      <strong>Assuming ratios add directly.</strong> Ratios 1:2 and 1:3 do not average to 1:2.5.
      To combine ratios you need to find a common multiplier and sum the parts properly, or
      convert to fractions first.
    </p>
    <p>
      <strong>Ignoring rounding in scaled recipes.</strong> Scaling a recipe by 1.5 might
      produce 2.25 cups of flour, which is fine. But scaling eggs by 1.5 gives 1.5 eggs, which
      isn&rsquo;t&mdash;you round to 2 and accept a slightly richer batch, or scale differently.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Stop doing cross-multiplication in your head when you&rsquo;re sizing a recipe or a paint
      batch; use our <a href="/tools/ratio-calculator">ratio calculator</a>. Pair it with the{" "}
      <a href="/tools/fraction-calculator">fraction calculator</a> for the messy intermediate
      steps when your ratios involve fractions, and the{" "}
      <a href="/tools/percentage-calculator">percentage calculator</a> for part-to-whole
      conversions where you want the answer as a percent.
    </p>
  </>
);
