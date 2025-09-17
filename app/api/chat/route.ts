import { NextRequest, NextResponse } from "next/server"
export const runtime = "nodejs"

// Simple intent router
function detectIntent(text: string, hint?: string) {
  const t = `${hint ?? ""} ${text}`.toLowerCase()
  if (t.includes("feedback")) return "feedback"
  if (t.includes("bug") || t.includes("issue") || t.includes("problem")) return "issue"
  if (t.includes("contact") || t.includes("owner") || t.includes("urgent")) return "contact"
  if (t.includes("guide") || t.includes("how") || t.includes("help")) return "guide"
  if (t.includes("lead") || t.includes("demo") || t.includes("pricing")) return "lead"
  return "faq"
}

async function callGemini(systemPrompt: string, userText: string) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    // No API key: strictly disable AI (no mock replies)
    throw new Error("GEMINI_UNAVAILABLE")
  }

  // Minimal REST call to Gemini 1.5 via Google AI Studio endpoint
  try {
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite-preview:generateContent";

    const res = await fetch(`${endpoint}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: `${systemPrompt}\n\nUser: ${userText}` }] },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 512,
        },
      }),
    })
    if (!res.ok) throw new Error(await res.text())
    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response."
    return text
  } catch (e: any) {
    console.error("Gemini error", e?.message || e)
    return "I had trouble generating a response just now. Please try again."
  }
}

export async function POST(req: NextRequest) {
  const { message, intent: hinted } = await req.json()
  const text: string = String(message ?? "").slice(0, 4000)
  // Enhance intent detection with more patterns
  const enhancedText = `${hinted || ''} ${text}`.toLowerCase()
  let intent = detectIntent(enhancedText, hinted)
  
  // Enhance detection with more patterns
  if (enhancedText.includes('how to') || 
      enhancedText.includes('how do i') || 
      enhancedText.includes('tutorial')) {
    intent = 'guide'
  } else if (enhancedText.match(/price|plan|pricing|subscribe|upgrade|downgrade/)) {
    intent = 'pricing'
  } else if (enhancedText.match(/feature|functionality|tool|capabilit/)) {
    intent = 'feature'
  } else if (enhancedText.match(/new|start|begin|onboard/)) {
    intent = 'onboarding'
  }

  const CONTACT_PAGE = "/contact"
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL || ""

  // Lightweight site map to help the assistant link users directly.
  const siteMap = [
    { label: "Home Dashboard", path: "/home-dashboard", description: "Your personalized dashboard with analytics and quick actions" },
    { label: "Discover", path: "/discover", description: "Find trending content and topics in your industry" },
    { label: "Keywords", path: "/keywords", description: "Research and analyze keywords for better content strategy" },
    { label: "AI Trend", path: "/ai-trend", description: "Get AI-powered insights on current and emerging trends" },
    { label: "Optimize", path: "/optimize", description: "Tools to optimize your content and online presence" },
    { label: "Upgrade", path: "/upgrade", description: "View and upgrade your subscription plan" },
    { label: "Profile", path: "/profile", description: "Manage your account settings and preferences" },
    { label: "Donate", path: "/donate", description: "Support our platform and help us improve" },
    { label: "Login", path: "/auth/login", description: "Sign in to your NexTrend account" },
    { label: "Sign Up", path: "/auth/signup", description: "Create a new NexTrend account" },
    { label: "About", path: "/about", description: "Learn more about NexTrend and our mission" },
    { label: "Documentation", path: "/docs", description: "Detailed guides and API documentation" },
    { label: "Contact Support", path: CONTACT_PAGE, description: "Get help from our support team" },
  ]

  // Comprehensive knowledge about NexTrend
  const nexTrendKnowledge = `
  NexTrend is an AI-powered platform that helps users discover trending content, analyze keywords, and optimize their online presence. Here are the key features and pages:

  1. Home Dashboard (/home-dashboard) - Overview of your analytics and performance
  2. Discover (/discover) - Find trending topics and content in your niche
  3. Keywords (/keywords) - Research and analyze keywords for better SEO
  4. AI Trend (/ai-trend) - Get AI-generated insights on current trends
  5. Optimize (/optimize) - Tools to optimize your content and online presence
  6. Profile (/profile) - Manage your account and settings
  7. Upgrade (/upgrade) - View and manage your subscription plans
  8. Donate (/donate) - Support our platform

  Common tasks users can perform:
  - Track content performance
  - Find trending topics
  - Get content recommendations
  - Analyze competitors
  - Generate SEO-optimized content
  - Monitor social media trends
  - Get AI-powered insights
  `

  const system = `You are the NexTrend AI assistant. Your purpose is to help users navigate and get the most out of the NexTrend platform. Follow these guidelines:

  1. Answer questions about NexTrend's features, pricing, and how to use the platform
  2. Be concise and helpful - keep responses under 150 words unless more detail is needed
  3. Use markdown formatting for better readability (bold, lists, links)
  4. If you don't know something, say so and direct them to contact support
  5. For account-specific issues, guide them to the appropriate settings page
  6. If they're asking about features, explain how to access and use them
  7. For technical issues, gather necessary details before suggesting solutions
  8. Always be polite, professional, and enthusiastic about helping

  Here's what you know about NexTrend:
  ${nexTrendKnowledge}

  Available pages (always include the full URL when referring to them):
  ${siteMap.map(s => `- ${s.label}: ${s.path}`).join('\n')}
  `

  // Pre-bias the prompt a bit based on intent
  const prefaceMap: Record<string, string> = {
    feedback: "The user wants to provide feedback about NexTrend. Be appreciative and ask for details about their experience.",
    issue: "The user is reporting an issue. Ask for specific details like what they were doing, what happened, and what they expected to happen. Also ask about their device/browser and any error messages.",
    contact: "The user wants to contact support. Provide the contact information and let them know what to expect in terms of response time.",
    guide: "The user needs guidance on using NexTrend. Provide clear, step-by-step instructions. If relevant, mention specific features they should use.",
    faq: "The user has a general question about NexTrend. Provide a concise, helpful answer. If the question is about features, explain how to access and use them.",
    lead: "The user might be interested in becoming a customer. Ask qualifying questions to understand their needs and direct them to the most relevant features or pricing page.",
    feature: "The user is asking about specific features. Explain what the feature does, how to use it, and its benefits. Provide examples if helpful.",
    pricing: "The user has questions about pricing. Be transparent about the different plans and what's included in each. If they're on a free plan, mention the benefits of upgrading.",
    onboarding: "The user is new to NexTrend. Provide a warm welcome and guide them through the first steps to get started.",
  }

  const preface = prefaceMap[intent] || prefaceMap.faq
  let reply: string
  try {
    reply = await callGemini(`${system}\n\nContext: ${preface}`, text)
  } catch (err: any) {
    if (String(err?.message) === "GEMINI_UNAVAILABLE") {
      return NextResponse.json(
        { intent, reply: "The assistant is temporarily unavailable. Please try again later or contact us at /contact." },
        { status: 503 }
      )
    }
    return NextResponse.json(
      { intent, reply: "I had trouble replying. Please try again." },
      { status: 500 }
    )
  }

  // Minimal analytics placeholder
  console.log("chat_analytics", { intent, text: text.slice(0, 200) })

  return NextResponse.json({ intent, reply })
}

export async function GET() {
  return NextResponse.json({ ok: true })
}
