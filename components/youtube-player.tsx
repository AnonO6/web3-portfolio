"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, SkipForward, SkipBack } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Slider } from "@/components/ui/slider" // Removed

interface Stream {
  id: string
  title: string
  artist: string
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export function YouTubePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  // const [volume, setVolume] = useState(50) // Removed
  // const [isMuted, setIsMuted] = useState(false) // Removed
  const [error, setError] = useState<string | null>(null)
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [isChangingStream, setIsChangingStream] = useState(false)

  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const streams: Stream[] = [
    {
      id: "jfKfPfyJRdk",
      title: "Lofi Hip Hop Radio",
      artist: "beats to relax/study to",
    },
    {
      id: "UedTcufyrHc",
      title: "ChillSynth FM",
      artist: "synthwave radio for retro dreaming",
    },
    {
      id: "6Jsnem7i848",
      title: "24/7 Beats Instrumental Hip-Hop",
      artist: "Jazzhop, Lo-Fi, Chillhop, Boom Bap",
    },
  ]

  const loadYouTubeAPI = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (window.YT) {
        resolve()
        return
      }

      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        resolve()
      }

      tag.onerror = (err) => {
        reject(err)
      }
    })
  }, [])

  const initializePlayer = useCallback(async () => {
    try {
      await loadYouTubeAPI()

      if (playerRef.current) {
        playerRef.current.destroy()
      }

      playerRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: streams[currentStreamIndex].id,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
        },
        events: {
          onReady: () => {
            setIsPlayerReady(true)
            setIsChangingStream(false)
            // Set initial volume // Removed
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true)
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
            }
          },
          onError: () => {
            setError("Error loading video")
            setIsPlaying(false)
            setIsChangingStream(false)
          },
        },
      })
    } catch (err) {
      setError("Failed to initialize player")
      console.error("YouTube player initialization error:", err)
      setIsChangingStream(false)
    }
  }, [currentStreamIndex, loadYouTubeAPI])

  useEffect(() => {
    initializePlayer()

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [initializePlayer])

  // const setPlayerVolume = useCallback((newVolume: number) => { // Removed
  //   if (playerRef.current && playerRef.current.setVolume) {
  //     try {
  //       playerRef.current.setVolume(newVolume)
  //       setVolume(newVolume)
  //     } catch (err) {
  //       console.error("Volume adjustment error:", err)
  //       setError("Error adjusting volume. Please try again.")
  //     }
  //   } else {
  //     console.warn("Player not ready for volume adjustment")
  //   }
  // }, []) // Removed

  // useEffect(() => { // Removed
  //   if (isPlayerReady && !isChangingStream) {
  //     setPlayerVolume(volume)
  //   }
  // }, [isPlayerReady, isChangingStream, volume, setPlayerVolume]) // Removed

  // const handleVolumeChange = useCallback( // Removed
  //   (value: number[]) => {
  //     if (!isPlayerReady || !playerRef.current || isChangingStream) return
  //     const newVolume = value[0]
  //     setPlayerVolume(newVolume)
  //     // setIsMuted(newVolume === 0) // Removed
  //   },
  //   [isPlayerReady, isChangingStream, setPlayerVolume],
  // ) // Removed

  // const toggleMute = useCallback(() => { // Removed
  //   if (!isPlayerReady || !playerRef.current || isChangingStream) return

  //   try {
  //     if (isMuted) {
  //       playerRef.current.unMute()
  //       setPlayerVolume(volume > 0 ? volume : 50)
  //     } else {
  //       playerRef.current.mute()
  //       setPlayerVolume(0)
  //     }
  //     setIsMuted(!isMuted)
  //   } catch (err) {
  //     console.error("Mute toggle error:", err)
  //     setError("Error toggling mute. Please try again.")
  //   }
  // }, [isPlayerReady, isChangingStream, isMuted, volume, setPlayerVolume]) // Removed

  const togglePlay = useCallback(() => {
    if (!isPlayerReady || !playerRef.current || isChangingStream) return

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
      setIsPlaying(!isPlaying)
    } catch (err) {
      setError("Error controlling playback")
      console.error("Playback error:", err)
    }
  }, [isPlayerReady, isChangingStream, isPlaying])

  const changeStream = useCallback(
    async (direction: "next" | "prev") => {
      if (isChangingStream) return

      setIsChangingStream(true)
      setError(null)

      try {
        if (playerRef.current && isPlaying) {
          await playerRef.current.stopVideo()
        }

        const newIndex =
          direction === "next"
            ? (currentStreamIndex + 1) % streams.length
            : (currentStreamIndex - 1 + streams.length) % streams.length

        setCurrentStreamIndex(newIndex)
        setIsPlaying(false)
        initializePlayer()
      } catch (err) {
        setError("Error changing stream")
        console.error("Stream change error:", err)
        setIsChangingStream(false)
      }
    },
    [isChangingStream, isPlaying, currentStreamIndex, initializePlayer],
  )

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="truncate">
          <h3 className="text-sm font-medium truncate">{streams[currentStreamIndex].title}</h3>
          <p className="text-xs text-gray-400 truncate">{streams[currentStreamIndex].artist}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => changeStream("prev")}
            disabled={!isPlayerReady || isChangingStream}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={togglePlay}
            disabled={!isPlayerReady || isChangingStream}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => changeStream("next")}
            disabled={!isPlayerReady || isChangingStream}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <div ref={containerRef} className="hidden">
        <div id="youtube-player"></div>
      </div>
    </div>
  )
}
