import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aviral Shukla | ZK & DePIN Portfolio",
  description:
    "Web3 portfolio of Aviral Shukla, specializing in Zero Knowledge Proofs and Decentralized Physical Infrastructure Networks",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lrpfp.jpg-MzmNxkc9Juf6zha5boZlzg5HPZrvdW.jpeg",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}


import './globals.css'