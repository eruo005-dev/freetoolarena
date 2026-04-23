import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Playing a podcast at 1.5x saves you a third of your listening time. Speeding up
      a 2-hour lecture to 2x turns it into a 1-hour review session. But there&rsquo;s a
      catch: naive speed changes make voices sound like cartoon chipmunks (pitch goes
      up with speed). Doing it right requires time-stretching &mdash; changing speed
      while preserving pitch &mdash; which uses signal-processing algorithms with
      names like WSOLA and phase vocoder. This guide covers what&rsquo;s actually
      happening when you slide the speed slider, why modern audio apps preserve pitch
      automatically, the algorithms behind the effect and their tradeoffs, speed
      limits for intelligibility, and the distinction between speech use cases
      (1.5&ndash;2x podcasts) and music use cases (subtle pitch-safe tempo adjusts).
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Naive resampling vs time-stretching</h2>
    <p>
      <strong>Naive resampling</strong> speeds up audio by playing the samples faster.
      A 48kHz stream at 2x becomes effectively 96kHz for the original content, which
      the output device renders at 48kHz by compressing the frequencies &mdash; pitch
      goes up an octave. This is how vinyl records sound when you spin them faster.
    </p>
    <p>
      <strong>Time-stretching</strong> changes the duration without changing pitch. The
      signal is broken into short overlapping windows; the algorithm either repeats
      windows (for slowdown) or skips some (for speedup) while maintaining phase
      continuity at the boundaries. Pitch stays the same.
    </p>
    <pre>{`# FFmpeg: time-stretch to 1.5x speed, preserve pitch
ffmpeg -i input.mp3 -af "atempo=1.5" output.mp3

# 2x speed (atempo supports 0.5x to 2.0x per pass)
ffmpeg -i input.mp3 -af "atempo=2.0" output.mp3

# 3x speed requires chaining (atempo limit is 2.0 per filter)
ffmpeg -i input.mp3 -af "atempo=2.0,atempo=1.5" output.mp3

# Naive resample (pitch changes too, legacy effect)
ffmpeg -i input.mp3 -af "asetrate=48000*1.5,aresample=48000" output.mp3`}</pre>

    <h2>WSOLA and SOLA</h2>
    <p>
      SOLA (Synchronized Overlap-Add) and WSOLA (Waveform Similarity Overlap-Add) are
      the classic time-stretching algorithms for speech. They break the signal into
      overlapping ~25ms frames and stitch them back with sub-sample alignment so the
      waveform is continuous.
    </p>
    <p>
      WSOLA improves on SOLA by searching a small window for the best alignment point
      based on waveform similarity, which reduces phasing artifacts. It&rsquo;s the
      algorithm behind most podcast-app speed controls. For speech it&rsquo;s
      near-transparent up to 2x; beyond 2.5x, artifacts become audible regardless of
      algorithm choice.
    </p>

    <h2>Phase vocoder</h2>
    <p>
      For music, phase vocoders work in the frequency domain &mdash; STFT (short-time
      Fourier transform) breaks the signal into overlapping FFT windows, the
      algorithm manipulates the magnitude and phase of each frequency bin, and inverse
      STFT recombines them at the new rate.
    </p>
    <p>
      Phase vocoders preserve complex harmonic content (chords, overtones) better than
      WSOLA but smear transients (drums, attacks). Modern implementations (phase
      locking, transient detection) mitigate this, but extreme speed changes on music
      still smear. The high-end commercial tool for this is &Eacute;lastique Pro; the
      open-source equivalent is rubberband.
    </p>

    <h2>PSOLA for voice pitch</h2>
    <p>
      PSOLA (Pitch-Synchronized Overlap-Add) is used for <em>pitch</em> shifting
      (changing pitch without changing speed). It&rsquo;s the counterpart to WSOLA and
      is the algorithm behind vocal tuning plugins. Not directly used for speed
      changes, but many tools combine PSOLA and WSOLA to let you adjust pitch and
      speed independently.
    </p>

    <h2>Listening speeds for podcasts</h2>
    <pre>{`Speed   Perceived          Retention
1.0x    Natural pace       Baseline
1.25x   Slightly brisk     ~98% of 1x
1.5x    Comfortably fast   ~95% of 1x (sweet spot)
1.75x   Fast, needs focus  ~88% for most
2.0x    Quite fast         ~80%, diminishing returns
2.5x    Comprehension      ~60%, for fast speakers only
          drops rapidly
3.0x    Usually unusable   <50% except for slow speakers`}</pre>
    <p>
      Speakers with deliberate pacing (Dan Carlin, Joe Rogan guests) tolerate 2x
      well. Speakers who already talk fast (many tech podcasts) peak at 1.5x.
      Interview-heavy shows with a lot of silence can feel natural at 1.75x because
      silence-removal plus speedup stacks.
    </p>

    <h2>Music speed changes</h2>
    <p>
      For music, small speed changes (+/- 5%) are nearly imperceptible to casual
      listeners and can correct for live-recording tempo drift. Larger changes
      (+/- 15%) are obvious but can still sound musical with good algorithms.
      Beyond that, you&rsquo;re in remix territory.
    </p>
    <p>
      Note: DJs often change pitch and tempo together (classic vinyl pitch control on
      a turntable). Preserving pitch while changing tempo is deliberately unusual in
      DJ contexts &mdash; the speed change <em>should</em> raise pitch because
      that&rsquo;s what matches a beat-matched mix.
    </p>

    <h2>Slowing down for learning</h2>
    <p>
      Slowing audio to 0.75x or 0.5x is useful for transcription, language learning,
      and guitar tab-off. Time-stretching handles slowdown better than speedup
      because the algorithm has more source material to work with per output sample.
      Pitch stays intact, phrasing clarity improves.
    </p>
    <p>
      0.5x speed is the common floor for learning applications &mdash; slower than
      that and the artifacts (smeared consonants, muddy harmonics) outweigh the
      clarity gain.
    </p>

    <h2>Pitch-speed coupling in creative effects</h2>
    <p>
      The chipmunk effect (naive speedup with pitch change) is used deliberately for
      comedy and lo-fi vibes. The slowed-down-and-reverbed effect (same speed and
      pitch drop) is used in chopped-and-screwed music and slowed-remix TikToks.
      Both skip time-stretching and embrace the coupled change.
    </p>
    <pre>{`# Chipmunk effect (speed up with pitch)
ffmpeg -i input.mp3 \\
  -af "asetrate=48000*1.3,aresample=48000" output.mp3

# Slowed-reverb effect (slow down with pitch drop)
ffmpeg -i input.mp3 \\
  -af "asetrate=48000*0.85,aresample=48000,aecho=0.8:0.9:500:0.3" \\
  output.mp3`}</pre>

    <h2>Video and audio sync</h2>
    <p>
      When speeding up a video, the audio and video must change rate together. Most
      video apps handle this transparently &mdash; set a 1.5x speed and both
      streams adjust. Behind the scenes the audio is time-stretched (pitch preserved)
      and the video is decimated or frame-blended.
    </p>
    <pre>{`# Speed up video and audio together, preserve pitch
ffmpeg -i input.mp4 \\
  -filter_complex "[0:v]setpts=0.667*PTS[v];[0:a]atempo=1.5[a]" \\
  -map "[v]" -map "[a]" output.mp4

# Note: setpts 0.667 = 1/1.5 (video plays faster),
# atempo 1.5 = audio plays 1.5x`}</pre>

    <h2>Quality tips</h2>
    <p>
      Start from the highest-quality source you have. Speed changes amplify any
      existing artifacts &mdash; compression ringing, low sample rates, clipping all
      become more audible. A 320kbps MP3 time-stretched sounds notably better than a
      128kbps one.
    </p>
    <p>
      For professional-quality speech speedup, use tools that implement transient
      detection &mdash; the algorithm protects consonants (plosives, sibilants) from
      smearing, which is the biggest artifact at higher speeds.
    </p>

    <h2>Podcast workflow: combine with silence removal</h2>
    <p>
      Silence removal plus speedup compound. Removing the 15% of a podcast
      that&rsquo;s dead air, then applying 1.5x, effectively gives you 1.75x
      listening speed. This is what premium podcast apps like Overcast (&ldquo;Smart
      Speed&rdquo;) do by default &mdash; you subscribe to a 2-hour show, and it
      delivers in 1 hour 10 minutes without sounding rushed.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using naive resampling when you meant time-stretching.</strong>{" "}
      Chipmunk voices on a podcast is a bug unless you&rsquo;re being funny.
    </p>
    <p>
      <strong>Exceeding atempo&rsquo;s 2.0 per-pass limit.</strong> Chain filters:
      <code> atempo=2.0,atempo=1.5</code> for 3x.
    </p>
    <p>
      <strong>Applying speed change to lossy source and re-encoding lossy.</strong>{" "}
      Compounds quality loss. Start from highest-quality source possible.
    </p>
    <p>
      <strong>Ignoring transient artifacts on music.</strong> Drums smear at big
      speed changes. Use tools with transient preservation (rubberband) for
      music.
    </p>
    <p>
      <strong>Forgetting video timestamp adjustment.</strong> When speeding up video,
      you must adjust both video PTS and audio tempo, not just one.
    </p>
    <p>
      <strong>Assuming slowdown is free.</strong> It&rsquo;s better than speedup but
      still produces phasing artifacts below 0.5x. Don&rsquo;t go below 0.5 unless
      you have to.
    </p>
    <p>
      <strong>Testing only with speech.</strong> Algorithms optimized for speech
      (WSOLA) produce audible artifacts on music. Test on representative content.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Change playback speed with pitch preservation using the{" "}
      <a href="/tools/audio-speed-changer">audio speed changer</a>. Pair with the{" "}
      <a href="/tools/audio-silence-remover">audio silence remover</a> to strip dead
      air before speedup for maximum effective speed gain, and the{" "}
      <a href="/tools/audio-pitch-changer">audio pitch changer</a> when you need to
      adjust pitch independently (e.g., transposing a music track without tempo
      change).
    </p>
  </>
);
