"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from "@/components/navbar";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video,
  Mic,
  FileText,
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
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
} from "lucide-react";
import { TimeRangeButtons } from "@/components/analytics/time-range-buttons";
import { ViewsLineChart } from "@/components/analytics/views-line-chart";
import { LongsShortsPieChart } from "@/components/analytics/longs-shorts-pie-chart";

// TODO: Replace with actual API call to fetch analytics data
// Example:
// const [analyticsData, setAnalyticsData] = useState(null);
// const [loading, setLoading] = useState(true);
//
// useEffect(() => {
//   const fetchAnalytics = async () => {
//     try {
//       const response = await fetch('/api/analytics/performance');
//       const data = await response.json();
//       setAnalyticsData(data);
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   
//   fetchAnalytics();
// }, []);

// Mock data - Replace with API response
export const dataSets = {
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

// Mock data for the channel
interface ChannelData {
  name: string;
  handle: string;
  videosCount: number;
  subscribers: number;
  subscribersRank: number;
  totalViews: number;
  totalViewsRank: number;
  subsChange: {
    count: number;
    percent: number;
  };
  mostRecentVideo: {
    title: string;
    views: number;
    published: string;
    duration: string;
    thumbnail: string;
  };
}

// TODO: Replace with actual API call to fetch channel data
// Example:
// const [channelData, setChannelData] = useState<ChannelData | null>(null);
//
// useEffect(() => {
//   const fetchChannelData = async () => {
//     try {
//       const response = await fetch('/api/channel/data');
//       const data = await response.json();
//       setChannelData(data);
//     } catch (error) {
//       console.error('Error fetching channel data:', error);
//     }
//   };
//   
//   fetchChannelData();
// }, []);

// Mock data - Replace with API response
const channelData: ChannelData = {
  name: "MrBeast",
  handle: "@mrbeast",
  videosCount: 897,
  subscribers: 433000000,
  subscribersRank: 1,
  totalViews: 94626372013,
  totalViewsRank: 12,
  subsChange: {
    count: 12000000,
    percent: 2.77
  },
  mostRecentVideo: {
    title: "$1 vs $1,000,000,000 Nuclear Bunker!",
    views: 85700000,
    published: "11 days ago",
    duration: "17:18",
    thumbnail: "https://i.ytimg.com/vi/rB9NynBZ4go/hqdefault.jpg",
  }
};

// Format large numbers with K, M, B suffixes
function formatNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toString();
}

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

