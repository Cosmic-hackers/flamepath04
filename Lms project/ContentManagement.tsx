'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { useToast } from "@/components/ui/use-toast"

// Mock data for existing resources
const existingResources = [
  { id: '1', title: 'Introduction to AI', type: 'course', category: 'AI', isPaid: false },
  { id: '2', title: 'Advanced Machine Learning', type: 'course', category: 'AI', isPaid: true },
  { id: '3', title: 'Python for ML', type: 'course', category: 'Machine Learning', isPaid: false },
  { id: '4', title: 'TensorFlow Masterclass', type: 'course', category: 'Machine Learning', isPaid: true },
  { id: '5', title: 'Intro to Robotics', type: 'course', category: 'Robotics', isPaid: false },
  { id: '6', title: 'Advanced Robotics Programming', type: 'course', category: 'Robotics', isPaid: true },
  { id: '7', title: 'Cybersecurity Basics', type: 'course', category: 'Cybersecurity', isPaid: false },
  { id: '8', title: 'Ethical Hacking Course', type: 'course', category: 'Cybersecurity', isPaid: true },
  { id: '9', title: 'Getting Started with Arduino', type: 'course', category: 'Arduino', isPaid: false },
  { id: '10', title: 'Ethical Hacking 101', type: 'course', category: 'Cybersecurity', isPaid: false },
  { id: '11', title: 'Python Basics', type: 'course', category: 'Programming', isPaid: false },
  { id: '12', title: 'Arduino Projects Collection', type: 'ebook', category: 'Arduino', isPaid: true },
  { id: '13', title: 'Ethical Hacking Certification Prep', type: 'course', category: 'Cybersecurity', isPaid: true },
]

export default function ContentManagement() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [type, setType] = useState('note')
  const [category, setCategory] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [price, setPrice] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [resources, setResources] = useState(existingResources)

  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate file upload (in a real app, you'd upload to a server or cloud storage)
    let fileUrl = ''
    if (file) {
      // This is a mock URL. In a real app, you'd get this from your file upload service
      fileUrl = URL.createObjectURL(file)
    }

    // Create new resource object
    const newResource = {
      id: String(existingResources.length + 1),
      title,
      description,
      content,
      type,
      category,
      isPaid,
      price: isPaid ? parseFloat(price) : 0,
      fileUrl
    }

    // Update the mock data (in a real app, this would be an API call)
    existingResources.push(newResource)
    setResources([...existingResources]) // Update the state

    // Store the new resource in localStorage
    const resources = JSON.parse(localStorage.getItem('resources') || '{}')
    resources[title] = newResource
    localStorage.setItem('resources', JSON.stringify(resources))

    toast({
      title: "Resource Added",
      description: "The new resource has been successfully added.",
    })

    // Reset form
    setTitle('')
    setDescription('')
    setContent('')
    setType('note')
    setCategory('')
    setIsPaid(false)
    setPrice('')
    setFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleDelete = (id: string) => {
    const updatedResources = resources.filter(resource => resource.id !== id)
    setResources(updatedResources)
    toast({
      title: "Resource deleted",
      description: "The resource has been successfully deleted.",
    })
  }

  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All Resources</TabsTrigger>
        <TabsTrigger value="new">Add New Content</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>All Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Paid/Free</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell>{resource.title}</TableCell>
                    <TableCell>{resource.type}</TableCell>
                    <TableCell>{resource.category}</TableCell>
                    <TableCell>{resource.isPaid ? 'Paid' : 'Free'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" asChild>
                          <Link href={`/admin/edit-resource/${resource.id}`}>
                            Edit
                          </Link>
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(resource.id)}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="new">
        <Card>
          <CardHeader>
            <CardTitle>Add New Content</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Short Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <Textarea
                placeholder="Full Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="note">Note</SelectItem>
                  <SelectItem value="ebook">eBook</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="video">Video Course</SelectItem>
                </SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="machine-learning">Machine Learning</SelectItem>
                  <SelectItem value="robotics">Robotics</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Switch
                  id="paid-resource"
                  checked={isPaid}
                  onCheckedChange={setIsPaid}
                />
                <Label htmlFor="paid-resource">Paid Resource</Label>
              </div>
              {isPaid && (
                <Input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              )}
              <Input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.epub,.txt,.mp4"
              />
              <Button type="submit">Add Content</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

