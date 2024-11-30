import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Clock } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Founder's Message Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-card rounded-lg overflow-hidden">
          <div className="relative h-[500px] w-full">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hkRZw8gkk67kH9yK02B0j2R2SWaUggqTafe74l2eiDuSB7mnA.jpg-TH4HwSwoWm7Q3E8a9hzsii99dDypXw.webp"
              alt="Mr Geek - Founder of Flamepath Academy"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">Message from the Founder</h2>
            <div className="prose dark:prose-invert">
              <p className="mb-4">
                "At Flamepath Academy, our mission is to ignite curiosity and empower individuals to succeed in the rapidly evolving world of technology. From ethical hacking to artificial intelligence, we strive to provide top-notch education and resources that make advanced learning accessible to everyone.
              </p>
              <p className="mb-4">
                I believe that learning is a journey, not a destination. That's why Flamepath Academy is built on the values of passion, innovation, and dedication to excellence. Every course, every resource, and every initiative is designed to not just teach but inspire.
              </p>
              <p className="mb-4">
                Whether you're a beginner taking your first step in cybersecurity or a professional looking to enhance your skills, we are here to guide and support you. Together, let's unlock your potential and create a brighter, more secure future.
              </p>
              <p className="mb-4">
                Thank you for being a part of this exciting journey!"
              </p>
              <p className="font-bold">- Mr Geek, Founder of Flamepath Academy</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <p className="text-xl mb-8">
          At <span className="font-bold">Flamepath Academy</span>, we are more than just an educational platform — we are a movement to empower individuals with the knowledge and skills needed to excel in the fields of cybersecurity, artificial intelligence, machine learning, ethical hacking, robotics, and embedded systems.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p>To ignite passion and fuel success by delivering cutting-edge education that bridges the gap between knowledge and application in the tech industry.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p>We aim to make advanced technical education accessible to everyone, providing high-quality resources, expert-led courses, and hands-on learning experiences to transform beginners into industry-ready professionals.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">What We Offer</h3>
            <ul className="space-y-2">
              <li>🎓 Comprehensive Courses</li>
              <li>🛠️ Practical Learning</li>
              <li>👨‍🏫 Expert Guidance</li>
              <li>⏰ Flexible Learning</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Why Choose Flamepath Academy?</h3>
            <ul className="space-y-2">
              <li>💡 Innovative Learning</li>
              <li>🤝 Community-Centric Approach</li>
              <li>🌍 Global Reach</li>
              <li>🎯 Career-Oriented Focus</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Our Story</h3>
          <p className="mb-4">
            Flamepath Academy was born out of a passion for education and innovation. Seeing a growing demand for skilled professionals in technology, our founder envisioned a platform that would not only educate but also inspire and equip individuals to thrive in the competitive tech landscape.
          </p>
          <p>
            Since our inception, we have helped countless students and professionals achieve their goals, and we are committed to continuing this mission with integrity, creativity, and excellence.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>support@flamepathacademy.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+91-9390291870</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <div>
                  <p>Monday to Friday: 9:00 AM – 6:00 PM</p>
                  <p>Saturday: 10:00 AM – 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <Input placeholder="Your Name" />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" />
                </div>
                <div>
                  <Input placeholder="Subject" />
                </div>
                <div>
                  <Textarea placeholder="Your Message" className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

