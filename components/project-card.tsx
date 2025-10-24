"use client"

import { useEffect, useState } from "react"
import { getLatestTweet } from "@/app/actions/fetch-tweets"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface AppPreview {
  title: string
  description: string
  imageUrl: string
  link: string
}

export function ProjectCard() {
  const [tweet, setTweet] = useState<{ text: string; created_at: string } | null>(null)
  const [loading, setLoading] = useState(true)

  const appPreviews: AppPreview[] = [
    {
      title: "Uniperp – Perpetual DEX on Uniswap v4 🏆",
      description: "Built perps DEX using v4 hooks with vAMM, unified margin, funding rates, liquidation engine, and insurance fund. ETHGlobal New Delhi 2025 Winner & Finalist; Uniswap Partner Track Winner.",
      imageUrl: "uniperp.jpeg",
      link: "https://youtu.be/9XcA9woanBs?si=QsYPAanQRcfmp79h&t=880",
    },
    {
      title: "Soulboard – DePIN Ad Protocol 🚀",
      description: "DePIN ad protocol turning real-world ad spaces into verifiable RWAs. Solana × CoinDCX Grant - 1st in India, 4th globally at Colosseum Breakout.",
      imageUrl: "soulboard.png",
      link: "https://x.com/soulboardFdn",
    },
    {
      title: "MEVBuster – Flash Loan Defense Toolkit 🛡️",
      description: "Pre-trade sequencing protection with ZKVerify & EigenLayer AVS. Winner - ZKVerify Hackathon.",
      imageUrl: "mevbuster.png",
      link: "https://github.com/anon-pool-hook/app",
    },
    {
      title: "CaliSEC – Decentralized Secure Communication 🔐",
      description: "Zero-trust encrypted communication with zk-access policies and verifiable audit trails. Privacy-preserving secret-sharing protocol built on Calimero, ICP canisters and ZK proofs.",
      imageUrl: "calisec.png",
      link: "https://github.com/Team-Doraemon/CaliSEC-Protocol",
    },
    {
      title: "OmikoXBT – Twitter Agent for Mantra 🤖",
      description: "Autonomous Twitter agent executing actions based on signals; trading hooks & monitoring pipelines. Built for Mantra Chain.",
      imageUrl: "omikoxbt.png",
      link: "https://x.com/OMikoxbt",
    },
    {
      title: "DronaAI – AI‑Driven Adaptive Learning Platform 🎓",
      description: "Modular multi‑agent architecture delivering personalized learning journeys with RAG‑powered content adaptation.",
      imageUrl: "dronaai.png",
      link: "https://github.com/DronaAI/v1",
    },
  ];

  useEffect(() => {
    async function fetchTweet() {
      try {
        const latestTweet = await getLatestTweet()
        setTweet(latestTweet)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTweet()
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-800/50 p-4 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-20 bg-gray-700 rounded"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">My Latest Web3 Products</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => window.open("https://github.com/AnonO6", "_blank")}
        >
          <Github className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {appPreviews.map((app, index) => (
            <div key={index} className="bg-gray-700/50 p-4 rounded-lg neon-container">
              <Image
                src={app.imageUrl || "/placeholder.svg?height=300&width=200"}
                alt={app.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-white mb-2">{app.title}</h3>
              <Button
                variant="outline"
                className="w-full mt-auto bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                onClick={() => window.open(app.link, "_blank")}
              >
                Visit App
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
