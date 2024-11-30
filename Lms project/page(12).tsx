'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from "@/components/ui/use-toast"

export default function ContentManagement() {
  const { user } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [resources, setResources] = useState<any[]>([])
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: '',
    category: '',
    content: '',
    file: null as File | null,
  })

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/')
    } else {
      // Load resources from localStorage
      const storedResources = JSON.parse(localStorage.getItem('resources') || '[]')
      setResources(storedResources)
    }
  }, [user, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewResource({ ...newResource, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewResource({ ...newResource, [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewResource({ ...newResource, file: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedResources = [...resources, { ...newResource, id: Date.now().toString() }]
    setResources(updatedResources)
    localStorage.setItem('resources', JSON.stringify(updatedResources))
    setNewResource({ title: '', description: '', type: '', category: '', content: '', file: null })
    toast({ title: "Resource added successfully" })
  }

  const handleDelete = (id: string) => {
    const updatedResources = resources.filter(resource => resource.id !== id)
    setResources(updatedResources)
    localStorage.setItem('resources', JSON.stringify(updatedResources))
    toast({ title: "Resource deleted successfully" })
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Resource</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              placeholder="Title"
              value={newResource.title}
              onChange={handleInputChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Description"
              value={newResource.description}
              onChange={handleInputChange}
              required
            />
            <Select
              value={newResource.type}
              onValueChange={(value) => handleSelectChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="ebook">eBook</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={newResource.category}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
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
            <Textarea
              name="content"
              placeholder="Content"
              value={newResource.content}
              onChange={handleInputChange}
              required
            />
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.epub"
            />
            <Button type="submit">Add Resource</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.title}</TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell>{resource.category}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete(resource.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

