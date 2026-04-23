import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Classical ciphers &mdash; Caesar, Atbash, Vigen&egrave;re, rail
      fence, Playfair &mdash; are the substitution and transposition
      schemes that carried secrets from Julius Caesar&rsquo;s
      legions through the American Civil War and into World War I.
      By any modern standard they&rsquo;re toys: a Caesar shift
      falls to brute-force in 26 tries, a monoalphabetic substitution
      falls to frequency analysis in an afternoon, and Vigen&egrave;re
      succumbs to the Kasiski examination if the key is short. But
      they&rsquo;re still worth understanding. Classical ciphers
      are how you teach encryption, how puzzle hunts are built, how
      CTF challenges start, and how students first see what
      cryptanalysis looks like. This guide covers the substitution
      principle, the Caesar and ROT13 specifics, frequency analysis,
      the Vigen&egrave;re improvement and its weakness, transposition
      vs substitution, why none of these are secure in 2026, and
      where they still have real educational value.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Substitution vs transposition</h2>
    <p>
      Classical ciphers split into two broad families:
    </p>
    <p>
      <strong>Substitution ciphers</strong> replace each letter with
      another according to a rule. The letters stay in the same
      order; their identity changes. Caesar, Atbash,
      Vigen&egrave;re, and the entire Enigma family are substitution
      ciphers.
    </p>
    <p>
      <strong>Transposition ciphers</strong> rearrange the letters
      without changing them. A rail-fence cipher writes the message
      in a zigzag and reads it off row by row. The letters are all
      still present; their order changes.
    </p>
    <p>
      Modern ciphers (AES, ChaCha20) combine both ideas through
      many rounds of substitution and transposition &mdash; but
      orders of magnitude more complex than any classical design.
    </p>

    <h2>The Caesar cipher</h2>
    <p>
      The simplest substitution: each letter shifts by a fixed
      amount N through the alphabet. Caesar himself reportedly used
      N = 3.
    </p>
    <pre>{`plaintext:  HELLO WORLD
shift 3:    KHOOR ZRUOG
shift 13:   URYYB JBEYQ  (this is ROT13)
shift 25:   GDKKN VNQKC`}</pre>
    <p>
      Decryption shifts the opposite direction, or equivalently by
      <code> 26 - N</code>. Only 25 non-trivial keys exist &mdash;
      brute force is instant.
    </p>
    <p>
      <strong>ROT13</strong> is Caesar with N = 13. Its elegance is
      that shifting twice gets you back:
      <code> ROT13(ROT13(x)) = x</code>. Used for hiding spoilers in
      Usenet and comments, never for security.
    </p>

    <h2>Monoalphabetic substitution</h2>
    <p>
      Generalize Caesar: instead of a shift, define an arbitrary
      permutation of the 26 letters. The keyspace jumps to
      <code> 26! &asymp; 4 &times; 10^26</code>, which sounds like a
      lot but falls trivially to frequency analysis.
    </p>
    <p>
      <strong>Atbash</strong> is a specific monoalphabetic cipher
      where A &harr; Z, B &harr; Y, and so on. Originally Hebrew,
      used in biblical texts. Trivial to decrypt if you recognize
      the pattern.
    </p>

    <h2>Frequency analysis</h2>
    <p>
      English letters appear at predictable rates. E is about
      12.7%, T 9.1%, A 8.2%, and so on down to Z at 0.07%. Given a
      substitution-cipher ciphertext of even a few hundred letters,
      count each character&rsquo;s frequency, match the highest to
      E, the next to T, and iterate.
    </p>
    <p>
      Digraph frequencies help too. <strong>TH</strong> is the most
      common English two-letter sequence;
      <strong> HE</strong>, <strong>IN</strong>, <strong>ER</strong>,
      <strong> AN</strong> follow. Triple-letter patterns
      (<strong>THE</strong>) and common word shapes (a 3-letter
      word at sentence start is often &ldquo;THE&rdquo; or
      &ldquo;AND&rdquo;) finish the job.
    </p>
    <p>
      Arab scholar Al-Kindi described frequency analysis in the 9th
      century, breaking every substitution cipher for the next
      thousand years.
    </p>

    <h2>Vigen&egrave;re &mdash; polyalphabetic improvement</h2>
    <p>
      Vigen&egrave;re (16th century, usually attributed to
      Blaise de Vigen&egrave;re though Bellaso published it first)
      uses a keyword to shift each letter by a different amount,
      cycling through the keyword.
    </p>
    <pre>{`plaintext: ATTACK AT DAWN
key:       LEMONL EM ONLE
ciphertext:LXFOPV EF RNHR`}</pre>
    <p>
      Letter A + L = L, T + E = X, T + M = F, and so on (treating
      A = 0, ..., Z = 25, mod 26). The same plaintext letter
      encrypts to different ciphertext letters depending on position,
      defeating simple frequency analysis.
    </p>
    <p>
      For 300 years Vigen&egrave;re was called <em>le chiffre
      ind&eacute;chiffrable</em> (the indecipherable cipher). Then
      Friedrich Kasiski published a breaking method in 1863.
    </p>

    <h2>The Kasiski examination</h2>
    <p>
      Find repeated sequences in the ciphertext. In Vigen&egrave;re,
      when the same plaintext sequence lines up with the same part
      of the key, it produces the same ciphertext. Measure the
      distance between repetitions &mdash; the key length is likely
      a divisor of that distance.
    </p>
    <p>
      Once the key length is known, split the ciphertext into N
      interleaved streams (every Nth letter), each of which is a
      simple Caesar cipher. Break each with frequency analysis.
    </p>
    <p>
      Modern statistical variants (index of coincidence, Friedman
      test) break Vigen&egrave;re in seconds on any meaningful
      ciphertext with a shortish key.
    </p>

    <h2>The one-time pad</h2>
    <p>
      Extend Vigen&egrave;re: use a key as long as the message,
      generated truly randomly, used exactly once. This is the
      one-time pad (OTP), and it is the only provably unbreakable
      cipher. The catch: the key must be perfectly random, kept
      secret, distributed securely, and never reused. Reusing a
      one-time pad even once collapses the security entirely (see
      the VENONA decrypts).
    </p>
    <p>
      OTPs have seen real use &mdash; diplomatic hotlines, some
      intelligence communications &mdash; but the key-distribution
      problem makes them impractical for general use.
    </p>

    <h2>Transposition ciphers</h2>
    <p>
      <strong>Rail fence</strong>: write the plaintext in a zigzag
      of N rails, read off by rows.
    </p>
    <pre>{`HELLO WORLD with 3 rails:

H . . . O . . . R . .
. E . L . W . R . L .
. . L . . . O . . . D

Read rows: HOR ELWRL LOD -> HORELWRLLOD`}</pre>
    <p>
      <strong>Columnar transposition</strong>: write into a grid of
      fixed width, read off columns in an order set by a keyword.
      Used through WWI. Breakable but laborious by hand.
    </p>

    <h2>Playfair cipher</h2>
    <p>
      Invented in 1854 by Charles Wheatstone, named for Lord
      Playfair who promoted it. Encrypts digraphs using a
      5&times;5 keyword square. Broke the letter-frequency cheat
      because pairs are encrypted, not individual letters.
    </p>
    <p>
      Used by British forces in WWI and into WWII for tactical
      communications, where speed mattered more than long-term
      secrecy. Broken by hand within hours given enough ciphertext.
    </p>

    <h2>Why none of these are secure in 2026</h2>
    <p>
      The common thread: classical ciphers have structure the
      ciphertext preserves (letter frequencies, word shapes,
      repetitions). Modern cryptanalysis exploits any such
      structure. A pure substitution cipher is broken at
      &ldquo;hello world&rdquo; length. A well-built stream cipher
      (ChaCha20, AES-CTR) leaves ciphertext statistically
      indistinguishable from random &mdash; no structure to attack.
    </p>
    <p>
      For real security in 2026, use authenticated encryption:
      AES-GCM or ChaCha20-Poly1305 for symmetric; X25519 +
      AES-GCM for hybrid. Libsodium or your language&rsquo;s
      standard <code>crypto</code> module hands you correct defaults.
    </p>

    <h2>Where classical ciphers still earn their keep</h2>
    <p>
      <strong>Education</strong>: they are the clearest possible
      introduction to the ideas of key, keyspace, keyspace size,
      frequency analysis, and Kerckhoffs&rsquo;s principle. A
      cryptography course without Caesar, Vigen&egrave;re, and
      frequency analysis is missing 200 years of history.
    </p>
    <p>
      <strong>Puzzle and escape-room design</strong>: solvable by
      hand in minutes once recognized, challenging enough to reward
      the insight. Most escape-room &ldquo;codes&rdquo; are
      classical ciphers.
    </p>
    <p>
      <strong>CTF challenges</strong>: crypto categories in
      capture-the-flag competitions frequently start with Caesar,
      then layer in Vigen&egrave;re, XOR-with-repeating-key, and
      weak RSA &mdash; each building on the classical intuition.
    </p>
    <p>
      <strong>Obfuscation, not encryption</strong>: ROT13 still
      appears in spoiler tags, USENET signatures, and some
      extremely lightweight config obfuscation. Don&rsquo;t confuse
      this with security.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Treating any classical cipher as security.</strong>
      Any &ldquo;encryption&rdquo; shipped to production that is
      recognizably classical is broken. Developers occasionally
      ROT13 configuration values thinking it matters; it does not.
    </p>
    <p>
      <strong>Reusing a Vigen&egrave;re key on multiple messages.</strong>
      Makes the Kasiski attack trivial &mdash; the attacker gets more
      ciphertext to analyze against the same key.
    </p>
    <p>
      <strong>Expecting short keys to add security.</strong> A
      Caesar shift of 7 is not meaningfully harder than a shift of
      3 &mdash; brute force costs the same. The only defense is
      keyspace size, and classical keyspaces are small.
    </p>
    <p>
      <strong>Removing spaces and punctuation to &ldquo;strengthen&rdquo;.</strong>
      It helps only a little against frequency analysis and
      complicates hand encryption. Real ciphers do not need the
      crutch.
    </p>
    <p>
      <strong>Mixing case and non-alphabetic characters inconsistently.</strong>
      Pick a convention: strip to A&ndash;Z uppercase, or preserve
      case and pass through punctuation. Halfway implementations
      produce decryption bugs.
    </p>
    <p>
      <strong>Claiming custom classical variants are novel.</strong>
      Reversing the alphabet then applying Caesar then XORing with a
      nursery rhyme is still classical and still broken. Any new
      cipher must survive professional cryptanalysis, which your
      variant has not.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Encrypt and decrypt shifts instantly with the{" "}
      <a href="/tools/caesar-cipher">Caesar cipher tool</a>. Pair
      with the{" "}
      <a href="/tools/morse-code-translator">Morse code translator</a>
      {" "}for layered historical-signaling puzzles, and the{" "}
      <a href="/tools/binary-text-encoder">binary text encoder</a>
      {" "}when exercises combine ciphers with base conversions.
    </p>
  </>
);
