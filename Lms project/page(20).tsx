...deleted...

mport { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { useToast } from "@/components/ui/use-toast"
import { motion } from 'framer-motion'

const paidResources = [
  { 
    title: 'Advanced AI Techniques', 
    category: 'AI', 
    type: 'eBook', 
    price: 29.99, 
    thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OgPSbrfxgtSnZir8MOgsfeCxcNNd9DJeEfYfGLePVXM0PemzTA.jpg-QxjZFK0EOqqepN7ZfGQ9ypNCNPsrhC.webp'
  },
  { 
    title: 'Machine Learning Masterclass', 
    category: 'Machine Learning', 
    type: 'Video Course', 
    price: 99.99, 
    thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a6IKxsfdVTVmeEBwf8TkqmjT5kFeqExV73aPNYbFMqMhzbOPB.jpg-hUNudvngB7NMUkl0kMOr4yzs0o3nG5.webp'
  },
  { 
    title: 'Cybersecurity Expert Path', 
    category: 'Cybersecurity', 
    type: 'Course Bundle', 
    price: 149.99, 
    thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Uz4eQ0k1rQwQMqQSiZCAWVZxzZT0gcXL3p7g9q5p576memzTA.jpg-cwEntbhCx1nP3srKoNWN5xhZEJ2YrS.webp'
  },
  { 
    title: 'Arduino Projects Collection', 
    category: 'Arduino', 
    type: 'eBook', 
    price: 39.99, 
    thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/reNQfSv9y9rxikfSA9XcBf4iEjiRaLLtmcUFVAqpltOG2bOPB.jpg-1AS5GwTUehhZ0KvOt6cZEuvB2nTzpt.webp'
  },
  { 
    title: 'Ethical Hacking Certification Prep', 
    category: 'Ethical Hacking', 
    type: 'Video Course', 
    price: 79.99, 
    thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yxR5j8jcaQpZMNOvan9BwGsyPTyC6latVD3Q7OqD6xFcv58E.jpg-FfhTlZRNzdKhA1MDfxeIAU2FdpIr64.webp'
  },
  { 
    title: 'Advanced Robotics Programming', 
    category: 'Robotics', 
    type: 'eBook', 
    price: 49.99, 
    thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yUd2r3CuHmoFEl9ZICcbISbgeyTfYjjofteD5zbfeULtrv58E.jpg-1onwfAec0FOnM00DWIsGLpCJEIJ5os.webp'
  },
]

export default function PaidResources() {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Paid Resources
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paidResources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={resource.thumbnail}
                    alt={resource.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2">Type: {resource.type}</p>
                <p className="mb-4 font-bold">${resource.price.toFixed(2)}</p>
                <Button 
                  className="w-full transition-colors duration-300 hover:bg-primary-dark"
                  onClick={() => {
                    addItem({ id: resource.title, title: resource.title, price: resource.price })
                    toast({
                      title: "Added to cart",
                      description: `${resource.title} has been added to your cart.`,
                    })
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

