"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ImageItem {
  id: string;
  image_url: string;
}

interface ProductGalleryProps {
  images: ImageItem[];
  productName: string;
  discountPercent?: number | null;
}

export function ProductGallery({ images, productName, discountPercent }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasDiscount = (discountPercent ?? 0) > 0;

  if (!images || images.length === 0) {
    return (
      <div className="relative rounded-[24px] overflow-hidden border border-border/50 bg-card/80 backdrop-blur-xl group aspect-square flex items-center justify-center shadow-sm">
        {hasDiscount && (
          <Badge className="absolute top-5 left-5 z-10 bg-red-600 hover:bg-red-700 pointer-events-none text-white font-extrabold px-3 py-1 text-sm shadow-md border-none">
            -{discountPercent}%
          </Badge>
        )}
        <Image
          fill
          unoptimized
          alt={productName}
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
          src="/placeholder-image.jpg"
        />
      </div>
    );
  }

  const mainImage = images[activeIndex];

  return (
    <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:h-[450px] lg:h-[550px] xl:h-[600px]">
      {/* Thumbnails (Horizontal on mobile, Vertical on md+) */}
      {images.length > 1 && (
        <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-3 overflow-x-auto md:overflow-y-auto hide-scrollbar pb-1 md:pb-0 md:pr-1 shrink-0 md:w-[80px] lg:w-[100px] order-2 md:order-1">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-full md:h-[80px] lg:h-[100px] rounded-[16px] overflow-hidden border-2 transition-all duration-300 relative bg-card/60 backdrop-blur-md",
                activeIndex === index
                  ? "border-primary shadow-md ring-2 ring-primary/20 scale-100"
                  : "border-transparent hover:border-border/80 hover:bg-card/80 opacity-70 hover:opacity-100"
              )}
            >
              <Image
                fill
                unoptimized
                alt={`${productName} thumbnail ${index + 1}`}
                className="object-contain p-1.5"
                src={image.image_url}
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="relative flex-1 rounded-[24px] md:rounded-[32px] overflow-hidden border border-border/50 bg-card/80 backdrop-blur-xl group flex items-center justify-center shadow-sm order-1 md:order-2 aspect-square md:aspect-auto">
        {hasDiscount && (
          <Badge className="absolute top-5 left-5 z-10 bg-red-600 hover:bg-red-700 pointer-events-none text-white font-extrabold px-3 py-1 text-sm shadow-md border-none">
            -{discountPercent}%
          </Badge>
        )}
        <Image
          fill
          unoptimized
          alt={productName}
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          src={mainImage.image_url}
        />
      </div>
    </div>
  );
}
