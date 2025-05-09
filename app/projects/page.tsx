'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Project = {
  id: string
  title: string
  description: string
  technologies: string[]
  category: string
  repoUrl: string
  resourceUrl?: string
}

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Image Classifier Using CNN',
    description: 'Build a convolutional neural network to classify images into different categories.',
    technologies: ['Python', 'TensorFlow/Keras', 'OpenCV'],
    category: 'AI and Machine Learning',
    repoUrl: 'https://github.com/keras-team/keras-io',
    resourceUrl: 'https://keras.io/examples/vision/image_classification_from_scratch/'
  },
  {
    id: '2',
    title: 'Chatbot for E-commerce',
    description: 'Create a chatbot that interacts with users to help them find products.',
    technologies: ['Python', 'Flask', 'NLP libraries'],
    category: 'AI and Machine Learning',
    repoUrl: 'https://github.com/microsoft/BotBuilder-Samples',
    resourceUrl: 'https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-tutorial-basic-deploy?view=azure-bot-service-4.0&tabs=csharp'
  },
  {
    id: '3',
    title: 'House Price Prediction Using Regression',
    description: 'Develop a machine learning model to predict house prices based on various features.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    category: 'AI and Machine Learning',
    repoUrl: 'https://github.com/ageron/handson-ml2',
    resourceUrl: 'https://github.com/ageron/handson-ml2/blob/master/02_end_to_end_machine_learning_project.ipynb'
  },
  {
    id: '4',
    title: 'Wi-Fi Deauthenticator',
    description: 'Create a deauthenticator to understand Wi-Fi attacks for educational purposes.',
    technologies: ['Python', 'Scapy'],
    category: 'Cybersecurity',
    repoUrl: 'https://github.com/SpacehuhnTech/esp8266_deauther',
    resourceUrl: 'https://github.com/SpacehuhnTech/esp8266_deauther/wiki'
  },
  {
    id: '5',
    title: 'Smart Home IoT System',
    description: 'Build a smart home system using IoT devices and a central control hub.',
    technologies: ['Raspberry Pi', 'Python', 'MQTT', 'Node-RED'],
    category: 'IoT',
    repoUrl: 'https://github.com/home-assistant/core',
    resourceUrl: 'https://www.home-assistant.io/getting-started/'
  },
  {
    id: '6',
    title: 'Arduino-based Weather Station',
    description: 'Create a weather station using Arduino and various sensors to measure temperature, humidity, and pressure.',
    technologies: ['Arduino', 'C++', 'Sensors'],
    category: 'Arduino',
    repoUrl: 'https://github.com/mathertel/OneWire',
    resourceUrl: 'https://create.arduino.cc/projecthub/projects/tags/weather'
  },
  {
    id: '7',
    title: 'Autonomous Robot Navigation',
    description: 'Develop a robot that can autonomously navigate through an environment using sensors and path planning algorithms.',
    technologies: ['ROS', 'Python', 'C++', 'SLAM'],
    category: 'Robotics',
    repoUrl: 'https://github.com/ros-planning/navigation2',
    resourceUrl: 'https://navigation.ros.org/'
  },
  {
    id: '8',
    title: 'Real-time Operating System (RTOS) for Embedded Systems',
    description: 'Implement a simple RTOS for embedded systems to manage tasks and resources efficiently.',
    technologies: ['C', 'Assembly', 'Microcontrollers'],
    category: 'Embedded Systems',
    repoUrl: 'https://github.com/FreeRTOS/FreeRTOS',
    resourceUrl: 'https://www.freertos.org/Documentation/RTOS_book.html'
  },
  {
    id: '9',
    title: 'Blockchain-based Voting System',
    description: 'Create a secure and transparent voting system using blockchain technology.',
    technologies: ['Solidity', 'Ethereum', 'Web3.js', 'React'],
    category: 'Programming',
    repoUrl: 'https://github.com/ethereum/solidity',
    resourceUrl: 'https://solidity.readthedocs.io/'
  }
]

export default function ProjectsPage() {
  const { user } = useUser()
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects')
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects))
    } else {
      localStorage.setItem('projects', JSON.stringify(initialProjects))
    }
  }, [])

  const categories = Array.from(new Set(projects.map(project => project.category)))

  const filteredProjects = selectedCategory
    ? projects.filter(project => project.category === selectedCategory)
    : projects

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flame-text">Projects Hub</h1>
      {user?.role === 'admin' && (
        <Button asChild className="mb-4 flame-button">
          <Link href="/admin/projects">Manage Projects</Link>
        </Button>
      )}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          onClick={() => setSelectedCategory(null)}
          variant={selectedCategory === null ? "default" : "outline"}
          className="flame-button"
        >
          All
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            className="flame-button"
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="tech-card">
            <CardHeader>
              <CardTitle className="text-electric-blue">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-foreground-light">{project.description}</p>
              <p className="mb-2 text-flame-orange">Technologies: {project.technologies.join(', ')}</p>
              <p className="mb-4 text-foreground-light">Category: {project.category}</p>
              <div className="flex flex-col space-y-2">
                <Button asChild variant="outline">
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">View Repository</a>
                </Button>
                {project.resourceUrl && (
                  <Button asChild variant="outline">
                    <a href={project.resourceUrl} target="_blank" rel="noopener noreferrer">View Resource</a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
