export const intro = (
  <>
    <p>
      REST vs GraphQL is one of the most asked questions in backend interviews — and one
      of the most misunderstood. The truthful answer is boring: both work, pick the one
      that fits your problem. This guide explains what they actually are and when each
      wins.
    </p>
    <p>
      If you understand the trade-offs below, you can answer interview questions on the
      topic and make the right call on a real project.
    </p>
  </>
);

export const body = (
  <>
    <h2>1. REST in one paragraph</h2>
    <p>
      Resources mapped to URLs. HTTP verbs (GET, POST, PUT, DELETE) describe the action.
      Each endpoint returns a fixed shape. Simple, cacheable, ubiquitous. Default choice
      for most APIs in 2026.
    </p>

    <h2>2. GraphQL in one paragraph</h2>
    <p>
      A single endpoint. Clients send a query specifying exactly what fields they want.
      Server resolves the query and returns just those fields. Solves over-fetching and
      under-fetching — clients get what they need, no more.
    </p>

    <h2>3. Over-fetching, the core problem</h2>
    <p>
      With REST, <code>/users/42</code> returns the whole user object even if you only
      wanted the email. With GraphQL, you ask for just the email, you get just the email.
      On mobile/bandwidth-sensitive apps, this matters.
    </p>

    <h2>4. Under-fetching, the other core problem</h2>
    <p>
      To show a user&rsquo;s posts and comments, REST often needs 3 requests. GraphQL
      does it in 1. Fewer round trips = faster. Big win for complex UIs with lots of
      related data.
    </p>

    <h2>5. Where REST wins</h2>
    <p>
      Simple CRUD APIs. Public APIs where consumers vary (cacheability matters).
      Microservices with small surface areas. Teams without GraphQL experience. You
      don&rsquo;t pay the complexity cost when you don&rsquo;t need the flexibility.
    </p>

    <h2>6. Where GraphQL wins</h2>
    <p>
      Complex frontends pulling from many resources. Mobile apps minimizing bandwidth.
      Apps with many client types (web + mobile + watch) each needing different data
      shapes. APIs serving many teams with different needs.
    </p>

    <h2>7. Caching is harder in GraphQL</h2>
    <p>
      REST piggybacks on HTTP caching — CDNs just work. GraphQL queries are POSTs, so
      standard HTTP caching doesn&rsquo;t apply. You need client-side caching (Apollo,
      Relay) and careful server-side caching. Real operational cost.
    </p>

    <h2>8. File uploads and binary data</h2>
    <p>
      REST handles these naturally. GraphQL needs extensions (multipart spec). Small
      friction but real. If your API is file-heavy, REST is simpler.
    </p>

    <h2>9. Rate limiting and throttling</h2>
    <p>
      Easier with REST — count requests per endpoint. With GraphQL, one query can fetch
      a lot or a little; you need complexity-based throttling (query cost analysis). Not
      impossible, just more work.
    </p>

    <h2>10. Learning curve</h2>
    <p>
      REST is basically free — it&rsquo;s just HTTP. GraphQL adds schemas, resolvers,
      clients, tooling. Steeper ramp-up for new team members. Budget training time if
      you adopt it.
    </p>

    <h2>11. The hybrid approach</h2>
    <p>
      Many companies use REST for public APIs and GraphQL for internal frontends. Or
      gRPC between services + REST externally. You don&rsquo;t have to pick one for the
      whole system.
    </p>

    <h2>12. Interview answer</h2>
    <p>
      &ldquo;REST is the default — simpler, cacheable, universally supported. GraphQL
      wins when you have complex nested data and multiple client types. I&rsquo;d start
      with REST unless the over-fetching pain was real.&rdquo; See{" "}
      <a href="/guides/what-is-an-api">what is an API</a> for the fundamentals, and{" "}
      <a href="/guides/how-to-prepare-for-coding-interviews">interview prep</a> for more.
    </p>
  </>
);
