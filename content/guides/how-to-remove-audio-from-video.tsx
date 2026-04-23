import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Sometimes the audio has to go. A product demo where your cat meows at a critical
      moment. A screencast where you forgot your mic was off. A clip you want to
      autoplay on social media where unwanted sound would spook viewers. There are two
      ways to kill the audio &mdash; muting (keeping the track but silencing it) and
      stripping (deleting the track entirely) &mdash; and the right choice depends on
      whether you plan to add new audio later, whether you care about file size, and
      what platform you&rsquo;re publishing to. This guide covers the mute-vs-strip
      distinction, platform autoplay policies that make silent video the norm, the
      file-size savings from stripping, replacement audio workflows, and captions as a
      frequently better alternative.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Mute vs strip</h2>
    <p>
      <strong>Muting</strong> replaces the audio with silence but keeps the audio
      track intact. Players still show an audio indicator (a muted speaker icon), and
      the file size is barely different from the original &mdash; you&rsquo;ve swapped
      one compressed audio stream for another compressed audio stream of silence.
    </p>
    <p>
      <strong>Stripping</strong> removes the audio track from the container entirely.
      Players show no audio indicator; downloaders save a video-only file. File size
      drops by whatever the audio track contributed &mdash; typically 5&ndash;15% for
      H.264+AAC videos, sometimes 20&ndash;30% for high-quality audio tracks.
    </p>
    <pre>{`# Strip audio entirely (removes the track)
ffmpeg -i input.mp4 -c:v copy -an output.mp4

# Mute audio (keeps track, replaces with silence)
ffmpeg -i input.mp4 -c:v copy -f lavfi -i anullsrc \\
  -shortest -c:a aac -map 0:v -map 1:a output.mp4`}</pre>

    <h2>When to mute</h2>
    <p>
      Keep the track and silence it when you plan to replace the audio later (post
      narration, background music, sound design). Muting preserves the audio channel
      layout and sample rate, so your editor sees the expected stereo/48kHz track and
      you&rsquo;re not reconfiguring every time.
    </p>
    <p>
      Also mute when your publishing platform expects an audio track. Some older
      workflows (broadcast, certain uploaders, some ad networks) reject video-only
      files. Silent track satisfies the check.
    </p>

    <h2>When to strip</h2>
    <p>
      Strip when the final deliverable is genuinely silent &mdash; a looping UI demo
      on a landing page, a background hero video, a silent GIF-style product card. You
      get the file-size savings and there&rsquo;s no chance of a player glitching and
      briefly unmuting the audio.
    </p>

    <h2>File size savings</h2>
    <pre>{`Typical audio track sizes (at common bitrates):
AAC 128 kbps stereo   = 960 KB per minute
AAC 192 kbps stereo   = 1.44 MB per minute
AAC 256 kbps stereo   = 1.92 MB per minute
Opus 96 kbps stereo   = 720 KB per minute
Uncompressed 48kHz 16-bit stereo = 11.5 MB per minute`}</pre>
    <p>
      For a 5-minute video at 2Mbps video + 192kbps audio, total is ~80MB; stripping
      audio drops it to ~73MB (~9% savings). For a 30-second autoplay loop at 4Mbps,
      total is ~16MB; stripping audio drops it to ~15MB (~6%). Not huge, but free.
    </p>

    <h2>Autoplay policies and silent video</h2>
    <p>
      Every major browser and platform has tightened autoplay over the past few years.
      Chrome requires videos to be muted to autoplay with sound. iOS Safari requires
      the <code>muted</code> attribute plus <code>playsinline</code>. Instagram and
      TikTok autoplay muted with sound toggled on tap. The result: any video that
      appears on a page without user interaction must be silent.
    </p>
    <pre>{`<video autoplay muted playsinline loop>
  <source src="/hero.mp4" type="video/mp4">
</video>`}</pre>
    <p>
      For videos that exist solely to autoplay (hero sections, product loops,
      decorative background), strip the audio at the source. The <code>muted</code>{" "}
      attribute works, but stripping guarantees no edge case where a browser update
      or user setting unmutes the video unexpectedly.
    </p>

    <h2>Replacing with new audio</h2>
    <p>
      A common workflow: strip the original audio, then attach narration or background
      music.
    </p>
    <pre>{`# Strip original audio, add new audio track
ffmpeg -i video.mp4 -i narration.mp3 \\
  -c:v copy -c:a aac -b:a 192k \\
  -map 0:v:0 -map 1:a:0 -shortest output.mp4

# The -shortest flag cuts the output to the shorter of the two streams
# If narration is longer than video, drop -shortest and pad video instead`}</pre>
    <p>
      Match the new audio&rsquo;s length to the video explicitly. Misaligned audio
      beyond the video causes player glitches on some platforms (Twitter has been
      known to freeze on audio-longer-than-video files).
    </p>

    <h2>Captions as an alternative</h2>
    <p>
      Before stripping audio, ask whether captions solve the problem. If the original
      video has narration that conveys information, strip the audio and add captions
      or burn-in text &mdash; you keep the content accessible, meet autoplay silent
      policies, and accommodate viewers in quiet environments.
    </p>
    <p>
      Adding captions is almost always a better user experience than silent video.
      Instagram data shows 85% of feed video is watched on mute by default; captioned
      video retains viewers, uncaptioned video loses them.
    </p>

    <h2>Audio track selection in multi-track files</h2>
    <p>
      Some MKV and MP4 files have multiple audio tracks (dubbing, commentary).
      Stripping all audio removes them all. To drop specific tracks:
    </p>
    <pre>{`# Keep only the first audio track, drop the rest
ffmpeg -i input.mkv -c copy -map 0:v -map 0:a:0 output.mkv

# Drop a specific track (track index 2), keep others
ffmpeg -i input.mkv -c copy -map 0 -map -0:a:2 output.mkv`}</pre>

    <h2>Preserving metadata when stripping</h2>
    <p>
      Video metadata (timestamps, GPS, camera make) lives on the container and the
      video stream. Stripping the audio track with <code>-an</code> preserves video
      and container metadata but drops anything tied to the audio track (audio
      language tag, audio codec info). For most uses that&rsquo;s fine. For
      archival, document what you stripped in a separate metadata field.
    </p>

    <h2>Lossless vs re-encoded stripping</h2>
    <p>
      Both <code>-an</code> and map-based stripping should be paired with{" "}
      <code>-c:v copy</code> to avoid re-encoding the video. If you omit{" "}
      <code>-c:v copy</code>, FFmpeg re-encodes with its default settings, which
      might downgrade quality or change bitrate. For a simple audio strip, there&rsquo;s
      no reason to touch the video stream.
    </p>

    <h2>Normalizing volume vs stripping</h2>
    <p>
      If the original audio is just too loud or too quiet, don&rsquo;t strip &mdash;
      normalize. Loudness normalization to -14 LUFS (the YouTube standard) or -16 LUFS
      (podcast standard) fixes the level without losing the content. Stripping throws
      away potentially useful information; normalize first, strip only as a last
      resort.
    </p>
    <pre>{`# Normalize to YouTube loudness (-14 LUFS)
ffmpeg -i input.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11 \\
  -c:v copy output.mp4`}</pre>

    <h2>Common mistakes</h2>
    <p>
      <strong>Re-encoding video unnecessarily.</strong> Stripping audio should never
      touch the video stream. Always use <code>-c:v copy</code>.
    </p>
    <p>
      <strong>Confusing muted with stripped in the browser.</strong> A muted video
      still has the audio track; users can unmute it. A stripped video cannot be
      unmuted because there&rsquo;s nothing there.
    </p>
    <p>
      <strong>Forgetting platform autoplay rules.</strong> Any video that needs to
      autoplay on the web must be silent &mdash; either muted or audio-stripped.
    </p>
    <p>
      <strong>Stripping audio when captions would serve better.</strong> Narration
      removed without text replacement loses the content entirely.
    </p>
    <p>
      <strong>Leaving multiple audio tracks when replacing.</strong> If the file has
      original dialogue plus a dub, stripping with <code>-an</code> removes both;
      mapping preserves what you want.
    </p>
    <p>
      <strong>Mismatched audio length when replacing.</strong> New audio longer than
      video causes glitches on some platforms. Use <code>-shortest</code> or trim
      audio first.
    </p>
    <p>
      <strong>Skipping the shortest flag for short videos.</strong> For 6-second
      loops, a 30-second audio track plays beyond the visible video; viewers hear
      silence inexplicably.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Remove or mute audio from a video file without installing editing software using
      the <a href="/tools/video-mute">video mute tool</a>. Pair with the{" "}
      <a href="/tools/video-trimmer">video trimmer</a> to cut the clip before
      stripping, and the{" "}
      <a href="/tools/audio-trimmer">audio trimmer</a> when you plan to replace the
      stripped track with narration or music that needs its own pre-cut.
    </p>
  </>
);
