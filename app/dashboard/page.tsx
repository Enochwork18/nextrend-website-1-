"use client"
import { Navbar } from "@/components/navbar"
import type React from "react"

import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, logout, updateCurrentUser, updatePassword } from "@/lib/auth"
import Image from "next/image"
import { motion } from "framer-motion" // Import motion

interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  profilePicture?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [profileMessage, setProfileMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth/login") // Redirect if not logged in
    } else {
      setUser(currentUser)
      setFirstName(currentUser.firstName || "")
      setLastName(currentUser.lastName || "")
    }
  }, [router])

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setProfileMessage("")
    if (user) {
      // Frontend Simulation: This calls a local function.
      // For backend integration: Replace this with an API call to update user profile.
      // Example: await fetch('/api/user/profile', { method: 'PUT', body: JSON.stringify({ firstName, lastName }) });
      const result = updateCurrentUser({ id: user.id, firstName, lastName })
      if (result.success && result.user) {
        setUser(result.user)
        setProfileMessage("Profile updated successfully!")
      } else {
        setProfileMessage(result.message)
      }
    }
  }

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage("")
    if (!user) {
      setPasswordMessage("No user logged in.")
      return
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordMessage("New passwords do not match.")
      return
    }

    // Frontend Simulation: This calls a local function.
    // For backend integration: Replace this with an API call to change password.
    // Example: await fetch('/api/user/password', { method: 'PUT', body: JSON.stringify({ currentPassword, newPassword }) });
    const result = updatePassword(user.email, currentPassword, newPassword)
    if (result.success) {
      setPasswordMessage("Password updated successfully!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    } else {
      setPasswordMessage(result.message)
    }
  }

  const handleLogout = () => {
    // Frontend Simulation: This calls a local function.
    // For backend integration: Replace this with an API call to log out.
    // Example: await fetch('/api/logout', { method: 'POST' });
    logout()
    router.push("/auth/login")
  }

  if (!user) {
    return null // Or a loading spinner
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title={`Welcome, ${user.firstName}!`}
          description="Manage your profile, settings, and explore your dashboard."
          imageUrl="/images/account-header.jpeg"
        />

        <motion.section
          className="py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950 scroll-mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container px-4 md:px-6 max-w-3xl mx-auto space-y-8">
            <motion.div variants={cardVariants}>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Profile Information</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Update your personal details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={user.profilePicture || "/placeholder.svg?height=100&width=100&text=Profile"}
                      alt="Profile Picture"
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-900 dark:text-white">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-900 dark:text-white">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                        />
                      </div>
                    </div>
                    {profileMessage && (
                      <p
                        className={`text-sm text-center ${profileMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}
                      >
                        {profileMessage}
                      </p>
                    )}
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="mt-8 bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Password</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Change your account password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-gray-900 dark:text-white">
                        Current Password
                      </Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-gray-900 dark:text-white">
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmNewPassword" className="text-gray-900 dark:text-white">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmNewPassword"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                      />
                    </div>
                    {passwordMessage && (
                      <p
                        className={`text-sm text-center ${passwordMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}
                      >
                        {passwordMessage}
                      </p>
                    )}
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="mt-8 bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Dashboard Overview</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Your personalized insights and tools.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-800 dark:text-gray-200">
                    This is your personalized dashboard. In a full implementation, this section would display:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Real-time trend data</li>
                    <li>Content generation history</li>
                    <li>Performance analytics</li>
                    <li>Niche recommendations</li>
                  </ul>
                  <p className="text-gray-800 dark:text-gray-200 font-semibold">
                    (Note: This is a frontend-only demo. Backend integration is required for live data.)
                  </p>
                  <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white">
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}
