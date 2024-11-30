...deleted...

mport { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import ProtectedContent from '@/components/ProtectedContent'
import { toast } from '@/components/ui/use-toast'

const freeResources = [
  { 
    title: 'Introduction to AI', 
    category: 'AI', 
    type: 'PDF', 
    thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HvjyJP1xkWZNB1TusDtMIJT7fy67mRt1tIPi63feuiwSJSnnA.jpg-YiQbARncnOOuNj78PaVopfA8t6SE78.webp'
  },
  { 
    title: 'Machine Learning Basics', 
    category: 'Machine Learning', 
    type: 'eBook', 
    thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jyp3Pmk8wb4VMtnmiPZyzrl2Uzm7Gzxf7OVYD1Trt0Pji05JA.jpg-CAwQsFoO6bqiqvlNIvlIxsIz5PzRSM.webp'
  },
  { 
    title: 'Cybersecurity Fundamentals', 
    category: 'Cybersecurity', 
    type: 'PDF', 
    thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kZHQUYKYe6X5BCJlaVQxFPyRGtEAX1ziX2Cl0c9mCluMj05JA.jpg-nKMmTkyJuHTz28OJTvk2N7xVlw83Ol.webp'
  },
  { 
    title: 'Getting Started with Arduino', 
    category: 'Arduino', 
    type: 'Tutorial', 
    thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/572BTcWEZ9p5NBDJe7eiNDLyXF13bSc2zDHlIsC4TXRgHpzTA.jpg-OmZw3Mk1GtjxXllOTgIPnpoNEecvan.webp'
  },
  { 
    title: 'Ethical Hacking 101', 
    category: 'Ethical Hacking', 
    type: 'PDF', 
    thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aYjI0iePQ2zRBy4J0ecRDSbJwcUnZftBulvZbGARkWR5PSnnA.jpg-FMdM1II7GNJWHx6I1lZDCkusvLJnSK.webp'
  },
  { 
    title: 'Robotics for Beginners', 
    category: 'Robotics', 
    type: 'PDF', 
    thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kNyD9axjt4ZOLB6FtqYi17aKoXqyHcpOJbB2tnbkf8yOk05JA.jpg-ewwIU9HgzMFZzeUcw566JZjLex5n6a.webp'
  },
]

const handleDownload = (resource) => {
  const user = localStorage.getItem('user') // Assuming user data is stored in localStorage
  if (!user) {
    toast({
      title: "Login Required",
      description: "Please log in to download resources.",
      variant: "destructive",
    })
    return
  }

  // Fetch the resource from localStorage
  const resources = JSON.parse(localStorage.getItem('resources') || '{}')
  const fullResource = resources[resource.title] || resource

  // Add to user's downloads
  const downloads = JSON.parse(localStorage.getItem('userDownloads') || '[]')
  if (!downloads.some(d => d.title === fullResource.title)) {
    downloads.push(fullResource)
    localStorage.setItem('userDownloads', JSON.stringify(downloads))
    toast({
      title: "Resource Downloaded",
      description: `${fullResource.title} has been added to your downloads.`,
    })
  } else {
    toast({
      title: "Already Downloaded",
      description: `${fullResource.title} is already in your downloads.`,
    })
  }
}

export default function FreeResources() {
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
        Free Resources
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {freeResources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader className="p-0">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={resource.thumbnail}
                    alt={resource.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.category}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Type: {resource.type}</p>
                <Button onClick={() => handleDownload(resource)}>Download</Button>
                <ProtectedContent title={resource.title} content={`This is the protected content for ${resource.title}`} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

