"use client"

import { useState } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// Your wallet address to receive the donation
const RECIPIENT_ADDRESS = "0xf1711376c0a9a09a865098A6Cbd047A2bF889F05"

export function BuyMeCoffeeButton() {
  const [isTransferring, setIsTransferring] = useState(false)
  const { ready, authenticated, login, user, createWallet } = usePrivy()

  const handleBuyCoffee = async () => {
    if (!authenticated) {
      login()
      return
    }
    
    if (!user?.wallet) {
      toast.info("Creating a wallet for you...")
      try {
        await createWallet()
        return
      } catch (error) {
        console.error("Error creating wallet:", error)
        toast.error("Failed to create wallet")
        return
      }
    }
    
    try {
      setIsTransferring(true)
      toast.info("Simulating transaction...")
      
      // In a real implementation, you would:
      // 1. Create a transaction for USDT transfer
      // 2. Send it via the connected wallet
      
      // For now, we'll simulate the process
      setTimeout(() => {
        setIsTransferring(false)
        toast.success("Thank you for the coffee! 😊")
      }, 2000)
      
    } catch (error) {
      console.error("Error sending transaction:", error)
      setIsTransferring(false)
      toast.error("Failed to send transaction")
    }
  }

  return (
    <Button
      variant="default"
      onClick={handleBuyCoffee}
      disabled={!ready || isTransferring}
      className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2"
    >
      <Coffee className="h-4 w-4" />
      <span>
        {!ready 
          ? "Loading..." 
          : isTransferring
            ? "Processing..." 
            : "Buy Me a Coffee (4 USDT)"
        }
      </span>
    </Button>
  )
} 