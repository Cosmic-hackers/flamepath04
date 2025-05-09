import React from 'react'
import { motion } from 'framer-motion'

const AnimatedStudent = () => {
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  }

  const studentVariants = {
    hidden: { x: 0, y: 0 },
    visible: {
      x: [0, 100, 200, 300, 400],
      y: [0, -50, 0, -50, 0],
      transition: { 
        duration: 4,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }

  return (
    <div className="w-full h-64 mb-16 relative">
      <svg className="w-full h-full" viewBox="0 0 500 100">
        {/* Flame path effect */}
        <defs>
          <linearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4500" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,50 Q125,0 250,50 T500,50"
          fill="none"
          stroke="url(#flameGradient)"
          strokeWidth="4"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.circle
          cx="0"
          cy="50"
          r="10"
          fill="#FF4500"
          variants={studentVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Flame trail effect */}
          <motion.animateMotion
            path="M0,0 C30,-30 70,-30 100,0"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </motion.circle>
      </svg>
      <motion.div 
        className="absolute top-0 right-0 bg-gradient-to-r from-flame-orange to-flame-red text-white p-2 rounded-lg font-bold"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        Success!
      </motion.div>
    </div>
  )
}

export default AnimatedStudent
