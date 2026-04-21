import type { ReactNode } from "react";

type Tone = "brand" | "slate" | "emerald";

const tones: Record<Tone, string> = {
  brand: "bg-brand/10 text-brand ring-1 ring-inset ring-brand/20",
  slate: "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200",
  emerald: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
};

export function Badge({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
