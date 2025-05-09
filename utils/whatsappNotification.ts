import { toast } from "@/components/ui/use-toast"

export function sendWhatsAppNotification(user: any, courseName: string, courseDescription: string) {
  // In a real-world scenario, this function would integrate with the WhatsApp Business API
  // For now, we'll simulate the notification by logging it and showing a toast
  console.log(`Sending WhatsApp notification to ${user.phone} for course: ${courseName}`)
  
  const message = `
    Hello ${user.fullName},

    Thank you for enrolling in ${courseName}!
    
    Course Description:
    ${courseDescription}
    
    We hope you enjoy the course and find it valuable for your learning journey.
  `
  
  console.log('WhatsApp message content:', message)
  
  // Show a toast notification to simulate the WhatsApp message being sent
  toast({
    title: "WhatsApp Notification Sent",
    description: `A message would be sent to ${user.phone} with course details.`,
  })
}
