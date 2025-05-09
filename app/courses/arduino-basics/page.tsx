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
import { sendWhatsAppNotification } from '@/utils/whatsappNotification'
import { useRouter } from 'next/navigation'

type Video = {
  id: number
  title: string
  url: string
  completed: boolean
  notes: string
}

const courseVideo = {
  id: 1,
  title: "Arduino Course for Beginners",
  url: "https://www.youtube.com/embed/zJ-LqeX_fLU",
  completed: false,
  notes: ''
}

export default function ArduinoBasicsCourse() {
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()
  const [video, setVideo] = useState<Video>(courseVideo)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false)
  const courseId: CourseId = 'arduino-basics'

  useEffect(() => {
    if (user) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const currentUser = users.find((u: any) => u.email === user.email)
      if (currentUser && currentUser.enrolledCourses) {
        const courseProgress = currentUser.enrolledCourses.find(
          (course: any) => course.id === 'arduino-basics'
        )
        if (courseProgress) {
          setIsEnrolled(true)
          setVideo(courseProgress.video) // Updated to reflect single video
          setProgress(calculateProgress(courseProgress.video)) // Updated to reflect single video
        }
      }
    }
  }, [user])

  const calculateProgress = (video: Video) => { // Updated to reflect single video
    return video.completed ? 100 : 0; // Simplified progress calculation for single video
  }

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
              id: 'arduino-basics',
              title: 'Arduino Basics for Beginners',
              video: courseVideo, // Updated to reflect single video
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
      description: "You have been enrolled in the Arduino Basics for Beginners course!",
    })
    sendWhatsAppNotification(
      user,
      'Arduino Basics for Beginners',
      'Get started with Arduino programming and simple electronics projects.'
    )
  }

  const handleVideoComplete = (videoId: number) => {
    setVideo({ ...video, completed: true })
    updateProgress({...video, completed: true}) // Updated to reflect single video
    handleMarkAsCompleted()
  }

  const handleSaveNotes = (videoId: number, notes: string) => {
    setVideo({ ...video, notes })
    updateProgress({...video, notes}) // Updated to reflect single video
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully!",
    })
  }

  const updateProgress = (updatedVideo: Video) => { // Updated to reflect single video
    const newProgress = calculateProgress(updatedVideo)
    setProgress(newProgress)

    // Update localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map((u: any) => {
      if (u.email === user?.email) {
        const updatedCourses = u.enrolledCourses.map((course: any) => {
          if (course.id === 'arduino-basics') {
            return {
              ...course,
              video: updatedVideo, // Updated to reflect single video
              progress: newProgress
            }
          }
          return course
        })
        return { ...u, enrolledCourses: updatedCourses }
      }
      return u
    })
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  const handleMarkAsCompleted = () => {
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
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flame-text">
            Arduino Basics for Beginners
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-foreground-light">
            Get started with Arduino programming and simple electronics projects. This course is designed for beginners who want to learn about microcontrollers and how to program them. You'll learn the basics of Arduino, how to write and upload sketches, and how to interface with various sensors and actuators.
          </p>
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
              <div className="space-y-4">
                <div> {/* Replaced videos.map with single video component */}
                  <div className="aspect-video mb-8">
                    <iframe
                      src={video.url}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <Textarea
                    placeholder="Take notes here..."
                    value={video.notes}
                    onChange={(e) => handleSaveNotes(video.id, e.target.value)}
                    className="min-h-[100px] mb-2"
                  />
                  <div className="flex justify-between">
                    <Button 
                      onClick={() => handleSaveNotes(video.id, video.notes)}
                      className="flame-button"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Notes
                    </Button>
                    {!video.completed && (
                      <Button 
                        onClick={() => handleVideoComplete(video.id)}
                        className="flame-button"
                      >
                        Mark as Completed
                      </Button>
                    )}
                    {video.completed && (
                      <div className="flex items-center text-green-500">
                        <CheckCircle className="mr-2" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <BadgeUnlock
        isOpen={showBadgeUnlock}
        onClose={() => {
          setShowBadgeUnlock(false)
          router.push('/profile')
        }}
        badgeUrl={COURSE_BADGES[courseId].url}
        courseName="Arduino Basics for Beginners"
        badgeTitle={COURSE_BADGES[courseId].title}
        requirements={COURSE_BADGES[courseId].requirements}
      />
    </div>
  )
}
