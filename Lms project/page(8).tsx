...deleted...

mport { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const courses = [
  { id: 'intro-to-ai', title: 'Introduction to AI', category: 'AI', level: 'Beginner' },
  { id: 'advanced-ml', title: 'Advanced Machine Learning', category: 'Machine Learning', level: 'Advanced' },
  { id: 'cybersecurity-fundamentals', title: 'Cybersecurity Fundamentals', category: 'Cybersecurity', level: 'Intermediate' },
  { id: 'robotics-programming', title: 'Robotics Programming', category: 'Robotics', level: 'Intermediate' },
]

export default function LearningHub() {
  const [query, setQuery] = useState('')

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(query.toLowerCase()) ||
    course.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AI-Powered Learning Hub
      </motion.h1>
      
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Input
          type="search"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.category} - {course.level}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                <Button asChild className="mt-4">
                  <Link href={`/learning-hub/${course.id}`}>Start Learning</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

