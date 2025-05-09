'use client'

import { useUser } from '@/contexts/UserContext'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, BookOpen, Users, Clock, Award, Globe } from 'lucide-react'

export default function DosDdosCourse() {
  const { user } = useUser()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]')
    const dosDdosCourse = courses.find((c: any) => c.id === 'dos-ddos-telugu')
    if (dosDdosCourse) {
      setCourse(dosDdosCourse)
    }
  }, [])

  const handleAddToCart = () => {
    addItem({ id: course.id, title: course.title, price: course.price })
    toast({
      title: "Course added to cart",
      description: `${course.title} has been added to your cart.`,
    })
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
          
          <Card className="mb-8 tech-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-electric-blue">Course Highlights</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-foreground-light">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-flame-orange" />
                <span>{course.parts} comprehensive videos</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-flame-orange" />
                <span>Suitable for all levels</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-flame-orange" />
                <span>Self-paced learning</span>
              </div>
              <div className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-flame-orange" />
                <span>Taught in Telugu</span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="bg-background-light border border-electric-blue">
              <TabsTrigger value="overview" className="text-foreground-light data-[state=active]:bg-flame-red data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="curriculum" className="text-foreground-light data-[state=active]:bg-flame-red data-[state=active]:text-white">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor" className="text-foreground-light data-[state=active]:bg-flame-red data-[state=active]:text-white">Instructor</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card className="tech-card">
                <CardHeader>
                  <CardTitle className="text-electric-blue">Course Overview</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground-light">
                  <p className="mb-4">This comprehensive course on Denial of Service (DoS) and Distributed Denial of Service (DDoS) attacks is taught entirely in Telugu, making it accessible to a wide audience. You'll learn about these prevalent threats, how to identify them, and strategies to mitigate their impact.</p>
                  <h3 className="text-xl font-bold mb-2 text-electric-blue">What You'll Learn:</h3>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Fundamentals of DoS and DDoS attacks</li>
                    <li>Different types of DoS and DDoS attacks</li>
                    <li>Tools and techniques used by attackers</li>
                    <li>Recognizing vulnerabilities in networks and systems</li>
                    <li>Mitigation strategies and best practices</li>
                    <li>Real-world case studies and examples</li>
                    <li>Hands-on labs for practical experience</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="curriculum">
              <Card className="tech-card">
                <CardHeader>
                  <CardTitle className="text-electric-blue">Course Curriculum</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground-light">
                  <ol className="list-decimal list-inside space-y-4">
                    <li>
                      <span className="font-bold text-electric-blue">Introduction to DoS and DDoS</span>
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>Defining DoS and DDoS attacks</li>
                        <li>Historical context and evolution</li>
                        <li>Impact on businesses and individuals</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-bold text-electric-blue">Types of DoS and DDoS Attacks</span>
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>Volume-based attacks</li>
                        <li>Protocol attacks</li>
                        <li>Application layer attacks</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-bold text-electric-blue">Attack Methodologies</span>
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>Botnets and their role in DDoS</li>
                        <li>Amplification techniques</li>
                        <li>Reflection attacks</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-bold text-electric-blue">Detection and Analysis</span>
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>Traffic analysis techniques</li>
                        <li>Using monitoring tools</li>
                        <li>Identifying attack signatures</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-bold text-electric-blue">Mitigation Strategies</span>
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>Network-level defenses</li>
                        <li>Application-level protection</li>
                        <li>Cloud-based mitigation services</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="instructor">
              <Card className="tech-card">
                <CardHeader>
                  <CardTitle className="text-electric-blue">Meet Your Instructor</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground-light">
                  <h3 className="text-xl font-bold mb-2 text-electric-blue">Ravi Kumar</h3>
                  <p className="mb-4">Ravi Kumar is a seasoned cybersecurity professional with over 10 years of experience in the field. He specializes in network security and has helped numerous organizations defend against DoS and DDoS attacks. Ravi is passionate about teaching complex technical concepts in Telugu, making cybersecurity education more accessible to native speakers.</p>
                  <h4 className="text-lg font-bold mb-2 text-electric-blue">Expertise:</h4>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Network Security</li>
                    <li>DDoS Mitigation</li>
                    <li>Incident Response</li>
                    <li>Security Architecture</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-8 tech-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-electric-blue">Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Badge variant="secondary" className="text-lg font-bold mb-2 bg-flame-orange text-white">
                  Price: ₹{course.price.toFixed(2)}
                </Badge>
              </div>
              {user ? (
                user.role === 'admin' ? (
                  <Button asChild className="w-full mb-4 flame-button">
                    <Link href="/admin/course-preview/dos-ddos-telugu">Preview Course</Link>
                  </Button>
                ) : (
                  <Button onClick={handleAddToCart} className="w-full mb-4 flame-button">Add to Cart</Button>
                )
              ) : (
                <Button disabled className="w-full mb-4">Please log in to purchase</Button>
              )}
              <ul className="space-y-2 text-foreground-light">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-flame-orange" />
                  <span>4 in-depth video lessons</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-flame-orange" />
                  <span>Practical demonstrations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-flame-orange" />
                  <span>Downloadable resources</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-flame-orange" />
                  <span>Mobile and TV access</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
