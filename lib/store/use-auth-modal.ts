import { create } from "zustand";

export type AuthView = "login" | "register" | "forgot_password";

interface AuthModalState {
  isOpen: boolean;
  view: AuthView;
  redirectPath: string | undefined;
  openModal: (view?: AuthView, redirectPath?: string) => void;
  closeModal: () => void;
  setView: (view: AuthView) => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  view: "login",
  redirectPath: undefined,
  openModal: (view = "login", redirectPath = undefined) => set({ isOpen: true, view, redirectPath }),
  closeModal: () => set({ isOpen: false }),
  setView: (view) => set({ view }),
}));
