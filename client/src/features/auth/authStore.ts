import { create } from "zustand";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  avatar?: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isHydrated: boolean;
  setAuth: (payload: { user: User; accessToken: string }) => void;
  setUser: (user: User | null) => void;
  setHydrated: (value: boolean) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  isHydrated: false,

  setAuth: ({ user, accessToken }) => {
    localStorage.setItem("accessToken", accessToken);
    set({ user, accessToken, isHydrated: true });
  },

  setUser: (user) => set({ user }),

  setHydrated: (value) => set({ isHydrated: value }),

  clearAuth: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null, isHydrated: true });
  },
}));