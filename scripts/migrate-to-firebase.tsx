"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { db } from "@/lib/firebase"
import { doc, writeBatch } from "firebase/firestore"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function MigrateToFirebase() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"idle" | "migrating" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [details, setDetails] = useState<string[]>([])

  const migrateData = async () => {
    setIsLoading(true)
    setStatus("migrating")
    setProgress(0)
    setMessage("Starting migration...")
    setDetails([])

    try {
      // 1. Migrate users
      setMessage("Migrating users...")
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      setProgress(10)
      setDetails((prev) => [...prev, `Found ${users.length} users to migrate`])

      const batch = writeBatch(db)

      for (let i = 0; i < users.length; i++) {
        const user = users[i]
        const userRef = doc(db, "users", user.id)
        batch.set(userRef, {
          ...user,
          migratedAt: new Date().toISOString(),
        })

        setProgress(10 + Math.floor((i / users.length) * 20))
        if (i % 5 === 0 || i === users.length - 1) {
          setDetails((prev) => [...prev, `Processed ${i + 1}/${users.length} users`])
        }
      }

      await batch.commit()
      setDetails((prev) => [...prev, `Successfully migrated ${users.length} users to Firebase`])
      setProgress(30)

      // 2. Migrate courses
      setMessage("Migrating courses...")
      const courses = JSON.parse(localStorage.getItem("courses") || "[]")
      setDetails((prev) => [...prev, `Found ${courses.length} courses to migrate`])

      const courseBatch = writeBatch(db)

      for (let i = 0; i < courses.length; i++) {
        const course = courses[i]
        const courseRef = doc(db, "courses", course.id)
        courseBatch.set(courseRef, {
          ...course,
          migratedAt: new Date().toISOString(),
        })

        setProgress(30 + Math.floor((i / courses.length) * 20))
        if (i % 5 === 0 || i === courses.length - 1) {
          setDetails((prev) => [...prev, `Processed ${i + 1}/${courses.length} courses`])
        }
      }

      await courseBatch.commit()
      setDetails((prev) => [...prev, `Successfully migrated ${courses.length} courses to Firebase`])
      setProgress(50)

      // 3. Migrate resources
      setMessage("Migrating resources...")
      const resources = JSON.parse(localStorage.getItem("resources") || "[]")
      setDetails((prev) => [...prev, `Found ${resources.length} resources to migrate`])

      const resourceBatch = writeBatch(db)

      for (let i = 0; i < resources.length; i++) {
        const resource = resources[i]
        const resourceRef = doc(db, "resources", resource.id)
        resourceBatch.set(resourceRef, {
          ...resource,
          migratedAt: new Date().toISOString(),
        })

        setProgress(50 + Math.floor((i / resources.length) * 20))
        if (i % 5 === 0 || i === resources.length - 1) {
          setDetails((prev) => [...prev, `Processed ${i + 1}/${resources.length} resources`])
        }
      }

      await resourceBatch.commit()
      setDetails((prev) => [...prev, `Successfully migrated ${resources.length} resources to Firebase`])
      setProgress(70)

      // 4. Migrate projects
      setMessage("Migrating projects...")
      const projects = JSON.parse(localStorage.getItem("projects") || "[]")
      setDetails((prev) => [...prev, `Found ${projects.length} projects to migrate`])

      const projectBatch = writeBatch(db)

      for (let i = 0; i < projects.length; i++) {
        const project = projects[i]
        const projectRef = doc(db, "projects", project.id)
        projectBatch.set(projectRef, {
          ...project,
          migratedAt: new Date().toISOString(),
        })

        setProgress(70 + Math.floor((i / projects.length) * 20))
        if (i % 5 === 0 || i === projects.length - 1) {
          setDetails((prev) => [...prev, `Processed ${i + 1}/${projects.length} projects`])
        }
      }

      await projectBatch.commit()
      setDetails((prev) => [...prev, `Successfully migrated ${projects.length} projects to Firebase`])
      setProgress(90)

      // 5. Migrate meetings
      setMessage("Migrating meetings...")
      const meetings = JSON.parse(localStorage.getItem("meetings") || "[]")
      setDetails((prev) => [...prev, `Found ${meetings.length} meetings to migrate`])

      const meetingBatch = writeBatch(db)

      for (let i = 0; i < meetings.length; i++) {
        const meeting = meetings[i]
        const meetingRef = doc(db, "meetings", meeting.id)
        meetingBatch.set(meetingRef, {
          ...meeting,
          migratedAt: new Date().toISOString(),
        })

        setProgress(90 + Math.floor((i / meetings.length) * 10))
        if (i % 5 === 0 || i === meetings.length - 1) {
          setDetails((prev) => [...prev, `Processed ${i + 1}/${meetings.length} meetings`])
        }
      }

      await meetingBatch.commit()
      setDetails((prev) => [...prev, `Successfully migrated ${meetings.length} meetings to Firebase`])
      setProgress(100)

      setMessage("Migration completed successfully!")
      setStatus("success")
    } catch (error) {
      console.error("Migration error:", error)
      setStatus("error")
      setMessage(`Migration failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Migrate Data to Firebase</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            This utility will migrate all data from localStorage to Firebase Firestore. This is a one-time operation
            that should be performed when transitioning from local storage to Firebase.
          </p>

          {status === "idle" && (
            <Button onClick={migrateData} className="flame-button">
              Start Migration
            </Button>
          )}

          {status === "migrating" && (
            <div className="space-y-4">
              <div className="flex items-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>{message}</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-sm text-gray-500">{progress}% complete</div>
              <div className="mt-4 border rounded-md p-4 max-h-60 overflow-y-auto">
                <h3 className="font-semibold mb-2">Migration Log:</h3>
                <ul className="space-y-1 text-sm">
                  {details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {status === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <AlertDescription className="text-green-700">{message}</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5 mr-2" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
