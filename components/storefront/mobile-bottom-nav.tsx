"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthModal } from "@/lib/store/use-auth-modal";
import { useAuth } from "@/components/providers/auth-provider";

const navItems = [
  {
    label: "Trang chủ",
    href: "/",
    icon: Home,
    matchExact: true,
  },
  {
    label: "Yêu thích",
    href: "/account/wishlist",
    icon: Heart,
    matchExact: false,
    requireAuth: true,
  },
  {
    label: "Sản phẩm",
    href: "/products",
    icon: ShoppingBag,
    matchExact: true,
  },
  {
    label: "Đơn hàng",
    href: "/account/orders",
    icon: ShoppingCart,
    matchExact: false,
  },
  {
    label: "Tài khoản",
    href: "/account",
    icon: User,
    matchExact: false,
    requireAuth: true,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { openModal } = useAuthModal();

  const activeItem = navItems.reduce((best, current) => {
    if (current.matchExact) {
      if (pathname === current.href) return current;
    } else {
      if (pathname.startsWith(current.href)) {
        if (!best || current.href.length > best.href.length) {
          return current;
        }
      }
    }
    return best;
  }, null as typeof navItems[0] | null);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/70 backdrop-blur-xl border-t border-border/60 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] safe-area-bottom">
      <div className="flex items-stretch justify-between w-full max-w-md sm:max-w-2xl md:max-w-3xl mx-auto">
        {navItems.map((item) => {
          const active = activeItem?.href === item.href;
          const Icon = item.icon;

          const handleClick = (e: React.MouseEvent) => {
            if (item.requireAuth && !user) {
              e.preventDefault();
              openModal("login");
            }
          };

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleClick}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[64px] transition-colors relative",
                active
                  ? "text-primary bg-primary/10"
                  : "text-black "
              )}
            >
              {/* Active indicator line */}
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-primary rounded-full" />
              )}
              <Icon
                className={cn(
                  "size-5 transition-all",
                  active ? "stroke-[3]" : "stroke-[2]"
                )}
              />
              <span
                className={cn(
                  "text-[10px] leading-tight",
                  active ? "font-black" : "font-bold"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
