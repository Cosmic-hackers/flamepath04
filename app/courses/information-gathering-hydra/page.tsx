'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, BookOpen, Users, Clock, Award, Video } from 'lucide-react'

export default function InformationGatheringHydraCourse() {
const { user } = useUser()
const { addItem } = useCart()
const { toast } = useToast()
const [course, setCourse] = useState<any>(null)
const [isReceived, setIsReceived] = useState(false)

useEffect(() => {
 const courses = JSON.parse(localStorage.getItem('courses') || '[]')
 const currentCourse = courses.find((c: any) => c.id === 'information-gathering-hydra')
 if (currentCourse) {
   setCourse(currentCourse)
 }
}, [])

useEffect(() => {
 if (user) {
   const users = JSON.parse(localStorage.getItem('users') || '[]')
   const currentUser = users.find((u: any) => u.email === user.email)
   if (currentUser && currentUser.receivedCourses) {
     setIsReceived(currentUser.receivedCourses.includes('information-gathering-hydra'))
   }
 }
}, [user])

const handleAddToCart = () => {
 addItem({ id: course.id, title: course.title, price: 2999, quantity: 1, type: 'course' })
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
       <CardTitle className="text-3xl font-bold flame-text">{course.title}</CardTitle>
     </CardHeader>
     <CardContent>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-2">
           <h2 className="text-2xl font-bold mb-4 text-electric-blue">Demo Video</h2>
           <div className="aspect-video mb-8">
             <video controls className="w-full rounded-lg">
               <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1%20What%20is%20Hydra-F9xRLybMc31XfM0oVRg2MuV1UyMrTJ.mp4" type="video/mp4" />
               Your browser does not support the video tag.
             </video>
           </div>
           <p className="mb-4">This introductory video explains what Hydra is and how it's used in ethical hacking and penetration testing.</p>
           <p className="text-lg mb-4">{course.description}</p>
           <p className="text-red-500 font-semibold mb-4">
             Warning: This is a paid course. Please ensure you have made the payment before accessing the content.
           </p>
           <h2 className="text-2xl font-bold mb-4 text-electric-blue">Course Overview</h2>
           <p className="mb-4">This comprehensive course covers advanced techniques in information gathering and Hydra usage for ethical hacking. You'll learn how to effectively collect crucial data and leverage Hydra for password cracking across various protocols.</p>
           
           <h2 className="text-2xl font-bold mb-4 text-electric-blue">What You'll Learn</h2>
           <ul className="list-disc list-inside mb-4 space-y-2">
             <li>Advanced OSINT techniques for comprehensive information gathering</li>
             <li>Mastering Google Dorks for targeted searches</li>
             <li>Social engineering methods for information extraction</li>
             <li>Hydra usage for efficient password cracking</li>
             <li>Integration of information gathering with Hydra for enhanced ethical hacking</li>
           </ul>

           <h2 className="text-2xl font-bold mb-4 text-electric-blue">Projects & Practical Videos</h2>
           <ul className="list-disc list-inside mb-4 space-y-2">
             <li>Build an OSINT framework for automated information gathering</li>
             <li>Develop a custom Google Dorks tool</li>
             <li>Create a Hydra automation script for multi-protocol password cracking</li>
             <li>20+ hands-on video demonstrations of real-world scenarios</li>
           </ul>

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
                 <span>Suitable for Intermediate to Advanced</span>
               </div>
               <div className="flex items-center">
                 <Clock className="mr-2 h-5 w-5 text-flame-orange" />
                 <span>40+ Hours of Content</span>
               </div>
             </CardContent>
           </Card>

           <h2 className="text-2xl font-bold mb-4 text-electric-blue">Course Content</h2>
           <ul className="space-y-2">
             {course.content.map((item: any) => (
               <li key={item.title}>
                 <h3 className="font-semibold">{item.title}</h3>
                 <p className="text-sm text-gray-600">{item.description}</p>
               </li>
             ))}
           </ul>
         </div>
         <div className="md:col-span-1">
           <Card className="sticky top-8">
             <CardContent className="p-6">
               <div className="mb-4">
                 <span className="text-3xl font-bold text-white">₹2999</span>
               </div>
               <Button
                 onClick={handleAddToCart}
                 className="w-full flame-button mb-4"
               >
                 Add to Cart
               </Button>
               {user && (
                 <>
                   <p className="text-sm text-red-500 mb-2">Warning: Only click "Mark as Received" after purchasing the course.</p>
                   {!isReceived ? (
                     <Button onClick={handleMarkAsReceived} className="w-full flame-button">
                       Mark as Received
                     </Button>
                   ) : (
                     <p className="text-green-500 font-semibold">Course Received</p>
                   )}
                 </>
               )}
               <ul className="mt-4 space-y-2">
                 <li className="flex items-center">
                   <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                   <span>Lifetime Access</span>
                 </li>
                 <li className="flex items-center">
                   <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                   <span>50+ Video Lessons</span>
                 </li>
                 <li className="flex items-center">
                   <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                   <span>3 Hands-on Projects</span>
                 </li>
               </ul>
             </CardContent>
           </Card>
         </div>
       </div>
     </CardContent>
   </Card>
 </div>
)
}
