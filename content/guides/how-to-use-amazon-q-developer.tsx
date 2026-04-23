import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Amazon Q Developer is AWS&rsquo;s coding assistant &mdash; the successor to CodeWhisperer &mdash; offering inline completions, agent-style tasks, and deep AWS service awareness.</p>);

export const body: ReactElement = (
  <>
    <p>Rebranded from CodeWhisperer in 2024, Amazon Q Developer keeps the IDE completions engine and adds a chat agent, automated code upgrades (Java 8/11 to 17/21), and security scans tuned for AWS SDK patterns. It&rsquo;s Amazon&rsquo;s direct answer to Copilot and Cursor.</p>
    <h2>What it is</h2>
    <p>Q Developer runs as an IDE plugin (VS Code, JetBrains, Visual Studio, Eclipse) and as a CLI. It covers three surfaces: inline suggestions as you type, a side-panel chat that can read your workspace, and agent tasks (/dev, /transform, /test) that produce multi-file pull requests. It reads your AWS account when you opt in, so it can answer questions like &ldquo;why is this Lambda timing out&rdquo; with real config.</p>
    <h2>Install / sign up</h2>
    <pre>{`# VS Code
code --install-extension AmazonWebServices.amazon-q-vscode

# JetBrains: Settings > Plugins > search "Amazon Q"

# CLI (macOS)
brew install amazon-q

# Sign in with AWS Builder ID (free tier) or IAM Identity Center (Pro)`}</pre>
    <h2>First session</h2>
    <p>After signing in, open a file and start typing &mdash; completions appear in grey, tab to accept. Open the Q panel to chat, or run /dev to kick off an agent task that produces a diff.</p>
    <pre>{`$ q chat
> /dev add a DynamoDB table and wire it into the orders Lambda
# Q generates CDK changes, Lambda edits, and tests
# review the diff, then /accept`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>1. Use /transform to modernise a Java 8 service to Java 17 with Spring Boot upgrades applied automatically.</li>
      <li>2. Run /review to get a security-focused scan that flags IAM over-permissions and SDK misuse.</li>
      <li>3. Ask the chat panel AWS questions grounded in your account &mdash; billing, CloudFormation drift, or service limits.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>The free Builder ID tier covers generous monthly inline suggestions and a handful of agent invocations; Pro ($19/user/month) lifts the limits and adds customisation on your private repos. Customisations require an S3 bucket of reference code and a one-time training job.</p>
    <p>Q Developer won&rsquo;t suggest code that matches public repos verbatim when reference tracking is on &mdash; leave that setting enabled for license hygiene. For non-AWS projects the agent still works, but you lose the account-aware superpowers.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>AWS-heavy teams, Java shops planning an LTS upgrade, and anyone who wants Copilot-class completions wired directly into their cloud console.</p>
  </>
);
