import { Badge } from "@/components/ui/badge"
import { Zap, Code, Cpu, Coins, Shield, Rocket } from "lucide-react"

const skills = [
  { name: "Solidity ^0.8.x", icon: <Code className="h-3 w-3 mr-1" /> },
  { name: "Foundry", icon: <Code className="h-3 w-3 mr-1" /> },
  { name: "Uniswap v4 Hooks", icon: <Coins className="h-3 w-3 mr-1" /> },
  { name: "Solana (Anchor/Rust)", icon: <Rocket className="h-3 w-3 mr-1" /> },
  { name: "EigenLayer AVS", icon: <Shield className="h-3 w-3 mr-1" /> },
  { name: "Golang (Fiber)", icon: <Code className="h-3 w-3 mr-1" /> },
  { name: "TypeScript", icon: <Code className="h-3 w-3 mr-1" /> },
  { name: "Next.js", icon: <Code className="h-3 w-3 mr-1" /> },
  { name: "zkVerify", icon: <Zap className="h-3 w-3 mr-1" /> },
  { name: "Succinct", icon: <Zap className="h-3 w-3 mr-1" /> },
  { name: "Pyth Oracles", icon: <Coins className="h-3 w-3 mr-1" /> },
  { name: "DePIN", icon: <Cpu className="h-3 w-3 mr-1" /> },
]

const zkProjects = [
  { name: "ZK-SNARKs", icon: "✨" },
  { name: "ZK-STARKs", icon: "🌟" },
  { name: "ZKVerify", icon: "🔐" },
  { name: "MEVBuster", icon: "🛡️" },
]

const dePINProjects = [
  { name: "Soulboard", icon: "📊" },
  { name: "Filecoin", icon: "📂" },
  { name: "Lighthouse", icon: "🔦" },
  { name: "Helium", icon: "📶" },
]

const defiProjects = [
  { name: "Uniperp", icon: "⚡" },
  { name: "Uniswap v4", icon: "🦄" },
  { name: "vAMM", icon: "💹" },
  { name: "Pyth", icon: "🔮" },
]

export function AboutMe() {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg space-y-6 neon-container-light">
      <div className="text-center mb-6">
        <h2
          className="text-2xl font-bold"
          style={{
            textShadow:
              "0 0 10px #fff, 0 0 20px #00c3ff, 0 0 30px #00c3ff, 0 0 40px #00c3ff, 0 0 70px #00c3ff, 0 0 80px #00c3ff, 0 0 100px #00c3ff, 0 0 150px #00c3ff",
          }}
        >
          ✨ Web3 Protocol Designer & Full-Stack Engineer ✨
        </h2>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Polynomial-Time Proficiencies</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-gradient-to-r from-purple-700 to-blue-700 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              {skill.icon}
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-purple-300">ZK Projects I'm Vibing With</h3>
          <div className="grid grid-cols-2 gap-3">
            {zkProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-700/50 p-3 rounded-lg text-center hover:bg-gray-600/50 transition-colors"
              >
                <span className="text-2xl">{project.icon}</span>
                <p className="mt-1 font-medium text-sm">{project.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-300">DePIN Networks I'm Building On</h3>
          <div className="grid grid-cols-2 gap-3">
            {dePINProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-700/50 p-3 rounded-lg text-center hover:bg-gray-600/50 transition-colors"
              >
                <span className="text-2xl">{project.icon}</span>
                <p className="mt-1 font-medium text-sm">{project.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-green-300">DeFi Protocols I'm Hacking</h3>
          <div className="grid grid-cols-2 gap-3">
            {defiProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-700/50 p-3 rounded-lg text-center hover:bg-gray-600/50 transition-colors"
              >
                <span className="text-2xl">{project.icon}</span>
                <p className="mt-1 font-medium text-sm">{project.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/50">
        <p className="text-center text-sm">
          <span className="font-bold">Far out fact:</span> I once explained Zero Knowledge Proofs to my cat. She now
          refuses to tell anyone what she knows. Success! 🐱
        </p>
      </div>
    </div>
  )
}
