"use client"

import { useUser } from "@/contexts/UserContext"
import MigrateToFirebase from "@/scripts/migrate-to-firebase"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function MigratePage() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null // Will redirect in useEffect
  }

  return <MigrateToFirebase />
}
