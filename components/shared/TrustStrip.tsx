import { TRUST_SIGNALS } from "@/lib/site";

type Props = {
  className?: string;
  tone?: "dark" | "light";
};

export function TrustStrip({ className = "", tone = "dark" }: Props) {
  const valueClass = tone === "light"
    ? "text-[19px] font-semibold tabular-nums text-paper leading-none"
    : "text-[19px] font-semibold tabular-nums text-ink leading-none";
  const labelClass = tone === "light"
    ? "mt-1.5 text-[10px] uppercase tracking-[0.14em] text-paper/50 leading-none"
    : "mt-1.5 text-[10px] uppercase tracking-[0.14em] text-stone-400 leading-none";

  return (
    <div className={`flex flex-wrap items-start gap-x-7 gap-y-3 ${className}`}>
      {TRUST_SIGNALS.map((s) => (
        <div
          key={s.label}
          className="border-t-2 border-brass pt-2.5"
        >
          <div className={valueClass}>{s.value}</div>
          <div className={labelClass}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
