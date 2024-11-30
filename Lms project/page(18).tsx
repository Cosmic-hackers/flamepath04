'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useUser } from '@/contexts/UserContext'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Signup() {
 const [name, setName] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [phone, setPhone] = useState('')
 const [college, setCollege] = useState('')
 const [profession, setProfession] = useState('')
 const [resume, setResume] = useState<File | null>(null)
 const [error, setError] = useState('')
 const [isLoading, setIsLoading] = useState(false)
 const router = useRouter()
 const { setUser } = useUser()

 const calculatePasswordStrength = (password: string) => {
   let strength = 0
   if (password.length >= 8) strength += 25
   if (password.match(/[a-z]+/)) strength += 25
   if (password.match(/[A-Z]+/)) strength += 25
   if (password.match(/[0-9]+/)) strength += 25
   return strength
 }

 const passwordStrength = calculatePasswordStrength(password)

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault()
   setError('')
   setIsLoading(true)

   try {
     if (email === 'siddusidharth613@gmail.com' && name === 'admin' && password === 'kepler452b') {
       setUser({ name: 'admin', email: email, phone: phone, role: 'admin' })
       router.push('/admin')
     } else {
       // Simulate API call to create new user
       const newUser = { name, email, phone, college, profession, role: 'user' }
       // In a real app, you'd make an API call here to create the user
       console.log('Creating new user:', newUser)
       
       // Store user in local storage (for demo purposes)
       localStorage.setItem('currentUser', JSON.stringify(newUser))
       
       setUser(newUser)
       router.push('/login')
     }
   } catch (err) {
     setError('An error occurred. Please try again.')
   } finally {
     setIsLoading(false)
   }
 }

 const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
   if (e.target.files && e.target.files[0]) {
     setResume(e.target.files[0])
   }
 }

 return (
   <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
     <Card className="w-full max-w-md">
       <CardHeader>
         <CardTitle>Sign Up</CardTitle>
         <CardDescription>Create your account to access exclusive resources</CardDescription>
       </CardHeader>
       <CardContent>
         <form onSubmit={handleSubmit} className="space-y-4">
           <Input
             placeholder="Name"
             value={name}
             onChange={(e) => setName(e.target.value)}
             required
           />
           <Input
             type="email"
             placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />
           <Input
             type="password"
             placeholder="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />
           <Progress value={passwordStrength} className="mt-2" />
           <p className="text-sm text-gray-500 mt-1">
             Password strength: {passwordStrength <= 25 ? 'Weak' : passwordStrength <= 50 ? 'Medium' : passwordStrength <= 75 ? 'Strong' : 'Very Strong'}
           </p>
           <Input
             type="tel"
             placeholder="Phone Number"
             value={phone}
             onChange={(e) => setPhone(e.target.value)}
             required
           />
           <Input
             placeholder="College"
             value={college}
             onChange={(e) => setCollege(e.target.value)}
             required
           />
           <Select onValueChange={setProfession}>
             <SelectTrigger>
               <SelectValue placeholder="Select profession" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="student">Student</SelectItem>
               <SelectItem value="professional">Professional</SelectItem>
               <SelectItem value="freelancer">Freelancer</SelectItem>
             </SelectContent>
           </Select>
           <Input
             type="file"
             accept=".pdf,.doc,.docx"
             onChange={handleResumeUpload}
           />
           {error && (
             <Alert variant="destructive">
               <AlertDescription>{error}</AlertDescription>
             </Alert>
           )}
           <Button type="submit" className="w-full" disabled={isLoading}>
             {isLoading ? 'Signing up...' : 'Sign Up'}
           </Button>
         </form>
       </CardContent>
     </Card>
   </div>
 )
}

