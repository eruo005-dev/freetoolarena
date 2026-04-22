import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Password storage is one of the easiest things to get wrong and one of the most
      catastrophic when you do. Every year a major company leaks a database full of
      either plaintext or badly-hashed passwords, and every year developers keep making
      the same mistakes: MD5, SHA-256 without a salt, homemade obfuscation. This guide
      covers what a hash actually is, why the fast ones are wrong for passwords, and
      what to use instead.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Hash vs encryption</h2>
    <p>
      A <strong>hash</strong> is one-way. You can compute it from the input but you
      cannot reverse it. Given the hash, the only way to find the input is to guess
      inputs and check whether their hashes match.
    </p>
    <p>
      <strong>Encryption</strong> is reversible — there&rsquo;s a key, and with the key
      you can get the original back. Encryption is the wrong tool for password storage,
      because if an attacker gets the database they&rsquo;ll probably get the key too,
      and then all the passwords are plaintext. Hashing removes the key from the
      equation entirely.
    </p>

    <h2>Why plaintext is the worst mistake</h2>
    <p>
      Storing passwords as-is means any database leak is game over. Not just for your
      site — password reuse is universal, so your leaked plaintext hands attackers the
      credentials for your users&rsquo; email, bank, and everything else. Users can run
      their email through <a href="/tools/password-breach-checker">a breach checker</a>
      and see what spilled, but by then the damage is done. Never, ever store
      plaintext.
    </p>

    <h2>Why plain SHA-256 is also wrong</h2>
    <p>
      SHA-256 is a fast, secure cryptographic hash. That&rsquo;s great for file
      integrity checks and bad for passwords. A modern GPU can compute roughly ten
      billion SHA-256 hashes per second. An attacker with a leaked database and a
      $2,000 GPU can try every 8-character password in a weekend.
    </p>
    <p>
      The speed that makes SHA-256 great for checksums makes it terrible for password
      storage. You want the opposite: a hash that&rsquo;s <em>deliberately slow</em> so
      that even with a stolen database, brute-forcing it is economically unviable.
    </p>

    <h2>What bcrypt, Argon2, and scrypt add</h2>
    <p>
      These are password-specific hashing functions designed to be slow and
      memory-hungry on purpose. bcrypt has been the default for 20 years and is still
      fine. Argon2 won the Password Hashing Competition in 2015 and is the current
      recommendation for new projects. scrypt sits between them.
    </p>
    <p>
      All three let you tune a <strong>work factor</strong> — how much CPU and memory
      a single hash costs. The number is set so that <em>your</em> login endpoint takes
      ~100-250ms (acceptable for users) but an attacker trying to brute-force a stolen
      database is doing ~5 hashes per second per core instead of billions. That gap is
      the whole point.
    </p>

    <h2>Salt: unique per user</h2>
    <p>
      A <strong>salt</strong> is a random value, unique per user, stored next to the
      hash. When you hash the password you hash <code>password + salt</code>. The
      purpose: without a salt, two users with the same password produce the same hash,
      and an attacker can pre-compute hashes for common passwords (rainbow tables) and
      match millions at once. With a unique salt per user, the attacker has to attack
      each user individually — a massive slowdown.
    </p>
    <p>
      Modern libraries generate and store the salt for you — you don&rsquo;t pick it,
      you don&rsquo;t manage it. bcrypt embeds the salt inside the stored hash string.
      If you&rsquo;re manually managing salts, you&rsquo;re using the wrong library.
    </p>

    <h2>Pepper: one global secret</h2>
    <p>
      A <strong>pepper</strong> is an application-wide secret added to the hash input,
      stored outside the database (in an env var, secret manager, or HSM). The idea:
      if an attacker steals the database but not the secret store, they can&rsquo;t
      brute-force even weak passwords because they&rsquo;re missing the pepper. Optional
      but cheap defense-in-depth.
    </p>

    <h2>The rule: don&rsquo;t roll your own</h2>
    <p>
      For authentication, use the well-audited library your platform ships. Node:
      <code>bcrypt</code> or <code>argon2</code>. Python: <code>passlib</code> or
      <code>argon2-cffi</code>. Go: <code>golang.org/x/crypto/bcrypt</code>. Ruby/Rails:
      <code>bcrypt</code> via <code>has_secure_password</code>. They handle salt
      generation, work factor tuning, and timing-safe comparison. If you&rsquo;re
      writing the hash code yourself, you&rsquo;re almost certainly introducing a bug.
    </p>

    <h2>General-purpose hashing is different</h2>
    <p>
      For file integrity, checksums, content-addressed storage, or deduplication,
      SHA-256 is exactly right. It&rsquo;s fast, collision-resistant, and standardized.
      Generate one with <a href="/tools/hash-generator">our hash generator</a>. The
      &ldquo;deliberately slow&rdquo; rule is password-specific — you don&rsquo;t want
      your git commit hashes to take 200ms each. Use the right hash for the job:
      Argon2 or bcrypt for passwords, SHA-256 for everything else.
    </p>
  </>
);
