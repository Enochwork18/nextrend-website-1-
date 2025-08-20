"use client"
import Link from "next/link"
import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signup } from "@/lib/auth"
import { motion } from "framer-motion" // Import motion

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    // Frontend Simulation: This calls a local function.
    // For backend integration: Replace this with an API call to your registration service.
    // Example: const response = await fetch('/api/signup', { method: 'POST', body: JSON.stringify({ email, password, firstName, lastName }) });
    // const data = await response.json();
    // if (data.success) { ... } else { setError(data.message); }
    const result = signup(email, password, firstName, lastName)
    if (result.success) {
      setSuccess(result.message)
      // Clear form fields
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setTimeout(() => {
        router.push("/auth/login") // Redirect to login after successful signup
      }, 1500)
    } else {
      setError(result.message)
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <motion.div className="w-full max-w-md mx-auto" initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Create an Account</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Enter your details below to create your NexTrend account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-900 dark:text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
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
                    placeholder="Doe"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 dark:text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-900 dark:text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-900 dark:text-white">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {success && <p className="text-green-500 text-sm text-center">{success}</p>}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </form>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                prefetch={false}
              >
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
