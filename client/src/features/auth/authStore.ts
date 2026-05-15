import { create } from "zustand";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  avatar?: string;
};

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  setAuth: (payload: { user: User; accessToken: string }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  setAuth: ({ user, accessToken }: { user: User; accessToken: string }) => {
    localStorage.setItem("accessToken", accessToken);
    set({ user, accessToken });
  },
  clearAuth: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null });
  },
}));