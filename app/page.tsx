"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { User, Mail, Github, Code, Zap, Cpu, Award, Trophy, Briefcase, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { HireMeButton } from "@/components/hire-me-button";
import "./globals.css";
import AnimatedTitle from "@/components/AnimatedTitle";
import { AboutMe } from "@/components/about-me";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import Link from "next/link";

// Lazy load non-critical components
// Import these directly instead of lazy loading
import { YouTubePlayer } from "@/components/youtube-player";
import { MusicChannelsModal } from "@/components/music-channels-modal";
import { DonationWallet } from "@/components/donation-wallet";
import { MobileGameInterface } from "@/components/mobile-game-interface";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Delay loading the background video
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Early return with a simple loading state
  if (!mounted) return <div className="min-h-screen bg-gray-900"></div>;
  
  // Show mobile game interface on mobile devices
  if (isMobile) {
    return <MobileGameInterface />;
  }

  const socialLinks = [
    {
      name: "X",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xlogo-Fwn7X47giSDmXJ2nAcUEtVAne4mRCN.png",
      url: "https://x.com/0xanonviral",
    },
    {
      name: "GitHub",
      icon: "/placeholder.svg?height=24&width=24",
      url: "https://github.com/AnonO6",
    },
    {
      name: "Telegram",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tglogo-9OS2uQ9ftYXkbACJHGwgQif0GAcBHr.png",
      url: "https://t.me/anonviral",
    },
    {
      name: "LinkedIn",
      icon: "https://img.icons8.com/?size=100&id=13930&format=png&color=000000",
      url: "https://www.linkedin.com/in/aviral-shukla-85b112228",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
      {/* Conditionally render video based on state */}
      {showVideo && (
        <div className="fixed top-0 left-0 w-full h-full">
          {/* Apply low-resolution video for mobile devices */}
          {/* Mobile optimized background is recommended but optional */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="/background-poster.jpg"
            >
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-Xat6V9tsqzkJxJBpWpluR9z3034hcG.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
        </div>
      )}

      <div className="relative z-10 min-h-screen bg-black bg-opacity-70 flex flex-col">
        {/* Header */}
        <header className="p-4 border-b border-gray-700 flex justify-between items-center">
          <div className="w-full max-w-md">
            <AnimatedTitle text="AVIRAL SHUKLA" />
          </div>
          <div className="flex items-center space-x-4 header-buttons">
            <MusicChannelsModal />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open("https://github.com/AnonO6", "_blank")}
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open(
                  "https://x.com/messages/compose?recipient_id=0xanonviral",
                  "_blank"
                )
              }
            >
              <Mail className="h-4 w-4" />
            </Button>
            <ConnectWalletButton />
            <HireMeButton />
          </div>
        </header>

        {/* Main content */}
        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          {/* Left sidebar - fixed on larger screens */}
          <motion.div
            className="w-full lg:w-1/4 xl:w-1/5 space-y-4 p-4 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto lg:fixed lg:top-20 lg:left-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-800/50 p-4 rounded-lg space-y-4 neon-container">
              <div className="relative w-3/5 mx-auto aspect-square overflow-hidden rounded-lg">
                <Image
                  src="web3profile.png"
                  alt="Profile"
                  width={150}
                  height={150}
                  className="object-cover"
                  priority
                />
              </div>
              <p className="text-center text-xl">
                ∃x∈{"{ZK,DePIN,DeFi}"}: Prover(x) = true
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-800 text-white">
                  <Zap className="h-3 w-3 mr-1" />
                  ZK
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-800 text-white">
                  <Cpu className="h-3 w-3 mr-1" />
                  DePIN
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-800 text-white">
                  <Code className="h-3 w-3 mr-1" />
                  DeFi
                </span>
              </div>
            </div>

            <div className="bg-gray-800/50 p-4 pt-2 rounded-lg neon-container-light">
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
                  >
                    <Image
                      src={link.icon || "/placeholder.svg?height=24&width=24"}
                      alt={link.name}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <span className="text-sm">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Lazy load YouTubePlayer */}
            <div className="rounded-lg overflow-hidden">
              {mounted && <YouTubePlayer />}
            </div>
            
            {/* Lazy load DonationWallet on desktop */}
            <div className="hidden lg:block rounded-lg overflow-hidden">
              {mounted && <DonationWallet />}
            </div>
          </motion.div>

          {/* Main content area - scrollable on all screens */}
          <motion.div
            className="w-full lg:w-3/4 xl:w-4/5 space-y-4 p-4 lg:ml-[25%] xl:ml-[20%] overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-gray-800/50 p-4 rounded-lg neon-container">
              <div className="relative w-full aspect-[3/1] rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1500x500-I2rDjY22tK2hLCywnkBcAPaWJErMTt.jpeg"
                  alt="Aviral Shukla Banner"
                  width={1200}
                  height={400}
                  className="object-cover object-center w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/70 flex items-center justify-center">
                  <div className="text-center">
                    <h1
                      className="text-4xl md:text-5xl font-bold text-white mb-2"
                      style={{
                        textShadow: "0 0 10px #fff, 0 0 20px #00c3ff",
                      }}
                    >
                      I build :- )
                    </h1>
                    <p className="text-xl text-cyan-300">
                      Proud Engineer 🥹. I save the world in my dreams from AGI.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-gray-800/50 p-6 rounded-lg neon-container">
              <h2
                className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2"
                style={{
                  textShadow: "0 0 10px #fff, 0 0 20px #ffd700",
                }}
              >
                <Trophy className="h-6 w-6 text-yellow-400" />
                Latest Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-4 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all">
                  <div className="flex items-start gap-3">
                    <Trophy className="h-6 w-6 text-yellow-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-yellow-300">ETHGlobal New Delhi 2025</h3>
                      <p className="text-sm text-gray-300 mt-1">Winner & Finalist for Uniperp</p>
                      <p className="text-xs text-purple-300 mt-1">🏆 Uniswap Partner Track Winner</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-4 rounded-lg border border-blue-500/30 hover:border-blue-500/60 transition-all">
                  <div className="flex items-start gap-3">
                    <Award className="h-6 w-6 text-blue-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-blue-300">Solana × CoinDCX Grant</h3>
                      <p className="text-sm text-gray-300 mt-1">Soulboard DePIN Protocol</p>
                      <p className="text-xs text-cyan-300 mt-1">🥇 1st in India, 4th Globally at Colosseum Breakout</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-4 rounded-lg border border-green-500/30 hover:border-green-500/60 transition-all">
                  <div className="flex items-start gap-3">
                    <Trophy className="h-6 w-6 text-green-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-green-300">ZKVerify Hackathon</h3>
                      <p className="text-sm text-gray-300 mt-1">MEVBuster - Flash Loan Defense</p>
                      <p className="text-xs text-emerald-300 mt-1">🥇 1st Place Winner</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 p-4 rounded-lg border border-orange-500/30 hover:border-orange-500/60 transition-all">
                  <div className="flex items-start gap-3">
                    <Code className="h-6 w-6 text-orange-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-orange-300">Protocol Labs Dev Guide</h3>
                      <p className="text-sm text-gray-300 mt-1">Cohort 3 Contributor</p>
                      <p className="text-xs text-red-300 mt-1">🛠️ Contributed to Lighthouse Protocol</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="bg-gray-800/50 p-6 rounded-lg neon-container">
              <h2
                className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2"
                style={{
                  textShadow: "0 0 10px #fff, 0 0 20px #00c3ff",
                }}
              >
                <Briefcase className="h-6 w-6 text-cyan-400" />
                Professional Experience
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-purple-500 hover:bg-gray-700/70 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-purple-300">Co-founder, Protocol/IoT Lead</h3>
                      <p className="text-cyan-400 font-semibold">Soulboard</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>2024 - Present</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">
                    Designed a DePIN ad protocol turning real-world ad spaces into verifiable RWAs. IoT Proof-of-Views (ESP32-CAM + GoCV) 
                    and Proof-of-Taps (ESP32 + PN532) stream to on-chain oracle for performance-based payouts.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 bg-purple-800/50 rounded text-xs">Solana</span>
                    <span className="px-2 py-1 bg-purple-800/50 rounded text-xs">IoT</span>
                    <span className="px-2 py-1 bg-purple-800/50 rounded text-xs">DePIN</span>
                    <span className="px-2 py-1 bg-purple-800/50 rounded text-xs">ESP32</span>
                  </div>
                </div>

                <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-blue-500 hover:bg-gray-700/70 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-blue-300">Founder - Perpetual DEX</h3>
                      <p className="text-cyan-400 font-semibold">Uniperp</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>2025</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">
                    Built a perps DEX using v4 hooks with vAMM, unified margin, funding rates, liquidation engine, and insurance fund. 
                    Added median price correction and MEV/flash-loan defenses. Integrated Pyth Oracles.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 bg-blue-800/50 rounded text-xs">Solidity</span>
                    <span className="px-2 py-1 bg-blue-800/50 rounded text-xs">Uniswap v4</span>
                    <span className="px-2 py-1 bg-blue-800/50 rounded text-xs">DeFi</span>
                    <span className="px-2 py-1 bg-blue-800/50 rounded text-xs">Foundry</span>
                  </div>
                </div>

                <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-green-500 hover:bg-gray-700/70 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-green-300">Software Developer</h3>
                      <p className="text-cyan-400 font-semibold">Chatarmin</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Jun 2025 - Present</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">
                    Implementing automated AI workflow triggers for enhanced process automation. Full-stack end-to-end development 
                    across the entire application architecture. Project management, new channel integrations, database optimization, and frontend performance tuning.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 bg-green-800/50 rounded text-xs">TypeScript</span>
                    <span className="px-2 py-1 bg-green-800/50 rounded text-xs">Next.js</span>
                    <span className="px-2 py-1 bg-green-800/50 rounded text-xs">AI Workflows</span>
                    <span className="px-2 py-1 bg-green-800/50 rounded text-xs">Full-Stack</span>
                  </div>
                </div>

                <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-yellow-500 hover:bg-gray-700/70 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-yellow-300">Contributor</h3>
                      <p className="text-cyan-400 font-semibold">Open Source - Protocol Labs & Uniswap</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>2024 - Present</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">
                    Protocol Labs Dev Guide Cohort 3; contributed to Lighthouse with reliability/performance optimizations. 
                    Uniswap Foundation Ambassador; v4 hooks education & integration support.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 bg-yellow-800/50 rounded text-xs">IPFS</span>
                    <span className="px-2 py-1 bg-yellow-800/50 rounded text-xs">Lighthouse</span>
                    <span className="px-2 py-1 bg-yellow-800/50 rounded text-xs">Uniswap v4</span>
                    <span className="px-2 py-1 bg-yellow-800/50 rounded text-xs">Ambassador</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Web2 Portfolio Section */}
            <div className="bg-gray-800/50 p-6 rounded-lg neon-container">
              <h2
                className="text-2xl font-bold mb-4 text-center"
                style={{
                  textShadow: "0 0 10px #fff, 0 0 20px #ff00ff",
                }}
              >
                <Link href="https://aviral.software">
                  ☮️ CLICK FOR MY WEB2 Portfolio ☮️
                </Link>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Code className="h-8 w-8 text-pink-400" />
                    <h3 className="text-xl font-bold">
                      Full-Stack Development
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Built scalable applications using modern tech stacks.
                    Specialized in creating intuitive user interfaces and robust
                    backend systems.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      Nextjs
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      Node.js/Golang
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      SQL
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      ORMs
                    </span>
                  </div>
                </div>

                <div className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Cpu className="h-8 w-8 text-blue-400" />
                    <h3 className="text-xl font-bold">System Architecture</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Designed and implemented complex system architectures for
                    high-traffic applications. Focus on scalability, security,
                    and performance.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      Microservices
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      Docker
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      Kubernetes
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      CI/CD
                    </span>
                  </div>
                </div>

                <div className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="h-8 w-8 text-yellow-400" />
                    <h3 className="text-xl font-bold">
                      Performance Optimization
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Specialized in optimizing application performance. Reduced
                    load times and improved user experience through efficient
                    code and smart caching strategies.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      Redis
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      CDN
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      Lazy Loading
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      Code Splitting
                    </span>
                  </div>
                </div>

                <div className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="h-8 w-8 text-blue-400" />
                    <h3 className="text-xl font-bold">AI Engineering</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Developed sophisticated AI-powered SaaS applications.
                    Specialized in building intelligent agent systems,
                    implementing RAG architectures for contextful agents.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      LangChain
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      RAG
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      Model Fine-tuning
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      AI Agents
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full"
                  onClick={() =>
                    window.open("https://aviral.software", "_blank")
                  }
                >
                  View Complete Web2 Portfolio
                </Button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden">
              <AboutMe />
            </div>
            <div className="rounded-lg overflow-hidden">
              <ProjectCard />
            </div>
            
            {/* Lazy load DonationWallet on mobile */}
            <div className="lg:hidden rounded-lg overflow-hidden mt-4">
              {mounted && <DonationWallet />}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}