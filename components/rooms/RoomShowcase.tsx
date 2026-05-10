"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SITE, whatsappHref } from "@/lib/site";

export type Room = {
    name: string;
    slug: string;
    index: string;
    size: string;
    short: string;
    description: string;
    features: readonly string[];
    image: { src: string; alt: string };
    images?: readonly { src: string; alt: string }[];
};

export function RoomShowcase({ rooms, isRoomsPage = false }: { rooms: readonly Room[], isRoomsPage?: boolean }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative w-full bg-paper lg:bg-transparent">
            {/* =========================================
                MOBILE LAYOUT: Simplified Stack with Image Carousel
                ========================================= */}
            <div className="flex lg:hidden flex-col w-full bg-paper pt-12 pb-24 gap-12 sm:gap-16">
                {rooms.map((room, index) => (
                    <RoomBlockMobile
                        key={room.slug}
                        room={room}
                        index={index}
                        onInView={() => setActiveIndex(index)}
                        isRoomsPage={isRoomsPage}
                    />
                ))}
            </div>

            {/* =========================================
                DESKTOP LAYOUT: Side-by-Side Scrolling
                ========================================= */}
            <div className="hidden lg:flex container-page flex-row relative z-10 bg-paper">

                {/* LEFT COLUMN: Added pb-[30vh] so the user can scroll the last item into the center of the screen before the section unsticks */}
                <div className="w-1/2 flex flex-col pt-12 pb-[30vh] lg:pt-24 pr-12 xl:pr-16">
                    {rooms.map((room, index) => (
                        <RoomBlockDesktop
                            key={room.slug}
                            room={room}
                            index={index}
                            onInView={() => setActiveIndex(index)}
                            isRoomsPage={isRoomsPage}
                        />
                    ))}
                </div>

                {/* RIGHT COLUMN: Changed to h-screen and added pt-[80px] to offset your navbar. 
                    This ensures the flexbox perfectly centers the image in the visible screen space. */}
                <div className="hidden lg:flex w-1/2 h-screen sticky top-0 pt-[80px] pb-12 pl-12 xl:pl-20 flex-col justify-center pointer-events-none">

                    {/* Constrained max-height to 75vh so it never hits the top/bottom edges of the screen */}
                    <div className="relative w-full aspect-[4/5] xl:aspect-[5/4] max-h-[75vh] overflow-hidden bg-parchment rounded-[4px] shadow-sm">
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0"
                            >
                                <Link href={`/rooms/${rooms[activeIndex].slug}`} className="absolute inset-0 block pointer-events-auto hover:opacity-95 transition-opacity duration-300">
                                    <Image
                                        src={rooms[activeIndex].image.src}
                                        alt={rooms[activeIndex].image.alt}
                                        fill
                                        sizes="50vw"
                                        priority
                                        className="object-cover"
                                    />
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RoomBlockMobile({
    room,
    index: _index,
    onInView,
    isRoomsPage
}: {
    room: Room & { images?: readonly { src: string; alt: string }[] };
    index: number;
    onInView: () => void;
    isRoomsPage: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            onInView();
        }
    }, [isInView, onInView]);

    const images = 'images' in room && Array.isArray(room.images) ? room.images : [room.image];

    return (
        <div ref={ref} className="w-full px-4 sm:px-8">
            <div className="bg-paper shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-[4px] border border-stone-100 relative overflow-hidden flex flex-col">

                {/* Image Carousel (Top) */}
                <div className="relative w-full aspect-[4/3] bg-parchment overflow-hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full h-full">
                        {images.map((img, i) => (
                            <Link key={i} href={`/rooms/${room.slug}`} className="w-full h-full shrink-0 snap-center relative block">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 80vw"
                                    className="object-cover"
                                />
                            </Link>
                        ))}
                    </div>
                    {/* Dots indicator if more than one image */}
                    {images.length > 1 && (
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none z-10">
                            {images.map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-paper/60 backdrop-blur-sm" />
                            ))}
                        </div>
                    )}
                </div>

                {/* Text Content (Bottom) */}
                <div className="p-6 sm:p-8">
                    <div className="mb-4">
                        <span className="font-display italic text-[40px] sm:text-[48px] leading-[0.8] text-stone-300/80">
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

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                        <Link
                            href={`/rooms/${room.slug}`}
                            className="inline-flex items-center justify-center px-7 py-3.5 border border-transparent bg-ink text-paper text-[14px] font-medium tracking-wide rounded-[2px] hover:bg-brass-deep transition-colors shadow-sm w-full sm:w-auto"
                        >
                            {isRoomsPage ? "View this room" : `See ${room.name.toLowerCase()}`}
                        </Link>
                        {isRoomsPage && (
                            <a
                                href={SITE.phone.tel}
                                className="inline-flex items-center justify-center px-7 py-3.5 border border-stone-200 bg-paper text-ink text-[14px] font-medium tracking-wide rounded-[2px] hover:border-ink hover:bg-stone-50 transition-all shadow-sm w-full sm:w-auto"
                            >
                                Call front desk
                            </a>
                        )}
                    </div>
                    {isRoomsPage && (
                        <a
                            href={whatsappHref()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] text-white text-[14px] font-medium tracking-wide rounded-[2px] hover:bg-[#1ebe5d] transition-colors shadow-sm w-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4 fill-white shrink-0" aria-hidden><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.795 1.23 1.82 2.508 3.41 4.5 4.402.616.287 2.137.844 2.81.844.36 0 .547-.057.806-.188.616-.31.997-.687 1.082-1.318a.7.7 0 00.07-.357c0-.286-2.094-1.218-2.434-1.218zm-2.97-15.205C9.42 2 4 7.42 4 14.14c0 2.286.626 4.5 1.808 6.43L4 28l7.59-1.99c1.852.98 3.93 1.51 6.04 1.51 6.72 0 12.14-5.42 12.14-12.14C29.77 8.66 24.35 3.24 17.63 3.24z"/></svg>
                            WhatsApp us
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

function RoomBlockDesktop({
    room,
    index: _index,
    onInView,
    isRoomsPage
}: {
    room: Room;
    index: number;
    onInView: () => void;
    isRoomsPage: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

    useEffect(() => {
        if (isInView) {
            onInView();
        }
    }, [isInView, onInView]);

    return (
        <div
            ref={ref}
            className="flex flex-col justify-center min-h-[60vh] lg:min-h-[80vh] border-b border-stone-200/50 last:border-b-0 py-16 lg:py-16"
        >
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
                    {isRoomsPage ? "View this room" : `See ${room.name.toLowerCase()}`}
                </Link>
                <a
                    href={SITE.phone.tel}
                    className="inline-flex items-center justify-center px-7 py-3.5 border border-stone-200 bg-paper text-ink text-[14px] font-medium tracking-wide rounded-sm hover:border-ink hover:bg-stone-50 transition-all shadow-sm"
                >
                    Call front desk
                </a>
            </div>
            {isRoomsPage && (
                <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] text-white text-[14px] font-medium tracking-wide rounded-[2px] hover:bg-[#1ebe5d] transition-colors shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4 fill-white shrink-0" aria-hidden><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.795 1.23 1.82 2.508 3.41 4.5 4.402.616.287 2.137.844 2.81.844.36 0 .547-.057.806-.188.616-.31.997-.687 1.082-1.318a.7.7 0 00.07-.357c0-.286-2.094-1.218-2.434-1.218zm-2.97-15.205C9.42 2 4 7.42 4 14.14c0 2.286.626 4.5 1.808 6.43L4 28l7.59-1.99c1.852.98 3.93 1.51 6.04 1.51 6.72 0 12.14-5.42 12.14-12.14C29.77 8.66 24.35 3.24 17.63 3.24z"/></svg>
                    WhatsApp us
                </a>
            )}
        </div>
    );
}