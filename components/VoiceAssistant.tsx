"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { VolumeX, Volume2 } from "lucide-react"
import { motion } from "framer-motion"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export default function VoiceAssistant() {
  const [isVoiceEnabled, setIsVoiceEnabled] = useLocalStorage("isVoiceEnabled", true)

  useEffect(() => {
    const hasSpokenWelcome = sessionStorage.getItem("hasSpokenWelcome")
    if (!hasSpokenWelcome && isVoiceEnabled) {
      speakWelcomeMessage()
      sessionStorage.setItem("hasSpokenWelcome", "true")
    }
  }, [isVoiceEnabled])

  const speakWelcomeMessage = () => {
    const message =
      "Welcome to Flamepath Academy. Ignite your tech career with our cutting-edge courses in AI, Cybersecurity, and more."
    speak(message)
  }

  const speak = (text: string, onEndCallback?: () => void) => {
    if ("speechSynthesis" in window && isVoiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(text)
      if (onEndCallback) {
        utterance.onend = onEndCallback
      }
      window.speechSynthesis.speak(utterance)
    } else {
      console.log("Text-to-speech not supported or disabled.")
      if (onEndCallback) {
        onEndCallback()
      }
    }
  }

  const toggleVoice = () => {
    const newState = !isVoiceEnabled
    setIsVoiceEnabled(newState)
    if (newState) {
      // Reset welcome message flag when turning on - Removed as per update
    } else {
      window.speechSynthesis.cancel() // Stop any ongoing speech when turning off
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center space-x-4">
      <div className="holographic-ball-container">
        <motion.div
          className="holographic-ball"
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" },
          }}
        >
          <div className="inner-ball"></div>
          <div className="swirl"></div>
        </motion.div>
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="particle"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: Math.random() * 60 - 30,
              y: Math.random() * 60 - 30,
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      <Button
        onClick={toggleVoice}
        variant="outline"
        size="icon"
        className="bg-background/80 backdrop-blur-sm"
        aria-label={isVoiceEnabled ? "Disable Voice Assistant" : "Enable Voice Assistant"}
      >
        {isVoiceEnabled ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
      </Button>
    </div>
  )
}
