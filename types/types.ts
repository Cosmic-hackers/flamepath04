export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  college?: string;
  profession?: string;
  enrolledCourses?: string[];
  interests?: string[];
  badges?: {
    courseId: string;
    badgeUrl: string;
    earnedAt: string;
  }[];
}

export type Course = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  badgeUrl?: string;
}
