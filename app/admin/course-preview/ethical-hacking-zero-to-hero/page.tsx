'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent } from '@/components/ui/card'
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
  const { user } = useUser()
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const [videos, setVideos] = useState<Video[]>([])
  const videosPerPage = 10
  const totalVideos = 550
  const totalPages = Math.ceil(totalVideos / videosPerPage)
  const tablesPerRow = 5
  const totalRows = Math.ceil(totalPages / tablesPerRow)

  useEffect(() => {
    // Initialize videos
    const initialVideos = Array.from({ length: totalVideos }, (_, index) => ({
      id: index + 1,
      title: `Video ${index + 1}`,
      url: `https://example.com/video-${index + 1}`,
      notes: '',
      completed: false
    }))
    setVideos(initialVideos)
  }, [])

  const handleNoteChange = (videoId: number, note: string) => {
    setVideos(prevVideos => prevVideos.map(video => 
      video.id === videoId ? { ...video, notes: note } : video
    ))
  }

  const handleSaveNote = (videoId: number) => {
    toast({
      title: "Note saved",
      description: `Note for Video ${videoId} has been saved.`
    })
  }

  const handleMarkCompleted = (videoId: number, completed: boolean) => {
    setVideos(prevVideos => prevVideos.map(video => 
      video.id === videoId ? { ...video, completed } : video
    ))
    toast({
      title: completed ? "Video Completed" : "Video Uncompleted",
      description: `Video ${videoId} has been marked as ${completed ? 'completed' : 'not completed'}.`
    })
  }

  const currentVideos = videos.slice((currentPage - 1) * videosPerPage, currentPage * videosPerPage)

  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flame-text">
        Complete Ethical Hacking Course: Zero to Hero for Beginners - Preview
      </h1>

      <div className="space-y-8 mb-8">
        {currentVideos.map((video) => (
          <Card key={video.id} className="bg-background-light border-electric-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-electric-blue">
                  {video.title}
                </h2>
                <div className="flex items-center">
                  <Checkbox
                    id={`completed-${video.id}`}
                    checked={video.completed}
                    onCheckedChange={(checked) => handleMarkCompleted(video.id, checked as boolean)}
                  />
                  <label htmlFor={`completed-${video.id}`} className="ml-2 text-foreground-light">
                    Mark as Completed
                  </label>
                </div>
              </div>
              <div className="aspect-video mb-4 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Example Domain</span>
              </div>
              <Textarea
                placeholder="Add your notes here..."
                value={video.notes}
                onChange={(e) => handleNoteChange(video.id, e.target.value)}
                className="min-h-[100px] mb-2 bg-background border-electric-blue text-foreground-light"
              />
              <Button 
                onClick={() => handleSaveNote(video.id)}
                className="flame-button"
              >
                Save Note
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {Array.from({ length: totalRows }).map((_, rowIndex) => (
        <div key={rowIndex} className="mb-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                {Array.from({ length: tablesPerRow }).map((_, tableIndex) => {
                  const startPage = rowIndex * tablesPerRow * tablesPerRow + tableIndex * tablesPerRow + 1
                  const endPage = Math.min(startPage + tablesPerRow - 1, totalPages)
                  return (
                    <td key={tableIndex} className="p-2 border border-electric-blue">
                      <div className="flex flex-wrap justify-center gap-2">
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 p-0 ${
                              currentPage === pageNum 
                                ? "bg-flame-red text-white" 
                                : "text-electric-blue hover:text-flame-orange"
                            }`}
                          >
                            {pageNum}
                          </Button>
                        ))}
                      </div>
                      {endPage < totalPages && (
                        <Button
                          onClick={() => setCurrentPage(endPage + 1)}
                          className="mt-2 w-full flame-button"
                        >
                          Next
                        </Button>
                      )}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
