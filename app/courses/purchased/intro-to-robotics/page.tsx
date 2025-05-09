'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const videoPlaylist = [
  { id: '1', title: 'Introduction to Robotics', url: 'https://www.youtube.com/embed/6hxlb5-2Ixc' },
  { id: '2', title: 'Robot Components', url: 'https://www.youtube.com/embed/2Wy7JVEi1E4' },
  { id: '3', title: 'Robot Kinematics', url: 'https://www.youtube.com/embed/ZM9GOENJcuo' },
  { id: '4', title: 'Robot Dynamics', url: 'https://www.youtube.com/embed/10_MpNYN-Vw' },
  { id: '5', title: 'Robot Control Systems', url: 'https://www.youtube.com/embed/qWiXPWTYYrg' },
  { id: '6', title: 'Robot Programming Basics', url: 'https://www.youtube.com/embed/3IbBr_jkHlc' },
  { id: '7', title: 'Robot Operating System (ROS)', url: 'https://www.youtube.com/embed/wfDJAYTMTdk' },
  { id: '8', title: 'Computer Vision for Robotics', url: 'https://www.youtube.com/embed/2FYm3GOonhk' },
  { id: '9', title: 'Path Planning and Navigation', url: 'https://www.youtube.com/embed/ZMI_kpNUgJM' },
  { id: '10', title: 'Robot Manipulation', url: 'https://www.youtube.com/embed/UUxnFcVD_Lg' },
  { id: '11', title: 'Human-Robot Interaction', url: 'https://www.youtube.com/embed/Yl5J7kMRv5c' },
  { id: '12', title: 'Machine Learning in Robotics', url: 'https://www.youtube.com/embed/nRA-SZ2XSNA' },
  { id: '13', title: 'Robot Simulation Tools', url: 'https://www.youtube.com/embed/O62UACB9mUE' },
  { id: '14', title: 'Industrial Robotics Applications', url: 'https://www.youtube.com/embed/p8LBr6Y305U' },
  { id: '15', title: 'Mobile Robotics', url: 'https://www.youtube.com/embed/wNQVo6uOgYA' },
  { id: '16', title: 'Aerial Robotics: Drones', url: 'https://www.youtube.com/embed/defn-gVdQEU' },
  { id: '17', title: 'Underwater Robotics', url: 'https://www.youtube.com/embed/C3Z1nf3Vx4o' },
  { id: '18', title: 'Future of Robotics and Ethics', url: 'https://www.youtube.com/embed/9R0TVLGne3U' },
]

export default function PurchasedRoboticsCourse() {
  const { user } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [currentVideo, setCurrentVideo] = useState(videoPlaylist[0])
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({})
  const [notes, setNotes] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    // Check if user has access to this course
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const currentUser = users.find((u: any) => u.email === user.email)
    if (!currentUser || !currentUser.purchasedCourses || !currentUser.purchasedCourses.includes('intro-to-robotics')) {
      router.push('/courses')
      return
    }

    // Load progress and notes from localStorage
    const savedProgress = JSON.parse(localStorage.getItem(`robotics-progress-${user.email}`) || '{}')
    const savedNotes = JSON.parse(localStorage.getItem(`robotics-notes-${user.email}`) || '{}')
    setProgress(savedProgress)
    setNotes(savedNotes)
  }, [user, router])

  const handleVideoComplete = (videoId: string) => {
    const newProgress = { ...progress, [videoId]: true }
    setProgress(newProgress)
    localStorage.setItem(`robotics-progress-${user.email}`, JSON.stringify(newProgress))
    updateOverallProgress()
  }

  const handleSaveNotes = (videoId: string, note: string) => {
    const newNotes = { ...notes, [videoId]: note }
    setNotes(newNotes)
    localStorage.setItem(`robotics-notes-${user.email}`, JSON.stringify(newNotes))
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully.",
    })
  }

  const updateOverallProgress = () => {
    const completedVideos = Object.values(progress).filter(Boolean).length
    const overallProgress = (completedVideos / videoPlaylist.length) * 100
    
    // Update user's course progress in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map((u: any) => {
      if (u.email === user?.email) {
        const updatedCourses = u.enrolledCourses.map((course: any) => {
          if (course.id === 'intro-to-robotics') {
            return { ...course, progress: overallProgress }
          }
          return course
        })
        return { ...u, enrolledCourses: updatedCourses }
      }
      return u
    })
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flame-text">Robotics Training: Introduction to Robotics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{currentVideo.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video mb-4">
                <iframe
                  src={currentVideo.url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <Textarea
                placeholder="Take notes for this video..."
                value={notes[currentVideo.id] || ''}
                onChange={(e) => setNotes({ ...notes, [currentVideo.id]: e.target.value })}
                className="min-h-[100px] mb-4"
              />
              <div className="flex justify-between">
                <Button onClick={() => handleSaveNotes(currentVideo.id, notes[currentVideo.id] || '')}>
                  Save Notes
                </Button>
                <Button onClick={() => handleVideoComplete(currentVideo.id)}>
                  Mark as Completed
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {videoPlaylist.map((video) => (
                  <li key={video.id} className="flex items-center justify-between">
                    <Button
                      variant="link"
                      onClick={() => setCurrentVideo(video)}
                      className={currentVideo.id === video.id ? 'font-bold' : ''}
                    >
                      {video.title}
                    </Button>
                    {progress[video.id] && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
