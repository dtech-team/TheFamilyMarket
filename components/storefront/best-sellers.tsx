import { getBestSellers } from "@/lib/services/product.service";
import { ProductCard } from "@/components/storefront/product-card";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import Image from "next/image";

export async function BestSellers() {
  const { data: products } = await getBestSellers(8);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-inner relative overflow-hidden shrink-0 group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image src="/icons/best-selling.png" alt="Best Seller" width={50} height={50} className="object-contain animate-pulse" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground drop-shadow-sm">
              Sản phẩm Bán chạy
            </h2>
            <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500/60 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              Được yêu thích và chọn mua nhiều nhất
            </p>
          </div>
        </div>
        <Link
          href="/products?sort=sales_desc"
          className="group hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500/10 hover:bg-orange-500 hover:text-white text-sm font-bold text-orange-600 transition-all duration-300 shadow-sm shrink-0 active:scale-95"
        >
          Xem tất cả <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} rank={index + 1} />
        ))}
      </div>

      {/* Mobile "View All" link */}
      <div className="sm:hidden mt-4 text-center">
        <Link
          href="/products?sort=sales_desc"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-orange-500/10 hover:bg-orange-500 hover:text-white text-sm font-bold text-orange-600 transition-all duration-300 w-full"
        >
          Xem tất cả <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
