const NOTES = [
  "Direct rate — no OTA commission added",
  "GST invoice issued on checkout",
  "NEFT / UPI accepted for corporate billing",
  "Free on-site parking",
] as const;

export function DirectBookingNotes({ className = "" }: { className?: string }) {
  return (
    <div className={`border-t border-stone-100 pt-5 mt-6 ${className}`}>
      <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500 mb-3">
        Book direct
      </p>
      <ul className="space-y-1.5">
        {NOTES.map((note) => (
          <li key={note} className="flex items-start gap-2 text-[13px] text-ink-soft leading-[1.5]">
            <span className="mt-[3px] shrink-0 w-1 h-1 rounded-full bg-brass" aria-hidden />
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}
