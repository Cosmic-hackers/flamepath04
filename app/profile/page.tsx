'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from "@/components/ui/use-toast"
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'

const defaultAvatars = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7d978d22-126c-42c1-8f02-4b561eb457f4-WVmeuSDHYHsdw2nJ2p0e8SjxuJzniE.jpeg",
    alt: "Student avatar"
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/523b9b25-e0b2-4488-afc2-7e4fcee3014f-6RRWkuoG9AP6A7KcOf329YVTA7tQ41.jpeg",
    alt: "Professional male avatar"
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bd330a53-62fd-477d-8620-f783664c5715-f5cIZD8uKQ5j9Dn5giF5f74Mbw6Net.jpeg",
    alt: "Professional female avatar"
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bfecda8e-8d84-4cf2-aebd-72f03ef5964b-VqS9Rf1v0BJRVfo4jN3EPUITWoEdPp.jpeg",
    alt: "Teacher avatar"
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7b257d9f-dcf5-4b04-9720-c65175865903-gcPnANZ8gxK6BtBNXftLnDZH6vJrcM.jpeg",
    alt: "Student with tablet avatar"
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f9621a8b-15cd-4a1f-948c-b4f8c37bc59e-SZAKafHzwexFZasMjbiOUJEI4F2o7S.jpeg",
    alt: "Business male avatar"
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ecfd2b67-287e-487a-a78b-1db8a1a483b4-YSTKQUIlwX8bOnZ52JWMHVxBURRIOQ.jpeg",
    alt: "Librarian avatar"
  }
];

type UserProfile = {
  id: string;
  name: string;
  fullName: string;
  email: string;
  phone: string;
  college?: string;
  education?: string;
  profession?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  avatar?: string;
  interestedCourses?: string[];
  resume?: string;
  educationalDetails?: string;
  course?: string;
  company?: string;
  position?: string;
  expertCourses?: string[];
  teachingCourses?: string[];
  organization?: string;
  specialUser?: boolean;
  badges?: {courseId: string; badgeUrl: string; earnedAt: string}[]
}

