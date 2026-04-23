import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Relational rows and JSON documents model data differently. SQL
      is tabular, normalized, foreign-keyed. JSON is hierarchical,
      denormalized, embedded. Converting between them involves more
      than column-to-key mapping: you choose whether to flatten,
      nest, or embed relations; how to handle NULL vs missing keys;
      how to represent dates, decimals, and blobs; and when to use
      SQL&rsquo;s own JSON functions vs a post-query transform. This
      guide covers the row-to-object mapping, nested shapes via joins
      or aggregation, NULL semantics, type fidelity, modern SQL JSON
      functions (Postgres, MySQL, SQLite), and performance/streaming
      tradeoffs.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The basic row-to-object mapping</h2>
    <p>
      A table row becomes a JSON object; a result set becomes an
      array of objects:
    </p>
    <pre>
{`-- SQL
SELECT id, name, email FROM users LIMIT 2;

-- JSON
[
  { "id": 1, "name": "Alice", "email": "a@x.com" },
  { "id": 2, "name": "Bob", "email": "b@x.com" }
]`}
    </pre>
    <p>
      Column names become keys. Column values become typed JSON
      scalars. Easy for flat tables.
    </p>

    <h2>NULL vs missing keys</h2>
    <p>
      SQL <code>NULL</code> has two reasonable JSON representations:
    </p>
    <p>
      <strong>Include as <code>null</code>:</strong>{" "}
      <code>&#123;&ldquo;email&rdquo;: null&#125;</code>. Preserves the
      column&rsquo;s existence. Default in most converters.
    </p>
    <p>
      <strong>Omit the key:</strong>{" "}
      <code>&#123;&#125;</code>. Smaller payload; may confuse
      consumers expecting the key.
    </p>
    <p>
      <strong>Pick one per API:</strong> mixing is the worst outcome.
      If your consumers use Zod / JSON Schema with required vs
      optional fields, explicit <code>null</code> is clearer.
    </p>

    <h2>Type fidelity</h2>
    <p>
      SQL has types JSON doesn&rsquo;t:
    </p>
    <p>
      <strong>DECIMAL / NUMERIC:</strong> exact-precision. JSON
      numbers are 64-bit doubles. For money, output as string (
      <code>&ldquo;amount&rdquo;: &ldquo;19.99&rdquo;</code>) and
      parse server-side with a decimal library.
    </p>
    <p>
      <strong>BIGINT:</strong> JavaScript Number loses precision past
      2^53. Output as string for IDs over that threshold.
    </p>
    <p>
      <strong>DATE / TIMESTAMP:</strong> JSON has no date type.
      Convention: ISO 8601 strings (
      <code>&ldquo;2026-04-23T12:00:00Z&rdquo;</code>). UTC is
      strongly preferred to avoid timezone ambiguity.
    </p>
    <p>
      <strong>BYTEA / BLOB:</strong> base64-encode. Don&rsquo;t try
      to stuff binary into JSON strings directly — characters above
      U+10FFFF or invalid UTF-8 will break parsers.
    </p>
    <p>
      <strong>UUID:</strong> string. Preserve hyphens for
      readability.
    </p>
    <p>
      <strong>BOOLEAN:</strong> maps directly. MySQL stores as TINYINT
      (0/1) — coerce in your query or driver.
    </p>

    <h2>Joins — flat vs nested</h2>
    <p>
      A join returns a flat row. JSON often wants nested:
    </p>
    <pre>
{`-- SQL
SELECT u.id, u.name, p.title AS post_title
FROM users u JOIN posts p ON p.user_id = u.id;

-- Flat JSON (same shape as SQL result)
[
  { "id": 1, "name": "Alice", "post_title": "Hello" },
  { "id": 1, "name": "Alice", "post_title": "Second" }
]

-- Nested (typical API shape)
[
  {
    "id": 1,
    "name": "Alice",
    "posts": [
      { "title": "Hello" },
      { "title": "Second" }
    ]
  }
]`}
    </pre>
    <p>
      Flat is fine for rows that will render as a table. Nested is
      what APIs usually want. To produce nested, either:
    </p>
    <p>
      <strong>Post-query group:</strong> run the flat query, group by
      parent key in application code. Easy but ships duplicated
      parent columns over the wire.
    </p>
    <p>
      <strong>SQL aggregation:</strong> use the database&rsquo;s
      JSON aggregate functions (shown next). Fewer bytes, fewer
      round-trips.
    </p>

    <h2>Postgres — json_agg, row_to_json, jsonb_build_object</h2>
    <p>
      Postgres has excellent JSON support:
    </p>
    <pre>
{`SELECT jsonb_build_object(
  'id', u.id,
  'name', u.name,
  'posts', (
    SELECT jsonb_agg(jsonb_build_object('title', p.title))
    FROM posts p WHERE p.user_id = u.id
  )
) FROM users u;`}
    </pre>
    <p>
      Result is a column of JSONB documents, one per user, with an
      embedded posts array. Concatenate with{" "}
      <code>jsonb_agg(...)</code> at the outer level if you want a
      single JSON array of all users.
    </p>
    <p>
      <strong>Use JSONB (binary)</strong> for anything non-trivial.
      It preserves types better and is indexable.
    </p>

    <h2>MySQL 5.7+ / MariaDB — JSON_OBJECT, JSON_ARRAYAGG</h2>
    <pre>
{`SELECT JSON_OBJECT(
  'id', u.id,
  'name', u.name,
  'posts', (
    SELECT JSON_ARRAYAGG(JSON_OBJECT('title', p.title))
    FROM posts p WHERE p.user_id = u.id
  )
) FROM users u;`}
    </pre>
    <p>
      Same shape as Postgres. MySQL 8+ is the sweet spot — 5.7 JSON
      functions exist but are slower and have more quirks.
    </p>

    <h2>SQLite 3.38+ — json_object, json_group_array</h2>
    <pre>
{`SELECT json_object(
  'id', u.id,
  'name', u.name,
  'posts', (
    SELECT json_group_array(json_object('title', p.title))
    FROM posts p WHERE p.user_id = u.id
  )
) FROM users u;`}
    </pre>
    <p>
      SQLite&rsquo;s functions are a bit newer but fully functional.
      Perfect for local tools and embedded apps.
    </p>

    <h2>SQL Server — FOR JSON</h2>
    <pre>
{`SELECT u.id, u.name,
  (SELECT p.title FROM posts p WHERE p.user_id = u.id FOR JSON PATH) AS posts
FROM users u
FOR JSON PATH, ROOT('users');`}
    </pre>
    <p>
      <code>FOR JSON PATH</code> is SQL Server&rsquo;s idiom. Supports
      nested paths via dot notation in column aliases (
      <code>posts.title</code>).
    </p>

    <h2>Streaming large result sets</h2>
    <p>
      Building JSON in memory fails at scale. For a 10M-row dump:
    </p>
    <p>
      <strong>NDJSON / JSON Lines:</strong> one JSON object per line,
      no wrapping array. Streamable end-to-end — write a row, read a
      row. Industry standard for data pipelines.
    </p>
    <p>
      <strong>Cursor + streaming serializer:</strong> use a database
      cursor (Postgres <code>DECLARE CURSOR</code>, MySQL unbuffered
      result) and a streaming JSON writer (jq, streamjson in Node).
      Emits an array but never holds it all in memory.
    </p>
    <p>
      <strong>Avoid:</strong> loading the entire result set, then
      serializing. Hits memory limits fast.
    </p>

    <h2>Quoting and escaping</h2>
    <p>
      If you handroll SQL-to-JSON in application code, make sure the
      serializer handles:
    </p>
    <p>
      Quotes, backslashes, control characters in string columns (
      <code>&quot;</code>, <code>\\</code>, <code>\\n</code>,{" "}
      <code>\\u0000</code>).
    </p>
    <p>
      UTF-8 validity — Postgres happily stores invalid UTF-8 with
      <code>bytea_output=escape</code>; your serializer won&rsquo;t
      like it.
    </p>
    <p>
      Don&rsquo;t build JSON with string concatenation. Use your
      language&rsquo;s JSON library or the DB&rsquo;s JSON functions.
    </p>

    <h2>Schema evolution</h2>
    <p>
      JSON outputs are part of your API contract. Adding columns is
      safe (extra keys don&rsquo;t break well-written consumers).
      Renaming and dropping aren&rsquo;t safe — version the output
      or add a compatibility layer.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Returning DECIMAL as JSON number.</strong> Silent
      precision loss on money. Strings only.
    </p>
    <p>
      <strong>TIMESTAMPs without timezones.</strong>{" "}
      <code>&ldquo;2026-04-23 12:00&rdquo;</code> without a Z or
      offset means nothing to the consumer.
    </p>
    <p>
      <strong>Cartesian-join flattening.</strong> JOINing users ×
      posts without deduping users duplicates the user row per post.
      Use aggregation for nested output.
    </p>
    <p>
      <strong>BIGINTs as JSON numbers.</strong> Silently truncated in
      JS consumers. String-encode.
    </p>
    <p>
      <strong>Mixing null and missing-key conventions.</strong>{" "}
      Consumers can&rsquo;t tell a &ldquo;not set&rdquo; from a
      &ldquo;not known&rdquo;.
    </p>
    <p>
      <strong>Building JSON with string concatenation.</strong>
      {" "}Escaping bugs waiting to happen.
    </p>
    <p>
      <strong>Serializing huge result sets in memory.</strong> Use
      NDJSON and streaming.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert SQL table data to JSON with the{" "}
      <a href="/tools/sql-to-json">SQL to JSON converter</a>.
      Pair with the{" "}
      <a href="/tools/json-formatter">JSON formatter</a> to validate
      output, and the{" "}
      <a href="/tools/sql-formatter">SQL formatter</a> to keep the
      source queries readable.
    </p>
  </>
);
