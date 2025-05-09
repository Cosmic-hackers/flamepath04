'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"

type Resource = {
  id: string
  title: string
  description: string
  type: string
  originalPrice: number
  discountPercentage: number
  price: number
  isPaid: boolean
  demoVideoUrl?: string
  content?: { title: string; description: string }[]
  images: string[]
}

export default function EditResource() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [resource, setResource] = useState<Resource | null>(null)

  useEffect(() => {
    const resources = JSON.parse(localStorage.getItem('resources') || '[]')
    const foundResource = resources.find((r: Resource) => r.id === id)
    if (foundResource) {
      setResource(foundResource)
    } else {
      toast({
        title: "Resource not found",
        description: "The requested resource could not be found.",
        variant: "destructive",
      })
      router.push('/admin')
    }
  }, [id, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!resource) return

    const { name, value } = e.target
    if (name === 'originalPrice') {
      const originalPrice = parseFloat(value)
      const discountedPrice = originalPrice * (1 - (resource.discountPercentage / 100))
      setResource(prev => prev ? {
        ...prev,
        originalPrice,
        price: discountedPrice
      } : null)
    } else if (name === 'discountPercentage') {
      const discountPercentage = parseFloat(value)
      const discountedPrice = resource.originalPrice * (1 - (discountPercentage / 100))
      setResource(prev => prev ? {
        ...prev,
        discountPercentage,
        price: discountedPrice
      } : null)
    } else {
      setResource(prev => prev ? { ...prev, [name]: value } : null)
    }
  }

  const handleContentChange = (content: string) => {
    if (!resource) return

    try {
      const contentArray = content.split('\n\n').map(section => {
        const [title, description] = section.split('\n')
        return { title, description }
      })
      setResource(prev => prev ? { ...prev, content: contentArray } : null)
    } catch (error) {
      console.error('Error parsing content:', error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!resource) return

    const resources = JSON.parse(localStorage.getItem('resources') || '[]')
    const updatedResources = resources.map((r: Resource) => 
      r.id === resource.id ? resource : r
    )
    localStorage.setItem('resources', JSON.stringify(updatedResources))

    toast({
      title: "Resource Updated",
      description: "The resource has been successfully updated.",
    })
    router.push('/admin')
  }

  if (!resource) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Resource: {resource.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              placeholder="Resource Title"
              value={resource.title}
              onChange={handleInputChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Resource Description"
              value={resource.description}
              onChange={handleInputChange}
              required
            />
            <Select
              value={resource.type}
              onValueChange={(value) => setResource(prev => prev ? { ...prev, type: value } : null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ebook">eBook</SelectItem>
                <SelectItem value="video">Video Course</SelectItem>
                <SelectItem value="document">Document</SelectItem>
              </SelectContent>
            </Select>
            <div className="space-y-4">
              <Input
                name="originalPrice"
                type="number"
                placeholder="Original Price"
                value={resource.originalPrice}
                onChange={handleInputChange}
                required
              />
              <Input
                name="discountPercentage"
                type="number"
                placeholder="Discount Percentage"
                value={resource.discountPercentage}
                onChange={handleInputChange}
                required
              />
              <div className="text-sm text-muted-foreground">
                Final Price: ₹{resource.price.toFixed(2)}
              </div>
            </div>
            <Input
              name="demoVideoUrl"
              placeholder="Demo Video URL"
              value={resource.demoVideoUrl}
              onChange={handleInputChange}
            />
            <Textarea
              placeholder="Content (Title and Description separated by newline, sections separated by double newline)"
              value={resource.content?.map(c => `${c.title}\n${c.description}`).join('\n\n')}
              onChange={(e) => handleContentChange(e.target.value)}
              className="min-h-[200px]"
            />
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || [])
                const imageUrls = files.map(file => URL.createObjectURL(file))
                setResource(prev => prev ? {
                  ...prev,
                  images: [...prev.images, ...imageUrls]
                } : null)
              }}
            />
            <div className="flex justify-between">
              <Button type="submit">Save Changes</Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push('/admin')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
