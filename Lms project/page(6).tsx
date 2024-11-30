...deleted...

m 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Resources() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Free Resources</CardTitle>
            <CardDescription>Access our collection of free learning materials</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/free-resources">Explore Free Resources</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Paid Resources</CardTitle>
            <CardDescription>Discover our premium learning content</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/paid-resources">Explore Paid Resources</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

