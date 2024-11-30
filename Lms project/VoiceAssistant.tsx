'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, MicOff } from 'lucide-react'

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false)

  useEffect(() => {
    if (!hasSpokenWelcome) {
      speakWelcomeMessage()
      setHasSpokenWelcome(true)
    }
  }, [hasSpokenWelcome])

  const toggleListening = () => {
    if (!isListening) {
      startListening()
    } else {
      stopListening()
    }
  }

  const startListening = () => {
    setIsListening(true)
    // Here you would implement actual speech recognition
    console.log('Started listening...')
  }

  const stopListening = () => {
    setIsListening(false)
    // Here you would stop the speech recognition
    console.log('Stopped listening.')
  }

  const speakWelcomeMessage = () => {
    const welcomeMessage = "Welcome to Flamepath Academy. How can I assist you today?"
    speak(welcomeMessage)
  }

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    } else {
      console.log("Text-to-speech not supported in this browser.")
    }
  }

  return (
    <Button 
      onClick={toggleListening} 
      variant="outline" 
      className="fixed bottom-4 left-4 z-50"
      size="icon"
    >
      {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      <span className="sr-only">{isListening ? 'Stop Voice Assistant' : 'Start Voice Assistant'}</span>
    </Button>
  )
}

