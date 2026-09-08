"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PromoBanner } from "@/lib/services/banner.service";

interface HeroBannerClientProps {
  initialBanners: PromoBanner[];
}

export function HeroBannerClient({ initialBanners }: HeroBannerClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const activeBanners = initialBanners || [];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto slide rotation
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeBanners.length]);

  const safeIndex = currentIndex < activeBanners.length ? currentIndex : 0;
  const currentBanner = activeBanners[safeIndex];
  if (!currentBanner) return null;

  return (
    <section className="relative w-full aspect-[2/1] md:aspect-[3/1]  rounded-2xl overflow-hidden bg-secondary select-none group shadow-sm border border-border/30">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {activeBanners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === safeIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {banner.link_url ? (
              <Link href={banner.link_url} className="block absolute inset-0">
                <Image
                  fill
                  unoptimized
                  priority={idx === 0}
                  alt={banner.title}
                  className={`object-cover object-center transform transition-all duration-[8000ms] ease-out ${
                    mounted && idx === safeIndex ? "scale-105" : "scale-100"
                  }`}
                  src={banner.image_url}
                />
              </Link>
            ) : (
              <Image
                fill
                unoptimized
                priority={idx === 0}
                alt={banner.title}
                className={`object-cover object-center transform transition-all duration-[8000ms] ease-out ${
                  mounted && idx === safeIndex ? "scale-105" : "scale-100"
                }`}
                src={banner.image_url}
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length)}
            aria-label="Previous Slide"
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 size-9 sm:size-10 rounded-full bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/70 text-foreground flex items-center justify-center backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 shadow-md"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % activeBanners.length)}
            aria-label="Next Slide"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 size-9 sm:size-10 rounded-full bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/70 text-foreground flex items-center justify-center backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 shadow-md"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {/* Carousel Indicators */}
      {activeBanners.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {activeBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? "w-8 bg-primary shadow-md"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
