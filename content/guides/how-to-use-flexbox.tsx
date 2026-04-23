import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Flexbox is the one-dimensional layout tool CSS should have had since day one.
      It solves the problems that used to require floats, tables, or absolute
      positioning: centering a thing vertically, distributing space between
      elements, making a row of cards behave sensibly when the viewport shrinks.
      Once flex-direction and justify-content click, 80% of everyday layout work
      becomes a five-line rule. This guide walks through the core properties in
      the order they actually matter, shows the patterns you&rsquo;ll reuse daily,
      and makes the distinction between flexbox and grid clear enough that you
      stop reaching for the wrong tool.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The mental model</h2>
    <p>
      A flex container has a <strong>main axis</strong> and a{" "}
      <strong>cross axis</strong>. <code>flex-direction</code> picks which way the
      main axis runs. Everything else is &ldquo;align things along main&rdquo; or
      &ldquo;align things along cross.&rdquo; Get this mental model right and the
      property names stop feeling arbitrary.
    </p>
    <pre>{`.container {
  display: flex;
  /* default: flex-direction: row; */
}`}</pre>
    <p>
      As soon as an element is <code>display: flex</code>, its direct children
      become flex items. Grandchildren are unaffected unless you also flex the
      child.
    </p>

    <h2>flex-direction</h2>
    <p>
      Four values: <code>row</code> (default, left-to-right), <code>row-reverse</code>,{" "}
      <code>column</code> (top-to-bottom), and <code>column-reverse</code>. Most
      layouts use <code>row</code> for horizontal alignment and <code>column</code>{" "}
      for stacking items vertically while still getting flex superpowers.
    </p>
    <pre>{`.navbar  { display: flex; flex-direction: row; }
.sidebar { display: flex; flex-direction: column; }`}</pre>
    <p>
      Switching direction flips the main and cross axes. A row&rsquo;s main axis is
      horizontal; a column&rsquo;s main axis is vertical. Keep this in mind when
      reaching for <code>justify-content</code> vs <code>align-items</code>.
    </p>

    <h2>justify-content: along the main axis</h2>
    <p>
      Controls how items spread along the main axis. The values you&rsquo;ll
      actually use:
    </p>
    <pre>{`flex-start     pack at the start (default)
flex-end       pack at the end
center         pack in the middle
space-between  first and last pinned, gaps equal between
space-around   equal gaps, including half-gaps at each edge
space-evenly   equal gaps everywhere, including edges`}</pre>
    <p>
      <code>space-between</code> is the workhorse for nav bars: logo on the left,
      links on the right, no extra wrappers needed.
    </p>

    <h2>align-items: along the cross axis</h2>
    <p>
      Controls how items line up on the cross axis. Values:
    </p>
    <pre>{`stretch      fill the cross axis (default)
flex-start   top (in row) / left (in column)
flex-end     bottom / right
center       center
baseline     line up text baselines`}</pre>
    <p>
      <em>Centering a thing both ways</em> is now a two-line job:
    </p>
    <pre>{`.center {
  display: flex;
  justify-content: center;
  align-items: center;
}`}</pre>

    <h2>flex-wrap</h2>
    <p>
      By default flex items stay on one line and shrink to fit. Add{" "}
      <code>flex-wrap: wrap</code> to let them flow onto multiple rows. This is
      what makes responsive card grids work without media queries.
    </p>
    <pre>{`.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  flex: 1 1 240px; /* grow, shrink, 240px basis */
}`}</pre>
    <p>
      Cards now sit three-up on a desktop, two-up on a tablet, one-up on a phone,
      with no breakpoints. Flex decides.
    </p>

    <h2>flex-grow, flex-shrink, flex-basis</h2>
    <p>
      These three properties on a flex item control how it competes for space.
      Shorthand: <code>flex: grow shrink basis</code>.
    </p>
    <p>
      <strong>flex-grow</strong> &mdash; how much extra space this item should
      soak up (0 = none, 1 = an equal share, 2 = twice the share).
    </p>
    <p>
      <strong>flex-shrink</strong> &mdash; how willing this item is to give up
      space when the container is too small (0 = never shrink, 1 = default).
    </p>
    <p>
      <strong>flex-basis</strong> &mdash; the item&rsquo;s preferred size before
      grow and shrink apply. Can be a length (<code>240px</code>) or{" "}
      <code>auto</code>.
    </p>
    <pre>{`.sidebar { flex: 0 0 240px; }  /* rigid 240px column */
.main    { flex: 1 1 auto; }   /* soaks up remaining space */`}</pre>

    <h2>The gap property</h2>
    <p>
      <code>gap</code> sets spacing between items without margins. It works in
      both flex and grid. Always prefer <code>gap</code> over{" "}
      <code>margin-right</code> on children &mdash; no trailing-item hacks, no
      <code>:last-child</code> overrides.
    </p>
    <pre>{`.row {
  display: flex;
  gap: 16px;       /* 16px between items */
  gap: 16px 8px;   /* 16px row, 8px column when wrapped */
}`}</pre>

    <h2>Pattern: navigation bar</h2>
    <pre>{`<nav class="nav">
  <div class="logo">Brand</div>
  <ul class="links">
    <li><a href="/a">One</a></li>
    <li><a href="/b">Two</a></li>
  </ul>
</nav>

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
}
.links { display: flex; gap: 16px; list-style: none; }`}</pre>

    <h2>Pattern: card row</h2>
    <pre>{`.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  flex: 1 1 260px;
  display: flex;
  flex-direction: column;
}
.card__body { flex: 1; }  /* push footer to the bottom */`}</pre>
    <p>
      Nested flex is fine and often necessary: the card itself is a column, its
      body expands, and the footer stays pinned to the bottom of each card in the
      row.
    </p>

    <h2>Flexbox vs Grid</h2>
    <p>
      <strong>Flexbox is one-dimensional.</strong> Use it when you&rsquo;re laying
      things out along a single axis: a nav bar, a toolbar, a stack of form rows,
      a row of cards.
    </p>
    <p>
      <strong>Grid is two-dimensional.</strong> Use it when you need explicit
      control over both rows and columns: a dashboard, a gallery with consistent
      rows, a page layout with header/sidebar/main/footer.
    </p>
    <p>
      Many real layouts mix the two &mdash; grid for the page shell, flex for the
      contents of each cell. They cooperate fine.
    </p>

    <h2>Debugging flex</h2>
    <p>
      Chrome and Firefox both have flex inspectors. Click the tiny{" "}
      <code>flex</code> badge next to <code>display: flex</code> in DevTools and
      the browser overlays the axes and free space. If an item isn&rsquo;t
      shrinking as expected, it&rsquo;s almost always{" "}
      <code>flex-shrink: 0</code> or an explicit width somewhere.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Mixing up justify-content and align-items.</strong> Remember:
      <code>justify</code> follows the main axis, <code>align</code> follows the
      cross axis. In a column, <code>justify-content</code> is vertical.
    </p>
    <p>
      <strong>Forgetting that flex items shrink by default.</strong> A{" "}
      <code>width: 300px</code> inside a flex container can still become 180px if
      there&rsquo;s not enough room. Set <code>flex-shrink: 0</code> or use{" "}
      <code>flex-basis</code> with grow 0 shrink 0.
    </p>
    <p>
      <strong>Using margins instead of gap.</strong> Gaps are cleaner, handle
      wrapping correctly, and don&rsquo;t need <code>:last-child</code>
      exceptions.
    </p>
    <p>
      <strong>Reaching for flex when you want grid.</strong> If you&rsquo;re
      fighting to get rows to align across columns, you want grid, not flex.
    </p>
    <p>
      <strong>Nesting flex containers for no reason.</strong> Each extra{" "}
      <code>display: flex</code> adds complexity. Only flex at levels where you
      actually need flex behavior.
    </p>
    <p>
      <strong>Setting height on the container to center vertically.</strong> The
      container needs a height for <code>align-items: center</code> to have any
      vertical space to work with. On a full-viewport centerpiece, use{" "}
      <code>min-height: 100vh</code>.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Preview flex properties live in the{" "}
      <a href="/tools/flexbox-playground">flexbox playground</a>. For
      two-dimensional layouts reach for the{" "}
      <a href="/tools/grid-layout-generator">grid layout generator</a>, and when
      you&rsquo;re rounding off card corners afterwards the{" "}
      <a href="/tools/border-radius-generator">border radius generator</a> keeps
      your values consistent across the whole layout.
    </p>
  </>
);
