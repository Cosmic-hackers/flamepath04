'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'

type User = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  createdAt: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Fetch users from your API
    // This is a mock implementation
    const fetchUsers = async () => {
      // In a real application, this would be an API call
      const mockUsers: User[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', role: 'user', createdAt: '2023-01-01' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', role: 'admin', createdAt: '2023-02-01' },
      ]

      // Get the newly created user from local storage
      const newUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      if (newUser.name) {
        mockUsers.push({
          id: (mockUsers.length + 1).toString(),
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          createdAt: new Date().toISOString().split('T')[0] // Current date
        })
      }

      setUsers(mockUsers)
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

