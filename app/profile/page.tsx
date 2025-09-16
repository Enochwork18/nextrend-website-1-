"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  
  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account information and preferences</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 overflow-hidden">
                      {user.profilePicture ? (
                        <img 
                          src={user.profilePicture} 
                          alt={`${user.firstName} ${user.lastName}`} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-300 text-4xl font-medium">
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{`${user.firstName} ${user.lastName}`}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                    
                    <div className="mt-6 w-full space-y-2">
                      <Button variant="outline" className="w-full">
                        Change Photo
                      </Button>
                      <Button variant="ghost" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/30">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Account Settings */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account Information</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Update your account details and preferences</p>
                  </div>
                  
                  <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          First Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="firstName"
                            defaultValue={user.firstName}
                            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Last Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="lastName"
                            defaultValue={user.lastName}
                            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            id="email"
                            defaultValue={user.email}
                            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-300 shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-not-allowed"
                            disabled
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Contact support to change your email address
                        </p>
                      </div>
                      
                      <div className="pt-4 md:col-span-2">
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
