import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Hand-writing TypeScript interfaces for API responses is tedious
      and error-prone. Generating them from sample JSON (or a JSON
      Schema, OpenAPI spec, or protobuf) is faster, more accurate,
      and stays in sync with the data. But generators make choices —
      optional vs required, union vs enum, narrow vs loose types —
      that affect how pleasant the generated types are to use. This
      guide covers the generators worth knowing, the tradeoffs in
      their inference, when to run-time validate in addition to
      compile-time check, and the patterns for keeping generated
      types fresh as APIs evolve.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What a generator does</h2>
    <p>
      Given sample JSON:
    </p>
    <pre>
{`{
  "id": 42,
  "name": "Alice",
  "active": true,
  "tags": ["admin", "staff"]
}`}
    </pre>
    <p>
      A generator produces:
    </p>
    <pre>
{`interface User {
  id: number;
  name: string;
  active: boolean;
  tags: string[];
}`}
    </pre>
    <p>
      Straightforward for flat data. Complications start with nested
      objects, mixed arrays, optional fields, and null handling.
    </p>

    <h2>Inference decisions you&rsquo;ll hit</h2>
    <p>
      <strong>Optional vs required:</strong> does the generator
      assume all fields in the sample are required? Or only mark
      required keys (if multiple samples are provided)? You usually
      want to treat single-sample inference as a best-effort.
    </p>
    <p>
      <strong>Nullable fields:</strong> if a sample has{" "}
      <code>&quot;email&quot;: null</code>, is it{" "}
      <code>email: null</code>, <code>email?: string</code>, or{" "}
      <code>email: string | null</code>? Depends on the generator.
    </p>
    <p>
      <strong>Number vs literal:</strong>{" "}
      <code>{`"status": 1`}</code> — is it <code>status: number</code>
      {" "}or <code>status: 1</code>? Literal types are more precise
      but brittle if the API returns other numbers.
    </p>
    <p>
      <strong>Array item union:</strong>{" "}
      <code>[&quot;a&quot;, 1, true]</code> becomes{" "}
      <code>(string | number | boolean)[]</code>. Usually fine, but
      sometimes the generator gets cold feet and outputs{" "}
      <code>any[]</code>.
    </p>
    <p>
      <strong>Enum vs string:</strong>{" "}
      <code>&quot;status&quot;: &quot;pending&quot;</code> —{" "}
      <code>status: string</code> or <code>status: &quot;pending&quot;</code>?
      Single-sample enums are dangerous; multi-sample inference can
      detect real enums.
    </p>

    <h2>Generators worth knowing</h2>
    <p>
      <strong>quicktype:</strong> old, reliable, supports many source
      formats (JSON, JSON Schema, GraphQL, Postman) and many target
      languages. Output is ergonomic.
    </p>
    <p>
      <strong>json-schema-to-typescript:</strong> converts JSON Schema
      (not raw JSON). Output is faithful to the schema; requires you
      have a schema already.
    </p>
    <p>
      <strong>openapi-typescript / openapi-fetch:</strong> generate
      types and typed fetch clients from OpenAPI. Best for REST APIs.
    </p>
    <p>
      <strong>graphql-codegen:</strong> for GraphQL APIs, generates
      types plus hooks for Apollo/urql/others.
    </p>
    <p>
      <strong>protobufjs / ts-proto:</strong> for gRPC/protobuf.
    </p>
    <p>
      <strong>VS Code paste-as-JSON:</strong> built-in command turns
      pasted JSON into a TypeScript interface. Good for one-offs.
    </p>

    <h2>From JSON alone — no schema</h2>
    <p>
      Fine for quick typing, but:
    </p>
    <p>
      Only one sample → generator can&rsquo;t distinguish optional
      from required.
    </p>
    <p>
      No way to know if an array element is always an object or
      sometimes null.
    </p>
    <p>
      No range/length/pattern info.
    </p>
    <p>
      <strong>Hack for better inference:</strong> feed the generator
      multiple samples covering edge cases (empty string, null,
      missing keys). It&rsquo;ll infer unions and optionals more
      accurately.
    </p>

    <h2>From JSON Schema — richer types</h2>
    <p>
      JSON Schema carries constraints JSON doesn&rsquo;t. A schema
      with:
    </p>
    <pre>
{`"status": { "enum": ["draft","published","archived"] }`}
    </pre>
    <p>
      Generates:
    </p>
    <pre>
{`status: "draft" | "published" | "archived";`}
    </pre>
    <p>
      Not possible from raw JSON. Worth writing a schema for anything
      mission-critical.
    </p>

    <h2>Runtime validation matters too</h2>
    <p>
      Generated TypeScript interfaces are compile-time only. If an API
      returns malformed data, your code trusts it and crashes later.
    </p>
    <p>
      <strong>Pair generated types with runtime validation:</strong>
    </p>
    <p>
      <strong>Zod:</strong> define schema once, get both TS type
      and runtime validator.
    </p>
    <p>
      <strong>ajv:</strong> compile JSON Schema to a fast runtime
      validator.
    </p>
    <p>
      <strong>io-ts / runtypes:</strong> similar pattern in the fp
      camp.
    </p>
    <p>
      At the API boundary: parse untrusted JSON through a validator,
      trust the types from there on.
    </p>

    <h2>Naming and style</h2>
    <p>
      <strong>PascalCase for types:</strong>{" "}
      <code>User</code>, not <code>user</code>.
    </p>
    <p>
      <strong>Interface vs type alias:</strong>{" "}
      <code>interface</code> for object shapes,{" "}
      <code>type</code> for unions and mapped types. Most
      generators output interfaces.
    </p>
    <p>
      <strong>Nested type names:</strong> some generators inline
      nested objects; others create named sub-types like{" "}
      <code>UserAddress</code>. Named sub-types are usually better
      for reuse.
    </p>
    <p>
      <strong>camelCase vs snake_case:</strong> if your API returns
      <code> snake_case</code>, decide whether to keep it in TS or
      transform. Keeping it matches the API wire format;
      transforming is nicer ergonomically but requires mapping at
      the boundary.
    </p>

    <h2>Keeping types fresh</h2>
    <p>
      APIs change. Generated types should regenerate automatically.
    </p>
    <p>
      <strong>CI step:</strong> regenerate types on every
      build/deploy. Fail if the schema changed but types weren&rsquo;t
      regenerated.
    </p>
    <p>
      <strong>Watch mode in dev:</strong> regenerate on schema save.
      Tight feedback loop.
    </p>
    <p>
      <strong>Commit generated files:</strong> yes. Keeps diffs
      visible in PRs. Regenerate in CI to detect drift.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Trusting single-sample inference.</strong> Missing
      fields get inferred as non-optional. Add multiple samples or
      annotate manually.
    </p>
    <p>
      <strong>No runtime validation at API boundaries.</strong>{" "}
      Generated types lie when data is malformed. Validate untrusted
      input.
    </p>
    <p>
      <strong>Regenerating without reviewing the diff.</strong> A
      schema tweak can change every interface. Review changes like
      any code.
    </p>
    <p>
      <strong>Mixing hand-written and generated in the same file.</strong>{" "}
      Regen overwrites your edits. Keep generated output separate.
    </p>
    <p>
      <strong>Ignoring null/undefined distinctions.</strong>{" "}
      TypeScript treats them as different. Generated types should
      too.
    </p>
    <p>
      <strong>Leaving any leak in.</strong> Strict mode +{" "}
      <code>noImplicitAny</code> catches this. Review generator
      output for stray <code>any</code>.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert JSON to TypeScript interfaces instantly with the{" "}
      <a href="/tools/json-to-typescript">JSON to TypeScript converter</a>.
      Pair with the{" "}
      <a href="/tools/json-schema-generator">JSON schema generator</a>
      {" "}to get a reusable schema, and the{" "}
      <a href="/tools/json-formatter">JSON formatter</a> to clean up
      the sample first.
    </p>
  </>
);
