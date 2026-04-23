import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      UUIDs (Universally Unique Identifiers) are the most popular way
      to generate IDs without coordination. 128 bits, effectively
      guaranteed unique, no central authority needed. But
      &ldquo;UUID&rdquo; is not one thing — there are seven specified
      versions (v1 through v8) with very different properties. Picking
      the wrong one can tank database performance, leak timing
      information, or create predictable IDs in security-sensitive
      contexts. This guide covers what each version is for, which to
      use by default in 2026, the v4 vs. v7 debate for databases,
      and when UUIDs are the wrong choice entirely.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The UUID format</h2>
    <p>
      A UUID is 128 bits, typically rendered as 32 hex digits separated
      by hyphens: <code>550e8400-e29b-41d4-a716-446655440000</code>.
    </p>
    <p>
      The version is encoded in the first digit of the third group
      (here, &ldquo;4&rdquo;). The variant is in the first digit of
      the fourth group (here, &ldquo;a&rdquo; → RFC variant).
    </p>
    <p>
      128 bits gives ~3.4×10^38 unique values. Collisions are
      effectively impossible for any practical purpose.
    </p>

    <h2>Version 4 — random (the default for years)</h2>
    <p>
      v4 UUIDs are 122 bits of random data + 6 fixed bits for
      version/variant. No information leakage, no timing, no MAC
      address. Just randomness.
    </p>
    <p>
      <strong>Pros:</strong> universally supported, no metadata leaks,
      works everywhere, simple to generate.
    </p>
    <p>
      <strong>Cons:</strong> not sortable. Inserted randomly into
      B-tree indexes, causes page splits and poor cache locality in
      databases. Random UUIDs as primary keys can cut database write
      throughput 3-10× compared to sequential IDs.
    </p>
    <p>
      <strong>Use when:</strong> the ID is primarily a reference (not
      a hot index), or you need zero metadata leakage (security
      tokens, public-facing identifiers, event IDs).
    </p>

    <h2>Version 1 — MAC + timestamp</h2>
    <p>
      v1 encodes a 60-bit timestamp + 14-bit clock sequence + 48-bit
      node ID (often the MAC address of the generating machine).
    </p>
    <p>
      <strong>Pros:</strong> partially sortable by time; guarantees
      uniqueness if the MAC is unique.
    </p>
    <p>
      <strong>Cons:</strong> leaks machine MAC and generation time.
      Predictable. Old MAC-exposing implementations have been used to
      identify document authors after the fact.
    </p>
    <p>
      <strong>Use when:</strong> almost never in 2026. v7 solved its
      legitimate use cases without the leakage. v1 remains in legacy
      systems.
    </p>

    <h2>Version 3 and 5 — namespace-based (deterministic)</h2>
    <p>
      v3 and v5 hash a name within a namespace (using MD5 or SHA-1).
      Same inputs always produce the same UUID.
    </p>
    <p>
      <strong>Use when:</strong> deterministic ID generation —
      deduplicating records, generating consistent IDs from external
      keys (URLs, email addresses) across systems. Prefer v5 (SHA-1)
      over v3 (MD5) for collision resistance.
    </p>
    <p>
      <strong>Warning:</strong> not random. An attacker who knows the
      namespace and can guess the name can compute the UUID.
    </p>

    <h2>Version 7 — time-ordered random (the new default for databases)</h2>
    <p>
      v7 was standardized in RFC 9562 (2024). First 48 bits are a
      Unix-millisecond timestamp; remaining 74 bits are random.
    </p>
    <p>
      <strong>Pros:</strong> lexicographically sortable (newer UUIDs
      sort after older ones). Sequential enough to fit nicely into
      B-tree indexes, dramatically better database write performance
      than v4 while retaining most of v4&rsquo;s randomness.
    </p>
    <p>
      <strong>Cons:</strong> leaks generation time (millisecond
      precision). If that matters for your security model, use v4.
    </p>
    <p>
      <strong>Use when:</strong> primary key in a database, high-
      cardinality index, event IDs where time-ordering helps. In most
      cases, v7 is the best default for new systems in 2026.
    </p>

    <h2>Version 6 — reordered v1</h2>
    <p>
      v6 is v1 with timestamp bits reordered so sorting works
      lexicographically. Rarely used; v7 superseded it in practice.
    </p>

    <h2>Version 8 — custom</h2>
    <p>
      v8 is the &ldquo;do what you want&rdquo; version for custom
      ID schemes that still want the UUID format. Useful when you
      need to embed specific data (tenant IDs, shard keys) while
      remaining UUID-compatible.
    </p>

    <h2>The v4 vs. v7 database decision</h2>
    <p>
      <strong>Old advice:</strong> &ldquo;UUIDs destroy B-tree
      indexes; use auto-increment integers.&rdquo; True for v4.
    </p>
    <p>
      <strong>New advice:</strong> v7 bridges the gap. Benchmarks on
      PostgreSQL show v7 UUID inserts 2-5× faster than v4, and
      comparable to sequential bigint for index-locality.
    </p>
    <p>
      <strong>Still choose bigint when:</strong> primary key is
      internal only, storage efficiency matters (8 bytes vs 16), you
      don&rsquo;t need distributed generation.
    </p>
    <p>
      <strong>Choose UUID (v7) when:</strong> IDs need to be
      generated without coordination (microservices, offline clients,
      pre-generation for bulk imports), IDs are exposed externally
      (URLs, APIs), merging data across systems.
    </p>

    <h2>Performance gotchas to understand</h2>
    <p>
      <strong>Storage:</strong> UUID is 16 bytes; bigint is 8. Across
      hundreds of foreign-key columns in a large schema, this matters
      (more RAM for indexes, more IO).
    </p>
    <p>
      <strong>Text storage:</strong> storing UUIDs as strings
      (VARCHAR(36)) is 2-3× the storage and slower comparisons.
      Always use a native UUID type (Postgres, SQL Server), BINARY(16)
      (MySQL), or at minimum CHAR(36).
    </p>
    <p>
      <strong>Index order:</strong> v4 inserts scatter randomly
      across the index, causing buffer pool churn. v7 and sequential
      bigints insert at the end.
    </p>

    <h2>When UUIDs are the wrong answer</h2>
    <p>
      <strong>Human-readable IDs:</strong> order numbers, invoice
      numbers, tickets. Customers can&rsquo;t reliably read a UUID
      over the phone. Use short IDs (NanoID, ShortID) or custom
      sequences.
    </p>
    <p>
      <strong>Short URLs:</strong> bit.ly-style redirects. UUIDs
      aren&rsquo;t short. Use base62 encoding of sequential IDs, or
      NanoID (22 characters, URL-safe).
    </p>
    <p>
      <strong>Security tokens:</strong> UUIDs are not cryptographically
      strong in all versions. Use a proper CSPRNG (crypto.randomBytes
      in Node, secrets in Python) for tokens. v4 is random enough in
      many cases but use explicit crypto libraries for auth tokens.
    </p>

    <h2>Alternatives to UUID</h2>
    <p>
      <strong>ULID</strong> (Universally Unique Lexicographically
      Sortable Identifier): 128 bits, timestamp + random, Crockford
      base32 encoded (26 chars). Case-insensitive, no special chars,
      URL-safe. Essentially v7 UUIDs with a nicer encoding. Slight
      decline in adoption since v7 became standard.
    </p>
    <p>
      <strong>NanoID:</strong> shorter than UUID (22 chars by default),
      customizable alphabet. Good for URLs.
    </p>
    <p>
      <strong>KSUID:</strong> segments-style timestamp + random,
      27 chars. Sortable. Popular in some Go ecosystems.
    </p>
    <p>
      <strong>Snowflake-style IDs:</strong> 64-bit time + machine +
      sequence. Twitter&rsquo;s original design; now used by
      Discord, Instagram, etc. Tight, sortable, machine-coordinated.
      Fit bigint columns.
    </p>

    <h2>Generation best practices</h2>
    <p>
      <strong>Use a battle-tested library</strong>, not hand-rolled
      randomness. Node: crypto.randomUUID() (v4) or uuid package
      (v7+). Python: uuid module. Rust: uuid crate. Java:
      java.util.UUID.
    </p>
    <p>
      <strong>Generate at the source.</strong> Let clients, mobile
      apps, or services generate IDs for their own entities before
      inserting. Avoids the &ldquo;wait for database to return
      auto-increment ID&rdquo; round-trip.
    </p>
    <p>
      <strong>Store in native type.</strong> UUID column in Postgres/
      SQL Server, BINARY(16) in MySQL. Avoid VARCHAR.
    </p>
    <p>
      <strong>Don&rsquo;t expose v1 UUIDs.</strong> If you generated
      v1 UUIDs historically, consider them low-entropy. Regenerate
      security-sensitive ones.
    </p>

    <h2>Quick decision tree</h2>
    <p>
      Need a primary key in a database? → v7.
    </p>
    <p>
      Need a public-facing ID with zero metadata leakage? → v4.
    </p>
    <p>
      Need deterministic ID from some source data (URL, email)? → v5.
    </p>
    <p>
      Need a short user-facing ID? → NanoID, not a UUID.
    </p>
    <p>
      Need a security token? → crypto.randomBytes, not a UUID.
    </p>
    <p>
      Purely internal with zero distributed-generation need? →
      bigint auto-increment is fine.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate UUIDs (v4 random or v1 timestamp) with the{" "}
      <a href="/tools/uuid-generator">UUID generator</a>. Pair with
      the{" "}
      <a href="/tools/password-generator">password generator</a> when
      you need cryptographically strong secrets instead of UUIDs, and
      the{" "}
      <a href="/tools/hash-generator">hash generator</a> for v5-style
      deterministic ID computation from namespace and name.
    </p>
  </>
);
