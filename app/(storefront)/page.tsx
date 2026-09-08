import { HeroBanner } from "@/components/storefront/hero-banner";
import { FlashSale } from "@/components/storefront/flash-sale";
import { NewArrivals } from "@/components/storefront/new-arrivals";
import { HomeCategorySidebar } from "@/components/storefront/home-category-sidebar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function StorefrontHomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 lg:py-6">
      <div className="flex gap-6 items-start">
        {/* Left: Category Sidebar (Desktop only, sticky) */}
        <HomeCategorySidebar />

        {/* Right: Main Content */}
        <div className="flex-1 min-w-0 space-y-8">
          <HeroBanner />
          <FlashSale />
          <NewArrivals />
        </div>
      </div>
    </div>
  );
}
