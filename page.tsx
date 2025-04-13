"use client"

import { useEffect, useState } from "react"
import { Twitter, Music, User, Mail, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { DonationWallet } from "@/components/donation-wallet"

export default function Page() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-Xat6V9tsqzkJxJBpWpluR9z3034hcG.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 min-h-screen bg-black bg-opacity-70 flex flex-col">
        {/* Header */}
        <header className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            AnonO6
          </h1>
          <ConnectWalletButton />
        </header>

        {/* Main content */}
        <div className="flex-grow flex flex-col md:flex-row p-4 gap-4">
          {/* Left sidebar */}
          <div className="md:w-1/3 space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">About Me</h2>
              <p className="text-gray-300"></p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Interests</h2>
              <ul className="list-disc list-inside text-gray-300">
                <li>Digital Art</li>
                <li>Cyberpunk Culture</li>
                <li>AI and Technology</li>
              </ul>
            </div>
          </div>

          {/* Main content area */}
          <div className="md:w-2/3 space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Welcome to My Digital Realm</h2>
              <p className="text-gray-300">
                Step into a world where the boundaries between reality and the digital realm blur. Here, we explore the
                endless possibilities of our interconnected existence.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Latest Update</h2>
              <p className="text-gray-300">
                Diving deep into the cybernetic abyss. What secrets will we uncover in the depths of the digital ocean?
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Music className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Link className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white"
              onClick={() => window.open("https://x.com/0xanonviral", "_blank")}
            >
              <Twitter className="mr-2 h-4 w-4" />
              Follow on X
            </Button>
            <DonationWallet />
            <a href="/wallet-connect" className="text-xs text-gray-400 hover:text-gray-300">
              Use Direct Wallet Connect
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
