import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Clock } from 'lucide-react'

export default function AboutPage() {
 return (
   <div className="container mx-auto px-4 py-16"> {/* Increased top padding */}
     {/* Founder's Message Section */}
     <section className="mb-16">
       <Card className="overflow-hidden animate-rainbow-border relative">
         <div className="absolute inset-0 bg-gradient-to-r from-flame-red via-flame-orange to-flame-yellow animate-gradient rounded-lg" />
         <CardContent className="p-0 relative">
           <div className="grid md:grid-cols-2 gap-0">
             <div className="relative h-[400px] md:h-full">
               <Image
                 src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hkRZw8gkk67kH9yK02B0j2R2SWaUggqTafe74l2eiDuSB7mnA.jpg-TH4HwSwoWm7Q3E8a9hzsii99dDypXw.webp"
                 alt="Mr Geek - Founder of Flamepath Academy"
                 layout="fill"
                 objectFit="cover"
               />
             </div>
             <div className="p-8 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
               <h2 className="text-3xl font-bold mb-6 flame-text">Message from the Founder</h2>
               <div className="prose dark:prose-invert">
                 <p className="mb-4 text-foreground">
                   "At Flamepath Academy, our mission is to ignite curiosity and empower individuals to succeed in the rapidly evolving world of technology. From ethical hacking to artificial intelligence, we strive to provide top-notch education and resources that make advanced learning accessible to everyone.
                 </p>
                 <p className="mb-4 text-foreground">
                   I believe that learning is a journey, not a destination. That's why Flamepath Academy is built on the values of passion, innovation, and dedication to excellence. Every course, every resource, and every initiative is designed to not just teach but inspire.
                 </p>
                 <p className="mb-4 text-foreground">
                   Whether you're a beginner taking your first step in cybersecurity or a professional looking to enhance your skills, we are here to guide and support you. Together, let's unlock your potential and create a brighter, more secure future.
                 </p>
                 <p className="mb-4 text-foreground">
                   Thank you for being a part of this exciting journey!"
                 </p>
                 <p className="font-bold text-electric-blue">- Mr Geek, Founder of Flamepath Academy</p>
               </div>
             </div>
           </div>
         </CardContent>
       </Card>
     </section>

     {/* About Us Section */}
     <section className="mb-16">
       <h1 className="text-4xl font-bold mb-8 flame-text">About Us</h1>
       <p className="text-xl mb-8 text-black dark:text-white">
         At <span className="font-bold text-electric-blue">Flamepath Academy</span>, we are more than just an educational platform — we are a movement to empower individuals with the knowledge and skills needed to excel in the fields of cybersecurity, artificial intelligence, machine learning, ethical hacking, robotics, and embedded systems.
       </p>

       <div className="grid md:grid-cols-2 gap-8 mb-12">
         <Card className="tech-card bg-white dark:bg-black">
           <CardContent className="p-6">
             <h2 className="text-2xl font-bold mb-4 flame-text">Our Vision</h2>
             <p className="text-black dark:text-white">To ignite passion and fuel success by delivering cutting-edge education that bridges the gap between knowledge and application in the tech industry.</p>
           </CardContent>
         </Card>
         <Card className="tech-card bg-white dark:bg-black">
           <CardContent className="p-6">
             <h2 className="text-2xl font-bold mb-4 flame-text">Our Mission</h2>
             <p className="text-black dark:text-white">We aim to make advanced technical education accessible to everyone, providing high-quality resources, expert-led courses, and hands-on learning experiences to transform beginners into industry-ready professionals.</p>
           </CardContent>
         </Card>
       </div>

       <div className="grid md:grid-cols-2 gap-8 mb-12">
         <div>
           <h3 className="text-2xl font-bold mb-4 flame-text">What We Offer</h3>
           <ul className="space-y-2 text-black dark:text-white">
             <li>🎓 Comprehensive Courses</li>
             <li>🛠️ Practical Learning</li>
             <li>👨‍🏫 Expert Guidance</li>
             <li>⏰ Flexible Learning</li>
           </ul>
         </div>
         <div>
           <h3 className="text-2xl font-bold mb-4 flame-text">Why Choose Flamepath Academy?</h3>
           <ul className="space-y-2 text-black dark:text-white">
             <li>💡 Innovative Learning</li>
             <li>🤝 Community-Centric Approach</li>
             <li>🌍 Global Reach</li>
             <li>🎯 Career-Oriented Focus</li>
           </ul>
         </div>
       </div>

       <div className="mb-12">
         <h3 className="text-2xl font-bold mb-4 flame-text">Our Story</h3>
         <p className="mb-4 text-black dark:text-white">
           Flamepath Academy was born out of a passion for education and innovation. Seeing a growing demand for skilled professionals in technology, our founder envisioned a platform that would not only educate but also inspire and equip individuals to thrive in the competitive tech landscape.
         </p>
         <p className="text-black dark:text-white">
           Since our inception, we have helped countless students and professionals achieve their goals, and we are committed to continuing this mission with integrity, creativity, and excellence.
         </p>
       </div>
     </section>

     {/* Contact Section */}
     <section className="mb-16">
       <h2 className="text-3xl font-bold mb-8 flame-text">Contact Us</h2>
       <div className="grid md:grid-cols-2 gap-8">
         <div>
           <h3 className="text-2xl font-bold mb-6 text-electric-blue">Get in Touch</h3>
           <div className="space-y-4 text-black dark:text-white">
             <div className="flex items-center space-x-2">
               <Mail className="h-5 w-5 text-flame-orange" />
               <span>support@flamepathacademy.com</span>
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
         <Card className="tech-card bg-white dark:bg-black">
           <CardContent className="p-6">
             <h3 className="text-2xl font-bold mb-6 text-electric-blue">Send us a Message</h3>
             <form className="space-y-4">
               <div>
                 <Input placeholder="Your Name" className="bg-background/30 border-electric-blue text-black dark:text-white" />
               </div>
               <div>
                 <Input type="email" placeholder="Your Email" className="bg-background/30 border-electric-blue text-black dark:text-white" />
               </div>
               <div>
                 <Input placeholder="Subject" className="bg-background/30 border-electric-blue text-black dark:text-white" />
               </div>
               <div>
                 <Textarea placeholder="Your Message" className="min-h-[150px] bg-background/30 border-electric-blue text-black dark:text-white" />
               </div>
               <Button type="submit" className="w-full flame-button">Send Message</Button>
             </form>
           </CardContent>
         </Card>
       </div>
     </section>
   </div>
 )
}

<style jsx>{`
  @keyframes rainbow-border {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-rainbow-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #8000ff);
    background-size: 200% 200%;
    animation: rainbow-border 6s linear infinite;
    border-radius: inherit;
    z-index: -1;
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: rainbow-border 6s linear infinite;
  }
`}</style>
