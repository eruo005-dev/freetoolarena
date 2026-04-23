import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      <code>clamp()</code> is one of the most useful additions to CSS
      in the last decade. It lets you set a value that fluidly scales
      between a minimum and maximum, based on viewport width or any
      other context. It replaces entire stacks of media queries with
      a single line. This guide covers the <code>clamp()</code>
      {" "}syntax, the math behind fluid typography, how to derive
      preferred-value expressions, when to reach for
      <code> clamp()</code> vs media queries, browser support, and
      common pitfalls.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Syntax</h2>
    <pre>
{`clamp(MIN, PREFERRED, MAX)`}
    </pre>
    <p>
      Returns the preferred value, bounded by min and max.
    </p>
    <p>
      Simple example:
    </p>
    <pre>
{`font-size: clamp(1rem, 2.5vw, 1.5rem);`}
    </pre>
    <p>
      At viewport width 400px → <code>2.5vw</code> = 10px → clamped
      up to 16px (1rem).
    </p>
    <p>
      At 800px → 20px → within range → returns 20px.
    </p>
    <p>
      At 1200px → 30px → clamped down to 24px (1.5rem).
    </p>

    <h2>Fluid typography — the killer use case</h2>
    <p>
      The old way: media-query breakpoints.
    </p>
    <pre>
{`h1 { font-size: 2rem; }
@media (min-width: 640px) { h1 { font-size: 2.5rem; }}
@media (min-width: 1024px) { h1 { font-size: 3rem; }}`}
    </pre>
    <p>
      The <code>clamp()</code> way:
    </p>
    <pre>
{`h1 { font-size: clamp(2rem, 1.5rem + 2vw, 3rem); }`}
    </pre>
    <p>
      Size grows smoothly with viewport. No jarring jumps at
      breakpoints. Less CSS.
    </p>

    <h2>The preferred-value formula</h2>
    <p>
      The middle argument has to do some math: combine a viewport
      unit with a fixed offset so the value hits your min at a
      specific small viewport and your max at a specific large
      viewport.
    </p>
    <p>
      Want font-size 16px at 320px viewport, 32px at 1280px viewport?
    </p>
    <p>
      <strong>Rise:</strong> 32 − 16 = 16px over 1280 − 320 = 960px
      = 1.667% per px of viewport = <code>1.667vw</code> (since 1vw
      = 1% of viewport).
    </p>
    <p>
      <strong>Offset:</strong> at viewport 320px, <code>1.667vw</code>
      {" "}= 5.33px. You want 16px, so add 16 − 5.33 = 10.67px ≈{" "}
      <code>0.667rem</code>.
    </p>
    <p>
      <strong>Expression:</strong>{" "}
      <code>clamp(1rem, 0.667rem + 1.667vw, 2rem)</code>.
    </p>
    <p>
      The <code>0.667rem + 1.667vw</code> reaches exactly 1rem
      (16px) at 320px and 2rem (32px) at 1280px. Beyond that, the
      clamp kicks in.
    </p>

    <h2>Beyond typography</h2>
    <p>
      <strong>Spacing:</strong>
    </p>
    <pre>
{`padding: clamp(1rem, 5vw, 3rem);`}
    </pre>
    <p>
      Hero sections get more breathing room on desktop without
      crushing mobile.
    </p>
    <p>
      <strong>Grid gap:</strong>
    </p>
    <pre>
{`gap: clamp(0.5rem, 2vw, 2rem);`}
    </pre>
    <p>
      <strong>Border radius:</strong>
    </p>
    <pre>
{`border-radius: clamp(4px, 1vw, 16px);`}
    </pre>
    <p>
      <strong>Section max-width:</strong>
    </p>
    <pre>
{`max-width: clamp(400px, 80vw, 1200px);`}
    </pre>
    <p>
      Anywhere a length value varies with context, <code>clamp()</code>
      {" "}can replace multiple declarations.
    </p>

    <h2>Using other units in clamp</h2>
    <p>
      <code>clamp()</code> works with any length units — px, rem,
      em, %, vw, vh, ch, ex, and container query units (cqi, cqw).
      Mix freely:
    </p>
    <pre>
{`width: clamp(300px, 50%, 800px);
font-size: clamp(1rem, 5cqi, 2rem);  /* container queries */`}
    </pre>
    <p>
      Container query units are especially powerful paired with{" "}
      <code>@container</code> — let components fluidly scale within
      their own container, not the viewport.
    </p>

    <h2>clamp() vs media queries</h2>
    <p>
      <strong>Use clamp() when</strong> a value scales smoothly with
      viewport size — typography, spacing, gap, proportional sizing.
    </p>
    <p>
      <strong>Use media queries when</strong> layout changes
      structure — column count, hidden/shown elements, flex
      direction, different components entirely.
    </p>
    <p>
      They coexist. A component with{" "}
      <code>font-size: clamp(...)</code> inside a media-query-driven
      grid is completely normal.
    </p>

    <h2>Accessibility — minimum matters</h2>
    <p>
      Users often set a minimum browser font size for readability.
      <code>clamp()</code> with a small <code>vw</code>-only
      preferred value can collapse below the user&rsquo;s
      minimum on tiny viewports.
    </p>
    <p>
      <strong>Rule:</strong> use a <code>rem</code>-based component
      in the preferred value, not pure <code>vw</code>. That way
      user zoom and base font-size changes continue to scale:
    </p>
    <pre>
{`/* Good */
font-size: clamp(1rem, 0.8rem + 1.5vw, 1.5rem);

/* Bad — ignores user's base font */
font-size: clamp(16px, 4vw, 24px);`}
    </pre>

    <h2>Generator tools exist for a reason</h2>
    <p>
      The preferred-value math is error-prone. Plug your target
      sizes and breakpoints into a generator and get the expression.
      Plenty of free ones, including our own{" "}
      <a href="/tools/css-clamp-generator">CSS clamp generator</a>.
    </p>
    <p>
      Bookmark one — you&rsquo;ll use it every time you build a
      fluid design system.
    </p>

    <h2>Browser support</h2>
    <p>
      <strong>clamp() is universal since 2020.</strong> Chrome 79+,
      Firefox 75+, Safari 13.1+. Not a concern in 2026.
    </p>
    <p>
      <strong>Container query units (cqi/cqw):</strong> Chrome 105+,
      Firefox 110+, Safari 16+. Safe for most projects now.
    </p>

    <h2>Debugging clamp</h2>
    <p>
      Inspect the element in devtools. Chrome and Firefox show the
      computed value at current viewport and highlight the clamp
      expression. Adjust the window and watch it update.
    </p>
    <p>
      <strong>Pitfall:</strong> if your preferred value is stuck at
      min or max across all viewports, either your breakpoints
      don&rsquo;t hit or your math is off. A generator catches
      this.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using only vw in preferred.</strong> Ignores user
      zoom and base font changes. Use rem + vw.
    </p>
    <p>
      <strong>Setting min too low.</strong> Text collapses to
      unreadable on mobile. Min should be your intended mobile
      value, not smaller.
    </p>
    <p>
      <strong>Setting max too high.</strong> Text or spacing
      balloons on wide monitors. Max should be your intended desktop
      value.
    </p>
    <p>
      <strong>Using clamp for things that should be fixed.</strong>
      Button padding usually doesn&rsquo;t need fluid scaling.
    </p>
    <p>
      <strong>Combining with px-based media queries inconsistently.</strong>
      Pick rem-based breakpoints and stick with them; clamp() plays
      nicer with rems.
    </p>
    <p>
      <strong>Doing the math by hand repeatedly.</strong> Use a
      generator. You&rsquo;ll save hours.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate a <code>clamp()</code> expression from min/max sizes
      and viewport range with the{" "}
      <a href="/tools/css-clamp-generator">CSS clamp generator</a>.
      Pair with the{" "}
      <a href="/tools/css-minifier">CSS minifier</a> to ship the
      final stylesheet, and the{" "}
      <a href="/tools/gradient-generator">CSS gradient generator</a>
      {" "}to pair fluid type with visual polish.
    </p>
  </>
);
