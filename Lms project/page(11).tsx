'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"

const courses = {
  'ethical-hacking': {
    title: 'Ethical Hacking: Zero to Hero',
    videos: Array.from({ length: 550 }, (_, i) => ({
      id: i + 1,
      title: `Video ${i + 1}`,
      url: `https://example.com/ethical-hacking/video-${i + 1}`,
    })),
  },
  'dos-ddos-telugu': {
    title: 'DOS and DDOS Course in Telugu',
    videos: Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      title: `Video ${i + 1}`,
      url: `https://example.com/dos-ddos-telugu/video-${i + 1}`,
    })),
  },
}

export default function CoursePreview() {
  const { slug } = useParams()
  const { user } = useUser()
  const { toast } = useToast()
  const [course, setCourse] = useState<any>(null)
  const [notes, setNotes] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    if (slug && typeof slug === 'string') {
      setCourse(courses[slug as keyof typeof courses])
    }
  }, [slug])

  useEffect(() => {
    if (course) {
      const storedNotes = localStorage.getItem(`${slug}-notes`)
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes))
      }
    }
  }, [course, slug])

  const handleNoteChange = (videoId: number, note: string) => {
    const updatedNotes = { ...notes, [videoId]: note }
    setNotes(updatedNotes)
    localStorage.setItem(`${slug}-notes`, JSON.stringify(updatedNotes))
  }

  const handleSaveNote = (videoId: number) => {
    toast({
      title: "Note saved",
      description: `Your note for Video ${videoId} has been saved.`,
    })
  }

  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>
  }

  if (!course) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{course.title} - Preview</h1>
      <div className="space-y-8">
        {course.videos.map((video: any) => (
          <Card key={video.id}>
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={video.url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <Textarea
                placeholder="Add your notes here..."
                value={notes[video.id] || ''}
                onChange={(e) => handleNoteChange(video.id, e.target.value)}
                className="mb-2"
              />
              <Button onClick={() => handleSaveNote(video.id)}>Save Note</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

