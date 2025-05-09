"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Compass, Footprints, Zap, Users, Brain, Shield } from "lucide-react"
import { motion } from "framer-motion"
import VoiceAssistant from "@/components/VoiceAssistant"
import AnimatedStudent from "@/components/AnimatedStudent"
import Hero from "@/components/Hero"
import { FadeInSection } from "@/components/FadeInSection"

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    course: "Ethical Hacking",
    comment: "This course completely transformed my understanding of cybersecurity. Highly recommended!",
  },
  {
    id: 2,
    name: "Jane Smith",
    course: "AI Fundamentals",
    comment: "The AI course was challenging but incredibly rewarding. I feel well-prepared for my career now.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    course: "Robotics 101",
    comment: "The hands-on projects in the robotics course were fantastic. I learned so much in a short time.",
  },
]

const milestones = [
  { year: 2018, title: "Foundation", description: "Flamepath Academy was established" },
  { year: 2019, title: "First Courses", description: "Launched our first set of online courses" },
  { year: 2020, title: "Global Reach", description: "Expanded to serve students worldwide" },
  { year: 2021, title: "Industry Partnerships", description: "Formed alliances with tech giants" },
  { year: 2022, title: "AI Integration", description: "Introduced AI-powered learning assistants" },
  { year: 2023, title: "Future Ready", description: "Preparing students for the jobs of tomorrow" },
]

const techBlogs = [
  {
    id: 1,
    title: "The Future of AI in Healthcare",
    excerpt: "Exploring how artificial intelligence is revolutionizing medical diagnoses and treatment plans.",
    link: "https://www.healthcareitnews.com/news/how-ai-transforming-healthcare",
  },
  {
    id: 2,
    title: "Machine Learning in Finance",
    excerpt: "Discover how ML algorithms are being used to predict market trends and manage risks.",
    link: "https://www.forbes.com/sites/bernardmarr/2021/04/13/the-amazing-ways-how-machine-learning-is-transforming-finance-and-banking/",
  },
  {
    id: 3,
    title: "Ethical Hacking: Protecting the Digital Frontier",
    excerpt: "Learn about the crucial role of ethical hackers in maintaining cybersecurity.",
    link: "https://www.csoonline.com/article/3610458/what-is-ethical-hacking-and-how-to-become-an-ethical-hacker.html",
  },
  {
    id: 4,
    title: "The Rise of Quantum Computing",
    excerpt: "Understanding the potential impact of quantum computers on cryptography and data security.",
    link: "https://www.technologyreview.com/2019/01/29/66141/what-is-quantum-computing/",
  },
  {
    id: 5,
    title: "AI in Creative Industries",
    excerpt: "How artificial intelligence is transforming art, music, and content creation.",
    link: "https://www.wired.com/story/artificial-intelligence-art-creativity/",
  },
  {
    id: 6,
    title: "Cybersecurity in the Age of IoT",
    excerpt: "Exploring the challenges and solutions for securing the Internet of Things.",
    link: "https://www.securitymagazine.com/articles/94225-iot-security-challenges-and-ways-to-overcome-them",
  },
]

const latestTech = [
  {
    id: 1,
    title: "AI Innovations",
    description:
      "Discover the latest breakthroughs in artificial intelligence, from natural language processing to computer vision.",
    icon: Brain,
    articles: [
      { title: "GPT-4: The Next Leap in AI Language Models", link: "https://openai.com/research/gpt-4" },
      {
        title: "AI-Powered Drug Discovery Accelerates Medical Research",
        link: "https://www.nature.com/articles/d41586-022-00018-5",
      },
      {
        title: "Computer Vision Advances in Autonomous Vehicles",
        link: "https://www.nvidia.com/en-us/self-driving-cars/computer-vision/",
      },
    ],
  },
  {
    id: 2,
    title: "Machine Learning Advancements",
    description: "Explore cutting-edge machine learning techniques and their applications in various industries.",
    icon: Zap,
    articles: [
      {
        title: "Federated Learning: Privacy-Preserving ML",
        link: "https://ai.googleblog.com/2017/04/federated-learning-collaborative.html",
      },
      {
        title: "Reinforcement Learning in Robotics",
        link: "https://www.sciencedirect.com/science/article/pii/S0004370221000862",
      },
      {
        title: "Transfer Learning: Boosting ML Efficiency",
        link: "https://machinelearningmastery.com/transfer-learning-for-deep-learning/",
      },
    ],
  },
  {
    id: 3,
    title: "Ethical Hacking Insights",
    description: "Learn about the latest trends in cybersecurity and ethical hacking to protect digital assets.",
    icon: Shield,
    articles: [
      {
        title: "Zero Trust Security: A New Paradigm",
        link: "https://www.nist.gov/publications/zero-trust-architecture",
      },
      {
        title: "Blockchain in Cybersecurity: Beyond Cryptocurrencies",
        link: "https://www.ibm.com/topics/blockchain-security",
      },
      {
        title: "AI-Powered Threat Detection and Response",
        link: "https://www.darktrace.com/en/resources/wp-ai-cyber-security.pdf",
      },
    ],
  },
]

