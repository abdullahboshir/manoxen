"use client"

import { useEffect, useState } from "react"

interface AuthUser {
  id?: string
  email?: string
  name?: string
  roles?: string[]
  businessUnits?: string[]
  [key: string]: any
}

interface UseAuthReturn {
  user: AuthUser | null
  isLoading: boolean
  error?: string
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Try to get user from localStorage or session
    try {
      const storedUser = localStorage.getItem("auth_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Failed to load user:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { user, isLoading }
}
