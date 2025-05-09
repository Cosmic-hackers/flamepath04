"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

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

export default function ResourceManagement() {
  const [resources, setResources] = useState<Resource[]>([])
  const [newResource, setNewResource] = useState<Omit<Resource, "id">>({
    title: "",
    description: "",
    type: "",
    originalPrice: 0,
    discountPercentage: 0,
    price: 0,
    isPaid: false,
    demoVideoUrl: "",
    content: [],
    images: [],
  })
  const { toast } = useToast()

  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem("resources") || "[]")
    setResources(storedResources)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "originalPrice") {
      const originalPrice = Number.parseFloat(value)
      const discountedPrice = originalPrice * (1 - newResource.discountPercentage / 100)
      setNewResource((prev) => ({
        ...prev,
        originalPrice,
        price: discountedPrice,
      }))
    } else if (name === "discountPercentage") {
      const discountPercentage = Number.parseFloat(value)
      const discountedPrice = newResource.originalPrice * (1 - discountPercentage / 100)
      setNewResource((prev) => ({
        ...prev,
        discountPercentage,
        price: discountedPrice,
      }))
    } else {
      setNewResource((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleContentChange = (content: string) => {
    try {
      const contentArray = content.split("\n\n").map((section) => {
        const [title, description] = section.split("\n")
        return { title, description }
      })
      setNewResource((prev) => ({ ...prev, content: contentArray }))
    } catch (error) {
      console.error("Error parsing content:", error)
    }
  }

  const handleDelete = async (id: string) => {
    const updatedResources = resources.filter((resource) => resource.id !== id)
    setResources(updatedResources)
    localStorage.setItem("resources", JSON.stringify(updatedResources))
    toast({
      title: "Resource Deleted",
      description: "The resource has been successfully deleted.",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const resourceWithId = {
      ...newResource,
      id: Date.now().toString(),
    }
    const updatedResources = [...resources, resourceWithId]
    setResources(updatedResources)
    localStorage.setItem("resources", JSON.stringify(updatedResources))

    // Reset form
    setNewResource({
      title: "",
      description: "",
      type: "",
      originalPrice: 0,
      discountPercentage: 0,
      price: 0,
      isPaid: false,
      demoVideoUrl: "",
      content: [],
      images: [],
    })

    toast({
      title: "Resource Added",
      description: "The new resource has been successfully added.",
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Resource</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              placeholder="Resource Title"
              value={newResource.title}
              onChange={handleInputChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Resource Description"
              value={newResource.description}
              onChange={handleInputChange}
              required
            />
            <Select
              value={newResource.type}
              onValueChange={(value) => setNewResource((prev) => ({ ...prev, type: value }))}
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
                value={newResource.originalPrice}
                onChange={handleInputChange}
                required
              />
              <Input
                name="discountPercentage"
                type="number"
                placeholder="Discount Percentage"
                value={newResource.discountPercentage}
                onChange={handleInputChange}
                required
              />
              <div className="text-sm text-muted-foreground">Final Price: ₹{newResource.price.toFixed(2)}</div>
            </div>
            <Input
              name="demoVideoUrl"
              placeholder="Demo Video URL"
              value={newResource.demoVideoUrl}
              onChange={handleInputChange}
            />
            <Textarea
              placeholder="Content (Title and Description separated by newline, sections separated by double newline)"
              value={newResource.content?.map((c) => `${c.title}\n${c.description}`).join("\n\n")}
              onChange={(e) => handleContentChange(e.target.value)}
              className="min-h-[200px]"
            />
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || [])
                const imageUrls = files.map((file) => URL.createObjectURL(file))
                setNewResource((prev) => ({
                  ...prev,
                  images: [...prev.images, ...imageUrls],
                }))
              }}
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
                <TableHead>Original Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Final Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.title}</TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell>₹{resource.originalPrice}</TableCell>
                  <TableCell>{resource.discountPercentage}%</TableCell>
                  <TableCell>₹{resource.price}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" asChild>
                        <Link href={`/admin/edit-resource/${resource.id}`}>Edit</Link>
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
    </div>
  )
}
