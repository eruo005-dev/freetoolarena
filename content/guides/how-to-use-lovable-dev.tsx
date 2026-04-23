import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>Lovable is an AI full-stack builder that turns prompts into deployable React + Supabase apps, with a live GitHub mirror.</p>
);

export const body: ReactElement = (
  <>
    <p>
      Lovable &mdash; formerly GPT Engineer &mdash; lets you describe an app in chat and watch it appear, file by file,
      in a side-by-side preview. Unlike UI-only tools, it wires up a backend too: Supabase for auth and Postgres,
      serverless functions for business logic, and Stripe for payments are all one prompt away. Every project is
      mirrored to a real GitHub repo you own, so you can eject at any time and continue in your editor of choice.
    </p>

    <h2>What it is</h2>
    <p>
      Lovable is a hosted platform built by a Stockholm-based team. The generated stack is Vite + React + TypeScript +
      Tailwind + shadcn/ui on the frontend and Supabase on the backend. Code is yours under a standard MIT-style
      project license once exported. The service itself is SaaS, with a free daily message allowance and paid tiers for
      heavier use.
    </p>

    <h2>Install</h2>
    <p>Lovable is browser-based. To work on an exported project locally:</p>
    <pre>{`git clone https://github.com/<you>/<lovable-project>.git
cd <lovable-project>
npm install
npm run dev`}</pre>

    <h2>First run</h2>
    <p>
      At lovable.dev, click &ldquo;New Project&rdquo; and type a prompt. Lovable scaffolds the repo and opens a preview;
      follow-up messages edit the same codebase.
    </p>
    <pre>{`// A typical generated page.tsx
import { supabase } from "@/integrations/supabase/client"

export default function Dashboard() {
  // Lovable writes the fetch, table, and auth guard for you
  return <TaskList />
}`}</pre>

    <h2>Everyday workflows</h2>
    <ul>
      <li>Prompt an MVP, connect Supabase with one click, then ask Lovable to add row-level security policies.</li>
      <li>Use &ldquo;Select element&rdquo; to point at a button in the preview and say what should change.</li>
      <li>Push every change to GitHub, review diffs in a PR, and deploy via Vercel or Netlify.</li>
    </ul>

    <h2>Gotchas and tips</h2>
    <p>
      Lovable is generous with dependencies &mdash; audit package.json before shipping or you&rsquo;ll carry half of npm
      into production. Its Supabase integration creates tables quickly, but it rarely adds indexes; profile slow queries
      early. Long chats also drift: if the app starts contradicting itself, fork a fresh chat that points at the same
      GitHub repo.
    </p>
    <p>
      Secrets are a soft spot. Never paste API keys into the chat &mdash; use Supabase Edge Function secrets or Vercel
      env vars, and remind Lovable to read from them instead of hardcoding values.
    </p>

    <h2>Who it&rsquo;s for</h2>
    <p>
      Solo founders and product managers who want a working SaaS skeleton in an afternoon. Tip: after the MVP prompt,
      immediately ask Lovable to add tests and error boundaries &mdash; it rarely suggests them unprompted.
    </p>
  </>
);
