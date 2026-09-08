import { HeroBanner } from "@/components/storefront/hero-banner";
import { FlashSale } from "@/components/storefront/flash-sale";
import { NewArrivals } from "@/components/storefront/new-arrivals";
import { HomeCategorySidebar } from "@/components/storefront/home-category-sidebar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function StorefrontHomePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4 lg:py-6 space-y-8">
      {/* Top row: Sidebar + Banner */}
      <div className="flex gap-4 lg:gap-6 items-stretch ">
        <HomeCategorySidebar />
        <div className="flex-1 min-w-0 flex flex-col ">
          <HeroBanner />
        </div>
      </div>

      {/* Below rows */}
      <div className="space-y-8">
        <FlashSale />
        <NewArrivals />
      </div>
    </div>
  );
}
