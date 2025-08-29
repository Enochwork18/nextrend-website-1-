"use client"
import Link from "next/link"
import { MenuIcon, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/auth"
import { useTheme } from "next-themes"

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setIsLoggedIn(!!getCurrentUser())
    setMounted(true)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/upgrade", label: "Pricing" },
    { href: "/contact", label: "Contact" },
    { href: "/docs", label: "Support" },
  ]

  // Navigation links for logged-in users
  const dashboardNavLinks = [
    { href: "/home-dashboard", label: "Home" },
    { href: "/discover", label: "Discover" },
    { href: "/keywords", label: "Keywords" },
    { href: "/ai-trend", label: "AI Trend" },
    { href: "/upgrade", label: "Upgrade" },
  ]

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white"
          prefetch={false}
        >
          <span className="text-blue-600">NexTrend</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
          {(isLoggedIn ? dashboardNavLinks : navLinks).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:underline underline-offset-4 dark:text-gray-300 dark:hover:text-white"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
          </nav>
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
          {!isLoggedIn && (
            <div className="flex items-center gap-2">
              <Link href="/auth/signup" prefetch={false}>
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/auth/login" prefetch={false}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Login</Button>
              </Link>
            </div>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-transparent border-gray-300 dark:border-gray-700"
            >
              <MenuIcon className="h-6 w-6 text-gray-900 dark:text-white" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white dark:bg-gray-900">
            <div className="flex flex-col gap-4 py-6">
              {mounted && (
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="w-full justify-start text-lg font-medium text-gray-900 dark:text-white"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-5 w-5 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5 mr-2" />
                      Dark Mode
                    </>
                  )}
                </Button>
              )}
              {(isLoggedIn ? dashboardNavLinks : navLinks).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-gray-900 dark:text-white"
                  prefetch={false}
                >
                  {link.label}
                </Link>
              ))}
              {!isLoggedIn && (
                <Link href="/auth/signup" prefetch={false}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-lg font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Sign Up
                  </Button>
                </Link>
              )}
              {!isLoggedIn && (
                <Link href="/auth/login" prefetch={false}>
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
