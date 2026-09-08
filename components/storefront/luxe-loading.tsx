"use client";

import Image from "next/image";
import React from "react";
import { siteConfig } from "@/lib/config";
import { BrandLogo } from "@/components/ui/brand-logo";

interface LuxeLoadingProps {
  label?: string;
  className?: string;
  mode?: "absolute" | "fixed" | "relative";
}

export function LuxeLoading({ 
  label = "Đang tải dữ liệu...", 
  className = "",
  mode = "fixed" 
}: LuxeLoadingProps) {
  const positionClasses = 
    mode === "absolute"
      ? "absolute inset-0 z-50 min-h-[60vh] flex flex-col items-center justify-center p-4 bg-background/60 dark:bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300"
      : mode === "fixed"
      ? "fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-background/60 dark:bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300"
      : "relative flex flex-col items-center justify-center py-20 px-4 min-h-[50vh]";

  return (
    <div className={`${positionClasses} space-y-2 ${className}`}>
      {/* Glowing Pedestal / Cosmic Logo Container */}
      <div className="relative flex items-center justify-center p-4">
        {/* Pulsing Outer Cosmic Ring */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 blur-xl animate-pulse duration-[2500ms]" />
        
        {/* Spinning Gradient Border */}
        {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary via-accent to-secondary opacity-60 blur-sm -z-10" /> */}

        {/* Brand Logo & Shimmering Aura */}
        <div className="relative bg-card/80 dark:bg-slate-950/80 backdrop-blur-md px-8 py-5 rounded-2xl border border-primary/30 flex flex-col items-center gap-3.5 animate-luxe-float" style={{ boxShadow: "0 0 30px oklch(var(--primary) / 0.25)" }}>
          <div className="relative">
            {/* <div className="absolute -inset-1.5 rounded-lg bg-gradient-to-r from-primary via-accent to-primary blur-lg opacity-70 animate-pulse" /> */}
            <Image src="/icons/logo.png" alt={siteConfig.name} width={52} height={52} className="relative drop-shadow-md" />
          </div>

          {/* Shimmering Brand Name */}
          <BrandLogo className="text-3xl font-black" />
        </div>
      </div>

      {/* Loading Text Label & Pulsing Dots */}
      <div className="flex flex-col items-center space-y-4 text-center">
        <p className="text-sm font-semibold tracking-wide uppercase bg-gradient-to-r from-primary via-accent-foreground to-primary dark:from-primary dark:via-accent-foreground dark:to-primary bg-clip-text text-transparent animate-pulse">
          {label}
        </p>
        
        {/* Hiệu ứng xoay vòng kép ánh kim Luxe (Theme Dependent) */}
        <div className="relative flex items-center justify-center w-16 h-16">
          {/* Vòng xoay ngoài cùng */}
          <div className="absolute inset-0 rounded-full border-[3px] border-primary/20 border-t-primary border-r-secondary-foreground animate-spin" style={{ boxShadow: "0 0 12px oklch(var(--primary) / 0.35)" }} />
          {/* Vòng xoay ngược chiều phía trong */}
          <div className="absolute inset-2 rounded-full border-[2.5px] border-secondary-foreground/20 border-b-secondary-foreground border-l-primary animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
          {/* Lõi ánh sáng nhấp nháy ở giữa */}
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-primary to-accent-foreground animate-pulse" style={{ boxShadow: "0 0 10px oklch(var(--primary) / 0.9)" }} />
        </div>
      </div>
    </div>
  );
}
