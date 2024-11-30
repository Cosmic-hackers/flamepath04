'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
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
  fileType: string
}

// This would typically come from your API
const mockResources: Resource[] = [
  { id: '1', title: 'Introduction to AI', description: 'Learn the basics of AI', content: '', type: 'course', category: 'AI', isPaid: false, price: 0, fileType: 'pdf' },
  { id: '2', title: 'Advanced Machine Learning', description: 'Deep dive into ML', content: '', type: 'course', category: 'AI', isPaid: true, price: 99.99, fileType: 'video' },
  { id: '3', title: 'Python for ML', description: 'Learn Python for ML', content: '', type: 'course', category: 'Machine Learning', isPaid: false, price: 0, fileType: 'pdf' },
  { id: '4', title: 'TensorFlow Masterclass', description: 'Master TensorFlow', content: '', type: 'course', category: 'Machine Learning', isPaid: true, price: 149.99, fileType: 'video' },
  { id: '5', title: 'Intro to Robotics', description: 'Get started with robotics', content: '', type: 'course', category: 'Robotics', isPaid: false, price: 0, fileType: 'pdf' },
  { id: '6', title: 'Advanced Robotics Programming', description: 'Advanced robotics techniques', content: '', type: 'course', category: 'Robotics', isPaid: true, price: 199.99, fileType: 'video' },
  { id: '7', title: 'Cybersecurity Basics', description: 'Learn cybersecurity fundamentals', content: '', type: 'course', category: 'Cybersecurity', isPaid: false, price: 0, fileType: 'pdf' },
  { id: '8', title: 'Ethical Hacking Course', description: 'Learn ethical hacking', content: '', type: 'course', category: 'Cybersecurity', isPaid: true, price: 129.99, fileType: 'video' },
  { id: '9', title: 'Getting Started with Arduino', description: 'Arduino basics', content: '', type: 'course', category: 'Arduino', isPaid: false, price: 0, fileType: 'pdf' },
  { id: '10', title: 'Ethical Hacking 101', description: 'Introduction to ethical hacking', content: '', type: 'course', category: 'Cybersecurity', isPaid: false, price: 0, fileType: 'pdf' },
  { id: '11', title: 'Python Basics', description: 'Learn Python basics', content: '', type: 'course', category: 'Programming', isPaid: false, price: 0, fileType: 'pdf' },
  { id: '12', title: 'Arduino Projects Collection', description: 'Exciting Arduino projects', content: '', type: 'ebook', category: 'Arduino', isPaid: true, price: 39.99, fileType: 'pdf' },
  { id: '13', title: 'Ethical Hacking Certification Prep', description: 'Prepare for ethical hacking certification', content: '', type: 'course', category: 'Cybersecurity', isPaid: true, price: 79.99, fileType: 'video' },
]

export default function EditResource() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [resource, setResource] = useState<Resource | null>(null)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    // In a real app, you'd fetch the resource from your API
    const foundResource = mockResources.find(r => r.id === id)
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

  if (!resource) {
    return <div>Loading...</div>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Update the resource in the mock data
    const updatedResources = mockResources.map(r => 
      r.id === resource.id ? resource : r
    )
    // In a real app, you'd send this to an API
    console.log('Updated resources:', updatedResources)
    toast({
      title: "Resource updated",
      description: "The resource has been successfully updated.",
    })
    router.push('/admin')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
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
              placeholder="Title"
              value={resource.title}
              onChange={(e) => setResource({...resource, title: e.target.value})}
              required
            />
            <Textarea
              placeholder="Description"
              value={resource.description}
              onChange={(e) => setResource({...resource, description: e.target.value})}
              required
            />
            <Textarea
              placeholder="Content"
              value={resource.content}
              onChange={(e) => setResource({...resource, content: e.target.value})}
              required
            />
            <Select value={resource.type} onValueChange={(value) => setResource({...resource, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="ebook">eBook</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
            <Select value={resource.category} onValueChange={(value) => setResource({...resource, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AI">AI</SelectItem>
                <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                <SelectItem value="Robotics">Robotics</SelectItem>
                <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="Arduino">Arduino</SelectItem>
                <SelectItem value="Programming">Programming</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Switch
                id="paid-resource"
                checked={resource.isPaid}
                onCheckedChange={(checked) => setResource({...resource, isPaid: checked})}
              />
              <Label htmlFor="paid-resource">Paid Resource</Label>
            </div>
            {resource.isPaid && (
              <Input
                type="number"
                placeholder="Price"
                value={resource.price}
                onChange={(e) => setResource({...resource, price: parseFloat(e.target.value)})}
                required
              />
            )}
            <Select value={resource.fileType} onValueChange={(value) => setResource({...resource, fileType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="epub">EPUB</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.epub,.mp4"
            />
            <Button type="submit">Update Resource</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

