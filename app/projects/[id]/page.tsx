'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Project = {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  articleUrl: string
  repoUrl: string
  longDescription: string
  requirements: string[]
  steps: string[]
  resources: { title: string; url: string }[]
}

const projects: Project[] = [
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot',
    description: 'Build a conversational AI chatbot using natural language processing.',
    difficulty: 'Intermediate',
    category: 'AI',
    articleUrl: '/articles/ai-chatbot',
    repoUrl: 'https://github.com/flamepath-academy/ai-chatbot',
    longDescription: 'In this project, you will create an AI-powered chatbot that can engage in human-like conversations. You\'ll use natural language processing techniques to understand user input and generate appropriate responses. This project will give you hands-on experience with NLP libraries, machine learning models, and conversational AI design.',
    requirements: [
      'Python programming skills',
      'Basic understanding of machine learning concepts',
      'Familiarity with NLP libraries like NLTK or spaCy',
      'Knowledge of neural networks and deep learning (preferred)',
    ],
    steps: [
      'Set up a Python environment and install necessary libraries',
      'Preprocess and tokenize input text',
      'Implement intent recognition using machine learning',
      'Develop a response generation system using neural networks',
      'Create a user interface for chatbot interaction',
      'Train and fine-tune the chatbot on a dataset',
      'Implement continuous learning capabilities',
      'Deploy the chatbot to a web application or messaging platform',
    ],
    resources: [
      { title: 'Introduction to NLP', url: 'https://www.example.com/intro-to-nlp' },
      { title: 'Chatbot Development Tutorial', url: 'https://www.example.com/chatbot-tutorial' },
      { title: 'Neural Conversation Models', url: 'https://www.example.com/neural-conversation-models' },
    ],
  },
  // ... Add other projects here
]

export default function ProjectPage() {
  const { id } = useParams()
  const { user } = useUser()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const foundProject = projects.find(p => p.id === id)
    setProject(foundProject || null)
  }, [id])

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  if (!project) {
    return <div className="container mx-auto px-4 py-16">Project not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold text-electric-blue mb-2">{project.title}</CardTitle>
              <Badge variant="outline" className="text-flame-orange">{project.category}</Badge>
            </div>
            <Badge variant="secondary" className="text-lg">
              {project.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-foreground-light">{project.description}</p>
          
          <div>
            <h3 className="text-xl font-semibold text-electric-blue mb-2">Project Overview</h3>
            <p className="text-foreground-light">{project.longDescription}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-electric-blue mb-2">Requirements</h3>
            <ul className="list-disc list-inside text-foreground-light">
              {project.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-electric-blue mb-2">Project Steps</h3>
            <ol className="list-decimal list-inside text-foreground-light">
              {project.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-electric-blue mb-2">Resources</h3>
            <ul className="list-disc list-inside text-foreground-light">
              {project.resources.map((resource, index) => (
                <li key={index}>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:underline">
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-2">
            <Button asChild className="w-full flame-button">
              <Link href={project.articleUrl}>Read Full Article</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">View Project Repository</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
