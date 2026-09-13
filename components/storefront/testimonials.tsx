"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, BadgeCheck, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReviewProps {
  id: string | number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  timeAgo: string;
  product: string;
  productId?: string;
  productImage: string;
}

const ReviewCard = ({ review }: { review: ReviewProps }) => (
  <div className="w-[350px] md:w-[420px] h-full flex flex-col flex-shrink-0 mx-3 p-6 rounded-3xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative overflow-hidden group hover:border-primary hover:ring-1 hover:ring-primary transition-all duration-300">

    {/* Decorative quote icon */}
    <div className="absolute -top-4 -right-4 text-primary/10 dark:text-primary/5 rotate-12  transition-transform duration-500">
      <Image
        width={80}
        height={80}
        alt="decorate"
        src="/icons/decorate.png"
      />
    </div>

    {/* Header: User Info */}
    <div className="flex items-center gap-4 mb-4 relative z-10">
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/80 p-0.5">
          <Image
            src={review.avatar}
            alt={review.name}
            width={48}
            height={48}
            className="rounded-full object-cover w-full h-full"
            unoptimized
            onError={(e) => {
              // Fallback to initial
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`;
            }}
          />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-[2px]">
          <Image
            width={20}
            height={20}
            alt="verified"
            src="/icons/check.png"
          />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-[15px] text-foreground leading-tight flex items-center gap-1.5">
          {review.name}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5",
                  i < review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground"
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">• {review.timeAgo}</span>
        </div>
      </div>
    </div>

    {/* Review Text */}
    <p className="text-sm text-foreground/80 leading-relaxed mb-5 relative z-10 line-clamp-3">
      "{review.text}"
    </p>

    {/* Purchased Product Tag */}
    {review.productId ? (
      <Link href={`/product/${review.productId}`} className="mt-auto flex items-center gap-2.5 p-2 rounded-xl bg-muted/50 border border-border/50 shadow-md relative z-10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors cursor-pointer hover:bg-primary/5 hover:border-primary/30 group/link">
        <div className="w-9 h-9 rounded-lg bg-background overflow-hidden shrink-0">
          <Image
            src={review.productImage}
            alt={review.product}
            width={36}
            height={36}
            className="w-full h-full object-cover group-hover/link:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Đã mua</span>
          <span className="text-xs font-bold text-foreground truncate group-hover/link:text-primary transition-colors">{review.product}</span>
        </div>
      </Link>
    ) : (
      <div className="mt-auto flex items-center gap-2.5 p-2 rounded-xl bg-muted/50 border border-border/50 shadow-md relative z-10">
        <div className="w-9 h-9 rounded-lg bg-background overflow-hidden shrink-0">
          <Image
            src={review.productImage}
            alt={review.product}
            width={36}
            height={36}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Đã mua</span>
          <span className="text-xs font-bold text-foreground truncate">{review.product}</span>
        </div>
      </div>
    )}
  </div>
);

export function TestimonialsSection({ testimonials }: { testimonials: ReviewProps[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Decorators - made more vibrant for Glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary/20 dark:bg-primary/20 blur-[80px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-amber-500/20 dark:bg-amber-500/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-emerald-400/10 dark:bg-emerald-400/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 mb-12 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary border-2 border-primary/80 shadow-md">
            <Image
              unoptimized
              src="/icons/star1.png"
              alt="decorate"
              width={20}
              height={20}
            />
            <span className="text-xs font-bold uppercase tracking-widest">Góc Đánh Giá</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Khách hàng nói gì <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">về chúng tôi</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-[15px] md:text-base leading-relaxed">
            Hàng ngàn gia đình đã tin tưởng và lựa chọn The Family Market làm người bạn đồng hành cho mỗi bữa ăn. Hãy xem họ nói gì về trải nghiệm mua sắm tại đây!
          </p>
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full flex overflow-hidden py-4 -mx-4 px-4 sm:mx-0 sm:px-0 pause-marquee">
        {/* Left/Right Fading Gradients for smooth entrance/exit */}
        <div className="absolute top-0 left-0 w-12 md:w-32 h-full bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 md:w-32 h-full bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        {/* First Set */}
        <div className="flex shrink-0 animate-marquee">
          {testimonials.map((review, idx) => (
            <ReviewCard key={`set1-${review.id}-${idx}`} review={review} />
          ))}
        </div>

        {/* Second Set (Clone for seamless loop) */}
        <div className="flex shrink-0 animate-marquee" aria-hidden="true">
          {testimonials.map((review, idx) => (
            <ReviewCard key={`set2-${review.id}-${idx}`} review={review} />
          ))}
        </div>

        {/* Third Set (Extra clone just in case screen is ultra wide and items are few) */}
        <div className="flex shrink-0 animate-marquee" aria-hidden="true">
          {testimonials.map((review, idx) => (
            <ReviewCard key={`set3-${review.id}-${idx}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
