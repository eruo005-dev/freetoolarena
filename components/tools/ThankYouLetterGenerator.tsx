"use client";

import { useMemo, useState } from "react";

type Occasion = "job-interview" | "gift" | "business-referral" | "favor" | "wedding" | "general";
type Formality = "formal" | "warm" | "friendly";

interface OccasionTemplate {
  opening: (thing: string) => string;
  defaultThing: string;
  defaultImpact: string;
  defaultClosing: string;
}

const OCCASIONS: Record<Occasion, OccasionTemplate> = {
  "job-interview": {
    opening: (thing) => `Thank you so much for taking the time to speak with me ${thing}.`,
    defaultThing: "yesterday about the Senior Product Designer role",
    defaultImpact:
      "Our conversation about the team&rsquo;s approach to research and design critique left me even more excited about the opportunity. It is rare to find a culture that balances high standards with genuine care for craft, and that combination came through in every example you shared.",
    defaultClosing:
      "I would be thrilled to contribute to the work you described, and I look forward to hearing about the next steps.",
  },
  gift: {
    opening: (thing) => `Thank you so much for the thoughtful gift &mdash; ${thing}.`,
    defaultThing: "the beautifully wrapped set of watercolor paints and the hand-lettered card",
    defaultImpact:
      "It was such a surprise to open, and I can already tell I will get years of use out of it. The fact that you remembered how much I have been wanting to start painting again made it mean even more.",
    defaultClosing:
      "I hope we can catch up in person soon so I can thank you properly.",
  },
  "business-referral": {
    opening: (thing) => `Thank you so much for referring ${thing}.`,
    defaultThing: "Delia Park to our firm last week",
    defaultImpact:
      "Your willingness to put your reputation on the line for our work is something I do not take lightly. We had our first call yesterday and it was immediately clear why you thought we would be a strong fit.",
    defaultClosing:
      "I will keep you posted as things progress, and please let me know how I can return the favor.",
  },
  favor: {
    opening: (thing) => `Thank you so much for ${thing}.`,
    defaultThing: "covering the evening shift on Tuesday when I had to pick up my daughter from urgent care",
    defaultImpact:
      "You stepped in without hesitation and without making me feel like I owed you anything, and that kind of generosity is genuinely rare. It meant I could be where I needed to be without a cloud of work stress hanging over the whole evening.",
    defaultClosing:
      "I owe you one &mdash; dinner is on me next time we see each other.",
  },
  wedding: {
    opening: (thing) => `Thank you so much for ${thing}.`,
    defaultThing: "the beautiful crystal serving bowl and for celebrating with us on our wedding day",
    defaultImpact:
      "Having you there to share that day with us meant more than we can put into words, and your gift is something we will use and treasure for years to come.",
    defaultClosing:
      "We cannot wait to host you for dinner and use the bowl for its first proper meal.",
  },
  general: {
    opening: (thing) => `I wanted to take a moment to thank you for ${thing}.`,
    defaultThing: "everything you did to make last week&rsquo;s launch possible",
    defaultImpact:
      "Your support made a real difference, and I do not think the outcome would have been the same without you.",
    defaultClosing:
      "Thank you again &mdash; I hope we stay in close touch.",
  },
};

export function ThankYouLetterGenerator() {
  const [occasion, setOccasion] = useState<Occasion>("job-interview");
  const [formality, setFormality] = useState<Formality>("warm");
  const template = OCCASIONS[occasion];

  const [yourName, setYourName] = useState("Taylor Nguyen");
  const [recipientName, setRecipientName] = useState("Ms. Patel");
  const [date, setDate] = useState("April 23, 2026");
  const [thing, setThing] = useState(template.defaultThing);
  const [impact, setImpact] = useState(template.defaultImpact);
  const [closingAction, setClosingAction] = useState(template.defaultClosing);
  const [lastOccasion, setLastOccasion] = useState<Occasion>(occasion);

  if (occasion !== lastOccasion) {
    setThing(OCCASIONS[occasion].defaultThing);
    setImpact(OCCASIONS[occasion].defaultImpact);
    setClosingAction(OCCASIONS[occasion].defaultClosing);
    setLastOccasion(occasion);
  }

  const salutation = useMemo(() => {
    if (formality === "friendly") return `Hi ${recipientName},`;
    if (formality === "formal") return `Dear ${recipientName},`;
    return `Dear ${recipientName},`;
  }, [formality, recipientName]);

  const signOff = useMemo(() => {
    if (formality === "friendly") return "With thanks,";
    if (formality === "formal") return "Sincerely,";
    return "With gratitude,";
  }, [formality]);

  const opening = template.opening(thing);

  const copyPlainText = async () => {
    const clean = (s: string) => s.replace(/&mdash;/g, "—").replace(/&rsquo;/g, "'").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"');
    const lines: string[] = [];
    lines.push(date);
    lines.push("");
    lines.push(salutation);
    lines.push("");
    lines.push(clean(opening));
    lines.push("");
    lines.push(clean(impact));
    lines.push("");
    lines.push(clean(closingAction));
    lines.push("");
    lines.push(signOff);
    lines.push("");
    lines.push("");
    lines.push("");
    lines.push(yourName);
    const text = lines.join("\n");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
      <div className="space-y-4 print:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Occasion</span>
            <select value={occasion} onChange={(e) => setOccasion(e.target.value as Occasion)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
              <option value="job-interview">Job interview</option>
              <option value="gift">Gift</option>
              <option value="business-referral">Business referral</option>
              <option value="favor">Favor</option>
              <option value="wedding">Wedding</option>
              <option value="general">General</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Formality</span>
            <select value={formality} onChange={(e) => setFormality(e.target.value as Formality)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
              <option value="formal">Formal</option>
              <option value="warm">Warm</option>
              <option value="friendly">Friendly</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Your name</span>
            <input type="text" value={yourName} onChange={(e) => setYourName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Recipient name</span>
            <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Date</span>
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">What you&rsquo;re thanking them for</span>
          <textarea rows={2} value={thing} onChange={(e) => setThing(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Impact / what it meant</span>
          <textarea rows={4} value={impact} onChange={(e) => setImpact(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Closing action</span>
          <textarea rows={2} value={closingAction} onChange={(e) => setClosingAction(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <div className="flex gap-2 pt-2">
          <button onClick={() => window.print()} className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-dark">Print / Save as PDF</button>
          <button onClick={copyPlainText} className="bg-slate-100 text-slate-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-200">Copy as text</button>
        </div>
      </div>

      <div className="print:col-span-2 print:p-0 print:max-w-none">
        <div className="bg-white border border-slate-200 rounded-xl p-8 font-serif text-slate-900 print:border-0 print:rounded-none print:p-0 leading-relaxed">
          <div className="text-sm">{date}</div>
          <div className="h-4" />
          <p className="text-sm">{salutation}</p>
          <div className="h-3" />
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: opening }} />
          <div className="h-3" />
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: impact }} />
          <div className="h-3" />
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: closingAction }} />
          <div className="h-4" />
          <p className="text-sm">{signOff}</p>
          <div className="h-12" />
          <p className="text-sm">{yourName}</p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page { size: letter; margin: 0.75in; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