export default function Profile() {
  const { user, setUser } = useUser()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    id: '',
    name: '',
    fullName: '',
    email: '',
    phone: '',
    college: '',
    education: '',
    profession: '',
    linkedinUrl: '',
    portfolioUrl: '',
    avatar: '',
    interestedCourses: [],
    resume: '',
    educationalDetails: '',
    course: '',
    company: '',
    position: '',
    expertCourses: [],
    teachingCourses: [],
    organization: '',
    specialUser: false,
    badges: []
  })
  const [showAvatarDialog, setShowAvatarDialog] = useState(false)
  const [profession, setProfession] = useState('')
  const [educationalDetails, setEducationalDetails] = useState('')
  const [course, setCourse] = useState('')
  const [interestedCourses, setInterestedCourses] = useState<string[]>([])
  const [resume, setResume] = useState<string | null>(null)
  const [portfolioUrl, setPortfolioUrl] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [expertCourses, setExpertCourses] = useState<string[]>([])
  const [teachingCourses, setTeachingCourses] = useState<string[]>([])
  const [organization, setOrganization] = useState('')

  useEffect(() => {
    if (user) {
      setProfile({
        id: user.id || '',
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        profession: user.profession || '',
        educationalDetails: user.educationalDetails || '',
        course: user.course || '',
        interestedCourses: user.interestedCourses || [],
        resume: user.resume || null,
        portfolioUrl: user.portfolioUrl || '',
        company: user.company || '',
        position: user.position || '',
        expertCourses: user.expertCourses || [],
        teachingCourses: user.teachingCourses || [],
        organization: user.organization || '',
        avatar: user.avatar || '',
        specialUser: user.specialUser || false,
        badges: user.badges || [] // Make sure badges are loaded from the user object
      })
      setProfession(user.profession || '')
      setEducationalDetails(user.educationalDetails || '')
      setCourse(user.course || '')
      setInterestedCourses(user.interestedCourses || [])
      setResume(user.resume || null)
      setPortfolioUrl(user.portfolioUrl || '')
      setCompany(user.company || '')
      setPosition(user.position || '')
      setExpertCourses(user.expertCourses || [])
      setTeachingCourses(user.teachingCourses || [])
      setOrganization(user.organization || '')
    }
  }, [user])

  const handleSave = () => {
    // Update user in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map((u: any) => 
      u.email === profile.email ? { 
        ...u, 
        ...profile,
        profession,
        educationalDetails,
        course,
        interestedCourses,
        resume,
        portfolioUrl,
        company,
        position,
        expertCourses,
        teachingCourses,
        organization,
        specialUser: user.specialUser
      } : u
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    // Update current user context
    setUser({
      ...profile,
      profession,
      educationalDetails,
      course,
      interestedCourses,
      resume,
      portfolioUrl,
      company,
      position,
      expertCourses,
      teachingCourses,
      organization,
      specialUser: user.specialUser
    })
    setIsEditing(false)

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleAvatarSelect = (avatarUrl: string) => {
    setProfile(prev => ({ ...prev, avatar: avatarUrl }))
    setShowAvatarDialog(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Your Profile</span>
            <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src={profile.avatar || defaultAvatars[0].url}
                alt="Profile Avatar"
                width={100}
                height={100}
                className="rounded-full"
              />
              {isEditing && (
                <div className="mt-2 space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAvatarDialog(true)}
                  >
                    Choose Avatar
                  </Button>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="max-w-[200px]"
                  />
                </div>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    placeholder="Full Name"
                  />
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Username"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{profile.fullName}</h2>
                  <p className="text-muted-foreground">@{profile.name}</p>
                  {user.specialUser && (
                    <span className="ml-2 inline-block bg-flame-orange text-white px-2 py-1 rounded-full text-sm">
                      Special User
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={profile.email} disabled />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={profile.phone}
                onChange={(e) => isEditing && setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label>Profession</Label>
              <Select value={profession} onValueChange={setProfession} disabled={!isEditing}>
                <SelectTrigger>
                  <SelectValue placeholder="Select profession" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="working-professional">Working Professional</SelectItem>
                  <SelectItem value="educator">Educator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {profession === 'student' && (
              <>
                <div className="space-y-2">
                  <Label>Educational Details</Label>
                  <Input
                    placeholder="Educational Details"
                    value={educationalDetails}
                    onChange={(e) => setEducationalDetails(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current Course</Label>
                  <Input
                    placeholder="Current Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </>
            )}

            {(profession === 'student' || profession === 'freelancer' || profession === 'working-professional' || profession === 'educator') && (
              <div className="space-y-2">
                <Label>Interested Courses</Label>
                <Textarea
                  placeholder="Interested Courses (comma-separated)"
                  value={interestedCourses.join(', ')}
                  onChange={(e) => setInterestedCourses(e.target.value.split(',').map(s => s.trim()))}
                  disabled={!isEditing}
                />
              </div>
            )}

            {(profession === 'freelancer' || profession === 'working-professional' || profession === 'educator') && (
              <div className="space-y-2">
                <Label>Resume</Label>
                {isEditing ? (
                  <Input
                    type="file"
                    onChange={(e) => setResume(e.target.files ? e.target.files[0].name : null)}
                  />
                ) : (
                  <p>Resume: {resume || 'Not uploaded'}</p>
                )}
              </div>
            )}

            {profession === 'freelancer' && (
              <div className="space-y-2">
                <Label>Portfolio URL</Label>
                <Input
                  placeholder="Portfolio URL"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            )}

            {profession === 'working-professional' && (
              <>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </>
            )}

            {profession === 'educator' && (
              <>
                <div className="space-y-2">
                  <Label>Expert Courses</Label>
                  <Textarea
                    placeholder="Expert Courses (comma-separated)"
                    value={expertCourses.join(', ')}
                    onChange={(e) => setExpertCourses(e.target.value.split(',').map(s => s.trim()))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Courses You Teach</Label>
                  <Textarea
                    placeholder="Courses You Teach (comma-separated)"
                    value={teachingCourses.join(', ')}
                    onChange={(e) => setTeachingCourses(e.target.value.split(',').map(s => s.trim()))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label>College/Organization/School</Label>
                  <Input
                    placeholder="College/Organization/School"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-electric-blue">Earned Badges</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.badges?.map((badge, index) => (
                <motion.div
                  key={badge.courseId}
                  className="relative aspect-square"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Image
                    src={badge.badgeUrl || "/placeholder.svg"}
                    alt={`Badge for ${badge.courseId}`}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 text-center text-sm p-2 bg-black/50 text-white">
                    {new Date(badge.earnedAt).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* <div className="space-y-2">
            <Label>Interested Courses</Label>
            <Textarea
              value={profile.interestedCourses?.join(', ')}
              onChange={(e) => isEditing && setProfile({ 
                ...profile, 
                interestedCourses: e.target.value.split(',').map(s => s.trim()) 
              })}
              disabled={!isEditing}
              placeholder="Enter your interests (comma separated)"
            />
          </div> */}
        </CardContent>
      </Card>

      <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Choose Your Avatar</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 p-4">
            {defaultAvatars.map((avatar, index) => (
              <div
                key={index}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleAvatarSelect(avatar.url)}
              >
                <Image
                  src={avatar.url || "/placeholder.svg"}
                  alt={avatar.alt}
                  width={150}
                  height={150}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
