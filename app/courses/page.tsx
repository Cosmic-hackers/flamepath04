"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@/contexts/UserContext"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/components/ui/use-toast"

type Course = {
  id: string
  title: string
  description: string
  price: number
  isPaid: boolean
  thumbnail: string
  isNew?: boolean
  isUpcoming?: boolean
  type: "course" | "project"
  originalPrice?: number
  discountPercentage?: number
  content?: { title: string; description: string }[]
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const { user } = useUser()
  const { addItem } = useCart()
  const { toast } = useToast()

  if (!courses) {
    return <div>Loading courses...</div>
  }

  useEffect(() => {
    try {
      const storedCourses = JSON.parse(localStorage.getItem("courses") || "[]")
      if (storedCourses.length === 0) {
        const defaultCourses = [
          {
            id: "html-css-2025",
            title: "HTML CSS Full Course 2025",
            description: "Complete HTML & CSS tutorial for beginners. Master web development fundamentals.",
            price: 0,
            isPaid: false,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Heres_a_prompt_you_can_use_to_create_a_pro_0%20(1).jpg-U4gMSwntn0DovCJmNYs8YVaHjqKVFe.jpeg",
            isNew: true,
            type: "course",
          },
          {
            id: "linux-for-ethical-hacking",
            title: "Linux for Ethical Hacking",
            description: "Master Linux fundamentals essential for ethical hacking and cybersecurity.",
            price: 0,
            isPaid: false,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Prompt_A_bold_and_modern_thumbnail_for_a_3.jpg-In2iTr4OyTvN9bxwqMSqfN1dU6oQTa.jpeg",
            isNew: true,
            type: "course",
          },
          {
            id: "ethical-hacking-zero-to-hero",
            title: "Complete Ethical Hacking Course: Zero to Hero for Beginners",
            description: "A comprehensive, step-by-step guide to mastering ethical hacking and cybersecurity.",
            price: 9999,
            isPaid: true,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6bf767d2-6270-4acb-a9e7-ad7e0958ba3e-yd6VjBPf9OTmhbdltQVyEyMmXWJouI.jpeg",
            isUpcoming: true,
            type: "course",
          },
          {
            id: "dos-ddos-telugu",
            title: "DOS and DDOS Course (Telugu)",
            description: "Learn about DoS and DDoS attacks in Telugu.",
            price: 499,
            isPaid: true,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_Title_Mastering_DDoS_Attacks_A_Comprehensive_2.jpg-1Bn2ZuZx59hcbd0rHA3CdbSRdQsqrN.jpeg",
            isUpcoming: true,
            type: "course",
          },
          {
            id: "web-pentesting",
            title: "Web Penetration Testing Project",
            description: "Hands-on web security project.",
            price: 4999,
            isPaid: true,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_Title_Master_Web_Penetration_Testing_Secure_Y_2.jpg-QhEPrUvYFHmZFXx3Db2UFBEJauYGs1.jpeg",
            type: "project",
            isUpcoming: true,
          },
          {
            id: "malware-analysis",
            title: "Malware Analysis Lab",
            description: "Analyze and understand malware in this practical project.",
            price: 3999,
            isPaid: true,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_Title_Malware_Analysis_Lab_Deep_Dive_into_Cyb_2.jpg-NYEDOFcJNdp1Q1FYygoMfk7eSBfZml.jpeg",
            type: "project",
            isUpcoming: true,
          },
          {
            id: "python-course",
            title: "Master Python Programming: A Complete Course with Projects",
            description:
              "Learn Python from basics to advanced concepts with 69 comprehensive videos and hands-on projects.",
            price: 69,
            isPaid: true,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20250111_194432.jpg-rLLgsHhaG8oK12XIwUezZ35mCyb8u4.jpeg",
            isNew: true,
            type: "course",
            originalPrice: 999,
            discountPercentage: 93,
          },
          {
            id: "machine-learning-for-beginners",
            title: "Machine Learning for Beginners",
            description: "Master the art of Machine Learning with our all-inclusive course, Machine Learning Mastery.",
            price: 199,
            isPaid: true,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Prompt_A_clean_and_vibrant_thumbnail_for_2.jpg-aBmNBRzNXOxmHo7ZXRTQFd4u48mdUW.jpeg",
            isNew: true,
            type: "course",
            originalPrice: 5999,
            discountPercentage: 96.32,
          },
          {
            id: "cyberlab-mastery",
            title: "CyberLab Mastery: Practical Ethical Hacking with Hack The Box and TryHackMe",
            description:
              "Master practical ethical hacking skills with hands-on labs using Hack The Box and TryHackMe platforms.",
            price: 399,
            isPaid: true,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Enhanced_Prompt_for_a_HighImpact_Thumbnail_3.jpg-KqIcbH5HIZqshk097jAqdT8DcWgKdu.jpeg",
            isNew: true,
            type: "course",
            originalPrice: 7999,
            discountPercentage: 95,
          },
          {
            id: "information-gathering-hydra",
            title: "Information Gathering and Hydra Techniques",
            description:
              "Master the art of information gathering and learn advanced Hydra techniques for ethical hacking.",
            price: 2999,
            isPaid: true,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Enhanced_Prompt_for_an_Information_Gatheri_1.jpg-gQhMmRBIz58zJrJDIaiP5o6SBCIDa7.jpeg",
            isNew: true,
            type: "course",
            content: [
              {
                title: "Introduction to Information Gathering",
                description: "Learn the basics of information gathering and its importance in ethical hacking.",
              },
              {
                title: "OSINT Techniques",
                description: "Explore Open Source Intelligence (OSINT) techniques for gathering information.",
              },
              {
                title: "Advanced Google Dorks",
                description: "Master advanced Google search techniques for information gathering.",
              },
              {
                title: "Social Engineering for Information Gathering",
                description: "Learn how to use social engineering techniques to gather sensitive information.",
              },
              {
                title: "Introduction to Hydra",
                description: "Understand the basics of Hydra and its applications in ethical hacking.",
              },
              {
                title: "Hydra for Password Cracking",
                description: "Learn how to use Hydra for password cracking on various protocols.",
              },
              {
                title: "Advanced Hydra Techniques",
                description: "Explore advanced Hydra techniques for more complex scenarios.",
              },
              {
                title: "Combining Information Gathering with Hydra",
                description:
                  "Learn how to integrate information gathering techniques with Hydra for more effective ethical hacking.",
              },
            ],
          },
          {
            id: "nmap-sqlmap-mastery",
            title: "NMAP and SQLMAP Mastery",
            description: "Become an expert in network mapping with NMAP and SQL injection techniques using SQLMAP.",
            price: 3499,
            isPaid: true,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Enhanced_Prompt_for_an_Nmap_and_SQLMap_Mas_3.jpg-nEH3q6GEoznN0h7kT9WXiG2WuN73IV.jpeg",
            isNew: true,
            type: "course",
            content: [
              {
                title: "NMAP Fundamentals",
                description: "Learn the basics of NMAP and its importance in network security.",
              },
              {
                title: "Advanced NMAP Scanning Techniques",
                description: "Master advanced NMAP scanning techniques for comprehensive network mapping.",
              },
              {
                title: "NMAP Scripting Engine (NSE)",
                description: "Explore the power of NMAP Scripting Engine for custom scans and automation.",
              },
              {
                title: "NMAP for OS Fingerprinting",
                description: "Learn how to use NMAP for accurate operating system detection.",
              },
              {
                title: "Introduction to SQLMAP",
                description: "Understand the basics of SQLMAP and its role in detecting SQL injection vulnerabilities.",
              },
              {
                title: "SQLMAP Techniques for SQL Injection",
                description: "Master various SQLMAP techniques for exploiting SQL injection vulnerabilities.",
              },
              {
                title: "Advanced SQLMAP Features",
                description: "Explore advanced SQLMAP features for complex SQL injection scenarios.",
              },
              {
                title: "Combining NMAP and SQLMAP",
                description: "Learn how to integrate NMAP and SQLMAP for comprehensive security assessments.",
              },
            ],
          },
          {
            id: "web-hacking-networking",
            title: "Web Hacking and Networking Fundamentals",
            description:
              "Dive deep into web application security and master essential networking concepts for ethical hacking.",
            price: 3999,
            isPaid: true,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Enhanced_Prompt_for_a_Web_Hacking_and_Netw_3.jpg-oTzYPZ3HIRTgyQ27fdPAtwqRhZZ7V7.jpeg",
            isNew: true,
            type: "course",
            content: [
              {
                title: "Web Application Security Basics",
                description: "Learn the fundamentals of web application security and common vulnerabilities.",
              },
              {
                title: "Cross-Site Scripting (XSS) Attacks",
                description: "Master various types of XSS attacks and learn how to prevent them.",
              },
              {
                title: "SQL Injection Techniques",
                description: "Explore different SQL injection techniques and their impact on web applications.",
              },
              {
                title: "Cross-Site Request Forgery (CSRF)",
                description: "Understand CSRF attacks and learn effective prevention methods.",
              },
              {
                title: "Networking Fundamentals for Ethical Hacking",
                description: "Learn essential networking concepts crucial for ethical hacking.",
              },
              {
                title: "TCP/IP and OSI Model",
                description: "Deep dive into TCP/IP and OSI models and their relevance in ethical hacking.",
              },
              {
                title: "Network Protocols and Vulnerabilities",
                description: "Explore various network protocols and their potential vulnerabilities.",
              },
              {
                title: "Wireless Network Security",
                description: "Learn about wireless network security and common attack vectors.",
              },
            ],
          },
          {
            id: "sql-lite-mastery",
            title: "SQL Lite Mastery: From Beginner to Pro",
            description:
              "Master SQLite, the powerful and lightweight relational database engine. Learn everything from basic queries to advanced database management.",
            price: 1999,
            isPaid: true,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Enhanced_Prompt_for_an_SQLite_Mastery_Cour_0.jpg-0NZxLvWquYapAZ24DcLnxKkYw4NW91.jpeg",
            isNew: true,
            type: "course",
            content: [
              { title: "Introduction to SQLite", description: "Learn the basics of SQLite and its unique features." },
              {
                title: "Database Design",
                description: "Master the art of designing efficient and normalized databases.",
              },
              {
                title: "CRUD Operations",
                description: "Perform Create, Read, Update, and Delete operations with SQLite.",
              },
              { title: "Advanced Queries", description: "Dive into complex queries, joins, and subqueries." },
              {
                title: "Indexing and Optimization",
                description: "Optimize your database performance with proper indexing techniques.",
              },
              {
                title: "Transactions and Concurrency",
                description: "Understand and implement transactions and handle concurrent access.",
              },
              {
                title: "SQLite in Applications",
                description: "Integrate SQLite with various programming languages and frameworks.",
              },
              { title: "Real-world Projects", description: "Apply your skills in practical, hands-on projects." },
            ],
          },
          {
            id: "bug-bounty-hunting",
            title: "Bug Bounty Hunting: From Novice to Expert",
            description: "Master the art of bug bounty hunting and start your career in cybersecurity.",
            price: 999,
            isPaid: true,
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_Heres_the_prompt_you_can_use_to_create_a_s_0.jpg-ExGgxTtjCFfpp1omyHlsFdfGbNMB5R.jpeg",
            isNew: true,
            type: "course",
            originalPrice: 10000,
            discountPercentage: 90.01,
          },
        ]
        localStorage.setItem("courses", JSON.stringify(defaultCourses))
        setCourses(defaultCourses)
      } else {
        setCourses(storedCourses)
      }
    } catch (error) {
      console.error("Error loading courses:", error)
      setCourses([])
    }
  }, [])

  const getCourseStatus = (courseId: string) => {
    if (!user) return "notLoggedIn"
    if (user.role === "admin") return "admin"

    const purchasedCourses = user.purchasedCourses || []
    const accessibleCourses = user.accessibleCourses || []

    if (accessibleCourses.includes(courseId)) return "accessible"
    if (purchasedCourses.includes(courseId)) return "waitingConfirmation"
    return "notPurchased"
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 flame-text text-center">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses &&
          courses
            .sort((a, b) => {
              if (a.isUpcoming && !b.isUpcoming) return 1
              if (!a.isUpcoming && b.isUpcoming) return -1
              return 0
            })
            .map((course) => {
              const courseStatus = getCourseStatus(course.id)
              return (
                <Card key={course.id} className="tech-card flex flex-col">
                  <div className="relative">
                    <Image
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {course.isNew && (
                      <span className="absolute top-2 right-2 bg-flame-red text-white px-2 py-1 rounded text-sm">
                        New
                      </span>
                    )}
                    {course.isUpcoming && (
                      <span className="absolute top-2 right-2 bg-electric-blue text-white px-2 py-1 rounded text-sm">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-electric-blue">{course.title}</CardTitle>
                    <CardDescription className="text-foreground-light">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-end">
                    <div className="mt-4">
                      {courseStatus === "admin" && (
                        <Button asChild className="w-full flame-button">
                          <Link href={`/admin/course-preview/${course.id}`}>Preview Course</Link>
                        </Button>
                      )}
                      {courseStatus === "accessible" && (
                        <Button asChild className="w-full flame-button">
                          <Link href={`/courses/${course.id}`}>Access Course</Link>
                        </Button>
                      )}
                      {courseStatus === "waitingConfirmation" && (
                        <Button disabled className="w-full">
                          Waiting for Confirmation
                        </Button>
                      )}
                      {courseStatus === "notPurchased" && !course.isUpcoming && (
                        <Button asChild className="w-full flame-button">
                          <Link href={`/courses/${course.id}`}>{course.isPaid ? "View Details" : "Start Course"}</Link>
                        </Button>
                      )}
                      {courseStatus === "notLoggedIn" && (
                        <Button disabled className="w-full">
                          Please log in to access
                        </Button>
                      )}
                      {course.isUpcoming && (
                        <Button disabled className="w-full">
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
      </div>
    </div>
  )
}
