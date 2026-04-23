import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      You&rsquo;re halfway into a French pastry recipe when it asks for 250g of flour and
      your measuring cups are in US customary units. You eyeball it, the dough turns into
      glue, and now you&rsquo;re angry at the internet. Cooking conversions look simple
      until you hit the three traps that ruin batches: volume vs weight for dry
      ingredients, the US/UK/metric cup drift, and oven temperatures that nobody agrees
      on. This guide covers the unit systems you&rsquo;ll actually encounter, when
      precision matters (baking) versus when it doesn&rsquo;t (soups), the flour-and-sugar
      weight tables that professional kitchens use, and the temperature conversions that
      keep your cakes from turning into bricks.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The three cup sizes that trip people up</h2>
    <p>
      A &ldquo;cup&rdquo; is not one unit. The <strong>US customary cup</strong> is
      240ml, the <strong>US legal cup</strong> (used on nutrition labels) is 240ml
      rounded from 236.588ml, the <strong>metric cup</strong> used in Australia, New
      Zealand, and Canada is 250ml, and the historical <strong>UK imperial cup</strong>
      was 284ml &mdash; though modern UK recipes almost always use grams instead. If a
      recipe says &ldquo;1 cup flour&rdquo; and you use a 250ml cup where a 240ml was
      intended, you&rsquo;ve added 4% extra. For bread or macarons that&rsquo;s enough to
      wreck the hydration ratio.
    </p>

    <h2>Teaspoons and tablespoons</h2>
    <p>
      These are more consistent globally. A <strong>teaspoon</strong> is 5ml everywhere
      except Australia where it&rsquo;s sometimes 5ml and sometimes not. A{" "}
      <strong>tablespoon</strong> is 15ml in the US and UK, 20ml in Australia. That 33%
      difference in tablespoons matters for anything with salt, leavener, or strong
      spices &mdash; a tablespoon of baking soda when you meant 15ml will taste like
      soap.
    </p>
    <pre>{`1 tsp  = 5 ml
1 tbsp = 15 ml (US/UK) or 20 ml (AU)
1 fl oz = 29.5735 ml
1 US cup = 16 tbsp = 48 tsp = 240 ml
1 metric cup = 250 ml
1 pint (US) = 473 ml, 1 pint (UK) = 568 ml`}</pre>

    <h2>Volume vs weight for flour</h2>
    <p>
      This is the biggest source of recipe failure. A cup of flour can weigh anywhere from
      120g to 155g depending on how it&rsquo;s scooped. A packed cup (scoop-and-shake) is
      ~150g. A spooned-and-leveled cup is ~125g. That&rsquo;s a 20% variance in the core
      ingredient, which is why every serious baking recipe now lists flour by weight.
      <strong> Use a kitchen scale for baking</strong> &mdash; a $15 scale pays for
      itself the first time your cookies stop being a lottery.
    </p>
    <p>
      Reference weights: all-purpose flour 125g/cup, bread flour 130g/cup, cake flour
      115g/cup, whole wheat flour 130g/cup. These assume the spoon-and-level method.
    </p>

    <h2>Sugar, butter, and other dense staples</h2>
    <p>
      Granulated sugar is denser and more consistent than flour: 200g per US cup. Brown
      sugar depends on how it&rsquo;s packed &mdash; a packed cup is ~220g, a loose cup
      is ~170g. Recipes that say &ldquo;1 cup packed brown sugar&rdquo; mean push it down
      with the back of a spoon so it holds the cup shape when dumped. Butter in the US
      comes in 113g sticks (quarter-pound), subdivided into 8 tablespoons per stick. In
      Europe, butter is almost always measured in grams.
    </p>

    <h2>Liquids are simpler but watch the ounce</h2>
    <p>
      Fluid ounces measure volume. Weight ounces measure mass. For water they&rsquo;re
      nearly equal (8 fl oz = 236g of water), which is where the confusion comes from.
      For anything denser &mdash; honey, molasses, heavy cream &mdash; 8 fl oz weighs
      more than 8 oz. A recipe that asks for &ldquo;8 oz honey&rdquo; is ambiguous;
      assume weight unless context says volume.
    </p>

    <h2>Oven temperatures: Fahrenheit, Celsius, gas marks</h2>
    <p>
      The common conversion is C = (F &minus; 32) &times; 5/9, but memorize these
      landmarks because they come up constantly: 350&deg;F = 175&deg;C = gas mark 4
      (classic baking), 375&deg;F = 190&deg;C = gas mark 5, 400&deg;F = 200&deg;C = gas
      mark 6, 425&deg;F = 220&deg;C = gas mark 7 (pizza), 450&deg;F = 230&deg;C = gas
      mark 8.
    </p>
    <pre>{`F     C     Gas  Common use
250   120   1/2  Meringues, slow drying
300   150   2    Slow roasts
350   175   4    Most baking (default)
375   190   5    Muffins, quick breads
400   200   6    Roast vegetables
425   220   7    Pizza, hot-roasting
450   230   8    Bread crust, broiling
500   260   10   Neapolitan pizza (domestic max)`}</pre>
    <p>
      Convection (fan) ovens run hotter. Drop the temperature 15&ndash;20&deg;C (~25&deg;F)
      or reduce the time by 20% when converting from a conventional recipe.
    </p>

    <h2>Regional recipe language</h2>
    <p>
      American recipes use cups, sticks of butter, and Fahrenheit. British recipes use
      grams, milliliters, and Celsius &mdash; and call self-rising flour what Americans
      call self-rising flour (same thing, different name). Australian recipes use the
      20ml tablespoon. French recipes almost always weight-based, with butter in grams
      and temperatures in Celsius. When you find a recipe you love, take 10 minutes to
      write in the conversions next to the original measurements &mdash; future-you will
      thank you.
    </p>

    <h2>When precision matters and when it doesn&rsquo;t</h2>
    <p>
      <strong>Baking, pastry, and confectionery</strong> are chemistry &mdash; ratios of
      flour:fat:liquid:leavener determine whether the thing rises or collapses. Weigh
      everything. <strong>Soups, stews, stir-fries, and braises</strong> are forgiving
      &mdash; eyeballed is fine. <strong>Candy-making and sugar work</strong> require a
      thermometer, not measuring cups &mdash; temperature stages (soft-ball, hard-crack)
      matter more than weights. <strong>Sourdough</strong> is weight-obsessed because
      baker&rsquo;s percentages define the dough.
    </p>

    <h2>Converting a whole recipe</h2>
    <p>
      Don&rsquo;t convert piece by piece &mdash; you&rsquo;ll accumulate rounding errors.
      Convert the largest ingredient (usually flour or liquid) first, then scale others
      proportionally. For doubling or halving, rewrite the whole recipe in the target
      units before you start, and double-check the egg count &mdash; you can&rsquo;t
      halve an egg without beating and measuring, and 30g of beaten egg is roughly half
      a large egg.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using fl oz and oz interchangeably.</strong> Fluid ounces are volume,
      weight ounces are mass. They&rsquo;re only equal for water.
    </p>
    <p>
      <strong>Scooping flour instead of spooning.</strong> Plunging the cup into the bag
      packs the flour and adds 20&ndash;30g. Spoon into the cup, then level with a knife.
    </p>
    <p>
      <strong>Converting oven temps without adjusting convection.</strong> Fan ovens run
      hot &mdash; subtract 20&deg;C from the conventional temperature or your cake browns
      before it sets.
    </p>
    <p>
      <strong>Assuming 1 cup = 250ml everywhere.</strong> In US recipes it&rsquo;s 240ml.
      The 4% difference wrecks bread hydration.
    </p>
    <p>
      <strong>Using the wrong tablespoon.</strong> Australian tablespoons are 20ml, not
      15ml. For salt, baking soda, or baking powder that&rsquo;s enough to ruin the
      dish.
    </p>
    <p>
      <strong>Trusting conversions for brown sugar without packing.</strong> Packed and
      loose cups of brown sugar differ by 30%. Recipes almost always mean packed.
    </p>
    <p>
      <strong>Ignoring altitude.</strong> Above 3,000ft, leaveners over-rise and liquids
      evaporate faster. Conversion tables don&rsquo;t cover this &mdash; look up
      altitude-specific adjustments.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert cups, grams, tablespoons, and oven temperatures in one place with the{" "}
      <a href="/tools/cooking-converter">cooking converter</a>. Pair with the{" "}
      <a href="/tools/unix-timestamp-converter">unix timestamp converter</a> for tracking
      fermentation and proofing start times across timezones, and the{" "}
      <a href="/tools/time-zone-converter">time zone converter</a> for coordinating
      multi-step bakes with collaborators.
    </p>
  </>
);
