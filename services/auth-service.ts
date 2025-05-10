import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

// User authentication
export const registerUser = async (credentials: any, userProfile: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
    const user = userCredential.user

    // Update profile with display name
    await updateProfile(user, { displayName: userProfile.fullName })

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      ...userProfile,
      createdAt: serverTimestamp(),
    })

    return user
  } catch (error) {
    console.error("Error registering user:", error)
    throw error
  }
}

export const signIn = async (credentials: any) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    return userCredential.user
  } catch (error) {
    console.error("Error logging in:", error)
    throw error
  }
}

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const user = userCredential.user

    // Check if user document exists
    const userDoc = await getDoc(doc(db, "users", user.uid))

    // If not, create a new user document
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        fullName: user.displayName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        role: "user",
        profession: "",
        createdAt: serverTimestamp(),
        blazecredits: {
          earned: 0,
          redeemed: 0,
          remaining: 0,
        },
      })
    }

    return user
  } catch (error) {
    console.error("Error logging in with Google:", error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Error logging out:", error)
    throw error
  }
}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error("Error resetting password:", error)
    throw error
  }
}

export const getCurrentUserProfile = async (user: FirebaseUser) => {
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (userDoc.exists()) {
      return userDoc.data()
    }
    return null
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}
