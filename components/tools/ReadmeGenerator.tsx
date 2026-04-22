"use client";

import { useMemo, useState } from "react";

export function ReadmeGenerator() {
  const [name, setName] = useState("My Project");
  const [tagline, setTagline] = useState("A short description of what it does.");
  const [install, setInstall] = useState("npm install");
  const [usage, setUsage] = useState(`import { thing } from "my-project";\n\nthing();`);
  const [features, setFeatures] = useState("Fast and dependency-free\nWorks in the browser and Node\nTypeScript types built in");
  const [license, setLicense] = useState("MIT");
  const [author, setAuthor] = useState("Your Name");
  const [badges, setBadges] = useState(true);
  const [copied, setCopied] = useState(false);

  const md = useMemo(() => {
    const featureList = features.split("\n").map((s) => s.trim()).filter(Boolean).map((f) => `- ${f}`).join("\n");
    const badgeBlock = badges
      ? `![npm](https://img.shields.io/npm/v/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"))})\n![license](https://img.shields.io/badge/license-${encodeURIComponent(license)}-blue)\n\n`
      : "";
    return `# ${name}\n\n${badgeBlock}${tagline}\n\n## Features\n\n${featureList}\n\n## Installation\n\n\`\`\`bash\n${install}\n\`\`\`\n\n## Usage\n\n\`\`\`js\n${usage}\n\`\`\`\n\n## Contributing\n\nPull requests welcome. For major changes, open an issue first to discuss what you'd like to change.\n\n## License\n\n${license} © ${author}\n`;
  }, [name, tagline, install, usage, features, license, author, badges]);

  function copy() {
    navigator.clipboard?.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function download() {
    const blob = new Blob([md], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "README.md";
    a.click();
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Project name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">License</span>
          <select value={license} onChange={(e) => setLicense(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option>MIT</option><option>Apache-2.0</option><option>ISC</option><option>GPL-3.0</option><option>BSD-3-Clause</option><option>Unlicense</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Tagline</span>
          <input value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Author</span>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="flex items-center gap-2 text-sm pt-6">
          <input type="checkbox" checked={badges} onChange={(e) => setBadges(e.target.checked)} className="accent-brand" />
          Include shields.io badges
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Features (one per line)</span>
          <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Install command</span>
          <input value={install} onChange={(e) => setInstall(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Usage snippet</span>
          <textarea value={usage} onChange={(e) => setUsage(e.target.value)} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs" />
        </label>
      </div>

      <pre className="rounded-xl bg-slate-50 p-4 text-xs whitespace-pre-wrap max-h-96 overflow-auto">{md}</pre>

      <div className="flex gap-2">
        <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
          {copied ? "Copied" : "Copy Markdown"}
        </button>
        <button onClick={download} className="bg-slate-900 text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-slate-800">
          Download README.md
        </button>
      </div>
    </div>
  );
}
