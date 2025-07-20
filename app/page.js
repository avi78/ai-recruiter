"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/services/supabaseClient"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function Home() {
  const router = useRouter()

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (data?.session) {
        router.replace("/dashboard")
      }
    }
    checkSession()
  }, [router])

  const features = [
    {
      title: "AI-Powered Interviews",
      desc: "Conduct natural voice interviews 24/7 with zero human effort.",
    },
    {
      title: "Automated Screening",
      desc: "Instantly shortlist qualified candidates using smart summaries.",
    },
    {
      title: "ATS Integration",
      desc: "Sync with job boards, calendars, and ATS tools effortlessly.",
    },
    {
      title: "Real-Time Insights",
      desc: "Get transcripts, candidate scores, and analytics in real-time.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f1f5f9] via-[#e2e8f0] to-[#f8fafc] px-6 py-12">
      {/* HERO */}
      <div className="text-center flex flex-col items-center justify-center space-y-6 mb-6">
        <Image
          src="/logo.png"
          alt="NeuroHire Logo"
          width={140}
          height={140}
          className="rounded-xl bg-white p-2 shadow-md"
        />
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-black to-gray-800 text-transparent bg-clip-text">
          NeuroHire
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Revolutionizing recruitment with AI-powered voice interviews — hire smarter, faster, and at scale.
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:brightness-110 transition"
          onClick={() => router.push("/auth")}
        >
          🚀 Get Started
        </Button>
      </div>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-4">
          🌟 Why Choose NeuroHire?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={cn(
                "p-6 rounded-xl border backdrop-blur-md bg-white/60 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 group"
              )}
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-indigo-600 transition">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
