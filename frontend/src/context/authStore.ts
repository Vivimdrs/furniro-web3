import { create } from "zustand";
import { isAuthenticated as checkIsAuthenticated } from "../services/auth.service";

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean, email?: string | null) => void;
  userEmail: string | null;
}

const STORAGE_EMAIL_KEY = "@Furniro:userEmail";

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: checkIsAuthenticated(), 
  userEmail: localStorage.getItem(STORAGE_EMAIL_KEY),
  setAuthenticated: (value, email) => {
    if (value && email) {
      localStorage.setItem(STORAGE_EMAIL_KEY, email);
    } else {
      localStorage.removeItem(STORAGE_EMAIL_KEY);
    }
    set({ isAuthenticated: value, userEmail: email });
  },
}));