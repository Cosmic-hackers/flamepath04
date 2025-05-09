import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 flame-text text-center">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-electric-blue">Get in Touch</h2>
          <div className="space-y-4 text-foreground-light">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-flame-orange" />
              <span>contact@flamepath.academy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-flame-orange" />
              <span>+91-9390291870</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-flame-orange" />
              <div>
                <p>Monday to Friday: 9:00 AM – 6:00 PM</p>
                <p>Saturday: 10:00 AM – 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
        <Card className="tech-card">
          <CardHeader>
            <CardTitle className="flame-text">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" action="mailto:flamepath.academy@proton.me" method="post" encType="text/plain">
              <div>
                <Input placeholder="Your Name" className="bg-background border-electric-blue text-foreground-light" />
              </div>
              <div>
                <Input type="email" placeholder="Your Email" className="bg-background border-electric-blue text-foreground-light" />
              </div>
              <div>
                <Input placeholder="Subject" className="bg-background border-electric-blue text-foreground-light" />
              </div>
              <div>
                <Textarea placeholder="Your Message" className="min-h-[150px] bg-background border-electric-blue text-foreground-light" />
              </div>
              <Button type="submit" className="w-full flame-button">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
