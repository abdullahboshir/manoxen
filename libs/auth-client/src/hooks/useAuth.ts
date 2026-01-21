"use client"
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    // Return a safe fallback rather than throwing, to prevent entire app crash
    // during boot or in non-guarded components
    return {
      user: null,
      isLoading: false,
      error: "Auth Provider missing",
      isAuthenticated: false,
      activeBusinessUnit: null,
      setActiveBusinessUnit: () => {
        console.warn("setActiveBusinessUnit called outside of AuthProvider");
      },
      login: async () => {
        return { success: false, message: "AuthProvider missing" };
      },
      logout: () => {
        console.warn("logout called outside of AuthProvider");
      },
      refreshSession: async () => false,
    };
  }
  
  return context;
}
