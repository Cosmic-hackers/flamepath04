'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User, ShoppingCart, Sun, Moon, Brain, ChevronDown } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import { useCart } from '@/contexts/CartContext'
import { useTheme } from '@/components/ThemeProvider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchBar } from '@/components/SearchBar'

export default function Header() {
  const { user, setUser } = useUser()
  const { items } = useCart()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    setUser(null)
  }

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <Brain className="mr-2" />
          Flamepath Academy
        </Link>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-foreground hover:text-primary">Home</Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 font-normal hover:bg-transparent">
                  Courses <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/courses/ethical-hacking">Ethical Hacking: Zero to Hero</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/courses/dos-ddos-telugu">DOS and DDOS Course (Telugu)</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="text-foreground hover:text-primary">About</Link>
            <Link href="/contact" className="text-foreground hover:text-primary">Contact</Link>
          </nav>
          <SearchBar />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="text-foreground"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          {user ? (
            <>
              <Link href="/cart">
                <Button variant="ghost" className="relative p-2">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-2">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/cart">Cart ({cartItemsCount})</Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

             </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

wnMenuLabel>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem className="md:hidden">
                   <Search className="mr-2 h-4 w-4" />
                   <span>Search</span>
                 </DropdownMenuItem>
                 <DropdownMenuItem>
                   <Link href="/dashboard">Dashboard</Link>
                 </DropdownMenuItem>
                 <DropdownMenuItem>
                   <Link href="/profile">Profile</Link>
                 </DropdownMenuItem>
                 <DropdownMenuItem>
                   <Link href="/cart">Cart ({cartItemsCount})</Link>
                 </DropdownMenuItem>
                 {user?.role === 'admin' && (
                   <>
                     <DropdownMenuItem>
                       <Link href="/admin">Admin Dashboard</Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                       <Link href="/admin/content-management">Content Management</Link>
                     </DropdownMenuItem>
                   </>
                 )}
                 <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
               </DropdownMenuContent>
             </DropdownMenu>
           </>
         ) : (
           <>
             <Button variant="secondary">
               <Link href="/login">Login</Link>
             </Button>
             <Button variant="default">
               <Link href="/signup">Sign Up</Link>
             </Button>
           </>
         )}
       </div>
     </div>
   </header>
 )
}

