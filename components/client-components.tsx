"use client"

import dynamic from "next/dynamic"

// Dynamic imports with ssr: false
export const AIChatbot = dynamic(() => import("@/components/AIChatbot"), { ssr: false })
export const VoiceAssistant = dynamic(() => import("@/components/VoiceAssistant"), { ssr: false })
