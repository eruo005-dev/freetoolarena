import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Border radius is one of the most under-considered design
      decisions on the web. Pick 4px and your UI feels corporate;
      pick 16px and it feels friendly; pick 9999px and you&rsquo;re
      making pills. The shape of corners sets tone before a user
      reads a single word. This guide covers how to choose radii
      consistently across a product, the relationship between
      element size and radius, nested radius rules, advanced values
      like squircles and superellipses, and the scales used by
      well-known design systems.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What border radius signals</h2>
    <p>
      <strong>0px (sharp):</strong> formal, technical, efficient.
      Government forms, tabular data, terminal UIs, financial
      software.
    </p>
    <p>
      <strong>2-4px (subtle):</strong> professional, unobtrusive.
      Classic Bootstrap era; still common in enterprise SaaS.
    </p>
    <p>
      <strong>6-12px (friendly):</strong> modern consumer apps.
      Most SaaS in 2024-2026. GitHub, Linear, Stripe, Notion all
      sit in this range.
    </p>
    <p>
      <strong>16-24px (soft):</strong> playful, approachable.
      Consumer products targeting casual users. Duolingo, recent
      Google products, Spotify.
    </p>
    <p>
      <strong>9999px (pill):</strong> badges, status chips, primary
      CTA buttons. Reads as &ldquo;distinct action&rdquo; — use
      sparingly.
    </p>
    <p>
      <strong>50%:</strong> circles — avatars, dot indicators, icon
      buttons. On a square element, <code>border-radius: 50%</code>
      produces a circle.
    </p>

    <h2>Radius scales — what design systems use</h2>
    <p>
      <strong>Tailwind:</strong> sm (0.125rem / 2px), default (0.25rem
      / 4px), md (0.375rem / 6px), lg (0.5rem / 8px), xl (0.75rem
      / 12px), 2xl (1rem / 16px), 3xl (1.5rem / 24px), full (9999px).
      Good general-purpose scale.
    </p>
    <p>
      <strong>Radix Themes:</strong> 6-step scale (0-6), each with a
      distinct role and consistent nesting behavior.
    </p>
    <p>
      <strong>Material Design 3:</strong> tokens based on shape
      families (none, extra-small, small, medium, large, extra-large,
      full). Different components default to different radii.
    </p>
    <p>
      Don&rsquo;t invent new values per component. Pick 4-6 steps,
      apply across the whole UI.
    </p>

    <h2>Element size affects perceived radius</h2>
    <p>
      A 4px radius on a 32px button looks proportionally different
      from a 4px radius on a 400px card.
    </p>
    <p>
      <strong>Rule of thumb:</strong> radius should roughly scale
      with element size. Small elements get small radii; large cards
      get larger radii. But not linearly — the relationship is more
      logarithmic.
    </p>
    <p>
      <strong>Practical scale:</strong>
    </p>
    <p>
      Inputs and buttons (32-40px tall): 4-8px radius.
    </p>
    <p>
      Cards (100-300px wide): 8-16px radius.
    </p>
    <p>
      Hero sections or full-width panels: 16-24px radius.
    </p>
    <p>
      Avatars and icon buttons: 50% (circle).
    </p>

    <h2>Nested border-radius — the math</h2>
    <p>
      When one rounded element sits inside another, the inner radius
      must be smaller than the outer radius for them to look
      concentric.
    </p>
    <p>
      <strong>Formula:</strong> inner radius = outer radius − gap.
    </p>
    <p>
      Example: card has 16px radius and 12px padding. Inner element
      should have 16 - 12 = 4px radius for aligned curves.
    </p>
    <p>
      <strong>Why it matters:</strong> if both use 16px, the inner
      element&rsquo;s corner sits awkwardly inside the outer corner
      — the &ldquo;crescent moon&rdquo; look that reads as broken.
    </p>
    <p>
      <strong>Apple&rsquo;s concentric corners:</strong> the Apple
      design philosophy explicitly applies this rule across hardware
      and software — iPhone screen corners are mathematically derived
      to match the device bezel.
    </p>

    <h2>Squircles and superellipses — the next step</h2>
    <p>
      Standard <code>border-radius</code> creates a quarter-circle
      at each corner. Apple-style &ldquo;squircles&rdquo; use a
      smoother shape (superellipse) that transitions more gradually
      — the curve spreads across more of the side.
    </p>
    <p>
      <strong>CSS native:</strong> not directly supported as a
      single property. Workarounds:
    </p>
    <p>
      <code>border-radius: 20% / 50%;</code> — elliptical corners,
      gives a slightly different feel than circular.
    </p>
    <p>
      <strong>SVG or Canvas:</strong> draw the shape with
      <code> M/L/C</code> bezier curves for true superellipses.
    </p>
    <p>
      <strong>Modern proposal:</strong> <code>corner-shape:
      superellipse</code> is under discussion for CSS. Not shipping in
      browsers yet as of 2026.
    </p>
    <p>
      For most UIs, the visual difference between 12px circular
      radius and a 12px squircle is subtle — viewers perceive
      smoothness without noticing the math. Only visible at large
      sizes.
    </p>

    <h2>Individual corner control</h2>
    <p>
      Radius can be set per corner for asymmetric shapes.
    </p>
    <p>
      <code>border-top-left-radius: 12px; border-top-right-radius:
      12px; border-bottom-right-radius: 0; border-bottom-left-radius:
      0;</code>
    </p>
    <p>
      Shorthand: <code>border-radius: 12px 12px 0 0</code> (TL, TR,
      BR, BL — clockwise from top-left).
    </p>
    <p>
      <strong>Common patterns:</strong>
    </p>
    <p>
      Tabs attached to a panel: rounded top corners, sharp bottom.
    </p>
    <p>
      Chat bubbles: one sharp corner near the sender (top-left for
      them, top-right or bottom-right for you) to indicate source.
    </p>
    <p>
      Cards in a list: rounded only at outer edges (first item top-
      rounded, last item bottom-rounded, middle items sharp).
    </p>

    <h2>Elliptical corners</h2>
    <p>
      Two values separated by a slash create elliptical corners
      (different x and y radii):
    </p>
    <p>
      <code>border-radius: 50px / 20px;</code> — wide, short oval
      corners. Used for &ldquo;blob&rdquo; shapes, banners, or
      unique card styles.
    </p>
    <p>
      <strong>Use cases:</strong> splashy marketing hero sections,
      banner cards with distinctive shape. Not for standard UI
      components — elliptical corners read as decorative, not neutral.
    </p>

    <h2>Border radius and performance</h2>
    <p>
      <strong>Box-shadow + rounded corners:</strong> expensive to
      render when stacked densely (many cards). Browsers are
      optimized for this case but high-end phones still show jank on
      large lists.
    </p>
    <p>
      <strong>Rounded corners on images:</strong>
      <code>overflow: hidden</code> on the container with
      border-radius is the standard approach. Performant.
    </p>
    <p>
      <strong>Animating border-radius:</strong> acceptable for small
      changes (a pill growing). Avoid large animated shape morphs —
      use SVG or a CSS mask instead.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using too many radius values.</strong> If you have
      buttons at 4px, 6px, 8px, 10px, and 12px, the inconsistency
      reads as sloppy. Pick 3-6 values, use them throughout.
    </p>
    <p>
      <strong>Mixing radius styles.</strong> Some components sharp,
      others very round, with no clear reason — looks like multiple
      designers fought.
    </p>
    <p>
      <strong>Non-concentric nested corners.</strong> Child with
      same radius as parent. Subtract the padding.
    </p>
    <p>
      <strong>Pills for every button.</strong> Pill-shaped
      (<code>border-radius: 9999px</code>) reads as prominent and
      urgent. Using it for every button removes the emphasis. Save
      it for primary CTAs.
    </p>
    <p>
      <strong>Rounding inputs but not their container.</strong>
      Inputs with 8px radius inside a card with 4px radius — looks
      wrong. Align corner styles across related components.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Tune individual corner values with the{" "}
      <a href="/tools/border-radius-generator">border radius generator</a>.
      Pair with the{" "}
      <a href="/tools/box-shadow-generator">box shadow generator</a>
      {" "}to match shadow softness to corner rounding, and the{" "}
      <a href="/tools/aspect-ratio-calculator">aspect ratio calculator</a>
      {" "}when sizing cards to a consistent shape across breakpoints.
    </p>
  </>
);
