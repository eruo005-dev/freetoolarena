export const intro = (
  <>
    <p>
      APIs are the plumbing of modern software. Every app you use — Slack, Spotify,
      Uber — is a pile of APIs talking to other APIs. Understanding them is maybe the
      single most important concept after learning to program.
    </p>
    <p>
      This guide explains APIs in plain English, with enough detail to actually use
      them. No hand-waving.
    </p>
  </>
);

export const body = (
  <>
    <h2>1. API = &ldquo;Application Programming Interface&rdquo;</h2>
    <p>
      A contract that lets one program talk to another. You send a request, you get a
      response. The classic analogy: a restaurant menu. You don&rsquo;t tell the kitchen
      how to cook — you order by name, they deliver.
    </p>

    <h2>2. What a web API looks like</h2>
    <p>
      A URL like <code>https://api.example.com/users/42</code>. You send an HTTP request,
      you get back JSON (usually). That&rsquo;s 95% of what &ldquo;API&rdquo; means in a
      modern web context.
    </p>

    <h2>3. HTTP methods in one breath</h2>
    <p>
      GET to read. POST to create. PUT/PATCH to update. DELETE to delete. That&rsquo;s
      the entire REST alphabet. Different verbs, same URL structure — the verb tells the
      server what you want.
    </p>

    <h2>4. Status codes matter</h2>
    <p>
      2xx = success. 3xx = redirect. 4xx = you messed up (400 bad request, 401 auth
      missing, 404 not found). 5xx = they messed up (500 server error). Reading codes
      quickly is a debugging skill.
    </p>

    <h2>5. JSON is the lingua franca</h2>
    <p>
      Most APIs send and receive JSON: {`{"name": "Ada", "age": 30}`}. Keys are strings,
      values are strings/numbers/booleans/arrays/objects. Every language has built-in
      JSON support. See <a href="/tools/json-to-csv-converter">JSON to CSV converter</a>
      {" "}for quick conversions.
    </p>

    <h2>6. Authentication: API keys and tokens</h2>
    <p>
      Most APIs require an API key (a secret string) sent in a header like{" "}
      <code>Authorization: Bearer xyz123</code>. Never commit keys to git. Use env vars.
      This is the single most common security screw-up in startups.
    </p>

    <h2>7. REST vs GraphQL vs RPC</h2>
    <p>
      REST uses URLs + HTTP verbs. GraphQL exposes a single endpoint you query flexibly.
      RPC (gRPC) is function calls across the wire. REST is the default; the others are
      specialized. See <a href="/guides/rest-vs-graphql">REST vs GraphQL</a>.
    </p>

    <h2>8. How to test an API</h2>
    <p>
      Use curl, Postman, or Insomnia. Hit the endpoint, inspect the response. The docs
      lie sometimes — the real contract is what the server actually returns. Test before
      you build against it.
    </p>

    <h2>9. Rate limits and pagination</h2>
    <p>
      Most APIs cap how many requests per minute you can make and page large result
      sets. Respect the limits, handle 429 responses, follow pagination links. Hitting
      rate limits in prod is a rookie mistake.
    </p>

    <h2>10. Webhooks = APIs in reverse</h2>
    <p>
      Normally you call them. With webhooks, they call you when something happens (new
      order, message, etc.). You give them a URL, they POST to it. Great for event-driven
      flows.
    </p>

    <h2>11. Documentation is everything</h2>
    <p>
      Good API docs make or break adoption. Stripe is the gold standard. When building
      your own API, the docs are as important as the code. Bad docs mean users give up.
    </p>

    <h2>12. Building your own</h2>
    <p>
      Pick a language/framework (Express, FastAPI, Go net/http). Define routes. Return
      JSON. Add auth. Deploy. You&rsquo;ve built an API. The concept is simpler than
      the jargon implies. See <a href="/guides/frontend-vs-backend-development">frontend
      vs backend</a> for context.
    </p>
  </>
);
