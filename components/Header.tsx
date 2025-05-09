"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  User,
  ShoppingCart,
  Sun,
  Moon,
  BookOpen,
  FileText,
  Info,
  Calendar,
  Menu,
  X,
  Home,
  Folder,
  Award,
} from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import { useCart } from "@/contexts/CartContext"
import { useTheme } from "@/components/ThemeProvider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { LoginModal } from "@/components/LoginModal"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/courses", label: "Courses", icon: BookOpen },
  { path: "/resources", label: "Resources", icon: FileText },
  { path: "/projects", label: "Projects", icon: Folder },
  { path: "/meetings", label: "Meetings", icon: Calendar },
  { path: "/about", label: "About", icon: Info },
  { path: "/achievements", label: "Achievements", icon: Award },
]

export default function Header() {
  const { user, setUser } = useUser()
  const { items } = useCart()
  const { theme, setTheme } = useTheme()
  const [isLoginModalOpen, setIsLoginModalOpen] = useLocalStorage("isLoginModalOpen", false)
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeToggle, setActiveToggle] = useState<string | null>(null)

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-background border-b border-electric-blue">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <span className="flame-text mr-2">Flamepath</span>
          <span className="ml-2">Academy</span>
        </Link>
        <div className="flex items-center space-x-8">
          <Button
            variant="ghost"
            className="md:hidden text-electric-blue hover:text-flame-orange transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <div key={path} className="flex flex-col items-center group">
                <Link
                  href={path}
                  className={`text-foreground-light hover:text-flame-orange transition-colors flex flex-col items-center ${
                    isActive(path) ? "text-flame-orange" : ""
                  }`}
                  onMouseEnter={() => setActiveToggle(path)}
                  onMouseLeave={() => setActiveToggle(null)}
                >
                  <Icon className="h-5 w-5 mb-1 group-hover:text-flame-orange transition-colors" />
                  <AnimatePresence>
                    {(activeToggle === path || isActive(path)) && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs font-medium"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
                {isActive(path) && <div className="h-0.5 w-full bg-flame-orange mt-1 rounded-full" />}
              </div>
            ))}
          </nav>
          {user ? (
            <>
              <Link href="/cart">
                <Button
                  variant="ghost"
                  className="relative p-2 text-electric-blue hover:text-flame-orange transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-flame-red text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-2 text-electric-blue hover:text-flame-orange transition-colors">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background-light border border-electric-blue">
                  <DropdownMenuLabel className="text-foreground-light">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-electric-blue" />
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="text-foreground-light hover:text-flame-orange transition-colors">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile" className="text-foreground-light hover:text-flame-orange transition-colors">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/cart" className="text-foreground-light hover:text-flame-orange transition-colors">
                      Cart ({cartItemsCount})
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem>
                      <Link href="/admin" className="text-foreground-light hover:text-flame-orange transition-colors">
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-foreground-light hover:text-flame-orange transition-colors"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="text-electric-blue hover:text-flame-orange transition-colors ml-4"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="text-electric-blue hover:text-flame-orange transition-colors"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsLoginModalOpen(true)}
                className="text-electric-blue hover:text-flame-orange transition-colors"
              >
                Login
              </Button>
              <Button variant="default" asChild className="flame-button">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-electric-blue/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>
                <span className="flame-text">Flamepath</span> Academy
              </Link>
              <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="space-y-2 py-6">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    href={path}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground-light hover:bg-electric-blue/10 ${
                      isActive(path) ? "text-flame-orange" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Icon className="h-6 w-6 mr-2" />
                      {label}
                    </div>
                  </Link>
                ))}
              </div>
              {!user && (
                <div className="py-6">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsLoginModalOpen(true)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full justify-center text-electric-blue hover:text-flame-orange transition-colors"
                  >
                    Login
                  </Button>
                  <Button
                    variant="default"
                    asChild
                    className="w-full justify-center mt-2 flame-button"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
;<style jsx>{`
  @keyframes glow {
    0% {
      text-shadow: 0 0 5px #ff4500, 0 0 10px #ff4500;
    }
    50% {
      text-shadow: 0 0 10px #ff4500, 0 0 20px #ff4500;
    }
    100% {
      text-shadow: 0 0 5px #ff4500, 0 0 10px #ff4500;
    }
  }

  .glow-effect {
    animation: glow 2s infinite;
  }
`}</style>
