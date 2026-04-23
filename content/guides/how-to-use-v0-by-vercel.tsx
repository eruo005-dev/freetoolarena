import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>v0 by Vercel turns natural-language prompts into production-ready React components using shadcn/ui and Tailwind CSS.</p>
);

export const body: ReactElement = (
  <>
    <p>
      v0 is Vercel&rsquo;s generative UI tool. You describe a screen in plain English &mdash; or paste a Figma frame, a
      screenshot, or a rough sketch &mdash; and it returns a working React component using shadcn/ui primitives and
      Tailwind classes. It is optimized for Next.js App Router output, so generated code drops into a real project with
      minimal cleanup. Iteration is chat-based: you refine the output by replying with corrections rather than editing
      a prompt from scratch.
    </p>

    <h2>What it is</h2>
    <p>
      v0 is a hosted web app built on top of Vercel&rsquo;s own model (v0-1.5-md) with fallbacks to frontier models for
      heavier reasoning. The generated code uses TypeScript, React Server Components when sensible, and the shadcn/ui
      component library under the MIT license. Maintainer: Vercel. It is paid beyond a small free tier, billed by
      message credits.
    </p>

    <h2>Install</h2>
    <p>There is nothing to install locally &mdash; v0 lives at v0.dev. To pull generated components into a project:</p>
    <pre>{`npx shadcn@latest add "https://v0.dev/chat/b/<block-id>"
# or copy/paste from the v0 preview pane`}</pre>

    <h2>First run</h2>
    <p>Open v0.dev, sign in with your Vercel account, and type a prompt such as &ldquo;pricing page with three tiers&rdquo;.</p>
    <pre>{`// v0 returns files like this that you drop into app/
export default function Pricing() {
  return (
    <section className="py-24">
      <h1 className="text-4xl font-bold">Pricing</h1>
      {/* three Card components follow */}
    </section>
  )
}`}</pre>

    <h2>Everyday workflows</h2>
    <ul>
      <li>Paste a screenshot of a competitor&rsquo;s landing page and ask for a branded equivalent.</li>
      <li>Iterate in chat &mdash; &ldquo;make the hero dark, move the CTA right, add a testimonial row&rdquo;.</li>
      <li>Click &ldquo;Add to Codebase&rdquo; to ship straight to a connected GitHub repo and open a PR.</li>
    </ul>

    <h2>Gotchas and tips</h2>
    <p>
      v0 often imports components you have not installed yet. Run the shadcn add command it suggests before hitting
      save, or the build will break on missing primitives. Generated server components sometimes call client-only hooks
      &mdash; double-check that &ldquo;use client&rdquo; lives at the top of interactive files.
    </p>
    <p>
      Treat v0 output as a strong first draft, not a final commit. It tends to inline data that should come from your
      CMS or database, and accessibility attributes are decent but not perfect &mdash; audit tab order and alt text
      before shipping.
    </p>

    <h2>Who it&rsquo;s for</h2>
    <p>
      Founders and full-stack engineers who already live in the Next.js + Tailwind stack. Tip: keep a design-system
      reference project pinned as v0 context so every new generation matches your existing tokens.
    </p>
  </>
);
