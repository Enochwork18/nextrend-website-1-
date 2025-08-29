"use client"
import Link from "next/link"
import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/auth"
import { motion } from "framer-motion" // Import motion
import { X } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Clear previous errors
    // Frontend Simulation: This calls a local function.
    // For backend integration: Replace this with an API call to your authentication service.
    // Example: const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    // const data = await response.json();
    // if (data.success) { ... } else { setError(data.message); }
    const result = login(email, password)
    if (result.success) {
      router.push("/home-dashboard") // Redirect to new home dashboard on successful login
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
            <div className="flex justify-between items-center">
              <div className="flex-1" />
              <button 
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Login to NexTrend</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
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
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Login
              </Button>
            </form>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                prefetch={false}
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
