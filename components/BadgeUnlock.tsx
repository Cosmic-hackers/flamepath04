"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import confetti from "canvas-confetti"
import { useEffect } from "react"

interface BadgeUnlockProps {
  isOpen: boolean
  onClose: () => void
  badgeUrl: string
  courseName: string
}

export function BadgeUnlock({ isOpen, onClose, badgeUrl, courseName }: BadgeUnlockProps) {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-background p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">🎉 Congratulations!</h2>
              <p className="mb-4">You've completed {courseName}!</p>
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={badgeUrl || "/placeholder.svg"}
                  alt={`${courseName} completion badge`}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm mb-4">You've earned this badge! Check your profile to view all your badges.</p>
              <button onClick={onClose} className="flame-button px-4 py-2 rounded">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
