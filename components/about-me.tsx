import { Badge } from "@/components/ui/badge"
import { Zap, Code, Cpu } from "lucide-react"

const interests = [
  "Building Zero Knowledge Proofs",
  "DePIN architecture & tokenomics",
  "Hacking on Solana & Ethereum",
  "Breaking cryptographic systems",
  "Playing guitar, flute, and watching anime",
  "Attending hackathons in pajamas",
  "Explaining blockchain to my grandma",
  "Finding bugs in smart contracts",
]

const skills = [
  { name: "Solidity", icon: <Code className="h-3 w-3 mr-1" /> },
  { name: "Golang", icon: <Code className="h-3 w-3 mr-1" /> },
  { name: "Next.js", icon: <Code className="h-3 w-3 mr-1" /> },
  { name: "zkVerify", icon: <Zap className="h-3 w-3 mr-1" /> },
  { name: "DePIN", icon: <Cpu className="h-3 w-3 mr-1" /> },
]

const zkProjects = [
  { name: "ZK-SNARKs", icon: "✨" },
  { name: "ZK-STARKs", icon: "🌟" },
  { name: "ZK Rollups", icon: "🔄" },
  { name: "Plonk", icon: "🧩" },
]

const dePINProjects = [
  { name: "Helium", icon: "📶" },
  { name: "Filecoin", icon: "📂" },
  { name: "Arweave", icon: "🗄️" },
  { name: "Render", icon: "🖥️" },
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
          ✨ Cosmic Code Wizard ✨
        </h2>
        <p className="text-cyan-400 mt-2 italic mx-auto max-w-lg">
          "I don't always write proofs, but when I do, I prefer zero knowledge" 🕶️
        </p>
      </div>

      <div>
        <h3
          className="text-xl font-semibold mb-2 text-white"
          style={{
            textShadow:
              "0 0 10px #fff, 0 0 20px #00c3ff, 0 0 30px #00c3ff, 0 0 40px #00c3ff, 0 0 70px #00c3ff, 0 0 80px #00c3ff, 0 0 100px #00c3ff, 0 0 150px #00c3ff",
          }}
        >
          ☮️ Groovy Interests ☮️
        </h3>
        <ul className="list-disc list-inside grid grid-cols-2 gap-2">
          {interests.map((interest, index) => (
            <li
              key={index}
              className="text-sm text-white"
              style={{
                textShadow: "0 0 5px #fff, 0 0 10px #00c3ff, 0 0 15px #00c3ff, 0 0 20px #00c3ff, 0 0 35px #00c3ff",
              }}
            >
              {interest}
            </li>
          ))}
        </ul>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-purple-300">ZK Projects I'm Vibing With</h3>
          <div className="grid grid-cols-2 gap-3">
            {zkProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-700/50 p-3 rounded-lg text-center hover:bg-gray-600/50 transition-colors"
              >
                <span className="text-2xl">{project.icon}</span>
                <p className="mt-1 font-medium">{project.name}</p>
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
                <p className="mt-1 font-medium">{project.name}</p>
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
