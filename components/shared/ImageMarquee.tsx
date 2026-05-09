"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Props = {
  images: string[];
};

export function ImageMarquee({ images }: Props) {
  const reduce = useReducedMotion();

  if (!images || images.length === 0) return null;

  // Duplicate the images enough times so that half the array spans wider than the screen
  // 4 times is a safe bet for a smooth infinite loop when we animate to -50%
  const duplicated = [...images, ...images, ...images, ...images];

  return (
    <div className="relative w-full overflow-hidden flex py-10 lg:py-20 bg-parchment border-y border-stone-100">
      <div className="absolute top-0 left-0 bottom-0 w-20 lg:w-40 bg-gradient-to-r from-parchment to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-20 lg:w-40 bg-gradient-to-l from-parchment to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex gap-4 sm:gap-6 px-2 sm:px-3"
        animate={reduce ? {} : { x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: Math.max(30, images.length * 10),
        }}
      >
        {duplicated.map((src, i) => (
          <div
            key={i}
            className="relative h-48 sm:h-72 lg:h-96 aspect-[4/3] shrink-0 overflow-hidden rounded-[2px]"
          >
            <Image
              src={src}
              alt={`Property gallery ${i}`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 80vw"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
