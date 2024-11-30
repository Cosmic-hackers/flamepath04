...deleted...

mport { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Download = {
  id: string
  title: string
  type: string
  fileUrl?: string
  content?: string
}

export default function Downloads() {
  const { user } = useUser()
  const [downloads, setDownloads] = useState<Download[]>([])
  const [selectedResource, setSelectedResource] = useState<Download | null>(null)

  useEffect(() => {
    if (user) {
      const userDownloads = JSON.parse(localStorage.getItem('userDownloads') || '[]')
      setDownloads(userDownloads)
    }
  }, [user])

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Please log in to view your downloads.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Downloads</h1>
      {downloads.length === 0 ? (
        <p>You haven't downloaded any resources yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloads.map((download) => (
            <Card key={download.id}>
              <CardHeader>
                <CardTitle>{download.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Type: {download.type}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4">Read Resource</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{download.title}</DialogTitle>
                    </DialogHeader>
                    {download.fileUrl ? (
                      <div className="mt-4">
                        {download.type === 'pdf' ? (
                          <embed src={download.fileUrl} type="application/pdf" width="100%" height="600px" />
                        ) : (
                          <p>Preview not available for this file type.</p>
                        )}
                      </div>
                    ) : download.content ? (
                      <div className="mt-4">
                        {download.content}
                      </div>
                    ) : (
                      <div className="mt-4">
                        <p>This resource is not available yet. Please check back later.</p>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

