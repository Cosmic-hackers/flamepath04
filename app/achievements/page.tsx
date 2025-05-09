"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/UserContext"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { getUserById } from "@/services/data-service"

type Badge = {
  courseId: string
  badgeUrl: string
  earnedAt: string
  title: string
  requirements: string[]
}

export default function AchievementsPage() {
  const { user } = useUser()
  const [badges, setBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserBadges = async () => {
      if (user) {
        try {
          // Fetch the latest user data from Firebase
          const userData = await getUserById(user.id)
          if (userData && userData.badges) {
            setBadges(userData.badges)
          } else {
            setBadges([])
          }
        } catch (error) {
          console.error("Error fetching badges:", error)
          // Fallback to local storage
          const users = JSON.parse(localStorage.getItem("users") || "[]")
          const currentUser = users.find((u: any) => u.id === user.id)
          setBadges(currentUser?.badges || [])
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchUserBadges()
  }, [user])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Achievements</h1>
        <p className="text-center">Please log in to view your achievements.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 flame-text text-center">Your Achievements</h1>

      {badges.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl">You haven't earned any badges yet.</p>
          <p className="mt-2">Complete courses to earn badges and track your progress!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.courseId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="tech-card border-electric-blue overflow-hidden h-full">
                <CardContent className="p-6 flex flex-col items-center h-full">
                  <div className="relative mb-6 mt-4">
                    <div className="absolute inset-0 bg-electric-blue/20 rounded-full blur-xl"></div>
                    <img
                      src={badge.badgeUrl || "/placeholder.svg"}
                      alt={badge.title}
                      className="w-32 h-32 object-cover rounded-full border-4 border-electric-blue relative z-10"
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-electric-blue">{badge.title}</h3>

                  <div className="mb-4 flex-grow">
                    <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {badge.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-sm text-gray-500 mt-auto">
                    Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
