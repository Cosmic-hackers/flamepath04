"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// Dynamic imports with ssr: false
export const AIChatbotWrapper = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const AIChatbot = dynamic(() => import("@/components/AIChatbot"), {
    ssr: false,
    loading: () => <div className="hidden">Loading chatbot...</div>,
  })

  if (!mounted) return null
  return <AIChatbot />
}

export const VoiceAssistantWrapper = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const VoiceAssistant = dynamic(() => import("@/components/VoiceAssistant"), {
    ssr: false,
    loading: () => <div className="hidden">Loading voice assistant...</div>,
  })

  if (!mounted) return null
  return <VoiceAssistant />
}
