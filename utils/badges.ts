import {
  addBadgeToUser as addBadgeToUserFirebase,
  checkBadgeEarned as checkBadgeEarnedFirebase,
} from "@/services/data-service"

export const COURSE_BADGES = {
  "html-css-2025": {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_PromptA_circular_badge_for_the_HTML_and_CS_0.jpg-TYCndy73DFAbtwXIiNr8wGax2Ornld.jpeg",
    title: "HTML & CSS Master",
    requirements: ["Complete all course modules", "Build responsive layouts", "Master CSS fundamentals"],
  },
  "linux-for-ethical-hacking": {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_A_shieldshaped_badge_for_the_Linux_for_Eth_2.jpg-FU8uyp8ZTCITgCogHekGY2CpNyMQDv.jpeg",
    title: "Linux Security Specialist",
    requirements: ["Master Linux commands", "Complete security exercises", "Understand system administration"],
  },
  "arduino-basics": {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_A_circular_badge_for_the_Arduino_Basics_Be_3.jpg-ooEO2rXAVtKzApxUEo7xGnGJpgOkbW.jpeg",
    title: "Arduino Explorer",
    requirements: ["Complete basic circuits", "Program Arduino successfully", "Build starter projects"],
  },
  "intro-to-iot": {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_A_hexagonal_badge_for_the_IoT_Mastery_Cour_1.jpg-WMw2S1EEg89NZDrs96SPDLraIFVjuV.jpeg",
    title: "IoT Pioneer",
    requirements: ["Understand IoT architecture", "Complete IoT projects", "Master sensor integration"],
  },
  "intro-to-robotics": {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_A_circular_badge_for_the_Robotics_Training_0.jpg-aPzj8PnAE0KZICQmG74NGCiZ9ZphKN.jpeg",
    title: "Robotics Engineer",
    requirements: ["Master robot kinematics", "Complete control systems", "Build working robots"],
  },
} as const

export type CourseId = keyof typeof COURSE_BADGES

export const addBadgeToUser = async (userId: string, courseId: CourseId) => {
  try {
    const badgeData = {
      courseId,
      badgeUrl: COURSE_BADGES[courseId].url,
      earnedAt: new Date().toISOString(),
      title: COURSE_BADGES[courseId].title,
      requirements: COURSE_BADGES[courseId].requirements,
    }

    await addBadgeToUserFirebase(userId, courseId, badgeData)

    // For backward compatibility with local storage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((user: any) => {
      if (user.id === userId) {
        const badges = user.badges || []
        if (!badges.some((badge: any) => badge.courseId === courseId)) {
          badges.push(badgeData)
        }

        const achievements = user.achievements || []
        if (!achievements.some((achievement: any) => achievement.courseId === courseId)) {
          achievements.push(badgeData)
        }

        return { ...user, badges, achievements }
      }
      return user
    })
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  } catch (error) {
    console.error("Error adding badge to user:", error)
    throw error
  }
}

export const checkBadgeEarned = async (userId: string, courseId: CourseId): Promise<boolean> => {
  try {
    return await checkBadgeEarnedFirebase(userId, courseId)
  } catch (error) {
    console.error("Error checking badge earned:", error)

    // Fallback to local storage if Firebase check fails
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.id === userId)
    if (!user?.badges) return false
    return user.badges.some((badge: any) => badge.courseId === courseId)
  }
}
