"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { HelpCircle, Send, MessageCircle, X, Zap, AlertTriangle, Phone } from "lucide-react"
import Link from "next/link"

type ChatMsg = { role: "user" | "assistant"; content: string }

const MessageBubble = ({ role, content }: { role: "user" | "assistant"; content: string }) => (
  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
    role === "user"
      ? "ml-auto bg-gradient-to-br from-purple-600 to-purple-700 text-white"
      : "mr-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
  }`}>
    {content}
  </div>
)

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMsg[]>([
    { 
      role: "assistant", 
      content: "Hello! I'm your NexTrend assistant. I can help you with any questions about our platform, features, or content. What would you like to know?" 
    },
  ])
  const [loading, setLoading] = useState(false)
  const [showBugForm, setShowBugForm] = useState(false)
  const [bugName, setBugName] = useState("")
  const [bugEmail, setBugEmail] = useState("")
  const [bugDesc, setBugDesc] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [showNudge, setShowNudge] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Would come from your auth context
  const [currentPage, setCurrentPage] = useState("Home") // Track current page for context
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [open, messages])

  useEffect(() => {
    const timer = setTimeout(() => setShowNudge(true), 1500)
    const autoHide = setTimeout(() => setShowNudge(false), 8000)
    return () => {
      clearTimeout(timer)
      clearTimeout(autoHide)
    }
  }, [])

  const send = async (text: string, intent?: string) => {
    if (!text.trim()) return
    
    const userMsg: ChatMsg = { role: "user", content: text }
    setMessages(m => [...m, userMsg])
    setInput("")
    setLoading(true)
    
    // Handle common questions
    const lowerText = text.toLowerCase()
    if (lowerText.includes("where am i") || lowerText.includes("what page is this") || lowerText.includes("current page")) {
      setMessages(m => [...m, { 
        role: "assistant", 
        content: `You're currently on the ${currentPage} page of the NexTrend platform.` 
      }])
      setLoading(false)
      return
    }
    
    // Handle greetings
    if (["hi", "hello", "hey"].some(greeting => lowerText.includes(greeting))) {
      setMessages(m => [...m, { 
        role: "assistant", 
        content: `Hello! I'm the NexTrend assistant. I can help you with questions about our platform, content, or features. What would you like to know?` 
      }])
      setLoading(false)
      return
    }
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL || '/api/chat';
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: text, 
          intent,
          context: {
            currentPage,
            isAuthenticated
          }
        }),
      })
      const data = await res.json()
      const reply = data?.reply || "Thanks for your message! I'll get back to you soon."
      setMessages(m => [...m, { role: "assistant", content: reply }])
    } catch (e) {
      setMessages(m => [
        ...m,
        { role: "assistant", content: "I'm having trouble connecting right now. Please try again in a moment." },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Get quick actions from environment or use defaults
  const quickActions = [
    { label: "Get Help", icon: HelpCircle, prompt: "I need help with...", intent: "help" },
    { label: "Report Issue", icon: AlertTriangle, prompt: "I'm having an issue with...", intent: "issue" },
    { label: "Quick Tips", icon: Zap, prompt: "Show me some quick tips", intent: "tips" },
    { label: "Contact Us", icon: Phone, prompt: "I'd like to contact support", intent: "contact" },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 relative group"
          >
            <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
            {!open && !showNudge && (
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                <span>1</span>
              </div>
            )}
          </Button>
        </SheetTrigger>

        {showNudge && !open && (
          <div className="absolute bottom-16 right-0 w-64 bg-white/90 backdrop-blur-lg rounded-xl p-3 shadow-xl border border-gray-200 animate-fade-in">
            <div className="flex items-start gap-2">
              <div className="bg-blue-100 p-1.5 rounded-lg">
                <MessageCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Need help?</p>
                <p className="text-xs text-gray-600 mt-0.5">We're here to assist you!</p>
              </div>
              <button 
                onClick={() => setShowNudge(false)}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <SheetContent side="right" className="w-full max-w-md p-0 flex flex-col bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
          <SheetHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <SheetTitle className="text-lg font-semibold">NexTrend Assistant</SheetTitle>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white/80 hover:bg-white/20 hover:text-white"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Quick Actions */}
          <div className="px-4 pb-3 grid grid-cols-2 gap-2">
            {quickActions.map((qa) => (
              <button
                key={qa.label}
                className="justify-start bg-gray-800 border border-gray-700 hover:bg-gray-700 h-9 rounded-md px-3 text-sm flex items-center transition-colors"
                onClick={() => {
                  if (qa.intent === "issue") {
                    setShowBugForm(true)
                  } else {
                    send(qa.prompt, qa.intent)
                  }
                }}
              >
                <qa.icon className="h-4 w-4 mr-2" /> {qa.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900" ref={scrollRef}>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
              Today
            </div>
            {messages.map((msg, i) => (
              <MessageBubble key={i} role={msg.role} content={msg.content} />
            ))}
            {loading && (
              <div className="flex items-center justify-start space-x-2 mr-auto">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          {/* Bug Report Form */}
          {showBugForm && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 mt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Report an Issue</h3>
                <button 
                  onClick={() => setShowBugForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                <Input
                  placeholder="Your name"
                  value={bugName}
                  onChange={(e) => setBugName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Input
                  placeholder="Email address"
                  type="email"
                  value={bugEmail}
                  onChange={(e) => setBugEmail(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Textarea
                  placeholder="Describe the issue..."
                  rows={3}
                  value={bugDesc}
                  onChange={(e) => setBugDesc(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-300 flex items-center">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="h-4 w-4 text-purple-500 rounded border-gray-600 bg-gray-700 mr-2"
                    />
                    Urgent issue
                  </label>
                  <Button
                    onClick={async () => {
                      if (!bugName.trim() || !bugEmail.trim() || !bugDesc.trim()) return;
                      
                      try {
                        const res = await fetch("/api/feedback", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ 
                            name: bugName, 
                            email: bugEmail, 
                            description: bugDesc, 
                            type: "issue", 
                            severity: isUrgent ? "urgent" : "normal" 
                          }),
                        });
                        
                        const data = await res.json();
                        setShowBugForm(false);
                        setBugName("");
                        setBugEmail("");
                        setBugDesc("");
                        setIsUrgent(false);
                        
                        setMessages(m => [
                          ...m, 
                          { 
                            role: "assistant", 
                            content: data?.ok 
                              ? "Thank you for reporting the issue! We'll look into it and get back to you soon."
                              : "We received your report but encountered an issue. Please try again later."
                          }
                        ]);
                      } catch (e) {
                        setMessages(m => [
                          ...m,
                          { role: "assistant", content: "Couldn't submit the report right now. Please try again." },
                        ]);
                      }
                    }}
                    disabled={!bugName.trim() || !bugEmail.trim() || !bugDesc.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Submit Report
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Input */}
          <form
            className="flex gap-2 p-4 border-t border-gray-800"
            onSubmit={(e) => {
              e.preventDefault()
              if (showBugForm) return // disable text send while form is open
              send(input)
            }}
          >
            <Input
              placeholder={showBugForm ? "Close the form to continue chat" : "Type your message…"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={showBugForm}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 flex-1"
            />
            <Button 
              type="submit" 
              disabled={loading || !input.trim() || showBugForm} 
              className="bg-blue-600 hover:bg-blue-700"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
