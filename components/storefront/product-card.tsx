import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

export interface ProductCardData {
  id: string;
  name: string;
  image_url?: string;
  price: number;
  discount_percent?: number | null;
  stock_quantity?: number | null;
  sold_count?: number | null;
  brand?: string | null;
  categories?: { name: string } | null;
  product_variants?: { name: string }[];
}

interface ProductCardProps {
  product: ProductCardData;
  rank?: number;
  isNew?: boolean;
}

export function ProductCard({ product, rank, isNew }: ProductCardProps) {
  const stock = product.stock_quantity || 0;
  const isOutOfStock = stock <= 0;
  const sold = product.sold_count || 0;
  const totalOriginalStock = stock + sold; // Assuming stock_quantity is current available stock
  const progress = totalOriginalStock > 0 ? Math.min(100, Math.round((sold / totalOriginalStock) * 100)) : 0;

  const hasDiscount = (product.discount_percent ?? 0) > 0;
  const originalPrice = product.price;
  const salePrice = hasDiscount
    ? Math.round(originalPrice * (1 - (product.discount_percent as number) / 100))
    : originalPrice;

  return (
    <div className={cn(
      "group border border-border/50 rounded-[24px] overflow-hidden cursor-pointer bg-card/80 backdrop-blur-xl transition-all duration-500 relative flex flex-col h-full",
      isOutOfStock 
        ? "hover:border-border transition-all" 
        : "hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:bg-card"
    )}>
      {hasDiscount && (
        <Badge className="absolute top-5 left-5 z-10 bg-red-600 hover:bg-red-700 text-white shadow-md border-none px-2.5 py-1 text-xs font-extrabold pointer-events-none">
          -{product.discount_percent}%
        </Badge>
      )}

      {/* Differentiate Best Sellers */}
      {rank && (
        <div className={cn(
          "absolute top-5 right-5 z-10 shadow-lg px-2.5 py-1 text-xs font-extrabold rounded-full pointer-events-none flex items-center gap-1 border",
          rank === 1 ? "bg-gradient-to-br from-orange-300 via-orange-400 to-red-400 text-white border-orange-200" :
          rank === 2 ? "bg-gradient-to-br from-green-300 via-green-400 to-green-500 text-white border-amber-200" :
          rank === 3 ? "bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white border-amber-200" :
          "bg-white dark:bg-zinc-800 text-foreground border-border"
        )}>
          TOP {rank}
        </div>
      )}

      {/* Differentiate New Arrivals */}
      {isNew && !rank && (
        <div className="absolute top-5 right-5 z-10 bg-blue-600/90 backdrop-blur-md text-white shadow-lg border-none px-2.5 py-1 text-xs font-extrabold rounded-full pointer-events-none animate-pulse">
          MỚI
        </div>
      )}
      
      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-secondary/10 m-3 rounded-[16px] block cursor-pointer group/image">
        <Image
          fill
          unoptimized
          alt={product.name}
          className={cn(
            "object-contain p-4 transition-all duration-500",
            isOutOfStock ? "opacity-40 group-hover/image:opacity-70" : "group-hover/image:scale-110"
          )}
          src={product.image_url || "/placeholder-image.jpg"}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
             <div className="border-[4px] border-red-600/80 text-red-600/80 px-4 py-2 rounded-md font-black text-xl  tracking-[0.15em] uppercase transform -rotate-[15deg] shadow-2xl bg-white/10 backdrop-blur-[1px]">
               Cháy hàng
             </div>
          </div>
        )}
      </Link>
      <div className="p-3 sm:p-4 pt-2 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`} className="flex flex-col gap-1 mb-2">
          <h3 className="font-bold text-[15px] sm:text-[17px] leading-snug text-foreground line-clamp-2 hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
          {product.brand && (
            <span className="text-primary/80 font-bold text-[10px] uppercase tracking-widest mt-0.5">
              {product.brand}
            </span>
          )}
        </Link>
        
        {/* Variants Section */}
        {product.product_variants && product.product_variants.length > 0 && (
          <div className="flex flex-nowrap gap-1.5 mb-2 mt-1">
            {product.product_variants.slice(0, 3).map((v, i) => (
              <span key={i} className="px-2 py-0.5 bg-secondary/40 border border-border text-[10px] font-semibold text-muted-foreground rounded-md truncate max-w-[80px] shadow-xs">
                {v.name}
              </span>
            ))}
            {product.product_variants.length > 3 && (
              <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-bold rounded-md shadow-sm">
                +{product.product_variants.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price & Stock Section */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn(
              "font-extrabold text-lg sm:text-xl leading-none",
              isOutOfStock ? "text-muted-foreground" : "text-red-600"
            )}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salePrice)}
            </span>
            {hasDiscount && (
              <span className="text-muted-foreground line-through text-[11px] sm:text-xs font-semibold leading-none mt-0.5">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice)}
              </span>
            )}
          </div>
          
          {sold === 0 && (
            <div className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground">
              {isOutOfStock ? (
                <span className="text-white bg-red-600 shadow-sm px-2 py-0.5 rounded-full font-bold">Hết hàng</span>
              ) : (
                <span>Còn {stock}</span>
              )}
            </div>
          )}
        </div>

        {/* Sold / Stock Progress Bar */}
        {sold > 0 && (
          <div className="mt-2 w-full">
            <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-semibold text-muted-foreground mb-1">
              <span>Đã bán {sold}</span>
              {isOutOfStock ? (
                <span className="text-white bg-red-600 shadow-sm px-2 py-0.5 rounded-full font-bold text-[10px]">Hết hàng</span>
              ) : (
                <span>Còn {stock}</span>
              )}
            </div>
            <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full relative" 
                style={{ width: `${progress}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[shimmer-sweep_1s_linear_infinite]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
