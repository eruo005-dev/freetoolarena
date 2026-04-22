import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      GIFs are half dead and half indispensable. They&rsquo;re terrible for anything
      longer than a few seconds, but they&rsquo;re still the only animated format that
      plays inline in email, Slack previews, Notion, and most help-desk tools without a
      click. If you&rsquo;re making a 2-second product tour or a before/after compare,
      GIF is still the right answer. This guide covers when to use it, how to time your
      frames, and how to keep file size sane.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>When GIF still beats MP4</h2>
    <p>
      Use GIF when autoplay matters more than quality. Email clients strip video tags.
      Slack and Discord will embed a GIF inline but require a click to expand most
      videos. Help docs, onboarding tooltips, and changelog entries read better with a
      GIF that just loops silently in context. Anything under 3 seconds with no audio
      and a small frame is GIF territory.
    </p>

    <h2>When to switch to MP4 instead</h2>
    <p>
      Once your clip crosses roughly 8 seconds, has a lot of motion (scrolling, panning,
      video content), or needs to live on Twitter or LinkedIn, switch to MP4 or WebM.
      A 10-second screen recording at decent quality is 1.2MB as MP4 and 18MB as GIF.
      Twitter and LinkedIn both autoplay MP4. You&rsquo;re just paying the GIF tax for
      no benefit.
    </p>

    <h2>Frame timing: the numbers that matter</h2>
    <p>
      Frame duration is measured in milliseconds. The rules of thumb:
    </p>
    <p>
      <strong>80-200ms per frame</strong> for tutorial or product-tour content where
      each frame is a distinct step. 100ms (10 fps) is the sweet spot — fast enough to
      feel responsive, slow enough to read.
    </p>
    <p>
      <strong>40-60ms per frame</strong> for fluid motion like a cursor moving or a
      subtle hover animation. Under 50ms and most browsers cap you at 100ms anyway — an
      old quirk that still trips people up.
    </p>
    <p>
      <strong>500-1000ms</strong> on the final frame, sometimes called a hold frame.
      Lets the loop breathe instead of cutting straight back to the start.
    </p>

    <h2>Sizing rules: stay under 2MB</h2>
    <p>
      For feed or chat embeds, aim for under 2MB. Past that, Slack compresses, email
      clients clip, and Notion preview starts lagging. The levers, in order of impact:
    </p>
    <p>
      Drop the dimensions first — a 600px-wide GIF is usually fine for docs and cuts
      size by 4x vs a 1200px one. Then reduce the color palette (256 colors is the
      max; 128 or 64 works for most screen recordings with flat UI). Then trim frames
      — remove duplicates, drop the frame rate. Only touch quality last; it tends to
      produce ugly banding on gradients.
    </p>

    <h2>Loop vs one-shot</h2>
    <p>
      Default to infinite loop. Nine times out of ten you&rsquo;re embedding in a feed
      where the user may arrive mid-animation, and a loop lets them catch the full
      sequence without scrubbing. Use one-shot only for long-form content (like a
      step-by-step demo) where re-watching the intro is annoying — but if it&rsquo;s
      that long, consider MP4 again.
    </p>

    <h2>Two gotchas worth knowing</h2>
    <p>
      <strong>Transparency is limited.</strong> GIF supports only binary transparency
      (fully on or fully off). Soft drop shadows and anti-aliased edges will show an
      ugly halo. If you need real alpha, use WebP or APNG — or bake a solid background
      into the GIF that matches where it&rsquo;ll be embedded.
    </p>
    <p>
      <strong>GIFs don&rsquo;t do gradients well.</strong> The 256-color palette limit
      produces visible banding on anything that fades smoothly. Either pick a dithered
      output (adds noise, hides banding) or redesign the source to use flatter colors.
    </p>

    <h2>A practical workflow</h2>
    <p>
      Record your source at 2x the final dimensions and twice the frame rate you think
      you need — it&rsquo;s easier to downscale than to fake detail later. Trim to the
      3-5 seconds that actually matter, drop it into{" "}
      <a href="/tools/gif-maker">our GIF maker</a>, set frame duration to 100ms, cap
      dimensions at 600-800px, and export. If it&rsquo;s over 2MB, halve the width
      before touching anything else. That workflow produces shippable GIFs in under a
      minute.
    </p>
  </>
);
