'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
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
 images: string[]
}

export default function AddResource() {
 const [title, setTitle] = useState('')
 const [description, setDescription] = useState('')
 const [type, setType] = useState('')
 const [isPaid, setIsPaid] = useState(false)
 const [originalPrice, setOriginalPrice] = useState(0)
 const [discountPercentage, setDiscountPercentage] = useState(0)
 const [price, setPrice] = useState(0)
 const [images, setImages] = useState<string[]>([])
 const { toast } = useToast()

 const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const newOriginalPrice = parseFloat(e.target.value)
   setOriginalPrice(newOriginalPrice)
   setPrice(newOriginalPrice * (1 - discountPercentage / 100))
 }

 const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const newDiscount = parseFloat(e.target.value)
   setDiscountPercentage(newDiscount)
   setPrice(originalPrice * (1 - newDiscount / 100))
 }

 const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
   const files = e.target.files
   if (files) {
     const newImages = Array.from(files).map(file => URL.createObjectURL(file))
     setImages([...images, ...newImages])
   }
 }

 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault()

   const newResource: Resource = {
     id: Date.now().toString(),
     title,
     description,
     type,
     originalPrice,
     discountPercentage,
     price,
     isPaid,
     images
   }

   const resources = JSON.parse(localStorage.getItem('resources') || '[]')
   resources.push(newResource)
   localStorage.setItem('resources', JSON.stringify(resources))

   toast({
     title: "Resource Added",
     description: "The new resource has been successfully added.",
   })

   setTitle('')
   setDescription('')
   setType('')
   setIsPaid(false)
   setOriginalPrice(0)
   setDiscountPercentage(0)
   setPrice(0)
   setImages([])
 }

 return (
   <form onSubmit={handleSubmit} className="space-y-4">
     <Input
       placeholder="Resource Name"
       value={title}
       onChange={(e) => setTitle(e.target.value)}
       required
     />
     <Textarea
       placeholder="Description"
       value={description}
       onChange={(e) => setDescription(e.target.value)}
       required
     />
     <Select value={type} onValueChange={setType} required>
       <SelectTrigger>
         <SelectValue placeholder="Select type" />
       </SelectTrigger>
       <SelectContent>
         <SelectItem value="ebook">eBook</SelectItem>
         <SelectItem value="video">Video</SelectItem>
         <SelectItem value="document">Document</SelectItem>
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
       <div>
         <Input
           type="number"
           placeholder="Original Price"
           value={originalPrice}
           onChange={handlePriceChange}
           required
         />
         <Input
           type="number"
           placeholder="Discount Percentage"
           value={discountPercentage}
           onChange={handleDiscountChange}
           required
         />
         <p>Selling Price: ₹{price.toFixed(2)}</p>
       </div>
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
     </div>
     <Button type="submit">Add Resource</Button>
   </form>
 )
}
