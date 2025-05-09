import React from 'react'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

const AnimatedLogo = () => {
  const flameVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="flex items-center">
      <motion.div
        initial="initial"
        animate="animate"
        variants={flameVariants}
      >
        <Flame className="h-8 w-8 text-golden" />
      </motion.div>
      <div className="ml-2 font-bold text-2xl">
        <span className="flame-text">Flamepath</span>
        <span className="ml-2">Academy</span>
      </div>
    </div>
  )
}

export default AnimatedLogo
