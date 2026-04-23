import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Speech-to-text stopped being a novelty around 2022, when OpenAI&rsquo;s Whisper
      model hit roughly 5% word error rate on clean English audio &mdash; close to
      human transcriptionist accuracy. Before Whisper, automated transcription ranged
      from &ldquo;usable with heavy cleanup&rdquo; to &ldquo;comedic.&rdquo; Now
      it&rsquo;s fast, free on commodity hardware, and good enough for production
      captions, podcast show notes, and meeting summaries. But it still fails in
      predictable ways &mdash; accents, overlapping speech, noise, punctuation, proper
      nouns &mdash; and choosing the right model and workflow for your use case
      matters. This guide covers the model tiers, how word error rate is measured,
      speaker diarization, punctuation insertion, accent handling, noise robustness,
      and the language-support landscape.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Whisper model tiers</h2>
    <p>
      OpenAI&rsquo;s Whisper is the dominant open model. It ships in sizes:
    </p>
    <pre>{`Model      Params   VRAM req   Speed     Quality
tiny       39M      ~1 GB      10x       Basic, English-biased
base       74M      ~1 GB      7x        Decent for clean English
small      244M     ~2 GB      4x        Good for most content
medium     769M     ~5 GB      2x        Near-pro quality
large-v3   1550M    ~10 GB     1x        State-of-the-art accuracy
turbo      809M     ~6 GB      8x        Fast version of large-v3`}</pre>
    <p>
      The speed column is relative to real-time: 10x means a 10-minute audio file
      transcribes in 1 minute. Quality climbs steeply from tiny to medium, then
      plateaus &mdash; large is noticeably better only on difficult audio (accents,
      noise, music). For clean studio speech, small and medium often produce nearly
      identical output.
    </p>

    <h2>Word Error Rate (WER)</h2>
    <p>
      WER is the standard accuracy metric: <code>(S + D + I) / N</code>, where S is
      substitutions, D is deletions, I is insertions, and N is the total words in the
      reference. A 5% WER means 1 in 20 words is wrong.
    </p>
    <pre>{`Reference:     "the meeting is at three on Tuesday"
Transcription: "the meeting is at 3:00 on Tuesday"

Substitutions: "three" -> "3:00" (1)
N = 7 words
WER = 1/7 = 14.3%
(Technically accurate, but semantically identical
 -- WER penalizes formatting differences.)`}</pre>
    <p>
      A state-of-the-art Whisper-large model achieves 5&ndash;10% WER on clean
      conversational English. Lower-quality source audio (phone calls, noisy rooms)
      pushes WER to 15&ndash;30%. For non-English and heavy accents, expect
      10&ndash;40% depending on the target language&rsquo;s training data volume.
    </p>

    <h2>Speaker diarization</h2>
    <p>
      Diarization is the &ldquo;who spoke when&rdquo; problem &mdash; splitting a
      transcript into labeled speaker turns. Whisper doesn&rsquo;t do diarization
      natively; it transcribes word-by-word with timestamps and leaves speaker
      attribution to a separate step.
    </p>
    <p>
      Common diarization pipelines: pyannote.audio (open source, accurate), AWS
      Transcribe (cloud, integrated), Deepgram (cloud, fast). They cluster voice
      embeddings to group similar-sounding segments together, then label them
      Speaker 1, Speaker 2, etc. Accuracy drops with more speakers and overlapping
      speech.
    </p>
    <pre>{`# With whisperx (which combines Whisper + diarization)
whisperx audio.mp3 --diarize --min_speakers 2 --max_speakers 4

# Output format:
# [00:00.00 -> 00:05.12] SPEAKER_00: Good morning everyone.
# [00:05.20 -> 00:08.45] SPEAKER_01: Thanks for joining the call.`}</pre>

    <h2>Punctuation insertion</h2>
    <p>
      Raw speech recognition produces lowercase, punctuation-free text. A separate
      punctuation model adds periods, commas, capitalization, and sentence
      boundaries. Whisper bundles this in; older ASR engines don&rsquo;t.
    </p>
    <p>
      Punctuation is surprisingly hard because speech doesn&rsquo;t have clear sentence
      boundaries. Speakers trail off, restart mid-thought, use fillers (&ldquo;um,&rdquo;
      &ldquo;like,&rdquo; &ldquo;you know&rdquo;). Good punctuation models balance:
      break sentences where pauses and intonation suggest natural boundaries, but
      don&rsquo;t create fragments every time someone takes a breath.
    </p>

    <h2>Accent handling</h2>
    <p>
      Whisper was trained on 680,000 hours of multilingual audio including many
      accented English variants, which makes it relatively robust. But accuracy still
      drops for accents underrepresented in the training set. Typical WER penalty:
    </p>
    <pre>{`Accent                 WER increase vs. neutral American
American, British      baseline
Australian, Canadian   ~1% increase
Indian English         ~3-5% increase
Nigerian, Kenyan       ~5-8% increase
Scottish, Irish (thick) ~8-15% increase
Heavy Chinese ESL       ~10-20% increase
Heavy Arabic ESL        ~8-15% increase`}</pre>
    <p>
      Mitigations: use the larger models (large-v3 handles accents notably better
      than base), give the model context via Whisper&rsquo;s <code>initial_prompt</code>{" "}
      parameter (&ldquo;This is a recording of Nigerian English speakers discussing
      medical research&rdquo;), and clean the audio (denoise, normalize) before
      transcription.
    </p>

    <h2>Noisy environments</h2>
    <p>
      Background noise is the #1 WER killer. A clean studio recording might transcribe
      at 4% WER; the same content with -20dB background chatter can jump to 15% WER.
      Mitigations:
    </p>
    <p>
      <strong>Record clean.</strong> Close-mic, quiet room, dead-cat windscreen
      outdoors. Garbage in, garbage out.
    </p>
    <p>
      <strong>Denoise pre-transcription.</strong> Tools like RNNoise (open source),
      Krisp, or Adobe&rsquo;s Enhance Speech can clean up recorded audio. Apply
      conservatively &mdash; aggressive denoising can remove speech consonants and
      hurt transcription more than it helps.
    </p>
    <p>
      <strong>Use voice activity detection.</strong> Split the audio into speech
      segments and transcribe each, skipping pure-noise regions. Reduces
      hallucination risk.
    </p>

    <h2>Hallucinations</h2>
    <p>
      Whisper sometimes invents text during silence or near-silence &mdash; a classic
      hallucination is generating &ldquo;Thanks for watching!&rdquo; at the end of
      nearly-silent audio (the training data had lots of YouTube endings). Mitigations:
      trim silence before transcription, use VAD (voice activity detection) to skip
      quiet regions, enable <code>no_speech_threshold</code> to filter low-probability
      segments.
    </p>

    <h2>Language support</h2>
    <p>
      Whisper supports ~100 languages, with varying quality. Top-tier (near-English
      quality): Spanish, French, German, Mandarin Chinese, Japanese, Portuguese,
      Italian, Korean. Mid-tier (usable, 10&ndash;20% WER): Arabic, Hindi, Russian,
      Indonesian, Turkish, Polish, Dutch. Low-tier (noisy, often 30%+ WER):
      low-resource languages with limited training data &mdash; Swahili, Welsh,
      Tagalog, Yoruba.
    </p>
    <p>
      For non-English, larger models make a bigger difference. Tiny may produce
      unusable output for French, while medium is excellent.
    </p>

    <h2>Cloud vs local</h2>
    <p>
      <strong>Cloud transcription</strong> (AWS, Google, Azure, Deepgram) &mdash; easy
      API, no local GPU needed, pay per minute. Deepgram and AssemblyAI are typically
      fastest and most accurate for English. Privacy-sensitive content may not be
      appropriate for cloud.
    </p>
    <p>
      <strong>Local transcription</strong> &mdash; run Whisper on your own machine.
      Privacy-safe, no per-minute costs, but requires GPU for large models. CPU works
      for small model on short files. For one-off transcription of personal content,
      local is the right default.
    </p>

    <h2>Timestamps and alignment</h2>
    <p>
      Whisper outputs per-segment timestamps by default (roughly 5&ndash;30 seconds per
      segment). For captions and subtitle generation, you need word-level timestamps.
      Tools like whisperx add forced alignment via wav2vec2, producing sub-second
      word-level timing needed for synced captions.
    </p>
    <pre>{`# Word-level timing via whisperx
whisperx input.mp3 --model large-v3 --output_format srt

# Produces .srt with lines like:
# 00:00:01,220 --> 00:00:03,840
# Hello and welcome to the podcast.`}</pre>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using the tiny model for production.</strong> WER is 15&ndash;30%+,
      which means real-world transcripts need heavy cleanup. Use medium or large
      unless speed is critical.
    </p>
    <p>
      <strong>Trusting diarization without review.</strong> Speaker boundaries are
      often misplaced, especially with overlapping speech. Manually verify before
      shipping.
    </p>
    <p>
      <strong>Forgetting to clean input audio.</strong> Noise reduction and
      normalization before transcription can halve WER. Worth the extra step.
    </p>
    <p>
      <strong>Leaving in Whisper hallucinations.</strong> Long silences often
      trigger &ldquo;thanks for watching&rdquo; and similar spurious text. Trim
      silence or use VAD.
    </p>
    <p>
      <strong>Expecting perfect proper nouns.</strong> Names, brands, and technical
      jargon are error-prone. Supply them via the prompt parameter or do a targeted
      find-replace pass.
    </p>
    <p>
      <strong>Running on CPU when GPU is available.</strong> A 10-minute audio file
      takes 2 minutes on GPU-medium, 20 minutes on CPU. For batch work, the GPU is
      worth the setup.
    </p>
    <p>
      <strong>Ignoring language hints.</strong> Auto-detect works but adds
      uncertainty. Specify <code>--language en</code> when you know the language.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Turn audio into text without installing Whisper locally using the{" "}
      <a href="/tools/speech-to-text">speech-to-text tool</a>. Pair with the{" "}
      <a href="/tools/voice-note-transcriber">voice note transcriber</a> for short
      mobile recordings where speaker attribution matters less, and the{" "}
      <a href="/tools/audio-silence-remover">audio silence remover</a> to trim dead
      air before transcription to avoid hallucinations in quiet regions.
    </p>
  </>
);
