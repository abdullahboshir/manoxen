"use client";

import { createContext, useContext } from "react";
import { User, LoginResponse } from "../types";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  activeBusinessUnit: string | null;
  setActiveBusinessUnit: (id: string | any | null) => void;
  login: (formData: any) => Promise<LoginResponse>;
  logout: () => void | Promise<void>;
  refreshSession: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return a safe fallback rather than throwing
    return {
      user: null,
      isLoading: false,
      error: "Auth Provider missing",
      isAuthenticated: false,
      activeBusinessUnit: null,
      setActiveBusinessUnit: () => {},
      login: async () => ({
        success: false,
        message: "AuthProvider missing",
      }),
      logout: () => {},
      refreshSession: async () => false,
    };
  }
  return context;
}
