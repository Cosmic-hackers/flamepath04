import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AIChatbot from '@/components/AIChatbot'
import VoiceAssistant from '@/components/VoiceAssistant'
import { UserProvider } from '@/contexts/UserContext'
import { CartProvider } from '@/contexts/CartContext'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flamepath Academy',
  description: 'Your Guide to Mastering the Future of Technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider>
            <CartProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <AIChatbot />
              <VoiceAssistant />
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

)
}

