"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Gift, Home, Search, Hash, TrendingUp, Zap, ArrowUpRight, User as UserIcon, ChevronDown, LogOut } from "lucide-react"
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
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
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
  
  // Toggle profile dropdown
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isProfileOpen && !target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

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
            {!isWorkspace && (
              <Link href="/donate">
                <Button variant="outline" className="gap-2">
                  <Gift className="h-4 w-4" />
                  Donate
                </Button>
              </Link>
            )}
            {user ? (
              <div className="relative profile-dropdown">
                <button 
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    {user.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt={user.firstName} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-blue-600 dark:text-blue-300 font-medium">
                        {user.firstName[0]}{user.lastName[0]}
                      </span>
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                    {isWorkspace ? (
                      <Link 
                        href="/" 
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Back to Home
                      </Link>
                    ) : (
                      <Link 
                        href="/home-dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Continue with Dashboard
                      </Link>
                    )}
                    {isWorkspace && (
                      <Link 
                        href="/optimize"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Zap className="w-4 h-4" />
                        Optimize
                      </Link>
                    )}
                    <Link 
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline">
                    Sign In
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Gift className="h-4 w-4" />
                    Donate
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="md:hidden">
              <ThemeToggle />
            </div>
            {!user && (
              <Link href="/donate" className="md:hidden">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  <Gift className="h-4 w-4" />
                  Donate
                </Button>
              </Link>
            )}
            {user && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen(!isProfileOpen);
                  if (isOpen) setIsOpen(false);
                }}
                className={`p-2 rounded-full ${isProfileOpen ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} focus:outline-none`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.firstName} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-blue-600 dark:text-blue-300 font-medium">
                      {user.firstName[0]}{user.lastName[0]}
                    </span>
                  )}
                </div>
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu();
                if (isProfileOpen) setIsProfileOpen(false);
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Main Navigation Links - Only show when profile is not open */}
              {!isProfileOpen && links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(l.href) ? 'text-blue-600 dark:text-white' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {l.icon && <l.icon className="inline-block w-5 h-5 mr-2 -mt-1" />}
                  {l.label}
                </Link>
              ))}

              {/* Profile Menu - Shows when profile icon is clicked */}
              {isProfileOpen && user && (
                <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
                  {isWorkspace ? (
                    <>
                      <Link 
                        href="/profile"
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => {
                          setIsOpen(false);
                          setIsProfileOpen(false);
                        }}
                      >
                        <UserIcon className="w-5 h-5 mr-2 -mt-1" />
                        Profile Settings
                      </Link>
                      <Link 
                        href="/optimize"
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => {
                          setIsOpen(false);
                          setIsProfileOpen(false);
                        }}
                      >
                        <Zap className="w-5 h-5 mr-2 -mt-1" />
                        Optimize
                      </Link>
                      <Link 
                        href="/" 
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => {
                          setIsOpen(false);
                          setIsProfileOpen(false);
                        }}
                      >
                        <Home className="w-5 h-5 mr-2 -mt-1" />
                        Back to Home
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800"
                      >
                        <LogOut className="w-5 h-5 mr-2 -mt-1" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link 
                      href="/home-dashboard" 
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => {
                        setIsOpen(false);
                        setIsProfileOpen(false);
                        // Ensure we're in workspace mode
                        if (!isWorkspace) {
                          window.location.href = '/home-dashboard';
                        }
                      }}
                    >
                      <Home className="w-5 h-5 mr-2 -mt-1" />
                      Continue with Dashboard
                    </Link>
                  )}
                </div>
              )}

              {/* Show auth buttons when not logged in */}
              {!user && !isProfileOpen && (
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <Link
                    href="/login"
                    className="block w-full px-4 py-2 text-center rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full px-4 py-2 text-center rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
