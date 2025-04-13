"use client";

import { ReactNode, useEffect, useState } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import Script from "next/script";

// Get App ID directly from environment (making it more visible)
const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "cm9fm83ja00phl80m1o5rmdw9";

// Debug log
console.log("Initializing Privy with App ID length:", PRIVY_APP_ID.length);

// Custom Privy implementation to bypass ad blockers
const initPrivyDirectly = () => {
  const DOMAIN = 'https://auth.privy.io';
  
  // This injects iframe without relying on Privy's script which might be blocked
  const setupPrivyIframe = () => {
    const existingIframe = document.getElementById('privy-iframe');
    if (existingIframe) return;
    
    console.log("Manually setting up Privy iframe...");
    
    // Create the iframe element
    const iframe = document.createElement('iframe');
    iframe.id = 'privy-iframe';
    iframe.style.display = 'none';
    iframe.allow = 'clipboard-read; clipboard-write';
    iframe.src = `${DOMAIN}/v1/auth/${PRIVY_APP_ID}/iframe`;
    
    // Append it to the body
    document.body.appendChild(iframe);
    
    // Create local storage entry to indicate iframe exists
    try {
      localStorage.setItem('privy:iframe-injected', 'true');
    } catch (e) {
      console.error("Could not write to localStorage:", e);
    }
  };
  
  // Setup message channel to communicate with iframe
  const setupMessageChannel = () => {
    window.addEventListener('message', (event) => {
      if (event.origin !== DOMAIN) return;
      console.log("Received message from Privy iframe:", event.data);
    });
  };
  
  return {
    setupPrivy: () => {
      setupPrivyIframe();
      setupMessageChannel();
    }
  };
};

export function Providers({ children }: { children: ReactNode }) {
  const [hasError, setHasError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [useDirectImplementation, setUseDirectImplementation] = useState(false);

  useEffect(() => {
    console.log("Privy Provider mounted, App ID length:", PRIVY_APP_ID.length);
    
    // Add detection for ad blockers or other issues
    const timer = setTimeout(() => {
      const privyIframe = document.querySelector('iframe[src*="privy"]');
      if (!privyIframe) {
        console.warn("Privy iframe not found - possible blocker interference");
        setHasError(true);
        
        // Try direct implementation approach
        setUseDirectImplementation(true);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // If using direct implementation, set it up
  useEffect(() => {
    if (useDirectImplementation) {
      try {
        const privyDirectImpl = initPrivyDirectly();
        privyDirectImpl.setupPrivy();
        console.log("Direct Privy implementation initialized");
      } catch (e) {
        console.error("Failed to initialize direct implementation:", e);
      }
    }
  }, [useDirectImplementation]);

  if (hasError) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 p-6 rounded-lg max-w-md text-white">
          <h2 className="text-xl font-bold mb-3">Connection Issue Detected</h2>
          <p className="mb-4">
            Wallet connection is being blocked. We're trying alternative approaches to connect your wallet.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={() => setUseDirectImplementation(true)}
              className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 rounded-md font-medium"
            >
              Use Alternative Connection
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-medium"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {useFallback && (
        <Script
          id="privy-fallback"
          strategy="beforeInteractive"
          src="https://cdn.jsdelivr.net/npm/@privy-io/react-auth@latest/dist/index.mjs"
          onLoad={() => console.log("Privy fallback script loaded")}
          onError={() => console.error("Failed to load Privy fallback script")}
        />
      )}
      <PrivyProvider
        appId={PRIVY_APP_ID}
        config={{
          loginMethods: ["wallet", "email"],
          embeddedWallets: {
            createOnLogin: "all-users",
          },
          appearance: {
            theme: "dark",
            accentColor: "#8b5cf6", // Purple
            logo: "https://your-logo-url.com", // Replace with your logo URL
          },
        }}
      >
        {children}
      </PrivyProvider>
    </>
  );
} 