'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, Save } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { sendWhatsAppNotification } from '@/utils/whatsappNotification'
import { BadgeUnlock } from '@/components/BadgeUnlock'
import { addBadgeToUser, checkBadgeEarned, COURSE_BADGES } from '@/utils/badges'
import type { CourseId } from '@/utils/badges'
import { useRouter } from 'next/navigation'


type Video = {
 id: number
 title: string
 url: string
 completed: boolean
 notes: string
}

const courseVideo: Video = {
 id: 1,
 title: "Linux for Ethical Hacking",
 url: "https://www.youtube.com/embed/Scwj9XOJRXE",
 completed: false,
 notes: '' // Initialize with empty string
}

export default function LinuxForEthicalHacking() {
 const { user } = useUser()
 const { toast } = useToast()
 const [video, setVideo] = useState<Video>(courseVideo)
 const [isEnrolled, setIsEnrolled] = useState(false)
 const [progress, setProgress] = useState(0)
 const [notes, setNotes] = useState(courseVideo.notes) // Initialize with courseVideo.notes
 const [showBadgeUnlock, setShowBadgeUnlock] = useState(false)
 const courseId: CourseId = 'linux-for-ethical-hacking'
 const router = useRouter()

 useEffect(() => {
   if (user) {
     // Check if user is enrolled
     const users = JSON.parse(localStorage.getItem('users') || '[]')
     const currentUser = users.find((u: any) => u.email === user.email)
     if (currentUser && currentUser.enrolledCourses) {
       const courseProgress = currentUser.enrolledCourses.find(
         (course: any) => course.id === 'linux-for-ethical-hacking'
       )
       if (courseProgress) {
         setIsEnrolled(true)
         setVideo(courseProgress.video)
         setNotes(courseProgress.video.notes || '')
         setProgress(courseProgress.video.completed ? 100 : 0)
       }
     }
   }
 }, [user])

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
   const users = JSON.parse(localStorage.getItem('users') || '[]')
   const updatedUsers = users.map((u: any) => {
     if (u.email === user.email) {
       return {
         ...u,
         enrolledCourses: [
           ...(u.enrolledCourses || []),
           {
             id: 'linux-for-ethical-hacking',
             title: 'Linux for Ethical Hacking',
             video: courseVideo,
             progress: 0
           }
         ]
       }
     }
     return u
   })
   localStorage.setItem('users', JSON.stringify(updatedUsers))
   setIsEnrolled(true)
   
   toast({
     title: "Successfully Enrolled",
     description: "You have been enrolled in the Linux for Ethical Hacking course!",
   })

   // Send WhatsApp notification
   if (user.phone) {
     sendWhatsAppNotification(
       user,
       'Linux for Ethical Hacking',
       'Master Linux fundamentals.' // Fixed WhatsApp message
     )
   }
 }

 const markAsCompleted = () => {
   const updatedVideo = { ...video, completed: true }
   setVideo(updatedVideo)
   setProgress(100)

   // Update progress in localStorage
   const users = JSON.parse(localStorage.getItem('users') || '[]')
   const updatedUsers = users.map((u: any) => {
     if (u.email === user?.email) {
       const updatedCourses = u.enrolledCourses.map((course: any) => {
         if (course.id === 'linux-for-ethical-hacking') {
           return {
             ...course,
             video: updatedVideo,
             progress: 100
           }
         }
         return course
       })
       return { ...u, enrolledCourses: updatedCourses }
     }
     return u
   })
   localStorage.setItem('users', JSON.stringify(updatedUsers))

   toast({
     title: "Progress Updated",
     description: "Course marked as completed!",
   })
 }

 const handleSaveNotes = () => {
   const updatedVideo = { ...video, notes }
   setVideo(updatedVideo)

   // Update progress in localStorage
   const users = JSON.parse(localStorage.getItem('users') || '[]')
   const updatedUsers = users.map((u: any) => {
     if (u.email === user?.email) {
       const updatedCourses = u.enrolledCourses.map((course: any) => {
         if (course.id === 'linux-for-ethical-hacking') {
           return {
             ...course,
             video: updatedVideo,
             progress: updatedVideo.completed ? 100 : 0
           }
         }
         return course
       })
       return { ...u, enrolledCourses: updatedCourses }
     }
     return u
   })
   localStorage.setItem('users', JSON.stringify(updatedUsers))

   toast({
     title: "Notes Saved",
     description: "Your notes have been saved successfully!",
   })
 }

 const handleMarkAsCompleted = () => {
  if (user) {
    if (!checkBadgeEarned(user.id, courseId)) {
      addBadgeToUser(user.id, courseId)
      setShowBadgeUnlock(true)
    } else {
      toast({
        title: "Badge Already Earned",
        description: "You've already earned this badge!",
      })
    }
  }
}

 return (
   <div className="container mx-auto px-4 py-8">
     <Card className="mb-8">
       <CardHeader>
         <CardTitle className="text-3xl font-bold flame-text">
           Linux for Ethical Hacking
         </CardTitle>
       </CardHeader>
       <CardContent>
         <p className="mb-6 text-foreground-light">
           Master the essential Linux skills required to excel in ethical hacking and cybersecurity. This comprehensive course is designed to take you from the basics of Linux to advanced techniques tailored for penetration testing and ethical hacking professionals.
         </p>
         <div className="prose dark:prose-invert max-w-none">
           <h4 className="text-xl font-semibold mb-2">What You'll Learn:</h4>
           <ul className="list-disc list-inside mb-4">
             <li><strong>Introduction to Linux:</strong> Understand the Linux operating system, its architecture, and why it's vital for ethical hacking.</li>
             <li><strong>Basic to Advanced Linux Commands:</strong> Master file management, permissions, networking, and system administration commands essential for hacking tasks.</li>
             <li><strong>Linux Distributions for Ethical Hacking:</strong> Dive into specialized distributions like Kali Linux and Parrot OS, built specifically for penetration testing.</li>
             <li><strong>Scripting and Automation:</strong> Learn to write Bash scripts to automate repetitive tasks and enhance your ethical hacking toolkit.</li>
             <li><strong>Networking with Linux:</strong> Explore network configuration, monitoring, and packet analysis using Linux tools.</li>
             <li><strong>Security and Hardening:</strong> Discover how to secure Linux systems, identify vulnerabilities, and prepare for real-world cybersecurity challenges.</li>
             <li><strong>Hands-on Ethical Hacking Tools:</strong> Use tools like Nmap, Wireshark, Metasploit, and Aircrack-ng to perform reconnaissance, vulnerability analysis, and exploitation.</li>
             <li><strong>Practical Projects:</strong> Engage in real-world scenarios, such as simulating attacks, securing systems, and conducting ethical penetration tests.</li>
           </ul>

           <h4 className="text-xl font-semibold mb-2">Why Choose This Course?</h4>
           <ul className="list-disc list-inside mb-4">
             <li>Tailored for ethical hackers, cybersecurity enthusiasts, and penetration testers.</li>
             <li>Beginner-friendly with no prior Linux experience required.</li>
             <li>Hands-on labs and exercises to build practical skills.</li>
             <li>Certification support to validate your expertise.</li>
           </ul>

           <p>Become a skilled ethical hacker with a strong foundation in Linux, the backbone of cybersecurity. Take the first step to mastering ethical hacking with this Linux for Ethical Hacking Complete Course!</p>
         </div>
         {!isEnrolled ? (
           <Button onClick={handleEnroll} className="flame-button">
             Enroll Now (Free)
           </Button>
         ) : (
           <div className="space-y-6">
             <div>
               <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
               <Progress value={progress} className="w-full" />
               <p className="text-sm text-muted-foreground mt-1">
                 {progress.toFixed(0)}% Complete
               </p>
             </div>
             <div className="aspect-video mb-4">
               <iframe
                 src={video.url}
                 className="w-full h-full"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               />
             </div>
             <div className="space-y-4">
               <h3 className="text-lg font-semibold">Course Notes</h3>
               <Textarea
                 placeholder="Take notes here..."
                 value={notes}
                 onChange={(e) => setNotes(e.target.value)}
                 className="min-h-[200px]"
               />
               <Button onClick={handleSaveNotes} className="flame-button">
                 <Save className="mr-2 h-4 w-4" />
                 Save Notes
               </Button>
             </div>
             <p className="text-sm text-muted-foreground">Click "Mark as Completed" after finishing the course video and exercises to earn a badge and certificate of completion!</p>
             {!video.completed && (
               <Button 
                 onClick={() => {
                   markAsCompleted()
                   handleMarkAsCompleted()
                 }}
                 className="flame-button w-full"
               >
                 Mark as Completed
               </Button>
             )}
             {video.completed && (
               <div className="flex items-center text-green-500">
                 <CheckCircle className="mr-2" />
                 <span>Course Completed</span>
               </div>
             )}
           </div>
         )}
       </CardContent>
     </Card>
     <BadgeUnlock
  isOpen={showBadgeUnlock}
  onClose={() => {
    setShowBadgeUnlock(false)
    router.push('/profile')
  }}
  badgeUrl={COURSE_BADGES[courseId].url}
  courseName="Linux for Ethical Hacking"
  badgeTitle={COURSE_BADGES[courseId].title}
  requirements={COURSE_BADGES[courseId].requirements}
/>
   </div>
 )
}
