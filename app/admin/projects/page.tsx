'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

type Project = {
  id: string
  title: string
  description: string
  technologies: string[]
  category: string
  repoUrl: string
  demoUrl?: string
  resourceUrl?: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  prerequisites: string[]
}

const categories = [
  'AI and Machine Learning',
  'Cybersecurity',
  'Web Development',
  'Mobile Development',
  'IoT',
  'Robotics',
  'Blockchain',
  'Cloud Computing',
  'DevOps',
  'Data Science'
]

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Image Classifier Using CNN',
    description: 'Build a convolutional neural network to classify images into different categories.',
    technologies: ['Python', 'TensorFlow/Keras', 'OpenCV'],
    category: 'AI and Machine Learning',
    repoUrl: 'https://github.com/keras-team/keras-io',
    resourceUrl: 'https://keras.io/examples/vision/image_classification_from_scratch/',
    difficulty: 'Intermediate',
    estimatedTime: '2 weeks',
    prerequisites: ['Basic Python', 'Machine Learning Fundamentals']
  },
  {
    id: '2',
    title: 'Chatbot for E-commerce',
    description: 'Create a chatbot that interacts with users to help them find products.',
    technologies: ['Python', 'Flask', 'NLP libraries'],
    category: 'AI and Machine Learning',
    repoUrl: 'https://github.com/microsoft/BotBuilder-Samples',
    resourceUrl: 'https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-tutorial-basic-deploy?view=azure-bot-service-4.0&tabs=csharp',
    difficulty: 'Intermediate',
    estimatedTime: '3 weeks',
    prerequisites: ['Python', 'Basic NLP concepts']
  },
  {
    id: '3',
    title: 'House Price Prediction Using Regression',
    description: 'Develop a machine learning model to predict house prices based on various features.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    category: 'AI and Machine Learning',
    repoUrl: 'https://github.com/ageron/handson-ml2',
    resourceUrl: 'https://github.com/ageron/handson-ml2/blob/master/02_end_to_end_machine_learning_project.ipynb',
    difficulty: 'Beginner',
    estimatedTime: '1 week',
    prerequisites: ['Basic Python', 'Statistics']
  },
  {
    id: '4',
    title: 'Wi-Fi Deauthenticator',
    description: 'Create a deauthenticator to understand Wi-Fi attacks for educational purposes.',
    technologies: ['Python', 'Scapy'],
    category: 'Cybersecurity',
    repoUrl: 'https://github.com/SpacehuhnTech/esp8266_deauther',
    resourceUrl: 'https://github.com/SpacehuhnTech/esp8266_deauther/wiki',
    difficulty: 'Advanced',
    estimatedTime: '2 weeks',
    prerequisites: ['Networking basics', 'Python']
  },
  {
    id: '5',
    title: 'Smart Home IoT System',
    description: 'Build a smart home system using IoT devices and a central control hub.',
    technologies: ['Raspberry Pi', 'Python', 'MQTT', 'Node-RED'],
    category: 'IoT',
    repoUrl: 'https://github.com/home-assistant/core',
    resourceUrl: 'https://www.home-assistant.io/getting-started/',
    difficulty: 'Intermediate',
    estimatedTime: '4 weeks',
    prerequisites: ['Basic Python', 'IoT concepts']
  },
  {
    id: '6',
    title: 'Arduino-based Weather Station',
    description: 'Create a weather station using Arduino and various sensors to measure temperature, humidity, and pressure.',
    technologies: ['Arduino', 'C++', 'Sensors'],
    category: 'IoT',
    repoUrl: 'https://github.com/mathertel/OneWire',
    resourceUrl: 'https://create.arduino.cc/projecthub/projects/tags/weather',
    difficulty: 'Beginner',
    estimatedTime: '2 weeks',
    prerequisites: ['Basic Arduino programming']
  },
  {
    id: '7',
    title: 'Autonomous Robot Navigation',
    description: 'Develop a robot that can autonomously navigate through an environment using sensors and path planning algorithms.',
    technologies: ['ROS', 'Python', 'C++', 'SLAM'],
    category: 'Robotics',
    repoUrl: 'https://github.com/ros-planning/navigation2',
    resourceUrl: 'https://navigation.ros.org/',
    difficulty: 'Advanced',
    estimatedTime: '6 weeks',
    prerequisites: ['ROS basics', 'Python or C++']
  },
  {
    id: '8',
    title: 'Real-time Operating System (RTOS) for Embedded Systems',
    description: 'Implement a simple RTOS for embedded systems to manage tasks and resources efficiently.',
    technologies: ['C', 'Assembly', 'Microcontrollers'],
    category: 'Embedded Systems',
    repoUrl: 'https://github.com/FreeRTOS/FreeRTOS',
    resourceUrl: 'https://www.freertos.org/Documentation/RTOS_book.html',
    difficulty: 'Advanced',
    estimatedTime: '4 weeks',
    prerequisites: ['C programming', 'Microcontroller basics']
  },
  {
    id: '9',
    title: 'Blockchain-based Voting System',
    description: 'Create a secure and transparent voting system using blockchain technology.',
    technologies: ['Solidity', 'Ethereum', 'Web3.js', 'React'],
    category: 'Blockchain',
    repoUrl: 'https://github.com/ethereum/solidity',
    resourceUrl: 'https://solidity.readthedocs.io/',
    difficulty: 'Intermediate',
    estimatedTime: '5 weeks',
    prerequisites: ['JavaScript', 'Basic blockchain concepts']
  }
]

