"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Room } from "@/components/rooms/RoomShowcase";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SITE } from "@/lib/site";

export function RoomCarousel({ rooms }: { rooms: readonly Room[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const index = Math.round(scrollLeft / clientWidth);
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scrollTo = (index: number) => {
        if (scrollContainerRef.current) {
            const clientWidth = scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollTo({ left: clientWidth * index, behavior: "smooth" });
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (direction === "left" && activeIndex > 0) {
            scrollTo(activeIndex - 1);
        } else if (direction === "right" && activeIndex < rooms.length - 1) {
            scrollTo(activeIndex + 1);
        }
    };

    return (
        <div className="relative w-full bg-paper lg:bg-transparent">
            {/* Carousel Container */}
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full h-[85vh] lg:h-[80vh]"
            >
                {rooms.map((room, index) => (
                    <div key={room.slug} className="w-full h-full shrink-0 snap-center relative flex flex-col lg:flex-row">
                        
                        {/* =========================================
                            MOBILE LAYOUT: Background Image + Card Overlay
                            ========================================= */}
                        <div className="flex lg:hidden absolute inset-0 w-full h-full z-0">
                            <Link href={`/rooms/${room.slug}`} className="absolute inset-0">
                                <Image
                                    src={room.image.src}
                                    alt={room.image.alt}
                                    fill
                                    sizes="(min-width: 1024px) 0px, 100vw"
                                    priority={index === 0}
                                    className="object-cover"
                                />
                            </Link>
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent pointer-events-none" />
                        </div>

                        <div className="lg:hidden relative z-10 flex flex-col justify-end w-full h-full pb-12 pt-[40vh] px-4 sm:px-8">
                            <div className="bg-paper p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.15)] rounded-[4px] border border-stone-100 relative">
                                <div className="mb-4">
                                    <span className="font-display italic text-[48px] sm:text-[56px] leading-[0.8] text-stone-300/80">
                                        {room.index}
                                    </span>
                                </div>
                                <h3 className="font-display text-[24px] sm:text-[28px] leading-[1.15] text-ink hover:text-brass transition-colors">
                                    <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
                                </h3>
                                <p className="mt-2 text-[13px] text-stone-500">{room.size}</p>
                                <p className="mt-3 text-[15px] sm:text-[16px] font-medium text-ink leading-[1.5]">
                                    {room.short}
                                </p>
                                <p className="mt-2 text-[14px] sm:text-[15px] text-ink-soft leading-[1.65]">
                                    {room.description}
                                </p>
                                <ul className="mt-5 space-y-2 text-[14px] sm:text-[15px] text-ink-soft">
                                    {room.features.slice(0, 3).map((f) => (
                                        <li key={f} className="flex gap-3">
                                            <span className="mt-2.5 inline-block w-3 h-px bg-brass shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 flex flex-col gap-3">
                                    <Link
                                        href={`/rooms/${room.slug}`}
                                        className="inline-flex items-center justify-center px-7 py-3.5 bg-ink text-paper text-[14px] font-medium tracking-wide rounded-[2px] hover:bg-brass-deep transition-colors shadow-sm w-full"
                                    >
                                        See {room.name.toLowerCase()}
                                    </Link>
                                    <a
                                        href={SITE.phone.tel}
                                        className="inline-flex items-center justify-center px-7 py-3.5 border border-stone-200 bg-paper text-ink text-[14px] font-medium tracking-wide rounded-[2px] hover:border-ink hover:bg-stone-50 transition-all shadow-sm w-full"
                                    >
                                        Call front desk
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* =========================================
                            DESKTOP LAYOUT: Side-by-Side (Text Left, Image Right)
                            ========================================= */}
                        <div className="hidden lg:flex w-full h-full container-page">
                            {/* LEFT COLUMN: Text Details */}
                            <div className="w-1/2 flex flex-col justify-center pr-12 xl:pr-16 h-full py-16">
                                <div className="mb-4 sm:mb-6">
                                    <span className="font-display italic text-[56px] sm:text-[72px] lg:text-[88px] leading-[0.8] text-stone-300/60">
                                        {room.index}
                                    </span>
                                </div>
                                <h3 className="font-display text-[24px] sm:text-[26px] lg:text-[32px] leading-[1.15] text-ink hover:text-brass transition-colors">
                                    <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
                                </h3>
                                <p className="mt-2 text-[13px] text-stone-500">{room.size}</p>
                                <p className="mt-4 text-[15px] sm:text-[16px] font-medium text-ink leading-[1.5] max-w-[44ch]">
                                    {room.short}
                                </p>
                                <p className="mt-2 text-[14px] sm:text-[15px] text-ink-soft leading-[1.65] max-w-[44ch]">
                                    {room.description}
                                </p>
                                <ul className="mt-5 sm:mt-6 space-y-2 text-[14px] sm:text-[15px] text-ink-soft max-w-[44ch]">
                                    {room.features.slice(0, 3).map((f) => (
                                        <li key={f} className="flex gap-3">
                                            <span className="mt-3 inline-block w-3 h-px bg-brass shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 flex flex-wrap gap-4 items-center">
                                    <Link
                                        href={`/rooms/${room.slug}`}
                                        className="inline-flex items-center justify-center px-7 py-3.5 border border-transparent bg-ink text-paper text-[14px] font-medium tracking-wide rounded-sm hover:bg-brass-deep transition-colors shadow-sm"
                                    >
                                        See {room.name.toLowerCase()}
                                    </Link>
                                    <a
                                        href={SITE.phone.tel}
                                        className="inline-flex items-center justify-center px-7 py-3.5 border border-stone-200 bg-paper text-ink text-[14px] font-medium tracking-wide rounded-sm hover:border-ink hover:bg-stone-50 transition-all shadow-sm"
                                    >
                                        Call front desk
                                    </a>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Image */}
                            <div className="w-1/2 h-full py-12 pl-12 xl:pl-20 flex items-center justify-center pointer-events-none">
                                <Link
                                    href={`/rooms/${room.slug}`}
                                    className="relative w-full aspect-[4/5] xl:aspect-[5/4] max-h-full overflow-hidden bg-parchment shadow-sm block pointer-events-auto hover:opacity-95 transition-opacity duration-300"
                                >
                                    <Image
                                        src={room.image.src}
                                        alt={room.image.alt}
                                        fill
                                        sizes="50vw"
                                        priority={index === 0}
                                        className="object-cover"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Overlays */}
            
            {/* Desktop Arrows */}
            <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-4 right-4 justify-between pointer-events-none z-20">
                <button
                    onClick={() => scroll("left")}
                    disabled={activeIndex === 0}
                    className="w-12 h-12 rounded-full border border-stone-200 bg-paper/80 backdrop-blur-sm flex items-center justify-center text-ink hover:bg-paper hover:border-stone-300 disabled:opacity-0 disabled:cursor-not-allowed transition-all pointer-events-auto shadow-sm ml-4"
                    aria-label="Previous room"
                >
                    <ChevronLeft size={24} strokeWidth={1.5} />
                </button>
                <button
                    onClick={() => scroll("right")}
                    disabled={activeIndex === rooms.length - 1}
                    className="w-12 h-12 rounded-full border border-stone-200 bg-paper/80 backdrop-blur-sm flex items-center justify-center text-ink hover:bg-paper hover:border-stone-300 disabled:opacity-0 disabled:cursor-not-allowed transition-all pointer-events-auto shadow-sm mr-4"
                    aria-label="Next room"
                >
                    <ChevronRight size={24} strokeWidth={1.5} />
                </button>
            </div>

            {/* Dots Indicator (Mobile & Desktop) */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
                {rooms.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`transition-all duration-300 ${
                            activeIndex === index 
                                ? "w-8 h-1.5 bg-brass rounded-full" 
                                : "w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400 rounded-full"
                        }`}
                        aria-label={`Go to room ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
