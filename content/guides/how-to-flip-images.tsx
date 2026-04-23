import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Flipping an image mirrors it along a horizontal or vertical axis, turning left into right or top into bottom without any rotation. It&rsquo;s the go-to move for creating symmetry mockups, fixing scanned pages that came out mirrored, and prepping photos for iron-on transfers that reverse when applied. But flipping breaks any image that contains text, watermarks, handedness cues, or recognizable logos &mdash; and it&rsquo;s not always obvious until you look twice. This guide covers when to flip, when not to, and how to do it losslessly.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Horizontal versus vertical flip</h2>
    <p>
      A <strong>horizontal flip</strong> mirrors left-to-right: the subject&rsquo;s left hand becomes their right, and text reads backwards. A <strong>vertical flip</strong> mirrors top-to-bottom: the image is turned upside-down and also mirrored. Vertical flip is much less common in day-to-day work but is the correct operation for certain transfer materials and for reflection effects.
    </p>
    <p>
      Both operations are their own inverse: flip twice along the same axis and you&rsquo;re back where you started.
    </p>

    <h2>When flipping is harmless</h2>
    <p>
      For symmetric or abstract content &mdash; landscapes, clouds, textures, patterns, most food photography &mdash; a horizontal flip is undetectable. This is why stock sites and designers flip casually to fit a layout: point the subject&rsquo;s gaze in the other direction, rebalance a composition, or reuse the same image twice in a spread without it looking like a repeat.
    </p>
    <p>
      Faces are partially symmetric; flipping a portrait usually looks fine unless the subject has an asymmetric feature (a mole, hair parted to one side, glasses frames that tilt).
    </p>

    <h2>When flipping breaks the image</h2>
    <p>
      Flip an image and every recognizable marker of direction is reversed. The problems:
    </p>
    <ul>
      <li><strong>Text:</strong> book spines, signage, t-shirt prints, tattoos, license plates &mdash; all become mirror-image nonsense.</li>
      <li><strong>Logos:</strong> the swoosh, the half-eaten apple, the golden arches &mdash; all instantly wrong to anyone who knows the brand.</li>
      <li><strong>Handedness:</strong> a guitar player&rsquo;s strumming hand, a tennis player&rsquo;s racket, a surgeon&rsquo;s scalpel &mdash; flipping makes right-handed people left-handed.</li>
      <li><strong>Clock faces and watch dials:</strong> almost always asymmetric in subtle ways (the crown, the date window).</li>
      <li><strong>Maps and diagrams:</strong> north is no longer up, east and west swap, every label reads backwards.</li>
    </ul>
    <p>
      Scan any candidate flip for these elements before committing.
    </p>

    <h2>Mirror effects and reflections</h2>
    <p>
      A vertical flip is the starting point for classic reflection mockups: product hovering above its mirrored twin with a soft gradient fading the reflection into the background. The technique:
    </p>
    <ol>
      <li>Duplicate the image below the original.</li>
      <li>Apply a vertical flip to the copy.</li>
      <li>Add a gradient mask that fades from ~60% opacity at the top of the reflection to 0% near the bottom.</li>
      <li>Nudge the reflection a few pixels down from the original to add a gap.</li>
    </ol>
    <p>
      A subtle blur on the reflection (1&ndash;2&nbsp;px) sells the effect further by simulating a slightly diffuse mirror surface.</p>

    <h2>Iron-on transfers and mirror printing</h2>
    <p>
      Anything you iron onto fabric &mdash; custom T-shirts, tote bags, patches &mdash; gets applied face-down, which means the printed image reverses when transferred. You must horizontally flip the design before printing. Forget this step and your shirt will proudly announce your name spelled backwards.
    </p>
    <p>
      The same rule applies to some temporary tattoo papers and certain decal materials. Always check the transfer medium&rsquo;s instructions; some are &ldquo;face up&rdquo; and do not need pre-flipping.
    </p>

    <h2>Lossless flipping</h2>
    <p>
      Like 90&deg; rotation, horizontal and vertical flips can be performed losslessly on JPEGs by reordering the 8&times;8 MCU blocks rather than decoding and re-encoding pixels. Any tool that claims &ldquo;lossless flip&rdquo; should save a JPEG with no measurable quality change.
    </p>
    <p>
      PNG, WebP, AVIF, and TIFF are lossless by default, so flipping them is always pixel-perfect. You can flip a PNG a hundred times and the file changes only in size (due to differing compression runs), never in image data.
    </p>

    <h2>Flip plus rotate: covering all orientations</h2>
    <p>
      Horizontal flip + 180&deg; rotation = vertical flip. This identity comes up when you realize you need vertical flip in a tool that only offers horizontal and rotation. The four non-trivial orientations of any image are: original, horizontal flip, 180&deg; rotation, and horizontal flip + 180&deg;.
    </p>
    <p>
      If you&rsquo;re trying to figure out which transformation you need, try them all on a thumbnail and compare.
    </p>

    <h2>Batch flipping</h2>
    <p>
      Use cases: processing a stack of transfer designs before printing, reversing every page of a scan that was fed upside-down, or creating mirror pairs of an entire icon set for right-to-left language support. A good batch tool lets you:
    </p>
    <ul>
      <li>Preview the flip on one file before committing the batch.</li>
      <li>Write output to a new folder so you keep the originals.</li>
      <li>Append a suffix like <code>-flipped</code> to filenames.</li>
    </ul>

    <h2>Flipping for RTL layouts</h2>
    <p>
      When localizing a UI for Arabic, Hebrew, Persian, or other right-to-left languages, directional icons often need to flip: arrows, progress indicators, back buttons, speech bubbles. Non-directional icons (settings gears, bells, cameras) should stay the same. CSS can do this at render time with <code>transform: scaleX(-1)</code>, but pre-flipping the assets is safer when tooling doesn&rsquo;t support the CSS path.
    </p>
    <p>
      Never blanket-flip an entire icon set; always curate, because flags, clocks, and brand glyphs should not reverse.
    </p>

    <h2>Flip as a quick symmetry test</h2>
    <p>
      Designers use horizontal flip as a proofreading trick. After staring at a layout for hours, flipping it reveals composition problems &mdash; awkward alignments, unbalanced weight, heading widows &mdash; that the eye had stopped noticing. It&rsquo;s the same trick as reading printed copy backwards to catch typos.
    </p>

    <h2>Common symmetry and reflection tricks</h2>
    <p>
      Flipping half an image and compositing it against the original creates a forced-symmetry look popular in abstract posters and album covers. The workflow:
    </p>
    <ol>
      <li>Crop the source to the left half only.</li>
      <li>Duplicate the half.</li>
      <li>Flip the duplicate horizontally.</li>
      <li>Place the flipped copy to the right of the original half so they share the center seam.</li>
    </ol>
    <p>
      The result is perfectly symmetric around the vertical center line. Works brilliantly on portraits (weird and fascinating), architecture (dreamlike), and nature shots.
    </p>

    <h2>Checking for hidden asymmetries</h2>
    <p>
      Before committing a flip, do a 10-second asymmetry scan: is there any text visible, any logo or brand mark, any side-specific accessory (wedding ring on the left hand, a sports player&rsquo;s dominant side, a wristwatch)? If you spot one, decide whether the flip is still acceptable or whether the context preserves the asymmetry&rsquo;s meaning.
    </p>
    <p>
      Product photography has an industry convention: people-holding-products shots usually show the product in the subject&rsquo;s right hand. Flipping such a shot moves the product to the left hand and subtly changes the feel.
    </p>

    <h2>Flip in CSS versus baked flip</h2>
    <p>
      CSS can flip images at render time with <code>transform: scaleX(-1)</code> for horizontal or <code>transform: scaleY(-1)</code> for vertical. No source file change, the flip is cosmetic, and you can toggle it per device or media query. Use this when:
    </p>
    <ul>
      <li>The same image appears flipped in some contexts and not others.</li>
      <li>You want to flip conditionally for RTL language layouts.</li>
      <li>The image is part of an animation that includes mirror states.</li>
    </ul>
    <p>
      Bake the flip into the file when the destination doesn&rsquo;t support CSS (email, print, exported docs) or when you want a permanent version for distribution.
    </p>

    <h2>Flipping SVGs</h2>
    <p>
      SVGs flip either by rewriting the path data (baked into the file) or with <code>transform=&quot;scale(-1,1)&quot;</code> on a group. For interactive components, the transform approach is better because it keeps the original shape data intact and can be toggled. For static assets shipped to places that won&rsquo;t re-process the SVG, baking the flip into path data produces a cleaner file.
    </p>

    <h2>Flipping versus rotating in image editors</h2>
    <p>
      Most tools separate &ldquo;flip&rdquo; and &ldquo;rotate&rdquo; into different menu items. If you&rsquo;re hunting for the option:
    </p>
    <ul>
      <li><strong>Photoshop:</strong> Image &gt; Image Rotation &gt; Flip Canvas Horizontal / Vertical.</li>
      <li><strong>GIMP:</strong> Image &gt; Transform &gt; Flip Horizontally / Vertically.</li>
      <li><strong>macOS Preview:</strong> Tools &gt; Flip Horizontal / Vertical.</li>
      <li><strong>Windows Photos app:</strong> Edit menu, rotate and flip icons in the toolbar.</li>
      <li><strong>Figma:</strong> right-click a layer and pick &ldquo;Flip Horizontal.&rdquo;</li>
    </ul>
    <p>
      Shortcut keys vary by tool but the behavior is consistent: a flip is a mirror, not a rotation, and the two operations are separate.
    </p>

    <h2>Common mistakes</h2>
    <p>
      The most expensive mistake is printing 200 T-shirts with a forgotten pre-flip. Second-most expensive: silently flipping a product photo with the brand logo visible and shipping it to the brand&rsquo;s website. Subtler problems include flipping a portrait where the subject has distinctive asymmetric features (side-parted hair, a tie-clip) and thinking no one will notice &mdash; they will, once they compare to other photos. Also watch for EXIF metadata that describes compass direction or GPS heading; a flip does not update those fields, so a photo tagged &ldquo;facing east&rdquo; will still claim that after a horizontal flip even though the subject now looks west.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/image-flip">image flip tool</a> supports both horizontal and vertical flips, with lossless mode for JPEGs. When what you actually need is a 90 or 180 degree turn rather than a mirror, the <a href="/tools/image-rotate">image rotate tool</a> is the right choice. And if flipping reveals composition problems, the <a href="/tools/image-cropper">image cropper</a> fixes them without another round of re-encoding.
    </p>
  </>
);
