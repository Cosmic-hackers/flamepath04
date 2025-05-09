import { Course, User } from '@/types/types'

export function getRecommendedCourses(user: User, allCourses: Course[]): Course[] {
  const enrolledCourseIds = new Set(user.enrolledCourses || [])
  const userInterests = new Set(user.interests || [])

  return allCourses
    .filter(course => !enrolledCourseIds.has(course.id) && !course.isUpcoming)
    .sort((a, b) => {
      const aRelevance = calculateRelevance(a, userInterests)
      const bRelevance = calculateRelevance(b, userInterests)
      return bRelevance - aRelevance
    })
    .slice(0, 3) // Return top 3 recommendations
}

function calculateRelevance(course: Course, userInterests: Set<string>): number {
  return (course.tags || []).filter(tag => userInterests.has(tag)).length
}
