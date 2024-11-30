'use client'

import Image from 'next/image'
import { useUser } from '@/contexts/UserContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Dashboard() {
  const { user } = useUser()

  const freeResources = [
    { title: 'Introduction to AI', category: 'AI', type: 'PDF', thumbnail: '/placeholder.svg?height=200&width=300' },
    { title: 'Machine Learning Basics', category: 'Machine Learning', type: 'Tutorial', thumbnail: '/placeholder.svg?height=200&width=300' },
    { title: 'Cybersecurity Fundamentals', category: 'Cybersecurity', type: 'PDF', thumbnail: '/placeholder.svg?height=200&width=300' },
  ]

  const paidResources = [
    { title: 'Advanced AI Techniques', category: 'AI', type: 'eBook', price: 29.99, thumbnail: '/placeholder.svg?height=200&width=300' },
    { title: 'Machine Learning Masterclass', category: 'Machine Learning', type: 'Video Course', price: 99.99, thumbnail: '/placeholder.svg?height=200&width=300' },
    { title: 'Cybersecurity Expert Path', category: 'Cybersecurity', type: 'Course Bundle', price: 149.99, thumbnail: '/placeholder.svg?height=200&width=300' },
  ]

  if (!user) {
    return <div>Please log in to view your dashboard.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard, {user.name}</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/free-resources" passHref>
            <Button className="w-full">Free Resources</Button>
          </Link>
          <Link href="/paid-resources" passHref>
            <Button className="w-full">Paid Resources</Button>
          </Link>
          <Link href="/download-center" passHref>
            <Button className="w-full">Download Center</Button>
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Free Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {freeResources.map((resource, index) => (
            <Card key={index}>
              <CardHeader>
                <Image
                  src={resource.thumbnail}
                  alt={resource.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Type: {resource.type}</p>
                <Button>Download</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Paid Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paidResources.map((resource, index) => (
            <Card key={index}>
              <CardHeader>
                <Image
                  src={resource.thumbnail}
                  alt={resource.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2">Type: {resource.type}</p>
                <p className="mb-4 font-bold">${resource.price.toFixed(2)}</p>
                <Button>Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