export default function OptimizePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("channelytics");
  const [activeVideoTab, setActiveVideoTab] = useState("longs");
  const [selectedRange, setSelectedRange] = useState<keyof typeof dataSets>("7D");
  // TODO: Add state for loading and error handling when fetching data
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState(dataSets["28D"]);

  useEffect(() => {
    setSelectedData(dataSets[selectedRange]);
  }, [selectedRange]);

  const handleOptimizeNow = async () => {
    // TODO: Implement API call to start optimization
    // try {
    //   const response = await fetch('/api/optimize/start', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       // Add any required parameters
    //       range: selectedRange,
    //       // ...other options
    //     }),
    //   });
    //   
    //   if (!response.ok) {
    //     throw new Error('Optimization failed');
    //   }
    //   
    //   const result = await response.json();
    //   // Handle success (e.g., show toast, update UI)
    //   console.log('Optimization started:', result);
    // } catch (error) {
    //   console.error('Error starting optimization:', error);
    //   // Handle error (e.g., show error message)
    // }
    
    // Temporary implementation
    console.log('Optimization started');
  };

  const handleRangeChange = async (range: string) => {
    // TODO: Implement API call to fetch data for the selected range
    // try {
    //   setLoading(true);
    //   const response = await fetch(`/api/analytics/performance?range=${range}`);
    //   const data = await response.json();
    //   // Update state with new data
    //   setAnalyticsData(data);
    //   setSelectedRange(range as keyof typeof dataSets);
    // } catch (err) {
    //   setError(err.message);
    //   console.error('Error fetching range data:', err);
    // } finally {
    //   setLoading(false);
    // }
    
    // Temporary implementation with mock data
    setSelectedRange(range as keyof typeof dataSets);
  };

  const { views, totalViews, change, longs, shorts } = selectedData;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Content Optimization</h1>
              <p className="text-muted-foreground">Analyze and optimize your content performance</p>
            </div>
          </div>

          {/* Channel Info */}
          <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <img 
                src="https://yt3.ggpht.com/ytc/AMLnZu9xQ7qJq4nq9vJwb7Fqjx6t7LjbGx8dwg5j7dBv=s88-c-k-c0x00ffffff-no-rj" 
                alt={channelData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{channelData.name}</h2>
              <p className="text-muted-foreground">{channelData.handle} • {channelData.videosCount} videos</p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(channelData.subscribers)}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-green-500 mr-1">↑ {formatNumber(channelData.subsChange.count)} ({channelData.subsChange.percent}%)</span>
                  <span>last 28 days</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(channelData.totalViews)}</div>
                <div className="text-xs text-muted-foreground">Ranked #{channelData.totalViewsRank} ⭐</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="w-full justify-start border-b bg-transparent p-0 rounded-none">
            <TabsTrigger 
              value="channelytics" 
              className="relative data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-foreground"
            >
              Channelytics
            </TabsTrigger>
            <TabsTrigger 
              value="videos" 
              className="relative data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-foreground"
            >
              Videos
            </TabsTrigger>

          </TabsList>

          {/* Channelytics Tab */}
          <TabsContent value="channelytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Views</h2>
                <p className="text-muted-foreground">Track your channel's performance</p>
              </div>
              <TimeRangeButtons 
                selectedRange={selectedRange} 
                onChange={handleRangeChange} 
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{totalViews}</CardTitle>
                <CardDescription>
                  {formatChange(change)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ViewsLineChart data={views} />
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Content Distribution</h3>
                    <LongsShortsPieChart longs={longs} shorts={shorts} />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Performance</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Long Views</span>
                        <span className="font-medium">{longs.toLocaleString()}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Short Views</span>
                        <span className="font-medium">{shorts.toLocaleString()}M</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t">
                      <h4 className="font-medium mb-2">Most Recent Video</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {formatNumber(channelData.subsChange.count)} new subscribers
                        </span>
                        <span className="text-green-500 text-sm">
                          ↑ {channelData.subsChange.percent}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                          <img 
                            src={channelData.mostRecentVideo.thumbnail} 
                            alt={channelData.mostRecentVideo.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
                            {channelData.mostRecentVideo.duration}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{channelData.mostRecentVideo.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatNumber(channelData.mostRecentVideo.views)} views • {channelData.mostRecentVideo.published}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>  
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Videos</h2>
                <p className="text-muted-foreground">Manage and analyze your videos</p>
              </div>
            </div>

            <Tabs 
              value={activeVideoTab} 
              onValueChange={setActiveVideoTab}
              className="space-y-4"
            >
              <TabsList>
                <TabsTrigger value="longs">Longs</TabsTrigger>
                <TabsTrigger value="shorts">Shorts</TabsTrigger>
              </TabsList>

              <TabsContent value="longs" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card key={item} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative aspect-video bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Video className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                          12:34
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-2">Video Title {item}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {Math.floor(Math.random() * 10) + 1}K views • {Math.floor(Math.random() * 30) + 1} days ago
                        </p>
                        <div className="mt-3 flex space-x-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            <BarChart3 className="w-3 h-3 mr-1" />
                            Analytics
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Optimize
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shorts" className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="relative group cursor-pointer">
                      <div className="aspect-[9/16] bg-muted rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1 rounded">
                          0:15
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium line-clamp-2">Short Video {item}</p>
                        <p className="text-xs text-muted-foreground">
                          {Math.floor(Math.random() * 100) + 1}K views
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
