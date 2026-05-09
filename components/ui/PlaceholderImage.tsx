import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

type Props = Omit<ImageProps, "width" | "height" | "fill"> & {
  ratio?: "21/9" | "16/9" | "4/5" | "3/4" | "1/1" | "5/4" | "3/2";
  className?: string;
  caption?: string;
  credit?: string;
  priority?: boolean;
};

const RATIO_CLASS: Record<NonNullable<Props["ratio"]>, string> = {
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-[16/9]",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "5/4": "aspect-[5/4]",
  "3/2": "aspect-[3/2]",
};

// All site imagery routes through here so we can swap photography in one place
// when client photos arrive. The figure collapses gracefully if the image fails.
export function PlaceholderImage({
  src,
  alt,
  ratio = "4/5",
  className,
  caption,
  credit,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  ...rest
}: Props) {
  return (
    <figure className={cn("space-y-3", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-parchment",
          RATIO_CLASS[ratio],
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[520ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.02]"
          {...rest}
        />
        {credit ? (
          <span className="absolute bottom-2 right-2 text-[10px] uppercase tracking-[0.18em] text-paper bg-ink/60 px-2 py-0.5">
            {credit}
          </span>
        ) : null}
      </div>
      {caption ? (
        <figcaption className="pt-3">
          <span className="brass-rule" aria-hidden />
          <span className="block mt-2 text-[13px] text-ink-soft leading-snug">
            {caption}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
