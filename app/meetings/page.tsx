'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

type Meeting = {
  id: string
  title: string
  description: string
  dateTime: string
  capacity: number
  attendees: string[]
  waitingList: string[]
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const { user } = useUser()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const storedMeetings = JSON.parse(localStorage.getItem('meetings') || '[]')
    setMeetings(storedMeetings)
  }, [])

  const handleJoinMeeting = (meetingId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to join a meeting.",
        variant: "destructive",
      })
      return
    }

    const updatedMeetings = meetings.map(meeting => {
      if (meeting.id === meetingId) {
        if (meeting.attendees.includes(user.email)) {
          toast({
            title: "Already Joined",
            description: "You have already joined this meeting.",
          })
          return meeting
        }

        if (meeting.attendees.length < meeting.capacity) {
          return {
            ...meeting,
            attendees: [...meeting.attendees, user.email]
          }
        } else {
          return {
            ...meeting,
            waitingList: [...meeting.waitingList, user.email]
          }
        }
      }
      return meeting
    })

    setMeetings(updatedMeetings)
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings))

    const joinedMeeting = updatedMeetings.find(m => m.id === meetingId)
    if (joinedMeeting?.attendees.includes(user.email)) {
      toast({
        title: "Joined Successfully",
        description: "You have been added to the meeting.",
      })
    } else {
      toast({
        title: "Added to Waiting List",
        description: "The meeting is full. You have been added to the waiting list.",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Weekend Mentorship Meetings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map(meeting => (
          <Card key={meeting.id}>
            <CardHeader>
              <CardTitle>{meeting.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{meeting.description}</p>
              <p className="mb-2">Date & Time: {new Date(meeting.dateTime).toLocaleString()}</p>
              <p className="mb-4">Capacity: {meeting.attendees.length} / {meeting.capacity}</p>
              <Button 
                onClick={() => router.push(`/meetings/${meeting.id}`)}
                disabled={!user}
              >
                {!user ? 'Login to Join' : 
                 meeting.attendees.includes(user.email) ? 'Enter Meeting' : 
                 meeting.attendees.length >= meeting.capacity ? 'Meeting Full' : 'Join Meeting'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
