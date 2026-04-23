import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A photo collage combines multiple images into a single composition so a moment, a project, or a product line reads as one visual story. Done well, a collage brings rhythm, variety, and a clear focal point; done badly, it looks like a crowded scrapbook page. The craft is all in the layout: consistent spacing, thoughtful aspect ratios, a single dominant image, and enough breathing room that the eye can move between photos. This guide covers the grid patterns that always work, how to balance aspect ratios across a mixed set of source photos, and how to export at a resolution that prints cleanly.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Pick a grid before you pick photos</h2>
    <p>
      Decide the structure first, then slot images into it. Starting from &ldquo;I have 12 photos, arrange them&rdquo; is how you end up with 12 tiny squares and no hierarchy. Common structures:
    </p>
    <ul>
      <li><strong>2&nbsp;&times;&nbsp;2 grid:</strong> four equal tiles. Clean, democratic, works for &ldquo;four views of one thing.&rdquo;</li>
      <li><strong>3&nbsp;&times;&nbsp;3 grid:</strong> nine equal tiles. Instagram-style. Great for a series of similar shots.</li>
      <li><strong>Feature + thumbnails:</strong> one large photo with three or four smaller ones alongside. Clear hierarchy.</li>
      <li><strong>Vertical strip:</strong> stacked images of the same width, varying heights. Good for &ldquo;before/after&rdquo; or sequence.</li>
      <li><strong>Mosaic:</strong> variable-sized tiles fitted together. Most flexible, hardest to balance.</li>
    </ul>

    <h2>Aspect ratio juggling</h2>
    <p>
      A mix of portrait and landscape photos at their native ratios fights any clean grid. Two ways out:
    </p>
    <ol>
      <li><strong>Crop everything to one ratio</strong> (usually square or 4:3). Clean, predictable, but throws away content.</li>
      <li><strong>Design the layout around the native ratios.</strong> Group portraits together in a tall column, landscapes in a wide row, squares in their own block.</li>
    </ol>
    <p>
      For a single-page poster collage, consistent cropping wins. For a storytelling layout where preserving composition matters, accommodate the native shapes.
    </p>

    <h2>Spacing and padding</h2>
    <p>
      The gap between tiles &mdash; often called the &ldquo;gutter&rdquo; &mdash; controls the feel. Tight gutters (4&ndash;8&nbsp;px) read as unified; wide gutters (20&ndash;40&nbsp;px) read as a collection of separate objects. Zero gutter reads as a single panorama.
    </p>
    <p>
      The outer padding (the border around the whole collage) usually matches or exceeds the inner gutter. An 8&nbsp;px inner gutter pairs with 16&nbsp;px outer padding. A 20&nbsp;px inner gutter pairs with 40&nbsp;px outer padding.
    </p>

    <h2>Backgrounds</h2>
    <p>
      The gutter color is part of the design. Options:
    </p>
    <ul>
      <li><strong>White:</strong> gallery-clean, prints well, works with any photos.</li>
      <li><strong>Black:</strong> makes colors pop, moody, feels premium but prints heavy.</li>
      <li><strong>Brand color:</strong> pulls the collage into a visual identity. Pick a mid-tone that won&rsquo;t fight the photos.</li>
      <li><strong>Photo background:</strong> a blurred version of one of the images, tinted. Rich but risks busyness.</li>
    </ul>
    <p>
      If in doubt, pick white for print, dark gray for screen. Pure black on screen can feel harsh unless the photos themselves are dark.
    </p>

    <h2>Pick a hero</h2>
    <p>
      Every good collage has one image that is clearly the star &mdash; larger, positioned at a natural focal point (center, or following the rule of thirds), or visually distinct. Without a hero, the eye doesn&rsquo;t know where to land and the collage feels flat.
    </p>
    <p>
      Rule of thumb for a mosaic: one tile that&rsquo;s roughly 2&times; the area of any other. For a feature layout, the hero is 50&ndash;60% of the canvas.
    </p>

    <h2>Color and tone harmony</h2>
    <p>
      A collage of wildly different color palettes looks chaotic. Options to unify:
    </p>
    <ul>
      <li>Convert all to black-and-white.</li>
      <li>Apply the same filter or preset to every tile.</li>
      <li>Choose photos that already share a palette (same location, same lighting).</li>
      <li>Tint the gutters and background in a color that appears in multiple photos.</li>
    </ul>
    <p>
      Subtle unity is more effective than strict matching. Even just nudging saturation down across all images makes a collage feel coordinated.
    </p>

    <h2>Rounded versus square tiles</h2>
    <p>
      Square tiles with no rounding read modern-minimal. Slight rounding (4&ndash;8&nbsp;px) adds softness without calling attention to itself. Heavy rounding (16&ndash;24&nbsp;px) feels friendly and app-like but can make a print collage look cartoonish.
    </p>
    <p>
      Circular tiles are great for profile pic grids (team pages, contributor walls) but are rarely right for story collages &mdash; too much edge is lost.
    </p>

    <h2>Captions and text</h2>
    <p>
      If the collage needs captions, reserve a lane for them rather than overlaying photos. A 2&nbsp;&times;&nbsp;2 grid with a caption below each tile becomes a tight composition; captions floating over faces become noise.
    </p>
    <p>
      Set caption type in a simple sans-serif at 60&ndash;75% of the body text size of the rest of the page. Keep captions short &mdash; one line each &mdash; or they turn into a paragraph that hijacks the layout.
    </p>

    <h2>Export resolution</h2>
    <p>
      For screen use, export at twice the display size to cover retina. A collage meant to display at 1200&nbsp;px wide should export at 2400&nbsp;px.
    </p>
    <p>
      For print, use 300&nbsp;DPI of the physical size:
    </p>
    <pre>{`4x6 print:   1200 x 1800 px
5x7 print:   1500 x 2100 px
8x10 print:  2400 x 3000 px
11x14 print: 3300 x 4200 px`}</pre>
    <p>
      Source photos need to have enough resolution to fill their tile at this density. If your collage is 2400&nbsp;px wide and a single tile fills a third of the canvas, that tile needs at least an 800&nbsp;px-wide source.
    </p>

    <h2>File format for output</h2>
    <p>
      For print: export as TIFF or high-quality PNG so the printer doesn&rsquo;t deal with JPEG artifacts. For screen: JPEG at quality 85&ndash;90 hits the best balance of size and fidelity. For transparent areas (unusual but possible): PNG or WebP.
    </p>
    <p>
      Always save a layered source (PSD, AFPUB, Figma frame) so you can tweak spacing or swap a photo later without rebuilding from scratch.
    </p>

    <h2>Choosing the right number of photos</h2>
    <p>
      More photos per collage is not better. The viewer&rsquo;s eye can only land on a handful of images before the layout starts to feel like a catalog. Rough guidance:
    </p>
    <ul>
      <li><strong>2&ndash;3 photos:</strong> tells a compact story, each image gets room to breathe.</li>
      <li><strong>4&ndash;6 photos:</strong> the sweet spot for most collages; hero plus supporting.</li>
      <li><strong>7&ndash;9 photos:</strong> grid format only; all equal status.</li>
      <li><strong>10+ photos:</strong> becomes a gallery or mosaic pattern; individual images get tiny.</li>
    </ul>
    <p>
      When you have 15 great photos to share, consider two separate collages instead of one crowded one. Or ship a true gallery with a grid layout and a lightbox.
    </p>

    <h2>Rule of thirds and focal flow</h2>
    <p>
      In multi-image layouts, the eye moves along implied paths: top-left to bottom-right (Western reading direction), or from the largest element outward. Place the hero image at a rule-of-thirds intersection rather than dead-center for a more engaging composition.
    </p>
    <p>
      If you have faces in multiple photos, arrange them so gazes don&rsquo;t point off the canvas. A subject looking left should sit on the right side of the layout, so their gaze travels into the rest of the composition rather than out of it.
    </p>

    <h2>Print bleed and safe zones</h2>
    <p>
      Commercial printers require a bleed area &mdash; typically 3&nbsp;mm on each side &mdash; where background extends past the final cut line. If your collage has photos that run to the edge, they need to extend into the bleed zone or you&rsquo;ll get thin white strips on the printed piece.
    </p>
    <p>
      Conversely, keep important content (faces, logos, text) at least 3&nbsp;mm inside the cut line &mdash; the &ldquo;safe zone&rdquo; &mdash; so tiny cutting variations don&rsquo;t clip it. Every printer provides a template with bleed and safe lines for the specific size you&rsquo;re ordering.
    </p>

    <h2>Social media aspect ratios</h2>
    <p>
      Different platforms want different aspect ratios for a collage post:
    </p>
    <ul>
      <li><strong>Instagram feed:</strong> 1:1 square (1080&nbsp;&times;&nbsp;1080) or 4:5 portrait (1080&nbsp;&times;&nbsp;1350).</li>
      <li><strong>Instagram Story / Reels:</strong> 9:16 (1080&nbsp;&times;&nbsp;1920).</li>
      <li><strong>Facebook feed:</strong> 1.91:1 landscape (1200&nbsp;&times;&nbsp;630) or 4:5 portrait.</li>
      <li><strong>Pinterest:</strong> 2:3 portrait (1000&nbsp;&times;&nbsp;1500) &mdash; tall collages get more engagement.</li>
      <li><strong>Twitter/X:</strong> 16:9 landscape (1200&nbsp;&times;&nbsp;675).</li>
    </ul>
    <p>
      Design the collage to the platform&rsquo;s preferred ratio rather than cropping a generic design to fit. The layout breathing room changes enough that a redesigned version usually looks significantly better.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Making every tile the same size and wondering why nothing pops &mdash; a collage needs a hero. Mixing wildly different ratios with no cropping rule, producing a jumble. Filling the whole canvas edge-to-edge with no outer padding, which makes the collage feel cramped and leaves no safe zone for print bleed. Letting captions overlap photo content, especially faces. And the print-day classic: exporting at 72 DPI because the web preview looked fine, then getting a pixelated 4&nbsp;&times;&nbsp;6 from the photo lab. Always check final pixel dimensions against the print size before you order.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/photo-collage">photo collage tool</a> handles grid selection, spacing, backgrounds, and print-resolution export in one flow. If your source photos need to be resized before dropping in, the <a href="/tools/image-resizer">image resizer</a> normalizes them first. And when you want a framed border around individual tiles or the whole collage, the <a href="/tools/image-border-adder">image border adder</a> finishes the composition.
    </p>
  </>
);
