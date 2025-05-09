import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

type Resource = {
  id: string
  title: string
  description: string
  content: string
  originalPrice: number
  discountPercentage: number
  price: number
  isPaid: boolean
  type: 'course' | 'ebook' | 'project' | 'free'
  category: string
  thumbnail: string
  fileType?: string
  videos?: string[]
  pdfs?: string[]
  images: string[]
}

export default function ResourceEditor({ resource, onSave }: { resource: Resource; onSave: (updatedResource: Resource) => void }) {
  const [editedResource, setEditedResource] = useState(resource)
  const [videoUrls, setVideoUrls] = useState(resource.videos?.join('\n') || '')
  const [pdfUrls, setPdfUrls] = useState(resource.pdfs?.join('\n') || '')

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOriginalPrice = parseFloat(e.target.value)
    setEditedResource(prev => ({
      ...prev,
      originalPrice: newOriginalPrice,
      price: newOriginalPrice * (1 - prev.discountPercentage / 100)
    }))
  }

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDiscount = parseFloat(e.target.value)
    setEditedResource(prev => ({
      ...prev,
      discountPercentage: newDiscount,
      price: prev.originalPrice * (1 - newDiscount / 100)
    }))
  }

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setEditedResource(prev => ({ ...prev, images: [...prev.images, ...newImages] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedResource = {
      ...editedResource,
      videos: videoUrls.split('\n').filter(url => url.trim() !== ''),
      pdfs: pdfUrls.split('\n').filter(url => url.trim() !== ''),
    }
    onSave(updatedResource)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Resource</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={editedResource.title}
            onChange={(e) => setEditedResource({ ...editedResource, title: e.target.value })}
            placeholder="Title"
            required
          />
          <Textarea
            value={editedResource.description}
            onChange={(e) => setEditedResource({ ...editedResource, description: e.target.value })}
            placeholder="Description"
            required
          />
          <Textarea
            value={editedResource.content}
            onChange={(e) => setEditedResource({ ...editedResource, content: e.target.value })}
            placeholder="Content"
            required
          />
          <Select
            value={editedResource.type}
            onValueChange={(value) => setEditedResource({ ...editedResource, type: value as Resource['type'] })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="ebook">eBook</SelectItem>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="free">Free Resource</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={editedResource.category}
            onValueChange={(value) => setEditedResource({ ...editedResource, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
              <SelectItem value="AI">AI</SelectItem>
              <SelectItem value="Machine Learning">Machine Learning</SelectItem>
              <SelectItem value="Programming">Programming</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Switch
              id="isPaid"
              checked={editedResource.isPaid}
              onCheckedChange={(checked) => setEditedResource({ ...editedResource, isPaid: checked })}
            />
            <Label htmlFor="isPaid">Paid Resource</Label>
          </div>
          {editedResource.isPaid && (
            <>
              <Input
                type="number"
                value={editedResource.originalPrice}
                onChange={handlePriceChange}
                placeholder="Original Price"
              />
              <Input
                type="number"
                value={editedResource.discountPercentage}
                onChange={handleDiscountChange}
                placeholder="Discount Percentage"
              />
              <p>Selling Price: ₹{editedResource.price.toFixed(2)}</p>
            </>
          )}
          {editedResource.type === 'free' && (
            <Input
              value={editedResource.fileType || ''}
              onChange={(e) => setEditedResource({ ...editedResource, fileType: e.target.value })}
              placeholder="File Type"
            />
          )}
          {(editedResource.type === 'course' || editedResource.type === 'project') && (
            <>
              <Textarea
                value={videoUrls}
                onChange={(e) => setVideoUrls(e.target.value)}
                placeholder="Video URLs (one per line)"
              />
              <Textarea
                value={pdfUrls}
                onChange={(e) => setPdfUrls(e.target.value)}
                placeholder="PDF URLs (one per line)"
              />
            </>
          )}
          <div>
            <label htmlFor="images" className="block text-sm font-medium leading-6 text-gray-900">
              Images
            </label>
            <Input
              id="images"
              type="file"
              onChange={handleImageAdd}
              multiple
            />
            <ul>
              {editedResource.images.map((image, index) => (
                <li key={index}>
                  <img src={image} alt={`Resource image ${index + 1}`} width={100} height={100} />
                </li>
              ))}
            </ul>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  )
}
