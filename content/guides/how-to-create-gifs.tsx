import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      GIF is a format from 1987 that refuses to die. Newer formats are more efficient
      (WebP, APNG, AVIF animations), but GIF still wins for one reason: it plays
      everywhere with zero ceremony. Drop one in Slack, email, a tweet, a blog post,
      and it just loops. The tradeoff is file size and quality &mdash; GIFs over
      2&ndash;3MB are painful on mobile, and the 256-color palette means vibrant photos
      look posterized. This guide covers the frame rate that&rsquo;s actually readable
      (10&ndash;15fps, not 60), loop counts, the 256-color limitation and how to work
      around it, the size-versus-quality tradeoff, when GIF beats video, and the
      accessibility considerations that most people ignore.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Frame rate: less is more</h2>
    <p>
      Cinema runs at 24fps. Games at 60fps. GIFs should usually run at{" "}
      <strong>10&ndash;15fps</strong>. Why lower? GIF encodes each frame as a full image
      (with palette-level compression) so doubling the frame rate roughly doubles the
      file size. A 4-second clip at 30fps is 120 frames; at 12fps it&rsquo;s 48 frames,
      with similar perceived smoothness for casual viewing.
    </p>
    <pre>{`Use case                       Frame rate
Reaction GIF (short loop)      10-12 fps
Product demo (screen recording) 15 fps
Animated icon                  8-12 fps
Subtle UI animation            12 fps
Whiteboard drawing              6-8 fps
Fast action (sports clip)       15-20 fps (rarely needed)`}</pre>
    <p>
      If you&rsquo;re converting from video, pick a frame rate that divides cleanly into
      the source. A 30fps video at 15fps means skipping every other frame &mdash; clean.
      At 14fps you get uneven skipping that looks stuttery.
    </p>

    <h2>The 256-color palette</h2>
    <p>
      GIF supports at most 256 colors per image. Full-color photos (millions of colors)
      have to be quantized down, which produces banding in smooth gradients &mdash;
      sky, skin, sunsets all look posterized. Two mitigations:
    </p>
    <p>
      <strong>Global palette.</strong> One 256-color palette shared across all frames.
      Smaller file, but the palette has to cover every color that appears anywhere in
      the clip.
    </p>
    <p>
      <strong>Local palettes.</strong> Each frame gets its own 256-color palette.
      Higher quality for scenes that change dramatically, but larger file.
    </p>
    <p>
      <strong>Dithering</strong> scatters color errors as a pattern of pixels to fake
      intermediate colors. Floyd-Steinberg dithering is the common choice. It reduces
      visible banding but adds noise that compresses worse. For smooth corporate-looking
      animations, turn dithering off. For photos, turn it on.
    </p>

    <h2>File size targets</h2>
    <pre>{`Context                     Target size
Slack reaction GIF          under 500 KB
Twitter/X inline            under 5 MB (platform limit 15 MB)
Email embed                 under 1 MB
Blog post inline            under 2 MB
Product page demo           under 3 MB
Documentation animated fig  under 2 MB`}</pre>
    <p>
      Anything over 5MB feels sluggish on mobile connections. If you&rsquo;re over
      target, reduce dimensions first (every halving cuts size ~75%), then frame rate,
      then palette size, then length.
    </p>

    <h2>Dimensions matter more than duration</h2>
    <p>
      A 640&times;360 GIF at 3 seconds is dramatically smaller than a 1280&times;720
      GIF at 2 seconds. GIF is pixel-inefficient. For web inline use, 480&ndash;720
      pixels wide is the sweet spot &mdash; enough to read action, small enough to
      ship fast. Retina doesn&rsquo;t help GIFs; nobody expects them to be sharp.
    </p>

    <h2>Loop count and pacing</h2>
    <p>
      Default is infinite loop. That&rsquo;s fine for reaction GIFs and short loops.
      For product demos that run 10 seconds, consider a finite loop count (2&ndash;3
      repeats) so viewers can concentrate on whatever&rsquo;s next to it.
    </p>
    <p>
      Pacing matters. Start and end on a similar frame so the loop point is invisible.
      Put a brief pause (300&ndash;500ms hold on the last frame) before looping &mdash;
      viewers process what they just saw rather than getting yanked back to the start.
    </p>

    <h2>When GIF beats video</h2>
    <p>
      GIFs autoplay everywhere with no controls, no tap-to-play, no sound, no codec
      negotiation. For short, silent, looping content under 4MB, GIF is the path of
      least friction. Slack previews inline, email clients display them (mostly),
      documentation tools embed them trivially.
    </p>
    <p>
      Video beats GIF for anything over 4MB, any color-accurate content, any clip with
      important detail, and anything longer than 6&ndash;8 seconds. Modern tooling
      (muted autoplay <code>&lt;video&gt;</code> tags) gives you GIF-like behavior with
      video&rsquo;s compression efficiency. A 10-second product demo in MP4 at 1080p is
      often smaller than the same clip as a 480p GIF.
    </p>

    <h2>WebP and APNG as alternatives</h2>
    <p>
      <strong>WebP animated</strong> supports full color, alpha transparency, and
      compresses 2&ndash;5x smaller than GIF. Browser support is universal as of 2020.
      Slack, Discord, and most web contexts now handle WebP animations. Email clients
      still don&rsquo;t.
    </p>
    <p>
      <strong>APNG</strong> supports full color and is supported by all major browsers
      but few social platforms. Use WebP if the target accepts it; fall back to GIF
      otherwise.
    </p>

    <h2>Transparency</h2>
    <p>
      GIF supports 1-bit transparency &mdash; each pixel is either fully opaque or
      fully transparent, no in-between. For overlays that need smooth edges or partial
      transparency (drop shadows, antialiasing), GIF produces visible jaggies. Use APNG
      or WebP if you need real alpha transparency.
    </p>

    <h2>Capturing screen recordings for GIFs</h2>
    <p>
      Screen recordings are usually oversized and over-framerate for GIF output.
      Workflow: capture the screen at high quality as MP4 or MOV, trim to the exact
      moment that matters, downscale to ~720px wide, export at 12&ndash;15fps. Avoid
      capturing mouse movement as background motion if it&rsquo;s not part of the
      demo; it wastes frames.
    </p>

    <h2>Accessibility and motion sensitivity</h2>
    <p>
      Looping motion can trigger vestibular disorders, attention issues, and migraines.
      Guidelines for respectful GIF use:
    </p>
    <p>
      Avoid flashing more than 3 times per second (WCAG 2.3.1 &mdash; a seizure
      threshold). Provide an alt text that describes the content (&ldquo;Animated
      demonstration of dragging a task between kanban columns&rdquo;), not just
      &ldquo;GIF.&rdquo; For long auto-looping GIFs in important content, consider a
      play/pause control or embed as video instead. Respect{" "}
      <code>prefers-reduced-motion</code> if you can serve a static fallback.
    </p>
    <pre>{`@media (prefers-reduced-motion: reduce) {
  .gif-element {
    /* swap to static first frame via JS or picture element */
  }
}`}</pre>

    <h2>Captions and text overlays</h2>
    <p>
      Because GIFs have no audio, text overlays carry the narrative weight. Keep text
      large (at least 5% of the GIF height for readability on mobile), high-contrast
      (white text with a dark outline or backdrop), and on screen long enough to read
      at a relaxed pace (1 word per 150&ndash;200ms). A text that flashes past in 3
      frames at 12fps (250ms) is unreadable.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Exporting at 30+ fps.</strong> Doubles file size for no meaningful
      smoothness gain. 12&ndash;15 is the sweet spot.
    </p>
    <p>
      <strong>Ignoring dimensions.</strong> A 1080p GIF is a crime against file
      budgets. Downscale to 480&ndash;720px wide.
    </p>
    <p>
      <strong>Using GIF for long-form content.</strong> Anything over 6&ndash;8
      seconds or over 3MB should be MP4 with autoplay muted.
    </p>
    <p>
      <strong>Dithering color-smooth content.</strong> Dither adds noise that looks
      awful on logos, flat UI, and gradient corporate art. Turn it off for those.
    </p>
    <p>
      <strong>Trusting GIF alpha.</strong> It&rsquo;s 1-bit. Edges are jagged. Use WebP
      or APNG if you need real transparency.
    </p>
    <p>
      <strong>Forgetting the loop seam.</strong> The last frame should visually match
      the first, or there&rsquo;s a visible jump. Plan for the loop point when
      recording.
    </p>
    <p>
      <strong>No alt text.</strong> Screen readers get nothing. &ldquo;Animated GIF of
      the checkout flow&rdquo; is the minimum.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Assemble frames or videos into a looping animation with the{" "}
      <a href="/tools/gif-maker">GIF maker</a>. Pair with the{" "}
      <a href="/tools/video-to-gif">video-to-GIF converter</a> when your source is
      already a recorded clip, and the{" "}
      <a href="/tools/video-trimmer">video trimmer</a> to clip the source down to the
      exact 2&ndash;6 seconds that matter before the GIF encode.
    </p>
  </>
);
