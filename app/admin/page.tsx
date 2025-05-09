"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/UserContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserManagement from "@/components/admin/UserManagement"
import CourseManagement from "@/components/admin/CourseManagement"
import ResourceManagement from "@/components/admin/ResourceManagement"
import { useRouter } from "next/navigation"
import AddResource from "@/components/admin/AddResource"
import MeetingManagement from "@/components/admin/MeetingManagement"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState("courses")
  const router = useRouter()

  useEffect(() => {
    if (!user || user.email !== "siddusidharth613@gmail.com" || user.role !== "admin") {
      router.push("/") // Redirect to home if not the admin
    }
  }, [user, router])

  if (!user || user.email !== "siddusidharth613@gmail.com" || user.role !== "admin") {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="courses">Course Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="resources">Resource Management</TabsTrigger>
          <TabsTrigger value="add-resource">Add Resource</TabsTrigger>
          <TabsTrigger value="meetings">Meeting Management</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <CourseManagement />
        </TabsContent>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="resources">
          <ResourceManagement />
        </TabsContent>
        <TabsContent value="add-resource">
          <AddResource />
        </TabsContent>
        <TabsContent value="meetings">
          <MeetingManagement />
        </TabsContent>
      </Tabs>
      <Button asChild className="mt-4">
        <Link href="/admin/projects">Manage Projects</Link>
      </Button>
    </div>
  )
}
