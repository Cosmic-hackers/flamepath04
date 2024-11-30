'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useUser } from '@/contexts/UserContext'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false)
  const router = useRouter()
  const { setUser } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (email === 'siddusidharth613@gmail.com' && password === 'kepler452b') {
        setUser({ name: 'admin', email: email, phone: '', role: 'admin' })
        router.push('/admin')
      } else {
        // Simulate checking credentials (in a real app, this would be an API call)
        const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
        if (storedUser.email === email) {
          // In a real app, you'd verify the password here
          setUser(storedUser)
          router.push('/user-dashboard') // Updated line
        } else {
          setError('Invalid email or password')
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotPasswordSubmitted(true)
    // In a real application, you would send an API request here to initiate the password reset process
    console.log(`Password reset requested for email: ${forgotPasswordEmail}`)
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="p-0">Forgot password?</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset Password</DialogTitle>
                  <DialogDescription>
                    Enter your email address and we'll send you an OTP to reset your password.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full">
                    Send OTP
                  </Button>
                </form>
                {forgotPasswordSubmitted && (
                  <Alert className="mt-4">
                    <AlertDescription>
                      If an account exists for {forgotPasswordEmail}, an OTP has been sent. If you don't receive the OTP, please try again after 3 hours.
                    </AlertDescription>
                  </Alert>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

