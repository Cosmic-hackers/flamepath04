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
