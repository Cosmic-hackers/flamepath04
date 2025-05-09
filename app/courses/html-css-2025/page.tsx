'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, Save } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { BadgeUnlock } from '@/components/BadgeUnlock'
import { addBadgeToUser, checkBadgeEarned, COURSE_BADGES } from '@/utils/badges'
import type { CourseId } from '@/utils/badges'
import { useRouter } from 'next/navigation'
import { sendWhatsAppNotification } from '@/utils/whatsappNotification'

type CourseData = {
  id: number
  title: string
  url: string
  completed: boolean
  notes: string
}

const courseData: CourseData = {
  id: 1,
  title: "HTML CSS Full Course 2025",
  url: "https://www.youtube.com/embed/VcbO1eS-fdw",
  completed: false,
  notes: '' // Initialize with empty string
}

export default function HTMLCSSCourse2025() {
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()
  const [course, setCourse] = useState<CourseData>(courseData)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [notes, setNotes] = useState(courseData.notes) // Initialize with courseData.notes
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false)
  const courseId: CourseId = 'html-css-2025'

  useEffect(() => {
    if (user) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const currentUser = users.find((u: any) => u.email === user.email)
      if (currentUser && currentUser.enrolledCourses) {
        const courseProgress = currentUser.enrolledCourses.find(
          (c: any) => c.id === 'html-css-2025'
        )
        if (courseProgress) {
          setIsEnrolled(true)
          setCourse(courseProgress.course)
          setNotes(courseProgress.course.notes || '') // Use empty string as fallback
          setProgress(courseProgress.course.completed ? 100 : 0)
        }
      }
    }
  }, [user])

  const handleEnroll = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to enroll in this course.",
        variant: "destructive",
      })
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map((u: any) => {
      if (u.email === user.email) {
        return {
          ...u,
          enrolledCourses: [
            ...(u.enrolledCourses || []),
            {
              id: 'html-css-2025',
              title: 'HTML CSS Full Course 2025',
              course: courseData,
              progress: 0
            }
          ]
        }
      }
      return u
    })
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    setIsEnrolled(true)
    
    toast({
      title: "Successfully Enrolled",
      description: "You have been enrolled in the HTML CSS Full Course 2025!",
    })

    // Send WhatsApp notification
    sendWhatsAppNotification(user, 'HTML CSS Full Course 2025', 'Master web development fundamentals.')
  }

  const handleMarkAsCompleted = () => {
    const updatedCourse = { ...course, completed: true }
    setCourse(updatedCourse)
    setProgress(100)

    updateUserProgress(updatedCourse)

    if (user) {
      if (!checkBadgeEarned(user.id, courseId)) {
        addBadgeToUser(user.id, courseId)
        setShowBadgeUnlock(true)
      } else {
        toast({
          title: "Badge Already Earned",
          description: "You've already earned this badge!",
        })
      }
    }

    toast({
      title: "Progress Updated",
      description: "Course marked as completed!",
    })
  }

  const handleSaveNotes = () => {
    const updatedCourse = { ...course, notes }
    setCourse(updatedCourse)
    updateUserProgress(updatedCourse)

    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully!",
    })
  }

  const updateUserProgress = (updatedCourse: CourseData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map((u: any) => {
      if (u.email === user?.email) {
        const updatedCourses = u.enrolledCourses.map((c: any) => {
          if (c.id === 'html-css-2025') {
            return {
              ...c,
              course: updatedCourse,
              progress: updatedCourse.completed ? 100 : 0
            }
          }
          return c
        })
        return { ...u, enrolledCourses: updatedCourses }
      }
      return u
    })
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  // Placeholder for sendWhatsAppNotification function.  Replace with actual implementation.
  


  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flame-text">
            HTML CSS Full Course 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-6 text-foreground-light">
            Embark on a journey to master the foundational skills of web development with this all-in-one HTML and CSS course. Designed for beginners and aspiring web designers, this course covers everything from the basics to advanced concepts, ensuring you gain practical knowledge to create stunning, responsive websites.
          </p>

          <div className="prose dark:prose-invert max-w-none">
            <h4 className="text-xl font-semibold mb-2">What You'll Learn:</h4>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Introduction to HTML:</strong> Learn how to structure web pages with HTML, including essential tags, attributes, and elements.</li>
              <li><strong>CSS Basics to Advanced:</strong> Discover the power of CSS to style and design web pages with layouts, typography, colors, and animations.</li>
              <li><strong>Responsive Web Design:</strong> Master techniques to make your websites look amazing on all devices, from desktops to smartphones.</li>
              <li><strong>HTML5 and CSS3 Features:</strong> Explore the latest features of HTML5 and CSS3, including semantic elements, multimedia integration, flexbox, and grid.</li>
              <li><strong>Hands-on Projects:</strong> Build real-world projects like portfolios, landing pages, and blogs to apply your skills practically.</li>
              <li><strong>Best Practices and Optimization:</strong> Learn professional tips for clean code, browser compatibility, and faster load times.</li>
            </ul>

            <h4 className="text-xl font-semibold mb-2">Why Choose This Course?</h4>
            <ul className="list-disc list-inside mb-4">
              <li>Step-by-step tutorials with clear explanations.</li>
              <li>Practical exercises and downloadable resources.</li>
              <li>No prior experience needed—start from scratch!</li>
              <li>Certification upon completion.</li>
            </ul>

            <p>Unlock your potential and kickstart your web development journey with this HTML & CSS Mastery Course. Create professional-grade websites with ease and confidence!</p>
          </div>
          {!isEnrolled ? (
            <Button onClick={handleEnroll} className="flame-button">
              Enroll Now (Free)
            </Button>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-1">
                  {progress.toFixed(0)}% Complete
                </p>
              </div>
              <div className="aspect-video mb-4">
                <iframe
                  src={course.url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Course Notes</h3>
                <Textarea
                  placeholder="Take notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={handleSaveNotes} className="flame-button">
                  <Save className="mr-2 h-4 w-4" />
                  Save Notes
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Click "Mark as Completed" after finishing the course video and exercises to earn a badge and certificate of completion!</p>
              {!course.completed && (
                <Button 
                  onClick={handleMarkAsCompleted}
                  className="flame-button w-full"
                >
                  Mark as Completed
                </Button>
              )}
              {course.completed && (
                <div className="flex items-center text-green-500">
                  <CheckCircle className="mr-2" />
                  <span>Course Completed</span>
                </div>
              )}
            </div>
          )}
          <BadgeUnlock
            isOpen={showBadgeUnlock}
            onClose={() => {
              setShowBadgeUnlock(false)
              router.push('/profile')
            }}
            badgeUrl={COURSE_BADGES[courseId].url}
            courseName="HTML & CSS 2025"
            badgeTitle={COURSE_BADGES[courseId].title}
            requirements={COURSE_BADGES[courseId].requirements}
          />
        </CardContent>
      </Card>
    </div>
  )
}
