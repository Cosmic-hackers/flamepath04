'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { CheckCircle, BookOpen, Users, Clock, Award } from 'lucide-react'

export default function MachineLearningCourse() {
  const { user } = useUser()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [course, setCourse] = useState<any>(null)
  const [isReceived, setIsReceived] = useState(false)

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]')
    const mlCourse = courses.find((c: any) => c.id === 'machine-learning-for-beginners')
    if (mlCourse) {
      setCourse(mlCourse)
    }
  }, [])

  useEffect(() => {
    if (user) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const currentUser = users.find((u: any) => u.email === user.email)
      if (currentUser && currentUser.receivedCourses) {
        setIsReceived(currentUser.receivedCourses.includes(course.id))
      }
    }
  }, [user, course])

  const handleAddToCart = () => {
    addItem({ id: course.id, title: course.title, price: 199, quantity: 1, type: 'course' })
    toast({
      title: "Course added to cart",
      description: `${course.title} has been added to your cart.`,
    })
  }

  const handleMarkAsReceived = () => {
    if (user) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const updatedUsers = users.map((u: any) => {
        if (u.email === user.email) {
          return {
            ...u,
            receivedCourses: [...(u.receivedCourses || []), course.id],
            enrolledCourses: [...(u.enrolledCourses || []), {
              id: course.id,
              title: course.title,
              progress: 0
            }]
          }
        }
        return u
      })
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      setIsReceived(true)
      toast({
        title: "Course Marked as Received",
        description: "The course has been added to your enrolled courses.",
      })
    }
  }

  if (!course) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4 flame-text">{course.title}</h1>
          <p className="text-xl mb-6 text-foreground-light">{course.description}</p>
          <p className="text-red-500 font-semibold mb-4">
            Warning: This is a paid course. Please ensure you have made the payment before accessing the content.
          </p>
          <div className="aspect-video mb-8">
            <video controls className="w-full rounded-lg">
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/001%20Welcome%20to%20The%20Machine%20Learning%20Series%20Level%201-uktzVfnXYlrzw1FPY4SDJjvsK2gBBo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Course Highlights</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-flame-orange" />
                <span>5 Comprehensive Modules</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-flame-orange" />
                <span>Beginner to Intermediate</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-flame-orange" />
                <span>Self-Paced Learning</span>
              </div>
            </CardContent>
          </Card>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-electric-blue">Course Modules</h2>
            
            <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
            <p>Dive into the foundational concepts of machine learning, including its significance, applications, and real-world impact. Learn about the data-driven revolution and how ML transforms industries.</p>

            <h3 className="text-xl font-semibold mb-2 mt-4">2. Regression</h3>
            <p>Discover how regression techniques predict continuous outcomes. From simple linear models to advanced approaches, gain practical insights into applications like sales forecasting and stock trend analysis.</p>

            <h3 className="text-xl font-semibold mb-2 mt-4">3. Classification</h3>
            <p>Learn how to categorize data effectively using classification techniques. Topics include logistic regression, decision trees, and neural networks for applications like image recognition and sentiment analysis.</p>

            <h3 className="text-xl font-semibold mb-2 mt-4">4. Clustering</h3>
            <p>Explore unsupervised learning with clustering techniques like k-means and DBSCAN. Apply clustering to group customers, analyze text data, and more.</p>

            <h3 className="text-xl font-semibold mb-2 mt-4">5. Wrapping Up</h3>
            <p>Conclude your learning journey with a review of key concepts, insights into the future of machine learning, and guidance on how to implement what you've learned in real-world scenarios.</p>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-electric-blue">Exclusive Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Hands-On Projects:</strong> Work on real-world projects to solidify your understanding and showcase your expertise. Examples include building a movie recommendation system, predicting house prices, and customer segmentation.</li>
              <li><strong>Google Colab Integration:</strong> Access pre-configured notebooks to practice coding and run experiments in a cloud-based environment without the need for local setup.</li>
              <li><strong>GitHub Repository:</strong> Get access to a well-organized repository with datasets, source code, and project templates. Use it as a resource hub throughout your learning journey.</li>
              <li><strong>Practical Resources:</strong> Downloadable cheat sheets, datasets, and guides to enhance your learning.</li>
            </ul>


          </div>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex items-center justify-center space-x-4">
                <span className="text-3xl font-bold text-white line-through">₹5999</span>
                <span className="text-2xl font-bold text-yellow-400">96.32% OFF</span>
              </div>
              <p className="mt-2 text-center text-flame-orange font-bold text-4xl">
                ₹199
              </p>
              {user ? (
                user.role === 'admin' ? (
                  <Button asChild className="w-full mb-4 flame-button">
                    <Link href="/admin/course-preview/machine-learning-for-beginners">Preview Course</Link>
                  </Button>
                ) : (
                  <Button onClick={handleAddToCart} className="w-full mb-4 flame-button">Add to Cart</Button>
                )
              ) : (
                <Button disabled className="w-full mb-4">Please log in to purchase</Button>
              )}
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>5 comprehensive modules</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>Hands-on projects</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>Google Colab integration</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>GitHub repository access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>Downloadable resources</span>
                </li>
              </ul>
              {user && course.isPaid && (
                <div className="mt-4">
                  {!isReceived ? (
                    <Button onClick={handleMarkAsReceived} className="w-full flame-button">
                      Mark as Received
                    </Button>
                  ) : (
                    <p className="text-green-500 font-semibold">Course Received</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
