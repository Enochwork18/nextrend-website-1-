"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Search, Filter, Play, Eye, ThumbsUp, Clock, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { TrendingVideo } from "@/types"
import { trendingVideos } from "@/lib/mockData"
import { useDebounce } from "@/hooks/useDebounce"
import { useRouter, useSearchParams } from "next/navigation"

// Helper function to convert timeAgo string to a date
const timeAgoToDate = (timeAgo: string): Date => {
  const now = new Date();
  const timeAgoLower = timeAgo.toLowerCase();

  if (timeAgoLower === 'today') {
    return now;
  } else if (timeAgoLower.includes('day')) {
    const days = parseInt(timeAgoLower.split(' ')[0]);
    now.setDate(now.getDate() - days);
    return now;
  } else if (timeAgoLower.includes('week')) {
    const weeks = parseInt(timeAgoLower.split(' ')[0]);
    now.setDate(now.getDate() - (weeks * 7));
    return now;
  } else if (timeAgoLower.includes('month')) {
    const months = parseInt(timeAgoLower.split(' ')[0]);
    now.setMonth(now.getMonth() - months);
    return now;
  } else if (timeAgoLower.includes('year')) {
    const years = parseInt(timeAgoLower.split(' ')[0]);
    now.setFullYear(now.getFullYear() - years);
    return now;
  }

  return now; // Default to now if format is unrecognized
};

export default function DiscoverContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'all')
  const [duration, setDuration] = useState(searchParams.get('duration') || 'all')
  const [outlierScore, setOutlierScore] = useState(searchParams.get('outlierScore') || 'all')
  const [views, setViews] = useState(searchParams.get('views') || 'all')
  const [published, setPublished] = useState(searchParams.get('published') || 'all')
  const [videoType, setVideoType] = useState(searchParams.get('videoType') || 'videos')
  const [filteredVideos, setFilteredVideos] = useState(trendingVideos)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedSearchTerm) params.set('search', debouncedSearchTerm)
    if (category !== 'all') params.set('category', category)
    if (duration !== 'all') params.set('duration', duration)
    if (outlierScore !== 'all') params.set('outlierScore', outlierScore)
    if (views !== 'all') params.set('views', views)
    if (published !== 'all') params.set('published', published)
    if (videoType !== 'videos') params.set('videoType', videoType)
    router.push(`?${params.toString()}`)
  }, [debouncedSearchTerm, category, duration, outlierScore, views, published, videoType, router])

  useEffect(() => {
    let videos = trendingVideos.filter(video => {
      const searchTermMatch = video.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      const categoryMatch = category === 'all' || video.tags.includes(category)
      const durationMatch = duration === 'all' || 
        (duration === 'short' && video.durationMinutes < 5) ||
        (duration === 'medium' && video.durationMinutes >= 5 && video.durationMinutes <= 15) ||
        (duration === 'long' && video.durationMinutes > 15);

      const outlierScoreValue = parseInt(video.outlierScore);
      const outlierScoreMatch = outlierScore === 'all' || 
        (!isNaN(outlierScoreValue) && (
          (outlierScore === 'high' && outlierScoreValue >= 100) ||
          (outlierScore === 'medium' && outlierScoreValue >= 10 && outlierScoreValue < 100) ||
          (outlierScore === 'low' && outlierScoreValue < 10)
        ));

      const viewsMatch = views === 'all' ||
        (views === 'viral' && parseInt(video.views.replace(/,/g, '')) >= 1000000) ||
        (views === 'popular' && parseInt(video.views.replace(/,/g, '')) >= 100000 && parseInt(video.views.replace(/,/g, '')) < 1000000) ||
        (views === 'growing' && parseInt(video.views.replace(/,/g, '')) >= 10000 && parseInt(video.views.replace(/,/g, '')) < 100000) ||
        (views === 'emerging' && parseInt(video.views.replace(/,/g, '')) < 10000);

      const videoDate = timeAgoToDate(video.timeAgo);
      const now = new Date();
      const publishedMatch = published === 'all' ||
        (published === 'today' && videoDate.toDateString() === now.toDateString()) ||
        (published === 'week' && now.getTime() - videoDate.getTime() <= 7 * 24 * 60 * 60 * 1000) ||
        (published === 'month' && now.getTime() - videoDate.getTime() <= 30 * 24 * 60 * 60 * 1000);

      const videoTypeMatch = videoType === 'videos' && video.videoType === 'video' ||
        videoType === 'shorts' && video.videoType === 'short' ||
        videoType === 'thumbnails' && video.videoType === 'thumbnail';

      return searchTermMatch && categoryMatch && durationMatch && outlierScoreMatch && viewsMatch && publishedMatch && videoTypeMatch;
    })
    setFilteredVideos(videos)
  }, [debouncedSearchTerm, category, duration, outlierScore, views, published, videoType])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title="Discover"
          description="Discover winning ideas to inspire your next video"
          imageUrl="/images/docs-header.jpeg"
        />

        <section className="py-8 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            {/* Search and Filters */}
            <div className="mb-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search videos..."
                    className="pl-10 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>

              {/* Filter Controls */}
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Durations</SelectItem>
                      <SelectItem value="short">Under 5 min</SelectItem>
                      <SelectItem value="medium">5-15 min</SelectItem>
                      <SelectItem value="long">Over 15 min</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={outlierScore} onValueChange={setOutlierScore}>
                    <SelectTrigger>
                      <SelectValue placeholder="Outlier Score" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Scores</SelectItem>
                      <SelectItem value="high">100x+</SelectItem>
                      <SelectItem value="medium">10x-100x</SelectItem>
                      <SelectItem value="low">Under 10x</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={views} onValueChange={setViews}>
                    <SelectTrigger>
                      <SelectValue placeholder="Views" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Views</SelectItem>
                      <SelectItem value="viral">1M+ Views</SelectItem>
                      <SelectItem value="popular">100K-1M Views</SelectItem>
                      <SelectItem value="growing">10K-100K Views</SelectItem>
                      <SelectItem value="emerging">Under 10K Views</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={published} onValueChange={setPublished}>
                    <SelectTrigger>
                      <SelectValue placeholder="Published" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant={videoType === 'videos' ? 'default' : 'outline'} size="sm" onClick={() => setVideoType('videos')}>Videos</Button>
                  <Button variant={videoType === 'shorts' ? 'default' : 'outline'} size="sm" onClick={() => setVideoType('shorts')}>Shorts</Button>
                  <Button variant={videoType === 'thumbnails' ? 'default' : 'outline'} size="sm" onClick={() => setVideoType('thumbnails')}>Thumbnails</Button>
                </div>
              </div>
            </div>

            {/* Trending Videos Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending Videos</h2>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Spot outliers while browsing YouTube!
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video: TrendingVideo, index: number) => (
                  <motion.div
                    key={video.id}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800">
                      <div className="relative">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          width={400}
                          height={225}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                          {video.outlierScore}
                        </Badge>
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white">
                          {video.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {video.channel} • {video.subscribers} subs
                        </CardDescription>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700 dark:text-gray-300">{video.views}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700 dark:text-gray-300">{video.engagement}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700 dark:text-gray-300">{video.viewsPerHour}/hr</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700 dark:text-gray-300">{video.timeAgo}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {video.tags.map((tag: string, tagIndex: number) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')}>
                            Open in YouTube
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => router.push('/create')}>
                            Remix
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
