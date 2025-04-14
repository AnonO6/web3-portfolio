# I Build Stuff - Web3 Portfolio

A performance-optimized Next.js portfolio website showcasing Web3, ZK Proofs, and DePIN projects.

<img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1500x500-I2rDjY22tK2hLCywnkBcAPaWJErMTt.jpeg" alt="Portfolio Banner" width="800">

## Features

- ⚡ Performance-optimized React components
- 🎬 Dynamic background video with mobile optimizations
- 🔄 Animated UI elements with framer-motion
- 🌐 Web3 integrations (wallet connect)
- 📱 Fully responsive design
- 🎨 Neon-themed styling effects

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [pnpm](https://pnpm.io/) package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd web3portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Performance Optimizations

This portfolio has been optimized for performance:

- Delayed loading of heavy components
- Video loading optimization with poster images
- Reduced CSS animation complexity on mobile
- Hardware acceleration for smoother animations
- Image optimization with Next.js Image component

## Project Structure

```
web3portfolio/
├── components/         # UI components
├── public/             # Static assets
├── app/                # Next.js app directory
├── styles/             # Global styles
└── globals.css         # Tailwind CSS configuration
```

## Key Components

- `page.tsx`: Main portfolio page
- `AnimatedTitle.jsx`: Text animation component
- `ProjectCard.jsx`: Showcase for projects
- `AboutMe.jsx`: Personal information section
- `DonationWallet.jsx`: Crypto donation integration
- `ConnectWalletButton.jsx`: Web3 wallet connection

## Customization

1. Replace images and content in the components
2. Modify the `globals.css` file for styling changes
3. Update project details in `ProjectCard.jsx`
4. Adjust animations in `AnimatedTitle.jsx`

## Deployment

This project can be easily deployed to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- Website: [aviral.software](https://aviral.software)
- GitHub: [AnonO6](https://github.com/AnonO6)
- Twitter/X: [@0xanonviral](https://x.com/0xanonviral)