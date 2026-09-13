import Link from "next/link";
import { CreditCard, FacebookIcon, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBrandInstagram } from "@tabler/icons-react";
import { siteConfig } from "@/lib/config";
import { BrandLogo } from "@/components/ui/brand-logo";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-card/80 backdrop-blur-xl border-t border-border/50 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 px-4 md:px-10 py-12 lg:py-16 max-w-7xl mx-auto w-full relative z-10">
        <div className="col-span-1">
          <Link href="/" className="group text-xl md:text-2xl font-black tracking-tighter inline-flex items-center gap-2.5 mb-6 transition-all duration-300">
            <BrandLogo />
          </Link>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{siteConfig.description}</p>
          {/* <div className="flex gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-background/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary/50 hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"><FacebookIcon className="w-5 h-5" /></div>
            <div className="w-10 h-10 rounded-[12px] bg-background/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary/50 hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"><IconBrandInstagram className="w-5 h-5" /></div>
          </div> */}
        </div>

        <div className="col-span-1">
          <h4 className="text-sm font-semibold mb-6 uppercase tracking-wider">Liên hệ</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 items-center">
              <Image src="/icons/map.png" alt="Logo" width={25} height={25} className="shrink-0" />
              <span className="text-sm text-muted-foreground leading-relaxed font-semibold"> 123 Đường ABC, Phường XYZ, Quận 1, TP.HCM</span>
            </li>
            <li className="flex gap-3 items-center">
              <Image unoptimized src="/icons/phone.png" alt="Logo" width={25} height={25} className="shrink-0" />
              <a href="tel:19001234" className="text-sm text-muted-foreground hover:text-primary transition-colors font-semibold">1900 1234</a>
            </li>
            <li className="flex gap-3 items-center">
              <Image src="/icons/gmail.png" alt="Logo" width={25} height={25} className="shrink-0" />
              <a href="mailto:support@thefamilymarket.vn" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors break-all">support@thefamilymarket.vn</a>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="text-sm font-semibold mb-6 uppercase tracking-wider">Hỗ trợ khách hàng</h4>
          <ul className="space-y-4">
            <li><Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Về chúng tôi</Link></li>
            <li><Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Chính sách đổi trả</Link></li>
            <li><Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Chính sách bảo mật</Link></li>
            <li><Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Điều khoản dịch vụ</Link></li>
          </ul>
        </div>

        <div className="col-span-1 h-[250px] lg:h-auto overflow-hidden rounded-2xl border border-border/50 shadow-sm relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3253162791854!2d106.69466547608882!3d10.786376989363065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f34731d77cb%3A0x6b2e0436a94f09cb!2sNh%C3%A0%20th%E1%BB%9D%20%C4%90%E1%BB%A9c%20B%C3%A0%20S%C3%A0i%20G%C3%B2n!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0, minHeight: '200px' }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          ></iframe>
        </div>
      </div>

      <div className="border-t border-border/50 px-4 md:px-10 py-6 mb-12 lg:mb-auto max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4 relative z-10">
        <p className="text-sm text-muted-foreground font-medium text-center md:text-left">
          © 2026 {siteConfig.name}. All rights reserved.
        </p>
        {/* <div className="flex gap-4">
          <div className="w-10 h-7 rounded bg-background/50 border border-border/50 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="w-10 h-7 rounded bg-background/50 border border-border/50 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
          </div>
        </div> */}
      </div>
    </footer>
  );
}
