'use client'

import { useUser } from '@/contexts/UserContext'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DosDdosCourse() {
  const { user } = useUser()
  const { addItem } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const course = {
    id: 'dos-ddos-telugu',
    title: 'DOS and DDOS Course in Telugu',
    description: 'Comprehensive course on Denial of Service (DoS) and Distributed Denial of Service (DDoS) attacks in Telugu.',
    price: 200,
    originalPrice: 1000,
    parts: 4
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
          <CardDescription>{course.parts} part video course</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Dive deep into the world of Denial of Service (DoS) and Distributed Denial of Service (DDoS) attacks with this expertly designed course. Whether you're a cybersecurity enthusiast or an IT professional, this course equips you with the knowledge and skills to understand, detect, and mitigate these prevalent threats effectively.</p>
          
          <h2 className="text-2xl font-bold mb-2">What You'll Learn:</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Foundations of DoS and DDoS Attacks</li>
            <li>Attack Methodologies</li>
            <li>Recognizing Vulnerabilities</li>
            <li>Tools and Techniques Used by Attackers</li>
            <li>Mitigation and Defense Strategies</li>
            <li>Real-World Scenarios</li>
            <li>Hands-On Labs</li>
          </ul>

          <h2 className="text-2xl font-bold mb-2">Course Highlights:</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Introduction to DoS and DDoS</li>
            <li>Attack Types</li>
            <li>Understanding Botnets</li>
            <li>Mitigation Techniques</li>
            <li>Advanced Strategies</li>
          </ul>

          <h2 className="text-2xl font-bold mb-2">Who Should Take This Course:</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Cybersecurity professionals</li>
            <li>IT administrators</li>
            <li>Ethical hackers and penetration testers</li>
            <li>Students and tech enthusiasts</li>
          </ul>

          <h2 className="text-2xl font-bold mb-2">Key Features:</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Beginner-friendly explanations of complex topics</li>
            <li>Hands-on practice with tools and real-world scenarios</li>
            <li>Comprehensive insights into both offensive and defensive techniques</li>
            <li>Lifetime access to course materials and updates</li>
          </ul>

          <p className="mb-4 font-bold">Certification: Receive a "Certified DoS and DDoS Specialist" certificate upon course completion.</p>

          <p className="mb-4">
            <span className="line-through text-gray-500 mr-2">₹{course.originalPrice}</span>
            <span className="font-bold text-2xl">₹{course.price}</span>
          </p>

          {user ? (
            user.role === 'admin' ? (
              <Button asChild>
                <Link href="/admin/course-preview/dos-ddos-telugu">Preview Course</Link>
              </Button>
            ) : (
              <Button onClick={handleAddToCart}>Add to Cart</Button>
            )
          ) : (
            <Button disabled>Please log in to purchase</Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

