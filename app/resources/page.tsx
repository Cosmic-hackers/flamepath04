"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/components/ui/use-toast"
import ResourceImageCarousel from "@/components/ResourceImageCarousel"

type Resource = {
  id: string
  title: string
  description: string
  type: string
  originalPrice: number
  discountPercentage: number
  price: number
  isPaid: boolean
  images: string[]
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem("resources") || "[]")

    // Add Antivirus resource if it doesn't exist
    const antivirusExists = storedResources.some((r: Resource) => r.title === "Antivirus Hacker's Handbook")
    if (!antivirusExists) {
      const antivirusResource = {
        id: "antivirus-handbook",
        title: "Antivirus Hacker's Handbook",
        description: `### **Antivirus Hacker's Handbook**

**Introduction (xix)**
Step into the world of antivirus software with this detailed guide that unravels its intricate mechanisms, exposes evasion tactics, and explores future possibilities.

**Chapter 1: Introduction to Antivirus Software (1)**
- Explore the evolution of antivirus technology
- Understand core functionalities and limitations
- Discover various types of malware and their detection methods

**Chapter 2: Reverse Engineering Antivirus Software (37)**
- Learn techniques to analyze antivirus engines
- Understand file format parsers and heuristic engines
- Explore emulators and sandboxes used in antivirus solutions

**Chapter 3: The Plug-ins System (69)**
- Dive into antivirus software architectures
- Understand plug-in systems and their vulnerabilities
- Learn to create custom plug-ins for testing and analysis

**Chapter 4: Understanding Antivirus Signatures (101)**
- Master the art of creating and analyzing virus signatures
- Explore different types of signatures: static, dynamic, and heuristic
- Learn techniques to generate and test signatures

**Chapter 5: The Update System (133)**
- Understand how antivirus software stays current
- Explore update mechanisms and their potential vulnerabilities
- Learn to analyze update packages and protocols

**Chapter 6: Antivirus Software Evasion (167)**
- Discover techniques used by malware to evade detection
- Learn about polymorphic and metamorphic malware
- Understand packers, crypters, and other evasion tools

**Chapter 7: Antivirus Software Exploitation (201)**
- Explore vulnerabilities in antivirus software
- Learn about privilege escalation and remote code execution
- Understand the implications of antivirus exploits

**Chapter 8: Antivirus Software Testing (235)**
- Master methodologies for thorough antivirus testing
- Learn to create custom malware samples for testing
- Understand false positive and false negative scenarios

**Chapter 9: Antivirus Software Analysis (269)**
- Dive into static and dynamic analysis techniques
- Learn to use debugging and reverse engineering tools
- Explore case studies of real-world antivirus software

**Chapter 10: The Future of Antivirus (301)**
- Explore emerging trends in antivirus technology
- Understand the role of AI and machine learning in malware detection
- Discover potential future challenges and solutions in cybersecurity`,
        type: "ebook",
        isPaid: true,
        originalPrice: 39,
        discountPercentage: 0,
        price: 39,
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-23-18-15-13-52_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-4I134mKKbZ5WDBa71Ipr4u3N3Wa7hQ.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-23-18-14-38-15_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-A8ZXoQ9gaQqXVcTfkYzTVZ27o63A9M.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-23-18-13-33-63_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-j7fYGhnAbqWu8zOsp8Pnzo7trbj5Xj.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-23-18-13-46-14_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-yg6XKX5a7vVnWf58pqoSquD4eEl8lA.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-23-18-15-23-71_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-iAHXn6Sj9MRmERrjapVxQyfJzvSKkl.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-23-18-14-12-62_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-y8iy33r8Rwr7pAimVNf7NJPUOJlgJE.jpeg",
        ],
      }
      storedResources.push(antivirusResource)
    }

    // Add Amazon Security Reference Architecture resource if it doesn't exist
    const awsSraExists = storedResources.some(
      (r: Resource) => r.title === "Amazon Security Reference Architecture (AWS SRA)",
    )
    if (!awsSraExists) {
      const awsSraResource = {
        id: "aws-sra",
        title: "Amazon Security Reference Architecture (AWS SRA)",
        description: `### **Amazon Security Reference Architecture (AWS SRA): Comprehensive Guide**

**Introduction (Pages 1-13)**
- Overview of AWS SRA and its purpose in securing cloud workloads
- Value proposition and implementation guidelines
- Security design principles and AWS CAF integration

**SRA Building Blocks (Pages 14-94)**
- **AWS Organizations & Account Structure**
  - Account structures and service control policies (SCPs)
  - Management of security at scale
  - Organization-wide services implementation

- **Security Services Integration**
  - IAM and AWS Systems Manager deployment
  - Network infrastructure components
  - Architecture components and interdependencies

**Core Security Services (Pages 35-104)**
- **Organization Management**
  - SCPs and IAM Identity Center
  - AWS CloudTrail configuration
  - Amazon GuardDuty implementation
  - AWS Config setup

- **Security Tooling & Logging**
  - Centralized logging with Amazon S3
  - Amazon Security Lake integration
  - Network infrastructure security
  - Edge services deployment

**Advanced Security Services (Pages 96-107)**
- **Application Security**
  - VPC configuration and endpoints
  - Compute resources management
  - AWS Secrets Manager implementation

- **Defense Strategies**
  - Multi-layered security approach
  - Threat detection and response
  - Compliance monitoring

**Architecture Deep Dive (Pages 109-179)**
- **Security Components**
  - Perimeter security implementation
  - Cyber forensics tools integration
  - Identity management systems
  - AI/ML security applications

**AI/ML Integration (Pages 203-216)**
- **Intelligent Security**
  - Amazon Bedrock integration
  - Machine learning for security
  - Provable security implementation

**Implementation Guide (Pages 211-216)**
1. Build OU and account structure
2. Implement identity foundation
3. Setup logging and monitoring
4. Apply security layers
5. Protect data in transit and at rest
6. Prepare for security incidents

**Additional Resources (Pages 219-231)**
- Detailed IAM documentation
- Code samples and examples
- AWS Privacy Reference Architecture
- Implementation guidelines

This comprehensive guide is essential for organizations looking to implement robust security measures in their AWS environments. It provides detailed frameworks, best practices, and step-by-step instructions for establishing and maintaining a secure, scalable infrastructure.`,
        type: "document",
        isPaid: false,
        originalPrice: 0,
        discountPercentage: 0,
        price: 0,
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-24-17-25-14-18_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-1MATDNO6d95R0lTWSoLACqWzdW4kox.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-24-17-26-03-49_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-3CQLVgkSqiH1JbrPWpXvcnpkDwJPhx.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-24-17-28-05-48_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-Ha89VMeQnfwvVlL2Va1ztczBA9CieS.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-24-17-27-20-29_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-1P5pTgW50OK3TuCAWIEfO3Bg1hlZ5j.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-24-17-28-24-76_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-C1ZP5br7879e0TuDNSNgke68kO5n8i.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-24-17-29-22-31_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-3PGpcNPGgLkx77UzG2Orwhs7ngbdNj.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-24-17-23-28-52_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-IpiG6JyrdpZn27J4ATvff3V5wHkMIR.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-12-24-17-24-09-29_e2d5b3f32b79de1d45acd1fad96fbb0f.jpg-ZxmbfHv6sT3AzTaGGhGB2k5ehX1DDy.jpeg",
        ],
      }
      storedResources.push(awsSraResource)
    }

    localStorage.setItem("resources", JSON.stringify(storedResources))
    setResources(storedResources)
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 flame-text text-center">Tech Resources</h1>
      {resources.length === 0 ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>No Resources Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground-light">There are currently no resources available.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <Card key={resource.id} className="tech-card">
              <CardHeader>
                <CardTitle className="text-electric-blue">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-foreground-light">
                  {resource.description.split("\n")[0].replace(/[*#]/g, "").trim()}
                </p>
                {resource.isPaid && (
                  <p className="mb-4">
                    <span className="line-through text-gray-500 mr-2">₹{resource.originalPrice.toFixed(2)}</span>
                    <span className="font-bold">₹{resource.price.toFixed(2)}</span>{" "}
                    <span className="text-green-500">({resource.discountPercentage}% off)</span>
                  </p>
                )}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-foreground-light">Type: {resource.type}</p>
                  {!resource.isPaid && <span className="text-flame-orange font-bold">Free</span>}
                </div>
                <div className="relative w-full aspect-video mb-4">
                  <ResourceImageCarousel images={resource.images} />
                </div>
                <Button asChild className="w-full flame-button">
                  <Link href={`/resource/${resource.id}`}>View Resource</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
