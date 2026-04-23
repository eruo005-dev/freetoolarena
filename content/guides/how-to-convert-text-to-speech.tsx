import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Text-to-speech went from robotic-sounding novelty to genuinely human-sounding
      tool around 2020, when neural TTS models (WaveNet, Tacotron, then Glow-TTS and
      VALL-E) replaced the older concatenative and formant-synthesis approaches. The
      difference is striking &mdash; modern TTS is used for audiobook narration,
      podcast ads, IVR systems, and accessibility tools without listeners realizing
      it&rsquo;s synthetic. Using TTS well, though, still takes more than
      copy-pasting text. This guide covers SSML markup for precise control, voice
      selection criteria, prosody (rate, pitch, volume), the split between the
      browser&rsquo;s free Web Speech API and cloud TTS services, and the
      accessibility considerations that separate &ldquo;technically reads the
      text&rdquo; from &ldquo;actually useful for screen-reader users.&rdquo;
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What neural TTS does differently</h2>
    <p>
      Old TTS pipelines concatenated recorded phonemes (tiny speech fragments) and
      smoothed the seams. Output sounded segmented and robotic. Neural TTS generates
      the waveform directly from text using deep learning &mdash; either in a
      two-stage pipeline (text to mel-spectrogram, then neural vocoder to waveform)
      or end-to-end (text straight to waveform). The result has natural prosody,
      breathing, and intonation.
    </p>
    <p>
      Current state-of-the-art systems can clone a voice from 3&ndash;5 seconds of
      reference audio, match emotional tone, and even preserve a speaker&rsquo;s
      accent across languages. The tradeoff is compute &mdash; neural TTS needs a GPU
      for real-time generation, unlike the old concatenative systems that ran on
      phones in 2005.
    </p>

    <h2>SSML: the markup language for TTS</h2>
    <p>
      Speech Synthesis Markup Language (SSML) is a W3C standard that lets you control
      how text is rendered. It looks like HTML with TTS-specific tags.
    </p>
    <pre>{`<speak>
  <p>
    Welcome to the tutorial.
    <break time="500ms"/>
    Today we&rsquo;ll cover three topics:
    SSML, <emphasis level="strong">voice selection</emphasis>,
    and <prosody rate="slow">carefully-paced narration</prosody>.
  </p>
  <p>
    The meeting starts at <say-as interpret-as="time">3:00 PM</say-as>,
    and the ID is <say-as interpret-as="characters">ABC123</say-as>.
  </p>
</speak>`}</pre>
    <p>
      Not all TTS engines support all SSML tags. AWS Polly and Google Cloud TTS
      support broad SSML; OpenAI&rsquo;s TTS API currently supports only plain text.
      Check your engine&rsquo;s docs before authoring SSML.
    </p>

    <h2>Key SSML tags</h2>
    <pre>{`<break time="500ms"/>        Pause for 500 milliseconds
<prosody rate="slow">         Slower speech
<prosody rate="fast">         Faster
<prosody pitch="+3st">        Raise pitch by 3 semitones
<prosody volume="+6dB">       Louder
<emphasis level="strong">     Emphasize words
<say-as interpret-as="date">  Read "2024-04-23" as "April 23"
<say-as interpret-as="telephone"> Read digits as phone number
<say-as interpret-as="characters"> Spell out letter-by-letter
<phoneme alphabet="ipa" ph="t@'meItoU">tomato</phoneme>
<sub alias="World Health Organization">WHO</sub>`}</pre>

    <h2>Voice selection</h2>
    <p>
      The voice sets the personality of the output. Most cloud TTS services offer
      dozens of voices per language, with names (Amazon Polly has Matthew, Joanna,
      Ivy; Google has wavenet voices coded Male A/B/C; Azure has over 400 neural
      voices across 100+ languages).
    </p>
    <p>
      Voice choice criteria: match the content&rsquo;s formality (a news-style voice
      vs conversational), match the demographic you&rsquo;re targeting (age, accent,
      gender), and test with your actual script &mdash; some voices handle long
      sentences better than others.
    </p>

    <h2>Prosody: rate, pitch, volume</h2>
    <p>
      Rate is measured as a percentage (&ldquo;slow,&rdquo; &ldquo;medium,&rdquo;
      &ldquo;fast,&rdquo; or <code>50%</code>&ndash;<code>200%</code>). Typical
      preferences:
    </p>
    <pre>{`Content type            Recommended rate
Audiobook narration     90-95% (slightly slow, let words land)
Podcast ad read         100% (natural)
News / announcements    105-110%
Tutorial voiceover      90-100%
Accessibility (screen reader) user preference; default 100%`}</pre>
    <p>
      Pitch in semitones (<code>-20st</code> to <code>+20st</code>) or percentages.
      Small shifts (+/- 2 semitones) are useful to distinguish characters in a
      dialogue or to match a brand voice; big shifts (+/- 10st) sound cartoonish.
    </p>
    <p>
      Volume in dB (<code>-40dB</code> to <code>+6dB</code>) or named levels. Rarely
      needed &mdash; normalize in post-production instead.
    </p>

    <h2>Web Speech API (browser-native)</h2>
    <p>
      Browsers include a free TTS engine via the <code>SpeechSynthesis</code> API. No
      API key, no per-character cost, works offline. The quality varies dramatically
      by OS &mdash; macOS and iOS use Apple&rsquo;s high-quality neural voices;
      Windows uses decent neural voices; Linux often has only basic eSpeak voices.
    </p>
    <pre>{`const utter = new SpeechSynthesisUtterance("Hello, world.");
utter.rate = 1.0;
utter.pitch = 1.0;
utter.volume = 1.0;
utter.voice = speechSynthesis.getVoices()
  .find(v => v.name.includes("Samantha"));
speechSynthesis.speak(utter);`}</pre>
    <p>
      The Web Speech API has no SSML support. You can control rate, pitch, volume per
      utterance, but not mid-sentence emphasis or pauses. For richer control, use
      cloud TTS.
    </p>

    <h2>Cloud TTS comparison</h2>
    <pre>{`Provider        Voices   Neural   SSML   Price (per 1M chars)
AWS Polly       60+      Yes      Full   $4 standard, $16 neural
Google Cloud    220+     Yes      Full   $4-$16 depending on tier
Azure           400+     Yes      Full   $4-$16
ElevenLabs      dozens   Yes      Some   $5-$30 per 1M chars
OpenAI TTS      6        Yes      None   $15 per 1M chars`}</pre>
    <p>
      For long-form content (audiobooks, podcast production) the cost matters; a
      50,000-character chapter is ~$0.20&ndash;$0.80. For real-time applications
      (phone systems, games), latency matters more. ElevenLabs and Azure are the
      common choices for expressive narration; AWS and Google for high-volume IVR.
    </p>

    <h2>Pronunciation control</h2>
    <p>
      TTS engines mispronounce unusual words, brand names, and technical terms. Fixes:
    </p>
    <p>
      <strong>Spell it phonetically in the text.</strong> &ldquo;Write
      &lsquo;kubernetes&rsquo; as &lsquo;koo-bur-NET-eez&rsquo; in the script.&rdquo;
      Works but looks odd to editors.
    </p>
    <p>
      <strong>Use SSML phoneme tags.</strong> <code>&lt;phoneme alphabet=&quot;ipa&quot; ph=&quot;ku:b@rneItIs&quot;&gt;kubernetes&lt;/phoneme&gt;</code>.
      Precise but requires IPA knowledge.
    </p>
    <p>
      <strong>Define a custom lexicon.</strong> AWS Polly and Google support uploading
      a lexicon file that applies to all requests &mdash; best for brand names used
      across many scripts.
    </p>

    <h2>Audio output format</h2>
    <p>
      Cloud TTS typically offers MP3 (good default, small file, universal support),
      WAV or PCM (lossless, large, good for further editing), OGG (smaller than MP3,
      less universal), or a streaming format for real-time playback.
    </p>
    <p>
      For a final podcast or video deliverable, request WAV or 320kbps MP3, apply any
      post-processing (compression, EQ, loudness normalization to -16 LUFS), then
      export to final format. Don&rsquo;t use the raw TTS MP3 as-is &mdash; post
      processing makes it sound more professional.
    </p>

    <h2>Accessibility considerations</h2>
    <p>
      Screen-reader users consume TTS output hours per day. A few rules for
      TTS-accessible content:
    </p>
    <p>
      Respect the user&rsquo;s chosen voice and rate &mdash; don&rsquo;t hardcode a
      fast rate &ldquo;to save time.&rdquo; Screen-reader users typically listen at
      300+ WPM with practice.
    </p>
    <p>
      Provide punctuation that TTS engines interpret correctly. A dash (&mdash;)
      creates a pause; parentheses group phrases; an em-space after a sentence allows
      natural breath. Avoid Unicode decorations and special characters that engines
      may verbalize literally (&ldquo;star&rdquo;, &ldquo;black-small-square&rdquo;).
    </p>
    <p>
      For accessibility-focused apps, offer a voice-selection UI rather than
      hardcoding one voice.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Assuming all engines support SSML.</strong> OpenAI TTS ignores SSML
      entirely. Test your markup against your actual engine.
    </p>
    <p>
      <strong>Using the default voice without auditioning alternatives.</strong>{" "}
      Voice choice dramatically changes perceived quality. Compare three or four on
      the same script before committing.
    </p>
    <p>
      <strong>Speaking too fast for long-form content.</strong> Audiobook narration
      at 100% is typically too fast; 90&ndash;95% lets words land.
    </p>
    <p>
      <strong>Ignoring mispronunciations.</strong> Brand names, product names, and
      technical jargon almost always need lexicon entries or phoneme tags.
    </p>
    <p>
      <strong>Shipping raw TTS without post-processing.</strong> Loudness
      normalization, EQ, and subtle compression are the difference between
      &ldquo;robot reading&rdquo; and &ldquo;professional narration.&rdquo;
    </p>
    <p>
      <strong>Forgetting silence at the head and tail.</strong> Cloud TTS often
      produces output that starts speaking immediately. Add 300&ndash;500ms of silence
      at each end for natural pacing.
    </p>
    <p>
      <strong>Using neural voices without disclosure when required.</strong> Some
      jurisdictions require disclosure of AI-generated voice in ads and political
      content.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate speech from text with voice controls using the{" "}
      <a href="/tools/text-to-speech">text-to-speech tool</a>. Pair with the{" "}
      <a href="/tools/audio-trimmer">audio trimmer</a> to tidy the start and end of
      the generated file before shipping, and the{" "}
      <a href="/tools/speech-to-text">speech-to-text tool</a> when you want to
      generate a transcript for captions from the synthesized audio in a round-trip
      workflow.
    </p>
  </>
);
