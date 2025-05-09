'use client'

import { useParams } from 'next/navigation'
import { VideoConference } from '@/components/VideoConference'
import { useUser } from '@/contexts/UserContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminMeetingPage() {
  const { id } = useParams()
  const { user } = useUser()
  const router = useRouter()
  const [meeting, setMeeting] = useState<any>(null)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/')
    } else {
      // Fetch meeting details
      const meetings = JSON.parse(localStorage.getItem('meetings') || '[]')
      const currentMeeting = meetings.find((m: any) => m.id === id)
      setMeeting(currentMeeting)
    }
  }, [user, router, id])

  if (!user || user.role !== 'admin' || !meeting) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Admin Meeting Room: {meeting.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Date & Time: {new Date(meeting.dateTime).toLocaleString()}</p>
          <p>Capacity: {meeting.capacity}</p>
          <p>Attendees: {meeting.attendees.length}</p>
        </CardContent>
      </Card>
      <VideoConference meetingId={id as string} />
    </div>
  )
}
