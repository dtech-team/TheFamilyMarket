import { Zap } from "lucide-react";
import { ProductCard } from "./product-card";
import { CountdownTimer } from "./countdown-timer";
import { getFlashSaleProducts } from "@/lib/services/product.service";
import Image from "next/image";

export async function FlashSale() {
  const { data: flashSaleProducts } = await getFlashSaleProducts(4);

  if (!flashSaleProducts || flashSaleProducts.length === 0) {
    return null;
  }

  return (
    <section className="relative">
      {/* Header */}
      <div className="relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-5 bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 rounded-2xl p-5 sm:p-6 shadow-lg shadow-red-500/20">
        
        {/* Decorative background patterns */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-black/10 blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="size-20 rounded-[14px] bg-white flex items-center justify-center shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image unoptimized src="/icons/flashsale.png" alt="Flash Sale" width={50} height={50} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl sm:text-4xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-300 to-yellow-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
              FLASH SALE
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
              </span>
              <p className="text-[11px] sm:text-xs text-yellow-50 font-bold uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Đang diễn ra • Giờ vàng chốt đơn</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 bg-background/95 backdrop-blur-xl px-5 py-3 rounded-xl shadow-md border border-white/20 w-full sm:w-auto">
          <CountdownTimer />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {flashSaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
