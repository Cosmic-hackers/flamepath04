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

export default function BugBountyHuntingCourse() {
 const { user } = useUser()
 const { addItem } = useCart()
 const { toast } = useToast()
 const [course, setCourse] = useState<any>(null)
 const [isReceived, setIsReceived] = useState(false)

 useEffect(() => {
   const courses = JSON.parse(localStorage.getItem('courses') || '[]')
   const bugBountyCourse = courses.find((c: any) => c.id === 'bug-bounty-hunting')
   if (bugBountyCourse) {
     setCourse(bugBountyCourse)
   }
 }, [])

 useEffect(() => {
   if (user) {
     const users = JSON.parse(localStorage.getItem('users') || '[]')
     const currentUser = users.find((u: any) => u.email === user.email)
     if (currentUser && currentUser.receivedCourses) {
       setIsReceived(currentUser.receivedCourses.includes('bug-bounty-hunting'))
     }
   }
 }, [user])

 const handleAddToCart = () => {
   addItem({ id: course.id, title: course.title, price: course.price, quantity: 1, type: 'course' })
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
           <video 
             controls 
             className="w-full h-full rounded-lg"
             poster="/placeholder.svg?height=400&width=600"
           >
             <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2645912-01%20-%20What%20is%20a%20Bug%20Bounty%20Program%20-%20Bug%20Bounty%20Hunting%20Guide%20to%20an%20Advanced%20Earning%20Method-rfa53jfv68jLD3BrXgPrgWYYFtT6wA.mp4" type="video/mp4" />
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
               <span>50+ In-depth Video Lessons</span>
             </div>
             <div className="flex items-center">
               <Users className="mr-2 h-5 w-5 text-flame-orange" />
               <span>Beginner to Advanced</span>
             </div>
             <div className="flex items-center">
               <Clock className="mr-2 h-5 w-5 text-flame-orange" />
               <span>40+ Hours of Content</span>
             </div>
             <div className="flex items-center">
               <BookOpen className="mr-2 h-5 w-5 text-flame-orange" />
               <span>Hands-on Projects</span>
             </div>
           </CardContent>
         </Card>

         <div className="prose dark:prose-invert max-w-none">
           <h2 className="text-2xl font-bold mb-4 text-electric-blue">Course Overview</h2>
           <p>
             Dive into the exciting world of bug bounty hunting with our comprehensive course. Whether you're a beginner in cybersecurity or an experienced professional looking to expand your skills, this course will equip you with the knowledge and tools needed to succeed in the competitive field of bug bounty hunting.
           </p>

           <h2 className="text-2xl font-bold mb-4 mt-8 text-electric-blue">What You'll Learn</h2>
           <ul className="list-disc list-inside space-y-2">
             <li>Understanding the bug bounty ecosystem and platforms</li>
             <li>Legal and ethical considerations in bug bounty hunting</li>
             <li>Setting up your bug hunting environment</li>
             <li>Reconnaissance techniques and information gathering</li>
             <li>Web application vulnerabilities and exploitation</li>
             <li>Mobile application security testing</li>
             <li>API security testing and common vulnerabilities</li>
             <li>Advanced exploitation techniques</li>
             <li>Report writing and responsible disclosure</li>
             <li>Maximizing your earnings and building a reputation</li>
           </ul>

           <h2 className="text-2xl font-bold mb-4 mt-8 text-electric-blue">Course Content</h2>
           <ol className="list-decimal list-inside space-y-4">
             <li>
               <span className="font-bold">Introduction to Bug Bounty Hunting</span>
               <ul className="list-disc list-inside ml-6 mt-2">
                 <li>What are bug bounties?</li>
                 <li>History and evolution of bug bounty programs</li>
                 <li>Popular bug bounty platforms</li>
               </ul>
             </li>
             <li>
               <span className="font-bold">Setting Up Your Bug Hunting Environment</span>
               <ul className="list-disc list-inside ml-6 mt-2">
                 <li>Essential tools and software</li>
                 <li>Configuring your virtual machines</li>
                 <li>Browser extensions for bug hunters</li>
               </ul>
             </li>
             <li>
               <span className="font-bold">Reconnaissance and Information Gathering</span>
               <ul className="list-disc list-inside ml-6 mt-2">
                 <li>Passive and active reconnaissance techniques</li>
                 <li>OSINT tools and methodologies</li>
                 <li>Identifying attack surfaces</li>
               </ul>
             </li>
             <li>
               <span className="font-bold">Web Application Vulnerabilities</span>
               <ul className="list-disc list-inside ml-6 mt-2">
                 <li>XSS, CSRF, and SQL Injection</li>
                 <li>Authentication and authorization flaws</li>
                 <li>Server-side request forgery (SSRF)</li>
               </ul>
             </li>
             <li>
               <span className="font-bold">Mobile Application Security</span>
               <ul className="list-disc list-inside ml-6 mt-2">
                 <li>iOS and Android app testing</li>
                 <li>Reverse engineering mobile apps</li>
                 <li>Common mobile vulnerabilities</li>
               </ul>
             </li>
             <li>
               <span className="font-bold">API Security Testing</span>
               <ul className="list-disc list-inside ml-6 mt-2">
                 <li>Understanding RESTful and GraphQL APIs</li>
                 <li>API authentication vulnerabilities</li>
                 <li>Data exposure and injection attacks</li>
               </ul>
             </li>
             <li>
               <span className="font-bold">Advanced Exploitation Techniques</span>
               <ul className="list-disc list-inside ml-6 mt-2">
                 <li>Race conditions and timing attacks</li>
                 <li>Deserialization vulnerabilities</li>
                 <li>Business logic flaws</li>
               </ul>
             </li>
             <li>
               <span className="font-bold">Report Writing and Disclosure</span>
               <ul className="list-disc list-inside ml-6 mt-2">
                 <li>Crafting effective bug reports</li>
                 <li>Responsible disclosure practices</li>
                 <li>Communicating with security teams</li>
               </ul>
             </li>
             <li>
               <span className="font-bold">Building Your Bug Bounty Career</span>
               <ul className="list-disc list-inside ml-6 mt-2">
                 <li>Developing a successful methodology</li>
                 <li>Time management and productivity tips</li>
                 <li>Networking and community engagement</li>
               </ul>
             </li>
             <li>
               <span className="font-bold">Case Studies and Live Hacking</span>
               <ul className="list-disc list-inside ml-6 mt-2">
                 <li>Analysis of real-world bug bounty reports</li>
                 <li>Live hacking sessions on intentionally vulnerable applications</li>
                 <li>Guest lectures from top bug bounty hunters</li>
               </ul>
             </li>
           </ol>

           <h2 className="text-2xl font-bold mb-4 mt-8 text-electric-blue">Who This Course is For</h2>
           <ul className="list-disc list-inside space-y-2">
             <li>Aspiring ethical hackers and penetration testers</li>
             <li>Cybersecurity professionals looking to expand their skill set</li>
             <li>Web developers interested in securing their applications</li>
             <li>Anyone passionate about finding and reporting security vulnerabilities</li>
           </ul>

           <h2 className="text-2xl font-bold mb-4 mt-8 text-electric-blue">Prerequisites</h2>
           <ul className="list-disc list-inside space-y-2">
             <li>Basic understanding of web technologies (HTML, CSS, JavaScript)</li>
             <li>Familiarity with networking concepts</li>
             <li>Knowledge of at least one programming language (Python recommended)</li>
             <li>A computer with internet access and the ability to run virtual machines</li>
           </ul>
         </div>
       </div>

       <div className="md:col-span-1">
         <Card className="sticky top-8">
           <CardHeader>
             <CardTitle className="text-2xl font-bold">Course Details</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="mb-4">
               <Badge variant="secondary" className="text-lg font-bold mb-2">
                 Original Price: ₹{course.originalPrice}
               </Badge>
             </div>
             <div className="mb-4">
               <Badge variant="secondary" className="text-lg font-bold mb-2 bg-flame-orange text-white">
                 Discount: {course.discountPercentage.toFixed(2)}% OFF
               </Badge>
             </div>
             <p className="text-3xl font-bold text-center mb-4">₹{course.price}</p>
             {user ? (
               user.role === 'admin' ? (
                 <Button asChild className="w-full mb-4 flame-button">
                   <Link href="/admin/course-preview/bug-bounty-hunting">Preview Course</Link>
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
                 <span>50+ in-depth video lessons</span>
               </li>
               <li className="flex items-center">
                 <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                 <span>Hands-on projects and labs</span>
               </li>
               <li className="flex items-center">
                 <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                 <span>Lifetime access to course updates</span>
               </li>
               <li className="flex items-center">
                 <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                 <span>Community access for support</span>
               </li>
             </ul>
             {user && course.isPaid && (
               <div className="mt-4">
                 <p className="text-red-500 font-semibold mb-2">Warning: Only click "Mark as Received" after purchasing the course.</p>
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
