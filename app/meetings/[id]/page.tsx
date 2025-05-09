'use client'

import { useParams } from 'next/navigation'
import { VideoConference } from '@/components/VideoConference'
import { useUser } from '@/contexts/UserContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function UserMeetingPage() {
  const { id } = useParams()
  const { user } = useUser()
  const router = useRouter()
  const [meeting, setMeeting] = useState<any>(null)
  const [hasJoined, setHasJoined] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      // Fetch meeting details
      const meetings = JSON.parse(localStorage.getItem('meetings') || '[]')
      const currentMeeting = meetings.find((m: any) => m.id === id)
      setMeeting(currentMeeting)
    }
  }, [user, router, id])

  const handleJoinMeeting = () => {
    if (meeting && user) {
      const updatedMeeting = {
        ...meeting,
        attendees: [...meeting.attendees, user.email]
      }
      const meetings = JSON.parse(localStorage.getItem('meetings') || '[]')
      const updatedMeetings = meetings.map((m: any) => m.id === id ? updatedMeeting : m)
      localStorage.setItem('meetings', JSON.stringify(updatedMeetings))
      setMeeting(updatedMeeting)
      setHasJoined(true)
    }
  }

  if (!user || !meeting) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Meeting: {meeting.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Date & Time: {new Date(meeting.dateTime).toLocaleString()}</p>
          <p>Capacity: {meeting.attendees.length} / {meeting.capacity}</p>
          {!hasJoined && (
            <Button onClick={handleJoinMeeting} className="mt-4">Join Meeting</Button>
          )}
        </CardContent>
      </Card>
      {hasJoined && <VideoConference meetingId={id as string} />}
    </div>
  )
}
