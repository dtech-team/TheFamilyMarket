import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export const brandStyles = {
  container: "flex items-center tracking-tight truncate",
  primaryText: "bg-gradient-to-r from-green-600 via-emerald-500 to-teal-400 dark:from-green-400 dark:via-emerald-300 dark:to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(34,197,94,0.45)]",
  secondaryText: "ml-0.5 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-800 dark:from-slate-100 dark:via-white dark:to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] truncate"
};

export function BrandLogo({ 
  className, 
  animated = true 
}: { 
  className?: string;
  animated?: boolean;
}) {
  return (
    <span className={cn(brandStyles.container, className)}>
      <span className={cn(brandStyles.primaryText, animated && "animate-shimmer-metallic")}>
        {siteConfig.shortName}
      </span>
      <span className={brandStyles.secondaryText}>
        market
      </span>
    </span>
  );
}
