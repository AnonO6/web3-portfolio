"use client"

import { useState, useEffect } from "react"
import { usePrivy } from "@privy-io/react-auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wallet, ShieldAlert, RefreshCw, ExternalLink } from "lucide-react"
import { toast } from "sonner"

// Direct wallet connection bypassing Privy initialization
const connectWalletDirectly = async () => {
  try {
    console.log("Attempting direct wallet connection");
    
    // Detect if MetaMask is available
    const provider = window.ethereum;
    if (!provider) {
      toast.error("No wallet detected. Please install MetaMask or another wallet.");
      return null;
    }
    
    toast.info("Requesting wallet connection...");
    
    // Request accounts directly
    const accounts = await provider.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (accounts && accounts.length > 0) {
      const account = accounts[0];
      toast.success("Wallet connected successfully!");
      return account;
    }
    
    return null;
  } catch (error) {
    console.error("Direct wallet connection error:", error);
    toast.error("Failed to connect wallet directly");
    return null;
  }
};

// Manual function to load Privy directly if needed
const loadPrivyManually = () => {
  try {
    console.log("Attempting to load Privy manually");
    
    // Try to directly trigger iframe injection
    const privyIframe = document.createElement('iframe');
    privyIframe.src = `https://auth.privy.io/v1/auth/${process.env.NEXT_PUBLIC_PRIVY_APP_ID || "cm9fm83ja00phl80m1o5rmdw9"}/iframe`;
    privyIframe.style.display = 'none';
    privyIframe.id = 'manual-privy-iframe';
    document.body.appendChild(privyIframe);
    
    toast.info("Attempting alternative wallet connection...");
    setTimeout(() => window.location.reload(), 2000);
  } catch (e) {
    console.error("Error in manual load:", e);
  }
};

export function ConnectWalletButton() {
  const privy = usePrivy()
  const { login, ready, authenticated, user } = privy
  const [isTimeoutExpired, setIsTimeoutExpired] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [possibleBlocker, setPossibleBlocker] = useState(false)
  const [loadAttempts, setLoadAttempts] = useState(0)
  const [directAccount, setDirectAccount] = useState<string | null>(null)
  
  useEffect(() => {
    // Log Privy initialization status for debugging
    console.log("Privy status:", { ready, authenticated, privy })
    
    // Check for possible ad blockers or other issues
    const checkBlockers = () => {
      try {
        // Try to detect if wallet connection requests are being blocked
        const isPrivyLoaded = !!window.localStorage.getItem('privy:lastActiveTs');
        const privyIframes = document.querySelectorAll('iframe[src*="privy"]');
        
        if (!ready && !isPrivyLoaded && privyIframes.length === 0) {
          console.warn("Possible blocker detected - Privy resources not loading");
          setPossibleBlocker(true);
        }
      } catch (e) {
        console.error("Error checking for blockers:", e);
      }
    };
    
    // Set a timeout to handle case where Privy initialization is stuck
    const timeoutId = setTimeout(() => {
      if (!ready) {
        console.log("Privy initialization timed out");
        checkBlockers();
        setIsTimeoutExpired(true);
      }
    }, 8000); // 8 second timeout

    return () => clearTimeout(timeoutId)
  }, [ready, authenticated, privy])

  const handleConnect = async () => {
    try {
      setErrorMessage(null)
      
      // If Privy is blocked, try direct connection
      if (possibleBlocker || isTimeoutExpired) {
        const account = await connectWalletDirectly();
        if (account) {
          setDirectAccount(account);
          return;
        }
        
        if (loadAttempts < 2) {
          setLoadAttempts(prev => prev + 1);
          loadPrivyManually();
          return;
        }
        
        toast.error("Could not connect wallet. Try direct connection page.");
        return;
      }
      
      // Normal Privy flow if it's working
      if (!authenticated && ready) {
        console.log("Attempting to login with Privy...")
        toast.info("Connecting wallet...")
        login()
      }
    } catch (e) {
      console.error("Error in handleConnect:", e)
      const errMsg = e instanceof Error ? e.message : "Unknown error occurred"
      setErrorMessage(errMsg)
      toast.error(errMsg)
    }
  }

  // Show direct connection UI if we're using that method
  if (directAccount) {
    return (
      <div className="flex flex-col">
        <Button
          variant="outline"
          className="bg-green-700 hover:bg-green-800 text-white border border-green-500 relative flex items-center gap-2"
        >
          <Wallet className="h-4 w-4" />
          <span className="relative z-10">
            {`${directAccount.slice(0, 6)}...${directAccount.slice(-4)}`}
          </span>
        </Button>
        <p className="text-xs text-green-500 mt-1">Connected directly</p>
      </div>
    );
  }

  // Show blocker warning if detected
  if (possibleBlocker) {
    return (
      <div className="flex flex-col">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleConnect}
            className="bg-yellow-700 hover:bg-yellow-800 text-white border border-yellow-500 relative flex items-center gap-2 flex-1"
          >
            <ShieldAlert className="h-4 w-4" />
            <span className="relative z-10">Connect Directly</span>
          </Button>
          <Link href="/wallet-connect" passHref>
            <Button
              variant="outline"
              className="bg-blue-700 hover:bg-blue-800 relative flex items-center"
              title="Use simple connection page"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <p className="text-xs text-yellow-500 mt-1">Try our ad-blocker friendly connection</p>
      </div>
    );
  }

  // Display a fallback if loading takes too long
  const buttonText = 
    errorMessage 
      ? "Error: Try Again" 
      : isTimeoutExpired 
        ? loadAttempts > 0 ? `Connecting Directly...` : "Connect Directly" 
        : !ready 
          ? "Loading..." 
          : authenticated 
            ? user?.wallet?.address 
              ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}`
              : "Connected"
            : "Connect Wallet"

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleConnect}
          disabled={!ready && !isTimeoutExpired && !errorMessage}
          className="bg-gray-800 hover:bg-gray-700 text-white border border-purple-500 hover:border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)] relative flex items-center gap-2 flex-1"
        >
          <Wallet className="h-4 w-4" />
          <span className="relative z-10">{buttonText}</span>
          <span className="absolute inset-0 bg-purple-500 opacity-20"></span>
        </Button>
        
        {isTimeoutExpired && (
          <Link href="/wallet-connect" passHref>
            <Button
              variant="outline"
              className="bg-gray-700 hover:bg-gray-800 relative flex items-center"
              title="Use simple connection page"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
      
      {errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  )
}
