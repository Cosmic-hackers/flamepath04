'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import { getRecommendedCourses } from '@/utils/courseRecommendations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Course } from '@/types/types'

export function CourseRecommendations() {
  const { user } = useUser()
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([])

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (user) {
        try {
          const allCourses = JSON.parse(localStorage.getItem('courses') || '[]')
          const recommendations = getRecommendedCourses(user, allCourses)
          setRecommendedCourses(recommendations)
        } catch (error) {
          console.error('Error fetching recommendations:', error)
          setRecommendedCourses([])
        }
      }
    }

    fetchRecommendations()
  }, [user])

  if (!user || recommendedCourses.length === 0) {
    return null
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flame-text">Recommended Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedCourses.map((course) => (
            <Card key={course.id} className="tech-card">
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground-light mb-4">{course.description}</p>
                <Button asChild className="w-full flame-button">
                  <Link href={`/courses/${course.id}`}>View Course</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
