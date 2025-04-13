"use client"

import type React from "react"

const AnimatedTitle: React.FC<{ text: string }> = ({ text }) => {
  return (
    <svg className="w-full h-full" viewBox={`0 0 ${text.length * 60} 80`}>
      <defs>
        <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff00cc" />
          <stop offset="50%" stopColor="#00c3ff" />
          <stop offset="100%" stopColor="#8a2be2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {text.split("").map((char, index) => (
        <text
          key={index}
          x={index * 60}
          y="60"
          fill="url(#titleGradient)"
          fontSize="48"
          fontWeight="bold"
          filter="url(#glow)"
        >
          {char}
        </text>
      ))}
    </svg>
  )
}

export default AnimatedTitle
