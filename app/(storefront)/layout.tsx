import { SiteHeader } from "@/components/storefront/site-header";
import { SiteFooter } from "@/components/storefront/site-footer";
import { AuthModal } from "@/components/auth/auth-modal";
import { MobileBottomNav } from "@/components/storefront/mobile-bottom-nav";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <SiteHeader />
      <main className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <SiteFooter />
      <AuthModal />
      <MobileBottomNav />
    </div>
  );
}
