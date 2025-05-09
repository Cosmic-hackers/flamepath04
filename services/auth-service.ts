import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  type User as FirebaseUser,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export type UserCredential = {
  email: string
  password: string
}

export type UserProfile = {
  fullName: string
  email: string
  phone: string
  role: string
  profession: string
  educationalDetails?: string
  course?: string
  interestedCourses?: string[]
  portfolioUrl?: string
  company?: string
  position?: string
  expertCourses?: string[]
  teachingCourses?: string[]
  organization?: string
  blazecredits?: {
    earned: number
    redeemed: number
    remaining: number
  }
  referrals?: { type: string; name: string }[]
  referralCode?: string
  specialUser?: boolean
}

// Register a new user
export const registerUser = async (credentials: UserCredential, profile: UserProfile) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)

    const user = userCredential.user

    // Update display name
    await updateProfile(user, {
      displayName: profile.fullName,
    })

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      ...profile,
      createdAt: serverTimestamp(),
      blazecredits: profile.blazecredits || {
        earned: 0,
        redeemed: 0,
        remaining: 0,
      },
      badges: [],
      achievements: [],
      purchasedCourses: [],
      accessibleCourses: [],
      accessibleResources: [],
      cartedCourses: [],
    })

    return user
  } catch (error) {
    console.error("Error registering user:", error)
    throw error
  }
}

// Sign in existing user
export const signIn = async (credentials: UserCredential) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    return userCredential.user
  } catch (error) {
    console.error("Error signing in:", error)
    throw error
  }
}

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // Check if user document exists
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (!userDoc.exists()) {
      // Create new user document if it doesn't exist
      await setDoc(doc(db, "users", user.uid), {
        fullName: user.displayName,
        email: user.email,
        phone: user.phoneNumber || "",
        role: "user",
        profession: "",
        createdAt: serverTimestamp(),
        blazecredits: {
          earned: 0,
          redeemed: 0,
          remaining: 0,
        },
        badges: [],
        achievements: [],
        purchasedCourses: [],
        accessibleCourses: [],
        accessibleResources: [],
        cartedCourses: [],
      })
    }

    return user
  } catch (error) {
    console.error("Error signing in with Google:", error)
    throw error
  }
}

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

// Reset password
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error("Error resetting password:", error)
    throw error
  }
}

// Get current user profile
export const getCurrentUserProfile = async (user: FirebaseUser) => {
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile
    }
    return null
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

// Update user profile
export const updateUserProfile = async (userId: string, profile: Partial<UserProfile>) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      ...profile,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}
