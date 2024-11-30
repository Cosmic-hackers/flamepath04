'use client'

import { useUser } from '@/contexts/UserContext'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EthicalHackingCourse() {
  const { user } = useUser()
  const { addItem } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const course = {
    id: 'ethical-hacking-zero-to-hero',
    title: 'Ethical Hacking: Zero to Hero',
    description: 'Complete Ethical Hacking course with 550 in-depth videos',
    price: 600,
    originalPrice: 19000,
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
          <CardDescription>550 in-depth videos</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Welcome to the ultimate Ethical Hacking Course — a comprehensive, step-by-step guide to mastering the art of ethical hacking and cybersecurity! With 550 in-depth videos, this course is designed to transform absolute beginners into confident ethical hackers, ready to tackle real-world challenges.</p>
          
          <p className="mb-4">Packed with hands-on demonstrations, engaging lessons, and practical projects, you'll gain expertise in uncovering vulnerabilities, securing systems, and defending networks from malicious attacks.</p>

          <h2 className="text-2xl font-bold mb-2">What's Included in the Course?</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Complete Beginner to Advanced Training</li>
            <li>Real-World Scenarios</li>
            <li>Tool Mastery</li>
            <li>Hands-On Learning</li>
          </ul>

          <h2 className="text-2xl font-bold mb-2">Comprehensive Topics Covered:</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Networking and system basics</li>
            <li>Web application vulnerabilities (e.g., SQL injection, XSS)</li>
            <li>Wireless security</li>
            <li>Social engineering attacks</li>
            <li>Malware analysis</li>
            <li>Penetration testing</li>
            <li>Cyber defense techniques</li>
          </ul>

          <p className="mb-4">
            <span className="line-through text-gray-500 mr-2">₹{course.originalPrice}</span>
            <span className="font-bold text-2xl">₹{course.price}</span>
          </p>

          {user ? (
            user.role === 'admin' ? (
              <Button asChild>
                <Link href="/admin/course-preview/ethical-hacking">Preview Course</Link>
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

