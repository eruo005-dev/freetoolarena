import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      CSS Grid is the first layout system in the browser that was actually
      designed for two-dimensional layout. Rows and columns are first-class
      citizens, track sizing has a dedicated unit (the <code>fr</code>), and you
      can describe a whole page in about ten lines without a single wrapper div.
      Grid is strictly more capable than flexbox for anything that needs to align
      across both axes, but it&rsquo;s also more verbose for simple one-axis
      jobs. This guide covers the properties you&rsquo;ll actually use, the
      tricks (auto-fill, minmax, named areas) that make grid shine, and the rule
      of thumb for when grid is the right tool.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The grid mental model</h2>
    <p>
      A grid container defines <strong>tracks</strong> &mdash; rows and columns
      &mdash; and grid items fall into cells at their intersections. You can
      describe tracks explicitly (<code>grid-template-columns</code>) or let the
      browser create them implicitly as items arrive. Everything else is: pick
      which cells an item occupies.
    </p>
    <pre>{`.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}`}</pre>
    <p>
      Three equal columns, 16px gap, done. No media queries, no wrappers.
    </p>

    <h2>The fr unit</h2>
    <p>
      <code>fr</code> stands for &ldquo;fraction of remaining space.&rdquo; After
      fixed-size tracks are allocated, the remaining space is divided among the
      <code>fr</code> tracks in proportion.
    </p>
    <pre>{`grid-template-columns: 200px 1fr 1fr;
/* 200px sidebar, two equal flexible columns */

grid-template-columns: 1fr 3fr;
/* main column is 3x the sidebar */`}</pre>
    <p>
      <code>fr</code> is what makes grid feel fluid. Percentages also work but
      don&rsquo;t account for gaps, so they often cause overflow. Prefer{" "}
      <code>fr</code>.
    </p>

    <h2>grid-template-columns and grid-template-rows</h2>
    <p>
      Values can mix fixed sizes, fr units, <code>auto</code>, and functions:
    </p>
    <pre>{`grid-template-columns: 240px 1fr;        /* sidebar + main */
grid-template-columns: repeat(4, 1fr);   /* four equal */
grid-template-columns: 1fr 2fr 1fr;      /* weighted */
grid-template-rows: auto 1fr auto;       /* header, main, footer */`}</pre>
    <p>
      <code>repeat(n, ...)</code> is syntactic sugar for repetitive tracks.{" "}
      <code>auto</code> sizes to content. The classic &ldquo;sticky footer&rdquo;
      layout is just <code>grid-template-rows: auto 1fr auto</code> on a body
      with <code>min-height: 100vh</code>.
    </p>

    <h2>minmax for responsive tracks</h2>
    <p>
      <code>minmax(a, b)</code> sets a minimum and a maximum size for a track.
      It&rsquo;s how you keep columns from collapsing too small or stretching
      too wide.
    </p>
    <pre>{`grid-template-columns: repeat(3, minmax(200px, 1fr));
/* three columns, each at least 200px */`}</pre>

    <h2>auto-fill vs auto-fit</h2>
    <p>
      Combine <code>repeat</code> with <code>auto-fill</code> or{" "}
      <code>auto-fit</code> to get cards that rewrap themselves as the viewport
      changes &mdash; no breakpoints.
    </p>
    <pre>{`/* auto-fill: empty columns are kept as invisible tracks */
grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));

/* auto-fit: empty columns collapse, remaining items stretch */
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));`}</pre>
    <p>
      <strong>Rule of thumb:</strong> <code>auto-fit</code> if you want cards to
      stretch to fill the row even when few; <code>auto-fill</code> if you want
      them to stay a consistent size and leave empty space on the right.
    </p>

    <h2>grid-column and grid-row on items</h2>
    <p>
      Place an item across multiple tracks with <code>grid-column</code> or{" "}
      <code>grid-row</code>:
    </p>
    <pre>{`.hero  { grid-column: 1 / -1; }          /* full width */
.card  { grid-column: span 2; }          /* two columns wide */
.photo { grid-row: 1 / 3; grid-column: 2 / 4; }`}</pre>
    <p>
      Line numbers are 1-based. <code>-1</code> means the last line. The{" "}
      <code>span N</code> shorthand says &ldquo;start wherever I land, take N
      tracks.&rdquo;
    </p>

    <h2>Named grid areas</h2>
    <p>
      For page-level layouts, <code>grid-template-areas</code> is the most
      readable option &mdash; you literally draw the layout in ASCII.
    </p>
    <pre>{`.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}
header  { grid-area: header; }
aside   { grid-area: sidebar; }
main    { grid-area: main; }
footer  { grid-area: footer; }`}</pre>
    <p>
      Changing the layout on mobile becomes a matter of rewriting the template
      inside a media query &mdash; no DOM restructuring required.
    </p>

    <h2>Responsive grids without media queries</h2>
    <pre>{`.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}`}</pre>
    <p>
      Ten cards? Four rows of three plus a row of two at desktop, two columns
      at tablet, one column on phone. All from one rule. This pattern alone
      replaces most of the grid-system CSS that frameworks used to ship.
    </p>

    <h2>Grid items alignment</h2>
    <p>
      Grid has two layers of alignment: the container aligns tracks
      (<code>justify-content</code>, <code>align-content</code>), and each cell
      aligns its content (<code>justify-items</code>, <code>align-items</code>,
      or per-item <code>justify-self</code>, <code>align-self</code>).
    </p>
    <pre>{`.grid {
  justify-content: center;   /* tracks themselves centered */
  align-items: center;       /* item content centered in its cell */
}`}</pre>
    <p>
      Same keywords as flexbox, same mental model &mdash; just applied to grid
      cells rather than a flex line.
    </p>

    <h2>Grid vs Flexbox</h2>
    <p>
      <strong>One axis? Flexbox.</strong> Nav bars, toolbars, sidebars of stacked
      items. The browser decides where items wrap.
    </p>
    <p>
      <strong>Two axes that must line up? Grid.</strong> Dashboards, photo
      galleries with aligned rows, full-page layouts. You decide the tracks.
    </p>
    <p>
      They nest happily &mdash; grid for the shell, flex inside each cell. Don&rsquo;t
      pick one as your religion.
    </p>

    <h2>Gaps and alignment</h2>
    <p>
      <code>gap</code> (formerly <code>grid-gap</code>) sets spacing between
      tracks. Always use it &mdash; it handles wrapping correctly and avoids the
      trailing-item margin problem.
    </p>
    <pre>{`.grid {
  gap: 16px;        /* same for rows and columns */
  gap: 24px 16px;   /* 24px row-gap, 16px column-gap */
}`}</pre>

    <h2>Implicit tracks</h2>
    <p>
      If items run out of explicit tracks, the grid creates new ones
      automatically. Control their size with <code>grid-auto-rows</code> and{" "}
      <code>grid-auto-columns</code>.
    </p>
    <pre>{`.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
}`}</pre>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using percentages instead of fr.</strong> <code>33.33%</code>{" "}
      doesn&rsquo;t account for gaps and causes overflow. <code>1fr</code>{" "}
      does the math correctly.
    </p>
    <p>
      <strong>Reaching for flex when rows need to align.</strong> If two cards in
      the same row have different heights and you want them equal, grid is the
      cleaner answer.
    </p>
    <p>
      <strong>Forgetting to set min-width: 0 on items with overflow.</strong>{" "}
      Grid items default to <code>min-width: auto</code> and can refuse to
      shrink below their content width. Set <code>min-width: 0</code> if a long
      word is breaking your layout.
    </p>
    <p>
      <strong>Hard-coding breakpoints that <code>auto-fit</code> would handle.</strong>{" "}
      <code>repeat(auto-fit, minmax(X, 1fr))</code> replaces a lot of media
      queries.
    </p>
    <p>
      <strong>Confusing auto-fit and auto-fill.</strong> They behave identically
      until there are fewer items than tracks. Then <code>auto-fit</code>{" "}
      stretches items to fill; <code>auto-fill</code> leaves gaps.
    </p>
    <p>
      <strong>Naming every grid line.</strong> Start simple; only name lines
      once the layout gets complex enough to benefit.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Scaffold a grid visually with the{" "}
      <a href="/tools/grid-layout-generator">grid layout generator</a>. For
      one-dimensional rows inside each grid cell, drop into the{" "}
      <a href="/tools/flexbox-playground">flexbox playground</a>, and round off
      your card corners with the{" "}
      <a href="/tools/border-radius-generator">border radius generator</a> so
      the grid reads as one cohesive surface.
    </p>
  </>
);
