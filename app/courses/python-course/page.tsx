'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'

export default function PythonCourse() {
  const { user } = useUser()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [course, setCourse] = useState<any>(null)
  const [isReceived, setIsReceived] = useState(false)
  const courseStatus = 'waitingConfirmation'; // Placeholder for course status

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]')
    const pythonCourse = courses.find((c: any) => c.id === 'python-course')
    if (pythonCourse) {
      setCourse(pythonCourse)
    }
  }, [])

  useEffect(() => {
    if (user) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const currentUser = users.find((u: any) => u.email === user.email)
      if (currentUser && currentUser.receivedCourses) {
        setIsReceived(currentUser.receivedCourses.includes('python-course'))
      }
    }
  }, [user])

  const handleAddToCart = () => {
    addItem({ id: course.id, title: course.title, price: 69, quantity: 1, type: 'course' })
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
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flame-text">
            Master Python Programming: A Complete Course with Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl mb-6 text-flame-orange">🔥 61 Comprehensive Videos + 10 Hands-On Projects 🔥</p>

            {/* Add video embed */}
            <div className="aspect-video mb-8 rounded-lg overflow-hidden">
              <iframe
                src="https://drive.google.com/file/d/1Q4DubwzZCEHu0aLjNbjLaSrSzoqyVIgm/preview?usp=sharing"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full border-0"
                style={{ minHeight: '500px' }}
              ></iframe>
            </div>

            <h4 className="text-xl font-semibold mb-2">Why Choose This Course?</h4>
            <p>This course is your ultimate guide to mastering Python from the ground up! Perfect for beginners and intermediates, it is designed to take you step-by-step through the essentials of Python programming up to Object-Oriented Programming (OOP) concepts, while equipping you with practical skills through 10 exciting hands-on projects.</p>
            <p className="text-red-500 font-semibold mb-4">
              Warning: This is a paid course. Please ensure you have made the payment before accessing the content.
            </p>

            <h4 className="text-xl font-semibold mb-2 mt-6">Course Highlights</h4>
            <ul className="list-disc list-inside mb-4">
              <li>61 High-Quality Video Tutorials: Bite-sized, engaging lessons designed to simplify complex topics.</li>
              <li>Projects in Every Module: Learn by doing with 10 exciting hands-on projects to reinforce your skills.</li>
              <li>Beginner to Advanced Topics: Start with the basics and progress to advanced Python concepts, including OOP.</li>
              <li>Up-to-Date Content: Stay ahead with Python's latest updates and industry practices.</li>
              <li>Career-Boosting Skills: Prepare for roles in AI, machine learning, data science, and more.</li>
            </ul>

            <h4 className="text-xl font-semibold mb-2 mt-6">What Will You Learn?</h4>
            <ul className="list-disc list-inside mb-4">
              <li>Python Fundamentals: Data types, variables, operators, and control structures.</li>
              <li>Advanced Concepts: Functions, file handling, modules, and packages.</li>
              <li>Object-Oriented Programming (OOP): Classes, objects, inheritance, and encapsulation.</li>
              <li>Projects to Practice: Implement your knowledge through 10 exciting, real-world challenges!</li>
            </ul>

            <h4 className="text-xl font-semibold mb-2 mt-6">Why This Course Stands Out</h4>
            <ul className="list-disc list-inside mb-4">
              <li>Interactive Learning: Learn at your own pace with easy-to-follow examples and quizzes.</li>
              <li>Practical Projects: Projects that showcase your skills and can be added to your portfolio.</li>
              <li>Affordable Price: Gain lifetime access to a high-value course without breaking the bank.</li>
              <li>Designed for Everyone: Whether you're a student, professional, or enthusiast, this course is tailored for you!</li>
            </ul>

            <h4 className="text-xl font-semibold mb-2 mt-6">What Students Are Saying</h4>
            <ul className="list-disc list-inside mb-4">
              <li>"The projects made learning so much fun!"</li>
              <li>"I went from zero to coding my own Python programs in weeks!"</li>
              <li>"The OOP module cleared all my doubts—I feel job-ready!"</li>
            </ul>

            <h4 className="text-xl font-semibold mb-2 mt-6">Exclusive Bonus</h4>
            <ul className="list-disc list-inside mb-4">
              <li>Downloadable Resources: Includes all codes and project files to follow along.</li>
              <li>Certification support: Showcase your expertise to potential employers.</li>
            </ul>

            <h4 className="text-xl font-semibold mb-2 mt-6">Limited-Time Offer: Enroll Now!</h4>
            <p>Unlock your potential today! This course is your ticket to mastering Python, one of the most in-demand programming languages in the world. Don't miss out—start your journey now!</p>

            <div className="mt-4 flex items-center justify-center space-x-4">
              <span className="text-3xl font-bold text-white line-through">₹999</span>
              <span className="text-2xl font-bold text-yellow-400">93% OFF</span>
            </div>
            <p className="mt-2 text-center text-flame-orange font-bold text-4xl">
              ₹69
            </p>

            <div className="mt-8">
              <p className="text-lg mb-2">
                Or buy with: <span className="font-bold">{69 * 10} Blazecredits 🪙</span>
              </p>
              {user ? (
                user.role === 'admin' ? (
                  <Button asChild className="flame-button">
                    <Link href="/admin/course-preview/python-course">Preview Course</Link>
                  </Button>
                ) : (
                  <Button onClick={handleAddToCart} className="flame-button">Add to Cart</Button>
                )
              ) : (
                <Button disabled className="flame-button">Please log in to purchase</Button>
              )}
            </div>
            {user && course && course.isPaid && (
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
