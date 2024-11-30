'use client'

import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function UserDashboard() {
 const { user } = useUser()

 // This would typically come from an API call or local storage
 const purchasedCourses = [
   { id: 'ethical-hacking-zero-to-hero', title: 'Ethical Hacking: Zero to Hero' }
 ]

 if (!user) {
   return <div>Please log in to view your dashboard.</div>
 }

 return (
   <div className="container mx-auto px-4 py-8">
     <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard, {user.name}</h1>
     
     <Card className="mb-8">
       <CardHeader>
         <CardTitle>Your Profile</CardTitle>
       </CardHeader>
       <CardContent>
         <p><strong>Name:</strong> {user.name}</p>
         <p><strong>Email:</strong> {user.email}</p>
         <p><strong>Phone:</strong> {user.phone}</p>
         <p><strong>College:</strong> {user.college}</p>
         <p><strong>Profession:</strong> {user.profession}</p>
       </CardContent>
     </Card>

     <Card>
       <CardHeader>
         <CardTitle>Your Courses</CardTitle>
       </CardHeader>
       <CardContent>
         {purchasedCourses.length > 0 ? (
           <ul>
             {purchasedCourses.map(course => (
               <li key={course.id}>
                 <Link href={`/courses/${course.id}`} className="text-blue-500 hover:underline">
                   {course.title}
                 </Link>
               </li>
             ))}
           </ul>
         ) : (
           <p>You haven't purchased any courses yet.</p>
         )}
       </CardContent>
     </Card>
   </div>
 )
}

