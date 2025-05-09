'use client'

import { useUser } from '@/contexts/UserContext'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function EthicalHackingCourse() {
  const { user } = useUser()
  const { addItem } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]')
    const ethicalHackingCourse = courses.find((c: any) => c.id === 'ethical-hacking-zero-to-hero')
    if (ethicalHackingCourse) {
      setCourse(ethicalHackingCourse)
    }
  }, [])

  if (!course) {
    return <div>Loading...</div>
  }

  const handleAddToCart = () => {
    addItem({ id: course.id, title: course.title, price: course.price })
    toast({
      title: "Course added to cart",
      description: `${course.title} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{course.title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>{course.parts} in-depth videos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">{course.description}</p>
            
            <h2 className="text-2xl font-bold mb-2">What's Included in the Course?</h2>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Complete Beginner to Advanced Training</strong>: No prior experience is needed! We'll start with the basics and build up to advanced hacking techniques.</li>
              <li><strong>Real-World Scenarios</strong>: Learn how to apply your skills in real-world environments with practical examples and live simulations.</li>
              <li><strong>Tool Mastery</strong>: Get in-depth knowledge of industry-standard tools like Kali Linux, Nmap, Metasploit, Wireshark, Burp Suite, and more.</li>
              <li><strong>Hands-On Learning</strong>: Each video provides step-by-step instructions, guiding you through the process of ethical hacking and security.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-2">Comprehensive Topics Covered</h2>
            <ul className="list-disc list-inside mb-4">
              <li>Networking and system basics</li>
              <li>Web application vulnerabilities (e.g., SQL injection, XSS)</li>
              <li>Wireless security</li>
              <li>Social engineering attacks</li>
              <li>Malware analysis</li>
              <li>Penetration testing</li>
              <li>Cyber defense techniques</li>
            </ul>

            <h2 className="text-2xl font-bold mb-2">What Makes This Course Unique?</h2>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Extensive Content</strong>: 550 well-structured videos that dive into every detail of ethical hacking and cybersecurity.</li>
              <li><strong>Accessible to Everyone</strong>: Easy-to-follow explanations and beginner-friendly instructions.</li>
              <li><strong>Learn at Your Own Pace</strong>: Lifetime access to the course, so you can learn anytime, anywhere.</li>
              <li><strong>Expert Insights</strong>: Created by professionals with years of experience in ethical hacking and cybersecurity.</li>
              <li><strong>Community Support</strong>: Join a growing community of learners, ask questions, and participate in discussions to boost your knowledge.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-2">Who Should Enroll?</h2>
            <ul className="list-disc list-inside mb-4">
              <li>Absolute beginners with no prior knowledge of hacking or cybersecurity.</li>
              <li>IT students and professionals looking to upskill in ethical hacking.</li>
              <li>Aspiring ethical hackers who want to build a strong foundation.</li>
              <li>Business owners and security professionals aiming to secure their systems.</li>
              <li>Tech enthusiasts curious about the world of ethical hacking.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-2">Course Highlights</h2>
            <ul className="list-disc list-inside mb-4">
              <li>Master the basics of networking and operating systems.</li>
              <li>Learn how to identify, exploit, and secure vulnerabilities.</li>
              <li>Conduct advanced penetration testing on systems, networks, and web apps.</li>
              <li>Dive into wireless hacking, malware analysis, and social engineering.</li>
              <li>Understand legal and ethical responsibilities in cybersecurity.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-2">Certification</h2>
            <p>Earn a <strong>"Certified Ethical Hacker"</strong> certificate upon successful completion of the course, showcasing your expertise and boosting your career prospects.</p>

            <p className="mt-4">Take the leap into the exciting world of ethical hacking. Enroll now and start your journey from beginner to cybersecurity expert! 🚀</p>

            <p className="mb-4 mt-8">
              <span className="line-through text-gray-500 mr-2">₹{course.price + 1000}</span>
              <span className="font-bold text-2xl">₹{course.price}</span>
            </p>
            <div className="mt-8">
              <p className="text-2xl font-bold mb-4 text-flame-orange">
                Price: ₹{course.price.toFixed(2)}
              </p>
              <p className="text-lg mb-2">
                Or buy with: <span className="font-bold">{course.price * 10} Blazecredits 🪙</span>
              </p>
              {user ? (
                user.role === 'admin' ? (
                  <Button asChild className="flame-button">
                    <Link href="/admin/course-preview/ethical-hacking-zero-to-hero">Preview Course</Link>
                  </Button>
                ) : (
                  <Button onClick={handleAddToCart} className="flame-button">Add to Cart</Button>
                )
              ) : (
                <Button disabled className="flame-button">Please log in to purchase</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
