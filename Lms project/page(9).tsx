'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"

type Resource = {
  id: string
  title: string
  description: string
  content: string
  type: string
  category: string
  isPaid: boolean
  price: number
  fileUrl: string
}

export default function ResourcePage() {
  const params = useParams()
  const slug = params.slug as string
  const { user } = useUser()
  const { toast } = useToast()
  const [resource, setResource] = useState<Resource | null>(null)

  useEffect(() => {
    // Fetch the resource from localStorage
    const resources = JSON.parse(localStorage.getItem('resources') || '{}')
    const foundResource = Object.values(resources).find((r: any) => r.title.toLowerCase().replace(/ /g, '-') === slug) as Resource | undefined
    
    if (foundResource) {
      setResource(foundResource)
    }
  }, [slug])

  const handleDownload = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to download this resource.",
        variant: "destructive",
      })
      return
    }

    if (!resource) return

    // Add to user's downloads
    const downloads = JSON.parse(localStorage.getItem('userDownloads') || '[]')
    if (!downloads.some((d: Resource) => d.id === resource.id)) {
      downloads.push(resource)
      localStorage.setItem('userDownloads', JSON.stringify(downloads))
      toast({
        title: "Resource Downloaded",
        description: `${resource.title} has been added to your downloads.`,
      })
    } else {
      toast({
        title: "Already Downloaded",
        description: `${resource.title} is already in your downloads.`,
      })
    }
  }

  if (!resource) {
    return <div>Resource not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{resource.title}</CardTitle>
          <CardDescription>{resource.type} | {resource.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{resource.description}</p>
          {resource.fileUrl ? (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Resource Preview</h3>
              {resource.type === 'pdf' ? (
                <embed src={resource.fileUrl} type="application/pdf" width="100%" height="600px" />
              ) : (
                <p>Preview not available for this file type.</p>
              )}
            </div>
          ) : (
            <p className="mb-4 text-yellow-600">The full content for this resource is not available yet. Please check back later.</p>
          )}
          <p className="mb-4 font-bold">
            {resource.isPaid ? `Price: $${resource.price.toFixed(2)}` : 'Free'}
          </p>
          <Button onClick={handleDownload}>
            {resource.isPaid ? 'Purchase and Download' : 'Download Now'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

