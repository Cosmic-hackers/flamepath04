'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DateTimePicker } from '@/components/ui/date-time-picker'
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

export default function MeetingManagement() {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dateTime, setDateTime] = useState<Date | undefined>(undefined)
  const [capacity, setCapacity] = useState('')
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const storedMeetings = JSON.parse(localStorage.getItem('meetings') || '[]')
    setMeetings(storedMeetings)
  }, [])

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dateTime) {
      toast({
        title: "Error",
        description: "Please select a date and time for the meeting.",
        variant: "destructive",
      })
      return
    }
    const newMeeting: Meeting = {
      id: Date.now().toString(),
      title,
      description,
      dateTime: dateTime.toISOString(),
      capacity: parseInt(capacity),
      attendees: [],
      waitingList: [],
    }
    const updatedMeetings = [...meetings, newMeeting]
    setMeetings(updatedMeetings)
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings))
    toast({
      title: "Meeting Created",
      description: "The new meeting has been successfully created.",
    })
    // Reset form
    setTitle('')
    setDescription('')
    setDateTime(undefined)
    setCapacity('')
  }

  const handleStartMeeting = (meetingId: string) => {
    router.push(`/admin/meeting/${meetingId}`)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Weekend Mentorship Meeting</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateMeeting} className="space-y-4">
            <Input
              placeholder="Meeting Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <DateTimePicker
              date={dateTime}
              setDate={setDateTime}
            />
            <Input
              type="number"
              placeholder="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
            <Button type="submit">Create Meeting</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Attendees</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>{meeting.title}</TableCell>
                  <TableCell>{new Date(meeting.dateTime).toLocaleString()}</TableCell>
                  <TableCell>{meeting.capacity}</TableCell>
                  <TableCell>{meeting.attendees.length} / {meeting.capacity}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleStartMeeting(meeting.id)}>Start Meeting</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
