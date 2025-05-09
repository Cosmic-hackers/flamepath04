'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUser } from '@/contexts/UserContext'

type Participant = {
  id: string
  name: string
  stream?: MediaStream
}

export function VideoConference({ meetingId }: { meetingId: string }) {
  const { user } = useUser()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [chatMessages, setChatMessages] = useState<{ sender: string; message: string }[]>([])
  const [message, setMessage] = useState('')
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const screenShareRef = useRef<HTMLVideoElement>(null)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [videoSize, setVideoSize] = useState<'minimize' | '16:9' | 'desktop' | 'mobile' | 'tablet'>('16:9')

  useEffect(() => {
    // In a real implementation, this would connect to a WebRTC server
    // and handle participant joining/leaving
    setParticipants([
      { id: '1', name: 'Admin' },
      { id: '2', name: 'User 1' },
      { id: '3', name: 'User 2' },
    ])

    // Set up local video stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
      })
      .catch(err => console.error('Error accessing media devices.', err))

    return () => {
      // Clean up video streams
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && user) {
      setChatMessages([...chatMessages, { sender: user.name, message }])
      setMessage('')
    }
  }

  const startScreenShare = () => {
    navigator.mediaDevices.getDisplayMedia({ video: true })
      .then(stream => {
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = stream
          setIsScreenSharing(true)
        }
      })
      .catch(err => console.error('Error sharing screen.', err))
  }

  const stopScreenShare = () => {
    if (screenShareRef.current && screenShareRef.current.srcObject) {
      const tracks = (screenShareRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      screenShareRef.current.srcObject = null
      setIsScreenSharing(false)
    }
  }

  const handleVideoSizeChange = (size: 'minimize' | '16:9' | 'desktop' | 'mobile' | 'tablet') => {
    setVideoSize(size)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 h-screen p-4">
      <div className="flex-grow space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Main Video</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Button onClick={() => handleVideoSizeChange('minimize')}>Minimize</Button>
              <Button onClick={() => handleVideoSizeChange('16:9')}>16:9</Button>
              <Button onClick={() => handleVideoSizeChange('desktop')}>Desktop</Button>
              <Button onClick={() => handleVideoSizeChange('mobile')}>Mobile</Button>
              <Button onClick={() => handleVideoSizeChange('tablet')}>Tablet</Button>
            </div>
            <video 
              ref={localVideoRef} 
              autoPlay 
              muted={user?.role !== 'admin'} 
              playsInline 
              className={`w-full ${
                videoSize === 'minimize' ? 'h-32' :
                videoSize === '16:9' ? 'aspect-video' :
                videoSize === 'desktop' ? 'aspect-[16/9] max-w-4xl' :
                videoSize === 'mobile' ? 'aspect-[9/16] max-w-xs' :
                videoSize === 'tablet' ? 'aspect-[4/3] max-w-2xl' :
                ''
              }`}
            />
          </CardContent>
        </Card>
        {isScreenSharing && (
          <Card>
            <CardHeader>
              <CardTitle>Screen Share</CardTitle>
            </CardHeader>
            <CardContent>
              <video ref={screenShareRef} autoPlay playsInline className="w-full" />
            </CardContent>
          </Card>
        )}
        {user?.role === 'admin' && (
          <div>
            {!isScreenSharing ? (
              <Button onClick={startScreenShare}>Start Screen Share</Button>
            ) : (
              <Button onClick={stopScreenShare}>Stop Screen Share</Button>
            )}
          </div>
        )}
      </div>
      <div className="w-full md:w-1/3 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {participants.map(participant => (
                <li key={participant.id}>{participant.name}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto mb-4">
              {chatMessages.map((msg, index) => (
                <p key={index}><strong>{msg.sender}:</strong> {msg.message}</p>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <Button type="submit">Send</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
