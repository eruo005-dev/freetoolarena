import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Morse code is a 180-year-old encoding that turned the
      alphabet into patterns of short and long signals, originally
      so electrical impulses could carry language down a telegraph
      wire. It outlived the telegraph by a century because it
      works in almost any medium that can distinguish two states:
      sound, light, radio pulses, a tapped pipe, a blinking
      flashlight. Modern aviation still uses it for navigation
      beacon identification, amateur radio keeps it alive on HF
      bands, and it remains the fallback emergency signal everyone
      was taught at least once (dot dot dot, dash dash dash, dot
      dot dot). This guide covers the international Morse
      alphabet, timing rules, prosigns that frame real-world
      traffic, the difference between international and American
      railroad Morse, why SOS is exactly what it is, and the
      practical uses that keep the code on license exams today.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Dots, dashes, and timing</h2>
    <p>
      Every Morse character is a sequence of two signal lengths:
      short (&ldquo;dot&rdquo; or &ldquo;dit&rdquo;) and long
      (&ldquo;dash&rdquo; or &ldquo;dah&rdquo;). The dash is three
      times the length of the dot &mdash; this ratio is what makes
      Morse a code rather than a random sequence.
    </p>
    <p>
      Full timing rules:
    </p>
    <p>
      One dot = one time unit.
      One dash = three time units.
      Gap between parts of the same letter = one unit.
      Gap between letters = three units.
      Gap between words = seven units.
    </p>
    <p>
      The &ldquo;time unit&rdquo; is whatever the operator chooses.
      At 20 words per minute, a dot is about 60 milliseconds. The
      PARIS word (the traditional standard) is 50 units long, so
      words-per-minute equals 50 &times; (units per second) / 60.
    </p>

    <h2>International Morse alphabet</h2>
    <pre>{`A .-      N -.       0 -----
B -...    O ---      1 .----
C -.-.    P .--.     2 ..---
D -..     Q --.-     3 ...--
E .       R .-.      4 ....-
F ..-.    S ...      5 .....
G --.     T -        6 -....
H ....    U ..-      7 --...
I ..      V ...-     8 ---..
J .---    W .--      9 ----.
K -.-     X -..-
L .-..    Y -.--
M --      Z --..`}</pre>
    <p>
      Short codes go to common letters. E is a single dot because
      E is the most frequent letter in English &mdash; the same
      frequency insight that drives Huffman coding, arrived at a
      century earlier by Alfred Vail, who did much of the actual
      assignment work while Samuel Morse took the credit.
    </p>

    <h2>Punctuation and specials</h2>
    <pre>{`.  .-.-.-       :  ---...
,  --..--       ;  -.-.-.
?  ..--..       =  -...-
'  .----.       +  .-.-.
!  -.-.--       /  -..-.
/  -..-.        (  -.--.
&  .-...        )  -.--.-
@  .--.-.       -  -....-`}</pre>
    <p>
      The <code>@</code> assignment (added in 2004 by the ITU) was
      the first new Morse character in decades, reflecting
      email-era usage in amateur contests.
    </p>

    <h2>Prosigns &mdash; operator signals</h2>
    <p>
      Prosigns are two-letter patterns sent with no gap, meaning a
      procedural instruction rather than a letter. Written with a
      bar over the letters.
    </p>
    <p>
      <strong>&#172;AR</strong> (<code>.-.-.</code>) &mdash; end of
      message.
    </p>
    <p>
      <strong>&#172;SK</strong> (<code>...-.-</code>) &mdash; end of
      contact.
    </p>
    <p>
      <strong>&#172;BT</strong> (<code>-...-</code>) &mdash; separator
      within a message (like a paragraph break).
    </p>
    <p>
      <strong>&#172;KN</strong> (<code>-.--.</code>) &mdash; &ldquo;go
      ahead, specific station only.&rdquo;
    </p>
    <p>
      <strong>&#172;SOS</strong> (<code>...---...</code>) &mdash; the
      universal distress call, sent as a single unbroken pattern.
    </p>

    <h2>SOS</h2>
    <p>
      SOS is the single most widely recognized Morse sequence. It
      is not an acronym (not &ldquo;Save Our Souls&rdquo; &mdash;
      that is backronymed); it was picked because the pattern
      <code> . . . &mdash; &mdash; &mdash; . . .</code> is short,
      symmetric, unmistakable, and distinct from any accidental
      noise.
    </p>
    <p>
      Adopted as the international maritime distress signal at the
      Berlin Radiotelegraphic Conference in 1906. Replaced by
      automated GMDSS distress signaling in 1999, but SOS is still
      legal, still recognized, and still drilled in survival
      training.
    </p>

    <h2>International vs American Morse</h2>
    <p>
      Samuel Morse&rsquo;s original 1840s code (&ldquo;American
      Morse&rdquo; or &ldquo;Railroad Morse&rdquo;) had different
      patterns from the modern international one, including
      internal gaps within characters (<code>C = .. .</code> with a
      gap). It was used on North American wireline telegraph into
      the 1920s.
    </p>
    <p>
      The <strong>International Morse code</strong> above was
      adopted by conferences in Europe in 1851 and eventually
      everywhere else. It eliminated the within-character gaps,
      simplified radio transmission, and is what &ldquo;Morse code&rdquo;
      means in 2026.
    </p>

    <h2>Sending Morse</h2>
    <p>
      Morse can be sent over any medium with two states:
    </p>
    <p>
      <strong>Sound</strong>: key-down produces a continuous tone
      (typically 700 Hz in amateur radio), key-up is silent.
    </p>
    <p>
      <strong>Light</strong>: flashlight, Aldis lamp (military
      signaling), blinking LED, even car headlights.
    </p>
    <p>
      <strong>Radio</strong>: on-off keying of a continuous wave
      (CW). The original use case and still active on amateur HF
      bands.
    </p>
    <p>
      <strong>Tap</strong>: pipe, wall, cell door. Famous use:
      Admiral Jeremiah Denton blinked T-O-R-T-U-R-E during a 1966
      Vietnam POW interview.
    </p>

    <h2>Speed and the PARIS standard</h2>
    <p>
      Words per minute (WPM) is measured using the 50-unit word
      PARIS as the reference. Typical speeds:
    </p>
    <p>
      <strong>5 WPM</strong>: entry level. Old FCC ham radio
      licensing floor.
    </p>
    <p>
      <strong>13 WPM</strong>: historical FCC General Class
      requirement (dropped in 2007).
    </p>
    <p>
      <strong>20 WPM</strong>: comfortable conversational speed
      among active CW operators.
    </p>
    <p>
      <strong>30&ndash;40 WPM</strong>: contest and DXpedition
      operators.
    </p>
    <p>
      <strong>60+ WPM</strong>: elite. High-Speed Telegraphy world
      championship records exceed 300 characters per minute.
    </p>

    <h2>Farnsworth timing</h2>
    <p>
      Learners hit a plateau at around 10&ndash;12 WPM where they
      can decode individual letters but struggle to assemble them
      into words. The Farnsworth method (1959) keeps the character
      speed fast (20 WPM) but stretches inter-character gaps
      &mdash; so each dit/dah sounds like it will at full speed,
      but the learner has time to recognize. As fluency grows, you
      close the gaps.
    </p>

    <h2>Navigation beacons still use Morse</h2>
    <p>
      Aviation VOR (very-high-frequency omnidirectional range)
      stations and NDBs (non-directional beacons) identify
      themselves by Morse code of their 2- or 3-letter code on top
      of their regular signal. A pilot tunes the frequency and
      listens for, e.g., &ldquo;dash-dot-dash-dot dot-dot dash&rdquo;
      (CIM) to confirm they are receiving the correct station.
    </p>

    <h2>Amateur radio</h2>
    <p>
      Code-mode (CW) contacts are still one of the most active
      portions of the amateur HF spectrum. CW gets through when
      voice does not &mdash; a narrow bandwidth (under 500 Hz)
      means the signal concentrates in less spectrum, so it
      penetrates noise. Worldwide contacts with 5 watts and a wire
      antenna are routine for CW operators.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Wrong dash length.</strong> If your dash is only
      twice the dot instead of three times, experienced listeners
      hear it as &ldquo;slurred&rdquo; and the receiver software
      misdecodes. Practice with a metronome.
    </p>
    <p>
      <strong>Inconsistent inter-letter gaps.</strong> Running
      letters together (<code>....-</code> without a clear gap)
      reads as H followed by T rather than the number 4. A dot in
      Morse can stand alone as E, so gap discipline is everything.
    </p>
    <p>
      <strong>Sending SOS as three letters.</strong> SOS is one
      prosign <code>...---...</code> with no inter-letter gaps.
      Sending S, O, S separately is a procedural error, though
      anyone hearing it would still understand.
    </p>
    <p>
      <strong>Assuming American Morse where International is in
      use.</strong> Outside historical railroad contexts, everyone
      uses International. Lookup tables for C, F, J, L, Q, X, Y, Z
      differ.
    </p>
    <p>
      <strong>Mis-memorizing a few letters permanently.</strong> Q
      (<code>--.-</code>) and Y (<code>-.--</code>) are commonly
      confused. So are H (<code>....</code>) and 5
      (<code>.....</code>). Drill the pairs until the difference is
      automatic.
    </p>
    <p>
      <strong>Expecting the pattern for numbers to be intuitive.</strong>
      The count is off by one:
      <code> 1 = .----</code>, <code>2 = ..---</code>, etc. 0 is
      <code> -----</code>. Memorize; do not guess.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Translate text and Morse back and forth with the{" "}
      <a href="/tools/morse-code-translator">Morse code translator</a>.
      Pair with the{" "}
      <a href="/tools/binary-text-encoder">binary text encoder</a>
      {" "}for layered signaling puzzles that mix dot-dash with
      base-2, and the{" "}
      <a href="/tools/caesar-cipher">Caesar cipher tool</a> when
      you want to combine historical-era encodings with a
      substitution layer.
    </p>
  </>
);
