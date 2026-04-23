import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A cryptographic hash function takes any input and produces a
      fixed-length fingerprint that is (in theory) one-way:
      infeasible to invert, infeasible to find two inputs that
      collide. The &ldquo;in theory&rdquo; is doing a lot of work,
      because two of the hash functions still widely deployed &mdash;
      MD5 and SHA-1 &mdash; have had practical collisions published
      (MD5 in 2004, SHA-1 in 2017 by Google&rsquo;s SHAttered
      attack). Using them for integrity or identity today is a
      known vulnerability. On top of that, hash functions are the
      wrong tool for passwords entirely &mdash; you want a
      deliberately slow password-hashing function like Argon2 or
      bcrypt. This guide covers which hashes are broken, which are
      current (SHA-256, SHA-3, BLAKE3), how collision and preimage
      resistance differ, the password-hashing family and why it is
      separate, salting and peppering, and the specific choice you
      should make in 2026.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What a hash function guarantees</h2>
    <p>
      A cryptographic hash function <code>H</code> maps an input of
      any length to a fixed-size output. The three security
      properties:
    </p>
    <p>
      <strong>Preimage resistance</strong>: given
      <code> H(x)</code>, infeasible to find <code>x</code>.
    </p>
    <p>
      <strong>Second-preimage resistance</strong>: given
      <code> x</code>, infeasible to find a different
      <code> x&rsquo;</code> with <code>H(x&rsquo;) = H(x)</code>.
    </p>
    <p>
      <strong>Collision resistance</strong>: infeasible to find any
      pair <code>x, x&rsquo;</code> with
      <code> H(x) = H(x&rsquo;)</code>.
    </p>
    <p>
      Collision resistance is the hardest to maintain; it fails
      first when a hash weakens.
    </p>

    <h2>MD5 &mdash; broken; do not use</h2>
    <p>
      MD5 produces a 128-bit output. Collision attacks have been
      practical since 2004; in 2008 researchers forged a legitimate
      CA certificate using MD5 collisions. Modern GPUs can produce
      MD5 collisions in minutes.
    </p>
    <p>
      Still acceptable for non-security uses: file chunking,
      cache-busting, non-cryptographic checksums where an attacker
      is not in the threat model. Never acceptable for digital
      signatures, certificates, integrity verification, or password
      hashing.
    </p>

    <h2>SHA-1 &mdash; broken for collisions</h2>
    <p>
      SHA-1 produces 160 bits. Theoretical attacks since 2005;
      Google&rsquo;s SHAttered paper (2017) published a real
      collision, and follow-up work (Shambles, 2020) made chosen-prefix
      collisions practical at a cost of about $45,000 in GPU time.
    </p>
    <p>
      Browsers stopped accepting SHA-1 certificates in 2017. Git
      still uses SHA-1 for object IDs; Linus has acknowledged the
      risk and the Git project is working toward SHA-256. Avoid
      SHA-1 for any new security-relevant use.
    </p>

    <h2>SHA-2 family &mdash; current standard</h2>
    <p>
      SHA-2 is a family: <strong>SHA-224, SHA-256, SHA-384,
      SHA-512</strong>, plus the truncated variants SHA-512/224 and
      SHA-512/256. Output in bits matches the number in the name.
    </p>
    <p>
      <strong>SHA-256</strong> is the default choice for most
      general-purpose hashing in 2026: file integrity, TLS
      certificates, Bitcoin addresses, content-addressed storage.
      No practical attacks.
    </p>
    <p>
      <strong>SHA-512</strong> is faster than SHA-256 on 64-bit CPUs
      and gives a larger output for use cases (HKDF, long-term
      archival) where the extra margin matters.
    </p>
    <pre>{`import crypto from 'crypto';
const digest = crypto.createHash('sha256')
  .update('hello world')
  .digest('hex');
// b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9`}</pre>

    <h2>SHA-3 &mdash; different internal design</h2>
    <p>
      SHA-3 was standardized in 2015 (FIPS 202) as a structurally
      different alternative to SHA-2. It uses the Keccak sponge
      construction where SHA-2 uses Merkle&ndash;Damg&aring;rd. Output
      sizes are the same: SHA3-224, SHA3-256, SHA3-384, SHA3-512.
    </p>
    <p>
      Both SHA-2 and SHA-3 are secure in 2026. Use SHA-3 if you need
      diversification (don&rsquo;t want all your security keyed on
      one construction surviving), or need the variable-output
      SHAKE128/SHAKE256. Otherwise SHA-2 has better hardware support
      and is slightly faster on most CPUs.
    </p>

    <h2>BLAKE2 and BLAKE3 &mdash; fast and modern</h2>
    <p>
      <strong>BLAKE2</strong> (2012) is as secure as SHA-3 but much
      faster &mdash; often faster than MD5 on modern CPUs. Used by
      WireGuard, Argon2, and many content-addressed systems.
    </p>
    <p>
      <strong>BLAKE3</strong> (2020) goes further: it is
      parallelizable, incremental, and extendable-output. 10&ndash;20x
      faster than SHA-256 on typical hardware. No practical attacks.
      Adopted by Zcash, IPFS (alongside SHA-256), and content-addressed
      build tools.
    </p>
    <p>
      For internal systems where you control both ends, BLAKE3 is a
      strong default. For interoperability with standards, pick
      SHA-256.
    </p>

    <h2>Passwords are different &mdash; use a KDF</h2>
    <p>
      Password hashing has opposite goals from file hashing. You
      want the function to be <strong>slow</strong> and
      memory-intensive, to resist the GPU clusters a stolen database
      will face.
    </p>
    <p>
      <strong>Argon2id</strong> (winner of the 2015 Password Hashing
      Competition, standardized in RFC 9106) is the current
      recommendation from OWASP. Configure with
      <code> t=3</code> iterations, <code>m=12288</code> KiB memory,
      <code> p=1</code> parallelism as a 2026 starting point.
    </p>
    <p>
      <strong>scrypt</strong> (2009) is also memory-hard and well
      analyzed. Defaults of <code>N=131072, r=8, p=1</code> are a
      good starting point.
    </p>
    <p>
      <strong>bcrypt</strong> (1999) is older but still acceptable,
      especially when Argon2 is not available. Use a work factor
      of 12 or higher in 2026; 10 was fine in 2015, now too fast on
      modern GPUs. Note bcrypt truncates inputs at 72 bytes.
    </p>
    <p>
      <strong>PBKDF2-HMAC-SHA256</strong> with at least 600,000
      iterations (OWASP 2023 guidance) is acceptable in regulated
      environments that require FIPS-approved primitives, but it is
      not memory-hard and loses to GPU attacks faster than the
      alternatives.
    </p>

    <h2>Salting</h2>
    <p>
      A salt is a unique random value added to the password before
      hashing. Defeats rainbow tables and ensures two users with the
      same password get different hashes.
    </p>
    <p>
      Minimum salt length: 16 bytes of cryptographically random
      data. Generate per user, store alongside the hash. Argon2,
      bcrypt, and scrypt store the salt embedded in their output
      string &mdash; you do not need to manage it separately.
    </p>

    <h2>Peppering &mdash; optional additional layer</h2>
    <p>
      A pepper is a secret value, the same for every user, mixed in
      before hashing. Kept in application config, not in the
      database. If the database is stolen alone, the attacker still
      needs the pepper to brute-force.
    </p>
    <p>
      Peppering does not substitute for slow hashing, but layers on
      top of it. Biggest gotcha: rotating the pepper invalidates
      every password hash. Use a versioned scheme:
      <code> pepper_v2_value</code> and store the version alongside
      the hash.
    </p>

    <h2>HMAC and keyed hashing</h2>
    <p>
      A plain hash cannot authenticate &mdash; anyone can produce
      <code> H(message)</code> since H is public. HMAC
      (<code>HMAC(key, message)</code>) fixes this. Used for API
      request signing, JWT HS256 tokens, and cookie integrity.
    </p>
    <p>
      Most modern libraries expose <code>hmac(key, message,
      &apos;sha256&apos;)</code>. Both the message and key must be
      present on the verifying side. Use constant-time comparison
      when checking an HMAC (<code>crypto.timingSafeEqual</code> in
      Node) to avoid timing leaks.
    </p>

    <h2>Hash length and output representation</h2>
    <p>
      SHA-256 produces 32 bytes. Typical representations:
    </p>
    <p>
      <strong>Hex</strong>: 64 characters. Human-readable.
    </p>
    <p>
      <strong>Base64</strong>: 44 characters with padding, 43
      without. More compact.
    </p>
    <p>
      <strong>Base32</strong>: 56 characters. Case-insensitive;
      used in URLs.
    </p>
    <p>
      Truncating a secure hash for ID purposes is safe down to
      about 128 bits (32 hex chars) for collision resistance given
      birthday-bound attacks. Never truncate below that for
      security-sensitive IDs.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Hashing passwords with SHA-256.</strong> Any fast
      hash is a mistake for passwords. A commodity GPU computes
      billions of SHA-256 per second &mdash; an 8-character password
      falls in hours. Use Argon2id, scrypt, or bcrypt.
    </p>
    <p>
      <strong>Missing salt.</strong> Identical passwords get
      identical hashes, rainbow tables work, single breach exposes
      whole columns of users. Always salt.
    </p>
    <p>
      <strong>Reusing a salt across users.</strong> A shared salt is
      equivalent to no salt &mdash; rainbow tables can be rebuilt
      once against it. Fresh per-user.
    </p>
    <p>
      <strong>Using MD5 for integrity.</strong> &ldquo;It is just a
      checksum.&rdquo; Not if an attacker can influence the file.
      Use SHA-256 or BLAKE3 for any integrity check that matters.
    </p>
    <p>
      <strong>Comparing hashes with <code>==</code>.</strong>
      String equality leaks timing information &mdash; attackers can
      binary-search the match position. Use constant-time compare.
    </p>
    <p>
      <strong>Treating hashes as encryption.</strong> Hashes are
      one-way. There is no &ldquo;decrypting&rdquo; a hash. If you
      need to recover the original data, you need encryption (AES,
      ChaCha20), not hashing.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate digests across MD5, SHA-1, SHA-256, SHA-512, and
      more with the{" "}
      <a href="/tools/hash-generator">hash generator</a>. Pair with
      the{" "}
      <a href="/tools/password-generator">password generator</a>
      {" "}for the inputs those hashes will protect, and the{" "}
      <a href="/tools/uuid-generator">UUID generator</a> when you
      need unique non-sensitive IDs where a hash would be overkill.
    </p>
  </>
);
