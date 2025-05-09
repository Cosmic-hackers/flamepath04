'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"

type Course = {
  id: string
  title: string
  description: string
  price: number
  isPaid: boolean
  thumbnail: string
  demoVideoUrl: string
  type: 'course' | 'project'
}

export default function EditCourse() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]')
    const foundCourse = courses.find((c: Course) => c.id === id)
    if (foundCourse) {
      setCourse(foundCourse)
    } else {
      toast({
        title: "Course not found",
        description: "The requested course could not be found.",
        variant: "destructive",
      })
      router.push('/admin')
    }
  }, [id, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCourse(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleSelectChange = (name: string, value: string) => {
    setCourse(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleSwitchChange = (checked: boolean) => {
    setCourse(prev => prev ? { ...prev, isPaid: checked } : null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!course) return

    const courses = JSON.parse(localStorage.getItem('courses') || '[]')
    const updatedCourses = courses.map((c: Course) => c.id === course.id ? course : c)
    localStorage.setItem('courses', JSON.stringify(updatedCourses))

    toast({
      title: "Course Updated",
      description: "The course has been successfully updated.",
    })
    router.push('/admin')
  }

  if (!course) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Course: {course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              placeholder="Course Title"
              value={course.title}
              onChange={handleInputChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Course Description"
              value={course.description}
              onChange={handleInputChange}
              required
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="isPaid"
                checked={course.isPaid}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isPaid">Paid Course</Label>
            </div>
            {course.isPaid && (
              <Input
                name="price"
                type="number"
                placeholder="Price in Rupees"
                value={course.price}
                onChange={handleInputChange}
                required
              />
            )}
            <Input
              name="thumbnail"
              placeholder="Thumbnail URL"
              value={course.thumbnail}
              onChange={handleInputChange}
              required
            />
            <Input
              name="demoVideoUrl"
              placeholder="Demo Video URL"
              value={course.demoVideoUrl}
              onChange={handleInputChange}
              required
            />
            <Select
              value={course.type}
              onValueChange={(value) => handleSelectChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select course type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="project">Project</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Update Course</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
