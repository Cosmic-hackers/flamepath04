'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ContentManagement from '@/components/admin/ContentManagement'
import UserManagement from '@/components/admin/UserManagement'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('content')
  const router = useRouter()

  useEffect(() => {
    // Check if the user is the admin
    if (!user || user.email !== 'siddusidharth613@gmail.com' || user.role !== 'admin') {
      router.push('/') // Redirect to home if not the admin
    }
  }, [user, router])

  if (!user || user.email !== 'siddusidharth613@gmail.com' || user.role !== 'admin') {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          <ContentManagement />
        </TabsContent>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

