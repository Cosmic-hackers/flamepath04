import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { UserProvider } from "@/contexts/UserContext"
import { CartProvider } from "@/contexts/CartContext"
import { ThemeProvider } from "@/components/ThemeProvider"
import { AIChatbotWrapper, VoiceAssistantWrapper } from "@/components/client-wrappers"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata = {
  title: "Flamepath Academy",
  description: "Ignite Your Tech Career with Cutting-Edge Courses",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <UserProvider>
            <CartProvider>
              <Header />
              <main className="flex-grow bg-background-light">{children}</main>
              <Footer />
              <AIChatbotWrapper />
            </CartProvider>
          </UserProvider>
          <VoiceAssistantWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
}
