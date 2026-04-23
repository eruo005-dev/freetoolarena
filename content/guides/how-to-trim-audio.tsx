import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Trimming audio looks trivial: slide two handles, export the middle. Then you
      notice the click at the cut points, the fade-out that abruptly stops, the file
      that&rsquo;s now 40MB bigger than it should be, and the sample rate that silently
      changed from 48kHz to 44.1kHz and somehow the tempo is 0.1% off. Good audio
      trimming depends on where you cut (zero crossings), how you fade (in and out to
      prevent clicks), and whether you re-encode or stream-copy. This guide covers the
      mechanics of cutting without clicks, why fade in/out matters for every cut,
      lossless vs re-encoded trims, the format differences (WAV, MP3, OGG, FLAC),
      sample rate preservation, and the batch-trimming workflows that save hours when
      you&rsquo;re processing a whole folder.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Why cuts click</h2>
    <p>
      Audio is a wave. When you cut mid-wave at a non-zero amplitude, the cut creates
      an instantaneous jump to the next sample, which the speaker reproduces as a
      sharp transient &mdash; a click or pop. The higher the amplitude at the cut
      point, the louder the click.
    </p>
    <p>
      Two solutions: cut at <strong>zero crossings</strong> (moments where the
      waveform crosses the zero-amplitude line) so there&rsquo;s no jump, or apply a
      short <strong>fade</strong> at each cut to taper the amplitude to zero.
    </p>

    <h2>Zero-crossing cuts</h2>
    <p>
      A zero crossing is a sample where the waveform transitions from negative to
      positive (or vice versa). Most DAWs and audio editors have a &ldquo;snap to zero
      crossing&rdquo; feature. For manual edits, zoom in until you can see individual
      samples and pick the nearest zero crossing to your target time.
    </p>
    <p>
      Zero crossings are perfect in theory but rare in complex audio. Music with
      multiple simultaneous instruments rarely has a clean zero crossing because one
      instrument&rsquo;s positive amplitude cancels another&rsquo;s negative. In
      practice, fades work better for music.
    </p>

    <h2>Fade in and fade out</h2>
    <p>
      Apply a short fade (5&ndash;50ms) at every cut. Fade-in starts at silence and
      ramps up to full amplitude; fade-out does the reverse. The human ear
      can&rsquo;t detect a 10ms fade as a volume change, but it absolutely prevents
      clicks.
    </p>
    <pre>{`# FFmpeg: trim with 10ms fade-in and fade-out
ffmpeg -i input.mp3 -ss 00:01:23 -to 00:02:45 \\
  -af "afade=t=in:st=83:d=0.01,afade=t=out:st=164.99:d=0.01" \\
  -c:a libmp3lame -b:a 192k output.mp3`}</pre>
    <p>
      For music with natural decay (piano notes, vocal tails), extend the fade to
      50&ndash;200ms to respect the musical phrasing. For spoken word, 10&ndash;30ms is
      enough.
    </p>

    <h2>Lossless vs re-encoded trims</h2>
    <p>
      <strong>Lossless trim</strong> uses <code>-c:a copy</code> to copy the encoded
      audio without decoding. Fast, pixel-perfect (sample-perfect), but can only cut
      at packet boundaries of the codec.
    </p>
    <p>
      <strong>Re-encoded trim</strong> decodes to raw samples, cuts at any sample
      boundary, applies effects (fades), re-encodes. Slower, introduces generation
      loss for lossy formats (MP3, AAC), but sample-accurate.
    </p>
    <pre>{`# Lossless MP3 trim (cuts at MP3 frame boundaries, ~26ms each)
ffmpeg -i input.mp3 -ss 00:01:23 -to 00:02:45 -c:a copy output.mp3

# Re-encoded MP3 trim (sample-accurate, slight quality loss)
ffmpeg -i input.mp3 -ss 00:01:23 -to 00:02:45 \\
  -c:a libmp3lame -b:a 192k output.mp3`}</pre>
    <p>
      MP3 frames are 26ms each, so lossless MP3 trims can be up to 26ms off from your
      target. AAC frames are 23ms. FLAC and WAV are sample-level precise because
      they&rsquo;re lossless formats where re-encoding costs nothing.
    </p>

    <h2>Format guide</h2>
    <pre>{`Format  Compression  Quality        Common use
WAV     Uncompressed Bit-exact      Editing master, archival
FLAC    Lossless     Bit-exact      Archival, hi-fi distribution
MP3     Lossy        Good at 192+   Streaming, podcasts (legacy)
AAC     Lossy        Better than MP3 at same bitrate (iTunes, YT)
OGG     Lossy        Better than MP3 (gaming, some streaming)
Opus    Lossy        Best under 128 kbps (WebRTC, WhatsApp)
M4A     AAC in MP4   Apple default for recordings`}</pre>
    <p>
      For editing and trimming, work in WAV or FLAC, then re-encode to the
      distribution format at the end. Every re-encode of MP3 or AAC loses quality.
    </p>

    <h2>Sample rate preservation</h2>
    <p>
      The sample rate is the number of audio samples per second (44.1kHz for CD,
      48kHz for video, 96kHz for high-res). Tools sometimes silently resample during
      re-encoding &mdash; a 48kHz source becomes a 44.1kHz output, which means a
      0.1% pitch/tempo drift for content that has to sync with video.
    </p>
    <p>
      For audio tied to video, always match the video&rsquo;s sample rate (almost
      always 48kHz). For music distributed standalone, 44.1kHz is the legacy norm.
      Never resample unless you have to; if you have to, use high-quality resampling
      (sox, soxr, libswresample with proper filters).
    </p>
    <pre>{`# Force sample rate preservation during trim
ffmpeg -i input.wav -ss 10 -to 40 -ar 48000 output.wav

# FFmpeg's default resampler is fine; for best quality:
ffmpeg -i input.wav -ss 10 -to 40 -ar 48000 \\
  -resampler soxr -precision 28 output.wav`}</pre>

    <h2>Bit depth and channel layout</h2>
    <p>
      Bit depth (16-bit, 24-bit, 32-bit float) affects dynamic range. For editing
      and trimming, preserve whatever the source uses. Don&rsquo;t downsample 24-bit
      to 16-bit unless you&rsquo;re doing the final export. Dithering is required
      when reducing bit depth; skipping it introduces quantization distortion.
    </p>
    <p>
      Channel layout (mono, stereo, 5.1, 7.1) should also be preserved. Silently
      downmixing a stereo recording to mono during a trim is a common surprise bug.
    </p>

    <h2>Fading in/out for podcasts and voiceovers</h2>
    <p>
      For spoken-word content, common fade lengths:
    </p>
    <pre>{`Opening fade-in:     100-300 ms
Closing fade-out:    200-500 ms
Between-segment cuts: 20-50 ms
Music beds fade in:  1-2 seconds
Music beds fade out: 2-4 seconds
After music cuts:    add 100ms silence before voice resumes`}</pre>
    <p>
      The asymmetry (longer fade-out than fade-in) is intentional &mdash; the ear is
      less sensitive to gradual decay than to gradual onset.
    </p>

    <h2>Batch trimming</h2>
    <p>
      For processing a folder of files with the same cut (remove first 3 seconds of
      silence, for example), use a shell loop:
    </p>
    <pre>{`# Trim first 3 seconds off every WAV in a folder
for f in *.wav; do
  ffmpeg -i "$f" -ss 3 -c:a copy "trimmed_$f"
done

# Or with a named pattern and fade
for f in *.mp3; do
  ffmpeg -i "$f" -ss 0 -to 60 \\
    -af "afade=t=out:st=59.5:d=0.5" \\
    "clip60_$f"
done`}</pre>
    <p>
      For uneven cuts across files (different trim times per file), build a CSV of
      inputs and cut points, then iterate. Faster than opening each file in a GUI.
    </p>

    <h2>Trimming silence automatically</h2>
    <p>
      Silence-based trimming is a separate skill &mdash; removing quiet sections
      rather than explicit time-stamp cuts. For just head/tail silence trimming,
      FFmpeg&rsquo;s silenceremove filter works:
    </p>
    <pre>{`# Remove silence from start and end
ffmpeg -i input.mp3 \\
  -af "silenceremove=start_periods=1:start_silence=0.5:start_threshold=-40dB,
       areverse,
       silenceremove=start_periods=1:start_silence=0.5:start_threshold=-40dB,
       areverse" \\
  output.mp3`}</pre>
    <p>
      The threshold (-40dB here) controls what counts as silence. -35dB is aggressive
      (removes light breathing); -50dB is gentle (only true silence). Tune per
      source.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Cutting mid-wave without fades.</strong> Creates clicks at cut points.
      Always apply at least a 10ms fade in and out.
    </p>
    <p>
      <strong>Re-encoding MP3 repeatedly.</strong> Each encode loses quality. Keep a
      WAV or FLAC master; export to MP3 only for final distribution.
    </p>
    <p>
      <strong>Ignoring sample rate drift.</strong> 48kHz audio resampled to 44.1kHz
      for video desyncs by ~4 seconds per hour.
    </p>
    <p>
      <strong>Using lossless trim for sample-accurate needs.</strong> MP3 cuts snap
      to 26ms frame boundaries. For speech-timed dialogue, re-encode to hit exact
      sample.
    </p>
    <p>
      <strong>Default fade lengths on music.</strong> 10ms is enough for speech but
      too abrupt for music with natural decay. Extend to 50&ndash;200ms for music.
    </p>
    <p>
      <strong>Forgetting channel layout.</strong> Stereo accidentally exported as
      mono loses spatial info and halves file size unexpectedly.
    </p>
    <p>
      <strong>Trimming before cleaning.</strong> If the source has noise or clipping,
      fix it in the master and re-export the trim afterward &mdash; don&rsquo;t bake
      a distorted signal into a trimmed output.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Trim audio with fades and format conversion using the{" "}
      <a href="/tools/audio-trimmer">audio trimmer</a>. Pair with the{" "}
      <a href="/tools/audio-silence-remover">audio silence remover</a> to clean up
      dead air before or after the main content, and the{" "}
      <a href="/tools/audio-speed-changer">audio speed changer</a> when you need to
      adjust pace (typical for podcast normalization) after trimming.
    </p>
  </>
);
