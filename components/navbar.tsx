"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Gift, Home, Search, Hash, TrendingUp, Zap, ArrowUpRight, User as UserIcon, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { getCurrentUser, logout } from "@/lib/auth"
import * as React from "react"

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

interface LinkItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    window.location.href = "/"
  }

  const pathname = usePathname()
  const isWorkspaceRoute = (p?: string | null) => {
    if (!p) return false
    return (
      p.startsWith("/home-dashboard") ||
      p.startsWith("/discover") ||
      p.startsWith("/keywords") ||
      p.startsWith("/ai-trend") ||
      p.startsWith("/optimize") ||
      p.startsWith("/upgrade") ||
      p.startsWith("/profile")
    )
  }
  const isWorkspace = isWorkspaceRoute(pathname)

  const isActive = (path: string) => {
    return pathname === path
  }

  const workspaceLinks = [
    { href: "/home-dashboard", label: "Home", icon: Home },
    { href: "/discover", label: "Discover", icon: Search },
    { href: "/keywords", label: "Keywords", icon: Hash },
    { href: "/ai-trend", label: "AI Trend", icon: TrendingUp },
    { href: "/upgrade", label: "Upgrade", icon: ArrowUpRight },
  ]

  const defaultLinks: LinkItem[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/docs", label: "Docs" },
    { href: "/contact", label: "Contact" },
  ]

  const links: LinkItem[] = isWorkspace ? workspaceLinks : defaultLinks
  const linkBaseClass = isWorkspace
    ? "flex items-center gap-2 dark:text-white/80 text-gray-700 hover:text-blue-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
    : "text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-white/80 px-3 py-2 rounded-md text-sm font-medium"

  return (
    <nav className={`${isWorkspace ? "dark:bg-gray-900 bg-white border-b dark:border-gray-800" : "bg-white dark:bg-gray-900 border-b"} shadow-sm transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className={`text-2xl font-bold ${isWorkspace ? "dark:text-white text-gray-900" : "text-blue-600"}`}>NexTrend</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkBaseClass}>
                {isWorkspace && l.icon && <l.icon className="w-4 h-4" />}
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop right-side controls */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="relative group">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block z-50">
                  <div className="py-1">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Profile
                    </Link>
                    <Link href="/optimize" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Optimize
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              !isWorkspace && (
                <>
                  <Link href="/donate">
                    <Button variant="outline" size="sm" className="rounded-full border-2">
                      <Gift className="h-4 w-4 mr-2" /> Donate
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`${isWorkspace ? "text-white hover:text-white/80" : "text-gray-700 hover:text-blue-600"} block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={toggleMenu}
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <div className="flex justify-center pb-2">
                  <ThemeToggle />
                </div>
                {user ? (
                  <div className="w-full space-y-2">
                    <Link href="/profile" className="w-full block">
                      <Button variant="outline" size="sm" className="w-full">
                        <UserIcon className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Link href="/optimize" className="w-full block">
                      <Button variant="outline" size="sm" className="w-full">
                        <Zap className="h-4 w-4 mr-2" />
                        Optimize
                      </Button>
                    </Link>
                    <Button size="sm" className="w-full" onClick={handleLogout}>
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  !isWorkspace && (
                    <>
                      <Link href="/donate">
                        <Button variant="outline" size="sm" className="w-full rounded-full border-2">
                          <Gift className="h-4 w-4 mr-2" /> Donate
                        </Button>
                      </Link>
                      <Link href="/auth/login">
                        <Button variant="outline" size="sm" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/auth/signup">
                        <Button size="sm" className="w-full">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
