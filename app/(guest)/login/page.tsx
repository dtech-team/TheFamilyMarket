"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, LayoutDashboard } from "lucide-react";
import { authService } from "@/lib/services/auth.service";
import { getProfile } from "@/lib/services/profile.service";
import { getRole } from "@/lib/services/role.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPageV1() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    
    const { data: authData, error } = await authService.login(email, password);
    if (error) {
      let message = error.message;
      if (message === "Invalid login credentials") {
        message = "Email hoặc mật khẩu không chính xác.";
      } else if (message === "Email not confirmed") {
        message = "Vui lòng xác nhận email trước khi đăng nhập.";
      } else if (message === "User not found") {
        message = "Tài khoản không tồn tại.";
      }
      setErrorMsg(message);
      setLoading(false);
      return;
    }
    
    if (authData?.user) {
      const { data: profileData } = await getProfile(authData.user.id);
      if (profileData?.role_id) {
        const { data: roleData } = await getRole(profileData.role_id);
        if (roleData?.name === "admin" || roleData?.name === "staff") {
          router.push("/dashboard");
          return;
        } else {
          // Normal user logged in through admin portal
          setErrorMsg("Truy cập bị từ chối: Tài khoản của bạn không có quyền quản trị viên.");
          setLoading(false);
          // Auto signout if it's an unauthorized user trying to access admin portal
          authService.logout();
          return;
        }
      }
    }
    
    // Fallback if no role
    setErrorMsg("Truy cập bị từ chối: Không thể xác thực quyền truy cập.");
    authService.logout();
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    const { error } = await authService.loginWithGoogle();
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50/50">
      {/* Left panel - Brand & Visuals */}
      <div className="hidden lg:flex w-1/2 relative bg-emerald-600 items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <Image fill unoptimized src="/images/cover.png" alt="Admin Portal Background" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
        
        {/* Abstract decorative circles */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-300/20 blur-3xl" />
        
        <div className="relative z-10 p-12 text-center animate-in fade-in zoom-in duration-700 max-w-lg">
          <div className="mb-8 flex justify-center">
            <div >
              <Image 
                src="/icons/admin_panel.png" 
                alt="Logo" 
                width={100} 
                height={100} 
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-4 drop-shadow-sm">
            Hệ thống Quản trị
          </h1>
          <p className="text-emerald-50 text-lg leading-relaxed font-medium">
            Quản lý doanh thu, đơn hàng và khách hàng của TheFamilyMarket một cách trực quan và hiệu quả.
          </p>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 relative bg-white">
        
        <div className="w-full max-w-md space-y-8 relative z-10 animate-in slide-in-from-bottom-8 duration-500">
          
          {/* Logo / Header */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-3 mb-8">
              <div className="size-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                <ShieldCheck className="size-6 text-white" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-xl font-black tracking-tight text-slate-900">TheFamilyMarket</span>
                <span className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase mt-1">Administrator</span>
              </div>
            </div>
            
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Đăng nhập</h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Vui lòng nhập thông tin xác thực để truy cập bảng điều khiển.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-700 font-bold text-sm">
                  Email quản trị
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 rounded-xl transition-all font-medium"
                  placeholder="admin@thefamilymarket.vn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-700 font-bold text-sm">
                    Mật khẩu
                  </Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 rounded-xl transition-all font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-semibold flex items-center gap-3 animate-in fade-in duration-300 shadow-sm">
                <ShieldCheck className="size-5 shrink-0 mt-0.5 text-red-500" />
                <p>{errorMsg}</p>
              </div>
            )}

            <div className="pt-2 space-y-4">
              <Button 
                type="submit" 
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98]" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Đang xác thực...</span>
                  </div>
                ) : (
                  "Đăng nhập hệ thống"
                )}
              </Button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">Hoặc</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 bg-white border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-3"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Đăng nhập bằng Google
              </Button>
            </div>
          </form>

          <div className="mt-12 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            &copy; {new Date().getFullYear()} TheFamilyMarket. Hệ thống nội bộ.
          </div>
        </div>
      </div>
    </div>
  );
}
