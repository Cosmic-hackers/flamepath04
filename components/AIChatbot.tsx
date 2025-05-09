'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, Send, Mic, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen, scrollToBottom])

  const handleSendMessage = useCallback(() => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, isUser: true }])
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = generateAIResponse(input)
        setMessages(prev => [...prev, { text: aiResponse, isUser: false }])
      }, 1000)
      setInput('')
    }
  }, [input])

  const generateAIResponse = (userInput: string) => {
    const responses = [
      "That's an interesting question about " + userInput + ". Let me find some resources for you.",
      "I understand you're asking about " + userInput + ". Here's what I know...",
      "Great question! " + userInput + " is a complex topic. Let's break it down...",
      "I'd be happy to help you with " + userInput + ". What specific aspect are you interested in?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleVoiceInput = () => {
    setIsListening(true)
    // Here you would implement voice recognition
    // For now, we'll just simulate it
    setTimeout(() => {
      setInput("This is a simulated voice input")
      setIsListening(false)
    }, 2000)
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              className="rounded-full p-4 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle size={24} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-80 shadow-lg max-h-[calc(100vh-8rem)] overflow-auto">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  AI Assistant
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X size={18} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-y-auto mb-4 space-y-2">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-2 rounded-lg ${
                        message.isUser ? 'bg-primary text-primary-foreground ml-auto' : 'bg-secondary'
                      } max-w-[80%]`}
                    >
                      {message.text}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send size={18} />
                  </Button>
                  <Button onClick={handleVoiceInput} disabled={isListening}>
                    <Mic size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
