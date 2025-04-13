"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BuyMeCoffeeButton } from "@/components/buy-me-coffee-button"

const WALLET_DATA = {
  ARB: {
    address: "0x7A0C44ff0d78832870516e383a0F12d0cd4c52d6",
    qr: "addyqr.png",
  },
  ETH: {
    address: "0x7A0C44ff0d78832870516e383a0F12d0cd4c52d6",
    qr: "addyqr.png",
  },
  POL: {
    address: "0x7A0C44ff0d78832870516e383a0F12d0cd4c52d6",
    qr: "addyqr.png",
  },
}

export function DonationWallet() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg neon-container">
      {/* <h2 className="text-xl font-bold mb-4">Support My Work</h2> */}
      <Tabs defaultValue="BTC" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-700">
          <TabsTrigger value="ARB">Arbitrum</TabsTrigger>
          <TabsTrigger value="ETH">ETHMain</TabsTrigger>
          <TabsTrigger value="POL">Polygon</TabsTrigger>
        </TabsList>
        {Object.entries(WALLET_DATA).map(([type, data]) => (
          <TabsContent key={type} value={type} className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-48 h-48 bg-white p-2 rounded-lg">
                <Image
                  src={data.qr}
                  alt={`${type} QR Code`}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex items-center gap-2 w-full max-w-md bg-gray-700 rounded-lg p-2">
                <code className="flex-1 text-sm break-all px-2">{data.address}</code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(data.address, type)}
                  className="h-8 w-8 hover:bg-gray-600"
                >
                  {copied === type ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              {type === "ETH" && (
                <div className="mt-4">
                  <BuyMeCoffeeButton />
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
