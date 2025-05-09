'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

type Video = {
  id: number
  title: string
  url: string
  notes: string
  completed: boolean
}

export default function CoursePreview() {
  const { slug } = useParams()
  const { user } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [videos, setVideos] = useState<Video[]>([])
  const videosPerPage = 10

  useEffect(() => {
    // Check if user is admin
    if (!user || user.email !== 'siddusidharth613@gmail.com' || user.role !== 'admin') {
      router.push('/')
      return
    }

    // Initialize videos based on the course
    const courses = JSON.parse(localStorage.getItem('courses') || '[]')
    const course = courses.find((c: any) => c.id === slug)
    
    if (course) {
      // Generate mock videos if they don't exist
      if (!course.videos) {
        const mockVideos = Array.from({ length: course.parts || 10 }, (_, index) => ({
          id: index + 1,
          title: `Video ${index + 1}`,
          url: course.previewUrl || `https://example.com/video-${index + 1}`,
          notes: '',
          completed: false
        }))
        course.videos = mockVideos
        localStorage.setItem('courses', JSON.stringify(courses))
      }
      setVideos(course.videos)
    }
  }, [user, router, slug])

  const handleSaveNotes = (videoId: number, notes: string) => {
    const updatedVideos = videos.map(video =>
      video.id === videoId ? { ...video, notes } : video
    )
    setVideos(updatedVideos)

    // Update localStorage
    const courses = JSON.parse(localStorage.getItem('courses') || '[]')
    const updatedCourses = courses.map((course: any) => {
      if (course.id === slug) {
        return { ...course, videos: updatedVideos }
      }
      return course
    })
    localStorage.setItem('courses', JSON.stringify(updatedCourses))

    toast({
      title: "Notes Saved",
      description: `Notes for Video ${videoId} have been saved.`,
    })
  }

  const handleMarkCompleted = (videoId: number, completed: boolean) => {
    const updatedVideos = videos.map(video =>
      video.id === videoId ? { ...video, completed } : video
    )
    setVideos(updatedVideos)

    // Update localStorage
    const courses = JSON.parse(localStorage.getItem('courses') || '[]')
    const updatedCourses = courses.map((course: any) => {
      if (course.id === slug) {
        return { ...course, videos: updatedVideos }
      }
      return course
    })
    localStorage.setItem('courses', JSON.stringify(updatedCourses))

    toast({
      title: completed ? "Video Completed" : "Video Uncompleted",
      description: `Video ${videoId} has been marked as ${completed ? 'completed' : 'not completed'}.`,
    })
  }

  // Get current videos for pagination
  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo)
  const totalPages = Math.ceil(videos.length / videosPerPage)

  if (!user || user.email !== 'siddusidharth613@gmail.com') {
    return <div className="container mx-auto px-4 py-8">Access denied. Admin privileges required.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flame-text">Course Preview</h1>
      <div className="space-y-8">
        {currentVideos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video mb-4">
                <iframe
                  src={video.url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="space-y-4">
                <Textarea
                  placeholder="Add your notes here..."
                  value={video.notes}
                  onChange={(e) => handleSaveNotes(video.id, e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={video.completed}
                    onCheckedChange={(checked) => handleMarkCompleted(video.id, checked as boolean)}
                  />
                  <label>Mark as completed</label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? 'default' : 'outline'}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}
