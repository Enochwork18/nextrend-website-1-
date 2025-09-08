"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, type Variants } from "framer-motion" // Import motion

export function HeroSection() {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const texts = [
    "Discover trending niches",
    "Create viral content", 
    "Grow your audience"
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex]
      
      if (!isDeleting) {
        if (currentText.length < current.length) {
          setCurrentText(current.substring(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(current.substring(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations for child elements
        delayChildren: 0.3, // Delay the start of child animations
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] } },
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
            <span className="block mb-2">{currentText}</span>
            <span className="animate-pulse">|</span>
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
            <Link href="/auth/signup" prefetch={false}>
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
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hidden lg:flex flex-col items-center justify-center"
          variants={itemVariants}
        >
          <div className="w-full aspect-video bg-black/30 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
            <video 
              className="w-full h-full object-cover rounded-lg"
              autoPlay 
              muted 
              loop
              poster="/images/content-example-1.jpeg"
            >
              <source src="/placeholder-video.mp4" type="video/mp4" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                  <p className="text-sm text-gray-300">Video Preview</p>
                </div>
              </div>
            </video>
          </div>
          <h3 className="text-lg font-semibold text-center">EQ Techno</h3>
          <p className="text-sm text-gray-300 text-center mt-2">See how our AI identifies trending content</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
