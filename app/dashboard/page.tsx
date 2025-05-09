"use client"

import { useUser } from "@/contexts/UserContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CourseRecommendations } from "@/components/CourseRecommendations"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { AmbassadorDashboard } from "@/components/AmbassadorDashboard"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

type EnrolledCourse = {
  id: string
  title: string
  progress: number
}

type Course = {
  id: string
  title: string
  description: string
  price: number
  isPaid: boolean
  thumbnail: string
  isNew?: boolean
  isUpcoming?: boolean
  type: "course" | "project"
  originalPrice?: number
}

export default function Dashboard() {
  const { user, setUser } = useUser()
  const router = useRouter()
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([])
  const [myCourses, setMyCourses] = useState<any[]>([])
  const [allCourses, setAllCourses] = useState<Course[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const currentUser = users.find((u: any) => u.email === user.email)
      if (currentUser) {
        setUser(currentUser) // Update the user context with the latest data
        setEnrolledCourses(currentUser.enrolledCourses || [])
        const receivedCourses = currentUser.receivedCourses || []
        setMyCourses(receivedCourses)
      }

      // Fetch all courses
      const fetchedCourses = JSON.parse(localStorage.getItem("courses") || "[]")
      setAllCourses(fetchedCourses)

      // Filter out enrolled courses and get free courses for recommendations
      const notEnrolledCourses = fetchedCourses.filter(
        (course: Course) =>
          !currentUser?.enrolledCourses?.some((enrolledCourse: any) => enrolledCourse.id === course.id) &&
          !currentUser?.receivedCourses?.includes(course.id),
      )
      const freeCourses = notEnrolledCourses.filter((course: Course) => !course.isPaid)
      setRecommendedCourses(freeCourses.slice(0, 3)) // Show up to 3 recommended courses
    }
  }, [user, router, setUser]) // Add setUser to the dependency array

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        <span className="flame-text">Welcome to Your Dashboard, {user?.fullName || "User"}!</span>
      </h1>

      {/* Profile Section */}
      <div className="mb-8 p-6 rounded-lg bg-background/60 border border-electric-blue">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl overflow-hidden">
            {user.avatar ? (
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={`${user.fullName}'s avatar`}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            ) : (
              user.fullName && user.fullName.charAt(0)
            )}
          </div>
          <div className="space-y-1">
            <p>
              <span className="text-electric-blue">Name:</span> {user.fullName}
            </p>
            <p>
              <span className="text-electric-blue">Email:</span> {user.email}
            </p>
            <p>
              <span className="text-electric-blue">Phone:</span> {user.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Ambassador Program Section */}
      <AmbassadorDashboard />

      {/* Enrolled Courses Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-electric-blue mb-4">Your Enrolled Courses</h2>
        {enrolledCourses.length === 0 ? (
          <p>You haven't enrolled in any courses yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="tech-card">
                <CardHeader>
                  <CardTitle className="text-xl text-electric-blue">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="mb-2" />
                  <p className="text-sm text-muted-foreground mb-4">{course.progress}% completed</p>
                  <Link href={`/courses/${course.id}`} className="text-flame-orange hover:underline mt-2 inline-block">
                    Continue Learning
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-electric-blue mb-4">Achievements</h2>
        <Card>
          <CardContent className="p-6">
            <p className="mb-4">View your earned badges and accomplishments!</p>
            <Button asChild className="flame-button">
              <Link href="/achievements">View Achievements</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* My Courses Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-electric-blue mb-4">My Courses</h2>
        {myCourses.length === 0 ? (
          <p>You haven't received any courses yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myCourses.map((courseId) => {
              const course = allCourses.find((c: Course) => c.id === courseId)
              if (!course) return null
              return (
                <Card key={course.id} className="tech-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full flame-button">
                      <Link href={`/courses/${course.id}`}>Go to Course</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Recommended Courses Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-electric-blue mb-4">Recommended Courses</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendedCourses.map((course) => (
            <Card key={course.id} className="tech-card">
              <CardHeader>
                <CardTitle className="text-xl text-electric-blue">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                <Link href={`/courses/${course.id}`} className="text-flame-orange hover:underline mt-2 inline-block">
                  View Course
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div id="achievements" className="mb-8">
        <h2 className="text-2xl font-bold text-electric-blue mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(user.badges || []).map((badge: any, index: number) => (
            <motion.div
              key={index}
              className="relative aspect-square"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Image
                src={badge.badgeUrl || "/placeholder.svg"}
                alt={`Badge for ${badge.courseId}`}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 text-center text-sm p-2 bg-black/50 text-white">
                {new Date(badge.earnedAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Course Recommendations */}
      <CourseRecommendations />
    </div>
  )
}