export default function AdminProjectsPage() {
  const { user } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    technologies: [],
    category: '',
    repoUrl: '',
    demoUrl: '',
    resourceUrl: '',
    difficulty: 'Beginner',
    estimatedTime: '',
    prerequisites: []
  })

  useEffect(() => {
    // Check if user is admin
    if (!user || user.email !== 'siddusidharth613@gmail.com' || user.role !== 'admin') {
      router.push('/')
      return
    }

    const storedProjects = localStorage.getItem('projects')
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects))
    } else {
      // If no projects in localStorage, use the initial projects
      setProjects(initialProjects)
      localStorage.setItem('projects', JSON.stringify(initialProjects))
    }
  }, [user, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProject(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (field: 'technologies' | 'prerequisites', value: string) => {
    setNewProject(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim()).filter(item => item !== '')
    }))
  }

  const handleAddProject = () => {
    const projectWithId = {
      ...newProject,
      id: Date.now().toString()
    }
    const updatedProjects = [...projects, projectWithId]
    setProjects(updatedProjects)
    localStorage.setItem('projects', JSON.stringify(updatedProjects))
    
    // Reset form
    setNewProject({
      title: '',
      description: '',
      technologies: [],
      category: '',
      repoUrl: '',
      demoUrl: '',
      resourceUrl: '',
      difficulty: 'Beginner',
      estimatedTime: '',
      prerequisites: []
    })

    toast({
      title: "Project Added",
      description: "The new project has been successfully added.",
    })
  }

  const handleDeleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id)
    setProjects(updatedProjects)
    localStorage.setItem('projects', JSON.stringify(updatedProjects))
    toast({
      title: "Project Deleted",
      description: "The project has been successfully deleted.",
    })
  }

  if (!user || user.email !== 'siddusidharth613@gmail.com') {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flame-text">Manage Projects</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleAddProject(); }} className="space-y-4">
            <Input
              name="title"
              placeholder="Project Title"
              value={newProject.title}
              onChange={handleInputChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Project Description"
              value={newProject.description}
              onChange={handleInputChange}
              required
            />
            <Input
              name="technologies"
              placeholder="Technologies (comma-separated)"
              value={newProject.technologies.join(', ')}
              onChange={(e) => handleArrayInputChange('technologies', e.target.value)}
              required
            />
            <Select
              value={newProject.category}
              onValueChange={(value) => setNewProject(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              name="repoUrl"
              placeholder="GitHub Repository URL"
              value={newProject.repoUrl}
              onChange={handleInputChange}
              required
            />
            <Input
              name="demoUrl"
              placeholder="Live Demo URL (optional)"
              value={newProject.demoUrl}
              onChange={handleInputChange}
            />
            <Input
              name="resourceUrl"
              placeholder="Additional Resources URL (optional)"
              value={newProject.resourceUrl}
              onChange={handleInputChange}
            />
            <Select
              value={newProject.difficulty}
              onValueChange={(value: 'Beginner' | 'Intermediate' | 'Advanced') => 
                setNewProject(prev => ({ ...prev, difficulty: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="estimatedTime"
              placeholder="Estimated Completion Time (e.g., '2 weeks')"
              value={newProject.estimatedTime}
              onChange={handleInputChange}
              required
            />
            <Input
              name="prerequisites"
              placeholder="Prerequisites (comma-separated)"
              value={newProject.prerequisites.join(', ')}
              onChange={(e) => handleArrayInputChange('prerequisites', e.target.value)}
            />
            <Button type="submit" className="flame-button">Add Project</Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="tech-card">
            <CardHeader>
              <CardTitle className="text-electric-blue">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-foreground-light">{project.description}</p>
              <p className="mb-2 text-flame-orange">Technologies: {project.technologies.join(', ')}</p>
              <p className="mb-2 text-foreground-light">Category: {project.category}</p>
              <p className="mb-2 text-foreground-light">Difficulty: {project.difficulty}</p>
              <p className="mb-4 text-foreground-light">Est. Time: {project.estimatedTime}</p>
              <div className="flex flex-col space-y-2">
                <Button asChild variant="outline">
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">View Repository</a>
                </Button>
                {project.demoUrl && (
                  <Button asChild variant="outline">
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
                  </Button>
                )}
                {project.resourceUrl && (
                  <Button asChild variant="outline">
                    <a href={project.resourceUrl} target="_blank" rel="noopener noreferrer">Additional Resources</a>
                  </Button>
                )}
                <Button variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                  Delete Project
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
