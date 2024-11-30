...deleted...

mport { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, PlayCircle, FileText, HelpCircle } from 'lucide-react'

const coursesData = {
  'intro-to-ai': {
    title: 'Introduction to AI',
    description: 'Learn the fundamentals of Artificial Intelligence',
    resources: [
      { id: 1, type: 'video', title: 'What is AI?', duration: '10:00', completed: false },
      { id: 2, type: 'article', title: 'History of AI', readTime: '5 min', completed: false },
      { id: 3, type: 'video', title: 'Machine Learning Basics', duration: '15:00', completed: false },
      { id: 4, type: 'quiz', title: 'AI Fundamentals Quiz', questions: 10, completed: false },
      { id: 5, type: 'article', title: 'AI Ethics', readTime: '8 min', completed: false },
      { id: 6, type: 'video', title: 'Future of AI', duration: '12:00', completed: false },
    ]
  },
  'advanced-ml': {
    title: 'Advanced Machine Learning',
    description: 'Dive deep into advanced machine learning concepts',
    resources: [
      { id: 1, type: 'video', title: 'Deep Learning Architecture', duration: '20:00', completed: false },
      { id: 2, type: 'article', title: 'Convolutional Neural Networks', readTime: '10 min', completed: false },
      { id: 3, type: 'video', title: 'Recurrent Neural Networks', duration: '18:00', completed: false },
      { id: 4, type: 'quiz', title: 'Advanced ML Concepts Quiz', questions: 15, completed: false },
      { id: 5, type: 'article', title: 'Reinforcement Learning', readTime: '12 min', completed: false },
      { id: 6, type: 'video', title: 'GANs and Their Applications', duration: '25:00', completed: false },
    ]
  },
  'cybersecurity-fundamentals': {
    title: 'Cybersecurity Fundamentals',
    description: 'Understand the basics of cybersecurity',
    resources: [
      { id: 1, type: 'video', title: 'Introduction to Cybersecurity', duration: '15:00', completed: false },
      { id: 2, type: 'article', title: 'Common Cyber Threats', readTime: '7 min', completed: false },
      { id: 3, type: 'video', title: 'Network Security Basics', duration: '20:00', completed: false },
      { id: 4, type: 'quiz', title: 'Cybersecurity Basics Quiz', questions: 12, completed: false },
      { id: 5, type: 'article', title: 'Cryptography Overview', readTime: '9 min', completed: false },
      { id: 6, type: 'video', title: 'Security Best Practices', duration: '18:00', completed: false },
    ]
  },
  'robotics-programming': {
    title: 'Robotics Programming',
    description: 'Learn to program robots using modern techniques',
    resources: [
      { id: 1, type: 'video', title: 'Introduction to Robotics', duration: '12:00', completed: false },
      { id: 2, type: 'article', title: 'Robot Operating System (ROS)', readTime: '8 min', completed: false },
      { id: 3, type: 'video', title: 'Sensor Integration', duration: '22:00', completed: false },
      { id: 4, type: 'quiz', title: 'Robotics Programming Concepts', questions: 10, completed: false },
      { id: 5, type: 'article', title: 'Path Planning Algorithms', readTime: '11 min', completed: false },
      { id: 6, type: 'video', title: 'Computer Vision in Robotics', duration: '25:00', completed: false },
    ]
  }
}

export default function CourseResources() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.courseId as string
  const course = coursesData[courseId as keyof typeof coursesData]

  const [resources, setResources] = useState(course ? course.resources : [])

  if (!course) {
    return <div>Course not found</div>
  }

  const toggleCompletion = (id: number) => {
    setResources(resources.map(resource =>
      resource.id === id ? { ...resource, completed: !resource.completed } : resource
    ))
  }

  const progress = (resources.filter(r => r.completed).length / resources.length) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {course.title}
      </motion.h1>
      <motion.p 
        className="text-xl text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {course.description}
      </motion.p>

      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-2">Your Progress</h2>
        <Progress value={progress} className="w-full" />
        <p className="mt-2 text-right">{Math.round(progress)}% Complete</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            <Card className={`${resource.completed ? 'bg-green-50' : ''} transition-colors duration-300`}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {resource.type === 'video' && <PlayCircle className="mr-2" />}
                  {resource.type === 'article' && <FileText className="mr-2" />}
                  {resource.type === 'quiz' && <HelpCircle className="mr-2" />}
                  {resource.title}
                </CardTitle>
                <CardDescription>
                  {resource.type === 'video' && `Duration: ${resource.duration}`}
                  {resource.type === 'article' && `Read time: ${resource.readTime}`}
                  {resource.type === 'quiz' && `Questions: ${resource.questions}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => toggleCompletion(resource.id)}
                  variant={resource.completed ? "outline" : "default"}
                  className="w-full"
                >
                  {resource.completed ? (
                    <>
                      <CheckCircle className="mr-2" />
                      Completed
                    </>
                  ) : (
                    'Mark as Completed'
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button onClick={() => router.push('/learning-hub')}>
          Back to Learning Hub
        </Button>
      </motion.div>
    </div>
  )
}

