"use client";

import { createContext, useContext } from "react";

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

// Hook implementation consuming the context
export function useAuth(): AuthContextType { 
    const context = useContext(AuthContext);
    if (!context) {
        // Fallback for when context is not yet loaded or missing provider
        // This prevents immediate crashes but indicates missing provider
        return {
            user: null,
            isLoading: true,
            error: null,
            isAuthenticated: false,
            activeBusinessUnit: null,
            setActiveBusinessUnit: () => {},
            login: async () => ({ success: false, message: "Auth Provider missing" }),
            logout: async () => {},
            refreshSession: async () => false
        };
    }
    return context; 
}

// Permission hook
export function usePermission() { 
    const { user } = useAuth();
    // Industrial standard can() implementation
    const can = (permission: string) => {
        if (!user) return false;
        if (user.isSuperAdmin) return true;
        return user.permissions?.includes(permission) || false;
    };
    return { can }; 
}

// Role hook
export function useCurrentRole() { 
    const { user } = useAuth();
    return { 
        currentRole: user?.role || null,
        isSuperAdmin: user?.isSuperAdmin || false
    }; 
}