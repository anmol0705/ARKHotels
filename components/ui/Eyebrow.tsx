import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  tone?: "brass" | "moss";
};

export function Eyebrow({ children, className, tone = "brass" }: Props) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.18em]",
        tone === "brass" ? "text-brass-deep" : "text-moss",
        className,
      )}
    >
      {children}
    </p>
  );
}
