'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CategoryPage() {
  const params = useParams()
  const category = params.slug as string

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category.replace('-', ' ')} Resources</h1>
      <Card>
        <CardHeader>
          <CardTitle>No Resources Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p>There are currently no resources available for this category.</p>
        </CardContent>
      </Card>
    </div>
  )
}

arning', type: 'eBook', isFree: true },
    { title: 'TensorFlow Masterclass', description: 'Become a TensorFlow expert', type: 'Video Course', isFree: false, price: 149.99 },
  ],
  'robotics': [
    { title: 'Intro to Robotics', description: 'Get started with robotics', type: 'eBook', isFree: true },
    { title: 'Advanced Robotics Programming', description: 'Learn to program complex robots', type: 'Video Course', isFree: false, price: 199.99 },
  ],
  'cybersecurity': [
    { title: 'Cybersecurity Basics', description: 'Understand the fundamentals of cybersecurity', type: 'eBook', isFree: true },
    { title: 'Ethical Hacking Course', description: 'Learn ethical hacking techniques', type: 'Video Course', isFree: false, price: 129.99 },
  ],
}

export default function CategoryPage() {
  const params = useParams()
  const category = params.slug as string
  const resources = mockResources[category as keyof typeof mockResources] || []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category.replace('-', ' ')} Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>{resource.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{resource.description}</p>
              <p className="mb-4 font-bold">
                {resource.isFree ? 'Free' : `$${resource.price?.toFixed(2)}`}
              </p>
              <Button asChild>
                <Link href={`/resource/${resource.title.toLowerCase().replace(/ /g, '-')}`}>
                  Learn More
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

