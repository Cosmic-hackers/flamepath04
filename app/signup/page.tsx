"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/UserContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import countryCodes from "@/data/country-codes.json"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { registerUser, signInWithGoogle } from "@/services/auth-service"
import { nanoid } from "nanoid"

export default function Signup() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [countryCode, setCountryCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [profession, setProfession] = useState("")
  const [educationalDetails, setEducationalDetails] = useState("")
  const [course, setCourse] = useState("")
  const [interestedCourses, setInterestedCourses] = useState<string[]>([])
  const [resume, setResume] = useState<File | null>(null)
  const [portfolioUrl, setPortfolioUrl] = useState("")
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [expertCourses, setExpertCourses] = useState<string[]>([])
  const [teachingCourses, setTeachingCourses] = useState<string[]>([])
  const [organization, setOrganization] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const router = useRouter()
  const { setUser } = useUser()

  useEffect(() => {
    // Check if there's a referral code in the URL
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("ref")
    if (code) {
      setReferralCode(code)
    }
  }, [])

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/\d/)) strength++
    if (password.match(/[^a-zA-Z\d]/)) strength++
    setPasswordStrength(strength)
  }

  const getPasswordStrengthColor = (strength: number) => {
    if (strength === 0) return "bg-red-500 w-full h-2"
    if (strength === 1) return "bg-yellow-500 w-full h-2"
    if (strength >= 2) return "bg-green-500 w-full h-2"
    return "bg-gray-300 w-full h-2"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (phoneNumber.length !== 10) {
      setError("Phone number must be exactly 10 digits")
      setIsLoading(false)
      return
    }

    try {
      const userProfile = {
        fullName,
        email,
        phone: `${countryCode}${phoneNumber}`,
        role: "user",
        profession,
        educationalDetails,
        course,
        interestedCourses,
        portfolioUrl,
        company,
        position,
        expertCourses,
        teachingCourses,
        organization,
        blazecredits: {
          earned: 0,
          redeemed: 0,
          remaining: 0,
        },
        referrals: [],
        referralCode: `${Date.now().toString(36)}${nanoid(8)}`.toUpperCase(),
      }

      await registerUser({ email, password }, userProfile)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "An error occurred during registration. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setError("")
    setIsLoading(true)

    try {
      await signInWithGoogle()
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Google sign up error:", error)
      setError(error.message || "Failed to sign up with Google.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center py-12 relative"
      style={{
        backgroundImage:
          "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leonardo_Phoenix_09_A_majestic_torch_with_a_vibrant_orangeyell_1.jpg-iGxTp5gleMJHc7EgsJEw9MQX7PESg9.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Add a semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl px-4 relative z-10"
      >
        <Card className="w-full tech-card bg-background/80 backdrop-blur-md border-electric-blue p-8 relative overflow-hidden">
          <CardHeader className="relative z-10">
            <CardTitle className="text-3xl font-bold text-center text-white">Sign Up</CardTitle>
            <CardDescription className="text-center text-gray-200">
              Create your account to access exclusive resources
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                disabled={isLoading}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                disabled={isLoading}
              />
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Set Password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    checkPasswordStrength(e.target.value)
                  }}
                  required
                  className="bg-background/50 border-electric-blue text-white placeholder-gray-400 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-white" /> : <Eye className="h-5 w-5 text-white" />}
                </button>
              </div>
              <Progress value={passwordStrength * 25} className={getPasswordStrengthColor(passwordStrength)} />
              <Select value={profession} onValueChange={setProfession} disabled={isLoading}>
                <SelectTrigger className="bg-background/50 border-electric-blue text-white placeholder-gray-400">
                  <SelectValue placeholder="Select profession" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="working-professional">Working Professional</SelectItem>
                  <SelectItem value="educator">Educator</SelectItem>
                </SelectContent>
              </Select>

              {profession === "student" && (
                <>
                  <Input
                    placeholder="Educational Details"
                    value={educationalDetails}
                    onChange={(e) => setEducationalDetails(e.target.value)}
                    className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <Input
                    placeholder="Current Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                    disabled={isLoading}
                  />
                </>
              )}

              {(profession === "student" ||
                profession === "freelancer" ||
                profession === "working-professional" ||
                profession === "educator") && (
                <Textarea
                  placeholder="Interested Courses (comma-separated)"
                  value={interestedCourses.join(", ")}
                  onChange={(e) => setInterestedCourses(e.target.value.split(",").map((s) => s.trim()))}
                  className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                  disabled={isLoading}
                />
              )}

              {(profession === "freelancer" || profession === "working-professional" || profession === "educator") && (
                <Input
                  type="file"
                  onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
                  className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                  disabled={isLoading}
                />
              )}

              {profession === "freelancer" && (
                <Input
                  placeholder="Portfolio URL"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                  disabled={isLoading}
                />
              )}

              {profession === "working-professional" && (
                <>
                  <Input
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <Input
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                    disabled={isLoading}
                  />
                </>
              )}

              {profession === "educator" && (
                <>
                  <Textarea
                    placeholder="Expert Courses (comma-separated)"
                    value={expertCourses.join(", ")}
                    onChange={(e) => setExpertCourses(e.target.value.split(",").map((s) => s.trim()))}
                    className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <Textarea
                    placeholder="Courses You Teach (comma-separated)"
                    value={teachingCourses.join(", ")}
                    onChange={(e) => setTeachingCourses(e.target.value.split(",").map((s) => s.trim()))}
                    className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <Input
                    placeholder="College/Organization/School"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                    disabled={isLoading}
                  />
                </>
              )}

              <div className="flex space-x-2">
                <Select value={countryCode} onValueChange={setCountryCode} disabled={isLoading}>
                  <SelectTrigger className="bg-background/50 border-electric-blue text-white placeholder-gray-400 w-[180px]">
                    <SelectValue placeholder="Country Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.id} value={country.code}>
                        {country.name} ({country.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  required
                  className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                  disabled={isLoading}
                />
              </div>

              <Input
                placeholder="Referral Code (optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="bg-background/50 border-electric-blue text-white placeholder-gray-400"
                disabled={isLoading}
              />

              {referralCode === "cosmoss452b" && (
                <div className="text-center">
                  <span className="inline-block bg-flame-orange text-white px-2 py-1 rounded-full text-sm">
                    Special User
                  </span>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="mt-4">
                <p className="text-center text-sm text-gray-200 mb-2">Or sign up with:</p>
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    className="bg-background/50 border-electric-blue text-white hover:bg-background/70"
                    onClick={handleGoogleSignUp}
                    disabled={isLoading}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full flame-button text-lg py-6 text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
