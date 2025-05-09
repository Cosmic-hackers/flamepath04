'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { CheckCircle, BookOpen, Users, Clock, Award, Video } from 'lucide-react'

export default function CyberLabMasteryCourse() {
  const { user } = useUser()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [course, setCourse] = useState<any>(null)
  const [isReceived, setIsReceived] = useState(false)

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]')
    const cyberlabCourse = courses.find((c: any) => c.id === 'cyberlab-mastery')
    if (cyberlabCourse) {
      setCourse(cyberlabCourse)
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
    addItem({ id: course.id, title: course.title, price: 399, quantity: 1, type: 'course' })
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
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1%20-%20What%20is%20HackTheBox-VLb9V8MUlbyEupFjUkc8zvJVsKdsr7.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Course Highlights</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Video className="mr-2 h-5 w-5 text-flame-orange" />
                <span>143 Practical Videos</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-flame-orange" />
                <span>Hands-On Labs</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-flame-orange" />
                <span>Resources & Tools</span>
              </div>
            </CardContent>
          </Card>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-electric-blue">Course Modules</h2>

            <ol className="list-decimal list-inside space-y-4">
              <li><strong>Introduction to Hack The Box</strong>
                <p>Understand the platform, its purpose, and how it fosters hands-on cybersecurity learning.</p>
              </li>
              <li><strong>Learning Paths for Hack The Box</strong>
                <p>Explore guided paths to strengthen your ethical hacking and penetration testing skills.</p>
              </li>
              <li><strong>Accessing Hack The Box</strong>
                <p>Step-by-step instructions to set up and access Hack The Box, including networking configurations.</p>
              </li>
              <li><strong>Hack The Box Lab Practicals</strong>
                <p>Dive into real-world practicals with Hack The Box machines. Solve challenges and learn exploitation techniques.</p>
              </li>
              <li><strong>Introduction to TryHackMe</strong>
                <p>Get acquainted with TryHackMe, its learning approach, and available content for all skill levels.</p>
              </li>
              <li><strong>Learning Paths for TryHackMe</strong>
                <p>Follow structured learning tracks covering topics like penetration testing, red teaming, and defensive security.</p>
              </li>
              <li><strong>Accessing TryHackMe</strong>
                <p>A complete guide to accessing TryHackMe, configuring the environment, and starting your journey.</p>
              </li>
              <li><strong>About Kali Linux</strong>
                <p>An overview of Kali Linux, its tools, and why it's the go-to OS for ethical hacking.</p>
              </li>
              <li><strong>Basic to Advanced Commands - Part 1 & Part 2</strong>
                <p>Master essential Linux commands, scripting basics, and advanced techniques for hacking workflows.</p>
              </li>
              <li><strong>Network Scanning Tools in Kali Linux</strong>
                <p>Learn how to use tools like Nmap, Wireshark, and Nessus to discover and analyze vulnerabilities.</p>
              </li>
              <li><strong>Web Attacks - Complete Guide</strong>
                <p>A comprehensive module on web-based vulnerabilities, including SQL injection, XSS, and file inclusion attacks.</p>
              </li>
            </ol>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-electric-blue">Course Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>143 Practical Videos:</strong> Comprehensive demonstrations to guide you through every step.</li>
              <li><strong>Hands-On Labs:</strong> Solve real-world challenges on Hack The Box and TryHackMe platforms.</li>
              <li><strong>Resources & Tools:</strong> Access downloadable content, tools, and walkthroughs to enhance your learning experience.</li>
            </ul>

            <p className="mt-4">
              This course is ideal for aspiring cybersecurity professionals, ethical hackers, and anyone keen on mastering practical hacking skills. Transform your potential into expertise—enroll today!
            </p>
          </div>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex items-center justify-center space-x-4">
                <span className="text-3xl font-bold text-white line-through">₹7999</span>
                <span className="text-2xl font-bold text-yellow-400">95% OFF</span>
              </div>
              <p className="mt-2 text-center text-flame-orange font-bold text-4xl">
                ₹399
              </p>
              {user ? (
                user.role === 'admin' ? (
                  <Button asChild className="w-full mb-4 flame-button">
                    <Link href="/admin/course-preview/cyberlab-mastery">Preview Course</Link>
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
                  <span>143 practical videos</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>Hands-on labs</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>Certification support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>Downloadable resources</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>Lifetime access</span>
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
