"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { getCurrentUserProfile } from "@/services/auth-service"

type User = {
  id: string
  fullName: string
  email: string
  phone: string
  role: string
  profession: string
  createdAt: string
  avatar?: string
  blazecredits: {
    earned: number
    redeemed: number
    remaining: number
  }
  referrals?: {
    type: "signup" | "purchase"
    name: string
  }[]
  educationalDetails?: string
  course?: string
  interestedCourses?: string[]
  resume?: string
  portfolioUrl?: string
  company?: string
  position?: string
  expertCourses?: string[]
  teachingCourses?: string[]
  organization?: string
  badges?: any[]
  achievements?: any[]
  purchasedCourses?: string[]
  accessibleCourses?: string[]
  accessibleResources?: string[]
  cartedCourses?: string[]
}

type UserContextType = {
  user: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setLoading(true)
      if (authUser) {
        try {
          const userProfile = await getCurrentUserProfile(authUser)
          if (userProfile) {
            setUser({
              id: authUser.uid,
              ...(userProfile as any),
            })
          }
          setFirebaseUser(authUser)
        } catch (error) {
          console.error("Error fetching user profile:", error)
        }
      } else {
        setUser(null)
        setFirebaseUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return <UserContext.Provider value={{ user, firebaseUser, loading, setUser }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
