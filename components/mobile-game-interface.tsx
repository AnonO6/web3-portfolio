"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Trophy, Award, Briefcase, Code, Zap, Cpu, Github, MessageCircle, ExternalLink, ChevronRight, Star, Rocket } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DinoGame } from "@/components/dino-game"

const achievements = [
  { 
    title: "ETHGLOBAL_WIN", 
    icon: <Trophy className="h-3 w-3" />, 
    color: "from-yellow-500 to-orange-500",
    glow: "0 0 20px rgba(234, 179, 8, 0.5)"
  },
  { 
    title: "COLOSSEUM_WIN", 
    icon: <Award className="h-3 w-3" />, 
    color: "from-purple-500 to-pink-500",
    glow: "0 0 20px rgba(168, 85, 247, 0.5)"
  },
  { 
    title: "ZK_VERIFY_WIN", 
    icon: <Star className="h-3 w-3" />, 
    color: "from-green-500 to-emerald-500",
    glow: "0 0 20px rgba(34, 197, 94, 0.5)"
  },
  { 
    title: "SUPERTEAM_IN", 
    icon: <Rocket className="h-3 w-3" />, 
    color: "from-yellow-500 to-orange-500",
    glow: "0 0 20px rgba(234, 179, 8, 0.5)"
  },
  { 
    title: "PROTOCOL_LABS", 
    icon: <Rocket className="h-3 w-3" />, 
    color: "from-blue-500 to-cyan-500",
    glow: "0 0 20px rgba(59, 130, 246, 0.5)"
  },
]

const projects = [
  {
    title: "Uniperp",
    subtitle: "Perps DEX on Uniswap v4",
    description: "MEV-safe perpetual DEX with vAMM",
    badge: "🏆 Winner",
    color: "from-purple-600 to-blue-600",
    link: "https://youtu.be/9XcA9woanBs?si=QsYPAanQRcfmp79h&t=880",
    image: "uniperp.jpeg"
  },
  {
    title: "Soulboard",
    subtitle: "DePIN Ad Protocol",
    description: "Real-world ads to verifiable RWAs",
    badge: "🚀 Grant",
    color: "from-blue-600 to-cyan-600",
    link: "https://x.com/soulboardFdn",
    image: "soulboard.png"
  },
  {
    title: "MEVBuster",
    subtitle: "Flash Loan Defense",
    description: "ZKVerify & EigenLayer AVS protection",
    badge: "🛡️ Winner",
    color: "from-green-600 to-emerald-600",
    link: "https://github.com/anon-pool-hook/app",
    image: "mevbuster.png"
  },
  {
    title: "CaliSEC",
    subtitle: "Secure Communication",
    description: "Zero-trust encrypted messaging",
    badge: "🔐 Privacy",
    color: "from-pink-600 to-purple-600",
    link: "https://github.com/Team-Doraemon/CaliSEC-Protocol",
    image: "calisec.png"
  },
  {
    title: "OmikoXBT",
    subtitle: "Twitter Agent",
    description: "Autonomous agent for Mantra Chain",
    badge: "🤖 AI",
    color: "from-orange-600 to-red-600",
    link: "https://x.com/OMikoxbt",
    image: "omikoxbt.png"
  },
  {
    title: "DronaAI",
    subtitle: "Adaptive Learning",
    description: "RAG-powered education platform",
    badge: "🎓 AI",
    color: "from-indigo-600 to-purple-600",
    link: "https://github.com/DronaAI/v1",
    image: "dronaai.png"
  },
]

const skills = [
  { name: "Solidity", icon: <Code className="h-4 w-4" />, color: "bg-purple-600" },
  { name: "Rust/Solana", icon: <Rocket className="h-4 w-4" />, color: "bg-green-600" },
  { name: "ZK Proofs", icon: <Zap className="h-4 w-4" />, color: "bg-yellow-600" },
  { name: "DePIN", icon: <Cpu className="h-4 w-4" />, color: "bg-blue-600" },
  { name: "Uniswap v4", icon: <Code className="h-4 w-4" />, color: "bg-pink-600" },
  { name: "EigenLayer", icon: <Zap className="h-4 w-4" />, color: "bg-cyan-600" },
]

