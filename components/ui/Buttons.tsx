import Link from "next/link";
import { type ComponentProps } from "react";
import { cn } from "@/lib/cn";

type AnchorProps = ComponentProps<typeof Link>;

const baseSolid =
  "inline-flex items-center gap-2 px-6 py-3 bg-brass text-paper text-[15px] font-medium tracking-tight rounded-[2px] hover:bg-brass-deep transition-colors duration-[180ms] ease-[var(--ease-out-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass";

const baseGhost =
  "inline-flex items-center gap-2 px-6 py-3 border border-ink text-ink text-[15px] font-medium rounded-[2px] hover:bg-ink hover:text-paper transition-colors duration-[180ms]";

const baseLink =
  "inline-flex items-baseline gap-1 text-ink underline decoration-brass decoration-1 underline-offset-[6px] hover:decoration-2 hover:text-brass-deep transition-all duration-[180ms]";

export function ButtonPrimary({ children, className, ...rest }: AnchorProps) {
  return (
    <Link className={cn(baseSolid, className)} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonGhost({ children, className, ...rest }: AnchorProps) {
  return (
    <Link className={cn(baseGhost, className)} {...rest}>
      {children}
    </Link>
  );
}

export function LinkArrow({ children, className, ...rest }: AnchorProps) {
  return (
    <Link className={cn(baseLink, className)} {...rest}>
      <span>{children}</span>
      <span aria-hidden>→</span>
    </Link>
  );
}
