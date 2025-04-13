"use client"

import { useState, useRef, useEffect } from "react"

interface Song {
  title: string
  artist: string
  src: string
}

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [autoplayFailed, setAutoplayFailed] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const songs: Song[] = [
    { title: "Retro Lofi Hip Hop Beats", artist: "Lofi Girl", src: "/audio/retro-lofi.mp3" },
    { title: "12 A.M Study Session", artist: "Lofi Girl", src: "/audio/study-session.mp3" },
    { title: "Take Your Time Relax", artist: "Lofi Girl", src: "/audio/take-your-time.mp3" },
    { title: "Donkey Kong Country OST", artist: "David Wise", src: "/audio/donkey-kong.mp3" },
  ]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSong].src
      if (isPlaying) {
        audioRef.current.play().catch(handlePlayError)
      }
    }
  }, [currentSong, isPlaying]) // Added isPlaying to dependencies

  useEffect(() => {
    const attemptAutoplay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error("Autoplay failed:", error)
          setAutoplayFailed(true)
        }
      }
    }
    attemptAutoplay()
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(handlePlayError)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handlePlayError = (error: any) => {
    console.error("Error playing audio:", error)
    setError("Unable to play audio. Please check your audio files.")
    setIsPlaying(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
  }

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length)
  }

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length)
  }

  return null
}
