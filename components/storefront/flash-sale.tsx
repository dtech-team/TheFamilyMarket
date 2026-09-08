import { Zap } from "lucide-react";
import { ProductCard } from "./product-card";
import { CountdownTimer } from "./countdown-timer";
import { getFlashSaleProducts } from "@/lib/services/product.service";

export async function FlashSale() {
  const { data: flashSaleProducts } = await getFlashSaleProducts(4);

  if (!flashSaleProducts || flashSaleProducts.length === 0) {
    return null;
  }

  return (
    <section className="relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/20 border border-red-200/50 dark:border-red-900/30 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-red-500 flex items-center justify-center shadow-md shadow-red-500/20">
            <Zap className="text-white fill-white size-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-amber-500">
              Flash Sale
            </h2>
            <p className="text-xs text-muted-foreground font-medium">Kết thúc vào cuối ngày</p>
          </div>
        </div>
        <div className="bg-background/90 backdrop-blur-xl px-4 py-2 rounded-xl shadow-sm border border-border/50">
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
