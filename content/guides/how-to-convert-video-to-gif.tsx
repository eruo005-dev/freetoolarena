import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Converting a video to a GIF sounds like a trivial one-click job. Most tools that
      do it produce garbage &mdash; muddy colors, enormous file sizes, or frame rates
      that feel like flipbooks made by a distracted teenager. The tools that produce
      good GIFs are all doing the same thing under the hood: trimming first, building
      a smart palette, and running the encoder with the right flags. This guide covers
      what&rsquo;s happening when a video becomes a GIF, why FFmpeg is the engine behind
      almost every web converter, the two-pass palette trick that transforms output
      quality, dithering tradeoffs, the file-size targets that matter, and when you
      should reach for APNG or animated WebP instead of GIF entirely.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What&rsquo;s actually happening</h2>
    <p>
      Video codecs (H.264, H.265, VP9, AV1) store frames as differences from previous
      frames &mdash; keyframes plus deltas. GIF stores every frame as an independent
      image. To convert, the decoder rebuilds each video frame in full color, then the
      GIF encoder picks a 256-color palette and reduces every pixel to the nearest
      palette color.
    </p>
    <p>
      This has three big consequences: file size explodes (GIF has no inter-frame
      compression for most frames), quality drops (256 colors can&rsquo;t represent
      smooth gradients), and encoding is slow (each frame is processed independently).
      Every decision in the conversion pipeline balances those three.
    </p>

    <h2>FFmpeg under the hood</h2>
    <p>
      FFmpeg is the open-source engine behind almost every video-to-GIF converter on
      the web. The naive one-liner produces bad output:
    </p>
    <pre>{`# Naive: single pass, generic palette, ugly result
ffmpeg -i input.mp4 -r 12 -s 640x360 output.gif`}</pre>
    <p>
      The problem is the palette. FFmpeg picks a generic 256-color palette, which
      doesn&rsquo;t match the actual colors in your clip, so reds turn orange and
      skies turn purple. The fix is a two-pass palette generation.
    </p>

    <h2>The two-pass palette trick</h2>
    <pre>{`# Pass 1: scan the video, build an optimal palette
ffmpeg -i input.mp4 -vf "fps=12,scale=640:-1:flags=lanczos,palettegen" palette.png

# Pass 2: encode the GIF using that custom palette
ffmpeg -i input.mp4 -i palette.png \\
  -filter_complex "fps=12,scale=640:-1:flags=lanczos[x];[x][1:v]paletteuse" \\
  output.gif`}</pre>
    <p>
      The first pass analyzes every frame in the video and picks the 256 colors that
      best represent the content. The second pass uses that palette for encoding.
      Result: dramatically better color fidelity with no file-size penalty. Every
      quality-focused GIF converter on the web does some version of this.
    </p>

    <h2>Trim before encoding</h2>
    <p>
      Always trim the source video to the exact segment you want before converting. A
      10-second clip becomes a 3MB GIF; a 30-second clip becomes a 12MB GIF. Don&rsquo;t
      encode extra footage and crop it later &mdash; the encode dominates the total
      time.
    </p>
    <pre>{`# Trim first, then convert
ffmpeg -ss 00:00:15 -to 00:00:23 -i input.mp4 -c copy trimmed.mp4
# Then run the two-pass palette on trimmed.mp4`}</pre>

    <h2>Dithering: on or off</h2>
    <p>
      Dithering scatters color errors across neighboring pixels to simulate
      intermediate colors the palette doesn&rsquo;t contain. FFmpeg&rsquo;s default is
      Sierra3 dither, which looks like a fine-grained noise pattern.
    </p>
    <p>
      <strong>Turn dithering on</strong> for photographic content, skin tones, skies,
      sunsets &mdash; anywhere smooth color gradation matters. Banding goes away, trades
      for a slight texture.
    </p>
    <p>
      <strong>Turn dithering off</strong> (<code>dither=none</code>) for UI
      screencasts, flat logos, animations with large solid-color regions. Dithering
      adds visible noise to those and hurts compression. Use <code>bayer</code> dither
      for a retro, deliberately pixel-art look.
    </p>

    <h2>Frame rate tradeoff</h2>
    <p>
      GIF file size scales linearly with frame count. Dropping from 30fps to 15fps
      halves the size. For most content, 12&ndash;15fps is indistinguishable from 30fps
      to casual viewers &mdash; the brain interpolates motion. For slow, deliberate
      content (text fading in, a tooltip appearing), 8&ndash;10fps is enough.
    </p>

    <h2>Target file size</h2>
    <pre>{`# Rough heuristics after the two-pass palette:
480x270 @ 12fps, 3 sec:   300-600 KB
640x360 @ 12fps, 3 sec:   500-900 KB
640x360 @ 15fps, 5 sec:   1.2-2.0 MB
720x405 @ 15fps, 4 sec:   1.5-2.5 MB
1080x608 @ 15fps, 5 sec:  3-5 MB (usually too big)`}</pre>
    <p>
      Ship GIFs under 2MB for blog posts, under 500KB for Slack. If you&rsquo;re over,
      reduce dimensions first (biggest lever), then shorten duration, then lower frame
      rate.
    </p>

    <h2>Scaling and aspect ratio</h2>
    <p>
      Lanczos filtering (<code>flags=lanczos</code>) produces sharper downscaled output
      than the default bilinear. Always specify it. For aspect ratio, use
      <code> scale=WIDTH:-1</code> or <code>scale=-1:HEIGHT</code> to let FFmpeg
      compute the other dimension proportionally. Making it <code>-2</code> instead of
      <code> -1</code> ensures the resulting dimension is divisible by 2, which some
      downstream tools require.
    </p>

    <h2>APNG and animated WebP alternatives</h2>
    <p>
      If your target platform supports them, both formats beat GIF decisively.
      <strong> WebP animated</strong> is typically 30&ndash;50% the size of equivalent
      GIF with full color and real alpha. Supported by all modern browsers and most
      chat platforms. Not supported by most email clients.
    </p>
    <p>
      <strong>APNG</strong> is lossless-capable PNG with animation. Universal browser
      support, excellent for UI animations, but larger than animated WebP.
    </p>
    <pre>{`# Animated WebP (much smaller than GIF for same quality)
ffmpeg -i input.mp4 -vf "fps=15,scale=640:-2:flags=lanczos" \\
  -loop 0 -q:v 80 output.webp`}</pre>
    <p>
      Default to animated WebP for web embeds. Export GIF only when you need email
      compatibility or you&rsquo;re posting to a platform that strips unknown formats.
    </p>

    <h2>Quality at the edges</h2>
    <p>
      Sharp transitions between frames (cuts, fades, text appearing) are where GIFs
      look worst &mdash; the palette has to accommodate both states, which means less
      palette space for each. If a clip has a hard cut mid-loop, consider splitting it
      into two GIFs or holding a frame before the cut to give the palette breathing
      room.
    </p>

    <h2>Looping and frame hold</h2>
    <p>
      FFmpeg&rsquo;s default loop is infinite. Specify <code>-loop 0</code> to be
      explicit. For polished output, pad the last frame by 500&ndash;800ms (hold it
      before the loop restarts) &mdash; feels professional instead of yanked.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Single-pass palette encoding.</strong> Generic palette makes colors look
      wrong. Always use the two-pass palettegen/paletteuse workflow.
    </p>
    <p>
      <strong>Converting at full video resolution.</strong> 1080p GIFs are almost never
      what you want. Downscale to 480&ndash;720px.
    </p>
    <p>
      <strong>Leaving unused footage at the head/tail.</strong> Every extra second
      balloons the file. Trim to the exact moment.
    </p>
    <p>
      <strong>Dithering on flat UI screencasts.</strong> Adds noise, hurts compression,
      looks grimy. Turn it off for synthetic content.
    </p>
    <p>
      <strong>Using GIF when WebP is supported.</strong> WebP is half the size with
      better color. Default to WebP unless your target platform doesn&rsquo;t accept
      it.
    </p>
    <p>
      <strong>Cranking frame rate past 20fps.</strong> Diminishing returns in perceived
      smoothness, linear cost in file size.
    </p>
    <p>
      <strong>Converting 30-second clips to GIF.</strong> At any quality they&rsquo;ll
      be 10MB+. Use muted autoplay video for anything over 6&ndash;8 seconds.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert videos to looping GIFs with the{" "}
      <a href="/tools/video-to-gif">video-to-GIF converter</a>. Pair with the{" "}
      <a href="/tools/video-trimmer">video trimmer</a> to cut the source down to the
      exact segment worth looping, and the{" "}
      <a href="/tools/gif-maker">GIF maker</a> when you&rsquo;re assembling frames from
      scratch rather than converting existing footage.
    </p>
  </>
);
