import { supabase } from "../supabase/client";

  export const authService = {
    async login(email: string, password: string) {
      return supabase.auth.signInWithPassword({ email, password });
    },
    async loginWithGoogle() {
      return supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined,
        },
      });
    },
    async logout() {
      return supabase.auth.signOut();
    },
    async getUser() {
      return supabase.auth.getUser();
    },
    async getSession() {
      return supabase.auth.getSession();
    },
  };