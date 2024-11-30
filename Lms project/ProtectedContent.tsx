'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProtectedContentProps {
 title: string
 content: string
}

export default function ProtectedContent({ title, content }: ProtectedContentProps) {
 const [isDownloaded, setIsDownloaded] = useState(false)
 const contentRef = useRef<HTMLDivElement>(null)

 useEffect(() => {
   const handlePrintScreen = (e: KeyboardEvent) => {
     if (e.key === 'PrintScreen') {
       e.preventDefault()
       alert('Screenshots are not allowed for this content.')
     }
   }

   window.addEventListener('keydown', handlePrintScreen)

   return () => {
     window.removeEventListener('keydown', handlePrintScreen)
   }
 }, [])

 useEffect(() => {
   if (contentRef.current) {
     contentRef.current.addEventListener('contextmenu', (e) => {
       e.preventDefault()
       alert('Right-click is disabled for this content.')
     })
   }
 }, [isDownloaded])

 const handleDownload = () => {
   setIsDownloaded(true)
   // In a real application, you would implement the actual download logic here
 }

 return (
   <Card>
     <CardHeader>
       <CardTitle>{title}</CardTitle>
     </CardHeader>
     <CardContent>
       {isDownloaded ? (
         <div ref={contentRef} className="select-none">
           {content}
         </div>
       ) : (
         <Button onClick={handleDownload}>Download Content</Button>
       )}
     </CardContent>
   </Card>
 )
}

