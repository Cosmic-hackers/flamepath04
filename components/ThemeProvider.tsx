"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useTheme as useNextTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Export the useTheme hook
export function useTheme() {
  const { theme, setTheme } = useNextTheme()

  // Add the toggleTheme function to match the original API
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return { theme, setTheme, toggleTheme }
}
