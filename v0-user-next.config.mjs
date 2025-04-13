/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@privy-io/react-auth',
    '@privy-io/wagmi',
    'wagmi',
    'viem'
  ],
}

export default nextConfig 