import { getProduct } from "@/lib/services/product.service";
import { ProductCard } from "@/components/storefront/product-card";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import Image from "next/image";

export async function NewArrivals() {
  const { data: products } = await getProduct(undefined, 1, 8);

  if (!products || products.length === 0) return null;

  return (
    <section className="relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4 border-b-3 border-border/50 pb-5">
        <div className="flex items-center gap-4">
          <div className="relative size-12 sm:size-14 rounded-2xl border-2 border-primary flex items-center justify-center shadow-inner overflow-hidden group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image src="/icons/product1.png" alt="Product" width={32} height={32} className="relative z-10 animate-[pulse_0.8s_ease-in-out_infinite]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground drop-shadow-sm">
              Sản phẩm Mới nhất
            </h2>
            <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              Cập nhật thực phẩm tươi nhanh và chất lượng nhất
            </p>
          </div>
        </div>
        <Link
          href="/products"
          className="group hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-sm font-bold text-primary transition-all duration-300 shadow-sm shrink-0 active:scale-95"
        >
          Xem tất cả <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile "View All" link */}
      <div className="sm:hidden mt-4 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Xem tất cả sản phẩm <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
