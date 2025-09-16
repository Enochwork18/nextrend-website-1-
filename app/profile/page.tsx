"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { getCurrentUser } from "@/lib/auth"

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Video,
  Clock,
  BarChart3,
  TrendingUp,
  Eye,
  ThumbsUp,
  Target,
  Star,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { TimeRangeButtons } from "@/components/analytics/time-range-buttons"
import { ViewsLineChart } from "@/components/analytics/views-line-chart"
import { LongsShortsPieChart } from "@/components/analytics/longs-shorts-pie-chart"

// Analytics data sets
const dataSets = {
  "7D": {
    views: [
      { date: "3", views: 100 },
      { date: "4", views: 60 },
      { date: "5", views: 90 },
      { date: "6", views: 92 },
      { date: "7", views: 105 },
      { date: "8", views: 75 },
      { date: "9", views: 80 },
    ],
    totalViews: "627M",
    change: { amount: -164, percent: -20.8 },
    longs: 130.4,
    shorts: 496.8,
  },
  "28D": {
    views: [
      { date: "13", views: 70 },
      { date: "15", views: 110 },
      { date: "17", views: 75 },
      { date: "19", views: 125 },
      { date: "21", views: 65 },
      { date: "23", views: 120 },
      { date: "25", views: 80 },
      { date: "27", views: 95 },
      { date: "29", views: 135 },
      { date: "31", views: 90 },
      { date: "2", views: 125 },
      { date: "4", views: 95 },
      { date: "6", views: 105 },
      { date: "8", views: 85 },
    ],
    totalViews: "2.50B",
    change: { amount: -412, percent: -14.13 },
    longs: 553.4,
    shorts: 2000,
  },
  "Max": {
    views: [
      { date: "2023", views: 5000 },
      { date: "Jul 2023", views: 12000 },
      { date: "Jan 2024", views: 25000 },
      { date: "Apr 2024", views: 47662 },
      { date: "Jul 2024", views: 60000 },
      { date: "Jan 2025", views: 70000 },
      { date: "Present", views: 82000 },
    ],
    totalViews: "47.66B",
    change: { amount: 499, percent: 1.1, date: "Apr 22, 2024" },
    longs: 47700,
    shorts: 47000,
  },
};

// Format change with arrow and color
function formatChange(change: { amount: number; percent: number; date?: string }) {
  const isPositive = change.amount >= 0;
  const ArrowIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  const colorClass = isPositive ? "text-green-500" : "text-red-500";
  
  return (
    <div className={`flex items-center ${colorClass} font-medium`}>
      <ArrowIcon className="w-4 h-4 mr-1" />
      {Math.abs(change.amount)}M ({Math.abs(change.percent)}%)
      {change.date && ` on ${change.date}`}
    </div>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [selectedRange, setSelectedRange] = useState<keyof typeof dataSets>("28D");
  const [selectedData, setSelectedData] = useState(dataSets["28D"]);

  useEffect(() => {
    setUser(getCurrentUser())
    setSelectedData(dataSets[selectedRange]);
  }, [selectedRange])
  
  const handleRangeChange = (range: string) => {
    setSelectedRange(range as keyof typeof dataSets);
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account settings</p>
          </div>
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
              
              {/* Content Analytics Section */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Content Analytics</h3>
                
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 max-w-xs mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Performance Overview</h4>
                        <TimeRangeButtons 
                          selectedRange={selectedRange}
                          onChange={handleRangeChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{selectedData.totalViews}</div>
                            {formatChange(selectedData.change)}
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Content Mix</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="h-[100px]">
                              <LongsShortsPieChart 
                                longs={selectedData.longs} 
                                shorts={selectedData.shorts} 
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Views Over Time</CardTitle>
                          <CardDescription>Your channel's view count over the selected period</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <ViewsLineChart data={selectedData.views} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="videos">
                    <div className="space-y-4">
                      <h4 className="font-medium">Video Performance</h4>
                      <p className="text-sm text-muted-foreground">
                        Detailed analytics for your individual videos will appear here.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>
    </div>
  )
}