export default function Home() {
  const [subscriberCount, setSubscriberCount] = useState(0)
  const targetSubscribers = 50000
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false)

  useEffect(() => {
    const savedCount = localStorage.getItem("subscriberCount")
    const startCount = savedCount ? Number.parseInt(savedCount, 10) : 0

    const interval = setInterval(() => {
      setSubscriberCount((prevCount) => {
        if (prevCount < targetSubscribers) {
          const newCount = prevCount + Math.floor(Math.random() * 10) + 1
          localStorage.setItem("subscriberCount", newCount.toString())
          return newCount
        }
        clearInterval(interval)
        return targetSubscribers
      })
    }, 100)

    const timer = setTimeout(() => {
      setShowVoiceAssistant(true)
    }, 1000)

    setSubscriberCount(startCount)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeInSection>
        <section>
          <Hero />
        </section>
      </FadeInSection>

      <FadeInSection>
        <AnimatedStudent />
      </FadeInSection>

      <FadeInSection>
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Join Our Growing Community</h2>
          <div className="flex justify-center items-center space-x-4">
            <motion.span
              className="text-4xl font-bold text-burgundy"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {subscriberCount.toLocaleString()}
            </motion.span>
            <span className="text-xl">Bright Minds and Counting!</span>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center flame-text">Our Journey of Excellence</h2>
          <div className="relative">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="flex items-center mb-8"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="w-1/4 text-right pr-4">
                  <h3 className="text-xl font-bold text-burgundy">{milestone.year}</h3>
                </div>
                <div className="w-1/2 relative">
                  <div className="w-4 h-4 bg-golden rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="border-t-2 border-golden w-full absolute top-1/2 transform -translate-y-1/2" />
                </div>
                <div className="w-1/4 pl-4">
                  <h4 className="text-lg font-semibold">{milestone.title}</h4>
                  <p className="text-sm text-foreground-light">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center flame-text">Our Guiding Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovative Learning",
                icon: Flame,
                description: "Cutting-edge courses designed to ignite your potential.",
              },
              {
                title: "Career Guidance",
                icon: Compass,
                description: "Navigate your professional journey with expert mentorship.",
              },
              {
                title: "Continuous Growth",
                icon: Footprints,
                description: "Step-by-step progression towards mastery in your field.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="tech-card h-full">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-electric-blue">
                    <feature.icon className="mr-2 h-6 w-6" />
                    {feature.title}
                  </h3>
                  <p className="text-foreground-light">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center flame-text">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="tech-card h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-2 flex items-center text-electric-blue">
                    <Users className="mr-2 h-6 w-6" />
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-flame-orange mb-2">{testimonial.course}</p>
                  <p className="text-foreground-light flex-grow">&quot;{testimonial.comment}&quot;</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center flame-text">Latest in Tech</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestTech.map((tech, index) => (
              <Card key={tech.id} className="tech-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-electric-blue flex items-center">
                    <tech.icon className="mr-2 h-6 w-6" />
                    {tech.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground-light mb-4">{tech.description}</p>
                  <ul className="space-y-2">
                    {tech.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <Link
                          href={article.link}
                          className="text-flame-orange hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Button className="flame-button mt-4">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center flame-text">Tech Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techBlogs.map((blog) => (
              <Card key={blog.id} className="tech-card">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-electric-blue">{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground-light mb-4">{blog.excerpt}</p>
                  <Button variant="outline" asChild>
                    <Link href={blog.link} target="_blank" rel="noopener noreferrer">
                      Read More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </FadeInSection>

      {showVoiceAssistant && <VoiceAssistant />}
    </div>
  )
}
