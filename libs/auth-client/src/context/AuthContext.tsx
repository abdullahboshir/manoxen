"use client";

import { createContext, useContext } from "react";
import { User, LoginResponse } from "../types.js";

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    activeBusinessUnit: string | null;
    setActiveBusinessUnit: (id: string | null) => void;
    login: (formData: any) => Promise<LoginResponse>;
    logout: () => void;
    refreshSession: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}