type Section = "home" | "projects" | "experience" | "skills"

export function MobileGameInterface() {
  const [activeSection, setActiveSection] = useState<Section>("home")
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)

  useEffect(() => {
    // Gamification: increase score with interactions
    const timer = setInterval(() => {
      if (combo > 0) {
        setScore(prev => prev + combo)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [combo])

  const handleInteraction = () => {
    setCombo(prev => prev + 1)
    setTimeout(() => setCombo(0), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-cyan-400 rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header with Stats */}
      <motion.header 
        className="relative z-50 p-3 bg-black/40 backdrop-blur-md border-b border-cyan-500/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/web3profile.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-cyan-400"
              style={{ boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)" }}
            />
          </motion.div>
          <div>
            <h1 className="text-base font-bold text-cyan-400 tracking-tight">AVIRAL_SHUKLA</h1>
            <p className="text-[9px] text-gray-400 tracking-wide">WEB3_PROTOCOL_DESIGNER</p>
          </div>
        </div>
        
        {/* Achievement Badges */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r ${achievement.color} text-white text-[9px] font-bold whitespace-nowrap tracking-tight`}
              style={{ boxShadow: achievement.glow }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {achievement.icon}
              {achievement.title}
            </motion.div>
          ))}
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-4 flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeSection === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              {/* Stats Card */}
              <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-md border-2 border-cyan-500/30 p-3">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-xl font-bold text-cyan-400 tracking-tight">10</div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-wider">Hackathons</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-400 tracking-tight">50+</div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-wider">Projects</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-400 tracking-tight">1800+</div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-wider">Contributions</div>
                  </div>
                </div>
              </Card>

              {/* Dino Game */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <DinoGame />
              </motion.div>

              {/* Social Links */}
              <Card className="bg-black/40 backdrop-blur-md border-2 border-cyan-500/30 p-3">
                <h3 className="text-base font-bold text-cyan-400 mb-2">Connect</h3>
                <div className="grid grid-cols-2 gap-2">
                  <motion.a
                    href="https://x.com/0xanonviral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleInteraction}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs font-semibold">Twitter</span>
                  </motion.a>
                  <motion.a
                    href="https://github.com/AnonO6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleInteraction}
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-xs font-semibold">GitHub</span>
                  </motion.a>
                  <motion.a
                    href="https://t.me/anonviral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleInteraction}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs font-semibold">Telegram</span>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/aviral-shukla-85b112228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleInteraction}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span className="text-xs font-semibold">LinkedIn</span>
                  </motion.a>
                </div>
              </Card>

              {/* Web2 Portfolio Link */}
              <motion.a
                href="https://aviral.software"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleInteraction}
              >
                <Card className="bg-gradient-to-r from-pink-900/50 to-purple-900/50 backdrop-blur-md border-2 border-pink-500/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-pink-400 mb-1 tracking-wide">WEB2_PORTFOLIO.EXE</h3>
                      <p className="text-[10px] text-gray-300 leading-relaxed">Full-Stack & AI Engineering Work</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-pink-400 flex-shrink-0" />
                  </div>
                </Card>
              </motion.a>

            </motion.div>
          )}

          {activeSection === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-4"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleInteraction}
                >
                  <Card className={`bg-gradient-to-br ${project.color} backdrop-blur-md border-2 border-white/20 p-4 cursor-pointer`}>
                    <div className="flex gap-4">
                      <Image
                        src={`/${project.image}`}
                        alt={project.title}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="text-lg font-bold">{project.title}</h3>
                            <p className="text-sm text-white/80">{project.subtitle}</p>
                          </div>
                          <Badge className="bg-white/20 text-white border-0 text-xs">
                            {project.badge}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/90 mb-2">{project.description}</p>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                        >
                          View Project <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeSection === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-4"
            >
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-md border-2 border-purple-500/30 p-4">
                <h3 className="text-xl font-bold text-purple-300 mb-2">Soulboard</h3>
                <p className="text-sm text-cyan-400 font-semibold mb-2">Co-founder, Protocol/IoT Lead</p>
                <p className="text-xs text-gray-300 mb-2">2024 - Present</p>
                <p className="text-sm text-white/90">
                  DePIN ad protocol turning real-world ad spaces into verifiable RWAs. 
                  1st in India, 4th globally at Colosseum Breakout.
                </p>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-md border-2 border-blue-500/30 p-4">
                <h3 className="text-xl font-bold text-blue-300 mb-2">Uniperp</h3>
                <p className="text-sm text-cyan-400 font-semibold mb-2">Founder - Perpetual DEX</p>
                <p className="text-xs text-gray-300 mb-2">2025</p>
                <p className="text-sm text-white/90">
                  Built perps DEX using v4 hooks with vAMM. ETHGlobal Winner & Uniswap Partner Track Winner.
                </p>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-md border-2 border-green-500/30 p-4">
                <h3 className="text-xl font-bold text-green-300 mb-2">Chatarmin</h3>
                <p className="text-sm text-cyan-400 font-semibold mb-2">Software Developer</p>
                <p className="text-xs text-gray-300 mb-2">Jun 2025 - Present</p>
                <p className="text-sm text-white/90">
                  Full-stack development, AI workflow automation, database optimization.
                </p>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 backdrop-blur-md border-2 border-yellow-500/30 p-4">
                <h3 className="text-xl font-bold text-yellow-300 mb-2">Open Source</h3>
                <p className="text-sm text-cyan-400 font-semibold mb-2">Protocol Labs & Uniswap</p>
                <p className="text-xs text-gray-300 mb-2">2024 - Present</p>
                <p className="text-sm text-white/90">
                  Contributing to Lighthouse Protocol and Uniswap v4 ecosystem.
                </p>
              </Card>
            </motion.div>
          )}

          {activeSection === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-4"
            >
              <Card className="bg-black/40 backdrop-blur-md border-2 border-cyan-500/30 p-4">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Technical Skills</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className={`${skill.color} p-4 rounded-lg flex items-center gap-3`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleInteraction}
                    >
                      {skill.icon}
                      <span className="text-sm font-semibold">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-md border-2 border-purple-500/30 p-4">
                <h3 className="text-lg font-bold text-purple-400 mb-3">Additional Skills</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-cyan-400" />
                    <span>Foundry, OpenZeppelin, ERC Standards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-cyan-400" />
                    <span>Golang (Fiber), TypeScript, Next.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-cyan-400" />
                    <span>Pyth Oracles, IPFS, Lighthouse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-cyan-400" />
                    <span>Docker, CI/CD, AWS, DigitalOcean</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-cyan-400" />
                    <span>LangChain, Pinecone, AI Agents</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-cyan-500/30 py-2 px-3 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        <div className="flex justify-around items-center max-w-md mx-auto">
          {[
            { id: "home", icon: <Star className="h-5 w-5" />, label: "Home" },
            { id: "projects", icon: <Code className="h-5 w-5" />, label: "Projects" },
            { id: "experience", icon: <Briefcase className="h-5 w-5" />, label: "Experience" },
            { id: "skills", icon: <Zap className="h-5 w-5" />, label: "Skills" },
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id as Section)
                handleInteraction()
              }}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                activeSection === item.id
                  ? "text-cyan-400"
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{
                  scale: activeSection === item.id ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {item.icon}
              </motion.div>
              <span className="text-xs font-medium">{item.label}</span>
              {activeSection === item.id && (
                <motion.div
                  className="w-1 h-1 bg-cyan-400 rounded-full"
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Combo Counter */}
      <AnimatePresence>
        {combo > 0 && (
          <motion.div
            className="fixed top-20 right-4 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
          >
            <div className="text-sm font-bold">
              {combo}x COMBO!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

