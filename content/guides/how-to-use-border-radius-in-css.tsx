import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      The CSS <code>border-radius</code> property rounds the corners of any box and is one of the highest-ROI design knobs on the web: one line changes the entire feel of a card, button, or avatar. The basics are trivial, but the full feature is surprisingly deep &mdash; shorthand for all four corners, individual-corner properties, pixel versus percent units, elliptical radii, and the pill, circle, and squircle patterns every design system eventually needs. This guide walks through the syntax variations in the order you actually need them, explains when to use percent versus pixels, and covers the common shape patterns with copy-ready code.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The simplest form</h2>
    <p>
      One value applies to all four corners:
    </p>
    <pre>{`.card {
  border-radius: 8px;
}`}</pre>
    <p>
      This is 80% of what most sites need: a single radius that softens every corner of every card, button, and input. Pick one value for your design system (commonly 4, 6, 8, 12, or 16&nbsp;px), apply it globally, and stop agonizing.
    </p>

    <h2>Shorthand: one, two, three, or four values</h2>
    <p>
      Like <code>padding</code> and <code>margin</code>, <code>border-radius</code> accepts up to four values with specific meanings:
    </p>
    <pre>{`border-radius: 8px;                  /* all four corners */
border-radius: 8px 16px;             /* top-left+bottom-right, top-right+bottom-left */
border-radius: 8px 16px 4px;         /* TL, TR+BL, BR */
border-radius: 8px 16px 4px 12px;    /* TL, TR, BR, BL (clockwise from top-left) */`}</pre>
    <p>
      The four-value form is clockwise starting from the top-left, same order as padding and margin (top, right, bottom, left adapted to corners).
    </p>

    <h2>Individual corner properties</h2>
    <p>
      When you want to round only specific corners, the per-corner properties are clearer than a four-value shorthand:
    </p>
    <pre>{`.tab {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  /* bottom corners stay square */
}`}</pre>
    <p>
      Common patterns:
    </p>
    <ul>
      <li><strong>Tab shape:</strong> top corners rounded, bottom square.</li>
      <li><strong>Card with image on top:</strong> top-radius on the image, match on the outer card, bottom square or matching the card.</li>
      <li><strong>Chat bubble with tail:</strong> three corners rounded, one square on the speaker side.</li>
      <li><strong>Modal with a footer:</strong> top corners rounded to match content, footer gets bottom rounding.</li>
    </ul>

    <h2>Percent versus pixels</h2>
    <p>
      A fixed pixel radius (<code>border-radius: 12px</code>) keeps the same visual curve regardless of element size. A percentage (<code>border-radius: 50%</code>) scales with the box: 50% of the shorter side for a circle, or proportional curves that grow with the element.
    </p>
    <p>
      Use pixels for consistent curves across a design system. Use percentages for shapes that should morph with size:
    </p>
    <ul>
      <li><code>50%</code> on a square gives a circle.</li>
      <li><code>50%</code> on a rectangle gives a pill with half-circle ends.</li>
      <li><code>25%</code> gives a rounded-square shape that scales.</li>
    </ul>

    <h2>Pill and capsule buttons</h2>
    <p>
      The classic pill button: make the radius greater than or equal to half the height:
    </p>
    <pre>{`.pill {
  height: 40px;
  padding: 0 20px;
  border-radius: 9999px;
}`}</pre>
    <p>
      Using <code>9999px</code> (or any large value) is the idiom: the radius saturates at half the height, so the value doesn&rsquo;t need to match the height exactly. The button stays perfectly pill-shaped even if you change height or padding later.
    </p>

    <h2>Perfect circles</h2>
    <p>
      A perfect circle needs a square container plus 50% radius:
    </p>
    <pre>{`.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}`}</pre>
    <p>
      If the element isn&rsquo;t square, 50% produces an ellipse. For avatar grids, enforce square dimensions with <code>aspect-ratio: 1 / 1</code> or explicit width and height.
    </p>

    <h2>Elliptical radii</h2>
    <p>
      A corner can have different horizontal and vertical radii, producing an ellipse in that corner. Syntax uses a slash:
    </p>
    <pre>{`.hero {
  border-radius: 40px / 20px;
}`}</pre>
    <p>
      This makes every corner an ellipse wider than it is tall. Combined with the four-value shorthand, you can produce creative shapes:
    </p>
    <pre>{`.blob {
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
}`}</pre>
    <p>
      That produces an organic, blob-like shape useful for decorative backgrounds.
    </p>

    <h2>Radius versus overflow clipping</h2>
    <p>
      A rounded box clips its background and border at the radius, but child elements leak past the curve by default. To clip children too &mdash; images that extend to the card&rsquo;s edge, video embeds &mdash; add <code>overflow: hidden</code>:
    </p>
    <pre>{`.card {
  border-radius: 12px;
  overflow: hidden;
}`}</pre>
    <p>
      Watch out: <code>overflow: hidden</code> also clips box shadows of children, so if you&rsquo;ve got a child element with its own shadow that should spill outside, you need a different approach (usually shadow on the parent, not the child).
    </p>

    <h2>Radius and borders</h2>
    <p>
      When you have both <code>border</code> and <code>border-radius</code>, the border follows the curve. Keep borders subtle at small radii; a 2&nbsp;px border on an 8&nbsp;px radius reads fine, but a 10&nbsp;px border on a 12&nbsp;px radius looks chunky and cartoonish.
    </p>
    <p>
      Borders with large radii on rectangular elements can produce a visible &ldquo;stretched ring&rdquo; effect at the long ends &mdash; the border appears thicker there because the curve is tighter. For pills this is usually fine; for oblong cards, consider smaller radii.
    </p>

    <h2>Radius and outlines</h2>
    <p>
      Historically, <code>outline</code> did not respect <code>border-radius</code> &mdash; the outline would draw a sharp-cornered rectangle around a rounded element. Modern browsers support rounded outlines natively, but if you need to support older browsers or want extra control, <code>box-shadow</code> with <code>0 0 0 2px color</code> is a common drop-in replacement that does respect the radius.
    </p>

    <h2>The squircle problem</h2>
    <p>
      iOS app icons use a shape called a squircle &mdash; a superellipse, not a true rounded rectangle. CSS <code>border-radius</code> can&rsquo;t produce a true squircle; its curves are circular arcs. For most design contexts the difference is imperceptible, but if you&rsquo;re matching iOS iconography precisely, you need SVG or <code>clip-path</code> with a squircle formula rather than <code>border-radius</code>.
    </p>

    <h2>Design system presets</h2>
    <p>
      Rather than choosing radii per component, define a scale and use it:
    </p>
    <pre>{`:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
}`}</pre>
    <p>
      Then components reference the variables. Changing the system is one edit instead of a hundred.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Using 50% radius on a rectangle when you wanted a rounded square, and getting a pill. Forgetting <code>overflow: hidden</code> and watching child images leak past rounded corners. Applying giant radii to small elements so the content feels cramped inside a blob. Using inconsistent radii across a design (4&nbsp;px here, 6&nbsp;px there, 7&nbsp;px somewhere else) so nothing feels like one system. Rounding borders to the point of cartoonishness. And putting <code>border-radius</code> on a table element without knowing that tables have quirks &mdash; the cells can leak past the curve unless you also set <code>border-collapse: separate</code> and radii on the corner cells.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/border-radius-generator">border-radius generator</a> gives you a live visual for any combination of per-corner radii and copy-ready CSS. Pair it with the <a href="/tools/box-shadow-generator">box shadow generator</a> for card styling and the <a href="/tools/gradient-generator">gradient generator</a> for modern-looking backgrounds.
    </p>
  </>
);
