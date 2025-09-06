import { create } from "zustand";

type State = {
  isAuthenticated: boolean;
}

type Actions = {
  setLoginStatus: () => void;
  setLogoutStatus: () => void;
}

export type AuthStore = State & Actions;

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  setLoginStatus: () => set({ isAuthenticated: true }),
  setLogoutStatus: () => set({ isAuthenticated: false }),
}));