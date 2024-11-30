import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

type Resource = {
  id: number
  title: string
  description: string
  content: string
  type: string
  category: string
  isPaid: boolean
  price: number
}

export default function ResourceEditor({ resource }: { resource: Resource }) {
  const [title, setTitle] = useState(resource.title)
  const [description, setDescription] = useState(resource.description)
  const [content, setContent] = useState(resource.content)
  const [type, setType] = useState(resource.type)
  const [category, setCategory] = useState(resource.category)
  const [isPaid, setIsPaid] = useState(resource.isPaid)
  const [price, setPrice] = useState(resource.price.toString())
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend to update the resource
    console.log({ id: resource.id, title, description, content, type, category, isPaid, price, file })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Resource</CardTitle>
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
            accept=".pdf,.epub,.txt"
          />
          <Button type="submit">Update Resource</Button>
        </form>
      </CardContent>
    </Card>
  )
}

