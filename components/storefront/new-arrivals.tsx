import { getProduct } from "@/lib/services/product.service";
import { ProductCard } from "@/components/storefront/product-card";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

export async function NewArrivals() {
  const { data: products } = await getProduct(undefined, 1, 8);

  if (!products || products.length === 0) return null;

  return (
    <section className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              Sản phẩm Mới nhất
            </h2>
            <p className="text-xs text-muted-foreground font-medium">Cập nhật xu hướng mới nhất</p>
          </div>
        </div>
        <Link
          href="/products"
          className="group hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline shrink-0"
        >
          Xem tất cả <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
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
