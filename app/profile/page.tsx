"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getCurrentUser, updateUser, deleteUser, logout } from "@/lib/auth"
import { toast } from "sonner"
import { Trash2, Upload, User as UserIcon } from "lucide-react"

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
}

export default function ProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [user, setUser] = useState(getCurrentUser())
  const [formData, setFormData] = useState<FormData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    profilePicture: user?.profilePicture
  })

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string
      setFormData(prev => ({
        ...prev,
        profilePicture: imageUrl
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const updatedUser = updateUser({
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim()
      })
      
      if (updatedUser) {
        setUser(updatedUser)
        toast.success('Profile updated successfully')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true)
      // Reset the delete confirmation after 3 seconds if not confirmed
      const timer = setTimeout(() => {
        setShowDeleteConfirm(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
    
    try {
      deleteUser()
      logout()
      // Force a full page reload to reset the application state
      window.location.href = '/'
      toast.success('Your account has been successfully deleted')
    } catch (error) {
      console.error('Error deleting account:', error)
      toast.error('Failed to delete account')
      setShowDeleteConfirm(false)
    }
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
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 overflow-hidden">
                          {formData.profilePicture ? (
                            <img 
                              src={formData.profilePicture} 
                              alt={`${formData.firstName} ${formData.lastName}`} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-300 text-4xl font-medium">
                              {formData.firstName?.[0]}{formData.lastName?.[0]}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Upload className="w-6 h-6 text-white" />
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {formData.firstName} {formData.lastName}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">{formData.email}</p>
                      
                      <div className="mt-6 w-full space-y-2">
                        <Button 
                          type="button"
                          variant="outline" 
                          className="w-full gap-2"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="w-4 h-4" />
                          Change Photo
                        </Button>
                        <Button 
                          type="button"
                          variant="ghost" 
                          className={`w-full gap-2 ${showDeleteConfirm ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'text-red-600 dark:text-red-400'}`}
                          onClick={handleDeleteAccount}
                        >
                          <Trash2 className="w-4 h-4" />
                          {showDeleteConfirm ? 'Confirm Delete' : 'Delete Account'}
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
                          <Label htmlFor="firstName">
                            First Name
                          </Label>
                          <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Last Name
                          </Label>
                          <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="email">
                            Email Address
                          </Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            disabled
                            className="w-full bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                          />
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Contact support to change your email address
                          </p>
                        </div>
                        
                        <div className="pt-4 md:col-span-2">
                          <Button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
