import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  increment,
  addDoc,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { CourseId } from "@/utils/badges"

// User data management
export const getUserById = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId))
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() }
    }
    return null
  } catch (error) {
    console.error("Error getting user:", error)
    throw error
  }
}

export const getAllUsers = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"))
    return usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error getting all users:", error)
    throw error
  }
}

// Course data management
export const getCourseById = async (courseId: string) => {
  try {
    const courseDoc = await getDoc(doc(db, "courses", courseId))
    if (courseDoc.exists()) {
      return { id: courseDoc.id, ...courseDoc.data() }
    }
    return null
  } catch (error) {
    console.error("Error getting course:", error)
    throw error
  }
}

export const getAllCourses = async () => {
  try {
    const coursesSnapshot = await getDocs(collection(db, "courses"))
    return coursesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error getting all courses:", error)
    throw error
  }
}

export const createOrUpdateCourse = async (courseId: string, courseData: any) => {
  try {
    await setDoc(
      doc(db, "courses", courseId),
      {
        ...courseData,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
  } catch (error) {
    console.error("Error creating/updating course:", error)
    throw error
  }
}

// Resource data management
export const getResourceById = async (resourceId: string) => {
  try {
    const resourceDoc = await getDoc(doc(db, "resources", resourceId))
    if (resourceDoc.exists()) {
      return { id: resourceDoc.id, ...resourceDoc.data() }
    }
    return null
  } catch (error) {
    console.error("Error getting resource:", error)
    throw error
  }
}

export const getAllResources = async () => {
  try {
    const resourcesSnapshot = await getDocs(collection(db, "resources"))
    return resourcesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error getting all resources:", error)
    throw error
  }
}

export const createOrUpdateResource = async (resourceId: string, resourceData: any) => {
  try {
    await setDoc(
      doc(db, "resources", resourceId),
      {
        ...resourceData,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
  } catch (error) {
    console.error("Error creating/updating resource:", error)
    throw error
  }
}

// Badge management
export const addBadgeToUser = async (userId: string, courseId: CourseId, badgeData: any) => {
  try {
    const userRef = doc(db, "users", userId)

    // Check if user already has this badge
    const userDoc = await getDoc(userRef)
    const userData = userDoc.data()
    const badges = userData?.badges || []

    if (!badges.some((badge: any) => badge.courseId === courseId)) {
      await updateDoc(userRef, {
        badges: arrayUnion(badgeData),
        achievements: arrayUnion(badgeData),
      })

      // Add to badge history collection for analytics
      await addDoc(collection(db, "badgeHistory"), {
        userId,
        courseId,
        badgeData,
        earnedAt: serverTimestamp(),
      })
    }
  } catch (error) {
    console.error("Error adding badge to user:", error)
    throw error
  }
}

export const checkBadgeEarned = async (userId: string, courseId: CourseId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId))
    if (userDoc.exists()) {
      const userData = userDoc.data()
      const badges = userData.badges || []
      return badges.some((badge: any) => badge.courseId === courseId)
    }
    return false
  } catch (error) {
    console.error("Error checking badge:", error)
    throw error
  }
}

// Course purchase management
export const addCourseToCart = async (userId: string, courseId: string) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      cartedCourses: arrayUnion(courseId),
    })
  } catch (error) {
    console.error("Error adding course to cart:", error)
    throw error
  }
}

export const purchaseCourse = async (userId: string, courseId: string) => {
  try {
    const userRef = doc(db, "users", userId)

    // Add to purchased courses
    await updateDoc(userRef, {
      purchasedCourses: arrayUnion(courseId),
      // Remove from cart if it's there
      cartedCourses: arrayUnion(courseId).filter((id: string) => id !== courseId),
    })

    // Record purchase in transactions collection
    await addDoc(collection(db, "transactions"), {
      userId,
      courseId,
      type: "purchase",
      amount: (await getCourseById(courseId))?.price || 0,
      timestamp: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error purchasing course:", error)
    throw error
  }
}

export const grantCourseAccess = async (userId: string, courseId: string) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      accessibleCourses: arrayUnion(courseId),
      notifications: arrayUnion({
        type: "new_course_access",
        courseId,
        read: false,
        timestamp: serverTimestamp(),
      }),
    })
  } catch (error) {
    console.error("Error granting course access:", error)
    throw error
  }
}

// Resource access management
export const grantResourceAccess = async (userId: string, resourceId: string) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      accessibleResources: arrayUnion(resourceId),
      notifications: arrayUnion({
        type: "new_resource_access",
        resourceId,
        read: false,
        timestamp: serverTimestamp(),
      }),
    })
  } catch (error) {
    console.error("Error granting resource access:", error)
    throw error
  }
}

// Blazecredits management
export const updateBlazeCredits = async (userId: string, amount: number, type: "earned" | "redeemed") => {
  try {
    const userRef = doc(db, "users", userId)

    if (type === "earned") {
      await updateDoc(userRef, {
        "blazecredits.earned": increment(amount),
        "blazecredits.remaining": increment(amount),
      })
    } else if (type === "redeemed") {
      await updateDoc(userRef, {
        "blazecredits.redeemed": increment(amount),
        "blazecredits.remaining": increment(-amount),
      })
    }

    // Record transaction
    await addDoc(collection(db, "blazecreditTransactions"), {
      userId,
      amount,
      type,
      timestamp: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating blazecredits:", error)
    throw error
  }
}

// Referral management
export const addReferral = async (userId: string, referralData: { type: string; name: string }) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      referrals: arrayUnion(referralData),
    })

    // Add blazecredits based on referral type
    const creditAmount = referralData.type === "signup" ? 5 : 10
    await updateBlazeCredits(userId, creditAmount, "earned")
  } catch (error) {
    console.error("Error adding referral:", error)
    throw error
  }
}

// Analytics
export const recordUserActivity = async (userId: string, activity: string, metadata: any = {}) => {
  try {
    await addDoc(collection(db, "userActivity"), {
      userId,
      activity,
      metadata,
      timestamp: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error recording user activity:", error)
    throw error
  }
}
