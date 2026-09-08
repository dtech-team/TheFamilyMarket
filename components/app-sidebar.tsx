"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconCamera,
  IconChartBar, IconCircle,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconTags,
  IconUsers,
  IconPhoto,
  IconTicket,
  IconHome,
  IconBell
} from "@tabler/icons-react";

import { siteConfig } from "@/lib/config";
import { BrandLogo } from "@/components/ui/brand-logo";
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "./providers/auth-provider";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, profile, role } = useAuth();

  const navItems = role === "admin"
    ? [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
      { title: "Users", url: "/dashboard/users", icon: IconUsers },
      // { title: "Roles", url: "/dashboard/roles", icon: IconListDetails },
      { title: "Categories", url: "/dashboard/categories", icon: IconTags },
      { title: "Products", url: "/dashboard/products", icon: IconFolder },
      { title: "Orders", url: "/dashboard/orders", icon: IconListDetails },
      { title: "Coupons", url: "/dashboard/coupons", icon: IconTicket },
      { title: "Banners", url: "/dashboard/promo-banners", icon: IconPhoto },
    ]
    : [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
      { title: "Orders", url: "/dashboard/orders", icon: IconListDetails },
      { title: "Products", url: "/dashboard/products", icon: IconFolder },
      { title: "Categories", url: "/dashboard/categories", icon: IconTags },
      { title: "Coupons", url: "/dashboard/coupons", icon: IconTicket },
      { title: "Banners", url: "/dashboard/promo-banners", icon: IconPhoto },
      { title: "Customers", url: "/dashboard/users", icon: IconUsers },
    ];

  const userData = {
    name: profile?.full_name || user?.user_metadata?.full_name || "Quản trị viên",
    email: user?.email || "",
    avatar: profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "",
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 shadow-sm" {...props}>
      <SidebarHeader className="pt-2 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-transparent !h-auto"
            >
              <Link href="/dashboard" className="flex items-center gap-3 group">
                <div className="relative shrink-0 flex items-center justify-center">
                  <Image src="/icons/logo.png" alt="Logo" width={28} height={28} className="relative size-7 group-data-[collapsible=icon]:size-6 transition-all duration-300" />
                </div>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                  <span className="flex items-center">
                    <BrandLogo animated={false} className="text-[19px] font-black tracking-tighter" />  <Image src="/icons/star.png" alt="Star" width={16} height={16} className="ml-1 animate__animated animate__flash animate__infinite shrink-0" />
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{role === 'admin' ? 'Administrator' : 'Staff'}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className=" py-2 gap-2">
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter className=" border-t border-border/40">
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
