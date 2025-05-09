'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useUser } from '@/contexts/UserContext'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { setUser } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (email === 'siddusidharth613@gmail.com' && password === 'kepler452b') {
        setUser({ name: 'admin', email: email, phone: '', role: 'admin' })
        onClose()
      } else {
        // Check credentials against stored users
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find((u: any) => u.email === email)

        if (user && user.password === password) {
          setUser(user)
          onClose()
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background-light border-electric-blue">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flame-text">Login</DialogTitle>
          <DialogDescription className="text-center text-foreground-light">
            Enter your credentials to access your account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/30 border-electric-blue text-black dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black dark:text-white">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/30 border-electric-blue text-black dark:text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-black dark:text-white" />
                ) : (
                  <Eye className="h-5 w-5 text-black dark:text-white" />
                )}
              </button>
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full flame-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <div className="text-center text-sm text-black dark:text-white">
            Don't have an account?{' '}
            <Link href="/signup" className="text-electric-blue hover:text-flame-orange transition-colors" onClick={onClose}>
              Sign up
            </Link>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
