'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

const videoPlaylist = [
  { id: '1', title: 'Introduction to Robotics', url: 'https://www.youtube.com/embed/pnKWRRYb2vk' },
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

export default function RoboticsTrainingCourse() {
  const { user } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [currentVideo, setCurrentVideo] = useState(videoPlaylist[0])
  const [progress, setProgress] = useState(0)
  const [courseStatus, setCourseStatus] = useState<'view' | 'waitingConfirmation' | 'accessible'>('view')

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const currentUser = users.find((u: any) => u.email === user.email)
    
    if (currentUser) {
      if (currentUser.accessibleCourses && currentUser.accessibleCourses.includes('robotics-training')) {
        setCourseStatus('accessible')
      } else if (currentUser.purchasedCourses && currentUser.purchasedCourses.includes('robotics-training')) {
        setCourseStatus('waitingConfirmation')
      } else {
        setCourseStatus('view')
      }
    }
  }, [user, router])

  const handleVideoComplete = (videoId: string) => {
    const completedVideos = videoPlaylist.findIndex(video => video.id === videoId) + 1
    const newProgress = (completedVideos / videoPlaylist.length) * 100
    setProgress(newProgress)

    // Update progress in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map((u: any) => {
      if (u.email === user?.email) {
        return {
          ...u,
          courseProgress: {
            ...u.courseProgress,
            'robotics-training': newProgress
          }
        }
      }
      return u
    })
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  const handleAccessCourse = () => {
    window.location.href = 'https://het4k97qaifswin6.vercel.app/'
  }

  if (!user) {
    return null
  }

  if (courseStatus === 'view') {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flame-text">Robotics Training Course</h1>
        <Card>
          <CardHeader>
            <CardTitle>Course Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a preview of the Robotics Training Course. Purchase the course to access all content.</p>
            <Button onClick={() => router.push('/courses')}>Back to Courses</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (courseStatus === 'waitingConfirmation') {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flame-text">Robotics Training Course</h1>
        <Card>
          <CardHeader>
            <CardTitle>Waiting for Payment Confirmation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your payment is being processed. Once confirmed, you will be granted access to the course.</p>
            <Button onClick={() => router.push('/courses')}>Back to Courses</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flame-text">Robotics Training Course</h1>
      <Button onClick={handleAccessCourse} className="mb-8 flame-button">Access Full Course</Button>
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
              <Button onClick={() => handleVideoComplete(currentVideo.id)}>
                Mark as Completed
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-4" />
              <p className="text-sm text-muted-foreground mb-4">{progress.toFixed(0)}% completed</p>
              <h3 className="text-lg font-semibold mb-2">Video List</h3>
              <ul className="space-y-2">
                {videoPlaylist.map((video) => (
                  <li key={video.id}>
                    <Button
                      variant="link"
                      onClick={() => setCurrentVideo(video)}
                      className={currentVideo.id === video.id ? 'font-bold' : ''}
                    >
                      {video.title}
                    </Button>
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
