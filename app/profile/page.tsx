"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { getCurrentUser, User } from "@/lib/auth"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title="Profile"
          description="Manage your account settings"
          imageUrl="/images/docs-header.jpeg"
        />
        <section className="py-8 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {user.profilePicture && (
                    <img src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{`${user.firstName} ${user.lastName}`}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">First Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.firstName}</dd>
                  </div>
                  <div className="col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.lastName}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.email}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
