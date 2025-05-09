"use client"

import { useUser } from "@/contexts/UserContext"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, BookOpen, Users, Clock, Search, Play } from "lucide-react"

type Video = {
  id: number
  title: string
  duration: string
  completed: boolean
}

type Section = {
  id: number
  title: string
  videos: Video[]
}

export default function EthicalHackingCourse() {
  const { user } = useUser()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [course, setCourse] = useState<any>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [overallProgress, setOverallProgress] = useState(0)

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem("courses") || "[]")
    const ethicalHackingCourse = courses.find((c: any) => c.id === "ethical-hacking-zero-to-hero")
    if (ethicalHackingCourse) {
      setCourse(ethicalHackingCourse)
    }

    // Generate mock sections and videos
    const mockSections: Section[] = Array.from({ length: 10 }, (_, sectionIndex) => ({
      id: sectionIndex + 1,
      title: `Section ${sectionIndex + 1}: ${getRandomSectionTitle()}`,
      videos: Array.from({ length: 55 }, (_, videoIndex) => ({
        id: sectionIndex * 55 + videoIndex + 1,
        title: `Video ${sectionIndex * 55 + videoIndex + 1}: ${getRandomVideoTitle()}`,
        duration: `${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0")}`,
        completed: Math.random() > 0.7,
      })),
    }))

    setSections(mockSections)

    // Calculate overall progress
    const totalVideos = mockSections.reduce((sum, section) => sum + section.videos.length, 0)
    const completedVideos = mockSections.reduce(
      (sum, section) => sum + section.videos.filter((v) => v.completed).length,
      0,
    )
    setOverallProgress(Math.round((completedVideos / totalVideos) * 100))
  }, [])

  const handleEnroll = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to enroll in this course.",
        variant: "destructive",
      })
      return
    }

    // Update user's enrolled courses in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: any) => {
      if (u.email === user.email) {
        return {
          ...u,
          enrolledCourses: [
            ...(u.enrolledCourses || []),
            {
              id: course.id,
              title: course.title,
              progress: 0,
            },
          ],
        }
      }
      return u
    })
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    toast({
      title: "Successfully Enrolled",
      description: `You have been enrolled in ${course.title}!`,
    })
  }

  const filteredSections = sections
    .map((section) => ({
      ...section,
      videos: section.videos.filter((video) => video.title.toLowerCase().includes(searchTerm.toLowerCase())),
    }))
    .filter((section) => section.videos.length > 0)

  function getRandomSectionTitle() {
    const titles = [
      "Introduction to Ethical Hacking",
      "Network Fundamentals",
      "Reconnaissance Techniques",
      "Scanning Networks",
      "Enumeration",
      "Vulnerability Analysis",
      "System Hacking",
      "Malware Threats",
      "Sniffing",
      "Social Engineering",
    ]
    return titles[Math.floor(Math.random() * titles.length)]
  }

  function getRandomVideoTitle() {
    const titles = [
      "Understanding Ethical Hacking",
      "Setting Up Your Lab Environment",
      "TCP/IP Fundamentals",
      "OSINT Techniques",
      "Nmap Scanning Strategies",
      "Enumerating Services",
      "Exploiting Windows Vulnerabilities",
      "Analyzing Malware Behavior",
      "Wireshark Packet Analysis",
      "Crafting Social Engineering Attacks",
    ]
    return titles[Math.floor(Math.random() * titles.length)]
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

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Course Highlights</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-flame-orange" />
                <span>550 in-depth videos</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-flame-orange" />
                <span>Beginner to Advanced</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-flame-orange" />
                <span>Lifetime Access</span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    This comprehensive ethical hacking course takes you from a beginner to an advanced level, covering
                    all aspects of cybersecurity and ethical hacking. You'll learn through hands-on projects, real-world
                    scenarios, and in-depth lectures.
                  </p>
                  <h3 className="text-xl font-bold mb-2">What You'll Learn:</h3>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Fundamentals of networking and operating systems</li>
                    <li>Web application vulnerabilities and exploitation techniques</li>
                    <li>Wireless network security and hacking methodologies</li>
                    <li>Social engineering tactics and countermeasures</li>
                    <li>Malware analysis and reverse engineering</li>
                    <li>Advanced penetration testing strategies</li>
                    <li>Cyber defense techniques and best practices</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="curriculum">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-4">
                    <li>
                      <span className="font-bold">Introduction to Ethical Hacking</span>
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>Understanding the role of an ethical hacker</li>
                        <li>Legal and ethical considerations</li>
                        <li>Setting up your hacking lab</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-bold">Networking Fundamentals</span>
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>TCP/IP and OSI models</li>
                        <li>Network protocols and their vulnerabilities</li>
                        <li>Wireshark and packet analysis</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-bold">Scanning and Enumeration</span>
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>Port scanning techniques</li>
                        <li>Vulnerability scanning with Nmap and Nessus</li>
                        <li>OS fingerprinting and service enumeration</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-bold">Web Application Hacking</span>
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>SQL injection attacks</li>
                        <li>Cross-site scripting (XSS)</li>
                        <li>OWASP Top 10 vulnerabilities</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-bold">Wireless Network Hacking</span>
                      <ul className="list-disc list-inside ml-6 mt-2">
                        <li>WiFi encryption and cracking techniques</li>
                        <li>Evil twin attacks</li>
                        <li>Bluetooth and IoT security</li>
                      </ul>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="instructor">
              <Card>
                <CardHeader>
                  <CardTitle>Meet Your Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold mb-2">John Doe</h3>
                  <p className="mb-4">
                    John Doe is a renowned cybersecurity expert with over 15 years of experience in the field. He has
                    worked with Fortune 500 companies and government agencies to secure their digital assets and train
                    their security teams.
                  </p>
                  <h4 className="text-lg font-bold mb-2">Certifications:</h4>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Certified Ethical Hacker (CEH)</li>
                    <li>Offensive Security Certified Professional (OSCP)</li>
                    <li>GIAC Security Essentials (GSEC)</li>
                    <li>CompTIA Security+</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="videos">
              <Card>
                <CardHeader>
                  <CardTitle>Course Videos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
                    <Progress value={overallProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-1">{overallProgress}% complete</p>
                  </div>
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Search videos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {filteredSections.map((section) => (
                      <AccordionItem value={`section-${section.id}`} key={section.id}>
                        <AccordionTrigger>{section.title}</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {section.videos.map((video) => (
                              <li key={video.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Play className="mr-2 h-4 w-4 text-flame-orange" />
                                  <span className="text-sm">{video.title}</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-sm text-muted-foreground mr-2">{video.duration}</span>
                                  {video.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Badge variant="secondary" className="text-lg font-bold mb-2">
                  Price: ₹{course.price?.toFixed(2) || "0.00"}
                </Badge>
              </div>
              {user ? (
                user.role === "admin" ? (
                  <Button asChild className="w-full mb-4">
                    <Link href="/admin/course-preview/ethical-hacking-zero-to-hero">Preview Course</Link>
                  </Button>
                ) : (
                  <Button onClick={handleEnroll} className="w-full mb-4">
                    Enroll Now
                  </Button>
                )
              ) : (
                <Button disabled className="w-full mb-4">
                  Please log in to enroll
                </Button>
              )}
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>550 comprehensive video lessons</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>Hands-on labs and projects</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>Downloadable resources</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
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
