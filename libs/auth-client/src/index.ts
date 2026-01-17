"use client";

import { createContext } from "react";

// Auth Context Type Definition
export interface AuthContextType {
    user: any | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    activeBusinessUnit: string | null;
    setActiveBusinessUnit: (id: string | any | null) => void;
    login: (formData: any) => Promise<any>;
    logout: () => Promise<void>; 
    refreshSession: () => Promise<boolean>;
}

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook exports for convenience
export function useAuth() { 
    return { user: null, isLoading: false }; 
}

export function usePermission() { 
    return { can: () => true }; 
}

export function useCurrentRole() { 
    return { currentRole: null }; 
}