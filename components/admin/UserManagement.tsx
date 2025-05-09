"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import {
  getAllUsers,
  getAllResources,
  getAllCourses,
  grantResourceAccess,
  grantCourseAccess,
} from "@/services/data-service"
import { Loader2 } from "lucide-react"

type User = {
  id: string
  fullName: string
  email: string
  phone: string
  role: string
  createdAt: string
  cartedCourses: string[]
  purchasedCourses: string[]
  enrolledCourses?: string[]
  accessibleResources?: string[]
  accessibleCourses?: string[]
  notifications?: { type: string; resourceId: string; read: boolean }[]
  blazecredits: {
    earned: number
    redeemed: number
    remaining: number
  }
  referrals: { type: string; name: string }[]
}

type Course = {
  id: string
  title: string
  price: number
  isPaid: boolean
}

type Resource = {
  id: string
  title: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch data from Firebase
        const [usersData, resourcesData, coursesData] = await Promise.all([
          getAllUsers(),
          getAllResources(),
          getAllCourses(),
        ])

        setUsers(usersData as User[])
        setResources(resourcesData as Resource[])
        setCourses(coursesData as Course[])
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load data. Please try again.",
          variant: "destructive",
        })

        // Fallback to localStorage
        try {
          const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
          const storedResources = JSON.parse(localStorage.getItem("resources") || "[]")
          const storedCourses = JSON.parse(localStorage.getItem("courses") || "[]")

          setUsers(storedUsers)
          setResources(storedResources)
          setCourses(storedCourses)
        } catch (localError) {
          console.error("Error loading from localStorage:", localError)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const filteredUsers = users.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false,
  )

  const handleAllowAccess = async (userId: string, resourceId: string) => {
    try {
      await grantResourceAccess(userId, resourceId)

      // Update local state
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            accessibleResources: [...(user.accessibleResources || []), resourceId],
            notifications: [...(user.notifications || []), { type: "new_resource_access", resourceId, read: false }],
          }
        }
        return user
      })
      setUsers(updatedUsers)
      setSelectedUser(updatedUsers.find((u) => u.id === userId) || null)

      toast({
        title: "Access Granted",
        description: `Resource access has been granted to the user.`,
      })
    } catch (error) {
      console.error("Error granting resource access:", error)
      toast({
        title: "Error",
        description: "Failed to grant resource access. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAllowCourseAccess = async (userId: string, courseId: string) => {
    try {
      await grantCourseAccess(userId, courseId)

      // Update local state
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            accessibleCourses: [...(user.accessibleCourses || []), courseId],
            purchasedCourses: (user.purchasedCourses || []).filter((id) => id !== courseId),
          }
        }
        return user
      })
      setUsers(updatedUsers)
      setSelectedUser(updatedUsers.find((u) => u.id === userId) || null)

      toast({
        title: "Access Granted",
        description: `Course access has been granted to the user.`,
      })
    } catch (error) {
      console.error("Error granting course access:", error)
      toast({
        title: "Error",
        description: "Failed to grant course access. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-electric-blue" />
        <span className="ml-2">Loading user data...</span>
      </div>
    )
  }

  return (
    <div>
      <Input
        type="search"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.fullName ?? "N/A"}</TableCell>
              <TableCell>{user.email ?? "N/A"}</TableCell>
              <TableCell>{user.phone ?? "N/A"}</TableCell>
              <TableCell>{user.role ?? "N/A"}</TableCell>
              <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedUser(user)}>
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>User Details: {user.fullName}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[80vh]">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">Personal Information</h3>
                          <p>
                            <strong>Email:</strong> {user.email ?? "N/A"}
                          </p>
                          <p>
                            <strong>Phone:</strong> {user.phone ?? "N/A"}
                          </p>
                          <p>
                            <strong>Role:</strong> {user.role ?? "N/A"}
                          </p>
                          <p>
                            <strong>Created At:</strong>{" "}
                            {user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Carted Courses</h3>
                          {user.cartedCourses && user.cartedCourses.length > 0 ? (
                            <ul className="list-disc list-inside">
                              {user.cartedCourses.map((courseId) => {
                                const course = courses.find((c) => c.id === courseId)
                                return course ? (
                                  <li key={courseId}>
                                    {course.title} - ₹{course.price}
                                  </li>
                                ) : null
                              })}
                            </ul>
                          ) : (
                            <p>No courses in cart</p>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Purchased Courses</h3>
                          {user.purchasedCourses && user.purchasedCourses.length > 0 ? (
                            <ul className="list-disc list-inside">
                              {user.purchasedCourses.map((courseId) => {
                                const course = courses.find((c) => c.id === courseId)
                                return course ? <li key={courseId}>{course.title}</li> : null
                              })}
                            </ul>
                          ) : (
                            <p>No purchased courses</p>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Enrolled Courses</h3>
                          {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
                            <ul className="list-disc list-inside">
                              {user.enrolledCourses.map((courseId) => {
                                const course = courses.find((c) => c.id === courseId)
                                return course ? <li key={courseId}>{course.title}</li> : null
                              })}
                            </ul>
                          ) : (
                            <p>No enrolled courses</p>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Resources</h3>
                          {resources.map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between mb-2">
                              <span>{resource.title}</span>
                              {user.accessibleResources?.includes(resource.id) ? (
                                <Badge variant="secondary">Access Granted</Badge>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleAllowAccess(user.id, resource.id)}
                                >
                                  Allow Access
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Allow Course Access</h3>
                          {courses.map((course) => (
                            <div key={course.id} className="flex items-center justify-between mb-2">
                              <span>{course.title}</span>
                              {course.isPaid &&
                                (user.purchasedCourses?.includes(course.id) ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAllowCourseAccess(user.id, course.id)}
                                  >
                                    Confirm Access
                                  </Button>
                                ) : user.accessibleCourses?.includes(course.id) ? (
                                  <Badge variant="secondary">Access Granted</Badge>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAllowCourseAccess(user.id, course.id)}
                                  >
                                    Allow Access
                                  </Button>
                                ))}
                            </div>
                          ))}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Accessible Resources</h3>
                          {user.accessibleResources && user.accessibleResources.length > 0 ? (
                            <ul className="list-disc list-inside">
                              {user.accessibleResources.map((resourceId) => {
                                const resource = resources.find((r) => r.id === resourceId)
                                return resource ? <li key={resourceId}>{resource.title}</li> : null
                              })}
                            </ul>
                          ) : (
                            <p>No accessible resources</p>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Blazecredits 🪙</h3>
                          <p>Earned: {user.blazecredits.earned}</p>
                          <p>Redeemed: {user.blazecredits.redeemed}</p>
                          <p>Remaining: {user.blazecredits.remaining}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Referrals</h3>
                          {user.referrals && user.referrals.length > 0 ? (
                            <ul>
                              {user.referrals.map((referral, index) => (
                                <li key={index}>
                                  {referral.type === "signup"
                                    ? "5 Blazecredits for signup by "
                                    : "10 Blazecredits for purchase by "}
                                  {referral.name}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>No referrals yet</p>
                          )}
                        </div>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
