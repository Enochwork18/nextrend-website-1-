"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion" // Import motion

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleGenerateSearch = () => {
    if (searchQuery.trim()) {
      // Frontend Simulation: Redirect to a search results page.
      // For backend integration: Replace this with an API call to your search service.
      // Example: const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      // Then process the response and display actual results.
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations for child elements
        delayChildren: 0.3, // Delay the start of child animations
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-white overflow-hidden">
      <Image
        src="/images/hero-background-new.jpeg"
        alt="Automate Your Social Media"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 to-gray-950/70 z-10" />
      <motion.div
        className="relative z-20 container px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-2xl text-center lg:text-left">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            variants={itemVariants}
          >
            Discover Trending Niches. Create Viral Content. Grow Your Audience.
          </motion.h1>
          <motion.p className="mt-4 text-lg md:text-xl text-gray-200" variants={itemVariants}>
            NexTrend is an AI-powered platform that identifies trending niches and topics across social media platforms
            like YouTube and TikTok. It helps creators, marketers, and businesses discover fast-rising trends before
            they go mainstream.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <Link href="/auth/login" prefetch={false}>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-full">
                Get Started
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/20 px-8 py-3 rounded-full bg-transparent"
              onClick={() => scrollToSection("detailed-features-section")}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hidden lg:block"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold mb-4">Try generating content ideas</h3>
          <div className="space-y-4">
            <div className="bg-white/20 rounded-lg p-3 text-sm text-gray-200">
              <p>Prompt: "Give me trending ideas for short-form video content about sustainable living."</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-sm text-gray-200">
              <p>
                Response: "1. DIY upcycled furniture. 2. Zero-waste cooking tips. 3. Composting for beginners. 4.
                Sustainable fashion hauls."
              </p>
            </div>
            <Input
              placeholder="Type your prompt here..."
              className="w-full bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:ring-yellow-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault() // Prevent form submission
                  handleGenerateSearch()
                }
              }}
            />
            <Button
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
              onClick={handleGenerateSearch}
            >
              Generate
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
