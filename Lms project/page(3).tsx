import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Cpu, Shield, BotIcon as Robot, Zap, Search, BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground mb-16 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Flamepath Academy</h1>
        <p className="text-xl mb-8">Your Guide to Mastering the Future of Technology</p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/signup">Get Started Now</Link>
        </Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          { title: 'AI', icon: Brain },
          { title: 'Machine Learning', icon: Cpu },
          { title: 'Robotics', icon: Robot },
          { title: 'Cybersecurity', icon: Shield }
        ].map((topic) => (
          <Link key={topic.title} href={`/category/${topic.title.toLowerCase().replace(' ', '-')}`}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <topic.icon className="mr-2" />
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Explore {topic.title} resources.</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Interactive Learning', icon: Zap, description: 'Engage with our interactive courses and hands-on projects.' },
            { title: 'Expert-Led Content', icon: BookOpen, description: 'Learn from industry experts and seasoned professionals.' },
            { title: 'Personalized Experience', icon: Search, description: 'Tailored learning paths to suit your individual needs and goals.' }
          ].map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <feature.icon className="mr-2" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

g" className="bg-primary text-white dark:bg-white dark:text-black">
          <Link href="/signup">Get Started Now</Link>
        </Button>
      </section>
    </div>
  )
}

