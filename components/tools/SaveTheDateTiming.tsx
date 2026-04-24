"use client";

import { useMemo, useState } from "react";

type WedType = "local" | "destination" | "holiday";

const TYPE_LABEL: Record<WedType, string> = {
  local: "Local / hometown",
  destination: "Destination wedding",
  holiday: "Holiday weekend",
};

const daysBetween = (a: Date, b: Date) =>
  Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));

const addDays = (d: Date, days: number) => {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + days);
  return nd;
};

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export function SaveTheDateTiming() {
  const defaultDate = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 10);
    return d.toISOString().slice(0, 10);
  })();

  const [weddingDate, setWeddingDate] = useState(defaultDate);
  const [type, setType] = useState<WedType>("local");

  const milestones = useMemo(() => {
    const wedding = new Date(weddingDate + "T12:00:00");
    if (!Number.isFinite(wedding.getTime())) return null;
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    const saveOffset = type === "destination" ? 270 : type === "holiday" ? 240 : 210;
    const inviteOffset = type === "destination" ? 90 : 49;
    const rsvpOffset = 28;
    const headcountOffset = 7;

    const items = [
      {
        label: "Save-the-date",
        date: addDays(wedding, -saveOffset),
        note:
          type === "destination"
            ? "Destination &mdash; 8&ndash;12 months ahead so guests can book travel."
            : type === "holiday"
              ? "Holiday weekend &mdash; 8 months ahead; guests plan early for long weekends."
              : "Local wedding &mdash; 6&ndash;8 months ahead is the sweet spot.",
      },
      {
        label: "Order invitations",
        date: addDays(wedding, -(inviteOffset + 30)),
        note: "Allow 2&ndash;4 weeks for proofing, printing, and calligraphy.",
      },
      {
        label: "Mail invitations",
        date: addDays(wedding, -inviteOffset),
        note:
          type === "destination"
            ? "3 months out so guests can finalize flights and hotels."
            : "6&ndash;8 weeks out is standard for local weddings.",
      },
      {
        label: "RSVP deadline",
        date: addDays(wedding, -rsvpOffset),
        note: "3&ndash;4 weeks before &mdash; leaves time to chase stragglers.",
      },
      {
        label: "Final headcount to caterer",
        date: addDays(wedding, -headcountOffset),
        note: "Most caterers lock numbers 7 days before the event.",
      },
      {
        label: "Wedding day",
        date: wedding,
        note: "The big day. Enjoy it &mdash; you earned it.",
      },
    ];

    return items.map((m) => ({
      ...m,
      daysUntil: daysBetween(m.date, today),
    }));
  }, [weddingDate, type]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Wedding date</label>
          <input
            type="date"
            value={weddingDate}
            onChange={(e) => setWeddingDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Wedding type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as WedType)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {(Object.keys(TYPE_LABEL) as WedType[]).map((t) => (
              <option key={t} value={t}>
                {TYPE_LABEL[t]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {milestones ? (
        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-800">Your timeline</div>
          <ol className="space-y-3">
            {milestones.map((m) => {
              const past = m.daysUntil < 0;
              return (
                <li
                  key={m.label}
                  className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="font-medium text-slate-900">{m.label}</div>
                    <div
                      className="text-xs text-slate-500"
                      dangerouslySetInnerHTML={{ __html: m.note }}
                    />
                  </div>
                  <div className="sm:text-right">
                    <div className="text-sm font-semibold text-brand">{fmtDate(m.date)}</div>
                    <div className="text-xs text-slate-500">
                      {past
                        ? `${Math.abs(m.daysUntil)} days ago`
                        : m.daysUntil === 0
                          ? "Today"
                          : `in ${m.daysUntil} days`}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            Tip: print this timeline and tape it inside your planning binder. Missing the
            save-the-date window is the #1 reason guests can&rsquo;t make destination weddings.
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
          Pick a valid wedding date to generate your timeline.
        </div>
      )}
    </div>
  );
}
