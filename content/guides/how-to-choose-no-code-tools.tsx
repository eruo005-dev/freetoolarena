import { type ReactElement } from "react";

export const intro: ReactElement = (<p>The right no-code tool is the one matched to what you&rsquo;re actually building &mdash; not the one with the slickest demo on Twitter.</p>);

export const body: ReactElement = (
  <>
    <p>No-code has genuinely gotten good. You can now ship a marketing site, a CRUD app, an internal dashboard, or a small marketplace without writing backend code &mdash; but only if you pick the tool that matches the shape of the problem. Most failed no-code projects aren&rsquo;t failures of the category; they&rsquo;re mismatches (building a database app on Webflow, or a marketing site on Bubble). Start with what you&rsquo;re building, then shortlist two tools, then kick the tires.</p>

    <h2>Step 1: define what you&rsquo;re actually building</h2>
    <p>Before comparing tools, write one sentence describing the product. Is it a marketing site with a blog and forms? A database-backed web app with user logins and permissions? A marketplace connecting two sides? An internal tool your team uses to manage data? A workflow automation? These categories map cleanly to different platforms, and picking a tool before you&rsquo;ve answered this question is how people waste three months.</p>

    <h2>Top tools by category</h2>
    <ul>
      <li>Marketing sites and landing pages &mdash; Webflow (visual power, mature CMS) or Framer (faster, better defaults, tighter animations).</li>
      <li>Full web apps &mdash; Bubble (most flexible, real learning curve) or FlutterFlow for mobile-first.</li>
      <li>Airtable/Sheets-backed apps &mdash; Softr and Glide turn a spreadsheet into a real app in a day.</li>
      <li>Internal tools and dashboards &mdash; Retool, Appsmith, or Tooljet connect to your existing database and build operator UIs fast.</li>
      <li>Databases and docs &mdash; Airtable for structured data, Notion for documents with light structure, Coda if you want both.</li>
      <li>Workflow automation &mdash; Zapier, Make, or n8n (self-hostable).</li>
    </ul>

    <h2>Pricing traps to watch for</h2>
    <p>No-code pricing looks cheap on the landing page and gets expensive in production. Watch for per-editor seats (every teammate who logs in costs money), per-workspace charges that multiply across clients, per-record or per-row limits that force an upgrade the day you get traction, and &ldquo;tasks&rdquo; or &ldquo;operations&rdquo; metering in automation tools where a single user action triggers ten billed events. Model your year-one cost at 10x today&rsquo;s usage before committing.</p>

    <h2>Vendor lock-in and exportability</h2>
    <p>Your data should always be exportable in a usable format &mdash; CSV at minimum, ideally a full schema dump. Your UI and logic usually are not portable between no-code platforms; a Bubble app cannot be ported to Webflow, and vice versa. Accept that the platform is the product, and plan accordingly: keep a backup of your data, document your logic outside the tool, and pick vendors with track records and realistic acquisition/shutdown risk.</p>

    <h2>When no-code breaks down</h2>
    <p>No-code is excellent for the 80% case and painful for the remaining 20%. Real-time collaboration (think Figma-level sync), heavy computation, complex permissions across tenants, regulated data (HIPAA, strict SOC 2), high-volume APIs, and deep enterprise integrations are where you&rsquo;ll hit walls. The usual escape hatch is a custom backend behind the no-code frontend, or rewriting in code once product-market fit is clear. Plan the escape hatch before you need it.</p>

    <h2>How to evaluate, fast</h2>
    <p>Spend a weekend building the riskiest 20% of your app in the top two candidates. Not the login screen &mdash; the hard part. If the tool collapses under that load, it will collapse later too. Read the community forum and check how fast real questions get answered. Look at the changelog: an actively maintained platform ships every few weeks, a dying one goes quiet for months.</p>

    <h2>Common mistakes</h2>
    <p>Picking based on marketing demos alone (demos hide the hard cases), ignoring the roadmap (a missing feature today may still be missing in a year), skipping the backup and export plan, underestimating the time to learn Bubble or Webflow seriously (it is not &ldquo;no learning&rdquo;), and choosing the trendy tool over the boring one with 10x the documentation.</p>

    <h2>Bottom line</h2>
    <p>Define the product first, pick the right category, prototype the hard part in a weekend, and keep an exit plan. No-code is a serious choice, not a shortcut &mdash; treat it like one.</p>
  </>
);
