"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { 
  Clock,
  BarChart3,
  TrendingUp,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  ChevronLeft,
  Zap,
  Target,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

type VideoType = {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  engagement: string
  status: 'published' | 'draft' | 'scheduled'
  publishedDate: string
  metrics: {
    watchTime: string
    retention: string
    ctr: string
  }
  suggestions: {
    title: string
    description: string
    icon: any
    priority: 'high' | 'medium' | 'low'
  }[]
}

const videos: Record<string, VideoType[]> = {
  longForm: [
    {
      id: '1',
      title: 'How to Build a React Application from Scratch',
      thumbnail: '/images/placeholder-thumbnail.jpg',
      duration: '24:35',
      views: '24.5K',
      engagement: '45%',
      status: 'published',
      publishedDate: '2023-10-15',
      metrics: {
        watchTime: '12:45',
        retention: '68%',
        ctr: '8.2%'
      },
      suggestions: [
        {
          title: 'Add chapters',
          description: 'Viewer retention drops after 8 minutes. Add chapters to help navigation.',
          icon: AlertCircle,
          priority: 'high'
        },
        {
          title: 'Optimize title',
          description: 'Include more specific keywords in your title for better discoverability.',
          icon: CheckCircle2,
          priority: 'medium'
        }
      ]
    },
    // Add more long form videos as needed
  ],
  shortForm: [
    {
      id: '2',
      title: 'Quick Tip: React Hooks Explained',
      thumbnail: '/images/placeholder-thumbnail.jpg',
      duration: '0:45',
      views: '56.2K',
      engagement: '72%',
      status: 'published',
      publishedDate: '2023-10-20',
      metrics: {
        watchTime: '0:38',
        retention: '84%',
        ctr: '12.5%'
      },
      suggestions: [
        {
          title: 'Add captions',
          description: '85% of viewers watch without sound. Add captions to increase engagement.',
          icon: AlertCircle,
          priority: 'high'
        },
        {
          title: 'Use trending audio',
          description: 'Try using currently trending audio to increase discoverability.',
          icon: CheckCircle2,
          priority: 'medium'
        }
      ]
    },
    // Add more short form videos as needed
  ]
}

export default function VideoOptimizationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/optimize">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Video Optimization</h1>
            <p className="text-muted-foreground">Analyze and optimize your video content</p>
          </div>
        </div>
        
        <Tabs defaultValue="longForm" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="longForm">Long Form</TabsTrigger>
              <TabsTrigger value="shortForm">Short Form</TabsTrigger>
            </TabsList>
            <Button>
              <Zap className="w-4 h-4 mr-2" />
              Optimize All
            </Button>
          </div>
          
          <TabsContent value="longForm" className="space-y-6">
            {videos.longForm.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover aspect-video"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{video.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-4">
                          <span>{video.views} views</span>
                          <span>•</span>
                          <span>{video.engagement} engagement</span>
                          <span>•</span>
                          <span>{video.publishedDate}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm">
                          <Zap className="w-4 h-4 mr-2" />
                          Optimize
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Avg. Watch Time
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{video.metrics.watchTime}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-green-500">+2.3%</span> from last week
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Retention Rate
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{video.metrics.retention}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-green-500">+5.1%</span> from last week
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Click-Through Rate
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{video.metrics.ctr}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-green-500">+1.8%</span> from last week
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {video.suggestions.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-3">Optimization Suggestions</h4>
                        <div className="space-y-3">
                          {video.suggestions.map((suggestion, index) => (
                            <div 
                              key={index}
                              className="flex items-start p-3 border rounded-lg bg-muted/30"
                            >
                              <suggestion.icon 
                                className={`h-5 w-5 mt-0.5 mr-3 ${
                                  suggestion.priority === 'high' 
                                    ? 'text-red-500' 
                                    : suggestion.priority === 'medium'
                                    ? 'text-amber-500'
                                    : 'text-green-500'
                                }`} 
                              />
                              <div>
                                <p className="font-medium">{suggestion.title}</p>
                                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="shortForm" className="space-y-6">
            {videos.shortForm.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover aspect-[9/16]"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{video.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-4">
                          <span>{video.views} views</span>
                          <span>•</span>
                          <span>{video.engagement} engagement</span>
                          <span>•</span>
                          <span>{video.publishedDate}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm">
                          <Zap className="w-4 h-4 mr-2" />
                          Optimize
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Avg. Watch Time
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{video.metrics.watchTime}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-green-500">+3.7%</span> from last week
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Retention Rate
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{video.metrics.retention}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-green-500">+6.2%</span> from last week
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Completion Rate
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{video.metrics.ctr}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-green-500">+4.1%</span> from last week
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {video.suggestions.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-3">Optimization Suggestions</h4>
                        <div className="space-y-3">
                          {video.suggestions.map((suggestion, index) => (
                            <div 
                              key={index}
                              className="flex items-start p-3 border rounded-lg bg-muted/30"
                            >
                              <suggestion.icon 
                                className={`h-5 w-5 mt-0.5 mr-3 ${
                                  suggestion.priority === 'high' 
                                    ? 'text-red-500' 
                                    : suggestion.priority === 'medium'
                                    ? 'text-amber-500'
                                    : 'text-green-500'
                                }`} 
                              />
                              <div>
                                <p className="font-medium">{suggestion.title}</p>
                                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
