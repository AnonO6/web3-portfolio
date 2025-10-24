"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"

interface Obstacle {
  x: number
  width: number
  height: number
}

export function DinoGame() {
  const [isJumping, setIsJumping] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [dinoY, setDinoY] = useState(0)
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [gameStarted, setGameStarted] = useState(true)
  const [hasDoubleJumped, setHasDoubleJumped] = useState(false)
  
  const gameLoopRef = useRef<number>()
  const velocityRef = useRef(0)
  const gameSpeedRef = useRef(5)
  const dinoYRef = useRef(0)
  const obstaclesRef = useRef<Obstacle[]>([])

  // Game physics constants
  const GRAVITY = -0.6
  const JUMP_STRENGTH = 12
  const DINO_WIDTH = 40
  const DINO_HEIGHT = 40
  const GAME_HEIGHT = 360
  const GROUND_LEVEL = 270 // 25% from bottom (75% from top)
  const MAX_JUMP_HEIGHT = 150 // Ceiling limit - prevents infinite jumping

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dinoHighScore')
    if (saved) setHighScore(parseInt(saved))
  }, [])

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('dinoHighScore', score.toString())
    }
  }, [score, highScore])

  const jump = () => {
    if (!isGameOver && gameStarted) {
      // First jump - on the ground
      if (dinoY <= 1 && !isJumping) {
        setIsJumping(true)
        setHasDoubleJumped(false) // Reset double jump when starting from ground
        velocityRef.current = JUMP_STRENGTH
      }
      // Double jump - in the air and haven't double jumped yet
      else if (isJumping && !hasDoubleJumped && dinoY > 1) {
        setHasDoubleJumped(true)
        velocityRef.current = JUMP_STRENGTH // Give another jump boost
      }
    }
  }

  const startGame = useCallback(() => {
    setIsGameOver(false)
    setScore(0)
    setDinoY(0)
    setObstacles([])
    setGameStarted(true)
    setHasDoubleJumped(false)
    velocityRef.current = 0
    gameSpeedRef.current = 5
    dinoYRef.current = 0
    obstaclesRef.current = []
  }, [])

  // Handle jump input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (isGameOver) {
          startGame()
        } else if (gameStarted) {
          jump()
        }
      }
    }

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault()
      if (isGameOver) {
        startGame()
      } else if (gameStarted) {
        jump()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouch)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouch)
    }
  }, [isGameOver, startGame, gameStarted])

  // Game loop
  useEffect(() => {
    if (!gameStarted || isGameOver) return

    const gameLoop = () => {
      // Update dino position
      setDinoY(prev => {
        const currentVel = velocityRef.current
        let newY = prev + currentVel
        
        // Ceiling check - prevent jumping above max height
        if (newY > MAX_JUMP_HEIGHT) {
          newY = MAX_JUMP_HEIGHT
          velocityRef.current = 0 // Stop upward movement at ceiling
        }
        
        // Ground check
        if (newY <= 0.1) {
          velocityRef.current = 0
          setIsJumping(false)
          setHasDoubleJumped(false) // Reset double jump when landing
          dinoYRef.current = 0
          return 0
        }
        
        velocityRef.current += GRAVITY
        dinoYRef.current = newY
        return newY
      })

      // Update obstacles
      setObstacles(prev => {
        const updated = prev
          .map(obs => ({ ...obs, x: obs.x - gameSpeedRef.current }))
          .filter(obs => obs.x > -obs.width)

        // Add new obstacle
        if (updated.length === 0 || updated[updated.length - 1].x < 200) {
          if (Math.random() > 0.98) {
            const isTall = Math.random() > 0.5
            updated.push({
              x: 300,
              width: 20,
              height: isTall ? 60 : 40
            })
          }
        }

        obstaclesRef.current = updated
        return updated
      })

      // Check collision using refs for latest values
      obstaclesRef.current.forEach(obs => {
        const dinoLeft = 50
        const dinoRight = dinoLeft + DINO_WIDTH
        const dinoTop = GROUND_LEVEL - DINO_HEIGHT/2 - dinoYRef.current
        const dinoBottom = dinoTop + DINO_HEIGHT

        const obsLeft = obs.x
        const obsRight = obs.x + obs.width
        const obsTop = GROUND_LEVEL - obs.height/2
        const obsBottom = obsTop + obs.height

        if (
          dinoRight > obsLeft &&
          dinoLeft < obsRight &&
          dinoBottom > obsTop &&
          dinoTop < obsBottom
        ) {
          setIsGameOver(true)
        }
      })

      // Update score
      setScore(prev => prev + 1)
      // Gradually increase speed
      if (score % 100 === 0) {
        gameSpeedRef.current = Math.min(5 + Math.floor(score / 500), 12)
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameStarted, isGameOver, score])

  return (
    <div className="relative w-full bg-transparent rounded-lg overflow-hidden">
      {/* Game Canvas */}
      <div 
        className="relative w-full h-[360px] cursor-pointer select-none"
        style={{ touchAction: 'none' }}
        onClick={() => {
          if (isGameOver) {
            startGame()
          } else {
            jump()
          }
        }}
      >
        {/* Dino */}
        {gameStarted && (
          <motion.div
            className="absolute bg-cyan-400 rounded"
            style={{
              left: '50px',
              top: `${GROUND_LEVEL - DINO_HEIGHT/2 - dinoY}px`,
              width: `${DINO_WIDTH}px`,
              height: `${DINO_HEIGHT}px`,
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)',
            }}
            animate={isJumping ? { rotate: [0, -10, 0] } : {}}
          >
            {/* Dino eyes */}
            <div className="absolute top-2 left-2 w-2 h-2 bg-gray-900 rounded-full" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-gray-900 rounded-full" />
            {/* Dino arms */}
            <div className="absolute bottom-2 left-1 w-1 h-3 bg-cyan-300" />
            <div className="absolute bottom-2 right-1 w-1 h-3 bg-cyan-300" />
          </motion.div>
        )}

        {/* Obstacles */}
        {obstacles.map((obs, index) => (
          <div
            key={index}
            className="absolute bg-purple-500 rounded"
            style={{
              left: `${obs.x}px`,
              top: `${GROUND_LEVEL - obs.height/2}px`,
              width: `${obs.width}px`,
              height: `${obs.height}px`,
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)',
            }}
          />
        ))}

        {/* Score Display */}
        <div className="absolute top-3 right-3 text-right">
          <div className="text-sm font-bold text-gray-400">
            HI {Math.floor(highScore / 10).toString().padStart(5, '0')} {Math.floor(score / 10).toString().padStart(5, '0')}
          </div>
        </div>

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              className="px-8 py-3 bg-gray-800 border-2 border-gray-600 rounded font-bold text-white hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ↻
            </motion.button>
          </div>
        )}

      </div>
    </div>
  )
}
