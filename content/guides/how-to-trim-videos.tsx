import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Ninety percent of video editing is just trimming &mdash; clipping out the silence
      at the start, the fumble at the end, the awkward pause in the middle. The thing
      most people don&rsquo;t realize is that trimming can be <em>lossless</em> or
      <em> lossy</em>, and the difference shows up as both file size and image quality.
      Cut at a keyframe and you keep the original encode intact. Cut between keyframes
      and you force a re-encode, which degrades quality. This guide covers the keyframe
      mechanics that determine lossless versus lossy cuts, FFmpeg&rsquo;s{" "}
      <code>-ss</code> and <code>-to</code> flags, the precise-vs-fast mode tradeoff,
      how container formats affect what&rsquo;s possible, and when re-encoding is the
      right call.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Keyframes: the anchor of modern video</h2>
    <p>
      Modern video codecs (H.264, H.265, VP9, AV1) compress by storing only the
      differences between consecutive frames. A <strong>keyframe</strong> (also called
      an I-frame) is a full, self-contained image. Every other frame (P-frames and
      B-frames) depends on surrounding frames to reconstruct. A video might have a
      keyframe every 2&ndash;10 seconds; the rest are deltas.
    </p>
    <p>
      This matters for trimming because you can only cut cleanly at a keyframe. Cut
      between keyframes and the resulting file starts on a delta that has no anchor,
      which means either the decoder fails, or the player recomputes by decoding from
      the previous keyframe and skipping &mdash; which means re-encoding.
    </p>

    <h2>Lossless trim (stream copy)</h2>
    <p>
      When you trim at keyframe boundaries, you can tell the encoder &ldquo;don&rsquo;t
      re-encode, just copy the compressed stream&rdquo; &mdash; FFmpeg&rsquo;s{" "}
      <code>-c copy</code> flag. The operation takes seconds even for a multi-gigabyte
      file, and the output is pixel-identical to the source.
    </p>
    <pre>{`# Lossless trim at keyframes
ffmpeg -ss 00:00:10 -to 00:00:40 -i input.mp4 -c copy output.mp4

# Note: -ss before -i = seeks fast to the nearest prior keyframe
# This may result in slight timing offset from requested position`}</pre>
    <p>
      The catch: your cut point snaps to the nearest prior keyframe. If you asked for
      10.0 seconds but the nearest keyframe is at 8.5 seconds, your output starts at
      8.5s. For most casual cuts this is fine. For precise frame-accurate edits,
      it&rsquo;s not.
    </p>

    <h2>Precise (re-encoding) trim</h2>
    <p>
      To hit an exact frame, you have to re-encode &mdash; decode from the prior
      keyframe to your target, then re-encode the output starting at that frame as a
      new keyframe.
    </p>
    <pre>{`# Precise trim, re-encodes
ffmpeg -i input.mp4 -ss 00:00:10.500 -to 00:00:40.000 \\
  -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k output.mp4

# -ss AFTER -i = accurate but slower (decodes from start)
# crf 18 = visually lossless H.264
# preset slow = better compression at cost of encode time`}</pre>
    <p>
      Re-encoding always costs some quality (generation loss) and takes time
      proportional to clip length. For a 2-minute output, expect 30 seconds to 5
      minutes depending on your machine and preset.
    </p>

    <h2>The -ss position trick</h2>
    <p>
      FFmpeg&rsquo;s behavior depends on where <code>-ss</code> sits:
    </p>
    <pre>{`# -ss BEFORE -i: fast seek to nearest keyframe
#                (input-side seek, snaps to keyframe)
ffmpeg -ss 00:00:10 -i input.mp4 -t 30 -c copy out.mp4

# -ss AFTER -i: accurate seek (output-side seek)
#                (decodes everything before the mark, slow)
ffmpeg -i input.mp4 -ss 00:00:10 -t 30 -c libx264 out.mp4

# Combined: fast seek to keyframe, then precise adjust
ffmpeg -ss 00:00:09 -i input.mp4 -ss 00:00:01 -t 29 -c libx264 out.mp4`}</pre>
    <p>
      The combined form is the common compromise &mdash; fast seek to roughly the
      right region, then precise adjust within that region. It&rsquo;s much faster than
      pure output-side seek on a long file.
    </p>

    <h2>Start and duration vs start and end</h2>
    <p>
      <code>-to</code> sets an absolute end time in the source. <code>-t</code> sets a
      duration from <code>-ss</code>. They produce different results when combined
      with <code>-ss</code>:
    </p>
    <pre>{`ffmpeg -ss 00:00:10 -to 00:00:40 -i input.mp4 ...
# Output: 30 seconds (from 10 to 40 in source)

ffmpeg -ss 00:00:10 -t 30 -i input.mp4 ...
# Output: 30 seconds starting at 10`}</pre>
    <p>
      Use <code>-to</code> when you know the exact end frame in the source. Use
      <code> -t</code> when you know the desired output length.
    </p>

    <h2>Container formats and their quirks</h2>
    <p>
      <strong>MP4 (H.264/H.265 in MPEG-4)</strong> &mdash; the default for most web
      video. Trims cleanly at keyframes with stream copy. Supports faststart (
      <code>-movflags +faststart</code>) so the moov atom is at the file head, making
      the video playable before full download.
    </p>
    <p>
      <strong>MOV (QuickTime)</strong> &mdash; Apple&rsquo;s container. Similar to MP4
      for trimming purposes. QuickTime Player trims losslessly by default using the
      same mechanism.
    </p>
    <p>
      <strong>WebM (VP9/VP8/AV1)</strong> &mdash; open-source web video. Trim works
      the same way; stream copy is fine at keyframes.
    </p>
    <p>
      <strong>MKV (Matroska)</strong> &mdash; supports almost any codec. Good for
      lossless trimming of long captures.
    </p>
    <p>
      <strong>Raw MPEG-TS</strong> (often from broadcasts or older captures) &mdash;
      can trim at any frame because every frame is closer to self-contained, but the
      format is less efficient.
    </p>

    <h2>When to re-encode intentionally</h2>
    <p>
      Even if you don&rsquo;t need frame-precise cuts, re-encode when:
    </p>
    <p>
      <strong>The source is higher bitrate than needed.</strong> A 50Mbps camera
      recording compressed to 8Mbps is 6x smaller with no meaningful quality loss for
      web use.
    </p>
    <p>
      <strong>The codec doesn&rsquo;t play on target.</strong> HEVC (H.265) source
      re-encoded to H.264 for older browsers.
    </p>
    <p>
      <strong>You&rsquo;re joining clips.</strong> Concatenation requires matching
      codec parameters; re-encoding normalizes them.
    </p>
    <p>
      <strong>You need a specific output spec.</strong> Social platform requirements
      (Twitter&rsquo;s 140-sec H.264, Instagram&rsquo;s 1080p 30fps cap) force
      re-encoding.
    </p>

    <h2>Keyframe interval and fragment size</h2>
    <p>
      If you control the encode pipeline upstream, set a shorter keyframe interval for
      content you expect to trim. A 1-second keyframe interval means you can trim
      losslessly within 1 second of any target, at the cost of ~10% larger files. For
      streaming (HLS/DASH) this is already the norm.
    </p>
    <pre>{`# Encode with 1-second keyframes for easier lossless trimming
ffmpeg -i source.mov -c:v libx264 -g 30 -keyint_min 30 \\
  -sc_threshold 0 -c:a aac output.mp4`}</pre>

    <h2>Audio considerations</h2>
    <p>
      Audio tracks also have their own frame boundaries (AAC frames are ~23ms).
      Lossless trim doesn&rsquo;t guarantee frame-accurate audio, but the drift is
      imperceptible (&lt;25ms). If you&rsquo;re trimming right at speech boundaries,
      you may prefer to re-encode audio with a precise cut.
    </p>

    <h2>Preserving metadata</h2>
    <p>
      Trim operations with <code>-c copy</code> preserve almost all metadata &mdash;
      timestamps, GPS, camera info, chapters. Re-encoding may strip extended metadata.
      Use <code>-map_metadata 0</code> to explicitly preserve it, and{" "}
      <code>-movflags use_metadata_tags</code> for MP4.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Re-encoding when stream copy would work.</strong> Wastes time and loses
      quality unnecessarily. Try <code>-c copy</code> first.
    </p>
    <p>
      <strong>Expecting frame-accurate cuts from stream copy.</strong> Stream copy
      snaps to keyframes. If precision matters, you must re-encode.
    </p>
    <p>
      <strong>Using -ss after -i on long files.</strong> Decodes from the start and
      takes forever. Use -ss before -i for fast seek.
    </p>
    <p>
      <strong>Omitting -c:a when re-encoding video.</strong> Audio re-encodes too if
      you don&rsquo;t specify; may lose quality. Use <code>-c:a copy</code> to keep
      audio untouched when re-encoding video.
    </p>
    <p>
      <strong>Trimming without faststart.</strong> The moov atom ends up at the tail
      of the file, so the video isn&rsquo;t streamable. Add{" "}
      <code>-movflags +faststart</code> for web.
    </p>
    <p>
      <strong>Joining trimmed segments that don&rsquo;t share codec parameters.</strong>{" "}
      Concatenation fails. Re-encode to a common spec before joining.
    </p>
    <p>
      <strong>Forgetting that timestamps can be non-zero.</strong> After trim, some
      players may show the source&rsquo;s start timestamp. Add{" "}
      <code>-reset_timestamps 1</code> to zero it.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Trim videos without installing FFmpeg using the{" "}
      <a href="/tools/video-trimmer">video trimmer</a>. Pair with the{" "}
      <a href="/tools/video-to-gif">video-to-GIF converter</a> for turning a trimmed
      segment into a looping demo, and the{" "}
      <a href="/tools/video-mute">video mute tool</a> when you need to strip the audio
      track before publishing.
    </p>
  </>
);
