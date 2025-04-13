"use client"

import { useState, useEffect } from "react"
import { Wallet } from "lucide-react"
import { toast, Toaster } from "sonner"

// Simplified type without declaration conflicts
type EthereumProvider = {
  request: (args: {method: string, params?: any[]}) => Promise<any>
  on: (event: string, listener: any) => void
  removeListener: (event: string, listener: any) => void
}

export default function WalletConnectPage() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Simplified direct wallet connection
  const connectWallet = async () => {
    try {
      setIsConnecting(true)
      setError(null)
      
      // Check if ethereum provider exists (MetaMask, etc.)
      const provider = window.ethereum as EthereumProvider | undefined
      if (!provider) {
        setError("No wallet detected. Please install MetaMask.")
        return
      }
      
      // Request accounts directly from provider
      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      })
      
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0])
        toast.success("Wallet connected successfully!")
      } else {
        setError("No accounts found. Please check your wallet.")
      }
    } catch (err: any) {
      console.error("Connection error:", err)
      setError(err.message || "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  // Listen for account changes
  useEffect(() => {
    const provider = window.ethereum as EthereumProvider | undefined
    if (provider) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setAccount(null)
        } else if (accounts[0] !== account) {
          setAccount(accounts[0])
        }
      }
      
      provider.on('accountsChanged', handleAccountsChanged)
      
      return () => {
        provider.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [account])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <Toaster position="top-right" richColors />
      
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Direct Wallet Connection</h1>
        
        {account ? (
          <div className="text-center">
            <div className="mb-4 p-3 bg-green-800/30 rounded-lg border border-green-600">
              <p className="text-sm text-green-400 mb-1">Connected Account:</p>
              <p className="font-mono break-all">{account}</p>
            </div>
            
            <button
              onClick={() => setAccount(null)}
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-md font-medium transition-colors"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Wallet className="h-5 w-5" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
            
            {error && (
              <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
            )}
            
            <div className="mt-6 text-sm text-gray-400">
              <p className="mb-2">This page connects directly to your wallet without any third-party services:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Works with ad blockers enabled</li>
                <li>Connects directly to MetaMask or other wallets</li>
                <li>No external iframes or scripts</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 