"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

type Course = {
  id: string
  title: string
  description: string
  price: number
  isPaid: boolean
  thumbnail: string
  demoVideoUrl: string
  isNew?: boolean
  isUpcoming?: boolean
  type: "course" | "project"
  content: { title: string; description: string }[]
}

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([])
  const [newCourse, setNewCourse] = useState<Omit<Course, "id">>({
    title: "",
    description: "",
    price: 0,
    isPaid: false,
    thumbnail: "",
    demoVideoUrl: "",
    type: "course",
    content: [],
  })
  const { toast } = useToast()

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses") || "[]")
    setCourses(storedCourses)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewCourse((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewCourse((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setNewCourse((prev) => ({ ...prev, isPaid: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const courseWithId = {
      ...newCourse,
      id: Date.now().toString(),
      isNew: true,
    }
    const updatedCourses = [...courses, courseWithId]
    setCourses(updatedCourses)
    localStorage.setItem("courses", JSON.stringify(updatedCourses))

    // Reset form
    setNewCourse({
      title: "",
      description: "",
      price: 0,
      isPaid: false,
      thumbnail: "",
      demoVideoUrl: "",
      type: "course",
      content: [], // Add this line
    })

    toast({
      title: "Course Added",
      description: "The new course has been successfully added.",
    })
  }

  const handleDelete = (id: string) => {
    const updatedCourses = courses.filter((course) => course.id !== id)
    setCourses(updatedCourses)
    localStorage.setItem("courses", JSON.stringify(updatedCourses))
    toast({
      title: "Course Deleted",
      description: "The course has been successfully deleted.",
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Course</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={handleInputChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Course Description"
              value={newCourse.description}
              onChange={handleInputChange}
              required
            />
            <div className="flex items-center space-x-2">
              <Switch id="isPaid" checked={newCourse.isPaid} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="isPaid">Paid Course</Label>
            </div>
            {newCourse.isPaid && (
              <Input
                name="price"
                type="number"
                placeholder="Price in Rupees"
                value={newCourse.price}
                onChange={handleInputChange}
                required
              />
            )}
            <Input
              name="thumbnail"
              placeholder="Thumbnail URL"
              value={newCourse.thumbnail}
              onChange={handleInputChange}
              required
            />
            <Input
              name="demoVideoUrl"
              placeholder="Demo Video URL"
              value={newCourse.demoVideoUrl}
              onChange={handleInputChange}
              required
            />
            <Select value={newCourse.type} onValueChange={(value) => handleSelectChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select course type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="project">Project</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Add Course</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.type}</TableCell>
                  <TableCell>{course.isPaid ? `₹${course.price}` : "Free"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" asChild>
                        <Link href={`/admin/edit-course/${course.id}`}>Edit</Link>
                      </Button>
                      <Button variant="destructive" onClick={() => handleDelete(course.id)}>
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
    </div>
  )
}
